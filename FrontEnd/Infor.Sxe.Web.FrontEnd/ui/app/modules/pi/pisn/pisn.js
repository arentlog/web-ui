'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pi',
      menuFn: 'pisn',
      dataPath: 'api/sl/slsn',
      searchMethod: 'POST',
      searchPath: 'api/sl/slsn/getslsnlistbykeys',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'pi/pisn/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'pi/pisn/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sl/asslsetup/slnewitemdefaultscopy',
      detailSubTitle: [
         { label: 'global.import.type', value: 'imptype' },
         { label: 'global.vendor.code', value: 'vendcd' },
         { label: 'global.line.code', value: 'linecd' }
      ],
      recentlyVisited: {
         title: { label: 'global.import.type', value: 'imptype' },
         description: [{ label: 'global.vendor.code', value: 'vendcd' }, { label: 'global.line.code', value: 'linecd' }]
      }
   });
});

app.service('PisnService', function ($state, DataService, GridService, MessageService, Utils) {

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      // Load the inital data values needed in the copy screen
      request.fromvendcd = stateParams.object.vendcd;
      request.tovendcd = stateParams.object.vendcd;
      request.fromlinecd = stateParams.object.linecd;
      request.tolinecd = stateParams.object.linecd;
      request.imptype = stateParams.object.imptype;
   };

   this.extendCreateController = function (self, base, pisn, scope) {

      // Load initial values needed for new record creation
      self.pisn.charactionty1 = 'r';
      self.pisn.charactionty2 = 'r';
      self.pisn.charactionty3 = 'r';
      self.pisn.charactionty4 = 'r';
      self.pisn.charactionty5 = 'r';
      self.pisn.charactionty6 = 'r';
      self.pisn.charfieldty1 = 'b';
      self.pisn.charfieldty2 = 'b';
      self.pisn.charfieldty3 = 'b';
      self.pisn.charfieldty4 = 'b';
      self.pisn.charfieldty5 = 'b';
      self.pisn.charfieldty6 = 'b';
      self.pisn.descrip1cd = 'I';
      self.pisn.descrip2cd = 'I';
      self.pisn.descrip3cd = 'I';
      self.pisn.pdspsty = 'n';
      self.pisn.pdsvty = 'n';
      self.pisn.pgrpty = 'n';
      self.pisn.priceonty = 'b';
   };

   this.extendDetailController = function (self, base, pisn, scope) {

      pisn.$promise.then(function () {

         // Find the SLSI record for the import type to find its file type
         var slsiParams = {
            imptype: pisn.imptype,
            fldlist: 'filetype'
         };

         DataService.get('api/sl/slsi/getbypk', { params: slsiParams }, function (slsi) {
            if (slsi) {
               self.fileType = slsi.filetype;
            }
         });

         // Check for bad data - should only be Y or N
         pisn.pdspsty = (pisn.pdspsty.toLowerCase() === 'y' || pisn.pdspsty.toLowerCase() === 'n') ? pisn.pdspsty : 'n';
         pisn.pdsvty = (pisn.pdsvty.toLowerCase() === 'y' || pisn.pdsvty.toLowerCase() === 'n') ? pisn.pdsvty : 'n';
         pisn.pgrpty = (pisn.pgrpty.toLowerCase() === 'y' || pisn.pgrpty.toLowerCase() === 'n') ? pisn.pgrpty : 'n';
      });

      self.customSubmit = function () {

         // If the rebate type or rebate sub type entered is set up for a different vendor,
         // give a warning but do not prevent the save of the record
         if (pisn.rebatety) {
            var rebParams = {
               codeiden: 'pt',
               codeval: pisn.rebatety,
               fldlist: 'vendno'
            };

            DataService.get('api/pd/pdst/getbypk', { params: rebParams }, function (pdstReb) {
               if (pdstReb.vendno) {
                  if (pdstReb.vendno !== pisn.vendno) {
                     MessageService.info('global.warning', 'message.the.vendor.on.the.rebate.type.in.pdst.does.not.mat');
                  }
               }
            });

         }

         if (pisn.rebsubty) {
            var subParams = {
               codeiden: 'st',
               codeval: pisn.rebsubty,
               fldlist: 'vendno'
            };

            DataService.get('api/pd/pdst/getbypk', { params: subParams }, function (pdstSub) {
               if (pdstSub.vendno) {
                  if (pdstSub.vendno !== pisn.vendno) {
                     MessageService.info('global.warning', 'message.the.vendor.on.the.rebate.sub.type.in.pdst.does.not');
                  }
               }
            });

         }

         self.submit();
      };

   };

});