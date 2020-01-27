'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'wt',
      menuFn: 'wtsa',
      dataPath: 'api/wt/wtsa',
      searchMethod: 'POST',
      searchPath: 'api/wt/aswtinquiry/wtsasearch',
      searchResultsField: 'wtsasearchresults',
      copyStateView: 'wt/wtsa/copy.json',
      resultsRowIdField: 'wtsarowid',
      primaryKeyParams: ['recordtype'],
      detailSubTitle: [
         {label: null, value: 'recordtype'}
      ],
      recentlyVisited: null
   });
});

app.service('WtsaService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils) {

   var holdSearchRecord;
   var holdDefaultMarkupAddonType;
   var holdDefaultMarkupAddonList;

   this.getRecord = function (self, base, stateParams) {

       var criteria = {
           wtsarowid: stateParams.id
       };

       return DataService.getResource('api/wt/aswtinquiry/wtsaload', { data: criteria, method: 'POST', busy: true });
   };

   this.updateRecord = function (self, base, wtsa, scope, callback) {

       wtsa.updatetype = 'chg';
       DataService.post('api/wt/aswtinquiry/wtsaupdate', { data: wtsa, busy: true }, function (data) {

           if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                   //No Error
                   callback(data);
               }
           }
       });
   };

   this.createRecord = function (self, base, wtsa, scope, callback) {

       wtsa.updatetype = 'add';
       DataService.post('api/wt/aswtinquiry/wtsaupdate', { data: wtsa, busy: true }, function (data) {

           if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                   callback(data.wtsaaddchg);
               }
           }
       });
   };

   this.deleteRecord = function (self, base, wtsa, scope, callback) {

       wtsa.updatetype = 'delete';
       DataService.post('api/wt/aswtinquiry/wtsaupdate', { data: wtsa, busy: true }, function (data) {

           if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                   callback(data.wtsaaddchg);
               }
           }
       });
   };

   this.deleteMultiple = function (self, base, records, scope, deleteCallback) {

       var wtsaSingle;
       records.forEach(function (record) {
           wtsaSingle = angular.copy(record);
           wtsaSingle.updatetype = 'delete';
           wtsaSingle.rowid = record.wtsarowid;
           DataService.post('api/wt/aswtinquiry/wtsaupdate', { data: wtsaSingle, busy: true }, function (data) {
               if (data) {
                   if (!MessageService.processMessaging(data.messaging)) {
                       deleteCallback();
                   }
               }
           });
       });
   };

   // Copy - OK Button
   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {

       var wtsaSingle = angular.copy(request);

       wtsaSingle.updatetype = 'Copy';

       DataService.post('api/wt/aswtinquiry/wtsaupdate', { data: wtsaSingle, busy: true }, function (data) {
           if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                   var record = data.wtsaaddchg;
                   record.rowid = record.rowid;
                   callback(record);
               }
           }
       });
   };

   this.extendBaseController = function (self) {

      self.markupAddonTypeList = [];
      self.wtsaInitialObject = {};
      self.criteriaInitialObject = {};

      var holdDefaultMarkupAddonArray;
      var holdSelectedMarkupAddonType;

      // Load the Markup Addon Types based off AO Settings
      DataService.get('api/wt/aswtinquiry/wtsainitialize', { busy: true }, function (data) {

         var dropDownLabel;
         var markupAddonType;
         var i;

         if (data) {

            self.wtsaInitialObject = data;
            self.criteriaInitialObject = data;

            // Parse out the comma delimited field value for the drop down lists
            var markupAddonTypeArray = [];
            markupAddonTypeArray = data.wtsadropdownlist.split(",");

            // Build the Markup Addons Drop Down data
            for (i = 0; i <= markupAddonTypeArray.length; i++) {

               markupAddonType = markupAddonTypeArray[i];

               if (markupAddonType) {
                  switch (markupAddonType.toUpperCase()) {
                     case '':                                                                      //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.default');                      //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'PR':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product');                      //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'PL':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.line');                 //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'PC':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.category');             //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'PT':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.product.price.type');           //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     case 'AG':                                                                    //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.alternate.product.group');      //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                     default:                                                                      //ignore jslint - correct indentation
                        dropDownLabel = MessageService.get('global.invalid');                      //ignore jslint - correct indentation
                        break;                                                                     //ignore jslint - correct indentation
                  }

                  self.markupAddonTypeList.push({ value: markupAddonType, label: dropDownLabel });

                  if (markupAddonType === data.wtsaselectiontype) {
                     holdDefaultMarkupAddonArray = i;
                  }
               }
            }

            // Load the Default drop down setting
            if (self.markupAddonTypeList.length) {
               self.criteria.markupAddonType = self.markupAddonTypeList[holdDefaultMarkupAddonArray].value;
               holdDefaultMarkupAddonType = self.criteria.recordtype;
               holdDefaultMarkupAddonList = self.criteria.markupAddonTypeList;

               // Load the Colum Label
               self.loadmarkupAddonType(self.criteria.markupAddonType);
            }
         }
      });

      // Column Label - loaded off Search Choice
      self.loadMarkupAddonType = function (markupAddonType) {

         if (markupAddonType) {

            holdSelectedMarkupAddonType = markupAddonType;

            switch (markupAddonType.toUpperCase()) {
               case '':                                                                               //ignore jslint - correct indentation
                  self.markupAddonTypeLabel = MessageService.get('global.default');                   //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PR':                                                                             //ignore jslint - correct indentation
                  self.markupAddonTypeLabel = MessageService.get('global.product');                   //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PL':                                                                             //ignore jslint - correct indentation
                  self.markupAddonTypeLabel = MessageService.get('global.product.line');              //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PC':                                                                             //ignore jslint - correct indentation
                  self.markupAddonTypeLabel = MessageService.get('global.product.category');          //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'PT':                                                                             //ignore jslint - correct indentation
                  self.markupAddonTypeLabel = MessageService.get('global.product.price.type');        //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               case 'AG':                                                                             //ignore jslint - correct indentation
                  self.markupAddonTypeLabel = MessageService.get('global.alternate.product.group');   //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
               default:                                                                               //ignore jslint - correct indentation
                  self.markupAddonTypeLabel = MessageService.get('global.invalid');                   //ignore jslint - correct indentation
                  break;                                                                              //ignore jslint - correct indentation
            }
         } else {
             holdSelectedMarkupAddonType = '';
         }
      };

      self.displayColumn1 = function () {
         if (holdSelectedMarkupAddonType) {
            return true;
         }
         else {
            return false;
         }
      };

      self.searchMarkupTypeChanged = function () {
          var leaveFieldObject = { wtsainitialize: self.wtsaInitialObject, pvType: self.criteria.recordtype };

          if (!leaveFieldObject.pvType) {
              leaveFieldObject.pvType = '';
          }
          DataService.post('api/wt/aswtinquiry/wtsaleavefield', { data: leaveFieldObject, busy: true }, function (data) {

              if (data) {
                  self.criteriaInitialObject = data;
                  // Clear out previous "Additional Selection Criteria" fields.
                  self.criteria.product = '';
                  self.criteria.prodcat = '';
                  self.criteria.prodprctype = '';
                  self.criteria.vendno = 0;
                  self.criteria.prodline = '';
                  self.criteria.altprodgrp = '';
              }
          });
      };
   };

   this.extendSearchController = function (self, base, criteria, scope) {

      base.criteria.cono2 = UserService.getCono();
      base.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();

      // If the Record Type changes - reset the type data - keep the record type as is
      base.setResetRecordDefaults = function () {

         if (base.criteria.recordtype) {
            base.criteria.product = '';
            base.criteria.prodline = '';
            base.criteria.vendno = '0';
            base.criteria.prodcat = '';
            base.criteria.prodprctype = '';
            base.criteria.altprodgrp = '';
            base.criteria.cono2 = UserService.getCono();
            base.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();

            if (base.markupAddonTypeList.length) {
               base.criteria.recordtype = holdDefaultMarkupAddonType;
            }
         }
      };

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();

         base.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
         base.criteria.cono2 = UserService.getCono();

         if (base.markupAddonTypeList.length) {
             base.criteria.recordtype = holdDefaultMarkupAddonType;
             base.searchMarkupTypeChanged();
         }
      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('wtsa.master');
         }

         // Load the Colum Label
         base.loadMarkupAddonType(base.criteria.recordtype);

         holdSearchRecord = '';

         base.search();
      };
   };

   this.extendDetailController = function (self, base, wtsa, scope) {

       wtsa.$promise.then(function () {
           var leaveFieldObject = { wtsainitialize: base.wtsaInitialObject, pvType: self.wtsa.recordtype };

           if (!leaveFieldObject.pvType) {
               leaveFieldObject.pvType = '';
           }
           DataService.post('api/wt/aswtinquiry/wtsaleavefield', { data: leaveFieldObject, busy: true }, function (data) {

               if (data) {
                   base.wtsaInitialObject = data;
               }
           });
       });

       // Detail Level - Sub Title
       self.getSubTitle = function () {

           var subTitleText;
           if (self.wtsa) {
               subTitleText = MessageService.get('global.markup.type') + ': ';
               if (self.wtsa.recordtype) {
                   switch (self.wtsa.recordtype.toUpperCase()) {
                       case 'PR':                                                              //ignore jslint - correct indentation
                           subTitleText += MessageService.get('global.product');               //ignore jslint - correct indentation
                           break;                                                              //ignore jslint - correct indentation
                       case 'PL':                                                              //ignore jslint - correct indentation
                           subTitleText += MessageService.get('global.product.line');          //ignore jslint - correct indentation
                           break;                                                              //ignore jslint - correct indentation
                       case 'PC':                                                              //ignore jslint - correct indentation
                           subTitleText += MessageService.get('global.product.category');      //ignore jslint - correct indentation
                           break;                                                              //ignore jslint - correct indentation
                       case 'PT':                                                              //ignore jslint - correct indentation
                           subTitleText += MessageService.get('global.product.price.type');    //ignore jslint - correct indentation
                           break;                                                              //ignore jslint - correct indentation
                       case 'AG':                                                              //ignore jslint - correct indentation
                           subTitleText += MessageService.get('global.alternate.product.group'); //ignore jslint - correct indentation
                           break;                                                              //ignore jslint - correct indentation
                       default:                                                                //ignore jslint - correct indentation
                           subTitleText += MessageService.get('global.invalid');               //ignore jslint - correct indentation
                           break;                                                              //ignore jslint - correct indentation
                   }
               } else {
                   subTitleText += MessageService.get('global.default');
               }
           }
           return subTitleText;
       };
   };

   this.extendCreateController = function (self, base, wtsa, scope) {

       self.wtsa.recordtype = base.criteria.recordtype;
       self.wtsa.shipfmwhse = base.criteria.shipfmwhse;
       self.wtsa.shiptowhse = base.criteria.shiptowhse;
       self.wtsa.cono2 = base.criteria.cono2;
       self.wtsa.addontype = '$';
       self.wtsa.addonamt = 0;

       self.markupTypeChanged = function () {
           var leaveFieldObject = { wtsainitialize: base.wtsaInitialObject, pvType: self.wtsa.recordtype};

           if (!leaveFieldObject.pvType) {
               leaveFieldObject.pvType = '';
           }
           DataService.post('api/wt/aswtinquiry/wtsaleavefield', { data: leaveFieldObject, busy: true }, function (data) {

               if (data) {
                   base.wtsaInitialObject = data;
               }
           });
       };

       // Perform the initial vield change.
       self.markupTypeChanged();
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

       var recordType = stateParams.object.recordtype;

       // Display the Type of Restriction
       if (recordType) {
           switch (recordType.toUpperCase()) {
               case 'PR':                                                                         //ignore jslint - correct indentation
                   request.markupAddonTypeList = MessageService.get('global.product');            //ignore jslint - correct indentation
                   request.product = stateParams.object.columnvalue1;                             //ignore jslint - correct indentation
                   break;                                                                         //ignore jslint - correct indentation
               case 'PL':                                                                         //ignore jslint - correct indentation
                   request.markupAddonTypeList = MessageService.get('global.product.line');       //ignore jslint - correct indentation
                   request.prodline = stateParams.object.columnvalue1;                            //ignore jslint - correct indentation
                   request.vendno = parseFloat(stateParams.object.columnvalue2);                  //ignore jslint - correct indentation
                   break;                                                                         //ignore jslint - correct indentation
               case 'PC':                                                                         //ignore jslint - correct indentation
                   request.markupAddonTypeList = MessageService.get('global.product.category');   //ignore jslint - correct indentation
                   request.prodcat = stateParams.object.columnvalue1;                             //ignore jslint - correct indentation
                   break;                                                                         //ignore jslint - correct indentation
               case 'PT':                                                                         //ignore jslint - correct indentation
                   request.markupAddonTypeList = MessageService.get('global.product.price.type'); //ignore jslint - correct indentation
                   request.prodprctype = stateParams.object.columnvalue1;                         //ignore jslint - correct indentation
                   break;                                                                         //ignore jslint - correct indentation
               case 'AG':                                                                         //ignore jslint - correct indentation
                   request.markupAddonTypeList = MessageService.get('global.alternate.product.group'); //ignore jslint - correct indentation
                   request.altprodgrp = stateParams.object.columnvalue1;                          //ignore jslint - correct indentation
                   break;                                                                         //ignore jslint - correct indentation
               default:                                                                           //ignore jslint - correct indentation
                   request.markupAddonTypeList = MessageService.get('global.invalid');            //ignore jslint - correct indentation
                   break;                                                                         //ignore jslint - correct indentation
           }
       } else {
           request.markupAddonTypeList = MessageService.get('global.default');                    //ignore jslint - correct indentation
       }

       // On Screen Fields that can change
       request.recordType = recordType;
       request.updatetype = 'Copy';
       request.shipfmwhse = stateParams.object.shipfmwhse;
       request.shiptowhse = stateParams.object.shiptowhse;
       request.cono2 = stateParams.object.cono2;
       request.product = stateParams.object.product;
       request.prodline = stateParams.object.prodline;
       request.prodcat = stateParams.object.prodcat;
       request.prodprctype = stateParams.object.prodprctype;
       request.altprodgrp = stateParams.object.altprodgrp;
       request.addontype = stateParams.object.addontype;
       request.addonamt = stateParams.object.addonamt;
       request.rowid = stateParams.object.wtsarowid;
       request.user1 = stateParams.object.user1;
       request.user2 = stateParams.object.user2;
       request.user3 = stateParams.object.user3;
       request.user4 = stateParams.object.user4;
       request.user5 = stateParams.object.user5;
       request.user6 = stateParams.object.user6;
       request.user7 = stateParams.object.user7;
       request.user8 = stateParams.object.user8;
       request.user9 = stateParams.object.user9;

       // Detail Level - Sub Title
       self.getSubTitle = function () {

           var subTitleText;

           if (request.startdt) {
               subTitleText = Utils.formatDate(request.startdt);
           }

           if (request.whse) {
               subTitleText += ' | ' + request.whse;
           }

           if (request.recordtype) {

               switch (request.recordtype.toUpperCase()) {
                   case 'PR':                                               //ignore jslint - correct indentation
                       subTitleText += ' | ' + request.product;              //ignore jslint - correct indentation
                       break;                                                //ignore jslint - correct indentation
                   case 'PL':                                               //ignore jslint - correct indentation
                       subTitleText += ' | ' + request.prodline;             //ignore jslint - correct indentation
                       if (request.vendno) {                                 //ignore jslint - correct indentation
                           subTitleText += ' | ' + request.vendno;            //ignore jslint - correct indentation
                       }                                                     //ignore jslint - correct indentation
                       break;                                                //ignore jslint - correct indentation
                   case 'PC':                                               //ignore jslint - correct indentation
                       subTitleText += ' | ' + request.prodcat;              //ignore jslint - correct indentation
                       break;                                                //ignore jslint - correct indentation
                   case 'PT':                                               //ignore jslint - correct indentation
                       subTitleText += ' | ' + request.prodprctype;          //ignore jslint - correct indentation
                       break;                                                //ignore jslint - correct indentation
                   case 'BC':                                               //ignore jslint - correct indentation
                       subTitleText += ' | ' + request.brandcd;              //ignore jslint - correct indentation
                       break;                                                //ignore jslint - correct indentation
                   default:                                                          //ignore jslint - correct indentation
                       subTitleText += ' | ' + MessageService.get('global.invalid');  //ignore jslint - correct indentation
                       break;                                                         //ignore jslint - correct indentation
               }
           } else {

           }
           return subTitleText;
       };
   };

   this.extendMasterController = function (self, base, scope) {

      self.markupAddonTypeList = [];
      var holdDefaultMarkupAddonArray;

      self.vendorInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // APIV HyperLink - vendor #
         if (currentRow && parseFloat(currentRow.columnvalue2) > 0) {
            $state.go('apiv.detail', { pk: parseFloat(currentRow.columnvalue2)});
         }
      };
   };
});