// JavaScript source code
app.controller('VaetDetailSectionsCtrl', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService, ModalService, SecurityService, Sasc) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.sasc = Sasc;
   self.securityLevelFunc = SecurityService.getSecurityLevel('vaet');
   self.securityLevelTab = SecurityService.getSubSecurityLevel('vaet', 'Sections');

   self.sectionFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   self.stageFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionStage(value);
      }
   };

   self.altTypeFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatPOTransType(value);
      } else {
         return value;
      }
   };

   self.altStageFormatter = function (row, cell, value, column, item) {
      if (value) {

         // From g-postg.i
         if (value.toLowerCase() === 'ent') {
            return MessageService.get('global.entered');
         } else if (value.toLowerCase() === 'ord') {
            return MessageService.get('global.ordered');
         } else if (value.toLowerCase() === 'prt') {
            return MessageService.get('global.printed');
         } else if (value.toLowerCase() === 'ack') {
            return MessageService.get('global.acknowledged');
         } else if (value.toLowerCase() === 'pre') {
            return MessageService.get('global.pre.receiving');
         } else if (value.toLowerCase() === 'rcv') {
            return MessageService.get('global.received');
         } else if (value.toLowerCase() === 'cst') {
            return MessageService.get('global.costed');
         } else if (value.toLowerCase() === 'cls') {
            return MessageService.get('global.closed');
         } else {
            return MessageService.get('global.cancelled');
         }

      } else {
         return value;
      }
   };

   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      var pono = 0;
      var posuf = 0;

      // POIP HyperLink
      if (currentRow && currentRow.orderaltno) {
         var orderParts = currentRow.orderaltno.split('-');

         if (orderParts.length === 2) {
            pono = orderParts[0];
            posuf = orderParts[1];
         } else {
            pono = orderParts[0];
            posuf = 0;
         }

         $state.go('poip.detail', { pk: pono, pk2: posuf });
      }

   };

   base.retrieveSectionsList();

   // When a row is selected, get the data for the section and populate the line data and clear wip list
   self.setCurrentSection = function () {

      base.currentSectionRowIndex = base.sctnGrid.activeCell.row;
      base.sectionSelectedRecord = GridService.getSelectedRecord(base.sctnGrid);

      if (base.sectionSelectedRecord) {
         base.retrieveLineItemsList();
         base.lineWipList = '';
      }

   };

   self.sectionAdd = function () {
      base.sectionAddMode = true;

      // Initialize the data for the new section
      DataService.get('api/va/asvasection/vasectioninitialize/' + base.vaet.vano + '/' + base.vaet.vasuf + '/0/Add', function (data) {
         if (data) {
            base.sectionUpdateRecord = data;
            $state.go('vaet.detail.sectionaddedit');
         }
      });
   };

   self.sectionAddons = function () {
      $state.go('vaet.detail.sectionaddons');
   };

   self.sectionEdit = function () {
      base.sectionAddMode = false;

      // Get the data for the selected section
      DataService.get('api/va/asvasection/vasectioninitialize/' + base.sectionSelectedRecord.vano + '/' + base.sectionSelectedRecord.vasuf + '/' + base.sectionSelectedRecord.seqno + '/Chg', function (data) {
         if (data) {
            base.sectionUpdateRecord = data;
            $state.go('vaet.detail.sectionaddedit');
         }
      });

   };

   self.sectionExtend = function () {
      base.sectionAddMode = false;

      switch (base.sectionSelectedRecord.sctntype.toLowerCase()) {
         case 'in':                                   //ignore jslint - correct indentation
            $state.go('vaet.detail.sectionextendin'); //ignore jslint - correct indentation
            break;                                    //ignore jslint - correct indentation

         case 'ex':                                   //ignore jslint - correct indentation
         case 'is':                                   //ignore jslint - correct indentation
         case 'it':                                   //ignore jslint - correct indentation
            $state.go('vaet.detail.sectionextendex'); //ignore jslint - correct indentation
            break;                                    //ignore jslint - correct indentation

      }

   };

   self.sectionSpecs = function () {
      base.sectionAddMode = false;
      $state.go('vaet.detail.sectionspec');
   };

   self.sectionCreatePO = function () {
      if (base.sectionSelectedRecord) {

         DataService.get('api/va/asvasection/vasectioncreatepo/' + base.sectionSelectedRecord.vano + '/' + base.sectionSelectedRecord.vasuf, function () {
            base.retrieveSectionsList();
         });

      }
   };

   self.reviewLabor = function () {
      $state.go('vaet.detail.sectionreviewlabor');
   };

   self.sectionMoveToWip = function () {
      if (base.sectionSelectedRecord) {
         var completeCriteria = {
            vano: base.sectionSelectedRecord.vano,
            vasuf: base.sectionSelectedRecord.vasuf,
            seqno: base.sectionSelectedRecord.seqno,
            wiplist: base.lineWipList,
            functionnm: 'vaet'
         };
         DataService.post('api/va/asvasection/vasectioncompleteinitialize', { data: completeCriteria, busy: true }, function (data) {

            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  base.sectionCompleteRecord = data.vasectioncompletecriteria;

                  ModalService.showModal('va/vaet/tabs/sections/section-complete.json', 'VaetSectionCompleteCtrl as comp', $scope, function (modal) {
                     base.sectionCompleteModal = modal;
                  });
               }

            }
         });
      }
   };

   self.sectionCompleteSection = function () {
      if (base.sectionSelectedRecord) {
         var completeCriteria = {
            vano: base.sectionSelectedRecord.vano,
            vasuf: base.sectionSelectedRecord.vasuf,
            seqno: base.sectionSelectedRecord.seqno,
            wiplist: '',
            functionnm: 'vaet'
         };
         DataService.post('api/va/asvasection/vasectioncompleteinitialize', { data: completeCriteria, busy: true }, function (data) {

            if (data) {
               base.sectionCompleteRecord = data.vasectioncompletecriteria;

               if (!MessageService.processMessaging(data.messaging)) {

                  // If user input is required, ask question and process based on the reponse
                  // If labor lines exist and they should be reviewed, go to the Labor Review screen
                  // Display the complete section modal to get the posting information
                  var questionMessageText = MessageService.getQuestionMessages(data.messaging);
                  if (questionMessageText) {
                     MessageService.yesNo('', questionMessageText, function () {
                        //yes callback
                        if (data.vasectioncompletecriteria.reviewlaborcostsfl === true) {
                           self.reviewLabor();
                        } else {
                           ModalService.showModal('va/vaet/tabs/sections/section-complete.json', 'VaetSectionCompleteCtrl as comp', $scope, function (modal) {
                              base.sectionCompleteModal = modal;
                           });
                        }
                     }, function () {
                        //no callback
                     });
                  } else {
                     if (data.vasectioncompletecriteria.reviewlaborcostsfl === true) {
                        self.reviewLabor();
                     } else {
                        ModalService.showModal('va/vaet/tabs/sections/section-complete.json', 'VaetSectionCompleteCtrl as comp', $scope, function (modal) {
                           base.sectionCompleteModal = modal;
                        });
                     }
                  }

                  base.sectionCompleteRecord = data.vasectioncompletecriteria;
               }

            }
         });
      }
   };

   self.sectionCancelReopen = function () {
      if (base.sectionSelectedRecord) {

         DataService.get('api/va/asvasection/vasectioncancelreopen/' + base.sectionSelectedRecord.vano + '/' + base.sectionSelectedRecord.vasuf + '/' + base.sectionSelectedRecord.seqno, function () {
            base.retrieveSectionsList();
         });

      }
   };

   self.sectionDelete = function () {

      // Check Authorization Point security for adding a new line to a VA section
      AuthService.createAuthPoint('vaet', 'section', '', 'd', '', null, self.sctndelAuthPointPassed, self.sctndelAuthPointFailed);
   };

   self.sctndelAuthPointPassed = function () {
      if (base.sectionSelectedRecord) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
            function () {
               // Yes processing
               self.sectionFinalDelete();
            });
      }
   };

   self.sctndelAuthPointFailed = function () {
      // If no authorization, leave the user in the lines
   };

   self.sectionFinalDelete = function () {
      var deleteCriteria = {
         vano: base.sectionSelectedRecord.vano,
         vasuf: base.sectionSelectedRecord.vasuf,
         seqno: base.sectionSelectedRecord.seqno,
         mode: 'Chg',
         skipfl: true
      };
      DataService.post('api/va/asvasection/vasectiondelete', { data: deleteCriteria, busy: true }, function (data) {

         if (!MessageService.processMessaging(data)) {
            // If section deleted, need to indicate the header should be redisplayed if the Header tab is accessed again
            dtl.headerUpdateNeeded = true;

            base.retrieveSectionsList();
         }

      });
   };

   self.sectionSourcing = function () {
      if (base.sectionSelectedRecord) {
         DataService.get('api/va/asvasection/vasectiontieretrieve/' + base.sectionSelectedRecord.vano + '/' + base.sectionSelectedRecord.vasuf + '/' + base.sectionSelectedRecord.seqno, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.sectionSourcingRecord = data.valinelinetie;
                  $state.go('vaet.detail.sectionsourcing');
               }
            }
         });
      }
   };

   self.drillDown = function (e, args) {

      // Get the section information and mark the grid row as selected
      if (args) {
         base.sectionSelectedRecord = args[0].item;
         base.sctnGrid.selectedRows([args[0].row]);
      }

      // Take the user to the Line Items screen for all sections except for Specification
      if (base.sectionSelectedRecord.sctntype.toLowerCase() === 'sp') {
         self.sectionSpecs();
      } else {
         dtl.isLineTabSelected++;
      }
   };

   self.lastLine = function () {
      var lastRow = self.grid.settings.dataset.length - 1;
      self.grid.selectedRows([lastRow]);
   };

});

app.controller('VaetSectionAddEditCtrl', function ($scope, $state, $stateParams, $timeout, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.sectionCodes = [];

   // Set the screen title if adding new VA order section or editing an existing VA order section
   self.addMode = base.isSectionInAddMode();

   if (self.addMode) {
      self.detailTitle = MessageService.get('global.add.new.section');
   } else {
      self.detailTitle = MessageService.get('global.update.section');
   }

   self.detailSubTitle = base.vaet.vano + '-' + Utils.pad(base.vaet.vasuf, 2);

   // Get the codes set up in SASTT for the current section type
   self.retrieveSectionCodes = function (typeValue) {
      DataService.get('api/va/vast/listbydescrip?codeiden=' + typeValue, { busy: true }, function (data) {
         if (data) {
            self.sectionCodes = data;
         }
      });
   };

   self.sectionTypeChanged = function () {
      self.retrieveSectionCodes(base.sectionUpdateRecord.sctntype);
   };

   // Initialize the section code information when first loading the data
   self.sectionTypeChanged();

   self.afterSectionAdd = function () {

      // Repopulate the Sections grid
      base.retrieveSectionsList();

      // Load data from the newly created section
      base.sectionSelectedRecord = [];
      base.sectionSelectedRecord = base.sectionUpdateRecord;

      // Execute the screen appropriate to the section
      if (base.sectionSelectedRecord.sctntype.toLowerCase() === 'sp') {
         $state.go('vaet.detail.sectionspec');
      } else if (base.sectionSelectedRecord.sctntype.toLowerCase() === 'in') {
         $state.go('vaet.detail.sectionextendin');
      } else if (base.sectionSelectedRecord.sctntype.toLowerCase() === 'ii') {

         var sectionsListResults = base.retrieveSectionsListForInventoryIn();
         sectionsListResults.$promise.then(function () {
            //after the grid finishes populating, need to auto-select the newly created record before entering the Line Items tab
            $timeout(function () {
               var gridCount = base.sctnGrid.recordCount;
               if (gridCount && gridCount >= 1) {
                  base.sctnGrid.selectRow(gridCount - 1);
               }
               // SASO "Default to VA Section Lines after Section Entry" determines where to go next
               if (base.sasoo.vaautolnentryty.toLowerCase() === 'y') {
                  base.sectionSelectedData = base.sectionSelectedRecord.seqno + ' - ' + base.sectionSelectedRecord.codedesc;
                  base.lineList = [];
                  dtl.isLineTabSelected++;

                  // Make sure section data is loaded before going to the lines
                  if (!base.sectionSelectedRecord) {
                     base.sectionSelectedRecord = self.sectionExtendEX;
                  }
                  $state.go('^');
               } else {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^', { header: base.sectionSelectedRecord });
               }
            });
         });
      } else {
         $state.go('vaet.detail.sectionextendex');
      }

   };

   self.cancel = function () {
      $state.go('^', { header: base.sectionSelectedRecord });
   };

   self.submit = function () {

      // Execute code based upon whether adding a new VA section or editing an existing VA section
      if (self.addMode) {

         DataService.post('api/va/asvasection/vasectionaddrecord', { data: base.sectionUpdateRecord, busy: true }, function (data) {

            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  base.sectionUpdateRecord = data.vasectionaddchg;
                  self.afterSectionAdd();
               }

            }
         });
      } else {

         DataService.post('api/va/asvasection/vasectionchangerecord', { data: base.sectionUpdateRecord, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  var indx = base.sectionResults.indexOf(base.sectionSelectedRecord);

                  base.sectionUpdateRecord = data.vasectionaddchg;
                  Utils.replaceObject(base.sectionResults[indx], data.vasectionaddchg);

                  $state.go('^');
                  base.sctnGrid.updateRow(indx);
               }

            }

         });
      }
   };

});

app.controller('VaetSectionAddonsCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.sectionAddon = {};

   // Set the screen title based on the VA order section
   self.detailSubTitle = base.sectionSubTitle();

   // Get the addon data for the selected section
   var vagetaddoncriteria = {
      functionnm: 'vaet',
      vano: base.sectionSelectedRecord.vano,
      vasuf: base.sectionSelectedRecord.vasuf,
      seqno: base.sectionSelectedRecord.seqno
   };
   DataService.post('api/va/asvasection/vasectionretrieveaddons', { data: vagetaddoncriteria, busy: true }, function (data) {
      if (data) {

         if (!MessageService.processMessaging(data.messaging)) {
            self.sectionAddon = data.vaaddons;
         }

      }
   });

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {

      // Save the addon data entered
      var vasaveaddoncriteria = {
         vaaddons: self.sectionAddon,
         vaaddoncriteria: vagetaddoncriteria
      };
      DataService.post('api/va/asvasection/vasectionsubmitaddons', { data: vasaveaddoncriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               // If Addons have changed, need to indicate the header should be redisplayed if the Header tab is accessed again
               dtl.headerUpdateNeeded = true;
               $state.go('^');
            }

         }
      });
   };

});

app.controller('VaetSectionExtendInCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, UtilsData) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.sectionExtendIN = [];
   self.isContinueClicked = false;

   var iVano = 0;
   var iVasuf = 0;
   var iSeqno = 0;

   var modeText = 'Add';
   if (!base.isSectionInAddMode()) {
      modeText = 'Chg';
   }

   // Error in IE that VA# not loaded when launching the Extended screen on a section add because base.sectionSelectedRecord did not exist here
   if (base.sectionSelectedRecord) {
      iVano = base.sectionSelectedRecord.vano;
      iVasuf = base.sectionSelectedRecord.vasuf;
      iSeqno = base.sectionSelectedRecord.seqno;

      // Set the screen title based on the VA order section
      self.detailSubTitle = base.sectionSubTitle();

   } else {
      iVano = base.sectionUpdateRecord.vano;
      iVasuf = base.sectionUpdateRecord.vasuf;
      iSeqno = base.sectionUpdateRecord.seqno;

      self.detailSubTitle = base.sectionUpdateRecord.vano + '-' + Utils.pad(base.sectionUpdateRecord.vasuf, 2) + ' | ';
      self.detailSubTitle += MessageService.get('global.sequence') + ': ' + base.sectionUpdateRecord.seqno + ' | ';
      self.detailSubTitle += MessageService.get('global.type') + ': ' + base.formatSectionType(base.sectionUpdateRecord.sctntype) + ' | ';
      self.detailSubTitle += MessageService.get('global.code') + ': ' + base.sectionUpdateRecord.sctncode;

   }

   // Get the data for the selected section
   DataService.get('api/va/asvasection/vasectionextendininitialize/' + iVano + '/' + iVasuf + '/' + iSeqno + '/' + modeText, function (data) {
      if (data) {
         self.sectionExtendIN = data;
      }
   });

   self.continueExtend = function () {

      // Validate the data entered
      DataService.post('api/va/asvasection/vasectionextendinvalidate', { data: self.sectionExtendIN, busy: true }, function (data) {
         if (data) {
            self.sectionExtendIN = data;
            self.isContinueClicked = true;
            // Save the default settings needed that were applied on Continue and Apply
            DataService.post('api/va/asvasection/vasectionextendinupdate', { data: self.sectionExtendIN, busy: true }, function (data2) {
               if (data2) {
                  self.sectionExtendIN = data2;
               }
            });
         }
      });
   };

   // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function (args) {
      UtilsData.getSastnDescriptionSpecial('R', args.value, function (descrip) {
         self.sectionExtendIN.refer = descrip;
      });
   }

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {

      // Save the extended data entered
      DataService.post('api/va/asvasection/vasectionextendinupdate', { data: self.sectionExtendIN, busy: true }, function (data) {
         if (data) {
            self.sectionExtendIN = data;

            // If in Add mode, check user SASO options to see if they should be put in the lines
            if (base.isSectionInAddMode()) {
               if (base.sasoo.vaautolnentryty.toLowerCase() === 'y') {

                  // Make sure section data is loaded before going to the lines
                  if (!base.sectionSelectedRecord) {
                     base.sectionSelectedRecord = self.sectionExtendIN;
                  }
                  base.sectionSelectedData = self.sectionExtendIN.seqno + ' - ' + self.sectionExtendIN.codedesc;
                  base.lineList = [];
                  dtl.isLineTabSelected++;

                  //need to select the newly created record before entering the Line Items tab
                  var gridCount = base.sctnGrid.recordCount;
                  if (gridCount && gridCount >= 1) {
                     base.sctnGrid.selectRow(gridCount - 1);
                  }
                  $state.go('^');
               } else {

                  // Go back to the Sections tab
                  $state.go('^');
               }
            } else {
               var indx = base.sectionResults.indexOf(base.sectionSelectedRecord);
               data.sctncode = base.sectionSelectedRecord.sctncode;

               Utils.replaceObject(base.sectionResults[indx], data);

               $state.go('^');
               base.sctnGrid.updateRow(indx);
            }

         }
      });
   };

});

app.controller('VaetSectionExtendExCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService, Utils, UtilsData) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.sectionExtendEX = [];
   self.isContinueClicked = false;

   var iVano = 0;
   var iVasuf = 0;
   var iSeqno = 0;

   var modeText = 'Add';
   if (!base.isSectionInAddMode()) {
      modeText = 'Chg';
   }

   // Error in IE that VA# not loaded when launching the Extended screen on a section add because base.sectionSelectedRecord did not exist here
   if (base.sectionSelectedRecord) {
      iVano = base.sectionSelectedRecord.vano;
      iVasuf = base.sectionSelectedRecord.vasuf;
      iSeqno = base.sectionSelectedRecord.seqno;

      // Set the screen title based on the VA order section
      self.detailSubTitle = base.sectionSubTitle();

   } else {
      iVano = base.sectionUpdateRecord.vano;
      iVasuf = base.sectionUpdateRecord.vasuf;
      iSeqno = base.sectionUpdateRecord.seqno;

      self.detailSubTitle = base.sectionUpdateRecord.vano + '-' + Utils.pad(base.sectionUpdateRecord.vasuf, 2) + ' | ';
      self.detailSubTitle += MessageService.get('global.sequence') + ': ' + base.sectionUpdateRecord.seqno + ' | ';
      self.detailSubTitle += MessageService.get('global.type') + ': ' + base.formatSectionType(base.sectionUpdateRecord.sctntype) + ' | ';
      self.detailSubTitle += MessageService.get('global.code') + ': ' + base.sectionUpdateRecord.sctncode;

   }

   // Get the data for the selected section
   DataService.get('api/va/asvasection/vasectionextendexinitialize/' + iVano + '/' + iVasuf + '/' + iSeqno + '/' + modeText, function (data) {
      if (data) {
         self.sectionExtendEX = data;

         if (data.sctntype.toLowerCase() === 'ex') {
            self.whseTitle = MessageService.get('global.warehouse');
         } else if (data.sctntype.toLowerCase() === 'it') {
            self.whseTitle = MessageService.get('global.internal.processing.warehouse');
         } else {
            self.whseTitle = MessageService.get('global.inspection.warehouse');
         }

         if (data.desttype.toLowerCase() === 'f') {
            self.prodTitle = MessageService.get('global.final.product');
         } else {
            self.prodTitle = MessageService.get('global.intermediate.product');
         }
      }
   });

   self.continueExtend = function () {

      // Validate the data entered
      DataService.post('api/va/asvasection/vasectionextendexvalidate', { data: self.sectionExtendEX, busy: true }, function (data) {
         if (data) {
            self.sectionExtendEX = data;
            self.isContinueClicked = true;

            if (data.desttype.toLowerCase() === 'f') {
               self.prodTitle = MessageService.get('global.final.product');
            } else {
               self.prodTitle = MessageService.get('global.intermediate.product');
            }
            // Save the default settings needed that were applied on Continue and Apply
            DataService.post('api/va/asvasection/vasectionextendexupdate', { data: self.sectionExtendEX, busy: true }, function (data2) {
               if (data2) {
                  self.sectionExtendEX = data2;
               }
            });
         }
      });
   };

   // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function (args) {
      UtilsData.getSastnDescriptionSpecial('R', args.value, function (descrip) {
         self.sectionExtendEX.refer = descrip;
      });
   }

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {

      // Save the extended data entered
      DataService.post('api/va/asvasection/vasectionextendexupdate', { data: self.sectionExtendEX, busy: true }, function (data) {
         if (data) {
            self.sectionExtendEX = data;

            // If in Add mode, determine where to put the user after the Extend screen
            if (base.isSectionInAddMode()) {

               if (self.sectionExtendEX.sctntype.toLowerCase() === 'ex' && self.sectionExtendEX.desttype.toLowerCase() === 'w' && self.sectionExtendEX.destwhse === base.vaet.whse) {

                  /* If the user is in add mode and just entered an EX section and the destination of that section is a warehouse and that
                     destination warehouse is the whse for the current VA order, then we need to create another Inventory Component (IN)
                     section to eventually ship the intermediate product back out */
                  base.sectionAuto.vano = self.sectionExtendEX.vano;
                  base.sectionAuto.vasuf = self.sectionExtendEX.vasuf;
                  base.sectionAuto.seqno = self.sectionExtendEX.seqno;
                  base.sectionAuto.sctncode = '';

                  ModalService.showModal('va/vaet/tabs/sections/auto-create.json', 'VaetAutoCreateCtrl as auto', $scope, function (modal) {
                     self.sectionAutoCreateModal = modal;
                  });

               } else if (base.sasoo.vaautolnentryty.toLowerCase() === 'y') {

                  // Make sure section data is loaded before going to the lines
                  if (!base.sectionSelectedRecord) {
                     base.sectionSelectedRecord = self.sectionExtendEX;
                  }

                  // If the 'Default to VA Section Lines After Section Entry' SASO option is turned on, force the user into the Line Items tab
                  base.sectionSelectedData = self.sectionExtendEX.seqno + ' - ' + self.sectionExtendEX.codedesc;
                  base.lineList = [];
                  dtl.isLineTabSelected++;

                  //need to select the newly created record before entering the Line Items tab
                  var gridCount = base.sctnGrid.recordCount;
                  if (gridCount && gridCount >= 1) {
                     base.sctnGrid.selectRow(gridCount - 1);
                  }
                  $state.go('^');

               } else {

                  // Go back to the Sections tab
                  $state.go('^');
               }
            } else {
               // Update the data displayed in the Sections grid
               var indx = base.sectionResults.indexOf(base.sectionSelectedRecord);
               data.sctncode = base.sectionSelectedRecord.sctncode;

               Utils.replaceObject(base.sectionResults[indx], data);

               $state.go('^');
               base.sctnGrid.updateRow(indx);
            }

         }
      });
   };

});

app.controller('VaetSectionSpecCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.sectionSpec = {};

   // Set the screen title based on the VA order section
   self.detailSubTitle = base.sectionSubTitle();

   // Get the specification data for the selected section
   var iVano = 0;
   var iVasuf = 0;
   var iSeqno = 0;

   if (base.sectionSelectedRecord) {
      iVano = base.sectionSelectedRecord.vano;
      iVasuf = base.sectionSelectedRecord.vasuf;
      iSeqno = base.sectionSelectedRecord.seqno;

   } else {
      iVano = base.sectionUpdateRecord.vano;
      iVasuf = base.sectionUpdateRecord.vasuf;
      iSeqno = base.sectionUpdateRecord.seqno;
   }

   DataService.get('api/va/asvasection/vasectionspecinitialize/' + iVano + '/' + iVasuf + '/' + iSeqno, function (data) {
      if (data) {
         self.sectionSpec = data;
      }
   });

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {

      // Save the specification data entered
      DataService.post('api/va/asvasection/vasectionspecupdate', { data: self.sectionSpec, busy: true }, function (data) {
         if (data) {
            self.sectionSpec = data;
            $state.go('^');
         }
      });
   };

});

app.controller('VaetAutoCreateCtrl', function ($scope, $state, DataService) {
   var self = this;
   var base = $scope.base;
   var sctnextex = $scope.sctnextex;
   self.sectionCodes = [];

   // Get the codes set up in SASTT for the Inventory Component (IN) section type
   DataService.get('api/va/vast/listbydescrip?codeiden=IN', { busy: true }, function (data) {
      if (data) {
         self.sectionCodes = data;
      }
   });

   self.submit = function () {

      DataService.get('api/va/asvasection/vasectionautocreate/' + base.sectionAuto.vano + '/' + base.sectionAuto.vasuf + '/' + base.sectionAuto.seqno + '/' + base.sectionAuto.sctncode, function (data) {
         if (data) {
            base.retrieveSectionsList();
            $state.go('^');
            sctnextex.sectionAutoCreateModal.destroy();
         }
      });

   };

   self.cancel = function () {
      $state.go('^');
      sctnextex.sectionAutoCreateModal.destroy();
   };
});

app.controller('VaetSectionRevLaborCtrl', function ($scope, $state, DataService, GridService, MessageService, ModalService, Utils) {
   var self = this;
   var base = $scope.base;
   var noData = '';

   self.revSubTitle = base.sectionSubTitle();

   self.reviewCriteria = {
      vano: base.sectionSelectedRecord.vano,
      vasuf: base.sectionSelectedRecord.vasuf,
      seqno: base.sectionSelectedRecord.seqno,
      functionnm: 'vaet'
   };

   self.activeLines = false;
   self.laborReview = null;
   self.laborReviewTotals = null;
   self.laborSelectedRecord = null;

   self.sectionFormatter = function (row, cell, value, column, item) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   self.timeTypeFormatter = function (row, cell, value, column, item) {
      if (value) {

         if (value.toLowerCase() === 'a') {
            return MessageService.get('global.actual');
         } else {
            return MessageService.get('global.estimated');
         }

      } else {
         return value;
      }
   };

   self.canSeeCost = function (row, cell, value, column, item) {
      if (item.seecostfl) {
         return true;
      } else {
         return false;
      }
   };

   // Prepare data for display
   self.loadFields = function () {
      self.laborReview.forEach(function (review) {
         if (review.timeactty.toLowerCase() === 'e') {
            review.infotext = MessageService.get('message.star.estimated');
         } else {
            review.infotext = '';
            self.activeLines = true;
         }
         review.esttimetext = Utils.pad(review.hours, 2) + ":" + Utils.pad(review.minutes, 2);
      });
   };

   // Get the data to be used in the section labor line review
   DataService.post('api/va/asvasection/vareviewlaborretrieve', { data: self.reviewCriteria, busy: true }, function (data) {
      if (data) {

         if (!MessageService.processMessaging(data.messaging)) {
            self.laborReview = data.valinelaborreview;
            self.laborReviewTotals = data.valinelaborreviewtotals;
            self.loadFields();
         }

      }
   });

   self.laborInfo = function () {
      $state.go('vaet.detail.sectionreviewlabor.info');
   };

   self.laborExtend = function () {
      $state.go('vaet.detail.sectionreviewlabor.extend');
   };

   // When a row is selected, get the data for the section and populate the line data
   self.setCurrentLaborLine = function () {
      self.laborSelectedRecord = GridService.getSelectedRecord(self.grid);
   };

   self.submit = function () {
      var updateCriteria = {
         valinelaborreview: self.laborReview,
         valinelaborreviewcriteria: self.reviewCriteria,
         valinelaborreviewtotals: self.laborReviewTotals,
         cThisFunction: 'vaet'
      };

      // If estimated labor lines exist with actual labor lines, prompt the user how to proceed
      if (self.laborReviewTotals.completeestimatedcost || self.laborReviewTotals.unitestimatedcost || self.laborReviewTotals.controlledestimatedcost && self.activeLines === true) {
         MessageService.yesNo('global.question', 'question.there.are.estimated.costs.when.actual.cost.lines.e',
            function () {
               // Yes processing
               DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updateCriteria, busy: true }, function (data) {
                  if (!MessageService.processMessaging(data)) {
                     ModalService.showModal('va/vaet/tabs/sections/section-complete.json', 'VaetSectionCompleteCtrl as comp', $scope, function (modal) {
                        base.sectionCompleteModal = modal;
                     });
                  }
               });
            });
      } else {
         DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updateCriteria, busy: true }, function (data) {
            if (!MessageService.processMessaging(data)) {
               ModalService.showModal('va/vaet/tabs/sections/section-complete.json', 'VaetSectionCompleteCtrl as comp', $scope, function (modal) {
                  base.sectionCompleteModal = modal;
               });
            }

         });
      }

   };

   self.cancel = function () {
      $state.go('^');
   };
});

app.controller('VaetSectionLaborExtendCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;
   var sctnrev = $scope.sctnrev;

   self.extSubTitle = base.lineSubTitle(sctnrev.laborSelectedRecord.lineno);

   // Extended labor line data is read-only from the section - review labor lines screen

   self.submit = function () {
      $state.go('^');
   };

});

app.controller('VaetSectionLaborInfoCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   var sctnrev = $scope.sctnrev;

   self.infSubTitle = base.lineSubTitle(sctnrev.laborSelectedRecord.lineno);

   self.changeProduct = function () {
      // If the new data is valid, commit the changes and return to labor review screen
      var productCriteria = {
         valinelaborreview: sctnrev.laborSelectedRecord,
         valinelaborreviewcriteria: sctnrev.reviewCriteria,
         valinelaborreviewtotals: sctnrev.laborReviewTotals,
         cFieldName: 'shipprod'
      };

      DataService.post('api/va/asvasection/vareviewlaborleavefield', { data: productCriteria, busy: true }, function (data) {
         if (data) {
            sctnrev.laborSelectedRecord = data.valinelaborreview;
         }
      });

   };

   self.updateLabor = function () {
      // If the new data is valid, commit the changes and return to labor review screen
      var updateCriteria = {
         valinelaborreview: sctnrev.laborReview,
         valinelaborreviewcriteria: sctnrev.reviewCriteria,
         valinelaborreviewtotals: sctnrev.laborReviewTotals,
         cThisFunction: 'vaet'
      };

      DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            // If labor has changed, need to indicate the header should be redisplayed if the Header tab is accessed again
            dtl.headerUpdateNeeded = true;

            $state.go('^');
         }
      });

   };

   self.validateLabor = function () {
      // Validate the new labor data
      var validateCriteria = {
         valinelaborreview: self.tempRecord,
         valinelaborreviewcriteria: sctnrev.reviewCriteria,
         valinelaborreviewtotals: sctnrev.laborReviewTotals
      };

      DataService.post('api/va/asvasection/vareviewlaborvalidate', { data: validateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {

            self.updateLabor();

         }
         sctnrev.laborSelectedRecord = self.tempRecord;
      });
   };

   self.submit = function () {

      // Losing the screen data if an error occurs in the validate SI call. Store off the data.
      self.tempRecord = sctnrev.laborSelectedRecord;

      var calcCriteria = {
         valinelaborreview: sctnrev.laborReview,
         valinelaborreviewcriteria: sctnrev.reviewCriteria
      };

      DataService.post('api/va/asvasection/vareviewlaborcalculatetotals', { data: calcCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data sets based upon the new labor information
            if (!MessageService.processMessaging(data.messaging)) {
               sctnrev.laborReview = data.valinelaborreview;
               sctnrev.laborReviewTotals = data.valinelaborreviewtotals;
               sctnrev.loadFields();

               self.validateLabor();

            }

         }

      });

   };

   self.cancel = function () {
      sctnrev.loadFields();
      $state.go('^');
   };
});

app.controller('VaetSectionCompleteCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   // Set the screen title based on the VA order section
   self.subTitle = base.sectionSubTitle();

   self.submit = function () {

      DataService.post('api/va/asvasection/vasectioncomplete', { data: base.sectionCompleteRecord, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            // If section completed, need to indicate the header should be redisplayed if the Header tab is accessed again
            dtl.headerUpdateNeeded = true;

            base.retrieveSectionsList();
            $state.go('vaet.detail');
            base.sectionCompleteModal.destroy();

         }

      });

   };

   self.cancel = function () {
      $state.go('^');
      base.sectionCompleteModal.destroy();
   };
});

app.controller('VaetSectionSourcingCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Set the screen title based on the VA order section
   self.detailSubTitle = base.sectionSubTitle();

   self.backtieSourcing = function () {

      // Pass all the lines for the selected section
      base.lineSelectedRecord = base.lineList;
      var changeCriteria = {
         valinelistresults: base.lineSelectedRecord,
         valinelinetie: base.sectionSourcingRecord
      };

      DataService.post('api/va/asvaline/valinebacktieretrieve', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Get the data for the back tie
            if (!MessageService.processMessaging(data.messaging)) {
               base.lineSourcingRecord = data.valinelinetie;
               base.sectionSourcingRecord = data.valinelinetie;
               $state.go('vaet.detail.linesourcing.linebacktie');
            }

         }
      });
   };

   self.buildOrderTypes = function () {
      var returnedTypes = [];
      self.orderTypes = [];

      // Get an array of the order type values returned by the service interface call
      returnedTypes = base.sectionSourcingRecord.ordertypelist.split(',');

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
         valinelinetie: base.sectionSourcingRecord,
         pvVano: base.sectionSelectedRecord.vano,
         pvVasuf: base.sectionSelectedRecord.vasuf,
         pvSeqno: base.sectionSelectedRecord.seqno,
         pvFieldname: chgField
      };

      DataService.post('api/va/asvasection/vasectiontieleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            if (!MessageService.processMessaging(data.messaging)) {
               base.sectionSourcingRecord = data.valinelinetie;
            }

         }
      });
   };

   self.submit = function () {
      var updateCriteria = {
         valinelinetie: base.sectionSourcingRecord,
         pvVano: base.sectionSelectedRecord.vano,
         pvVasuf: base.sectionSelectedRecord.vasuf,
         pvSeqno: base.sectionSelectedRecord.seqno
      };

      DataService.post('api/va/asvasection/vasectiontieupdate', { data: updateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            $state.go('^');
         }
      });
   };

   self.cancel = function () {
      $state.go('^');
   };

});

app.controller('VaetSectionCustomCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var cust = $scope.cust;
   var item = cust.rowParams.item;
   var grid = cust.rowParams.grid;
   var row = cust.rowParams.row;

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {

      DataService.put('api/va/vaes', { data: self.vaes, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // Collapse current row
         grid.toggleRowDetail(row);
      });

   };

   self.getVaes = function () {
      if (item) {
         var params = { vano: item.vano, vasuf: item.vasuf, seqno: item.seqno, fillmode: true };
         DataService.get('api/va/vaes/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.vaes = data;
            }
         });
      }
   };

   self.getVaes();

});