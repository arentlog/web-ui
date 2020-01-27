'use strict';

/**
 * Service for Authorization points.
 */
app.service('AuthService', function AuthService($compile, $sanitize, $translate, DataService, MessageService) {

   /* Public API */
   this.createAuthPoint = function (functionName, key1, key2, mode, transtype, userContext, okCallback, cancelCallback) {
      // load auth tansaction data
      var authPointTrans = {
         functionname: functionName,
         sectionname: key1,
         pointname: key2,
         modename: mode,
         transtype: transtype
      };

      // Create Auth record and display message to user
      DataService.post('api/shared/assharedentry/authpointtransauthcheck', { data: authPointTrans, busy: true }, function (data) {
         if (data) {
            authPointTrans = data.authpointtrans;

            if (!data.lAuthorized) {
               // Strip off everything after the T so that the date displays properly
               var date = authPointTrans.attemptdt.split('T')[0];

               // Get time string that actually displays properly
               var time = getTimeString(authPointTrans.attempttm);

               // Create the Message that will be displayed to the user
               var msg = '<div class="summary-form">' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.function') + '</span>' + '<span class="data">' + authPointTrans.functionname + '</span>' +
                                 '</div>' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.description') + '</span>' + '<span class="data">' + authPointTrans.descrip + '</span>' +
                                 '</div>' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.attempted.date') + '</span>' + '<span class="data"><time>' + date + '</time></span>' +
                                 '</div>' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.attempted.time') + '</span>' + '<span class="data"><time>' + time + '</time></span>' +
                                 '</div>' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.screen') + '</span>' + '<span class="data">' + authPointTrans.sectionname + '</span>' +
                                 '</div>' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.field') + '</span>' + '<span class="data">' + authPointTrans.pointname + '</span>' +
                                 '</div>' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.mode') + '</span>' + '<span class="data">' + authPointTrans.modename + '</span>' +
                                 '</div>' +
                                 '<div class="field">' +
                                    '<span class="label">' + MessageService.get('global.trans.type') + '</span>' + '<span class="data">' + authPointTrans.transtype + '</span>' +
                                 '</div>' +
                              '</div>';

               $('body').message({
                  title: $sanitize(MessageService.get('global.authorization.required')),
                  message: $sanitize(msg),
                  buttons: [
                     {
                        text: $sanitize(MessageService.get('global.cancel')),
                        click: function (e, modal) {
                           handleCancel(e, modal, cancelCallback, authPointTrans);
                        }
                     },
                     {
                        text: $sanitize(MessageService.get('global.ok')),
                        isDefault: true,
                        click: function (e, modal) {
                           handleOk(e, modal, okCallback, cancelCallback, authPointTrans);
                        }
                     }
                  ]
               });
            } else {
               // User has been authorized
               if (okCallback) {
                  okCallback();
               }
            }
         }
      });
   };

   /* Private methods */
   var handleCancel = function(e, modal, cancelCallback, trans) {
      // User has canceled the operation
      DataService.post('api/shared/assharedentry/authpointtranscancel', { data: trans }, function(data) {
         modal.close();
         if (cancelCallback) {
            cancelCallback();
         }
      });
   };

   var handleOk = function(e, modal, okCallback, cancelCallback, trans) {
      DataService.post('api/shared/assharedentry/authpointtransvalidate', { data: trans }, function(data) {
         if (data) {
            if (data.lDenied) {
               // Authorization has been denied close modal and alert user
               modal.close();
               if (cancelCallback) {
                  cancelCallback();
               }
               MessageService.alert('global.authorization.has.been.denied');
            } else if (data.lAuthorized) {
               // Authorization has passed, allow the user to proceede on
               modal.close();
               if (okCallback) {
                  okCallback();
               }
            }
         }
      });
   };

   var getTimeString = function(time) {
      // split the incoming time string
      var timeSplit = time.split('');
      var length = timeSplit.length;
      var newTime = '';

      // reconstruct time sting
      for (var i = 0; i < length; i += 2) {
         if (i === 0 || i === 2) {
            newTime += timeSplit[i] + timeSplit[i + 1] + ':';
         } else if (i === 4) {
            newTime += timeSplit[i] + timeSplit[i + 1];
            break;
         }
      }

      // Should return: Hours:Minutes:Seconds
      // 11:12:03
      return newTime;
   };
});