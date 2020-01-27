'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pd',
      menuFn: 'pdspm',
      recordName: 'pdscm',
      dataPath: 'api/pd/pdscm',
      searchMethod: 'POST',
      searchPath: 'api/pd/pdscm/lookup',
      searchResultsField: 'pdscmlookupresults',
      searchRecordLimitField: 'recordcountlimit',
      resultsRowIdField: 'pdscmrowid',
      searchCriteria: {
         rankty: 'CR'
      },
      recentlyVisited: {
         title: { label: '', valueFunction: 'base.formatRankType' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });
});

app.service('PdspmService', function ($state, $translate, DataService, MessageService, UserService, ConfigService, GridService, Utils, Sasc) {

   this.extendBaseController = function (self) {

      var rankcntCompany = 0;
      var rankcntWhse = 0;
      var rankcntClass = 0;
      var rankcntABC = 0;

      //var rankTypeList = [];

      // Load the Rank Counts per Rank Type
      DataService.get('api/pd/aspdsetup/loadpdspmranks', { busy: true }, function (data) {
         if (data) {

            data.forEach(function (ranklist) {

               if (ranklist.ranktype === 'CR') {
                  rankcntCompany = ranklist.rankcnt;
                  self.displayColumns(ranklist.ranktype);
               } else if (ranklist.ranktype === 'WR') {
                  rankcntWhse = ranklist.rankcnt;
               } else if (ranklist.ranktype === 'CL') {
                  rankcntClass = ranklist.rankcnt;
               } else if (ranklist.ranktype === 'AC') {
                  rankcntABC = ranklist.rankcnt;
               }

            });
         }
      });

      self.displayWhse = function () {
         return Sasc.pdwhsefl;
      };

      self.includeColumn = function (columnNumber) {
         if (columnNumber > self.rankCount) {
            return false;
         } else {
            return true;
         }
      };

      self.displayColumns = function (rankType) {

         var rankValue;
         var rankLabel;

         self.rankCount = 0;

         self.rankCount = self.loadRankCount(rankType);

         for (var i = 0; i <= self.rankCount; i++) {

            rankLabel = 'rankLabel' + (i + 1);

            // Class is Numeric, Rest are Alphabetic
            if (rankType === 'CL') {
               rankValue = (i + 1);
            } else if (i < 26) {
               rankValue = String.fromCharCode(65 + i);
            } else {
               rankValue = i.toString();
            }

            self[rankLabel] = MessageService.get('global.rank') + ' ' + rankValue;
         }
      };


      self.loadRankCount = function (rankType) {
         if (rankType === 'CR') {
            return rankcntCompany;
         } else if (rankType === 'WR') {
            return rankcntWhse;
         } else if (rankType === 'CL') {
            return rankcntClass;
         } else if (rankType === 'AC') {
            return rankcntABC;
         }
      };


      // Format function for record type in recently visited display
      self.formatRankType = function (pdscm) {

         var rankType = pdscm.rankty;
         var recentTitle;

         if (rankType) {
            switch (rankType.toUpperCase()) {
               case 'CR':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.company.rank');                                        //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'WR':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.warehouse.rank');                                      //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'CL':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.class');                                               //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'AC':                                                                                         //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.abc.stratification');                                  //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation                                                                                          //ignore jslint - correct indentation
               default:                                                                                           //ignore jslint - correct indentation
                  recentTitle = $translate.instant('global.invalid');                                             //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
            }
         }

         return recentTitle;
      };

      // Format function for record Description data in recently visited display
      self.formatSubData = function (pdscm) {

         var recentSubTitle = '';
         var previousLoaded;

         if (pdscm.modifiernm) {
            recentSubTitle = $translate.instant('global.modifier.name') + ': ' + pdscm.modifiernm;
         }

         if (pdscm.whse && Sasc.pdwhsefl) {
            previousLoaded = '';
            if (recentSubTitle !== '') {
               previousLoaded = ', ';
               recentSubTitle += previousLoaded + $translate.instant('global.warehouse') + ': ' + pdscm.whse;
            } else {
               recentSubTitle = $translate.instant('global.warehouse') + ': ' + pdscm.whse;
            }
         }

         return recentSubTitle;
      };

      self.applyRanksPct = function (rankPct, pdscm) {

         var rankValue;
         var obj = [];
         var nonStockLabel = MessageService.get('global.non.stock');

         // Load the Grid Rank Percents to the Database Fields
         for (var i = 0; i < rankPct.length; i++) {
            obj = rankPct[i];

            if (obj.rankcd === nonStockLabel) {
               pdscm.nonstockpct = obj.pct;
            } else {
               rankValue = 'pct' + (i + 1);
               pdscm[rankValue] = obj.pct;
            }
         }
      };

   };


   this.extendSearchController = function (self, base, criteria, scope) {

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('pdspm.master');
         }

         // Load the Column Labels
         base.displayColumns(base.criteria.rankty);

         base.search();
      };

   };

   this.extendDetailController = function (self, base, pdscm, scope) {

      // When the full object has been resolved, build the data set
      pdscm.$promise.then(function () {

         self.rankPct = [];

         var rankValue;

         for (var i = 0; i < base.rankCount; i++) {

            var pctValue = 'pct' + (i + 1);

            // Class is Numeric, Rest are Alphabetic
            if (self.pdscm.rankty === 'CL') {
               rankValue = (i + 1);
            } else if (i < 26) {
               //rankValue = alphabetString[i];
               rankValue = String.fromCharCode(65 + i);
            } else {
               rankValue = i.toString();
            }

            // Load the Correct Amount of Ranks and Correct Labels
            self.rankPct.push({ rankcd: rankValue, pct: self.pdscm[pctValue] });
         }

         // Load the Non Stock Percent last on the detail grid
         self.rankPct.push({ rankcd: MessageService.get('global.non.stock'), pct: self.pdscm.nonstockpct });

      });

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         if (self.pdscm.rankty) {

            switch (self.pdscm.rankty.toUpperCase()) {
               case "CR":                                                                                //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.company.rank') + ' | ';                      //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
               case "WR":                                                                                //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.warehouse.rank') + ' | ';                    //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
               case "CL":                                                                                //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.class') + ' | ';                             //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
               case "AC":                                                                                //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.abc.stratification') + ' | ';                //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
               default:                                                                                  //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.invalid') + ' | ';                           //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
            }

            subTitleText += self.pdscm.modifiernm;

            if (self.pdscm.whse && Sasc.pdwhsefl) {
               subTitleText += ' | ' + self.pdscm.whse;
            }
         }

         return subTitleText;
      };

      self.customSubmit = function () {

         base.applyRanksPct(self.rankPct, pdscm);

         self.submit();

      };

   };

   this.extendCreateController = function (self, base, pdscm, scope) {

      // Update the Grid Value
      self.customSubmit = function () {

         base.applyRanksPct(self.rankPct, pdscm);

         self.submit();

      };

      // If the Rank Type change - reload the Ranks
      self.loadDetailRanks = function (rankType) {

         var detailRankCount = 0;
         var rankValue;
         self.rankPct = [];

         detailRankCount = base.loadRankCount(rankType);

         for (var i = 0; i < detailRankCount; i++) {

            // Class is Numeric, Rest are Alphabetic
            if (rankType === 'CL') {
               rankValue = (i + 1);
            } else if (i < 26) {
               //rankValue = alphabetString[i];
               rankValue = String.fromCharCode(65 + i);
            } else {
               rankValue = i.toString();
            }

            // Load the Correct Amount of Ranks and Correct Labels
            self.rankPct.push({ rankcd: rankValue, pct: '0' });
         }

         // Load the Non Stock Percent last on the detail grid
         self.rankPct.push({ rankcd: MessageService.get('global.non.stock'), pct: '0' });

      };

      // Load the Initial Screen Data
      self.pdscm.whse = '';
      self.pdscm.rankty = 'CR';
      self.loadDetailRanks(self.pdscm.rankty);
   };


});

