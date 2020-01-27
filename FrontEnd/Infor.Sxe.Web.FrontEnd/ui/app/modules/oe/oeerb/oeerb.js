'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('oe', 'oeerb', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oeerb');

   $stateProvider.state('oeerb.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeerb/create.json');
            },
            controller: 'OeerbCreateCtrl as crt'
         }
      }
   });

   $stateProvider.state('oeerb.detail', {
      url: '/detail',
      params: { orderno: null, ordersuf: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeerb/detail.json');
            },
            controller: 'OeerbDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('oeerb.updaterelease', {
      url: '/update-release',
      params: { blanketReleaseLineItem: null, oeBlanketUpdByReleaseSingle: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeerb/update-release.json');
            },
            controller: 'OeerbUpdateReleaseCtrl as ubr'
         }
      }
   });
});

app.controller('OeerbBaseCtrl', function ($state, $translate, AodataService, DataService, Sasoo) {
   var self = this;
   self.criteria = { orderNumber: 0 };
   self.orderno = 0;
   self.ordersuf = 0;
   self.qtyordlabel = '';
   self.qtyremainlabel = '';

   // Check if Sales Whse is turned on and the Operator can use it
   self.isSASOSalesWhseOn = Sasoo.oesaleswhsety.toLowerCase() === 'yes';
   self.isAOSalesWhseOn = AodataService.getValue("OE", "OESalesWarehouse").toLowerCase() === 'yes';

   self.isMaster = function () {
      return $state.is('oeerb.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeerb.master');
   };

   self.isDetail = function () {
      return $state.is('oeerb.detail');
   };

   self.includesDetail = function () {
      return $state.includes('oeerb.detail');
   };

   self.splitOrder = function () {
      var order = self.criteria.orderNumber.split('-');
      if (order.length === 2) {
         self.orderno = order[0];
         self.ordersuf = order[1];
      }
      else {
         self.orderno = order;
         self.ordersuf = '00';
      }
   };

   // Perform search and update data set for the grid
   self.search = function () {

      if (self.criteria.orderNumber) {
         self.splitOrder();
         self.oeBlanketCriteria = { orderno: self.orderno };
         DataService.post('api/oe/asoeentry/oeerbvalidateblanketorder', { data: self.oeBlanketCriteria, busy: true }, function (data) {
            self.oeBlanketValidateSingle = data.oeblanketvalidatesingle;
            self.buildgrid();
         });
      }
      else {
         self.dataset = [];
         self.oeBlanketValidateSingle = {};
      }
   };

   self.buildgrid = function () {
      if (self.oeBlanketCriteria) {
         DataService.post('api/oe/asoeentry/oeerbbuildblankettemptable', { data: self.oeBlanketCriteria, busy: true }, function (data) {
            self.dataset = data.oeblanketresults;
         });
      }
   };

   // Translate string on the fly - the string to be translated must be setup in the language .json file as a global string
   // example: 'Drop Down Option 1 (new)' becomes global.drop.down.option.1.new and should be setup as such in the .json file
   self.translateLabel = function (origstr) {
      if (!origstr) {
         return '';
      }
      // format to global. and replace all blanks and '/' slashes with a '.', remove '(' and ')'
      var str = 'global.' + origstr.toLowerCase().replace(/ /g, '.').replace(/\//g, '.').replace(/\(/g, '').replace(/\)/g, '').replace(/:/g, '');

      return $translate.instant(str);

   }; // translateLabel
});

app.controller('OeerbSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;

   // Hyperlink to OEIO
   self.navigateToOeio = function () {
      base.splitOrder();
      $state.go('oeio.detail', { pk: base.orderno, pk2: base.ordersuf });
   };

   self.navigateToAric = function () {
      if (base.oeBlanketValidateSingle) {
         $state.go('aric.detail', { pk: base.oeBlanketValidateSingle.custno });
      }
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(base.criteria);
      base.oeBlanketValidateSingle = {};
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeerb.master');
      }
      base.search();
   };
});

app.controller('OeerbMasterCtrl', function ($scope, $state, $stateParams, SecurityService, GridService, MessageService, DataService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drillDown = function (e, args) {
      self.oeerbSelectedRecord = args[0].item;

      if (self.oeerbSelectedRecord) {
         if (self.oeerbSelectedRecord.stagecd) {
            MessageService.info('global.information', 'message.this.release.has.already.been.converted');
         } else {
            // Drill down to detail view and start in edit mode
            $state.go('^.detail', { orderno: self.oeerbSelectedRecord.orderno, ordersuf: self.oeerbSelectedRecord.ordersuf });
         }
      }

   };

   self.deleteOeerb = function () {
      var FUNCTION_NAME = 'oeerb';
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var oeblanketdeleteorders = [];
            records.forEach(function (record) {
               oeblanketdeleteorders.push({
                  orderno: record.orderno,
                  ordersuf: record.ordersuf,
                  transtype: record.transtype,
                  stagecd: record.stagecd
               });
            });

            DataService.post('api/oe/asoeentry/oeerbdeleteblanketreleases', { data: { oeblanketdeletecriteria: { secure: SecurityService.getSecurityLevel(FUNCTION_NAME) }, oeblanketdeleteorders: oeblanketdeleteorders }, busy: true }, function () {
               // Returned 'data' is not used here, we just refresh the grid
               base.buildgrid();
            });
         }
      });
   };

   self.oeInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
      }
   };

   self.arInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   self.altStageFormatter = function (row, cell, value) {
      if (value) {

         // From g-postg.i
         if (value.toLowerCase() === 'ent') {
            return MessageService.get('global.entered');
         } else if (value.toLowerCase() === 'ord') {
            return MessageService.get('global.ordered');
         } else if (value.toLowerCase() === 'prt') {
            return MessageService.get('global.printed');
         } else if (value.toLowerCase() === 'ack') {
            return MessageService.get('global.acknowledged');
         } else if (value.toLowerCase() === 'pre') {
            return MessageService.get('global.pre.receiving');
         } else if (value.toLowerCase() === 'rcv') {
            return MessageService.get('global.received');
         } else if (value.toLowerCase() === 'cst') {
            return MessageService.get('global.costed');
         } else if (value.toLowerCase() === 'cls') {
            return MessageService.get('global.closed');
         } else if (value.toLowerCase() === 'inv') {
            return MessageService.get('global.invoiced');
         } else if (value.toLowerCase() === 'shp') {
            return MessageService.get('global.shipped');
         } else if (value.toLowerCase() === 'pck') {
            return MessageService.get('global.picked');
         } else if (value.toLowerCase() === 'pd') {
            return MessageService.get('global.paid');
         }
         else {
            return MessageService.get('global.cancelled');
         }

      } else {
         return value;
      }
   };

});

app.controller('OeerbCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var OEERB_TABLENAME = 'oeeh';

   if (base.orderno) {
      self.orderno = base.orderno;
      self.ordersuf = base.ordersuf;
   }

   /**
    * Load the GeoCode lookup criteria
    */
   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: OEERB_TABLENAME,
         orderno: self.oeBlanketReleaseSingle.orderno,
         ordersuf: 0,
         city: self.oeBlanketReleaseSingle.shiptocity,
         state: self.oeBlanketReleaseSingle.shiptost,
         zipcd: self.oeBlanketReleaseSingle.shiptozip,
         geocd: self.oeBlanketReleaseSingle.geocd,
         country: self.oeBlanketReleaseSingle.countrycd,
         streetaddr: self.oeBlanketReleaseSingle.shiptoaddr1,
         outofcityfl: self.oeBlanketReleaseSingle.outofcityfl
      };
   };

   // Save
   self.submit = function () {
      if (self.orderno) {

         var criteria = {
            oeBlanketReleaseCriteria: {
               orderno: self.orderno,
               ordersuf: self.oeBlanketReleaseSingle.ordersuf
            },
            oeblanketreleasesingle: self.oeBlanketReleaseSingle
         };

         if (self.addressControl.validate()) {
            DataService.post('api/oe/asoeentry/oeerbcreatenewblanketrelease', { data: criteria, busy: true }, function (data) {
               if (!MessageService.processMessaging(data)) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');

                  // Refresh the master grid with the new release row
                  base.buildgrid();

                  // Navigate to detail drilldown view after creating new release and place in edit mode
                  $state.go('^.detail', { orderno: self.orderno, ordersuf: self.oeBlanketReleaseSingle.ordersuf });
               }
            });
         }
      }
   };

   self.shipToSelected = function () {
      var criteria = {
         oeblanketreleasecriteria: {
            orderno: self.orderno,
            ordersuf: self.oeBlanketReleaseSingle.ordersuf
         },
         oeblanketreleasesingle: self.oeBlanketReleaseSingle
      };

      DataService.post('api/oe/asoeentry/oeerbdisplayshiptoinformation', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.oeBlanketReleaseSingle = data;

            self.getGeoCodeLookupCriteria();
         }
      });
   };

   if (self.orderno) {
      // We only pass oe number to this call, not suffix
      var setupCriteria = { orderno: base.orderno };

      DataService.post('api/oe/asoeentry/oeerbsetupscreenfornextrelease', { data: setupCriteria, busy: true }, function (data) {
         self.oeBlanketReleaseSingle = data;
         self.releaseCount = (data.ordersuf - 1);

         self.getGeoCodeLookupCriteria();
      });
   }
});

app.controller('OeerbDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils, TabService, SecurityService) {
   var self = this;
   var base = $scope.base;

   self.orderno = $stateParams.orderno;
   self.ordersuf = $stateParams.ordersuf;
   self.displayOrderNumber = self.orderno + '-' + Utils.pad(self.ordersuf, 2);

   base.orderno = self.orderno;
   base.ordersuf = self.ordersuf;

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('oeerb', 'Header') < 3;
   self.isLineTabReadonly = SecurityService.getSubSecurityLevel('oeerb', 'Line Items') < 3;

   self.subTitle = MessageService.get('global.order.number') + ': ' + base.orderno;

   self.convertStage = function () {
      var stage = self.oeBlanketBannerSingle.stage;
      switch (stage) {
         case '(Ord)':                                                                                      //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = MessageService.get('global.ordered');                        //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case '(Ent)':                                                                                      //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = MessageService.get('global.entered');                        //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case '(Pai)':                                                                                      //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = MessageService.get('global.paid');                           //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case '(Pic)':                                                                                      //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = MessageService.get('global.picked');                         //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case '(Shi)':                                                                                      //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = MessageService.get('global.shipped');                        //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case '(Inv)':                                                                                      //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = MessageService.get('global.invoiced');                       //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case '(Can)':                                                                                      //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = MessageService.get('global.cancelled');                      //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         default:                                                                                           //ignore jslint - correct indentation
            self.oeBlanketBannerSingle.stage = self.oeBlanketBannerSingle.stage;                            //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
      }
   };

   // Nav Backwards
   self.navBack = function () {
      // Perform update when finished updating the release
      logOff();

      // Nav back to master state and force refresh since grid data may now be stale
      $state.go('oeerb.master', { refreshSearch: true }, { reload: 'oeerb.master' });
   };


   self.getOeerbInitializeBanner = function () {
      var criteria = { orderno: self.orderno, ordersuf: self.ordersuf };
      DataService.post('api/oe/asoeentry/oeerbinitializebannner', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.oeBlanketBannerSingle = data;

            if (self.oeBlanketBannerSingle.transtype) {
               var transType = self.oeBlanketBannerSingle.transtype;
               if (transType.toLowerCase() === 'bl') {
                  self.oeBlanketBannerSingle.transtype = MessageService.get('global.blanket.order');
               } else if (transType.toLowerCase() === 'br') {
                  self.oeBlanketBannerSingle.transtype = MessageService.get('global.blanket.release');
               }
            }
            self.convertStage();
         }
      });
   };
   self.getOeerbInitializeBanner();

   function logOff() {
      // Need to run final update when leaving view
      if (self.orderno) {

         var oeBlanketUpdateCriteria = {
            orderno: self.orderno,
            ordersuf: self.ordersuf,
            customparam: ''
         };

         DataService.post('api/oe/asoeentry/oeerblogoff', { data: oeBlanketUpdateCriteria, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.oeblanketbannersingle) {
                     self.oeBlanketBannerSingle = data.oeblanketbannersingle;
                  }
               }

            }
         });
      }
   }

   TabService.canUserCloseTab('oeerb.detail', function () {
      self.isViewClosing = true;
      // Perform update when finished updating the release
      logOff();
      return true;
   });

});

app.controller('OeerbRowDetailCtrl', function ($scope, $state, $stateParams, DataService, ModalService) {
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   var grid = mst.rowParams.grid;
   var row = mst.rowParams.row;

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = mst.rowParams.itemCopy;

   self.updateExistingOrder = function () {
      var oeBlanketUpdateCriteria = {
         promisedt: self.rowDetail.promisedt,
         shipto: self.rowDetail.shipto,
         shipviaty: self.rowDetail.shipviaty,
         reqshipdt: self.rowDetail.reqshipdt,
         orderno: self.rowDetail.orderno,
         ordersuf: self.rowDetail.ordersuf,
         billdt: self.rowDetail.billdt
      };
      DataService.post('api/oe/asoeentry/oeerbupdateexistingorder', { data: oeBlanketUpdateCriteria, busy: true }, function (data) {
         if (data) {
            self.oeBlanketBannerSingle = data;
            grid.toggleRowDetail(row);
            base.buildgrid();
         }
      });
   };

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   // Commit changes to the row
   self.submit = function () {
      if (self.rowDetail.reqshipdt !== self.rowDetail.reqshipdt || self.rowDetail.promisedt !== self.rowDetail.promisedt) {
         //Show popup
         ModalService.showModal('oe/oeerb/release-flush-date-modal.json', null, $scope, function (modal) {
            self.flushDateModal = modal;
            self.flushDatesType = 'a';
         });
      }
      else {
         self.updateExistingOrder();
      }
   };

   self.flushDateCancel = function () {
      self.flushDateModal.destroy();
   };

   self.flushDateOk = function () {

      if (self.flushDatesType !== 'n') {
         var oeBlanketFlushDatesSingle = {
            orderno: base.orderno,
            ordersuf: base.ordersuf,
            dtupdtype: self.flushDatesType,
            reqshipdt: self.rowDetail.reqshipdt,
            promisedt: self.rowDetail.promisedt,
            origpromisedt: self.rowDetail.origpromisedt
         };

         DataService.post('api/oe/asoeentry/oeerbflushorderdates', { data: oeBlanketFlushDatesSingle, busy: true }, function (data) {
            if (data) {
               self.flushDateModal.destroy();
               self.updateExistingOrder();
            }
         });
      }
      else {
         self.updateExistingOrder();
         self.flushDateModal.destroy();
      }
   };
});

app.controller('OeerbDetailHeaderCtrl', function ($scope, $state, $stateParams, DataService, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: 'oeeh',
         orderno: self.oeBlanketHeaderSingle.orderno,
         ordersuf: self.oeBlanketHeaderSingle.ordersuf,
         city: self.oeBlanketHeaderSingle.shiptocity,
         state: self.oeBlanketHeaderSingle.shiptost,
         zipcd: self.oeBlanketHeaderSingle.shiptozipcd,
         geocd: self.oeBlanketHeaderSingle.geocd,
         country: self.oeBlanketHeaderSingle.shiptocountry,
         streetaddr: self.oeBlanketHeaderSingle.shiptoaddr1,
         outofcityfl: self.oeBlanketHeaderSingle.outofcityfl
      };
   };

   self.getAddtionalAddons = function () {
      if (base.criteria) {
         var params = {
            iOrderNo: base.orderno,
            iOrderSuf: base.ordersuf,
            lInquiryMode: true
         };
         DataService.get('api/oe/asoeinquiry/loadorderaddons/{iOrderNo}/{iOrderSuf}/{lInquiryMode}', { pathParams: params, busy: true }, function (data) {
            if (data) {
               var addonsList = [];
               self.total = Number(0);
               data.forEach(function (addon) {
                  if (self.oeBlanketHeaderSingle.transtype.toLowerCase() === 'rm') {
                     addon.addonamt = addon.addonamt * -1;
                     addon.addonnet = addon.addonnet * -1;
                  }
                  addonsList.push(addon);
                  self.addons = addonsList;
                  self.total = Number(self.total) + Number(addon.addonnet);
               });
            }
         });
      }
   };

   self.getOeerbHeaderDetails = function () {
      if (base.criteria) {
         var criteria = { orderno: base.orderno, ordersuf: base.ordersuf };
         DataService.post('api/oe/asoeentry/oeerbdisplayblanketheader', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.oeBlanketHeaderSingle = data;
            }
            self.getAddtionalAddons();
         });
      }
   };
   self.getOeerbHeaderDetails();

   // Save
   self.submit = function () {

      if (self.oeBlanketHeaderSingle && (self.oeBlanketHeaderSingle.origpromisedt !== self.oeBlanketHeaderSingle.promisedt ||
         self.oeBlanketHeaderSingle.reqshipdt !== self.oeBlanketHeaderSingle.reqshipdtO)) {

         ModalService.showModal('oe/oeerb/release-flush-date-modal.json', null, $scope, function (modal) {
            self.flushDateModal = modal;
            self.flushDatesType = 'a';
         });
      }
      else {
         self.updateHeader();
      }
   };

   self.flushDateCancel = function () {
      self.flushDateModal.destroy();
   };

   self.flushDateOk = function () {

      if (self.flushDatesType !== 'n') {
         var oeBlanketFlushDatesSingle = {
            orderno: base.orderno,
            ordersuf: base.ordersuf,
            dtupdtype: self.flushDatesType,
            reqshipdt: self.oeBlanketHeaderSingle.reqshipdt,
            promisedt: self.oeBlanketHeaderSingle.promisedt,
            origpromisedt: self.oeBlanketHeaderSingle.origpromisedt
         };

         DataService.post('api/oe/asoeentry/oeerbflushorderdates', { data: oeBlanketFlushDatesSingle, busy: true }, function (data) {
            if (data) {
               self.flushDateModal.destroy();
               self.updateHeader();
               logOff();
               $state.go('^.master');
            }
         });
      }
      else {
         self.updateHeader();
         self.flushDateModal.destroy();
         logOff();
         $state.go('^.master');
      }
   };

   self.updateHeader = function () {
      var criteria = { oeblanketheadercriteria: { orderno: self.oeBlanketHeaderSingle.orderno, ordersuf: self.oeBlanketHeaderSingle.ordersuf }, oeblanketheadersingle: self.oeBlanketHeaderSingle };
      DataService.post('api/oe/asoeentry/oeerbupdateblanketheader', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.oeBlanketHeaderSingle = data;
         }
      });
   };

   self.cancel = function () {
       logOff();
       $state.go('^.master');
   };

   function logOff() {
       // Need to run final update when leaving view
       if (self.oeBlanketHeaderSingle.orderno) {

           var oeBlanketUpdateCriteria = {
               orderno: self.oeBlanketHeaderSingle.orderno,
               ordersuf: self.oeBlanketHeaderSingle.ordersuf,
               customparam: ''
           };

           DataService.post('api/oe/asoeentry/oeerblogoff', { data: oeBlanketUpdateCriteria, busy: true }, function (data) {
               if (data) {

                   if (!MessageService.processMessaging(data.messaging)) {
                       if (data.oeblanketbannersingle) {
                           self.oeBlanketBannerSingle = data.oeblanketbannersingle;
                       }
                   }

               }
           });
       }
   }
});

app.controller('OeerbDetailLineItemCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;

   self.getOeerbLineItems = function () {
      var criteria = { orderno: base.orderno, ordersuf: base.ordersuf };
      DataService.post('api/oe/asoeentry/oeerbbuildblanketlines', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.oeerbLines = data.oeblanketlinesresults;
            self.oeblanketlinessingle = data.oeblanketlinessingle;
            base.qtyordlabel = self.oeblanketlinessingle.qtyordlabel;
            base.qtyremainlabel = self.oeblanketlinessingle.qtyremainlabel;
         }
      });
   };

   self.updateByRelease = function () {
      var record = GridService.getSelectedRecord(self.oeerbLinesGrid);
      if (record) {
         var selectedLine = {
            orderno: base.orderno,
            ordersuf: base.ordersuf,
            lineno: record.lineno
         };
         $state.go('^.updaterelease', { blanketReleaseLineItem: selectedLine, oeBlanketUpdByReleaseSingle: self.oeblanketlinessingle });
      }
   };
   self.getOeerbLineItems();

   // Cell change line items grid
   self.onCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = self.oeerbLines[args.row];

         if (record) { // && record.allowedit
            var blanketLinesCriteria = {
               lineno: record.lineno,
               orderno: base.orderno,
               ordersuf: base.ordersuf
            };

            var criteria = {
               oeblanketlinescriteria: blanketLinesCriteria,
               oeblanketlinessingle: self.oeblanketlinessingle,
               oeblanketlinesresults: self.oeerbLines
            };

            DataService.post('api/oe/asoeentry/oeerbupdateblanketline', { data: criteria, busy: true }, function (data) {
               if (data) {
                  GridService.softUpdateDataset(self.oeerbLinesGrid, data.oeblanketlinesresults, 'lineno');
                  //Remove this line.  Add a new hook so that in the future, we could do it either way.
                  //If a customer wants it back, they could do an Extension in that new spot... or if
                  //we decide that it was a bad decision to remove it, we could add it back, and then
                  //force the one customer asking for this, to do an Extension to not include it.
                  //MessageService.info('global.information', 'message.save.operation.completed.successfully');

                  //User Hook (do not rename)
                  if (self.oeerbupdateblanketlineContinue) {
                     self.oeerbupdateblanketlineContinue(data);
                  }
               } else {
                  // Error returned in messaging - back out change
                  record.qtyord = args.oldValue;
                  self.oeerbLines[args.row] = record;
                  self.oeerbLinesGrid.renderRows();
               }
            },
         // Error returned in cErrorMessage - back out change
            function () {
               record.qtyord = args.oldValue;
               self.oeerbLines[args.row] = record;
               self.oeerbLinesGrid.renderRows();
            });
         }
      }
   };

});

app.controller('OeerbUpdateReleaseCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   self.oeBlanketUpdByReleaseSingle = $stateParams.oeBlanketUpdByReleaseSingle;
   var blanketReleaseLineItem = $stateParams.blanketReleaseLineItem;
   self.oeBlanketUpdByReleaseResults = [];
   var fullOeNumber = '';

   // Nav Backwards
   self.navBack = function () {
      // Perform final update when finished updating the release
      finalUpdate();

      $state.go('^.detail', { orderno: blanketReleaseLineItem.orderno, ordersuf: blanketReleaseLineItem.ordersuf });
   };

   // Cell change update by release line items grid
   self.onCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = self.oeBlanketUpdByReleaseResults[args.row];

         if (record) {
            var releaseCriteria = {
               lineno: blanketReleaseLineItem.lineno,
               orderno: record.orderno,
               ordersuf: record.ordersuf
            };

            var criteria = {
               oeblanketupdbyreleaseresults: self.oeBlanketUpdByReleaseResults,
               oeblanketupdbyrelupdresults: self.oeBlanketUpdByRelUpdResults,
               oeblanketupdbyreleasecrit: releaseCriteria,
               oeblanketupdbyreleasesingle: self.oeBlanketUpdByReleaseSingle
            };

            DataService.post('api/oe/asoeentry/oeerbblanketupdbyreleaseupdate', { data: criteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {

                     self.oeBlanketUpdByReleaseResults = data.oeblanketupdbyreleaseresults;
                     self.oeBlanketUpdByReleaseSingle = data.oeblanketupdbyreleasesingle;
                     self.oeBlanketUpdByReleaseResultsGrid.loadData(self.oeBlanketUpdByReleaseResults);
                     MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  } else {
                     // Error returned in messaging - back out change
                     record.qtyord = args.oldValue;
                     self.oeBlanketUpdByReleaseResults[args.row] = record;
                     self.oeBlanketUpdByReleaseResultsGrid.renderRows();
                  }
               }
            },
            // Error returned in cErrorMessage - back out change
            function () {
               record.qtyord = args.oldValue;
               self.oeBlanketUpdByReleaseResults[args.row] = record;
               self.oeBlanketUpdByReleaseResultsGrid.renderRows();
            });
         }
      }
   };

   function finalUpdate() {
      // Need to run final update when leaving view
      if (self.oeBlanketUpdByReleaseSingle.brsuffixlist) {
         var updateCriteria = {
            orderno: blanketReleaseLineItem.orderno,
            ordersuf: blanketReleaseLineItem.ordersuf,
            lineno: blanketReleaseLineItem.lineno,
            customparam: ''
         };

         var criteria = {
            oeblanketupdbyreleaseresults: self.oeBlanketUpdByReleaseResults,
            oeblanketupdbyreleasecrit: updateCriteria,
            oeblanketupdbyreleasesingle: self.oeBlanketUpdByReleaseSingle
         };

         DataService.post('api/oe/asoeentry/oeerbblanketupdbyreleasefinalupdate', { data: criteria, busy: true }, function (data) {
            if (data) {
               // Only processing here is to display any returned messages
               MessageService.processMessaging(data.messaging);
            }
         });
      }
   }

   if (blanketReleaseLineItem) {
      fullOeNumber = blanketReleaseLineItem.orderno + '-' + Utils.pad(blanketReleaseLineItem.ordersuf, 2);

      self.detailsHeader = MessageService.get('oe.number') + ': ' + fullOeNumber + ' | ' +
         MessageService.get('global.line.number') + ': ' + blanketReleaseLineItem.lineno;

      var oeBlanketUpdByReleaseCrit = {
         orderno: blanketReleaseLineItem.orderno,
         ordersuf: blanketReleaseLineItem.ordersuf,
         lineno: blanketReleaseLineItem.lineno
      };

      DataService.post('api/oe/asoeentry/oeerbinitblanketupdbyrelease', { data: oeBlanketUpdByReleaseCrit, busy: true }, function (data) {
         if (data) {
            self.oeBlanketUpdByReleaseResults = data.oeblanketupdbyreleaseresults;
            self.oeBlanketUpdByReleaseSingle = data.oeblanketupdbyreleasesingle;
         }
      });
   }
});