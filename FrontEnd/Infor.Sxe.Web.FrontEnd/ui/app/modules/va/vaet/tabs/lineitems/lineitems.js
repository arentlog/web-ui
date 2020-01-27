// JavaScript source codeself.grid
app.controller('VaetDetailLinesCtrl', function ($scope, $state, $stateParams, AuthService, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   var wmbinassignCriteria = {};

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // ICIA HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: currentRow.whse }, { reload: 'icia.detail' });
      }

   };

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // ICIP HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }

   };

   self.tiedorderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // Tied Order HyperLink
      if (currentRow && currentRow.orderaltno) {
         if (currentRow.orderalttype.toLowerCase() === 'o') {
            $state.go('oeio.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 'p') {
            $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 't') {
            $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 'f') {
            $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: 0 });
         } else if (currentRow.orderalttype.toLowerCase() === 'w') {
            $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: 0 });
         }
      }

   };

   self.backtieInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      // Tied Order HyperLink
      if (currentRow && currentRow.powtorderaltno) {
         if (currentRow.powtorderalttype.toLowerCase() === 'o') {
            $state.go('oeio.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 'p') {
            $state.go('poip.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 't') {
            $state.go('wtit.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 'f') {
            $state.go('vaif.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         } else if (currentRow.powtorderalttype.toLowerCase() === 'w') {
            $state.go('kpiw.detail', { pk: currentRow.powtorderaltno, pk2: 0 });
         }
      }

   };

   // When a row is selected, get the data for the line
   self.setCurrentLine = function () {

      // Get the data from the line and reset line edit authorization
      base.lineSelectedRecord = GridService.getSelectedRecord(base.lineGrid);
      base.lineEditAuth = false;

      if (base.lineSelectedRecord && !base.lineSelectedRecord.completefl) {

         // Get the data needed for line updating
         var updateCriteria = {
            pvVano: base.lineSelectedRecord.vano,
            pvVasuf: base.lineSelectedRecord.vasuf,
            pvSeqno: base.lineSelectedRecord.seqno,
            pvLineno: base.lineSelectedRecord.lineno,
            pvFunctionnm: 'vaet'
         };
         DataService.post('api/va/asvaline/valineinitializeupdate', { data: updateCriteria, busy: true }, function (data) {
            if (data) {

               // Update the data based upon the changed data
               if (!MessageService.processMessaging(data.messaging)) {
                  base.lineUpdateRecord = data.valineaddchg;
               }

            }

         });
      }

   };

   // When the user wants to add a new line, confirm that it can be done
   self.lineAdd = function () {

      // Check Authorization Point security for adding a new line to a VA section
      AuthService.createAuthPoint('vaet', 'line', '', 'a', '', null, self.lineaddAuthPointPassed, self.lineaddAuthPointFailed);

   };

   self.lineaddAuthPointPassed = function () {
      base.lineAddMode = true;
      base.lineUpdateRecord = [];
      $state.go('vaet.detail.lineaddedit');
   };

   self.lineaddAuthPointFailed = function () {
      // If no authorization, leave the user in the lines
   };

   // When the user wants to edit an existing line, confirm that it can be done
   self.lineEdit = function () {

      // Check Authorization Point security for changing an existing line on a VA section
      // If editing of this line was previously authorized, do not check authorization again
      if (base.lineEditAuth) {
         self.linechgAuthPointPassed();
      } else {
         AuthService.createAuthPoint('vaet', 'line', '', 'c', '', null, self.linechgAuthPointPassed, self.linechgAuthPointFailed);
      }

   };

   self.linechgAuthPointPassed = function () {
      base.lineAddMode = false;
      base.lineEditAuth = true;

      $state.go('vaet.detail.lineaddedit');
   };

   self.linechgAuthPointFailed = function () {
      // If no authorization, leave the user in the lines
   };

   // When the user wants to delete an existing line, confirm that it can be done
   self.lineDelete = function () {

      // Check Authorization Point security for deleting an existing line from a VA section
      AuthService.createAuthPoint('vaet', 'line', '', 'd', '', null, self.linedelAuthPointPassed, self.linedelAuthPointFailed);

   };

   self.linedelAuthPointPassed = function () {
      if (base.lineSelectedRecord) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
            function () {
               // Yes processing
               self.lineFinalDelete();
            });
      }
   };

   self.linedelAuthPointFailed = function () {
      // If no authorization, leave the user in the lines
   };

   self.lineFinalDelete = function () {

      // Delete the line then redisplay the line items grid
      DataService.post('api/va/asvaline/valinedelete', { data: base.lineSelectedRecord, busy: true }, function (data) {

         if (!MessageService.processMessaging(data)) {
            // If line was deleted, need to indicate the header should be redisplayed if the Header tab is accessed again
            dtl.headerUpdateNeeded = true;
            base.retrieveLineItemsList();
         }

      });
   };

   // When the user wants to access the extended information for an existing line, confirm that it can be done
   self.lineExtend = function () {

      // Check Authorization Point security for changing an existing line on a VA section
      // If editing of this line was previously authorized, do not check authorization again
      if (base.lineEditAuth) {
         self.lineextAuthPointPassed();
      } else {
         AuthService.createAuthPoint('vaet', 'line', '', 'c', '', null, self.lineextAuthPointPassed, self.lineextAuthPointFailed);
      }

   };

   self.lineextAuthPointPassed = function () {
      base.lineAddMode = false;
      base.lineEditAuth = true;

      $state.go('vaet.detail.lineextend');
   };

   self.lineextAuthPointFailed = function () {
      // If no authorization, leave the user in the lines
   };

   // When the user wants to access the labor product information, execute code based on the section type
   self.lineLabor = function () {

      // Check Authorization Point security for changing an existing line on a VA section
      // If editing of this line was previously authorized, do not check authorization again
      if (base.lineEditAuth) {
         self.linelabAuthPointPassed();
      } else {
         AuthService.createAuthPoint('vaet', 'line', '', 'c', '', null, self.linelabAuthPointPassed, self.linelabAuthPointFailed);
      }

   };

   self.linelabAuthPointPassed = function () {
      base.lineAddMode = false;
      base.lineEditAuth = true;

      if (base.lineSelectedRecord.sctntype.toLowerCase() === 'ex') {
         $state.go('vaet.detail.linelaborex');
      } else {
         $state.go('vaet.detail.linelabor');
      }
   };

   self.linelabAuthPointFailed = function () {
      // If no authorization, leave the user in the lines
   };

   self.lineComments = function () {
      $state.go('vaet.detail.linecomments');
   };

   //When the user wants to access serial or lot data, execute the code based on the type
   self.lineSerialLot = function () {
      if (base.lineSelectedRecord.serlottype.toLowerCase() === 's') {
         $state.go('vaet.detail.lineSerial');
      } else {
         $state.go('vaet.detail.lineLot');
      }
   };

   self.lineHistory = function () {
      $state.go('vaet.detail.linehistory');
   };

   self.lineSourcing = function () {
      base.lineSelectedRecords = [];
      base.lineSourcingRecord = null;
      base.lineSelectedRecords = GridService.getSelectedRecords(base.lineGrid);

      if (base.lineSelectedRecords.length > 0) {
         DataService.post('api/va/asvaline/valinetieretrieve', { data: base.lineSelectedRecords, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.lineSourcingRecord = data.valinelinetie;
                  $state.go('vaet.detail.linesourcing');
               }
            }
         });
      }
   };

   self.lineMarkAsWip = function () {

      // Get all the lines that are selected
      var records = GridService.getSelectedRecords(base.lineGrid);

      if (records && records.length) {

         // Clear the WIP list
         base.lineWipList = '';

         // Roll through the selected records
         records.forEach(function (record) {

            // Copy in the data selected and toggle the WIP set flag for display on the line
            record.wipsetfl = !record.wipsetfl;

            // Rebuild the WIP list with the selected lines
            if (record.wipsetfl) {
               if (base.lineWipList) {
                  base.lineWipList += ',';
               }
               base.lineWipList += record.lineno;
            }

            // Redisplay the selected line
            var indx = base.lineList.indexOf(record);
            base.lineGrid.updateRow(indx);

         });

      }
   };

   self.lineWhseManager = function () {

      wmbinassignCriteria = {
         altwhse: '',
         currproc: 'vaet',
         jrnlno: 0,
         kitfl: false,
         lineno: base.lineUpdateRecord.lineno,
         ourproc: 'vaet',
         ordertype: 'f',
         orderno: base.lineUpdateRecord.vano,
         ordersuf: base.lineUpdateRecord.vasuf,
         potype: '',
         prod: base.lineUpdateRecord.shipprod,
         seqno: base.lineUpdateRecord.seqno,
         skipnonkitlogic: false,
         stkqtyship: base.lineUpdateRecord.stkqtyship,
         stkqtyrcv: 0,
         unit: base.lineUpdateRecord.unit,
         vamodule: 'va',
         wmadjtype: 'sell',
         wmqtyrcv: 0,
         whse: base.lineUpdateRecord.whse
      };

      if (wmbinassignCriteria) {
         if (base.lineUpdateRecord.sctntype.toLowerCase() === 'ii') {
            wmbinassignCriteria.returnfl = true;
         }
         else { wmbinassignCriteria.returnfl = false; }
      }

      $state.go('.bin-allocation', {
         criteria: wmbinassignCriteria,
         binallocationRowId: null,
         binAllocationDisabled: false,
         submittedCallback: 'line.binAllocationSavedCallback',
         actionsCallback: 'line.binAllocationActionsCallback'
      });
   };

   // Warehouse Manager Callbacks
   self.binAllocationSavedCallback = function (wmbinAssignment) {
      base.lineUpdateRecord.wmqtyship = wmbinAssignment.wmqtyship;
      MessageService.info('global.information', 'message.warehouse.manager.data.accepted');
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmbinAssignment) {
      base.lineUpdateRecord.wmqtyship = wmbinAssignment;
   };
});

app.controller('VaetLineAddEditCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   var newVano = 0;
   var newVasuf = 0;
   var newSeqno = 0;
   var newLineno = 0;

   var addMode = base.isLineInAddMode();

   if (addMode) {
      self.detailTitle = MessageService.get('global.add.new.line');
      self.detailSubTitle = base.sectionSubTitle();

      var initCriteria = {
         pvVano: base.sectionSelectedRecord.vano,
         pvVasuf: base.sectionSelectedRecord.vasuf,
         pvSeqno: base.sectionSelectedRecord.seqno,
         pvFunctionnm: 'vaet'
      };
      DataService.post('api/va/asvaline/valineinitializeadd', { data: initCriteria, busy: true }, function (data) {

         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               base.lineUpdateRecord = data.valineaddchg;
            }

            //User Hook (do not rename)
            if (self.valineInitializeAddContinue) {
               self.valineInitializeAddContinue(data);
            }
         }
      });
   } else {

      // Get the data needed for line updating
      var updateCriteria = {
         pvVano: base.lineSelectedRecord.vano,
         pvVasuf: base.lineSelectedRecord.vasuf,
         pvSeqno: base.lineSelectedRecord.seqno,
         pvLineno: base.lineSelectedRecord.lineno,
         pvFunctionnm: 'vaet'
      };
      DataService.post('api/va/asvaline/valineinitializeupdate', { data: updateCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               base.lineUpdateRecord = data.valineaddchg;
            }

            //User Hook (do not rename)
            if (self.valineInitializeUpdateContinue) {
               self.valineInitializeUpdateContinue(data);
            }
         }

      });
      self.detailTitle = MessageService.get('global.update.line');
      self.detailSubTitle = base.lineSubTitle(base.lineSelectedRecord.lineno);
   }

   // In GUI, there is a check to see if the ARP warehouse is a fabrication warehouse.  If it is, the
   // ARP warehouse is overwritten and the updated value is used in the product lookup.  However, in H5,
   // we cannot pass in warehouse as a parameter to the product lookup since it is an IES lookup.
   // Leaving the code in place in case that changes.
   if (base.lineSelectedRecord) {
      DataService.get('api/va/asvasetup/vafabwhsearp/' + base.lineSelectedRecord.whse, function (data) {
         if (data) {
            self.arpWhse = data.cARPWhse;
            self.arpType = data.cARPType;
         }
      });
   } else {
      DataService.get('api/va/asvasetup/vafabwhsearp/' + base.vaet.whse, function (data) {
         if (data) {
            self.arpWhse = data.cARPWhse;
            self.arpType = data.cARPType;
         }
      });
   }


   self.processAcceptCatalogPopup = function (answer, valineaddchg) {
      switch (answer.toLowerCase()) {
         case 'y': //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflasked = valineaddchg.xrefcatflasked; //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflanswer = true; //ignore jslint - correct indentation

            self.fieldChange('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'n': //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflasked = valineaddchg.xrefcatflasked; //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflanswer = false; //ignore jslint - correct indentation

            self.fieldChange('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'c': //ignore jslint - correct indentation
            self.back(); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

   self.processCreateCatalogPopup = function (answer, valineaddchg) {
      switch (answer.toLowerCase()) {
         case 'y': //ignore jslint - correct indentation
            base.lineUpdateRecord.createcatflasked = valineaddchg.createcatflasked; //ignore jslint - correct indentation
            base.lineUpdateRecord.createcatflanswer = true; //ignore jslint - correct indentation

            self.fieldChange('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'n': //ignore jslint - correct indentation
            base.lineUpdateRecord.createcatflasked = valineaddchg.createcatflasked; //ignore jslint - correct indentation
            base.lineUpdateRecord.createcatflanswer = false; //ignore jslint - correct indentation

            self.fieldChange('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'c': //ignore jslint - correct indentation
            self.back(); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };


   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      var changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: chgField
      };

      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }
            if (data.valineaddchg.xrefcatflasked) {
               MessageService.yesNoCancel('global.confirmation.needed', 'question.product.found.in.catalog.accept.catalog.item', function () {
                  //yes callback
                  self.processAcceptCatalogPopup('y', data.valineaddchg);
               }, function () {
                  //no callback
                  self.processAcceptCatalogPopup('n', data.valineaddchg);
               }, function () {
                  //cancel callback
                  self.processAcceptCatalogPopup('c', data.valineaddchg);
               });
            }
            else if (data.valineaddchg.createcatflasked) {
               MessageService.yesNoCancel('global.confirmation.needed',
                  'question.create.catalog.product.in.inventory',
                  function() {
                     //yes callback
                     self.processCreateCatalogPopup('y', data.valineaddchg);
                  },
                  function() {
                     //no callback
                     self.processCreateCatalogPopup('n', data.valineaddchg);
                  },
                  function() {
                     //cancel callback
                     self.processCreateCatalogPopup('c', data.valineaddchg);
                  });
            } else {
               // Update the data based upon the changed data
               base.lineUpdateRecord = data.valineaddchg;
               // Go to Nonstock screen if nontock type is changed or user enters a nonstock product
               if (chgField === 'nonstockty' && base.lineUpdateRecord.nonstockty.toLowerCase() === 'n') {
                  $state.go('vaet.detail.lineaddedit.linenonstock');
               } else if (chgField === 'shipprod' && base.lineUpdateRecord.shipprod && base.lineUpdateRecord.nonstockty.toLowerCase() === 'n') {
                  $state.go('vaet.detail.lineaddedit.linenonstock');
               }
            }
         }
      });
   };

   self.newLaborLine = function () {

      var updateCriteria = {
         pvVano: newVano,
         pvVasuf: newVasuf,
         pvSeqno: newSeqno,
         pvLineno: newLineno,
         pvFunctionnm: 'vaet'
      };
      DataService.post('api/va/asvaline/valineinitializeupdate', { data: updateCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               base.lineUpdateRecord = data.valineaddchg;

               // Take the user to the labor screen appropriate to the current section type
               if (base.lineUpdateRecord.sctntype.toLowerCase() === 'ex') {
                  base.lineUpdateRecord.labortype = 'q';
                  base.lineUpdateRecord.laborunits = 1;
                  $state.go('vaet.detail.linelaborex');
               } else if (base.lineUpdateRecord.sctntype.toLowerCase() === 'it') {
                  base.lineUpdateRecord.timeactty = 'a';
                  $state.go('vaet.detail.linelabor');
               } else if (base.lineUpdateRecord.sctntype.toLowerCase() === 'is') {
                  base.lineUpdateRecord.timeactty = 'a';
                  $state.go('vaet.detail.linelabor');
               } else {
                  // If new labor line added, need to indicate the header should be redisplayed if the Header tab is accessed again
                  dtl.headerUpdateNeeded = true;
                  $state.go('^');
               }

            }

         }

      });

   };

   self.cancel = function () {
      if (addMode) {
         // If cancelling out of add mode, clear the data loaded during the initialization call
         base.lineUpdateRecord = {};
      }
      $state.go('^');
   };

   self.submit = function () {

      // Execute code based upon whether adding a new VA section or editing an existing VA section
      if (addMode) {

         var addCriteria = {
            valineaddchg: base.lineUpdateRecord,
            pvVano: base.lineUpdateRecord.vano,
            pvVasuf: base.lineUpdateRecord.vasuf,
            pvSeqno: base.lineUpdateRecord.seqno,
            pvFunctionnm: 'vaet'
         };
         DataService.post('api/va/asvaline/valineadd', { data: addCriteria, busy: true }, function (data) {

            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  //base.lineUpdateRecord = data.valineaddchg;
                  base.lineList = data.valinelistresults;

                  if (base.lineUpdateRecord.icspstatus.toLowerCase() === 'l') {
                     newVano = data.valineaddchg.vano;
                     newVasuf = data.valineaddchg.vasuf;
                     newSeqno = data.valineaddchg.seqno;
                     newLineno = data.valineaddchg.lineno;
                     self.newLaborLine();
                  } else {
                     // If new line added, need to indicate the header should be redisplayed if the Header tab is accessed again
                     dtl.headerUpdateNeeded = true;
                     MessageService.info('global.information', 'message.save.operation.completed.successfully');
                     $state.go('^');
                  }

               }

            }
         });
      } else {

         var chgCriteria = {
            valineaddchg: base.lineUpdateRecord,
            pvVano: base.lineUpdateRecord.vano,
            pvVasuf: base.lineUpdateRecord.vasuf,
            pvSeqno: base.lineUpdateRecord.seqno,
            pvFunctionnm: 'vaet'
         };
         DataService.post('api/va/asvaline/valineupdate', { data: chgCriteria, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  // If line has changed, need to indicate the header should be redisplayed if the Header tab is accessed again
                  dtl.headerUpdateNeeded = true;

                  var indx = base.lineList.indexOf(base.lineSelectedRecord);

                  base.lineUpdateRecord = data.valineaddchg;
                  Utils.replaceObject(base.lineList[indx], data.valinelistresults[0]);

                  $state.go('^');
                  base.lineGrid.updateRow(indx);
               }

            }

         });
      }
   };
});

app.controller('VaetLineNonstockCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.detailSubTitle = base.lineSubTitle(base.lineUpdateRecord.lineno);

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      var vanonstockvalidate = {
         shipprod: base.lineUpdateRecord.shipprod,
         prodcat: base.lineUpdateRecord.prodcat,
         whse: base.lineUpdateRecord.whse,
         arpvendno: base.lineUpdateRecord.arpvendno,
         arpprodline: base.lineUpdateRecord.arpprodline,
         arpwhse: base.lineUpdateRecord.arpwhse,
         asknsoanfl: false
      };
      DataService.post('api/va/asvaline/vanonstockvalidate', { data: vanonstockvalidate, busy: true }, function () {

         $state.go('^');

      });
   };

   // If the user changed the product, run the validation logic
   self.validateFieldChange = function () {
      var changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: 'shipprod'
      };
      changeCriteria.valineaddchg.nonstockty = '';

      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }
            if (data.valineaddchg.xrefcatflasked) {
               MessageService.yesNo('global.confirmation.needed', 'question.product.found.in.catalog.accept.catalog.item', function () {
                  //yes callback
                  self.processAcceptCatalogPopup('y', data.valineaddchg);
               }, function () {
                  //no callback
                  self.processAcceptCatalogPopup('n', data.valineaddchg);
               });
            }
            else if (data.valineaddchg.createcatflasked) {
               base.lineUpdateRecord.createcatflasked = data.valineaddchg.createcatflasked;
               base.lineUpdateRecord.createcatflanswer = false;
               self.validateFieldChange();
            } else {
               // Update the data based upon the changed data
               base.lineUpdateRecord = data.valineaddchg;
            }
         }
      });
   };

   // Validate the nonstock product entered
   self.fieldChange = function (args) {

      var vanonstockcriteria = {
         shipprod: base.lineUpdateRecord.shipprod,
         prodcat: base.lineUpdateRecord.prodcat,
         whse: base.lineUpdateRecord.whse
      };
      DataService.post('api/va/asvaentry/vanonstockleaveprod', { data: vanonstockcriteria, busy: true }, function (data) {
         if (data) {

            // Stock product settings are available - Prompt the user to determine if defaults should be used
            if (data.nonstkmessage) {


               if (data.nonstkmessage.startsWith('Product Exists in Catalog')) {
                  self.validateFieldChange();
               }
               else {
                  // Product exists in stock or non-stock. Look for default stock settings.
                  var nsQuestion = MessageService.get('global.description') + ': ';
                  nsQuestion += data.cproddesc + '<BR>';
                  nsQuestion += data.prcavlmessage + '<BR>';
                  nsQuestion += MessageService.get('global.product.category') + ': ' + data.prodcat;
                  nsQuestion += '<BR>' + '<BR>' + data.nonstkmessage;

                  MessageService.yesNo('global.use.existing.settings', nsQuestion, function() {
                        //yes callback
                        base.lineUpdateRecord.proddesc = data.proddesc;
                        base.lineUpdateRecord.proddesc2 = data.proddesc2;
                        base.lineUpdateRecord.prodcost = data.prodcost;
                        base.lineUpdateRecord.prodcat = data.prodcat;
                        base.lineUpdateRecord.cubes = data.cubes;
                        base.lineUpdateRecord.weight = data.weight;
                        base.lineUpdateRecord.arpvendno = data.arpvendno;
                        base.lineUpdateRecord.arpprodline = data.arpprodline;
                        base.lineUpdateRecord.arpwhse = data.arpwhse;
                        base.lineUpdateRecord.rushfl = data.rushfl;
                     },
                  function () {
                     //no callback
                     //self.validateFieldChange();
                  });
               }

            }

            // Display warning that this product is available
            if (data.warningmessage) {
               MessageService.info('global.warning', data.warningmessage);
            }
         }

      });
   };

   self.processAcceptCatalogPopup = function (answer, valineaddchg) {
      switch (answer.toLowerCase()) {
         case 'y': //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflasked = valineaddchg.xrefcatflasked; //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflanswer = true; //ignore jslint - correct indentation

            self.validateFieldChange(); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'n': //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflasked = valineaddchg.xrefcatflasked; //ignore jslint - correct indentation
            base.lineUpdateRecord.xrefcatflanswer = false; //ignore jslint - correct indentation

            self.validateFieldChange(); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

});

app.controller('VaetLineExtendCtrl', function ($scope, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.detailSubTitle = base.lineSubTitle(base.lineSelectedRecord.lineno);

   // Get the data needed for line updating
   var updateCriteria = {
      pvVano: base.lineSelectedRecord.vano,
      pvVasuf: base.lineSelectedRecord.vasuf,
      pvSeqno: base.lineSelectedRecord.seqno,
      pvLineno: base.lineSelectedRecord.lineno,
      pvFunctionnm: 'vaet'
   };
   DataService.post('api/va/asvaline/valineinitializeupdate', { data: updateCriteria, busy: true }, function (data) {
      if (data) {

         // Update the data based upon the changed data
         if (!MessageService.processMessaging(data.messaging)) {
            base.lineUpdateRecord = data.valineaddchg;
            if (base.lineUpdateRecord.cancelty) {
               self.cancelfl = true;
            } else {
               self.cancelfl = false;
            }
         }

      }

   });

   self.detailTitle = MessageService.get('global.update.line');
   self.detailSubTitle = base.lineSubTitle(base.lineSelectedRecord.lineno);

   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      var changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: chgField
      };

      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            // Update the data based upon the changed data
            base.lineUpdateRecord = data.valineaddchg;

         }
      });
   };

   self.simpleCancelChange = function () {
      if (self.cancelfl) {
         base.lineUpdateRecord.qtyship = 0;
      }
   };

   self.choicesCancelChange = function () {
      if (base.lineUpdateRecord.cancelty) {
         base.lineUpdateRecord.qtyship = 0;
      }
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {

      // If the Cancel field is visible and sensitive, convert the screen value back to a value that
      // can be applied through the service interface call
      if (base.lineUpdateRecord.cancelsimpleSensitive && !base.lineUpdateRecord.cancelsimpleHidden) {
         if (self.cancelfl) {
            base.lineUpdateRecord.cancelty = 'i';
         } else {
            base.lineUpdateRecord.cancelty = '';
         }
      }

      var chgCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvVano: base.lineUpdateRecord.vano,
         pvVasuf: base.lineUpdateRecord.vasuf,
         pvSeqno: base.lineUpdateRecord.seqno,
         pvFunctionnm: 'vaet'
      };

      DataService.post('api/va/asvaline/valineupdate', { data: chgCriteria, busy: true }, function (data) {
         if (data) {
            
            if (!MessageService.processMessaging(data.messaging)) {
               // If line info has changed, need to indicate the header should be redisplayed if the Header tab is accessed again
               dtl.headerUpdateNeeded = true;
               var indx = base.lineList.indexOf(base.lineSelectedRecord);

               base.lineUpdateRecord = data.valineaddchg;
               Utils.replaceObject(base.lineList[indx], data.valinelistresults[0]);

               $state.go('^');
               base.lineGrid.updateRow(indx);
            }
            //getting new grid data
            base.retrieveSectionsList(true);
         }

      });


   };

});

app.controller('VaetLineLaborCtrl', function ($scope, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   var originalProduct = base.lineUpdateRecord.shipprod;

   self.detailSubTitle = base.lineSubTitle(base.lineUpdateRecord.lineno);

   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      var changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: chgField
      };

      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            // The product must be a labor product
            if (data.valineaddchg.icspstatus.toLowerCase() !== 'l') {
               MessageService.error('global.error', 'message.only.labor.product.are.allowed.on.this.type.of.val');
            } else {
               // Update the data based upon the changed data
               base.lineUpdateRecord = data.valineaddchg;
            }

         }
      });
   };

   self.cancel = function () {
      base.lineUpdateRecord.shipprod = originalProduct;
      $state.go('^');
   };

   self.updateLabor = function () {
      var chgCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvVano: base.lineUpdateRecord.vano,
         pvVasuf: base.lineUpdateRecord.vasuf,
         pvSeqno: base.lineUpdateRecord.seqno,
         pvFunctionnm: 'vaet'
      };
      DataService.post('api/va/asvaline/valineupdate', { data: chgCriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               // If labor info has changed, need to indicate the header should be redisplayed if the Header tab is accessed again
               dtl.headerUpdateNeeded = true;
               base.lineUpdateRecord = data.valineaddchg;

               if (base.lineSelectedRecord) {
                  var indx = base.lineList.indexOf(base.lineSelectedRecord);

                  Utils.replaceObject(base.lineList[indx], data.valinelistresults[0]);

                  base.lineGrid.updateRow(indx);
               }

               $state.go('^');
            }

         }

      });
   };

   self.submit = function () {

      self.laborRecord = {
         sctntype: base.lineUpdateRecord.sctntype,
         shipprod: base.lineUpdateRecord.shipprod,
         prodcost: base.lineUpdateRecord.prodcost,
         timeslsrep: base.lineUpdateRecord.timeslsrep,
         timeworkdt: base.lineUpdateRecord.timeworkdt,
         timeactty: base.lineUpdateRecord.timeactty,
         hours: base.lineUpdateRecord.hours,
         minutes: base.lineUpdateRecord.minutes
      };
      self.tempRecord = {};

      // Validate the new labor data
      var validateCriteria = {
         valinelaborreview: self.laborRecord,
         valinelaborreviewcriteria: self.tempRecord,
         valinelaborreviewtotals: self.tempRecord
      };

      DataService.post('api/va/asvasection/vareviewlaborvalidate', { data: validateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.updateLabor();
         }
      });

   };

});

app.controller('VaetLineLaborExCtrl', function ($scope, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   var originalProduct = base.lineUpdateRecord.shipprod;

   self.detailSubTitle = base.lineSubTitle(base.lineUpdateRecord.lineno);

   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      var changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: chgField
      };

      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            // The product must be a labor product
            if (data.valineaddchg.icspstatus.toLowerCase() !== 'l') {
               MessageService.error('global.error', 'message.only.labor.product.are.allowed.on.this.type.of.val');
            } else {
               // Update the data based upon the changed data
               base.lineUpdateRecord = data.valineaddchg;
            }

         }
      });
   };

   self.cancel = function () {
      base.lineUpdateRecord.shipprod = originalProduct;
      $state.go('^');
   };

   self.updateLabor = function () {
      var chgCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvVano: base.lineUpdateRecord.vano,
         pvVasuf: base.lineUpdateRecord.vasuf,
         pvSeqno: base.lineUpdateRecord.seqno,
         pvFunctionnm: 'vaet'
      };
      DataService.post('api/va/asvaline/valineupdate', { data: chgCriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               // If labor info has changed, need to indicate the header should be redisplayed if the Header tab is accessed again
               dtl.headerUpdateNeeded = true;
               base.lineUpdateRecord = data.valineaddchg;

               if (base.lineSelectedRecord) {
                  var indx = base.lineList.indexOf(base.lineSelectedRecord);

                  Utils.replaceObject(base.lineList[indx], data.valinelistresults[0]);

                  base.lineGrid.updateRow(indx);
               }

               $state.go('^');
            }

         }

      });
   };

   self.submit = function () {

      self.laborRecord = {
         sctntype: base.lineUpdateRecord.sctntype,
         shipprod: base.lineUpdateRecord.shipprod,
         prodcost: base.lineUpdateRecord.prodcost,
         laborflatrtfl: base.lineUpdateRecord.laborflatrtfl,
         laborunits: base.lineUpdateRecord.laborunits,
         labortype: base.lineUpdateRecord.labortype
      };
      self.tempRecord = {};

      // Validate the new labor data
      var validateCriteria = {
         valinelaborreview: self.laborRecord,
         valinelaborreviewcriteria: self.tempRecord,
         valinelaborreviewtotals: self.tempRecord
      };

      DataService.post('api/va/asvasection/vareviewlaborvalidate', { data: validateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.updateLabor();
         }
      });

   };

});

app.controller('VaetLineCommentsCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   self.comType = 'fl' + base.lineUpdateRecord.seqno;

   // The shared comment controller only has a back button
   // Need to redisplay the grid to pick up the change in the comment flag
   self.cancel = function () {
      base.retrieveLineItemsList();
      $state.go('^');
   };

});

app.controller('VaetLineHistoryCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.detailSubTitle = base.lineSubTitle(base.lineSelectedRecord.lineno);

   var chgCriteria = {
      vano: base.lineSelectedRecord.vano,
      vasuf: base.lineSelectedRecord.vasuf,
      seqno: base.lineSelectedRecord.seqno,
      lineno: base.lineSelectedRecord.lineno,
      Functionnm: 'vaet'
   };
   DataService.post('api/va/asvaline/valinehistoryretrieve', { data: chgCriteria, busy: true }, function (data) {
      if (data) {

         if (!MessageService.processMessaging(data.messaging)) {
            self.lineHistory = data.valinehist;
         }

      }

   });
   self.cancel = function () {
      $state.go('^');
   };

});

app.controller('VaetLineSerialCtrl', function ($scope, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.serialControlReady = function () {

      // Load Initial Line Data
      self.icentryserialscriteria = {
         btncreateenabled: true,
         currproc: 'vaet',
         ictype: 'va',
         lineno: base.lineUpdateRecord.lineno,
         orderno: base.lineUpdateRecord.vano,
         ordersuf: base.lineUpdateRecord.vasuf,
         ordqty: base.lineUpdateRecord.stkqtyord,
         origqty: base.lineUpdateRecord.stkqtyship,
         ourproc: 'vaet',
         outqty: base.lineUpdateRecord.stkqtyship,
         prod: base.lineUpdateRecord.shipprod,
         proofqty: base.lineUpdateRecord.nosnlots,
         seqno: base.lineUpdateRecord.seqno,
         type: 'VA',
         whse: base.lineUpdateRecord.whse
      };

      var criteria = {
         icentryserialslist: [],
         icentryserialscriteria: self.icentryserialscriteria
      };

      // Call initialize method on the Shared-Serials-Ctrl
      self.serialsControl.initialize(criteria);
   };

   self.serialDoneCallback = function (adjustQtyFl, adjustQtyShip) {

      var changeCriteria = {};
      changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: 'nosnlots'
      };

      // Update the nosnlots for a correct proofqty on the serial screen
      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            base.lineUpdateRecord = data.valineaddchg;

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            if (adjustQtyFl) {
               self.adjustQuantity(adjustQtyFl, adjustQtyShip);
            } else {
               self.back();
            }
         }
      });
   };

   self.adjustQuantity = function (adjustQtyFl, adjustQtyShip) {

      base.lineUpdateRecord.qtyship = adjustQtyShip;

      var changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: 'qtyship'
      };

      // Update the qtyship if operator Increases/Decreases the Quantity
      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            base.lineUpdateRecord = data.valineaddchg;

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            // Update the Qty Ship Change on the Actual VA Line Record
            self.submitQtyChg();
         }
      });
   };

   self.submitQtyChg = function () {
      var chgCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvVano: base.lineUpdateRecord.vano,
         pvVasuf: base.lineUpdateRecord.vasuf,
         pvSeqno: base.lineUpdateRecord.seqno,
         pvFunctionnm: 'vaet'
      };
      DataService.post('api/va/asvaline/valineupdate', { data: chgCriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               base.lineUpdateRecord = data.valineaddchg;
               MessageService.info('global.information', 'message.save.operation.completed.successfully');

               // Re-display the Line Change and the Grid Line
               var indx = base.lineList.indexOf(base.lineSelectedRecord);
               Utils.replaceObject(base.lineList[indx], data.valinelistresults[0]);
               base.lineGrid.updateRow(indx);

               self.back();
            }
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };

   self.subTitle = function () {
      var vaSubTitle = base.lineSubTitle(base.lineUpdateRecord.lineno);

      return vaSubTitle;
   };

});

app.controller('VaetLineLotCtrl', function ($scope, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.lotControlReady = function () {

      // Load Initial Line Data
      self.icentrylotscriteria = {
         assignoldest: 'y',
         btncreateenabled: true,
         currproc: 'vaet',
         ictype: 'va',
         lineno: base.lineUpdateRecord.lineno,
         orderno: base.lineUpdateRecord.vano,
         ordersuf: base.lineUpdateRecord.vasuf,
         ordqty: base.lineUpdateRecord.stkqtyord,
         origqty: base.lineUpdateRecord.stkqtyship,
         ourproc: 'vaet',
         outqty: base.lineUpdateRecord.stkqtyship,
         prod: base.lineUpdateRecord.shipprod,
         proofqty: base.lineUpdateRecord.nosnlots,
         seqno: base.lineUpdateRecord.seqno,
         type: 'VA',
         whse: base.lineUpdateRecord.whse
      };

      // Call initialize method on the Shared-Lots-Ctrl
      self.lotsControl.initialize(self.icentrylotscriteria);
   };

   self.lotDoneCallback = function (adjustQtyFl, adjustQtyShip) {

      if (adjustQtyFl) {
         self.adjustQuantity(adjustQtyFl, adjustQtyShip);
      } else {
         var changeCriteria = {
            valineaddchg: base.lineUpdateRecord,
            pvFunctionname: 'vaet',
            pvFieldname: 'nosnlots'
         };

         // Update the nosnlots for a correct proofqty on the lot screen
         DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
            if (data) {

               // Update the data based upon the changed data
               base.lineUpdateRecord = data.valineaddchg;

               if (data.cWarningMessage) {
                  MessageService.alert('global.warning', data.cWarningMessage);
               }

               self.back();
            }
         });
      }
   };

   self.adjustQuantity = function (adjustQtyFl, adjustQtyShip) {

      base.lineUpdateRecord.qtyship = adjustQtyShip;

      var changeCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvFunctionname: 'vaet',
         pvFieldname: 'qtyship'
      };

      // Update the qtyship if operator Increases/Decreases the Quantity
      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            base.lineUpdateRecord = data.valineaddchg;

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            // Update the Qty Ship Change on the Actual VA Line Record
            self.submitQtyChg();
         }
      });
   };

   self.submitQtyChg = function () {
      var chgCriteria = {
         valineaddchg: base.lineUpdateRecord,
         pvVano: base.lineUpdateRecord.vano,
         pvVasuf: base.lineUpdateRecord.vasuf,
         pvSeqno: base.lineUpdateRecord.seqno,
         pvFunctionnm: 'vaet'
      };
      DataService.post('api/va/asvaline/valineupdate', { data: chgCriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               base.lineUpdateRecord = data.valineaddchg;
               MessageService.info('global.information', 'message.save.operation.completed.successfully');

               // Re-display the Line Change and the Grid Line
               var indx = base.lineList.indexOf(base.lineSelectedRecord);
               Utils.replaceObject(base.lineList[indx], data.valinelistresults[0]);
               base.lineGrid.updateRow(indx);

               self.back();
            }
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };

   self.subTitle = function () {
      var vaSubTitle = base.lineSubTitle(base.lineUpdateRecord.lineno);

      return vaSubTitle;
   };

});

app.controller('VaetLineSourcingCtrl', function ($scope, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.srcTitle = MessageService.get('global.po.wt.interface.multi.line');
   self.srcSubTitle = base.sectionSelectedRecord.vano + '-' + Utils.pad(base.sectionSelectedRecord.vasuf, 2) + ' | ';
   self.srcSubTitle += MessageService.get('global.sequence') + ': ' + base.sectionSelectedRecord.seqno;

   if (base.lineSelectedRecords.length === 1) {
      self.srcTitle = MessageService.get('global.po.wt.interface');
      self.srcSubTitle = base.lineSubTitle(base.lineSelectedRecords[0].lineno);
   }

   self.backtieSourcing = function () {
      var changeCriteria = {
         valinelistresults: base.lineSelectedRecords,
         valinelinetie: base.lineSourcingRecord
      };

      DataService.post('api/va/asvaline/valinebacktieretrieve', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Get the data for the back tie
            if (!MessageService.processMessaging(data.messaging)) {
               base.lineSourcingRecord = data.valinelinetie;
               $state.go('vaet.detail.linesourcing.linebacktie');
            }

         }
      });
   };

   self.buildOrderTypes = function () {
      var returnedTypes = [];
      self.orderTypes = [];

      // Get an array of the order type values returned by the service interface call
      returnedTypes = base.lineSourcingRecord.ordertypelist.split(',');

      // Build an array of values to be used by the screen in the Order Type drop down
      if (returnedTypes) {
         for (var i = 0; i < returnedTypes.length; i++) {
            if (returnedTypes[i].toLowerCase() === 'p') {
               self.orderTypes.push({ typeValue: 'p', typeName: MessageService.get('global.purchase.order') });
            } else if (returnedTypes[i].toLowerCase() === 't') {
               self.orderTypes.push({ typeValue: 't', typeName: MessageService.get('global.warehouse.transfer') });
            } else if (returnedTypes[i].toLowerCase() === 'f') {
               self.orderTypes.push({ typeValue: 'f', typeName: MessageService.get('global.value.add') });
            } else {
               self.orderTypes.push({ typeValue: 'n', typeName: MessageService.get('global.no.tie') });
            }
         }
      }

   };

   // Get the list of order types when first displaying the screen
   self.buildOrderTypes();

   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      if (chgField === 'orderaltno') {
         //strip the orderaltno out of the string, convert it to an integer and reset it
         var orderAltParts = base.lineSourcingRecord.orderaltno.split('-');
         var orderAltNoInt;
         if (orderAltParts.length === 2) {
            orderAltNoInt = parseInt(orderAltParts[0]);
         } else {
            orderAltNoInt = parseInt(base.lineSourcingRecord.orderaltno);
         }
         base.lineSourcingRecord.orderaltno = orderAltNoInt;
      }

      var changeCriteria = {
         valinelistresults: base.lineSelectedRecords,
         valinelinetie: base.lineSourcingRecord,
         pvFieldname: chgField
      };

      DataService.post('api/va/asvaline/valinetieleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               base.lineSourcingRecord = data.valinelinetie;
            }

         }
      });
   };

   self.submit = function () {
      var updateCriteria = {
         valinelistresults: base.lineSelectedRecords,
         valinelinetie: base.lineSourcingRecord
      };

      DataService.post('api/va/asvaline/valinetieupdate', { data: updateCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               base.retrieveLineItemsList(true);
               $state.go('^');
            }

         }
      });
   };

   self.cancel = function () {
      $state.go('^');
   };

});

app.controller('VaetLineBackTieCtrl', function ($scope, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.srcSubTitle = base.sectionSelectedRecord.vano + '-' + Utils.pad(base.sectionSelectedRecord.vasuf, 2) + ' | ';
   self.srcSubTitle += MessageService.get('global.sequence') + ': ' + base.sectionSelectedRecord.seqno;

   if (base.lineSelectedRecords.length === 1) {
      self.srcSubTitle = base.lineSubTitle(base.lineSelectedRecords[0].lineno);
   }

   self.buildOrderTypes = function () {
      var returnedTypes = [];
      self.orderTypes = [];

      // Get an array of the order type values returned by the service interface call
      returnedTypes = base.lineSourcingRecord.powtordertypelist.split(',');

      // Build an array of values to be used by the screen in the Order Type drop down
      if (returnedTypes) {
         for (var i = 0; i < returnedTypes.length; i++) {
            if (returnedTypes[i].toLowerCase() === 'p') {
               self.orderTypes.push({ typeValue: 'p', typeName: MessageService.get('global.purchase.order') });
            } else if (returnedTypes[i].toLowerCase() === 't') {
               self.orderTypes.push({ typeValue: 't', typeName: MessageService.get('global.warehouse.transfer') });
            } else if (returnedTypes[i].toLowerCase() === 'f') {
               self.orderTypes.push({ typeValue: 'f', typeName: MessageService.get('global.value.add') });
            } else {
               self.orderTypes.push({ typeValue: 'n', typeName: MessageService.get('global.no.tie') });
            }
         }
      }

   };

   // Get the list of order types when first displaying the screen
   self.buildOrderTypes();

   // If the user changed one of the values, run the validation logic
   self.fieldChange = function (chgField) {
      var changeCriteria = {
         valinelistresults: base.lineSelectedRecords,
         valinelinetie: base.lineSourcingRecord,
         pvFieldname: chgField
      };

      DataService.post('api/va/asvaline/valinebacktieleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               base.lineSourcingRecord = data.valinelinetie;
            }

         }
      });
   };

   self.submit = function () {
      var updateCriteria = {
         valinelistresults: base.lineSelectedRecords,
         valinelinetie: base.lineSourcingRecord
      };

      DataService.post('api/va/asvaline/valinebacktieupdate', { data: updateCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               $state.go('^');
            }

         }
      });
   };

   self.cancel = function () {
      $state.go('^');
   };

});

app.controller('VaetLineCustomCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var cust = $scope.cust;
   var item = cust.rowParams.item;
   var grid = cust.rowParams.grid;
   var row = cust.rowParams.row;

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {

      DataService.put('api/va/vaesl', { data: self.vaesl, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // Collapse current row
         grid.toggleRowDetail(row);
      });

   };

   self.getVaesl = function () {
      if (item) {
         var params = { vano: item.vano, vasuf: item.vasuf, seqno: item.seqno, lineno: item.lineno, fillmode: true };
         DataService.get('api/va/vaesl/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.vaesl = data;
            }
         });
      }
   };

   self.getVaesl();

});