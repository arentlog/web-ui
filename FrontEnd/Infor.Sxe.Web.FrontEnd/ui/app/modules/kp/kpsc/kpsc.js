'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'kp',
      menuFn: 'kpsc',
      recordName: 'kpsk',
      dataPath: 'api/kp/kpsk',
      searchMethod: 'POST',
      searchPath: 'api/kp/kpsk/lookup',
      searchResultsField: '',
      searchCriteria: { searchtype: '', lkupsearchfl: false},
      resultsRowIdField: 'rowidKpsk',
      recentlyVisited: {
         title: { label: 'global.kit.product', value: 'prod' },
         description: [{ label: 'global.version.number', valueFunction: 'base.formatVersion' }, { label: 'global.sequence.number', value: 'seqno' }]
      }
   });
});

app.service('KpscService', function ($state, DataService, GridService, MessageService) {

   var displayBOCheckBox = false;
   var path = 'api/kp';
   var createCriteria = [];
   var updateCriteria = [];

   // Need to be able to get detail data from the KPSKV record if the version number of the kit set up is greater than zero
   this.getRecord = function (self, base, stateParams) {

      if (base.criteria.verno) {

         path = 'api/kp/kpskv/getbyrowid/' + stateParams.id;
         return DataService.getResource(path, { busy: true });

      } else {

         path = 'api/kp/kpsk/getbyrowid/' + stateParams.id;
         return DataService.getResource(path, { busy: true });

      }

   };


   // Make sure that the version number is loaded correctly before calling the code to update the component record
   this.updateRecord = function (self, base, kpsk, scope, callback) {

      var updateVerno = 0;
      var updateBoType = false;

      if (base.criteria.verno) {
         updateVerno = base.criteria.verno;
      }

      if (self.kpsk.compboty) {
         updateBoType = true;
      }

      // If updating the KPSK, the version number must be zero however it is null on the criteria.  Set the sequence number to ensure that it is numeric.
      updateCriteria[0] = {
         prod: self.kpsk.prod,
         bofl: updateBoType,
         comptype: self.kpsk.comptype,
         comprod: self.kpsk.comprod,
         keyword1: self.keyword1,
         keyword2: self.keyword2,
         keyword3: self.keyword3,
         keyword4: self.keyword4,
         keyword5: self.keyword5,
         pricefl: self.kpsk.pricefl,
         printfl: self.kpsk.printfl,
         qtyneeded: self.kpsk.qtyneeded,
         refer: self.kpsk.refer,
         reqfl: self.kpsk.reqfl,
         seqno: self.kpsk.seqno,
         subfl: self.kpsk.subfl,
         unit: self.kpsk.unit,
         variablefl: self.kpsk.variablefl,
         verno: updateVerno,
         verrefer: self.kpsk.verrefer,
         npfl: self.kpsk.npfl,
         user1: self.kpsk.user1,
         user2: self.kpsk.user2,
         user3: self.kpsk.user3,
         user4: self.kpsk.user4,
         user5: self.kpsk.user5,
         user6: parseFloat(self.kpsk.user6),
         user7: parseFloat(self.kpsk.user7),
         user8: new Date(self.kpsk.user8),
         user9: new Date(self.kpsk.user9)
      };

      DataService.post('api/kp/askpsetup/kpcreateupdatecomponent', { data: updateCriteria, busy: true }, function (data) {
         callback(data);
      });

   };


   // Create a new component record.  Be sure to use zero as the sequence number.
   this.createRecord = function (self, base, kpsk, scope, callback) {

      var createVerno = 0;
      var createBoType = false;

      if (base.criteria.verno) {
         createVerno = base.criteria.verno;
      }

      if (self.kpsk.compboty) {
         createBoType = true;
      }

      createCriteria[0] = {
         prod: self.kpsk.prod,
         bofl: createBoType,
         comptype: self.kpsk.comptype,
         comprod: self.kpsk.comprod,
         keyword1: self.keyword1,
         keyword2: self.keyword2,
         keyword3: self.keyword3,
         keyword4: self.keyword4,
         keyword5: self.keyword5,
         pricefl: self.kpsk.pricefl,
         printfl: self.kpsk.printfl,
         qtyneeded: self.kpsk.qtyneeded,
         refer: self.kpsk.refer,
         reqfl: self.kpsk.reqfl,
         seqno: 0,
         subfl: self.kpsk.subfl,
         unit: self.kpsk.unit,
         variablefl: self.kpsk.variablefl,
         verno: createVerno,
         verrefer: self.kpsk.verrefer,
         npfl: self.kpsk.npfl,
         user1: self.kpsk.user1,
         user2: self.kpsk.user2,
         user3: self.kpsk.user3,
         user4: self.kpsk.user4,
         user5: self.kpsk.user5,
         user6: parseFloat(self.kpsk.user6),
         user7: parseFloat(self.kpsk.user7),
         user8: new Date(self.kpsk.user8),
         user9: new Date(self.kpsk.user9)
      };

      DataService.post('api/kp/askpsetup/kpcreateupdatecomponent', { data: createCriteria, busy: true }, function (data) {
         callback(data.kpcomponentprocess);
      });

   };


   // Need to be able to delete the KPSKV record if the version number of the kit set up is greater than zero from the Detail section
   this.deleteRecord = function (self, base, record, scope, callback) {

      var path = 'api/kp';

      if (base.criteria.verno) {

         path = 'api/kp/kpskv';
         DataService.delete(path, { data: record, busy: true }, function () {
            callback();
         });

      } else {

         path = 'api/kp/kpsk';
         DataService.delete(path, { data: record, busy: true }, function () {
            callback();
         });

      }

   };


   // Need to be able to delete the KPSKV record if the version number of the kit set up is greater than zero from the Master grid section
   this.deleteMultiple = function (self, base, records, scope, callback) {

      var path = 'api/kp';
      var rowIds = GridService.getSelectedRowIds(base.grid, 'rowidKpsk');

      if (base.criteria.verno) {

         path = 'api/kp/kpskv/deletelistbyrowids/';
         DataService.delete(path, { data: rowIds, busy: true }, function () {
            callback();
         });

      } else {

         path = 'api/kp/kpsk/deletelistbyrowids/';
         DataService.delete(path, { data: rowIds, busy: true }, function () {
            callback();
         });

      }

   };


   this.extendBaseController = function (self) {

      // Format function for kit version number in recently visited display
      self.formatVersion = function (kpsk) {
         var kitVersion = kpsk.verno;

         if (kitVersion) {
            return kitVersion;
         } else {
            return 0;
         }
      };

   };


   this.extendMasterController = function (self, base) {

      // Execute this code when user selects the Create New Version button above main grid
      self.newVersion = function () {

         if (base.criteria.verno) {

            // Create a new version from an existing version
            DataService.get('api/kp/askpsetup/kpcreatenewversion/' + base.criteria.prod + '/' + base.criteria.verno, function (newVerno) {
               base.criteria.verno = newVerno;
            });

         } else {

            // When creating a new version from the base version, be sure to pass in zero as the original version
            DataService.get('api/kp/askpsetup/kpcreatenewversion/' + base.criteria.prod + '/0', function (newVerno) {
               base.criteria.verno = newVerno;
            });

         }

      };

      self.componentFormatter = function (row, cell, value, column, item) {
         if (value && item.comptype.toLowerCase() === 'kywd') {

            var str = value;

            // Keyword data returned in a string delimited with pv-delimiter which is a chr(3)
            // Replace pv-delimiter with a comma for readability on the H5 screen
            for (var i = 0; i < 4; i++) {
               str = str.replace(String.fromCharCode(3), ', ');
            }
            return str;
         } else {
            return value;
         }
      };

      self.componentTypeFormatter = function (row, cell, value, column, item) {
         if (value) {

            if (value.toLowerCase() === 'comp') {
               return MessageService.get('global.component');
            } else if (value.toLowerCase() === 'grp') {
               return MessageService.get('global.group');
            } else if (value.toLowerCase() === 'kywd') {
               return MessageService.get('global.keyword');
            } else if (value.toLowerCase() === 'opt') {
               return MessageService.get('global.option');
            } else {
               return MessageService.get('global.reference');
            }

         } else {
            return value;
         }
      };
   };


   this.extendSearchController = function (self, base, criteria, scope) {

      // Get data based on kit product selected in Search section
      self.kitProductChange = function () {

         // Get the last setup version for the kit product entered
         var requestCriteria = {
            cKitProd: base.criteria.prod
         };
         DataService.post('api/kp/askpsetup/kpgetlastverno', { data: requestCriteria, busy: true }, function (lastVerno) {
            base.criteria.verno = lastVerno || 0;
         });

         // The back order checkbox is displayed based on the ICSP kit type and the transferable kit type. Set variable when the kit product changes
         var params = {
            prod: base.criteria.prod,
            fldlist: 'kittype,bodtransferty'
         };
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
            if (icsp && icsp.kittype) {
               displayBOCheckBox = (icsp.kittype.toLowerCase() === 'b' && icsp.bodtransferty === '');
            }

         });

      };

   };


   this.extendCreateController = function (self, base, kpsk, scope) {
      kpsk.prod = base.criteria.prod;
      kpsk.verno = base.criteria.verno;
      kpsk.reqfl = true;
      kpsk.printfl = true;
      kpsk.pricefl = true;
      kpsk.comptype = 'c';
      self.bovisible = displayBOCheckBox;

      // Control the fields displayed based upon the type of component
      self.changeComponentType = function () {

         if (self.kpsk.comptype === 'g') {

            self.bovisible = false;
            self.expandcomponentlabel = MessageService.get('global.group');

         } else if (self.kpsk.comptype === 'o') {

            self.bovisible = false;
            self.expandcomponentlabel = MessageService.get('global.option');

         } else if (self.kpsk.comptype === 'r') {

            self.bovisible = false;

         } else if (self.kpsk.comptype === 'k') {

            self.bovisible = false;

         } else {

            self.bovisible = displayBOCheckBox;

         }
      };

      self.changeComponentProduct = function () {
         var params = {
            prod: self.kpsk.comprod,
            fldlist: 'unitstock'
         };

         // If the user changes the component product, find ICSP and default the stocking unit for that product
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
            if (icsp) {
               kpsk.unit = icsp.unitstock;
            }
         });

      };

      self.changeKitProduct = function () {
         var params = {
            prod: self.kpsk.prod,
            fldlist: 'kittype,bodtransferty'
         };

         // The back order checkbox is displayed based on the ICSP kit type and the transferable kit type. Set visibility when the kit product changes
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {

            if (icsp && icsp.kittype) {
               self.bovisible = (icsp.kittype.toLowerCase() === 'b' && icsp.bodtransferty === '');
            } else {
               self.bovisible = false;
            }

         });

         // Get the last setup version for the kit product entered
         var requestCriteria = {
            cKitProd: self.kpsk.prod
         };
         DataService.post('api/kp/askpsetup/kpgetlastverno', { data: requestCriteria, busy: true }, function (lastVerno) {
            self.kpsk.verno = lastVerno || 0;
         });
      };

   };


   this.extendDetailController = function (self, base, kpsk, scope) {

      // Load Sub Title with Price Type
      self.getSubTitle = function () {
         return self.kpsk.comprod;
      };

      self.componentList = [];

      // Control the fields displayed based upon the type of component
      kpsk.$promise.then(function () {

         if (self.kpsk.comptype === 'g') {

            self.bovisible = false;
            self.expandcomponentlabel = MessageService.get('global.group');

            var groupCriteria = {
               groupname: self.kpsk.comprod
            };

            var componentList = [];
            DataService.post('api/kp/kpsg/getgroupsbygroupnameandsequencenumber', { data: groupCriteria, busy: true }, function (data) {
               if (data) {
                  var len = data.length;

                  for (var i = 0; i < len; i++) {
                     componentList.push({
                        comprod: data[i].comprod,
                        qtyneeded: data[i].qtyneeded,
                        unit: data[i].unit,
                        reqfl: data[i].reqfl,
                        variablefl: data[i].variablefl,
                        subfl: data[i].subfl,
                        pricefl: data[i].pricefl,
                        printfl: data[i].printfl,
                        refer: data[i].refer,
                        seqno: data[i].seqno
                     });
                  }
                  self.grid.loadData(componentList);
               } else {
                  return componentList;
               }
            });

         } else if (self.kpsk.comptype === 'o') {

            self.bovisible = false;
            self.expandcomponentlabel = MessageService.get('global.option');

            var optionCriteria = {
               optionname: self.kpsk.comprod
            };

            var componentList = [];
            DataService.post('api/kp/kpso/getoptionsbyoptionname', { data: optionCriteria, busy: true }, function (data) {
               if (data) {
                  var len = data.length;

                  for (var i = 0; i < len; i++) {
                     componentList.push({
                        comprod: data[i].comprod,
                        qtyneeded: data[i].qtyneeded,
                        unit: data[i].unit,
                        reqfl: false,
                        variablefl: data[i].variablefl,
                        subfl: false,
                        pricefl: data[i].pricefl,
                        printfl: data[i].printfl,
                        refer: data[i].refer,
                        seqno: data[i].seqno
                     });
                  }
                  self.grid.loadData(componentList);
               } else {
                  return componentList;
               }
            });

         } else if (self.kpsk.comptype === 'r') {

            self.bovisible = false;

         } else if (self.kpsk.comptype === 'k') {

            self.keyword1 = self.kpsk.comprod.trim().substring(0, 10);
            self.keyword2 = self.kpsk.comprod.trim().substring(11, 21);
            self.keyword3 = self.kpsk.comprod.trim().substring(22, 32);
            self.keyword4 = self.kpsk.comprod.trim().substring(33, 43);
            self.keyword5 = self.kpsk.comprod.trim().substring(44, 54);
            self.bovisible = false;

         } else {

            self.bovisible = displayBOCheckBox;

         }

      });

   };

});
