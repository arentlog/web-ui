'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlop', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlop');

   $stateProvider.state('twlop.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlop/create.json');
            },
            controller: 'TwlopCreateCtrl as crt'
         }
      }
   });

   $stateProvider.state('twlop.synchronize-delete', {
      url: '/synchronize-delete',
      params: {
         prodcatList: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlop/synchronize-delete.json');
            },
            controller: 'TwlopSynchronizeDeleteCtrl as sd'
         }
      }
   });
});

app.controller('TwlopBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.LABEL_DELIMITER = ': ';
   self.criteria = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;
   self.refreshSearch = false;

   //Used for when the user is creating multiple rows, make these sticky to help speed up data entry.
   self.addflSave = false;
   self.changeflSave = false;
   self.restrictflSave = false;

   self.criteriaUsed = {};

   self.isMaster = function () {
      return $state.is('twlop.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlop.master');
   };

   self.isCreate = function () {
      return $state.is('twlop.create');
   };

   self.includesCreate = function () {
      return $state.includes('twlop.create');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') +
         self.LABEL_DELIMITER +
         (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
   };

   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);

      //This API call does a 'begins' on prodcat.
      DataService.post('api/twl/prodcat/gettwlprodcatlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.isCompanyAndWhseEntered = function () {
      if (!self.criteriaUsed.coNum || self.criteriaUsed.coNum.length === 0) {
         MessageService.error('global.error', 'message.company.number.is.required');
         return false;
      } else if (!self.criteriaUsed.whNum || self.criteriaUsed.whNum.length === 0) {
         MessageService.error('global.error', 'message.warehouse.is.required');
         return false;
      } else {
         return true;
      }
   };

   self.initCriteria();
});

app.controller('TwlopSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('twlop.master');
      }

      base.search();
   };
});

//Alias: mst
app.controller('TwlopMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   //Synchronize the local TWL Product Categories from the SASTT product categories.  This call returns a list of
   //categories that are only in TWL.  The user can decide which to delete; they may want some in TWL only.
   self.synchronize = function () {
      if (base.isCompanyAndWhseEntered()) {
         MessageService.okCancel('global.synchronize.confirmation', 'question.are.you.sure.you.want.to.update.product.categories', function () {
            var updateprodcatCriteria = {
               coNum: base.criteriaUsed.coNum,
               whNum: base.criteriaUsed.whNum
            };

            DataService.post('api/twl/astwladmin/refreshprodcat', { data: updateprodcatCriteria, busy: true }, function (data) {
               if (data && data.length > 0) {
                  $state.go('^.synchronize-delete', { prodcatList: data });
               } else {
                  MessageService.info('global.information', 'message.operation.completed.successfully');
                  base.search();
               }
            });
         });
      }
   };

   self.create = function () {
      if (base.isCompanyAndWhseEntered()) {
         $state.go('^.create', {});
      }
   };

   self.delete = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var rowIds = GridService.getSelectedRowIds(base.grid, 'rowID');
         if (rowIds.length) {
            DataService.delete('api/twl/prodcat/deletelistbyrowids', { data: rowIds, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.search();
            });
         }
      });
   };

   self.submit = function () {
      var updateProdCatList = [];
      base.dataset.forEach(function (twlop) {
         updateProdCatList.push(twlop);
      });

      if (updateProdCatList.length > 0) {
         DataService.post('api/twl/astwladmin/updateprodcat', { data: updateProdCatList, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         });
      }
   };
});

//This Controller is used when the user is creating a new Product Category.  It's accessed when they click 'New'
//from the Master View.
//Alias: crt
app.controller('TwlopCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.twlop = {};

   // Can only create in user's TWL warehouse
   self.twlop.coNum = base.criteriaUsed.coNum;
   self.twlop.whNum = base.criteriaUsed.whNum;

   self.twlop.prodcat = '';
   self.twlop.pickSequence = 0;
   self.twlop.description = '';
   self.twlop.addfl = base.addflSave;
   self.twlop.changefl = base.changeflSave;
   self.twlop.restrictfl = base.restrictflSave;

   self.cancel = function () {
      $state.go('^.master', {});
   };

   self.submitContinue = function () {
      // Use POST if the record does not exist and we need to create a new record
      DataService.post('api/twl/prodcat', { data: self.twlop, busy: true }, function (data) {
         if (data) {
            //Save these flags as 'sticky' to help the user with data entry of multiple creations.
            base.addflSave = self.twlop.addfl;
            base.changeflSave = self.twlop.changefl;
            base.restrictflSave = self.twlop.restrictfl;

            MessageService.info('global.information', 'message.save.operation.completed.successfully');

            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }
      });
   };

   self.submit = function () {
      if (base.isCompanyAndWhseEntered()) {
         var existsbypkCriteria = {
            coNum: self.twlop.coNum,
            whNum: self.twlop.whNum,
            prodcat: self.twlop.prodcat
         };
         DataService.get('api/twl/prodcat/existsbypk', { params: existsbypkCriteria, busy: true }, function (data) {
            if (data) {
               MessageService.error('global.error', 'message.product.category.must.be.unique');
            } else {
               self.submitContinue();
            }
         });
      }
   };
});

//This Controller is used when the user selects Synchronize and the backed call returns a list of Product
//Categories that are in the TWL but not in SASTT.  It provides the user the ability to view these and
//delete any they wish.
//Alias: sd
app.controller('TwlopSynchronizeDeleteCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService) {
   var self = this;
   self.productCategories = $stateParams.prodcatList;
   var base = $scope.base;

   self.getSubTitle = function () {
      return MessageService.get('global.delete');
   };

   self.getInfoMessage = function () {
      return MessageService.get('message.the.following.product.categories.are.not.stored.in.sastt');
   };

   self.delete = function () {
      var count = 0;
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var refreshprodcatresults = GridService.getSelectedRecords(self.grid);
         count = refreshprodcatresults.length;
         refreshprodcatresults.forEach(function (row) {
            var getbypkCriteria = {
               coNum: row.coNum,
               whNum: row.whNum,
               prodcat: row.prodcat
            };

            DataService.get('api/twl/prodcat/getbypk', { params: getbypkCriteria, busy: true }, function (data) {
               if (data) {
                  DataService.delete('api/twl/prodcat', { data: data, busy: false }, function () {
                     count--;
                     //If we got thru all of them, then provide message and return.
                     if (count <= 0) {
                        MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                        base.search();
                        $state.go('^.master');
                     }
                  });
               } else {
                  //If the row isn't found, simply return.
                  base.search();
                  MessageService.info('global.information', 'message.operation.completed.successfully');
                  $state.go('^.master');
               }
            });
         });
      });
   };
});
