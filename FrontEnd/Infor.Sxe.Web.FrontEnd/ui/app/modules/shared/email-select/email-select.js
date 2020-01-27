'use strict';

/**
 * Steps to implement this Adjusters Information control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it as follows
 *     "viewName": "emailSelectSubView",
 *     "conditionShow": "dtlemail.isEmailSelect()"
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject: EmailSelectStateProvider
 *        ii) Wire in: EmailSelectStateProvider.addStates(MODULE, FUNCTION, PARENT)); (i.e. 'ar', 'arss', 'arss.detail')
 *        $state.go('arss.detail.emailSelect', { prod: icsw.prod, whse: icsw.whse});
 */
app.provider('EmailSelectState', function EmailSelectStateProvider($stateProvider) {
   var self = this;

   this.$get = function () {
      return self;
   };

   // These States are used to help make it easier to implement, and share code.  Having them in this control means
   // that it doesn't need these states in each place this ins called.
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.emailSelect', {
         url: '/email-select',
         params: {
            subTitle: '',
            sendType: '',
            sendTypeLabel: '',
            criteriaDataSet: [],
            callback: null
         },
         views: {
            emailSelectSubView: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/email-select/email-select.json');
               },
               controller: 'EmailSelectState as dtlemail'
            }
         }
      });

   };
});

app.controller('EmailSelectState', function ($state, $scope, $stateParams, $timeout, DataService, MessageService, UserService, ConfigService, GridService) {
   var self = this;

   self.subTitle = $stateParams.subTitle;
   self.criteriaDataSet = $stateParams.criteriaDataSet;
   self.sendTypeLabel = $stateParams.sendTypeLabel;
   self.sendType = $stateParams.sendType;
   self.callback = $stateParams.callback;

   self.getTheEmails = function () {
      //Catch a user refresh and return to the parent
      if ($stateParams.criteriaDataSet.length === 0) {
         $state.go('^.edit');
      } else {
         DataService.post('api/shared/ascamsetup/emaillistforedi', { data: self.criteriaDataSet, busy: true }, function (emails) {
            if (emails) {
               self.thisWorkingDataSet = emails;

               // Shrink the view
               self.dataset = self.thisWorkingDataSet.filter(function (data) {
                  return data.doctype.toUpperCase() === self.sendType;
               });

               // Auto Select the rows based on activefl, set the select checkbox on the grid
               $timeout(function () {
                  self.grid.settings.dataset.forEach(function (record) {
                     if (record.lselect) {
                        //Select if it exists in the list
                        self.grid.selectRow(self.dataset.indexOf(record));
                     }
                  });
               });
            }
         }, function () {
            // Return to the edit screen on error - such as a user refresh that loses the customer
            $state.go('^.edit');
         });
      }
   };

   self.isEmailSelect = function () {
      return $state.is('^.emailSelect');
   };

   self.cancel = function () {
      // Do nothing and return to edit mode - the fullEmailDataSet will be the same as it was before.
      $state.go('^.edit');
   };

   self.submit = function () {
      //Unselect the rows in the working set
      self.thisWorkingDataSet.forEach(function (data) {
         if (data.doctype.toUpperCase() === self.sendType) {
            data.lselect = false;
         }
      });
      //Select the ones the user selected
      var records = GridService.getSelectedRecords(self.grid);
      if (records && records.length) {
         records.forEach(function (record) {
            if (record.doctype.toUpperCase() === self.sendType) {
               record.lselect = true;
            }
         });
      } else {
         MessageService.error('global.error', 'message.e.mail.invalid.no.e.mail.address.defined');
      }
      //Update the data
      DataService.post('api/shared/ascamsetup/updateemaillistforedi', { data: self.thisWorkingDataSet, busy: true }, function (data) {
         self.thisWorkingDataSet = data;
         //Offer ability to do more work after screen is accepted from.
         if (self.callback) {
            self.callback(records.length); //returns the number of selected emails
         }
         $state.go('^.edit');
      });
   };
});