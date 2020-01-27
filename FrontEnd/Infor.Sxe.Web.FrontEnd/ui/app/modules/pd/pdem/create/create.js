'use strict';

app.controller('PdemCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService, UserService) {
   var self = this;
   var base = $scope.base;
   self.isDisabled = true;

   // Clear all the fields/values when re-entering the 'Create' screens
   base.pdemNewSet = {};

   // Load the PDSC or PDSR Default Records
   if (base.defaultRecordType === 'P' && base.defaultPDSCCode) {
      base.pdemNewSet.dropdowntype = 'P';
      base.pdemNewSet.destination = base.defaultPDSCCode;
   } else if (base.defaultRecordType === 'R' && base.defaultPDSRCode) {
      base.pdemNewSet.dropdowntype = 'R';
      base.pdemNewSet.destination = base.defaultPDSRCode;
   }

   // If nothing setup in AO for PDSC or PDSR - Leave Create
   if (!base.pdemNewSet.dropdowntype) {
      MessageService.error('global.error', 'error.system.records.not.setup.for.pricing.rebate.records');
      $state.go('pdem.master');
   }

   self.isStep1 = true;
   self.isStep2 = false;
   self.isStep3 = false;
   self.isStep4 = false;
   self.isStep5 = false;
   self.isStep6 = false;

   // Values are 'hard coded' values used in pdee.i for building the pdmline.sortkey
   self.availableSortFields = [
      { label: MessageService.get('global.arp.warehouse'), value: 'ARP Warehouse' },
      { label: MessageService.get('global.customer.number'), value: 'Customer' },
      { label: MessageService.get('global.customer.price.type'), value: 'Customer Price Type' },
      { label: MessageService.get('global.customer.rebate.type'), value: 'Customer Rebate Type' },
      { label: MessageService.get('global.end.date'), value: 'End Date' },
      { label: MessageService.get('global.product'), value: 'Product' },
      { label: MessageService.get('global.product.category'), value: 'Product Category' },
      { label: MessageService.get('global.product.line'), value: 'Product Line' },
      { label: MessageService.get('global.product.price.type'), value: 'Product Price Type' },
      { label: MessageService.get('global.product.rebate.sub.type'), value: 'Product Rebate Subtype' },
      { label: MessageService.get('global.product.rebate.type'), value: 'Product Rebate Type' },
      { label: MessageService.get('global.ship.to'), value: 'Ship To' },
      { label: MessageService.get('global.vendor.number'), value: 'Vendor' },
      { label: MessageService.get('global.warehouse'), value: 'Warehouse' }
   ];

   self.selectedSortFields = [];

   // Re-Load default if the Record Type Changes
   self.loadRecordTypeDefault = function (recordType) {

      self.resetDestination();

      if (recordType === 'P') {
         if (base.defaultPDSCCode) {
            base.pdemNewSet.destination = base.defaultPDSCCode;
         } else {
            MessageService.error('global.error', 'error.system.records.not.setup.for.pricing.records');
         }
      }

      if (recordType === 'R') {
         if (base.defaultPDSRCode) {
            base.pdemNewSet.destination = base.defaultPDSRCode;
         } else {
            MessageService.error('global.error', 'error.system.records.not.setup.for.rebate.records');
         }
      }
   };

   // Operator Changed the Pricing Record or Rebate Recode type - clear the LevelTy fields
   self.resetDestination = function () {

      base.pdemNewSet.prodprcty = '';
      base.pdemNewSet.prodline = '';
      base.pdemNewSet.prodcat = '';
      base.pdemNewSet.rebatety = '';
   };

   // Retain the LevelTy fields in Step 2
   self.loadFieldValue = function () {

      var levelCode = base.pdemNewSet.destination;

      base.pdemNewSet.prodprcty = '';
      base.pdemNewSet.prodline = '';
      base.pdemNewSet.prodcat = '';
      base.pdemNewSet.rebatety = '';

      if (levelCode) {
         switch (levelCode.toLowerCase()) {
            case 'c2p':
            case 'c8':
            case 'c4p':
            case 'r3':
               base.pdemNewSet.prodprcty = base.pdemNewSet.levelty;
               break;
            case 'c2l':
            case 'r4':
               base.pdemNewSet.prodline = base.pdemNewSet.levelty;
               break;
            case 'c2c':
            case 'r5':
               base.pdemNewSet.prodcat = base.pdemNewSet.levelty;
               break;
            case 'c2r':
            case 'c4r':
            case 'r2':
               base.pdemNewSet.rebatety = base.pdemNewSet.levelty;
               break;
         }
      }
   };

   self.previous = function () {
      if (self.isStep2) {
         self.isStep1 = true;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep3) {
         base.initializePdemNewSet(base.MAIN);
         self.isStep1 = false;
         self.isStep2 = true;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep4) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep5) {
         if ((base.pdemNewSet.destination.toLowerCase() === base.PDSC_CUSTOMER_BY_PRODUCT) ||
             (base.pdemNewSet.destination.toLowerCase() === base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT) ||
             (base.pdemNewSet.destination.toLowerCase() === base.PDSC_PRODUCT) ||
             (base.pdemNewSet.destination.toLowerCase() === base.PDSR_REBATE_ON_PRODUCT)) {
            self.navigateToPrevious();
         }
         else {
            self.isStep1 = false;
            self.isStep2 = false;
            self.isStep3 = true;
            self.isStep4 = false;
            self.isStep5 = false;
            self.isStep6 = false;
         }
      }
      else if (self.isStep6) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = true;
         self.isStep6 = false;
      }
   };

   self.next = function () {
      if (self.isStep1) {
         if (base.pdemNewSet.setid && base.pdemNewSet.description && base.pdemNewSet.destination) {
            var params = {
               cono: UserService.getCono(),
               setID: base.pdemNewSet.setid
            };

            DataService.get('api/pv/pvpdmhdr/existsbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  MessageService.error('global.error', 'message.set.id.already.exists.enter.a.new.set.id');
               }
               else {
                  self.navigateToNext();
               }
            });
         }
         else {
            var setIdReqMsg = '';
            var descrReqMsg = '';
            var destReqMsg = '';

            if (!base.pdemNewSet.setid) {
               setIdReqMsg = MessageService.get('global.set.id') + MessageService.get('symbol.dash.with.spaces') + MessageService.get('message.this.is.a.required.field');
            }

            if (!base.pdemNewSet.description) {
               descrReqMsg = MessageService.get('global.description') + MessageService.get('symbol.dash.with.spaces') + MessageService.get('message.this.is.a.required.field');
            }

            if (!base.pdemNewSet.destination) {
               destReqMsg = MessageService.get('global.record.type') + MessageService.get('symbol.dash.with.spaces') + MessageService.get('message.this.is.a.required.field');
            }

            if (setIdReqMsg || descrReqMsg || destReqMsg) {
               var message = MessageService.get('global.validation.error.message') + '<br/>';

               if (setIdReqMsg) {
                  message += '<br/>' + setIdReqMsg;
               }

               if (descrReqMsg) {
                  message += '<br/>' + descrReqMsg;
               }

               if (destReqMsg) {
                  message += '<br/>' + destReqMsg;
               }

               MessageService.error('global.validation.error', message);
            }
         }
      }
      else if (self.isStep2) {
         self.validate(base.MAIN);
      }
      else if (self.isStep3) {
         self.validate(base.DEFAULT);
      }
      else if (self.isStep4) {
         self.validate(base.PROD);
      }
      else if (self.isStep5) {
         self.validate(base.SORT);
      }
   };

   self.save = function () {
      base.newSetPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            base.newSetPrinterSettings = data.printerDetails;
            self.validate(base.SCHED);
         }
      });
   };

   self.validate = function (type) {

      // Load the Selection List
      if (type) {
         if (type.toLowerCase() === 'sort') {
            var index;
            var arraylength = self.selectedSortFields.length;
            base.pdemNewSet.sortselection = '';

            // Build comma delimited list for Back End Sort
            for (index = 0; index < arraylength; index++) {

               if (self.selectedSortFields[index].value) {
                  if (index === 0) {
                     base.pdemNewSet.sortselection = self.selectedSortFields[index].value;
                  } else {
                     base.pdemNewSet.sortselection += ',' + self.selectedSortFields[index].value;
                  }
               }
            }
         }
      }

      var validateRequest = {
         pdemnewset: base.pdemNewSet,
         pvType: type
      };

      DataService.post('api/pd/aspdentry/pdemnewsetvalidate', { data: validateRequest, busy: true }, function (response) {
         if (response) {
            if (!MessageService.processMessaging(response)) {
               var questionMessageText = MessageService.getQuestionMessages(response.messaging);
               if (questionMessageText) {
                  MessageService.yesNo('global.question', questionMessageText, function () {
                     //yes callback
                     switch (type) {
                        case base.DEFAULT:
                           if (base.pdemNewSet) {
                              if ((base.pdemNewSet.destination.toLowerCase() === base.PDSC_CUSTOMER_BY_PRODUCT) ||
                                  (base.pdemNewSet.destination.toLowerCase() === base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT) ||
                                  (base.pdemNewSet.destination.toLowerCase() === base.PDSC_PRODUCT) ||
                                  (base.pdemNewSet.destination.toLowerCase() === base.PDSR_REBATE_ON_PRODUCT)) {
                                 self.navigateToNext();
                              }
                              else {
                                 self.isStep1 = false;
                                 self.isStep2 = false;
                                 self.isStep3 = false;
                                 self.isStep4 = false;
                                 self.isStep5 = true;
                                 self.isStep6 = false;
                              }
                           }
                           break;
                        case base.SCHED:
                           var newSetFinalRequest = {
                              pdemnewset: base.pdemNewSet,
                              printersettings: base.newSetPrinterSettings
                           };

                           DataService.post('api/pd/aspdentry/pdemnewsetfinal', {
                              data: newSetFinalRequest, busy: true
                           }, function (newSetResponse) {
                              $state.go('pdem.master');
                           });
                           break;
                        default:
                           self.navigateToNext();
                           break;
                     }
                  });
               }
               else {
                  switch (type) {
                     case base.DEFAULT:
                        if (base.pdemNewSet) {
                           if ((base.pdemNewSet.destination.toLowerCase() === base.PDSC_CUSTOMER_BY_PRODUCT) ||
                               (base.pdemNewSet.destination.toLowerCase() === base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT) ||
                               (base.pdemNewSet.destination.toLowerCase() === base.PDSC_PRODUCT) ||
                               (base.pdemNewSet.destination.toLowerCase() === base.PDSR_REBATE_ON_PRODUCT)) {
                              self.navigateToNext();
                           }
                           else {
                              self.isStep1 = false;
                              self.isStep2 = false;
                              self.isStep3 = false;
                              self.isStep4 = false;
                              self.isStep5 = true;
                              self.isStep6 = false;
                           }
                        }
                        break;
                     case base.SCHED:
                        var newSetFinalRequest = {
                           pdemnewset: base.pdemNewSet,
                           printersettings: base.newSetPrinterSettings
                        };

                        DataService.post('api/pd/aspdentry/pdemnewsetfinal', {
                           data: newSetFinalRequest, busy: true
                        }, function (newSetResponse) {
                           $state.go('pdem.master');
                        });
                        break;
                     default:
                        self.navigateToNext();
                        break;
                  }
               }
            }
         }
      });
   };

   self.navigateToNext = function () {
      if (self.isStep1) {
         self.initializeStep2();
         self.isStep1 = false;
         self.isStep2 = true;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep2) {
         base.initializePdemNewSet(base.DEFAULT);
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep3) {
         base.initializePdemNewSet(base.PROD);
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = true;
         self.isStep6 = false;
      }
      else if (self.isStep4) {
         //No need for the SORT initialize as long as hard coding the Swap List in create.js
         //base.initializePdemNewSet(base.SORT);
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = true;
         self.isStep6 = false;
      }
      else if (self.isStep5) {
         base.initializePdemNewSet(base.SCHED);
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = true;
      }
   };

   self.navigateToPrevious = function () {
      if (self.isStep2) {
         self.isStep1 = true;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep3) {
         self.isStep1 = false;
         self.isStep2 = true;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep4) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep5) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
         self.isStep5 = false;
         self.isStep6 = false;
      }
      else if (self.isStep6) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = false;
         self.isStep4 = false;
         self.isStep5 = true;
         self.isStep6 = false;
      }
   };

   self.getPDSCRecordTypeLabel = function (field) {
      var recordTypeLabel = JSLINQ(base.levelCodePDSC)
                           .Where(function (item) {
                              return item.value === field;
                           })
                         .FirstOrDefault(function (item) {
                            return item;
                         });
      return recordTypeLabel.label;
   };

   self.getPDSRRecordTypeLabel = function (field) {
      var recordTypeLabel = JSLINQ(base.levelCodePDSR)
                           .Where(function (item) {
                              return item.value === field;
                           })
                         .FirstOrDefault(function (item) {
                            return item;
                         });
      return recordTypeLabel.label;
   };

   self.initializeStep2 = function () {

      self.isNewCustomerTemplate = false;
      self.isNewCustomerTypeTemplate = false;
      self.isNewRebateTemplate = false;

      self.priceTypeLabel = '';
      self.header = '';
      self.recordTypeLabel = '';
      self.recordTypeText = '';

      switch (base.pdemNewSet.destination.toLowerCase()) {
         case base.PDSC_CUSTOMER_BY_PRICE_TYPE:
         case base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT_PRICE_TYPE:
         case base.PDSR_REBATE_ON_PRODUCT_PRICE:
         case base.PDSC_PRODUCT_PRICE_TYPE:
            self.priceTypeLabel = MessageService.get('global.product.price.type');
            break;
         case base.PDSC_CUSTOMER_BY_PRODUCT_CATEGORY:
         case base.PDSR_REBATE_ON_PRODUCT_CATEGORY:
            self.priceTypeLabel = MessageService.get('global.product.category');
            break;
         case base.PDSC_CUSTOMER_BY_PRODUCT_REBATETYPE:
         case base.PDSC_CUSTOMER_PRICE_TYPE_BY_REBATE_TYPE:
         case base.PDSR_REBATE_ON_REBATE_TYPE:
            self.priceTypeLabel = MessageService.get('global.rebate.type');
            break;
         case base.PDSC_CUSTOMER_BY_PRODUCT_LINE:
         case base.PDSR_REBATE_ON_PRODUCT_LINE:
            self.priceTypeLabel = MessageService.get('global.product.line');
            break;
         case base.PDSC_CUSTOMER:
         case base.PDSC_PRODUCT:
            self.priceTypeLabel = base.pdemNewSet.leveltylabel;
            break;
      }

      switch (base.pdemNewSet.destination.toLowerCase()) {
         case base.PDSC_CUSTOMER_BY_PRODUCT:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_BY_PRODUCT);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER_BY_PRICE_TYPE:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_BY_PRICE_TYPE);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER_BY_PRODUCT_LINE:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_BY_PRODUCT_LINE);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER_BY_PRODUCT_CATEGORY:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_BY_PRODUCT_CATEGORY);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER_BY_PRODUCT_REBATETYPE:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_BY_PRODUCT_REBATETYPE);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_PRODUCT:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_PRODUCT);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_PRODUCT_PRICE_TYPE:
            self.isNewCustomerTemplate = true;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = false;
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_PRODUCT_PRICE_TYPE);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            break;
         case base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = true;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT_PRICE_TYPE:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT_PRICE_TYPE);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = true;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER_PRICE_TYPE_BY_REBATE_TYPE:
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_PRICE_TYPE_BY_REBATE_TYPE);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = true;
            self.isNewRebateTemplate = false;
            break;
         case base.PDSC_CUSTOMER_PRICE_TYPE:
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = true;
            self.isNewRebateTemplate = false;
            self.recordTypeLabel = self.getPDSCRecordTypeLabel(base.PDSC_CUSTOMER_PRICE_TYPE);
            self.recordTypeText = MessageService.get('global.pricing.records.selection');
            break;
         case base.PDSR_REBATE_ON_PRODUCT:
            self.recordTypeLabel = self.getPDSRRecordTypeLabel(base.PDSR_REBATE_ON_PRODUCT);
            self.recordTypeText = MessageService.get('global.rebate.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = true;
            break;
         case base.PDSR_REBATE_ON_REBATE_TYPE:
            self.recordTypeLabel = self.getPDSRRecordTypeLabel(base.PDSR_REBATE_ON_REBATE_TYPE);
            self.recordTypeText = MessageService.get('global.rebate.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = true;
            break;
         case base.PDSR_REBATE_ON_PRODUCT_PRICE:
            self.recordTypeLabel = self.getPDSRRecordTypeLabel(base.PDSR_REBATE_ON_PRODUCT_PRICE);
            self.recordTypeText = MessageService.get('global.rebate.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = true;
            break;
         case base.PDSR_REBATE_ON_PRODUCT_LINE:
            self.recordTypeLabel = self.getPDSRRecordTypeLabel(base.PDSR_REBATE_ON_PRODUCT_LINE);
            self.recordTypeText = MessageService.get('global.rebate.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = true;
            break;
         case base.PDSR_REBATE_ON_PRODUCT_CATEGORY:
            self.recordTypeLabel = self.getPDSRRecordTypeLabel(base.PDSR_REBATE_ON_PRODUCT_CATEGORY);
            self.recordTypeText = MessageService.get('global.rebate.records.selection');
            self.isNewCustomerTemplate = false;
            self.isNewCustomerTypeTemplate = false;
            self.isNewRebateTemplate = true;
            break;
      }

      self.header = MessageService.get('message.this.page.allows.you.to.enter.various.combinations.of.criteria');
      base.initializePdemNewSet(base.MAIN);
   };

});

app.controller('PdemCreateStep1Ctrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

});

app.controller('PdemCreateStep2Ctrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

});

app.controller('PdemCreateStep3Ctrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

});

app.controller('PdemCreateStep4Ctrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

});

app.controller('PdemCreateStep5Ctrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

});

app.controller('PdemCreateStep6Ctrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

});