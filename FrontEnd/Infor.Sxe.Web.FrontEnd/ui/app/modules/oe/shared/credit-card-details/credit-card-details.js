'use-strict';

app.provider('OeCreditCardDetailsState', function OeCreditCardDetailsStateProvider($stateProvider) {
   var self = this;

   /**
    * Provider access method
    */
   this.$get = [function () {
      return self;
   }];

   /**
    * These States are used to help make it easier to implement, and share code.  Having them in this control means
    * that it doesn't need these states in each place this is called.
    */
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.card', {
         url: '/card',
         params: {
            selectedCard: null,
            isEnabled: null,
            custno: null,
            shipto: '',
            callBack: null
         },
         views: {
            cardDetail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('oe/shared/credit-card-details/card.json');
               },
               controller: 'OeCreditCardDetailsCardCtrl as card'
            }
         }
      });
   };
});

/**
 * Control for displaying Credit Card Details (grid)
 */
app.controller('OeCreditCardDetailsCtrl', function ($scope, $state, Utils, DataService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   var oeeh = Utils.getNestedValue($scope, options.header);
   var isEnabled = options.isEnabled;
   var DISPLAY_TYPE_ACTIVE = 'A';
   var DISPLAY_TYPE_BOTH = 'B';
   self.custno = 0;
   self.shipto = '';

   self.displayType = DISPLAY_TYPE_ACTIVE;
   self.dataset = [];

   self.oeirccHistory = function () {
      var criteria = {
         orderno: oeeh.orderno,
         ordersuf: oeeh.ordersuf
      };
      self.custno = oeeh.custno;
      self.shipto = oeeh.shipto;
      DataService.post('api/oe/asoeinquiry/oeircchistory', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.results = data;
            self.filterResults();
         }
      });
   };

   oeeh.$promise.then(function () {
      // Load Credit Card List
      self.oeirccHistory();
   });

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;

      if (record) {
         // Drill down to card detail view
         $state.go('.card', { selectedCard: record, isEnabled: isEnabled, custno: self.custno, shipto: self.shipto, callBack: self.callBack });
      }
   };

   self.callBack = function () {
      self.oeirccHistory();
      $state.go('^');
   };

   /**
    * Filters the grid based on the drop down selection without refetching new data
    */
   self.filterResults = function () {
      if (self.results) {
         // Return all records when displaying Both
         if (self.displayType === DISPLAY_TYPE_BOTH) {
            Utils.replaceArray(self.dataset, self.results);
         } else {
            var showActive = self.displayType === DISPLAY_TYPE_ACTIVE;
            // Return either Active or Inactive records
            var list = self.results.filter(function (item) {
               return item.statustype === showActive;
            });
            Utils.replaceArray(self.dataset, list);
         }
      }
   };

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

/**
 * Card Detail child view
 */
app.controller('OeCreditCardDetailsCardCtrl', function ($scope, $state, $stateParams, Utils, OptionSetService, DataService, MessageService, CenPosService) {
   var self = this;
   var TRANS_CD_AUTH = 'auth';

   self.selectedCard = $stateParams.selectedCard;
   self.isEnabled = $stateParams.isEnabled;
   self.custno = $stateParams.custno;
   self.shipto = $stateParams.shipto;

   self.doAuthorize = function () {
      if (self.selectedCard.mediacd) {
         var params = {
            codeiden: 'P',
            codeval: self.selectedCard.mediacd,
            fldlist: 'addtaxfl'
         };
         DataService.get('api/sa/sastn/getbypk', { params: params, busy: true }, function (data) {
            if (data && data.addtaxfl) {
                  self.onAuthorization(true);
            }
         });
      }
   };

   self.onAuthorization = function (holdforauth) {
      var oeirccauth = {
         orderno: self.selectedCard.orderno,
         ordersuf: self.selectedCard.ordersuf,
         mediacd: self.selectedCard.mediacd,
         seqno: self.selectedCard.seqno,
         enccardno: self.selectedCard.enccardno,
         transcd: self.selectedCard.transcd,
         fullcardno: self.cardNumber,
         holdforauth: holdforauth
      };
      DataService.post('api/oe/asoeheader/authorizeoeircreditcard', { data: oeirccauth, busy: true }, function (message) {
         if (message) {
            MessageService.alert(message);
         }
      });
   };

   if (self.selectedCard) {
      self.mediacd = self.selectedCard.mediacd;
      self.subTitle = MessageService.get('global.order.number') + ': ' + self.selectedCard.orderno + '-' + Utils.pad(self.selectedCard.ordersuf, 2) +
         ' | ' + MessageService.get('global.credit.card.number') + ': ' + self.selectedCard.cardno;

      // Load credit card communication code description
      OptionSetService.getDisplayLabel('OE', 'CreditCardCommunicationType', self.selectedCard.commcd, function (label) {
         self.commcddesc = label;
      });

      // Load credit card stage description
      OptionSetService.getDisplayLabel('OE', 'CreditCardOrderStages', self.selectedCard.processcd, function (label) {
         self.processcddesc = label;
      });

      //TODO: Change cardNumber to Credit Card Lookup - Not needed for OEIO
      self.cardNumber = self.selectedCard.cardno;
      self.canSendAuthorization = self.isEnabled && self.selectedCard.transcd.toLowerCase() === TRANS_CD_AUTH;

      // Load Media Code Description
      if (self.selectedCard.mediacd) {
         var params = {
            codeiden: 'P',
            codeval: self.selectedCard.mediacd,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sastn/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.description = data.descrip;
            }
         });
      }

      // Load Authorization Details
      var criteria = {
         orderno: self.selectedCard.orderno,
         ordersuf: self.selectedCard.ordersuf,
         cardno: self.selectedCard.enccardno,
         mediacd: self.selectedCard.mediacd,
         transcd: self.selectedCard.transcd,
         seqno: self.selectedCard.seqno
      };

      DataService.post('api/oe/asoeinquiry/oeirccdetail', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.details = data;
         }
      });
   }

   self.addNewCard = function () {
      CenPosService.showModal({
         type: 'add',
         mediacd: self.selectedCard.mediacd,
         shipto: self.shipto,
         custno: self.custno,
         invoiceno: self.selectedCard.orderno + '-' + self.selectedCard.ordersuf,
         successCallback: self.saveARSD
      });
   };

   self.saveARSD = function () {
      var arsd = {
         custno: self.custno,
         shipto: self.shipto,
         cardno: self.selectedCard.cardno,
         seqno: 4,
         name: '',
         maxamount: 0,
         mediacd: self.selectedCard.mediacd,
         cardtype: '',
         callfrom: "Oeir",
         userfield: ''
      };
      DataService.post('api/ar/asarsetup/arsdsave', { data: arsd, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.error('global.error', data.cWarningMessage);
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         }
      });
   };

   self.back = function () {
      if ($stateParams.callBack) {
         $stateParams.callBack();
      } else {
         $state.go('^');
      }
   };
});
