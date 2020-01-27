'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icseg',
      dataPath: 'api/ic/icseg',
      searchMethod: 'POST',
      searchPath: 'api/ic/icseg/lookup',
      searchResultsField: 'icseglookupresults',
      searchRecordLimitField: 'recordlimit',
      searchCriteria: { accttype: false },
      createStateView: 'ic/icseg/create.json',
      postCreateState: '^.detail.edit',
      copyMethod: 'POST',
      copyStateView: 'ic/icseg/copy.json',
      copyPath: 'api/ic/asicsetup/icsegcopy',
      copySubTitle: [
         { label: null, value: 'key2' },
         { label: null, value: 'key1' }
      ],
      detailSubTitle: [
         { label: null, value: 'key2' },
         { label: null, value: 'key1' }
      ],
      resultsRowIdField: 'icsegrowid',
      recentlyVisited: null
   });
});

app.service('IcsegService', function ($state, $translate, ConfigService, DataService) {

   this.extendBaseController = function (self) {

      self.recordlimit = ConfigService.getDefaultRecordLimit();

   };

   this.extendSearchController = function (self, base, scope) {

      // If the Record Type changes - reset the type data - keep the record type as is
      self.setAcctTypeChange = function () {

         var icsegloadcriteria = { accttype: base.criteria.accttype };

         // Load the Record Type off AO Settings
         DataService.post('api/ic/asicsetup/icsegkeyfieldsload', { data: icsegloadcriteria, busy: true }, function (data) {

            if (data) {

               base.prodcatenabledfl = data.prodcatenablefl;
               base.whseenablefl = data.whseenablefl;
               base.custtypeenabledfl = data.custtypeenablefl;
               base.salesrepenabledfl = data.salesrepenablefl;
               base.cogsadjenabledfl = data.cogsadjenablefl;
               base.prodcathiddenfl = data.prodcathiddenfl;
               base.whsehiddenfl = data.whsehiddenfl;
               base.custtypehiddenfl = data.custtypehiddenfl;
               base.salesrephiddenfl = data.salesrephiddenfl;
               base.cogsadjhiddenfl = data.cogsadjhiddenfl;

            }
         });

         base.dataset = [];

      };

      self.clearCriteria = function () {
         self.clear();
         self.setAcctTypeChange();
      };

      self.setAcctTypeChange();

   };

   this.extendDetailController = function (self, base, icseg, scope) {

      // Validate changed GL fields
      self.glaccountChanged = function (args) {

         if (args.value) {
            DataService.get('api/ic/asicsetup/validateglaccount/' + args.value, { busy: true });
         }
      };

      // When the full icseg object has been resolved, fetch the corresponding glacct data
      icseg.$promise.then(function () {

         if (base.criteria.accttype) {
            self.accttypedisplay = $translate.instant('global.balance.sheet');
         }
         else {
            self.accttypedisplay = $translate.instant('global.income.statement');
         }

         var icsegRecord = JSLINQ(base.dataset).Where(function (item) { return item.icsegrowid === icseg.rowID; }).FirstOrDefault();
         if (icsegRecord) {
            self.icsegprodcat = icsegRecord.prodcat;
            if (!base.whsehiddenfl) {
               self.icsegwhse = icsegRecord.whse;
            }
            if (!base.custtypehiddenfl) {
               self.icsegcusttype = icsegRecord.custtype;
            }
            if (!base.cogsadjhiddenfl) {
               self.icsegcogsadj = icsegRecord.cogsadj;
            }
            if (!base.salesrephiddenfl) {
               self.icsegsalesrep = icsegRecord.salesrep;
            }
         } else {
            self.icsegprodcat = icseg.key2;
            if (!base.whsehiddenfl) {
               self.icsegwhse = icseg.key1;
            }
            if (!base.custtypehiddenfl) {
               self.icsegcusttype = icseg.key1;
            }
            if (!base.cogsadjhiddenfl) {
               self.icsegcogsadj = icseg.key1;
            }
            if (!base.salesrephiddenfl) {
               self.icsegsalesrep = icseg.key1;
            }
         }


         var icsegreqcriteria = { icsegrowid: icseg.rowID, accttype: base.criteria.accttype };
         DataService.post('api/ic/asicsetup/icsegrequiredfetch', { data: icsegreqcriteria, busy: true }, function (data) {
            if (data) {
               self.glinventory = data.glinventory;
               self.gldirinventory = data.gldirinventory;
               self.glnsinventory = data.glnsinventory;
               self.glwipinventory = data.glwipinventory;
               self.glwipwriteoff = data.glwipwriteoff;
               self.gluninvoicedinv = data.gluninvoicedinv;
               self.glcorechrg = data.glcorechrg;
               self.gliccostadj = data.gliccostadj;
               self.glphysicaladj = data.glphysicaladj;
               self.glrebatedue = data.glrebatedue;
               self.glcustcoredue = data.glcustcoredue;
               self.glcustcoreliab = data.glcustcoreliab;
               self.glvendcoreliab = data.glvendcoreliab;
               self.glcorevariance = data.glcorevariance;
               self.gltallyvariance = data.gltallyvariance;
               self.glgrosssales = data.glgrosssales;
               self.gldirgrosssales = data.gldirgrosssales;
               self.gllinedisc = data.gllinedisc;
               self.glorderdisc = data.glorderdisc;
               self.glcogs = data.glcogs;
               self.gldircogs = data.gldircogs;
               self.glcogadj = data.glcogadj;
               self.glrestockchrg = data.glrestockchrg;
               self.glwtcogadj = data.glwtcogadj;
               self.glrebatecostadj = data.glrebatecostadj;
               self.glsalesreturns = data.glsalesreturns;
               self.glcoreconv = data.glcoreconv;
               self.glrebatewriteoff = data.glrebatewriteoff;
            }
         });

      });

   };

   this.updateRecord = function (self, base, icseg, scope, callback) {

      var icsegsavecriteria = {
         icsegrowid: icseg.rowID, accttype: base.criteria.accttype, glinventory: self.glinventory, gldirinventory: self.gldirinventory,
         glnsinventory: self.glnsinventory, glwipinventory: self.glwipinventory, glwipwriteoff: self.glwipwriteoff,
         gluninvoicedinv: self.gluninvoicedinv, glcorechrg: self.glcorechrg, gliccostadj: self.gliccostadj, glphysicaladj: self.glphysicaladj,
         glrebatedue: self.glrebatedue, glcustcoredue: self.glcustcoredue, glcustcoreliab: self.glcustcoreliab, glvendcoreliab: self.glvendcoreliab,
         glcorevariance: self.glcorevariance, gltallyvariance: self.gltallyvariance, glgrosssales: self.glgrosssales,
         gldirgrosssales: self.gldirgrosssales, gllinedisc: self.gllinedisc, glorderdisc: self.glorderdisc, glcogs: self.glcogs,
         gldircogs: self.gldircogs, glcogadj: self.glcogadj, glrestockchrg: self.glrestockchrg, glwtcogadj: self.glwtcogadj,
         glrebatecostadj: self.glrebatecostadj, glsalesreturns: self.glsalesreturns, glcoreconv: self.glcoreconv,
         glrebatewriteoff: self.glrebatewriteoff,
         user1: self.icseg.user1, user2: self.icseg.user2, user3: self.icseg.user3, user4: self.icseg.user4, user5: self.icseg.user5,
         user6: parseFloat(self.icseg.user6), user7: parseFloat(self.icseg.user7), user8: new Date(self.icseg.user8),
         user9: new Date(self.icseg.user9)
      };
      DataService.post('api/ic/asicsetup/icsegrequiredsave', { data: icsegsavecriteria, busy: true }, function (data) {
         if (data) {
            callback(data);
         }
      });
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      if (base.criteria.accttype) {
         self.accttypedisplay = $translate.instant('global.balance.sheet');
      }
      else {
         self.accttypedisplay = $translate.instant('global.income.statement');
      }

      self.icsegToCopy = stateParams.object;

      self.customSubmit = function () {
         //have to reset the request here incase of error
         if (request.length > 0) {
            request.pop();
         }

         request.rowid = self.icsegToCopy.icsegrowid;
         request.accttype = base.criteria.accttype;
         request.prodcat = self.icsegprodcat;
         request.whse = self.icsegwhse;
         request.custtype = self.icsegcusttype;
         request.salesrep = self.icsegsalesrep;
         request.cogsadj = self.icsegcogsadj;

         self.submit();
      };
   };

   this.extendCreateController = function (self, base, scope) {
      self.icsegprodcat = '';
      self.icsegwhse = '';
      self.icsegcusttype = '';
      self.icsegsalesrep = '';
      self.icsegcogsadj = '';
      self.isSalesRepRequired = base.salesrepenabledfl;
      self.isSalesRepReadonly = !base.salesrepenabledfl;

      if (base.criteria.accttype) {
         self.accttypedisplay = $translate.instant('global.balance.sheet');
      }
      else {
         self.accttypedisplay = $translate.instant('global.income.statement');
      }

      self.onCogsAdjustChange = function () {
         self.isSalesRepRequired = (base.salesrepenabledfl && !(self.icsegcogsadj));
         if (self.icsegcogsadj) {
            self.icsegsalesrep = '';
            self.isSalesRepReadonly = true;
         } else {
            self.isSalesRepReadonly = false;
         }
      };
   };

   this.createRecord = function (self, base, icseg, scope, callback) {

      icseg.accttype = base.criteria.accttype;
      icseg.prodcat = self.icsegprodcat;
      icseg.whse = self.icsegwhse;
      icseg.custtype = self.icsegcusttype;
      icseg.salesrep = self.icsegsalesrep;
      icseg.cogsadj = self.icsegcogsadj;


      DataService.post('api/ic/asicsetup/icsegcreate', { data: icseg, busy: true }, function (data) {
         if (data) {
            icseg.key2 = self.icsegprodcat;

            if (!base.whsehiddenfl) {
               icseg.key1 = self.icsegwhse;
            }
            if (!base.custtypehiddenfl) {
               icseg.key1 = self.icsegcusttype;
            }
            if (!base.cogsadjhiddenfl) {
               icseg.key1 = self.icsegcogsadj;
            }
            if (!base.salesrephiddenfl) {
               icseg.key1 = self.icsegsalesrep;
            }

            $state.go('icseg.detail.edit', { id: data.rowid });

         }
      });

   };

});