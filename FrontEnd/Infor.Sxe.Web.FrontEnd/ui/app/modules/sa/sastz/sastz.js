'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sastz',
      dataPath: 'api/sa/sastaz',
      searchMethod: 'POST',
      searchPath: 'api/sa/assasetup/sastzgetdatalist',
      searchResultsField: '',
      resultsRowIdField: 'rowid',
      primaryKeyParams: ['codeiden', 'primarykey', 'secondarykey'],
      detailSubTitle: [
         { label: 'global.table', value: 'codeiden' },
         { label: '', value: 'primarykey' },
         { label: '', value: 'secondarykey' }
      ],
      recentlyVisited: null
   });
});

app.service('SastzService', function ($translate, $state, DataService) {
   this.extendBaseController = function (self) {
      var currentindex = 0;
      var lastindex = -1;
      var idx = 0;

      // current selection table name values
      self.sastztable = {
         tablename: '',
         key1: '',
         key2: '',
         field1: '',
         field2: '',
         field3: '',
         field4: '',
         field5: '',
         field6: '',
         field7: '',
         field8: '',
         field9: '',
         field10: '',
         field11: '',
         field12: '',
         field13: '',
         field14: '',
         field15: '',
         field16: ''
      };

      // Reset the search criteria object
      self.resetCriteria = function () {
         self.criteria.tablename = self.sastzTableData[0].tablename;
         self.criteria.key1 = '';
         self.criteria.key2 = '';
         self.changeTableData();
      };

      // Called at the change of Table Data dropdown to a new SASTZ table setup
      self.changeTableData = function () {

         for (var i = 0; i < self.sastzTableData.length; i++) {
            if (self.sastzTableData[i].tablename === self.criteria.tablename) {
               currentindex = i;
               break;
            }
         }
         idx = currentindex;

         self.sastztable.tablename = self.sastzTableData[idx].tablename;
         self.sastztable.key1 = self.sastzTableData[idx].key1;
         self.sastztable.key2 = self.sastzTableData[idx].key2;
         self.sastztable.field1 = self.sastzTableData[idx].field1;
         self.sastztable.field2 = self.sastzTableData[idx].field2;
         self.sastztable.field3 = self.sastzTableData[idx].field3;
         self.sastztable.field4 = self.sastzTableData[idx].field4;
         self.sastztable.field5 = self.sastzTableData[idx].field5;
         self.sastztable.field6 = self.sastzTableData[idx].field6;
         self.sastztable.field7 = self.sastzTableData[idx].field7;
         self.sastztable.field8 = self.sastzTableData[idx].field8;
         self.sastztable.field9 = self.sastzTableData[idx].field9;
         self.sastztable.field10 = self.sastzTableData[idx].field10;
         self.sastztable.field11 = self.sastzTableData[idx].field11;
         self.sastztable.field12 = self.sastzTableData[idx].field12;
         self.sastztable.field13 = self.sastzTableData[idx].field13;
         self.sastztable.field14 = self.sastzTableData[idx].field14;
         self.sastztable.field15 = self.sastzTableData[idx].field15;
         self.sastztable.field16 = self.sastzTableData[idx].field16;

         // Perform search automatically to ensure the correct grid and data is displayed for the newly selected table
         if (currentindex !== lastindex) {
            self.search();
            lastindex = currentindex;
         }

      }; // changeTableData

      self.getKeyLabel1 = function () {
         return self.sastztable.key1;
      };
      self.getKeyLabel2 = function () {
         return self.sastztable.key2;
      };

      self.getFieldLabel1 = function () {
         return self.sastztable.field1;
      };
      self.getFieldLabel2 = function () {
         return self.sastztable.field2;
      };
      self.getFieldLabel3 = function () {
         return self.sastztable.field3;
      };
      self.getFieldLabel4 = function () {
         return self.sastztable.field4;
      };
      self.getFieldLabel5 = function () {
         return self.sastztable.field5;
      };
      self.getFieldLabel6 = function () {
         return self.sastztable.field6;
      };
      self.getFieldLabel7 = function () {
         return self.sastztable.field7;
      };
      self.getFieldLabel8 = function () {
         return self.sastztable.field8;
      };
      self.getFieldLabel9 = function () {
         return self.sastztable.field9;
      };
      self.getFieldLabel10 = function () {
         return self.sastztable.field10;
      };
      self.getFieldLabel11 = function () {
         return self.sastztable.field11;
      };
      self.getFieldLabel12 = function () {
         return self.sastztable.field12;
      };
      self.getFieldLabel13 = function () {
         return self.sastztable.field13;
      };
      self.getFieldLabel14 = function () {
         return self.sastztable.field14;
      };
      self.getFieldLabel15 = function () {
         return self.sastztable.field15;
      };
      self.getFieldLabel16 = function () {
         return self.sastztable.field16;
      };
   };

   this.extendSearchController = function (self, base) {

      // Load the Table List dropdown
      DataService.get('api/sa/assasetup/sastzgettablelist', { busy: true }, function (data) {
         base.sastzTableData = data;
         if (data.length > 0) {
            base.criteria.tablename = data[0].tablename;
            base.changeTableData();
         }
      });

      // Triggers when Table List Drop Down changes
      self.changeTableList = function () {
         base.changeTableData();
      };

      // Clear form
      self.clear = function () {
         // Reset criteria
         base.resetCriteria();
      };
   };
   this.extendCreateController = function (self, base, sastz) {
      sastz.codeiden = base.criteria.tablename;
   };

   this.updateRecord = function (self, base, sastz, scope, callback) {
      var updateRecord = {
         tablename: sastz.codeiden,
         key1: sastz.primarykey,
         key2: sastz.secondarykey,
         field1: sastz.codeval1,
         field2: sastz.codeval2,
         field3: sastz.codeval3,
         field4: sastz.codeval4,
         field5: sastz.codeval5,
         field6: sastz.codeval6,
         field7: sastz.codeval7,
         field8: sastz.codeval8,
         field9: sastz.codeval9,
         field10: sastz.codeval10,
         field11: sastz.codeval11,
         field12: sastz.codeval12,
         field13: sastz.codeval13,
         field14: sastz.codeval14,
         field15: sastz.codeval15,
         field16: sastz.codeval16,
         rowid: sastz.rowID
      };
      DataService.post('api/sa/assasetup/sastzsavedata', { data: updateRecord, busy: true }, function (data) {
         callback(data);
      });
   };

   this.createRecord = function (self, base, sastz, scope, callback) {
      var createRecord = {
         tablename: sastz.codeiden,
         key1: sastz.primarykey,
         key2: sastz.secondarykey,
         field1: sastz.codeval1,
         field2: sastz.codeval2,
         field3: sastz.codeval3,
         field4: sastz.codeval4,
         field5: sastz.codeval5,
         field6: sastz.codeval6,
         field7: sastz.codeval7,
         field8: sastz.codeval8,
         field9: sastz.codeval9,
         field10: sastz.codeval10,
         field11: sastz.codeval11,
         field12: sastz.codeval12,
         field13: sastz.codeval13,
         field14: sastz.codeval14,
         field15: sastz.codeval15,
         field16: sastz.codeval16
      };
      DataService.post('api/sa/assasetup/sastzadddata', { data: createRecord, busy: true }, function (data) {
         callback(data);
      });
   };

   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, sastz, $scope, deleteCallback) {
      DataService.post('api/sa/assasetup/sastzdeletedata', { data: sastz }, function () {
         deleteCallback();
      });
   };

   // Custom Delete of Possible Multiple Records for Master Screen
   this.deleteMultiple = function (self, base, records, scope, deleteCallback) {
      records.forEach(function (record) {
         DataService.post('api/sa/assasetup/sastzdeletedata', { data: record, busy: true }, function () {
            deleteCallback();
         });
      });
   };

});