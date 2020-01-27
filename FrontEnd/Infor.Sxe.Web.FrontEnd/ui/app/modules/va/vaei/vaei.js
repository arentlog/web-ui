'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider, ValueAddReceivingStateProvider) {
   StateProvider.addTransactionBaseState('va', 'vaei', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('va', 'vaei');
   ValueAddReceivingStateProvider.addStates('va', 'vaei', 'vaei.master');
   ValueAddReceivingStateProvider.addStates('va', 'vaei', 'vaei.detail');
   ValueAddReceivingStateProvider.addStates('va', 'vaei', 'vaei.reviewlabour');
   BinAllocationStateProvider.addStates('va', 'vaei', 'vaei.detail');

   $stateProvider.state('vaei.detail', {
      url: '/detail',
      params: { vaeiRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/detail.json');
            },
            controller: 'VaeiDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('vaei.cancelvaorder', {
      url: '/cancel-va-order',
      params: { vaOrderDeleteCriteria: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/cancel-va-order.json');
            },
            controller: 'VaeiCancelVAOrderCtrl as cva'
         }
      }
   });

   $stateProvider.state('vaei.finalupdate', {
      url: '/final-update',
      params: { vaeiUpdate: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/va-final-update.json');
            },
            controller: 'VaeiFinalUpdateCtrl as fu'
         }
      }
   });

   $stateProvider.state('vaei.section', {
      url: '/section',
      params: { vaeiRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/section-needing-completion.json');
            },
            controller: 'VaeiSectionNeedCompletionCtrl as snc'
         }
      }
   });

   $stateProvider.state('vaei.vaaddons', {
      url: '/addons',
      params: { vaAddonsCriteria: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/addons.json');
            },
            controller: 'VaeiAddonsCtrl as vaAdd'
         }
      }
   });

   $stateProvider.state('vaei.reviewlabour', {
      url: '/review-labor',
      params: { vaSelectedSectionNeededLine: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/update-review-labour-lines.json');
            },
            controller: 'VaeiUpdateReviewLabourCtrl as url'
         }
      }
   });

   $stateProvider.state('vaei.reviewcontrolledlabour', {
      url: '/review-controlled-labor',
      params: { vaSelectedLabourLine: null, vaeiResults: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/review-controlled-labour-line.json');
            },
            controller: 'VaeiUpdateControlledReviewLabourCtrl as ucrl'
         }
      }
   });

   $stateProvider.state('vaei.reviewlabourlinedetails', {
      url: '/review-labor-line-details',
      params: { selectedLabourLine: null, reviewLabourList: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/review-labour-line-details.json');
            },
            controller: 'VaeiReviewLabourLineDetailsCtrl as rlld'
         }
      }
   });

   $stateProvider.state('vaei.detail.serial', {
      url: '/serial',
      params: { vaeiHeader: null },
      views: {
         serialLot: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/va-receving-serial.json');
            },
            controller: 'VaeiSerialCtrl as sl'
         }
      }
   });

   $stateProvider.state('vaei.detail.lot', {
      url: '/lot',
      params: { vaeiHeader: null },
      views: {
         serialLot: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaei/va-receving-lots.json');
            },
            controller: 'VaeiLotCtrl as lt'
         }
      }
   });

});

app.controller('VaeiBaseCtrl', function ($state, DataService, Sasoo, ConfigService, MessageService) {
   var self = this;
   self.MENU_FUNCTION_VAEI = 'vaei';
   self.DOCUMENT_DELIMITER = '-';
   self.isFullReceived = false;
   self.wlwhsechgfl = true;  // Is it okay to receive a TWL warehouse - set by authorization
   self.vaeiHeader = {};
   self.vaMasterSelectedRecord = {};
   self.sectionNeedingCompletionActiveRec = {};
   self.criteria = { recordcountlimit: ConfigService.getDefaultRecordLimit(), stagecd: '9', whse: Sasoo.whse };
   self.isShippingPreviousSections = false;

   var glDefaultPeriods = ConfigService.getGLDefaultPeriods();
   if (glDefaultPeriods) {
      self.glPeriodFound = glDefaultPeriods.lGl13PerFl;
      self.glPeriod = glDefaultPeriods.iGlDefPer;
   }

   self.unlockRecordAndNavigate = function (vano, vasuf, navigate, refreshAndReload) {
      var params = {
         pvVano: vano,
         pvVasuf: vasuf
      };
      DataService.get('api/va/asvaheader/vaheaderremovesoftlock/{pvVano}/{pvVasuf}', { pathParams: params, busy: true }, function () {
         MessageService.alert('global.warning', 'global.receipt.status.cleared');
         if (navigate) {
            if (refreshAndReload) {
               $state.go('^.master', {
                  refreshSearch: true
               }, {
                     reload: '^.master'
                  });
            } else {
               $state.go('^.master');
            }
         }
      });
   };

   self.navigateBack = function (navigate, refreshAndReload) {
      if (navigate) {
         if (refreshAndReload) {
            $state.go('vaei.master', {
               refreshSearch: true
            }, {
                  reload: 'vaei.master'
               });
         } else {
            $state.go('vaei.master');
         }
      }
   };

   self.isMaster = function () {
      return $state.is('vaei.master');
   };

   self.includesMaster = function () {
      return $state.includes('vaei.master');
   };

   self.isDetail = function () {
      return $state.is('vaei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('vaei.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.isShippingPreviousSections = false;
      DataService.post('api/va/asvaentry/vaeiretrieve', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.vaeiresults.filter(function (seq) {
            return seq.seqno === 0;
         });
      });
   };
});

app.controller('VaeiSearchCtrl', function ($scope, $state, DataService, ConfigService, Utils, Sasoo) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = { recordcountlimit: ConfigService.getDefaultRecordLimit(), stagecd: '9', whse: Sasoo.whse };
   };

   self.changeOfVAOrder = function (args) {
      if (args.value) {
         if (args.source.toLowerCase() === 'entry') {
            var orderParts = base.vanox.split('-');
            if (orderParts.length === 2) {
               base.criteria.vano = orderParts[0];
               base.criteria.vasuf = orderParts[1];
            } else {
               base.criteria.vano = base.vanox;
               base.criteria.vasuf = 0;
            }
         } else {
            base.criteria.vano = args.value;
            base.criteria.vasuf = args.value2;
         }
      } else {
         base.criteria.vano = 0;
         base.criteria.vasuf = 0;
      }
   };

   self.updateAutocompleteCriteria = function (args) {
      // the VA Order # lookup autocomplete was sending the previously selected vano and vasuf in the FacetQuery and returning no results
      // this clears the FacetQuery so that only the currently entered order # is sent with the query
      if (args.source === 'autocomplete') {
         if (args.criteria.FacetQuery)
            args.criteria.FacetQuery = {};
      }
      return args.criteria;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('vaei.master');
      }

      base.search();
   };
});

app.controller('VaeiMasterCtrl', function ($scope, $state, $stateParams, DataService, AuthService, MessageService, GridService, ModalService, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.vaeiSelectedRecord = {};
   self.securityLevel = SecurityService.getSecurityLevel(base.MENU_FUNCTION_VAEI);
   base.security = self.securityLevel;
   self.allowNavigation = false;
   self.isSectionNeedingCompletionVisible = false;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.receiveOrder) {
      base.search();
   }

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.isOneRowSelected = function () {
      //base.vaeiSelectedRecord = GridService.getSelectedRecord(base.grid);
      self.vaeiSelectedRecord = GridService.getSelectedRecord(base.grid);
      if (self.vaeiSelectedRecord) {
         base.vano = self.vaeiSelectedRecord.vano;
         base.vasuf = self.vaeiSelectedRecord.vasuf;
         base.shipprod = self.vaeiSelectedRecord.shipprod;
      }
   };

   self.onRecordSelection = function () {
      self.vaeiSelectedRecord = GridService.getSelectedRecord(base.grid);
      if (self.vaeiSelectedRecord) {
         self.vaeiSectionCriteria = {
            vano: self.vaeiSelectedRecord.vano,
            vasuf: self.vaeiSelectedRecord.vasuf,
            whse: self.vaeiSelectedRecord.whse,
            prod: self.vaeiSelectedRecord.shipprod,
            recordcountlimit: 50,
            stagecd: base.criteria.stagecd,
            userfield: self.vaeiSelectedRecord.userfield,
            verno: self.vaeiSelectedRecord.verno
         };

         DataService.post('api/va/asvaentry/vaeiretrieve', { data: self.vaeiSectionCriteria, busy: true }, function (data) {
            if (data) {
               self.vaeiSectionResultsCount = data.vaeiresults.filter(function (seq) {
                  return seq.seqno > 0;
               });
               self.isSectionNeedingCompletionVisible = self.vaeiSectionResultsCount.length > 0 ? true : false;
            }
         });
      }
   };

   self.drillDown = function (e, args) {
      self.vaeiSelectedRecord = args[0].item;
      if (self.vaeiSelectedRecord) {
         self.allowNavigation = true;
         self.checkForAuthorization(self.vaeiSelectedRecord, self.allowNavigation);
      }
   };

   self.checkForAuthorization = function (selecteRecord, allowNavigation) {
      if (selecteRecord.wlwhsefl) {
         AuthService.createAuthPoint('wlord', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
      }
      else if (selecteRecord.wlesbfl) {
         AuthService.createAuthPoint('wlesb', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
      }
      else {
         self.recoveryAuthPointPassed();
      }
   };

   self.recoveryAuthPointPassed = function () {
      base.wlwhsechgfl = true;
      self.validateReceiptCapability(self.allowNavigation);
   };

   self.recoveryAuthPointFailed = function () {
      base.wlwhsechgfl = false;
   };

   self.fullReceipt = function () {
      self.vaeiSelectedRecord = GridService.getSelectedRecord(base.grid);
      if (self.vaeiSelectedRecord) {
         self.checkForAuthorization(self.vaeiSelectedRecord, false);
      }
   };

   self.cancelVAOrder = function () {
      var record = GridService.getSelectedRecord(base.grid);
      var params = {
         vano: record.vano,
         vasuf: record.vasuf,
         seqno: record.seqno
      };
      base.vaOrderDeleteCriteria = { vano: record.vano, vasuf: record.vasuf, userfield: record.userfield, securitylvl: 5 };

      DataService.get('api/va/vaes/getbypk', { params: params, busy: true }, function (data) {
         if (data && data.completefl) {
            MessageService.okCancel('global.alert', 'message.va.sections.is.complete.wip.gl.will.be.reversed', function () {
               self.vaCancelModal();
            });
         }
         else {
            self.vaCancelModal();
         }
      });
   };

   self.vaCancelModal = function () {
      ModalService.showModal('va/vaei/cancel-va-order.json', 'VaeiCancelVAOrderCtrl as co', $scope, function (modal) {
         self.cancelVAOrderModal = modal;
      });
   };

   self.finalUpdate = function () {
      //Final update runs against all orders where the openinit set indicates they have been received - not individual orders
      $state.go('^.finalupdate');
   };

   self.sectionNeedingCompletion = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         base.isShippingPreviousSections = false;
         $state.go('^.section', { vaeiRecord: record });
         base.vaMasterSelectedRecord = record;
      }
   };

   self.launchValueAddSurplus = function (parent, vano, vasuf) {
      var criteria = {
         pvPasspono: 0,
         pvPassposuf: 0,
         pvVano: vano,
         pvVasuf: vasuf,
         pvSctncode: '',//self.vaeiLabourLine.sctncode,
         pvCompletefl: true
      };

      $state.go(parent + '.valueaddreceiving-surplus', {
         callingState: parent, //changed from null so that return is possible from the surplus screen
         menuFunction: base.MENU_FUNCTION_VAEI,
         currentCount: 0,
         maximumCount: 0,
         vaReceiptCreateIiSectionRequestCriteria: criteria,
         acceptCallback: self.vaFinishedProductFinishedCallback,
         cancelCallback: self.vaFinishedProductFinishedCallback
      });
   };

   self.validateReceiptCapability = function (allowNavigation) {
      var foundError = false;

      if (self.vaeiSelectedRecord) {
         var params = {
            pvVano: self.vaeiSelectedRecord.vano,
            pvVasuf: self.vaeiSelectedRecord.vasuf,
            pvTransproc: 'si-vaei',
            pvWlwhsechgfl: base.wlwhsechgfl
         };

         DataService.get('api/va/asvaheader/vaheadersoftlockv2/{pvVano}/{pvVasuf}/{pvTransproc}', { pathParams: params, busy: true }, function () {

            DataService.get('api/va/asvaentry/vaeivalidatereceiptcapability/{pvVano}/{pvVasuf}/{pvWlwhsechgfl}', { pathParams: params, busy: true }, function (data) {
               if (data.messaging.length > 0) {
                  data.messaging.forEach(function (message) {
                     if (message.messagetype.toLowerCase() === 'e') {
                        foundError = true;
                     }
                  });
               }
               if (!foundError || allowNavigation) {
                  if (allowNavigation) {
                     if (data.messaging.length !== 0) {
                        MessageService.errorMessages(data.messaging);
                     }
                     $state.go('^.detail', { vaeiRecord: self.vaeiSelectedRecord, vaeircvdetailinfo: data.vaeircvdetailinfo });
                  }
                  else {
                     if (self.vaeiSelectedRecord.laborchkfl) {
                        base.isFullReceived = true;
                     }
                     self.launchValueAddSurplus('vaei.master', self.vaeiSelectedRecord.vano, self.vaeiSelectedRecord.vasuf, self.vaFinishedProductFinishedCallback, self.vaFinishedProductFinishedCallback);
                  }
               }
               else {
                  base.unlockRecordAndNavigate(self.vaeiSelectedRecord.vano, self.vaeiSelectedRecord.vasuf, true, false);
                  MessageService.errorMessages(data.messaging);
               }
            });
         });
      }
   };

   self.vaFinishedProductFinishedCallback = function () {
      base.search();
      base.navigateBack(true, true);
   };

   self.isFullReceiptEnabled = function () {
      if (self.vaeiSelectedRecord) {
         if (self.vaeiSelectedRecord.vano > 0 && self.vaeiSelectedRecord.sctntype === '') {
            return true;
         }
         else {
            return false;
         }
      }
      else {
         return false;
      }
   };

   self.isCancelVAOrderEnabled = function () {
      if (self.vaeiSelectedRecord) {
         if (self.security >= 4 || (self.security === 3 && self.vaeiSelectedRecord.stagecd === 1)) {
            return true;
         }
         else {
            return false;
         }
      }
      else {
         return false;
      }
   };
});

app.controller('VaeiDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, Utils, SecurityService) {
   var base = $scope.base;
   var self = this;
   self.isSerialLotEnable = false;
   self.vaei = {};
   self.vaeiHeader = {};
   self.vaeiReceiveDetailInfo = {};
   self.valueAddLookupResult = {};
   self.tieCreateResults = {};

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('vaei', 'Header') < 3;
   self.isReceivingTabReadonly = SecurityService.getSubSecurityLevel('vaei', 'Receiving') < 3;

   if ($stateParams.vaeiRecord) {
      self.vaei = $stateParams.vaeiRecord;
      self.vaeiReceiveDetailInfo = $stateParams.vaeircvdetailinfo;

      var params = {
         vano: self.vaei.vano,
         vasuf: self.vaei.vasuf
      };
      DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.vaeiHeader = data;
            base.vaeiHeader = data;
            //base.vano = self.vaeiHeader.vano;
            //base.vasuf = self.vaeiHeader.vasuf;
            //base.shipprod = self.vaeiHeader.shipprod;
            self.loadTies();

            var pendingamt = Number(self.vaeiHeader.pndinvamt) + Number(self.vaeiHeader.pndextrnamt) + (Number(self.vaeiHeader.pndinvinamt) * -1) + Number(self.vaeiHeader.pndaddons);

            self.isPendingOrWipInternalCharges = (Number(self.vaeiHeader.pndintrnamt) !== 0 || Number(self.vaeiHeader.pndintrnamt) !== 0) ? true : false;

            self.pendingTotalAmount = Number(pendingamt) + (self.isPendingOrWipInternalCharges ? Number(self.vaeiHeader.pndintrnamt) : Number(self.vaeiHeader.pndintrnest));

            self.wipTotalAmount = Number(self.vaeiHeader.wipinvamt) + Number(self.vaeiHeader.wipextrnamt) + Number(self.vaeiHeader.wipintrnamt) + Number(self.vaeiHeader.pndaddons) + (Number(self.vaeiHeader.wipinvinamt) * -1);

            self.proofqty = self.vaeiReceiveDetailInfo ? self.vaeiReceiveDetailInfo.proofqty : 0;
            self.icspecrecno = self.vaeiReceiveDetailInfo ? self.vaeiReceiveDetailInfo.icspecrecno : 0;

            //Check for Product type serial/Lot
            var valueAddLookupCriteria = { vano: self.vaeiHeader.vano, vasuf: self.vaeiHeader.vasuf, recordcountlimit: 50 };
            DataService.post('api/va/vaeh/lookup', { data: valueAddLookupCriteria, busy: true }, function (data) {
               if (data) {
                  self.valueAddLookupResult = JSLINQ(data.valueaddlookupresults).FirstOrDefault();
                  if (self.valueAddLookupResult.serialfl) {
                     //Serials
                  }
                  if (self.valueAddLookupResult.lotfl) {
                     //Lots
                  }
               }
            });
         }
      });
   }

   self.getSubTitle = function () {
      return MessageService.get('va.order.number') + ': ' + self.vaeiHeader.vano + base.DOCUMENT_DELIMITER + Utils.pad(self.vaeiHeader.vasuf, 2);
   };

   self.loadTies = function () {
      if (self.vaeiHeader) {
         var tieCreateCriteria = { tietype: 'f', docorderno: self.vaeiHeader.vano, docordersuf: self.vaeiHeader.vasuf, doclineno: 0, docseqno: 0, cono2: 0, prod: self.vaeiHeader.shipprod, nonstockty: self.vaeiHeader.nonstockty };
         DataService.post('api/va/asvaheader/vaheaderties/', { data: tieCreateCriteria, busy: true }, function (data) {
            if (data) {
               self.tieCreateResults = data;
            }
         });
      }
   };

   self.isDetail = function () {
      return $state.is('vaei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('vaei.detail');
   };

   self.serial = function () {
      // The suffix needs to be converted using a toString or the get gets run without anything in the iVaSuf position when it is zero
      var params = { iVaNo: self.vaeiHeader.vano, iVaSuf: self.vaeiHeader.vasuf.toString(), iReceiptQty: self.vaeiHeader.qtyship };
      DataService.get('api/va/asvaentry/vaparentcheckserlot/{iVaNo}/{iVaSuf}/{iReceiptQty}', { pathParams: params, busy: true }, function (returnProofQty) {
         self.vaeiHeader.proofqty = returnProofQty ? returnProofQty : 0;
         $state.go('.serial', { vaeiHeader: self.vaeiHeader });
      });
   };

   self.lot = function () {
      // The suffix needs to be converted using a toString or the get gets run without anything in the iVaSuf position when it is zero
      var params = { iVaNo: self.vaeiHeader.vano, iVaSuf: self.vaeiHeader.vasuf.toString(), iReceiptQty: self.vaeiHeader.qtyship };
      DataService.get('api/va/asvaentry/vaparentcheckserlot/{iVaNo}/{iVaSuf}/{iReceiptQty}', { pathParams: params, busy: true }, function (returnProofQty) {
         self.vaeiHeader.proofqty = returnProofQty ? returnProofQty : 0;
         $state.go('.lot', { vaeiHeader: self.vaeiHeader });
      });
   };

   //self.updateLineItem = function (record) {

   //};

   self.warehouse = function () {
      if (self.vaeiHeader) {
         var wmbinassignCriteria = {
            altwhse: '',
            currproc: base.MENU_FUNCTION_VAEI,
            jrnlno: 0,
            kitfl: false,
            lineno: 0,
            ourproc: base.MENU_FUNCTION_VAEI,
            ordertype: 'f',
            orderno: self.vaei.vano,
            ordersuf: self.vaei.vasuf,
            returnfl: false,
            potype: '',
            prod: self.vaei.shipprod,
            seqno: 0,
            skipnonkitlogic: false,
            stkqtyship: self.vaeiHeader.qtyship,
            stkqtyrcv: 0,
            unit: self.vaeiHeader.unit,
            vamodule: 'va',
            wmadjtype: 'buy',
            wmqtyrcv: 0,
            whse: self.vaei.whse
         };

         $state.go('.bin-allocation', {
            criteria: wmbinassignCriteria,
            binAllocationDisabled: false,
            submittedCallback: 'dtl.binAllocationSaved',
            actionsCallback: 'dtl.binAllocationActions'
         });
      }
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSaved = function (wmbinassignment) {
      //Nothing needs to happen on finish
      //Reference took from SL Application
      $state.go('vaei.detail');
   };

   self.binAllocationActions = function (wmbinassignment) {
      //Nothing needs to happen on cancel
      //Reference took from SL Application
      $state.go('vaei.detail');
   };

   self.unlockRecordAndNavigate = function () {
      base.unlockRecordAndNavigate(self.vaei.vano, self.vaei.vasuf, true, true);
   };

   self.saveHeader = function () {
      // Save header tab stuff
      DataService.put('api/va/vaeh', { data: self.vaeiHeader, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };

   // Save
   self.submit = function () {
      // Save header tab stuff
      DataService.put('api/va/vaeh', { data: self.vaeiHeader, busy: true }, function () {
         var params = {
            vano: self.vaeiHeader.vano,
            vasuf: self.vaeiHeader.vasuf,
            wlwhsechgfl: base.wlwhsechgfl,
            laborcheckedfl: self.vaei.laborchkfl,
            shipqty: self.vaeiHeader.qtyship,
            createbofl: self.vaeiHeader.createbofl
         };
         //Perform the receipt
         DataService.post('api/va/asvaentry/vaeipartialreceipt/', { data: params, busy: true }, function (data) {
            if (self.vaei.laborchkfl) {
               base.isFullReceived = true;
            }
            self.launchValueAddSurplus('vaei.master', self.vaeiHeader.vano, self.vaeiHeader.vasuf, self.vaFinishedProductFinishedCallback, self.vaFinishedProductFinishedCallback);
         }, function (data) {
            base.unlockRecordAndNavigate(self.vaeiSelectedRecord.vano, self.vaeiSelectedRecord.vasuf, true, false);
         });
      });
   };

   self.vaFinishedProductFinishedCallback = function () {
      base.search();
      $state.go('^');
   };

   self.launchValueAddSurplus = function (parent, vano, vasuf) {
      var criteria = {
         pvPasspono: 0,
         pvPassposuf: 0,
         pvVano: vano,
         pvVasuf: vasuf,
         pvSctncode: '',//self.vaeiLabourLine.sctncode,
         pvCompletefl: true
      };

      $state.go(parent + '.valueaddreceiving-surplus', {
         callingState: parent, //changed from null so that return is possible from the surplus screen
         menuFunction: base.MENU_FUNCTION_VAEI,
         currentCount: 0,
         maximumCount: 0,
         vaReceiptCreateIiSectionRequestCriteria: criteria,
         acceptCallback: self.vaFinishedProductFinishedCallback,
         cancelCallback: self.vaFinishedProductFinishedCallback
      });
   };

});

app.controller('VaeiCancelVAOrderCtrl', function ($scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   self.vaeiCancelVAOrderCriteria = {};

   // Save
   self.submit = function () {
      // Check Security before proceeding
      //{ SelectedVaeiResult != null && SelectedVaeiResult.vano > 0 && (securitySetting >= 4 || (securitySetting === 3 && SelectedVaeiResult.stagecd === 1)); }
      self.DeleteVAOrder();
   };

   self.DeleteVAOrder = function () {
      DataService.post('api/va/asvaheader/vadeleteorder', { data: base.vaOrderDeleteCriteria, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            mst.cancelVAOrderModal.destroy();
         }
      });
   };

   self.cancel = function () {
      mst.cancelVAOrderModal.destroy();
   };
});

app.controller('VaeiFinalUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, Sasoo) {
   var base = $scope.base;
   var self = this;
   var vaeiUpdate = $stateParams.vaeiUpdate;

   self.vaeiFinalUpdateCriteria = { postdt: Date.now, period: base.glPeriod, whse: Sasoo.whse, receiptsptype: 'p', pickticketptype: 'p' };

   //Initialize
   // Update runs on all orders that have been received and have the openinit set, they will not have the openinit set if the recieve process
   // has not occurred
   DataService.post('api/va/asvaentry/vaeifinalupdateinitialize', { data: self.vaeiFinalUpdateCriteria, busy: true }, function (data) {
      if (data.messaging.count > 0) {
         MessageService.processMessaging(data.messaging);
      }
      else {
         self.vaeiFinalUpdateCriteria = data.vaeifinalupdatecriteria;
         self.vaeiFinalUpdateCriteria.postdt = data.vaeifinalupdatecriteria.postdt === null ? Date.now : data.vaeifinalupdatecriteria.postdt;
         self.vaeiFinalUpdateCriteria.period = data.vaeifinalupdatecriteria.period === 0 ? (base.glPeriodFound ? base.glPeriod : '') : data.vaeifinalupdatecriteria.period;
         self.vaeiFinalUpdateCriteria.whse = data.vaeifinalupdatecriteria.whse === '' ? Sasoo.whse : data.vaeifinalupdatecriteria.whse;
      }
   });

   // Save
   self.submit = function () {
      //sctntype should be empty
      DataService.post('api/va/asvaentry/vaeifinalupdate', { data: self.vaeiFinalUpdateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.navigateBack(true, true);
         }
      });
   };

   self.navigateBack = function () {
      base.navigateBack(true, false);
   };

});

app.controller('VaeiSectionNeedCompletionCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, Sasoo, Utils, ModalService, AuthService, UserService) {
   var base = $scope.base;
   var self = this;
   //self.vaeiSectionResultsGrid = {};
   self.vaeiSectionResults = [];

   if ($stateParams.vaeiRecord) {

      self.vaei = $stateParams.vaeiRecord;

      self.vaeiSectionCriteria = {
         vano: self.vaei.vano,
         vasuf: self.vaei.vasuf,
         whse: self.vaei.whse,
         prod: self.vaei.shipprod,
         recordcountlimit: 50,
         stagecd: base.criteria.stagecd,
         userfield: self.vaei.userfield,
         verno: self.vaei.verno
      };

      DataService.post('api/va/asvaentry/vaeiretrieve', { data: self.vaeiSectionCriteria, busy: true }, function (data) {
         if (data) {
            self.vaeiSectionResults = data.vaeiresults.filter(function (seq) {
               return seq.seqno > 0;
            });
         }
      });
   }

   self.completeSection = function () {
      DataService.get('api/wl/aswlinquiry/getwlaowhsesettings/' + self.vaei.whse + '/' + '0', { busy: true }, function (data) {
         if (data && data.length > 0) {
            var wlAoWhseSettings = data[0];
            if (wlAoWhseSettings.wlwhsefl) {
               AuthService.createAuthPoint('wlord', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
            }
            else if (wlAoWhseSettings.wlesbfl) {
               AuthService.createAuthPoint('esbwl', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
            }
            else {
               self.proceedCompleteSection();
            }
         }
      });
   };

   self.recoveryAuthPointPassed = function () {
      self.proceedCompleteSection();
   };

   self.recoveryAuthPointFailed = function () {
      //self.proceedCompleteSection();
   };

   self.proceedCompleteSection = function () {

      var selectedSectionRecord = GridService.getSelectedRecord(self.vaeiSectionResultsGrid);
      base.sectionNeedingCompletionActiveRec = selectedSectionRecord;
      if (!selectedSectionRecord.finalprodfl) {
         if (selectedSectionRecord.prevshipexistfl && Sasoo.vaautoshipty.toUpperCase() === 'Y') {
            MessageService.okCancel('global.warning', 'VA# ' + selectedSectionRecord.vano + '-' + selectedSectionRecord.vasuf + ' Perform Auto Ship of Prior Sections?', function () {
               base.isShippingPreviousSections = true;
               self.vaCompleteSection(selectedSectionRecord);
            });
         }
         else if (selectedSectionRecord.prevshipexistfl && Sasoo.vaautoshipty.toUpperCase() !== 'Y') {
            MessageService.error('global.error', 'message.the.value.add.order.has.prior.sections.that.are.no');
         }
         else {
            if (selectedSectionRecord.wlwhsefl) {
               MessageService.okCancel('global.error', 'question.warning.this.is.a.wl.warehouse.and.inventory.is.c', function () {
                  self.vaCompleteSection(selectedSectionRecord);
               });
            }
            else {
               self.vaCompleteSection(selectedSectionRecord);
            }
         }
      }
   };

   self.vaCompleteSection = function (vaeisectionrec) {
      self.vaSelectedLabourLine = GridService.getSelectedRecord(self.vaeiSectionResultsGrid);

      var vaSectionCompleteCriteria = { vano: vaeisectionrec.vano, vasuf: vaeisectionrec.vasuf, seqno: vaeisectionrec.seqno, wlwhsechgfl: base.wlwhsechgfl, addondisplayfl: vaeisectionrec.addonsenabledfl, functionnm: base.MENU_FUNCTION_VAEI, autoshipprevfl: true, postdt: Utils.getCurrentDate(), stkadjfl: true, addonfl: false };

      DataService.post('api/va/asvasection/vasectioncompleteinitialize', { data: vaSectionCompleteCriteria, busy: true }, function (data) {
         if (data) {
            self.vaSectionCompleteCriteria = data.vasectioncompletecriteria;
            if (data.messaging) {
               var questions = JSLINQ(data.messaging).Where(function (mess) { return mess.messagetype.toUpperCase() === 'Q'; });

               if (questions && questions.length > 0) {
                  data.messaging.forEach(function (mess) {
                     if (mess.messagetxt) {
                        //ShowQuestionsOneByOne
                        MessageService.okCancel('global.warning', mess.messagetxt, function () {
                           self.processSectionCompletion(self.vaSectionCompleteCriteria);
                        }, function () {
                           //callback(false);
                        });
                     }
                  });
               }
               else if (vaeisectionrec.vano > 0 && vaeisectionrec.laborchkfl && !vaeisectionrec.finalprodfl) {
                  //Scroll to review labor and process further
                  $state.go('^.reviewlabour', { vaSelectedSectionNeededLine: self.vaSelectedLabourLine });
               }
               else if (vaeisectionrec.vano > 0 && vaeisectionrec.laborchkfl && vaeisectionrec.finalprodfl) {
                  $state.go('^.reviewcontrolledlabour', { vaSelectedLabourLine: self.vaSelectedLabourLine, vaeiResults: self.vaeiSectionResults });
               }
               else {
                  //set criteria & Open Modal Popup here
                  self.processSectionCompletion(self.vaSectionCompleteCriteria);
               }
            }
            else {
               self.processSectionCompletion(self.vaSectionCompleteCriteria);
            }
         }
         else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }
      });

   };

   self.processSectionCompletion = function (vaSectionCriteria) {
      ModalService.showModal('va/vaei/value-add-section-completion.json', 'VaeiValueAddSectionCompletionCtrl as vasc', $scope, function (modal) {
         self.vaAddSectionCompletionModal = modal;
      });
   };

   self.reviewLabourLines = function () {
      self.vaSelectedLabourLine = GridService.getSelectedRecord(self.vaeiSectionResultsGrid);
      base.sectionNeedingCompletionActiveRec = self.vaSelectedLabourLine;

      if (self.vaSelectedLabourLine && self.vaSelectedLabourLine.vano > 0 && self.vaSelectedLabourLine.laborchkfl && self.vaSelectedLabourLine.finalprodfl) {
         $state.go('^.reviewcontrolledlabour', { vaSelectedLabourLine: self.vaSelectedLabourLine, vaeiResults: self.vaeiSectionResults });
      }
      else {
         $state.go('^.reviewlabour', { vaSelectedSectionNeededLine: self.vaSelectedLabourLine }); ////////////////////////////////////////////////////////////////////////////////////////////////
         //$state.go('^.reviewcontrolledlabour', { vaSelectedLabourLine: self.vaSelectedLabourLine, vaeiResults: self.vaeiSectionResults });
      }
   };

   // Save
   self.submit = function () {
      //sctntype should be empty
      DataService.post('api/va/asvaentry/vaeifinalupdate', { data: self.vaeiFinalUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (data.messaging && data.messaging.count > 0) {
               MessageService.processMessaging(data.messaging);
               // Not sure after proceed or not after showing warning messages
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
            else {
               MessageService.processMessaging(data);
            }
         }
         else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }

      });
   };

   self.vaAddons = function () {
      var selectedSectionRecord = GridService.getSelectedRecord(self.vaeiSectionResultsGrid);
      $state.go('^.vaaddons', { vaAddonsCriteria: selectedSectionRecord });
   };

   self.onRecordSelection = function () {
      base.sectionNeedingCompletionActiveRec = GridService.getSelectedRecord(self.vaeiSectionResultsGrid);
   };

   self.isReviewLaborEnabled = function () {
      if (base.sectionNeedingCompletionActiveRec) {
         if (base.sectionNeedingCompletionActiveRec.vano > 0 && base.sectionNeedingCompletionActiveRec.laborchkfl &&
            ((base.sectionNeedingCompletionActiveRec.sctntype.toUpperCase() === 'IT') ||
               (base.sectionNeedingCompletionActiveRec.sctntype.toUpperCase() === 'IS') ||
               base.sectionNeedingCompletionActiveRec.finalprodfl)) {

            return true;
         }
         else {
            return false;
         }
      }
      else {
         return false;
      }
   };

});

app.controller('VaeiAddonsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, OptionSetService, Utils) {
   var self = this;
   var base = $scope.base;
   self.addons = {};
   self.addonsList = [];
   self.vaAddonsCriteria = $stateParams.vaAddonsCriteria;

   OptionSetService.get('VA', 'SectionType', function (set) {
      self.sectionTypes = set.children;
   });

   self.formatSectionType = function (sctntype) {
      if ((sctntype || sctntype === '') && self.sectionTypes) {
         for (var i = 0; i < self.sectionTypes.length; i++) {
            var type = self.sectionTypes[i];

            if (sctntype.toLowerCase() === type.value.toLowerCase()) {
               return type.label;
            }
         }
      }
      return '';
   };

   self.formAddonSubTitle = function () {
      var addonSubTitle = self.vaAddonsCriteria.vano + '-' + Utils.pad(self.vaAddonsCriteria.vasuf, 2) + ' | ';
      addonSubTitle += MessageService.get('global.sequence') + ': ' + self.vaAddonsCriteria.seqno + ' | ';
      addonSubTitle += MessageService.get('global.type') + ': ' + self.formatSectionType(self.vaAddonsCriteria.sctntype) + ' | ';
      addonSubTitle += MessageService.get('global.code') + ': ' + self.vaAddonsCriteria.sctncode;

      return addonSubTitle;
   };

   self.addonSubTitle = self.formAddonSubTitle();

   if ($stateParams.vaAddonsCriteria) {
      var vaAddonCriteria = { vano: self.vaAddonsCriteria.vano, vasuf: self.vaAddonsCriteria.vasuf, seqno: self.vaAddonsCriteria.seqno, userfield: self.vaAddonsCriteria.userfield, functionnm: base.MENU_FUNCTION_VAEI };
      DataService.post('api/va/asvasection/vasectionretrieveaddons', { data: vaAddonCriteria, busy: true }, function (data) {
         if (data) {
            self.addons = data.vaaddons[0];
         }
      });
   }

   // Save
   self.submit = function () {
      self.addonsList.push(self.addons);
      var vaAddonSaveCriteria = { vaaddons: self.addonsList, vaaddoncriteria: self.vaAddonsCriteria };

      DataService.post('api/va/asvasection/vasectionsubmitaddons', { data: vaAddonSaveCriteria, busy: true }, function (data) {
         if (data.length > 0) {
            MessageService.errorMessages(data);
         } else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.section', { vaeiRecord: self.vaAddonsCriteria });
         }
      });
   };

   self.cancel = function () {
      $state.go('^.section', { vaeiRecord: self.vaAddonsCriteria });
   };
});

app.controller('VaeiRowDetailTiesCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   var item = dtl.rowParams.item;
   var grid = dtl.rowParams.grid;
   var row = dtl.rowParams.row;

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = angular.copy(item);

   self.getConvertedOrderType = function () {
      if (self.rowDetail) {
         switch (self.rowDetail.ordertype) {
            case 'Order':
               return self.rowDetail.ordertype = 'O';
            case 'Transfer':
               return self.rowDetail.ordertype = 'T';
            case 'Fab VA':
               return self.rowDetail.ordertype = 'F';
            case 'Work Order':
               return self.rowDetail.ordertype = 'W';
            default:
               return '';
         }
      }
   };

   self.getConvertedOrderType();

   self.loadTies = function () {
      if (self.vaeiHeader) {
         var tieCreateCriteria = { tietype: 'f', docorderno: self.vaeiHeader.vano, docordersuf: self.vaeiHeader.vasuf, doclineno: 0, docseqno: 0, cono2: 0, prod: self.vaeiHeader.shipprod, nonstockty: self.vaeiHeader.nonstockty };
         DataService.post('api/va/asvaheader/vaheaderties', { data: tieCreateCriteria, busy: true }, function (data) {
            if (data) {
               self.tieCreateResults = data;
            }
         });
      }
   };


   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {

      var tieCriteria = {
         docorderno: base.vaeiHeader.vano,
         docordersuf: base.vaeiHeader.vasuf,
         nonstockty: '',
         prod: base.vaeiHeader.shipprod,
         doclineno: 0,
         docseqno: 0,
         cono2: 0
      };

      var validateTie = {
         seqaltno: item.seqaltno,
         orderaltno: item.orderaltno,
         linealtno: item.linealtno,
         cleartiefl: item.cleartiefl,
         ordertype: self.rowDetail.ordertype,
         tietype: "f",
         tierecid: item.tierecid,
         transtype: "so",
         seqno: item.seqno,
         modified: true
      };

      DataService.post('api/va/asvaheader/vaheadertieeditvalidate', { data: { tiecreatetiettcriteria: tieCriteria, tiecreatetiettresults: validateTie }, busy: true }, function (data) {
         if (data) {
            if (data.messaging && data.messaging.count > 0) {
               MessageService.processMessaging(data.messaging);
            }
            else {
               var returnTieResults = [];
               returnTieResults.push(data.tiecreatetiettresults);
               var vaHeaderFinalUpdateCriteria = { tiecreatetiettresults: returnTieResults, tiecreatetiettcriteria: tieCriteria };
               DataService.post('api/va/asvaheader/vaheadertiefinalupdate', { data: vaHeaderFinalUpdateCriteria, busy: true }, function (data) {
                  if (data.messaging) {
                     // check errors and display
                     MessageService.processMessaging(data.messaging);
                  }
                  else {
                     MessageService.info('global.information', 'message.save.operation.completed.successfully');
                     grid.toggleRowDetail(row);
                     base.buildgrid();
                  }
               });
            }
         }
      });
   };

});

app.controller('VaeiSerialCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.lineDetail = {};
   self.vaei = $stateParams.vaeiHeader;

   self.createIcEntrySerialsCriteria = function () {
      var criteria = {
         actionty: '',
         cost: 0,
         currproc: base.MENU_FUNCTION_VAEI,
         custno: 0,
         icspecrecno: self.vaei.icspecrecno,
         ictype: self.vaei.transtype,
         inquiryfl: false,
         jrnlno: 0,
         lineno: 0,
         method: '',
         orderno: self.vaei.vano,
         ordersuf: self.vaei.vasuf,
         ordqty: self.vaei.stkqtyord,
         origqty: self.vaei.stkqtyship,
         ourproc: base.MENU_FUNCTION_VAEI,
         outqty: self.vaei.stkqtyship,
         prod: self.vaei.shipprod,
         proofqty: self.vaei.proofqty,
         qtyunavail: 0,
         reasunavty: '',
         retlineno: 0,
         retorderno: 0,
         retordersuf: 0,
         returnfl: false,
         returnty: '',
         seqno: 0,
         shipfmwhse: '',
         shipto: '',
         shiptowhse: '',
         type: 'va',
         vendno: 0,
         whse: self.vaei.whse,
         wono: 0,
         wosuf: 0
      };
      return criteria;
   };

   self.serialControlReady = function () {

      // format and add nesseccary criteria to object
      self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria();

      var criteria = {
         icentryserialslist: [],
         icentryserialscriteria: self.icEntrySerialsCriteria
      };

      // Call initialize method on the Shared-Serials-Ctrl
      self.serialsControl.initialize(criteria);
   };

   self.serialDoneCallback = function () {
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('^.detail');
   };
});

app.controller('VaeiLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.vaei = $stateParams.vaeiHeader;

   self.createIcEntryLotsCriteria = function () {
      var criteria = {
         actionty: '',
         cost: 0,
         currproc: base.MENU_FUNCTION_VAEI,
         custno: 0,
         iclotrcptty: '',//icLotRcptTy,
         icspecrecno: self.vaei.icspecRecNo,
         ictype: self.vaei.transtype,
         inquiryfl: false,
         jrnlno: 0,
         lineno: 0,
         method: ' ',
         orderno: self.vaei.vano,
         ordersuf: self.vaei.vasuf,
         ordqty: self.vaei.stkqtyord,
         origqty: self.vaei.stkqtyship,
         ourproc: base.MENU_FUNCTION_VAEI,
         outqty: self.vaei.stkqtyship,
         prod: self.vaei.shipprod,
         proofqty: self.vaei.proofqty,
         qtyunavail: 0,
         reasunavty: '',
         retlineno: 0,
         retorderno: 0,
         retordersuf: 0,
         retseqno: 0,
         returnfl: false,
         returnty: '',
         seqno: 0,
         shipfmwhse: '',
         shipto: '',
         shiptowhse: '',
         sQtyunavail: 0,
         type: 'va',
         vendno: 0,
         whse: self.vaei.whse
      };
      return criteria;
   };

   self.lotControlReady = function () {
      // format and add nesseccary criteria to object
      self.icEntryLotsCriteria = self.createIcEntryLotsCriteria();

      //var criteria = {
      //   icentrylotslist: [],
      //   icentrylotscriteria: self.icEntryLotsCriteria
      //};

      // Call initialize method on the Shared-Lots-Ctrl
      self.lotsControl.initialize(self.icEntryLotsCriteria);
   };

   self.lotDoneCallback = function () {
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('^.detail');
   };
});

app.controller('VaeiUpdateReviewLabourCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, ModalService) {
   var self = this;
   var base = $scope.base;
   self.vaLineLabourReviewListGrid = {};
   self.vaLineLabourReviewList = [];
   self.mixedCost = false;
   self.subtitle = '';

   if ($stateParams.vaSelectedSectionNeededLine) {

      self.vaeiLabourLine = $stateParams.vaSelectedSectionNeededLine;

      self.subtitle = MessageService.get('va.order.number ') + ' ' + self.vaeiLabourLine.vano + ' | ' +
         MessageService.get('global.sequence.number ') + ' ' + self.vaeiLabourLine.seqno + ' | ' +
         MessageService.get('global.section.type ') + ' ' + self.vaeiLabourLine.sctntype;

      self.valaborline = { vano: self.vaeiLabourLine.vano, vasuf: self.vaeiLabourLine.vasuf, seqno: self.vaeiLabourLine.seqno, functionnm: 'vael' };

      DataService.post('api/va/asvasection/vareviewlaborretrieve', { data: self.valaborline, busy: true }, function (data) {
         if (data) {
            self.vaLineLaborReviewTotals = data.valinelaborreviewtotals;
            self.vaLineLabourReviewList = data.valinelaborreview;
         }
      });
   }

   self.drillDown = function (e, args) {
      var selectedLabourLine = args[0].item;
      $state.go('^.reviewlabourlinedetails', { selectedLabourLine: selectedLabourLine, reviewLabourList: self.vaLineLabourReviewList });
   };

   self.saveAllLabourProduct = function () {
      if (self.vaLineLabourReviewList.length > 0) {
         var previous;
         var different = false;
         var estimates = false;
         self.vaLineLabourReviewList.forEach(function (row) {
            if (!previous) {
               previous = row;
            }
            if (previous.timeactty !== row.timeactty) {
               different = true;
            }
            if (row.timeactty.toLowerCase() === 'e' && row.netamt !== 0) {
               estimates = true;
            }
            previous = angular.copy(row);
         });
         self.mixedCost = (different && estimates);
      }
      if (self.mixedCost) {
         MessageService.okCancel('global.warning', 'There are estimated costs when actual cost lines exist. The estimated cost will be ignored. Continue?', function () {
            // True Call Back
            self.sectionCompletionModal();
         }
            /* removing the following as it is not defined.  Leaving as a comment in case there was a reason for this piece and it needs to be implimented
   
            , function () {
               callback(false);
            }
   
            */
         );
      } else {
         self.sectionCompletionModal();
      }
   };

   self.sectionCompletionModal = function () {

      if (self.vaLineLabourReviewList.length > 0) {

         var valinelaborreviewcriteria = { vano: base.sectionNeedingCompletionActiveRec.vano, vasuf: base.sectionNeedingCompletionActiveRec.vasuf, seqno: base.sectionNeedingCompletionActiveRec.seqno, postdt: self.sectionCompletionModal.postdt, period: self.sectionCompletionModal.period };

         var updCriteria = { valinelaborreview: self.vaLineLabourReviewList, valinelaborreviewcriteria: valinelaborreviewcriteria, valinelaborreviewtotals: self.vaLineLaborReviewTotals, cThisFunction: 'vael' };

         DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updCriteria, busy: true }, function (data) {
            if (!MessageService.processMessaging(data)) {
               ModalService.showModal('va/vaei/value-add-section-completion.json', 'VaeiValueAddSectionCompletionCtrl as vasc', $scope, function (modal) {
                  self.vaAddSectionCompletionModal = modal;
               });
            }
         });
      }
   };

   self.lineExtendedInformation = function () {
      var selectedLabourLine = GridService.getSelectedRecord(self.vaLineLabourReviewListGrid);
      $state.go('^.lineextendinformation', { labourLine: selectedLabourLine });
   };

   self.navigateBack = function () {
      base.isShippingPreviousSections = false;
      $state.go('^.section', { vaeiRecord: base.vaMasterSelectedRecord });
   };

   self.launchValueAddSurplus = function (vano, vasuf) {
      var criteria = {
         pvPasspono: 0,
         pvPassposuf: 0,
         pvVano: vano,
         pvVasuf: vasuf,
         pvSctncode: '',//self.vaeiLabourLine.sctncode,
         pvCompletefl: true
      };

      $state.go('.valueaddreceiving-surplus', { menuFunction: 'vaei', vaReceiptCreateIiSectionRequestCriteria: criteria });
   };

   self.cancel = function () {
      if (base.isFullReceived) {
         self.launchValueAddSurplus(base.sectionNeedingCompletionActiveRec.vano, base.sectionNeedingCompletionActiveRec.vasuf);
         base.isFullReceived = false;
         self.isReviewLabour = true;
      }
   };
});

app.controller('VaeiUpdateControlledReviewLabourCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   self.vaAppliedLaborSectionDrpDwnCollection = [];
   self.vaLineLaborAppliedCollectionGrid = {};
   self.vaLineLaborAppliedCollection = [];
   self.labourAppliedTotals = {};
   self.subtitle = '';
   self.prevNetAmount = '';
   self.prevHours = '';
   self.prevMinutes = '';

   if ($stateParams.vaeiResults) {
      var dropDownResults = [];
      dropDownResults = $stateParams.vaeiResults;
      dropDownResults.forEach(function (item) {
         self.vaAppliedLaborSectionDrpDwnCollection.push(item);
      });
   }

   if ($stateParams.vaSelectedLabourLine) {

      self.vaeiLabourLine = $stateParams.vaSelectedLabourLine;

      self.subtitle = MessageService.get('va.order.number ') + ' ' + self.vaeiLabourLine.vano + ' | ' +
         MessageService.get('global.sequence.number') + ' ' + self.vaeiLabourLine.seqno + ' | ' +
         MessageService.get('global.section.type') + ' ' + self.vaeiLabourLine.sctntype;

      self.valaborAppliedLine = { vano: self.vaeiLabourLine.vano, vasuf: self.vaeiLabourLine.vasuf, seqno: self.vaeiLabourLine.seqno, userfield: self.vaeiLabourLine.userfield, functionnm: 'vaei' };

      DataService.post('api/va/asvasection/vaappliedlaborretrieve', { data: self.valaborAppliedLine, busy: true }, function (data) {
         if (data) {
            self.labourAppliedTotals = data.valinelaborappliedtotals;
            self.vaLineLaborAppliedCollection = data.valinelaborapplied;
            //Check the first default record on the Grid.
            self.labourAppliedTotals.seqno = self.vaAppliedLaborSectionDrpDwnCollection[0].seqno;
            self.percentage = 100;
         }
      });
   }

   self.drillDown = function () {
      var selectedLabourLine = GridService.getSelectedRecord(self.vaLineLabourReviewListGrid);
      $state.go('^.reviewlabourlinedetails', { selectedLabourLine: selectedLabourLine, reviewLabourList: self.vaLineLabourReviewList });
   };

   self.okControlledLabour = function () {
      var selectedAppliedLabourLine = GridService.getSelectedRecord(self.vaLineLaborAppliedCollectionGrid);

      self.valaborAppliedLine = { vano: selectedAppliedLabourLine.vano, vasuf: selectedAppliedLabourLine.vasuf, seqno: selectedAppliedLabourLine.seqno, userfield: selectedAppliedLabourLine.userfield, functionnm: 'vaei' };

      DataService.post('api/va/asvasection/vaappliedlaborupdate', { data: self.valaborAppliedLine, busy: true }, function (data) {
         if (data) {
            //self.labourAppliedTotals = data.valinelaborappliedtotals;
            //self.vaLineLaborAppliedCollection = data.valinelaborapplied;
            //Check the first default record on the Grid.
         }
      });

   };

   self.onAppliedLabourLineRecordSelection = function () {
      var selectedAppliedLabourLine = GridService.getSelectedRecord(self.vaLineLaborAppliedCollectionGrid);

      self.prevNetAmount = selectedAppliedLabourLine.netamt;
      self.prevHours = selectedAppliedLabourLine.hours;
      self.prevMinutes = selectedAppliedLabourLine.minutes;
   };

   self.onApplyPercentage = function () {
      //Update the Grid

   };

   self.applyAmountChange = function () {
      var selectedAppliedLabourLine = GridService.getSelectedRecord(self.vaLineLaborAppliedCollectionGrid);

      var originalSeconds = selectedAppliedLabourLine.timeelapsed;
      var netAmount = Number(selectedAppliedLabourLine.netamt);
      var netGlAmount = Number(selectedAppliedLabourLine.netglamtinfo);

      var originalMinutes = originalSeconds / 60;
      var usedMinutes = (netAmount > 0 && netGlAmount > 0) ? originalMinutes * (netAmount / netGlAmount) : 0;
      var usedMins = Number(usedMinutes);
      usedMins = (usedMinutes - usedMins >= 0.5) ? usedMins + 1 : usedMins;
      var controlled = usedMins * 60;

      selectedAppliedLabourLine.hours = Number(controlled) > 0 ? Number(controlled) / 3600 : 0;
      selectedAppliedLabourLine.minutes = Number(controlled) > 0 ? (Number(controlled) % 3600) / 60 : 0;
      selectedAppliedLabourLine.netamt = Number(selectedAppliedLabourLine.hours) > 0 ? (Number(controlled) % 3600) / 60 : 0;

   };

   self.hourMinutesChange = function () {
      var selectedAppliedLabourLine = GridService.getSelectedRecord(self.vaLineLaborAppliedCollectionGrid);

      if ((selectedAppliedLabourLine.hours * 60 * 60 + selectedAppliedLabourLine.minutes * 60) > selectedAppliedLabourLine.timeelapsed) {
         MessageService.info('global.error', 'Time entered cannot be greater than the estimated time'); //of {}
         selectedAppliedLabourLine.minutes = 0;
         selectedAppliedLabourLine.hours = 0;
      }
      else {
         selectedAppliedLabourLine.netamt = (selectedAppliedLabourLine.hours > 0 || selectedAppliedLabourLine.minutes > 0) ?
            (selectedAppliedLabourLine.hours + (Number(selectedAppliedLabourLine.minutes) / 60) * selectedAppliedLabourLine.prodcost) : 0;
      }
   };

   self.navigateBack = function () {
      base.isShippingPreviousSections = false;
      $state.go('^.section', { vaeiRecord: base.vaMasterSelectedRecord });
   };

   self.cancelControlledLabour = function () {
      var selectedAppliedLabourLine = GridService.getSelectedRecord(self.vaLineLaborAppliedCollectionGrid);
      selectedAppliedLabourLine.hours = self.hours;
      selectedAppliedLabourLine.minutes = self.prevMinutes;
      selectedAppliedLabourLine.netamt = self.netamt;
   };

   self.seqChange = function () {
      // Need to Check

   };
});

app.controller('VaeiReviewLabourLineDetailsCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.vaLineLabourReviewListGrid = {};
   self.reviewLabourList = [];
   self.selectedLabourLine = $stateParams.selectedLabourLine;
   self.reviewLabourList = $stateParams.reviewLabourList;

   self.prod = self.selectedLabourLine.shipprod + '-' + self.selectedLabourLine.proddesc;

   self.navigateBack = function () {
      $state.go('^.reviewlabour', { vaSelectedSectionNeededLine: self.selectedLabourLine });
   };

   self.submit = function () {
      var criteria = { vano: self.selectedLabourLine.vano, vasuf: self.selectedLabourLine.vasuf, seqno: self.selectedLabourLine.seqno, functionnm: base.MENU_FUNCTION_VAEI };

      self.reviewLabourList.forEach(function (line) {

         if (self.selectedLabourLine.lineno === line.lineno) {
            line.shipprod = self.selectedLabourLine.shipprod;
            line.timeslsrep = self.selectedLabourLine.timeslsrep;
            line.timeworkdt = self.selectedLabourLine.timeworkdt;
            line.prodcost = self.selectedLabourLine.prodcost;
            //TimeConverters
            //var timeFromSeconds = TimeConverters.SecondsSinceMidnight.convert(self.selectedLabourLine.timeelapsed);
            line.hours = self.selectedLabourLine.hours;//timeFromSeconds.substr(0, 2);
            line.minutes = self.selectedLabourLine.minutes;//timeFromSeconds.substr(3, 2);
            line.timeactty = self.selectedLabourLine.timeactty;
            line.timecomment = self.selectedLabourLine.timecomment;
            line.qtybasetotfl = self.selectedLabourLine.qtybasetotfl;
            line.netamt = self.selectedLabourLine.prodcost * (Number(line.hours) + Number(line.minutes) / 60);
            line.updatefl = true;
         }
      });

      var reviewLabourCalculateTotals = { valinelaborreview: self.reviewLabourList, valinelaborreviewcriteria: criteria };
      DataService.post('api/va/asvasection/vareviewlaborcalculatetotals', { data: reviewLabourCalculateTotals, busy: true }, function (data) {
         if (data.messaging.length > 0) {
            MessageService.processMessaging(data.messaging);
         }
         else {
            var updCriteria = { valinelaborreview: self.reviewLabourList, valinelaborreviewcriteria: criteria, valinelaborreviewtotals: data.valinelaborreviewtotals, cThisFunction: 'vael' };
            DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updCriteria, busy: true }, function (data) {
               if (data.length === 0) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^.reviewlabour', { vaSelectedSectionNeededLine: self.selectedLabourLine });
               }
            });
         }
      });
   };

   self.cancel = function () {
      $state.go('^.reviewlabour', { vaSelectedSectionNeededLine: self.selectedLabourLine });
   };
});

app.controller('VaeiValueAddSectionCompletionCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Sasoo, Utils) {
   var self = this;
   var base = $scope.base;

   if ($scope.snc) {
      var popup = $scope.snc;
   }
   else if ($scope.url) {
      var popup = $scope.url;
   }

   var postDate = Utils.getCurrentDate();
   var per = base.glPeriodFound || base.glPeriod;
   var sectionInfo = base.sectionNeedingCompletionActiveRec.vano + '-' + base.sectionNeedingCompletionActiveRec.vasuf + ', ' + base.sectionNeedingCompletionActiveRec.seqno;
   self.sectionCompletionModal = { postdt: postDate, period: base.glPeriod, stkadjfl: true, sectionInfo: sectionInfo };

   // Save
   self.submit = function () {
      var secCriteria = {
         vano: base.sectionNeedingCompletionActiveRec.vano,
         vasuf: base.sectionNeedingCompletionActiveRec.vasuf,
         seqno: base.sectionNeedingCompletionActiveRec.seqno,
         postdt: self.sectionCompletionModal.postdt,
         period: self.sectionCompletionModal.period,
         autoshipprevfl: base.isShippingPreviousSections,
         wlwhsechgfl: base.wlwhsechgfl,
         wiplist: ''
      }
      base.isShippingPreviousSections = false;
      DataService.post('api/va/asvasection/vasectioncomplete', { data: secCriteria, busy: true }, function (data) {
         if (data.length > 0) {

            data.forEach(function (mess) {
               if (mess.messagetype.toLowerCase() === 'e' && mess.messagetxt) {
                  MessageService.okCancel('global.error', mess.messagetxt, function () {
                     return;
                  }, function () {
                     //callback(false);
                  });
               }
               else {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^.master', { refreshSearch: true });
                  popup.vaAddSectionCompletionModal.destroy();
               }
            });
         }
         else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master', { refreshSearch: true });
            popup.vaAddSectionCompletionModal.destroy();
         }
      });
   };

   self.cancel = function () {
      base.isShippingPreviousSections = false;
      popup.vaAddSectionCompletionModal.destroy();
   };
});
