'use strict';

/**
 * Skeleton Service for making soap-calls.
 */

app.service('SoapService', function SoapService(DataService) {

   var self = this;

   self.returnTypesEnum = {
      TEXT: 0,
      XML: 1,
      JSON: 2
   };

   // Changes XML to JSON

   self.xmlToJson = function (xml) {

      // Create the return object
      var obj = {};

      if (xml.nodeType === 3) { // text
         obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
         for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName.replace(/-/g, '');
            if (obj[nodeName] === undefined) {
               obj[nodeName] = self.xmlToJson(item);
            } else {
               if (!Array.isArray(obj[nodeName])) {
                  var old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
               }
               obj[nodeName].push(self.xmlToJson(item));
            }
         }
      }

      if (obj['#text']) {
         return obj['#text'].trim();
      }

      if ($.isEmptyObject(obj)) {
         return '';
      }

      return obj;
   };

   // Make a SOAP call with the inputted params and pass back the results.

   self.makeSoapCall = function (uri, nameSpace, method, soapActionMethod, isBusy, user, password, params, body, returnType, callBack, callBackError) {
      var headers = {
         Token: undefined,
         'Content-Type': 'text/xml; charset=utf-8',
         SOAPAction: nameSpace + soapActionMethod
      };

      DataService.send(uri, { method: method, headers: headers, data: body, params: params, busy: isBusy }, function (data) {
         var returnValue;
         switch (returnType) {
            //This data always comes back as text (i.e. even though it is XML)
            case self.returnTypesEnum.TEXT:
               returnValue = data;
               break;
            case self.returnTypesEnum.XML:
               returnValue = $.parseXML(data);
               break;
            case self.returnTypesEnum.JSON:
               returnValue = self.xmlToJson($.parseXML(data));
               break;
            default:
               returnValue = data;
               break;
         }
         callBack(returnValue);
      }, callBackError);
   };


   /**
    * ICS or Custom Code will be added under here to properly define the call and to deal with the return.
    */
});