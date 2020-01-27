'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('wt', 'wtit', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('wt', 'wtit');

   $stateProvider.state('wtit.detail', {
      url: '/detail?id&{pk:int}&{pk2:int}',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtit/detail.json');
            },
            controller: 'WtitDetailCtrl as dtl'
         }
      },
      resolve: {
         accessTest: function ($q, $stateParams, DataService, MessageService, TabService) {
            var deferred = $q.defer();
            if ($stateParams.pk) {
               var crit = {
                  tablename: 'wteh',
                  wtno: $stateParams.pk,
                  wtsuf: $stateParams.pk2
               };

               DataService.post('/web/api/shared/checkhyperlinkaccess', { data: crit, busy: true }, function (data) {
                  if (data.success) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                     MessageService.error('global.error', 'global.security.violations.hyperlink');
                     TabService.closeTab('wtit');
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

   $stateProvider.state('wtit.quickview', {
      url: '/quick-view',
      params: {
         wtno: null,
         wtsuf: null,
         cono: null,
         cono2: null,
         prevState: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/shared/quickview/quickview.json');
            },
            controller: 'WtQuickViewCtrl as quickview'
         }
      }
   });

   $stateProvider.state('wtit.detail.linedetail', {
      url: '/line-detail',
      params: { wtno: null, wtsuf: null, whse: null, selectedLine: null, markupaddonfl: null },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtit/line-detail/line-detail.json');
            },
            controller: 'WtitLineDetailCtrl as wldc'
         }
      }
   });
});

app.controller('WtitBaseCtrl', function ($state, AodataService, $translate, ConfigService, DataService, Utils, SecurityService) {
   var self = this;
   self.criteria = { wtNumber: '', keyword: '' };
   self.isLineDetailTabReadonly = SecurityService.getSubSecurityLevel('wtit', 'Line Detail') < 3;
   self.isLSPMexicoOn = AodataService.getValue("Locally", "LocallyMexicoFl").toLowerCase() === 'yes';

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'wtit',
      rowIdField: 'rowID',
      stateRef: 'wtit.detail',
      title: { label: 'global.transfer.number', valueFunction: 'base.getFullTransferNumber' },
      description: { label: 'global.stage', valueFunction: 'base.getStageDescription' }
   };

   self.isMaster = function () {
      return $state.is('wtit.master');
   };

   self.includesMaster = function () {
      return $state.includes('wtit.master');
   };

   self.isDetail = function () {
      return $state.is('wtit.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wtit.detail');
   };

   self.getFullTransferNumber = function (wteh) {
      if (wteh) {
         return wteh.wtno + '-' + Utils.pad(wteh.wtsuf, 2);
      } else {
         return '';
      }
   };

   self.getStageDescription = function (wteh) {
      if (wteh.stagecd) {
         switch (wteh.stagecd) {
            case 1: //ignore jslint - correct indentation
               return $translate.instant('global.ordered'); //ignore jslint - correct indentation
            case 2: //ignore jslint - correct indentation
               return $translate.instant('global.picked'); //ignore jslint - correct indentation
            case 3: //ignore jslint - correct indentation
               return $translate.instant('global.shipped'); //ignore jslint - correct indentation
            case 4: //ignore jslint - correct indentation
               return $translate.instant('global.pre'); //ignore jslint - correct indentation
            case 5: //ignore jslint - correct indentation
               return $translate.instant('global.exception'); //ignore jslint - correct indentation
            case 6: //ignore jslint - correct indentation
               return $translate.instant('global.received'); //ignore jslint - correct indentation
            case 9: //ignore jslint - correct indentation
               return $translate.instant('global.cancelled'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return ''; //ignore jslint - correct indentation
         }
      } else {
         return wteh.stagecd === 0 ? $translate.instant('global.requested') : '';
      }
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      if (self.criteria.wtNumber) {
         // Find specific Order # when provided and navigate to detail view
         var transferCompleteNumber = self.criteria.wtNumber.split('-');
         var params = {
            wtno: transferCompleteNumber[0],
            wtsuf: transferCompleteNumber[1],
            fillmode: false
         };
         DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (wteh) {
            if (wteh) {
               $state.go('wtit.detail', { id: wteh.rowID });
            }
         });
      } else {
         self.isSimpleSearch = true;
         self.isTrackerSearch = false;
         self.isProductSearch = false;
         if (!self.criteria.keyword) {
            self.criteria.keyword = '0';
         }
         DataService.get('api/wt/aswtinquiry/wtitsimplesearchlist/' + self.criteria.recordlimit + '/' + self.criteria.keyword, { busy: true }, function (data) {
            if (data) {
               self.dataset = data.wtitbuildwtlistresults;
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('WtitSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('wtit.master');
      }

      // Get data
      base.search();
   };
});

app.controller('WtitMasterCtrl', function ($scope, $state, $translate, ConfigService, GridService, DataService, MessageService, Sasoo) {
   var self = this;
   var base = $scope.base;

   // Advanced search criteria object with initial values
   // TODO: default values
   self.advCriteria = {
      irecordcountlimit: ConfigService.getDefaultRecordLimit(),
      cono: Sasoo.cono,
      cono2: Sasoo.cono,
      transtypes: [''],
      stages: [''],
      botypes: ['']
   };

   // List of available search criteria fields
   // TODO: finish
   self.criteriaList = [
      { value: 'shipfmwhse', label: $translate.instant('global.from.warehouse') },
      { value: 'shiptowhse', label: $translate.instant('global.to.warehouse') },
      { value: 'cono', label: $translate.instant('global.from.company') },
      { value: 'cono2', label: $translate.instant('global.to.company') },
      { value: 'transtypes', label: $translate.instant('global.transaction.types') },
      { value: 'stages', label: $translate.instant('global.stage') },
      { value: 'botypes', label: $translate.instant('global.backorder.filter') },
      { value: 'trackerno', label: $translate.instant('global.tracker.number') },
      { value: 'prod', label: $translate.instant('global.product') },
      { value: 'fromduedt', label: $translate.instant('global.due.from') },
      { value: 'toduedt', label: $translate.instant('global.due.to') },
      { value: 'fromenterdt', label: $translate.instant('global.entered.from') },
      { value: 'fromorderdt', label: $translate.instant('global.ordered.from') },
      { value: 'fromshippeddt', label: $translate.instant('global.shipped.from') },
      { value: 'fromreceiptdt', label: $translate.instant('global.receipt.from') },
      { value: 'fromreqshipdt', label: $translate.instant('global.requested.ship.from') },
      { value: 'toenterdt', label: $translate.instant('global.entered.to') },
      { value: 'toorderdt', label: $translate.instant('global.ordered.to') },
      { value: 'toshippeddt', label: $translate.instant('global.shipped.to') },
      { value: 'toreceiptdt', label: $translate.instant('global.receipt.to') },
      { value: 'toreqshipdt', label: $translate.instant('global.requested.ship.to') },
      { value: 'reasoncode', label: $translate.instant('global.reason.code') },
      { value: 'irecordcountlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   // TODO: any?
   self.defaultSelectedCriteria = ['shipfmwhse', 'shiptowhse', 'cono', 'cono2'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      // TODO: finish rowId param or pk param(s)
      $state.go('^.detail', { id: record.rowidWteh });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      base.dataset = [];
      var criteria = angular.copy(self.advCriteria);
      base.isSimpleSearch = false;
      base.isTrackerSearch = false;
      base.isProductSearch = false;
      criteria.wtno = null;
      criteria.wtsuf = null;

      if (criteria.cono !== Sasoo.cono && criteria.cono2 !== Sasoo.cono) {
         MessageService.alertOk('global.alert', 'message.either.from.whse.or.to.whse.must.be.from.your.');
         return;
      }
      // Apply record limit (if cleared by user)
      if (!criteria.irecordcountlimit) {
         criteria.irecordcountlimit = ConfigService.getDefaultRecordLimit();
      }

      // Load list of selected stages
      criteria.stagelist = criteria.stages ? criteria.stages.toString() : '';
      delete criteria.stages;

      // Load list of selected transaction types
      criteria.transtypelist = criteria.transtypes ? criteria.transtypes.toString() : '';
      delete criteria.transtypes;

      // Load list of selected bo types
      criteria.botype = criteria.botypes ? criteria.botypes.toString() : '';
      delete criteria.botypes;

      if (criteria.prod) {
         delete criteria.trackerno;
         base.isProductSearch = true;
         DataService.post('api/wt/aswtinquiry/wtitbuildwtlinelist', { data: criteria, busy: true }, function (data) {
            base.dataset = data.wtitbuildwtlnhdrresults;
         });
      } else if (criteria.trackerno) {
         delete criteria.prod;
         base.isTrackerSearch = true;
         DataService.post('api/wt/aswtinquiry/wtitbuildwttracklist', { data: criteria, busy: true }, function (data) {
            base.dataset = data.wtitbuildwttracklistresults;
         });
      } else {
         base.isSimpleSearch = true;
         delete criteria.trackerno;
         delete criteria.prod;
         DataService.post('api/wt/aswtinquiry/wtitbuildwtlist', { data: criteria, busy: true }, function (data) {
            base.dataset = data.wtitbuildwtlistresults;
         });
      }
   };

   self.quickViewContinue = function (wteh) {
      if (wteh) {
         $state.go('wtit.quickview', {
            wtno: wteh.wtno,
            wtsuf: wteh.wtsuf,
            cono: wteh.cono,
            cono2: wteh.cono2,
            prevState: $state.current.name
         });
      }
   };

   self.quickView = function () {
      if (base.grid.selectedRows().length === 1) {
         //Need to get the record since we don't have the cono/cono2 properties available
         var params = {
            wtno: GridService.getSelectedRecords(base.grid)[0].wtno,
            wtsuf: GridService.getSelectedRecords(base.grid)[0].wtsuf
         };

         DataService.get('api/wt/wteh/getbypk', { params: params }, function (data) {
            if (data) {
               self.quickViewContinue(data);
            }
         });
      }
   };

});

app.controller('WtitDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, OptionSetService) {
   var self = this;
   var base = $scope.base;
   self.addontype1 = '';
   self.addontype2 = '';

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.wteh = DataService.getResource('api/wt/wteh/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         wtno: $stateParams.pk,
         wtsuf: $stateParams.pk2,
         fillmode: true
      };

      base.criteria.wtNumber = base.getFullTransferNumber(params);
      self.wteh = DataService.getResource('api/wt/wteh/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.wteh.$promise.then(function () {
      if (self.wteh) {
         self.subTitle = $translate.instant('global.warehouse.transfer.number') + Constants.LABEL_DELIMITER + base.getFullTransferNumber(self.wteh);

         OptionSetService.getDisplayLabel('WT', 'AddOnType', self.wteh.addontype1, function (label) {
            self.addontype1 = label;
         });

         OptionSetService.getDisplayLabel('WT', 'AddOnType', self.wteh.addontype2, function (label) {
            self.addontype2 = label;
         });
         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.wteh);
      }
   });
});

app.controller('WtitDetailGeneralCtrl', function ($scope, DataService, Sasoo, $translate, MessageService, CommonConverters) {
   var self = this;
   var dtl = $scope.dtl;
   self.leadTime = '';
   self.rushText = '';
   self.getAddrContactCriteria = function (paramdata, tablename, type) {
      return {
         "paramdata": paramdata,
         "tablename": tablename,
         "type": type,
         "updatefl": false
      };
   };


   dtl.wteh.$promise.then(function () {
      self.wteh = dtl.wteh;
      if (dtl.wteh.ignoreltfl) {
         self.leadTime = $translate.instant('global.wtit.ignore.lead.time');
      } else {
         self.leadTime = $translate.instant('global.use.lead.time');
      }

      self.billedOENumber = dtl.wteh.autoaltordno.toString() + '-' + CommonConverters.Suffix.convert(dtl.wteh.autoaltordsuf);

      if (dtl.wteh.drdeldt) {
         self.deliveryDate = dtl.wteh.drdeldt;
      } else if (dtl.wteh.shipdt) {
         self.deliveryDate = dtl.wteh.shipdt;
      } else {
         self.deliveryDate = dtl.wteh.reqshipdt;
      }

      if (dtl.wteh.rushfl) {
         self.rushText = $translate.instant('global.wtit.rush');
      } else {
         self.rushText = $translate.instant('global.no.rush');
      }

      if (dtl.wteh.drdeltm) {
         self.deliveryTime = dtl.wteh.drdeltm.substring(1, 2) + ':' + dtl.wteh.drdeltm.substring(3, 2);
      } else {
         self.deliveryTime = '';
      }

      self.billedStatus = self.setBilledStatus(dtl.wteh.autoaltwhsecd);

      self.addrContactCriteria = self.getAddrContactCriteria('wtno = ' + dtl.wteh.wtno + ' | wtsuf = ' + dtl.wteh.wtsuf, 'wteh', 'Ship From');

      DataService.post('api/shared/assharedinquiry/getaddresscontact', { data: self.addrContactCriteria, busy: true }, function (data) {
         self.shippedFromWarehouse = data;
         self.shippedFromWarehouse.cono = dtl.wteh.cono;
      });

      self.addrContactCriteria = self.getAddrContactCriteria('wtno = ' + dtl.wteh.wtno + ' | wtsuf = ' + dtl.wteh.wtsuf, 'wteh', 'Ship To');

      DataService.post('api/shared/assharedinquiry/getaddresscontact', { data: self.addrContactCriteria, busy: true }, function (data) {
         self.header = data;
         self.header.cono = dtl.wteh.cono2;
      });

      // Load Ship Via Description
      if (dtl.wteh.shipviaty) {
         var params = {
            codeiden: 'S',
            codeval: dtl.wteh.shipviaty,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: params }, function (data) {
            if (data) {
               self.shipViaDescription = data.descrip;
            }
         });
      }

      // Load Reason Code Description
      if (dtl.wteh.reasoncode) {
         var params = {
            codeiden: 'RT',
            codeval: dtl.wteh.reasoncode,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: params }, function (data) {
            if (data) {
               self.reasoncodeDesc = data.descrip;
            }
         });
      }
   });

   self.setBilledStatus = function (billedStatus) {

      switch (billedStatus.toLowerCase()) {
         case 'b': //ignore jslint - correct indentation
            return MessageService.get('global.billed'); //ignore jslint - correct indentation
         case 'o': //ignore jslint - correct indentation
            return MessageService.get('global.open'); //ignore jslint - correct indentation
         case 'i': //ignore jslint - correct indentation
            return MessageService.get('global.incomplete'); //ignore jslint - correct indentation
         case 'e': //ignore jslint - correct indentation
            return MessageService.get('global.error'); //ignore jslint - correct indentation
         default: //ignore jslint - correct indentation
            return ''; //ignore jslint - correct indentation
      }
   };

});

app.controller('WtitDetailWarehouseLogisticsCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var ORDERTYPE_TRANSFER = 't';
   self.whseview = 'S';

   self.loadWLData = function () {
      var criteria = {
         orderno: dtl.wteh.wtno,
         ordersuf: dtl.wteh.wtsuf,
         seqno: 0,
         ordertype: ORDERTYPE_TRANSFER,
         whseview: self.whseview,
         customparam: ''
      };
      // Load WL Inquiry
      DataService.post('api/wl/aswlinquiry/loadwlinquiry', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.unavailableMessage = data.cUnavailableMessage;
            self.wldtlresults = data.loadwlinqdtlresults;

            if (data.loadwlinqhdrresults) {
               self.wlHeader = data.loadwlinqhdrresults[0];
            }
            self.wlSingle = data.loadwlinqsingle;
         }
      });
   };

   dtl.wteh.$promise.then(function () {
      self.loadWLData();
   });

   self.onwhseSelectionChange = function () {
      self.loadWLData();
   };
});

app.controller('WtitDetailLineDetailCtrl', function ($scope, $state, DataService, Sasoo) {
   var self = this;
   var dtl = $scope.dtl;
   var SOURCINGTYPE_KP = 'KP';
   var SOURCINGTYPE_PO = 'PO';
   var SOURCINGTYPE_VA = 'VA';
   var SOURCINGTYPE_OE = 'OE';

   self.loadLineDetails = function () {
      var criteria = {
         wtno: dtl.wteh.wtno,
         wtsuf: dtl.wteh.wtsuf
      };
      DataService.post('api/wt/aswtinquiry/loadwtlinedetail', { data: criteria, busy: true }, function (linedetailResults) {
         if (linedetailResults) {
            self.canSeeCost = function () {
               return self.canSeeCosts();
            };
            self.linedetailResults = linedetailResults;
         }
      });
   };

   self.canSeeCosts = function () {
      return Sasoo.seecostfl;
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('wtit.detail.linedetail', { wtno: dtl.wteh.wtno, wtsuf: dtl.wteh.wtsuf, whse: dtl.wteh.shipfmwhse, selectedLine: record, markupaddonfl: dtl.wteh.markupaddonfl });
   };

   self.onProdHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk2: dtl.wteh.shipfmwhse, pk: currentRow.shipprod });
      }
   };

   self.onQuantityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icia.detail', { pk2: dtl.wteh.shipfmwhse, pk: currentRow.shipprod }, { reload: 'icia.detail' });
      }
   };

   self.onQuantityReceivedHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icia.detail', { pk2: dtl.wteh.shiptowhse, pk: currentRow.shipprod }, { reload: 'icia.detail' });
      }
   };

   self.onRelatedOrderHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderaltno) {
         var orderAltNo = '';
         var orderAltSuf = '';

         //if the orderaltno contains "-"
         if (currentRow.orderaltno.toString().includes('-')) {
            if (currentRow.orderaltno.toString().indexOf('-') > -1) {
               var splitOrder = currentRow.orderaltno.split('-');
               orderAltNo = splitOrder[0];
               orderAltSuf = splitOrder[1];
            } else {
               orderAltNo = currentRow.orderaltno;
            }
         } else {
            orderAltNo = currentRow.orderaltno;

         }
         if (orderAltNo) {
            switch (currentRow.sourcingtype.toUpperCase()) {
               case SOURCINGTYPE_PO: //ignore jslint - correct indentation
                  $state.go('poip.detail', { pk: orderAltNo, pk2: orderAltSuf }); //ignore jslint - correct indentation
                  break; //ignore jslint - correct indentation

               case SOURCINGTYPE_OE: //ignore jslint - correct indentation
                  $state.go('oeio.detail', { pk: orderAltNo, pk2: orderAltSuf }); //ignore jslint - correct indentation
                  break; //ignore jslint - correct indentation

               case SOURCINGTYPE_VA: //ignore jslint - correct indentation
                  $state.go('vaif.detail', { pk: orderAltNo, pk2: orderAltSuf }); //ignore jslint - correct indentation
                  break; //ignore jslint - correct indentation

               case SOURCINGTYPE_KP: //ignore jslint - correct indentation
                  $state.go('kpiw.detail', { pk: orderAltNo, pk2: orderAltSuf }); //ignore jslint - correct indentation
                  break; //ignore jslint - correct indentation
            }
         }
      }
   };

   dtl.wteh.$promise.then(function () {
      self.loadLineDetails();
   });
});

app.controller('WtitLineDetailCtrl', function ($scope, $stateParams, $translate, Constants, DataService) {
   var self = this;
   var base = $scope.base;
   self.wtno = $stateParams.wtno;
   self.wtsuf = $stateParams.wtsuf;
   self.whse = $stateParams.whse;
   self.selectedLine = $stateParams.selectedLine;
   self.isLotVisible = false;
   self.isSerialVisible = false;
   self.isTiesVisible = false;
   self.isNonStockVisible = false;

   self.setSerialLotVisibility = function () {
      var icswParams = {
         prod: self.selectedLine.shipprod,
         whse: self.whse,
         fldlist: 'serlottype'
      };
      DataService.get('api/ic/icsw/getbypk', { params: icswParams, busy: true }, function (icsw) {
         if (icsw) {
            if (icsw.serlottype.toLowerCase() === Constants.LOT) {
               self.isLotVisible = true;
            } else if (icsw.serlottype.toLowerCase() === Constants.SERIAL) {
               self.isSerialVisible = true;
            }
         }
      });
   };

   self.setTiesVisibility = function () {
      var wteolParams = {
         wtno: self.wtno,
         wtsuf: 0,
         lineno: self.selectedLine.lineno,
         seqno: null
      };
      DataService.get('api/wt/wtelo/existsbypk', { params: wteolParams, busy: true }, function (wteol) {
         self.isTiesVisible = wteol;
      });
   };

   self.getwtel = function () {
      var params = {
         wtno: self.wtno,
         wtsuf: self.wtsuf,
         lineno: self.selectedLine.lineno,
         fillmode: true
      };
      self.wtel = DataService.getResource('api/wt/wtel/getbypk', { params: params, busy: true });
   };

   if (self.wtno && self.selectedLine && self.selectedLine.lineno) {
      var lineCriteria = {
         wtno: self.wtno,
         wtsuf: self.wtsuf
      };
      self.subTitle = $translate.instant('global.warehouse.transfer.number') + Constants.LABEL_DELIMITER + base.getFullTransferNumber(lineCriteria) +
         Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.line.number') + Constants.LABEL_DELIMITER + self.selectedLine.lineno;

      self.isNonStockVisible = (self.selectedLine.nonstockty && self.selectedLine.nonstockty.toLowerCase() === 'n');
      self.setSerialLotVisibility();
      self.setTiesVisibility();
      self.getwtel();
   }
});

app.controller('WtitLineDetailHistoryCtrl', function ($scope, $stateParams, DataService) {
   var self = this;
   var wtno = $stateParams.wtno;
   var selectedLine = $stateParams.selectedLine;
   if (wtno && selectedLine && selectedLine.lineno) {
      var lineHistoryCriteria = {
         wtno: wtno,
         lineno: selectedLine.lineno
      };
      DataService.post('api/wt/aswtinquiry/loadwtlinehistory', { data: lineHistoryCriteria, busy: true }, function (lineHistoryResults) {
         self.lineHistoryResults = lineHistoryResults;
      });
   }
});

app.controller('WtitLineDetailExtendedCtrl', function ($scope, $stateParams, DataService, Sasoo) {
   var self = this;
   var wtno = $stateParams.wtno;
   var wtsuf = $stateParams.wtsuf;
   var selectedLine = $stateParams.selectedLine;
   self.markupaddonfl = $stateParams.markupaddonfl;
   self.sasoo = Sasoo;
   if (wtno && selectedLine && selectedLine.lineno) {
      var lineExtendedCriteria = {
         wtno: wtno,
         wtsuf: wtsuf,
         lineno: selectedLine.lineno
      };
      DataService.post('api/wt/aswtinquiry/loadwtlineextended', { data: lineExtendedCriteria, busy: true }, function (lineextResults) {
         self.lineextResults = lineextResults;
      });
   }
});

app.controller('WtitLineDetailNonstockCtrl', function ($scope, $stateParams, DataService) {
   var self = this;
   var wtno = $stateParams.wtno;
   var wtsuf = $stateParams.wtsuf;
   var selectedLine = $stateParams.selectedLine;
   if (wtno && selectedLine && selectedLine.lineno && selectedLine.nonstockty.toLowerCase() === 'n') {
      var lineNonstockCriteria = {
         wtno: wtno,
         wtsuf: wtsuf,
         lineno: selectedLine.lineno
      };
      DataService.post('api/wt/aswtinquiry/loadwtlinenonstock', { data: lineNonstockCriteria, busy: true }, function (nonstockResult) {
         self.nonstockResult = nonstockResult;
      });
   }
});