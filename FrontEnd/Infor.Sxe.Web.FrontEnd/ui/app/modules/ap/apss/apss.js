'use strict';

app.config(function (StateProvider, EmailSelectStateProvider) {
   StateProvider.addSetupStates({
      module: 'ap',
      menuFn: 'apss',
      dataPath: 'api/ap/apss',
      searchMethod: 'POST',
      searchPath: 'api/ap/apss/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'apshipfromlookupresults',
      resultsRowIdField: 'rowidApss',
      createStateView: 'ap/apss/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ap/apss/copy.json',
      copyMethod: 'POST',
      copyRequest: [],
      copyPath: 'api/ap/asapsetup/apshipfromcopy',
      detailSubTitle: [
         { label: null, value: 'shipfmno' },
         { label: null, value: 'name' }
      ],
      primaryKeyParams: ['vendno', 'shipfmno'],
      recentlyVisited: {
         title: { label: 'global.ship.from', value: 'shipfmno' },
         description: { label: null, value: 'name' }
      }
   });

   EmailSelectStateProvider.addStates('ap', 'apss', 'apss.detail');

});

app.service('ApssService', function ($state, $translate, DataService, GridService, MessageService, MruService, ConfigService, SecurityService) {

   this.extendBaseController = function (self) {
      self.MESSAGE_MESSAGETYPE_ERROR = 'e';
      self.MESSAGE_MESSAGETYPE_WARNING = 'w';
      self.ERRORTEXT_OPEN_PO_EXISTS = 'OpenPoExists';

      self.criteria.includeallshipfroms = false;
      self.criteria.activeOnly = true;
   };

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordcountlimit: ConfigService.getDefaultRecordLimit(),
         includeallshipfroms: false,
         activeOnly: true
      };

      // When a known customer is selected from the lookup, redirect to detail screen since we have the desired customer
      self.activeOnlyChanged = function () {
         self.advCriteria.includeallshipfroms = !self.advCriteria.activeOnly;
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'phoneno', label: MessageService.get('global.phone.number.label') },
         { value: 'city', label: MessageService.get('global.city') },
         { value: 'state', label: MessageService.get('global.state') },
         { value: 'zipcd', label: MessageService.get('global.zip.code') },
         { value: 'firstnm', label: MessageService.get('cam.first.name') },
         { value: 'lastnm', label: MessageService.get('cam.last.name') },
         { value: 'activeOnly', label: MessageService.get('global.active.only') },
         { value: 'recordcountlimit', label: $translate.instant('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['phoneno', 'city'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ap/apss/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.apshipfromlookupresults;
            }
         });
      };

      self.customEdit = function () {

         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         if (self.selectedRecord) {
            var crit = {
               tablename: 'apss',
               vendno: self.selectedRecord.vendno,
               shipfmno: self.selectedRecord.shipfmno
            };
            DataService.post('/web/api/shared/checkrestricteditaccess', { data: crit, busy: true }, function (data) {
               if (data) {
                  if (data.success) {
                     $state.go('apss.detail.edit', { id: self.selectedRecord.rowidApss, object: self.selectedRecord });
                  }
                  else {
                     MessageService.error('global.error', 'global.security.violation.restricted.editing');
                  }
               }
            });
         }
      };

      self.performDelete = function () {
         var rowIds = GridService.getSelectedRowIds(base.grid, 'rowidApss');
         if (rowIds.length) {
            DataService.delete('api/ap/apss/deletelistbyrowids', { data: rowIds, busy: true }, function (data) {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.search();
            });
         }
      };

      self.customDelete = function () {
         var isOpenPOsExist = false;
         var selectedRecords = GridService.getSelectedRecords(base.grid);

         var requestCriteria = [];
         selectedRecords.forEach(function (row) {
            var criteria = {
               vendno: row.vendno,
               shipfmno: row.shipfmno
            };
            requestCriteria.push(criteria);
         });
         var isError = false;

         DataService.post('api/ap/asapsetup/apshipfromvalidatedelete', { data: requestCriteria, busy: true }, function (data) {
            if (data) {
               //First, walk through the Errors and pull out specific Warning we want to trap.
               data.forEach(function (message) {
                  if (message.messagetype.toLowerCase() === base.MESSAGE_MESSAGETYPE_ERROR) {
                     isError = true;
                  }

                  if (message.messagetype.toLowerCase() === base.MESSAGE_MESSAGETYPE_WARNING) {
                     if (message.messagetxt === base.ERRORTEXT_OPEN_PO_EXISTS) {
                        isOpenPOsExist = true;
                     }
                  }
               });

               //If we had errors, then we should present them.
               if (isError) {
                  MessageService.processMessagingOnlyReportErrors(data.messaging);
               } else {
                  if (isOpenPOsExist) {
                     var msg = selectedRecords && selectedRecords.length > 1 ? 'message.a.selected.ship.from.has.open.purchase.orders' : 'message.selected.ship.from.has.open.purchase.orders';
                     MessageService.yesNo('global.delete.confirmation', msg,
                        // Yes processing
                        function () {
                           self.performDelete();
                        });
                  } else {
                     MessageService.yesNo('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete',
                        // Yes processing
                        function () {
                           self.performDelete();
                        });
                  }
               }
            }
         });
      };
   };

   this.extendSearchController = function (self, base) {

      // When a known customer is selected from the lookup, redirect to detail screen since we have the desired customer
      self.activeOnlyChanged = function () {
         base.criteria.includeallshipfroms = !base.criteria.activeOnly;
      };
   };

   this.extendCreateController = function (self, base, apss) {

      //set default true values
      apss.statustype = true;
      apss.allowpofl = true;

      self.vendNoChanged = function () {
         var apsvparams = {
            vendno: apss.vendno
         };
         DataService.get('api/ap/apsv/getbypk', { params: apsvparams, busy: true }, function (apsv) {
            if (apsv) {
               apss.name = apsv.name;

               //User Hook (do not rename)
               if (self.vendNoChangedContinue) {
                  self.vendNoChangedContinue(apsv);
               }
            }
         });
      };
   };

   this.extendDetailController = function (self, base, apss) {
      self.apss.epoto = false;
      self.apss.equoteto = false;
      self.firstAPSSEditCheck = true;
      self.editButtonVisible = true;

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('apss', 'General') < 3;
      self.isEdiTabReadonly = SecurityService.getSubSecurityLevel('apss', 'EDI') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('apss', 'Custom') < 3;
      self.isRouteTabReadonly = SecurityService.getSubSecurityLevel('apss', 'Route') < 3;      self.editButtonVisibility = function () {
         if (self.apss) {
            if (self.apss.vendno) {
               // Only execute this SI call once, for the detail view access for the APSS record.
               if (self.firstAPSSEditCheck) {
                  self.firstAPSSEditCheck = false;
                  var crit = {
                     tablename: 'apss',
                     vendno: self.apss.vendno,
                     shipfmno: self.apss.shipfmno
                  };
                  DataService.post('/web/api/shared/checkrestricteditaccess', { data: crit, busy: true }, function (data) {
                     if (data) {
                        if (!data.success) {
                           self.editButtonVisible = false;
                        }
                     }
                  });
               }
            }
         }
         return self.editButtonVisible;
      };

      self.ediPurchaseOrdersSendByDocument = function () {
         var label = MessageService.get('global.purchase.orders');
         if (self.apss.epotype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: 0,
               shipto: 0,
               sendtocustomer: false,
               vendno: self.apss.vendno,
               shipfmno: self.apss.shipfmno,
               sendtovendor: self.apss.epoto
            };

            $state.go('apss.detail.emailSelect', {
               subTitle: self.subTitle,
               sendType: 'PURCHASE ORDERS',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      self.ediQuotesSendByDocument = function () {
         var label = MessageService.get('global.quotes');
         if (self.apss.equotetype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: 0,
               shipto: 0,
               sendtocustomer: false,
               vendno: self.apss.vendno,
               shipfmno: self.apss.shipfmno,
               sendtovendor: self.apss.equoteto
            };

            $state.go('apss.detail.emailSelect', {
               subTitle: self.subTitle,
               sendType: 'QUOTES',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      self.getGeoCodeLookupCriteria = function () {
         return {
            tablename: 'apss',
            vendno: apss.vendno,
            shipfmno: apss.shipfmno,
            streetaddr: apss.addr1,
            city: apss.city,
            state: apss.state,
            zipcd: apss.zipcd,
            country: apss.countrycd,
            geocd: apss.geocd,
            outofcityfl: apss.outofcityfl
         };
      };

      self.changeStatus = function () {
         if (!self.apss.statustype) {
            var requestCriteria = {
               ttblapssvalidatestatuscriteria: {
                  vendno: self.apss.vendno,
                  shipfmno: self.apss.shipfmno,
                  statustype: self.apss.statustype
               }
            };

            //WebHandler call
            DataService.post('/web/api/ap/APSSValidateStatusType', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  if (data.ttblapssvalidatestatusresult && data.ttblapssvalidatestatusresult.length > 0) {
                     var isvalid = data.ttblapssvalidatestatusresult[0].isvalid;
                     if (!isvalid) {
                        MessageService.error('global.error', 'message.active.balances.or.transactions.exist');
                        self.apss.statustype = true;
                     }
                  }
               }
            });
         }
      };

      self.customSubmitContinue = function () {
         // The OEDC will only exist if it's tab has been activated
         if (self.oedc) {
            // Handle create (POST) and update (PUT)
            var method = self.isOedcRecordNew ? 'POST' : 'PUT';

            // When saving OEDC, only save the APSS after OEDC save succeeds
            DataService.send('api/oe/oedc', { method: method, data: self.oedc, busy: true }, function (oedc) {
               // Catch created oedc record (which is no longer new) since save of apss may fail
               self.oedc = oedc;
               self.isOedcRecordNew = false;

               // Proceed with standard save for the APSS
               self.submit();
            });
         } else {
            // Proceed with standard save for the APSS
            self.submit();
         }
      };

      self.customSubmit = function () {

         // Perform UI validation
         var isValid = self.validateForm();

         if (isValid) {
            DataService.get('api/ap/apss/getbyrowid/' + apss.rowID, function (data) {
               if (data) {
                  apss.notesfl = data.notesfl;
                  self.customSubmitContinue();
               }
            });
         }
      };

      self.performDelete = function () {
         DataService.delete('api/api/ap/apss', { data: apss, busy: true }, function (data) {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            base.search();
         });
      };

      self.customDelete = function () {
         var isOpenPOsExist = false;

         if (apss) {
            var requestCriteria = [];
            var criteria = {
               vendno: apss.vendno,
               shipfmno: apss.shipfmno
            };
            requestCriteria.push(criteria);
            var isError = false;

            DataService.post('api/ap/asapsetup/apshipfromvalidatedelete', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  //First, walk through the Errors and pull out specific Warning we want to trap.
                  data.forEach(function (message) {
                     if (message.messagetype.toLowerCase() === base.MESSAGE_MESSAGETYPE_ERROR) {
                        isError = true;
                     }

                     if (message.messagetype.toLowerCase() === base.MESSAGE_MESSAGETYPE_WARNING) {
                        if (message.messagetxt === base.ERRORTEXT_OPEN_PO_EXISTS) {
                           isOpenPOsExist = true;
                        }
                     }
                  });

                  //If we had errors, then we should present them.
                  if (isError) {
                     MessageService.processMessagingOnlyReportErrors(data.messaging);
                  } else {
                     if (isOpenPOsExist) {
                        MessageService.yesNo('global.delete.confirmation', 'message.selected.ship.from.has.open.purchase.orders',
                           // Yes processing
                           function () {
                              self.performDelete();
                           });
                     } else {
                        MessageService.yesNo('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete',
                           // Yes processing
                           function () {
                              self.performDelete();
                           });
                     }
                  }
               }
            });
         }
      };

      // Perform any custom UI validation
      self.validateForm = function () {
         var isValid = true;

         // Validate the address control (address control will only exist if its tab has been activated)
         if (self.addressControl) {
            isValid = self.addressControl.validate();
         }

         return isValid;
      };

      // When the full APSS object has been resolved, other business logic
      apss.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (apss.expednm === 'GDPR Restricted Data' || apss.expednm === 'XXXXXXXXXXXXXXXXXXXX' ||
            apss.slsnm === 'GDPR Restricted Data' || apss.slsnm === 'XXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }

         MruService.addToList('ShipFrom', apss.rowpointer, apss.shipfmno + ' - ' + apss.name, apss.shipfmno, apss.vendno);
      });
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      var apssToCopy = stateParams.object;

      // Create apss copy criteria object
      self.copyCriteria = {
         fromshipfmno: apssToCopy.shipfmno,
         fromvendno: apssToCopy.vendno,
         toshipfmno: apssToCopy.shipfmno,
         tovendno: apssToCopy.vendno,
         name: apssToCopy.name
      };

      // Push criteria object onto copy request (since this api call uses an array as request criteria)
      request.push(self.copyCriteria);
   };
});

app.controller('ApssDetailRouteCtrl', function ($scope, DataService, UserService) {
   var dtl = $scope.dtl;

   // After making sure the full apss object has been resolved, fetch the corresponding oedc record
   dtl.apss.$promise.then(function () {
      var params = {
         key1: dtl.apss.vendno,
         key2: dtl.apss.shipfmno
      };

      DataService.get('api/oe/oedc/getbyquery/F', { params: params, busy: true }, function (oedc) {
         if (oedc) {
            dtl.oedc = oedc;
         } else {
            // If oedc doesn't exist, make a new one
            dtl.oedc = {
               cono: UserService.getCono(),
               key1: dtl.apss.vendno,
               key2: dtl.apss.shipfmno,
               typecd: 'F'
            };

            // Set flag for submit to check
            dtl.isOedcRecordNew = true;
         }
      });
   });
});