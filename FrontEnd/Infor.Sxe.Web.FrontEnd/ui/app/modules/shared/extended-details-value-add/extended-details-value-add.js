'use-strict';

/**
 * Steps to implement this Extended Details Value Add control.
 *
 * 1) In your calling view with WYSIWYG, drop a Custom Control called: "ExtendedDetailsValueAdd" onto your collapsable panel.
 * 2) In design mode of the implementation:
 *    a) Set the Object containing the line information from your controller.
 *    b) Set the Object containing the criteria for the VA order (i.e data such as the VA#, Suffix, Sequence, and Function Name).
 *    c) Set the Control, Ready, and DoneCallback references so you can reach into here and perform the Save from parent.
 * 3) Do your necessary work in the calling controller to reach in to do the Save, and accept the DoneCallback.  It's assumed that
 *    this is done from there and not having a separate Save button in here.
 */

/**
 * Control for displaying Extended Details for Value Add.  This is used in areas such as VAEI, VAES, and POEI (surplus/finished product).
 * The intent is that this sits in a view, perhaps sitting in a collapsable panel.
 *
 * Alias: extendedDetailsValueAdd
 */
app.controller('ExtendedDetailsValueAddCtrl', function ($scope, $state, $translate, Utils, DataService, MessageService, Sasoo) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.CANCELTYPE_CANCEL = "I";
   self.vaLineAddChange = {};
   self.productDescription = '';
   self.isCancelChecked = false;
   self.isQuantityShippedChanged = false;

   //Get the design-time options.
   if (options.vaLineModel) {
      self.vaLineAddChange = Utils.getNestedValue($scope, options.vaLineModel);
   }
   if (options.criteriaModel) {
      self.vaLineVaLineUpdateRequest = Utils.getNestedValue($scope, options.criteriaModel);
   }

   self.isSeeCostFl = function () {
      return Sasoo.seecostfl;
   };

   self.quantityShippedChanged = function () {
      self.isQuantityShippedChanged = true;
   };

   self.updateComplete = function () {
      if (options.doneCallback) {
         // Remove invoke parenthesis if present since we simply want to get the reference to the function
         var callback = options.doneCallback.replace('()', '');

         if (callback) {
            var fn = Utils.getNestedValue($scope, callback);
            if (fn) {
               fn();
            }
         }
      }
   };

   self.updateLine = function () {
      var vaLineUpdateCriteria = {
         valineaddchg: self.vaLineAddChange,
         pvFunctionnm: self.vaLineVaLineUpdateRequest.pvFunctionnm,
         pvVano: self.vaLineVaLineUpdateRequest.pvVano,
         pvVasuf: self.vaLineVaLineUpdateRequest.pvVasuf,
         pvSeqno: self.vaLineVaLineUpdateRequest.pvSeqno
      };

      DataService.post('api/va/asvaline/valineupdate', { data: vaLineUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.updateComplete();
            }
         }
      });
   };

   self.save = function () {
      if (self.vaLineAddChange) {
         self.vaLineAddChange.cancelty = self.isCancelChecked ? self.CANCELTYPE_CANCEL : '';

         if (!self.isQuantityShippedChanged) {
            self.updateLine();
         } else {
            MessageService.yesNo('global.question', 'question.require.physical.count',
            //Yes
            function () {
               self.vaLineAddChange.setcountfl = true;
               self.updateLine();
            },
            //No
            function () {
               self.vaLineAddChange.setcountfl = false;
               self.updateLine();
            });
         }
      }
   };

   self.initialize = function() {
      if (self.vaLineAddChange) {
         self.isCancelChecked = (self.vaLineAddChange.cancelty && self.vaLineAddChange.cancelty.length > 0) ? true : false;
         self.productDescription = self.vaLineAddChange.proddesc + ' ' + self.vaLineAddChange.proddesc2;
      }
   };

   self.initialize();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});
