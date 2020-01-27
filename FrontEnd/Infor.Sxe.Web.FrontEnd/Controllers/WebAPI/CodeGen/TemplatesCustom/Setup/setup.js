app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'xx',
      menuFn: 'xxxx',
      dataPath: '', // not used for custom setups
      recordName: 'record', // using a generic name
      recordRowIdField: 'rowidxxxx',
      searchMethod: 'SEARCH_METHOD', // not used for custom setups
      searchPath: 'SEARCH_PATH', // not used for custom setups
      searchResultsField: 'SEARCH_RESULTS_FIELD', // not used for custom setups
      resultsRowIdField: 'rowidxxxx',
      searchView: 'extension-xx-xxxx-search',
      masterStateView: 'extension-xx-xxxx-master',
      createStateView: 'extension-xx-xxxx-detail',
      detailStateView: 'extension-xx-xxxx-detail',
      detailSubTitle: [
         {label: '', value: 'KEY_FIELD'}
      ],
      recentlyVisited: null
   });
});

app.run(function (TranslationService) {
   TranslationService.addStrings('en-US', {
      'menu.xxxx': 'Menu for xxxx',
      'title.xxxx': 'Title for xxxx'
   });
});

app.service('XxxxService', function ($q, $state, ConfigService, DataService, MessageService, GridService, Utils) {

   this.extendBaseController = function (self, criteria, scope, stateParams) {

   };

   this.extendSearchController = function (self, base, criteria, scope, stateParams) {

   };

   this.extendMasterController = function (self, base, scope, stateParams) {

   };

   this.extendCreateController = function (self, base, record, scope, stateParams) {

   };

   this.extendDetailController = function (self, base, record, scope, stateParams) {

   };

   // Perform custom search
   this.search = function (self, criteria, scope, callback) {
      var criteriaData = {
         field1: criteria.field1,
         field2: criteria.field2,
         recordcountlimit: ConfigService.getDefaultRecordLimit(),
         userfield: ''
      };

      var criteriaDataSet = {
         pdsxxxxsearchcriteria: {
            ttblxxxxsearchcriteria: [criteriaData]
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxSearch',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      DataService.post('api/custom/ascustom/customcall', { data: requestCriteria, busy: true }, function (data) {
         if (data && data.length > 1) {
            // the 1st row contains the criteria and the 2nd row contains the results
            var result = JSON.parse(data[1].data);
            if (result) {
               callback(result.pdsxxxxsearchresults.ttblxxxxsearchresults);
            }
         } else {
            callback([]);
         }
      });
   };

   // Perform custom way to get single record selected from the grid drilldown
   this.getRecord = function (self, base, stateParams) {
      var responseRecord = {};

      var criteriaData = {
         rowidxxxx: stateParams.id,
         userfield: ''
      };

      var criteriaDataSet = {
         pdsxxxxdetailcriteria: {
            ttblxxxxdetailcriteria: [criteriaData]
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxDetail',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      //NOTE: This is not a very common pattern.  We have to fake a 'promise' for this since we can't
      //just do a Return like most other 'getRecord' calls because it's a specialized API call.
      //We need to do this due to the complexity (and power) of the Setups container.
      // Attach the promise (imitating how DataService.getResource does it)
      var deferred = $q.defer();
      responseRecord.$promise = deferred.promise;

      DataService.post('api/custom/ascustom/customcall', { data: requestCriteria, busy: true }, function (data) {
         if (data && data.length > 1) {
            //The 1st Row contains the criteria and the 2nd row contains the results.
            var result = JSON.parse(data[1].data);
            //Store the data on the Promise record.
            if (result) {
               //NOTE: We're using 'extend' instead of the 'replaceObject' so we don't lose the extra things
               //such as the Promise.  Also, we can't just do an assign of the results to responseRecord because
               //doing so, would be a local copy, that's why we use the 'extend' helper function.
               Utils.extend(responseRecord, result.pdsxxxxdetailresult.ttblxxxxdetailresult[0]);
            }
         }
         //Manually tell Angular that we are done and ready to resolve the Promise.
         responseRecord.$resolved = true;
         deferred.resolve(responseRecord);
      });

      //Because of the asynchronous call, this won't be fully hydrated at this point in time.
      return responseRecord;
   };

   // Perform custom way to save a new record from the create/detail screen
   this.createRecord = function (self, base, record, scope, callback) {
      var criteriaDataSet = {
         pdsxxxxaddupd: {
            ttblxxxxaddupd: [record]
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxAddUpd',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      DataService.post('api/custom/ascustom/customcall', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            var result = JSON.parse(data[1].data);
            if (result) {
               callback(result.pdsxxxxaddupd.ttblxxxxaddupd[0]);
            }
         }
      });
   };

   // Perform custom way to update an existing record from the detail screen
   this.updateRecord = function (self, base, record, scope, callback) {
      var criteriaDataSet = {
         pdsxxxxaddupd: {
            ttblxxxxaddupd: [record]
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxAddUpd',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      DataService.post('api/custom/ascustom/customcall', { data: requestCriteria, busy: true }, function (data) {
         var result = JSON.parse(data[1].data);
         if (result) {
            callback(result.pdsxxxxaddupd.ttblxxxxaddupd[0]);
         }
      });
   };

   // Perform custom way to delete a record from the detail screen
   this.deleteRecord = function (self, base, record, scope, callback) {
      var criteriaData = {
         rowidxxxx: record.rowidxxxx,
         userfield: ''
      };

      var criteriaDataSet = {
         pdsxxxxdel: {
            ttblxxxxdel: [criteriaData]
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxDel',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      DataService.post('api/custom/ascustom/customcall', { data: requestCriteria, busy: true }, function (data) {
         callback();
      });
   };

   // Perform custom way to delete multiple records from the master grid
   this.deleteMultiple = function (self, base, records, scope, callback) {
      var criteriaData = [];

      records.forEach(function (result) {
         var criteriaRow = {
            rowidxxxx: result.rowidxxxx
         };
         criteriaData.push(criteriaRow);
      });

      var criteriaDataSet = {
         pdsxxxxdel: {
            ttblxxxxdel: criteriaData
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxDel',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      DataService.post('api/custom/ascustom/customcall', { data: requestCriteria, busy: true }, function (data) {
         callback();
      });
   };

});