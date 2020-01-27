'use strict';

app.provider('KitState', function KitStateProvider($stateProvider, BinAllocationStateProvider) {
   var self = this;

   /**
    * Provider access method
    */
   this.$get = [function () {
      return self;
   }];

   /**
    * These States are used to help make it easier to implement, and share code.  Having them in this control means
    * that it doesn't need these states in each place this ins called.
    */
   this.addStates = function (module, menuFn, parentState) {
      BinAllocationStateProvider.addStates(module, menuFn, parentState + '.componentDetails');
      // Line Entry - Kit - Add Group state
      $stateProvider.state(parentState + '.addGroup', {
         url: '/add-group',
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/add-group.json');
               },
               controller: 'KitAddGroupCtrl as kitAg'
            }
         }
      });

      // Line Entry - Kit - Delete Lines state
      $stateProvider.state(parentState + '.deleteLines', {
         url: '/delete-lines',
         params: {
            deleteComponents: null
         },
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/delete-lines.json');
               },
               controller: 'KitDeleteLinesCtrl as kitDl'
            }
         }
      });

      // Line Entry - Kit - Cross Reference state
      $stateProvider.state(parentState + '.crossReference', {
         url: '/cross-reference',
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/cross-reference.json');
               },
               controller: 'KitCrossReferenceCtrl as kitCr'
            }
         }
      });

      // Line Entry - Kit - Multi-Component Sourcing state
      $stateProvider.state(parentState + '.multiCompSourcing', {
         url: '/multi-component-sourcing',
         params: {
            title: 'global.kits',
            subTitle: 'global.multi.comp.sourcing',
            oehdr: null,
            tie: null,
            oeline: null,
            orderTypes: null,
            oelineComponent: null,
            isWhseAvailGridVisible: false,
            isLimitShipVia: null,
            sourceFieldChangedCallback: null,
            cancelCallback: null,
            finishCallback: null,
            backCallback: null,
            conoForIcWhseAvailCriteria: null,
            whseTypeForIcWhseAvailCriteria: null,
            showDocDisposition: false
         },
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/sourcing/sourcing.json');
               },
               controller: 'OeSourcingCtrl as src'
            }
         }
      });

      // Line Entry - Kit - Group Component state
      $stateProvider.state(parentState + '.groupComponent', {
         url: '/group-component',
         params: {
            selectedComponent: null,
            matchedSubComponents: null
         },
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/group-component.json');
               },
               controller: 'KitGroupComponentCtrl as kitG'
            }
         }
      });

      // Line Entry - Kit - Option Component state
      $stateProvider.state(parentState + '.optionComponent', {
         url: '/option-component',
         params: {
            selectedComponent: null,
            matchedSubComponents: null
         },
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/option-component.json');
               },
               controller: 'KitOptionComponentCtrl as kitO'
            }
         }
      });

      // Line Entry - Kit - Option Component - Add Option state
      $stateProvider.state(parentState + '.optionComponent.addOption', {
         url: '/add',
         params: {
            selectedOption: null
         },
         views: {
            kitOptionComponentChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/add-option.json');
               },
               controller: 'KitOptionComponentAddCtrl as kitOa'
            }
         }
      });

      // Line Entry - Kit - Keyword Component state
      $stateProvider.state(parentState + '.keywordComponent', {
         url: '/keyword-component',
         params: {
            groupName: null
         },
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/keyword-component.json');
               },
               controller: 'KitKeywordComponentCtrl as kitK'
            }
         }
      });

      // Line Entry - Kit - Component Details state
      $stateProvider.state(parentState + '.componentDetails', {
         url: '/component-details',
         params: {
            component: null,
            matchedSubComponents: null,
            componentType: null,
            isFromKPEWMaster: null
         },
         views: {
            kitsChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/component-details.json');
               },
               controller: 'KitComponentDetailsCtrl as kitCd'
            }
         }
      });

      // Line Entry - Kit - Component Details - Sourcing state
      $stateProvider.state(parentState + '.componentDetails.sourcing', {
         url: '/sourcing',
         params: {
            title: 'global.kits',
            subTitle: 'global.component.sourcing',
            oehdr: null,
            tie: null,
            tieOrderAltNoRef: null,
            oeline: null,
            orderTypes: null,
            oelineComponent: null,
            isWhseAvailGridVisible: true,
            isLimitShipVia: null,
            sourceFieldChangedCallback: null,
            cancelCallback: null,
            finishCallback: null,
            backCallback: null,
            conoForIcWhseAvailCriteria: null,
            whseTypeForIcWhseAvailCriteria: null,
            showDocDisposition: false
         },
         views: {
            kitsComponentDetailChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/sourcing/sourcing.json');
               },
               controller: 'OeSourcingCtrl as src'
            }
         }
      });

      // Line Entry - Kit - Component Details - Non-Stock state
      $stateProvider.state(parentState + '.componentDetails.nonStock', {
         url: '/non-stock',
         views: {
            kitsComponentDetailChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/component-non-stock.json');
               },
               controller: 'KitComponentDetailsNonStockCtrl as kitCdNs'
            }
         }
      });

      // Line Entry - Kit - Component Details - Subs state
      $stateProvider.state(parentState + '.componentDetails.substitutes', {
         url: '/substitutes',
         views: {
            kitsComponentDetailChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/component-substitutes.json');
               },
               controller: 'KitComponentDetailsSubstitutesCtrl as kitCdS'
            }
         }
      });

      // Line Entry - Kit - Component Details - Serials state
      $stateProvider.state(parentState + '.componentDetails.serials', {
         url: '/serials',
         views: {
            kitsComponentDetailChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/component-serials.json');
               },
               controller: 'KitComponentDetailsSerialsCtrl as kitCdSer'
            }
         }
      });

      // Line Entry - Kit - Component Details - Lots state
      $stateProvider.state(parentState + '.componentDetails.lots', {
         url: '/lots',
         views: {
            kitsComponentDetailChildView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/kits/component-lots.json');
               },
               controller: 'KitComponentDetailsLotsCtrl as kitCdLot'
            }
         }
      });

      // Line Entry - Kit - Component Details - Warehouse Manager states
      $stateProvider.state(parentState + '.bin-allocation', {
         url: '/bin-allocation',
         params: {
            criteria: null,
            binallocationRowId: null,
            binAllocationDisabled: null,
            submittedCallback: null,
            actionsCallback: null
         },
         views: {
            binAllocation: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/bin-allocation/bin-allocation.json');
               },
               controller: 'BinAllocationCtrl as bac'
            }
         }
      });
      $stateProvider.state(parentState + '.bin-allocation.create', {
         url: '/create',
         views: {
            create: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/bin-allocation/bin-allocation-row-add.json');
               },
               controller: 'BinAllocationRowAddCtrl as baccrt'
            }
         }
      });
   };
});

app.controller('KitCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService, MessageService, GridService, UserService) {
   //alias => kit
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   self.baseState = options.baseState;
   self.parentState = $state.current.name;
   self.header = Utils.getNestedValue($scope, options.headerRef);
   self.line = Utils.getNestedValue($scope, options.lineRef);
   self.sourcingHeader = {};
   self.sourcingCollection = [];
   self.limitShipVia = false;
   self.lineEntryMode = '';
   self.componentForNotes = [];
   self.isFromKPEWMaster = self.header.prevState === 'kpew.master';
   var isKPEWSourcing = false;

   //User Hook (do not rename) - This variable is used by customizations, do not rename.
   self.conoForIcWhseAvailCriteria = UserService.getCono();

   //User Hook (do not rename) - This variable is used by customizations, do not rename.
   self.whseTypeForIcWhseAvailCriteria = 's';   //'s' is No Consignments.

   if (self.baseState === 'oeet') {
      self.sourcingHeader = Utils.getNestedValue($scope, options.sourcingHeaderRef);
      self.sourcingCollection = Utils.getNestedValue($scope, options.sourcingCollectionRef);
      self.limitShipVia = Utils.getNestedValue($scope, options.limitShipVia);
      self.lineEntryMode = Utils.getNestedValue($scope, options.lineEntryMode);
   } else if (self.baseState === 'oees') {
      self.header.whse = self.line.whse;
      self.header.custno = self.line.custno;
      //self.header.ictype
      self.header.shipto = self.line.shipto;
      self.header.ourproc = 'oees';
      self.header.currproc = 'oees';
   } else if (self.baseState === 'kpew') {
      self.sourcingHeader = Utils.getNestedValue($scope, options.sourcingHeaderRef);
      self.sourcingCollection = Utils.getNestedValue($scope, options.sourcingCollectionRef);
      if (self.sourcingHeader && self.sourcingCollection.length > 0) {
         isKPEWSourcing = true;
      }
   }

   self.kitSingle = {};

   // initialize kit
   if (self.line.cfgkitfl && (self.line.kitrollty.toLowerCase() !== 'p' || self.line.kitrollty.toLowerCase() !== 'b')) {
      self.line.manprice = true;
   } else {
      self.line.manprice = false;
   }
   self.kitCriteria = {
      orderno: self.header.orderno,
      ordersuf: self.header.ordersuf,
      ordtype: (self.baseState === 'kpew') ? 'w' : 'o',
      whse: self.header.whse,
      kitprod: self.line.prod,
      lineno: (self.baseState === 'kpew') ? 0 : self.line.lineno,
      stkqtyord: self.line.stkqtyord,
      addfl: true,
      inquiryfl: false,
      optionsfl: true,
      keywordsfl: true,
      seriallotfl: true,
      deletefl: true,
      verno: self.line.verno,
      specNsType: self.line.specnstype,
      returnfl: self.line.returnfl,
      fabwhse: self.line.bodfabwhse
   };
   if (self.baseState === 'kpew') {
      if (self.header.kpworkorder) {
         self.kitCriteria.stkqtyord = self.header.kpworkorder.stkqtyord;
      }
   }

   DataService.post('api/oe/asoeinquiry/loadtcomps', { data: self.kitCriteria, busy: true }, function (data) {
      if (data) {
         self.kitCriteria = data.kitscriteria;
         self.kitSingle = data.loadtcompssingle;
         self.kitResultsCollection = data.loadtcompsresults;
         self.kitSubResultsCollection = data.loadtcompssubresults;

         if (self.baseState === 'oeet') {
            self.sourcingHeader = {
               runmode: 'comp',
               orderdisp: self.header.orderdisp,
               orderno: self.header.orderno,
               ordersuf: self.header.ordersuf,
               ourproc: self.baseState,
               transtype: self.header.oetype,
               whse: self.header.whse
            };
            var lineTieRetrieveRequest = {
               oeline: self.line,
               oelinelinetiehdr: self.sourcingHeader
            };
            DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
               if (data) {
                  self.sourcingCollection = data;
               }
            });
         } else if (!isKPEWSourcing) {
            self.sourcingHeader = {
               runmode: 'comp',
               orderno: self.header.orderno,
               ordersuf: self.header.ordersuf,
               ourproc: self.baseState,
               transtype: '',
               whse: self.header.whse,
               maintmode: 'c',
               orderdisp: ''
            };

            DataService.post('api/kp/askpentry/kpcomptieretrieve', { data: self.sourcingHeader, busy: true }, function (data) {
               if (data && data.length > 0) {
                  self.line.oeelkrowid = data[0].oeelkrowid;
                  self.sourcingCollection = data;
               }
            });
         }
      }

      //User Hook (do not rename)
      if (self.loadtcompsContinue) {
         self.loadtcompsContinue();
      }
   });

   self.isKit = function () {
      return $state.is(self.parentState);
   };

   self.isAddGroup = function () {
      return $state.is(self.parentState + '.addGroup');
   };

   self.isDeleteLines = function () {
      return $state.is(self.parentState + '.deleteLines');
   };

   self.isCrossReference = function () {
      return $state.is(self.parentState + '.crossReference');
   };

   self.isGroupComponent = function () {
      return $state.is(self.parentState + '.groupComponent');
   };

   self.isOptionComponent = function () {
      return $state.is(self.parentState + '.optionComponent');
   };

   self.isKeywordComponent = function () {
      return $state.is(self.parentState + '.keywordComponent');
   };

   self.isComponentDetails = function () {
      return $state.is(self.parentState + '.componentDetails');
   };

   self.getSubTitle = function () {
      if (self.kitSingle.prod) {
         var subTitle = self.kitSingle.prod + ' - ' + self.kitSingle.proddesc;
         if (self.kitSingle.reqnsmsgvisible) {
            subTitle += " | " + self.kitSingle.reqnsmsg;
         }
         return subTitle;
      } else {
         return '';
      }
   };

   self.addGroupClicked = function () {
      $state.go('.addGroup');
   };

   self.addComponentClicked = function () {
      $state.go('.componentDetails', { component: {}, componentType: 'add', isFromKPEWMaster: self.isFromKPEWMaster });
   };

   self.deleteComponentClicked = function () {
      var deleteComponents = [];
      // All the actual components
      self.kitResultsCollection.forEach(function (subComponent) {
         deleteComponents.push(subComponent);
      });
      // Group Subcomponents only - added Keywords and Options are actual components
      self.kitSubResultsCollection.forEach(function (subComponent) {
         if (subComponent.comptype.toLowerCase() === 'g') {
            deleteComponents.push(subComponent);
         }
      });
      $state.go('.deleteLines', { deleteComponents: deleteComponents });
   };

   self.crossReferenceClicked = function () {
      $state.go('.crossReference');
   };

   self.orderAltNoHyperlinkClicked = function (e, args) {
      var currentRow = args[0].item;

      switch (currentRow.orderalttype.toLowerCase()) {
      //need orderaltno & suffix is always 0 for each nav
      case "t":
         $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: 0 });
         break;
      case "p":
         $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
         break;
      case "w":
         $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: 0 });
         break;
      }
   };

   self.sourcingClicked = function () {
      self.navToSourcing(false);
   };

   self.navToSourcing = function (isGroupComponentSourcing, groupComponent, groupSubComponents, selectedSubComponents) {
      self.compSourcingCriteria = {
         orderno: self.header.orderno,
         ordersuf: self.header.ordersuf
      };
      var multiCompSourcePreValidateRequest = {
         loadtcompssingle: self.kitSingle,
         multilinesourcing: self.compSourcingCriteria
      };
      if (isGroupComponentSourcing) {
         multiCompSourcePreValidateRequest.loadtcompsresults = {};
         multiCompSourcePreValidateRequest.loadtcompssubresults = selectedSubComponents;
      } else {
         multiCompSourcePreValidateRequest.loadtcompsresults = GridService.getSelectedRecords(self.kitGrid);
         multiCompSourcePreValidateRequest.loadtcompssubresults = {};
      }
      if (self.baseState === 'kpew') {
         DataService.post('api/kp/askpentry/kpmulticompsourcingprevalidate', { data: multiCompSourcePreValidateRequest, busy: true }, function (data) {
            if (data) {
               self.compSourcingCriteria = data;

               var lineTieTypeCriteria = {
                  runmode: 'multi-comp',
                  ourproc: self.baseState,
                  whse: self.header.whse,
                  transtype: self.header.oetype
               };
               DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (data) {
                  if (data) {
                     self.orderTypes = base.getOrderTypesFromTieDropdownData(data);

                     self.sourcingHeader = {
                        runmode: 'multi-comp',
                        orderdisp: self.header.orderdisp,
                        orderno: self.header.orderno,
                        ordersuf: self.header.ordersuf,
                        ourproc: self.baseState,
                        transtype: self.header.oetype,
                        whse: self.header.whse
                     };
                     var lineTieRetrieveRequest = self.sourcingHeader;
                     DataService.post('api/kp/askpentry/kpcomptieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
                        if (data) {
                           self.kitComponentSourcingMasterTie = data[0];
                           self.sourcingCollection.push(data[0]);

                           if (isGroupComponentSourcing) {
                              //save off component and sub components so we can nav back after sourcing
                              self.groupBeingSourced = groupComponent;
                              self.groupBeingSourcedSubComponents = groupSubComponents;

                              $state.go('^.multiCompSourcing', {
                                 oehdr: self.header,
                                 tie: self.kitComponentSourcingMasterTie,
                                 oeline: self.line,
                                 orderTypes: 'kit.orderTypes',
                                 isLimitShipVia: self.limitShipVia,
                                 sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
                                 cancelCallback: self.sourcingCancelCallback,
                                 finishCallback: self.sourcingKPFinishCallback,
                                 backCallback: self.sourcingCancelCallback,
                                 conoForIcWhseAvailCriteria: self.conoForIcWhseAvailCriteria,
                                 whseTypeForIcWhseAvailCriteria: self.whseTypeForIcWhseAvailCriteria
                              });
                           } else {
                              $state.go('.multiCompSourcing', {
                                 oehdr: self.header,
                                 tie: self.kitComponentSourcingMasterTie,
                                 oeline: self.line,
                                 orderTypes: 'kit.orderTypes',
                                 isLimitShipVia: self.limitShipVia,
                                 sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
                                 cancelCallback: self.sourcingCancelCallback,
                                 finishCallback: self.sourcingKPFinishCallback,
                                 backCallback: self.sourcingCancelCallback,
                                 conoForIcWhseAvailCriteria: self.conoForIcWhseAvailCriteria,
                                 whseTypeForIcWhseAvailCriteria: self.whseTypeForIcWhseAvailCriteria
                              });
                           }
                        }
                     });
                  }
               });
            }
         });
      }
      else {
         DataService.post('api/oe/asoelineextra/oemulticompsourcingprevalidate', { data: multiCompSourcePreValidateRequest, busy: true }, function (data) {
            if (data) {
               self.compSourcingCriteria = data;

               var lineTieTypeCriteria = {
                  runmode: 'multi-comp',
                  ourproc: self.baseState,
                  whse: self.header.whse,
                  transtype: self.header.oetype
               };
               DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (data) {
                  if (data) {
                     self.orderTypes = base.getOrderTypesFromTieDropdownData(data);

                     self.sourcingHeader = {
                        runmode: 'multi-comp',
                        orderdisp: self.header.orderdisp,
                        orderno: self.header.orderno,
                        ordersuf: self.header.ordersuf,
                        ourproc: self.baseState,
                        transtype: self.header.oetype,
                        whse: self.header.whse
                     };
                     var lineTieRetrieveRequest = {
                        oeline: self.line,
                        oelinelinetiehdr: self.sourcingHeader
                     };
                     DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
                        if (data) {
                           self.kitComponentSourcingMasterTie = data[0];
                           self.sourcingCollection.push(data[0]);

                           if (isGroupComponentSourcing) {
                              //save off component and sub components so we can nav back after sourcing
                              self.groupBeingSourced = groupComponent;
                              self.groupBeingSourcedSubComponents = groupSubComponents;

                              $state.go('^.multiCompSourcing', {
                                 oehdr: self.header,
                                 tie: self.kitComponentSourcingMasterTie,
                                 oeline: self.line,
                                 orderTypes: 'kit.orderTypes',
                                 isLimitShipVia: self.limitShipVia,
                                 sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
                                 cancelCallback: self.sourcingCancelCallback,
                                 finishCallback: self.sourcingFinishCallback,
                                 backCallback: self.sourcingCancelCallback,
                                 conoForIcWhseAvailCriteria: self.conoForIcWhseAvailCriteria,
                                 whseTypeForIcWhseAvailCriteria: self.whseTypeForIcWhseAvailCriteria
                              });
                           } else {
                              $state.go('.multiCompSourcing', {
                                 oehdr: self.header,
                                 tie: self.kitComponentSourcingMasterTie,
                                 oeline: self.line,
                                 orderTypes: 'kit.orderTypes',
                                 isLimitShipVia: self.limitShipVia,
                                 sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
                                 cancelCallback: self.sourcingCancelCallback,
                                 finishCallback: self.sourcingFinishCallback,
                                 backCallback: self.sourcingCancelCallback,
                                 conoForIcWhseAvailCriteria: self.conoForIcWhseAvailCriteria,
                                 whseTypeForIcWhseAvailCriteria: self.whseTypeForIcWhseAvailCriteria
                              });
                           }
                        }
                     });
                  }
               });
            }
         });
      }

   };

   self.sourcingFieldChangedCallback = function (fieldName) {
      if (self.baseState === 'kpew') {
         var kpTieLeaveFieldRequest = {
            oelinelinetie: self.kitComponentSourcingMasterTie,
            oelinelinetiehdr: self.sourcingHeader,
            cFieldName: fieldName
         };
         DataService.post('api/kp/askpentry/kpcomptieleavefield', { data: kpTieLeaveFieldRequest, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);
               Utils.replaceObject(self.kitComponentSourcingMasterTie, data.oelinelinetie);

               //User Hook (do not rename)
               if (self.kpCompTieLeaveFieldContinue) {
                  self.kpCompTieLeaveFieldContinue(data);
               }
            }
         });
      }
      else {
         var lineTieLeaveFieldRequest = {
            oeline: {}, //empty oeline by design for multi-comp sourcing
            oelinelinetie: self.kitComponentSourcingMasterTie,
            oelinelinetiehdr: self.sourcingHeader,
            cFieldName: fieldName
         };
         DataService.post('api/oe/asoeline/oelinelinetieleavefield', { data: lineTieLeaveFieldRequest, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);
               Utils.replaceObject(self.kitComponentSourcingMasterTie, data.oelinelinetie);

               //User Hook (do not rename)
               if (self.oeLineLineTieLeaveFieldContinue) {
                  self.oeLineLineTieLeaveFieldContinue(data);
               }
            }
         });
      }
   };

   self.sourcingCancelCallback = function () {
      var compTieToRemove = new JSLINQ(self.sourcingCollection).Where(function (comp) { return comp.seqno === 0; }) || [];
      if (compTieToRemove.items.length > 0) {
         var compIndex = self.sourcingCollection.indexOf(compTieToRemove);
         self.sourcingCollection.splice(compIndex, 1);
      }
      if (self.groupBeingSourced) {
         $state.go('^.groupComponent', { selectedComponent: self.groupBeingSourced, matchedSubComponents: self.groupBeingSourcedSubComponents });
         self.groupBeingSourced = null;
         self.groupBeingSourcedSubComponents = null;
      } else {
         $state.go('^');
      }
   };

   self.sourcingFinishCallback = function () {
      var lineTieValidateRequest = {
         oeline: self.line,
         oelinelinetie: self.kitComponentSourcingMasterTie,
         oelinelinetiehdr: self.sourcingHeader
      };
      DataService.post('api/oe/asoeline/oelinelinetievalidate', { data: lineTieValidateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.kitComponentSourcingMasterTie = data.oelinelinetie;
               //replace the tie in the ongoing collection
               var compTieToRemove = new JSLINQ(self.sourcingCollection).Where(function (comp) { return comp.seqno === 0; }) || [];
               if (compTieToRemove.items.length > 0) {
                  var compIndex = self.sourcingCollection.indexOf(compTieToRemove.items[0]);
                  self.sourcingCollection.splice(compIndex, 1, self.kitComponentSourcingMasterTie);
               }

               var multiCompSourcingUpdateRequest = {
                  oelinelinetie: self.sourcingCollection,
                  multilinesourcing: self.compSourcingCriteria
               };
               DataService.post('api/oe/asoelineextra/oemulticompsourcingupdate', { data: multiCompSourcingUpdateRequest, busy: true }, function (data) {
                  if (data) {
                     MessageService.processMessaging(data.messaging);

                     self.sourcingCollection = data.oelinelinetie;

                     if (self.groupBeingSourced) {
                        $state.go('^.groupComponent', { selectedComponent: self.groupBeingSourced, matchedSubComponents: self.groupBeingSourcedSubComponents });
                        self.groupBeingSourced = null;
                        self.groupBeingSourcedSubComponents = null;
                     } else {
                        $state.go('^');
                     }
                  }
               });
            }
         }
      });
   };

   self.sourcingKPFinishCallback = function () {
      var kpTieValidateRequest = {
         oelinelinetie: self.kitComponentSourcingMasterTie,
         oelinelinetiehdr: self.sourcingHeader
      };
      DataService.post('api/kp/askpentry/kpcomptievalidate', { data: kpTieValidateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.kitComponentSourcingMasterTie = data.oelinelinetie;
               //replace the tie in the ongoing collection
               var compTieToRemove = new JSLINQ(self.sourcingCollection).Where(function (comp) { return comp.seqno === 0; }) || [];
               if (compTieToRemove.items.length > 0) {
                  var compIndex = self.sourcingCollection.indexOf(compTieToRemove.items[0]);
                  self.sourcingCollection.splice(compIndex, 1, self.kitComponentSourcingMasterTie);
               }

               var multiCompSourcingUpdateRequest = {
                  oelinelinetie: self.sourcingCollection,
                  multilinesourcing: self.compSourcingCriteria
               };
               DataService.post('api/kp/askpentry/kpmulticompsourcingupdate', { data: multiCompSourcingUpdateRequest, busy: true }, function (data) {
                  if (data) {
                     MessageService.processMessaging(data.messaging);

                     self.sourcingCollection = data.oelinelinetie;

                     // Existing Work Order - Create ties right away
                     if (self.isFromKPEWMaster) {
                        var kpUpdateRequest = {
                           oelinelinetie: self.sourcingCollection,
                           oelinelinetiehdr: self.sourcingHeader
                        };
                        DataService.post('api/kp/askpentry/kpcomptieupdate', { data: kpUpdateRequest, busy: true }, function (data) {
                           if (data) {
                              MessageService.processMessaging(data);
                              if (self.groupBeingSourced) {
                                 $state.go('^.groupComponent', { selectedComponent: self.groupBeingSourced, matchedSubComponents: self.groupBeingSourcedSubComponents });
                                 self.groupBeingSourced = null;
                                 self.groupBeingSourcedSubComponents = null;
                              } else {
                                 $state.go('^', null, { reload: '^' });
                              }
                           }
                        });
                     } else {
                        // For a new Work Order, ties will be created when/if Work Order Saved so just go back to
                        // the correct view
                        if (self.groupBeingSourced) {
                           $state.go('^.groupComponent', { selectedComponent: self.groupBeingSourced, matchedSubComponents: self.groupBeingSourcedSubComponents });
                           self.groupBeingSourced = null;
                           self.groupBeingSourcedSubComponents = null;
                        } else {
                           $state.go('^');
                        }
                     }
                  }
               });
            }
         }
      });
   };

   self.drilldownClicked = function (e, args) {
      // do not allow editing if modification is disabled
      if (!self.kitSingle.mmodifyaproductenabled) {
         MessageService.error('global.error', 'message.modification.of.this.component.is.not.allowed');
      } else {
         var selectedComponent = args[0].item;
         if (selectedComponent.fromoeelk) { // actual component - go to kit details screen
            $state.go('.componentDetails', {
               component: selectedComponent,
               componentType: 'details',
               isFromKPEWMaster: self.isFromKPEWMaster
            });
         } else { // sub-component - go to sub screen
            if (selectedComponent.comptype.toLowerCase() === 'k') { //keyword
               $state.go('.keywordComponent', { groupName: selectedComponent.groupname });
            } else { //sub-component
               var matchedSubComponents = [];
               self.kitSubResultsCollection.forEach(function (subComponent) {
                  if (selectedComponent.comptype === subComponent.comptype && selectedComponent.groupname === subComponent.groupname) {
                     matchedSubComponents.push(subComponent);
                  }
               });

               if (matchedSubComponents.length > 0) {
                  if (selectedComponent.comptype.toLowerCase() === 'g') { //group component
                     $state.go('.groupComponent', { selectedComponent: selectedComponent, matchedSubComponents: matchedSubComponents });
                  } else if (selectedComponent.comptype.toLowerCase() === 'o') { //option component
                     $state.go('.optionComponent', { selectedComponent: selectedComponent, matchedSubComponents: matchedSubComponents });
                  }
               } else {
                  //go to kit details screen
                  $state.go('.componentDetails', {
                     component: selectedComponent,
                     componentType: 'details',
                     isFromKPEWMaster: self.isFromKPEWMaster
                  });
               }
            }
         }
      }
   };

   self.rowSelected = function () {
      var components = GridService.getSelectedRecords(self.kitGrid);
      //If only one grid row is selected, then fire the notes.
      if (components && components.length === 1) {
         self.componentForNotes = components[0];
      } else {
         self.componentForNotes = [];
      }
   };

   self.back = function () {
      if (self.baseState.includes('oeet')) {
         if (ale) {
            ale.kitComponentSourcingHeader = self.sourcingHeader;
            ale.kitComponentSourcingCollection = self.sourcingCollection;
         }
         $state.go('^');
      } else if (self.baseState === 'kpew') {
         if (self.isFromKPEWMaster) {
            $state.go(self.header.prevState, {
               kpworkorder: self.header.kpworkorder
            });
         } else {

            if ($stateParams.compDoneCallback) {
               $stateParams.compDoneCallback(self.sourcingHeader, self.sourcingCollection, self.header.kpworkorder);
            }
         }
      }
      else {
         $state.go('^.detail');
      }
   };
});

app.controller('KitAddGroupCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   //alias => kitAg
   var self = this;
   var kit = $scope.kit;

   self.quantity = 1;
   self.sequence = 0;

   self.submit = function () {
      var kitCriteria = kit.kitCriteria;
      kitCriteria.ourproc = 'oeetl';

      var addGroupRequest = {
         oelinelinetie: kit.sourcingCollection,
         kitscriteria: kitCriteria,
         cGroupNm: self.group,
         iAddBefore: self.sequence,
         iGrpQty: self.quantity,
         cFabWhse: kitCriteria.fabwhse
      };
      DataService.post('api/oe/asoeline/kitaddgroup', { data: addGroupRequest, busy: true }, function (data) {
         if (data) {
            kit.kitResultsCollection = data.loadtcompsresults;
            kit.kitSubResultsCollection = data.loadtcompssubresults;
            kit.sourcingCollection = data.oelinelinetie;

            if ($stateParams.updateFromKitCallback) {
               $stateParams.updateFromKitCallback(kit.line);
            }

            $state.go('^');
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitDeleteLinesCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   //alias => kitDl
   var self = this;
   var kit = $scope.kit;

   self.deleteComponentsCollection = $stateParams.deleteComponents;
   self.deleteComponentsCollection.sort(function (a, b) {
      return a.brseqno - b.brseqno;
   });

   self.submit = function () {
      var selectedComponents = GridService.getSelectedRecords(self.componentGrid);
      var submitCollection = [];

      selectedComponents.forEach(function (component) {
         // if deleting a keyword, group or option, need to pass the sub-components (if any) instead of the component
         if (component.comptype.toLowerCase() === 'g' && component.groupname === component.shipprod) {
            // group subcomponents are always in kitSubResultsCollection
            kit.kitSubResultsCollection.forEach(function (subComponent) {
               if (subComponent.comptype === component.comptype && subComponent.groupname === component.groupname) {
                  if (submitCollection.indexOf(subComponent) === -1) {
                     submitCollection.push(subComponent);
                  }
               }
            });
         } else if ((component.comptype.toLowerCase() === 'o' || component.comptype.toLowerCase() === 'k') && component.groupname === component.shipprod) {
            // added option and keyword subcomponents are in kitResultsCollection
            kit.kitResultsCollection.forEach(function (subComponent) {
               if (subComponent.comptype === component.comptype && subComponent.groupname === component.groupname && subComponent.groupname !== subComponent.shipprod) {
                  if (submitCollection.indexOf(subComponent) === -1) {
                     submitCollection.push(subComponent);
                  }
               }
            });
         } else {
            if (submitCollection.indexOf(component) === -1) {
               submitCollection.push(component);
            }
         }
      });

      var kitDeleteRequest = {
         loadtcompsresults: submitCollection,
         loadtcompssubresults: [],
         kitscriteria: kit.kitCriteria
      };
      DataService.post('api/oe/asoeline/kitdelete', { data: kitDeleteRequest, busy: true }, function (data) {
         if (data) {

            // if errors, some components may still have been deleted and the datasets need to be rebuilt
            MessageService.processMessaging(data.messaging);

            if (data.loadtcompssingle) {
               kit.kitSingle = data.loadtcompssingle;
            }

            // After delete, need to remove deleted components and subs from sourcing
            var deletedComponents = [];
            var deletedSubComponents = [];
            kit.kitResultsCollection.forEach(function (oldComponent) {
               var foundInNew = false;
               if (oldComponent.fromoeelk) {
                  data.loadtcompsresults.forEach(function (newComponent) {
                     if (oldComponent.oeelkrowid === newComponent.oeelkrowid) {
                        foundInNew = true;
                        // this will happen if deleted component causes the components to be resequenced - need to
                        // adjust the existing seqnos in the sourcingCollection for multi-comp sourcing
                        if (oldComponent.seqno !== newComponent.seqno) {
                           kit.sourcingCollection.forEach(function (compTie) {
                              if (compTie.oeelkrowid === newComponent.oeelkrowid) {
                                 compTie.seqno = newComponent.seqno;
                              }
                           });
                        }
                     }
                  });
                  if (!foundInNew) {
                     deletedComponents.push(oldComponent);
                  }
               }
            });
            kit.kitSubResultsCollection.forEach(function (oldSubComponent) {
               var foundSubInNew = false;
               if (oldSubComponent.fromoeelk) {
                  data.loadtcompssubresults.forEach(function (newSubComponent) {
                     if (oldSubComponent.oeelkrowid === newSubComponent.oeelkrowid) {
                        foundSubInNew = true;
                        // this will happen if deleted component causes the components to be resequenced - need to
                        // adjust the existing seqnos in the sourcingCollection for multi-comp sourcing
                        if (oldSubComponent.seqno !== newSubComponent.seqno) {
                           kit.sourcingCollection.forEach(function (compTie) {
                              if (compTie.oeelkrowid === newSubComponent.oeelkrowid) {
                                 compTie.seqno = newSubComponent.seqno;
                              }
                           });
                        }
                     }
                  });
                  if (!foundSubInNew) {
                     deletedSubComponents.push(oldSubComponent);
                  }
               }
            });

            deletedComponents.forEach(function (deletedComp) {
               kit.sourcingCollection.forEach(function (deletedTie) {
                  if (deletedComp.oeelkrowid === deletedTie.oeelkrowid) {
                     var compIndex = kit.sourcingCollection.indexOf(deletedTie);
                     kit.sourcingCollection.splice(compIndex, 1);
                  }
               });
            });
            deletedSubComponents.forEach(function (deletedSubComp) {
               kit.sourcingCollection.forEach(function (deletedSubTie) {
                  if (deletedSubComp.oeelkrowid === deletedSubTie.oeelkrowid) {
                     var subIndex = kit.sourcingCollection.indexOf(deletedSubTie);
                     kit.sourcingCollection.splice(subIndex, 1);
                  }
               });
            });

            kit.kitResultsCollection = data.loadtcompsresults;
            kit.kitSubResultsCollection = data.loadtcompssubresults;

            if ($stateParams.updateFromKitCallback) {
               $stateParams.updateFromKitCallback(kit.line);
            }

            $state.go('^');
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitCrossReferenceCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => kitCr
   var self = this;
   var kit = $scope.kit;

   self.xRefComponents = [];
   kit.kitResultsCollection.forEach(function (component) {
      if (component.comptype.toLowerCase() === 'c') {
         self.xRefComponents.push({ label: component.prodname, value: { seqno: component.seqno, prod: component.prodname } });
      }
   });
   kit.kitSubResultsCollection.forEach(function (subComponent) {
      if (subComponent.seqno !== 0) {
         self.xRefComponents.push({ label: subComponent.prodname, value: { seqno: subComponent.seqno, prod: subComponent.prodname } });
      }
   });

   self.xRefComponentSelected = function () {
      if (self.selectedXRefComponent && (self.selectedXRefComponent.seqno || self.selectedXRefComponent.prod)) {
         var xRefToSearch = null;
         // search the components for a selected cross reference
         kit.kitResultsCollection.forEach(function (component) {
            if (component.seqno === self.selectedXRefComponent.seqno && component.prodname === self.selectedXRefComponent.prod) {
               xRefToSearch = component;
            }
         });
         // if no component is selected, search the sub-components for a selected cross reference
         if (!xRefToSearch) {
            kit.kitSubResultsCollection.forEach(function (subComponent) {
               if (subComponent.seqno === self.selectedXRefComponent.seqno && subComponent.prodname === self.selectedXRefComponent.prod) {
                  xRefToSearch = subComponent;
               }
            });
         }
         // if neither a component or sub-component is selected, (which should never happen) show error
         if (!xRefToSearch) {
            MessageService.error('global.error', 'message.please.select.a.record');
         } else {
            var checkProdXRefCriteria = {
               prod: xRefToSearch.shipprod,
               whse: xRefToSearch.whse,
               type: 'ps',
               custno: kit.header.custno,
               shipto: kit.header.shipto,
               vendno: kit.line.vendno
            };
            DataService.post('api/ic/asicwhseprod/checkproductcrossreference', { data: checkProdXRefCriteria, busy: true }, function (data) {
               if (data) {
                  self.crossReferenceCollection = data.checkprodxrefresults;
                  if (self.crossReferenceCollection.length === 0) {
                     MessageService.info('global.information', 'message.no.cross.references.found.for.this.component');
                  }
               }
            });
         }
      } else {
         self.crossReferenceCollection = [];
      }
   };

   self.kitCrossReference = function (selectedComponent, selectedXRef, isSubComponent) {
      var kitResults;
      var kitSubResults;
      if (isSubComponent) {
         kitResults = {};
         kitSubResults = selectedComponent;
      } else {
         kitResults = selectedComponent;
         kitSubResults = {};
      }

      var kitCrossReferenceRequest = {
         loadtcompsresults: kitResults,
         loadtcompssubresults: kitSubResults,
         oelinelinetie: kit.sourcingCollection,
         kitscriteria: kit.kitCriteria,
         kitcrossrefcriteria: {
            prod: selectedXRef.prod,
            unit: selectedXRef.unit,
            type: selectedXRef.type,
            whse: selectedComponent.whse,
            qty: 1
         }
      };
      DataService.post('api/oe/asoeline/kitcrossreference', { data: kitCrossReferenceRequest, busy: true }, function (data) {
         if (data) {
            if (data.loadtcompssingle) {
               kit.kitSingle = data.loadtcompssingle;
            }
            kit.kitResultsCollection = data.loadtcompsresults;
            kit.kitSubResultsCollection = data.loadtcompssubresults;
            kit.sourcingCollection = data.oelinelinetie;

            $state.go('^');
         }
      });
   };

   self.submit = function () {
      var xRefToUse = null;
      kit.kitResultsCollection.forEach(function (component) {
         if (component.seqno === self.selectedXRefComponent.seqno && component.prodname === self.selectedXRefComponent.prod) {
            xRefToUse = component;
         }
      });
      if (xRefToUse) {
         self.kitCrossReference(self.selectedXRefComponent, xRefToUse, false);
      } else {
         kit.kitSubResultsCollection.forEach(function (subComponent) {
            if (subComponent.seqno === self.selectedXRefComponent.seqno && subComponent.prodname === self.selectedXRefComponent.prod) {
               xRefToUse = subComponent;
            }
         });
         if (xRefToUse) {
            self.kitCrossReference(self.selectedXRefComponent, xRefToUse, true);
         } else {
            MessageService.error('global.error', 'message.please.select.a.record');
         }
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitGroupComponentCtrl', function ($scope, $state, $stateParams, $translate, GridService) {
   //alias => kitG
   var self = this;
   var kit = $scope.kit;

   self.component = $stateParams.selectedComponent;
   self.subComponentsCollection = $stateParams.matchedSubComponents;

   self.getTitle = function () {
      return $translate.instant('global.kit') + ': ' + kit.kitSingle.prod + ' - ' + kit.kitSingle.proddesc;
   };

   self.getSubTitle = function () {
      return $translate.instant('global.group') + ': ' + self.component.prodname;
   };

   self.multiCompSourcingClicked = function () {
      kit.navToSourcing(true, self.component, self.subComponentsCollection, GridService.getSelectedRecords(self.subComponentGrid));
   };

   self.drilldownClicked = function (e, args) {
      var selectedComponent = args[0].item;
      $state.go('^.componentDetails', {
         component: selectedComponent,
         matchedSubComponents: self.subComponentsCollection,
         componentType: 'group',
         isFromKPEWMaster: kit.isFromKPEWMaster
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitOptionComponentCtrl', function ($scope, $state, $stateParams, $translate, GridService) {
   //alias => kitO
   var self = this;
   var kit = $scope.kit;

   self.component = $stateParams.selectedComponent;
   self.subComponentsCollection = $stateParams.matchedSubComponents;

   self.isAddOption = function () {
      return $state.is(kit.parentState + '.optionComponent.addOption');
   };

   self.getTitle = function () {
      return $translate.instant('global.kit') + ': ' + kit.kitSingle.prod + ' - ' + kit.kitSingle.proddesc;
   };

   self.getSubTitle = function () {
      return $translate.instant('global.option') + ': ' + self.component.prodname;
   };

   self.addOption = function () {
      var selectedOption = GridService.getSelectedRecord(self.subComponentGrid);

      $state.go('.addOption', { selectedOption: selectedOption });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitOptionComponentAddCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   //alias => kitOa
   var self = this;
   var kit = $scope.kit;

   self.selectedOption = $stateParams.selectedOption;
   self.selectedOption.seqbef = 0;

   self.getSubTitle = function () {
      return $translate.instant('global.product') + ': ' + self.selectedOption.prodname;
   };

   self.submit = function () {
      var subResults = [];
      subResults.push(self.selectedOption);
      var kitOptionCreateRequest = {
         loadtcompsresults: [],
         loadtcompssubresults: subResults,
         oelinelinetie: kit.sourcingCollection,
         kitscriteria: kit.kitCriteria,
         loadtcompssingle: kit.kitSingle
      };
      DataService.post('api/oe/asoeline/kitoptioncreate', { data: kitOptionCreateRequest, busy: true }, function (data) {
         if (data) {
            if (data.loadtcompssingle) {
               kit.kitSingle = data.loadtcompssingle;
            }
            kit.kitResultsCollection = data.loadtcompsresults;
            kit.kitSubResultsCollection = data.loadtcompssubresults;
            kit.sourcingCollection = data.oelinelinetie;

            if ($stateParams.updateFromKitCallback) {
               $stateParams.updateFromKitCallback(kit.line);
            }

            $state.go(kit.parentState);
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitKeywordComponentCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, ModalService) {
   //alias => kitK
   var self = this;
   var kit = $scope.kit;

   self.groupName = $stateParams.groupName;

   var createKeywordsRequest = {
      kitscriteria: kit.kitCriteria,
      cKeyWords: self.groupName
   };
   DataService.post('api/oe/asoeinquiry/kitcreatekeywordstt', { data: createKeywordsRequest, busy: true }, function (data) {
      if (data) {
         self.isAddEnabled = data.lKeyWdAddEnabledFl;
         self.keywordsCollection = data.kitcreatekwdsttresults;
      }
   });

   self.getTitle = function () {
      return $translate.instant('global.kit') + ': ' + kit.kitSingle.prod + ' - ' + kit.kitSingle.proddesc;
   };

   self.getSubTitle = function () {
      return $translate.instant('global.keyword') + ': ' + self.groupName;
   };

   self.closeModalAndNav = function () {
      self.keywordSequenceModal.destroy();
      $state.go(kit.parentState);
   };

   self.submit = function () {
      ModalService.showModal('shared/kits/add-keyword.json', 'KitAddKeywordModalCtrl as kitKa', $scope, function (modal) {
         self.keywordSequenceModal = modal;
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitAddKeywordModalCtrl', function ($scope, $stateParams, $translate, GridService, DataService) {
   //alias => kitKa
   var self = this;
   var kit = $scope.kit;
   var kitK = $scope.kitK;

   var selectedKeywords = GridService.getSelectedRecords(kitK.keywordsGrid);
   self.sequenceNumber = 0;

   self.submit = function () {
      selectedKeywords.forEach(function (keyword) {
         keyword.addfl = true;
         keyword.addnewfl = true;
         keyword.seqbef = self.sequenceNumber;
      });
      var kitAddKeywordRequest = {
         kitcreatekwdsttresults: selectedKeywords,
         oelinelinetie: kit.sourcingCollection,
         kitscriteria: kit.kitCriteria,
         cKeyword: kitK.groupName
      };
      DataService.post('api/oe/asoeline/kitaddkeyword', { data: kitAddKeywordRequest, busy: true }, function (data) {
         if (data) {
            if (data.loadtcompssingle) {
               kit.kitSingle = data.loadtcompssingle;
            }
            kit.kitResultsCollection = data.loadtcompsresults;
            kit.kitSubResultsCollection = data.loadtcompssubresults;
            kit.sourcingCollection = data.oelinelinetie;

            if ($stateParams.updateFromKitCallback) {
               $stateParams.updateFromKitCallback(kit.line);
            }

            kitK.closeModalAndNav();
         }
      });
   };

   self.cancel = function () {
      kitK.keywordSequenceModal.destroy();
   };
});