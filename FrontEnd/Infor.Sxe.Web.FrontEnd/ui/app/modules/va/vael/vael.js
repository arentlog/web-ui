'use strict';

app.config(function (StateProvider, $stateProvider) {
   StateProvider.addSetupStates({
      module: 'va',
      menuFn: 'vael',
      dataPath: 'api/va/vael',
      searchMethod: 'POST',
      searchPath: 'api/va/asvaline/vaellinelaboritretrieve',
      searchResultsField: 'valaborline',
      resultsRowIdField: 'vaeslrowid',
      primaryKeyParams: ['oper2'],
      recordName: 'vaesl',
      passGridRecord: true,
      detailSubTitle: [
         { label: null, value: 'vano' },
         { label: 'global.operator', value: 'timeslsrep' }
      ],
      recentlyVisited: null
   });

   $stateProvider.state('vael.update', {
      url: '/update',
      params: {
         functionnm: undefined,
         updateall: undefined,
         oper2: undefined,
         workdate: undefined,
         vano: undefined,
         vasuf: undefined,
         seqno: undefined
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vael/update.json');
            },
            controller: 'VaelUpdateCtrl as updt'
         }
      }
   });

   $stateProvider.state('vael.sectionreviewlabor', {
      url: '/section-review-labor',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vael/tabs/sections/review-labor.json');
            },
            controller: 'VaelSectionRevLaborCtrl as sctnrev'
         }
      }
   });

   $stateProvider.state('vael.sectionreviewlabor.extend', {
      url: '/extend',
      views: {
         subReviewLabor: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vael/tabs/sections/labor-extend.json');
            },
            controller: 'VaelSectionLaborExtendCtrl as sctnlext'
         }
      }
   });

   $stateProvider.state('vael.sectionreviewlabor.info', {
      url: '/info',
      views: {
         subReviewLabor: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vael/tabs/sections/labor-info.json');
            },
            controller: 'VaelSectionLaborInfoCtrl as sctnlinf'
         }
      }
   });

});

app.service('VaelService', function ($state, $translate, $filter, DataService, GridService, MessageService, AodataService, UserService, Utils, Sasoo, OptionSetService) {

   this.getRecord = function (self, base, stateParams) {

      var laborline = {};
      var id = 0;

      /* rowid comes from drilling down to detail, recently visited or creating a new record */
      if (stateParams.id) {
         id = stateParams.id;
      }

      // clear key values
      base.initKeyValues();

      laborline = DataService.getResource('api/va/vaesl/getbyrowid/' + id + '?fillmode=true', { busy: true });

      laborline.$promise.then(function () {
         if (laborline.$resolved === true) {

            var criteria = {
               vaeslrowid: id
            };
            // Data used for the detail screens
            DataService.getResource('api/va/asvaline/vaellinelaboritretrieve/', { data: criteria, method: 'POST', busy: true }, function (data) {
               if (data) {
                  data.$promise.then(function () {
                     base.valaborline = data.valaborline[0];
                     base.sectionSelectedRecord = base.valaborline;
                     base.vanox = base.getFullOrderNumber(base.valaborline);
                  });
               }
            });
         } // laborline.$resolved
      }); // laborline.$promise.then

      return laborline;

   }; // getRecord

   this.extendMasterController = function (self, base) {

      self.vaorderHyperlink = function (e, args) {
         var currentRow = args[0].item;
         if (currentRow) {
            $state.go('vaif.detail', { pk: currentRow.vano, pk2: currentRow.vasuf });
         }
      };

      self.shipprodHyperlink = function (e, args) {
         var currentRow = args[0].item;
         if (currentRow) {
            $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
         }
      };

      self.hoursFormatter = function (row, cell, value) {
         return (value !== 0) ? value : '-';
      };

      self.minutesFormatter = function (row, cell, value) {
         return (value !== 0) ? value : '-';
      };

      // Launch Update from the main grid
      self.launchUpdate = function (whichUpdate) {

         if (whichUpdate === 'allDisplayedOrders') {
            // user selected Update All option - will update all displayed orders in the main grid
            // Note - if workdate is passed when updating all the update logic will select all vaesl records with a vaesl.timeworkdt >= than the workdate
            base.sectionSelectedRecord = {};
            var allparams = {
               functionnm: 'vael',
               updateall: true,
               oper2: base.criteria.oper2,
               workdate: (base.criteria.workdate) ? base.criteria.workdate : null,
               vano: 0,
               vasuf: 0,
               seqno: 0
            };
            $state.go('vael.update', allparams);
         } else if (whichUpdate === 'selectedOrderSeqno') {
            // user selected Update Selected Row option - will just the selected order in the main grid
            base.sectionSelectedRecord = GridService.getSelectedRecord(base.grid);

            var selectedparams = {
               functionnm: 'vael',
               updateall: false,
               oper2: base.sectionSelectedRecord.timeslsrep,
               workdate: base.sectionSelectedRecord.timeworkdt,
               vano: base.sectionSelectedRecord.vano,
               vasuf: base.sectionSelectedRecord.vasuf,
               seqno: base.sectionSelectedRecord.seqno
            };

            $state.go('vael.update', selectedparams);
         } // selectedOrder

      }; // self.launchUpdate

   }; // extendMasterController

   this.extendBaseController = function (self) {

      self.sectionSelectedRecord = {};
      self.vasectionresetcriteria = {};
      self.sectioncomplete = false;

      self.canSeeCosts = function () {
         return Sasoo.seecostfl;
      };

      self.isReviewLabor = function () {
         return $state.is('vael.sectionreviewlabor');
      };

      OptionSetService.get('VA', 'SectionType', function (set) {
         self.sectionTypes = set.children;
      });

      self.formatSectionType = function (sctntype) {
         if ((sctntype || sctntype === '') && self.sectionTypes) {
            for (var i = 0; i < self.sectionTypes.length; i++) {
               var type = self.sectionTypes[i];

               if (sctntype.toLowerCase() === type.value.toLowerCase()) {
                  return type.label;
               }
            }
         }
         return '';

      };

      self.vaorderHyperlink = function () {
         if (self.valaborline.vano) {
            $state.go('vaif.detail', { pk: self.valaborline.vano, pk2: self.valaborline.vasuf });
         }
      };

      self.shipprodHyperlink = function () {
         if (self.valaborline.shipprod) {
            $state.go('icip.detail', { pk: self.valaborline.shipprod, pk2: self.valaborline.whse });
         }
      };

      self.getFullOrderNumber = function (varecord) {
         if (varecord) {
            return varecord.vano + '-' + Utils.pad(varecord.vasuf, 2);
         } else {
            return '0-00';
         }
      };

      self.clearSectionValues = function () {
         self.valaborline.prodcost = 0;
         self.valaborline.netamt = 0;
         self.valaborline.shipprod = '';
         self.valaborline.sctntype = '';
         self.valaborline.sctncode = '';
         self.valaborline.stagecddesc = '';
      };

      self.orderSelected = function (args) {
         if (args.value) {
            if (args.source === 'entry') {
               var orderParts = self.vanox.split('-');
               if (orderParts.length === 2) {
                  self.valaborline.vano = orderParts[0];
                  self.valaborline.vasuf = orderParts[1];
               } else {
                  self.valaborline.vano = self.vanox;
                  self.valaborline.vasuf = 0;
               }
            } else {
               self.valaborline.vano = args.value;
               self.valaborline.vasuf = args.value2;
            }
         } else {
            self.valaborline.vano = 0;
            self.valaborline.vasuf = 0;
         }
         self.valaborline.seqno = 0;
                     self.clearSectionValues();
      };

      self.updateKeyValues = function () {
         self.valaborlinecriteria.oper2 = self.valaborline.timeslsrep;
         self.valaborlinecriteria.workdate = self.valaborline.timeworkdt;
         self.valaborlinecriteria.vano = self.valaborline.vano;
         self.valaborlinecriteria.vasuf = self.valaborline.vasuf;
         self.valaborlinecriteria.seqno = self.valaborline.seqno;
         self.valaborlinecriteria.vaeslrowid = self.valaborline.vaeslrowid;
      };

      self.splitFullVAOrderNumber = function () {
         self.valaborline.vano = 0;
         self.valaborline.vasuf = 0;
         if (self.vanox) {
            var orderParts = self.vanox.split('-');
            self.valaborline.vano = orderParts[0];
            self.valaborline.vasuf = (orderParts.length === 2) ? orderParts[1] : 0;
         }
      };

      self.initKeyValues = function () {
         self.vanox = self.getFullOrderNumber();
         self.valaborline = {};
         self.valaborline.vano = 0;
         self.valaborline.vasuf = 0;
         self.valaborline.timeslsrep = self.criteria.oper2;
         self.valaborline.seqno = 0;
         self.valaborline.hours = 0;
         self.valaborline.minutes = 0;
         self.valaborline.prodcost = 0;            // hidden when user cannot see the cost
         self.valaborline.netamt = 0;              // hidden when user cannot see the cost
         self.valaborline.timeworkdt = null;

         // if either value not set it will create a new record
         self.valaborline.lineno = 0;
         self.valaborline.vaeslrowid = null;

         self.valaborlinecriteria = {};
         self.valaborlinecriteria.oper2 = self.criteria.oper2;
         self.valaborlinecriteria.workdate = null;
         self.valaborlinecriteria.vano = 0;
         self.valaborlinecriteria.vasuf = 0;
         self.valaborlinecriteria.seqno = 0;
         self.valaborlinecriteria.vaeslrowid = null;
      }; // initKeyValues

      self.initKeyValues();

   }; // extendBaseController

   this.extendDetailController = function (self, base) {

      // called when making changes that impact the net amount - i.e. change of shipprod, time, etc.
      self.loadCharges = function () {
         base.updateKeyValues();

         self.valaborline = [];
         self.valaborline[0] = base.valaborline;
         var params = {
            valaborlinecriteria: base.valaborlinecriteria,
            valaborline: self.valaborline
         };

         // note - busy intentionally not set since user is navigating screen
         DataService.getResource('api/va/asvaline/vaellaborloadcharges', { data: params, method: 'POST', busy: false }, function (data) {
            if (data) {
               base.valaborline = data.valaborline[0];
            }
         });
      };

      self.laborProductChanged = function () {
         base.valaborline.getnewprodcostfl = true;
         self.loadCharges();
      };

      self.customSubmit = function () {
         self.submit();
      };

      // Launch single update from the Detail screen
      self.launchSingleUpdate = function () {
         var params = {
            functionnm: 'vael',
            updateall: false,
            oper2: base.valaborline.timeslsrep,
            workdate: base.valaborline.timeworkdt,
            vano: base.valaborline.vano,
            vasuf: base.valaborline.vasuf,
            seqno: base.valaborline.seqno
         };

         $state.go('vael.update', params);
      };

   }; // extendDetailController

   this.extendCreateController = function (self, base) {

      // called when making changes that impact the net amount - i.e. change of shipprod, time, etc.
      self.loadCharges = function () {
         base.updateKeyValues();

         self.valaborline = [];
         self.valaborline[0] = base.valaborline;
         var params = {
            valaborlinecriteria: base.valaborlinecriteria,
            valaborline: self.valaborline
         };

         // note - busy intentionally not set since user is navigating screen
         DataService.getResource('api/va/asvaline/vaellaborloadcharges', { data: params, method: 'POST', busy: false }, function (data) {
            if (data) {
               base.valaborline = data.valaborline[0];
            }
         });
      };

      self.laborProductChanged = function () {
         base.valaborline.getnewprodcostfl = true;
         self.loadCharges();
      };

      self.orderSelected = function (args) {
         var fullOrderNo = '';
         if (args.value) {
            if (args.source === 'entry') {
               var orderParts = base.vanox.split('-');
               if (orderParts.length === 2) {
                  base.valaborline.vano = orderParts[0];
                  base.valaborline.vasuf = orderParts[1];
               } else {
                  base.valaborline.vano = base.vanox;
                  base.valaborline.vasuf = 0;
               }
            } else {
               base.valaborline.vano = args.value;
               base.valaborline.vasuf = args.value2;
            }
         } else {
            base.valaborline.vano = 0;
            base.valaborline.vasuf = 0;
         }
         base.valaborline.seqno = 0;

         if (base.valaborline.vano) {
            var sctntype = 'it';

            /* Default sequence number from VAES */
            var params = {
               completefl: false,
               sctntype: sctntype,
               vano: base.valaborline.vano,
               vasuf: base.valaborline.vasuf,
               seqno: null
            };
            DataService.get('api/va/vaes/listbysection', { params: params, busy: true }, function (data) {
               if (data && data.length) {
                  // Sort results by sequence number
                  data = $filter('orderBy')(data, 'seqno');
                  base.valaborline.seqno = data[0].seqno; /* Value Add Section Sequence */
                  if (base.valaborline.seqno > 0) {
                     self.changeOfVASequence();
                  } else {
                     base.clearSectionValues();
                  }
               }
            }, function () {
               if (base.valaborline.seqno === 0) {
                  base.clearSectionValues();
               }
            });
         }
      };

      // called when the user changes the sequence number
      self.changeOfVASequence = function () {
         base.clearSectionValues();

         var vasectionlookupcriteria = {
            activeonly: false,
            vano: base.valaborline.vano,
            vasuf: base.valaborline.vasuf,
            seqno: base.valaborline.seqno,
            recordcountlimit: 1
         };

         DataService.getResource('api/va/vaes/lookup', { data: vasectionlookupcriteria, method: 'POST', busy: true }, function (data) {
            if (data && data.vasectionlookupresults.length > 0) {
               base.valaborline.sctntype = data.vasectionlookupresults[0].sctntype;
               base.valaborline.sctncode = data.vasectionlookupresults[0].sctncode;

               var valinelaborreviewcriteria = {
                  functionnm: 'vaif',
                  vano: base.valaborline.vano,
                  vasuf: base.valaborline.vasuf,
                  seqno: base.valaborline.seqno
               };

               // default values from first line if available
               DataService.getResource('api/va/asvasection/vareviewlaborretrieve/', { data: valinelaborreviewcriteria, method: 'POST', busy: true }, function (data) {
                  if (data) {
                     if (data.valinelaborreview.length > 0) {
                        base.valaborline.whse = data.valinelaborreview[0].whse;
                        base.valaborline.shipprod = data.valinelaborreview[0].shipprod;
                        base.valaborline.prodcost = data.valinelaborreview[0].prodcost;
                        self.loadCharges();
                     }
                  }
               });
            }
         });

      }; // self.changeOfVASequence

      self.customSubmit = function () {
         self.submit();
      };

      self.initKeyValues = function () {
         base.initKeyValues();
      }; // initKeyValues

      self.initKeyValues();

   }; // extendCreateController


   this.createRecord = function (self, base, vaesl, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      // if either value not set it will create a new record
      base.valaborline.lineno = 0;
      base.valaborline.vaeslrowid = null;

      // create the new record
      base.updateKeyValues();

      self.valaborline = [];
      self.valaborline[0] = base.valaborline;


      var params = {
         valaborlinecriteria: base.valaborlinecriteria,
         valaborline: self.valaborline
      };

      DataService.post('api/va/asvaline/vaellinelaboritupdate', { data: params, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               base.valaborline = data.valaborline[0];
               callback(base.valaborline);
            }
         }
      });

   }; // createRecord

   this.updateRecord = function (self, base, vaesl, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      base.updateKeyValues();

      self.valaborline = [];
      self.valaborline[0] = base.valaborline;
      var params = {
         valaborlinecriteria: base.valaborlinecriteria,
         valaborline: self.valaborline
      };

      DataService.post('api/va/asvaline/vaellinelaboritupdate', { data: params, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               base.valaborline = data.valaborline[0];
               callback(base.valaborline);
            }
         }
      });

   }; // updateRecord

   this.deleteRecord = function (self, base, vaesl, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      var criteria = {
         vaeslrowid: base.valaborline.vaeslrowid
      };

      DataService.post('api/va/asvaline/vaellinelaboritdelete', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               callback(data);
            }
         }
      });

   }; // deleteRecord

   this.deleteMultiple = function (self, base, records, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      records.forEach(function (record) {
         var criteria = {
            vaeslrowid: record.vaeslrowid
         };

         DataService.post('api/va/asvaline/vaellinelaboritdelete', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (noHardErrors(data)) {
                  callback(data);
               }
            }
         });
      });

   }; // deleteMultiple

});  // VaelService

app.controller('VaelUpdateCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;       //ignore jslint - base is used in the screens
   self.mixedCost = false;

   self.getSubTitle = function () {
      if ($stateParams.updateall) {
         return $translate.instant('global.update.all') + ' | ' + $translate.instant('global.operator') + ': ' + $stateParams.oper2;
      } else {
         return $translate.instant('global.update') + ' ' + $translate.instant('global.value.add.order.number') + ': ' + $stateParams.vano + '-' + Utils.pad($stateParams.vasuf, 2) + ' | ' +
                $translate.instant('global.sequence.number.poundsign') + ': ' + $stateParams.seqno + ' | ' + $translate.instant('global.operator') + ': ' + $stateParams.oper2;
      }
   };

   self.reviewLabor = function () {
      $state.go('vael.sectionreviewlabor');
   };

   function noHardErrors(datacheck) {
      return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
   }

   self.getShowSectionComplete = function () {
      return self.showSectionComplete;
   };

   self.VASectionShip = function () {
      var vasectionshipcriteria = {
         updateall: $stateParams.updateall,
         oper2: $stateParams.oper2,
         workdate: $stateParams.workdate,
         vano: $stateParams.vano,
         vasuf: $stateParams.vasuf,
         seqno: $stateParams.seqno
      };

      // Save criteria in case the user wishes to cancel process before Completing
      base.vasectionresetcriteria = vasectionshipcriteria;

      DataService.getResource('api/va/asvasection/vasectionship', { data: vasectionshipcriteria, method: 'POST', busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               if (data.lReviewLabor) {
                  // Note - only done when a single VA Order is selected for Update
                  self.showSectionComplete = false;
                  self.reviewLabor();
               } else {
                  // VA Section Complete
                  self.VASectionComplete();
               }
            }
         }
      });
   }; // self.VASectionShip

   self.VASectionComplete = function () {
      self.showSectionComplete = true;

      self.vasectioncompletecriteria = {
         vano: base.sectioncomplete & !$stateParams.vano ? base.sectionSelectedRecord.vano : $stateParams.vano,
         vasuf: base.sectioncomplete & !$stateParams.vano ? base.sectionSelectedRecord.vasuf : $stateParams.vasuf,  // Yes, checking vano not vasuf
         seqno: base.sectioncomplete & !$stateParams.vano ? base.sectionSelectedRecord.seqno : $stateParams.seqno,  // Yes, checking vano not seqno
         wiplist: '',
         functionnm: $stateParams.functionnm,
         period: 0,
         screenperiod: '',
         postdt: null,
         screenpostdt: '',
         stkadjfl: false,
         stkadjenablefl: true,
         addonfl: false,
         addondisplayfl: true,
         sctntypeoverride: '',
         autoshipprevfl: false,
         wlwhsechgfl: false,
         screentitle: '',
         reviewlaborcostsfl: false,
         userfield: ''
      };

      base.sectioncomplete = false;

      // Initialize the Section Complete
      DataService.getResource('api/va/asvasection/vasectioncompleteinitialize', { data: self.vasectioncompletecriteria, method: 'POST', busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               self.vasectioncompletecriteria = data.vasectioncompletecriteria;
               self.showSectionComplete = true;
            }
         }
      });
   }; // self.VASectionComplete

   // called when user clicks on Complete Section from the toolbar
   self.completeSection = function () {

      DataService.post('api/va/asvasection/vasectioncomplete', { data: self.vasectioncompletecriteria, busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');

               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('^.master', null, { reload: '^.master' });
            }
         }
      });

   }; // self.completeSection

   self.cancel = function () {

      DataService.getResource('api/va/asvasection/vasectionreset', { data: base.vasectionresetcriteria, method: 'POST', busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('^.master', null, { reload: '^.master' });
            }
         }
      });

   }; // self.cancel

   self.updateProcessing = function () {

      // show/hide sections based on update status
      self.showSectionComplete = false;

      // Note - there is no Update selection logic here since the user already selected either 'Update Selected Value Add Order Sequence #/'Update All Display Value Add Orders' from the main grid or selected 'Update' while in the Detail screen
      if (base.sectioncomplete) {
         self.VASectionComplete();
      } else {
         self.VASectionShip();
      }
   };

   self.updateProcessing();

});

app.controller('VaelSectionRevLaborCtrl', function ($scope, $state, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.revSubTitle = MessageService.get('global.order.number') + ' ' + base.sectionSelectedRecord.vano + '-' + Utils.pad(base.sectionSelectedRecord.vasuf, 2) + ' ';
   self.revSubTitle += MessageService.get('global.sequence.number.poundsign') + ' ' + base.sectionSelectedRecord.seqno;

   self.reviewCriteria = {
      vano: base.sectionSelectedRecord.vano,
      vasuf: base.sectionSelectedRecord.vasuf,
      seqno: base.sectionSelectedRecord.seqno,
      functionnm: 'vael'
   };

   self.activeLines = false;
   self.laborReview = null;
   self.laborReviewTotals = [];
   self.laborSelectedRecord = {};

   self.sectionFormatter = function (row, cell, value) {
      if (value) {
         return base.formatSectionType(value);
      }
   };

   self.timeTypeFormatter = function (row, cell, value) {
      if (value) {

         if (value.toLowerCase() === 'a') {
            return MessageService.get('global.actual');
         } else {
            return MessageService.get('global.estimated');
         }

      } else {
         return value;
      }
   };

   self.canSeeCost = function () {
      return base.canSeeCosts();
   };

   self.loadFields = function () {
      self.laborReview.forEach(function (review) {
         if (review.timeactty.toLowerCase() === 'e') {
            review.infotext = MessageService.get('message.star.est');
         } else {
            review.infotext = '';
            self.activeLines = true;
         }
         review.esttimetext = Utils.pad(review.hours, 2) + ":" + Utils.pad(review.minutes, 2);
      });
   };

   function noHardErrors(datacheck) {
      return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
   }

   // Get the data to be used in the section labor line review
   DataService.post('api/va/asvasection/vareviewlaborretrieve', { data: self.reviewCriteria, busy: true }, function (data) {
      if (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            self.laborReview = data.valinelaborreview;
            self.laborReviewTotals = data.valinelaborreviewtotals;
            self.loadFields();
         }

      }
   });

   self.laborInfo = function () {
      $state.go('vael.sectionreviewlabor.info');
   };

   self.laborExtend = function () {
      $state.go('vael.sectionreviewlabor.extend');
   };

   // When a row is selected, get the data for the section and populate the line data
   self.setCurrentLaborLine = function () {

      self.laborSelectedRecord = GridService.getSelectedRecord(self.grid);

   };

   self.submit = function () {
      var updateCriteria = {
         valinelaborreview: self.laborReview,
         valinelaborreviewcriteria: self.reviewCriteria,
         valinelaborreviewtotals: self.laborReviewTotals,
         cThisFunction: 'vael'
      };

      if (self.laborReviewTotals.completeestimatedcost || self.laborReviewTotals.unitestimatedcost || self.laborReviewTotals.controlledestimatedcost && self.activeLines === true) {
         MessageService.yesNo('global.question', 'question.there.are.estimated.costs.when.actual.cost.lines.e',
            function () {
               // Yes processing
               DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updateCriteria, busy: true }, function (data) {
                  if (!MessageService.processMessaging(data)) {
                     base.sectioncomplete = true;
                     var params = {
                        functionnm: 'vael',
                        updateall: false,
                        oper2: base.valaborline.timeslsrep,
                        workdate: base.valaborline.timeworkdt,
                        vano: base.valaborline.vano,
                        vasuf: base.valaborline.vasuf,
                        seqno: base.valaborline.seqno
                     };
                     $state.go('vael.update', params);
                  }
               });
            });
      } else {
         DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updateCriteria, busy: true }, function (data) {
            if (!MessageService.processMessaging(data)) {
               base.sectioncomplete = true;
               var params = {
                  functionnm: 'vael',
                  updateall: false,
                  oper2: base.valaborline.timeslsrep,
                  workdate: base.valaborline.timeworkdt,
                  vano: base.valaborline.vano,
                  vasuf: base.valaborline.vasuf,
                  seqno: base.valaborline.seqno
               };
               $state.go('vael.update', params);
            }

         });
      }

   };

   self.cancel = function () {

      DataService.getResource('api/va/asvasection/vasectionreset', { data: base.vasectionresetcriteria, method: 'POST', busy: true }, function (data) {
         if (data) {
            if (noHardErrors(data)) {
               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('^.master', null, { reload: '^.master' });
            }
         }
      });

   }; // self.cancel

});

app.controller('VaelSectionLaborExtendCtrl', function ($scope, $state, MessageService) {
   var self = this;
   var sctnrev = $scope.sctnrev;

   self.extSubTitle = MessageService.get('global.sequence.number.poundsign') + ' ' + sctnrev.laborSelectedRecord.seqno;
   self.extSubTitle += ' ' + MessageService.get('global.line.number') + ' ' + sctnrev.laborSelectedRecord.lineno;

   // Extended labor line data is read-only from the section - review labor lines screen

   self.submit = function () {
      $state.go('^');
   };

});

app.controller('VaelSectionLaborInfoCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var sctnrev = $scope.sctnrev;

   self.infSubTitle = MessageService.get('global.sequence.number.poundsign') + ' ' + sctnrev.laborSelectedRecord.seqno;
   self.infSubTitle += ' ' + MessageService.get('global.line.number') + ' ' + sctnrev.laborSelectedRecord.lineno;

   self.changeProduct = function () {
      // If the new data is valid, commit the changes and return to labor review screen
      var productCriteria = {
         valinelaborreview: sctnrev.laborSelectedRecord,
         valinelaborreviewcriteria: sctnrev.reviewCriteria,
         valinelaborreviewtotals: sctnrev.laborReviewTotals,
         cFieldName: 'shipprod'
      };

      DataService.post('api/va/asvasection/vareviewlaborleavefield', { data: productCriteria, busy: true }, function (data) {
         if (data) {
            sctnrev.laborSelectedRecord = data.valinelaborreview;
         }
      });

   };

   self.updateLabor = function () {
      // If the new data is valid, commit the changes and return to labor review screen
      var updateCriteria = {
         valinelaborreview: sctnrev.laborReview,
         valinelaborreviewcriteria: sctnrev.reviewCriteria,
         valinelaborreviewtotals: sctnrev.laborReviewTotals,
         cThisFunction: 'vael'
      };

      DataService.post('api/va/asvasection/vareviewlaborupdate', { data: updateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            $state.go('^');
         }
      });

   };

   self.validateLabor = function () {
      // Validate the new labor data
      var validateCriteria = {
         valinelaborreview: self.tempRecord,
         valinelaborreviewcriteria: sctnrev.reviewCriteria,
         valinelaborreviewtotals: sctnrev.laborReviewTotals
      };

      DataService.post('api/va/asvasection/vareviewlaborvalidate', { data: validateCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {

            self.updateLabor();

         }
         sctnrev.laborSelectedRecord = self.tempRecord;
      });
   };

   self.submit = function () {

      // Losing the screen data if an error occurs in the validate SI call. Store off the data.
      self.tempRecord = sctnrev.laborSelectedRecord;

      var calcCriteria = {
         valinelaborreview: sctnrev.laborReview,
         valinelaborreviewcriteria: sctnrev.reviewCriteria
      };

      DataService.post('api/va/asvasection/vareviewlaborcalculatetotals', { data: calcCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data sets based upon the new labor information
            if (!MessageService.processMessaging(data.messaging)) {
               sctnrev.laborReview = data.valinelaborreview;
               sctnrev.laborReviewTotals = data.valinelaborreviewtotals;

               self.validateLabor();

            }

         }

      });

   };

   self.cancel = function () {
      sctnrev.loadFields();
      $state.go('^');
   };
});