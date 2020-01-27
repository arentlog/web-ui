'use strict';
/*global sessionStorage: false */

app.config(function ($stateProvider, StateProvider, ArTransactionDetailsStateProvider) {
   StateProvider.addInquiryBaseState('ar', 'aric', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('ar', 'aric');
   ArTransactionDetailsStateProvider.addStates('ar', 'aric', 'aric.detail');

   $stateProvider.state('aric.detail', {
      url: '/detail?id&{pk:int}&pk2&pk3',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aric/detail.json');
            },
            controller: 'AricDetailCtrl as dtl'
         }
      },
      // Using the 'resolve' feature to asynchronously test something before allowing user into the state
      resolve: {
         accessTest: function ($q, $stateParams, DataService, MessageService, TabService) {
            var deferred = $q.defer();

            if ($stateParams.pk) {
               if (!$stateParams.pk2) {
                  var crit = {
                     tablename: 'arsc',
                     custno: $stateParams.pk
                  };
               } else {
                  var crit = {
                     tablename: 'arss',
                     custno: $stateParams.pk,
                     shipto: $stateParams.pk2
                  };
               }
               DataService.post('/web/api/shared/checkhyperlinkaccess', { data: crit, busy: true }, function (data) {
                  if (data.success) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                     MessageService.error('global.error', 'global.security.violations.hyperlink');
                     TabService.closeTab('aric');
                  }
               });
            } else {
               // If no pk param passed (probably means we are using rowid from the grid), then bypass the check
               deferred.resolve();
            }
            return deferred.promise;
         }
      }
   });
});

app.controller('AricBaseCtrl', function ($state, ConfigService, DataService, Constants) {
   var self = this;
   self.criteria = { group: '', custno: null, shipto: '' };

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'aric',
      rowIdField: 'rowID',
      stateRef: 'aric.detail',
      title: { label: 'global.customer.number', value: 'custno' },
      description: { label: null, value: 'name' }
   };

   self.isMaster = function () {
      return $state.is('aric.master');
   };

   self.includesMaster = function () {
      return $state.includes('aric.master');
   };

   self.isDetail = function () {
      return $state.is('aric.detail');
   };

   self.includesDetail = function () {
      return $state.includes('aric.detail');
   };

   /**
   * Initialize the search criteria object
   */
   self.initCriteria = function () {
      // Add default record limit to specified field on criteria
      self.criteria.MaxResults = ConfigService.getDefaultRecordLimit();
   };

   self.getGroup = function () {
      var arsgparams = {
         groupid: self.criteria.group,
         fillmode: true
      };
      self.arsg = DataService.getResource('api/ar/arsg/getbypk', { params: arsgparams, busy: true });
   };

   self.navigateToCreditExposureTab = function () {
      $state.go('aric.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      if (self.criteria.custno) {
         var arscparams = {
            custno: self.criteria.custno,
            fldlist: 'custno'
         };
         DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (arsc) {
            $state.go('aric.detail', { pk: arsc.custno, pk2: self.criteria.shipto, pk3: self.criteria.group });
         });
      } else if (self.criteria.group) {
         self.getGroup();
         $state.go('aric.detail', { id: 0 });
      } else {
         self.criteria.LookupParameter = 'arsc';
         self.criteria.MaxResults = ConfigService.getDefaultRecordLimit();
         self.criteria.QueryText = self.keyword;

         DataService.post(Constants.SEARCH_PATH, { data: self.criteria, errorFunction: 'search.aric' }, function (data) {
            var arsces = [];
            data.hits.forEach(function (arsc) {
               var tempArsc = {
                  custno: arsc.custno,
                  name: arsc.name,
                  lookupnm: arsc.lookupnm,
                  phoneno: arsc.phoneno,
                  zipcd: arsc.zipcd,
                  state: arsc.state,
                  city: arsc.city,
                  addr1: arsc.addr1,
                  rowpointer: arsc.rowpointer,
                  statustype: arsc.statustype === 'yes' ? true : false
               };
               arsces.push(tempArsc);
            });
            self.dataset = arsces;
         });
      }
   };

   self.getGroupId = function () {
      return self.criteria.group;
   };

   self.getShipTo = function () {
      return self.criteria.shipto;
   };

   self.initCriteria();
});

app.controller('AricSearchCtrl', function ($scope, $state, DataService, Utils, ConfigService, ModalService, MessageService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
      base.keyword = '';
      base.sublabel = '';
      if (!base.isMaster()) {
         $state.go('aric.master');
      }
   };

   // Perform search
   self.submit = function () {
      self.validateCustomerGroup();
   };

   self.navigateToMaster = function () {
      if (!base.criteria.custno && !base.criteria.shipto && !base.criteria.group && !base.isMaster()) {
         $state.go('aric.master');
      }
   };

   // When customer lookup value is selected, redirect to detail screen since we have the desired customer
   self.customerSelected = function (args) {
      if (args.value) {
         self.isCustomerNoChanged = true;
         self.validateCustomerGroup();
      } else {
         self.navigateToMaster();
      }
   };

   self.shipToSelected = function (args) {
      if (args.value) {
         base.criteria.custno = args.value2;
      } else {
         self.navigateToMaster();
      }
   };

   self.groupSelected = function () {
      self.isCustomerNoChanged = false;
      self.navigateToMaster();
      self.validateCustomerGroup();
   };

   self.validateCustomerGroup = function () {
      if (base.criteria.custno && base.criteria.group) {
         self.getcustomerByGroup();
      } else {
         // Get data
         base.search();
      }
   };

   self.getcustomerByGroup = function () {
      var params = {
         custno: base.criteria.custno,
         groupid: base.criteria.group,
         batchsize: ConfigService.getDefaultRecordLimit(),
         fillmode: true
      };
      DataService.get('api/ar/arsc/listbygroup', { params: params, busy: true }, function (data) {
         if (data && data.length) {
            base.getGroup();
            base.search();
         } else {
            self.showCustomerGroupSelectionPopup();
         }
      });
   };

   self.showCustomerGroupSelectionPopup = function () {
      if (!self.isCustomerNoChanged) {
         MessageService.error('global.error', 'error.customer.is.not.part.of.group.customer.not.allowe');
      }
      self.selectedGroupOption = 'G';
      ModalService.showModal('ar/aric/group-selection.json', null, $scope, function (modal) {
         self.groupSelectionModal = modal;
      });
   };

   self.groupSelectionCancelClicked = function () {
      self.groupSelectionModal.destroy();
   };

   self.groupSelectionOkClicked = function () {
      if (self.selectedGroupOption === 'G') {
         self.loadGroupFromCustomer();
      } else if (self.selectedGroupOption === 'C') {
         base.criteria.group = '';
         base.search();
      }
      self.groupSelectionModal.destroy();
   };

   self.loadGroupFromCustomer = function () {
      var arscparams = {
         custno: base.criteria.custno,
         fldlist: 'groupid'
      };
      DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (arsc) {
         if (arsc) {
            base.criteria.group = arsc.groupid;
         }
         base.search();
      });
   };
});

app.controller('AricMasterCtrl', function ($scope, $state, $translate, DataService, GridService, MessageService, ConfigService) {
   var self = this;
   var base = $scope.base;

   // Advanced search criteria object with initial values
   self.advCriteria = { recordcountlimit: ConfigService.getDefaultRecordLimit() };

   // List of available search criteria fields

   self.criteriaList = [
      { value: 'custno', label: $translate.instant('global.customer.number') },
      { value: 'name', label: $translate.instant('global.customer.name') },
      { value: 'groupid', label: $translate.instant('global.group.number') },
      { value: 'firstnm', label: $translate.instant('global.first.name') },
      { value: 'lastnm', label: $translate.instant('global.last.name') },
      { value: 'city', label: $translate.instant('global.city') },
      { value: 'state', label: $translate.instant('global.state') },
      { value: 'zipcd', label: $translate.instant('global.zip.code') },
      { value: 'phoneno', label: $translate.instant('global.phone.number') },
      { value: 'lookupnm', label: $translate.instant('global.lookup.name') },
      { value: 'includeinactive', label: $translate.instant('global.include.inactive') },
      { value: 'recordcountlimit', label: $translate.instant('global.record.limit') }
   ];

   // List of default selected criteria fields

   self.defaultSelectedCriteria = ['custno', 'name'];

   self.search = function () {
      var criteria = angular.copy(self.advCriteria);
      criteria.keywords = '';
      DataService.post('api/ar/arsc/lookup', { data: criteria, busy: true }, function (data) {
         base.dataset = data.arcustomerlookupresults;
      });
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('aric.detail', { pk: record.custno });
   };

   // Edit selected record
   self.edit = function () {
      var record = GridService.getSelectedRecord(base.grid);

      if (record) {
         var crit = {
            tablename: 'arsc',
            custno: record.custno
         };
         DataService.post('/web/api/shared/checkrestricteditaccess', { data: crit, busy: true }, function (data) {
            if (data) {
               if (data.success) {
                  $state.go('arsc.detail.edit', { pk: record.custno });
               }
               else {
                  MessageService.error('global.error', 'global.security.violation.restricted.editing');
               }
            }
         });
      }
   };

   self.copy = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         var arscparams = {
            custno: record.custno
         };
         DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (arsc) {
            $state.go('arsc.copy', { id: record.rowidArsc, object: arsc });
         });
      }
   };

   // Delete multiple from grid
   self.deleteCustomers = function () {
      var rowIds = GridService.getSelectedRowIds(base.grid, 'rowidArsc');

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.delete('api/ar/arsc/deletelistbyrowids', { data: rowIds, busy: true }, function () {//ignore jslint - correct identifier
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            $state.go('^.master', null, { reload: '^.master' });
         });
      });
   };
});

app.controller('AricDetailCtrl', function ($scope, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.canSelecteTransactionTab = false;
   self.canSelecteShipToTab = false;
   self.canSelecteGroupToTab = false;
   self.canSelectCreditTab = false;
   self.duedateModel = '';
   self.cmessage = '';

   self.getCustomMessage = function () {
      var criteria = {
         custno: base.criteria.custno,
         shipto: base.criteria.shipto,
         groupid: base.criteria.group
      };
      DataService.post('api/ar/asarinquiry/custmessage', { data: criteria, busy: true }, function (data) {
         if (data && data.cmessage) {
            self.cmessage = data.cmessage;
         }
      });
   };

   // Get customer record (handle both id param and pk params)
   if ($stateParams.id && $stateParams.id !== '0') {
      self.arsc = DataService.getResource('api/ar/arsc/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
      base.getGroup();
      // After record has resolved...
      self.arsc.$promise.then(function () {
         base.criteria.custno = self.arsc.custno;
         if (!base.criteria.group && self.arsc.groupid) {
            base.criteria.group = self.arsc.groupid;
         }
         self.getCustomMessage();
         self.addToRecent();
         base.getGroup();
      });
   } else if ($stateParams.pk) {
      var params = {
         custno: $stateParams.pk,
         fillmode: true
      };
      base.criteria.custno = $stateParams.pk;
      base.criteria.shipto = $stateParams.pk2;
      self.arsc = DataService.getResource('api/ar/arsc/getbypk', { params: params, busy: true });
      base.getGroup();
      // After record has resolved...
      self.arsc.$promise.then(function () {
         base.criteria.custno = self.arsc.custno;
         if (!base.criteria.group && self.arsc.groupid) {
            base.criteria.group = self.arsc.groupid;
         }
         self.getCustomMessage();
         self.addToRecent();
      });
   } else {
      self.getCustomMessage();
      if (base.criteria.group) {
         self.canSelecteGroupToTab = true;
      } else {
         self.canSelectCreditTab = true;
         base.getGroup();
      }
      var emptyarsc = {
         custno: 0,
         fillmode: true
      };
      self.arsc = DataService.getResource('api/ar/arsc/getbypk', { params: emptyarsc, busy: true });
   }

   // Function to provide the shipto to the Customer Inquiry General (tab) control
   self.getShiptoForCustomerTab = function (callback) {
      self.arsc.$promise.then(function () {
         if (base.criteria.shipto) {
            callback(base.criteria.shipto);
         }
      });
   };

   self.addToRecent = function () {
      if (self.arsc && self.arsc.custno) {
         // Add to recently visited list
         base.sublabel = self.arsc.custno + ' | ' + self.arsc.name;
         base.recentlyVisitedControl.addToList(self.arsc);
      }
   };

   self.generalTabActivated = function () {
      self.canSelecteTransactionTab = false;
      self.canSelecteShipToTab = false;
      self.canSelecteGroupToTab = false;
      self.canSelectCreditTab = false;
   };
});

app.controller('AricPeriodBalanceShiptoCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;

   if (base.criteria.custno) {
      var agingCriteria = {
         custno: base.criteria.custno,
         shipto: base.criteria.shipto,
         customfield: ''
      };
      DataService.post('api/ar/asarinquiry/shiptoaging', { data: agingCriteria, busy: true }, function (data) {
         if (data) {
            self.shiptoaging = data;
         }
      });
   }
});

app.controller('AricShiptoRowDetailCtrl', function ($scope, DataService) {
   var self = this;
   var pbsc = $scope.pbsc;
   var item = pbsc.rowParams.item;


   self.getTermsDescription = function () {
      if (self.shipto.termstype) {
         var sastaParams = {
            codeiden: 't',
            codeval: self.shipto.termstype,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               self.termsdescription = sasta.descrip;
            }
         });
      }
   };

   self.getCreditBalances = function (custno, shipto) {
      var creditavailCriteria = {
         custno: custno,
         shipto: shipto,
         groupid: '',
         totalty: 'S',
         userfield: ''
      };
      DataService.post('api/ar/asarinquiry/calconordercreditavail', { data: creditavailCriteria, busy: true }, function (data) {
         if (data) {
            self.creditavail = data;
         }
      });
   };

   if (item && item.custno && item.shipto) {
      var arssparams = {
         custno: item.custno,
         shipto: item.shipto
      };
      DataService.get('api/ar/arss/getbypk', { params: arssparams, busy: true }, function (arss) {
         if (arss) {
            self.shipto = arss;
            self.getTermsDescription();
            self.getCreditBalances(arss.custno, arss.shipto);
         }
      });
   }
});

app.controller('AricReceivablesByJobCtrl', function ($scope, DataService, ConfigService) {
   var self = this;
   var base = $scope.base;

   if (base.criteria.custno) {
      var params = {
         custno: base.criteria.custno,
         state: '',
         city: '',
         batchsize: ConfigService.getDefaultRecordLimit()
      };
      DataService.get('api/ar/arss/listbyaddr', { params: params, busy: true }, function (data) {
         if (data) {
            self.shiptos = data;
         }
      });
   }

   self.jobidFormatter = function (row, cell, value) {
      if (value && self.shiptos && self.shiptos[row].jmjobrevno) {
         return value + '-' + self.shiptos[row].jmjobrevno;
      } else {
         return value;
      }
   };

   self.jobCompletionFormatter = function (row, cell, value) {
      if (value && self.shiptos && self.shiptos[row].salesamt) {
         return (Number(self.shiptos[row].salesamt) / Number(value)) * 100;
      } else {
         return 0;
      }
   };
});

app.controller('AricJobDetailCtrl', function ($scope) {
   var self = this;
   var rbjc = $scope.rbjc;
   self.shipto = rbjc.rowParams.item;
});

app.controller('AricCreditExposureCtrl', function ($scope, DataService, ConfigService, Sasc) {
   var self = this;
   var base = $scope.base;
   self.criteria = {
      cono: Sasc.cono,
      custno: null,
      shipto: '',
      groupid: '',
      period: 'All',
      credlim: null,
      totalbalance: null,
      creditmgr: '',
      holdonly: false,
      dsplshipto: false,
      userfield: ''
   };

   self.getCredits = function () {
      self.criteria.custno = base.criteria.custno ? base.criteria.custno : null;
      self.criteria.shipto = base.criteria.shipto ? base.criteria.shipto : '';
      self.criteria.groupid = base.criteria.group ? base.criteria.group : '';
      DataService.post('api/ar/asarinquiry/buildcustcredittt', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.credits = data;
         }
      });
   };

   self.search = function () {
      self.getCredits();
   };

   self.getCredits();
});

app.controller('AricCustomCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;
   self.tablename = 'arsc';
   self.isreadonly = true;
   self.type = 'C';
   self.entity = null;
   self.arsc = null;
   self.arss = null;
   self.arsg = null;

   self.typeChanged = function () {
      if (self.type === 'C') {
         self.tablename = 'arsc';
         self.entity = self.arsc;
      } else if (self.type === 'S') {
         self.tablename = 'arss';
         self.entity = self.arss;
      } else if (self.type === 'G') {
         self.tablename = 'arsg';
         self.entity = self.arsg;
      }
   };

   if (base.criteria.custno) {
      var arscparams = {
         custno: base.criteria.custno,
         fillmode: true
      };
      DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (arsc) {
         self.arsc = arsc;
         self.typeChanged();
      });
   }
   if (base.criteria.custno && base.criteria.shipto) {
      var arssparams = {
         custno: base.criteria.custno,
         shipto: base.criteria.shipto,
         fillmode: true
      };
      DataService.get('api/ar/arss/getbypk', { params: arssparams, busy: true }, function (arss) {
         self.arss = arss;
         self.typeChanged();
      });
   }
   if (base.criteria.group) {
      var arsgparams = {
         groupid: base.criteria.group,
         fillmode: true
      };
      DataService.get('api/ar/arsg/getbypk', { params: arsgparams, busy: true }, function (arsg) {
         self.arsg = arsg;
         self.typeChanged();
      });
   }
});

app.controller('AricGroupCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;

   self.getgroupBalances = function (groupid) {
      var criteria = {
         groupid: groupid,
         userfield: ''
      };
      DataService.post('api/ar/asarinquiry/aricgroupdisplay', { data: criteria, busy: true }, function (data) {
         self.groupdisp = data;
      });
   };

   base.arsg.$promise.then(function () {
      if (base.arsg && base.arsg.groupid) {
         $scope.$watch('base.arsg.groupid', function (newValue) {
            if (newValue === base.criteria.group) {
               self.arsg = base.arsg;
               if (!base.criteria.custno) {
                  base.sublabel = self.arsg.groupid + ' | ' + self.arsg.name;
               }
               self.getgroupBalances(base.arsg.groupid);
            } else {
               self.arsg = null;
               self.groupdisp = null;
            }
         });
      }
   });
});