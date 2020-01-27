'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oessre',
      dataPath: 'api/oe/oessre',
      searchMethod: 'POST',
      searchPath: 'api/oe/asoeinquiry/oessresearch',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'oessresearchresults',
      resultsRowIdField: 'oessreRowID',
      copyStateView: 'oe/oessre/copy.json',
      deleteRequest: [],
      recentlyVisited: {
         title: { label: '', valueFunction: 'base.formatRmuTitle' },
         description: [
            { label: '', valueFunction: 'base.formatRmuDescrip' }
         ]
      }
   });
});

app.service('OessreService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils) {

   this.getRecord = function (self, base, stateParams) {
      var oessreUpdate = {
         rowid: stateParams.id
      };
      return DataService.getResource('api/oe/asoeinquiry/oessreretrieve', { data: oessreUpdate, method: 'POST', busy: true });
   };

   this.deleteMultiple = function (self, base, records, scope, callback) {
      var oessreudpate;
      var oessreudpateList = [];

      records.forEach(function (record) {
         oessreudpate = angular.copy(record);
         oessreudpate.updatetype = 'delete';
         oessreudpate.rowid = record.oessreRowID;
         oessreudpateList.push(oessreudpate);
      });
      DataService.post('api/oe/asoeinquiry/oessredelete', { data: oessreudpateList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               callback(data);
            }
         }
      });
   };

   this.extendBaseController = function (self) {
      var recordtype = AodataService.getValue('OE', 'OEDefaultLineSalesRepBy');
      if (!recordtype) {
         MessageService.alertOk('global.warning', 'message.no.default.sales.rep.at.line.level.selected');
      }

      self.currentRecordType = recordtype;
      self.criteria.recordtype = self.currentRecordType;

      self.getRecordTypeLabel = function (recordType) {
         var recordTypeLabel = '';

         switch (recordType) {
            default:
            case '':
               recordTypeLabel = MessageService.get('global.n.a');
               break;
            case 'pc':
               recordTypeLabel = MessageService.get('global.product.category');
               break;
         }

         return recordTypeLabel;
      };

      self.currentRecordTypeLabel = self.getRecordTypeLabel(self.currentRecordType);

      self.setSearchRecordLabel = function () {
         if (self.criteria.range) {
            self.prodCatLabel = MessageService.get('global.beginning.product.category');
         } else {
            self.prodCatLabel = MessageService.get('global.product.category');
         }
      };
      //set it initially
      self.setSearchRecordLabel();

      self.formatRmuTitle = function (oessre) {
         return MessageService.get('global.product.category') + ': ' + oessre.prodcat;
      };

      self.formatRmuDescrip = function (oessre) {
         var subTitle = '';

         if (oessre.custno) {
            subTitle += MessageService.get('global.customer') + ': ' + oessre.custno;
         }

         if (oessre.shipto) {
            subTitle += MessageService.get('global.ship.to') + ': ' + oessre.shipto;
         }

         if (oessre.slsrepin) {
            subTitle += MessageService.get('global.sales.rep.in') + ': ' + oessre.slsrepin;
         }

         if (oessre.slsrepout) {
            subTitle += MessageService.get('global.sales.rep.out') + ': ' + oessre.slsrepout;
         }

         return subTitle;
      };
   };

   this.extendDetailController = function (self, base, oessreChange, scope) {
      self.oessre.$promise.then(function () {
         self.recordTypeLabel = base.getRecordTypeLabel(self.oessre.recordtype);
         self.setRecordLabel();
      });

      self.setRecordLabel = function () {
         if (self.oessre.endrecord) {
            self.oessre.range = true;
            self.prodCatLabel = MessageService.get('global.beginning.product.category');
         } else {
            self.prodCatLabel = MessageService.get('global.product.category');
         }
      };

      self.runOessreChange = function () {
         DataService.post('api/oe/asoeinquiry/oessrechange', { data: self.oessre, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  $state.go('^.master');
                  base.search();
               }
            }
         });
      };

      self.delete = function () {
         self.oessre.updatetype = 'delete';

         self.runOessreChange();
      };

      self.submit = function () {
         self.oessre.updatetype = 'change';

         self.runOessreChange();
      };
   };

   this.extendCreateController = function (self, base, oessreChange, scope) {
      self.oessre.recordtype = base.currentRecordType;
      self.recordTypeLabel = base.getRecordTypeLabel(self.oessre.recordtype);

      self.setRecordLabel = function () {
         if (self.oessre.range) {
            self.prodCatLabel = MessageService.get('global.beginning.product.category');
         } else {
            self.prodCatLabel = MessageService.get('global.product.category');
         }
      };
      //set it initially
      self.setRecordLabel();

      self.submit = function () {
         self.oessre.updatetype = 'add';

         DataService.post('api/oe/asoeinquiry/oessrechange', { data: self.oessre, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  $state.go('^.master');
                  base.search();
               }
            }
         });
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      self.oessre = angular.copy(stateParams.object);
      self.origOessre = angular.copy(stateParams.object);

      self.recordTypeLabel = base.getRecordTypeLabel(self.oessre.recordtype);

      self.setRecordLabel = function () {
         if (self.oessre.endrecord) {
            self.oessre.range = true;
            self.prodCatLabel = MessageService.get('global.beginning.product.category');
         } else {
            self.prodCatLabel = MessageService.get('global.product.category');
         }
      };
      //set it initially
      self.setRecordLabel();

      self.cancel = function () {
         $state.go('^.master');
      };

      self.submit = function () {
         self.oessre.updatetype = 'add';

         DataService.post('api/oe/asoeinquiry/oessrechange', { data: self.oessre, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  $state.go('^.detail', { id: data.rowid, object: data });
               }
            }
         });
      };
   };
});