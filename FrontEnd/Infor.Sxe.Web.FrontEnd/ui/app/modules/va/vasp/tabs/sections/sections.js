
app.controller('VaspSectionsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.isExtendEnabled = false;

   base.retrieveSectionsList();

   self.create = function () {

      var nextSectionCriteria = {
         prod: base.selectedVasp.shipprod,
         whse: base.selectedVasp.whse,
         vaverno: base.selectedVasp.verno
      };

      // Make sure that a new section can be created before taking the user to the screen
      DataService.post('api/va/asvasetup/vaspsectionnextsctn', { data: nextSectionCriteria, busy: true }, function (data) {
         if (data) {
            base.nextSection = data.nextseqno <= 0 ? 1 : data.nextseqno;

            $state.go('vasp.detail.sections-create');
         }
      });

   };

   self.sectionFinalDelete = function (record) {
      var vaspSectionDelete = { rowidVasps: record.rowid };

      DataService.post('api/va/asvasetup/vaspsectiondelete', { data: vaspSectionDelete, busy: true }, function () {

         // Redisplay the Sections grid after deleting the section
         base.retrieveSectionsList();

         // Redisplay the Additional Details grid after removing the lines associated with the deleted section
         dtl.loadVasp();
      });

   };

   self.deleteSection = function () {
      var record = GridService.getSelectedRecord(self.sectionsGrid);

      if (record) {

         MessageService.yesNo('global.question', 'question.confirm.delete',
            function () {
               // Yes processing
               self.sectionFinalDelete(record);
            });

      }
   };

   self.detail = function (isExtend) {
      base.selectedSectionsRecord = GridService.getSelectedRecord(self.sectionsGrid);

      if (base.selectedSectionsRecord) {
         base.changeSectionCustom();

         if (isExtend) {
            switch (base.selectedSectionsRecord.sctntype.toUpperCase()) {
               case base.IN_SECTION_TYPE:                                                                                               //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(false, true, 'vasp.detail.sections-extend',                                             //ignore jslint - correct indentation
                     MessageService.get('global.inventory.components.extended.information.for.seq'), base.selectedSectionsRecord);      //ignore jslint - correct indentation
                  break;                                                                                                                //ignore jslint - correct indentation

               case base.EX_SECTION_TYPE:                                                                                               //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(false, true, 'vasp.detail.sections-extend',                                             //ignore jslint - correct indentation
                     MessageService.get('global.external.process.extended.information.for.seq.number'), base.selectedSectionsRecord);   //ignore jslint - correct indentation
                  break;                                                                                                                //ignore jslint - correct indentation

               case base.IT_SECTION_TYPE:                                                                                               //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(false, true, 'vasp.detail.sections-extend',                                             //ignore jslint - correct indentation
                     MessageService.get('global.internal.process.extended.information.for.seq.number'), base.selectedSectionsRecord);   //ignore jslint - correct indentation
                  break;                                                                                                                //ignore jslint - correct indentation

               case base.IS_SECTION_TYPE:                                                                                               //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(false, true, 'vasp.detail.sections-extend',                                             //ignore jslint - correct indentation
                     MessageService.get('global.inspection.process.extended.information.for.seq.number'), base.selectedSectionsRecord); //ignore jslint - correct indentation
                  break;                                                                                                                //ignore jslint - correct indentation
            }
         }
         else {
            base.showSectionsDetailScreen(false, false, 'vasp.detail.sections-specific',
               MessageService.get('global.specifications.instructions.for.seq.number'), base.selectedSectionsRecord);
         }
      }
   };

   self.sectionTypeFormatter = function (row, cell, value, column, item) {
      if (value) {
         switch (value.toUpperCase()) {
            case base.IN_SECTION_TYPE:                                     //ignore jslint - correct indentation
               return MessageService.get('global.inventory.component');    //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation

            case base.EX_SECTION_TYPE:                                     //ignore jslint - correct indentation
               return MessageService.get('global.external');               //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation

            case base.IT_SECTION_TYPE:                                     //ignore jslint - correct indentation
               return MessageService.get('global.internal');               //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation

            case base.IS_SECTION_TYPE:                                     //ignore jslint - correct indentation
               return MessageService.get('global.inspection');             //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation

            case base.SP_SECTION_TYPE:                                     //ignore jslint - correct indentation
               return MessageService.get('global.specification');          //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation

            case base.II_SECTION_TYPE:                                     //ignore jslint - correct indentation
               return MessageService.get('global.inventory.in');           //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation

            default:                                                       //ignore jslint - correct indentation
               return value;                                               //ignore jslint - correct indentation
         }
      }
      else {
         return value;
      }
   };

   self.onRowSelected = function () {
      base.selectedSectionsRecord = GridService.getSelectedRecord(self.sectionsGrid);

      if (base.selectedSectionsRecord) {
         base.changeSectionCustom();

         switch (base.selectedSectionsRecord.sctntype.toUpperCase()) {
            case base.IN_SECTION_TYPE:                                     //ignore jslint - correct indentation
            case base.EX_SECTION_TYPE:                                     //ignore jslint - correct indentation
            case base.IT_SECTION_TYPE:                                     //ignore jslint - correct indentation
            case base.IS_SECTION_TYPE:                                     //ignore jslint - correct indentation
               self.isExtendEnabled = true;                                //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation

            default:                                                       //ignore jslint - correct indentation
               self.isExtendEnabled = false;                               //ignore jslint - correct indentation
               break;                                                      //ignore jslint - correct indentation
         }

         base.retrieveLineItemsList();
      }
      else {
         self.isExtendEnabled = false;
      }
   };

});

app.controller('VaspSectionsCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.vaspSectionRowUpdate = {};
   self.sectionCodes = [];

   self.retrieveSectionCodes = function (typeValue) {
      DataService.get('api/va/vast/listbydescrip?codeiden=' + typeValue, { busy: true }, function (data) {
         if (data) {
            self.sectionCodes = data;
         }
      });
   };

   self.vaspSectionRowUpdate = {
      dseqno: base.nextSection,
      sctntype: base.SP_SECTION_TYPE
   };

   self.retrieveSectionCodes(base.SP_SECTION_TYPE);

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.reset = function () {
      self.vaspSectionRowUpdate.sctntype = base.SP_SECTION_TYPE;
      self.vaspSectionRowUpdate.sctncode = '';
   };

   self.submit = function () {

      var vaspSectionAddSctn = {
         shipprod: base.selectedVasp.shipprod,
         whse: base.selectedVasp.whse,
         verno: base.selectedVasp.verno,
         seqno: self.vaspSectionRowUpdate.dseqno,
         sctntype: self.vaspSectionRowUpdate.sctntype,
         sctncode: self.vaspSectionRowUpdate.sctncode
      };

      DataService.post('api/va/asvasetup/vaspsectionaddsctn', { data: vaspSectionAddSctn, busy: true }, function (data) {
         if (data) {
            switch (data.sctntype.toUpperCase()) {
               case base.IN_SECTION_TYPE:                                                                         //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(true, true, 'vasp.detail.sections-extend',                        //ignore jslint - correct indentation
                     MessageService.get('global.inventory.components.extended.information.for.seq'), data);       //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation

               case base.EX_SECTION_TYPE:                                                                         //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(true, true, 'vasp.detail.sections-extend',                        //ignore jslint - correct indentation
                     MessageService.get('global.external.process.extended.information.for.seq.number'), data);    //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation

               case base.IT_SECTION_TYPE:                                                                         //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(true, true, 'vasp.detail.sections-extend',                        //ignore jslint - correct indentation
                     MessageService.get('global.internal.process.extended.information.for.seq.number'), data);    //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation

               case base.IS_SECTION_TYPE:                                                                         //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(true, true, 'vasp.detail.sections-extend',                        //ignore jslint - correct indentation
                     MessageService.get('global.inspection.process.extended.information.for.seq.number'), data);  //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation

               case base.SP_SECTION_TYPE:                                                                         //ignore jslint - correct indentation
                  base.showSectionsDetailScreen(true, false, 'vasp.detail.sections-specific',                     //ignore jslint - correct indentation
                     MessageService.get('global.specifications.instructions.for.seq.number'), data);              //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
            }
         }
      });

   };

   self.sectionTypeChanged = function () {

      switch (self.vaspSectionRowUpdate.sctntype.toUpperCase()) {
         case base.IN_SECTION_TYPE:                                  //ignore jslint - correct indentation
            self.retrieveSectionCodes(base.IN_SECTION_TYPE);         //ignore jslint - correct indentation
            break;                                                   //ignore jslint - correct indentation

         case base.EX_SECTION_TYPE:                                  //ignore jslint - correct indentation
            self.retrieveSectionCodes(base.EX_SECTION_TYPE);         //ignore jslint - correct indentation
            break;                                                   //ignore jslint - correct indentation

         case base.IT_SECTION_TYPE:                                  //ignore jslint - correct indentation
            self.retrieveSectionCodes(base.IT_SECTION_TYPE);         //ignore jslint - correct indentation
            break;                                                   //ignore jslint - correct indentation

         case base.IS_SECTION_TYPE:                                  //ignore jslint - correct indentation
            self.retrieveSectionCodes(base.IS_SECTION_TYPE);         //ignore jslint - correct indentation
            break;                                                   //ignore jslint - correct indentation

         case base.SP_SECTION_TYPE:                                  //ignore jslint - correct indentation
            self.retrieveSectionCodes(base.SP_SECTION_TYPE);         //ignore jslint - correct indentation
            break;                                                   //ignore jslint - correct indentation

         case base.II_SECTION_TYPE:                                  //ignore jslint - correct indentation
            self.retrieveSectionCodes(base.II_SECTION_TYPE);         //ignore jslint - correct indentation
            break;                                                   //ignore jslint - correct indentation

         default:                                                    //ignore jslint - correct indentation
            self.retrieveSectionCodes(base.IN_SECTION_TYPE);         //ignore jslint - correct indentation
      }

   };

});

app.controller('VaspSectionsDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, ModalService, UtilsData) {
   var self = this;
   var base = $scope.base;

   self.vaSectionSpec = {};
   self.vaspSectionSpecCriteria = {};
   self.vaspSectionSpecUpdate = {};
   self.vaspSectionExtendIN = {};
   self.vaspSectionExtendEX = {};
   self.printTypes = [];
   self.isContinueClicked = false;

   self.isAddMode = $stateParams.isAddMode;
   self.selectedRecord = $stateParams.selectedRecord;
   self.selectedRowID = (self.isAddMode) ? $stateParams.selectedRecord.rowidVasps : -1;
   self.sctntype = (self.selectedRecord) ? self.selectedRecord.sctntype.toUpperCase() : '';
   self.title = $stateParams.title;
   self.subTitle = $stateParams.subTitle;
   self.displayExtend = $stateParams.isExtend;

   self.loadData = function () {

      switch (self.sctntype) {
         case base.IN_SECTION_TYPE:                                                       //ignore jslint - correct indentation
            self.vaspSectionExtendIN = {                                                  //ignore jslint - correct indentation
               vaprod: self.selectedRecord.shipprod,                                      //ignore jslint - correct indentation
               vawhse: self.selectedRecord.whse,                                          //ignore jslint - correct indentation
               seqno: self.selectedRecord.seqno,                                          //ignore jslint - correct indentation
               vaverno: self.selectedRecord.verno                                         //ignore jslint - correct indentation
            };                                                                            //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation

         case base.EX_SECTION_TYPE:                                                       //ignore jslint - correct indentation
         case base.IT_SECTION_TYPE:                                                       //ignore jslint - correct indentation
         case base.IS_SECTION_TYPE:                                                       //ignore jslint - correct indentation
            self.vaspSectionExtendEX = {                                                  //ignore jslint - correct indentation
               vaprod: self.selectedRecord.shipprod,                                      //ignore jslint - correct indentation
               vawhse: self.selectedRecord.whse,                                          //ignore jslint - correct indentation
               seqno: self.selectedRecord.seqno,                                          //ignore jslint - correct indentation
               vaverno: self.selectedRecord.verno                                         //ignore jslint - correct indentation
            };                                                                            //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation

         case base.SP_SECTION_TYPE:                                                       //ignore jslint - correct indentation
            self.vaspSectionSpecCriteria = {                                              //ignore jslint - correct indentation
               prod: self.selectedRecord.shipprod,                                        //ignore jslint - correct indentation
               whse: self.selectedRecord.whse,                                            //ignore jslint - correct indentation
               seqno: self.selectedRecord.seqno,                                          //ignore jslint - correct indentation
               vaverno: self.selectedRecord.verno                                         //ignore jslint - correct indentation
            };                                                                            //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
      }

      //Load Specifications (or) Extend data
      if ($state.current.name === 'vasp.detail.sections-specific') {
         var specUpdateCriteria = {
            prod: self.selectedRecord.shipprod,
            whse: self.selectedRecord.whse,
            vaverno: self.selectedRecord.verno,
            seqno: self.selectedRecord.seqno,
            sctntype: self.selectedRecord.sctntype
         };
         DataService.post('api/va/asvasetup/vaspsectionspecificationinit', { data: specUpdateCriteria, busy: true }, function (data) {
            if (data) {
               self.vaspSectionSpecUpdate = data;
            }
         });

         if (self.sctntype === base.SP_SECTION_TYPE) {
            self.printTypes = [
               { label: MessageService.get('global.external'), value: 'E' },
               { label: MessageService.get('global.internal'), value: 'I' },
               { label: MessageService.get('global.both'), value: 'B' },
               { label: MessageService.get('global.neither'), value: 'N' }
            ];
         }
         else {
            self.printTypes = [
               { label: MessageService.get('global.yes'), value: 'Y' },
               { label: MessageService.get('global.no'), value: 'N' }
            ];
         }
      }
      else {
         if (self.sctntype === base.IN_SECTION_TYPE) {
            DataService.post('api/va/asvasetup/vaspsectionextendininit', { data: self.vaspSectionExtendIN, busy: true }, function (data) {
               if (data) {
                  self.vaspSectionExtendIN = data;
               }
            });
         }
         else {
            if (self.sctntype === base.EX_SECTION_TYPE) {
               self.extWarehouseLabel = MessageService.get('global.warehouse');
            } else if (self.sctntype === base.IT_SECTION_TYPE) {
               self.extWarehouseLabel = MessageService.get('global.internal.processing.warehouse');
            } else {
               self.extWarehouseLabel = MessageService.get('global.inspection.warehouse');
            }

            DataService.post('api/va/asvasetup/vaspsectionextendexinit', { data: self.vaspSectionExtendEX, busy: true }, function (data) {
               if (data) {
                  self.vaspSectionExtendEX = data;
                  if (data.desttype.toLowerCase() === 'f') {
                     self.goalProdLabel = MessageService.get('global.final.product');
                  } else {
                     self.goalProdLabel = MessageService.get('global.intermediate.product');
                  }
               }
            });
         }
      }
   };

   // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function (args) {
      UtilsData.getSastnDescriptionSpecial('R', args.value, function (descrip) {
         if (self.sctntype.toUpperCase() === 'IN') {
            self.vaspSectionExtendIN.refer = descrip;
         } else {
            self.vaspSectionExtendEX.refer = descrip;
         }
      });
   }

   self.reset = function () {
      self.isContinueClicked = false;
      self.loadData();
   };

   self.cancel = function () {
      if (self.isAddMode) {
         var vaspSectionDelete = { seqno: self.selectedRecord.seqno, rowidVasps: self.selectedRowID };

         DataService.post('api/va/asvasetup/vaspsectiondelete', { data: vaspSectionDelete, busy: true }, function () {
            self.navigateToDetail();
         });
      }
      else {
         self.navigateToDetail();
      }
   };

   self.submit = function () {

      // Process based upon Specifications (or) Extend data
      if ($state.current.name === 'vasp.detail.sections-specific') {

         DataService.post('api/va/asvasetup/vaspsectionspecificationupdate', { data: self.vaspSectionSpecUpdate, busy: true }, function () {
            self.navigateToDetail();
         });

      } else {

         switch (self.sctntype) {
            case base.IN_SECTION_TYPE:                                                                                                                    //ignore jslint - correct indentation
               DataService.post('api/va/asvasetup/vaspsectionextendinupdate', { data: self.vaspSectionExtendIN, busy: true }, function (data) {           //ignore jslint - correct indentation
                  self.navigateToDetail();                                                                                                                //ignore jslint - correct indentation
               });                                                                                                                                        //ignore jslint - correct indentation
               break;                                                                                                                                     //ignore jslint - correct indentation

            case base.EX_SECTION_TYPE:                                                                                                                    //ignore jslint - correct indentation
            case base.IT_SECTION_TYPE:                                                                                                                    //ignore jslint - correct indentation
            case base.IS_SECTION_TYPE:                                                                                                                    //ignore jslint - correct indentation
               DataService.post('api/va/asvasetup/vaspsectionextendexupdate', { data: self.vaspSectionExtendEX, busy: true }, function (data) {           //ignore jslint - correct indentation
                  if (self.isAddMode && (self.sctntype === base.EX_SECTION_TYPE) &&                                                                       //ignore jslint - correct indentation
                     (self.vaspSectionExtendEX.vawhse === self.vaspSectionExtendEX.destwhse)) {                                                           //ignore jslint - correct indentation

                     ModalService.showModal('va/vasp/tabs/sections/auto-create.json', 'VaspAutoCreateCtrl as auto', $scope, function (modal) {            //ignore jslint - correct indentation
                        self.sectionAutoCreateModal = modal;                                                                                                 //ignore jslint - correct indentation
                     });                                                                                                                                  //ignore jslint - correct indentation
                  }                                                                                                                                       //ignore jslint - correct indentation
                  else {                                                                                                                                  //ignore jslint - correct indentation
                     self.navigateToDetail();                                                                                                             //ignore jslint - correct indentation
                  }                                                                                                                                       //ignore jslint - correct indentation
               });                                                                                                                                        //ignore jslint - correct indentation
               break;                                                                                                                                     //ignore jslint - correct indentation

         }

      }

   };

   self.extContinue = function () {

      if (self.sctntype === base.IN_SECTION_TYPE) {
         DataService.post('api/va/asvasetup/vaspsectionextendinchg', { data: self.vaspSectionExtendIN, busy: true }, function (data) {
            if (data) {
               self.vaspSectionExtendIN = data;
               self.isContinueClicked = true;
            }
         });
      }
      else {
         DataService.post('api/va/asvasetup/vaspsectionextendexchange', { data: self.vaspSectionExtendEX, busy: true }, function (data) {
            if (data) {
               self.vaspSectionExtendEX = data;
               self.isContinueClicked = true;
               if (data.desttype.toLowerCase() === 'f') {
                  self.goalProdLabel = MessageService.get('global.final.product');
               } else {
                  self.goalProdLabel = MessageService.get('global.intermediate.product');
               }
            }
         });
      }
   };

   self.navigateToDetail = function () {
      base.retrieveSectionsList();
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.loadData();

});

app.controller('VaspSectionsRowDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var sctn = $scope.sctn;

   var item = sctn.rowParams.item;
   var grid = sctn.rowParams.grid;
   var row = sctn.rowParams.row;

   self.vaspSectionRowUpdate = {};
   self.sectionCodes = [];

   if (item) {
      self.vaspSectionRowUpdate = {
         dseqno: item.dseqno,
         rowidVasps: item.rowid,
         sctncode: item.sctncode,
         sctntype: item.sctntype
      };

      DataService.get('api/va/vast/listbydescrip?codeiden=' + item.sctntype, { busy: true }, function (data) {
         if (data) {
            self.sectionCodes = data;
         }
      });
   }

   self.submit = function () {

      DataService.post('api/va/asvasetup/vaspsectionrowupdate', { data: self.vaspSectionRowUpdate, busy: true }, function (data) {

         if (!MessageService.processMessaging(data)) {
            grid.toggleRowDetail(row);
            base.retrieveSectionsList();
         }

      });
   };

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };
});

app.controller('VaspAutoCreateCtrl', function ($scope, $state, DataService) {
   var self = this;
   var base = $scope.base;
   var sctndtl = $scope.sctndtl;

   // Get the codes set up in SASTT for the Inventory Component (IN) section type
   DataService.get('api/va/vast/listbydescrip?codeiden=IN', { busy: true }, function (data) {
      if (data) {
         self.sectionCodes = data;
      }
   });

   self.vaspSectionAutoCrt = {
      shipprod: sctndtl.selectedRecord.shipprod,
      whse: sctndtl.selectedRecord.whse,
      seqno: sctndtl.selectedRecord.seqno,
      codedesc: sctndtl.selectedRecord.codedesc,
      destdesc: sctndtl.selectedRecord.destdesc,
      dseqno: sctndtl.selectedRecord.dseqno,
      notesfl: sctndtl.selectedRecord.notesfl,
      nonstockfl: sctndtl.selectedRecord.nonstockfl,
      sctntype: sctndtl.selectedRecord.sctntype,
      vaassemblyfl: sctndtl.selectedRecord.vaassemblyfl,
      vaassemblyty: sctndtl.selectedRecord.vaassemblyty,
      rowidVasps: sctndtl.selectedRecord.rowid,
      verno: sctndtl.selectedRecord.verno
   };

   self.submit = function () {

      DataService.post('api/va/asvasetup/vaspsectionautocreate', { data: self.vaspSectionAutoCrt, busy: true }, function (data) {
         if (data) {
            base.retrieveSectionsList();
            $state.go('vasp.detail', { header: base.selectedVasp });
            sctndtl.sectionAutoCreateModal.destroy();
         }
      });
   };

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
      sctndtl.sectionAutoCreateModal.destroy();
   };
});