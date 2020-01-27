'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlasp', {
      widgets: ['SEARCH'],
      params: {
         pk: '',
         pk2: ''
      }
   });
   StateProvider.addMasterState('twl', 'twlasp');

   $stateProvider.state('twlasp.detail', {
      url: '/detail',
      params: {
         paramTypeName: null,
         selectedRowID: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlasp/detail.json');
            },
            controller: 'TwlaspDetailCtrl as dtl'
         }
      }
   });
});

app.controller('TwlaspBaseCtrl', function ($state, ConfigService, DataService, UserService, MessageService) {
   var self = this;
   self.criteria = {};
   self.HTML_CRLF = '</br>';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.API_PARAM_DELIMITER = '/';
   self.CSV_DELIMITER = ',';
   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;

   self.criteriaUsed = {};

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') +
         self.LABEL_DELIMITER +
         (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlasp.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlasp.master');
   };

   self.isDetail = function () {
      return $state.is('twlasp.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlasp.detail');
   };

   self.initCriteria = function () {
      self.twlaspInDisplay = true;
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      if (self.hyperLinkWhNum && self.hyperLinkTypeId) {
         self.criteria.whNum = self.hyperLinkWhNum;
         self.criteria.typeId = self.hyperLinkTypeId;
         self.hyperLinkTypeId = '';
         self.hyperLinkWhNum = '';
         self.isHyperLinkSearch = true;
      }
   };

   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwladmin/getsystemparameterdefinitionlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.checkHyperlinkSearch = function () {
      if (self.isHyperLinkSearch) {
         self.isHyperLinkSearch = false;
         self.search();
      }
   };

});

app.controller('TwlaspSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('twlasp.master');
      }

      base.search();
   };

   self.initCriteria = function () {
      base.initCriteria();
   }

   self.initCriteria();  // Moving init here moves it to after the master screen loads, while running it from base runs before the master screen
   base.checkHyperlinkSearch();
});

//Alias: mst
app.controller('TwlaspMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;


   if ($stateParams.pk && $stateParams.pk2) {
      base.hyperLinkWhNum = $stateParams.pk;
      base.hyperLinkTypeId = $stateParams.pk2;
      // perform the search if the screen is already in the user's display, otherwise the search code still has to run and will do this
      if (base.twlaspInDisplay) {
         base.initCriteria();
      }
   }

   self.launchDetail = function (selectedRow) {
      $state.go('^.detail', { paramTypeName: selectedRow.paramTypeName, selectedRowID: selectedRow.rowID });
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         self.launchDetail(record);
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

//This controller is called when the user does a drilldown on a Row.  It shows the Details and allows the user
//to update the Value.  Based on changes the user makes, it will also update the main grid to reflect the changes.
//Alias: dtl
app.controller('TwlaspDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.paramTypeName = $stateParams.paramTypeName;
   self.rowID = $stateParams.selectedRowID;
   self.COLUMNWIDGET_TEXT = 'FILL-IN';
   self.COLUMNWIDGET_RADIO_SET = 'RADIO-SET';
   self.COLUMNWIDGET_CHECKBOX = 'TOGGLE-BOX';
   self.COLUMNWIDGET_MULTI_SELECT = 'SELECTION LIST';
   self.sysparDef = null;
   self.sysparValue = null;
   self.isGlobal = true;
   self.parameterValue = '';
   self.parameterValueMultiSelect = [];
   self.parameterValueLogical = false;
   self.dropdownValues = [];
   self.multiSelectAvailableValuesCSV = '';
   self.multiSelectValues = [];
   self.isTextVisible = true;
   self.isCheckboxVisible = false;
   self.isDropdownVisible = false;
   self.isDropdownForceDisable = false;
   self.isMultiSelectVisible = false;
   self.isEditMode = true;
   self.isEditLockedDown = false;

   self.getSubTitle = function () {
      if (self.sysparDef && self.sysparDef.parameterId !== 0) {
         return MessageService.get('global.warehouse') +
                  base.LABEL_DELIMITER +
                  (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) +
                  base.SUBMENU_DELIMITER +
                MessageService.get('global.parameter.id') + base.LABEL_DELIMITER + self.sysparDef.parameterId;
      } else {
         return '';
      }
   };

   self.deleteWarehouseSpecific = function () {
      if (self.sysparDef) {
         MessageService.yesNo('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete.this.warehouse.specific', function () {
            var criteria = {
               coNum: base.criteriaUsed.coNum,
               whNum: base.criteriaUsed.whNum,
               parameterId: self.sysparDef.parameterId
            };

            DataService.post('api/twl/astwladmin/deletesystemparametervalue', { data: criteria, busy: true }, function () {
               MessageService.info('global.information', 'message.operation.completed.successfully');
               //Make sure flag is updated to reflect change and we see the System Default again.
               self.initiateStep2SystemValue();
            });
         });
      }
   };

   //Depending on the type of widget, we need to pull the right data out to be sent to the backend.
   self.getValueToSave = function () {
      if (self.isTextVisible) {
         return self.parameterValue;
      } else if (self.isDropdownVisible) {
         return self.parameterValue;
      } else if (self.isMultiSelectVisible) {
         //Flatten out the array into a CSV variable
         return self.parameterValueMultiSelect.toString();
      } else if (self.isCheckboxVisible) {
         return self.parameterValueLogical ? '1' : '0';
      }
   };

   self.save = function () {
      if (self.sysparDef) {
         var criteria = {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            parameterId: self.sysparDef.parameterId,
            newValue: self.getValueToSave()
         };

         DataService.post('api/twl/astwladmin/updatesystemparametervalue', { data: criteria, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            //Make sure flag is updated to reflect change.
            self.findWarehouseOverrideValue();
         });
      }
   };

   //After we Add or Delete a Warehouse specific parameter, we want to go find that row and update.
   //(Instead of re-opening query.  Don't want the user to lose their spot.)
   self.updateMasterSystemParameterList = function () {
      base.dataset.forEach(function (originalRow) {
         if (originalRow.parameterId === self.sysparDef.parameterId) {
            originalRow.isGlobal = self.isGlobal;
            var rowIndex = base.dataset.indexOf(originalRow);
            base.grid.updateRow(rowIndex);
         }
      });
   };

   //See if we can find a Value row associated.  If found, the Value row is the 'Warehouse' specific
   //setting that overrides the 'Global' default.
   self.findWarehouseOverrideValue = function () {
      if (self.sysparDef) {
         var getbypkCriteria = {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            parameterId: self.sysparDef.parameterId
         };

         DataService.get('api/twl/sysparvalue/getbypk', { params: getbypkCriteria, busy: true }, function (data) {
            if (data) {
               self.sysparValue = data;
               self.isGlobal = false;
               if (self.sysparDef.columnWidget.trim().toUpperCase() === self.COLUMNWIDGET_CHECKBOX) {
                  self.parameterValueLogical = self.sysparValue.parameterValue.trim() === "0" ? false : true;
               } else {
                  self.parameterValue = self.sysparValue.parameterValue.trim();
               }
            } else {
               self.isGlobal = true;
            }

            self.updateMasterSystemParameterList();
         });
      }
   };

   self.setVisibility = function () {
      if (self.sysparDef && self.sysparDef.columnWidget) {
         switch (self.sysparDef.columnWidget.trim().toUpperCase()) {
            case self.COLUMNWIDGET_TEXT:                             //ignore jslint - correct indentation
               self.isTextVisible = true;                            //ignore jslint - correct indentation
               self.isCheckboxVisible = false;                       //ignore jslint - correct indentation
               self.isDropdownVisible = false;                       //ignore jslint - correct indentation
               self.isMultiSelectVisible = false;                    //ignore jslint - correct indentation
               break;                                                //ignore jslint - correct indentation
            case self.COLUMNWIDGET_RADIO_SET:                        //ignore jslint - correct indentation
               self.isTextVisible = false;                           //ignore jslint - correct indentation
               self.isCheckboxVisible = false;                       //ignore jslint - correct indentation
               self.isDropdownVisible = true;                        //ignore jslint - correct indentation
               self.isMultiSelectVisible = false;                    //ignore jslint - correct indentation
               break;                                                //ignore jslint - correct indentation
            case self.COLUMNWIDGET_CHECKBOX:                         //ignore jslint - correct indentation
               self.isTextVisible = false;                           //ignore jslint - correct indentation
               self.isCheckboxVisible = true;                        //ignore jslint - correct indentation
               self.isDropdownVisible = false;                       //ignore jslint - correct indentation
               self.isMultiSelectVisible = false;                    //ignore jslint - correct indentation
               break;                                                //ignore jslint - correct indentation
            case self.COLUMNWIDGET_MULTI_SELECT:                     //ignore jslint - correct indentation
               self.isTextVisible = false;                           //ignore jslint - correct indentation
               self.isCheckboxVisible = false;                       //ignore jslint - correct indentation
               self.isDropdownVisible = false;                       //ignore jslint - correct indentation
               self.isMultiSelectVisible = true;                     //ignore jslint - correct indentation
               break;                                                //ignore jslint - correct indentation
            default:                                                 //ignore jslint - correct indentation
               self.isTextVisible = true;                            //ignore jslint - correct indentation
               self.isCheckboxVisible = false;                       //ignore jslint - correct indentation
               self.isDropdownVisible = false;                       //ignore jslint - correct indentation
               self.isMultiSelectVisible = false;                    //ignore jslint - correct indentation
               break;                                                //ignore jslint - correct indentation
         }
      } else {
         self.isTextVisible = true;
         self.isCheckboxVisible = false;
         self.isDropdownVisible = false;
         self.isMultiSelectVisible = false;
      }
   };

   //Only one control can be visible at a time.  This builds the available options for Dropdown or
   //Multi-Select controls.
   self.buildControl = function () {
      if (self.isDropdownVisible) {
         //The 'columnText' property contains the labels and 'options' property contains the matching codes.
         if (self.sysparDef.columnText.indexOf(base.CSV_DELIMITER) >= 0) {
            var columnTextList = self.sysparDef.columnText.split(base.CSV_DELIMITER);
            var optionsList = self.sysparDef.options.split(base.CSV_DELIMITER);
            if (columnTextList.length > 0) {
               //Just add some protection and communication if the counts don't match.
               if (columnTextList.length !== optionsList.length) {
                  var message = $translate.instant('message.the.twl.system.parameter.definition.and.the.number') + base.HTML_CRLF + base.HTML_CRLF +
                     $translate.instant('message.text.values') + base.LABEL_DELIMITER +
                     self.sysparDef.columnText + base.HTML_CRLF +
                     $translate.instant('message.option.values') + base.LABEL_DELIMITER +
                     self.sysparDef.options;
                  MessageService.error('global.error', message);
                  //Disable this so they can't do anything with it, just some extra protection.
                  self.isDropdownForceDisable = true;
               } else {
                  //Build the collection that can be bound to the Dropdown.
                  for (var i = 0; i < columnTextList.length; i++) {
                     if (columnTextList[i]) {
                        var dropdownOption = {
                           label: columnTextList[i],
                           value: optionsList[i]
                        };

                        self.dropdownValues.push(dropdownOption);
                     }
                  }
               }
            }
         } else {
            //Handle case where there is just one in the list, shouldn't happen but add protection
            var dropdownOptionOne = {
               label: self.sysparDef.columnText,
               value: self.sysparDef.options
            };

            self.dropdownValues.push(dropdownOptionOne);
         }
      } else if (self.isMultiSelectVisible) {
         //For Multi-Selects, the List of possible values comes from the System Values.  They are a CSV list.
         if (self.multiSelectAvailableValuesCSV.indexOf(base.CSV_DELIMITER) >= 0) {
            var paramValueList = self.multiSelectAvailableValuesCSV.split(base.CSV_DELIMITER);
            if (paramValueList.length > 0) {
               paramValueList.forEach(function (result) {
                  var option = {
                     label: result,
                     value: result  //The value is the same as the label for these.
                  };
                  self.multiSelectValues.push(option);
               });
            }
         } else {
            //Handle case where there is just one in the list, shouldn't happen but add protection
            var multiSelectOptionOne = {
               label: self.multiSelectAvailableValuesCSV,
               value: self.multiSelectAvailableValuesCSV
            };
            self.multiSelectValues.push(multiSelectOptionOne);
         }
      }
   };

   self.initiateStep3Continue = function () {
      self.setVisibility();
      self.buildControl();
      self.findWarehouseOverrideValue();
   };

   self.initiateStep2SystemValue = function () {
      if (self.sysparDef) {
         if (self.sysparDef.columnWidget.trim().toUpperCase() === self.COLUMNWIDGET_CHECKBOX) {
            var getsyspalogicalCriteria = {
               pvTwlcompany: base.criteriaUsed.coNum,
               pvTwlwarehouse: base.criteriaUsed.whNum,
               pvParameterid: self.sysparDef.parameterId
            };
            DataService.post('api/twl/astwlinquiry/getsyspalogical', { data: getsyspalogicalCriteria, busy: true }, function (data) {
               if (data) {
                  self.parameterValueLogical = data;
               }
               self.initiateStep3Continue();
            });
         } else {
            var getsyspacharacterCriteria = {
               pvTwlcompany: base.criteriaUsed.coNum,
               pvTwlwarehouse: base.criteriaUsed.whNum,
               pvParameterid: self.sysparDef.parameterId
            };
            DataService.post('api/twl/astwlinquiry/getsyspacharacter', { data: getsyspacharacterCriteria, busy: true }, function (data) {
               if (data) {
                  if (self.sysparDef.columnWidget.trim().toUpperCase() === self.COLUMNWIDGET_MULTI_SELECT) {
                     self.multiSelectAvailableValuesCSV = data;
                     self.parameterValueMultiSelect = data.split(base.CSV_DELIMITER);
                  } else {
                     self.parameterValue = data;
                  }
               }
               self.initiateStep3Continue();
            });
         }
      } else {
         //Make sure no residual data.
         self.parameterValue = '';
         self.multiSelectAvailableValuesCSV = '';
         self.parameterValueMultiSelect = [];
         self.parameterValueLogical = false;
      }
   };

   self.initiate = function () {
      if (self.rowID) {
         DataService.get('api/twl/syspardef/getbyrowid/' + self.rowID, function (data) {
            if (data) {
               self.sysparDef = data;
               self.initiateStep2SystemValue();
               //Not common, but there is at least one System Parameter that can never be changed by the user.
               self.isEditLockedDown = !self.sysparDef.userSettable;
            }
         });
      }
   };

   self.initiate();
});
