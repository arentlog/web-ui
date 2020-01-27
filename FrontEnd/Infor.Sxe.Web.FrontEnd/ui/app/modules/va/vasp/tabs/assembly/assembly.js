
app.controller('VaspAssemblyCtrl', function ($scope, $state, $stateParams, DataService, $translate, MessageService) {
   var self = this;
   var base = $scope.base;
   self.assemblySegments = {};
   self.isAssemblyTabEnabled = false;

   self.loadAssemblyInfo = function () {
      var retrieveCriteria = {
         vaprod: base.selectedVasp.shipprod,
         vawhse: base.selectedVasp.whse,
         vaverno: base.selectedVasp.verno
      };
      DataService.post('api/va/asvasetup/vaspassemblyretrieve', { data: retrieveCriteria, busy: true }, function (asmblData) {
         if (asmblData) {
            self.assemblySegments = asmblData;
         }

         var params = { prod: self.assemblySegments.shipprod };

         DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.isAssemblyTabEnabled = (data.vaassemblyty.toUpperCase() === 'C') ? true : false;
               if (SecurityService.getSubSecurityLevel('vasp', 'Assembly') < 3) {
                  self.isAssemblyTabEnabled = false;
               }
            }
         });

      });
   };

   self.sizeChanged = function (iSegno) {

      // Get the segment number the user updated so that the data on the Custom tab can be updated as well
      base.currentSegment = iSegno;
      base.changeSegmentCustom();
   };

   self.typeChanged = function (iSegno) {

      // Get the segment number the user updated so that the data on the Custom tab can be updated as well
      base.currentSegment = iSegno;
      base.changeSegmentCustom();
   };

   self.submit = function () {
      if (self.assemblySegments.lengthseg) {
         DataService.post('api/va/asvasetup/vaspassemblyupdate', { data: self.assemblySegments, busy: true }, function () { });
      }
      else {
         MessageService.alertOk('global.warning', 'warning.length.segment.is.zero');
      }
   };

   self.isAssemblySectionEnable = function () {
      return self.isAssemblyTabEnabled;
   };

   self.validate = function (segmentInfo) {
      if (!self.assemblySegments.lengthseg) {
         MessageService.alertOk('global.warning', 'warning.length.segment.is.zero');
      }

      // Run the update logic to apply any changes made to the segment before the validation screen is displayed
      DataService.post('api/va/asvasetup/vaspassemblyupdate', { data: self.assemblySegments, busy: true }, function () {

         $state.go('vasp.detail.assembly-validate', {
            title: $translate.instant('va.assembly.segment.validation') + ' - ' +
                   $translate.instant('global.segment') + ' ' + segmentInfo,
            segment: self.assemblySegments,
            segno: parseInt(segmentInfo, 10)
         });

      });

   };

   self.rule = function (segmentInfo) {
      if (!self.assemblySegments.lengthseg) {
         MessageService.alertOk('global.warning', 'warning.length.segment.is.zero');
      }
      $state.go('vasp.detail.assembly-rule', {
         title: $translate.instant('va.assembly.segment.rules') + ' - ' +
                $translate.instant('global.segment') + ' ' + segmentInfo,
         segment: self.assemblySegments,
         segno: parseInt(segmentInfo, 10)
      });
   };

   self.loadAssemblyInfo();

});

app.controller('VaspAssemblyValidateCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   base.currentSegment = $stateParams.segno;
   base.changeSegmentCustom();

   self.title = $stateParams.title;
   self.segno = $stateParams.segno;
   self.segment = $stateParams.segment;
   self.asmblValidate = {};

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.retrieveValidateInfo = function () {
      var validateCriteria = {
         vaprod: self.segment.shipprod,
         vawhse: self.segment.whse,
         vaverno: self.segment.verno,
         segment: self.segno
      };
      DataService.post('api/va/asvasetup/vaspassemblyvalretrieve', { data: validateCriteria, busy: true }, function (data) {
         if (data) {
            self.asmblValidate = data;
         }
      }, function () {
         $state.go('vasp.detail', { header: base.selectedVasp });
      });
   };

   self.update = function () {
      DataService.post('api/va/asvasetup/vaspassemblyvalupdate', { data: self.asmblValidate, busy: true }, function () {
         $state.go('vasp.detail', { header: base.selectedVasp });
      });
   };

   self.retrieveValidateInfo();
});

app.controller('VaspAssemblyRuleCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.areFieldsEditable = false;
   base.currentSegment = $stateParams.segno;
   base.changeSegmentCustom();

   self.title = $stateParams.title;
   self.segno = $stateParams.segno;
   self.segment = $stateParams.segment;

   self.vaspsasr = {};

   self.retrieveRuleInfo = function () {
      var params = {};

      DataService.get('api/va/asvasetup/vaspassemblyruleretrieve?vaprod=' + self.asmblRule.shipprod +
                                                               '&vawhse=' + self.asmblRule.whse +
                                                               '&vaverno=' + self.asmblRule.verno +
                                                               '&segment=' + self.asmblRule.segment +
                                                               '&sequence=' + self.asmblRule.sequence, { busy: true }, function (asmblData) {
                                                                  if (asmblData) {

                                                                     // If data can be found for the rule sequence entered, display the data and allow the user to modifiy the data
                                                                     self.areFieldsEditable = true;
                                                                     self.asmblRule = asmblData;

                                                                     if (self.asmblRule.verno) {
                                                                        params = {
                                                                           shipprod: self.asmblRule.shipprod,
                                                                           whse: self.asmblRule.whse,
                                                                           verno: self.asmblRule.verno,
                                                                           segment: self.asmblRule.segment,
                                                                           sequence: self.asmblRule.sequence
                                                                        };

                                                                        DataService.get('api/va/vaspsasrv/getbypk', { params: params, busy: true }, function (data) {
                                                                           if (data) {
                                                                              self.vaspsasr = data;
                                                                           }
                                                                        });
                                                                     } else {
                                                                        params = {
                                                                           shipprod: self.asmblRule.shipprod,
                                                                           whse: self.asmblRule.whse,
                                                                           segment: self.asmblRule.segment,
                                                                           sequence: self.asmblRule.sequence
                                                                        };

                                                                        DataService.get('api/va/vaspsasr/getbypk', { params: params, busy: true }, function (data) {
                                                                           if (data) {
                                                                              self.vaspsasr = data;
                                                                           }
                                                                        });
                                                                     }

                                                                  } else {

                                                                     // If no rule exists for the sequence entered, allow the user to enter data for the rule
                                                                     self.areFieldsEditable = true;
                                                                     self.initCriteria();
                                                                  }
                                                               });
   };

   self.cancel = function () {
      $state.go('vasp.detail', { header: base.selectedVasp });
   };

   self.update = function () {
      if (self.asmblRule) {
         DataService.post('api/va/asvasetup/vaspassemblyruleupdate', { data: self.asmblRule, busy: true }, function () {
            $state.go('vasp.detail', { header: base.selectedVasp });
         });
      }
      else {
         self.cancel();
      }
   };

   self.onRuleSeqChanged = function () {
      if (self.asmblRule.sequence) {
         self.retrieveRuleInfo();
      }
   };

   self.onRuleUnionChanged = function () {
      self.asmblRule.ruleunion2 = self.asmblRule.ruleunion1;
      self.asmblRule.ruleunion3 = self.asmblRule.ruleunion1;
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var vaspAsmblRuleDelete = {
            seqno: self.asmblRule.sequence,
            rowidVaspsasr: self.asmblRule.rowid
         };

         DataService.post('api/va/asvasetup/vaspassemblyruledelete', { data: vaspAsmblRuleDelete, busy: true }, function () {
            self.areFieldsEditable = false;
            self.initCriteria();
         });
      });
   };

   self.isDeleteEnabled = function () {
      if (self.areFieldsEditable) {
         return (self.asmblRule.newrulefl) ? false : true;
      }
      else {
         return false;
      }
   };

   self.initCriteria = function () {
      self.asmblRule = {
         shipprod: self.segment.shipprod,
         whse: self.segment.whse,
         segment: self.segno,
         verno: self.segment.verno,
         sequence: 0,
         rule1: '',
         rule2: '',
         rule3: '',
         rule4: '',
         ruleequality1: '',
         ruleequality2: '',
         ruleequality3: '',
         ruleequality4: '',
         ruleerrormsg: '',
         rulesegment1: 0,
         rulesegment2: 0,
         rulesegment3: 0,
         rulesegment4: 0,
         ruleunion1: true,
         ruleunion2: true,
         ruleunion3: true,
         ruleunion4: true,
         rulevaliddata: '',
         newrulefl: true
      };
   };

   self.initCriteria();

});