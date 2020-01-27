'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oesf',
      recordName: 'oesfaddchg',
      dataPath: 'api/oe/oesf',
      searchMethod: 'POST',
      searchPath: 'api/oe/asoeentry/oesfsearch',
      searchResultsField: 'oesfsearchresults',
      resultsRowIdField: 'srcrowpointer',
      recordRowIdField: 'srcrowpointer'
   });

});


app.service('OesfService', function ($translate, $state, AodataService, ContextService, DataService, MessageService, UserService, ConfigService, GridService, Utils, Sasc) {

   this.getRecord = function (self, base, stateParams, scope) {

      base.whseListTy = '';
      var drillDownFl = false;

      // Active Record off Drill Down Arrow
      base.dataset.forEach(function (record) {
         if (record._rowactivated) {
            base.whseListTy = record.whselistty;
            drillDownFl = true;
         }
      });

      // Edit button Selected - Single Record
      if (!drillDownFl) {
         var singleRecord = GridService.getSelectedRecord(base.grid);
         if (singleRecord) {
            base.whseListTy = singleRecord.whselistty;
         }
      }

      // stateParams.id is the ttbloesfsearchresults.srcrowpointer - up to four different records off the main grid
      //    sasc.cono       for 'FR' - Company Rules
      //    arsc.rowpointer for 'CL' - Customer List Rules
      //    arss.rowpointer for 'CL' - Customer/Ship To List Rules
      //    icsd.rowpointer for 'WL' - Whse List
      var path = 'api/oe/asoeentry/oesfload/' + stateParams.id;

      // Loads the ttbloesfaddchg record
      return DataService.getResource(path, { busy: true });

   };


   this.updateRecord = function (self, base, oesfaddchg, scope, callback) {

      base.oesflist = [];

      oesfaddchg.setlistrules = false;
      oesfaddchg.clearlistrules = false;
      oesfaddchg.updatetype = 'Chg';

      // Used when a specific Grid record is picked to Delete from the Whse List set of records
      oesfaddchg.whselistcd = '';
      oesfaddchg.whselisttype = '';

      // Load all the Selected List records
      base.loadSelectedLists(oesfaddchg.recordtype);

      // Did the Rules Change on the Company Record and are there Customer/Ship To Records to adjust
      // Compare the Rules List to see if changed - Added or Removed a Rule
      if (oesfaddchg.recordtype.toUpperCase() === 'FR' && oesfaddchg.oesfcexistfl) {


         var origListLength = base.origRulesSelected.length;
         var currentListLength = base.oesflist.length;

         if (origListLength < currentListLength) {

            // Add New Rules to Customer List
            base.rulesAddedQuestion(function (isSetListRules) {

               if (isSetListRules) {
                  oesfaddchg.setlistrules = true;

                  base.updateOesfRecord(oesfaddchg, function (data) {
                     callback(data);
                  });

               } else {
                  base.updateOesfRecord(oesfaddchg, function (data) {
                     callback(data);
                  });
               }
            });

         } else if (origListLength > currentListLength) {

            // Remove Rules from Customer Lists - if they say no - no update is run
            base.rulesClearedQuestion(function (isClearListRules) {

               if (isClearListRules) {
                  oesfaddchg.clearlistrules = true;

                  base.updateOesfRecord(oesfaddchg, function (data) {
                     callback(data);
                  });
               }
            });

         } else {

            // NOTE: Could Add and Remove rules on the same list - edit for both and prompt for questions

            // Rules Added to the Selection List
            base.rulesAddedToList(function (isRuleAdded) {

               if (isRuleAdded) {

                  // Ask to Add New Rules to Customer List
                  base.rulesAddedQuestion(function (isSetListRules) {

                     if (isSetListRules) {
                        oesfaddchg.setlistrules = true;
                     }

                     // Rules Removed from the Selection List
                     base.rulesRemovedFromList(function (isRuleRemoved) {

                        if (isRuleRemoved) {

                           // Ask to Removed Rules from Customer Lists - if they say no - no update is run
                           base.rulesClearedQuestion(function (isClearListRules) {

                              if (isClearListRules) {
                                 oesfaddchg.clearlistrules = true;

                                 base.updateOesfRecord(oesfaddchg, function (data) {
                                    callback(data);
                                 });
                              }
                           });
                        } else {
                           base.updateOesfRecord(oesfaddchg, function (data) {
                              callback(data);
                           });
                        }
                     });
                  });
               } else {

                  // Rules Removed from the Selection List
                  base.rulesRemovedFromList(function (isRuleRemoved) {

                     if (isRuleRemoved) {

                        // Ask to Removed Rules from Customer Lists - if they say no - no update is run
                        base.rulesClearedQuestion(function (isClearListRules) {

                           if (isClearListRules) {
                              oesfaddchg.clearlistrules = true;

                              base.updateOesfRecord(oesfaddchg, function (data) {
                                 callback(data);
                              });
                           }
                        });
                     } else {
                        base.updateOesfRecord(oesfaddchg, function (data) {
                           callback(data);
                        });
                     }
                  });
               }
            });
         }
      } else {
         base.updateOesfRecord(oesfaddchg, function (data) {
            callback(data);
         });
      }
   };


   this.createRecord = function (self, base, records, scope, callback) {

      var oesfaddchg = [];
      var oesfaddchgList = {};
      var oesfUpdateType = 'Add';
      var oesfCopyRecord;
      var recordCnt = 0;
      var recordType = base.criteria.recordtype;

      base.oesflist = [];

      if (base.setCustomerRules) {
         oesfUpdateType = 'Rules';
      } else if (base.setCopyRecord) {
         oesfUpdateType = 'Copy';
      }

      // Single Record Update
      if (oesfUpdateType === 'Add' || oesfUpdateType === 'Copy') {

         // Only Single Record on Add and Copy
         oesfaddchg[recordCnt] = angular.copy(records);
         oesfaddchg[recordCnt].updatetype = oesfUpdateType;
         recordType = oesfaddchg[recordCnt].recordtype;

         // Used when a specific Grid record is picked to Delete from the Whse List set of records
         oesfaddchg[recordCnt].whselistcd = '';
         oesfaddchg[recordCnt].whselisttype = '';

         // Pull in the Original Source Row Pointer record to copy from
         if (oesfUpdateType === 'Copy') {
            oesfCopyRecord = GridService.getSelectedRecord(base.grid);
            oesfaddchg[recordCnt].srcrowpointer = oesfCopyRecord.srcrowpointer;
         }

         // Load all the Selected List records
         base.loadSelectedLists(recordType);

         oesfaddchgList = {
            oesfaddchg: oesfaddchg,
            oesflist: base.oesflist
         };

         DataService.post('api/oe/asoeentry/oesfupdate', { data: oesfaddchgList, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data)) {
                  //No Error
                  base.setCustomerRules = false;
                  base.setCopyRecord = false;
                  callback(data);
               }
            }
         });
      }

      // List of Customer Records to Update - Company Rule Change or Customer List Grid Selection
      if (oesfUpdateType === 'Rules') {

         // Pull in Selected Rows off the main Grid
         var records = GridService.getSelectedRecords(base.grid);

         // Process one Row at a Time
         records.forEach(function (record) {
            oesfaddchg[recordCnt] = angular.copy(record);
            oesfaddchg[recordCnt].updatetype = 'Rules';
            recordType = oesfaddchg[recordCnt].recordtype;
            recordCnt++;
         });

         // Load all the Selected Rules
         base.loadSelectedLists(recordType);

         oesfaddchgList = {
            oesfaddchg: oesfaddchg,
            oesflist: base.oesflist
         };

         DataService.post('api/oe/asoeentry/oesfupdate', { data: oesfaddchgList, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data)) {
                  //No Error
                  base.setCustomerRules = false;
                  base.setCopyRecord = false;
                  callback(data);
               }
            }
         });
      }

   };


   this.deleteRecord = function (self, base, records, scope, callback) {

      var oesfaddchg = [];
      var oesfaddchgList = {};
      var recordCnt = 0;
      var recordType = base.criteria.recordtype;

      oesfaddchg[recordCnt] = angular.copy(records);
      oesfaddchg[recordCnt].updatetype = 'Delete';

      // Load all the Selected Rules
      base.loadSelectedLists(recordType);

      oesfaddchgList = {
         oesfaddchg: oesfaddchg,
         oesflist: base.oesflist
      };

      DataService.post('api/oe/asoeentry/oesfupdate', { data: oesfaddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               //No Error
               callback(data);
            }
         }
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var oesfaddchg = [];
      var oesfaddchgList = {};

      // Pull in Selected Rows off the main Grid
      var records = GridService.getSelectedRecords(base.grid);
      var recordCnt = 0;
      var recordType = base.criteria.recordtype;

      // Process one Row at a Time
      records.forEach(function (record) {
         oesfaddchg[recordCnt] = angular.copy(record);
         oesfaddchg[recordCnt].updatetype = 'Delete';
         recordType = oesfaddchg[recordCnt].recordtype;
         recordCnt++;
      });

      // Load all the Selected Rules
      base.loadSelectedLists(recordType);

      oesfaddchgList = {
         oesfaddchg: oesfaddchg,
         oesflist: base.oesflist
      };

      DataService.post('api/oe/asoeentry/oesfupdate', { data: oesfaddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               //No Error
               callback(data);
            }
         }
      });

   };


   this.extendMasterController = function (self, base, scope) {

      base.setCustomerRules = false;
      base.setCopyRecord = false;

      // Customer hyperlink
      self.customerHyperlink = function (e, args) {
         var currentRow = args[0].item;
         if (currentRow && currentRow.custno > 0) {
            $state.go('aric.detail', { pk: currentRow.custno });
         }
      };

      // Ship To
      self.shiptoHyperlink = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.custno > 0 && currentRow.shipto > '') {
            $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
         }
      };

      self.setRules = function () {

         base.setCustomerRules = true;
         $state.go('^.create');
      };

      self.setCopy = function () {

         base.setCopyRecord = true;
         $state.go('^.create');
      };

   };


   this.extendBaseController = function (self, criteria, scope) {

      // Screen Default - Fulfillment rules - Company Level
      self.criteria.recordtype = 'fr';
      self.oesflist = [];

      self.isFulfillmentBillingOn = AodataService.getValue("OE", "OEFulfillmentBilling").toLowerCase() === 'yes';

      // Set screen id suffix for context messages since doc team wants this doc to be separated by the record type
      scope.$watch('base.criteria.recordtype', function (value) {
         if (value) {
            ContextService.setScreenIdSuffix(value, 'oesf.master');
         }
      });

      // Detail Lists
      self.rulesList = [];
      self.rulesSelected = [];
      self.whseList = [];
      self.whseSelected = [];
      self.regionList = [];
      self.regionSelected = [];
      self.groupList = [];
      self.groupSelected = [];

      // Company Rules - Original Selected List
      self.origRulesSelected = [];

      // Rules Settings
      self.preferredValue = 'preferredwarehouselist';
      self.preferredLabel = MessageService.get('global.preferred.warehouse.list');
      self.inventoryValue = 'mostinventoryavailable';
      self.inventoryLabel = MessageService.get('global.most.available.inventory');
      self.quickestValue = 'quickestdeliverydate';
      self.quickestLabel = MessageService.get('global.quickest.delivery.date');
      self.groupbyValue = 'groupbyregion';
      self.groupbyLabel = MessageService.get('global.group.by.region');

      self.getGridLabel = function () {

         if (self.criteria.recordtype.toLowerCase() === 'fr') {
            return MessageService.get('global.fulfillment.rules');
         } else if (self.criteria.recordtype.toLowerCase() === 'cl') {
            return MessageService.get('global.customer.ship.to.list');
         } else if (self.criteria.recordtype.toLowerCase() === 'wl') {
            return MessageService.get('global.preferred.warehouse.list');
         }
      };

      // Detail Selected Lists - Add/Chg - Update of Lists
      self.loadSelectedLists = function (recType) {

         var selectedEntry = {};
         var selectedValue = '';
         var recordValue = 0;
         var iGroupCounter = self.whseSelected.length;
         var iRegionCounter = self.groupSelected.length + self.whseSelected.length;

         if (recType.toLowerCase() === 'wl') {

            // Selected Whse List */
            for (var i = 0; i < self.whseSelected.length; i++) {

               selectedValue = self.whseSelected[i].value;
               recordValue = i + 1;

               selectedEntry = {
                  listvalue: selectedValue,
                  recordtype: 'wl',
                  seqno: recordValue,
                  whselisttype: 'sw',
                  selectedfl: true
               };

               self.oesflist.push(selectedEntry);
            }

            // Selected Whse Group List */
            for (var j = 0; j < self.groupSelected.length; j++) {

               selectedValue = self.groupSelected[j].value;
               recordValue = j + 1;

               selectedEntry = {
                  listvalue: selectedValue,
                  recordtype: 'wl',
                  seqno: recordValue,
                  whselisttype: 'wg',
                  selectedfl: true
               };

               self.oesflist.push(selectedEntry);
            }

            // Selected Region List */
            for (var k = 0; k < self.regionSelected.length; k++) {

               selectedValue = self.regionSelected[k].value;
               recordValue = k + 1;

               selectedEntry = {
                  listvalue: selectedValue,
                  recordtype: 'wl',
                  seqno: recordValue,
                  whselisttype: 'rg',
                  selectedfl: true
               };

               self.oesflist.push(selectedEntry);
            }

         } else {

            // Selected Rules List - CL (Customer List) and FR (Fulfillment Rules)
            for (var i = 0; i < self.rulesSelected.length; i++) {

               selectedValue = self.rulesSelected[i].value;
               recordValue = i + 1;

               selectedEntry = {
                  listvalue: selectedValue,
                  recordtype: recType.toLowerCase(),
                  seqno: recordValue,
                  whselisttype: '',
                  selectedfl: true
               };

               self.oesflist.push(selectedEntry);
            }
         }

      };

      // Detail Record Lists
      self.loadRulesList = function (listRecord) {

         var whseValue = '';
         var whseLabel = '';

         if (listRecord.listvalue) {

            if (listRecord.recordtype.toUpperCase() === 'FR' || listRecord.recordtype.toUpperCase() === 'CL') {

               switch (listRecord.listvalue.toLowerCase()) {
                  case self.preferredValue:
                     if (listRecord.selectedfl) {
                        self.rulesSelected.push({ label: self.preferredLabel, value: self.preferredValue });
                        if (listRecord.recordtype.toUpperCase() === 'FR') {
                           self.origRulesSelected.push({ label: self.preferredLabel, value: self.preferredValue });
                        }
                     } else {
                        self.rulesList.push({ label: self.preferredLabel, value: self.preferredValue });
                     }
                     break;
                  case self.inventoryValue:
                     if (listRecord.selectedfl) {
                        self.rulesSelected.push({ label: self.inventoryLabel, value: self.inventoryValue });
                        if (listRecord.recordtype.toUpperCase() === 'FR') {
                           self.origRulesSelected.push({ label: self.inventoryLabel, value: self.inventoryValue });
                        }
                     } else {
                        self.rulesList.push({ label: self.inventoryLabel, value: self.inventoryValue });
                     }
                     break;
                  case self.quickestValue:
                     if (listRecord.selectedfl) {
                        self.rulesSelected.push({ label: self.quickestLabel, value: self.quickestValue });
                        if (listRecord.recordtype.toUpperCase() === 'FR') {
                           self.origRulesSelected.push({ label: self.quickestLabel, value: self.quickestValue });
                        }
                     } else {
                        self.rulesList.push({ label: self.quickestLabel, value: self.quickestValue });
                     }
                     break;
                  case self.groupbyValue:
                     if (listRecord.selectedfl) {
                        self.rulesSelected.push({ label: self.groupbyLabel, value: self.groupbyValue });
                        if (listRecord.recordtype.toUpperCase() === 'FR') {
                           self.origRulesSelected.push({ label: self.groupbyLabel, value: self.groupbyValue });
                        }
                     } else {
                        self.rulesList.push({ label: self.groupbyLabel, value: self.groupbyValue });
                     }
                     break;
                  default:
                     break;
               }
            } else if (listRecord.recordtype.toUpperCase() === 'WL') {

               whseValue = listRecord.listvalue;
               whseLabel = listRecord.listlabel;

               // Sourcing Whse, Region or Warehouse Group List
               if (listRecord.whselisttype.toUpperCase() === 'SW') {
                  if (listRecord.selectedfl) {
                     self.whseSelected.push({ label: whseLabel, value: whseValue });
                  } else {
                     self.whseList.push({ label: whseLabel, value: whseValue });
                  }
               }

               if (listRecord.whselisttype.toUpperCase() === 'RG') {
                  if (listRecord.selectedfl) {
                     self.regionSelected.push({ label: whseLabel, value: whseValue });
                  } else {
                     self.regionList.push({ label: whseLabel, value: whseValue });
                  }
               }

               if (listRecord.whselisttype.toUpperCase() === 'WG') {
                  if (listRecord.selectedfl) {
                     self.groupSelected.push({ label: whseLabel, value: whseValue });
                  } else {
                     self.groupList.push({ label: whseLabel, value: whseValue });
                  }
               }
            }
         }
      };

      // Used in Cancel and Back Arrow from Detail Screen
      self.resetBaseFields = function () {

         self.setCustomerRules = false;
         self.setCopyRecord = false;

         // Go back to master state if not already there
         if (!self.isMaster()) {
            $state.go('oesf.master');
         }
      };

      self.rulesAddedQuestion = function (callback) {

         // All Customer/Ship To List Records Will Load New Rule(s) as Selected. Update Records?
         MessageService.yesNo('global.confirmation', 'global.all.customer.shipto.list.records.will.load.new.rules',
                           function () {
                              // Yes processing
                              callback(true);
                           }, function () {
                              // No processing
                              callback(false);
                           });
      };

      self.rulesClearedQuestion = function (callback) {

         // All Customer/Ship To List Records Will Be Cleared of the Rule(s) No Longer Selected. Do You Wish To Continue?
         MessageService.yesNo('global.confirmation', 'global.all.customer.shipto.list.records.will.be.cleared.of.the',
                           function () {
                              // Yes processing
                              callback(true);
                           }, function () {
                              // No processing
                              callback(false);
                           });
      };

      self.rulesAddedToList = function (callback) {

         // Look for Rules Added (Selected Rule Not in Original List)
         var rulesAdded = false;
         var rulesExist = false;
         var selectedValue = '';
         var origValue = '';

         // Current Selected List
         for (var i = 0; i < self.oesflist.length; i++) {

            selectedValue = self.oesflist[i].listvalue;
            rulesExist = false;

            // Original Selected List
            for (var j = 0; j < self.origRulesSelected.length; j++) {

               origValue = self.origRulesSelected[j].value;

               if (origValue === selectedValue) {
                  rulesExist = true;
               }
            }

            if (!rulesExist) {
               rulesAdded = true;
            }
         }

         callback(rulesAdded);
      };

      self.rulesRemovedFromList = function (callback) {

         // Look for Rules Removed From Original List
         var rulesRemoved = false;
         var rulesExist = false;
         var selectedValue = '';
         var origValue = '';

         // Original Selected List
         for (var i = 0; i < self.origRulesSelected.length; i++) {

            origValue = self.origRulesSelected[i].value;
            rulesExist = false;

            // Original Selected List
            for (var j = 0; j < self.oesflist.length; j++) {

               selectedValue = self.oesflist[j].listvalue;

               if (origValue === selectedValue) {
                  rulesExist = true;
               }
            }

            if (!rulesExist) {
               rulesRemoved = true;
            }
         }

         callback(rulesRemoved);
      };


      self.updateOesfRecord = function (record, callback) {

         var oesfaddchg = [];
         var oesfaddchgList = {};
         var recordCnt = 0;

         oesfaddchg[recordCnt] = angular.copy(record);

         oesfaddchgList = {
            oesfaddchg: oesfaddchg,
            oesflist: self.oesflist
         };


         DataService.post('api/oe/asoeentry/oesfupdate', { data: oesfaddchgList, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data)) {
                  //No Error
                  callback(data);
               }
            }
         });
      };

   };


   this.extendSearchController = function (self, base, criteria, scope) {

      base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();

      // If the Record Type changes - reset the type data - keep the record type as is
      self.setResetRecordDefaults = function () {

         if (base.criteria.recordtype) {
            base.criteria.custno = '0';
            base.criteria.shipto = '';
            base.criteria.whse = '';
            base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();

            // Resets the Grid Data - otherwise the Old Grid Data remains
            base.dataset = [];
         }
      };

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.criteria.recordtype = 'fr';
         self.setResetRecordDefaults();

      };

      // Perform search
      self.submit = function () {

         self.setCustomerRules = false;
         self.setCopyRecord = false;

         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('oesf.master');
         }

         base.search();
      };

   };


   this.extendDetailController = function (self, base, oesfaddchg, scope) {

      // Set screen id suffix for context messages since doc team wants this doc to be separated by the record type
      ContextService.setScreenIdSuffix(base.criteria.recordtype, $state.current.name);

      // Clear Detail Lists
      base.rulesList = [];
      base.rulesSelected = [];
      base.whseList = [];
      base.whseSelected = [];
      base.regionList = [];
      base.regionSelected = [];
      base.groupList = [];
      base.groupSelected = [];
      base.origRulesSelected = [];

      // Wait for the Record to load off the backend oesfload call
      oesfaddchg.$promise.then(function () {

         if (self.oesfaddchg.recordtype.toLowerCase() === 'wl') {
            if (!base.whseListTy) {
               self.oesfaddchg.whselistcd = 'sw';
            } else {
               self.oesfaddchg.whselistcd = base.whseListTy;
            }
         }

         DataService.post('api/oe/asoeentry/oesfloadlist', { data: oesfaddchg, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  // No Error

                  // Load the Detail Lists based on Types of Record
                  if (data.length) {
                     for (var i = 0; i < data.length; i++) {
                        var record = data[i];
                        base.loadRulesList(record);
                     }
                  }
               }
            }
         });

         var params = {
            whse: self.oesfaddchg.mainwhse,
            fldlist: 'region'
         };
         DataService.get('api/ic/icsd/getbypk', { params: params, busy: true }, function (icsd) {
            if (icsd) {
               self.region = icsd.region;
            }
         });
      });

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         if (self.oesfaddchg.recordtype) {

            switch (self.oesfaddchg.recordtype.toUpperCase()) {
               case 'WL':                                                              //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.banner.warehouse');        //ignore jslint - correct indentation
                  subTitleText += ": " + self.oesfaddchg.mainwhse;                     //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               case 'CL':                                                              //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.customer.number');         //ignore jslint - correct indentation
                  subTitleText += ": " + self.oesfaddchg.custno;                       //ignore jslint - correct indentation
                  if (self.oesfaddchg.shipto > '') {                                   //ignore jslint - correct indentation
                     subTitleText += MessageService.get('global.ship.to');             //ignore jslint - correct indentation
                     subTitleText += ": " + self.oesfaddchg.shipto;                    //ignore jslint - correct indentation
                  }                                                                    //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               case 'FR':                                                              //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.company.number');          //ignore jslint - correct indentation
                  subTitleText += ": " + Sasc.cono;                                    //ignore jslint - correct indentation                                                                    //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
               default:                                                                //ignore jslint - correct indentation
                  break;                                                               //ignore jslint - correct indentation
            }

         }
         return subTitleText;
      };

   };

   this.extendCreateController = function (self, base, oesfaddchg, scope) {

      var oesfCopyRecord;

      // Set screen id suffix for context messages since doc team wants this doc to be separated by the record type
      ContextService.setScreenIdSuffix(base.criteria.recordtype, $state.current.name);

      // Clear Detail Lists
      base.rulesList = [];
      base.rulesSelected = [];
      base.whseList = [];
      base.whseSelected = [];
      base.regionList = [];
      base.regionSelected = [];
      base.groupList = [];
      base.groupSelected = [];
      base.origRulesSelected = [];

      self.oesfaddchg.recordtype = base.criteria.recordtype;
      self.oesfaddchg.custno = '0';
      self.oesfaddchg.shipto = '';
      self.oesfaddchg.mainwhse = '';
      self.oesfaddchg.srcrowpointer = '';

      // Copy - Load the selected record to load the rules/whse records
      if (base.setCopyRecord) {
         var records = GridService.getSelectedRecords(base.grid);

         records.forEach(function (record) {
            oesfCopyRecord = angular.copy(record);
         });

         self.oesfaddchg.srcrowpointer = oesfCopyRecord.srcrowpointer;
      }

      // Whse List - Selection List Defaults to Sourcing Whse (SW)
      if (self.oesfaddchg.recordtype.toLowerCase() === 'wl') {
         self.oesfaddchg.whselistcd = 'sw';
      }

      // Fulfillment Rule - Billing Code Defaults to Ship Complete (S)
      if (self.oesfaddchg.recordtype.toLowerCase() === 'fr') {
         self.oesfaddchg.billingcd = 's';
      }

      DataService.post('api/oe/asoeentry/oesfloadlist', { data: oesfaddchg, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               // No Error

               // Load the Detail Lists based on Types of Record
               if (data.length) {
                  for (var i = 0; i < data.length; i++) {
                     var record = data[i];
                     base.loadRulesList(record);
                  }
               }
            }
         }
      });

      self.getSubTitle = function () {

         var subTitleText;

         if (base.setCustomerRules) {
            subTitleText = MessageService.get('global.rules');
         } else if (base.setCopyRecord) {
            subTitleText = MessageService.get('global.copy');
         } else {
            subTitleText = MessageService.get('global.new');
         }

         return subTitleText;
      };

      self.warehouseChanged = function () {
         var params = {
            whse: self.oesfaddchg.mainwhse,
            fldlist: 'region'
         };
         DataService.get('api/ic/icsd/getbypk', { params: params, busy: true }, function (icsd) {
            if (icsd) {
               self.region = icsd.region;
            }
         });
      };

   };

});