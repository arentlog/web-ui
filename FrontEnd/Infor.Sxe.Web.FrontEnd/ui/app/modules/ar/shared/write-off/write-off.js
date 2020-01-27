'use strict';

app.controller('ArWriteOffCtrl', function ($scope, $state, $stateParams, DataService, GridService, SecurityService, AuthService, MessageService, Utils) {
   // Private Variables
   var self = this;
   var base = $scope.base;
   var AUTH_FUNCTIONNAME_ARECE = 'arece';
   var AUTH_SECTIONNAME_WRITEOFF = 'writeoff';
   var AUTH_MODENAME_MANUALPOSTFLAG = 'manpostfl';
   var AUTH_MODENAME_ACCOUNT = 'account';
   var authInfo = {};

   var globalData = $stateParams.requestObject.globaldata;
   var mainData = $stateParams.requestObject.maindata;
   var invoicesListSelected = $stateParams.requestObject.invoiceslistselected;
   var invoicesData = $stateParams.requestObject.invoicesdata;
   var authPointManPostFl = $stateParams.requestObject.authpointmanpostfl;
   var authPointGlCheckSecurity = $stateParams.requestObject.authpointglchecksecurity;
   var writeoffProofAdjustment = $stateParams.requestObject.writeoffproofadjustment;
   var woDataList = $stateParams.requestObject.arecewodata;
   var callbackFn = Utils.getNestedValue($scope, $stateParams.callback);

   // Bound to view
   self.isCreditMode = $stateParams.requestObject.iscreditmode;
   self.woDisplay = $stateParams.requestObject.arecewodisplay;
   self.writeOffsList = $stateParams.requestObject.areceworeport;
   if ($stateParams.requestObject.arelecheckdtl) {
      self.arelecheckdtl = $stateParams.requestObject.arelecheckdtl;
   }

   self.isEditable = function() {
      return $stateParams.requestObject.isInquiry ? false : true;
   }

   // This is needed so we can hide other views appropriately
   self.isWriteOff = function () {
      return $state.current.name.endsWith('.writeOff');
   };

   /**
    * Clicking the Add button, this will add the new data to the collection shown in the Grid.
    * There are 2 chained Authorization checks that need to occur.
    */
   self.addWriteOff = function () {
      base.lastwoacct = self.woDisplay.account;

      var authCriteria = {
         option1Account: self.woDisplay.account
      };

      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: authCriteria, busy: true }, function (data) {
         if (data) {
            authInfo = data;

            if (!authPointManPostFl && !data.manpostfl) {
               // Create Authpoint
               AuthService.createAuthPoint(AUTH_FUNCTIONNAME_ARECE, AUTH_SECTIONNAME_WRITEOFF, AUTH_MODENAME_MANUALPOSTFLAG, '', '', null,
                  function () {
                     authPointManPostFl = true;
                     authPoint2();
                  }, null);
            } else {
               authPoint2();
            }
         } else {
            authPoint2();
         }
      });
   };

   /**
    * Pressing Cancel button, this makes a backend call to back out the changes.
    */
   self.cancel = function () {

      MessageService.yesNo('global.question', 'question.cancelling.from.writeoffs.without.fully',
         // Yes processing
         function () {
            if (self.isCreditMode) {
               DataService.post('api/ar/asarentry/arececreditscancelwriteoff', { data: invoicesListSelected, busy: true }, function (data) {
                  if (data) {
                     Utils.replaceArray(invoicesListSelected, data);

                     // Invoke the callback from parent component
                     callbackFn(false, woDataList, self.writeOffsList, self.woDisplay, mainData, invoicesListSelected);

                     $state.go('^');
                  }
               });
            } else {
               var criteria = {
                  arecewodata: woDataList,
                  areceworeport: self.writeOffsList
               };

               DataService.post('api/ar/asarentry/arecewocancel', { data: criteria, busy: true }, function (data) {
                  if (data) {
                     Utils.replaceArray(woDataList, data.arecewodata);
                     Utils.replaceArray(self.writeOffsList, data.areceworeport);

                     // Invoke the callback from parent component
                     callbackFn(false, woDataList, self.writeOffsList, self.woDisplay, mainData, invoicesListSelected, self.arelecheckdtl);

                     $state.go('^');
                  }
               });
            }
         }
      );
   };

   self.deleteWriteOff = function () {
      var selectedItems = GridService.getSelectedRecords(self.grid);

      if (selectedItems && selectedItems.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            selectedItems.forEach(function (record) {
               //Remove from the grid
               var idx = self.writeOffsList.indexOf(record);
               if (idx >= 0) {
                  self.woDisplay.proof += record.amount;
                  self.writeOffsList.splice(idx, 1);
               }
            });
         });
      }
   };

   /**
    * Gets called when the 'Ok' button is pressed from the dialog. Depending if we are called
    * from the Invoices or Credits, there are different backend calls that are made.
    */
   self.done = function () {
      var doneCriteria;
      var isErrors = false;

      //The backend call that creates the default GL Account entry can create an invalid account when
      //there is bad data.  This protects for that situation.
      self.writeOffsList.forEach(function (row) {
         if (row.acctname === '**Invalid**') {
            isErrors = true;
         }
      });

      if (isErrors) {
         MessageService.error('global.error', 'message.a.valid.general.ledger.account.is.required');
         return;
      } else {
         if (self.isCreditMode) {
            doneCriteria = {
               areceglobaldata: globalData,
               arecemaindata: mainData,
               areceinvoicesdata: invoicesData,
               areceinvoiceslist: invoicesListSelected,
               areceworeport: self.writeOffsList,
               arecewodata: woDataList,
               pvProofadjustment: writeoffProofAdjustment
            };

            DataService.post('api/ar/asarentry/arececreditsokwriteoff', { data: doneCriteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(globalData, data.areceglobaldata);
                  Utils.replaceObject(mainData, data.arecemaindata);
                  Utils.replaceObject(invoicesData, data.areceinvoicesdata);
                  Utils.replaceArray(woDataList, data.arecewodata);
                  Utils.replaceArray(self.writeOffsList, data.areceworeport);
                  Utils.replaceArray(invoicesListSelected, data.areceinvoiceslist);


                  // Invoke the callback from parent component
                  callbackFn(true, woDataList, self.writeOffsList, self.woDisplay, mainData, invoicesListSelected);

                  $state.go('^');
               }
            });
         } else {

            if (!self.writeOffsList || self.writeOffsList.length === 0) {
               MessageService.error('global.error', 'message.a.valid.general.ledger.account.is.required');
            } else {
               doneCriteria = {
                  arecewodata: woDataList,
                  areceworeport: self.writeOffsList,
                  arecewodisplay: self.woDisplay
               };

               DataService.post('api/ar/asarentry/arecewook', { data: doneCriteria, busy: true }, function (data) {
                  if (data) {
                     Utils.replaceArray(woDataList, data.arecewodata);
                     Utils.replaceObject(self.woDisplay, data.arecewodisplay);
                     Utils.replaceArray(self.writeOffsList, data.areceworeport);

                     // Invoke the callback from parent component
                     callbackFn(true, woDataList, self.writeOffsList, self.woDisplay, mainData, invoicesListSelected, self.arelecheckdtl);

                     $state.go('^');
                  }
               });
            }
         }
      }
   };

   //NOTE: By design, the ability to modify the Account field is not offered due to the Auth Points.
   //The user is required to delete and add the row back if an Account needs to change.

   self.writeoffGridCellAmountChanged = function (sender, args) {
      var fieldName = args.column.field;
      self.selectedRecord = self.writeOffsList[args.row];

      if (fieldName && self.woDisplay) {
         var criteria = {
            arecewodata: woDataList,
            arecewodisplay: self.woDisplay,
            areceworeport: self.writeOffsList,
            pvSeqno: self.selectedRecord.seqno,
            pvField: fieldName,
            //Signifies that we are updating a row in the grid.
            pvNewfl: false
         };

         DataService.post('api/ar/asarentry/arecewofieldleave', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(woDataList, data.arecewodata);
               Utils.replaceObject(self.woDisplay, data.arecewodisplay);
               Utils.replaceArray(self.writeOffsList, data.areceworeport);
            }
         });
      }
   };

   /**
    * This gets called from the 'account', 'invno', and 'amount' fields on the
    * Invoice Writeoff screen, up in the Add section. The data resides in the woDisplay
    * object, the backend call uses that to add the new row.
    * @param {string} fieldName The name of the field being changed
    */
   self.onNewWriteoffFieldChanged = function (fieldName) {
      if (fieldName && self.woDisplay) {
         var criteria = {
            arecewodata: woDataList,
            arecewodisplay: self.woDisplay,
            areceworeport: self.writeOffsList,
            pvSeqno: '',
            pvField: fieldName,
            //Signifies that we are creating a new row from the banner (not updating from the grid).
            pvNewfl: true
         };

         DataService.post('api/ar/asarentry/arecewofieldleave', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(woDataList, data.arecewodata);
               Utils.replaceObject(self.woDisplay, data.arecewodisplay);
               Utils.replaceArray(self.writeOffsList, data.areceworeport);
            }
         });
      }
   };

   /**
    * Gets called from the Writeof Tax button.  This only processes selected rows.
    */
   self.writeOffTax = function () {
      var selectedItems = GridService.getSelectedRecords(self.grid);

      if (selectedItems.length !== 1) {
         MessageService.alert('message.select.one.row.to.writeoff.tax');
      } else {
         //Build a list of unselected rows
         var unselectedWriteOffsList = [];
         self.writeOffsList.forEach(function (record) {
            if (record !== selectedItems[0]) {
               unselectedWriteOffsList.push(record);
            }
         });

         var writeOffCriteria = {
            arecewodata: woDataList,
            areceworeport: selectedItems,
            arecewodisplay: self.woDisplay
         };

         DataService.post('api/ar/asarentry/arecewowriteofftax', { data: writeOffCriteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(woDataList, data.arecewodata);
               Utils.replaceObject(self.woDisplay, data.arecewodisplay);

               //Add returned rows to the unselected list (may return single or multiple records and may delete original record entirely)
               if (data.areceworeport) {
                  data.areceworeport.forEach(function (record) {
                     unselectedWriteOffsList.push(record);
                  });
                  Utils.replaceArray(self.writeOffsList, unselectedWriteOffsList);
               }

               //Need to open up the top fields to ready them for data entry again.
               continueAndOpenAddFields();
            }
         });
      }
   };

   /* Private Methods */

   // Authorization Methods
   function authPoint2() {
      //Once it passes once, don't pop it again.
      if (!authPointGlCheckSecurity && authInfo && !authInfo.userhassecurity) {
         // Create Authpoint
         AuthService.createAuthPoint(AUTH_FUNCTIONNAME_ARECE, AUTH_SECTIONNAME_WRITEOFF, AUTH_MODENAME_ACCOUNT, '', '', null,
            function () {
               authPointGlCheckSecurity = true;
               onWriteoffsAddContinue();
            }, null);
      } else {
         onWriteoffsAddContinue();
      }
   }

   /**
    * This makes a call to the backend to open up the Add fields at the top.  It needs to happen whenever we need to reset
    * the screen.
    */
   function continueAndOpenAddFields() {
      var addWoCrit = {
         arecewodata: woDataList,
         areceworeport: self.writeOffsList,
         arecewodisplay: self.woDisplay
      };

      // Complete WriteOff Add
      DataService.post('api/ar/asarentry/arecewoadd', { data: addWoCrit, busy: true }, function (data) {
         if (data) {
            // Default amount to Proof
            data.arecewodisplay.amount = data.arecewodisplay.proof;

            Utils.replaceArray(woDataList, data.arecewodata);
            Utils.replaceObject(self.woDisplay, data.arecewodisplay);
            Utils.replaceArray(self.writeOffsList, data.areceworeport);
         }
      });
   }

   function onWriteoffsAddContinue() {
      var addWoCrit = {
         arecewodata: woDataList,
         areceworeport: self.writeOffsList,
         arecewodisplay: self.woDisplay
      };

      // Complete WriteOff Add
      DataService.post('api/ar/asarentry/arecewoadd', { data: addWoCrit, busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(woDataList, data.arecewodata);
            Utils.replaceObject(self.woDisplay, data.arecewodisplay);
            Utils.replaceArray(self.writeOffsList, data.areceworeport);

            continueAndOpenAddFields();
         }
      });
   }
});