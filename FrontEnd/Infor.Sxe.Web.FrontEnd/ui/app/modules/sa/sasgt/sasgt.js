'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasgt',
      dataPath: 'api/sa/sasgt',
      searchMethod: 'POST',
      searchPath: 'api/sa/assasetup/sasgtgetlist',
      searchResultsField: '',
      resultsRowIdField: 'sasgtrowid',
      recentlyVisited: {
         title: { label: '', value: 'tariffcd' },
         description: { label: 'global.country', valueFunction: 'base.formatCountry' }
      }
   });
});

app.service('SasgtService', function ($state, Constants, CommonConverters, DataService) {

   this.extendBaseController = function (self) {
      self.formatCountry = function (sasgt) {
         return CommonConverters.CountryCodeToName.convert(sasgt.countryoforigin);
      };
   };

   this.extendCreateController = function (self, base, sasgt) {
      sasgt.countryoforigin = '';
      self.customSubmit = function () {
         self.submit();
      };
   };
   this.extendDetailController = function (self, base, sasgt) {
      var subTitle = '';
      // When the full sasgt object has been resolved, fetch the corresponding glacct data
      sasgt.$promise.then(function () {
         var glfetchcriteria = { tariffcd: sasgt.tariffcd, countryoforigin: sasgt.countryoforigin };
         DataService.post('api/sa/assasetup/sasgtglfetch', { data: glfetchcriteria, busy: true }, function (data) {
            if (data) {
               self.sasgt.tariffglno = data.tariffglno;
            }
         });
         // Build subtitle
         subTitle = sasgt.tariffcd;
         var countryName = base.formatCountry(sasgt);
         if (countryName) {
            subTitle += Constants.SUB_TITLE_SEPARATOR + countryName;
         }
      });
      self.getSubTitle = function () {
         return subTitle;
      };
      self.customSubmit = function () {
         var sasgtglsave = {
            tariffcd: sasgt.tariffcd,
            countryoforigin: sasgt.countryoforigin,
            tariffglno: sasgt.tariffglno,
            sasgtrowid: sasgt.rowID
         };
         DataService.post('api/sa/assasetup/sasgtglsave', { data: sasgtglsave, busy: true }, function () {
            var params = {
               tariffcd: sasgt.tariffcd,
               countryoforigin: sasgt.countryoforigin,
               fldlist: 'gldivno,gldeptno,glacctno,glsubno'
            };
            DataService.get('api/sa/sasgt/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  sasgt.gldivno = data.gldivno;
                  sasgt.gldeptno = data.gldeptno;
                  sasgt.glacctno = data.glacctno;
                  sasgt.glsubno = data.glsubno;
                  self.submit();
               }
            });
         });
      };
   };
   this.createRecord = function (self, base, sasgt, scope, callback) {

      // Without this first - the SI call is run first and the update of the password is lost on a SaveChange
      DataService.post('api/sa/sasgt', { data: sasgt }, function (data) {

         var sasgtglsave = {
            tariffcd: sasgt.tariffcd,
            countryoforigin: sasgt.countryoforigin,
            tariffglno: sasgt.tariffglno,
            sasgtrowid: sasgt.rowID
         };
         DataService.post('api/sa/assasetup/sasgtglsave', { data: sasgtglsave, busy: true }, function () {
            callback(data);
         });

      });
   };
});