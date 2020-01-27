'use-strict';

/**
 * Control for displaying TWL Notes and Comments.  This UI control shows all types returned from the backend
 * for the particular OE or PO being viewed. There are only 2 types of Notes/Comments:  Order Entry (type 'o')
 * and Purchase Order (type 'r').
 * Order Notes can have up to 4 types visible:  Header Notes, Line Comments, Customer Notes or Product Notes.
 * PO Notes can have up to 2 types visible:  Header Notes, Line Comments/Product Notes combined. (No Vendor Notes).
 * This is all driven from the backend and what types of data are interfaces from the SXe tables and the TWL Comments
 * table.
 */
app.controller('TwlNotesCommentsCtrl', function ($scope, $state, Utils, DataService, MessageService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.type = '';
   var typeDescription = options.typeDescriptionModel;
   self.id = Utils.getNestedValue($scope, options.idModel);
   self.lineNumber = Utils.getNestedValue($scope, options.lineNumberModel);
   self.lineSequenceNumber = Utils.getNestedValue($scope, options.lineSequenceNumberModel);

   self.TYPE_DESC_PURCHASEORDER = 'Purchase Order';
   self.TYPE_DESC_ORDERENTRY = 'Order Entry';
   self.TYPE_PURCHASEORDER = 'R';
   self.TYPE_ORDERENTRY = 'O';
   self.TYPE_HEADER = 'h';
   self.TYPE_LINES = 'l';
   self.TYPE_CUSTOMER = 'c';
   self.TYPE_PRODUCT = 'p';

   self.headerNotes = '';
   self.lineComments = '';
   self.customerNotes = '';
   self.productNotes = '';

   self.isHeaderNotesVisible = false;
   self.isLineCommentsVisible = false;
   self.isCustomerNotesVisible = false;
   self.isProductNotesVisible = false;

   self.setVisibility = function () {
      if (self.headerNotes && self.headerNotes.length > 0) {
         self.isHeaderNotesVisible = true;
      }
      if (self.lineComments && self.lineComments.length > 0) {
         self.isLineCommentsVisible = true;
      }
      if (self.customerNotes && self.customerNotes.length > 0) {
         self.isCustomerNotesVisible = true;
      }
      if (self.productNotes && self.productNotes.length > 0) {
         self.isProductNotesVisible = true;
      }
   };

   if (typeDescription) {
      if (typeDescription === self.TYPE_DESC_PURCHASEORDER) {
         self.type = self.TYPE_PURCHASEORDER;
      } else if (typeDescription === self.TYPE_DESC_ORDERENTRY) {
         self.type = self.TYPE_ORDERENTRY;
      } else {
         MessageService.info('global.information', 'global.invalid.twl.note.comment.type');
         return;
      }

      self.getCommentsCriteria = {
         type: self.type,
         id: self.id,
         line: self.lineNumber,
         lineSequence: self.lineSequenceNumber
      };

      DataService.post('api/twl/astwlinquiry/getcomments', { data: self.getCommentsCriteria, busy: true }, function (data) {
         if (data) {
            data.forEach(function (row) {
               switch (row.type.toLowerCase()) {
                  case self.TYPE_HEADER: //ignore jslint - correct indentation
                     self.headerNotes = row.commentText;  //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case self.TYPE_LINES: //ignore jslint - correct indentation
                     self.lineComments = row.commentText; //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case self.TYPE_CUSTOMER: //ignore jslint - correct indentation
                     self.customerNotes = row.commentText; //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case self.TYPE_PRODUCT: //ignore jslint - correct indentation
                     self.productNotes = row.commentText; //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
               }
            });

            self.setVisibility();
         }
      });
   }

   // Notify that the controller is now ready
   customCtrl.ready(self);
});