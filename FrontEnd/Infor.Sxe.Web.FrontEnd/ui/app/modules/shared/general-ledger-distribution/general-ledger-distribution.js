'use strict';

/**
 * Control for displaying the general information about a customer (shared by ARIC general tab and other functions).
 *
 * Alias: gldc
 */
app.controller('GeneralLedgerDistributionCtrl', function ($scope, DataService, Utils) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.jrnlno = 0;
   self.setno = 0;
   self.menuname = '';

   self.gldistribution = function () {
      if (self.jrnlno && self.setno !== undefined) {
         var params = {
            jrnlno: self.jrnlno,
            setno: self.setno,
            customparam: null
         };
         DataService.post('api/gl/asglinquiry/gldistribution', { data: params, busy: true }, function (data) {
            if (data) {
               self.gldistresults = data;
            }
         });
      }
   };

   self.isCreditVisible = function (row, cell, value, column, item) {
      return item.credit !== 0;
   };

   self.isDebitVisible = function (row, cell, value, column, item) {
      return item.debit !== 0;
   };

   if (options.jrnlnoModel) {
      self.jrnlno = Utils.getNestedValue($scope, options.jrnlnoModel);
      self.setno = Utils.getNestedValue($scope, options.setnoModel);
      self.gldistribution();
   }

   if (options.menunameModel) {
      self.menuname = options.menunameModel;
   }

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

app.controller('GeneralLedgerDistributionDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils, Sasc, $translate) {
   var self = this;
   var gldc = $scope.gldc;
   var item = gldc.rowParams.item;
   var grid = gldc.rowParams.grid;
   var row = gldc.rowParams.row;
   self.isEnableFields = (gldc && gldc.menuname && gldc.menuname.toUpperCase() === 'GLIJ');
   self.extendedref = '';
   self.mediainfo = '';
   self.lastupdate = '';
   self.isnewRecord = false;

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {
      if (!self.glee) {
         self.isnewRecord = true;
         self.glee = {
            keyno: Utils.pad(item.jrnlno, 8),
            transno: item.transno,
            setno: item.setno,
            cono: Sasc.cono,
            reference1: '',
            reference2: '',
            reference3: '',
            reference4: '',
            reference5: '',
            reference6: '',
            reference7: '',
            reference8: '',
            reference9: '',
            reference10: '',
            operinit: null,
            transdt: null,
            transtm: null,
            user1: null,
            user2: null,
            user3: null,
            user4: null,
            user5: null,
            user6: 0,
            user7: 0,
            user8: '',
            user9: null,
            transproc: null,
            rowID: null
         };
      }
      var glreference = ['', '', '', '', '', '', '', '', '', ''];
      if (self.extendedref) {
         var strRoute = self.extendedref;
         var chunkSize = 60;
         var stringLength = strRoute.length;
         var j = 0;
         for (var i = 0; i < stringLength; i += chunkSize) {
            if (i + chunkSize > stringLength) {
               chunkSize = stringLength - i;
            }
            strRoute.substring(i, chunkSize);
            if (strRoute.substring(i, chunkSize)) {
               glreference[j] = strRoute.substring(i, chunkSize);
            }
            j++;
         }
      }
      self.glee.reference1 = glreference[0];
      self.glee.reference2 = glreference[1];
      self.glee.reference3 = glreference[2];
      self.glee.reference4 = glreference[3];
      self.glee.reference5 = glreference[4];
      self.glee.reference6 = glreference[5];
      self.glee.reference7 = glreference[6];
      self.glee.reference8 = glreference[7];
      self.glee.reference9 = glreference[8];
      self.glee.reference10 = glreference[9];

      var sendType = self.isnewRecord ? 'POST' : 'PUT';
      DataService.send('api/gl/glee', { method: sendType, data: self.glee, busy: true }, function () {
         // Returned 'data' is not used here, we just refresh the grid
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // Collapse current row and refresh data
         grid.toggleRowDetail(row);
         gldc.gldistribution();
      });
   };

   self.getGlee = function () {
      if (item) {
         var keyno = Utils.pad(item.jrnlno, 8);
         var gleeparams = {
            keyno: keyno,
            setno: item.setno,
            transno: item.transno
         };
         DataService.get('api/gl/glee/getbypk', { params: gleeparams, busy: true }, function (data) {
            if (data) {
               self.glee = data;
               self.extendedref = data.reference1 + data.reference2 + data.reference3 + data.reference4 + data.reference5 +
                  data.reference6 + data.reference7 + data.reference8 + data.reference9 + data.reference10;
            }
         });
      }
   };

   self.deleteGlee = function () {
      if (self.glee) {
         DataService.delete('api/gl/glee', { data: self.glee, busy: true }, function () { //ignore jslint - identifier expected
            grid.toggleRowDetail(row);
         });
      }
   };

   self.getGlet = function () {
      if (item) {
         var gletparams = {
            jrnlno: item.jrnlno,
            setno: item.setno,
            transno: item.transno
         };
         DataService.get('api/gl/glet/getbypk', { params: gletparams, busy: true }, function (data) {
            if (data) {
               self.glet = data;

               var transTime = self.glet.transtm;
               if (self.glet.transtm && self.glet.transtm.length === 4) {
                  transTime = self.glet.transtm.substring(0, 2) + ':' + self.glet.transtm.substring(2, 4);
               }

               self.lastupdate = self.glet.operinit + ' ' + Utils.formatDate(self.glet.transdt) + ' ' + transTime;

               if (data.mediacd > 0) {
                  var sastnparams = {
                     codeiden: 'p',
                     codeval: data.mediacd,
                     fldlist: 'descrip'
                  };
                  DataService.get('api/sa/sastn/getbypk', { params: sastnparams }, function (sastn) {
                     if (sastn && sastn.descrip) {
                        self.mediainfo = sastn.descrip + data.charmediaauth ? $translate.instant('global.authorization.number') + ' - ' + data.charmediaauth : '';
                     }
                  });
               }
            }
         });
      }
   };

   self.getGlee();
   self.getGlet();
});