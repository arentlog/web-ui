'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlap',
      dataPath: 'api/twl/printmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/printmst/gettwlprinters',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlap/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlapService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.refreshSearch = false;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
      };
   };

   this.extendCreateController = function (self, base, twlap) {
      self.printerModel = 'text';
      self.printerLabelModel = '';

      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlap.coNum = base.criteriaUsed.coNum;
      twlap.whNum = base.criteriaUsed.whNum;

      twlap.rowStatus = true;
      twlap.printerId = '';
      twlap.printer = '';
      twlap.description = 'text';
      twlap.type = true;

      self.validate = function () {
         //Report Type
         if (self.twlap.type && !self.printerModel) {
            MessageService.error('global.error', 'message.printer.model.is.required');
            return false;
            //Label Type
         } else if (!self.twlap.type && !self.printerLabelModel) {
            MessageService.error('global.error', 'message.label.printer.model.is.required');
            return false;
         } else {
            return true;
         }
      }

      self.customSubmit = function () {
         if (self.twlap && self.validate()) {
            //Report Type
            if (self.twlap.type) {
               self.twlap.description = self.printerModel;
               //Label Type
            } else {
               self.twlap.description = self.printerLabelModel;
            }
         }

         self.submit();
      };
   };

   this.extendDetailController = function (self, base, twlap) {
      self.printerModel = '';
      self.printerLabelModel = '';

      self.getSubTitle = function () {
         return MessageService.get(MessageService.get('global.warehouse') + ': ' + twlap.whNum + ' | ' +
            MessageService.get('global.printer') + ': ' + twlap.printerId);
      };

      self.changeType = function () {
         self.printerModel = '';
         self.printerLabelModel = '';
      };

      twlap.$promise.then(function () {
         //Report Type
         if (self.twlap.type) {
            self.printerModel = self.twlap.description;
         //Label Type
         } else {
            self.printerLabelModel = self.twlap.description;
         }
      });

      self.validate = function () {
         //Report Type
         if (self.twlap.type && !self.printerModel) {
            MessageService.error('global.error', 'message.printer.model.is.required');
            return false;
         //Label Type
         } else if (!self.twlap.type && !self.printerLabelModel) {
            MessageService.error('global.error', 'message.label.printer.model.is.required');
            return false;
         } else {
            return true;
         }
      }

      self.customSubmit = function () {
         if (self.twlap && self.validate()) {
            //Report Type
            if (self.twlap.type) {
               self.twlap.description = self.printerModel;
            //Label Type
            } else {
               self.twlap.description = self.printerLabelModel;
            }
         }

         self.submit();
      };
   };
});