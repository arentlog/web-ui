'use strict';

/**
 * Service for interacting with CenPOS
 */
app.service('CenPosService', function CenPosService(DataService, MessageService) {

   // Current CenPOS modal and url
   var modal = null;
   var cenPosUrl = '';

   // Reference to client's callback functions for the current CenPOS window
   var successCallbackFunction = null;
   var errorCallbackFunction = null;
   var cancelCallbackFunction = null;

   // iFrame size by transaction types
   var iFrameWidth = { add: '400px', modify: '400px', delete: '400px', auth: '400px', sale: '800px', signature: '425px' };
   var iFrameHeight = { add: '500px', modify: '500px', delete: '500px', auth: '550px', sale: '550px', signature: '425px' };


   /* Public API */

   /**
    * Initialize the message listener.
    * The CenPOS iframe redirects to a blank page (cen-pos-response.html) which relays the result through window.postMessage
    */
   this.initialize = function () {
      window.addEventListener('message', handleMessage, false);
   };

   /**
    * Show CenPOS iframe in a modal
    *
    * @param options - object with various options
    *    type - 'add', 'modify', 'sale', etc.
    *    successCallback - register a 'success' callback function for this CenPOS window
    *    failedCallback - register a 'failed' callback function for this CenPOS window
    *    cancelCallback - register a 'cancel' callback function for this CenPOS window
    *    *** Many more options which are used in building the api url (see buildApiUrl function)
    */
   this.showModal = function (options) {
      var type = options.type;

      // Hold on to callback functions for this transaction
      successCallbackFunction = options.successCallback || null;
      errorCallbackFunction = options.errorCallback || null;
      cancelCallbackFunction = options.cancelCallback || null;

      // Build api call url
      var url = buildApiUrl(options);

      // Get CenPOS iframe info
      DataService.get(url, { busy: true }, function (data) {
         var title = MessageService.get(data.PopTitleType);
         cenPosUrl = data.CenPosUri;

         if (cenPosUrl.includes('?')) {
            cenPosUrl += '&wmode=transparent';
         } else {
            cenPosUrl += '?wmode=transparent';
         }

         if (cenPosUrl.includes('type=CreateToken')) {
            cenPosUrl = cenPosUrl.replace('type=CreateToken', 'type=createtoken');
         }
         if (cenPosUrl.includes('type=TokenCheck')) {
            cenPosUrl += '&amount=.00';
         }

         var width = iFrameWidth[type];
         var height = iFrameHeight[type];

         // Wrap CenPOS iframe in div so that SoHo doesn't think it's a standalone iframe CAP
         var content = '<div style="margin-left: 35px;">';
         content += '<iframe name="iframecenpos" style="width: ' + width + '; height: ' + height + ';" frameborder="0"></iframe>';
         content += '</div>';

         // Open CAP modal
         modal = $('body').contextualactionpanel({
            title: title,
            content: content,
            initializeContent: false,
            trigger: 'immediate',
            buttons: [
               {
                  text: MessageService.get('global.interrupt.transaction'),
                  cssClass: 'btn',
                  icon: '#icon-cancel',
                  click: function (e, modal) {
                     MessageService.okCancel('global.interrupt.transaction', 'question.this.operation.could.have.unintended.effects.this', function () {
                        modal.destroy();
                        MessageService.info('global.cenpos', 'global.cenpos.transaction.cancelled');
                     });
                  }
               }
            ]
         }).data('contextualactionpanel');

         $(document).ready(function () {
            var form = document.createElement('form');
            form.id = 'cenposform';
            form.action = cenPosUrl;
            form.method = 'POST';
            form.target = 'iframecenpos';
            document.documentElement.appendChild(form);
            form.submit();
            var element = document.getElementById('cenposform');
            if (element) {
               element.parentNode.removeChild(element);
            }
         });
      });
   };


   // Private methods

   /**
    * Handle message from child iframe
    */
   function handleMessage(event) {
      var eventData = event.data;
      var msgData = eventData ? eventData.data : null;

      // Security: Do not proceed if message is not from same domain and not from cenpos domain
      // - Case 1: Signature responses come straight from the cenpos iframe (they post the message to us)
      // - Case 2: All other responses come from our cen-pos-response.html page (which cenpos redirects to)
      if (!cenPosUrl.startsWith(event.origin) && event.origin !== window.location.origin) {
         return;
      }

      // Do not proceed if the posted message is not our response message or the CenPOSResponse message
      if (!eventData || (eventData.type !== 'SxeCenPosResponse' && eventData.type !== 'CenPOSResponse')) {
         return;
      }

      // For support purposes, this sessionStorage value is how we can log the cenpos response to the console
      if (sessionStorage.SXE_LOG_CENPOS === 'true') {
         console.log('CenPOS Message:', event);
      }

      // Close modal
      modal.destroy();
      modal = null;

      // Invoke client's callback according to cen pos result
      var result = parseInt(msgData.result, 10);
      var message = decodeURIComponent(msgData.message);

      // Handle success, cancel, error, etc.
      if (result === 0 || result === 349 || result === 350) {
         var cenPosVars = {
            sessionid: msgData.sessionid,
            invoice: msgData.invoice,
            referencenumber: msgData.referencenumber,
            responsemsg: msgData.message,
            resultcd: msgData.result,
            transamount: msgData.amount,
            authcode: msgData.authnumber,
            cardtype: msgData.cardtype,
            tracenumber: msgData.traceNumber,
            tokenid: msgData.tokenid,
            origamount: msgData.originalamount,
            nameoncard: msgData.nameoncard,
            emailaddr: msgData.email,
            processas: msgData.processas,
            entrymethod: msgData.entrymethod,
            iscommercialcard: msgData.isCommercialCard,
            operation: msgData.operation,
            cardnumber: msgData.cardnumber ? msgData.cardnumber.split('*').join('') : '',
            image64: msgData.signatureimage
         };

         DataService.post('api/shared/assharedinquiry/cenpostokengenerate', { data: cenPosVars, busy: true }, function () {
            MessageService.info('global.cenpos', message);

            if (successCallbackFunction) {
               successCallbackFunction();
            }

            successCallbackFunction = null;
            cancelCallbackFunction = null;
            errorCallbackFunction = null;
         });
      } else if (result === -1) {
         MessageService.info('global.cenpos', 'global.cenpos.transaction.cancelled');

         if (cancelCallbackFunction) {
            cancelCallbackFunction();
         }

         successCallbackFunction = null;
         cancelCallbackFunction = null;
         errorCallbackFunction = null;
      } else {
         MessageService.error('global.error', message);

         if (errorCallbackFunction) {
            errorCallbackFunction();
         }

         successCallbackFunction = null;
         cancelCallbackFunction = null;
         errorCallbackFunction = null;
      }
   }

   function buildApiUrl(options) {
      var url = '';
      var sepchar = '';

      switch (options.type) {
         case 'add':
            url += 'api/sa/cenpos/addcarduri/' + options.mediacd + '/' + options.custno;
            if (options.shipto) {
               url += '?shipto=' + encodeURIComponent(options.shipto);
               if (options.invoiceno) {
                  url += '&invoiceno=' + options.invoiceno;
               } else if (options.runarscocprecall) {
                  url += '&runarscocprecall=' + options.runarscocprecall;
               }
            } else if (options.invoiceno) {
               url += '?invoiceno=' + options.invoiceno;
               if (options.runarscocprecall) {
                  url += '&runarscocprecall=' + options.runarscocprecall;
               }
            } else if (options.runarscocprecall) {
               url += '?runarscocprecall=' + options.runarscocprecall;
            }
            break;
         case 'modify':
            url += 'api/sa/cenpos/modifycarduri/' + options.mediacd + '/' + options.custno + '/' + options.tokenid;
            if (options.shipto) {
               url += '?shipto=' + encodeURIComponent(options.shipto);
            }
            break;
         case 'delete':
            url += 'api/sa/cenpos/deletecarduri/' + options.mediacd + '/' + options.custno + '/' + options.tokenid;
            if (options.shipto) {
               url += '?shipto=' + encodeURIComponent(options.shipto);
            }
            break;
         case 'auth':
            url += 'api/sa/cenpos/authorizecreditcarduri/' + options.mediacd + '/' + options.custno +
               '/' + options.whse + '/' + options.invoiceno +
               '/' + options.onetimetype + '/' + options.amount +
               '/' + options.taxamt;

            sepchar = '?';

            if (options.ipaddress) {
               url += sepchar + 'ipaddress=' + options.ipaddress;
               sepchar = '&';
            }
            if (options.shipto) {
               url += sepchar + 'shipto=' + encodeURIComponent(options.shipto);
            }
            break;
         case 'sale':
            url += 'api/sa/cenpos/salecreditcarduri/' + options.mediacd + '/' + options.custno +
               '/' + options.whse + '/' + options.invoiceno +
               '/' + options.onetimetype + '/' + options.amount +
               '/' + options.taxamt;

            sepchar = '?';

            if (options.ipaddress) {
               url += sepchar + 'ipaddress=' + options.ipaddress;
               sepchar = '&';
            }
            if (options.shipto) {
               url += sepchar + 'shipto=' + encodeURIComponent(options.shipto);
            }
            break;
         case 'signature':
            url += 'api/sa/cenpos/addsignatureuri/' + options.mediacd + '/' + options.invoiceno;

            if (options.ipaddress) {
               url += '?ipaddress=' + options.ipaddress;
            }
            break;
      }

      return url;
   }
});
