'use strict';

app.controller('AoIntegrationsCtrl', function ($scope, $state, $stateParams, $translate, AodataService, DataService, MessageService, Utils) { //as intdtl
   var self = this;
   var base = $scope.base;
   var subject = 'Integrations';
   var taxInterfaceType = AodataService.getValue('TAX', 'taxinterfacety').toLowerCase();
   var dictionary = {
      finIntegrationTy: 'Interface to Financial Integration',
      ionactivateshipto: 'Auto Ship To Generation',
      logicalid: 'LogicalID',
      cloudedition: 'Cloud Edition',
      serviceURL: 'Service URL',
      applicationID: 'Application Name',
      instanceID: 'Instance Name',
      namespaceID: 'Namespace',
      profileID: 'Profile Name',
      multitenantfl: 'Multi Tenant',
      apiKey: 'Api Key',
      taxApplicationID: 'Tax Organization Name',
      taxServiceURL: 'Service URL',
      taxAdminName: 'Web Service User Name',
      taxAdminPassword: 'Web Service User Password',
      taxAppVersion: 'Tax Application Version #',
      taxHostedInterface: 'Hosted Web Service',
      taxHostedSecurityKey: 'Hosted Web Service Security Key',
      certApplicationID: 'Certificate Application Name',
      certAdminName: 'Admin Name',
      certAdminPassword: 'Admin Password',
      certConnection: 'Connection',
      certService: 'Service',
      certContent: 'Content Type',
      addrServiceURL: 'Service URL',
      addrAcctId: 'Account ID',
      addrAcctPswrd: 'Account Password',
      currproc: 'Valid Processes',
      fTPProcess: 'Script to Send Files',
      sIGProcess: 'Script to Send Signature Files',
      printer: 'SASP Printer',
      fAXPrinter: 'SASP Fax/Email Printer',
      fTPAddress: 'FTP Address (Name or IP)',
      fTPUser: 'FTP UserID',
      fTPPassword: 'FTP Password',
      fTPEmail: 'Email Replies',
      fTPRemDir: 'Remote Directory',
      fTPLogFile: 'Log File Name',
      filePrefix: 'File Prefix',
      lockBox: 'Lock Box Name',
      payDir: 'Lock Box Payments Directory',
      eDIfl: 'Send to EDI Also',
      dnbiinterfacefl: 'Toggle 1',
      dnbihostname: 'Host Name',
      dnbiportnumber: 'Port Number',
      dnbiresourcename: 'Resource Name',
      dnbidefaultcredlim: 'Default Credit Limit',
      dnbimaxcredlim: 'Max Credit Limit',
      dnbiincreasecredlim: 'Increase Credit Limit',
      dnbireviewperiod: 'Review Period',
      dnbioecreditcheckfl: 'Perform OE Credit Checking',
      iSMPrint: 'ISM Print',
      iSMNonImpactProduct: 'Non-Impact Inventory Product',
      iSMLive: 'Service Management Active',
      iSMLogicalID: 'Service Management Logical ID',
      iSMApiUrl: 'Service Management API URL',
      iSMApiConfigName: 'Service Management API Configuration Name',
      iSMApiUserName: 'Service Management API User Name',
      iSMApiPassWord: 'Service Management API Password',
      allowRental: 'Allow Rental',
      discountAddon: 'Discount',
      lostBusiness: 'Lost Business',
      surchargeAddon: 'Surcharge Addon',
      waiverAddon: 'Waiver Addon',
      automaticallyPurgeIORecord: 'Keep IMS Inbound and Outbound Messages',
      outboundProcessing: 'Use IMS Service',
      outboundProcessingThreads: 'Outbound IMS Threads',
      inboundOperator: 'Inbound Message Service Operator',
      iONEDI810InLive: 'AP Inbound Invoice Processing (810)',
      laborReturnReason: 'Return Adjust Reason for Labor',
      miscReturnReason: 'Return Adjust Reason for Misc Codes',
      freightAddon: 'Freight Addon',
      miscAddon: 'Misc Addon',
      iONEDI849InLive: 'PD Process Vendor Rebate Claim Responses (849)',
      iONEDI855InLive: 'PO Inbound Purchase Order Acknowledgement Processing (855)',
      iONEDI856InLive: 'PO Inbound Advance Ship Notice Processing (856)',
      locallyMexicoFl: 'Local.ly Mexico'
   };

   self.aoIntegrations = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aointegrationsload', { busy: true }, function (data) {
      if (data) {
         self.aoIntegrations = data;
         self.original = angular.copy(self.aoIntegrations);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoIntegrations, self.original).length);
   };

   self.reset = function () {
      self.aoIntegrations = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoIntegrations, self.original).length) {
            base.fillNotes(self.aoIntegrations, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);

            // If AvaTax, run the submit call so that we can validate the connection even though there were no changes
            if (taxInterfaceType === 'a') {
               self.submit();
            }
         }
      }
   };

   self.submit = function () {

      // Clear if ION Cloud Edition is enabled
      if (self.aoIntegrations.cloudedition) {
         self.aoIntegrations.logicalID = '';
      }

      // Clear if Multi Tenant is enabled
      if (self.aoIntegrations.multitenantfl) {
         self.aoIntegrations.apiKey = '';
      }

      DataService.post('api/shared/assharedentry/aointegrationssave', { data: self.aoIntegrations, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoIntegrations);
            base.saveLog(subject);

            // If consumer key and consumer secret were entered, they should be blanked out on the screen after save is done
            self.aoIntegrations.outboundConsumerKey = '';
            self.aoIntegrations.outboundConsumerSecret = '';

            // Blank out values in self.original so that consumer key and secret do not show in change notes the
            //  next time save is done and values did not get changed on the screen
            self.original.outboundConsumerKey = '';
            self.original.outboundConsumerSecret = '';
         }
      });
   };

   self.validateNonImpactProd = function () {

      var icspStatusType;

      // Must be a Labor item - Clear if Not.  Blank is OK
      if (self.aoIntegrations.iSMNonImpactProduct) {
         var params = {
            prod: self.aoIntegrations.iSMNonImpactProduct,
            fldlist: 'statustype'
         };

         DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (icsp) {
            if (icsp) {
               icspStatusType = icsp.statustype.toUpperCase();

               if (icspStatusType !== 'L') {
                  MessageService.error('global.error', 'message.non.impact.product.must.be.a.labor.product');
                  self.aoIntegrations.iSMNonImpactProduct = '';
                  return false;
               } else {
                  return true;
               }
            } else {
               MessageService.error('global.error', 'error.product.not.set.up.in.product.setup.icsp.4600');
               self.aoIntegrations.iSMNonImpactProduct = '';
               return false;
            }
         });
      } else {
         return true;
      }
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end intdtl