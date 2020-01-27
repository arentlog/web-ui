'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasu',
      dataPath: 'api/shared/notes',
      recordName: 'notes',
      searchMethod: 'POST',
      searchPath: 'api/shared/notes/getsasunotes',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('SasuService', function ($state, DataService, UserService, Utils) {

   this.extendBaseController = function (self) {
      self.cono = UserService.getCono();
      self.notestype = 'zz';
      self.criteria.pageno = 0;
      self.criteria.cono = self.cono;
      self.criteria.notestype = self.notestype;
      self.isPrimaryKeyEnabled = true;
      self.isSecondayKeyEnabled = true;
      self.isPageNoEnabled = true;
   };

   this.extendSearchController = function (self, base, criteria) {

      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.cono = base.cono;
         base.criteria.notestype = base.notestype;
      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('^.master');
         }

         base.search();
      };
   };

   this.extendCreateController = function (self, base, notes) {

      notes.cono = base.cono;
      notes.notestype = 'zz';
      self.dataValue = '';
      notes.primarykey = '';
      notes.secondarykey = '';
      notes.pageno = 1;
      base.isPrimaryKeyEnabled = true;
      base.isSecondayKeyEnabled = true;
      base.isPageNoEnabled = true;
      self.customSubmit = function () {
         notes.notestype = 'zz';
         if (notes.pageno === 0 || !notes.pageno) {
            notes.pageno = 1;
         }
         if (notes.primarykey) {
            var s = self.dataValue.split('\n');
            for (var i = 0; i < 16; i++) {
               if (s[i]) {
                  notes['noteln' + [i + 1]] = s[i];
               } else {
                  notes['noteln' + [i + 1]] = "";
               }
            }
         }
         self.submit();
      };

   };

   this.extendDetailController = function (self, base, notes) {
      self.dataValue = '';
      base.isPrimaryKeyEnabled = false;
      base.isSecondayKeyEnabled = false;
      base.isPageNoEnabled = false;

      notes.$promise.then(function () {
         if (notes.secondarykey) {
            self.subTitle = notes.primarykey + '|' + notes.secondarykey;
         }
         else {
            self.subTitle = notes.primarykey;
         }
         if (notes.noteln1) {
            for (var i = 1; i <= 16; i++) {
               if (notes['noteln' + [i]]) {
                  self.dataValue += notes['noteln' + [i]] + '\n';
               }
            }
         }
      });

      self.customSubmit = function () {
         var s = self.dataValue.split('\n');
         if (s[0]) {
            for (var i = 0; i < 16; i++) {
               if (s[i]) {
                  notes['noteln' + [i + 1]] = s[i];
               } else {
                  notes['noteln' + [i + 1]] = "";
               }
            }
         }
         self.submit();
      };

   };
});