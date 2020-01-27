'use-strict';

app.controller('OeDocumentPrintCtrl', function ($state, $scope, $stateParams, AodataService, AuthService, DataService, MessageService, ReportService, SecurityService, Sasoo, Utils) {
   var self = this;

   self.orderno = $stateParams.orderno;
   self.ordersuf = $stateParams.ordersuf;
   self.ordernox = '';
   self.printPromoMsg = '';
   self.isUseWhereAppropriate = false;
   self.isAutomaticPrint = false;
   self.isAcknowledgement = false;
   self.isAcknowledgementDisabled = true;
   self.isPrintTicket = false;
   self.isPrintTicketDisabled = true;
   self.isDelivery = false;
   self.isDeliveryDisabled = true;
   self.isInvoice = false;
   self.isInvoiceDisabled = true;
   self.isReceipt = false;
   self.isReceiptDisabled = true;
   self.oeetprintscreensingle = null;
   self.oeetprintglobals = null;
   self.oeetprintreportlist = [];
   self.printerSettingsList = [];

   var acknowledgementService = ReportService.getReportFunction('oeepa');
   var pickTicketService = ReportService.getReportFunction('oeepp');
   var demandInvoiceService = ReportService.getReportFunction('oerd');
   var deliveryNoticeService = ReportService.getReportFunction('oeepd');

   self.printLoadCriteria = {
      orderno: self.orderno,
      ordersuf: self.ordersuf,
      oeepasecure: acknowledgementService ? acknowledgementService.securitylevel : 0,
      oeeppsecure: pickTicketService ? pickTicketService.securitylevel : 0,
      oerdsecure: demandInvoiceService ? demandInvoiceService.securitylevel : 0,
      oeepdsecure: deliveryNoticeService ? deliveryNoticeService.securitylevel : 0
   };

   self.printInitialize = function () {

      if (self.ordernox !== '') {
         var orderParts = self.ordernox.split('-');
         if (orderParts.length === 2) {
            self.orderno = orderParts[0];
            self.ordersuf = orderParts[1];
         } else {
            self.orderno = self.ordernox;
            self.ordersuf = 0;
         }
      }

      self.printLoadCriteria.orderno = Number(self.orderno);
      self.printLoadCriteria.ordersuf = Number(self.ordersuf);

      var printGlobals = {
         cono: Sasoo.cono,
         operinit: Sasoo.oper2,
         gPromomsg: '',
         gWhereappfl: false,
         gInvprintfl: false,
         gAckprintfl: false,
         gPickprintfl: false,
         gDlvprintfl: false,
         gRcptprintfl: false,
         gInvfilefl: false,
         gAckfilefl: false,
         gPickfilefl: false,
         gDlvfilefl: false,
         gRcptfilefl: false,
         gPrinternminv: '',
         gPrinternmack: '',
         gPrinternmpck: '',
         gPrinternmdlv: '',
         gPrinternmrcpt: '',
         gQueueinv: '',
         gQueueack: '',
         gQueuepck: '',
         gQueuedlv: '',
         gQueuercpt: '',
         gWhse: ''
      };

      var request = {
         oeetprintglobals: printGlobals,
         oeetprintloadcriteria: self.printLoadCriteria
      };
      DataService.post('api/oe/asoeentry/oeetprintload', { data: request, busy: true }, function (data) {
         self.oeetprintscreensingle = data.oeetprintscreensingle;
         self.oeetprintglobals = data.oeetprintglobals;
         self.oeetprintreportlist = data.oeetprintreportlist;

         self.oeetprintreportlist.forEach(function (report) {
            if (report.type) {
               if (report.type.toLowerCase() === 'a') {
                  self.isAcknowledgementDisabled = false;
               } else if (report.type.toLowerCase() === 'i') {
                  self.isInvoiceDisabled = false;
               } else if (report.type.toLowerCase() === 'p') {
                  self.isPrintTicketDisabled = false;
               } else if (report.type.toLowerCase() === 'r') {
                  self.isReceiptDisabled = false;
               } else if (report.type.toLowerCase() === 'd') {
                  self.isDeliveryDisabled = false;
               }
            }
         });
      });
   };

   if (self.orderno) {
      self.ordernox = self.orderno + '-' + Utils.pad(self.ordersuf, 2);
      self.printLoadCriteria.orderno = Number(self.orderno);
      self.printLoadCriteria.ordersuf = Number(self.ordersuf);
      self.printInitialize();
   }

   self.back = function () {
      if ($stateParams.backCallback) {
         $stateParams.backCallback();
      }
   };

   self.getPrinterSetting = function (printerData) {
      var printerSetting = {
         printerinstance: printerData.subfunction,
         printtype: printerData.printtype,
         printernm: printerData.printernm,
         emailaddr: printerData.emailaddr,
         flatfilenm: printerData.flatfilenm,
         faxto1: printerData.faxto1,
         faxto2: printerData.faxto2,
         faxphoneno: printerData.faxphoneno,
         faxfrom: printerData.faxfrom,
         faxcom: printerData.faxcom,
         faxpriority: printerData.faxpriorityfl,
         printoptfl: printerData.printoptfl,
         queue: printerData.queue
      };
      return printerSetting;
   };

   self.submit = function () {
      if (self.isAcknowledgement === false && self.isPrintTicket === false && self.isDelivery === false && self.isInvoice === false && self.isReceipt === false) {
         MessageService.error('global.error', 'message.please.enter.one.or.more.document.print.choices');
      } else {
         if ((self.isInvoice || self.isPrintTicket) && AodataService.getValue('OE', 'ISMprint') === "yes") {
            DataService.get('api/oe/oeeh/getbypk?orderno=' + self.orderno + '&ordersuf=' + self.ordersuf + '&fldlist=servicekey', { busy: true }, function (data) {
               if (data) {
                  if (data.servicekey && data.servicekey !== '') {
                     AuthService.createAuthPoint('oerd', '', 'print', '', 'SM', null, function () {
                        self.printPostAuthPoint();
                     }, function () {
                        self.isInvoice = false;
                     });
                  } else {
                     self.printPostAuthPoint();
                  }
               }
            });
         } else {
            self.printPostAuthPoint();
         }
      }
   };

   self.printPostAuthPoint = function () {
      self.printerSettingsList = [];
      // Set print flags for each document choice.
      self.oeetprintreportlist.forEach(function (report) {
         if (report.type !== undefined && report.type !== '') {
            if (report.type.toLowerCase() === 'a') {
               report.printfl = self.isAcknowledgement;
            } else if (report.type.toLowerCase() === 'i') {
               report.printfl = self.isInvoice;
            } else if (report.type.toLowerCase() === 'p') {
               report.printfl = self.isPrintTicket;
            } else if (report.type.toLowerCase() === 'r') {
               report.printfl = self.isReceipt;
            } else if (report.type.toLowerCase() === 'd') {
               report.printfl = self.isDelivery;
            }
         }
      });

      var printScreenSingle = {
         orderno: self.printLoadCriteria.orderno,
         ordersuf: self.printLoadCriteria.ordersuf,
         oeprintid: '',
         whereappchecked: self.isUseWhereAppropriate,
         printersenabled: false,
         userfield: ''
      };

      if (self.oeetprintscreensingle) {
         printScreenSingle.printersenabled = self.oeetprintscreensingle.printersenabled;
         printScreenSingle.oeprintid = self.oeetprintscreensingle.oeprintid;
         printScreenSingle.userfield = self.oeetprintscreensingle.userfield;
      }

      if (self.isAcknowledgement) {
         self.printerSettingsList.push(self.getPrinterSetting(self.acknowledgementPrinter.getPrinterSettingsData()));
      }
      if (self.isPrintTicket) {
         self.printerSettingsList.push(self.getPrinterSetting(self.pickticketPrinter.getPrinterSettingsData()));
      }
      if (self.isDelivery) {
         self.printerSettingsList.push(self.getPrinterSetting(self.deliveryPrinter.getPrinterSettingsData()));
      }
      if (self.isInvoice) {
         self.printerSettingsList.push(self.getPrinterSetting(self.invoicePrinter.getPrinterSettingsData()));
      }
      if (self.isReceipt) {
         self.printerSettingsList.push(self.getPrinterSetting(self.receiptPrinter.getPrinterSettingsData()));
      }

      var validateRequest = {
         oeetprintreportlist: self.oeetprintreportlist,
         printersettings: self.printerSettingsList,
         oeetprintscreensingle: printScreenSingle,
         iOrderNo: self.printLoadCriteria.orderno,
         iOrderSuf: self.printLoadCriteria.ordersuf
      };
      DataService.post('api/oe/asoeentry/oeetprintvalidate', { data: validateRequest, busy: true }, function (data) {
         self.oeetprintscreensingle = data;
         self.printSubmitAfterValidate();
      });
   };

   self.printSubmitAfterValidate = function () {
      var printLaunchCriteria = {
         orderno: self.printLoadCriteria.orderno,
         ordersuf: self.printLoadCriteria.ordersuf,
         promomsg: self.printPromoMsg,
         whereappfl: self.isUseWhereAppropriate,
         userfield: ''
      };

      var printLaunchRequest = {
         oeetprintreportlist: self.oeetprintreportlist,
         printersettings: self.printerSettingsList,
         oeetprintscreensingle: self.oeetprintscreensingle,
         oeetprintlaunchcriteria: printLaunchCriteria
      };

      DataService.post('api/oe/asoeentry/oeetprintlaunch', { data: printLaunchRequest, busy: true }, function () {
         MessageService.info('global.information', 'message.your.print.request.has.been.sent');
         self.back();
      });
   };
});