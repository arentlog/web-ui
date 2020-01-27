'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsprs',
      dataPath: 'api/ic/icsprs',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsprsourcingsearch',
      searchResultsField: 'icsprsrcsearchresults',
      searchRecordLimitField: 'recordlimit',
      resultsRowIdField: 'icsprRowid',
      recordRowIdField: 'icsprRowid',
      detailSubTitle: [
         { label: '', value: 'base.formatRestrictType' }
      ],
      recentlyVisited: {
         title: { label: '', valueFunction: 'base.formatRestrictType' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });
});


app.service('IcsprsService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils) {

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the icsprs table off selected Grid Record
      var icsprsList = {
         icsprRowid: stateParams.id
      };

      return DataService.getResource('api/ic/asicsetup/icsprsourcingretrieve', { data: icsprsList, method: 'POST', busy: true });

   };


   this.createRecord = function (self, base, icsprs, scope, callback) {

      var icsprsList = {
         restricttype: icsprs.restricttype,
         product: icsprs.product,
         prodline: icsprs.prodline,
         prodlinevendno: icsprs.prodlinevendno,
         prodcat: icsprs.prodcat,
         whse: icsprs.whse,
         startdt: icsprs.startdt,
         expiredt: icsprs.expiredt,
         descrip: icsprs.descrip,
         activefl: icsprs.activefl,
         module: icsprs.module,
         restrictovrfl: icsprs.restrictovrfl,
         vendno: icsprs.vendno,
         shiptowhse: icsprs.shiptowhse,
         user1: icsprs.user1,
         user2: icsprs.user2,
         user3: icsprs.user3,
         user4: icsprs.user4,
         user5: icsprs.user5,
         user6: parseFloat(icsprs.user6),
         user7: parseFloat(icsprs.user7),
         user8: new Date(icsprs.user8),
         user9: new Date(icsprs.user9)
      };

      DataService.post('api/ic/asicsetup/icsprsourcingcreate', { data: icsprsList, busy: true }, function (data) {
         if (data) {
            // Load the returned record into CallBack to load the icspr.rowid (new record)
            callback(data);
         }
      });
   };


   this.updateRecord = function (self, base, icsprs, scope, callback) {

      var icsprsList = {
         expiredt: icsprs.expiredt,
         descrip: icsprs.descrip,
         activefl: icsprs.activefl,
         module: icsprs.module,
         restrictovrfl: icsprs.restrictovrfl,
         vendno: icsprs.vendno,
         shiptowhse: icsprs.shiptowhse,
         icsprRowid: icsprs.icsprRowid,
         user1: icsprs.user1,
         user2: icsprs.user2,
         user3: icsprs.user3,
         user4: icsprs.user4,
         user5: icsprs.user5,
         user6: parseFloat(icsprs.user6),
         user7: parseFloat(icsprs.user7),
         user8: new Date(icsprs.user8),
         user9: new Date(icsprs.user9)
      };

      DataService.post('api/ic/asicsetup/icsprsourcingupdate', { data: icsprsList, busy: true }, function () {
         callback('ok');
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var icsprsList = [];

      // Process one Row at a Time
      records.forEach(function (record) {

         icsprsList.push(record);

      });

      DataService.post('api/ic/asicsetup/icsprsourcingdelete', { data: icsprsList, busy: true }, function () {
         callback('ok');
      });

   };

   this.deleteRecord = function (self, base, record, scope, callback) {

      var icsprsList = [];

      icsprsList.push(record);

      DataService.post('api/ic/asicsetup/icsprsourcingdelete', { data: icsprsList, busy: true }, function () {
         callback('ok');
      });

   };


   this.extendBaseController = function (self) {

      var holdSelectedRestrictType;

      // Column Label - loaded off Search Choice
      self.loadRestrictType = function (restrictType) {

         if (restrictType) {

            holdSelectedRestrictType = restrictType;

            switch (restrictType.toUpperCase()) {
               case 'PR':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.product');                      //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PL':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.product.line');                 //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PC':                                                                             //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.product.category');             //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               default:                                                                               //ignore jslint - correct indentation
                  self.restrictTypeLabel = MessageService.get('global.invalid');                      //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
            }
         }
      };

      // Load the Colum Label initially with Product
      self.loadRestrictType('PR');

      // Format function for record type in recently visited display
      self.formatRestrictType = function (icspr) {

         var restrictType = icspr.restricttype;
         var recentTitle;

         if (restrictType) {
            switch (restrictType.toUpperCase()) {
               case 'PR':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.product') + ': ' + icspr.product;                      //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'PL':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.product.line') + ': ' + icspr.prodline;                //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'PC':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.product.category') + ': ' + icspr.prodcat;             //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               default:                                                                                           //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.invalid');                                             //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
            }
         }

         return recentTitle;
      };


      // Format function for record Description data in recently visited display
      self.formatSubData = function (icspr) {

         var restrictType = icspr.restricttype;
         var recentSubTitle;

         if (restrictType) {
            switch (restrictType.toUpperCase()) {
               case 'PL':                                                                                      //ignore jslint - correct indentation
                  if (icspr.vendno) {                                                                          //ignore jslint - correct indentation
                     recentSubTitle = $translate.instant('global.vendor.number') + ': ' + icspr.vendno;        //ignore jslint - correct indentation

                     if (icspr.whse) {                                                                         //ignore jslint - correct indentation
                        recentSubTitle += ', ' + $translate.instant('global.warehouse') + ': ' + icspr.whse;   //ignore jslint - correct indentation

                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle += ', ' + $translate.instant('global.start.date') +                  //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     } else {                                                                                  //ignore jslint - correct indentation
                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle += ', ' + $translate.instant('global.start.date') +                  //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  } else {                                                                                     //ignore jslint - correct indentation
                     if (icspr.whse) {                                                                         //ignore jslint - correct indentation
                        recentSubTitle = $translate.instant('global.warehouse') + ': ' + icspr.whse;           //ignore jslint - correct indentation

                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle += ', ' + $translate.instant('global.start.date') +                  //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     } else {                                                                                  //ignore jslint - correct indentation
                        if (icspr.startdt) {                                                                   //ignore jslint - correct indentation
                           recentSubTitle = $translate.instant('global.start.date') +                          //ignore jslint - correct indentation
                                    ': ' + Utils.formatDate(icspr.startdt);                                    //ignore jslint - correct indentation
                        }                                                                                      //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  }                                                                                            //ignore jslint - correct indentation
                  break;                                                                                       //ignore jslint - correct indentation
               case 'PR':                                                                                      //ignore jslint - correct indentation
               case 'PC':                                                                                      //ignore jslint - correct indentation
                  if (icspr.whse) {                                                                            //ignore jslint - correct indentation
                     recentSubTitle = $translate.instant('global.warehouse') + ': ' + icspr.whse;              //ignore jslint - correct indentation

                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle += ', ' + $translate.instant('global.start.date') +                     //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  } else {                                                                                     //ignore jslint - correct indentation
                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle = $translate.instant('global.start.date') +                             //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  }                                                                                            //ignore jslint - correct indentation
                  break;                                                                                       //ignore jslint - correct indentation
               default:                                                                                        //ignore jslint - correct indentation
                  if (icspr.whse) {                                                                            //ignore jslint - correct indentation
                     recentSubTitle = $translate.instant('global.warehouse') + ': ' + icspr.whse;              //ignore jslint - correct indentation

                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle += ', ' + $translate.instant('global.start.date') +                     //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  } else {                                                                                     //ignore jslint - correct indentation
                     if (icspr.startdt) {                                                                      //ignore jslint - correct indentation
                        recentSubTitle = $translate.instant('global.start.date') +                             //ignore jslint - correct indentation
                              ': ' + Utils.formatDate(icspr.startdt);                                          //ignore jslint - correct indentation
                     }                                                                                         //ignore jslint - correct indentation
                  }                                                                                            //ignore jslint - correct indentation
                  break;                                                                                       //ignore jslint - correct indentation
            }
         }

         return recentSubTitle;
      };

      self.displayVendorColumn = function () {
         if (holdSelectedRestrictType === 'PL') {
            return true;
         }
         else {
            return false;
         }
      };
   };


   this.extendMasterController = function (self, base, scope) {

      self.vendorInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // APIV HyperLink - vendor #
         if (currentRow && parseFloat(currentRow.prodlinevendno) > 0) {
            $state.go('apiv.detail', { pk: parseFloat(currentRow.prodlinevendno) });
         }
      };

      // Action - Activate or Deactivate selected records
      self.doAction = function (mode) {

         // Pull in Selected Rows
         var records = GridService.getSelectedRecords(base.grid);
         var activeFlag = true;
         var icsprsList = [];

         if (mode === 'inactivate') {
            activeFlag = false;
         }

         // Process one Row at a Time
         records.forEach(function (record) {
            icsprsList.push(record);
         });

         // Load all the rows selected and pass in the Active value
         var criteria = {
            icsprsrcsearchresults: icsprsList,
            lActive: activeFlag
         };

         // Update all Selected Records
         DataService.post('api/ic/asicsetup/icsprsourcingactivate', { data: criteria, busy: true }, function () {

            // Once the Call is complete, update the Rows Selected on the grid to match backend update - no data returned from SI Call
            icsprsList.forEach(function (record) {
               var indx = base.dataset.indexOf(record);
               record.activefl = activeFlag;
               base.grid.updateRow(indx);
            });
         });
      };

   };


   this.extendSearchController = function (self, base, criteria, scope) {

      base.criteria.statuscd = 'b';
      base.criteria.restricttype = 'PR';

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();

         base.criteria.restricttype = 'PR';
         base.criteria.statuscd = 'b';
      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('icsprs.master');
         }

         // Load the Colum Label
         base.loadRestrictType(base.criteria.restricttype);

         base.search();
      };

   };

   this.extendCreateController = function (self, base, icsprs, scope) {

      self.icsprs.restricttype = 'PR';
      self.icsprs.activefl = true;
      self.icsprs.module = 'P';
   };

   this.extendDetailController = function (self, base, icsprs, scope) {

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;
         var restrictType;

         restrictType = self.icsprs.restricttype;

         if (restrictType) {

            switch (restrictType.toUpperCase()) {
               case 'PR':
                  subTitleText = MessageService.get('global.product') + ' | ' + self.icsprs.product;
                  break;
               case 'PL':
                  if (self.icsprs.vendno) {
                     subTitleText = MessageService.get('global.product.line') + ' | ' + self.icsprs.vendno;
                     subTitleText += ' | ' + self.icsprs.prodline;
                  } else if (self.icsprs.prodline) {
                     subTitleText = MessageService.get('global.product.line') + ' | ' + self.icsprs.prodline;
                  }
                  break;
               case 'PC':
                  subTitleText = MessageService.get('global.product.category') + ' | ' + self.icsprs.prodcat;
                  break;
               default:
                  subTitleText = MessageService.get('global.invalid');
                  break;
            }
         }

         if (self.icsprs.startdt) {
            subTitleText += ' | ' + Utils.formatDate(self.icsprs.startdt);
         }

         if (self.icsprs.whse) {
            subTitleText += ' | ' + self.icsprs.whse;
         }

         return subTitleText;
      };

      self.chgDocumentType = function (type) {

         // If Both leave existing values
         if (type === 'T') {
            self.icsprs.vendno = 0;
         }

         if (type === 'P') {
            self.icsprs.shiptowhse = '';
         }
      };

   };


});