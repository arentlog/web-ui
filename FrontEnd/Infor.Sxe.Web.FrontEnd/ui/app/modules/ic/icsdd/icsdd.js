'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsdd',
      dataPath: 'api/ic/icsdd',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'icsddRowidStr',  //WebHandler call requires Rowid as a String.
      recordRowIdField: 'rowpointer', //Used for building the 'Recently Visited' list.
      recordName: 'icsdd',
      primaryKeyParams: ['whse', 'drawerid'],
      createStateParams: { whse: null, drawerid: null },
      copyStateView: 'ic/icsdd/copy.json',
      copyMethod: 'POST',
      copyPath: '/web/api/ic/icsddcopy',
      recentlyVisited: {
         title: { label: 'global.warehouse', value: 'whse' },
         description: { label: 'global.drawer.id', value: 'drawerid' }
      }
   });
});

//NOTE: This function is entirely WebHandler calls.
app.service('IcsddService', function ($state, $q, MessageService, DataService, ConfigService, CommonConverters, UtilsData, Utils) {

   //This function overrides the standard Search with our custom version.
   this.search = function (self, criteria, scope, callback) {
      var requestCriteria = {
         whse: criteria.whse,
         drawerid: criteria.drawerid,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      DataService.post('/web/api/ic/icsddgetlist', { data: requestCriteria, busy: true }, function (data) {
         if (data.ttblicsddresults) {
            callback(data.ttblicsddresults);
         } else {
            //Important so we don't get residual data from previous searches if no records are returned.
            callback([]);
         }
      });
   };

   this.getRecord = function (self, base, stateParams, scope) {
      //This will be the response from the call.
      var responseRecord = {};

      //NOTE: This is not a very common pattern.  We have to fake a 'promise' for this since we can't 
      //just do a Return like most other 'getRecord' calls because it's a specialized API call.
      //We need to do this due to the complexity (and power) of the Setups container.
      // Attach the promise (imitating how DataService.getResource does it)
      var deferred = $q.defer();
      responseRecord.$promise = deferred.promise;

      //NOTE: The rowid is extracted on the backend from the request object.  The name of the property
      //must not be changed.
      var requestCriteria = {
         icsddRowid: stateParams.id
      };

      DataService.post('/web/api/ic/icsddload?rowpointer=' + stateParams.id, {data: requestCriteria, busy: true }, function (data) {

         //The return record is in data.ttblicsdd 
         if (data.ttblicsdd) {
                        
            //NOTE: We're using 'extend' instead of the 'replaceObject' so we don't lose the extra things 
            //such as the Promise.  Also, we can't just do an assign of the results to responseRecord because
            //doing so, would be a local copy, that's why we use the 'extend' helper function.
            //Utils.extend(responseRecord, result.ttblicsdd[0]);
            Utils.extend(responseRecord, data.ttblicsdd);
         }

         //Manually tell Angular that we are done and ready to resolve the Promise.
         responseRecord.$resolved = true;
         deferred.resolve(responseRecord);
      });

      //Because of the asynchronous call, this won't be fully hydrated at this point in time.
      return responseRecord;
   };

   this.updateRecord = function (self, base, icsdd, scope, callback) {
      icsdd.updatetype = 'chg';
      icsdd.asgnedopers = self.assignedOperators.join(",");

      //The $promise property causes an error.  It was added during the retrieve
      delete icsdd.$promise;

      var criteria = {
         ttblicsdd: [icsdd]
      };
      DataService.post('/web/api/ic/icsddupdate', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               //No Error
               callback(data.messaging);
            }
         }
      });
   };

   this.createRecord = function (self, base, icsdd, scope, callback) {
      icsdd.updatetype = 'add';

      if (self.assignedOperators) {
         icsdd.asgnedopers = self.assignedOperators.join(",");
      }

      var criteria = {
         ttblicsdd: [icsdd]        
      };
      DataService.post('/web/api/ic/icsddupdate', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data.messaging);
            }
         }
      });
   };

   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, icsdd, $scope, deleteCallback) {
      if (icsdd.rowpointer) {

         var criteria = {
            ttblicsddrowid: [{ charrowid: icsdd.rowpointer }]
         };

         DataService.post('/web/api/ic/icsdddelete', { data: criteria, busy: true }, function () {
            deleteCallback();
         });
      }
   };

   // Custom Delete of Possible Multiple Records for Master Screen
   this.deleteMultiple = function (self, base, records, scope, deleteCallback) {
      var ttblicsddrowid = [];

      records.forEach(function (record) {         
         if (record.icsddRowidStr) {
            ttblicsddrowid.push({ charrowid: record.icsddRowidStr});
         }
      });
            
      if (ttblicsddrowid.length > 0) {
         var requestCriteria = {
            ttblicsddrowid: ttblicsddrowid           
         };

         DataService.post('/web/api/ic/icsdddelete', { data: requestCriteria, busy: true }, function () {
            deleteCallback();
         });
      }
   };

   this.extendBaseController = function (self) {
      self.banknoDropDownOptions = [];
   };

   this.extendCreateController = function (self, base, icsdd, scope, stateParams) {
      self.availableOperators = [];
      self.assignedOperators = [];

      self.buildOperatorsList = function () {
         //TODO: We may need to build in some division/warehouse security in the backend.
         var requestCriteria = {
            ttbluserlistcriteria: {
               oper: '',
               name: '',
               dept: '',
               whse: '' //TODO: Add this parameter.  We might need to modify existing appserver call too.
               //userlistget.p which would require a codegen since a new parameter would be coming in for whse.
               //unless we wanted to trim the list down after in the 'pvusergetlist' webhandler call.
            }
         };

         DataService.post('/web/api/shared/pvusergetlist', { data: requestCriteria, busy: true }, function (data) {
            if (data) {
               if (data.ttbluserlist && data.ttbluserlist.length > 0) {
                  data.ttbluserlist.forEach(function (item) {
                     if (item.oper2) {
                        var option = {
                           label: item.oper2 + ' - ' + item.username,
                           value: item.oper2
                        };
                        self.availableOperators.push(option);
                     }
                  });
               }
            }
         });
      };

      self.warehouseChanged = function () {
         self.buildOperatorsList();
      };

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         base.banknoDropDownOptions = dropDownList;
      });

      self.buildOperatorsList();
   };

   this.extendDetailController = function (self, base, icsdd) {
      self.availableOperators = [];
      self.assignedOperators = [];

      self.buildOperatorsList = function () {
         //TODO: We may need to build in some division/warehouse security in the backend.
         var requestCriteria = {
            ttbluserlistcriteria: {
               oper: '',
               name: '',
               dept: '',
               whse: '' //TODO: Add this parameter.  We might need to modify existing appserver call too.
               //userlistget.p which would require a codegen since a new parameter would be coming in for whse.
               //unless we wanted to trim the list down after in the 'pvusergetlist' webhandler call.
            }
         };

         DataService.post('/web/api/shared/pvusergetlist', { data: requestCriteria, busy: true }, function (data) {
            if (data) {
               if (data.ttbluserlist && data.ttbluserlist.length > 0) {
                  data.ttbluserlist.forEach(function (item) {
                     if (item.oper2) {
                        var option = {
                           label: item.oper2 + ' - ' + item.username,
                           value: item.oper2
                        };
                        self.availableOperators.push(option);
                     }
                  });
               }
            }
         });
      };

      self.warehouseChanged = function () {
         self.buildOperatorsList();
      };

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         base.banknoDropDownOptions = dropDownList;
      });

      self.buildOperatorsList();

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + self.icsdd.whse + ' | ' +
            MessageService.get('global.drawer.id') + ': ' + self.icsdd.drawerid;
      };

      //Convert a CSV list of operators into a collection that can be bound to the Multi-Select field.
      self.populateSelectedOperators = function () {
         self.assignedOperators = [];
         if (self.icsdd && self.icsdd.asgnedopers) {
            var assignedOperatorsArray = [];
            assignedOperatorsArray = self.icsdd.asgnedopers.split(",");
            assignedOperatorsArray.forEach(function (operator) {
               if (operator) {
                  self.assignedOperators.push(operator);
               }
            });
         }
      };

      icsdd.$promise.then(function () {
         self.populateSelectedOperators(self.icsdd.whse);
      });
   };

   this.extendSearchController = function (self, base) {

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('icsdd.master');
         }

         base.search();
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + stateParams.object.whse + ' | ' +
            MessageService.get('global.drawer.id') + ': ' + stateParams.object.drawerid;
      };

      request.charrowid = stateParams.id;
   };
});
