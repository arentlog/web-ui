'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcl',
      dataPath: 'api/twl/binmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/astwlsetup/getlocations',
      searchResultsField: '',
      resultsRowIdField: 'binmstRowID',
      primaryKeyParams: ['whNum', 'binNum'],
      createStateView: 'twl/twlcl/create.json',
      postCreateState: '^.detail.edit',
      detailSubTitle: [
         {label: null, value: 'binNum'}
      ]
   });

   $stateProvider.state('twlcl.master.master-locationtype', {
      url: '/location-type',
      views: {
         subMaster: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcl/master-locationtype.json');
            },
            controller: 'TwlclLocationTypeCtrl as loctype'
         }
      }
   });

   $stateProvider.state('twlcl.detail.detail-inventory', {
      url: '/inventory',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcl/detail-inventory.json');
            },
            controller: 'TwlclInventoryCtrl as dtli'
         }
      }
   });

   $stateProvider.state('twlcl.detail.detail-movement', {
      url: '/movement',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcl/detail-movement.json');
            },
            controller: 'TwlclMovementCtrl as dtlm'
         }
      }
   });

   $stateProvider.state('twlcl.detail.detail-picks', {
      url: '/picks',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcl/detail-picks.json');
            },
            controller: 'TwlclPicksCtrl as dtlp'
         }
      }
   });

   $stateProvider.state('twlcl.detail.detail-replenishments', {
      url: '/replenishments',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcl/detail-replenishments.json');
            },
            controller: 'TwlclReplenishmentsCtrl as dtlr'
         }
      }
   });

   $stateProvider.state('twlcl.detail.detail-inventory.detail-serial-numbers', {
      url: '/serials',
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcl/detail-serial.json');
            },
            controller: 'TwlclSerialNumbersCtrl as dtls'
         }
      }
   });

});

app.service('TwlclService', function ($state, DataService, MessageService, OptionSetService, UserService, Utils) {

   var binCriteria = {};

   // Custom Get for Detail Screen for HYPERLINK from twlcl (INVENTORY)
   this.getRecord = function (self, base, stateParams) {
      var param = {
         binRowID: stateParams.id,
         coNum: base.userCoNum,
         whNum: stateParams.pk,
         binNum: stateParams.pk2
      };
      return DataService.getResource('api/twl/astwlsetup/getlocationdetail', { data: param, method: 'POST' });
   };

   this.extendBaseController = function (self) {

      // Sets defaults in search tab
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.physicalInd = '1';
      self.criteria.countInd = '1';
      self.refreshSearch = false;
      self.newRecord = false;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };

      self.isMaster = function () {
         return $state.is('twlcl.master');
      };

      self.isDetailOrEdit = function () {
         return $state.is('twlcl.detail') || $state.is('twlcl.detail.edit');
      };

      self.isDetailInventory = function () {
         return $state.is('twlcl.detail.detail-inventory');
      };

      self.isDetailLocation = function () {
         return $state.is('twlcl.master.master-locationtype');
      };

      self.isDetailMovement = function () {
         return $state.is('twlcl.detail.detail-movement');
      };

      self.isDetailPicks = function () {
         return $state.is('twlcl.detail.detail-picks');
      };

      self.isDetailReplenishments = function () {
         return $state.is('twlcl.detail.detail-replenishments');
      };

      self.deleteLocation = function () {
         MessageService.yesNo('global.question', 'question.confirm.delete', function () {

            DataService.post('api/twl/astwlsetup/deletelocation', { data: binCriteria, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               $state.go('twlcl.master');
               self.search();
            });

         });
      };

      self.formatLocationType = function (locntype) {
         if (locntype) {
            switch (locntype.toUpperCase()) {
               case 'M':                                           //ignore jslint - correct indention
                  return MessageService.get('global.alternate');   //ignore jslint - correct indention
               case 'T':                                           //ignore jslint - correct indention
                  return MessageService.get('global.stage');       //ignore jslint - correct indention
               case 'S':                                           //ignore jslint - correct indention
                  return MessageService.get('global.shelf');       //ignore jslint - correct indention
               case 'P':                                           //ignore jslint - correct indention
                  return MessageService.get('global.pallet');      //ignore jslint - correct indention
               case 'F':                                           //ignore jslint - correct indention
                  return MessageService.get('global.flow.rack');   //ignore jslint - correct indention
               case 'C':                                           //ignore jslint - correct indention
                  return MessageService.get('global.carousel');    //ignore jslint - correct indention
               case 'B':                                           //ignore jslint - correct indention
                  return MessageService.get('global.bulk');        //ignore jslint - correct indention
               default:                                            //ignore jslint - correct indention
                  return locntype;                                 //ignore jslint - correct indention
            }
         } else {
            return locntype;
         }

      };

      // Create or edit location type default values
      self.locationTypeDefault = function () {
         $state.go('twlcl.master.master-locationtype');
      };

   };

   this.extendSearchController = function (self, base, criteria) {

      self.clear = function () {
         // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
         Utils.clearObject(criteria);

         // Clear resets these defaults - need to set again
         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
         base.criteria.physicalInd = '1';
         base.criteria.countInd = '1';
      };

   };

   this.extendCreateController = function (self, base, twlcl) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlcl.coNum = base.criteriaUsed.coNum;
      twlcl.whNum = base.criteriaUsed.whNum;
      twlcl.abc = 'D';
      twlcl.abcPending = 'D';
      twlcl.aisle = 1;
      twlcl.checkQty = true;
      twlcl.locType = 'P';
      twlcl.maxPal = 1;
      twlcl.palletFootprint = 1;
      twlcl.primePickType = 'S';
      twlcl.repUnit = 'C';
      twlcl.rowStatus = true;
      twlcl.stackHeight = 1;

      // Apply the location type defaults to the new record being created
      self.locationTypeChanged = function () {
         var params = {
            coNum: twlcl.coNum,
            whNum: twlcl.whNum,
            locType: twlcl.locType
         };
         DataService.get('api/twl/binsize/getbypk', { params: params }, function (binsize) {
            if (binsize) {
               twlcl.maxWeight = binsize.maxWeight;
               twlcl.height = binsize.height;
               twlcl.width = binsize.width;
               twlcl.depth = binsize.depth;
               twlcl.cube = twlcl.depth * twlcl.height * twlcl.width;
            }
         });

      };

      base.newRecord = true;

      self.locationTypeChanged();

      self.customCancel = function () {
         base.newRecord = false;

         $state.go('twlcl.master');
      };

   };

   this.extendMasterController = function (self, base) {

      self.pickTypeFormatter = function (row, cell, value, column, item) {
         if (item.primPick) {
            if (value) {

               if (value.toLowerCase() === 'f') {
                  return MessageService.get('global.full');
               } else if (value.toLowerCase() === 's') {
                  return MessageService.get('global.split');
               } else if (value.toLowerCase() === 'c') {
                  return MessageService.get('global.counter');
               } else {
                  return MessageService.get('global.pallet');
               }

            } else {
               return value;
            }
         } else {
            return MessageService.get('global.none');
         }
      };

      self.customDelete = function () {
         binCriteria = {
            coNum: base.dataset[base.grid.lastSelectedRow].coNum,
            whNum: base.dataset[base.grid.lastSelectedRow].whNum,
            binNum: base.dataset[base.grid.lastSelectedRow].binNum
         };

         base.deleteLocation();
      };

   };

   this.extendDetailController = function (self, base, twlcl) {

      var originalProduct = '';
      var originalBin = '';
      var originalZone = '';
      self.caseSize = 0;
      self.palletSize = 0;

      self.getSubTitle = function () {
         var subTitle = MessageService.get('global.warehouse') + ': ' + self.twlcl.whNum + ' | ';
         subTitle += MessageService.get('global.location') + ': ' + self.twlcl.binNum;
         return subTitle;
      };

      twlcl.$promise.then(function () {

         originalProduct = self.twlcl.absNum;
         originalBin = self.twlcl.binNum;
         originalZone = self.twlcl.whZone;
         self.twlcl.rowID = self.twlcl.binmstRowID;

         if (!self.twlcl.checkQty) {
            self.qtyMessage = MessageService.get('message.cannot.allocate.inventory.from.this.location');
         } else {
            self.qtyMessage = '';
         }

         if (!self.twlcl.primPickType) {
            self.twlcl.primPickType = 'S';
         }

         if (self.twlcl.primPickType.toUpperCase() === 'F' && self.twlcl.repUnit.toUpperCase() === 'E') {
            self.twlcl.repUnit = 'C';
         }

         self.showInventory = function () {
            if (self.twlcl.enableinventory) {
               $state.go('.detail-inventory');
            } else {
               MessageService.info('global.information', 'message.no.records.were.found');
            }
         };

         self.showMovement = function () {
            if (self.twlcl.enablemovement) {
               $state.go('.detail-movement');
            } else {
               MessageService.info('global.information', 'message.no.records.were.found');
            }
         };

         self.showPicks = function () {
            if (self.twlcl.enablepicks) {
               $state.go('.detail-picks');
            } else {
               MessageService.info('global.information', 'message.no.records.were.found');
            }
         };

         self.showReplenishment = function () {
            if (self.twlcl.enablereplenishment) {
               $state.go('.detail-replenishments');
            } else {
               MessageService.info('global.information', 'message.no.records.were.found');
            }
         };

         // System Parameter 3600 - Allow Whse Zone Changes
         var getsyspalogicalCriteria = {
            pvTwlcompany: self.twlcl.coNum,
            pvTwlwarehouse: self.twlcl.whNum,
            pvParameterid: 3600
         };

         DataService.post('api/twl/astwlinquiry/getsyspalogical', { data: getsyspalogicalCriteria, busy: true }, function (data) {
            if (data) {
               self.allowZoneChange = data;
            }
         });

         self.checkRemainder = function () {
            var numerator = self.twlcl.repQty;
            var denominator = 1;
            var remainder = 0;
            if (self.twlcl.repUnit.toUpperCase() === 'C' && self.caseSize !== 0) {
               denominator = self.caseSize;
               remainder = numerator % denominator;
               if (remainder) {
                  MessageService.info('global.information', 'message.replenishment.quantity.is.not.full.case');
               }
            } else if (self.twlcl.repUnit.toUpperCase() === 'P' && self.palletSize !== 0) {
               denominator = self.palletSize;
               remainder = numerator % denominator;
               if (remainder) {
                  MessageService.info('global.information', 'message.replenishment.quantity.is.not.full.pallet');
               }
            }
         };

         self.changeLevel = function () {
            self.twlcl.reqQty = self.twlcl.maxLvl - self.twlcl.minLvl;

            if (self.twlcl.maxLvl < self.twlcl.minLvl) {
               MessageService.error('global.error', 'message.minimum.level.cannot.exceed.maximum.level');
            } else if (self.twlcl.reqQty < 0) {
               MessageService.info('global.information', 'message.replenishment.quantity.is.negative');
            }

            self.checkRemainder();
         };

         self.changePallet = function () {
            self.twlcl.maxPal = self.twlcl.palletFootprint * self.stackHeight;
         };

         self.changeVolume = function () {
            self.twlcl.cube = self.twlcl.depth * self.twlcl.height * self.twlcl.width;
         };

         self.locationTypeChanged = function () {
            if (self.twlcl.locType.toLowerCase() === 'c' ||
                self.twlcl.locType.toLowerCase() === 'f' ||
                self.twlcl.locType.toLowerCase() === 's') {
               self.twlcl.palletFootprint = 0;
               self.twlcl.stackHeight = 0;
               self.twlcl.maxPal = 0;
            } else {
               self.twlcl.palletFootprint = 1;
               self.twlcl.stackHeight = 1;
               self.twlcl.maxPal = 1;
            }

            var params = {
               coNum: self.twlcl.coNum,
               whNum: self.twlcl.whNum,
               locType: self.twlcl.locType
            };
            DataService.get('api/twl/binsize/getbypk', { params: params }, function (binsize) {
               if (binsize) {
                  self.twlcl.maxWeight = binsize.maxWeight;
                  self.twlcl.height = binsize.height;
                  self.twlcl.width = binsize.width;
                  self.twlcl.depth = binsize.depth;
                  self.changeVolume();
               }
            });

         };

         self.primPickChanged = function () {

            // If changing to Full Case and Replenish By was Item Unit, change to be Case Size
            if (self.twlcl.primPickType.toUpperCase() === 'F') {
               if (self.twlcl.repUnit.toUpperCase() === 'E') {
                  self.twlcl.repUnit = 'C';
               }
            }

            if (!self.twlcl.primPick) {
               var moveRowIDs = [];

               var params = {
                  coNum: self.twlcl.coNum,
                  whNum: self.twlcl.whNum,
                  absNum: self.twlcl.absNum
               };
               DataService.get('api/twl/movemst/listbycowhabs', { params: params }, function (data) {
                  if (data) {

                     // Looking for movemst records where movement type is 'no'
                     for (var i = 0; i < data.length; i++) {
                        var currentMovemst = data[i];
                        if (currentMovemst.movementType.toLowerCase() === 'no') {
                           moveRowIDs.push(currentMovemst.rowID);
                        }
                     }

                     if (moveRowIDs.length) {
                        MessageService.yesNo('global.question', 'question.do.you.want.to.clear.selected.replenishments',
                           function () {
                              // Yes processing - Delete movemst records
                              DataService.delete('api/twl/movemst/deletelistbyrowids', { data: moveRowIDs, busy: true }, function () {

                              });

                              // Clear primary pick values after deleting the movemst records
                              self.twlcl.absNum = '';
                              self.twlcl.primPickType = "S";
                              self.twlcl.minLvl = 0;
                              self.twlcl.maxLvl = 0;
                              self.twlcl.repQty = 0;
                              self.twlcl.repUnit = 'E';

                           },
                           function () {
                              // No processing - Set Primary Pick back to Yes
                              self.twlcl.primPick = true;
                           });
                     }
                     else {
                        // Clear primary pick values if no movemst records found where movement type is 'no'
                        self.twlcl.absNum = '';
                        self.twlcl.primPickType = "S";
                        self.twlcl.minLvl = 0;
                        self.twlcl.maxLvl = 0;
                        self.twlcl.repQty = 0;
                        self.twlcl.repUnit = 'E';
                     }
                  } else {
                     // Clear primary pick values if no movemst exist
                     self.twlcl.absNum = '';
                     self.twlcl.primPickType = "S";
                     self.twlcl.minLvl = 0;
                     self.twlcl.maxLvl = 0;
                     self.twlcl.repQty = 0;
                     self.twlcl.repUnit = 'E';
                  }
               });

            }
         };

         self.productChanged = function () {
            // Set fields based on the new item selected
            if (self.twlcl.absNum) {
               var params = {
                  coNum: self.twlcl.coNum,
                  whNum: self.twlcl.whNum,
                  absNum: self.twlcl.absNum,
                  fldlist: 'caseQuantity,palletQuantity'
               };
               DataService.get('api/twl/item/getbypk', { params: params }, function (item) {
                  if (item) {
                     self.caseSize = item.caseQuantity;
                     self.palletSize = item.palletQuantity;
                  } else {
                     self.caseSize = 0;
                     self.palletSize = 0;
                  }
               });
            } else {
               self.twlcl.primPickType = "S";
               self.twlcl.minLvl = 0;
               self.twlcl.maxLvl = 0;
               self.twlcl.repQty = 0;
               self.twlcl.repUnit = 'E';
               self.caseSize = 0;
               self.palletSize = 0;
            }

            // If the product changed, determine if the product default zone should be changed
            if (self.twlcl.absNum && self.twlcl.absNum !== originalProduct) {
               var itemCriteria = {
                  coNum: self.twlcl.coNum,
                  whNum: self.twlcl.whNum,
                  absNum: self.twlcl.absNum
               };
               self.deleteLocation = function () {
                  DataService.post('api/twl/astwlsetup/deletelocation', { data: itemCriteria, busy: true }, function (data) {
                     if (data) {
                        if (data.whZone !== originalZone) {
                           MessageService.yesNo('global.question', 'question.do.you.want.to.update.default.zone', function () {
                              // Yes processing
                              self.twlcl.updtdefzonefl = true;
                           });
                        }
                     }
                  });
               };

            }
         };

         self.productChanged();

      });

      self.itemHyperlink = function (e, args) {
         $state.go('twlcin.detail', { id: args[0].item.inventoryRowID });
      };

      self.customCancel = function () {
         base.newRecord = false;

         $state.go('twlcl.master');
      };

      self.customDelete = function () {
         binCriteria = {
            coNum: self.twlcl.coNum,
            whNum: self.twlcl.whNum,
            binNum: self.twlcl.binNum
         };

         base.deleteLocation();
      };

      self.customSubmit = function () {
         base.newRecord = false;

         DataService.post('api/twl/astwlsetup/validatelocationdetail', { data: self.twlcl, busy: true }, function () {
            self.submit();
         });
      };

   };

});

// Location Type Default Vales
app.controller('TwlclLocationTypeCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var newRecord = false;
   self.locType = 'P';
   self.defaultbinsize = {};

   // Warehouse must be loaded to work with default data
   if (!base.criteria.whNum) {
      $state.go('^');
   } else {
      var params = {
         coNum: base.criteria.coNum,
         whNum: base.criteria.whNum,
         locType: self.locType
      };
      DataService.get('api/twl/binsize/getbypk', { params: params }, function (binsize) {
         if (binsize) {
            self.defaultbinsize = binsize;
            newRecord = false;
         } else {
            self.defaultbinsize.coNum = base.criteria.coNum;
            self.defaultbinsize.whNum = base.criteria.whNum;
            self.defaultbinsize.locType = self.locType;
            self.defaultbinsize.locTypeName = base.formatLocationType(self.locType);
            self.defaultbinsize.height = 0;
            self.defaultbinsize.width = 0;
            self.defaultbinsize.depth = 0;
            self.defaultbinsize.maxWeight = 0;
            self.defaultbinsize.maxPal = 0;
            newRecord = true;
         }
      });

   }

   self.returnToMaster = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + base.criteria.whNum;
   };

   self.changeType = function () {
      var params = {
         coNum: base.criteria.coNum,
         whNum: base.criteria.whNum,
         locType: self.locType
      };
      DataService.get('api/twl/binsize/getbypk', { params: params }, function (binsize) {
         if (binsize) {
            self.defaultbinsize = binsize;
            newRecord = false;
         } else {
            self.defaultbinsize.coNum = base.criteria.coNum;
            self.defaultbinsize.whNum = base.criteria.whNum;
            self.defaultbinsize.locType = self.locType;
            self.defaultbinsize.locTypeName = base.formatLocationType(self.locType);
            self.defaultbinsize.height = 0;
            self.defaultbinsize.width = 0;
            self.defaultbinsize.depth = 0;
            self.defaultbinsize.maxWeight = 0;
            self.defaultbinsize.maxPal = 0;
            newRecord = true;
         }
      });
   };

   self.submit = function () {
      if (newRecord) {
         // If creating a new record, must do a POST
         DataService.post('api/twl/binsize', { data: self.defaultbinsize, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         });
      } else {
         // If modifying an existing record, must do a PUT
         DataService.put('api/twl/binsize', { data: self.defaultbinsize, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      }
   };

});

//Inquiry - Inventory
app.controller('TwlclInventoryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var twlcl = $scope.dtl.twlcl;

   //If the user hits refresh twlcl will be null, go back to detail window
   if (!twlcl) {
      $state.go('^');
   } else {
      var invCriteria = {
         coNum: twlcl.coNum,
         whNum: twlcl.whNum,
         binNum: twlcl.binNum,
         qtyCompareType: 1,
         cycleCntType: 1,
         cycleId: 0,
         statusCode: 'All'
      };
      DataService.post('api/twl/astwlinquiry/getinventorylist', { data: invCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.inventorylistresults;
            if (data.lMoreRecords) {
               MessageService.alert('global.warning', "global.record.count.limit.has.been.reached");
            }

         }
      });
   }

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.showSerialNumbers = function () {
      $state.go('twlcl.detail.detail-inventory.detail-serial-numbers');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcl.whNum + ' | ' +
         MessageService.get('global.location') + ': ' + twlcl.binNum;
   };

   self.rowSelected = function () {
      self.inventorySelectedRecord = GridService.getSelectedRecord(self.grid);

      self.serialEnabled = false;

      if (self.inventorySelectedRecord) {
         DataService.get('api/twl/item/getbyrowid/' + self.inventorySelectedRecord.itemRowID, { busy: true }, function (data) {
            if (data) {
               if (data.serialFlag && data.serialByLocation) {
                  self.serialEnabled = true;
               }
            }
         });
      }

   };

});

//Inquiry - Movements
app.controller('TwlclMovementCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var twlcl = $scope.dtl.twlcl;

   //If the user hits refresh twlcl will be null, go back to detail window
   if (!twlcl) {
      $state.go('^');
   } else {
      var binCriteria = {
         chCo: twlcl.coNum,
         chWh: twlcl.whNum,
         chLoc: twlcl.binNum
      };
      var moveCriteria = {
         locpendmoverepcriteria: binCriteria,
         ismovement: true
      };
      DataService.post('api/twl/astwlinquiry/getlocationpendingmove', { data: moveCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.movemst;
            self.summaryData = data.locpendmoverepresults;
         }
      });
   }

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcl.whNum + ' | ' +
         MessageService.get('global.location') + ': ' + twlcl.binNum;
   };
});

//Inquiry - Picks
app.controller('TwlclPicksCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var twlcl = $scope.dtl.twlcl;

   //If the user hits refresh twlcl will be null, go back to detail window
   if (!twlcl) {
      $state.go('^');
   } else {
      var pickCriteria = {
         chCo: twlcl.coNum,
         chWh: twlcl.whNum,
         chLoc: twlcl.binNum
      };
      DataService.post('api/twl/astwlinquiry/getlocationpendingpick', { data: pickCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.pick;
            self.summaryData = data.locpendingpickresults;
         }
      });
   }

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcl.whNum + ' | ' +
         MessageService.get('global.location') + ': ' + twlcl.binNum;
   };
});

//Inquiry - Replenishments
app.controller('TwlclReplenishmentsCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var twlcl = $scope.dtl.twlcl;

   //If the user hits refresh twlcl will be null, go back to detail window
   if (!twlcl) {
      $state.go('^');
   } else {
      var binCriteria = {
         chCo: twlcl.coNum,
         chWh: twlcl.whNum,
         chLoc: twlcl.binNum
      };
      var moveCriteria = {
         locpendmoverepcriteria: binCriteria,
         ismovement: false
      };
      DataService.post('api/twl/astwlinquiry/getlocationpendingmove', { data: moveCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.movemst;
            self.summaryData = data.locpendmoverepresults;
         }
      });
   }

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcl.whNum + ' | ' +
         MessageService.get('global.location') + ': ' + twlcl.binNum;
   };

});

//Inquiry - Serial Numbers
app.controller('TwlclSerialNumbersCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var twlcl = $scope.dtl.twlcl;
   var dtli = $scope.dtli;

   //If the user hits refresh twlcl will be null, go back to detail window
   if (!dtli.inventorySelectedRecord) {
      $state.go('^');
   } else {
      var serialCriteria = {
         coNum: dtli.inventorySelectedRecord.coNum,
         whNum: dtli.inventorySelectedRecord.whNum,
         absNum: dtli.inventorySelectedRecord.absNum,
         binNum: dtli.inventorySelectedRecord.binNum,
         palletId: dtli.inventorySelectedRecord.palletId
      };
      DataService.post('api/twl/astwlinquiry/getinvserialnumbers', { data: serialCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   }

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcl.whNum + ' | ' +
         MessageService.get('global.location') + ': ' + twlcl.binNum;
   };

});
