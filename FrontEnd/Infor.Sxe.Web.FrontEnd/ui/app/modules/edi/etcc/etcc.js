'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('edi', 'etcc', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('edi', 'etcc');

   $stateProvider.state('etcc.quickerrorcorrect', {
      url: '/errorcorrect',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('edi/etcc/tabs/errorcorrect.json');
            },
            controller: 'EtccQuickErrorCorrectCtrl as qCorrect'
         }
      }
   });

   $stateProvider.state('etcc.drilldown', {
      url: '/drilldown',
      params: { drillDownRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('edi/etcc/drilldown.json');
            },
            controller: 'EtccDrillDownCtrl as drldwn'
         }
      }
   });

   $stateProvider.state('etcc.drilldown.detailheader', {
      url: '/detail-header',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('edi/etcc/tabs/data-detail-header.json');
            },
            controller: 'EtccDrillDownDataDetailHeaderCtrl as dethdr'
         }
      }
   });

   $stateProvider.state('etcc.drilldown.detailheader-849i', {
      url: '/detail-header-849i',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('edi/etcc/tabs/data-detail-header-849i.json');
            },
            controller: 'EtccDrillDownDataDetailHeaderCtrl as dethdr'
         }
      }
   });

   $stateProvider.state('etcc.drilldown.detailline', {
      url: '/detail-line',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('edi/etcc/tabs/data-detail-lines.json');
            },
            controller: 'EtccDrillDownDataDetailLineCtrl as detln'
         }
      }
   });

   $stateProvider.state('etcc.drilldown.detailline-849i', {
      url: '/detail-line-849i',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('edi/etcc/tabs/data-detail-lines-849i.json');
            },
            controller: 'EtccDrillDownDataDetailLineCtrl as detln'
         }
      }
   });

   $stateProvider.state('etcc.drilldown.detailnotes', {
      url: '/detail-notes',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('edi/etcc/tabs/data-notes.json');
            },
            controller: 'EtccDrillDownDataDetaiNotesCtrl as nts'
         }
      }
   });
});

app.controller('EtccBaseCtrl', function ($state, $scope, $translate, $filter, ConfigService, GridService, DataService, MessageService, ModalService, SecurityService, Utils, Sasoo) {
   var self = this;
   self.MENU_FUNCTION_ETCC = 'etcc';
  
   self.securityLevelETCC = SecurityService.getSecurityLevel(self.MENU_FUNCTION_ETCC);

   self.moduleDropDownOptions = [];
   self.processTypeDropDownOptions = [];
   self.transactionTypeList = [];
   self.transactionTypeDropDownOptions = [];
   self.transactionStatusDropDownOptions = [];
   self.updateStatusDropDownOptions = [];
   self.startDate = Utils.getCurrentDate();
   self.referenceTitle = MessageService.get('global.reference');
   self.partnerTitle = MessageService.get('global.partner.number');
   self.shipToTitle = MessageService.get('global.ship.to');
   self.salesRepInTitle = MessageService.get('global.sales.rep.in');

   self.isStdGridVisible = false;
   self.isOEGridVisible = false;
   self.isPOGridVisible = false;

   self.criteria = {
      transid: 0,
      module: '',
      proctype: '',
      transtypescreen: '',
      transstat: '',
      updstat: '',
      createdtstart: self.startDate,
      createdtend: '',
      hourfrom: 0,
      minutefrom: 0,
      typefrom: '',
      hourto: 0,
      minuteto: 0,
      typeto: '',
      recordcountlimit: 0
   };

   self.stdDataCriteria = {
      refer: '',
      custpo: '',
      whse: ''
   };

   self.oeDataCriteria = {
      custno: 0,
      shipto: '',
      ordernostring: '',
      orderno: 0,
      ordersuf: 0,
      custpo: '',
      whse: '',
      approvty: '',
      slsrepout: '',
      slsrepin: '',
      duedt: ''
   };

   self.poDataCriteria = {
      vendno: 0,
      shipfmno: 0,
      ponostring: '',
      pono: 0,
      posuf: 0,
      buyer: '',
      whse: '',
      approvty: '',
      duedt: ''
   };

   self.drillDownRecord = {
      docId: 0,
      docNm: '',
      sxxmldocRowid: 0,
      eDIHerrstatusty: '',
      eDIHupdstat: '',
      oEEHapprovty: ''
   };

   self.dataHeaderRecord = {};
   self.dataLineRecord = {};
   self.dataNoteRecord = {};
   self.dataNoteRecordType = '';

   self.isMaster = function () {
      return $state.is('etcc.master');
   };

   self.includesMaster = function () {
      return $state.includes('etcc.master');
   };

   self.isQuickErrorCorrect = function () {
      return $state.is('etcc.quickerrorcorrect');
   };

   self.includesQuickErrorCorrect = function () {
      return $state.includes('etcc.quickerrorcorrect');
   };

   self.isDetail = function () {
      return $state.is('etcc.detail');
   };

   self.includesDetail = function () {
      return $state.includes('etcc.detail');
   };

   self.isDrillDown = function () {
      return $state.is('etcc.drilldown');
   };

   self.isShipToNotesFlagVisible = function () {
      var retn = false;
      if (self.isStdGridVisible || self.isOEGridVisible) {
         retn = true;
      }
      if (self.edi849Grid) {
         retn = false;
      }
      return retn;
   };

   self.isDueDateVisible = function () {
      var retn = false;
      if (self.isOEGridVisible || self.isPOGridVisible) {
         retn = true;
      }
      return retn;
   };

   self.isSalesRepInVisible = function () {
      var retn = false;
      if (self.isOEGridVisible || self.isPOGridVisible) {
         retn = true;
      }
      return retn;
   };

   self.isSalesRepOutVisible = function () {
      var retn = false;
      if (self.isOEGridVisible) {
         retn = true;
      }
      return retn;
   };

   self.isAckReasonVisible = function () {
      var retn = false;
      if (self.isPOGridVisible) {
         retn = true;
      }
      return retn;
   };

   self.isWhseVisible = function () {
      var retn = true;
      if (self.edi849Grid) {
         retn = false;
      }
      return retn;
   };

   self.isApprovalTypeVisible = function () {
      var retn = true;
      if (self.edi849Grid) {
         retn = false;
      }
      return retn;
   };

   self.isStageVisible = function () {
      var retn = true;
      if (self.edi849Grid) {
         retn = false;
      }
      return retn;
   };

   self.isARPVendorNumberVisible = function () {
      var retn = false;
      if (self.isOEGridVisible) {
         retn = true;
      }
      return retn;
   };

   self.changeModeSecurityEnabled = function () {
      var retn = false;
      if (self.securityLevelETCC > 2) {
         retn = true;
      }
      return retn;
   };

   self.canSeeCost = function () {
      return Sasoo.seecostfl;
   };
   
   self.moduleDropDownChanged = function () {
      self.buildProcessTypeDropDown();
   };

   self.processTypeDropDownChanged = function () {
      self.buildTransactionTypeDropDown();
   };

   self.transactionTypeDropDownChanged = function () {
      self.retrieveGridType();
   };

   self.dataSetPrepareHdr = function (docNm, dataRecords) {
      var emptyRecord = {};
      emptyRecord.sxxmldocRowid = null;
                   
      if (docNm === '849i') {
         var dataSets = {
            etccdetdata849ihdr: dataRecords,
            etccdetdata855ihdr: emptyRecord
         };
      } else {
         var dataSets = {
            etccdetdata849ihdr: emptyRecord,
            etccdetdata855ihdr: dataRecords
         };
      }
      return dataSets;           
   };

   self.dataSetPrepareLine = function (docNm, dataRecords) {
      var emptyRecord = {};
      emptyRecord.sxxmldocRowid = null;

      if (docNm === '849i') {
         var dataSets = {
            etccdetdata849iline: dataRecords,
            etccdetdata855iline: emptyRecord
         };
      } else {
         var dataSets = {
            etccdetdata849iline: emptyRecord,
            etccdetdata855iline: dataRecords
         };
      }
      return dataSets;
   };

   self.retrieveGridType = function () {
      var transTypeDesc = '';
      if (self.transactionTypeList) {
         self.transactionTypeList.forEach(function (record) {
            if (record.id === self.criteria.transtypescreen) {
               transTypeDesc = record.descrip;
            }
         });
      }
      var criteria = {
         cModule: self.criteria.module,
         cTransType: self.criteria.transtypescreen,
         cTransTypeDesc: transTypeDesc
      };
      if (transTypeDesc) {
         DataService.post('api/edi/asedientry/etccchoosescreengrid', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.isStdGridVisible = false;
               self.isOEGridVisible = false;
               self.isPOGridVisible = false;
               self.edi849Grid = false;

               if (data === 'std' || data === '810i' || data === '849i') {
                  self.isStdGridVisible = true;
               }
               else if (data === 'po') {
                  self.isPOGridVisible = true;
               }
               else if (data === 'oe') {
                  self.isOEGridVisible = true;
               }

               if (self.isStdGridVisible) {
                  if (data === 'std') {
                     self.referenceTitle = MessageService.get('global.reference');
                     self.partnerTitle = MessageService.get('global.partner.number');
                     self.shipToTitle = MessageService.get('global.ship.to.ship.from.number');
                  } else if (data === '810i') {
                     self.referenceTitle = MessageService.get('global.group.seq.number');
                     self.partnerTitle = MessageService.get('global.vendor.number');
                     self.shipToTitle = MessageService.get('global.group.name');
                  } else if (data === '849i') {
                     self.edi849Grid = true;
                     self.referenceTitle = MessageService.get('global.claim.number');
                     self.partnerTitle = MessageService.get('global.vendor.number');
                     self.shipToTitle = MessageService.get('global.contract.number');            
                  }
                  self.salesRepInTitle = MessageService.get('global.sales.rep.in');
               } else if (self.isOEGridVisible) {
                  self.referenceTitle = MessageService.get('global.order.number');
                  self.partnerTitle = MessageService.get('global.customer.number');
                  self.shipToTitle = MessageService.get('global.ship.to');
                  self.salesRepInTitle = MessageService.get('global.sales.rep.in');
               } else if (self.isPOGridVisible) {
                  self.referenceTitle = MessageService.get('global.purchase.order.number');
                  self.partnerTitle = MessageService.get('global.vendor.number');
                  self.shipToTitle = MessageService.get('global.ship.from.number');
                  self.salesRepInTitle = MessageService.get('global.buyer');
               }
            }
         });
      }
   };

   self.buildUpdateStatusDropDown = function () {
      DataService.get('api/edi/asedientry/etccupdatestatusdropdown', { busy: true }, function (data) {
         self.updateStatusDropDownOptions = [];
         var firstChoice = true;
         var fldListBuilt = [];
         data.forEach(function (record) {
            var obj = {
               label: record.descrip,
               type: 'OPT',
               value: record.id
            };
            fldListBuilt.push(obj);
            if (firstChoice) {
               firstChoice = false;
               self.criteria.updstat = record.id;
            }
         });
         self.updateStatusDropDownOptions = fldListBuilt;
      });
   };

   self.buildTransactionStatusDropDown = function () {
      DataService.get('api/edi/asedientry/etcctransstatusdropdown', { busy: true }, function (data) {
         self.transactionStatusDropDownOptions = [];
         var firstChoice = true;
         var fldListBuilt = [];
         data.forEach(function (record) {
            var obj = {
               label: record.descrip,
               type: 'OPT',
               value: record.id
            };
            fldListBuilt.push(obj);
            if (firstChoice) {
               firstChoice = false;
               self.criteria.transstat = record.id;
            }
         });
         self.transactionStatusDropDownOptions = fldListBuilt;
      });
   };

   self.buildModuleDropDown = function () {
      DataService.get('api/edi/asedientry/etccmoduledropdown', { busy: true }, function (data) {
         if (data) {
            self.moduleDropDownOptions = [];
            var firstChoice = true;
            var fldListBuilt = [];
            data.forEach(function (record) {
               var obj = {
                  label: record.descrip,
                  type: 'OPT',
                  value: record.id
               };
               fldListBuilt.push(obj);
               if (firstChoice) {
                  firstChoice = false;
                  self.criteria.module = record.id;
               }
            });
            self.moduleDropDownOptions = fldListBuilt;
            // If the first module = "<all>", the ID will be a blank.
            self.buildProcessTypeDropDown();
         }
      });
   };

   self.buildProcessTypeDropDown = function () {
      var criteria = {
         cModule: self.criteria.module
      };
      DataService.post('api/edi/asedientry/etccprocesstypedropdown', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.processTypeDropDownOptions = [];
            var firstChoice = true;
            var fldListBuilt = [];
            data.forEach(function (record) {
               var obj = {
                  label: record.descrip,
                  type: 'OPT',
                  value: record.id
               };
               fldListBuilt.push(obj);
               if (firstChoice) {
                  firstChoice = false;
                  self.criteria.proctype = record.id;
               }
            });

            self.processTypeDropDownOptions = fldListBuilt;
            self.buildTransactionTypeDropDown();
         }
      });
   };

   self.buildTransactionTypeDropDown = function () {
      var criteria = {
         cModule: self.criteria.module,
         cProcType: self.criteria.proctype
      };
      DataService.post('api/edi/asedientry/etcctransactiontypedropdown', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.transactionTypeList = data;
            self.transactionTypeDropDownOptions = [];
            var firstChoice = true;
            var fldListBuilt = [];
            data.forEach(function (record) {
               var obj = {
                  label: record.descrip,
                  type: 'OPT',
                  value: record.id
               };
               fldListBuilt.push(obj);
               if (firstChoice) {
                  firstChoice = false;
                  self.criteria.transtypescreen = record.id;
               }
            });

            self.transactionTypeDropDownOptions = $filter('orderBy')(fldListBuilt, 'label');
            self.retrieveGridType();

         }
      });
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.createdtstart = self.startDate;
      self.buildModuleDropDown();
      self.buildTransactionStatusDropDown();
      self.buildUpdateStatusDropDown();
   };

   self.retrieveGridDataBuildTransList = function () {
      self.criteria.transtype = '';
      if (self.transactionTypeList) {
         var list = '';
         self.transactionTypeList.forEach(function (record) {
            if (record.id) {
               if (list) {
                  list = list + ',';
               }
               list = list + record.id;
            }
         });
         self.criteria.transtype = list;
      }
   };
      
   self.quickErrorDocument = {
      sxxmldocRowid: 0,
      primarykey: '',
      secondarykey: '',
      keytype: '',
      eDIHerrcnt: 0,
      eDIHexccnt: 0,
      eDILerrcnt: 0,
      eDILexccnt: 0,
      docNm: '',
      docTxnType: '',
      oEEHstage: ''
   };

   self.quickBannerRecord = {
      sxxmldocRowid: 0,
      batchnm: '',
      keytype: '',
      docstatus: '',
      orderno: 0,
      ordersuf: 0,
      ordernostring: '',
      stagecd: 0,
      stagecdword: '',
      approvty: '',
      whse: '',
      notesfl: '',
      custno: 0,
      shipto: '',
      custpo: '',
      enterdt: '',
      promisedt: '',
      vendno: 0,
      shipfmno: 0,
      orderdt: '',
      ackdt: '',
      ackrsn: ''
   };

   self.quickErrorsTotals = {
      toterr: 0,
      tothdrerr: 0,
      totlnerr: 0,
      totexc: 0,
      tothdrexc: 0,
      totlnexc: 0,
      totinf: 0,
      tothdrinf: 0,
      totlninf: 0
   };

   self.quickErrorCriteria = {
      sxxmldocRowid: 0,
      refresherrors: false,
      erronly: false,
      level: 'a',                // show section (a=All,h=Header,l=Line)
      linenohidden: true,        // line widget hidden
      alllines: true,            // show all lines when at Line level
      lineno: 1,                 // show specific line at Line level
      showall: true,             // include corrected
      showerrors: true,          // show errors
      showexceptions: true,      // show exceptions/warnings
      showinfor: false           // show informational messages
   };

   self.quickFixRecord = {
      docId: 0,
      sxxmldocRowid: 0
   };

   self.quickErrorListReady = false;
   self.returnToQuick = false;
   self.UpdateToQuick = false;
   self.quickErrorDocument = [];
   self.quickSummaryResults = [];
   self.quickCorrectResults = [];
   self.quickCorrectResultsAllErrorsList = [];
   self.quickexprow = {};
         
   self.quickSummaryGridSearch = function () {      
      if (self.quickMode) {
         self.refreshFromErrorCorrectionScreen = false;
         self.quickBuildAllErrors();
      }
   };

   self.quickBuildSummaryRecords = function () { 
      if (self.quickMode) {
         var foundExisting = false;
         var summaryList = [];

         // Loop through list of all errors to create a summary record for each type of error, update the error/corrected count for each 
         self.quickCorrectResultsAllErrorsList.forEach(function (errorRecord) {
            // search for an existing summary record
            foundExisting = false;
            summaryList.forEach(function (summaryRecord) {
               if ((summaryRecord.docNm === errorRecord.docNm) && (summaryRecord.docTxnType === errorRecord.docTxnType) && (summaryRecord.keytype === errorRecord.keytype) &&
                  (summaryRecord.fieldid === errorRecord.fieldid) && (summaryRecord.fieldty === errorRecord.fieldty) && (summaryRecord.errdesc === errorRecord.errdesc)) {
                  foundExisting = true;

                  // Summary record already exists so just update the error/corrected count 
                  if (errorRecord.corrected) {
                     summaryRecord.numcorrected += 1;
                  } else {
                     summaryRecord.numoferrors += 1;
                  }
               }
            });
            if (foundExisting === false) {
               // Summary record does not exist - add a new record to quickSummaryResults
               var level = errorRecord.leveldisplay.split(' ');
               var leveldisplay = level[0];

               var newSummaryRecord = {
                  docNm: errorRecord.docNm,
                  docTxnType: errorRecord.docTxnType,
                  keytype: errorRecord.keytype,
                  fieldid: errorRecord.fieldid,
                  fieldty: errorRecord.fieldty,
                  errdesc: errorRecord.errdesc,
                  leveldisplay: leveldisplay,
                  errty: errorRecord.errty,

                  // initialize the error/corrected count
                  numoferrors: errorRecord.corrected ? 0 : 1,
                  numcorrected: errorRecord.corrected ? 1 : 0
               };   
               summaryList.push(newSummaryRecord);               
            }
         });
         
         self.quickSummaryResults = summaryList;
      }
   };
     
   // Watch to see if list is ready and then build the error summary records - it is set after the data is returned from the SI call in the quickBuildErrorList function
   $scope.$watch('base.quickErrorListReady', function (newValue) {
      if (self.quickMode) {
         if (newValue === true) {
            self.quickCorrectResultsAllErrorsList = [];
            self.quickCorrectResults.forEach(function (errorRecord) {
               // List of all errors for every document in the document grid that is not completed
               self.quickCorrectResultsAllErrorsList.push(errorRecord);
            });
                        
            // Build the summary records
            self.quickBuildSummaryRecords();
            self.quickErrorListReady = false;
         }         
      }
   });

   self.quickBuildErrorList = function (document) {
      if (self.quickMode) {
         self.quickErrorListReady = false;
         // Existing errors list, not used by the Quick Error screens
         var quickExistingResultsList = [];
         
         var criteria = {
            sxxmldocRowid: document.sxxmldocRowid,
            refresherrors: false,
            erronly: false,
            level: self.quickErrorCriteria.level,
            linenohidden: self.quickErrorCriteria.linenohidden,
            lineno: self.quickErrorCriteria.lineno,
            showall: self.quickErrorCriteria.showall,
            showerrors: self.quickErrorCriteria.showerrors,
            showexceptions: self.quickErrorCriteria.showexceptions,
            showinfor: self.quickErrorCriteria.showinfor
         };         

         DataService.post('api/edi/asedientry/etccdetailgeterrorslist', { data: { etccdeterrorsresults: quickExistingResultsList, etccdeterrorscriteria: criteria }, busy: true }, function (data) {
            if (data) {

               data.forEach(function (resultsRecord) {

                  // needed for drilldown functions
                  resultsRecord.docId = document.docId;
                  resultsRecord.sxxmldocRowid = document.sxxmldocRowid;

                  // additional fields for expanded screen, etc.
                  resultsRecord.primarykey = document.primarykey;
                  resultsRecord.secondarykey = document.secondarykey;
                  resultsRecord.keytype = document.keytype;
                  resultsRecord.docTxnType = document.docTxnType;
                  resultsRecord.docNm = document.docNm;
                  resultsRecord.oEEHapprovty = document.oEEHapprovty;
                  resultsRecord.oEEHcustno = document.oEEHcustno;
                  resultsRecord.oEEHshipto = document.oEEHshipto;
                  resultsRecord.oEEHcustname = document.oEEHcustname;
                  resultsRecord.oEEHwhse = document.oEEHwhse;
                  resultsRecord.oEEHordernosuf = document.oEEHordernosuf;
                  resultsRecord.oEEHstage = document.oEEHstage;
                  resultsRecord.eDIHerrstatusty = document.eDIHerrstatusty;
                  resultsRecord.eDIHupdstat = document.eDIHupdstat;

                  // indicate the error is correctable - documents such as the 855i can be corrected and resubmitted for Update, notes and comments are not editable at this time but can be Approved or Cancelled
                  resultsRecord.correctable = (resultsRecord.fieldid === 'notesfl' || resultsRecord.fieldid === 'commfl') ? false : document.correctable;
                  resultsRecord.canquickdrilldown = document.correctable;
                  
                  // correct data value - inputted/updated by user, when a value is inputted the error will auto-correct
                  resultsRecord.correctvalue = '';                      

                  self.quickCorrectResults.push(resultsRecord);

                  // Update Banner Totals on Errors Summary screen
                  if (resultsRecord.corrected === false) {                                                                                                              //ignore jslint - correct indentation 
                     switch (resultsRecord.level) {                                                                                                                     //ignore jslint - correct indentation 
                        case true:                                                                                                                                      //ignore jslint - correct indentation 
                           switch (resultsRecord.errty.toLowerCase()) {                                                                                                 //ignore jslint - correct indentation 
                              case 'e':                                                                                                                                 //ignore jslint - correct indentation    
                                 self.quickErrorsTotals.tothdrerr = self.quickErrorCriteria.showerrors ? (self.quickErrorsTotals.tothdrerr += 1) : 0;                   //ignore jslint - correct indentation  
                                 break;                                                                                                                                 //ignore jslint - correct indentation 
                              case 'x':                                                                                                                                 //ignore jslint - correct indentation  
                                 self.quickErrorsTotals.tothdrexc = self.quickErrorCriteria.showexceptions ? (self.quickErrorsTotals.tothdrexc += 1) : 0;               //ignore jslint - correct indentation  
                                 break;                                                                                                                                 //ignore jslint - correct indentation 
                              case 'i':                                                                                                                                 //ignore jslint - correct indentation   
                                 self.quickErrorsTotals.tothdrinf = self.quickErrorCriteria.showinfor ? (self.quickErrorsTotals.tothdrinf += 1) : 0;                    //ignore jslint - correct indentation 
                                 break;                                                                                                                                 //ignore jslint - correct indentation   
                           }                                                                                                                                            //ignore jslint - correct indentation   
                           break;                                                                                                                                       //ignore jslint - correct indentation 
                        case false:                                                                                                                                     //ignore jslint - correct indentation 
                           switch (resultsRecord.errty.toLowerCase()) {                                                                                                 //ignore jslint - correct indentation 
                              case 'e':                                                                                                                                 //ignore jslint - correct indentation   
                                 self.quickErrorsTotals.totlnerr = self.quickErrorCriteria.showerrors ? (self.quickErrorsTotals.totlnerr += 1) : 0;                     //ignore jslint - correct indentation  
                                 break;                                                                                                                                 //ignore jslint - correct indentation 
                              case 'x':                                                                                                                                 //ignore jslint - correct indentation 
                                 self.quickErrorsTotals.totlnexc = self.quickErrorCriteria.showexceptions ? (self.quickErrorsTotals.totlnexc += 1) : 0;                 //ignore jslint - correct indentation    
                                 break;                                                                                                                                 //ignore jslint - correct indentation     
                              case 'i':                                                                                                                                 //ignore jslint - correct indentation   
                                 self.quickErrorsTotals.totlninf = self.quickErrorCriteria.showinfor ? (self.quickErrorsTotals.totlninf += 1) : 0;                      //ignore jslint - correct indentation     
                                 break;                                                                                                                                 //ignore jslint - correct indentation   
                           }                                                                                                                                            //ignore jslint - correct indentation   
                           break;                                                                                                                                       //ignore jslint - correct indentation  
                     }
                     self.quickErrorsTotals.toterr = self.quickErrorCriteria.showerrors ? (self.quickErrorsTotals.tothdrerr + self.quickErrorsTotals.totlnerr) : 0;
                     self.quickErrorsTotals.totexc = self.quickErrorCriteria.showexceptions ? (self.quickErrorsTotals.tothdrexc + self.quickErrorsTotals.totlnexc) : 0;
                     self.quickErrorsTotals.totinf = self.quickErrorCriteria.showinfor ? (self.quickErrorsTotals.tothdrinf + self.quickErrorsTotals.totlninf) : 0;                    
                  }                  
               });
               // List is ready - trigger build of Summary records for this document               
               self.quickErrorListReady = true;
            }
         });
      }
   };

   self.quickBuildAllErrors = function () {
      if (self.quickMode) {
         self.quickErrorsTotals.tothdrerr = 0;
         self.quickErrorsTotals.totlnerr = 0;
         self.quickErrorsTotals.toterr = 0;

         self.quickErrorsTotals.tothdrexc = 0;
         self.quickErrorsTotals.totlnexc = 0;
         self.quickErrorsTotals.totexc = 0;

         self.quickErrorsTotals.tothdrinf = 0;
         self.quickErrorsTotals.totlninf = 0;
         self.quickErrorsTotals.totinf = 0;

         self.quickSummaryResults = [];
         self.quickCorrectResults = [];
         self.quickCorrectResultsAllErrorsList = [];
      
         self.atLeastOneDocumentCorrectable = false;
         
         self.quickErrorListReady = false;
        
         // for each document in the Documents grid that is not 'Cmp' build all errors/exceptions/informational records based on banner criteria on the Errors Summary screen
         self.quickErrorDocument.forEach(function (document) {
            // if any document can be corrected and resubmitted such an edi/ion-bod 855i set a flag to control the grid input sensitivity
            if (document.correctable && self.atLeastOneDocumentCorrectable === false) {
               self.atLeastOneDocumentCorrectable = true;
            }            
            self.quickBuildErrorList(document);
         });         
      }
   };

   self.quickCorrectGridPlaceOnEHold = function (sxxmldocRowid) {
      if (self.quickMode) {

         var docKey = {
            keytype: '',
            primarykey: '',
            secondarykey: ''
         };

         var criteria = {
            rwid: sxxmldocRowid,
            oEEHapprovty: '',
            eDIHerrstatusty: ''
         };

         DataService.post('api/edi/asedientry/etccplaceonehold', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.quickErrorDocument.forEach(function (document) {
                  if (document.sxxmldocRowid === sxxmldocRowid) {
                     docKey.keytype = document.keytype;
                     docKey.primarykey = document.primarykey;
                     docKey.secondarykey = document.secondarykey;

                     document.oEEHapprovty = data.oEEHapprovty;
                  }
               });

               if (docKey.keytype) {
                  // There can be other transactions for the same SX.e document, refresh those Approve values as well 
                  self.quickErrorDocument.forEach(function (document) {
                     if ((document.keytype === docKey.keytype) && (document.primarykey === docKey.primarykey) && (document.secondarykey === docKey.secondarykey)) {
                        document.oEEHapprovty = data.oEEHapprovty;
                     }
                  });
               }
            }
         });
      }
   };

   // Toggle the corrected value for the error.
   // Note that this will trigger an auto-correct of all remaining exceptions for the transaction if only exceptions are left to review and there are no remaining errors.
   // If "Include Corrected" is not included in the Criteria all remaining exceptions will dissapear from the grid. 
   self.quickCorrectGridCorrectionToggle = function (e, args) {
      if (self.quickMode) {         
         var toggleRecord = {};

         if (args.rowData) {
            toggleRecord = args.rowData;
         } else if (args) {
            toggleRecord = args;
         }

         if (toggleRecord) {
            self.quickBannerRecord.sxxmldocRowid = toggleRecord.sxxmldocRowid;

            var docKey = {
               keytype: '',
               primarykey: '',
               secondarykey: ''
            };

            var correction = {
               sxxmldocRowid: toggleRecord.sxxmldocRowid,
               edierowid: toggleRecord.edierowid,
               errdesc: toggleRecord.errdesc,
               corrected: !toggleRecord.corrected,
               errty: toggleRecord.errty,
               // Clear out fields being returned from the SI call.
               refreshapprovty: false,
               approvty: '',
               approvmsg: '',
               rebuildtt: false,
               rebuildttrefresh: false,
               refreshgrid: false,
               placeeholdquest: ''
            };

            DataService.post('api/edi/asedientry/etccdetailerrorscorrection', { data: correction, busy: true }, function (data) {
               if (data) {                 
                  if (!MessageService.processMessaging(data.messaging)) {
                     if (data.etccdeterrorscorrection) {
                        if (data.etccdeterrorscorrection.rebuildtt && (data.etccdeterrorscorrection.placeeholdques === '')) {
                        }

                        if (data.etccdeterrorscorrection.refresherrorcounts) {
                           // performed by self.quickBuildAllErrors                                                                       
                        }

                        if (data.etccdeterrorscorrection.refreshapprovty) {
                           self.quickErrorDocument.forEach(function (document) {
                              // Update the Approve code for selected transaction
                              if (document.sxxmldocRowid === toggleRecord.sxxmldocRowid) {
                                 docKey.keytype = document.keytype;
                                 docKey.primarykey = document.primarykey;
                                 docKey.secondarykey = document.secondarykey;

                                 document.oEEHapprovty = data.etccdeterrorscorrection.approvty;
                              }
                           });

                           if (docKey.keytype) {
                              // There can be other transactions under a different document id for the same SX.e document, refresh those Approve values as well 
                              self.quickErrorDocument.forEach(function (document) {
                                 if ((document.keytype === docKey.keytype) && (document.primarykey === docKey.primarykey) && (document.secondarykey === docKey.secondarykey)) {
                                    document.oEEHapprovty = data.etccdeterrorscorrection.approvty;
                                 }
                              });
                           }
                        }

                        if ((data.etccdeterrorscorrection.placeeholdques) && (toggleRecord.oEEHordernosuf !== '0-00')) {
                           // Normally we prompt the user to place the document on E-Hold. To facilitate the workflow with the Quick Error screens we will do that automatically when they check Corrected
                           self.quickCorrectGridPlaceOnEHold(toggleRecord.sxxmldocRowid);
                           // Recursively call quickCorrectGridCorrectionToggle
                           self.quickCorrectGridCorrectionToggle(e, toggleRecord);
                           return;
                        }

                        if (data.etccdeterrorscorrection.approvmsg) {
                           // Auto-Correct, in this case we want to refresh the error correction grid and set all remaining exceptions for the transaction to corrected and the target document is Approved  
                           self.quickCorrectResults.forEach(function (autoCorrectRecord) {
                              if (autoCorrectRecord.sxxmldocRowid === toggleRecord.sxxmldocRowid) {
                                 autoCorrectRecord.corrected = true;
                              }
                           });
                           MessageService.info('global.information', data.etccdeterrorscorrection.approvmsg);                           
                        }                        
                        
                        // update Grid
                        self.quickCorrect.grid.renderRows(); 
                     }
                  }
               }
            });
         }
      }
   };
      
   self.submitCorrection = function (correction) {
      if (self.quickMode) {
         var canSubmit = false;
                  
         var dataCriteria = {
            sxxmldocRowid: correction.sxxmldocRowid,
            section: correction.level ? 'header' : 'line',
            rcvdfl: true,
            processedfl: false,
            origfl: false,
            histfl: false
         };

         DataService.post('api/edi/asedientry/etccdetailgetdatalist', { data: dataCriteria, busy: true }, function (data) {
            if (data) {               
               // There can be 2 records returned for each section.                
               // 'Rcvd' is the data received for the transaction and must be maintained in pristine as-is condition for audit purposes. 
               // 'Ovrd' is a copy of the 'Rcvd' data that will be overridden to correct the data. We only update data on the 'Ovrd' and normally the UI prevents choosing Update if the record does not exist.
               // If the data was never updated only the 'Rcvd' record will be returned.
               // Note - the SI update programs will now check for a 'Ovrd' record and automatically create one when a change is saved and the record submitted for update. 

               if (dataCriteria.section.toLowerCase() === 'header') {
                  data.etccdetdata849ihdr.forEach(function (headerRecord) {
                     self.dataHeaderRecord = headerRecord;
                     self.dataHeaderRecord.corrected = correction.corrected;
                     canSubmit = true;
                  });
                  data.etccdetdata855ihdr.forEach(function (headerRecord) {
                     self.dataHeaderRecord = headerRecord;
                     self.dataHeaderRecord.corrected = correction.corrected;
                     canSubmit = true;
                  });
                  if (canSubmit) {
                     switch (correction.docNm.toLowerCase()) {
                        case '849i':                                                                                                                    //ignore jslint - correct indentation 
                           correction.section = 'header';                                                                                               //ignore jslint - correct indentation 
                           correction.secseq = 1;                                                                                                       //ignore jslint - correct indentation  
                           self.updateHeader849i(correction);                                                                                           //ignore jslint - correct indentation 
                           break;       
                        case '855i':                                                                                                                    //ignore jslint - correct indentation 
                           correction.section = 'header';                                                                                               //ignore jslint - correct indentation 
                           correction.secseq = 1;                                                                                                       //ignore jslint - correct indentation  
                           self.updateHeader855i(correction);                                                                                           //ignore jslint - correct indentation 
                           break;                                                                                                                       //ignore jslint - correct indentation
                        default:                                                                                                                        //ignore jslint - correct indentation
                           break;                                                                                                                       //ignore jslint - correct indentation 
                     }
                  }
               } else {
                  data.etccdetdata849iline.forEach(function (lineRecord) {
                     if (lineRecord.secseq === correction.lineno) {
                        self.dataLineRecord = lineRecord;
                        self.dataLineRecord.corrected = correction.corrected;
                        canSubmit = true;
                     }
                  });
                  data.etccdetdata855iline.forEach(function (lineRecord) {
                     if (lineRecord.secseq === correction.lineno) {
                        self.dataLineRecord = lineRecord;
                        self.dataLineRecord.corrected = correction.corrected;
                        canSubmit = true;
                     }
                  });
                  if (canSubmit) {
                     switch (correction.docNm.toLowerCase()) {
                        case '849i':                                                                                                                    //ignore jslint - correct indentation   
                           self.updateLine849i(correction);                                                                                             //ignore jslint - correct indentation       
                           break;   
                        case '855i':                                                                                                                    //ignore jslint - correct indentation   
                           self.updateLine855i(correction);                                                                                             //ignore jslint - correct indentation       
                           break;                                                                                                                       //ignore jslint - correct indentation
                        default:                                                                                                                        //ignore jslint - correct indentation 
                           break;                                                                                                                       //ignore jslint - correct indentation 
                     }
                  }
               }
            }
         });
      }
   };

   self.updateHeader849i = function (headerCorrection) {
      if (self.quickMode) {
         switch (headerCorrection.fieldid.toLowerCase()) {
            case 'g-purpose':                                                                                                                          //ignore jslint - correct indentation    
               self.dataHeaderRecord.purpose = headerCorrection.correctvalue;                                                                          //ignore jslint - correct indentation   
               break;                                                                                                                                  //ignore jslint - correct indentation   
            case 'g-vendno':                                                                                                                           //ignore jslint - correct indentation   
               self.dataHeaderRecord.vendno = parseInt(headerCorrection.correctvalue);                                                                 //ignore jslint - correct indentation 
               break;                                                                                                                                  //ignore jslint - correct indentation     
            case 'g-contractno':                                                                                                                       //ignore jslint - correct indentation     
               self.dataHeaderRecord.contractno = headerCorrection.correctvalue;                                                                       //ignore jslint - correct indentation   
               break;                                                                                                                                  //ignore jslint - correct indentation  
            case 'g-contstatcd':                                                                                                                       //ignore jslint - correct indentation   
               self.dataHeaderRecord.contstatcd = headerCorrection.correctvalue;                                                                       //ignore jslint - correct indentation   
               break;                                                                                                                                  //ignore jslint - correct indentation 
            case 'g-validcd':                                                                                                                          //ignore jslint - correct indentation      
               self.dataHeaderRecord.vaildcd = headerCorrection.correctvalue;                                                                          //ignore jslint - correct indentation  
               break;                                                                                                                                  //ignore jslint - correct indentation    
            case 'g-rejectcd':                                                                                                                         //ignore jslint - correct indentation    
               self.dataHeaderRecord.rejectcd = headerCorrection.correctvalue;                                                                         //ignore jslint - correct indentation 
               break;                                                                                                                                  //ignore jslint - correct indentation    
            case 'g-follupcd':                                                                                                                         //ignore jslint - correct indentation   
               self.dataHeaderRecord.followupcd = headerCorrection.correctvalue;                                                                       //ignore jslint - correct indentation  
               break;                                                                                                                                  //ignore jslint - correct indentation  
            case 'g-follupmsg':                                                                                                                        //ignore jslint - correct indentation     
               self.dataHeaderRecord.follupmsg = headerCorrection.correctvalue;                                                                        //ignore jslint - correct indentation 
               break;                                                                                                                                  //ignore jslint - correct indentation   
         }

         // Submit the correct value
         var dataCriteria = self.dataSetPrepareHdr('849i', self.dataHeaderRecord);
    
         DataService.post('api/edi/asedientry/etccdetaildatahdroverrideupdt', { data: dataCriteria, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });        
      }
   };

   self.updateHeader855i = function (headerCorrection) {
      if (self.quickMode) {
         switch (headerCorrection.fieldid.toLowerCase()) {
            case 'g-poty':                                                                                                                             //ignore jslint - correct indentation    
               self.dataHeaderRecord.poty = headerCorrection.correctvalue;                                                                             //ignore jslint - correct indentation   
               break;                                                                                                                                  //ignore jslint - correct indentation   
            case 'g-vendno':                                                                                                                           //ignore jslint - correct indentation   
               self.dataHeaderRecord.vendno = parseInt(headerCorrection.correctvalue);                                                                 //ignore jslint - correct indentation 
               break;                                                                                                                                  //ignore jslint - correct indentation     
            case 'g-partner':                                                                                                                          //ignore jslint - correct indentation     
               self.dataHeaderRecord.partnerid = headerCorrection.correctvalue;                                                                        //ignore jslint - correct indentation   
               break;                                                                                                                                  //ignore jslint - correct indentation  
            case 'g-whse':                                                                                                                             //ignore jslint - correct indentation   
               self.dataHeaderRecord.whse = headerCorrection.correctvalue;                                                                             //ignore jslint - correct indentation   
               break;                                                                                                                                  //ignore jslint - correct indentation 
            case 'g-pono':                                                                                                                             //ignore jslint - correct indentation      
               self.dataHeaderRecord.pono = parseInt(headerCorrection.correctvalue);                                                                   //ignore jslint - correct indentation  
               break;                                                                                                                                  //ignore jslint - correct indentation    
            case 'g-posuf':                                                                                                                            //ignore jslint - correct indentation    
               self.dataHeaderRecord.posuf = parseInt(headerCorrection.correctvalue);                                                                  //ignore jslint - correct indentation 
               break;                                                                                                                                  //ignore jslint - correct indentation    
            case 'g-expshipdt':                                                                                                                        //ignore jslint - correct indentation   
               self.dataHeaderRecord.expshipdt = new Date(headerCorrection.correctvalue);                                                              //ignore jslint - correct indentation  
               break;                                                                                                                                  //ignore jslint - correct indentation  
            case 'g-hdduedt':                                                                                                                          //ignore jslint - correct indentation     
               self.dataHeaderRecord.expduedt = new Date(headerCorrection.correctvalue);                                                               //ignore jslint - correct indentation 
               break;                                                                                                                                  //ignore jslint - correct indentation   
         }                 

         // Submit the correct value
         var dataCriteria = self.dataSetPrepareHdr('855i', self.dataHeaderRecord);

         DataService.post('api/edi/asedientry/etccdetaildatahdroverrideupdt', { data: dataCriteria, busy: true }, function () {                    
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      }
   };

   self.updateLine849i = function (lineCorrection) {
      if (self.quickMode) {
         switch (lineCorrection.fieldid.toLowerCase()) {
            case 'g-claimno':                                                                                                                            //ignore jslint - correct indentation 
               self.dataLineRecord.claimno = parseInt(lineCorrection.correctvalue);                                                                      //ignore jslint - correct indentation    
               break;                                                                                                                                    //ignore jslint - correct indentation    
            case 'g-vendprod':                                                                                                                           //ignore jslint - correct indentation                   
               self.dataLineRecord.vendprod = lineCorrection.correctvalue;                                                                               //ignore jslint - correct indentation          
               break;                                                                                                                                    //ignore jslint - correct indentation       
            case 'g-trendprod':                                                                                                                          //ignore jslint - correct indentation                                                                                                                         
               self.dataLineRecord.trendprod = lineCorrection.correctvalue;                                                                              //ignore jslint - correct indentation          
               break;                                                                                                                                    //ignore jslint - correct indentation    
            case 'g-bcprod':                                                                                                                             //ignore jslint - correct indentation 
               self.dataLineRecord.bcprod = lineCorrection.correctvalue;                                                                                 //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 'g-qty':                                                                                                                                //ignore jslint - correct indentation 
               self.dataLineRecord.qty = Number(lineCorrection.correctvalue);                                                                            //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 'g-qtyuom':                                                                                                                             //ignore jslint - correct indentation 
               self.dataLineRecord.qtyuom = lineCorrection.correctvalue;                                                                                 //ignore jslint - correct indentation    
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 'g-stdprice':                                                                                                                           //ignore jslint - correct indentation 
               self.dataLineRecord.stdprice = Number(lineCorrection.correctvalue);                                                                       //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation    
            case 'g-priceuom':                                                                                                                           //ignore jslint - correct indentation 
               self.dataLineRecord.priceuom = lineCorrection.correctvalue;                                                                               //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation       
            case 'g-exchgrt':                                                                                                                            //ignore jslint - correct indentation 
               self.dataLineRecord.exchgrt = Number(lineCorrection.correctvalue);                                                                        //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 'g-vendinvno':                                                                                                                          //ignore jslint - correct indentation 
               self.dataLineRecord.vendinvno = lineCorrection.correctvalue;                                                                              //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 'g-vendinvdt':                                                                                                                          //ignore jslint - correct indentation     
               self.dataLineRecord.vendinvdt = new Date(lineCorrection.correctvalue);                                                                    //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation   
            case 'g-rebtype':                                                                                                                            //ignore jslint - correct indentation     
               self.dataLineRecord.rebtype = lineCorrection.correctvalue;                                                                                //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation   
            case 'g-itvalidcd':                                                                                                                          //ignore jslint - correct indentation     
               self.dataLineRecord.itvalidcd = lineCorrection.correctvalue;                                                                              //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation   
            case 'g-itrejectcd':                                                                                                                         //ignore jslint - correct indentation     
               self.dataLineRecord.itrejectcd = lineCorrection.correctvalue;                                                                             //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation   
            case 'g-itrejectmsg':                                                                                                                        //ignore jslint - correct indentation     
               self.dataLineRecord.itrejectmsg = lineCorrection.correctvalue;                                                                            //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation   
         }

         var dataCriteria = self.dataSetPrepareLine('849i', self.dataLineRecord);
     
         // Submit the correct value
         DataService.post('api/edi/asedientry/etccdetaildatalineoverrideupdt', { data: dataCriteria, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      }
   };

   self.updateLine855i = function (lineCorrection) {
      if (self.quickMode) {
         switch (lineCorrection.fieldid.toLowerCase()) {
            case 's-lnduedt':                                                                                                                            //ignore jslint - correct indentation 
               self.dataLineRecord.duedt = new Date(lineCorrection.correctvalue);                                                                        //ignore jslint - correct indentation    
               break;                                                                                                                                    //ignore jslint - correct indentation    
            case 's-lineno':                                                                                                                             //ignore jslint - correct indentation    
               self.dataLineRecord.lineno = parseInt(lineCorrection.correctvalue);                                                                       //ignore jslint - correct indentation    
               break;                                                                                                                                    //ignore jslint - correct indentation    
            case 's-vendprod':                                                                                                                           //ignore jslint - correct indentation                   
               self.dataLineRecord.vendprod = lineCorrection.correctvalue;                                                                               //ignore jslint - correct indentation          
               break;                                                                                                                                    //ignore jslint - correct indentation       
            case 'g-shipprod':                                                                                                                           //ignore jslint - correct indentation                                                                                                                         
               self.dataLineRecord.shipprod = lineCorrection.correctvalue;                                                                               //ignore jslint - correct indentation          
               break;                                                                                                                                    //ignore jslint - correct indentation    
            case 's-barcode':                                                                                                                            //ignore jslint - correct indentation 
               self.dataLineRecord.barcode = parseInt(lineCorrection.correctvalue);                                                                      //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 's-qty':                                                                                                                                //ignore jslint - correct indentation 
               self.dataLineRecord.qty = Number(lineCorrection.correctvalue);                                                                            //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 'g-unit':                                                                                                                               //ignore jslint - correct indentation 
               self.dataLineRecord.unit = lineCorrection.correctvalue;                                                                                   //ignore jslint - correct indentation    
               break;                                                                                                                                    //ignore jslint - correct indentation 
            case 's-unitprice':                                                                                                                          //ignore jslint - correct indentation 
               self.dataLineRecord.price = Number(lineCorrection.correctvalue);                                                                          //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation    
            case 'g-priceunit':                                                                                                                          //ignore jslint - correct indentation 
               self.dataLineRecord.priceunit = lineCorrection.correctvalue;                                                                              //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation       
            case 's-lnstatuscd':                                                                                                                         //ignore jslint - correct indentation 
               self.dataLineRecord.statuscd = lineCorrection.correctvalue.toUpperCase();                                                                 //ignore jslint - correct indentation 
               break;                                                                                                                                    //ignore jslint - correct indentation 
         }                                
         var dataCriteria = self.dataSetPrepareLine('855i', self.dataLineRecord);
      
         // Submit the correct value
         DataService.post('api/edi/asedientry/etccdetaildatalineoverrideupdt', { data: dataCriteria, busy: true }, function () {            
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      }
   };
      
   // Perform search and update data set for the grid
   self.search = function () {
      
      self.dataset = [];
            
      self.quickErrorDocument = [];
      self.quickSummaryResults = [];
      self.quickCorrectResults = [];

      self.quickCorrectResultsAllErrorsList = [];      
      
      if (!self.criteria.transtypescreen) {
         self.retrieveGridDataBuildTransList();
      } else {
         self.criteria.transtype = self.criteria.transtypescreen;
      }
      
      if (self.isStdGridVisible) {
         DataService.post('api/edi/asedientry/etccgetdocumentliststd', { data: { etccdoclistcomcriteria: self.criteria, etccdocliststdcriteria: self.stdDataCriteria }, busy: true }, function (data) {
            if (data) {               
               self.dataset = data.etccdoclistresults;
               
               // Build Quick Errors               
               data.etccdoclistresults.forEach(function (document) {                 
                  if (document.eDIHupdstat !== 'Cmp') {
                     self.quickErrorDocument.push(document);                    
                  }
               });                         
               self.quickBuildAllErrors();               
            }
         });
      } else if (self.isOEGridVisible) {
         self.oeDataCriteria.orderno = 0;
         self.oeDataCriteria.ordersuf = 0;
         if (self.oeDataCriteria.ordernostring) {
            var oeParts = self.oeDataCriteria.ordernostring.split('-');
            if (oeParts.length === 2) {
               self.oeDataCriteria.orderno = parseInt(oeParts[0], 10);
               self.oeDataCriteria.ordersuf = parseInt(oeParts[1], 10);
            }
         }

         DataService.post('api/edi/asedientry/etccgetdocumentlistoe', { data: { etccdoclistcomcriteria: self.criteria, etccdoclistoecriteria: self.oeDataCriteria }, busy: true }, function (data) {
            if (data) {
               self.dataset = data.etccdoclistresults;

               // Build Quick Errors               
               data.etccdoclistresults.forEach(function (document) {
                  if (document.eDIHupdstat !== 'Cmp') {
                     self.quickErrorDocument.push(document);
                  }
               });
               self.quickBuildAllErrors();                         
            }
         });
      } else if (self.isPOGridVisible) {

         self.poDataCriteria.pono = 0;
         self.poDataCriteria.posuf = 0;
         if (self.poDataCriteria.ponostring) {
            var poParts = self.poDataCriteria.ponostring.split('-');
            if (poParts.length === 2) {
               self.poDataCriteria.pono = parseInt(poParts[0], 10);
               self.poDataCriteria.posuf = parseInt(poParts[1], 10);
            }
         }
        
         DataService.post('api/edi/asedientry/etccgetdocumentlistpo', { data: { etccdoclistcomcriteria: self.criteria, etccdoclistpocriteria: self.poDataCriteria }, busy: true }, function (data) {
            if (data) {
               self.dataset = data.etccdoclistresults;

               // Build Quick Errors               
               data.etccdoclistresults.forEach(function (document) {
                  if (document.eDIHupdstat !== 'Cmp') {
                     self.quickErrorDocument.push(document);
                  }
               });
               self.quickBuildAllErrors(); 
            }
         });
      }      
   };

   // Perform initialization of search criteria
   self.initCriteria();   
});

app.controller('EtccSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('etcc.master');
      }
      
      base.search();
   };
});

app.controller('EtccMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   
   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   // Called at initialize and when the user clicks the Documents tab
   self.setDocMode = function () {
      self.subTitle = $translate.instant('global.documents');

      // Need to set to Doc Mode first so any Document Mode specific code executes correctly  
      base.docMode = true;
      
      // refresh the grid if coming from Quick Error View Mode (fix me by adding a flag to not always do it)
      if (base.quickMode) {
         base.search();
         base.quickMode = false;
      }

      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('etcc.master');
      }
   };

   // Called when the user clicks the View Errors tab
   self.setQuickMode = function () {
      self.subTitle = $translate.instant('global.errors');

      // Need to set to Quick Mode first so the Search, etc. in Quick Error View works correctly  
      base.quickMode = true;      
      
      // refresh the Quick Error View if coming from Doc Mode 
      if (base.docMode) {         
         base.quickSummaryGridSearch();
         base.docMode = false;
      }    
   };  
  
   self.viewErrorsEnabled = function () {
      var retn = false;
      if (base.grid.isOneRowSelected()) {
         retn = true;
      }
      return retn;
   };

   self.viewErrors = function () {
      if (base.docMode) {
         var record = GridService.getSelectedRecord(base.grid);
         if (record) {
            MessageService.okCancel('global.view.errors', record.statmessageformat, function () {
            });
         }
      }
   };

   self.approveTransaction = function () {
      if (base.docMode) {
         MessageService.okCancel('global.question', 'global.approve.all.exceptions.on.all.selected.transaction', function () {
            var records = GridService.getSelectedRecords(base.grid);
            if (records && records.length) {
               var processingList = [];
               records.forEach(function (record) {
                  processingList.push(
                     {
                        rwid: record.sxxmldocRowid,
                        eDIHerrstatusty: record.eDIHerrstatusty,
                        eDIHupdstat: record.eDIHupdstat,
                        oEEHapprovty: record.oEEHapprovty
                     });
               });

               DataService.post('api/edi/asedientry/etccapprovetransactions', { data: processingList, busy: true }, function (data) {
                  if (data) {
                     if (!MessageService.processMessaging(data.messaging)) {
                        MessageService.info('global.information', 'message.save.operation.completed.successfully');
                        base.search();
                     }
                  }
               });
            }
         });
      }
   };

   self.cancelTransactions = function () {
      if (base.docMode) {
         MessageService.okCancel('global.question', 'message.cancel.all.selected.transactions', function () {
            var records = GridService.getSelectedRecords(base.grid);
            if (records && records.length) {
               var processingList = [];
               records.forEach(function (record) {
                  processingList.push(
                     {
                        rwid: record.sxxmldocRowid,
                        eDIHerrstatusty: record.eDIHerrstatusty,
                        eDIHupdstat: record.eDIHupdstat,
                        oEEHapprovty: record.oEEHapprovty
                     });
               });

               DataService.post('api/edi/asedientry/etcccanceltransactions', { data: processingList, busy: true }, function () {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  base.search();
               });
            }
         });
      }
   };

   self.updateTransactions = function () {
      var msg = MessageService.get('global.approve.all.sections.where.approve.type.is.n');
      MessageService.yesNoCancel('', msg, self.updateTransactionsPromptYes, self.updateTransactionsPromptNo, self.updateTransactionsPromptCancel);
   };

   self.updateTransactionsPromptYes = function () {
      self.updateTransactionsSubmit(true);
   };

   self.updateTransactionsPromptNo = function () {
      self.updateTransactionsSubmit(false);
   };

   self.updateTransactionsPromptCancel = function () {
      MessageService.info('global.information', 'global.update.aborted');
   };

   self.updateTransactionsSubmit = function (updateFlag) {
      if (base.docMode) {
         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length) {
            var processingList = [];
            records.forEach(function (record) {
               processingList.push(
                  {
                     rwid: record.sxxmldocRowid,
                     eDIHerrstatusty: record.eDIHerrstatusty,
                     eDIHupdstat: record.eDIHupdstat,
                     oEEHapprovty: record.oEEHapprovty
                  });
            });

            DataService.post('api/edi/asedientry/etccupdatetransactions', { data: { etccrowids: processingList, lApproveAll: updateFlag, cProcType: base.criteria.proctype }, busy: true }, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  base.search();
               }
            });
         }
      }
   };

   self.deleteRows = function () {
      if (base.docMode) {
         var records = GridService.getSelectedRecords(base.grid);

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            if (records && records.length) {
               var recordsToDelete = [];

               records.forEach(function (record) {
                  recordsToDelete.push(
                     {
                        rwid: record.sxxmldocRowid
                     });
               });

               DataService.post('api/edi/asedientry/etccdocumentdelete', { data: recordsToDelete, busy: true }, function () {
                  base.search();
               });
            }
         });
      }
   };
    
   self.launchEHold = function () {
      if (base.docMode) {
         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length) {
            if (records.length === 1) {
               var criteria = {
                  rwid: records[0].sxxmldocRowid,
                  oEEHapprovty: records[0].oEEHapprovty,
                  eDIHerrstatusty: records[0].eDIHerrstatusty
               };              
               DataService.post('api/edi/asedientry/etccplaceonehold', { data: criteria, busy: true }, function (data) {
                  if (data) {
                     var singleRecord = GridService.getSelectedRecord(base.grid);
                     if (singleRecord) {
                        singleRecord.oEEHapprovty = data.oEEHapprovty;
                        var indx = base.dataset.indexOf(singleRecord);
                        base.grid.updateRow(indx);
                     }
                  }
               });
            } else {
               MessageService.error('global.error', 'message.please.select.a.single.row.for.this.feature');
            }
         }
      }
   };

   self.launchSXeDocument = function () {
      
      var records = GridService.getSelectedRecords(base.grid);
      
      if (records && records.length) {
         if (records.length === 1) {
            // When OEET/POET OEIO/POIP is fully operational, this needs to be re-worked

            if (records[0].primarykey && records[0].keytype.toLowerCase() === 'oe') {
               var launchOEET = false;

               if (records[0].oEEHstage.toLowerCase() === 'ent' ||
                   records[0].oEEHstage.toLowerCase() === 'ord' ||
                   records[0].oEEHstage.toLowerCase() === 'pck') {
                  launchOEET = true;
               }
               var orderNumber = parseInt(records[0].primarykey, 10);
               var orderSuffix = parseInt(records[0].secondarykey, 10);

               if (launchOEET) {               
                  $state.go('oeio.detail', { pk: orderNumber, pk2: orderSuffix });
               }
            } else if (records[0].primarykey && records[0].keytype.toLowerCase() === 'po') {
               var launchPOET = false;

               if (records[0].oEEHstage.toLowerCase() === 'ent' ||
                   records[0].oEEHstage.toLowerCase() === 'ord' ||
                   records[0].oEEHstage.toLowerCase() === 'pck' ||
                   records[0].oEEHstage.toLowerCase() === 'ack' ||
                   records[0].oEEHstage.toLowerCase() === 'pre') {
                  launchPOET = true;
               }

               var docOrderNumber = parseInt(records[0].primarykey, 10);
               var docOrderSuffix = parseInt(records[0].secondarykey, 10);
               if (launchPOET) {                                                                                                                      
                  $state.go('poip.detail', { pk: docOrderNumber, pk2: docOrderSuffix });
               }
            } else {
               MessageService.error('global.error', 'message.only.documents.of.type.oe.or.po.can.be.selected.fo');
            }
         } else {
            MessageService.error('global.error', 'message.please.select.a.single.row.for.this.feature');
         }
      }      
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;

      base.drillDownRecord.docId = record.docId;
      base.drillDownRecord.docNm = record.docNm;
      base.drillDownRecord.sxxmldocRowid = record.sxxmldocRowid;
      base.drillDownRecord.eDIHerrstatusty = record.eDIHerrstatusty;
      base.drillDownRecord.eDIHupdstat = record.eDIHupdstat;
      base.drillDownRecord.oEEHapprovty = record.oEEHapprovty;

      var criteria = {
         rwid: base.drillDownRecord.sxxmldocRowid,
         eDIHerrstatusty: base.drillDownRecord.eDIHerrstatusty,
         eDIHupdstat: base.drillDownRecord.eDIHupdstat,
         oEEHapprovty: base.drillDownRecord.oEEHapprovty
      };

      if (base.quickMode) {
         base.returnToQuick = true;
         base.UpdateToQuick = false;
      } else {
         base.returnToQuick = false;
         base.UpdateToQuick = false;
      }
      
      DataService.post('api/edi/asedientry/etcccheckdrilldownaccess', { data: criteria, busy: true }, function () {
         $state.go('etcc.drilldown', { drillDownRecord: JSON.stringify(base.drillDownRecord) });
      });
   };

   self.placeEholdOptionEnabled = function () {
      // enable or disable the 'Place on E-Hold' action menu option
      if (!base.changeModeSecurityEnabled()) {
         return false;
      }
      if (!base.grid.isOneRowSelected()) {
         // Do not allow 'Place on E-Hold' if multiple rows are selected
         return false;
      }
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         if (singleRecord.eDIHupdstat.toUpperCase() === 'CMP' || singleRecord.eDIHupdstat.toUpperCase() === 'CAN') {
            // Do not allow 'Place on E-Hold' if there is only one selected record and it has a status of complete or cancelled
            return false;
         }
         return true;
      }
      return false;
   };

   self.updateCancelOptionsEnabled = function () {
      // enable or disable the Update' and 'Cancel' action menu options
      if (!base.changeModeSecurityEnabled()) {
         return false;
      }
      if (!base.grid.isOneRowSelected()) {
         // Allow update or cancel when multiple rows are selected
         return true;
      }
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         if (singleRecord.eDIHupdstat.toUpperCase() === 'CMP' || singleRecord.eDIHupdstat.toUpperCase() === 'CAN') {
            // Do not allow update or cancel if there is only one selected record and it has a status of complete or cancelled
            return false;
         }
         return true;
      }
      return false;
   };

   self.approveTransactionsOptionEnabled = function () {
      // enable or disable the 'Approve Exceptions' action menu option
      if (!base.changeModeSecurityEnabled()) {
         return false;
      }
      if (!base.grid.isOneRowSelected()) {
         // Allow 'Approve Exceptions' when multiple rows are selected
         return true;
      }
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         if (singleRecord.eDIHupdstat.toUpperCase() === 'CMP' || singleRecord.eDIHupdstat.toUpperCase() === 'CAN') {
            // Do not allow 'Approve Exceptions' if there is only one selected record and it has a status of complete or cancelled or blank
            return false;
         }
         return true;
      }
      return false;
   };

   self.sxeDocumentOptionEnabled = function () {
      // enable or disable the 'SXe Document' action menu option
      if (base.grid.isOneRowSelected()) {
         return true;
      } else {
         // Disable 'SXe Document' when multiple rows are selected
         return false;
      }
   };
           
   self.quickSummaryGridSearch = function () {      
      if (base.quickMode) {
         base.quickBuildAllErrors();
      }
   };
});


app.controller('EtccDrillDownCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   self.drillDownRecord = JSON.parse($stateParams.drillDownRecord);

   
   self.bannerRecord = {
      sxxmldocRowid: 0,
      docid: 0,
      batchnm: '',
      keytype: '',
      docstatus: '',
      orderno: 0,
      ordersuf: 0,
      ordernostring: '',
      stagecd: 0,
      stagecdword: '',
      approvty: '',
      whse: '',
      notesfl: '',
      custno: 0,
      shipto: '',
      custpo: '',
      enterdt: '',
      promisedt: '',
      vendno: 0,
      shipfmno: 0,
      orderdt: '',
      ackdt: '',
      ackrsn: ''
   };

   self.errorResults = [];
   self.errorsTotals = {
      toterr: 0,
      tothdrerr: 0,
      totlnerr: 0,
      totexc: 0,
      tothdrexc: 0,
      totlnexc: 0,
      totinf: 0,
      tothdrinf: 0,
      totlninf: 0
   };

   self.errorCriteria = {
      sxxmldocRowid: 0,
      refresherrors: false,
      erronly: false,
      level: '',
      linenohidden: false,
      alllines: false,
      lineno: 0,
      showall: false,
      showerrors: false,
      showexceptions: false,
      showinfor: false
   };

   self.dataHeaderResults = [];
   self.dataLineResults = [];
   self.firstDataLineGridSearch = true;
   self.firstErrorLineGridSearch = true;
   self.isDataHeaderGridVisible = false;
   self.isDataLineGridVisible = false;
   self.isStdDataTabVisible = false;
   self.is849iDataTabVisible = false;

   self.dataCriteria = {
      sxxmldocRowid: 0,
      section: '',
      linenohidden: false,
      alllines: false,
      alllineshidden: true,
      lineno: 0,
      rcvdfl: false,
      processedfl: false,
      origfl: false,
      histfl: false
   };

   self.drillDownTitle = '';

   // Data tab for Standard documents with Data editing
   self.isStdDataTabVisible = function () {
      return (base.drillDownRecord.docNm === '855i');
   };

   // Data tab for edi 849i documents with Data editing
   self.is849iDataTabVisible = function () {
      return (base.drillDownRecord.docNm === '849i');
   };

   // Only 2 layouts: PO or OE/Std
   self.isOEGridVisible = false;
   self.isPOGridVisible = false;

   self.IsOEGridVisible = function () {
      return self.isOEGridVisible;
   };

   self.IsPOGridVisible = function () {
      return self.isPOGridVisible;
   };

   self.IsDataHeaderGridVisible = function () {
      return self.isDataHeaderGridVisible;
   };

   self.IsDataLineGridVisible = function () {
      return self.isDataLineGridVisible;
   };

   self.sectionErrorStatsDisplay = function (row, cell, value, column, item) {
      return ((item) && ((item.datasource.toLowerCase() === 'rcvd') || (item.datasource.toLowerCase() === 'ovrd'))) ? true : false;
   };

   // ***** Drill Down view - Common functions
   self.retrieveBannerData = function () {
      DataService.post('api/edi/asedientry/etccdetailbanner', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {            
            self.bannerRecord = data;
            self.bannerRecord.ordernostring = self.bannerRecord.orderno + '-' + Utils.pad(self.bannerRecord.ordernosuf, 2);
            self.drillDownTitle = MessageService.get('global.transaction.detail') + ' - ' + MessageService.get('global.id') + ': ' + self.bannerRecord.docid;

            self.isOEGridVisible = false;
            self.isPOGridVisible = false;
            if (self.bannerRecord.keytype.toLowerCase() === 'po') {
               self.isOEGridVisible = false;
               self.isPOGridVisible = true;
            }
            else
            if (self.bannerRecord.keytype.toLowerCase() === 'pd' && self.is849iDataTabVisible()) {
               self.isOEGridVisible = false;
               self.isPOGridVisible = false;
            }
            else {
               self.isOEGridVisible = true;
               self.isPOGridVisible = false;
            }
            self.buildErrorsTotals();
            self.buildErrorResults();

            self.buildDataResults();
         }
      });
   };

   // First time drilling down
   if (self.drillDownRecord) {
      self.bannerRecord.sxxmldocRowid = self.drillDownRecord.sxxmldocRowid;
      self.errorCriteria.sxxmldocRowid = self.drillDownRecord.sxxmldocRowid;
      self.errorCriteria.level = 'h';
      self.errorCriteria.linenohidden = true;
      self.errorCriteria.alllines = true;
      self.errorCriteria.showall = false;
      self.errorCriteria.showerrors = true;
      self.errorCriteria.showexceptions = true;
      self.errorCriteria.showinfor = false;
      self.errorCriteria.refresherrors = false;

      self.dataCriteria.sxxmldocRowid = self.drillDownRecord.sxxmldocRowid;
      self.dataCriteria.section = 'header';
      self.dataCriteria.linenohidden = true;
      self.dataCriteria.alllines = true;
      self.dataCriteria.lineno = 0;
      self.dataCriteria.rcvdfl = true;
      self.dataCriteria.origfl = true;
      self.isDataHeaderGridVisible = true;
      self.isDataLineGridVisible = false;

      self.retrieveBannerData();
   }

   self.exitDetail = function () {
      if (base.returnToQuick === true) {
         base.returnToQuick = false;
         base.quickSummaryGridSearch();
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         // don't force a refresh since no rows are changed
         $state.go('^.master');
      }
   };

   self.exitUpdate = function () {
      if (base.updateToQuick === true) {
         base.updateToQuick = false;
         base.quickSummaryGridSearch();
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         $state.go('^');
      }
   };

   // ***** Errors Grid functions
   self.buildErrorsTotals = function () {
      DataService.post('api/edi/asedientry/etccdetailgeterrorstotals', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {            
            self.errorsTotals = data;           
         }   
      });
   };

   self.isErrorsApproveTransactionsEnabled = function () {
      var retn = false;
      if (base.changeModeSecurityEnabled) {
         if (self.bannerRecord.approvty.toLowerCase() === 'e') {
            retn = true;
         }
      }
      return retn;
   };

   self.buildErrorResults = function () {
      // Send a local copy of the results list and the "self.errorResults" will be populated when the SI call returns.
      var resultsList = [];
             
      var errorCriteria = {
         sxxmldocRowid: self.errorCriteria.sxxmldocRowid,
         refresherrors: false,
         erronly: false,
         level: self.errorCriteria.level,
         linenohidden: self.errorCriteria.linenohidden,
         lineno: self.errorCriteria.lineno,
         showall: self.errorCriteria.showall,
         showerrors: self.errorCriteria.showerrors,
         showexceptions: self.errorCriteria.showexceptions,
         showinfor: self.errorCriteria.showinfor
      };

      DataService.post('api/edi/asedientry/etccdetailgeterrorslist', { data: { etccdeterrorsresults: resultsList, etccdeterrorscriteria: errorCriteria }, busy: true }, function (data) {
         if (data) {
            self.errorResults = data;            
         }
      });
   };

   self.errorSearch = function () {
      self.buildErrorResults();
   };

   // Section changed in the Error View Criteria
   self.quickSectionChanged = function () {
      if (base.quickErrorCriteria.level === 'l') {
         base.quickErrorCriteria.alllines = true;
         base.quickErrorCriteria.linenohidden = true;
         base.quickErrorCriteria.lineno = 0;
      } else {
         base.quickErrorCriteria.linenohidden = true;
         base.quickErrorCriteria.lineno = 0;
      }
   };

   self.errorSectionChanged = function () {

      if (self.errorCriteria.level === 'l') {
         self.errorCriteria.alllines = true;
         self.errorCriteria.linenohidden = true;
         self.errorCriteria.lineno = 0;
         // First time the user wants to view the Error Grid, "Line" choices, populate the grid (saves them from hitting Search button this first time).
         if (self.firstErrorLineGridSearch) {
            self.firstErrorLineGridSearch = false;
            self.buildErrorResults();
         }
      } else {
         self.errorCriteria.linenohidden = true;
         self.errorCriteria.lineno = 0;
      }
   };

   // All Lines toggled in the Error View Criteria
   self.allLinesChanged = function () {
      if (self.errorCriteria.alllines) {
         self.errorCriteria.linenohidden = true;
         self.errorCriteria.lineno = 0;
      } else {
         self.errorCriteria.linenohidden = false;
         self.errorCriteria.lineno = 1;
      }
   };

   // All Lines toggled in the Data View Criteria
   self.dataAllLinesChanged = function () {      
      if (self.dataCriteria.alllines) {
         self.dataCriteria.linenohidden = true;
         self.dataCriteria.lineno = 0;
      } else {
         self.dataCriteria.linenohidden = false;
         self.dataCriteria.lineno = 1;
      }
   };

   self.placeOnEHold = function () {
      var criteria = {
         rwid: self.bannerRecord.sxxmldocRowid,
         oEEHapprovty: '',
         eDIHerrstatusty: ''
      };
      DataService.post('api/edi/asedientry/etccplaceonehold', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.retrieveBannerData();
         }
      });
   };

   self.lastUpdate = function () {
      var records = GridService.getSelectedRecords(self.errorResultsGrid);
      if (records && records.length) {
         if (records.length === 1) {
            DataService.get('api/edi/edie/getbyrowid/' + records[0].edierowid, { busy: true }, function (data) {
               if (data) {
                  var mess = MessageService.get('global.last.update') + ': ';
                  if (data.transdt) {
                     mess = mess + Utils.formatDate(data.transdt);
                  }

                  if (data.transtm) {
                     mess = mess + ' ' + MessageService.get('global.time') + ': ' + data.transtm.substr(0, 2) + ':' + data.transtm.substr(2, 2);
                  }

                  if (data.operinit) {
                     mess = mess + ' ' + MessageService.get('global.by') + ': ' + data.operinit;
                  }
                  MessageService.okCancel('global.information', mess, function () {
                  });
               }
            });
         } else {
            MessageService.error('global.error', 'message.please.select.a.single.row.for.this.feature');
         }
      }
   };

   self.correctionToggle = function () {      
      var records = GridService.getSelectedRecords(self.errorResultsGrid);
      if (records && records.length) {
         if (records.length === 1) {
            var correction = {
               sxxmldocRowid: self.bannerRecord.sxxmldocRowid,
               edierowid: records[0].edierowid,
               errdesc: records[0].errdesc,
               corrected: records[0].corrected,
               errty: records[0].errty,
               // Clear out fields being returned from the SI call.
               refreshapprovty: false,
               approvty: '',
               approvmsg: '',
               rebuildtt: false,
               rebuildttrefresh: false,
               refreshgrid: false,
               placeeholdquest: ''
            };
            
            DataService.post('api/edi/asedientry/etccdetailerrorscorrection', { data: correction, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     if (data.etccdeterrorscorrection) {

                        if (data.etccdeterrorscorrection.rebuildtt) {
                           self.errorCriteria.refresherrors = data.etccdeterrorscorrection.rebuildttrefresh;
                           self.buildErrorResults();
                        }
                        if (data.etccdeterrorscorrection.refresherrorcounts) {
                           self.buildErrorsTotals();
                        }
                        if (data.etccdeterrorscorrection.refreshapprovty) {
                           self.retrieveBannerData();
                        }
                        if (data.etccdeterrorscorrection.approvmsg) {                           
                           // Auto-correct remaining exceptions for the document
                           MessageService.info('global.information', data.etccdeterrorscorrection.approvmsg);
                        }
                        if (data.etccdeterrorscorrection.placeeholdques) {
                           MessageService.okCancel('global.question', data.etccdeterrorscorrection.placeeholdques, function () {
                              self.placeOnEHold();
                           });

                        }
                     }
                  }
               }
            });
         } else {
            MessageService.error('global.error', 'message.please.select.a.single.row.for.this.feature');
         }
      }
   };

   self.approveTransactions = function () {
      var criteria = {
         sxxmldocRowid: self.bannerRecord.sxxmldocRowid,
         // Clear out fields being returned from the SI call.
         refreshapprovty: false,
         approvty: '',
         approvmsg: '',
         rebuildtt: false,
         rebuildttrefresh: false,
         refreshgrid: false,
         placeeholdquest: ''
      };
      DataService.post('api/edi/asedientry/etccdetailerrorsapprovetran', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.etccdeterrorscorrection) {

                  if (data.etccdeterrorscorrection.rebuildtt) {
                     self.errorCriteria.refresherrors = data.etccdeterrorscorrection.rebuildttrefresh;
                     self.buildErrorResults();
                  }
                  if (data.etccdeterrorscorrection.refresherrorcounts) {
                     self.buildErrorsTotals();
                  }
                  if (data.etccdeterrorscorrection.refreshapprovty) {
                     self.retrieveBannerData();
                  }
                  if (data.etccdeterrorscorrection.approvmsg) {
                     MessageService.info('global.information', data.etccdeterrorscorrection.approvmsg);
                  }
               }
            }
         }
      });
   };

   // ***** Data Grid - Header functions
   
   self.dataSectionChanged = function () {
      if (self.dataCriteria.section.toLowerCase() === 'header') {
         self.isDataHeaderGridVisible = true;
         self.isDataLineGridVisible = false;
         self.dataCriteria.alllines = false;
         self.dataCriteria.alllineshidden = true;
         self.dataCriteria.linenohidden = true;
         self.dataCriteria.lineno = 0;
      } else {
         self.dataCriteria.alllines = true;
         self.dataCriteria.alllineshidden = false;
         self.dataCriteria.linenohidden = true;
         self.dataCriteria.lineno = 0;
         self.isDataHeaderGridVisible = false;
         self.isDataLineGridVisible = true;
                  
         // First time the user wants to view the Data Grid, "Line" choices, populate the grid (saves them from hitting Search button this first time).
         if (self.firstDataLineGridSearch) {
            self.firstDataLineGridSearch = false;
            self.buildDataResults();
         }
      }
   };

   self.buildDataResults = function () {
      
      var criteria = {
         sxxmldocRowid: self.dataCriteria.sxxmldocRowid,
         section: self.dataCriteria.section,
         rcvdfl: self.dataCriteria.rcvdfl,
         processedfl: self.dataCriteria.processedfl,
         origfl: self.dataCriteria.origfl,
         histfl: self.dataCriteria.histfl
      };

      DataService.post('api/edi/asedientry/etccdetailgetdatalist', { data: criteria, busy: true }, function (data) {
         if (data) {    
            if (self.dataCriteria.section === 'header') {
               if (self.is849iDataTabVisible()) {
                  self.dataHeaderResults = data.etccdetdata849ihdr;                 
               } else {
                  self.dataHeaderResults = data.etccdetdata855ihdr;                  
               }
            } else {
               if (!self.dataCriteria.alllines) {
                  var selectedLineData = [];
                  if (self.is849iDataTabVisible()) {
                     data.etccdetdata849iline.forEach(function (lineRecord) {
                        if (lineRecord.secseq === self.dataCriteria.lineno) {
                           selectedLineData.push(lineRecord);
                        }
                     });
                  } else {
                     data.etccdetdata855iline.forEach(function (lineRecord) {
                        if (lineRecord.secseq === self.dataCriteria.lineno) {
                           selectedLineData.push(lineRecord);
                        }
                     });
                  }
                  self.dataLineResults = selectedLineData;
               } else {
                  if (self.is849iDataTabVisible()) {
                     self.dataLineResults = data.etccdetdata849iline;
                  } else {
                     self.dataLineResults = data.etccdetdata855iline;
                  }
               }
            }
         }
      });
   };

   self.dataGridHeaderEditEnabled = function () {
      var retn = false;         
      if (self.dataHeaderResultsGrid) {
         if (self.dataHeaderResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
            if (singleRecord) {
               if (singleRecord.datasource === 'Ovrd' && singleRecord.processedfl === false)
               {
                  retn = true;
               }
            }
         }
      }
      return retn;
   };

   self.dataGridHeaderEdit = function () {      
      var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
      if (singleRecord) {
         base.dataHeaderRecord = singleRecord;
         $state.go('etcc.drilldown.detailheader');
      }
   };

   self.dataGridHeaderEdit849 = function () {
      var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
      if (singleRecord) {
         base.dataHeaderRecord = singleRecord;
         $state.go('etcc.drilldown.detailheader-849i');         
      }
   };

   self.dataGridHeaderOverrideEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataHeaderResultsGrid) {
         if (self.dataHeaderResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
            if (singleRecord) {
               if (singleRecord.datasource === 'Rcvd') {
                  retn = true;
               }
            }
         }
      }
      return retn;
   };

   self.dataGridHeaderOverride = function () {
      var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);     
      if (singleRecord) {
         var dataCriteria = base.dataSetPrepareHdr(singleRecord.docnm, singleRecord);         
         DataService.post('api/edi/asedientry/etccdetaildatacreatehdroverride', { data: dataCriteria, busy: true }, function () {
            self.buildDataResults();
         });      
      }     
   };

   self.dataGridHeaderCancelOverrideEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataHeaderResultsGrid) {
         if (self.dataHeaderResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
            if (singleRecord) {
               if (singleRecord.datasource === 'Ovrd' && singleRecord.processedfl === false) {
                  retn = true;
               }
            }
         }
      }
      return retn;
   };

   self.dataGridHeaderCancelOverride = function () {
      var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
      if (singleRecord) {
         var dataCriteria = base.dataSetPrepareHdr(singleRecord.docnm, singleRecord);
         DataService.post('api/edi/asedientry/etccdetaildatacancelhdroverride', { data: dataCriteria, busy: true }, function () {
            self.buildDataResults();
         });
      }
   };

   self.dataGridHeaderMiscEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataHeaderResultsGrid) {
         if (self.dataHeaderResultsGrid.isAnyRowSelected()) {
            retn = true;
         }
      }
      if (base.drillDownRecord && (base.drillDownRecord.eDIHupdstat.toUpperCase() === 'CMP' || base.drillDownRecord.eDIHupdstat.toUpperCase() === 'CAN')) {
         // disable 'Approved', 'Not Approved', and 'Cancel Update' for complted or cancelled orders. 
         retn = false;
      }
      return retn;
   };

   self.dataGridHeaderMisc = function (type) {
      var ques = '';
      if (type === 'y') {
         ques = MessageService.get('question.set.all.corrections.to.approve.on.all.selected.d');
      } else if (type === 'n') {
         ques = MessageService.get('question.set.all.corrections.to.not.approved.on.all.selec');
      } else {
         ques = MessageService.get('question.set.all.corrections.to.cancel.update.on.all.sele');
      }

      MessageService.okCancel('global.update', ques, function () {
         var docNm = (self.is849iDataTabVisible()) ? '849i' : '855i';
         var records = GridService.getSelectedRecords(self.dataHeaderResultsGrid);        
         var dataCriteria = base.dataSetPrepareHdr(docNm, records);
         dataCriteria.cApproveType = type;
                
         DataService.post('api/edi/asedientry/etccdetaildataheaderapprove', { data: dataCriteria, busy: true }, function (data) {
            if (data) {
               MessageService.info(data);
            }
            self.buildDataResults();           
         });
         
      });
   };

   self.dataGridHeaderTransNotesEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataHeaderResultsGrid) {
         if (self.dataHeaderResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
            if (singleRecord) {
               retn = true;
            }
         }
      }
      return retn;
   };

   self.dataGridHeaderTransNotes = function () {
      var singleRecord = GridService.getSelectedRecord(self.dataHeaderResultsGrid);
      if (singleRecord) {
         base.dataNoteRecord = singleRecord;
         base.dataNoteType = 'header';
         $state.go('etcc.drilldown.detailnotes');
      }
   };

   // ***** Data Grid - line Item functions

   self.dataGridLineEditEnabled = function () {
      var retn = false;      
      if (self.dataLineResultsGrid) {
         if (self.dataLineResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
            if (singleRecord) {               
               if (singleRecord.datasource === 'Ovrd' && singleRecord.processedfl === false) {
                  retn = true;
               }
            }
         }
      }
      return retn;
   };

   self.dataGridLineEdit = function () {
      var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
      if (singleRecord) {
         base.dataLineRecord = singleRecord;
         $state.go('etcc.drilldown.detailline');           
      }
   };

   self.dataGridLineEdit849 = function () {
      var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
      if (singleRecord) {
         base.dataLineRecord = singleRecord;
         $state.go('etcc.drilldown.detailline-849i');
      }
   };

   self.dataGridLineOverrideEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataLineResultsGrid) {
         if (self.dataLineResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
            if (singleRecord) {
               if (singleRecord.datasource === 'Rcvd') {
                  retn = true;
               }
            }
         }
      }
      return retn;
   };

   self.dataGridLineOverride = function () {
      var docNm = (self.is849iDataTabVisible()) ? '849i' : '855i';
      var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
      
      if (singleRecord) {
         var dataCriteria = base.dataSetPrepareLine(docNm, singleRecord);  
         DataService.post('api/edi/asedientry/etccdetaildatacreatelineoverride', { data: dataCriteria, busy: true }, function () {
            self.buildDataResults();
         });
      }
   };

   self.dataGridLineCancelOverrideEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataLineResultsGrid) {
         if (self.dataLineResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
            if (singleRecord) {
               if (singleRecord.datasource === 'Ovrd' && singleRecord.processedfl === false) {
                  retn = true;
               }
            }
         }
      }
      return retn;
   };

   self.dataGridLineCancelOverride = function () {
      var docNm = (self.is849iDataTabVisible()) ? '849i' : '855i';
      var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
      if (singleRecord) {
         var dataCriteria = base.dataSetPrepareLine(docNm, singleRecord);  
         DataService.post('api/edi/asedientry/etccdetaildatacancellineoverride', { data: dataCriteria, busy: true }, function () {
            self.buildDataResults();
         });
      }
   };

   self.dataGridLineMiscEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataLineResultsGrid) {
         if (self.dataLineResultsGrid.isAnyRowSelected()) {
            retn = true;
         }
      }
      if (base.drillDownRecord && (base.drillDownRecord.eDIHupdstat.toUpperCase() === 'CMP' || base.drillDownRecord.eDIHupdstat.toUpperCase() === 'CAN')) {
         // disable 'Approved', 'Not Approved', and 'Cancel Update' for completed or cancelled orders. 
         retn = false;
      }
      return retn;
   };

   self.dataGridLineMisc = function (type) {
      var ques = '';
      if (type === 'y') {
         ques = MessageService.get('question.set.all.corrections.to.approve.on.all.selected.d');
      } else if (type === 'n') {
         ques = MessageService.get('question.set.all.corrections.to.not.approved.on.all.selec');
      } else {
         ques = MessageService.get('question.set.all.corrections.to.cancel.update.on.all.sele');
      }

      MessageService.okCancel('global.update', ques, function () {
         var docNm = (self.is849iDataTabVisible()) ? '849i' : '855i';
         var records = GridService.getSelectedRecords(self.dataLineResultsGrid);
         var dataCriteria = base.dataSetPrepareLine(docNm, records);
         dataCriteria.cApproveType = type;
         
         DataService.post('api/edi/asedientry/etccdetaildatalineapprove', { data: dataCriteria, busy: true }, function (data) {
            if (data) {
               MessageService.info(data);
            }            
            self.buildDataResults();
         });
      });
   };

   self.dataGridLineTransNotesEnabled = function () {
      var retn = false;
      if (base.securityLevelETCC > 2 && self.dataLineResultsGrid) {
         if (self.dataLineResultsGrid.isOneRowSelected()) {
            var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
            if (singleRecord) {
               retn = true;
            }
         }
      }
      return retn;
   };

   self.dataGridLineTransNotes = function () {
      var singleRecord = GridService.getSelectedRecord(self.dataLineResultsGrid);
      if (singleRecord) {
         base.dataNoteRecord = singleRecord;
         base.dataNoteType = 'line';
         $state.go('etcc.drilldown.detailnotes');
      }
   };

   // ***** Data Grid - Common functions

   self.updateTransactions = function () {
      var msg = MessageService.get('global.approve.all.sections.where.approve.type.is.n');
      MessageService.yesNoCancel('', msg, self.updateTransactionsPromptYes, self.updateTransactionsPromptNo, self.updateTransactionsPromptCancel);
   };

   self.updateTransactionsPromptYes = function () {
      self.updateTransactionsSubmit(true);
   };

   self.updateTransactionsPromptNo = function () {
      self.updateTransactionsSubmit(false);
   };

   self.updateTransactionsPromptCancel = function () {
      MessageService.info('global.information', 'global.update.aborted');
   };

   self.updateTransactionsSubmit = function (updateFlag) {
      var processingList = [];
      processingList.push(
      {
         rwid: self.bannerRecord.sxxmldocRowid,
         eDIHupdstat:  base.drillDownRecord.eDIHupdstat
      });

      DataService.post('api/edi/asedientry/etccupdatetransactions', { data: { etccrowids: processingList, lApproveAll: updateFlag, cProcType: base.criteria.proctype }, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('etcc.master');
         }
      });
   };
});

app.controller('EtccDrillDownDataDetailHeaderCtrl', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.returnToState = function () {
      if (base.updateToQuick) {
         base.updateToQuick = false;
         base.quickBuildAllErrors();
         $state.go('etcc.quickerrorcorrect');
      } else if (base.returnToQuick) {
         base.returnToQuick = false;
         base.quickBuildAllErrors();
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         $state.go('^');
      }
   };

   self.exitUpdate = function () {
      if (base.updateToQuick) {
         base.updateToQuick = false;
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         $state.go('^');
      }
   };

   self.submit = function () {
      var dataCriteria = base.dataSetPrepareHdr('855i', base.dataHeaderRecord);
      
      DataService.post('api/edi/asedientry/etccdetaildatahdroverrideupdt', { data: dataCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         if ((!base.updateToQuick) && (!base.returnToQuick)) {
            self.drldwn.buildDataResults();
         }
         self.returnToState();
      });      
   };

   self.submit849i = function () {
      var dataCriteria = base.dataSetPrepareHdr('849i', base.dataHeaderRecord);
      
      DataService.post('api/edi/asedientry/etccdetaildatahdroverrideupdt', { data: dataCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         if ((!base.updateToQuick) && (!base.returnToQuick)) {
            self.drldwn.buildDataResults();
         }
         self.returnToState();
      });      
   };
});

app.controller('EtccDrillDownDataDetailLineCtrl', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;   

   self.returnToState = function () {
      if (base.updateToQuick) {
         base.updateToQuick = false;
         base.quickBuildAllErrors();
         $state.go('etcc.quickerrorcorrect');
      } else if (base.returnToQuick) {
         base.returnToQuick = false;
         base.quickBuildAllErrors();
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         $state.go('^');
      }
   };

   self.exitUpdate = function () {
      if (base.updateToQuick) {
         base.updateToQuick = false;
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         $state.go('^');
      }
   };
      
   self.submit = function () {
      var dataCriteria = base.dataSetPrepareLine('855i', base.dataLineRecord);

      DataService.post('api/edi/asedientry/etccdetaildatalineoverrideupdt', { data: dataCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         if ((!base.updateToQuick) && (!base.returnToQuick)) {
            self.drldwn.buildDataResults();
         }
         self.returnToState();
      });      
   };

   self.submit849i = function () {
      var dataCriteria = base.dataSetPrepareLine('849i', base.dataLineRecord);

      DataService.post('api/edi/asedientry/etccdetaildatalineoverrideupdt', { data: dataCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         if ((!base.updateToQuick) && (!base.returnToQuick)) {
            self.drldwn.buildDataResults();
         }
         self.returnToState();
      });
   };
});

app.controller('EtccDrillDownDataDetaiNotesCtrl', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;
  
   self.noteRecord = {
      sxxmldocRowid: 0,
      section: '',
      secseq: 0,
      secure: 0,
      notedata: '',
      approvety: '',
      approvetycodes: '',
      approvetydescs: '',
      approvetyenabled: false,
      stagecdword: ''
   };
   self.approveTypeDropDownOptions = [];

   // first time in here
   if (self.drldwn) {
      self.noteRecord.sxxmldocRowid = base.drillDownRecord.sxxmldocRowid;
      self.noteRecord.secure = base.securityLevelETCC;
      self.noteRecord.section = self.drldwn.dataCriteria.section;

      if (base.dataNoteType === 'header') {
         self.noteRecord.secseq = base.dataNoteRecord.secseq;
         self.noteRecord.section = 'HEADER';
      } else {
         self.noteRecord.secseq = base.dataNoteRecord.secseq;
         self.noteRecord.section = 'ITEM';
      }

      // if corrected do not allow updates
      var approvetyenabled = !base.drillDownRecord.corrected;
     
      DataService.post('api/edi/asedientry/etccdetaildatagetnotes', { data: self.noteRecord, busy: true }, function (data) {
         if (data) {
            self.noteRecord = data;
            self.noteRecord.approvetyenabled = approvetyenabled;

            if (self.noteRecord.approvetycodes && self.noteRecord.approvetydescs) {
               self.approveTypeDropDownOptions = [];
               var approveTypeCodes = self.noteRecord.approvetycodes.split(',');
               var approveTypeDesc = self.noteRecord.approvetydescs.split(',');
               var approveTypeCodesLen = approveTypeCodes.length;
               var approveTypeDescLen = approveTypeDesc.length;
               var fldListBuilt = [];

               if (approveTypeCodesLen === approveTypeDescLen) {
                  for (var i = 0; i < approveTypeCodesLen; i++) {
                     if (approveTypeCodes[i] && approveTypeDesc[i]) {
                        var obj = {
                           label: approveTypeDesc[i],
                           type: 'OPT',
                           value: approveTypeCodes[i].toLowerCase()
                        };
                        fldListBuilt.push(obj);
                     }
                  }
               }
               self.approveTypeDropDownOptions = fldListBuilt;
            }
         }
      });
   }

   self.returnToState = function () {
      if (base.updateToQuick === true) {
         base.updateToQuick = false;
         base.quickBuildAllErrors();
         $state.go('etcc.quickerrorcorrect');
      } else if (base.returnToQuick === true) {
         base.returnToQuick = false;
         base.quickBuildAllErrors();
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         $state.go('^');
      }
   };

   self.exitUpdate = function () {
      if (base.updateToQuick === true) {
         base.updateToQuick = false;
         $state.go('etcc.quickerrorcorrect');
      }
      else {
         $state.go('^');
      }
   };

   self.submit = function () {
      DataService.post('api/edi/asedientry/etccdetaildatanotesupdate', { data: self.noteRecord, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', data);            
         } else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');            
         }
         self.returnToState();
      });
   };
});

app.controller('CorrectMultipleRowsModalCtrl', function ($scope, DataService, GridService) {
   // alias => cmMo
   var self = this;
   var base = $scope.base;
   var e = {};

   self.submit = function () {
      if (self.correctValue) {
         var records = GridService.getSelectedRecords(base.quickCorrect.grid);        
         records.forEach(function (rowRecord) {
            if (rowRecord.correctable && !rowRecord.corrected) {
               rowRecord.correctvalue = self.correctValue;               
               rowRecord.usetransvalue = false;
               rowRecord.usesxevalue = false;
               base.submitCorrection(rowRecord);
               rowRecord.corrected = true;
               // Update to current value before correction toggle
               var indx = base.quickCorrectResults.indexOf(rowRecord);
               base.quickCorrect.grid.updateRow(indx);
               // Toggle correction value and update the grid
               base.quickCorrectGridCorrectionToggle(e, rowRecord);               
            }            
         });        
         base.correctMultipleRowsModal.destroy();
      }
   };

   self.cancel = function () {
      base.correctMultipleRowsModal.destroy();
   };
});

app.controller('EtccExpandErrorCorrectRowCtrl', function ($scope) {
   // alias => qExp
   var self = this;
   var base = $scope.base;

   self.expandRow = function () {
      base.quickexprow = {};
      base.quickErrorDocument.forEach(function (document) {
         if (document.sxxmldocRowid === base.quickErrorCorrectRowParams.item.sxxmldocRowid) {
            base.quickexprow = document;
         }
      });
   };

   self.expandRow();

});

app.controller('EtccQuickErrorViewCtrl', function ($scope, $state, $stateParams, GridService) {
   // alias => qView
   var self = this;
   var base = $scope.base;

   // Section changed in the Error View Criteria
   self.quickSectionChanged = function () {
      if (base.quickErrorCriteria.level === 'l') {
         base.quickErrorCriteria.alllines = true;
         base.quickErrorCriteria.linenohidden = true;
         base.quickErrorCriteria.lineno = 0;
      } else {
         base.quickErrorCriteria.linenohidden = true;
         base.quickErrorCriteria.lineno = 0;
      }      
   };

   // All Lines toggled in the Error View Criteria
   self.quickAllLinesChanged = function () {
      if (base.quickErrorCriteria.alllines) {
         base.quickErrorCriteria.linenohidden = true;
         base.quickErrorCriteria.lineno = 0;
      } else {
         base.quickErrorCriteria.linenohidden = false;
         base.quickErrorCriteria.lineno = 1;         
      }
   };

   // Search for Document Errors using Error View Criteria
   self.quickSummaryGridSearch = function () {      
      if (base.quickMode) {
         base.refreshFromErrorCorrectionScreen = false;
         base.quickBuildAllErrors();         
      }
   };     
     
   // Filter all errors in the Correct Results Grid by selected records in the Summary Grid
   self.quickSummaryGridFilterAllErrorsBy = function () {
            
      var quickCorrectResults = base.quickCorrectResultsAllErrorsList;      
      var filterErrors = GridService.getSelectedRecords(self.quickSummary.grid);   
      
      if (filterErrors && filterErrors.length) {
         base.quickCorrectResults = [];

         filterErrors.forEach(function (filterError) {
            quickCorrectResults.forEach(function (errorRecord) {
               if ((errorRecord.docNm === filterError.docNm) && (errorRecord.docTxnType === filterError.docTxnType) && (errorRecord.keytype === filterError.keytype) &&
                  (errorRecord.fieldid === filterError.fieldid) && (errorRecord.fieldty === filterError.fieldty) && (errorRecord.errdesc === filterError.errdesc)) {               
                  base.quickCorrectResults.push(errorRecord);
               }
            });
         });

      } else {
         // If no rows selected all errors will be displayed
         base.quickCorrectResults = base.quickCorrectResultsAllErrorsList;
      }
      // Go to Correction View
      $state.go('etcc.quickerrorcorrect');
   };
  

});

app.controller('EtccQuickErrorCorrectCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, Utils, ModalService) {
   // alias => qCorrect
   var self = this;
   var base = $scope.base;

   // Drilldown Error from an error on the Quick Error screen
   // This will take the user in to the Update screen (if available for the document type) to correct the error
   self.quickErrorDrilldown = function (e, args) {
      if (base.quickMode) {
         var record = args[0].item;                

         if (record && record.canquickdrilldown) {

            base.drillDownRecord.docId = record.docId;
            base.drillDownRecord.sxxmldocRowid = record.sxxmldocRowid;
            base.drillDownRecord.eDIHerrstatusty = record.eDIHerrstatusty;
            base.drillDownRecord.eDIHupdstat = record.eDIHupdstat;
            base.drillDownRecord.oEEHapprovty = record.oEEHapprovty;
            base.drillDownRecord.corrected = record.corrected;

            base.dataHeaderResults = [];
            base.dataLineResults = [];
            base.dataHeaderRecord = {};
            base.dataLineRecord = {};

            var dataCriteria = {
               sxxmldocRowid: record.sxxmldocRowid,
               section: record.level ? 'header' : 'line',
               rcvdfl: true,
               processedfl: false,
               origfl: false,
               histfl: false
            };
                   
            DataService.post('api/edi/asedientry/etccdetailgetdatalist', { data: dataCriteria, busy: true }, function (data) {
               if (data) {                  
                  // There can be 2 records returned for each section.                
                  // 'Rcvd' is the data received for the transaction and must be maintained in pristine as-is condition for audit purposes. 
                  // 'Ovrd' is a copy of the 'Rcvd' data that will be overridden to correct the data. We only update data on the 'Ovrd' and normally the UI prevents choosing Update if the record does not exist.
                  // If the data was never updated only the 'Rcvd' record will be returned.
                  // Note - the update programs will now check for a 'Ovrd' record and automatically create one when a change is saved and the record submitted for update. 

                  if (dataCriteria.section.toLowerCase() === 'header') {
                     base.dataHeaderResults = (record.docnm = '849i') ? data.etccdetdata849ihdr : data.etccdetdata855ihdr;
                     base.dataHeaderResults.forEach(function (headerRecord) {
                        base.dataHeaderRecord = headerRecord;
                        base.dataHeaderRecord.corrected = record.corrected;
                     });
                  } else {
                     base.dataLineResults = (record.docnm = '849i') ? data.etccdetdata849iline : data.etccdetdata855iline;
                     base.dataLineResults.forEach(function (lineRecord) {
                        if (lineRecord.lineno === record.lineno) {
                           base.dataLineRecord = lineRecord;
                           base.dataLineRecord.corrected = record.corrected;
                        }
                     });
                  }

                  var criteria = {
                     rwid: base.drillDownRecord.sxxmldocRowid,
                     eDIHerrstatusty: base.drillDownRecord.eDIHerrstatusty,
                     eDIHupdstat: base.drillDownRecord.eDIHupdstat,
                     oEEHapprovty: base.drillDownRecord.oEEHapprovty
                  };

                  base.updateToQuick = true;
                  base.returnToQuick = false;

                  // Drilldown to Update the Error Record Data if feature is allowed                 
                  DataService.post('api/edi/asedientry/etcccheckdrilldownaccess', { data: criteria, busy: true }, function () {                     
                     switch (dataCriteria.section.toLowerCase()) {
                        case 'header':                                                                                                                //ignore jslint - correct indentation 
                           if (record.fieldid === 'notesfl') {                                                                                        //ignore jslint - correct indentation 
                              base.dataNoteRecord.secseq = record.lineno;                                                                             //ignore jslint - correct indentation    
                              base.dataNoteRecord.corrected = record.corrected;                                                                       //ignore jslint - correct indentation 
                              base.dataNoteType = record.leveldisplay.toLowerCase();                                                                  //ignore jslint - correct indentation 
                              $state.go('etcc.drilldown.detailnotes');                                                                                //ignore jslint - correct indentation          
                           } else {                                                                                                                   //ignore jslint - correct indentation       
                              if (record.docNm === '849i') {                                                                                          //ignore jslint - correct indentation
                                 $state.go('etcc.drilldown.detailheader-849i', { drillDownRecord: JSON.stringify(self.drillDownRecord) });            //ignore jslint - correct indentation          
                              } else {                                                                                                                //ignore jslint - correct indentation
                                 $state.go('etcc.drilldown.detailheader', { drillDownRecord: JSON.stringify(self.drillDownRecord) });                 //ignore jslint - correct indentation          
                              }                                                                                                                       //ignore jslint - correct indentation                                     
                           }                                                                                                                          //ignore jslint - correct indentation 
                           break;                                                                                                                     //ignore jslint - correct indentation 
                        case 'line':                                                                                                                  //ignore jslint - correct indentation 
                           if (record.fieldid === 'commfl') {                                                                                         //ignore jslint - correct indentation          
                              base.dataNoteRecord.secseq = record.lineno;                                                                             //ignore jslint - correct indentation    
                              base.dataNoteRecord.corrected = record.corrected;                                                                       //ignore jslint - correct indentation 
                              base.dataNoteType = record.leveldisplay.toLowerCase();                                                                  //ignore jslint - correct indentation 
                              $state.go('etcc.drilldown.detailnotes');                                                                                //ignore jslint - correct indentation    
                           } else {                                                                                                                   //ignore jslint - correct indentation 
                              if (record.docNm === '849i') {                                                                                          //ignore jslint - correct indentation
                                 $state.go('etcc.drilldown.detailline-849i', { drillDownRecord: JSON.stringify(self.drillDownRecord) });              //ignore jslint - correct indentation          
                              } else {                                                                                                                //ignore jslint - correct indentation
                                 $state.go('etcc.drilldown.detailline', { drillDownRecord: JSON.stringify(self.drillDownRecord) });                   //ignore jslint - correct indentation          
                              }                                                                                                                       //ignore jslint - correct indentation
                           }                                                                                                                          //ignore jslint - correct indentation 
                     }
                  });
               }
            });
         } else {           
            MessageService.error('global.error', 'message.transaction.data.cannot.be.changed');
         }
      }
   };

   self.quickCorrectGridUseTransValueToggleIncluded = function () {
      if (base.quickMode) {
         return base.changeModeSecurityEnabled() && base.atLeastOneDocumentCorrectable;
      }
   };

   self.quickCorrectGridUseTransValueToggleVisible = function (row, cell, value, column, item) {
      if (base.quickMode) {         
         if (item) {
            if (base.changeModeSecurityEnabled() && item.edivalue !== '' && item.corrected === false && item.correctable) {
               return true;
            }
         }
         return false;
      }
   };

   self.quickCorrectGridUseTransValueToggleEnabled = function (row, cell, value, column, item) {
      if (base.quickMode) {         
         if (item) {            
            if (item.edivalue !== '' && item.corrected === false && item.correctable) {
               return true;
            }
         }
         return false;
      }
   };

   // Use the Transaction Value as the Corrected Value
   self.quickCorrectGridUseTransValueToggle = function (e, args) {
      if (base.quickMode) {
         if (args.value) {
            // update the grid dataset
            base.quickCorrectResults[args.row].correctvalue = args.rowData.edivalue;

            base.submitCorrection(base.quickCorrectResults[args.row]);
            base.quickCorrectResults[args.row].corrected = true;
            base.quickCorrectGridCorrectionToggle(e, args);

            base.quickCorrectResults[args.row].usesxevalue = false;
         }
      }
   };

   self.quickCorrectGridUseSXValueToggleIncluded = function () {
      if (base.quickMode) {
         return base.changeModeSecurityEnabled() && base.atLeastOneDocumentCorrectable;
      }
   };

   self.quickCorrectGridUseSXValueToggleVisible = function (row, cell, value, column, item) {
      if (base.quickMode) {         
         if (item) {
            if (base.changeModeSecurityEnabled() && item.sxevalue !== '' && item.corrected === false && item.correctable) {
               return true;
            }
         }
         return false;         
      }
   };

   self.quickCorrectGridUseSXValueToggleEnabled = function (row, cell, value, column, item) {
      if (base.quickMode) {        
         if (item) {
            if (item.sxevalue !== '' && item.corrected === false && item.correctable) {
               return true;
            }
         }
         return false;
      }
   };

   // Use the SX.e Value (at the time the error was created) as the Corrected Value
   self.quickCorrectGridUseSXValueToggle = function (e, args) {
      if (base.quickMode) {
         if (args.value) {           
            // update the grid dataset
            base.quickCorrectResults[args.row].correctvalue = args.rowData.sxevalue;
            base.submitCorrection(base.quickCorrectResults[args.row]);
           
            base.quickCorrectResults[args.row].corrected = true;
            base.quickCorrectGridCorrectionToggle(e, args);

            base.quickCorrectResults[args.row].usetransvalue = false;
         }
      }
   };

   self.quickCorrectGridCorrectValueIncluded = function () {
      if (base.quickMode) {
         return base.changeModeSecurityEnabled() && base.atLeastOneDocumentCorrectable;
      }
   };

   self.quickCorrectGridCorrectValueEnabled = function (row, cell, value, column, item) {
      if (base.quickMode) {               
         if (item) {           
            if (item.corrected === false && item.correctable) {
               return true;
            }           
         }
         return false;
      }
   };

   self.quickCorrectGridCorrectValueChanged = function (e, args) {
      if (base.quickMode) {         
         // Note - allow a blank value to clear out a the transaction value such as an Item Reject Reason Code 

         if ((args.value !== args.rowData.edivalue)) { base.quickCorrectResults[args.row].usetransvalue = false; }
         if ((args.value !== args.rowData.sxevalue)) { base.quickCorrectResults[args.row].usesxevalue = false; }

         base.submitCorrection(base.quickCorrectResults[args.row]);
         base.quickCorrectResults[args.row].corrected = true;
         base.quickCorrectGridCorrectionToggle(e, args);
      }
   };
        
   self.quickCorrectGridActionEnabled = function () {
      if (base.quickMode) {
         return (base.quickCorrect.grid.isAnyRowSelected());
      }
   };

   // Show a dialog of the last update to the error
   self.quickCorrectGridLastUpdate = function () {
      if (base.quickMode) {
         var records = GridService.getSelectedRecords(base.quickCorrect.grid);

         if (records && records.length) {
            if (records.length === 1) {
               DataService.get('api/edi/edie/getbyrowid/' + records[0].edierowid, { busy: true }, function (data) {
                  if (data) {
                     var mess = MessageService.get('global.last.update') + ': ';
                     if (data.transdt) {
                        mess = mess + Utils.formatDate(data.transdt);
                     }

                     if (data.transtm) {
                        mess = mess + ' ' + MessageService.get('global.time') + ': ' + data.transtm.substr(0, 2) + ':' + data.transtm.substr(2, 2);
                     }

                     if (data.operinit) {
                        mess = mess + ' ' + MessageService.get('global.by') + ': ' + data.operinit;
                     }
                     MessageService.okCancel('global.information', mess, function () {
                     });
                  }
               });
            } else {
               MessageService.error('global.error', 'message.please.select.a.single.row.for.this.feature');
            }
         }
      }
   };
      
   self.quickCorrectGridCorrectAllSelectedRowsEnabled = function () {
      if (base.quickMode) {
         var retn = false;
         if (base.securityLevelETCC > 2) {
            var records = GridService.getSelectedRecords(base.quickCorrect.grid);

            // if any document can be corrected then enable 
            records.forEach(function (document) {               
               if (document.correctable) {
                  retn = true;
               }
            });           
            return retn;
         }
      }
   };

   // Prompt for a value and correct all selected rows in the grid
   self.quickCorrectGridCorrectAllSelectedRows = function () {
      if (base.quickMode) {         
         ModalService.showModal('edi/etcc/correct-multiple-rows-modal.json', 'CorrectMultipleRowsModalCtrl as cmMo', $scope, function (modal) {
            base.correctMultipleRowsModal = modal;
         });
      }
   };

   self.quickCorrectGridTransDocumentDrilldownEnabled = function () {
      if (base.quickMode) {
         var record = GridService.getSelectedRecord(base.quickCorrect.grid);
         return (record) ? true : false;
      }
   };

   // Drilldown Document from an error on the Quick Error screen
   // This is the same as selecting a Document on the Master grid and drilling down to the Document detail
   self.quickCorrectGridTransDocumentDrilldown = function () {
      if (base.quickMode) {
         var records = GridService.getSelectedRecords(base.quickCorrect.grid);
         
         if (records && records.length) {
            if (records.length === 1) {
               var record = records[0];
               base.quickBannerRecord.sxxmldocRowid = record.sxxmldocRowid;
               base.drillDownRecord.docId = record.docId;
               base.drillDownRecord.docNm = record.docNm;
               base.drillDownRecord.sxxmldocRowid = record.sxxmldocRowid;
               base.drillDownRecord.eDIHerrstatusty = record.eDIHerrstatusty;
               base.drillDownRecord.eDIHupdstat = record.eDIHupdstat;
               base.drillDownRecord.oEEHapprovty = record.oEEHapprovty;
               base.returnToQuick = true;

               var criteria = {
                  rwid: base.drillDownRecord.sxxmldocRowid,
                  eDIHerrstatusty: base.drillDownRecord.eDIHerrstatusty,
                  eDIHupdstat: base.drillDownRecord.eDIHupdstat,
                  oEEHapprovty: base.drillDownRecord.oEEHapprovty
               };
               
               DataService.post('api/edi/asedientry/etcccheckdrilldownaccess', { data: criteria, busy: true }, function () {
                  $state.go('etcc.drilldown', { drillDownRecord: JSON.stringify(base.drillDownRecord) });
               });
            } else {
               MessageService.error('global.error', 'message.please.select.a.single.row.for.this.feature');
            }
         }
      }
   };
      
   self.quickCorrectGridTransApproveTransactionEnabled = function () {
      if (base.quickMode) {
         if (!base.changeModeSecurityEnabled()) {
            return false;
         } else {
            var record = GridService.getSelectedRecord(base.quickCorrect.grid);
            if (record) {
               return true;
            } else {
               return false;
            }
         }
      }
   };

   // Transaction level processing - Approve the Transaction 
   self.quickCorrectGridTransApproveTransaction = function () {
      if (base.quickMode) {
         var record = GridService.getSelectedRecord(base.quickCorrect.grid);

         if (record) {
            var docKey = {
               keytype: '',
               primarykey: '',
               secondarykey: ''
            };

            var criteria = {
               sxxmldocRowid: record.sxxmldocRowid,
               // Clear out fields being returned from the SI call.
               refreshapprovty: false,
               approvty: '',
               approvmsg: '',
               rebuildtt: false,
               rebuildttrefresh: false,
               refreshgrid: false,
               placeeholdquest: ''
            };

            DataService.post('api/edi/asedientry/etccdetailerrorsapprovetran', { data: criteria, busy: true }, function (data) {
               if (data) {                
                  if (!MessageService.processMessaging(data.messaging)) {
                     if (data.etccdeterrorscorrection) {
                        base.quickErrorDocument.forEach(function (document) {
                           if (document.sxxmldocRowid === record.sxxmldocRowid) {
                              docKey.keytype = document.keytype;
                              docKey.primarykey = document.primarykey;
                              docKey.secondarykey = document.secondarykey;

                              document.oEEHapprovty = data.etccdeterrorscorrection.approvty;
                           }
                        });

                        if (docKey.keytype) {
                           // There can be other transactions for the same SX.e document, refresh those Approve values as well 
                           base.quickErrorDocument.forEach(function (document) {
                              if ((document.keytype === docKey.keytype) && (document.primarykey === docKey.primarykey) && (document.secondarykey === docKey.secondarykey)) {
                                 document.oEEHapprovty = data.etccdeterrorscorrection.approvty;
                              }
                           });
                        }
                        
                        if (data.etccdeterrorscorrection.rebuildtt) {
                           base.quickSummaryGridSearch();
                        }
                        if (data.etccdeterrorscorrection.refresherrorcounts) {
                           // performed by base.quickBuildAllErrors
                        }                        

                        if (data.etccdeterrorscorrection.approvmsg) {
                           MessageService.info('global.information', data.etccdeterrorscorrection.approvmsg);
                        }
                     }
                  }
               }            
            });           
         }
      }
   };
     
   self.quickCorrectGridTransPlaceOnEHoldEnabled = function () {
      if (base.quickMode) {        
         if (!base.changeModeSecurityEnabled()) {
            return false;
         } else {
            var record = GridService.getSelectedRecord(base.quickCorrect.grid);

            if (record) {
               return (record.oEEHordernosuf !== '0-00') ? true : false;
            } else {
               return false;
            }
         }
      }
   };

   // Transaction level processing - Place the target document on E-Hold 
   self.quickCorrectGridTransPlaceOnEHold = function () {
      if (base.quickMode) {
         if (!base.changeModeSecurityEnabled()) {
            return false;
         } else {
            var record = GridService.getSelectedRecord(base.quickCorrect.grid);
            if (record) {
               if (record.oEEHordernosuf !== '0-00') {
                  var docKey = {
                     keytype: '',
                     primarykey: '',
                     secondarykey: ''
                  };

                  var criteria = {
                     rwid: record.sxxmldocRowid,
                     oEEHapprovty: '',
                     eDIHerrstatusty: ''
                  };
                  DataService.post('api/edi/asedientry/etccplaceonehold', { data: criteria, busy: true }, function (data) {
                     if (data) {
                        base.quickErrorDocument.forEach(function (document) {
                           if (document.sxxmldocRowid === record.sxxmldocRowid) {
                              docKey.keytype = document.keytype;
                              docKey.primarykey = document.primarykey;
                              docKey.secondarykey = document.secondarykey;

                              document.oEEHapprovty = data.oEEHapprovty;
                           }
                        });

                        if (docKey.keytype) {
                           // There can be other transactions for the same SX.e document, refresh those Approve values as well 
                           base.quickErrorDocument.forEach(function (document) {
                              if ((document.keytype === docKey.keytype) && (document.primarykey === docKey.primarykey) && (document.secondarykey === docKey.secondarykey)) {
                                 document.oEEHapprovty = data.oEEHapprovty;
                              }
                           });
                        }                        
                     }
                  });
               }
            }
         }
      }
   };

   self.quickCorrectGridTransLaunchSXeDocumentEnabled = function () {
      if (base.quickMode) {
         var record = GridService.getSelectedRecord(base.quickCorrect.grid);
         if (record) {
            return (record.oEEHordernosuf !== '0-00') ? true : false;
         } else {
            return false;
         }
      }
   };
     
   // Transaction level processing - Hyperlink to the target document (OEIO, POIP)
   self.quickCorrectGridTransLaunchSXeDocument = function () {
      if (base.quickMode) {
         var record = GridService.getSelectedRecord(base.quickCorrect.grid);

         if ((record) && (record.oEEHordernosuf !== '0-00')) {

            // When OEET/POET OEIO/POIP is fully operational, this needs to be re-worked
            if (record.primarykey && record.keytype.toLowerCase() === 'oe') {
               var launchOEET = false;

               if (record.oEEHstage.toLowerCase() === 'ent' ||
                  record.oEEHstage.toLowerCase() === 'ord' ||
                  record.oEEHstage.toLowerCase() === 'pck') {
                  launchOEET = true;
               }
               var qOrderNumber = parseInt(record.primarykey, 10);
               var qOrderSuffix = parseInt(record.secondarykey, 10);

               if (launchOEET) {
                  $state.go('oeio.detail', { pk: qOrderNumber, pk2: qOrderSuffix });
               }
            } else if (record.primarykey && record.keytype.toLowerCase() === 'po') {
               var launchPOET = false;

               if (record.oEEHstage.toLowerCase() === 'ent' ||
                  record.oEEHstage.toLowerCase() === 'ord' ||
                  record.oEEHstage.toLowerCase() === 'pck' ||
                  record.oEEHstage.toLowerCase() === 'ack' ||
                  record.oEEHstage.toLowerCase() === 'pre') {
                  launchPOET = true;
               }

               var orderNumber = parseInt(record.primarykey, 10);
               var orderSuffix = parseInt(record.secondarykey, 10);
               if (launchPOET) {
                  $state.go('poip.detail', { pk: orderNumber, pk2: orderSuffix });
               }
            } else {
               MessageService.error('global.error', 'message.only.documents.of.type.oe.or.po.can.be.selected.fo');
            }
         }
      }
   };

   self.quickCorrectGridTransCancelEnabled = function () {
      if (base.quickMode) {
         if (!base.changeModeSecurityEnabled()) {
            return false;
         } else {
            var record = GridService.getSelectedRecord(base.quickCorrect.grid);
            return (record) ? true : false;           
         }
      }
   };
      
   // Transaction level processing - Cancel the Transaction 
   self.quickCorrectGridTransCancel = function () {
      if (base.quickMode) {
         var record = GridService.getSelectedRecord(base.quickCorrect.grid);

         if ((record) && (record.oEEHordernosuf !== '0-00')) {

            MessageService.okCancel('global.question', 'global.cancel.transaction', function () {
               var processingList = [];
               processingList.push({
                  rwid: record.sxxmldocRowid,
                  eDIHerrstatusty: record.eDIHerrstatusty,
                  eDIHupdstat: record.eDIHupdstat,
                  oEEHapprovty: record.oEEHapprovty
               });

               DataService.post('api/edi/asedientry/etcccanceltransactions', { data: processingList, busy: true }, function () {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  base.quickSummaryGridSearch();
               });
            });
         }
      }
   };

   self.quickCorrectGridTransUpdateEnabled = function () {
      if (base.quickMode) {
         if (!base.changeModeSecurityEnabled()) {
            return false;
         } else {
            var record = GridService.getSelectedRecord(base.quickCorrect.grid);
            return (record && record.correctable) ? true : false;           
         }
      }
   };
     
   // Transaction level processing - Update the Transaction 
   self.quickCorrectGridTransUpdate = function () {
      if (base.quickMode) {
         var msg = MessageService.get('global.approve.all.sections.where.approve.type.is.n');
         MessageService.yesNoCancel('', msg, self.quickCorrectGridTransUpdatePromptYes, self.quickCorrectGridTransUpdatePromptNo, self.quickCorrectGridTransUpdatePromptCancel);
      }
   };

   self.quickCorrectGridTransUpdatePromptYes = function () {
      if (base.quickMode) {
         self.quickCorrectGridTransUpdateSubmit(true);
      }
   };

   self.quickCorrectGridTransUpdatePromptNo = function () {
      if (base.quickMode) {
         self.quickCorrectGridTransUpdateSubmit(false);
      }
   };

   self.quickCorrectGridTransUpdatePromptCancel = function () {
      if (base.quickMode) {
         MessageService.info('global.information', 'global.update.aborted');
      }
   };

   self.quickCorrectGridTransUpdateSubmit = function (updateFlag) {
      if (base.quickMode) {
         var record = GridService.getSelectedRecord(base.quickCorrect.grid);
         if (record) {
            var procType = record.docTxnType;
            var processingList = [];

            processingList.push({
               rwid: record.sxxmldocRowid,
               eDIHerrstatusty: record.eDIHerrstatusty,
               eDIHupdstat: record.eDIHupdstat,
               oEEHapprovty: record.oEEHapprovty
            });

            DataService.post('api/edi/asedientry/etccupdatetransactions', { data: { etccrowids: processingList, lApproveAll: updateFlag, cProcType: procType }, busy: true }, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  base.quickSummaryGridSearch();
               }
            });
         }
      }
   };

   self.quickCorrectGridExit = function () {
      if (base.quickMode) {
         // refresh the Summary Grid 
         base.quickSummaryGridSearch();
      }
   };
});
