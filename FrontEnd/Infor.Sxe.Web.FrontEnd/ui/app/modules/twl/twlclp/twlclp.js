'use strict';

//TWL Label Print
app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlclp', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlclp');
});

app.controller('TwlclpBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};
   self.CRLF = '</br>';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.SYSTEM_PARAMETER_LOCATIONFORMAT = 2702;
   self.SYSTEM_PARAMETER_MAXIMUMLABELS = 7505;
   self.CONTAINERTYPE_CARTON = 1;
   self.CONTAINERTYPE_PALLET = 2;
   self.CONTAINERTYPE_TOTE = 3;
   self.CONTAINERTYPE_LOCATION = 4;
   self.CONTAINERTYPE_INVENTORY = 5;
   self.CONTAINERTYPE_PRIMARYPICK = 6;
   self.CONTAINERTYPE_ITEM = 7;
   self.QUANTITYTYPE_SPECIFIC = 1;
   self.QUANTITYTYPE_NEWLABELS = 2;
   self.CARTONSIZE_2x4 = 1;
   self.LOCATIONSIZE_2x4STANDARD = 3;
   self.LOCATIONSIZE_4x6STANDARD = 4;
   self.INVENTORYSIZE_2x4 = 2;
   self.ITEMSIZE_2x4 = 2;
   self.ARROW_NONE = 0;
   self.SEQUENCE_CARTONMST_CARTON_ID = 'cartonmst_carton_id';
   self.SEQUENCE_PRINT_PALLET = 'print_pallet';

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;

   self.locationDataset = [];
   self.inventoryDataset = [];
   self.primaryPickDataset = [];
   self.itemDataset = [];

   self.labelPrintQuantity = self.QUANTITYTYPE_SPECIFIC;
   self.cartonSize = self.CARTONSIZE_2x4;
   self.locationSize = self.LOCATIONSIZE_2x4STANDARD;
   self.locationArrow = self.ARROW_NONE;
   self.inventorySize = self.INVENTORYSIZE_2x4;
   self.itemSize = self.ITEMSIZE_2x4;
   self.labelNumber = 0;
   self.numberOfLabels = 0;
   self.locationFormat = '';
   self.primaryPickFormat = '';
   self.inventoryQuantity = 1;
   self.itemQuantity = 1;
   self.maximumLabels = 9999;
   self.cartonValue = 0;
   self.cartonStartValue = 0;
   self.palletValue = 0;
   self.palletStartValue = 0;

   self.criteriaUsed = {};

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') +
         self.LABEL_DELIMITER +
         (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlclp.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlclp.master');
   };

   self.isDetail = function () {
      return $state.is('twlclp.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlclp.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.containerType = self.CONTAINERTYPE_CARTON;
      self.criteria.aisle = 0;
   };

   self.getCurrentSequenceCarton = function () {
      DataService.get('api/shared/assharedinquiry/getcurrentsequence/' + self.SEQUENCE_CARTONMST_CARTON_ID, {busy: true}, function (data) {
         if (data) {
            self.cartonValue = data;
            self.cartonStartValue = self.cartonValue + 1;
         }
      });
   };

   self.getCurrentSequencePalletOrTote = function () {
      DataService.get('api/shared/assharedinquiry/getcurrentsequence/' + self.SEQUENCE_PRINT_PALLET, {busy : true}, function (data) {
         if (data) {
            self.palletValue = data;
            self.palletStartValue = self.palletValue + 1;
         }
      });
   };

   self.getDefaultParameterMaxLabels = function () {
      var getsyspaintegerCriteria = {
         pvTwlcompany: self.criteriaUsed.coNum,
         pvTwlwarehouse: self.criteriaUsed.whNum,
         pvParameterid: self.SYSTEM_PARAMETER_MAXIMUMLABELS
      };
      DataService.post('api/twl/astwlinquiry/getsyspainteger', { data: getsyspaintegerCriteria, busy: true }, function (data) {
         if (data) {
            self.maximumLabels = data;
         }
      });
   };

   self.getDefaultParameterLocationFormat = function () {
      var getsyspacharacterCriteria = {
         pvTwlcompany: self.criteriaUsed.coNum,
         pvTwlwarehouse: self.criteriaUsed.whNum,
         pvParameterid: self.SYSTEM_PARAMETER_LOCATIONFORMAT
      };
      DataService.post('api/twl/astwlinquiry/getsyspacharacter', { data: getsyspacharacterCriteria, busy: true }, function (data) {
         if (data) {
            self.locationFormat = data;
            self.primaryPickFormat = data;
         }
         self.getDefaultParameterMaxLabels();
      });
   };

   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);

      //Make sure we have the latest, in case someone else printed labels between searching.
      self.getCurrentSequenceCarton();
      self.getCurrentSequencePalletOrTote();

      DataService.post('api/twl/astwladmin/getlabelprintlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            if (self.criteria.containerType === self.CONTAINERTYPE_PRIMARYPICK) {
               //The Location and Primary Pick Locations both share the same Results from the backend
               //since they have the same exact data.  Separate dataSets in the UI so they can be
               //processed separately.
               self.primaryPickDataset = data.getlabelprintbinmstresults;
            }
            self.locationDataset = data.getlabelprintbinmstresults;
            self.inventoryDataset = data.getlabelprintinvresults;
            self.itemDataset = data.getlabelprintitemresults;
         }
      });
   };

   self.changeContainerType = function () {
      //Whenever the Container Type is changed, get the latest Sequence.  This is
      //to make sure we show the latest in case another user has printed labels.
      if (self.criteria.containerType === self.CONTAINERTYPE_CARTON) {
         self.getCurrentSequenceCarton();
      } else if (self.criteria.containerType === self.CONTAINERTYPE_PALLET ||
                 self.criteria.containerType === self.CONTAINERTYPE_TOTE) {
         self.getCurrentSequencePalletOrTote();
      }
   };

   self.initCriteria();
   self.getDefaultParameterLocationFormat();
   self.getCurrentSequenceCarton();
   self.getCurrentSequencePalletOrTote();
});

app.controller('TwlclpSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlclp.master');
      }

      base.search();
   };
});

app.controller('TwlclpMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService, UserService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.buildCriteria = function () {
      var labelPrintCriteria = {
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         empNum: UserService.getTwlUserId(),
         labelNumber: base.labelNumber,
         numberOfLabels: base.numberOfLabels,
         printerId: base.criteria.printerId,
         labelPrintQuantity: base.labelPrintQuantity,
         containerType: base.criteria.containerType,
         cartonSize: base.cartonSize,
         locationSize: base.locationSize,
         locationArrow: base.locationArrow,
         locationFormat: base.locationFormat,
         inventorySize: base.inventorySize,
         inventoryQuantity: base.inventoryQuantity,
         itemSize: base.itemSize,
         itemQuantity: base.itemQuantity,
         primaryPickFormat: base.primaryPickFormat
      };

      return labelPrintCriteria;
   };

   self.printLabels = function () {
      var requestCriteria = {
         generatelabelprintcriteria: self.buildCriteria(),
         generatelabelprtbincrit: [],
         generatelabelprtinvcrit: [],
         generatelabelprtitmcrit: []
      };

      DataService.post('api/twl/astwladmin/generatelabelprint', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               switch (base.criteria.containerType) {                                                      //ignore jslint - correct indentation
                  case base.CONTAINERTYPE_CARTON:                                                          //ignore jslint - correct indentation
                     MessageService.info('global.information', 'message.carton.labels.sent.to.printer');   //ignore jslint - correct indentation
                     base.cartonValue = data.iCurrentSequence;                                             //ignore jslint - correct indentation
                     base.cartonStartValue = data.iCurrentSequence + 1;                                    //ignore jslint - correct indentation
                     break;                                                                                //ignore jslint - correct indentation
                  case base.CONTAINERTYPE_PALLET:                                                          //ignore jslint - correct indentation
                     MessageService.info('global.information', 'message.pallet.labels.sent.to.printer');   //ignore jslint - correct indentation
                     base.palletValue = data.iCurrentSequence;                                             //ignore jslint - correct indentation
                     base.palletStartValue = data.iCurrentSequence + 1;                                    //ignore jslint - correct indentation
                     break;                                                                                //ignore jslint - correct indentation
                  case base.CONTAINERTYPE_TOTE:                                                            //ignore jslint - correct indentation
                     MessageService.info('global.information', 'message.tote.labels.sent.to.printer');     //ignore jslint - correct indentation
                     base.palletValue = data.iCurrentSequence;                                             //ignore jslint - correct indentation
                     base.palletStartValue = data.iCurrentSequence + 1;                                    //ignore jslint - correct indentation
                     break;                                                                                //ignore jslint - correct indentation
               }
            }
         }
      });
   };

   //Location Labels can print one or many
   self.printLocationLabelsLaunch = function (binLocations) {
      var binLocCriteria = [];
      if (binLocations && binLocations.length > 0) {
         binLocations.forEach(function (row) {
            var binLoc = {
               binNum: row.binNum,
               rowID: row.rowID
            };
            binLocCriteria.push(binLoc);
         });

         var requestCriteria = {
            generatelabelprintcriteria: self.buildCriteria(),
            generatelabelprtbincrit: binLocCriteria,
            generatelabelprtinvcrit: [],
            generatelabelprtitmcrit: []
         };

         DataService.post('api/twl/astwladmin/generatelabelprint', { data: requestCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.errorMessages(data.messaging)) {
                  MessageService.info('global.information', 'message.location.labels.sent.to.printer');
               }
            }
         });
      }
   };

   self.printLocationLabels = function () {
      if (!base.locationDataset || base.locationDataset.length === 0) {
         //This occurs if the user never pressed Search first.
         MessageService.error('global.error', 'message.there.are.no.locations.selected.for.printing');
      } else {
         var selectedRows = GridService.getSelectedRecords(base.locationGrid);
         var msg = '';
         var isAllRows = false;
         if (!selectedRows || selectedRows.length === 0) {
            if (base.locationDataset.length > base.maximumLabels) {
               msg = $translate.instant('message.not.all.labels.will.print') + " " +
                        base.maximumLabels + '.' + base.CRLF + base.CRLF;
            }
            msg = msg + $translate.instant('question.do.you.wish.to.print.a.label.for.all.shown.locations');
            isAllRows = true;
         } else {
            if (selectedRows.length > base.maximumLabels) {
               msg = $translate.instant('message.not.all.labels.will.print') + " " +
                        base.maximumLabels + '.' + base.CRLF + base.CRLF;
            }
            msg = msg +  $translate.instant('question.do.you.wish.to.print.a.label.for.selected.locations');
         }

         MessageService.yesNo('global.question', msg,
         // Yes processing
         function () {
            self.printLocationLabelsLaunch(isAllRows ? base.locationDataset : selectedRows);
         });
      }
   };

   //Inventory Labels can only have one printed at a time.
   self.printInventoryLabelsLaunch = function (inventoryItems) {
      //Build out the list of InventoryItems to print (even though its always only one).
      //The backend expects a list.
      var inventoryCriteria = [];
      inventoryItems.forEach(function (row) {
         var binLoc = {
            absNum: row.absNum,
            binNum: row.binNum,
            lot: row.lot,
            palletId: row.palletId,
            rowID: row.rowID
         };
         inventoryCriteria.push(binLoc);
      });

      var requestCriteria = {
         generatelabelprintcriteria: self.buildCriteria(),
         generatelabelprtbincrit: [],
         generatelabelprtinvcrit: inventoryCriteria,
         generatelabelprtitmcrit: []
      };

      DataService.post('api/twl/astwladmin/generatelabelprint', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               MessageService.info('global.information', 'message.inventory.labels.sent.to.printer');
            }
         }
      });
   };

   self.printInventoryLabels = function () {
      if (!base.inventoryDataset || base.inventoryDataset.length === 0) {
         //This occurs if the user never pressed Search first.
         MessageService.error('global.error', 'message.there.are.no.inventory.selected.for.printing');
      } else {
         var selectedRows = GridService.getSelectedRecords(base.inventoryGrid);
         var msg = '';
         if (selectedRows) {
            msg = $translate.instant('question.do.you.wish.to.print.a.label.for.selected.inventory');
         } else {
            MessageService.error('global.error', 'message.please.select.inventory.for.printing.labels');
            return;
         }

         MessageService.yesNo('global.question', msg,
         // Yes processing
         function () {
            self.printInventoryLabelsLaunch(selectedRows);
         });
      }
   };

   //Primary Pick Labels can print one or many
   self.printPrimaryPickLabelsLaunch = function (binLocations) {
      var binLocCriteria = [];
      binLocations.forEach(function (row) {
         var binLoc = {
            binNum: row.binNum,
            rowID: row.rowID
         };
         binLocCriteria.push(binLoc);
      });

      var requestCriteria = {
         generatelabelprintcriteria: self.buildCriteria(),
         generatelabelprtbincrit: binLocCriteria,
         generatelabelprtinvcrit: [],
         generatelabelprtitmcrit: []
      };

      DataService.post('api/twl/astwladmin/generatelabelprint', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.errorMessages(data.messaging)) {
               MessageService.info('global.information', 'message.primary.pick.labels.sent.to.printer');
            }
         }
      });
   };

   self.printPrimaryPickLabels = function () {
      if (!base.primaryPickDataset || base.primaryPickDataset.length === 0) {
         //This occurs if the user never pressed Search first.
         MessageService.error('global.error', 'message.there.are.no.primary.picks.selected.for.printing');
      } else {
         var selectedRows = GridService.getSelectedRecords(base.primaryPickGrid);
         var msg = '';
         var isAllRows = false;
         if (!selectedRows || selectedRows.length === 0) {
            if (base.primaryPickDataset.length > base.maximumLabels) {
               msg = $translate.instant('message.not.all.labels.will.print') + " " +
                        base.maximumLabels + '.' + base.CRLF + base.CRLF;
            }
            msg = msg + $translate.instant('question.do.you.wish.to.print.a.label.for.all.shown.primary.picks');
            isAllRows = true;
         } else {
            if (selectedRows.length > base.maximumLabels) {
               msg = $translate.instant('message.not.all.labels.will.print') + " " +
                        base.maximumLabels + '.' + base.CRLF + base.CRLF;
            }
            msg = msg +  $translate.instant('question.do.you.wish.to.print.a.label.for.selected.primary.picks');
         }

         MessageService.yesNo('global.question', msg,
         // Yes processing
         function () {
            self.printPrimaryPickLabelsLaunch(isAllRows ? base.primaryPickDataset : selectedRows);
         });
      }
   };

   //Item Labels can print on or many at a time.
   self.printItemLabelsLaunch = function (items) {
      var itemsCriteria = [];
      items.forEach(function (row) {
         var item = {
            absNum: row.absNum,
            rowID: row.rowID
         };
         itemsCriteria.push(item);
      });

      var requestCriteria = {
         generatelabelprintcriteria: self.buildCriteria(),
         generatelabelprtbincrit: [],
         generatelabelprtinvcrit: [],
         generatelabelprtitmcrit: itemsCriteria
      };

      DataService.post('api/twl/astwladmin/generatelabelprint', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.errorMessages(data.messaging)) {
               MessageService.info('global.information', 'message.product.labels.sent.to.printer');
            }
         }
      });
   };

   self.printItemLabels = function () {
      if (!base.itemDataset || base.itemDataset.length === 0) {
         //This occurs if the user never pressed Search first.
         MessageService.error('global.error', 'message.there.are.no.products.selected.for.printing');
      } else {
         var selectedRows = GridService.getSelectedRecords(base.itemGrid);
         var msg = '';
         var isAllRows = false;
         if (!selectedRows || selectedRows.length === 0) {
            if (base.itemDataset.length > base.maximumLabels) {
               msg = $translate.instant('message.not.all.labels.will.print') + " " +
                  base.maximumLabels + '.' + base.CRLF + base.CRLF;
            }
            msg = msg + $translate.instant('question.do.you.wish.to.print.a.label.for.all.shown.products');
            isAllRows = true;
         } else {
            if (selectedRows.length > base.maximumLabels) {
               msg = $translate.instant('message.not.all.labels.will.print') + " " +
                  base.maximumLabels + '.' + base.CRLF + base.CRLF;
            }
            msg = msg + $translate.instant('question.do.you.wish.to.print.a.label.for.selected.products');
         }

         MessageService.yesNo('global.question', msg,
         // Yes processing
         function () {
            self.printItemLabelsLaunch(isAllRows ? base.itemDataset : selectedRows);
         });
      }
   };
});
