'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oedc',
      dataPath: 'api/oe/oedc',
      recordName: 'oedc',
      searchMethod: 'POST',
      searchPath: '',
      searchResultsField: '',
      resultsRowIdField: 'oedcRowidStr',
      searchCriteria: { typecd: 'C', key1: '', key2: '' },
      recentlyVisited: {
         title: { label: 'global.type', valueFunction: 'base.formatType' },
         description: { label: '', valueFunction: 'base.formatKeys' }
      }
   });
});

app.service('OedcService', function ($state, $translate, ConfigService, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {

      // Format function for type in recently visited display
      self.formatType = function (oedc) {
         var oedcType = oedc.typecd;

         if (oedcType) {
            switch (oedcType.toUpperCase()) {
               case 'C':
                  return $translate.instant('global.customer');
               case 'S':
                  return $translate.instant('global.ship.to');
               case 'V':
                  return $translate.instant('global.vendor');
               case 'F':
                  return $translate.instant('global.ship.from');
               case 'W':
                  return $translate.instant('global.warehouse');
               case 'O':
                  return $translate.instant('global.oe');
               case 'P':
                  return $translate.instant('global.po');
               case 'T':
                  return $translate.instant('global.wt');
               default:
                  return oedcType;
            }
         } else {
            return oedcType;
         }
      };

      // Format function for key fields in recently visited display
      self.formatKeys = function (oedc) {
         var oedcType = oedc.typecd;

         if (oedcType) {
            switch (oedcType.toUpperCase()) {
               case 'C':
               case 'V':
               case 'W':
                  return oedc.key1;
               case 'S':
               case 'F':
                  return oedc.key1 + '|' + oedc.key2;
               case 'O':
               case 'P':
               case 'T':
                  return oedc.key1 + '-' + Utils.pad(oedc.key2, 2);
               default:
                  return oedc.key1 + '|' + oedc.key2;
            }
         } else {
            return '';
         }
      };

      self.search = function () {
         var criteria = {
            typecd: self.criteria.typecd,
            key1: self.criteria.key1.toString(),
            key2: self.criteria.key2.toString(),
            recordcountlimit: ConfigService.getDefaultRecordLimit()
         };

         // Load the main grid
         DataService.post('/web/api/oe/oedcrecordlist', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (data.ttbloedcrecordlist) {
                  self.dataset = data.ttbloedcrecordlist;
               }
            }
         });
      }; // search  
   };

   this.extendSearchController = function (self, base, criteria, scope) {

      // If the Type changes - clear out the keys
      base.setResetTypeDefaults = function () {
         if (base.criteria.typecd) {
            base.criteria.key1 = '';
            base.criteria.key2 = '';
            base.criteria.searchOrder = '';
         };
      };

      base.orderEntered = function () {
         if (base.criteria.searchOrder != null) {
            var orderParts = base.criteria.searchOrder.split('-');
            if (orderParts.length === 2) {
               base.criteria.key1 = parseInt(orderParts[0], 10);
               base.criteria.key2 = parseInt(orderParts[1], 10);
            }
         } else {
            base.criteria.key1 = '';
            base.criteria.key2 = '';
            base.criteria.searchOrder = '';
         }
      };
   };

   this.extendCreateController = function (self, base, oedc, $scope) {

      oedc.typecd = 'C';
      oedc.key1 = '';
      oedc.key2 = '';
      oedc.equipcd = ''
      oedc.routehold = false;

      // If the Type changes - clear out the keys
      self.setResetTypeDefaults = function () {
         if (self.oedc.typecd) {
            self.oedc.key1 = '';
            self.oedc.key2 = '';
         }
      };

      self.orderEntered = function () {
         if (self.oedc.searchOrder != null) {
            var orderParts = self.oedc.searchOrder.split('-');
            if (orderParts.length === 2) {
               self.oedc.key1 = parseInt(orderParts[0], 10);
               self.oedc.key2 = parseInt(orderParts[1], 10);
            }
         } else {
            self.oedc.key1 = '';
            self.oedc.key2 = '';
            self.oedc.searchOrder = '';
         }
      };
   };

   this.extendDetailController = function (self, base, oedc, scope) {

      oedc.$promise.then(function () {
         // the next line can be removed when a global fix for the case-sensitive issue is in place
         oedc.typecd = oedc.typecd.toUpperCase();
         if (oedc.typecd === 'O' || oedc.typecd === 'P' || oedc.typecd === 'T') {
            oedc.searchOrder = oedc.key1 + '-' + Utils.pad(oedc.key2, 2);
         }
         if (oedc.typecd === 'O') {
            var params = {
               orderno: oedc.key1,
               ordersuf: oedc.key2
            };

            DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
               oedc.routehold = data.drholdfl;
            });
         }
      });

      self.getSubTitle = function () {
         var subTitleText;
         if (self.oedc.typecd != null) {

            switch (self.oedc.typecd.toUpperCase()) {
               case 'C':
                  subTitleText = MessageService.get('global.customer') + ': ' +
                                 self.oedc.key1;
                  break;
               case'V':
                  subTitleText = MessageService.get('global.vendor') + ': ' +
                                 self.oedc.key1;
                  break;
               case 'W':
                  subTitleText = MessageService.get('global.warehouse') + ': ' +
                                 self.oedc.key1;
                  break;
               case 'S':
                  subTitleText = MessageService.get('global.ship.to') + ': ' +
                                 self.oedc.key1 + ' | '  + self.oedc.key2;
                  break;
               case 'F':
                  subTitleText = MessageService.get('global.ship.from') + ': ' +
                                 self.oedc.key1 + ' | ' + self.oedc.key2;
                  break;
               case 'O':
                  subTitleText = MessageService.get('global.oe') + ': ' +
                                 self.oedc.key1 + '-' + Utils.pad(self.oedc.key2, 2);
                  break;
               case 'P':
                  subTitleText = MessageService.get('global.po') + ': ' +
                                 self.oedc.key1 + '-' + Utils.pad(self.oedc.key2, 2);
                  break;
               case 'T':
                  subTitleText = MessageService.get('global.wt') + ': ' +
                                 self.oedc.key1 + '-' + Utils.pad(self.oedc.key2, 2);
                  break;
            }
         }
         return subTitleText;
      };
   };

   this.createRecord = function (self, base, oedc, scope, callback) {
      DataService.post('api/oe/oedc', { data: oedc, busy: true }, function (data) {
         if (oedc.typecd.toUpperCase() === 'O') {
            DataService.get('api/oe/asoeentry/oedcsaveroutehold/' + oedc.key1 + '/' + oedc.key2 + '/' + oedc.routehold, { busy: true }, function (data) {
               callback(data);
            });
         } else {
            callback(data);
         }
      });
   }

   this.updateRecord = function (self, base, oedc, scope, callback) {
      DataService.put('api/oe/oedc', { data: oedc, busy: true }, function (data) {
         if (oedc.typecd.toUpperCase() === 'O') {
            DataService.get('api/oe/asoeentry/oedcsaveroutehold/' + oedc.key1 + '/' + oedc.key2 + '/' + oedc.routehold, { busy: true }, function (data) {
               callback(data);
            });
         } else {
            callback(data);
         }
      });
   }
});