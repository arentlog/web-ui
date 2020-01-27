'use strict';

app.controller('OeetAdvancedLineEntryAssemblyCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => aleA
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.icspRecord = $stateParams.icspRecord;

   self.assemblyInfo = {};
   self.assemblyConfig = {};
   self.nonStockCollection = [];
   self.isAssemblyInfoComplete = false;
   self.isSegmentConfigComplete = false;
   self.isNonStocksRequired = false;

   //nonStockGrid

   var vaWhse = ale.oeline.vawhse ? ale.oeline.vawhse : base.oehdr.whse;
   self.assemblyInfoCriteria = {
      vawhse: vaWhse,
      qtyord: ale.oeline.qtyord,
      prod: ale.oeline.prod
   };
   DataService.post('api/oe/asoeline/oeetassemblyinfoinit', { data: self.assemblyInfoCriteria, busy: true }, function (data) {
      if (data) {
         self.assemblyInfo = data;
      }
   });

   self.validateAssemblyInfo = function () {
      var assemblyInfoValidateRequest = {
         oeetassemblyinfocriteria: self.assemblyInfoCriteria,
         oeetassemblyinfosingle: self.assemblyInfo
      };
      DataService.post('api/oe/asoeline/oeetassemblyinfovalidate', { data: assemblyInfoValidateRequest, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            if (self.assemblyInfo.assemblytype.toLowerCase() === 'c') {
               self.isAssemblyInfoComplete = true;
            }

            self.assemblyInfo = data.oeetassemblyinfosingle;

            if (self.icspRecord.vaassemblyty.toLowerCase() === 'c') {
               var assemblyConfigCriteria = {
                  vawhse: self.assemblyInfo.displaywhse,
                  assemblytype: self.icspRecord.vaassemblyty,
                  verno: self.assemblyInfo.verno,
                  prod: ale.oeline.prod
               };
               DataService.post('api/oe/asoeline/oeetassemblyconfiginit', { data: assemblyConfigCriteria, busy: true }, function (data) {
                  if (data) {
                     self.assemblyConfig = data.oeetassemblyconfigsingle;
                     self.segmentInfo = data.oeetassemblysegmentinfo;
                     self.setSegmentInfo(true);
                     self.segmentDelims = data.oeetassemblysegmentdelim;
                     for (var i = 0; i < self.assemblyConfig.numsegments; i++) {
                        var currentDelim = self.segmentDelims[i];
                        if (currentDelim && !currentDelim.ishidden && currentDelim.delimvalue) {
                           switch (i) {
                              case 0:
                                 self.delimiter1 = currentDelim.delimvalue;
                                 break;
                              case 1:
                                 self.delimiter2 = currentDelim.delimvalue;
                                 break;
                              case 2:
                                 self.delimiter3 = currentDelim.delimvalue;
                                 break;
                              case 3:
                                 self.delimiter4 = currentDelim.delimvalue;
                                 break;
                              case 4:
                                 self.delimiter5 = currentDelim.delimvalue;
                                 break;
                              case 5:
                                 self.delimiter6 = currentDelim.delimvalue;
                                 break;
                              case 6:
                                 self.delimiter7 = currentDelim.delimvalue;
                                 break;
                              case 7:
                                 self.delimiter8 = currentDelim.delimvalue;
                                 break;
                              case 8:
                                 self.delimiter9 = currentDelim.delimvalue;
                                 break;
                              case 9:
                                 self.delimiter10 = currentDelim.delimvalue;
                                 break;
                              case 10:
                                 self.delimiter11 = currentDelim.delimvalue;
                                 break;
                              case 11:
                                 self.delimiter12 = currentDelim.delimvalue;
                                 break;
                              case 12:
                                 self.delimiter13 = currentDelim.delimvalue;
                                 break;
                              case 13:
                                 self.delimiter14 = currentDelim.delimvalue;
                                 break;
                              case 14:
                                 self.delimiter15 = currentDelim.delimvalue;
                                 break;
                              case 15:
                                 self.delimiter16 = currentDelim.delimvalue;
                                 break;
                              case 16:
                                 self.delimiter17 = currentDelim.delimvalue;
                                 break;
                              case 17:
                                 self.delimiter18 = currentDelim.delimvalue;
                                 break;
                              case 18:
                                 self.delimiter19 = currentDelim.delimvalue;
                                 break;
                              case 19:
                                 self.delimiter20 = currentDelim.delimvalue;
                                 break;
                              case 20:
                                 self.delimiter21 = currentDelim.delimvalue;
                                 break;
                              case 21:
                                 self.delimiter22 = currentDelim.delimvalue;
                                 break;
                              case 22:
                                 self.delimiter23 = currentDelim.delimvalue;
                                 break;
                              case 23:
                                 self.delimiter24 = currentDelim.delimvalue;
                                 break;
                           }
                        }
                     }
                  }
               });
            } else {
               self.assemblyBuild();
            }
         }
      });
   };

   self.setSegmentInfo = function (fromBackend) {
      for (var i = 0; i < self.assemblyConfig.numsegments; i++) {
         var currentSegment = self.segmentInfo[i];
         if (currentSegment) {
            if (fromBackend) {
               switch (i) {
                  case 0:
                     self.segment1Visible = !currentSegment.ishidden;
                     self.segment1Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment1Value = currentSegment.segmentvalue;
                     break;
                  case 1:
                     self.segment2Visible = !currentSegment.ishidden;
                     self.segment2Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment2Value = currentSegment.segmentvalue;
                     break;
                  case 2:
                     self.segment3Visible = !currentSegment.ishidden;
                     self.segment3Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment3Value = currentSegment.segmentvalue;
                     break;
                  case 3:
                     self.segment4Visible = !currentSegment.ishidden;
                     self.segment4Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment4Value = currentSegment.segmentvalue;
                     break;
                  case 4:
                     self.segment5Visible = !currentSegment.ishidden;
                     self.segment5Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment5Value = currentSegment.segmentvalue;
                     break;
                  case 5:
                     self.segment6Visible = !currentSegment.ishidden;
                     self.segment6Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment6Value = currentSegment.segmentvalue;
                     break;
                  case 6:
                     self.segment7Visible = !currentSegment.ishidden;
                     self.segment7Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment7Value = currentSegment.segmentvalue;
                     break;
                  case 7:
                     self.segment8Visible = !currentSegment.ishidden;
                     self.segment8Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment8Value = currentSegment.segmentvalue;
                     break;
                  case 8:
                     self.segment9Visible = !currentSegment.ishidden;
                     self.segment9Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment9Value = currentSegment.segmentvalue;
                     break;
                  case 9:
                     self.segment10Visible = !currentSegment.ishidden;
                     self.segment10Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment10Value = currentSegment.segmentvalue;
                     break;
                  case 10:
                     self.segment11Visible = !currentSegment.ishidden;
                     self.segment11Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment11Value = currentSegment.segmentvalue;
                     break;
                  case 11:
                     self.segment12Visible = !currentSegment.ishidden;
                     self.segment12Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment12Value = currentSegment.segmentvalue;
                     break;
                  case 12:
                     self.segment13Visible = !currentSegment.ishidden;
                     self.segment13Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment13Value = currentSegment.segmentvalue;
                     break;
                  case 13:
                     self.segment14Visible = !currentSegment.ishidden;
                     self.segment14Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment14Value = currentSegment.segmentvalue;
                     break;
                  case 14:
                     self.segment15Visible = !currentSegment.ishidden;
                     self.segment15Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment15Value = currentSegment.segmentvalue;
                     break;
                  case 15:
                     self.segment16Visible = !currentSegment.ishidden;
                     self.segment16Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment16Value = currentSegment.segmentvalue;
                     break;
                  case 16:
                     self.segment17Visible = !currentSegment.ishidden;
                     self.segment17Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment17Value = currentSegment.segmentvalue;
                     break;
                  case 17:
                     self.segment18Visible = !currentSegment.ishidden;
                     self.segment18Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment18Value = currentSegment.segmentvalue;
                     break;
                  case 18:
                     self.segment19Visible = !currentSegment.ishidden;
                     self.segment19Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment19Value = currentSegment.segmentvalue;
                     break;
                  case 19:
                     self.segment20Visible = !currentSegment.ishidden;
                     self.segment20Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment20Value = currentSegment.segmentvalue;
                     break;
                  case 20:
                     self.segment21Visible = !currentSegment.ishidden;
                     self.segment21Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment21Value = currentSegment.segmentvalue;
                     break;
                  case 21:
                     self.segment22Visible = !currentSegment.ishidden;
                     self.segment22Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment22Value = currentSegment.segmentvalue;
                     break;
                  case 22:
                     self.segment23Visible = !currentSegment.ishidden;
                     self.segment23Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment23Value = currentSegment.segmentvalue;
                     break;
                  case 23:
                     self.segment24Visible = !currentSegment.ishidden;
                     self.segment24Mask = self.getSegmentMask(currentSegment.datatype, currentSegment.segmentformat);
                     self.segment24Value = currentSegment.segmentvalue;
                     break;
               }
            } else {
               switch (i) {
                  case 0:
                     currentSegment.segmentvalue = self.segment1Value;
                     break;
                  case 1:
                     currentSegment.segmentvalue = self.segment2Value;
                     break;
                  case 2:
                     currentSegment.segmentvalue = self.segment3Value;
                     break;
                  case 3:
                     currentSegment.segmentvalue = self.segment4Value;
                     break;
                  case 4:
                     currentSegment.segmentvalue = self.segment5Value;
                     break;
                  case 5:
                     currentSegment.segmentvalue = self.segment6Value;
                     break;
                  case 6:
                     currentSegment.segmentvalue = self.segment7Value;
                     break;
                  case 7:
                     currentSegment.segmentvalue = self.segment8Value;
                     break;
                  case 8:
                     currentSegment.segmentvalue = self.segment9Value;
                     break;
                  case 9:
                     currentSegment.segmentvalue = self.segment10Value;
                     break;
                  case 10:
                     currentSegment.segmentvalue = self.segment11Value;
                     break;
                  case 11:
                     currentSegment.segmentvalue = self.segment12Value;
                     break;
                  case 12:
                     currentSegment.segmentvalue = self.segment13Value;
                     break;
                  case 13:
                     currentSegment.segmentvalue = self.segment14Value;
                     break;
                  case 14:
                     currentSegment.segmentvalue = self.segment15Value;
                     break;
                  case 15:
                     currentSegment.segmentvalue = self.segment16Value;
                     break;
                  case 16:
                     currentSegment.segmentvalue = self.segment17Value;
                     break;
                  case 17:
                     currentSegment.segmentvalue = self.segment18Value;
                     break;
                  case 18:
                     currentSegment.segmentvalue = self.segment19Value;
                     break;
                  case 19:
                     currentSegment.segmentvalue = self.segment20Value;
                     break;
                  case 20:
                     currentSegment.segmentvalue = self.segment21Value;
                     break;
                  case 21:
                     currentSegment.segmentvalue = self.segment22Value;
                     break;
                  case 22:
                     currentSegment.segmentvalue = self.segment23Value;
                     break;
                  case 23:
                     currentSegment.segmentvalue = self.segment24Value;
                     break;
               }
            }
         }
      }
   };

   self.getSegmentMask = function (dataType, segmentFormat) {
      switch (dataType.toLowerCase()) {
         case 'character':
            if (segmentFormat.includes('(') || segmentFormat.includes(')')) {
               var splitSegment = segmentFormat.split('(').split(')');
               if (splitSegment.length !== 3) {
                  return '';
               } else {
                 return splitSegment[1];
               }
            } else {
               return segmentFormat.replace(new RegExp('x', 'g'), '?');
            }
         case 'integer':
            return segmentFormat.replace(new RegExp('z', 'g'), '#').replace(new RegExp('9', 'g'), '#');
         case 'decimal':
            var formatSplit = segmentFormat.trim().split('.');
            if (formatSplit.length !== 2) {
               return '';
            } else {
               var preLength = formatSplit[0].length;
               var postLength = formatSplit[1].length;
               var segmentMask = '';

               for (var i = 0; i < preLength; i++) {
                  segmentMask += '#';
               }
               segmentMask += '.';
               for (var j = 0; j < postLength; j++) {
                  segmentMask += '0';
               }

               return segmentMask;
            }
         default:
            return '';
      }
   };

   self.validateSegmentConfig = function () {
      var assemblyConfigValidateRequest = {
         oeetassemblysegmentdelim: self.segmentDelims,
         oeetassemblysegmentinfo: self.segmentInfo,
         oeetassemblyconfigcriteria: {
            assemblytype: self.assemblyInfo.assemblytype,
            prod: self.assemblyInfo.prod,
            userfield: self.assemblyInfo.userfield,
            verno: self.assemblyInfo.verno,
            vawhse: self.assemblyInfo.displaywhse
         },
         oeetassemblyconfigsingle: self.assemblyConfig
      };
      DataService.post('api/oe/asoeline/oeetassemblyconfigvalidate', { data: assemblyConfigValidateRequest, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            self.assemblyConfig = data.oeetassemblyconfigsingle;
            self.isSegmentConfigComplete = true;

            if (self.icspRecord.vaassemblyty.toLowerCase() === 'c') {
               self.assemblyNonStock();
            } else {
               self.assemblyBuild();
            }
         }
      });
   };

   self.assemblyNonStock = function () {
      var assemblyNonStockRequest = {
         oeetassemblynonstockcriteria: {
            assemblytype: self.assemblyInfo.assemblytype,
            numsegments: self.assemblyConfig.numsegments,
            prod: self.assemblyConfig.prod,
            vawhse: self.assemblyConfig.vawhse,
            userfield: self.assemblyConfig.userfield,
            verno: self.assemblyConfig.verno
         },
         oeetassemblysegmentdelim: self.segmentDelims,
         oeetassemblysegmentinfo: self.segmentInfo
      };
      DataService.post('api/oe/asoeline/oeetassemblynonstock', { data: assemblyNonStockRequest, busy: true }, function (data) {
         if (data) {
            self.nonStockCollection = data;
            if (self.nonStockCollection.length > 0) {
               self.isNonStocksRequired = true;
            } else {
               self.assemblyBuild();
            }
         }
      });
   };

   self.assemblyBuild = function () {
      var assemblyBuildRequest = {};
      if (self.assemblyInfo.assemblytype.toLowerCase() === 'p') {
         //pre-assembled products
         assemblyBuildRequest.oeetassemblybuildcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            numsegments: 0,
            prod: self.assemblyInfo.prod,
            userfield: self.assemblyInfo.userfield,
            vawhse: self.assemblyInfo.whse,
            verno: self.assemblyInfo.verno
         };

         assemblyBuildRequest.oeetassemblynonstockcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            numsegments: 0,
            prod: self.assemblyInfo.prod,
            vawhse: self.assemblyInfo.whse,
            userfield: self.assemblyInfo.userfield,
            verno: self.assemblyInfo.verno
         };

         assemblyBuildRequest.oeetassemblynonstockresults = {};
         assemblyBuildRequest.oeetassemblysegmentdelim = {};
         assemblyBuildRequest.oeetassemblysegmentinfo = {};
      } else {
         //configurable assembly products (assemblytype = 'p')
         assemblyBuildRequest.oeetassemblybuildcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            numsegments: self.assemblyConfig.numsegments,
            prod: self.assemblyConfig.prod,
            userfield: self.assemblyConfig.userfield,
            vawhse: self.assemblyConfig.vawhse,
            verno: self.assemblyConfig.verno
         };

         assemblyBuildRequest.oeetassemblynonstockcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            numsegments: self.assemblyConfig.numsegments,
            prod: self.assemblyConfig.prod,
            vawhse: self.assemblyConfig.vawhse,
            userfield: self.assemblyConfig.userfield,
            verno: self.assemblyConfig.verno
         };

         assemblyBuildRequest.oeetassemblynonstockresults = self.nonStockCollection;
         assemblyBuildRequest.oeetassemblysegmentdelim = self.segmentDelims;
         assemblyBuildRequest.oeetassemblysegmentinfo = self.segmentInfo;
      }
      DataService.post('api/oe/asoeline/oeetassemblybuild', { data: assemblyBuildRequest, busy: true }, function (data) {
         if (data) {
            self.assemblyCollection = data;
            self.assemblyFinal(false);
         }
      });
   };

   self.assemblyFinal = function (isNonStockAsked) {
      var assemblyFinalRequest = {};
      if (self.assemblyInfo.assemblytype.toLowerCase() === 'p') {
         //pre-assembled products
         assemblyFinalRequest.oeetassemblyfinalcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            bofl: base.oehdr.bofl,
            lineno: ale.oeline.lineno,
            maintmode: ale.oeline.maintL,
            nonstockanswer: isNonStockAsked,
            nonstockasked: isNonStockAsked,
            nonstockdisplay: isNonStockAsked,
            numsegments: 0,
            orderno: ale.oeline.orderno,
            ordersuf: ale.oeline.ordersuf,
            orderwhse: base.oehdr.whse,
            preassemblylength: self.assemblyInfo.preassemblylength,
            prod: self.assemblyInfo.prod,
            qtytobuild: self.assemblyInfo.qtytobuild,
            taxablefl: ale.oeline.taxablefl,
            userfield: self.assemblyInfo.userfield,
            vawhse: self.assemblyInfo.whse,
            verno: self.assemblyInfo.verno
         };

         assemblyFinalRequest.oeetassemblynonstockcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            numsegments: 0,
            prod: self.assemblyInfo.prod,
            vawhse: self.assemblyInfo.whse,
            userfield: self.assemblyInfo.userfield,
            verno: self.assemblyInfo.verno
         };

         assemblyFinalRequest.oeetassemblysegmentdelim = {};
         assemblyFinalRequest.oeetassemblysegmentinfo = {};
      } else {
         //configurable assembly products (assemblytype = 'p')
         assemblyFinalRequest.oeetassemblyfinalcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            bofl: base.oehdr.bofl,
            lineno: ale.oeline.lineno,
            maintmode: ale.oeline.maintL,
            nonstockanswer: isNonStockAsked,
            nonstockasked: isNonStockAsked,
            nonstockdisplay: isNonStockAsked,
            numsegments: self.assemblyConfig.numsegments,
            orderno: ale.oeline.orderno,
            ordersuf: ale.oeline.ordersuf,
            orderwhse: base.oehdr.whse,
            prod: self.assemblyConfig.prod,
            qtytobuild: self.assemblyInfo.qtytobuild,
            taxablefl: ale.oeline.taxablefl,
            userfield: self.assemblyConfig.userfield,
            vawhse: self.assemblyConfig.vawhse,
            verno: self.assemblyConfig.verno
         };

         assemblyFinalRequest.oeetassemblynonstockcriteria = {
            assemblytype: self.assemblyInfo.assemblytype,
            numsegments: self.assemblyConfig.numsegments,
            prod: self.assemblyConfig.prod,
            vawhse: self.assemblyConfig.vawhse,
            userfield: self.assemblyConfig.userfield,
            verno: self.assemblyConfig.verno
         };

         assemblyFinalRequest.oeetassemblysegmentdelim = self.segmentDelims;
         assemblyFinalRequest.oeetassemblysegmentinfo = self.segmentInfo;
      }

      if (self.nonStockCollection && self.nonStockCollection.length > 0) {
         assemblyFinalRequest.oeetassemblynonstockresults = self.nonStockCollection;
      } else {
         assemblyFinalRequest.oeetassemblynonstockresults = {};
      }

      assemblyFinalRequest.oeline = ale.oeline;

      DataService.post('api/oe/asoeline/oeetassemblyfinal', { data: assemblyFinalRequest, busy: true }, function (data) {
         if (data) {
            if (data.oeetassemblyfinalcriteria.nonstockdisplay) {
               MessageService.yesNo('global.message', data.oeetassemblyfinalcriteria.nonstockmessage, function () {
                  //yes callback
                  self.assemblyFinal(true);
               }, function () {
                  //no callback
                  self.cancel();
               });
            } else {
               //IsAssemblyInfoCompleted = true;
               ale.oeline = data.oeline;

               self.submit();
            }
         }
      });
   };

   self.continue = function () {
      if (!self.isAssemblyInfoComplete) {
         self.validateAssemblyInfo();
      } else {
         self.setSegmentInfo(false);
         self.validateSegmentConfig();
      }
   };

   self.back = function () {
      if (self.isSegmentConfigComplete) {
         self.isSegmentConfigComplete = false;
         self.isNonStocksRequired = false;
      } else if (self.isAssemblyInfoComplete) {
         self.isAssemblyInfoComplete = false;
      }
   };

   self.submit = function () {
      ale.assemblyCollection = self.assemblyCollection;
      ale.validateLine();
      $state.go('^');
   };

   self.cancel = function () {
      ale.clearLineAndReset();
      $state.go('^');
   };
});