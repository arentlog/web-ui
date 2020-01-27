'use strict';

app.config(function ($stateProvider, StateProvider, ArTransactionDetailsStateProvider) {
   StateProvider.addInquiryBaseState('gl', 'glij', {
      widgets: ['SEARCH']
   });

   StateProvider.addMasterState('gl', 'glij');
   ArTransactionDetailsStateProvider.addStates('gl', 'glij', 'glij.detail');

   $stateProvider.state('glij.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glij/detail.json');
            },
            controller: 'GlijDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('glij.detail.ap-detail', {
      url: '/ap-detail',
      params: { record: null },
      views: {
         childDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glij/tabs/ap-detail.json');
            },
            controller: 'GlijAPDetailCtrl as vendorGl'
         }
      }
   });

   $stateProvider.state('glij.detail.rv-detail', {
      url: '/rv-detail',
      params: { record: null },
      views: {
         childDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glij/tabs/rv-detail.json');
            },
            controller: 'GlijRVDetailCtrl as grvd'
         }
      }
   });

   $stateProvider.state('glij.detail.gl-detail', {
      url: '/gl-detail',
      params: { record: null },
      views: {
         childDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glij/tabs/gl-detail.json');
            },
            controller: 'GlijGLDetailCtrl as gldtl'
         }
      }
   });

   $stateProvider.state('glij.detail.ic-detail', {
      url: '/ic-detail',
      params: { record: null },
      views: {
         childDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glij/tabs/transaction-detail/transaction-detail.json');
            },
            controller: 'GlijICDetailCtrl as icdtl'
         }
      }
   });

});

app.controller('GlijBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};
   self.sasj = {};
   self.dateToday = new Date();
   self.timezoneclient = self.dateToday.getTimezoneOffset() * -1;

   self.isMaster = function () {
      return $state.is('glij.master');
   };

   self.includesMaster = function () {
      return $state.includes('glij.master');
   };

   self.isDetail = function () {
      return $state.is('glij.detail');
   };

   self.includesDetail = function () {
      return $state.includes('glij.detail');
   };

   self.isAPDetail = function () {
      return $state.is('glij.detail.ap-detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria = {
         jrnlno: 0,
         setno: 0,
         recordlimit: ConfigService.getDefaultRecordLimit()
      };
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      var searchParams = {
          jrnlno: self.criteria.jrnlno
      };

      DataService.get('api/sa/sasj/getbypk', { params: searchParams, busy: true }, function (data) {
         if (data) {
            self.sasj = data;

            var timeParams = {
               sasjrowid: data.rowID,
               timezoneclient: self.timezoneclient
            };
            DataService.post('api/sa/assasetup/journalgettimes', { data: timeParams, busy: true }, function (data) {
               if (data) {
                  self.sasj.opendate = data.opendate;
                  self.sasj.opentime = data.opentime;
                  self.sasj.closedate = data.closedate;
                  self.sasj.closetime = data.closetime;
                  $state.go('^.detail');
               }
            });
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('GlijSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('glij.master');
      }

      // Get data
      base.search();
   };
});

app.controller('GlijMasterCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

});

app.controller('GlijDetailCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.pk) {
       base.criteria.jrnlno = $stateParams.pk;

       if ($stateParams.pk2) {
           base.criteria.setno = $stateParams.pk2;
       }
       base.search();
   }

});

app.controller('GlijJournalCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

});

app.controller('GlijGLCtrl', function ($scope, $state, ConfigService, DataService) {
   var self = this;
   var base = $scope.base;
   self.transGrid = {};
   self.transData = [];
   self.acctno = '';
   self.accType = 0;

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      if (selectedRecord) {
         $state.go('^.detail.gl-detail', { record: selectedRecord });
      }
   };

   self.loadGLTransactions = function () {
      var criteria = {
         jrnlno: base.criteria.jrnlno,
         setno: base.criteria.setno,
         glno: self.acctno,
         dctype: self.accType
      };

      DataService.post('api/gl/asglinquiry/fetchgldetail', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.transData = data;
         }
      });
   };

   self.glInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('glia.detail', { pk: currentRow.glno });
      }
   };

   self.loadGLTransactions();

});

app.controller('GlijGLDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils, Sasc, $translate, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.glRecord = $stateParams.record;

   self.isGLTabReadonly = SecurityService.getSubSecurityLevel('glij', 'GL') < 3;

   self.extendedref = '';
   self.mediainfo = '';
   self.lastupdate = '';

   self.getSubTitle = function () {
      return base.criteria.jrnlno + ' | ' + self.glRecord.glno;
   };

   self.cancel = function () {
      $state.go('glij.detail');
   };

   self.submit = function () {
      if (self.glee) {
         self.splitReferenceData();

         DataService.put('api/gl/glee', { data: self.glee, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('glij.detail');
         });
      }
      else {
         self.createGleeObject();
         self.splitReferenceData();

         DataService.post('api/gl/glee', { data: self.glee, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('glij.detail');
         });
      }
   };

   self.createGleeObject = function () {
      self.glee = {
         keyno: Utils.pad(self.glet.jrnlno, 8),
         transno: self.glet.transno,
         setno: self.glet.setno,
         cono: Sasc.cono,
         reference1: '',
         reference2: '',
         reference3: '',
         reference4: '',
         reference5: '',
         reference6: '',
         reference7: '',
         reference8: '',
         reference9: '',
         reference10: '',
         operinit: null,
         transdt: null,
         transtm: null,
         user1: null,
         user2: null,
         user3: null,
         user4: null,
         user5: null,
         user6: 0,
         user7: 0,
         user8: '',
         user9: null,
         transproc: null,
         rowID: null
      };
   };

   self.splitReferenceData = function () {
      var glreference = ['', '', '', '', '', '', '', '', '', ''];
      if (self.extendedref) {
         var strRoute = self.extendedref;
         var chunkSize = 60;
         var stringLength = strRoute.length;
         var j = 0;
         for (var i = 0; i < stringLength; i += chunkSize) {
            if (i + chunkSize > stringLength) {
               chunkSize = stringLength - i;
            }
            strRoute.substring(i, chunkSize);
            if (strRoute.substring(i, chunkSize)) {
               glreference[j] = strRoute.substring(i, chunkSize);
            }
            j++;
         }
      }
      self.glee.reference1 = glreference[0];
      self.glee.reference2 = glreference[1];
      self.glee.reference3 = glreference[2];
      self.glee.reference4 = glreference[3];
      self.glee.reference5 = glreference[4];
      self.glee.reference6 = glreference[5];
      self.glee.reference7 = glreference[6];
      self.glee.reference8 = glreference[7];
      self.glee.reference9 = glreference[8];
      self.glee.reference10 = glreference[9];
   };

   self.getGlee = function () {
      if (self.glRecord) {
         var keyno = Utils.pad(self.glet.jrnlno, 8);
         var gleeparams = {
            keyno: keyno,
            setno: self.glet.setno,
            transno: self.glet.transno
         };
         DataService.get('api/gl/glee/getbypk', { params: gleeparams, busy: true }, function (data) {
            if (data) {
               self.glee = data;
               self.extendedref = data.reference1 + data.reference2 + data.reference3 + data.reference4 + data.reference5 +
                  data.reference6 + data.reference7 + data.reference8 + data.reference9 + data.reference10;
            }
         });
      }
   };

   self.deleteGlee = function () {
      if (self.glee) {
         DataService.delete('api/gl/glee', { data: self.glee, busy: true }, function () { //ignore jslint - identifier expected
            $state.go('glij.detail');
         });
      }
   };

   self.getGlet = function () {
      if (self.glRecord.gletRowid) {

         DataService.get('api/gl/glet/getbyrowid/' + self.glRecord.gletRowid, { busy: true }, function (data) {
            if (data) {
               self.glet = data;

               var transTime = self.glet.transtm;
               if (self.glet.transtm && self.glet.transtm.length === 4) {
                  transTime = self.glet.transtm.substring(0, 2) + ':' + self.glet.transtm.substring(2, 4);
               }

               self.lastupdate = self.glet.operinit + ' ' + Utils.formatDate(self.glet.transdt) + ' ' + transTime;

               if (data.mediacd > 0) {
                  var sastnparams = {
                     codeiden: 'p',
                     codeval: data.mediacd,
                     fldlist: 'descrip'
                  };
                  DataService.get('api/sa/sastn/getbypk', { params: sastnparams }, function (sastn) {
                     if (sastn && sastn.descrip) {
                        self.mediainfo = sastn.descrip + data.charmediaauth ? $translate.instant('global.authorization.number') + ' - ' + data.charmediaauth : '';
                     }
                  });
               }

               self.getGlee();
            }
         });
      }
   };

   self.getGlet();

});

app.controller('GlijARCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;
   self.criteria = {};

});

app.controller('GlijAPCtrl', function ($scope, $state, ConfigService, DataService, MessageService, UtilsData, $translate) {
   var self = this;
   var base = $scope.base;
   self.criteria = {};
   self.transGrid = {};
   self.dataset = [];
   self.currBalance = 0;
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ap', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   self.loadTransactions = function () {
      if (!self.criteria.jrnlno && !self.criteria.invoicenumber) {
         MessageService.error('global.error', 'error.must.provide.journal.or.invoice');
      }
      else {
         var strTransTypes = self.transTypes.join();
         if (strTransTypes.substring(0, 1) === ',') {
            var length = strTransTypes.length;
            self.criteria.transtypes = strTransTypes.substring(1, length);
         }
         else {
            self.criteria.transtypes = strTransTypes;
         }

         DataService.post('api/ap/asapinquiry/apivcreatetransactions', { data: self.criteria, busy: true }, function (data) {
            if (data) {
               self.dataset = data.apivcreatetransresults;
            }
         });
      }
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      if (selectedRecord) {
         $state.go('^.detail.ap-detail', { record: selectedRecord });
      }
   };

   self.initCriteria = function () {
      self.criteria = {
         checknumber: 0,
         divno: 0,
         fromdata: null,
         invoicenumber: '',
         jrnlno: base.criteria.jrnlno,
         poallsuffixes: false,
         pono: 0,
         posuf: 0,
         recordcountlimit: ConfigService.getDefaultRecordLimit(),
         setno: base.criteria.setno,
         showorigdetail: false,
         statustype: 'active',
         todate: null,
         transtypes: '',
         vendno: 0
      };

      self.transTypes = [];
      self.transTypes.push('');
   };

   self.transactionTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) { //ignore jslint - correct indentation
            case 'IN': //ignore jslint - correct indentation
               return $translate.instant('global.invoice'); //ignore jslint - correct indentation
            case 'SV': //ignore jslint - correct indentation
               return $translate.instant('global.service.charge'); //ignore jslint - correct indentation
            case 'RB': //ignore jslint - correct indentation
               return $translate.instant('global.rebate'); //ignore jslint - correct indentation
            case 'UC': //ignore jslint - correct indentation
               return $translate.instant('global.unapplied.cash'); //ignore jslint - correct indentation
            case 'CD': //ignore jslint - correct indentation
               return $translate.instant('global.cash.on.delivery'); //ignore jslint - correct indentation
            case 'MC': //ignore jslint - correct indentation
               return $translate.instant('global.misc.credit'); //ignore jslint - correct indentation
            case 'CR': //ignore jslint - correct indentation
               return $translate.instant('global.credit.memo'); //ignore jslint - correct indentation
            case 'CK': //ignore jslint - correct indentation
               return $translate.instant('global.check.record'); //ignore jslint - correct indentation
            case 'DB': //ignore jslint - correct indentation
               return $translate.instant('global.debit.memo'); //ignore jslint - correct indentation
            case 'RV': //ignore jslint - correct indentation
               return $translate.instant('global.reversal'); //ignore jslint - correct indentation
            case 'XX': //ignore jslint - correct indentation
               return $translate.instant('global.xx'); //ignore jslint - correct indentation
            case 'PY': //ignore jslint - correct indentation
               return $translate.instant('global.sched.payment'); //ignore jslint - correct indentation
            case 'BC': //ignore jslint - correct indentation
               return $translate.instant('global.batch.costing'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         return value;
      }
   };

   self.statustypeFormatter = function (row, cell, value) {
      switch (value.toUpperCase()) {
         case 'A'://ignore jslint - correct indentation
            return $translate.instant('global.active');//ignore jslint - correct indentation
            break;//ignore jslint - correct indentation

         case 'I'://ignore jslint - correct indentation
            return $translate.instant('global.inactive');//ignore jslint - correct indentation
            break;//ignore jslint - correct indentation

         default://ignore jslint - correct indentation
            return value;//ignore jslint - correct indentation
      }
   };

   self.manualAddrFormatter = function (row, cell, value) {
      if (value) {
         return (value.toUpperCase() === 'M') ? true : false;
      }
   };

   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.ponumber) {
         var poParts = currentRow.ponumber.split('-');
         if (poParts.length === 2) {
            $state.go('poip.detail', { pk: parseInt(poParts[0], 10), pk2: parseInt(poParts[1], 10) });
         }
      }
   };

   self.initCriteria();
   self.loadTransactions();

});

app.controller('GlijAPDetailCtrl', function ($scope, $state, $stateParams, DataService, Utils) {
   var self = this;
   self.record = $stateParams.record;

   self.getSubTitle = function () {
      return self.record.jrnlno + ' | ' + self.record.vendno;
   };

   self.criteria = {};
   self.glGrid = {};
   self.glDataset = [];
   self.manualAddress = {};
   self.transDetail = {};
   self.appoResults = [];
   self.jrnlnosetno = '';
   self.paymentjrnlnosetup = '';
   self.amtdue = 0;
   self.lastupdate = '';

   self.loadData = function () {
      var glParams = {
         jrnlno: self.record.jrnlno,
         setno: self.record.setno
      };

      DataService.post('api/gl/asglinquiry/gldistribution', { data: glParams, busy: true }, function (data) {
         if (data) {
            self.glDataset = data;

            var appoParams = {
               jrnlno: self.record.jrnlno,
               setno: self.record.setno,
               customparam: ''
            };

            DataService.post('api/ap/asapinquiry/appocosting', { data: appoParams, busy: true }, function (data) {
               if (data) {
                  self.appoResults = data;

                  var apemmParams = {
                     jrnlno: self.record.jrnlno,
                     setno: self.record.setno
                  };

                  DataService.get('api/ap/apemm/getbypk', { params: apemmParams, busy: true }, function (data) {
                     if (data) {
                        self.manualAddress = data;
                     }
                  });
               }
            });
         }
      });

      DataService.get('api/ap/apet/getbyrowid/' + self.record.rowidApet, { busy: true }, function (data) {
         if (data) {
            self.transDetail = data;

            if (self.transDetail) {
               self.jrnlnosetno = self.transDetail.jrnlno ? self.transDetail.jrnlno.toString() + ' / ' + self.transDetail.setno.toString() : '';
               self.paymentjrnlnosetup = self.transDetail.pidjrnlno ? self.transDetail.pidjrnlno.toString() + ' / ' + self.transDetail.pidsetno.toString() : '';

               //Ideally this would be in backend logic but there isn't a specialized call available at this time.
               if (self.transDetail.transcd === 0 || self.transDetail.transcd === 5) {
                  self.amtdue = Number(self.transDetail.amount) - Number(self.transDetail.paymtamt) - Number(self.transDetail.discamt);
               } else if (self.transDetail.transcd === 3 && self.transDetail.statustype) {
                  self.amtdue = Number(self.transDetail.amount);
               } else {
                  self.amtdue = 0;
               }
            }

            var transtm = '';
            if (self.transDetail.transtm.length === 4) {
               transtm = self.transDetail.transtm.substring(0, 2) + ':' + self.transDetail.transtm.substring(0, 2);
            }
            else {
               transtm = self.transDetail.transtm;
            }

            var transDate = Utils.formatDate(self.transDetail.transdt); 
            self.lastupdate = self.transDetail.operinit + ' ' + transDate + ' ' + transtm;
         }
      });
   };

   self.loadData();

});

app.controller('GlijICCtrl', function ($scope, $state, $translate, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.selectedModules = ['IC', 'OE', 'PO', 'WT', 'KP', 'VA', 'AP', 'PD'];
   self.selectedTransactions = ['CA', 'IN', 'RE', 'RI', 'RO', 'UN', 'SA'];
   self.unit = 'each';
   self.invty = 'd';

   self.getTransactions = function () {
      var transCriteria = {
         types: self.selectedTransactions.join(),
         modules: self.selectedModules.join(),
         recordcountlimit: ConfigService.getDefaultRecordLimit(),
         jrnlno: base.criteria.jrnlno,
         setno: base.criteria.setno,
         invty: self.invty,
         unit: self.unit
      };

      DataService.post('api/ic/asicwhseprod/createictranstt', { data: transCriteria, busy: true }, function (data) {
         if (data) {
            self.ictransResults = data.createictransttresults;
            self.ictransSingle = data.createictransttsingle;
            if (data.lMoreRecords) {
               MessageService.alert('global.warning', "global.record.count.limit.has.been.reached");
            }
         }
      });
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      if (selectedRecord) {
         $state.go('^.detail.ic-detail', { record: selectedRecord });
      }
   };

   self.navigateToInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         switch (currentRow.cModule.toUpperCase()) { //ignore jslint - correct indentation
            case $translate.instant('global.oe'): //ignore jslint - correct indentation
               $state.go('oeio.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.po'): //ignore jslint - correct indentation
               $state.go('poip.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.wt'): //ignore jslint - correct indentation
               $state.go('wtit.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.kp'): //ignore jslint - correct indentation
               $state.go('kpiw.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.va'): //ignore jslint - correct indentation
               $state.go('vaif.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };

   self.nameHyperLink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         switch (currentRow.cModule.toUpperCase()) { //ignore jslint - correct indentation
            case $translate.instant('global.ap'): //ignore jslint - correct indentation
            case $translate.instant('global.po'): //ignore jslint - correct indentation
               if (currentRow.dVendNo > 0) { //ignore jslint - correct indentation
                  $state.go('apiv.detail', { pk: currentRow.dVendNo }); //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case $translate.instant('global.oe'): //ignore jslint - correct indentation
            case $translate.instant('global.ar'): //ignore jslint - correct indentation
               if (currentRow.custno > 0) { //ignore jslint - correct indentation
                  $state.go('aric.detail', { pk: currentRow.custno }); //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };

   self.getTransactions();
});

app.controller('GlijICDetailCtrl', function ($scope, $state, $stateParams, DataService, $translate, Constants) {
   var self = this;
   self.record = $stateParams.record;
   self.icetForNotes = {};

   self.getSubTitle = function () {
      return $translate.instant('global.journal.number') + Constants.LABEL_DELIMITER + self.record.iJrnlNo + Constants.SUB_TITLE_SEPARATOR +
             $translate.instant('global.set.number') + Constants.LABEL_DELIMITER + self.record.iSetNo;
   };

   //Get or Assign the ICET.NotesId field.  This is a DB Sequence that is the Primary Key if
   //the Notes are used for the ICET Transaction.  If they've gotten to the Transaction Detail screen,
   //we need to assign this so the WebPart can use it if they decide to do something with Notes.  Unfortunately,
   //this means that a sequence is 'burned' for each ICET.  There's no other way around this since we need to have
   //a Sequence available before they go to the Notes screen (which is only a possibility they would go there).
   self.getNotesId = function () {
      self.icetForNotes = {};

      if (self.transdetResult && self.record.cICETRowId !== 0) {
         var requestCriteria = {
            cIcetRowId: self.record.cICETRowId,
            lCreateNoteIdFl: true   //Always assume it's a create.  The backend call will use the id if it finds one.
         };

         //NOTE: This call expects a String Progress Rowid provided by a backend call, not a true Progress RowId
         //Tip: for that scenario, you need the Post call: geticetnotesidbyrowid.)
         DataService.get('api/shared/asnotescom/geticetnotesid/{cIcetRowId}/{lCreateNoteIdFl}', { pathParams: requestCriteria, busy: false }, function (data) {
            if (data) {
               //These are the 5 keys (in order) required for the Context.  For the NotesContext,
               //it uses the NotesId and the Product.  For Business Context, it uses the Whse, Prod,
               //PostDt, and TransType.
               self.icetForNotes.whse = self.record.cWhse;
               self.icetForNotes.prod = self.record.cProd;
               self.icetForNotes.postdt = self.record.dtPosted;
               self.icetForNotes.transtype = self.record.cTransType;
               self.icetForNotes.notesid = data; //Next Sequence # (if create), or existing Sequence # (if exists)
            }
         });
      }
   };

   self.loadTransDetails = function () {
      var params = {
         icetrowid: self.record.cICETRowId,
         invty: null
      };

      DataService.post('api/ic/asicwhseprod/icipfetchtransdetail', { data: params, busy: true }, function (transdetResult) {
         if (transdetResult) {
            self.transdetResult = transdetResult;
            self.getNotesId();
         }
      });
   };

   self.loadTransDetails();
});

app.controller('GlijRVCtrl', function ($scope, $state, ConfigService, DataService, MessageService, UtilsData) {
   var self = this;
   var base = $scope.base;
   self.criteria = { srccodes: ['Aret', 'Apet', 'Poeh', 'Apei', 'Apebc'], division: null, recordcountlimit: ConfigService.getDefaultRecordLimit() };
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('gl', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   self.fetchRv = function () {
      var rvcriteria = {
         jrnlno: base.criteria.jrnlno,
         setno: base.criteria.setno,
         sourcecd: self.criteria.srccodes.join(),
         divno: self.criteria.division ? self.criteria.division : 0,
         recordcountlimit: self.criteria.recordcountlimit
      };

      DataService.post('api/gl/asglinquiry/fetchrvdetail', { data: rvcriteria, busy: true }, function (data) {
         if (data) {
            self.rvResults = data.glinquiryrevalresults;
            self.cWarningMess = data.cWarningMess;
            if (data.lMoreRecords) {
               MessageService.alert('global.warning', "global.record.count.limit.has.been.reached");
            }
         }
      });
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      if (selectedRecord) {
         $state.go('.rv-detail', { record: selectedRecord });
      }
   };

});

app.controller('GlijRVDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, Constants) {
   var self = this;
   var base = $scope.base;
   self.record = $stateParams.record;

   if (self.record) {
      self.subtitle = $translate.instant('global.journal.number') + Constants.LABEL_DELIMITER + self.record.jrnlno + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.set.number') + Constants.LABEL_DELIMITER + self.record.setno;

      var criteria = {
         rowidGletv: self.record.rowidGletv
      };
      DataService.post('api/gl/asglinquiry/fetchrvsubdetail', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.revalsubResult = data;
         }
      });
   }
});

app.controller('GlijCustomCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

});