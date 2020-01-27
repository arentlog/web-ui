'use strict';

/**
 * Steps to implement this Multi Language control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it with an exact name of: 'multiLanguage'
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject: MultiLanguageStateProvider
 *        ii) Wire in: MultiLanguageStateProvider.addStates(MODULE, FUNCTION, PARENT)); (i.e. 'ic', 'icsp', 'icsp.detail')
 */

app.provider('MultiLanguageState', function MultiLanguageStateProvider($stateProvider) {
   var self = this;

   this.$get = [function () {
      return self;
   }];

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this ins called.
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.multilanguage', {
         url: '/multi-language',
         params: {
            codeiden: null,
            codeval: null,
            descrip1: null,
            descrip2: null,
            extended: null,
            returnState: null
         },
         views: {
            multiLanguage: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/multi-language/multi-language.json');
               },
               controller: 'MultiLanguageCtrl as ml'
            }
         }
      });
      $stateProvider.state(parentState + '.multilanguage.create', {
         url: '/create',
         views: {
            mlDetail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/multi-language/multi-language-detail.json');
               },
               controller: 'MultiLanguageCreateCtrl as mld'
            }
         }
      });
      $stateProvider.state(parentState + '.multilanguage.detail', {
         url: '/detail',
         params: { sals: null },
         views: {
            mlDetail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/multi-language/multi-language-detail.json');
               },
               controller: 'MultiLanguageDetailCtrl as mld'
            }
         }
      });
   };
});

app.controller('MultiLanguageCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;

   self.criteria = {
      codeiden: $stateParams.codeiden,
      codeval: $stateParams.codeval,
      descrip1: $stateParams.descrip1,
      descrip2: $stateParams.descrip2,
      extended: $stateParams.extended
   };

   // This is needed so we can hide other views appropriately
   self.isMultiLanguageMaster = function () {
      return $state.current.name.endsWith('.multilanguage');
   };
   self.isMultiLanguageCreate = function () {
      return $state.current.name.endsWith('.create');
   };

   self.searchSals = function () {
      DataService.post('api/sa/sals/lookup', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.descripLabel = MessageService.get('global.description');
   if ($stateParams.codeiden === 'p') {
      self.descripLabel = MessageService.get('global.description.1');
   }

   if (self.criteria.codeiden && self.criteria.codeval) {
      self.searchSals();
   }
   self.edit = function () {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         $state.go('.detail', {sals: record});
      }
   };
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.detail', { sals: record });
   };
   self.delete = function () {
      var rowIds = GridService.getSelectedRowIds(self.grid, 'rowidSals');

      // Proceed if any rows are selected
      if (rowIds.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            DataService.delete('api/sa/sals/deletelistbyrowids', { data: rowIds, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               self.searchSals();
            });
         });
      }
   };
   self.back = function () {
      $state.go($stateParams.returnState);
   };
});

//Separate View used for Create mode.
app.controller('MultiLanguageCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService, UserService) {
   var self = this;
   var ml = $scope.ml;

   self.sals = {
      cono: UserService.getCono(),
      codeiden: ml.criteria.codeiden,
      codeval: ml.criteria.codeval
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      DataService.post('api/sa/sals', { data: self.sals, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         ml.searchSals();
      });
   };
});

//Separate View used for Update mode.
app.controller('MultiLanguageDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var ml = $scope.ml;
   var rowID = $stateParams.sals.rowidSals;

   DataService.get('api/sa/sals/getbyrowid/' + rowID, { busy: true }, function (data) {
      self.sals = data;
   });

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      DataService.put('api/sa/sals', { data: self.sals, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         ml.searchSals();
      });
   };
});
