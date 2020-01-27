'use-strict';

/**
 * Control for displaying Line Comments
 */
app.controller('LineCommentsCtrl', function ($scope, $state, Utils, DataService, MessageService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   var commentType = options.commentTypeModel;
   var tableName = options.tableNameModel;
   var lineNumber = Utils.getNestedValue($scope, options.lineNumberModel);
   var orderNumber = Utils.getNestedValue($scope, options.orderNumberModel);
   var orderSuffix = 0;
   self.isAutoFocus = options.isAutoFocus;

   if (options.orderSuffixModel) {
      orderSuffix = Utils.getNestedValue($scope, options.orderSuffixModel);
   }

   self.criteria = {
      type: commentType,
      tablename: tableName,
      orderno: orderNumber,
      ordersuf: orderSuffix,
      lineno: lineNumber
   };

   self.printedComment = {};
   self.internalComment = {};

   if (tableName) {
      DataService.post('api/shared/assharedentry/sharedcommentload', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.printedComment = {};
            self.internalComment = {};
            data.forEach(function (record) {
               if (record.printfl) {
                  self.printedComment = record;
               } else {
                  self.internalComment = record;
               }
            });
         }
      });
   }

   self.deleteComment = function (printed) {
      var deleteList = [];

      if (self.printedComment) {
         if (printed) {
            self.printedComment.deletefl = true;
         }
         deleteList.push(self.printedComment);
      }
      if (self.internalComment) {
         if (!printed) {
            self.internalComment.deletefl = true;
         }
         deleteList.push(self.internalComment);
      }

      DataService.post('api/shared/assharedentry/sharedcommentdelete', { data: deleteList, busy: true }, function (data) {
         if (data) {
            if (data.sharedcommentresults) {
               self.printedComment = {};
               self.internalComment = {};
               data.sharedcommentresults.forEach(function (record) {
                  if (record.printfl) {
                     self.printedComment = record;
                  } else {
                     self.internalComment = record;
                  }
               });
               MessageService.info('global.information', 'message.the.selected.line.comment.has.been.deleted');
            }
         }
      });
   };

   self.commentTextChanged = function (printed) {
      if (printed) {
         if (self.printedComment) {
            self.printedComment.changedfl = true;
         }
      } else {
         if (self.internalComment) {
            self.internalComment.changedfl = true;
         }
      }
   };

   self.saveComments = function () {
      var updateList = [];

      if (self.printedComment) {
         updateList.push(self.printedComment);
      }
      if (self.internalComment) {
         updateList.push(self.internalComment);
      }

      DataService.post('api/shared/assharedentry/sharedcommentsave', { data: updateList, busy: true }, function (data) {
         if (data) {
            if (data.sharedcommentresults) {
               self.printedComment = {};
               self.internalComment = {};
               data.sharedcommentresults.forEach(function (record) {
                  if (record.printfl) {
                     self.printedComment = record;
                  } else {
                     self.internalComment = record;
                  }
               });
               MessageService.info('global.information', 'message.line.comments.have.been.saved');
            }
         }
      });
   };

   if (options.conditionReadonly) {
      $scope.$watch(options.conditionReadonly, function (newValue) {
         if (newValue) {
            self.isReadOnly = true;
         } else {
            self.isReadOnly = false;
         }
      });
   }

   // Notify that the controller is now ready
   customCtrl.ready(self);
});