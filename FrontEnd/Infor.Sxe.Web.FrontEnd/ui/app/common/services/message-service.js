'use strict';

app.service('MessageService', function MessageService($sanitize, $translate, $timeout) {

   // NOTE: $timeout should be used on all callbacks to ensure that scope is applied correctly

   /* Public methods */

   /**
    * Get a string by translation key
    */
   this.get = function (key, params) {
      return $translate.instant(key, params);
   };

   /**
    * Check if a string exists for the given translation key
    */
   this.has = function (key) {
      // The 'instant' api returns the passed key if doesn't exist, so we can know by checking equality
      return $translate.instant(key) !== key;
   };

   /**
    * Show an informational toast message
    */
   this.info = function (title, msg, params) {
      showToast(title, msg, params);
   };

   /**
    * Show an alert/warning toast message
    */
   this.alert = function (title, msg, params) {
      showToast(title, msg, params);
   };

   this.alertOk = function (title, msg, okCallback) {
      $('body').message({
         title: safeTranslate(title),
         message: getMessages(msg),
         buttons: [{
            text: $translate.instant('global.ok'),
            click: function (e, modal) {
               modal.close();
               if (okCallback) {
                  $timeout(okCallback);
               }
            }
         }]
      });
   };

   /**
    * Show an error message
    */
   this.error = function (title, msg, params) {
      showError(title, msg, params);
   };

   /**
    * Show a confirmation/information message in a popup (more important than an info toast)
    */
   this.confirmation = function (title, msg, params) {
      showPopup(title, msg, params);
   };

   /**
    * Process dynamic messaging response
    */
   this.processMessaging = function (messaging) {
      if (messaging && messaging.length > 0) {
         var errorMessages = [];
         var warningMessages = [];
         var infoMessages = [];
         for (var i = 0; i < messaging.length; i++) {
            var currentMessage = messaging[i];
            if (currentMessage.messagetype.toLowerCase() === 'e') {
               errorMessages.push(currentMessage);
            } else if (currentMessage.messagetype.toLowerCase() === 'w') {
               warningMessages.push(currentMessage);
            } else if (currentMessage.messagetype.toLowerCase() === 'qyn' || currentMessage.messagetype.toLowerCase() === 'qync') {
               //do nothing, these need to be handled seperately (use this.getQuestionMessages)
            } else {
               infoMessages.push(currentMessage);
            }
         }

         var hasErrors = false;

         if (infoMessages.length > 0) {
            this.infoMessages(infoMessages);
         }
         if (warningMessages.length > 0) {
            this.alertMessages(warningMessages);
         }
         if (errorMessages.length > 0) {
            this.errorMessages(errorMessages);
            hasErrors = true;
         }

         return hasErrors;
      }
      return false;
   };

   this.processMessagingOnlyReportErrors = function (messaging) {
      if (messaging && messaging.length > 0) {
         var errorMessages = [];
         for (var i = 0; i < messaging.length; i++) {
            var currentMessage = messaging[i];
            if (currentMessage.messagetype.toLowerCase() === 'e') {
               errorMessages.push(currentMessage);
            }
         }

         var hasErrors = false;

         if (errorMessages.length > 0) {
            this.errorMessages(errorMessages);
            hasErrors = true;
         }

         return hasErrors;
      }
      return false;
   };

   /**
    * Process/show list of info messages
    */
   this.infoMessages = function (messages) {
      if (messages && messages.length > 0) {
         for (var i = 0; i < messages.length; i++) {
            if (messages[i]) {
               this.info('global.info', messages[i].messagetxt);
            }
         }
      }
   };

   /**
    * Process/show list of alert messages
    */
   this.alertMessages = function (messages) {
      if (messages && messages.length > 0) {
         for (var i = 0; i < messages.length; i++) {
            if (messages[i]) {
               var currentMessage = messages[i];
               var text = safeTranslate(currentMessage.messagetxt);
               if (currentMessage.messagenum) {
                  text += ' (' + currentMessage.messagenum + ')';
               }

               this.alert('global.warning', text);
            }
         }
      }
   };

   /**
    * Process/show list of error messages
    */
   this.errorMessages = function (messages) {
      if (messages && messages.length > 0) {
         var numMsgs = 0;
         var text = '';

         for (var i = 0; i < messages.length; i++) {
            var currentMessage = messages[i];
            if (currentMessage) {
               //if this is the second or more message, add new line
               if (i > 0) {
                  text += '<br /><br />';
               }
               //fieldlabel error format
               if (currentMessage.fieldlabel) {
                  text += safeTranslate(currentMessage.fieldlabel) + ': ' + safeTranslate(currentMessage.messagetxt);
               } else { //default error format
                  text += safeTranslate(currentMessage.messagetxt);
               }
               //always add message number if it exists
               if (currentMessage.messagenum) {
                  text += ' (' + currentMessage.messagenum + ')';
               }

               numMsgs++;
            }
         }

         // Singular/plural error title
         var title;
         if (numMsgs === 1) {
            title = safeTranslate('global.error');
         } else {
            title = safeTranslate('global.errors', { errorCount: numMsgs });
         }

         // Print as one error message
         this.error(title, text);
      }
   };

   /**
    * Process messages for questions and return message text string
    */
   this.getQuestionMessages = function (messaging) {
      var questionMessageText = '';
      if (messaging && messaging.length > 0) {
         messaging.forEach(function (message) {
            if (message.messagetype.toLowerCase() === 'qyn' || message.messagetype.toLowerCase() === 'qync') {
               questionMessageText += message.messagetxt + '\n';
            }
         });
      }
      return questionMessageText;
   };

   /**
    * Display a message with Ok & Cancel options
    */
   this.okCancel = function (title, msg, okCallback, cancelCallback) {
      $('body').message({
         title: safeTranslate(title),
         message: getMessages(msg),
         buttons: [{
            text: $translate.instant('global.cancel'),
            click: function (e, modal) {
               modal.close();
               if (cancelCallback) {
                  $timeout(cancelCallback);
               }
            }
         }, {
            text: $translate.instant('global.ok'),
            isDefault: true,
            click: function (e, modal) {
               modal.close();
               if (okCallback) {
                  $timeout(okCallback);
               }
            }
         }]
      });
   };

   /**
   * Display a message with Yes & No options - yes is default
   */
   this.yesNo = function (title, msg, yesCallback, noCallback) {
      $('body').message({
         title: safeTranslate(title),
         message: getMessages(msg),
         buttons: [{
            text: $translate.instant('global.no'),
            click: function (e, modal) {
               modal.close();
               if (noCallback) {
                  $timeout(noCallback);
               }
            }
         }, {
            text: $translate.instant('global.yes'),
            isDefault: true,
            click: function (e, modal) {
               modal.close();
               if (yesCallback) {
                  $timeout(yesCallback);
               }
            }
         }]
      });
   };


   /**
   * Display a message with Yes & No options - No is default
   */
   this.noYes = function (title, msg, noCallback, yesCallback) {
      $('body').message({
         title: safeTranslate(title),
         message: getMessages(msg),
         buttons: [{
            text: $translate.instant('global.yes'),
            click: function (e, modal) {
               modal.close();
               if (yesCallback) {
                  $timeout(yesCallback);
               }
            }
         }, {
            text: $translate.instant('global.no'),
            isDefault: true,
            click: function (e, modal) {
               modal.close();
               if (noCallback) {
                  $timeout(noCallback);
               }
            }
         }]
      });
   };
   /**
   * Display a message with Yes, No & Cancel options
   */
   this.yesNoCancel = function (title, msg, yesCallback, noCallback, cancelCallback) {
      $('body').message({
         title: safeTranslate(title),
         message: getMessages(msg),
         buttons: [{
            text: $translate.instant('global.cancel'),
            click: function (e, modal) {
               modal.close();
               if (cancelCallback) {
                  $timeout(cancelCallback);
               }
            }
         }, {
            text: $translate.instant('global.no'),
            click: function (e, modal) {
               modal.close();
               if (noCallback) {
                  $timeout(noCallback);
               }
            }
         }, {
            text: $translate.instant('global.yes'),
            isDefault: true,
            click: function (e, modal) {
               modal.close();
               if (yesCallback) {
                  $timeout(yesCallback);
               }
            }
         }]
      });
   };

   /* Private methods */
   
   /**
    * This MessageService uses not only translation, but also html sanitization because these strings are getting
    * passed to SoHo and inserted into the DOM. SoHo allows html in the message and toast controls, so we need to
    * sanitize html ourselves to protect against script injection.
    */
   function safeTranslate(str, params) {
      return $sanitize($translate.instant(str, params));
   }

   /**
    * Toast message display implementation
    */
   function showToast(title, msg, params) {
      $('body').toast({
         title: safeTranslate(title),
         message: safeTranslate(msg, params),
         position: 'bottom right' // showing alert & info messages in bottom right to avoid blocking toolbar buttons
      });
   }

   /**
    * Popup message display implementation
    */
   function showPopup(title, msg, params) {
      $('body').message({
         title: safeTranslate(title),
         message: safeTranslate(msg, params),
         buttons: [{
            text: $translate.instant('global.ok'),
            isDefault: true,
            click: function (e, modal) {
               modal.close();
            }
         }]
      });
   }

   /**
    * Error message display implementation
    */
   function showError(title, msg, params) {
      $('body').message({
         title: safeTranslate(title),
         message: safeTranslate(msg, params),
         isError: true,
         buttons: [{
            text: $translate.instant('global.ok'),
            isDefault: true,
            click: function (e, modal) {
               modal.close();
            }
         }]
      });
   }

   /**
    * Helper method to translate single or array of message keys (concatenated by space)
    */
   function getMessages(messageOption) {
      var message = '';

      if (messageOption) {
         if (typeof messageOption === 'string') {
            message = safeTranslate(messageOption);
         } else {
            // Handle array of translation keys and concatenate with space character
            for (var i = 0; i < messageOption.length; i++) {
               message += safeTranslate(messageOption[i]) + ' ';
            }
         }
      }

      return message;
   }

});
