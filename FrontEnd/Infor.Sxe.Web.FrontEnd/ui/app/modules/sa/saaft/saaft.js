'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saaft', {
   });
   StateProvider.addMasterState('sa', 'saaft');
});

app.controller('SaaftBaseCtrl', function ($state) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('saaft.master');
   };

   self.includesMaster = function () {
      return $state.includes('saaft.master');
   };
});

app.controller('SaaftMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Utils) {
   var self = this;
   var paddingLarge = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
   var paddingSmall = '&nbsp;&nbsp;&nbsp;&nbsp;';

   self.fileName = [];
   self.targetType = 'p';
   self.sidebarCollapsed = true;
   self.fileTransferInProgress = false;
   self.filesTransferred = 0;

   self.fileSelected = function() {
      self.fileTransferHeader = '';
      self.fileTransferMessage = '';
   };

   self.transferFile = function () {
      self.fileTransferHeader = $translate.instant('message.file.transfer.in.progress');
      self.fileTransferMessage = $translate.instant('message.the.following.files.are.currently.being.transferred') + ' <br> ';
      
      self.fileNameData = '';
      self.fileNameDataToast = '';
      for (var i = 0; i < self.fileName.length; i++)
      {
         self.executeFileTransfer(self.fileName[i]);

         self.fileNameData += paddingLarge + '- \"' + self.fileName[i].name + '\" <br> ';
         self.fileNameDataToast += paddingSmall + '- \"' + self.fileName[i].name + '\" <br> ';
      }

      self.fileTransferMessage += self.fileNameData;
   };

   self.executeFileTransfer = function (file) {
      self.filesTransferred++;
      var fileFormData = new FormData();
      fileFormData.append('file', file);

      var options = {
         data: fileFormData,
         params: { filetype: self.targetType },
         transformRequest: angular.identity,
         headers: {
            'Content-Type': undefined
         },
         busy: false,
         timeout: 0
      };
      self.fileTransferInProgress = true;
      DataService.post('/web/api/shared/FileTransfer', options, function (data) {
         if (data) {
            self.filesTransferred--;
            if (self.filesTransferred === 0) {
               self.fileTransferHeader = $translate.instant('message.file.transfer.is.complete');
               self.fileTransferMessage = $translate.instant('message.the.following.files.have.been.transferred.successfully') +
                  ' <br> ' + self.fileNameDataToast;
               MessageService.info('global.information', self.fileTransferMessage);
               self.fileTransferInProgress = false;
               self.fileName = [];
            }
         }
      }, function (data) {
         if (data) {
            self.fileTransferHeader = $translate.instant('message.file.transfer.is.complete');
            self.fileTransferMessage = $translate.instant('message.there.was.a.problem.transferring.the.following.files') + ' <br> ' + fileNameData;
            MessageService.info('global.information', self.fileTransferMessage);
            self.fileTransferInProgress = false;
         }
      });
   };

});
