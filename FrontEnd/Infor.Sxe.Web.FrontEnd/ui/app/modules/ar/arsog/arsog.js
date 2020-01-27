'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsog',
      dataPath: 'api/shared/sfcorpgrp',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arsogcorpgroupload',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: null, value: 'groupid' },
         { label: null, value: 'custno' }
      ],
      recentlyVisited: null
   });
});

app.service('ArsogService', function ($state, $translate, DataService, Utils) {
   this.extendBaseController = function (self) {
      self.groupList = [];
      DataService.get('api/sa/sasta/listbydesc', { params: { codeiden: 'CG' }, busy: true }, function (data) {
         data.forEach(function (group) {
            self.groupList.push({ label: group.descrip, value: group.codeval });
         });
      });
   };

   this.extendSearchController = function (self, base) {
      //overwriting clear to allow removal of dataset
      self.clear = function () {
         Utils.clearObject(base.criteria);
         base.dataset = [];
         base.initCriteria();
      };
   };
});