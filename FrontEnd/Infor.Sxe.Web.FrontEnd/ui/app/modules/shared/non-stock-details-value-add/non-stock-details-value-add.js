'use-strict';

/**
 * Steps to implement this Nonstock Details Value Add control.
 *
 * 1) In your calling view with WYSIWYG, drop a Custom Control called: "NonStockDetailsValueAdd" onto your collapsable panel.
 * 2) In design mode of the implementation:
 *    a) Set the Object containing the line information from your controller.
 *    b) If this is being called from Add Mode in your calling program, check the box.  Otherwise, unchecked for Change/Edit mode.
 *    c) Set the Control, Ready, and DoneCallback references so you can reach into here and perform the Save from parent.
 * 3) Do your necessary work in the calling controller to reach in to do the Save, and accept the DoneCallback.  It's assumed that
 *    this is done from there and not having a separate Save button in here.
 */

/*
Loose-ends:
*  -The Product needs to be the 'ProductWhseProdCatalogXrefNonStockInline' inline.  Not available yet.
*  -There is some logic, and not sure how to trap for it, where if the Product is found in the Catalog, to bring in the defaults.
*  -The "vasplineaddleavefield" call doesn't seem to be bringing us the defaults (such as arpvendno)
*/

/**
 * Control for displaying Nonstock Details for Value Add.  This is used in areas such as VAEI, VAES, and POEI (surplus/finished product).
 * The intent is that this sits in a view, perhaps sitting in a collapsable panel.
 *
 * Alias: nonstockDetailsValueAdd
 */
app.controller('NonstockDetailsValueAddCtrl', function ($scope, $state, $translate, Utils, DataService, MessageService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.isLeadTimeVisible = false;
   self.NONSTOCKTYPE_NONSTOCK = 'n';
   self.NONSTOCKTYPE_SPECIAL = 's';
   self.FIELDNAME_PRODUCT = 'Prod';
   self.vaLineNonStock = null;  //Of type: Vasplinenonstock  This is what the fields in the view are bound to.
   self.vaspLineAdd = {};  //Used for VASP (Add mode).  Q: Is this VAES?
   self.vaspLineChange = {}; //Used for VASP (Change mode)    Q:  Is this VAES?
   self.vaSetupVaFabWhseArpResponse = {};

   //Get the design-time options.
   self.isAddMode = options.isAddMode;

   if (options.vaLineModel) {
      self.vaLineNonStock = Utils.getNestedValue($scope, options.vaLineModel);
   }

   self.productChangeAdd = function () {
      var vaspLineAddLeaveFieldCriteria = {
         vasplineadd: self.vaLineNonStock,
         cFieldName: self.FIELDNAME_PRODUCT
      };

      DataService.post('api/va/asvasetup/vasplineaddleavefield', { data: vaspLineAddLeaveFieldCriteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            self.vaLineNonStock.shipprod = data.vasplineadd.shipprod;
            self.vaLineNonStock.proddesc = data.vasplineadd.proddesc;
            self.vaLineNonStock.proddesc2 = data.vasplineadd.proddesc2;
            self.vaLineNonStock.cubes = data.vasplineadd.cubes;
            self.vaLineNonStock.weight = data.vasplineadd.weight;
            self.vaLineNonStock.prodcost = data.vasplineadd.prodcost;
            self.vaLineNonStock.prodcat = data.vasplineadd.prodcat;
            self.vaLineNonStock.arpvendno = data.vasplineadd.arpvendno;
            self.vaLineNonStock.arpprodline = data.vasplineadd.arpprodline;
            self.vaLineNonStock.arpwhse = data.vasplineadd.arpwhse;
            self.vaLineNonStock.whse = data.vasplineadd.whse.length === 0 ? data.vasplineadd.vawhse : data.vasplineadd.whse;
            self.vaLineNonStock.rushfl = data.vasplineadd.rushfl;
            self.vaLineNonStock.leadtm = data.vasplineadd.leadtm;

            self.vaLineItemNonStockModel = {
               VaWhse: data.vasplineadd.vawhse
            };
         }
      });
   };

   self.productChangeEditContinue = function (vasplinechange) {
      self.vaLineNonStock.shipprod = vasplinechange.shipprod;
      self.vaLineNonStock.proddesc = vasplinechange.proddesc;
      self.vaLineNonStock.proddesc2 = vasplinechange.proddesc2;
      self.vaLineNonStock.cubes = vasplinechange.cubes;
      self.vaLineNonStock.weight = vasplinechange.weight;
      self.vaLineNonStock.prodcost = vasplinechange.prodcost;
      self.vaLineNonStock.prodcat = vasplinechange.prodcat;
      self.vaLineNonStock.arpvendno = vasplinechange.arpvendno;
      self.vaLineNonStock.arpprodline = vasplinechange.arpprodline;
      self.vaLineNonStock.arpwhse = vasplinechange.arpwhse;
      self.vaLineNonStock.whse = vasplinechange.whse.length === 0 ? vasplinechange.vawhse : vasplinechange.whse;
      self.vaLineNonStock.rushfl = vasplinechange.rushfl;
      self.vaLineNonStock.leadtm = vasplinechange.leadtm;

      self.vaLineItemNonStockModel = {
         VaWhse: vasplinechange.vawhse
      };
   };

   self.productChangeEdit = function () {

      DataService.post('api/va/asvasetup/vasplineleaveprod', { data: self.vaLineNonStock, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }
            if (data.vasplinechange && data.vasplinechange.vawhse) {
               DataService.get('api/va/asvasetup/vafabwhsearp/{cFabWhse}', { pathParams: data.vasplinechange.vawhse, busy: true }, function (data2) {
                  if (data2) {
                     self.vaSetupVaFabWhseArpResponse = data2;
                     self.productChangeEditContinue(data2.vasplinechange);
                  }
               });
            } else {
               self.productChangeEditContinue(data.vasplinechange);
            }
         }
      });
   };

   self.productChange = function () {
      if (self.vaLineNonStock.shipprod && self.vaLineNonStock.shipprod.length > 0) {
         if (self.isAddMode) {
            self.productChangeAdd();
         } else {
            self.productChangeEdit();
         }
      }
   };

   self.validate = function () {
      if (!self.vaLineNonStock.shipprod || self.vaLineNonStock.shipprod.length === 0) {
         MessageService.error('global.error', 'message.product.is.required');
         return false;
      } else {
         return true;
      }
   };

   self.updateComplete = function (data) {
      if (options.doneCallback) {
         // Remove invoke parenthesis if present since we simply want to get the reference to the function
         var callback = options.doneCallback.replace('()', '');

         if (callback) {
            var fn = Utils.getNestedValue($scope, callback);
            if (fn) {
               fn(data);
            }
         }
      }
   };

   self.save = function () {
      if (self.validate()) {
         DataService.post('api/va/asvasetup/vasplinenonstockval', { data: self.vaLineNonStock, busy: true }, function (data) {
            if (data) {
               if (data.asknsoanfl) {
                  MessageService.yesNo('global.question', 'question.product.is.an.active.order.as.needed',
                     //Yes
                     function () {
                        self.vaLineNonStock.nonstockty = self.NONSTOCKTYPE_SPECIAL;
                     },
                     //No
                     function () {
                        self.vaLineNonStock.nonstockty = self.NONSTOCKTYPE_NONSTOCK;
                     });
               } else {
                  self.vaLineNonStock.nonstockty = self.NONSTOCKTYPE_NONSTOCK;
               }

               self.updateComplete(data);
            }
         });
      }
   };

   // Notify that the controller is now ready
   customCtrl.ready(self);
});
