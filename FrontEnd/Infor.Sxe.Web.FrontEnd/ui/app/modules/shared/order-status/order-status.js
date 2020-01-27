'use strict';

app.controller('OrderStatusCtrl', function ($state, $stateParams, $translate, DataService, AuthService, MessageService) {
   // alias => ordStat
   var self = this;

   self.whseLogStatus = $stateParams.whseLogStatus;
   self.menuFunction = $stateParams.menuFunction;
   self.setWhseLogStatusCallback = $stateParams.setWhseLogStatusCallback;
   self.setFailCallback = $stateParams.setFailCallback;
   self.isFiWlWhseChange = false;
   self.isFiWlUnpick = false;

   self.initialize = function () {
      DataService.post('api/wl/aswlinquiry/wlstatusinitiate', { data: self.whseLogStatus, busy: true }, function (data) {
         if (data) {
            self.whseLogStatus = data;

            //User Hook (do not rename)
            if (self.initializeContinue) {
               self.initializeContinue();
            }
         }
      });
   }

   self.orderStatusMessage = function () {
      var message = self.whseLogStatus.custorddata + '<br/>';
      message += self.whseLogStatus.rcvorddata + '<br/>';
      message += self.whseLogStatus.displaymsg1 + '<br/>';
      message += self.whseLogStatus.displaymsg2 + '<br/>';
      message += self.whseLogStatus.displaymsg3;
      return message;
   };

   self.wlWhseChanged = function () {
      DataService.post('api/wl/aswlinquiry/wlstatusleavewhsechgfl', { data: self.whseLogStatus, busy: true }, function (data) {
         if (data) {
            self.whseLogStatus = data;
         }
      });
   };

   self.wlUnpickChanged = function () {
      DataService.post('api/wl/aswlinquiry/wlstatusleaveunpickoefl', { data: self.whseLogStatus, busy: true }, function (data) {
         if (data) {
            self.whseLogStatus = data;
         }
      });
   };

   self.continue = function () {
      var wlStatusCompleteRequest = {
         wlstatus: self.whseLogStatus,
         cProcedure: self.menuFunction
      };
      DataService.post('api/wl/aswlinquiry/wlstatuscomplete', { data: wlStatusCompleteRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.whseLogStatus = data.wlstatus;

               if (self.setWhseLogStatusCallback) {
                  self.setWhseLogStatusCallback({ newWhseLogStatus: data.wlstatus, stage: '' });
               }

               if (data.pvCheckesbauth) {
                  AuthService.createAuthPoint('esbwl', '', '', '', '', null, self.wlStatusAuthPointPassed, self.wlStatusAuthPointFailed);
               } else if (data.pvChecktwlauth) {
                  AuthService.createAuthPoint('wlord', '', '', '', '', null, self.wlStatusAuthPointPassed, self.wlStatusAuthPointFailed);
               }
               else {
                  self.finish();
               }
            } else if (self.setFailCallback) {
               self.setFailCallback();
               $state.go('^');
            }
         }
      }, function (data) {
         if (data) {
            MessageService.processMessaging(data.messaging);
         }
         if (self.setFailCallback) {
            self.setFailCallback();
            $state.go('^');
         }
      });
   };

   self.wlStatusAuthPointPassed = function () {
      if (self.setWhseLogStatusCallback) {
         self.setWhseLogStatusCallback({ newWhseLogStatus: null, stage: 'authPointPassed' });
      }
      self.finish();
   };

   self.wlStatusAuthPointFailed = function () {
      if (self.setWhseLogStatusCallback) {
         self.setWhseLogStatusCallback({ newWhseLogStatus: null, stage: 'authPointFailed' });
      }
      $state.go('^');
   };

   self.finish = function () {
      //Shipping Feedback (OEES) or Split Shipping Feedback to Backorders (OEERS is the function).
      if (self.menuFunction.toLowerCase() === 'oees') {
         //This gets set if they select 'Yes'.  Inform the callback to proceed in the workflow.
         if (self.whseLogStatus.wlwhsechgfl) {
            if (self.setWhseLogStatusCallback) {
               self.setWhseLogStatusCallback({ newWhseLogStatus: null, stage: 'finish' });
            }
         }
         //We do not want to provide a warning message since they can update the lines.
      } else if (self.menuFunction.toLowerCase() !== 'poet' && !self.whseLogStatus.wlwhsechgfl) {
         MessageService.alert($translate.instant('wl.order.in.process'), $translate.instant('message.adding.lines.has.been.disabled.cannot.make.change'));
         if (self.setWhseLogStatusCallback) {
            self.setWhseLogStatusCallback({ newWhseLogStatus: null, stage: 'finishWarning' });
         }
      }
      else {
         if (self.setWhseLogStatusCallback) {
            self.setWhseLogStatusCallback({ newWhseLogStatus: null, stage: 'finishFullSuccess' });
         }
      }
      //Only applicable from Purchase Order Entry
      if (self.menuFunction.toLowerCase() === 'poet') {
         if (self.setWhseLogStatusCallback) {
            self.setWhseLogStatusCallback({ newWhseLogStatus: null, stage: 'finish' });
         }
      }

      $state.go('^');
   };

   self.initialize();

});