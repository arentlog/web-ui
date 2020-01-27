'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('va', 'vasp', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('va', 'vasp');

   $stateProvider.state('vasp.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/detail.json');
            },
            controller: 'VaspDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('vasp.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/create.json');
            },
            controller: 'VaspCreateCtrl as crt'
         }
      }
   });

   $stateProvider.state('vasp.detail.sections-create', {
      url: '/sections-create',
      views: {
         sctnCreate: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/sections/create.json');
            },
            controller: 'VaspSectionsCreateCtrl as sctncr'
         }
      }
   });

   $stateProvider.state('vasp.detail.sections-extend', {
      url: '/sections-extend',
      params: { isAddMode: false, isExtend: false, selectedRecord: null, sctntype: null, title: null, subTitle: null },
      views: {
         sctnExtend: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/sections/detail.json');
            },
            controller: 'VaspSectionsDetailCtrl as sctndtl'
         }
      }
   });

   $stateProvider.state('vasp.detail.sections-specific', {
      url: '/sections-specifications',
      params: { isAddMode: false, isExtend: false, selectedRecord: null, sctntype: null, title: null, subTitle: null },
      views: {
         sctnSpecific: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/sections/detail.json');
            },
            controller: 'VaspSectionsDetailCtrl as sctndtl'
         }
      }
   });

   $stateProvider.state('vasp.detail.lineitems-create', {
      url: '/line-items-create',
      views: {
         lineCreate: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/lineitems/create.json');
            },
            controller: 'VaspLineitemsCreateCtrl as linecr'
         }
      }
   });

   $stateProvider.state('vasp.detail.lineitems-create.nonstock', {
      url: '/non-stock',
      views: {
         nonstock: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/lineitems/non-stock.json');
            },
            controller: 'VaspLineitemsNonStockCtrl as nst'
         }
      }
   });

   $stateProvider.state('vasp.detail.lineitems-edit', {
      url: '/line-items-edit',
      views: {
         lineEdit: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/lineitems/edit.json');
            },
            controller: 'VaspLineitemsEditCtrl as lineedit'
         }
      }
   });

   $stateProvider.state('vasp.detail.lineitems-edit.nonstock', {
      url: '/non-stock',
      views: {
         editNonstock: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/lineitems/edit-non-stock.json');
            },
            controller: 'VaspLineitemsEditNonStockCtrl as editnst'
         }
      }
   });


   $stateProvider.state('vasp.detail.lineitems-extend', {
      url: '/line-items-extend',
      views: {
         lineExtend: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/lineitems/extend.json');
            },
            controller: 'VaspLineitemsExtendCtrl as extend'
         }
      }
   });

   $stateProvider.state('vasp.detail.lineitems-intlabor', {
      url: '/line-items-internal-labor',
      params: {
         newSelectedLineitemsRecord: null
      },
      views: {
         lineIntLabor: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/lineitems/internal-labor.json');
            },
            controller: 'VaspLineitemsIntLaborCtrl as int'
         }
      }
   });

   $stateProvider.state('vasp.detail.lineitems-extlabor', {
      url: '/line-items-external-labor',
      params: {
         newSelectedLineitemsRecord: null
      },
      views: {
         lineExtLabor: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/lineitems/external-labor.json');
            },
            controller: 'VaspLineitemsExtLaborCtrl as ext'
         }
      }
   });

   $stateProvider.state('vasp.detail.assembly-validate', {
      url: '/assembly-validate',
      params: { title: null, segment: null, segno: 0 },
      views: {
         validate: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/assembly/validate.json');
            },
            controller: 'VaspAssemblyValidateCtrl as val'
         }
      }
   });

   $stateProvider.state('vasp.detail.assembly-rule', {
      url: '/assembly-rule',
      params: { title: null, segment: null, segno: 0 },
      views: {
         rule: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vasp/tabs/assembly/rule.json');
            },
            controller: 'VaspAssemblyRuleCtrl as rule'
         }
      }
   });

});

app.controller('VaspBaseCtrl', function ($state, DataService, ConfigService, MessageService, $translate, Sasoo) {
   var self = this;
   var params = {};

   self.criteria = {};
   self.sasoo = Sasoo;
   self.criteria.whse = self.sasoo.whse;
   self.selectedVasp = {};
   self.userObject = 0;

   self.selectedSectionsRecord = {};
   self.selectedSectionData = '';
   self.vaspsectionlistresults = [];
   self.currentSection = 0;
   self.nextSection = 0;

   self.selectedLineitemsRecord = {};
   self.vasplinelistresults = [];
   self.linenonstockadd = false;
   self.currentLine = 0;

   self.isAssemblyTabEnabled = false;
   self.currentSegment = 0;
   self.onSegment = false;

   //Section Types
   self.IN_SECTION_TYPE = "IN";
   self.EX_SECTION_TYPE = "EX";
   self.IT_SECTION_TYPE = "IT";
   self.IS_SECTION_TYPE = "IS";
   self.SP_SECTION_TYPE = "SP";
   self.II_SECTION_TYPE = "II";

   self.isMaster = function () {
      return $state.is('vasp.master');
   };

   self.includesMaster = function () {
      return $state.includes('vasp.master');
   };

   self.isDetail = function () {
      return $state.is('vasp.detail');
   };

   self.includesDetail = function () {
      return $state.includes('vasp.detail');
   };

   self.includesSectionsCreate = function () {
      return $state.is('vasp.detail.sections-create');
   };

   self.includesSectionsExtend = function () {
      return $state.is('vasp.detail.sections-extend');
   };

   self.includesSectionsSpecific = function () {
      return $state.is('vasp.detail.sections-specific');
   };

   self.includesLineItemsCreate = function () {
      return $state.is('vasp.detail.lineitems-create');
   };

   self.includesLineItemsEdit = function () {
      return $state.is('vasp.detail.lineitems-edit');
   };

   self.includesLineItemsNonStock = function () {
      return $state.is('vasp.detail.lineitems-create.nonstock');
   };

   self.includesLineItemsEditNonStock = function () {
      return $state.is('vasp.detail.lineitems-edit.nonstock');
   };

   self.includesLineItemsExtend = function () {
      return $state.is('vasp.detail.lineitems-extend');
   };

   self.includesLineItemsIntLabor = function () {
      return $state.is('vasp.detail.lineitems-intlabor');
   };

   self.includesLineItemsExtLabor = function () {
      return $state.is('vasp.detail.lineitems-extlabor');
   };

   self.includesAssemblyValidate = function () {
      return $state.is('vasp.detail.assembly-validate');
   };

   self.includesAssemblyRule = function () {
      return $state.is('vasp.detail.assembly-rule');
   };

   // Find the VASP records based on the criteria entered
   self.search = function () {

      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();

      DataService.post('api/va/asvasetup/vaspheaderlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.vaspheaderlistresults;
      });
   };

   // Find the sections for the current product default
   self.retrieveSectionsList = function () {
      var vaspSectionListCriteria = {
         seqno: 0,
         rowidVasp: self.selectedVasp.rowid
      };

      DataService.post('api/va/asvasetup/vaspsectionlist', { data: vaspSectionListCriteria, busy: true }, function (data) {
         if (data) {
            self.vaspsectionlistresults = data.vaspsectionlistresults;
         }
      });
   };

   // Find all the lines for the section selected
   self.retrieveLineItemsList = function () {
      var getLinesCriteria = {
         vaprod: self.selectedSectionsRecord.shipprod,
         vawhse: self.selectedSectionsRecord.whse,
         vaverno: self.selectedSectionsRecord.verno,
         seqno: self.selectedSectionsRecord.seqno
      };
      DataService.post('api/va/asvasetup/vasplinelist', { data: getLinesCriteria, busy: true }, function (data) {
         self.currentLine = 0;
         self.vasplinelistresults = data.vasplinelistresults;
         self.selectedSectionData = MessageService.get('global.line.items.for.section.number') + ' ' + self.selectedSectionsRecord.seqno + ' - ' + self.selectedSectionsRecord.codedesc;
      });
   };

   self.showSectionsDetailScreen = function (addMode, isExtend, state, title, record) {
      $state.go(state, {
         isAddMode: addMode,
         isExtend: isExtend,
         selectedRecord: record,
         sctntype: record.sctntype,
         title: title + ' ' + record.dseqno,
         subTitle: $translate.instant('global.code') + ':' + record.sctncode + ' | ' +
                   $translate.instant('global.description') + ':' + record.codedesc
      });
   };

   // If the user selected a line, get the VASPSL or VASPSLV record for that line so the USER fields in the Custom tab can be updated on the correct record
   self.changeLineCustom = function () {
      self.currentLine = self.selectedLineitemsRecord.lineno;

      // Only find the record if Custom tab is currently set to update the USER fields on the line otherwise the record will be found when the user toggles the selection in the Custom tab
      if (self.userObject === 5 || self.userObject === 6) {

         if (self.selectedVasp.verno) {
            if (self.selectedLineitemsRecord) {
               params = {
                  shipprod: self.selectedVasp.shipprod,
                  whse: self.selectedVasp.whse,
                  verno: self.selectedVasp.verno,
                  seqno: self.selectedLineitemsRecord.seqno,
                  lineno: self.selectedLineitemsRecord.lineno,
                  fillmode: true
               };
               DataService.get('api/va/vaspslv/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vaspslv = data;
                     self.userObject = 6;
                  }
               });
            } else {
               self.userObject = 0;
            }
         } else {
            if (self.selectedLineitemsRecord) {
               params = {
                  shipprod: self.selectedVasp.shipprod,
                  whse: self.selectedVasp.whse,
                  seqno: self.selectedLineitemsRecord.seqno,
                  lineno: self.selectedLineitemsRecord.lineno,
                  fillmode: true
               };
               DataService.get('api/va/vaspsl/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vaspsl = data;
                     self.userObject = 5;
                  }
               });
            } else {
               self.userObject = 0;
            }
         }

      }

   };

   // If the user selected a section, get the VASPS or VASPSV record for that section so the USER fields in the Custom tab can be updated on the correct record
   self.changeSectionCustom = function () {
      self.currentSection = self.selectedSectionsRecord.seqno;

      // Only find the record if Custom tab is currently set to update the USER fields on the section otherwise the record will be found when the user toggles the selection in the Custom tab
      if (self.userObject === 3 || self.userObject === 4) {

         if (self.selectedVasp.verno) {
            if (self.selectedSectionsRecord) {
               params = {
                  shipprod: self.selectedVasp.shipprod,
                  whse: self.selectedVasp.whse,
                  verno: self.selectedVasp.verno,
                  seqno: self.selectedSectionsRecord.seqno,
                  fillmode: true
               };
               DataService.get('api/va/vaspsv/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vaspsv = data;
                     self.userObject = 4;
                  }
               });
            } else {
               self.userObject = 0;
            }
         } else {
            if (self.selectedSectionsRecord) {
               params = {
                  shipprod: self.selectedVasp.shipprod,
                  whse: self.selectedVasp.whse,
                  seqno: self.selectedSectionsRecord.seqno,
                  fillmode: true
               };
               DataService.get('api/va/vasps/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vasps = data;
                     self.userObject = 3;
                  }
               });
            } else {
               self.userObject = 0;
            }
         }

      }

   };

   // If the user selected a segment, get the VASPSAS or VASPSASV record for that assembly segment so the USER fields in the Custom tab can be updated on the correct record
   self.changeSegmentCustom = function () {

      // Only find the record if Custom tab is currently set to update the USER fields on the assembly segment otherwise the record will be found when the user toggles the selection in the Custom tab
      if (self.userObject === 9 || self.userObject === 10 || self.onSegment) {

         if (self.selectedVasp.verno) {
            if (self.currentSegment) {
               params = {
                  shipprod: self.selectedVasp.shipprod,
                  whse: self.selectedVasp.whse,
                  verno: self.selectedVasp.verno,
                  segment: self.currentSegment
               };

               // Because it is possible for the user to click on a segment that does not have a VASPSASV record, we need to check to see if a record exists before processing
               DataService.get('api/va/vaspsasv/existsbypk', { params: params, busy: true }, function (exists) {
                  if (exists) {

                     DataService.get('api/va/vaspsasv/getbypk', { params: params, busy: true }, function (data) {
                        if (data) {
                           self.vaspsasv = data;
                           self.userObject = 10;
                        } else {
                           self.userObject = 0;
                        }
                     });

                  } else {
                     self.userObject = 0;
                  }
               });
            } else {
               self.userObject = 0;
            }
         } else {
            if (self.currentSegment) {
               params = {
                  shipprod: self.selectedVasp.shipprod,
                  whse: self.selectedVasp.whse,
                  segment: self.currentSegment
               };

               // Because it is possible for the user to click on a segment that does not have a VASPSAS record, we need to check to see if a record exists before processing
               DataService.get('api/va/vaspsas/existsbypk', { params: params, busy: true }, function (exists) {
                  if (exists) {

                     DataService.get('api/va/vaspsas/getbypk', { params: params, busy: true }, function (data) {
                        if (data) {
                           self.vaspsas = data;
                           self.userObject = 9;
                        } else {
                           self.userObject = 0;
                        }
                     });

                  } else {
                     self.userObject = 0;
                  }
               });
            } else {
               self.userObject = 0;
            }
         }

      }

   };

});

app.controller('VaspSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.whse = base.sasoo.whse;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('vasp.master');
      }

      base.search();
   };
});

app.controller('VaspMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drilldown = function (e, args) {
      base.selectedVasp = args[0].item;
      base.isAssemblyTabEnabled = false;

      if (base.selectedVasp) {

         var params = { prod: base.selectedVasp.shipprod, fldlist: 'vaassemblyty' };

         DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               base.isAssemblyTabEnabled = (data.vaassemblyty.toUpperCase() === 'C') ? true : false;
            }
         });

         var vaspHeader = { seqno: 0, rowidVasp: base.selectedVasp.rowid };

         DataService.post('api/va/asvasetup/vaspheadervalidate', { data: vaspHeader, busy: true }, function () {
            $state.go('^.detail');
         });
      }
   };

   self.create = function () {
      $state.go('^.create');
   };

   self.headerFinalDelete = function (records) {
      records.forEach(function (record) {
         var vaspHeaderDelete = { rowidVasp: record.rowid };

         DataService.post('api/va/asvasetup/vaspheaderdelete', { data: vaspHeaderDelete, busy: true }, function () { });
      });

      base.search();

   };

   self.deleteHeader = function () {
      var records = GridService.getSelectedRecords(base.grid);

      if (records) {

         MessageService.yesNo('global.question', 'question.confirm.delete',
            function () {
               // Yes processing
               self.headerFinalDelete(records);
            });

      }
   };

   self.createNewVersion = function () {
      var oldVersionRecord = GridService.getSelectedRecord(base.grid);

      var newVersionCriteria = {
         pvProd: oldVersionRecord.shipprod,
         pvWhse: oldVersionRecord.whse,
         pvOldverno: oldVersionRecord.verno
      };

      DataService.post('api/va/asvasetup/vaspcreatenewversion', { data: newVersionCriteria, busy: true }, function (data) {
         if (data) {
            base.criteria.prod = oldVersionRecord.shipprod;
            base.criteria.whse = oldVersionRecord.whse;
            base.criteria.verno = data;

            base.search();

         }
      });

   };

   self.navigateToIcip = function (e,args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod });
      }
   };

});

app.controller('VaspRowDetailCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   var item = mst.rowParams.item;
   var grid = mst.rowParams.grid;
   var row = mst.rowParams.row;

   self.vaspHeaderChangeUpdate = {};

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = angular.copy(item);

   if (self.rowDetail.verno > 0) {
      self.isVersionRefEnable = true;
   } else {
      self.isVersionRefEnable = false;
   }

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {

      self.vaspHeaderChangeUpdate = {
         nodaysfab: self.rowDetail.nodaysfab,
         refer: self.rowDetail.refer,
         verrefer: self.rowDetail.verrefer,
         rowidVasp: self.rowDetail.rowid
      };

      DataService.post('api/va/asvasetup/vaspheaderchangeupdate', { data: self.vaspHeaderChangeUpdate, busy: true }, function (data) {
         if (data) {
            self.vaspHeaderChangeUpdate = data;

            // Collapse current row and refresh data
            grid.toggleRowDetail(row);
            base.search();
         }
      });
   };

});

app.controller('VaspDetailCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, $translate, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.isSectionsTabReadonly = SecurityService.getSubSecurityLevel('vasp', 'Sections') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('vasp', 'Line Items') < 3;
   self.isAssemblyTabReadonly = SecurityService.getSubSecurityLevel('vasp', 'Assembly') < 3;
   self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('vasp', 'Custom') < 3;

   self.vasp = {};
   self.additionalDetailsGrid = {};
   self.vaheaderallcomponent = [];

   self.number = 1;
   self.type = 'Type';
   self.seq = 'Sequence';

   self.subTitle = $translate.instant('global.warehouse') + ': ' + base.selectedVasp.whse + ' | ' +
                   $translate.instant('global.product') + ': ' + base.selectedVasp.shipprod + ' | ' +
                   $translate.instant('global.version.number') + ': ' + base.selectedVasp.verno;

   self.loadVasp = function () {
      var params = {};

      if (base.selectedVasp.verno) {
         params = {
            shipprod: base.selectedVasp.shipprod,
            whse: base.selectedVasp.whse,
            verno: base.selectedVasp.verno
         };
         DataService.get('api/va/vaspv/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.vasp = data;
            }

            var vaspHeaderCompLoad = {
               shipprod: base.selectedVasp.shipprod,
               whse: base.selectedVasp.whse,
               version: base.selectedVasp.verno
            };

            DataService.post('api/va/asvasetup/vaspheadercompload', { data: vaspHeaderCompLoad, busy: true }, function (data) {
               if (data) {
                  self.vaheaderallcomponent = data;
               }
            });
         });
      } else {
         params = {
            shipprod: base.selectedVasp.shipprod,
            whse: base.selectedVasp.whse
         };
         DataService.get('api/va/vasp/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.vasp = data;
            }

            var vaspHeaderCompLoad = {
               shipprod: base.selectedVasp.shipprod,
               whse: base.selectedVasp.whse,
               version: base.selectedVasp.verno
            };

            DataService.post('api/va/asvasetup/vaspheadercompload', { data: vaspHeaderCompLoad, busy: true }, function (data) {
               if (data) {
                  self.vaheaderallcomponent = data;
               }
            });
         });
      }

   };

   self.leaveDetail = function () {

      // Clear base data in case the user comes back into the same VASP record
      base.currentLine = 0;
      base.currentSection = 0;
      base.currentSegment = 0;
      base.onSegment = false;

      base.selectedSectionsRecord = {};
      base.selectedLineitemsRecord = {};


      $state.go('^.master');
   };

   self.submit = function () {
      //TODO:

      //DataService.post('api/va/CHANGE/TO/SAVE/API', { data: self.vasp, busy: true }, function () {
      //   MessageService.info('global.information', 'message.save.operation.completed.successfully');

      //   $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      //});
   };

   self.loadVasp();

});

app.controller('VaspCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;

   self.headerCriteria = {
      whse: '',
      prod: '',
      nodaysfab: 0,
      refer: '',
      verrefer: '',
      verno: 0,
      rowid: 0
   };

   self.submit = function () {
      DataService.post('api/va/asvasetup/vaspheaderadd', { data: self.headerCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', {
            refreshSearch: true
         }, {
            reload: '^.master'
         });
      });
   };

   self.canel = function () {
      $state.go('^.master');
   };
});

app.controller('VaspCustomCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var params = {};

   self.userHeader = 'true';
   self.userObject = 0;

   // Execute when the Header radio button is selected
   self.headerChanged = function () {
      if (self.userHeader === 'true') {
         self.userSection = 'false';
         self.userLine = 'false';
         self.userAssembly = 'false';
         self.userSegment = 'false';
         base.onSegment = false;

         if (base.selectedVasp.verno) {
            if (base.selectedVasp) {
               params = {
                  shipprod: base.selectedVasp.shipprod,
                  whse: base.selectedVasp.whse,
                  verno: base.selectedVasp.verno,
                  fillmode: true
               };
               DataService.get('api/va/vaspv/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vaspv = data;
                     base.userObject = 2;
                  }
               });
            } else {
               base.userObject = 0;
            }
         } else {
            if (base.selectedVasp) {
               params = {
                  shipprod: base.selectedVasp.shipprod,
                  whse: base.selectedVasp.whse,
                  fillmode: true
               };
               DataService.get('api/va/vasp/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vasp = data;
                     base.userObject = 1;
                  }
               });
            } else {
               base.userObject = 0;
            }
         }
      }
   };

   // Execute when the Sections radio button is selected
   self.sectionChanged = function () {
      if (self.userSection === 'true') {
         self.userHeader = 'false';
         self.userLine = 'false';
         self.userAssembly = 'false';
         self.userSegment = 'false';
         base.onSegment = false;

         if (base.selectedVasp.verno) {
            if (base.selectedSectionsRecord) {
               params = {
                  shipprod: base.selectedVasp.shipprod,
                  whse: base.selectedVasp.whse,
                  verno: base.selectedVasp.verno,
                  seqno: base.selectedSectionsRecord.seqno,
                  fillmode: true
               };
               DataService.get('api/va/vaspsv/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     base.vaspsv = data;
                     base.userObject = 4;
                  }
               });
            } else {
               base.userObject = 0;
            }
         } else {
            if (base.selectedSectionsRecord) {
               params = {
                  shipprod: base.selectedVasp.shipprod,
                  whse: base.selectedVasp.whse,
                  seqno: base.selectedSectionsRecord.seqno,
                  fillmode: true
               };
               DataService.get('api/va/vasps/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     base.vasps = data;
                     base.userObject = 3;
                  }
               });
            } else {
               base.userObject = 0;
            }
         }
      }
   };

   // Execute when the Line Items radio button is selected
   self.lineChanged = function () {
      if (self.userLine === 'true') {
         self.userHeader = 'false';
         self.userSection = 'false';
         self.userAssembly = 'false';
         self.userSegment = 'false';
         base.onSegment = false;
      }

      if (base.selectedVasp.verno) {
         if (base.selectedLineitemsRecord) {
            params = {
               shipprod: base.selectedVasp.shipprod,
               whse: base.selectedVasp.whse,
               verno: base.selectedVasp.verno,
               seqno: base.selectedLineitemsRecord.seqno,
               lineno: base.selectedLineitemsRecord.lineno,
               fillmode: true
            };
            DataService.get('api/va/vaspslv/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  base.vaspslv = data;
                  base.userObject = 6;
               }
            });
         } else {
            base.userObject = 0;
         }
      } else {
         if (base.selectedLineitemsRecord) {
            params = {
               shipprod: base.selectedVasp.shipprod,
               whse: base.selectedVasp.whse,
               seqno: base.selectedLineitemsRecord.seqno,
               lineno: base.selectedLineitemsRecord.lineno,
               fillmode: true
            };
            DataService.get('api/va/vaspsl/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  base.vaspsl = data;
                  base.userObject = 5;
               }
            });
         } else {
            base.userObject = 0;
         }
      }
   };

   // Execute when the Assembly radio button is selected
   self.assemblyChanged = function () {
      if (self.userAssembly === 'true') {
         self.userHeader = 'false';
         self.userSection = 'false';
         self.userLine = 'false';
         self.userSegment = 'false';
         base.onSegment = false;

         if (base.selectedVasp.verno) {
            if (base.selectedVasp) {
               params = {
                  shipprod: base.selectedVasp.shipprod,
                  whse: base.selectedVasp.whse,
                  verno: base.selectedVasp.verno,
                  fillmode: true
               };
               DataService.get('api/va/vaspsav/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vaspsav = data;
                     base.userObject = 8;
                  }
               });
            } else {
               base.userObject = 0;
            }
         } else {
            if (base.selectedVasp) {
               params = {
                  shipprod: base.selectedVasp.shipprod,
                  whse: base.selectedVasp.whse,
                  fillmode: true
               };
               DataService.get('api/va/vaspsa/getbypk', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.vaspsa = data;
                     base.userObject = 7;
                  }
               });
            } else {
               base.userObject = 0;
            }
         }
      }
   };

   // Execute when the Assembly Segment radio button is selected
   self.segmentChanged = function () {
      if (self.userSegment === 'true') {
         self.userHeader = 'false';
         self.userSection = 'false';
         self.userLine = 'false';
         self.userAssembly = 'false';
         base.onSegment = true;
      }

      if (base.selectedVasp.verno) {
         if (base.currentSegment) {
            params = {
               shipprod: base.selectedVasp.shipprod,
               whse: base.selectedVasp.whse,
               verno: base.selectedVasp.verno,
               segment: base.currentSegment
            };

            // Because it is possible for the user to click on a segment that does not have a VASPSASV record, we need to check to see if a record exists before processing
            DataService.get('api/va/vaspsasv/existsbypk', { params: params, busy: true }, function (exists) {
               if (exists) {

                  DataService.get('api/va/vaspsasv/getbypk', { params: params, busy: true }, function (data) {
                     if (data) {
                        base.vaspsasv = data;
                        base.userObject = 10;
                     } else {
                        base.userObject = 0;
                     }
                  });

               } else {
                  base.userObject = 0;
               }
            });
         } else {
            base.userObject = 0;
         }
      } else {
         if (base.currentSegment) {
            params = {
               shipprod: base.selectedVasp.shipprod,
               whse: base.selectedVasp.whse,
               segment: base.currentSegment
            };

            // Because it is possible for the user to click on a segment that does not have a VASPSAS record, we need to check to see if a record exists before processing
            DataService.get('api/va/vaspsas/existsbypk', { params: params, busy: true }, function (exists) {
               if (exists) {

                  DataService.get('api/va/vaspsas/getbypk', { params: params, busy: true }, function (data) {
                     if (data) {
                        base.vaspsas = data;
                        base.userObject = 9;
                     } else {
                        base.userObject = 0;
                     }
                  });

               } else {
                  base.userObject = 0;
               }
            });
         } else {
            base.userObject = 0;
         }
      }
   };

   self.headerChanged();

   self.submit = function (object) {

      // Save the data entered on the screen back to the appropriate record
      // Let the user know the record was saved since they will not leave the screen
      if (object === 1) {
         DataService.put('api/va/vasp', { data: self.vasp, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 2) {
         DataService.put('api/va/vaspv', { data: self.vaspv, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 3) {
         DataService.put('api/va/vasps', { data: base.vasps, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 4) {
         DataService.put('api/va/vaspsv', { data: base.vaspsv, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 5) {
         DataService.put('api/va/vaspsl', { data: base.vaspsl, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 6) {
         DataService.put('api/va/vaspslv', { data: base.vaspslv, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 7) {
         DataService.put('api/va/vaspsa', { data: self.vaspsa, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 8) {
         DataService.put('api/va/vaspsav', { data: self.vaspsav, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 9) {
         DataService.put('api/va/vaspsas', { data: base.vaspsas, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if (object === 10) {
         DataService.put('api/va/vaspsasv', { data: base.vaspsasv, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      }

   };

});