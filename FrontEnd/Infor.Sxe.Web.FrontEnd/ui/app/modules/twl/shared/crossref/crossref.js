'use strict';

/**
 * Steps to implement this TWL Cross Reference Language control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it with an exact name of: 'twlCrossRef'
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject: TWLCrossRefStateProvider
 *        ii) Wire in: TWLCrossRefStateProvider.addStates(MODULE, FUNCTION, PARENT)); (i.e. 'twl', 'twliv', 'twliv.detail')
 */

app.provider('TWLCrossRefState', function TWLCrossRefStateProvider($stateProvider) {
   var self = this;

   this.$get = [function () {
      return self;
   }];

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this ins called.
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.twlcrossref', {
         url: '/twl-cross-ref',
         params: {
            calledFrom: null,
            coNum: null,
            whNum: null,
            vendorId: '',
            absNum: null,
            vendItem: '',
            vendName: '',
            returnState: null
         },
         views: {
            twlCrossRef: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('twl/shared/crossref/crossref.json');
               },
               controller: 'TWLCrossRefCtrl as xr'
            }
         }
      });
      $stateProvider.state(parentState + '.twlcrossref.create', {
         url: '/create',
         views: {
            xrDetail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('twl/shared/crossref/crossref-detail.json');
               },
               controller: 'TWLCrossRefCreateCtrl as xrd'
            }
         }
      });
      $stateProvider.state(parentState + '.twlcrossref.detail', {
         url: '/detail',
         params: { venddetail: null },
         views: {
            xrDetail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('twl/shared/crossref/crossref-detail.json');
               },
               controller: 'TWLCrossRefDetailCtrl as xrd'
            }
         }
      });
   };
});

app.controller('TWLCrossRefCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   //xr
   var self = this;

   self.criteria = {
      calledFrom: $stateParams.calledFrom,
      coNum: $stateParams.coNum,
      whNum: $stateParams.whNum,
      vendorId: $stateParams.vendorId,
      absNum: $stateParams.absNum,
      vendItem: $stateParams.vendItem,
      vendName: $stateParams.vendName
   };

   // This is needed so we can hide other views appropriately
   self.isTWLCrossRefMaster = function () {
      return $state.current.name.endsWith('.twlcrossref');
   };
   self.isTWLCrossRefCreate = function () {
      return $state.current.name.endsWith('.create');
   };

   self.searchCrossRef = function () {
      DataService.post('api/twl/astwlsetup/getcrossreferencelist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.getcrossrefresults;
      });
   };

   if (self.criteria.coNum && self.criteria.whNum) {
      self.searchCrossRef();
   }

   self.edit = function () {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         $state.go('.detail', {venddetail: record});
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.detail', { venddetail: record });
   };

   self.delete = function () {
      var rowIds = GridService.getSelectedRowIds(self.grid, 'venddetailrowid');

      // Proceed if any rows are selected
      if (rowIds.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            DataService.delete('api/twl/venddetail/deletelistbyrowids', { data: rowIds, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               self.searchCrossRef();
            });
         });
      }
   };

   self.back = function () {
      $state.go($stateParams.returnState);
   };
});

//Separate View used for Create mode.
app.controller('TWLCrossRefCreateCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //xrd
   var self = this;
   var xr = $scope.xr;

   self.venddetail = {
      coNum: xr.criteria.coNum,
      whNum: xr.criteria.whNum,
      vendorId: xr.criteria.vendorId,
      absNum: xr.criteria.absNum
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      var isValid = self.validateForm();
      if (isValid) {
         DataService.post('api/twl/venddetail', { data: self.venddetail, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^');
            xr.searchCrossRef();
         });
      }
   };

   // Perform any custom UI validation
   self.validateForm = function () {
      var isValid = true;
      var valMsg = '';
      var BREAK = '<br />';

      if (!self.venddetail.absNum) {
         valMsg = valMsg + $translate.instant('global.product') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (!self.venddetail.vendItem) {
         valMsg = valMsg + $translate.instant('global.cross.reference') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (valMsg) {
         valMsg = $translate.instant('global.validation.error.message') + BREAK + BREAK + valMsg;
         MessageService.error('global.validation.error', valMsg);
         isValid = false;
      }
      return isValid;
   };
});

//Separate View used for Update mode.
app.controller('TWLCrossRefDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //xrd
   var self = this;
   var xr = $scope.xr;
   var rowID = $stateParams.venddetail.venddetailrowid;

   DataService.get('api/twl/venddetail/getbyrowid/' + rowID, { busy: true }, function (data) {
      self.venddetail = data;
   });

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      var isValid = self.validateForm();
      if (isValid) {
         DataService.put('api/twl/venddetail', { data: self.venddetail, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^');
            xr.searchCrossRef();
         });
      }
   };

   // Perform any custom UI validation
   self.validateForm = function () {
      var isValid = true;
      var valMsg = '';
      var BREAK = '<br />';

      if (!self.venddetail.absNum) {
         valMsg = valMsg + $translate.instant('global.product') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (!self.venddetail.vendItem) {
         valMsg = valMsg + $translate.instant('global.cross.reference') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (valMsg) {
         valMsg = $translate.instant('global.validation.error.message') + BREAK + BREAK + valMsg;
         MessageService.error('global.validation.error', valMsg);
         isValid = false;
      }
      return isValid;
   };
});
