
app.controller('VaspLineitemsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   self.lineitemsGrid = {};

   self.create = function () {
      if (base.selectedSectionsRecord) {
         $state.go('vasp.detail.lineitems-create');
      } else {
         MessageService.error('global.error', 'message.please.select.a.section.before.adding.a.line');
      }
      
   };

   self.onRowSelected = function () {
      base.selectedLineitemsRecord = GridService.getSelectedRecord(self.lineitemsGrid);
      if (base.selectedLineitemsRecord) {
         base.changeLineCustom();
      }
   };

   self.lineFinalDelete = function () {
      var deleteCriteria = {
         seqno: base.selectedLineitemsRecord.seqno,
         rowidVaspsl: base.selectedLineitemsRecord.rowid
      };
      DataService.post('api/va/asvasetup/vasplinedelete', { data: deleteCriteria, busy: true }, function () {
         base.retrieveLineItemsList();
      });
   };

   self.deleteLine = function () {

      if (base.selectedLineitemsRecord) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
            function () {
               // Yes processing
               self.lineFinalDelete();
            });
      }

   };

   self.edit = function () {

      base.selectedLineitemsRecord = GridService.getSelectedRecord(self.lineitemsGrid);

      if (base.selectedLineitemsRecord) {
         base.changeLineCustom();

         $state.go('vasp.detail.lineitems-edit');
      }
   };

   self.extend = function () {

      base.selectedLineitemsRecord = GridService.getSelectedRecord(self.lineitemsGrid);

      if (base.selectedLineitemsRecord) {
         base.changeLineCustom();

         $state.go('vasp.detail.lineitems-extend');
      }
   };

   self.laborInfo = function () {

      base.selectedLineitemsRecord = GridService.getSelectedRecord(self.lineitemsGrid);

      if (base.selectedLineitemsRecord) {
         base.changeLineCustom();

         if (base.selectedLineitemsRecord.sctntype.toUpperCase() === base.EX_SECTION_TYPE) {
            $state.go('vasp.detail.lineitems-extlabor');
         }
         else if ((base.selectedLineitemsRecord.sctntype.toUpperCase() === base.IT_SECTION_TYPE) ||
                  (base.selectedLineitemsRecord.sctntype.toUpperCase() === base.IS_SECTION_TYPE)) {
            $state.go('vasp.detail.lineitems-intlabor');
         }
      }
   };

   self.navigateToIcia = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: base.selectedSectionsRecord.whse }, { reload: 'icia.detail' });
      }
   };
   self.navigateToIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: base.selectedSectionsRecord.whse }, { reload: 'icip.detail' });
      }
   };

});

app.controller('VaspLineitemsCreateCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.vaspLineAdd = {};
   self.radioBtnsEnabled = false;
   self.detailFieldsVisible = false;

   self.initializeLine = function () {
      var addCriteria = {
         vaprod: base.selectedSectionsRecord.shipprod,
         vawhse: base.selectedSectionsRecord.whse,
         vaverno: base.selectedSectionsRecord.verno,
         seqno: base.selectedSectionsRecord.seqno
      };

      DataService.post('api/va/asvasetup/vasplineaddinit', { data: addCriteria, busy: true }, function (data) {
         if (data) {
            self.vaspLineAdd = data;
            self.setLineData();
         }
      });

   };

   self.setLineData = function () {
      self.vaspLineAdd.groupprodty = 2;
      self.vaspLineAdd.qtyneeded = 1;

      if ((self.vaspLineAdd.sctntype.toUpperCase() === base.IN_SECTION_TYPE) ||
          (self.vaspLineAdd.sctntype.toUpperCase() === base.II_SECTION_TYPE)) {

         self.radioBtnsEnabled = true;
      }
      else {

         self.radioBtnsEnabled = false;
      }

      if ((self.vaspLineAdd.groupprodty === 2) && self.vaspLineAdd.vafabfl &&
          (self.vaspLineAdd.sctntype.toUpperCase() === base.IN_SECTION_TYPE)) {

         self.detailFieldsVisible = true;
      }
      else {

         self.detailFieldsVisible = false;
      }


      if ((self.vaspLineAdd.sctntype.toUpperCase() === base.IT_SECTION_TYPE) ||
          (self.vaspLineAdd.sctntype.toUpperCase() === base.II_SECTION_TYPE) ||
          (self.vaspLineAdd.sctntype.toUpperCase() === base.IS_SECTION_TYPE)) {

         self.vaspLineAdd.qtybasetotfl = false;
      }
      else {

         self.vaspLineAdd.qtybasetotfl = true;
      }
   };

   self.leaveField = function (fieldName) {
      if (self.vaspLineAdd.shipprod) {
         var iGroupProductType = self.vaspLineAdd.groupprodty;
         var criteria = {
            vasplineadd: self.vaspLineAdd,
            cFieldName: fieldName
         };

         DataService.post('api/va/asvasetup/vasplineaddleavefield', { data: criteria, busy: true }, function (data) {
            self.vaspLineAdd = data.vasplineadd;
            self.vaspLineAdd.groupprodty = iGroupProductType;
         });
      }
   };

   self.nonStockTypeChanged = function () {
      if (self.vaspLineAdd.nonstockty.toUpperCase() === 'N') {
         base.linenonstockadd = true;
         $state.go('vasp.detail.lineitems-create.nonstock');
      }
   };

   self.submit = function () {
      DataService.post('api/va/asvasetup/vasplineaddline', { data: self.vaspLineAdd, busy: true }, function (data) {
         if (data) {
            var newSelectedLineitemsRecord = {
               vawhse: self.vaspLineAdd.vawhse,
               vaverno: self.vaspLineAdd.vaverno,
               seqno: self.vaspLineAdd.seqno,
               lineno: data.vasplineadd.lineno
            };

            if ((self.vaspLineAdd.sctntype.toUpperCase() === base.IT_SECTION_TYPE) && (data.vasplineadd.icspstatus.toLowerCase() === 'l')) {
               $state.go('vasp.detail.lineitems-intlabor', { newSelectedLineitemsRecord: newSelectedLineitemsRecord });
            }
            else if ((self.vaspLineAdd.sctntype.toUpperCase() === base.EX_SECTION_TYPE) && (data.vasplineadd.icspstatus.toLowerCase() === 'l')) {
               $state.go('vasp.detail.lineitems-extlabor', { newSelectedLineitemsRecord: newSelectedLineitemsRecord });
            }
            else {
               base.retrieveLineItemsList();

               $state.go('vasp.detail', { header: base.selectedVasp });
            }
         }
      });
   };

   self.reset = function () {
      self.initializeLine();
   };

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.initializeLine();

});

app.controller('VaspLineitemsEditCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.vaspLineChange = {};

   if (base.selectedLineitemsRecord) {
      var lineParams = {
         vaprod: base.selectedLineitemsRecord.vaprod,
         vawhse: base.selectedLineitemsRecord.vawhse,
         vaverno: base.selectedLineitemsRecord.vaverno,
         seqno: base.selectedLineitemsRecord.seqno,
         lineno: base.selectedLineitemsRecord.lineno
      };

      DataService.get('api/va/asvasetup/vasplinechangeinit', { params: lineParams, busy: true }, function (data) {
         if (data) {
            self.vaspLineChange = data;
         }
      });
   }

   self.changeFab = function () {
      DataService.post('api/va/asvasetup/vasplineleavefab', { data: self.vaspLineChange, busy: true }, function (data) {
         if (data) {
            self.vaspLineChange = data;
         }
      });
   };

   self.changeLineType = function () {
      DataService.post('api/va/asvasetup/vasplineleavefab', { data: self.vaspLineChange, busy: true }, function (data) {
         if (data) {
            self.vaspLineChange = data;
         }
      });

      if (self.vaspLineChange.nonstockty.toLowerCase() === 'n') {
         base.linenonstockadd = false;
         $state.go('vasp.detail.lineitems-edit.nonstock');
      }
   };

   self.changeProduct = function () {
      DataService.post('api/va/asvasetup/vasplineleaveprod', { data: self.vaspLineChange, busy: true }, function (data) {
         if (data) {

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            self.vaspLineChange = data.vasplinechange;
         }
      });
   };

   self.changeUnit = function () {
      DataService.post('api/va/asvasetup/vasplineleaveunit', { data: self.vaspLineChange, busy: true }, function (data) {
         if (data) {
            self.vaspLineChange = data;
         }
      });
   };

   self.submit = function () {
      DataService.post('api/va/asvasetup/vasplinechange', { data: self.vaspLineChange, busy: true }, function () {
         base.retrieveLineItemsList();
         $state.go('^');
      });
   };

   self.cancel = function () {
      $state.go('^');
   };
});

app.controller('VaspLineitemsNonStockCtrl', function ($scope, $state) {
   var self = this;
   var linecr = $scope.linecr;

   // Control the behavior based upon adding a line or maintaining a line
   self.vaspLineAdd = linecr.vaspLineAdd;


   self.cancel = function () {
      $state.go('vasp.detail.lineitems-create');
   };

   self.nonstockDetailsValueAddControlDoneCallback = function (data) {

      // Take the data returned from the Non-stock screen and load it for use by the Edit screen
      linecr.vaspLineAdd.arpprodline = data.arpprodline;
      linecr.vaspLineAdd.arpvendno = data.arpvendno;
      linecr.vaspLineAdd.arpwhse = data.arpwhse;
      linecr.vaspLineAdd.cubes = data.cubes;
      linecr.vaspLineAdd.nonstockty = data.nonstockty;
      linecr.vaspLineAdd.prodcat = data.prodcat;
      linecr.vaspLineAdd.prodcost = data.prodcost;
      linecr.vaspLineAdd.proddesc = data.proddesc;
      linecr.vaspLineAdd.proddesc2 = data.proddesc2;
      linecr.vaspLineAdd.rushfl = data.rushfl;
      linecr.vaspLineAdd.shipprod = data.shipprod;
      linecr.vaspLineAdd.weight = data.weight;

      $state.go('vasp.detail.lineitems-create');
   };

   self.submit = function () {
      self.nonstockDetailsValueAddControl.save();
   };

});

app.controller('VaspLineitemsEditNonStockCtrl', function ($scope, $state) {
   var self = this;
   var lineedit = $scope.lineedit;

   // Control the behavior based upon adding a line or maintaining a line
   self.vaspLineChange = lineedit.vaspLineChange;

   self.cancel = function () {
      $state.go('vasp.detail.lineitems-edit');
   };

   self.nonstockDetailsValueAddControlDoneCallback = function (data) {

      // Take the data returned from the Non-stock screen and load it for use by the Edit screen
      lineedit.vaspLineChange.arpprodline = data.arpprodline;
      lineedit.vaspLineChange.arpvendno = data.arpvendno;
      lineedit.vaspLineChange.arpwhse = data.arpwhse;
      lineedit.vaspLineChange.cubes = data.cubes;
      lineedit.vaspLineChange.nonstockty = data.nonstockty;
      lineedit.vaspLineChange.prodcat = data.prodcat;
      lineedit.vaspLineChange.prodcost = data.prodcost;
      lineedit.vaspLineChange.proddesc = data.proddesc;
      lineedit.vaspLineChange.proddesc2 = data.proddesc2;
      lineedit.vaspLineChange.rushfl = data.rushfl;
      lineedit.vaspLineChange.shipprod = data.shipprod;
      lineedit.vaspLineChange.weight = data.weight;

      $state.go('vasp.detail.lineitems-edit');
   };

   self.submit = function () {
      self.nonstockDetailsValueAddControl.save();
   };

});

app.controller('VaspLineitemsExtendCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.vaspLineChange = {};
   self.isCostEnabled = false;

   self.loadExtendedInfo = function () {
      if (base.selectedLineitemsRecord) {
         var extendParams = {
            vaprod: base.selectedLineitemsRecord.vaprod,
            vawhse: base.selectedLineitemsRecord.vawhse,
            vaverno: base.selectedLineitemsRecord.vaverno,
            seqno: base.selectedLineitemsRecord.seqno,
            lineno: base.selectedLineitemsRecord.lineno
         };

         DataService.get('api/va/asvasetup/vasplinechangeinit', { params: extendParams, busy: true }, function (data) {
            if (data) {
               self.vaspLineChange = data;
               self.initializeFields();
            }
         });
      }
   };

   self.initializeFields = function () {
      switch (self.vaspLineChange.nonstockty.toUpperCase()) {
         case 'N':                                                                     //ignore jslint - correct indentation
            self.vaspLineChange.linetype = MessageService.get('global.non.stock');     //ignore jslint - correct indentation
            break;                                                                     //ignore jslint - correct indentation

         case 'S':                                                                     //ignore jslint - correct indentation
            self.vaspLineChange.linetype = MessageService.get('global.special');       //ignore jslint - correct indentation
            break;                                                                     //ignore jslint - correct indentation

         default:                                                                      //ignore jslint - correct indentation
            self.vaspLineChange.linetype = MessageService.get('global.stock');         //ignore jslint - correct indentation
            break;                                                                     //ignore jslint - correct indentation
      }

      if ((self.vaspLineChange.sctntype.toUpperCase() === base.IN_SECTION_TYPE) && (self.vaspLineChange.nonstockty.toUpperCase() !== 'N') && (self.vaspLineChange.nonstockty.toUpperCase() !== 'S')) {
         self.isCostEnabled = false;
      }
      else {
         self.isCostEnabled = true;
      }

      self.vaspLineChange.descr = self.vaspLineChange.proddesc + ' ' + self.vaspLineChange.proddesc2;
   };

   self.submit = function () {
      DataService.post('api/va/asvasetup/vasplineextendupdate', { data: self.vaspLineChange, busy: true }, function () {
         base.retrieveLineItemsList();
         $state.go('vasp.detail', { header: base.selectedVasp });
      });
   };

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.loadExtendedInfo();

});

app.controller('VaspLineitemsIntLaborCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   var newSelectedLineitemsRecord = $stateParams.newSelectedLineitemsRecord;
   self.vaspLineChange = {};
   
   self.loadInternalLaborInfo = function () {
      var laborParams = {};
      if (newSelectedLineitemsRecord) {
         laborParams.vaprod = base.selectedSectionsRecord.shipprod;
         laborParams.vawhse = newSelectedLineitemsRecord.vawhse;
         laborParams.vaverno = newSelectedLineitemsRecord.vaverno;
         laborParams.seqno = newSelectedLineitemsRecord.seqno;
         laborParams.lineno = newSelectedLineitemsRecord.lineno;
      } else {
         laborParams.vaprod = base.selectedSectionsRecord.shipprod;
         laborParams.vawhse = base.selectedLineitemsRecord.vawhse;
         laborParams.vaverno = 0;
         laborParams.seqno = base.selectedLineitemsRecord.seqno;
         laborParams.lineno = base.selectedLineitemsRecord.lineno;

      }

      DataService.get('api/va/asvasetup/vasplinechangeinit', { params: laborParams, busy: true }, function (data) {
         if (data) {
            self.vaspLineChange = data;
         }
      });
   };

   self.submit = function () {
      DataService.post('api/va/asvasetup/vasplineinlaborupdate', { data: self.vaspLineChange, busy: true }, function (data) {
         if (data) {
            base.retrieveLineItemsList();
            $state.go('vasp.detail', { header: base.selectedVasp });
         }
      });
   };

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.loadInternalLaborInfo();

});

app.controller('VaspLineitemsExtLaborCtrl', function ($scope, $state, $stateParams, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   var line = $scope.line;
   var newSelectedLineitemsRecord = $stateParams.newSelectedLineitemsRecord;
   self.vaspLineChange = {};

   self.loadExternalLaborInfo = function () {
      var laborParams = {};
      if (newSelectedLineitemsRecord) {
         laborParams.vaprod = base.selectedSectionsRecord.shipprod;
         laborParams.vawhse = newSelectedLineitemsRecord.vawhse;
         laborParams.vaverno = newSelectedLineitemsRecord.vaverno;
         laborParams.seqno = newSelectedLineitemsRecord.seqno;
         laborParams.lineno = newSelectedLineitemsRecord.lineno;
      } else {
         laborParams.vaprod = base.selectedSectionsRecord.shipprod;
         laborParams.vawhse = base.selectedLineitemsRecord.vawhse;
         laborParams.vaverno = base.selectedLineitemsRecord.vaverno;
         laborParams.seqno = base.selectedLineitemsRecord.seqno;
         laborParams.lineno = base.selectedLineitemsRecord.lineno;
      } 

      DataService.get('api/va/asvasetup/vasplinechangeinit', { params: laborParams, busy: true }, function (data) {
         if (data) {
            self.vaspLineChange = data;
         }
      });
   };

   self.submit = function () {
      DataService.post('api/va/asvasetup/vasplineexlaborupdate', { data: self.vaspLineChange, busy: true }, function (data) {
         if (data) {
            base.retrieveLineItemsList();
            $state.go('vasp.detail', { header: base.selectedVasp });
         }
      });
   };

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.loadExternalLaborInfo();
});