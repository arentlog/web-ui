'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsoc',
      dataPath: 'api/ar/arsd',
      passGridRecord: true,
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arsoccreditcardload',
      searchResultsField: '',
      resultsRowIdField: 'arsdrowid',
      detailSubTitle: [
         { label: 'global.credit.card.type', value: 'mediacd' },
         { label: 'global.customer', value: 'custno' },
         { label: 'global.customer.ship.to', value: 'shipto' }
      ],
      searchCriteria: { dCustno: 0, cMediaCd: 0, cShipTo: '' }
   });
});


app.service('ArsocService', function ($state, $translate, DataService, MessageService, UserService, Utils, GridService, CenPosService, AodataService) {

   this.extendBaseController = function (self, $sce) {
      self.cardTypes = [];
      self.selectedRecord = null;

      self.bindCardTypes = function () {
         var criteria = { codeiden: 'p', codeval: '' };
         DataService.post('api/sa/sastn/getsastnlist', { data: criteria, busy: true }, function (data) {
            if (data) {
               data.forEach(function (item) {
                  if (item.addtaxfl || item.chkauth) {
                     self.cardTypes.push(item);
                  }
               });
               //default bind type arsd.mediacd = self.cardTypes[0].descrip;
            }
         });
      };
      self.bindCardTypes();

      self.isCreditCardToolBarEnable = AodataService.getValue("OE", "BlockCardCreate");

      self.modifyARSD = function (selectedRecord) {
         if (selectedRecord) {
            self.selectedRecord = selectedRecord;
            CenPosService.showModal({
               type: 'modify',
               mediacd: selectedRecord.mediacd,
               shipto: selectedRecord.shipto,
               custno: selectedRecord.custno,
               tokenid: selectedRecord.tokenid,
               invoiceno: '0-0',
               successCallback: self.modifyARSDCallBack
            });
         }
      };

      self.modifyARSDCallBack = function () {
         if (self.selectedRecord) {
            DataService.post('api/ar/asarsetup/arsoccreditcardmodify', { data: self.selectedRecord, busy: false }, function (data) {
               if (data) {
                  self.selectedRecord = null;
                  self.search();
                  if (!self.isMaster()) {
                     $state.go("^.master");
                  }
               }
            });
         }
      };

      self.deleteARSD = function (selectedRecord) {
         if (selectedRecord) {
            self.selectedRecord = selectedRecord;
            CenPosService.showModal({
               type: 'delete',
               mediacd: selectedRecord.mediacd,
               shipto: selectedRecord.shipto,
               custno: selectedRecord.custno,
               invoiceno: '0-0',
               tokenid: selectedRecord.tokenid,
               successCallback: self.deleteARSDCallBack
            });
         }
      }

      self.deleteARSDCallBack = function () {
         if (self.selectedRecord) {
            DataService.post('api/ar/asarsetup/arsoccreditcarddelete', { data: self.selectedRecord, busy: false }, function (data) {
               if (data) {
                  self.selectedRecord = null;
                  self.search();
                  if (!self.isMaster()) {
                     $state.go("^.master");
                  }
               }
            });
         }
      };
   };

   this.extendMasterController = function (self, base) {

      self.isCreditCardToolBarEnable = AodataService.getValue("OE", "BlockCardCreate");


      self.customDelete = function () {
         MessageService.okCancel('global.confirmation', 'message.cenpos.cards.should.only.be.removed.with.the.delet', function () {

            MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

               var rowIds = GridService.getSelectedRowIds(base.grid, 'arsdrowid');
               if (rowIds.length) {
                  DataService.delete('api/ar/arsd/deletelistbyrowids', { data: rowIds, busy: true }, function (data) {
                     MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                     base.search();
                  });
               }
            });
         });
      };

      self.modifyTokenizedCard = function () {
         base.modifyARSD(GridService.getSelectedRecord(base.grid));
      };

      self.deleteTokenizedCard = function () {
         base.deleteARSD(GridService.getSelectedRecord(base.grid));
      };
   };

   this.extendSearchController = function (self, base, criteria, scope, arsd, arsoc) {
      if (!criteria.cMediaCd) {
         criteria.cMediaCd = 0;
      }
   };

   this.extendCreateController = function (self, arsd, arsoc, base) {

      self.addArsdCallBack = function () {
         var arscCriteria = { dCustno: arsoc.custno, cShipTo: arsoc.shipto ? arsoc.shipto : '', cMediaCd: arsoc.mediacd };

         DataService.post('api/ar/asarsetup/arsoccreditcardadd', { data: arscCriteria, busy: true }, function (data) {
            if (data) {
               if (data.cWarningMessage) {
                  MessageService.alert('global.alert', data.cWarningMessage);
               }
               if (base.dataset) {
                  base.dataset.push(data.arsoccreditcard);
               } else {
                  base.dataset = [data.arsoccreditcard];
               }
               MessageService.alert('global.alert', 'ar.credit.card.added.sucessfully');
            }
         });
      };

      self.cardTypes = [];

      self.customSubmit = function () {
         self.addArsd();
      }

      self.addArsd = function () {
         var addValidateRequest = { dCustno: arsoc.custno, cShipTo: arsoc.shipto ? arsoc.shipto : '', cMediaCd: arsoc.mediacd };
         DataService.post('api/ar/asarsetup/arsoccreditcardaddvalidate', { data: addValidateRequest, busy: true }, function (data) {
            if (!data) {
               if (arsoc.shipto) {
                  var arssCriteria = { custno: arsoc.custno, shipto: arsoc.shipto };
                  DataService.get('api/ar/arss/getbypk', { params: arssCriteria, busy: true }, function (data) {
                     if (data) {
                        if (data.ccblockfl) {
                           return;
                        }
                        else {
                           CenPosService.showModal({
                              type: 'add',
                              mediacd: self.arsoc.mediacd,
                              shipto: self.arsoc.shipto,
                              custno: self.arsoc.custno,
                              invoiceno: '0-0',
                              tokenid: '',
                              successCallback: self.addArsdCallBack
                           });
                        }
                     }
                  });

               }
               else {
                  var arscCriteria = { custno: arsoc.custno };
                  DataService.get('api/ar/arsc/getbypk', { params: arscCriteria, busy: true }, function (data) {
                     if (data) {
                        if (data.ccblockfl) {
                           return;
                        }
                        else {
                           CenPosService.showModal({
                              type: 'add',
                              mediacd: arsoc.mediacd,
                              shipto: arsoc.shipto,
                              custno: arsoc.custno,
                              invoiceno: '0-0',
                              tokenid: '',
                              successCallback: self.addArsdCallBack
                           });
                        }
                     }
                  });
               }
            }
         });
      };


   };

   this.extendDetailController = function (self, base, arsd, arsoc, params) {

      var selectedRecord = params.object;

      self.arsoc.$promise.then(function () {
         if (selectedRecord) {
            self.arsoc.cardno = selectedRecord.cardno;
            self.arsoc.name = selectedRecord.name;
         }
      });

      self.customSubmit = function () {
         if (selectedRecord) {
            //Need to write back the Cardno to include the Token as well.  The cardno field is a
            //sub-delimited field in the DB.
            self.arsoc.cardno = selectedRecord.cardno + String.fromCharCode(3) + selectedRecord.tokenid;
         }

         self.submit();
      };

      self.modifyTokenizedCard = function () {
         base.modifyARSD(selectedRecord);
      };

      self.deleteTokenizedCard = function () {
         base.deleteARSD(selectedRecord);
      };
   };
});