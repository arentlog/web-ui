'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'gl',
      menuFn: 'glsa',
      dataPath: 'api/gl/glsa',
      searchMethod: 'POST',
      searchPath: 'api/gl/glsa/lookup',
      searchResultsField: 'glaccountlookupresults',
      searchRecordLimitField: 'recordcountlimit',
      resultsRowIdField: 'rowidGlsa',
      createStateView: 'gl/glsa/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'gl/glsa/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/gl/asglsetup/glaccountcopy',
      primaryKeyParams: ['yr', 'gldivno', 'gldeptno', 'glacctno', 'glsubno'],
      recentlyVisited: {
         title: { label: 'global.year', value: 'yr' },
         description: [
            { label: 'global.division', value: 'gldivno' },
            { label: 'global.department', value: 'gldeptno' },
            { label: 'global.account.number', value: 'glacctno' },
            { label: 'global.sub.account.number', value: 'glsubno' },
            { label: 'global.title', value: 'gltitle' }
         ]
      }
   });
});

app.service('GlsaService', function (MessageService, Utils, DataService, ConfigService, GridService, Sasc, SecurityService) {

   this.extendMasterController = function (self, base) {
      base.assignLookupName = false;
      // Advanced search criteria object with initial values
      base.criteria.yr = Sasc.glcurfisc;
      self.advCriteria = {
         yr: Sasc.glcurfisc,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'lookupnm', label: MessageService.get('global.lookup.name') },
         { value: 'yr', label: MessageService.get('global.year') },
         { value: 'gltitle', label: MessageService.get('global.title') },
         { value: 'gldivno', label: MessageService.get('global.division') },
         { value: 'glacctno', label: MessageService.get('global.account') },
         { value: 'gldeptno', label: MessageService.get('global.department') },
         { value: 'glsubno', label: MessageService.get('global.sub.account.number') },
         { value: 'accttype', label: MessageService.get('global.account.type') },
         { value: 'keywords', label: MessageService.get('global.keyword') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['yr'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/gl/glsa/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.glaccountlookupresults;
            }
         });
      };
   };

   this.extendCreateController = function (self, base, glsa) {
      self.getSubTitle = function () {
         return MessageService.get('global.year') + ': ' + glsa.yr + ' | ' +
            MessageService.get('global.account') + ': ' + base.glno;
      };

      self.glsa.printtype = true;
      base.glno = '';
      self.glsa.yr = base.criteria.yr;

   };

   this.createRecord = function (self, base, glsa, scope, callback) {
      var glsavecriteria = {
         yr: glsa.yr,
         glno: base.glno,
         gltitle: glsa.gltitle,
         accttype: glsa.accttype
      };

      DataService.post('api/gl/asglsetup/glaccountcreate', { data: glsavecriteria, busy: true }, function (data) {
         if (data) {
            base.assignLookupName = true;
            var dummyglsa = {
               rowID: data.glsaRowid
            };
            callback(dummyglsa);
         }
      });
   };

   this.extendDetailController = function (self, base, glsa) {

      var FUNCTION_NAME = 'glsa';
      self.secure = SecurityService.getSecurityLevel(FUNCTION_NAME);

      self.MESSAGE_MESSAGETYPE_ERROR = 'e';
      self.MESSAGE_MESSAGETYPE_WARNING = 'w';
      self.MESSAGE_MESSAGETYPE_QUESTION_OK_CANCEL = 'qoc';
      self.MESSAGE_MESSAGETYPE_QUESTION_YES_NO = 'qyn';

      var months = [MessageService.get('global.january'), MessageService.get('global.february'), MessageService.get('global.march'),
      MessageService.get('global.april'), MessageService.get('global.may'), MessageService.get('global.june'), MessageService.get('global.july'),
      MessageService.get('global.august'), MessageService.get('global.september'), MessageService.get('global.october'), MessageService.get('global.november'), MessageService.get('global.december')];
      var periods = [MessageService.get('global.period.1'), MessageService.get('global.period.2'), MessageService.get('global.period.3'), MessageService.get('global.period.4'),
      MessageService.get('global.period.5'), MessageService.get('global.period.6'), MessageService.get('global.period.7'), MessageService.get('global.period.8'),
      MessageService.get('global.period.9'), MessageService.get('global.period.10'), MessageService.get('global.period.11'), MessageService.get('global.period.12'),
      MessageService.get('global.period.13')];

      self.sasc = Sasc;

      self.getSubTitle = function () {
         var completeYear = '';
         if (glsa.yr === 0) {
            completeYear = glsa.yr;
         } else if (glsa.yr < 50) {
            completeYear = glsa.yr + 2000;
         } else if (glsa.yr <= 99) {
            completeYear = glsa.yr + 1900;
         }

         return MessageService.get('global.year') + ': ' + completeYear + ' | ' +
            MessageService.get('global.account') + ': ' + base.glno + ' | ' + glsa.gltitle;

      };

      self.isCellVisible = function (row) {
         if (row === 12 && !self.sasc.gl13perfl) {
            return false;
         } else {
            return true;
         }
      };

      function findLabel(period) {
         if (self.sasc.gl13perfl) {
            return periods[period - 1];
         } else {
            var holdPeriod = self.sasc.glbegfisc + period > 12 ? self.sasc.glbegfisc + period - 12 : self.sasc.glbegfisc + period;
            holdPeriod = holdPeriod === 1 ? 13 : holdPeriod;
            if (period === 13) {
               return '';
            } else {
               return months[holdPeriod - 2];
            }
         }
      }

      self.createDivisions = function () {
         if (base.isEdit()) {

            var params = {
               gltitle: glsa.gltitle,
               lookupnm: glsa.lookupnm,
               accttype: glsa.accttype,
               baltype: glsa.baltype,
               glrptgroup: glsa.glrptgroup,
               printtype: glsa.printtype,
               manpostfl: glsa.manpostfl,
               glsaRowid: self.glsa.glsaRowid
            };

            DataService.post('api/gl/asglsetup/gldivisioncreate', { data: params, busy: true }, function (data) {
               if (data) {
                  var cancelMessage = '';
                  var isWarning = false;
                  var isError = false;
                  self.messages = data;
                  self.messages.forEach(function (message) {
                     if (self.messages.messagetype === self.MESSAGE_MESSAGETYPE_ERROR) {
                        isError = true;
                     } else if (self.messages.messagetype === self.MESSAGE_MESSAGETYPE_QUESTION_YES_NO) {
                        isWarning = true;
                        cancelMessage = message.messagetxt;
                     }
                  });

                  if (isError) {
                     MessageService.processMessaging(self.messages);
                     return;
                  } else if (!isWarning) {
                     MessageService.processMessaging(self.messages);
                  }
               }
            });

         }

      };

      glsa.$promise.then(function () {

         if (base.assignLookupName && glsa.gltitle) {
            glsa.lookupnm = glsa.gltitle.substring(0, 15);
            base.assignLookupName = false;
         }

         self.periodBalances = [
            { month: findLabel(1), amtposted: glsa.peramt1 },
            { month: findLabel(2), amtposted: glsa.peramt2 },
            { month: findLabel(3), amtposted: glsa.peramt3 },
            { month: findLabel(4), amtposted: glsa.peramt4 },
            { month: findLabel(5), amtposted: glsa.peramt5 },
            { month: findLabel(6), amtposted: glsa.peramt6 },
            { month: findLabel(7), amtposted: glsa.peramt7 },
            { month: findLabel(8), amtposted: glsa.peramt8 },
            { month: findLabel(9), amtposted: glsa.peramt9 },
            { month: findLabel(10), amtposted: glsa.peramt10 },
            { month: findLabel(11), amtposted: glsa.peramt11 },
            { month: findLabel(12), amtposted: glsa.peramt12 },
            { month: findLabel(13), amtposted: glsa.peramt13 }

         ];

         var glfetchcriteria = [];
         self.glsa.glsaRowid = glsa.rowID;
         glfetchcriteria.push(glsa);

         DataService.post('api/gl/asglsetup/glbuildacctno', { data: glfetchcriteria, busy: true }, function (data) {
            if (data) {
               base.glno = data[0].glno;
               var criteria = { glsarowid: data[0].glsaRowid };
               DataService.post('api/gl/asglinquiry/glsacheckfornull', { data: criteria, busy: true }, function (dataSecond) {
                  if (dataSecond) {
                     if (dataSecond.warningmess) {
                        MessageService.info('global.warning', dataSecond.warningmess);
                     }
                  }
               });
            }
         });

      });

      self.customSubmitContinue = function () {
         self.submit();
      };

      self.customSubmit = function () {
         //Get a current copy of the GLSA so we deal with a possible concurrency issue with
         //Notes.  If we are in the process of creating (or updating) an account and they use
         //The WebPart to create/delete the Notes, that process will set the glsa.notesfl
         //field for us.  The current one in memory is possibly stale data.  This will get us
         //latest data so we doin't stomp on good data.
         DataService.get('api/gl/glsa/getbyrowid/' + glsa.rowID, function (data) {
            if (data) {
               glsa.notesfl = data.notesfl;
            }

            self.customSubmitContinue();
         });
      };

      self.gltitleChange = function () {
         if (glsa.gltitle && !glsa.lookupnm) {
            glsa.lookupnm = glsa.gltitle.substring(0, 15);
         }
      };
   };

   this.extendSearchController = function (self, base, criteria) {
      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();
         base.criteria.yr = Sasc.glcurfisc;
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      self.getSubTitle = function () {
         var completeYear = '';
         if (stateParams.object.yr === 0) {
            completeYear = stateParams.object.yr;
         } else if (stateParams.object.yr < 50) {
            completeYear = stateParams.object.yr + 2000;
         } else if (stateParams.object.yr <= 99) {
            completeYear = stateParams.object.yr + 1900;
         }
         return MessageService.get('global.year') + ': ' + completeYear + ' | ' +
            MessageService.get('global.account') + ': ' + stateParams.object.glno;
      };
      request.fromyr = stateParams.object.yr;
      request.fromglno = stateParams.object.glno;
      request.toyr = stateParams.object.yr;
      request.toglno = stateParams.object.glno;
   };
});
