'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('twl', 'twloms', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twloms');
});

app.controller('TwlomsBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};

   // Sets defaults in search tab
   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.subTitle = '';

   self.dateRangeType = [
      { label: '', value: '' },
      { label: MessageService.get('twl.wave.status.no.specified.date'), value: 'No specified date' },
      { label: MessageService.get('twl.wave.status.old.4.or.more.days'), value: 'OLD: 4 or more days' },
      { label: MessageService.get('twl.wave.status.old.3.day'), value: 'OLD: 3 day' },
      { label: MessageService.get('twl.wave.status.old.2.day'), value: 'OLD: 2 day' },
      { label: MessageService.get('twl.wave.status.old.1.day'), value: 'OLD: 1 day' },
      { label: MessageService.get('twl.wave.status.today'), value: 'Today' },
      { label: MessageService.get('twl.wave.status.new.1.day'), value: 'NEW: 1 day' },
      { label: MessageService.get('twl.wave.status.new.2.day'), value: 'NEW: 2 day' },
      { label: MessageService.get('twl.wave.status.new.3.day'), value: 'NEW: 3 day' },
      { label: MessageService.get('twl.wave.status.new.4.day'), value: 'NEW: 4 day' },
      { label: MessageService.get('twl.wave.status.new.5.day'), value: 'NEW: 5 day' },
      { label: MessageService.get('twl.wave.status.new.6.day'), value: 'NEW: 6 day' },
      { label: MessageService.get('twl.wave.status.new.7.day'), value: 'NEW: 7 day' },
      { label: MessageService.get('twl.wave.status.new.8.or.more.days'), value: 'NEW: 8 or more days' }
   ];

   self.viewTypes = [
   { label: MessageService.get('global.open'), value: 'open' },
   { label: MessageService.get('global.undropped'), value: 'undropped' },
   { label: MessageService.get('global.dropped.and.open.status'), value: 'droppedopen' }
   ];

   self.isMaster = function () {
      return $state.is('twloms.master');
   };

   self.includesMaster = function () {
      return $state.includes('twloms.master');
   };

   self.isDetail = function () {
      return $state.is('twloms.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twloms.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.viewtype = 'open';
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      var viewTypeObject = self.viewTypes.filter(function (data) {
         return data.value === self.criteria.viewtype;
      });
      self.subTitle = MessageService.get('global.warehouse') + ': ' + self.criteria.whNum +
            " | " + (viewTypeObject.length === 1 ? viewTypeObject[0].label : self.criteria.viewtype);
      DataService.post('api/twl/astwlinquiry/getopencounts', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlomsSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twloms.master');
      }

      // Get data
      base.search();
   };
});

app.controller('TwlomsMasterCtrl', function ($scope) {
   var self = this;
   var base = $scope.base;

});
