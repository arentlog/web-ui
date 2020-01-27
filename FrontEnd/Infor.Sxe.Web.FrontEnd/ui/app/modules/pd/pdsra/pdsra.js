'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pd',
      menuFn: 'pdsra',
      dataPath: 'api/pd/pdsra',
      recordName: 'pdsra',
      searchMethod: 'POST',
      searchPath: '',
      searchResultsField: '',
      resultsRowIdField: 'pdsraRowidStr',
      detailSubTitle: [
         { label: 'global.method', value: 'base.methodnoDescription' }
      ],
      recentlyVisited: {
         title: { label: 'global.method', valueFunction: 'base.methodnoDescription' },
         description: [
            { label: 'global.method', valueFunction: 'base.methodnoDescription' },
            { label: 'global.vendor.number', value: 'vendno' },
            { label: 'global.start.date', value: 'startdt' }
         ]
      }
   });
});

app.service('PdsraService', function (MessageService, ConfigService, DataService) {

   this.extendCreateController = function (self, base, pdsra) {

      pdsra.custrebty = '';
      pdsra.whse = '';
      pdsra.statustype = true;
   };

   this.extendBaseController = function (self) {
      self.pdarData = [];
      self.loadPDAR = function () {
         var params = {
            fldlist: 'methodno,descrip'
         };
         DataService.get('api/pd/pdar', { params: params, busy: true }, function (data) {
            self.pdarData = data;
         });
      };

      self.loadPDAR();

      self.methodnoDescription = function (pdsra) {
         if (pdsra && pdsra.methodno) {
            var pdar = JSLINQ(self.pdarData)
                     .Where(function (pdar) {
                        return pdar.methodno === pdsra.methodno;
                     })
                     .FirstOrDefault(function (pdarRecord) {
                        return pdarRecord;
                     });
            return pdar.descrip;
         }
      }

      self.search = function () {
         var criteria = {
            methodno: self.criteria.methodno,
            vendno: self.criteria.vendno,
            startdt: self.criteria.startdt,
            recordcountlimit: ConfigService.getDefaultRecordLimit()
         };

         // Load the main grid
         DataService.post('/web/api/pd/pdsrarecordlist', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (data.ttblpdsrarecordlist) {
                  self.dataset = data.ttblpdsrarecordlist;
               }
            }
         });
      }; // search  
   };

   this.extendDetailController = function (self, base) {
      self.methodnoDescription = function () {
         if (self.pdsra && self.pdsra.methodno) {
            var pdar = JSLINQ(base.pdarData)
                     .Where(function (pdar) {
                        return pdar.methodno === self.pdsra.methodno;
                     })
                     .FirstOrDefault(function (pdarRecord) {
                        return pdarRecord;
                     });
            return pdar.descrip;
         }
      }
   };
});