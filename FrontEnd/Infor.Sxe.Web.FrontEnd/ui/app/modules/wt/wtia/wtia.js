'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('wt', 'wtia', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('wt', 'wtia');

   $stateProvider.state('wtia.linedetail', {
      url: '/line-detail',
      params: {
         headerdetail: null,
         fromDrillDown: false,
         nounappr: 0
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtia/linedetail.json');
            },
            controller: 'WtiaLineDetailCtrl as linedtl'
         }
      }
   });

   $stateProvider.state('wtia.linedetail.updateapproval', {
      url: '/update-approval',
      params: {
         wtiaDetail: [],
         rownumber: 0,
         nounappr: 0
      },
      views: {
         lineDetailContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtia/updateapproval.json');
            },
            controller: 'WtiaLineUpdateApprovalCtrl as approveit'
         }
      }
   });

   //WT QUICKVIEW
   $stateProvider.state('wtia.quickview', {
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
   //WT QUICKVIEW TIES
   $stateProvider.state('wtia.quickview.ties', {
      url: '/ties',
      params: {
         wtno: null,
         wtsuf: null,
         lineno: null
      },
      templateProvider: function (JsonViewService) {
         return JsonViewService.getView('wt/shared/quickview/quickview-ties.json');
      },
      controller: 'WtQuickViewTiesCtrl as quickview-ties'
   });

   //Sub View for the print.  It's a sub-view so we can keep results between prints.
   $stateProvider.state('wtia.master.print', {
      url: '/print',
      params: {
         wtno: null,
         wtsuf: null,
         wtnox: null
      },
      views: {
         print: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtia/print.json');
            },
            controller: 'WtiaPrintCtrl as wtPrint'
         }
      }
   });

   //Sub View for the print.  It's a sub-view so we can keep results between prints.
   $stateProvider.state('wtia.linedetail.print', {
      url: '/print',
      params: {
         wtno: null,
         wtsuf: null,
         wtnox: null
      },
      views: {
         print: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtia/print.json');
            },
            controller: 'WtiaPrintCtrl as wtPrint'
         }
      }
   });
});

app.controller('WtiaBaseCtrl', function ($state, DataService, ReportService, UserService) {
   var self = this;
   self.MENU_FUNCTION_WTEP = 'WTEP';

   var wtPrintReport = ReportService.getReportFunction(self.MENU_FUNCTION_WTEP);
   self.securityWtPrint = wtPrintReport ? wtPrintReport.securitylevel : 0

   if (!self.autoPrintData) {
      self.autoPrintData = { autoPrint: false };
   }

   self.initializeCriteria = function () {
      self.criteria = {
         tyWT: true,
         tyDO: true,
         recordcountlimit: 500,
         cono: UserService.getCono()
      };
   }

   self.isMaster = function () {
      return $state.is('wtia.master');
   };

   self.includesMaster = function () {
      return $state.includes('wtia.master');
   };

   self.isLineDetail = function () {
      return $state.is('wtia.linedetail');
   };

   self.includesLineDetail = function () {
      return $state.includes('wtia.linedetail');
   };

   self.isUpdateApprovalLineDetail = function () {
      return $state.is('wtia.linedetail.updateapproval');
   };

   self.includesUpdateApprovalLineDetail = function () {
      return $state.includes('wtia.linedetail.updateapproval');
   };

   self.isQuickViewDetail = function () {
      return $state.is('wtia.quickview');
   };

   self.includesQuickViewDetail = function () {
      return $state.includes('wtia.quickview-ties');
   };

   self.isQuickViewDetail = function () {
      return $state.is('wtia.quickview-ties');
   };

   self.includesQuickViewDetail = function () {
      return $state.includes('wtia.quickview');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/wt/aswtinquiry/wtiareportlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.wtiareptlistresults;
      });
   };

   self.initializeCriteria();
});

app.controller('WtiaSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.initializeCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('^.master');
      }

      base.search();
   };
});

app.controller('WtiaMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.linedetail', { wtno: record.wtno, wtsuf: record.wtsuf, headerdetail: record });
   };

   self.inquireOrder = function (e, args) {
      var record = args[0].item;
      $state.go('wtit.detail', { pk: record.wtno, pk2: record.wtsuf });
   }

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.getApproveLabel = function () {
      return !base.autoPrintData || !base.autoPrintData.autoPrint ? MessageService.get('global.approve.all.lines') : MessageService.get('global.approve.all.lines.auto.print.enabled');
   };

   self.quickViewContinue = function (wteh) {
      if (wteh) {
         $state.go('wtia.quickview', {
            wtno: wteh.wtno,
            wtsuf: wteh.wtsuf,
            cono: wteh.cono,
            cono2: wteh.cono2,
            prevState: $state.current.name
         });
      }
   }

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

   self.print = function () {
      $state.go('.print');
   };

   //Feature only available if only one WT is selected from the Grid.
   self.printSingleTransfer = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      if (selectedRow && selectedRow.wtnox) {
         $state.go('.print', { wtno: selectedRow.wtno, wtsuf: selectedRow.wtsuf, wtnox: selectedRow.wtnox.trim() });
      }
   };

   //If the user has selected 'autoprint' from the Print screen, for the life of the time the user
   //is in the function, that will remain set.  If set, if the user approves WT's, the backend
   //call will fire off the WTEP (WT Pick Ticket) print.  It always uses the Pick Printer assigned
   //on the ICSD('From' Warehouse) record.
   self.approveLines = function () {
      var counter = 0;
      var errors = 0;
      var records = GridService.getSelectedRecords(base.grid);

      if (records) {
         records.forEach(function (wt) {
            var approveCriteria = {
               rowidWteh: wt.rowidWteh,
               approvefl: true,
               security: base.securityWtPrint,
               autoprintfl: base.autoPrintData.autoPrint,
               pickprintfl: true,
               printernmwt: '' //Whse is always pulled from the From ICSD whse 'Pick Ticket' printer in the backend call.
            };
            DataService.post('api/wt/aswtinquiry/wtiareportapprove', { data: approveCriteria, busy: true }, function () {
               counter++;
               if (counter === records.length) {
                  self.refreshMaster(errors, true);
               }
            }, function () {
               counter++;
               errors++;
               if (counter === records.length) {
                  self.refreshMaster(errors, true);
               }
            });
         });
      }
   };

   self.denyLines = function () {
      var counter = 0;
      var errors = 0;
      var records = GridService.getSelectedRecords(base.grid);

      if (records) {
         records.forEach(function (wt) {
            var denyCriteria = {
               rowidWteh: wt.rowidWteh,
               approvefl: false,
               security: base.securityWTPrint
            };
            DataService.post('api/wt/aswtinquiry/wtiareportapprove', { data: denyCriteria, busy: true }, function () {
               counter++;
               if (counter === records.length) {
                  self.refreshMaster(errors, false);
               }
            }, function () {
               counter++;
               errors++;
               if (counter === records.length) {
                  self.refreshMaster(errors, false);
               }
            });
         });
      }
   };

   self.refreshMaster = function (errorCount, isApprove) {
      if (errorCount) {
         MessageService.info('global.information', 'message.save.operation.completed.with.errors');
      } else {
         if (isApprove) {
            if (base.autoPrintData && base.autoPrintData.autoPrint) {
               MessageService.info('global.information', 'message.approval.including.autoprint.completed.successfully');
            } else {
               MessageService.info('global.information', 'message.approval.completed.successfully');
            }
         } else {
            MessageService.info('global.information', 'message.denial.completed.successfully');
         }
      }

      //NOTE: By design, we are not refreshing the master grid results.  The reason, the user
      //needs to see the list so they can print from the list.  Otherwise if they disappear, it's
      //difficult to know the WT #'s.  The user needs to re-search.  Realize, at this time, the
      //'wtiareportapprove' call does not have any return payload (i.e. any quantity updates).
      //That would be an enhancement to the backend call.

      //User Hook (do not rename)
      if (self.refreshMasterContinue) {
         self.refreshMasterContinue(errorCount, isApprove);
      }
   };
});

app.controller('WtiaLineDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService, Utils, SecurityService) {
   var self = this;

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('wtia', 'Header') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('wtia', 'Line Items') < 3;

   if ($stateParams.headerdetail) {

      self.headerdetail = $stateParams.headerdetail;
      self.headerdetail.wtformatted = self.headerdetail.wtno + '-' + Utils.pad(self.headerdetail.wtsuf,2);
      self.subTitle = $translate.instant('global.warehouse.transfer.number') + ": " + self.headerdetail.wtformatted;
      self.headerdetail.shipfmwhsefullname = self.headerdetail.shipfmwhse + ' - ' + self.headerdetail.shipfmname;
      self.headerdetail.shiptowhsefullname = self.headerdetail.shiptowhse + ' - ' + self.headerdetail.shiptoname;
      self.headerdetail.stagecd = -1;


      DataService.get('api/wt/aswtentry/wtesheaderretrieve/' + self.headerdetail.wtno + '/' + self.headerdetail.wtsuf + '/', { busy: true }, function (data) {
         self.wtesHeader = data;
         self.headerdetail.boIndicator = data.borelfl ? $translate.instant('global.back.order').toUpperCase() : '';
         self.headerdetail.wttype = data.wttype;
         self.headerdetail.shipfmcono = data.cono;
         self.headerdetail.shiptocono = data.cono2;
         self.headerdetail.stagecd = data.stagecd;

         self.shipViaDescription = '';
         self.reasoncodeDesc = '';

         if (self.wtesHeader.stagecd === 0) { //request stage
            //These loads can all be run in synch - not dependent
            // Load Lines
            DataService.post('api/wt/aswtinquiry/wtialine', { data: { wtno: self.headerdetail.wtno, wtsuf: self.headerdetail.wtsuf }, busy: true }, function (data) {
               self.dataset = data;
            });
            // Load Ship Via Description
            if (self.wtesHeader.shipviaty) {
               var shipViaParams = {
                  codeiden: 'S',
                  codeval: self.wtesHeader.shipviaty,
                  fldlist: 'descrip'
               };
               DataService.get('api/sa/sasta/getbypk', { params: shipViaParams, busy: true }, function (data) {
                  if (data) {
                     self.shipViaDescription = data.descrip;
                  }
               });
            }
            // Load Reason code Description
            if (self.wtesHeader.reasoncode) {
               var reasoncodeParams = {
                  codeiden: 'RT',
                  codeval: self.wtesHeader.reasoncode,
                  fldlist: 'descrip'
               };
               DataService.get('api/sa/sasta/getbypk', { params: reasoncodeParams, busy: true }, function (data) {
                  if (data) {
                     self.reasoncodeDesc = data.descrip;
                  }
               });
            }
            if ($stateParams.fromDrillDown) {
               self.headerdetail.nounappr = $stateParams.nounappr;
            }
         }
         else if ($stateParams.fromDrillDown) {
            self.headerdetail.nounappr = $stateParams.nounappr;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
         else if (self.wtesHeader.stagecd === 1) {
            MessageService.error('global.message', 'message.order.is.approved');
            $state.go('wtia.master', { refreshSearch: true }, { reload: 'wtia.master' });
         }
         else { // most likely cancel (9)
            MessageService.error('global.error', 'error.stage.not.valid.5659');
            $state.go('wtia.master', { refreshSearch: true }, { reload: 'wtia.master' });
         }
      });
   }

   self.returnToMaster = function () {
      $state.go('wtia.master', { refreshSearch: true }, { reload: 'wtia.master' });
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      var rownumber = args[0].row;
      $state.go('^.linedetail.updateapproval', {
         wtiaDetail: record,
         rownumber: rownumber,
         nounappr: self.headerdetail.nounappr
      });
   };

   self.printSingleTransfer = function () {
      if (self.headerdetail) {
         $state.go('.print', { wtno: self.headerdetail.wtno, wtsuf: self.headerdetail.wtsuf, wtnox: self.headerdetail.wtformatted });
      }
   };

   self.setApproval = function (approvalfl) {
      var records = GridService.getSelectedRecords(self.grid);
      var counter = 0;
      var errorCount = 0;

      if (records) {
         records.forEach(function (wtline) {
            var wtiaLineUpdateCriteria = {
               prodtype: wtline.prodtype,
               bofl: wtline.bofl,
               qtyship: wtline.qtyship,
               approvefl: approvalfl,
               rowidWtel: wtline.rowidWtel,
               wTNo: self.headerdetail.wtno,
               wTSuf: self.headerdetail.wtsuf
            };

            DataService.post('api/wt/aswtinquiry/wtialineupdate', { data: wtiaLineUpdateCriteria, busy: true }, function () {
               counter++;
               self.headerdetail.nounappr--;

               var objToFind = self.dataset.find(function (obj) { return obj.rowidWtel === wtline.rowidWtel; });
               if (objToFind) {
                  self.dataset = self.dataset.filter(function (item) { return item !== objToFind; });
               }
               if (counter === records.length) {
                  self.finishLineUpdates(errorCount);
               }
            }, function () {
               counter++;
               errorCount++;
               if (counter === records.length) {
                  self.finishLineUpdates(errorCount);
               }
            });
         });
      };
   };

   self.finishLineUpdates = function (errorCount) {
      if (errorCount) {
         MessageService.info('global.information', 'message.save.operation.completed.with.errors');
      } else {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      }
   }

});

app.controller('WtiaLineUpdateApprovalCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   //approveit
   var self = this;

   self.wtiaDetail = $stateParams.wtiaDetail;
   self.nounappr = $stateParams.nounappr;
   self.rownumber = $stateParams.rownumber;

   self.headerdetail = $scope.$parent.linedtl.headerdetail;
   self.subTitle = self.headerdetail.wtno + '-' + Utils.pad(self.headerdetail.wtsuf, 2) + ' | ' + self.wtiaDetail.lineno;
   self.approvety = self.wtiaDetail.approvety;
   self.qtyship = self.wtiaDetail.qtyship;
   self.origqtyship = self.wtiaDetail.qtyship;
   self.viewonly = (self.wtiaDetail.approvety !== 'r');
   self.bofl = self.wtiaDetail.bofl;
   self.origbofl = self.bofl;

   self.changeApproveType = function () {
      if (self.approvety.toLowerCase() !== 'y') {
         self.qtyship = self.origqtyship;
         self.bofl = self.origbofl;
      }
   };

   self.performUpdate = function (wtiaLineUpdateCriteria2) {
      DataService.post('api/wt/aswtinquiry/wtialineupdate', { data: wtiaLineUpdateCriteria2, busy: true }, function () {
         if (wtiaLineUpdateCriteria2.approvefl.toLowerCase() !== 'r') {
            self.nounappr--;
         }
         $state.go('wtia.linedetail', { fromDrillDown: true, nounappr: self.nounappr });
      });
   };

   self.save = function () {
      var wtiaLineUpdateCriteria = {
         prodtype: self.wtiaDetail.prodtype,
         bofl: self.bofl,
         qtyship: self.qtyship,
         approvefl: self.approvety,
         rowidWtel: self.wtiaDetail.rowidWtel,
         wTNo: self.headerdetail.wtno,
         wTSuf: self.headerdetail.wtsuf,
         lCountFl: false
      };

      if (self.qtyship > self.wtiaDetail.qtyord) {
         MessageService.error('global.error', 'error.qty.shipped.has.exceeded.qty.ordered.5644');
      }
      else if ((self.qtyship !== 0) && (self.qtyship > self.wtiaDetail.netAvailable)) {

         MessageService.yesNo('global.question', 'question.require.physical.count',
                      function () {
                         // Yes processing
                         wtiaLineUpdateCriteria.lCountFl = true;
                         MessageService.yesNo('global.question', 'question.force.quantity.shipped', function () {
                            // Yes processing
                            self.performUpdate(wtiaLineUpdateCriteria);
                         }, function () {
                            // No processing
                            wtiaLineUpdateCriteria.qtyship = 0;
                            self.performUpdate(wtiaLineUpdateCriteria);
                         });
                      }, function () {
                         // No processing
                         MessageService.yesNo('global.question', 'question.force.quantity.shipped', function () {
                            // Yes processing
                            self.performUpdate(wtiaLineUpdateCriteria);
                         }, function () {
                            // No processing
                            wtiaLineUpdateCriteria.qtyship = 0;
                            self.performUpdate(wtiaLineUpdateCriteria);
                         });
                      });
      }
      else {
         self.performUpdate(wtiaLineUpdateCriteria);
      }
   };
});

app.controller('WtiaRowDetailCtrl', function ($scope, MessageService) {
   var self = this;
   var mst = $scope.mst;
   self.data = mst.rowParams.item;
   self.data.qtyshipBefore = self.data.qtyship;

   self.checkQtyShip = function () {
      if (self.data.qtyship > self.data.qtyord) {
         MessageService.error('global.error', 'error.qty.shipped.has.exceeded.qty.ordered.5644');
         self.data.qtyship = self.data.qtyshipBefore;
      }
   };
});

app.controller('WtiaPrintCtrl', function ($state, $scope, $stateParams, DataService, GlobalValueService, UserService, ReportService, MessageService, Utils) {
      var self = this;
      var base = $scope.base;
      self.isPrintPickTicketEnabled = true;

      self.autoPrintEnabled = true;

      self.printLoadCriteria = {
         wtno: 0,
         wtsuf: 0,
         pickprintfl: true,
         printernm: ''
      };

      if (!base.autoPrintData) {
         base.autoPrintData = { autoPrint: base.autoPrintDefault };
      }

      self.orderChangedContinue = function (data) {

         //Get the 'from' warehouse so we can default in the printer.
         var params = {
            wtno: data.wtno,
            wtsuf: data.wtsuf,
            fldlist: 'shipfmwhse'
         };

         //User Hook (do not rename)
         if (self.orderChangedContinueCriteria) {
            self.orderChangedContinueCriteria();
         }

         DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (wtehData) {
            if (wtehData) {
               self.printWtWarehouse = wtehData.shipfmwhse;

               //User Hook (do not rename)
               if (self.orderChangedContinueCallback) {
                  self.orderChangedContinueCallback(wtehData);
               }
            }
         });
      }

      self.orderChanged = function (args) {
         if (args.value) {
            if (args.value > 0) {
               self.printLoadCriteria.wtno = args.value;
               self.printLoadCriteria.wtsuf = args.value2;

               DataService.post('api/wt/aswtheader/wtetprintinitialize', { data: self.printLoadCriteria, busy: true }, function (data) {
                  if (data) {
                     self.printLoadCriteria = data;

                     self.orderChangedContinue(data);
                  }
               });
            }
         } else {
            self.printLoadCriteria.wtno = '';
            self.printLoadCriteria.wtsuf = '';
         }
      };

      if ($stateParams.wtno) {
         self.fullOrderNumber = $stateParams.wtnox;

         //Need to force the Change Event so we get the backend call to occur.
         self.orderChanged({ value: $stateParams.wtno, value2: $stateParams.wtsuf });
      }

      self.autoPrintChanged = function () {
         if (base.autoPrintData) {
            GlobalValueService.set('Global.AutoPrint', base.autoPrintData.autoPrint);
         }
      };

      self.submit = function () {
         DataService.post('api/wt/aswtheader/wtetprintrun', { data: { printersettings: self.pickTicketSettings, wtetprint: self.printLoadCriteria }, busy: true }, function (data) {
            MessageService.info('global.information', 'message.your.print.request.has.been.sent');
            if (base.autoPrintData.autoPrint) {
               base.autoPrintData.pickTicketSettings = self.pickTicketSettings;
               base.autoPrintData.printLoadCriteria = self.printLoadCriteria;
            } else {
               base.autoPrintData.pickTicketSettings = {};
               base.autoPrintData.printLoadCriteria = {};
            }
         });
      };
   });

