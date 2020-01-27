'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('gl', 'glsf', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('gl', 'glsf');

   $stateProvider.state('glsf.detail-account', {
      url: '/detail-account',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-account.json');
            },
            controller: 'GlsfDetailAccountCtrl as dtla'
         }
      }
   });

   //Sub-View for the Account add
   $stateProvider.state('glsf.detail-account.addAccount', {
      url: '/add-account',
      params: {
         glsfDesignSummary: null,
         glsfSetupaAcctList: null
      },
      views: {
         addAccount: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-account-add-acct.json');
            },
            controller: 'GlsfDetailAccountAddAcctCtrl as dtlacrt'
         }
      }
   });

   $stateProvider.state('glsf.detail-columns', {
      url: '/detail-columns',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-columns.json');
            },
            controller: 'GlsfDetailColumnsCtrl as dtlc'
         }
      }
   });

   //Sub-View for the Columns edit column
   $stateProvider.state('glsf.detail-columns.editColumn', {
      url: '/edit-column',
      params: {
         glsfDesignSummary: null,
         glsfSetupCField: null,
         cComment: null,
         selectedRow: null
      },
      views: {
         editColumn: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-columns-edit.json');
            },
            controller: 'GlsfDetailColumnsEditCtrl as dtlce'
         }
      }
   });

   $stateProvider.state('glsf.detail-horizontal-format', {
      url: '/detail-horizontal-format',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-horizontal-format.json');
            },
            controller: 'GlsfDetailHorizontalFormatCtrl as dtlf'
         }
      }
   });

   $stateProvider.state('glsf.detail-heading', {
      url: '/detail-heading',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-heading.json');
            },
            controller: 'GlsfDetailHeadingCtrl as dtlh'
         }
      }
   });

   $stateProvider.state('glsf.detail-memory-location', {
      url: '/detail-memory-location',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-memory-location.json');
            },
            controller: 'GlsfDetailMemoryLocationCtrl as dtlm'
         }
      }
   });

   $stateProvider.state('glsf.detail-page-layout', {
      url: '/detail-page-layout',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-page-layout.json');
            },
            controller: 'GlsfDetailPageLayoutCtrl as dtlp'
         }
      }
   });

   $stateProvider.state('glsf.detail-selection', {
      url: '/detail-selection',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-selection.json');
            },
            controller: 'GlsfDetailSelectionCtrl as dtls'
         }
      }
   });

   $stateProvider.state('glsf.detail-totals', {
      url: '/detail-totals',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-totals.json');
            },
            controller: 'GlsfDetailTotalsCtrl as dtlt'
         }
      }
   });


   $stateProvider.state('glsf.detail-computation', {
      url: '/detail-computation',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-computation.json');
            },
            controller: 'GlsfDetailComputationCtrl as dtlu'
         }
      }
   });

   $stateProvider.state('glsf.detail-horizontal-account', {
      url: '/detail-horizontal-account',
      params: {
         glsfDesignSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-horizontal-account.json');
            },
            controller: 'GlsfDetailHorizontalAccountCtrl as dtlz'
         }
      }
   });

   //Sub-View for the HorizontalAccount add
   $stateProvider.state('glsf.detail-horizontal-account.addHorizontalAccount', {
      url: '/add-horizontal-account',
      params: {
         currentColumn: null,
         glsfDesignSummary: null,
         glsfSetupzAcct: null
      },
      views: {
         addAccount: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/detail-horizontal-account-add-acct.json');
            },
            controller: 'GlsfDetailHorizontalAccountAddAcctCtrl as dtlzcrt'
         }
      }
   });

   $stateProvider.state('glsf.create', {
      url: '/create',
      params: {
         glsf: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/create.json');
            },
            controller: 'GlsfCreateCtrl as crt'
         }
      }
   });

   $stateProvider.state('glsf.master.edit', {
      url: '/edit',
      views: {
         masterEdit: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/edit.json');
            },
            controller: 'GlsfEditCtrl as mstedit'
         }
      }
   });

   $stateProvider.state('glsf.create-detail', {
      url: '/create-detail',
      params: {
         glsfDesignSummary: null,
         glsfDesignHdr: null,
         selectedSeqNo: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/create-detail.json');
            },
            controller: 'GlsfCreateDetailCtrl as crtdtl'
         }
      }
   });

   $stateProvider.state('glsf.move-details', {
      url: '/move-details',
      params: {
         glsfDesignSummary: null,
         glsfDesignHdr: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/move-details.json');
            },
            controller: 'GlsfMoveDetailsCtrl as mvdtls'
         }
      }
   });

   $stateProvider.state('glsf.duplicate-details', {
      url: '/duplicate-details',
      params: {
         glsfDesignSummary: null,
         glsfDesignHdr: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/duplicate-details.json');
            },
            controller: 'GlsfDuplicateDetailsCtrl as dupdtls'
         }
      }
   });

   //Sub-View for the Duplicate Lines
   $stateProvider.state('glsf.duplicate-details.duplicate-finish', {
      url: '/duplicate-finish',
      params: {
         glsfDesignSummary: null,
         glsfDesignHdr: null,
         selectedSourceRows: null,
         glsfDuplicateCriteria: null,
         glsfDuplicateSourceList: null,
         glsfDuplicateTargetList: null
      },
      views: {
         duplicateFinish: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsf/duplicate-details-finish.json');
            },
            controller: 'GlsfDuplicateDetailsFinishCtrl as dupdtlsfnsh'
         }
      }
   });

});

app.controller('GlsfBaseCtrl', function ($state, DataService, Utils, MessageService) {
   var self = this;
   self.RESEQUENCE_SEQ_START = 10;
   self.RESEQUENCE_SEQ_INCREMENT = 10;
   self.DUPLICATE_FETCH_ALL = 'fetchAll';
   self.DUPLICATE_SAVE = 'save';
   self.DUPLICATE_FETCH_SOURCE = 'fetchSource';
   self.DUPLICATE_NEW_SEQUENCE_AFTER = 'a';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.ACCOUNT_DELIM = ' - ';
   self.COPYTYPE_NEW = 'n';
   self.COPYTYPE_HORIZONTAL = 'h';
   self.COPYTYPE_COPY = 'c';
   self.NEWSEQ_INSERTWHERE_AFTER = 'a';
   self.NEWSEQ_INSERTWHERE_ATLINE = 'l';
   self.STATEMENTTYPE_BALANCE = 'b';
   self.RECTYPE_ACCOUNT = 'a';
   self.RECTYPE_COLUMNS = 'c';
   self.RECTYPE_HORIZONTAL_FORMAT = 'f';
   self.RECTYPE_HEADING = 'h';
   self.RECTYPE_MEMORY_LOCATION = 'm';
   self.RECTYPE_PAGE_LAYOUT = 'p';
   self.RECTYPE_SELECTION = 's';
   self.RECTYPE_TOTALS = 't';
   self.RECTYPE_COMPUTATION = 'u';
   self.RECTYPE_HORIZONTAL_ACCT = 'z';
   self.ACTION_SAVE = 'Save';
   self.ACTION_FETCH = 'Fetch';
   self.ACTION_SAVE = 'Save';
   self.SELECTION_TYPE_LIST = 'l';
   self.SELECTION_TYPE_RANGE = 'r';
   self.ACCOUNT_MAX_ACCOUNTS = 11;
   self.HORIZONTALFORMAT_MAX_COMPANIES = 15;
   self.HORIZONTALFORMAT_MAX_DIVISIONS = 15;
   self.HORIZONTALFORMAT_MAX_DEPARTMENTS = 15;
   self.HORIZONTALFORMAT_MAX_BUDGETS = 15;
   self.HEADER_POSITION_HEADER = 'h';
   self.HEADER_POSITION_FOOTER = 'f';
   self.PAGELAYOUT_CENTER_MINIMUM = 10;
   self.PAGELAYOUT_CENTER_MAXIMUM = 70;
   self.HORIZONTALACCOUNT_MAX_ACCOUNTS = 15;

   self.criteria = {};
   self.glsfDesignHdr = [];

   self.isMaster = function () {
      return $state.is('glsf.master');
   };

   self.includesMaster = function () {
      return $state.includes('glsf.master');
   };

   self.isDetail = function () {
      return $state.is('glsf.detail');
   };

   self.includesDetail = function () {
      return $state.includes('glsf.detail');
   };

   self.search = function (pager) {
      var requestCriteria = {
         designName: self.criteria.designName,
         recordCountLimit: 0
      };

      DataService.post('api/gl/asglsetup/glsfgetdesign', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            // Normally we don't reposition the grid following a refresh, but because the drilldowns refresh the entire
            // grid (even when hitting the back button), it is better to put the grid back on the same page of data for
            // easier workflow.  This also keeps settings such as records per page, etc. There is no single record
            // available to allow for an updateRow() call without backend rework.
            if (pager) {
               self.grid.loadData(data.glsfdesignsummary, pager);
            } else {
               self.dataset = data.glsfdesignsummary;
            }
            self.glsfDesignHdr = data.glsfdesignhdr;
         }
      });
   };

   self.clear = function () {
      Utils.clearObject(self.criteria);

      //Don't want residula data in the Master view if we are do a delete and refreshing.
      self.dataset = [];
      self.glsfDesignHdr = {};
   };

   self.getSubTitle = function () {
      if (self.glsfDesignHdr && self.glsfDesignHdr.designName) {
         return MessageService.get('global.design') + self.LABEL_DELIMITER + self.glsfDesignHdr.designName + self.SUBMENU_DELIMITER +
            MessageService.get('global.description') + self.LABEL_DELIMITER + self.glsfDesignHdr.designDesc;
      } else {
         return '';
      }
   };

   //Consistent build-out of the Sub Title for all of the unique Detail screens.
   self.getSubTitleForDetail = function (glsfDesignSummary) {
      return MessageService.get('global.design') + self.LABEL_DELIMITER + self.glsfDesignHdr.designName + self.SUBMENU_DELIMITER +
         MessageService.get('global.sequence.number') + self.LABEL_DELIMITER + glsfDesignSummary.seqno + self.SUBMENU_DELIMITER +
         MessageService.get('global.type') + self.LABEL_DELIMITER + glsfDesignSummary.recDesc;
   };
});

//Alias: srch
app.controller('GlsfSearchCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   // Clear form
   self.clear = function () {
      base.clear();
   };

   // Perform search
   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('glsf.master');
      }

      base.search();
   };
});

//Alias: mst
app.controller('GlsfMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.isMasterEdit = function () {
      return $state.is('glsf.master.edit');
   };

   self.includesMasterEdit = function () {
      return $state.includes('glsf.master.edit');
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.createStatement = function () {
      $state.go('^.create', {});
   };

   self.editStatement = function () {
      if (base.glsfDesignHdr) {
         $state.go('.edit', { });
      }
   };

   self.deleteStatement = function () {
      if (base.glsfDesignHdr && base.glsfDesignHdr.designName) {
         var glsfDeleteDesign = {
            designname: base.glsfDesignHdr.designName
         };

         var glsfDeleteDesignList = [];
         glsfDeleteDesignList.push(glsfDeleteDesign);

         MessageService.yesNo('global.question', 'question.confirm.delete.of.design',
            function () {
               DataService.post('api/gl/asglsetup/glsfdeletedesign', { data: glsfDeleteDesignList, busy: true }, function () {
                  base.clear();
               });
            });
      }
   };

   self.duplicateLines = function () {
      $state.go('^.duplicate-details', { glsfDesignSummary: base.dataset, glsfDesignHdr: base.glsfDesignHdr });
   };

   self.moveLines = function () {
      $state.go('^.move-details', { glsfDesignSummary: base.dataset, glsfDesignHdr: base.glsfDesignHdr});
   };

   self.renumberLines = function () {
      //The backend call takes in a list, even though we're just processing just one Financial Statement design.
      var glsfRenumberDesignCriteria = [];
      var criteria = {
         designname: base.glsfDesignHdr.designName,
         designdesc: base.glsfDesignHdr.designDesc
      };
      glsfRenumberDesignCriteria.push(criteria);

      DataService.post('api/gl/asglsetup/glsfrenumberdesign', { data: glsfRenumberDesignCriteria, busy: true }, function () {
         base.search();
      });
   };

   self.createSequence = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      var selectedSeqNo = 0;
      if (selectedRow) {
         selectedSeqNo = selectedRow.seqno;
      } else if (base.dataset && base.dataset.length > 0) {
         //Pick the last row if none are selected so the user can quickly add to end of the list.
         selectedRow = base.dataset[base.dataset.length - 1];
         if (selectedRow) {
            selectedSeqNo = selectedRow.seqno;
         } else {
            selectedSeqNo = 0;
         }
      }
      $state.go('^.create-detail', { glsfDesignSummary: selectedRow, glsfDesignHdr: base.glsfDesignHdr, selectedSeqNo: selectedSeqNo });
   };

   self.launchDetail = function (selectedRow) {
      if (selectedRow.recType) {
         switch (selectedRow.recType.toLowerCase()) {
            case base.RECTYPE_ACCOUNT: //ignore jslint - correct indentation
               $state.go('^.detail-account', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_COLUMNS: //ignore jslint - correct indentation
               $state.go('^.detail-columns', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_COMPUTATION: //ignore jslint - correct indentation
               $state.go('^.detail-computation', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_HEADING: //ignore jslint - correct indentation
               $state.go('^.detail-heading', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_HORIZONTAL_ACCT: //ignore jslint - correct indentation
               $state.go('^.detail-horizontal-account', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_HORIZONTAL_FORMAT: //ignore jslint - correct indentation
               $state.go('^.detail-horizontal-format', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_MEMORY_LOCATION: //ignore jslint - correct indentation
               $state.go('^.detail-memory-location', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_PAGE_LAYOUT: //ignore jslint - correct indentation
               $state.go('^.detail-page-layout', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_SELECTION: //ignore jslint - correct indentation
               $state.go('^.detail-selection', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.RECTYPE_TOTALS: //ignore jslint - correct indentation
               $state.go('^.detail-totals', { glsfDesignSummary: selectedRow }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };

   self.editSequence = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      if (selectedRow) {
         self.launchDetail(selectedRow);
      }
   };

   self.deleteSequence = function () {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      if (selectedRows) {
         MessageService.yesNo('global.question', 'question.confirm.delete.of.selected.sequences',
            function () {
               var glsfDeleteCriteria = [];
               selectedRows.forEach(function (glsfdesignsummary) {
                  var criteriaRow = {
                     glsfrowid: glsfdesignsummary.glsfRowid
                  };
                  glsfDeleteCriteria.push(criteriaRow);
               });

               DataService.post('api/gl/asglsetup/glsfdelete', { data: glsfDeleteCriteria, busy: true }, function () {
                  base.search();
               });
            });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         self.launchDetail(record);
      }
   };
});

//This controller is used when the user clicks "Edit" from top toolbar on the Master Page.  This allows editing of Header Info.
//This is a sub-view of the Master view.
//Alias: mstedit
app.controller('GlsfEditCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.getSubTitle = function () {
      if (base.glsfDesignHdr && base.glsfDesignHdr.designName) {
         return MessageService.get('global.design') + base.LABEL_DELIMITER + base.glsfDesignHdr.designName;
      } else {
         return '';
      }
   };

   self.back = function () {
      $state.go('^');
   };

   self.save = function () {
      var requestCriteria = {
         designName: base.glsfDesignHdr.designName,
         designDesc: base.glsfDesignHdr.designDesc
      };

      DataService.post('api/gl/asglsetup/glsfdesigndesc', { data: requestCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.back();
      });
   };
});

//This controller is used when the user clicks 'New' from top toolbar on the Master Page.  It allows them to create a
//new Financial Statement.
//Alias: crt
app.controller('GlsfCreateCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.criteria = {
      copytype: (!base.glsfDesignHdr || !base.glsfDesignHdr.designName || base.glsfDesignHdr.designName === '') ? base.COPYTYPE_NEW : base.COPYTYPE_COPY,
      stmttype: base.STATEMENTTYPE_BALANCE,
      copydesignname: base.glsfDesignHdr.designName
   };

   self.back = function () {
      $state.go('^.master');
   };

   //Save
   self.submit = function () {
      DataService.post('api/gl/asglsetup/glsfadddesign', { data: self.criteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         //Refresh the Criteria with the new one we just created.
         base.criteria.designName = self.criteria.designname;

         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Account" type.
//It shows all of the details of the sequence.
//Alias: dtla
app.controller('GlsfDetailAccountCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, Sasc) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupaAcctList = [];
   self.glsfSetupaAcctListFiltered = [];
   self.glsfSetupaColList = [];
   self.glsfSetupA = {};
   self.isNumberOfAccountsLimit = true;
   self.beginAccountSubAccount = '';
   self.endAccountSubAccount = '';

   self.isDetailAccount = function () {
      return $state.is('glsf.detail-account');
   };

   self.includesDetailAccount = function () {
      return $state.includes('glsf.detail-account');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   //There is a Database limit on the backend that only allows up to 11 accounts.
   self.setAccountListLimitFlag = function () {
      self.isNumberOfAccountsLimit = true;
      if (self.glsfSetupaAcctListFiltered) {
         if (self.glsfSetupaAcctListFiltered.length < base.ACCOUNT_MAX_ACCOUNTS) {
            self.isNumberOfAccountsLimit = false;
         }
      }
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.buildBeginAccountSubNo = function () {
      if (self.beginAccountSubAccount) {
         DataService.get('api/gl/asglsetup/glsfparseaccount/' + self.beginAccountSubAccount, function (data) {
            if (data) {
               self.beginAccountSubAccount = Utils.pad(data.iGLAcctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(data.iGLSubno, Sasc.glsize4);
               self.glsfSetupA.begacctno = data.iGLAcctno;
               self.glsfSetupA.begsubno = data.iGLSubno;
            }
         });
      }
   };

   self.buildEndAccountSubNo = function () {
      if (self.endAccountSubAccount) {
         DataService.get('api/gl/asglsetup/glsfparseaccount/' + self.endAccountSubAccount, function (data) {
            if (data) {
               self.endAccountSubAccount = Utils.pad(data.iGLAcctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(data.iGLSubno, Sasc.glsize4);
               self.glsfSetupA.endacctno = data.iGLAcctno;
               self.glsfSetupA.endsubno = data.iGLSubno;
            }
         });
      }
   };

   self.rebuildFilteredAccountsList = function () {
      self.glsfSetupaAcctListFiltered = [];
      //Need to convert these to strings so we see leading zeros masking in the Account and Sub Account #
      self.glsfSetupaAcctList.forEach(function (row) {
         if (row.acctno > 0) {
            var glsfsetupaacctDisplay = {
               itemno: row.itemno,
               acctno: Utils.pad(row.acctno, Sasc.glsize3),
               subno: Utils.pad(row.subno, Sasc.glsize4)
            };
            self.glsfSetupaAcctListFiltered.push(glsfsetupaacctDisplay);
         }
      });
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetupaRequest = {
         glsfsetupaacct: [],
         glsfsetupacol: [],
         glsfsetupa: {},
         glsfsetupcriteria: self.glsfSetupCriteria
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetupaRequest.glsfsetupaacct = self.glsfSetupaAcctList;
         glsfsetupaRequest.glsfsetupacol = self.glsfSetupaColList;
         glsfsetupaRequest.glsfsetupa = self.glsfSetupA;
         glsfsetupaRequest.glsfsetupcriteria = self.glsfSetupCriteria;
      }

      DataService.post('api/gl/asglsetup/glsfsetupa', { data: glsfsetupaRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupA = data.glsfsetupa;
            self.glsfSetupaColList = data.glsfsetupacol;
            self.glsfSetupaAcctList = data.glsfsetupaacct;

            if (self.glsfSetupA && self.glsfSetupA.begacctno) {
               self.beginAccountSubAccount = Utils.pad(self.glsfSetupA.begacctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(self.glsfSetupA.begsubno, Sasc.glsize4);
            } else {
               self.beginAccountSubAccount = '';
            }

            if (self.glsfSetupA && self.glsfSetupA.endacctno) {
               self.endAccountSubAccount = Utils.pad(self.glsfSetupA.endacctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(self.glsfSetupA.endsubno, Sasc.glsize4);
            } else {
               self.endAccountSubAccount = '';
            }

            //Build the list only including rows that are set with an Account (and if selection is by 'List' type).
            //That's what is presented to the User in the grid.  There's no reason to show empty placeholder rows.
            if (self.glsfSetupA && self.glsfSetupA.selectionType === base.SELECTION_TYPE_LIST) {
               self.rebuildFilteredAccountsList();
            } else {
               self.glsfSetupaAcctListFiltered = [];
            }

            self.setAccountListLimitFlag();
         }
      });
   };

   self.deleteAccountFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.accountsGrid);
      selectedRows.forEach(function (row) {
         var index = self.glsfSetupaAcctListFiltered.indexOf(row);

         //Determine the row we're working with and clear the keys from the real collection that
         //will be passed back to the backend (i.e. the unfiltered collection).  NOTE that all
         //11 slots, regardless if they are set with valid accounts get sent to/from the backend.
         var itemno = 0;
         if (self.glsfSetupaAcctListFiltered[index]) {
            itemno = self.glsfSetupaAcctListFiltered[index].itemno;
         }
         self.glsfSetupaAcctList.forEach(function (originalRow) {
            if (originalRow.itemno === itemno) {
               originalRow.acctno = 0;
               originalRow.subno = 0;
            }
         });

         self.glsfSetupaAcctListFiltered.splice(index, 1);
      });

      self.setAccountListLimitFlag();
   };

   self.addAccountToList = function () {
      $state.go('.addAccount', {
         glsfDesignSummary: self.glsfDesignSummary,
         glsfSetupaAcctList: self.glsfSetupaAcctList
      });
   };

   self.validate = function () {
      var isValid = true;
      if (self.glsfSetupA) {
         if (self.glsfSetupA.selectionType && self.glsfSetupA.selectionType.toLowerCase() === base.SELECTION_TYPE_RANGE) {
            if (!self.glsfSetupA.begacctno || self.glsfSetupA.begacctno === 0 || (!self.glsfSetupA.endacctno || self.glsfSetupA.endacctno === 0)) {
               MessageService.error('global.error', 'message.must.choose.an.account.or.a.range.of.accounts');
               isValid = false;
            }
         }
      }
      return isValid;
   };

   self.submit = function () {
      if (self.validate()) {
         self.initializeCriteria(base.ACTION_SAVE);
         self.glsfSetupOrSave(base.ACTION_SAVE);
      }
   };

   //Callbacks
   self.acceptUpdatedAccountListCallback = function (glsfDesignSummary, glsfSetupaAcctList) {
      self.glsfDesignSummary = glsfDesignSummary;
      self.glsfSetupaAcctList = glsfSetupaAcctList;

      //Re-build the Filtered list for the UI to keep in sync with the collection for the CRUD.
      if (self.glsfSetupA && self.glsfSetupA.selectionType === base.SELECTION_TYPE_LIST) {
         self.rebuildFilteredAccountsList();
      } else {
         self.glsfSetupaAcctListFiltered = [];
      }

      self.setAccountListLimitFlag();
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user clicks "Add Account To List" from the Detail Page for "Account" type.
//Work off the real, unfiltered Account List when doing the Add since we have a set number of 11 rows in collection
//and this will slide the new one into an open spot.
//Alias: dtlacrt
app.controller('GlsfDetailAccountAddAcctCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, Sasc) {
   var self = this;
   var dtla = $scope.dtla;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupaAcctList = $stateParams.glsfSetupaAcctList;
   self.accountNumber = 0;
   self.subAccountNumber = 0;
   self.accountSubAccount = '';

   //Try to find an open slot.  There are 11 in the array to/from the backend even though the UI only shows
   //what slots are filled.  Get the 1st spot that's not assigned.
   self.getOpenItemNo = function () {
      if (self.glsfSetupaAcctList) {
         for (var i = 0; i < base.ACCOUNT_MAX_ACCOUNTS; i++) {
            if (self.glsfSetupaAcctList[i] && self.glsfSetupaAcctList[i].acctno === 0) {
               return i + 1;
            }
         }
         return 0;
      } else {
         return 1;
      }
   };

   self.buildAccountSubNo = function () {
      if (self.accountSubAccount) {
         DataService.get('api/gl/asglsetup/glsfparseaccount/' + self.accountSubAccount, function (data) {
            if (data) {
               self.accountSubAccount = Utils.pad(data.iGLAcctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(data.iGLSubno, Sasc.glsize4);
               self.accountNumber = data.iGLAcctno;
               self.subAccountNumber = data.iGLSubno;
            }
         });
      }
   };

   self.back = function () {
      $state.go('^', { glsfDesignSummary: self.glsfDesignSummary });
   };

   self.ok = function () {
      if (self.glsfSetupaAcctList) {

         if (self.accountNumber === 0) {
            MessageService.error('global.error', 'message.account.subaccount.is.required');
            return;
         }

         var results = self.glsfSetupaAcctList.filter(function (row) {
            return row.acctno === self.accountNumber && row.subno === self.subAccountNumber;
         });

         if (results && results.length > 0) {
            MessageService.error('global.error', 'message.duplicate.account.subaccount.not.allowed');
         } else {
            var itemno = self.getOpenItemNo();

            if (itemno === 0) {
               MessageService.error('global.error', 'message.only.a.maximum.of.eleven.accounts.allowed');
            } else {
               self.glsfSetupaAcctList.forEach(function (data) {
                  if (data.itemno === itemno) {
                     data.acctno = self.accountNumber;
                     data.subno = self.subAccountNumber;
                  }
               });

               dtla.acceptUpdatedAccountListCallback(self.glsfDesignSummary, self.glsfSetupaAcctList);
               $state.go('^');
            }
         }
      }
   };
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Columns" type.
//It shows all of the details of the sequence.
//Alias: dtlc
app.controller('GlsfDetailColumnsCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupC = [];
   self.glsfSetupCriteria = {};
   self.cComment = {};
   self.glsfSetupCField = [];
   self.glsfSetupResults = {};

   self.isDetailColumns = function () {
      return $state.is('glsf.detail-columns');
   };

   self.includesDetailColumns = function () {
      return $state.includes('glsf.detail-columns');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.launchDetail = function (selectedRow) {
      $state.go('.editColumn', {
         glsfDesignSummary: self.glsfDesignSummary,
         glsfSetupCField: self.glsfSetupCField,
         cComment: self.cComment,
         selectedRow: selectedRow
      });
   };

   self.editColumn = function () {
      var selectedRow = GridService.getSelectedRecord(self.columnsGrid);
      if (selectedRow) {
         self.launchDetail(selectedRow);
      }
   };

   self.drilldown = function (e, args) {
      var selectedRow = args[0].item;
      if (selectedRow) {
         self.launchDetail(selectedRow);
      }
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetupcRequest = {
         glsfsetupc: [],
         glsfsetupcriteria: self.glsfSetupCriteria,
         cComment: ' '
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetupcRequest.glsfsetupc = self.glsfSetupC;
         glsfsetupcRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetupcRequest.cComment = self.cComment;
      }

      DataService.post('api/gl/asglsetup/glsfsetupc', { data: glsfsetupcRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupC = data.glsfsetupc;
            self.glsfSetupCField = data.glsfsetupcfield;
            self.glsfSetupResults = data.glsfsetupresults;
            self.cComment = data.cComment;
         }
      });
   };

   self.submit = function () {
      //Note: No UI validation required for this type.
      self.initializeCriteria(base.ACTION_SAVE);
      self.glsfSetupOrSave(base.ACTION_SAVE);
   };

   //Callbacks
   self.acceptUpdatedSelectedColumnCallback = function (glsfDesignSummary, glsfSetupcCol, cComment) {
      self.glsfDesignSummary = glsfDesignSummary;
      self.glsfSetupcCol = glsfSetupcCol;
      self.cComment = cComment;

      //Overwrite the one updated into the selected row.
      if (self.glsfSetupC) {
         self.glsfSetupC.forEach(function (row) {
            if (row.columnNo === glsfSetupcCol.columnNo) {
               row = glsfSetupcCol;
            }
         });

         self.columnsGrid.loadData(self.glsfSetupC);
      }
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user clicks a row in the "Columns" Detail Page.  It's the Columns Edit row controller.
//They don't persist data from here, simply updating data in the Column collection.  Save is done from the dtlc controller.
//Alias: dtlce
app.controller('GlsfDetailColumnsEditCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var dtlc = $scope.dtlc;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   //Represents the list of fields for the 'Field List' dropdown.
   self.glsfSetupCField = $stateParams.glsfSetupCField;
   //This is the single Column row we're working with to Edit.
   self.glsfSetupcCol = $stateParams.selectedRow;
   self.cComment = $stateParams.cComment;
   self.fieldList = [];
   self.lookBackEnabledList = [4, 5, 6, 7, 8, 9, 11, 12];
   self.isLookBack1Enabled = false;
   self.isLookBack2Enabled = false;

   self.back = function () {
      $state.go('^', { glsfDesignSummary: self.glsfDesignSummary });
   };

   self.getSubTitle = function () {
      return MessageService.get('global.column.number') + base.LABEL_DELIMITER + self.glsfSetupcCol.columnNo;
   };

   self.fieldValue1Changed = function () {
      if (self.glsfSetupcCol) {
         var intValue = parseInt(self.glsfSetupcCol.value1, 10);
         self.isLookBack1Enabled = self.lookBackEnabledList.indexOf(intValue) > -1;
      }
   };

   self.fieldValue2Changed = function () {
      if (self.glsfSetupcCol) {
         var intValue = parseInt(self.glsfSetupcCol.value2, 10);
         self.isLookBack2Enabled = self.lookBackEnabledList.indexOf(intValue) > -1;
      }
   };

   self.initializeLookBackFields = function () {
      if (self.glsfSetupcCol) {
         var intValue = parseInt(self.glsfSetupcCol.value1, 10);
         self.isLookBack1Enabled = self.lookBackEnabledList.indexOf(intValue) > -1;

         intValue = parseInt(self.glsfSetupcCol.value2, 10);
         self.isLookBack2Enabled = self.lookBackEnabledList.indexOf(intValue) > -1;
      }
   };

   self.buildFieldListDropdown = function () {
      if (self.glsfSetupCField) {
         self.glsfSetupCField.forEach(function (item) {
            if (item.fieldText) {
               var option = {
                  label: item.fieldText,
                  value: Utils.pad(item.fieldNo, 2)
               };

               self.fieldList.push(option);
            }
         });
      }
   };

   self.ok = function () {
      dtlc.acceptUpdatedSelectedColumnCallback(self.glsfDesignSummary, self.glsfSetupcCol, self.cComment);
      $state.go('^');
   };

   self.buildFieldListDropdown();
   self.initializeLookBackFields();
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Horizontal Format" type.
//It shows all of the details of the sequence.
//Alias: dtlf
app.controller('GlsfDetailHorizontalFormatCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupfBudgetNo = [];
   self.glsfSetupfCono = [];
   self.glsfSetupfDeptNo = [];
   self.glsfSetupfDivNo = [];
   self.glsfSetupCriteria = {};
   self.glsfSetupF = {};
   self.cComment = {};  // ???
   self.glsfSetupfCoList = [];
   self.glsfSetupfConoFiltered = [];
   self.glsfSetupfDeptNoFiltered = [];
   self.glsfSetupfDivNoFiltered = [];
   self.glsfSetupfBudgetNoFiltered = [];
   self.glsfSetupfDeptList = [];
   self.glsfSetupfDivList = [];
   self.glsfSetupfDivNo = [];
   self.glsfSetupResults = {};
   self.isNumberOfCompaniesLimit = true;
   self.isNumberOfDivisionsLimit = true;
   self.isNumberOfDepartmentsLimit = true;
   self.isNumberOfBudgetsLimit = true;
   self.companiesList = [];
   self.divisionsList = [];
   self.departmentsList = [];

   self.isDetailHorizontalFormat = function () {
      return $state.is('glsf.detail-horizontal-format');
   };

   self.includesDetailHorizontalFormat = function () {
      return $state.includes('glsf.detail-horizontal-format');
   };

   self.buildRangeDropdowns = function () {
      if (self.glsfSetupfCoList) {
         self.glsfSetupfCoList.forEach(function (item) {
            if (item.name) {
               var option = {
                  label: item.cono + ' - ' + item.name,
                  value: item.cono
               };

               self.companiesList.push(option);
            }
         });
      }

      if (self.glsfSetupfDivList) {
         self.glsfSetupfDivList.forEach(function (item) {
            if (item.name) {
               var option = {
                  label: item.divno + ' - ' + item.name,
                  value: item.divno
               };

               self.divisionsList.push(option);
            }
         });
      }

      if (self.glsfSetupfDeptList) {
         self.glsfSetupfDeptList.forEach(function (item) {
            if (item.name) {
               var option = {
                  label: item.deptno + ' - ' + item.name,
                  value: item.deptno
               };

               self.departmentsList.push(option);
            }
         });
      }
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetupfRequest = {
         glsfsetupfbudgetno: [],
         glsfsetupfcono: [],
         glsfsetupfdeptno: [],
         glsfsetupfdivno: [],
         glsfsetupcriteria: self.glsfSetupCriteria,
         glsfsetupf: {}
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetupfRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetupfRequest.glsfsetupf = self.glsfSetupF;

         //Walk thru the list of rows that have a company and calculate the row itemno.  Send that that to the backend to be saved.
         var cnt = 1;
         self.glsfSetupfConoFiltered.forEach(function (item) {
            item.itemno = cnt++;
         });
         glsfsetupfRequest.glsfsetupfcono = self.glsfSetupfConoFiltered;

         cnt = 1;
         self.glsfSetupfDivNoFiltered.forEach(function (item) {
            item.itemno = cnt++;
         });
         glsfsetupfRequest.glsfsetupfdivno = self.glsfSetupfDivNoFiltered;

         cnt = 1;
         self.glsfSetupfDeptNoFiltered.forEach(function (item) {
            item.itemno = cnt++;
         });
         glsfsetupfRequest.glsfsetupfdeptno = self.glsfSetupfDeptNoFiltered;

         cnt = 1;
         self.glsfSetupfBudgetNoFiltered.forEach(function (item) {
            item.itemno = cnt++;
         });
         glsfsetupfRequest.glsfsetupfbudgetno = self.glsfSetupfBudgetNoFiltered;
      }

      DataService.post('api/gl/asglsetup/glsfsetupf', { data: glsfsetupfRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupCriteria = data.glsfsetupcriteria;
            self.glsfSetupfBudgetNo = data.glsfsetupfbudgetno;
            self.glsfSetupfCono = data.glsfsetupfcono;
            self.glsfSetupfDeptNo = data.glsfsetupfdeptno;
            self.glsfSetupfDivNo = data.glsfsetupfdivno;
            self.glsfSetupF = data.glsfsetupf;
            self.glsfSetupfCoList = data.glsfsetupfcolist;
            self.glsfSetupfDivList = data.glsfsetupfdivlist;
            self.glsfSetupfDeptList = data.glsfsetupfdeptlist;

            if (self.glsfSetupF && self.glsfSetupF.conoType === base.SELECTION_TYPE_LIST) {
               //Don't filter out blank rows.  We want to keep the 15 slots intact.
               self.glsfSetupfConoFiltered = data.glsfsetupfcono;
            } else {
               //If they switch to the List and there isn't a collection built out, create
               //the 15 slots.
               for (var i = 1; i < 16; i++) {
                  var defaultCompanyEntry = {
                     itemno: i,
                     cono: 0
                  };
                  self.glsfSetupfConoFiltered.push(defaultCompanyEntry);
               }
            }

            if (self.glsfSetupF && self.glsfSetupF.divnoType === base.SELECTION_TYPE_LIST) {
               //Don't filter out blank rows.  We want to keep the 15 slots intact.
               self.glsfSetupfDivNoFiltered = data.glsfsetupfdivno;
            } else {
               //If they switch to the List and there isn't a collection built out, create
               //the 15 slots.
               for (var i = 1; i < 16; i++) {
                  var defaultDivisionEntry = {
                     itemno: i,
                     divno: 0
                  };
                  self.glsfSetupfDivNoFiltered.push(defaultDivisionEntry);
               }
            }

            if (self.glsfSetupF && self.glsfSetupF.deptnoType === base.SELECTION_TYPE_LIST) {
               //Don't filter out blank rows.  We want to keep the 15 slots intact.
               self.glsfSetupfDeptNoFiltered = data.glsfsetupfdeptno;
            } else {
               //If they switch to the List and there isn't a collection built out, create
               //the 15 slots.
               for (var i = 1; i < 16; i++) {
                  var defaultDepartmentEntry = {
                     itemno: i,
                     deptno: 0
                  };
                  self.glsfSetupfDeptNoFiltered.push(defaultDepartmentEntry);
               }
            }

            //The Budget List is always visible.
            if (self.glsfSetupF) {
               //Don't filter out blank rows.  We want to keep the 15 slots intact.
               self.glsfSetupfBudgetNoFiltered = data.glsfsetupfbudgetno;
            } else {
               //If they switch to the List and there isn't a collection built out, create
               //the 15 slots.
               for (var i = 1; i < 16; i++) {
                  var defaultBudgetEntry = {
                     itemno: i,
                     budgetno: 0
                  };
                  self.glsfSetupfBudgetNoFiltered.push(defaultBudgetEntry);
               }
            }
            self.buildRangeDropdowns();
         }
      });
   };

   self.submit = function () {
      //Note: No UI validation required for this type, not even the companies, divisions, or departments on a list
      //are validated.
      self.initializeCriteria(base.ACTION_SAVE);
      self.glsfSetupOrSave(base.ACTION_SAVE);
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Header" type.
//It shows all of the details of the sequence.
//Alias: dtlh
app.controller('GlsfDetailHeadingCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupCriteria = {};
   self.glsfSetupH = {};
   self.glsfSetuphType = [];
   self.printTypesList = [];
   self.glsfSetupResults = {};
   self.advanceToFieldTip = MessageService.get('global.advances.to.a.specific.line.number');
   self.advanceByFieldTip = MessageService.get('global.advances.by.indicated.number');

   self.isDetailHeading = function () {
      return $state.is('glsf.detail-heading');
   };

   self.includesDetailHeading = function () {
      return $state.includes('glsf.detail-heading');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.buildDropdown = function () {
      if (self.glsfSetuphType) {
         self.glsfSetuphType.forEach(function (item) {
            if (item.descr) {
               var option = {
                  label: item.descr,
                  value: item.itemno
               };

               self.printTypesList.push(option);
            }
         });
      }
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetuphRequest = {
         glsfsetupcriteria: self.glsfSetupCriteria,
         glsfsetuph: {}
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetuphRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetuphRequest.glsfsetuph = self.glsfSetupH;
      }

      DataService.post('api/gl/asglsetup/glsfsetuph', { data: glsfsetuphRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupCriteria = data.glsfsetupcriteria;
            self.glsfSetupH = data.glsfsetuph;
            self.glsfSetuphType = data.glsfsetuphtype;
            self.glsfSetupResults = data.glsfsetupresults;

            self.buildDropdown();
         }
      });
   };

   self.validate = function () {
      var isValid = true;
      if (self.glsfSetupH) {
         if (self.glsfSetupH.position) {
            if (self.glsfSetupH.position.toLowerCase() === base.HEADER_POSITION_HEADER) {
               if (!self.glsfSetupH.headerNo || self.glsfSetupH.headerNo === 0) {
                  MessageService.error('global.error', 'message.header.line.must.be.greater.than.zero');
                  isValid = false;
               }
            }
            if (self.glsfSetupH.position.toLowerCase() === base.HEADER_POSITION_FOOTER) {
               if (!self.glsfSetupH.footerNo || self.glsfSetupH.footerNo === 0) {
                  MessageService.error('global.error', 'message.footer.line.must.be.greater.than.zero');
                  isValid = false;
               }
            }
         }
      }
      return isValid;
   };

   self.submit = function () {
      if (self.validate()) {
         self.initializeCriteria(base.ACTION_SAVE);
         self.glsfSetupOrSave(base.ACTION_SAVE);
      }
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Memory Location" type.
//It shows all of the details of the sequence.
//Alias: dtlm
app.controller('GlsfDetailMemoryLocationCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupCriteria = {};
   self.glsfSetupM = {};
   self.glsfSetupResults = {};

   self.isDetailMemoryLocation = function () {
      return $state.is('glsf.detail-memory-location');
   };

   self.includesDetailMemoryLocation = function () {
      return $state.includes('glsf.detail-memory-location');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetupmRequest = {
         glsfsetupcriteria: self.glsfSetupCriteria,
         glsfsetupm: {}
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetupmRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetupmRequest.glsfsetupm = self.glsfSetupM;
      }

      DataService.post('api/gl/asglsetup/glsfsetupm', { data: glsfsetupmRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupM = data.glsfsetupm;
            self.glsfSetupResults = data.glsfsetupresults;
         }
      });
   };

   self.submit = function () {
      self.initializeCriteria(base.ACTION_SAVE);
      self.glsfSetupOrSave(base.ACTION_SAVE);
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Page Layout" type.
//It shows all of the details of the sequence.
//Alias: dtlp
app.controller('GlsfDetailPageLayoutCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupCriteria = {};
   self.glsfSetupP = {};
   self.glsfSetupResults = {};

   self.isDetailPageLayout = function () {
      return $state.is('glsf.detail-page-layout');
   };

   self.includesDetailPageLayout = function () {
      return $state.includes('glsf.detail-page-layout');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetuppRequest = {
         glsfsetupcriteria: self.glsfSetupCriteria,
         glsfsetupp: {}
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetuppRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetuppRequest.glsfsetupp = self.glsfSetupP;
      }

      DataService.post('api/gl/asglsetup/glsfsetupp', { data: glsfsetuppRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupP = data.glsfsetupp;
            self.glsfSetupResults = data.glsfsetupresults;
         }
      });
   };

   self.validate = function () {
      var isValid = true;
      if (self.glsfSetupP) {
         if (self.glsfSetupP.pageCenter) {
            if (self.glsfSetupP.pageCenter < base.PAGELAYOUT_CENTER_MINIMUM || self.glsfSetupP.pageCenter > base.PAGELAYOUT_CENTER_MAXIMUM) {
               MessageService.error('global.error', 'message.must.be.between.10.and.70');
               isValid = false;
            }
         }
      }
      return isValid;
   };

   self.submit = function () {
      if (self.validate()) {
         self.initializeCriteria(base.ACTION_SAVE);
         self.glsfSetupOrSave(base.ACTION_SAVE);
      }
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Selection" type.
//It shows all of the details of the sequence.
//Alias: dtls
app.controller('GlsfDetailSelectionCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupCriteria = {};
   self.glsfSetupS = {};         //Header information
   self.glsfSetupResults = {};
   self.glsfSetupsCoList = [];   //Valid Company - Name (to build ranges and list)
   self.glsfSetupsCono = [];     //List of Companies that are selected
   self.glsfSetupsListCono = []; //Another list of companies that are selected, used for the Div and Dept.
   self.glsfSetupsDeptNo = [];   //List of Departments selected
   self.glsfSetupsDeptList = []; //Available list of Departments, based on the selected companies
   self.glsfSetupsDivNo = [];    //List of Divisions selected
   self.glsfSetupsDivList = [];  //Available list of Divisions, based on the selected companies
   self.glsfSetupsSort = [];     //For the Sort Order dropdowns
   self.glsfSetupsValid = [];    //For the informational field showing valid summary detail types.

   self.availableCompanies = [];   //List of Company numbers, what the dropdown is bound to.
   self.availableDivisions = [];   //List of Division numbers, what the dropdown is bound to.
   self.availableDepartments = []; //List of Department numbers, what the dropdown is bound to.
   self.selectedCompanies = [];  //Used for multi-selector on what's currently selected.
   self.selectedDivisions = [];  //Used for multi-selector on what's currently selected.
   self.selectedDepartments = [];  //Used for multi-selector on what's currently selected.

   self.sortOptions = [];
   self.validSummaryDetailTypes = {};

   self.isDetailSelection = function () {
      return $state.is('glsf.detail-selection');
   };

   self.includesDetailSelection = function () {
      return $state.includes('glsf.detail-selection');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.buildDropdowns = function () {
      if (self.glsfSetupsCoList) {
         self.glsfSetupsCoList.forEach(function (item) {
            if (item.name) {
               var option = {
                  label: item.cono + ' - ' + item.name,
                  value: item.cono
               };

               self.availableCompanies.push(option);
            }
         });
      }

      if (self.glsfSetupsSort) {
         self.glsfSetupsSort.forEach(function (item) {
            if (item.sortOption) {
               var option = {
                  label: item.sortOption,
                  value: item.itemno
               };

               self.sortOptions.push(option);
            }
         });
      }
   };

   //When the Compan(ies) selected changes, this gets called to build the list based on those companies selected.
   self.buildCompanySpecificDropdowns = function () {
      //Make sure we don't have residual data if the compan(ies) changed.
      self.availableDivisions = [];
      self.selectedDivisions = [];
      self.availableDepartments = [];
      self.selectedDepartments = [];
      if (self.glsfSetupsDivList) {
         self.glsfSetupsDivList.forEach(function (item) {
            if (item.name) {
               var option = {
                  label: item.divno + ' - ' + item.name,
                  value: item.divno
               };

               self.availableDivisions.push(option);
            }
         });
      }

      if (self.glsfSetupsDeptList) {
         self.glsfSetupsDeptList.forEach(function (item) {
            if (item.name) {
               var option = {
                  label: item.deptno + ' - ' + item.name,
                  value: item.deptno
               };

               self.availableDepartments.push(option);
            }
         });
      }
   };

   self.buildValidSummaryDetailTypesInfoField = function () {
      self.validSummaryDetailTypes = '';
      if (self.glsfSetupsValid) {
         self.glsfSetupsValid.forEach(function (item) {
            var value = item.conoSummary + item.divnoSummary + item.deptnoSummary + item.subnoSummary;
            self.validSummaryDetailTypes = self.validSummaryDetailTypes + value + ' ';
         });
      }
   };


   self.populateSelectedCompanies = function () {
      self.selectedCompanies = [];
      if (self.glsfSetupsListCono) {
         self.glsfSetupsListCono.forEach(function (item) {
            if (item.cono) {
               self.selectedCompanies.push(item.cono);
            }
         });
      }
   };

   self.replaceSelectedCompanies = function () {
      self.glsfSetupsCono = [];
      if (self.selectedCompanies) {
         self.selectedCompanies.forEach(function (cono) {
            if (cono) {
               var newRow = {
                  cono: cono
               };
               self.glsfSetupsCono.push(newRow);
            }
         });
      }
   };

   //This is used for the call that builds out the Division and Department lists for the selected
   //compan(ies).
   self.buildGlsfSetupsListConoForCriteria = function () {
      var criteria = [];
      if (self.selectedCompanies) {
         self.selectedCompanies.forEach(function (cono) {
            if (cono) {
               var newRow = {
                  cono: cono
               };
               criteria.push(newRow);
            }
         });
      }
      return criteria;
   };

   self.populateSelectedDivisions = function () {
      self.selectedDivisions = [];
      if (self.glsfSetupsDivNo) {
         self.glsfSetupsDivNo.forEach(function (item) {
            if (item.divno) {
               self.selectedDivisions.push(item.divno);
            }
         });
      }
   };

   self.replaceSelectedDivisions = function () {
      self.glsfSetupsDivNo = [];
      if (self.selectedDivisions) {
         self.selectedDivisions.forEach(function (divno) {
            if (divno) {
               var newRow = {
                  divno: divno
               };
               self.glsfSetupsDivNo.push(newRow);
            }
         });
      }
   };

   self.populateSelectedDepartments = function () {
      self.selectedDepartments = [];
      if (self.glsfSetupsDeptNo) {
         self.glsfSetupsDeptNo.forEach(function (item) {
            if (item.deptno) {
               self.selectedDepartments.push(item.deptno);
            }
         });
      }
   };

   self.replaceSelectedDepartments = function () {
      self.glsfSetupsDeptNo = [];
      if (self.selectedDepartments) {
         self.selectedDepartments.forEach(function (deptno) {
            if (deptno) {
               var newRow = {
                  deptno: deptno
               };
               self.glsfSetupsDeptNo.push(newRow);
            }
         });
      }
   };

   //When the Compan(ies) selected has changed (more or less of the multi-select), we need to make
   //a backend call to get the updated list of Divisions and Departments that qualify for those
   //compan(ies) that are selected.
   self.selectedCompaniesChanged = function () {

      //If there are no companies selected, clear all residual data.  If the range is the option, then
      //both of the From and To need to be set.
      if ((self.glsfSetupS.conoSelect === base.SELECTION_TYPE_LIST && (!self.selectedCompanies || self.selectedCompanies.length === 0)) ||
          (self.glsfSetupS.conoSelect === base.SELECTION_TYPE_RANGE && (!self.glsfSetupS.conoFrom || !self.glsfSetupS.conoTo))) {
         self.selectedDivisions = [];
         self.selectedDepartments = [];
         self.availableDivisions = [];
         self.availableDepartments = [];
         self.glsfSetupsDivNo = [];
         self.glsfSetupsDeptNo = [];
         self.glsfSetupsDivList = [];
         self.glsfSetupsDeptList = [];
         return;
      }

      var glsfSetupsListCriteria = {
         conoSelect: self.glsfSetupS.conoSelect,
         conoFrom: self.glsfSetupS.conoFrom,
         conoTo: self.glsfSetupS.conoTo
      };

      var glsfsetupslistRequest = {
         glsfsetupslistcono: self.buildGlsfSetupsListConoForCriteria(),
         glsfsetupslistcriteria: glsfSetupsListCriteria
      };

      //This call gives us related Divisions and Departments for the selected compan(ies).
      DataService.post('api/gl/asglsetup/glsfsetupslist', { data: glsfsetupslistRequest, busy: false }, function (data) {
         if (data) {
            self.glsfSetupsListCono = data.glsfsetupslistcono;
            self.glsfSetupsDivList = data.glsfsetupsdivlist;
            self.glsfSetupsDeptList = data.glsfsetupsdeptlist;

            self.buildCompanySpecificDropdowns();
            self.populateSelectedDivisions();
            self.populateSelectedDepartments();
         }
      });
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetupsRequest = {
         glsfsetupcriteria: self.glsfSetupCriteria,
         glsfsetups: {}
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetupsRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetupsRequest.glsfsetups = self.glsfSetupS;

         self.replaceSelectedCompanies();
         self.replaceSelectedDivisions();
         self.replaceSelectedDepartments();

         glsfsetupsRequest.glsfsetupscono = self.glsfSetupsCono;
         glsfsetupsRequest.glsfsetupsdivno = self.glsfSetupsDivNo;
         glsfsetupsRequest.glsfsetupsdeptno = self.glsfSetupsDeptNo;
      }

      DataService.post('api/gl/asglsetup/glsfsetups', { data: glsfsetupsRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupS = data.glsfsetups;
            self.glsfSetupResults = data.glsfsetupresults;
            self.glsfSetupsCoList = data.glsfsetupscolist;
            self.glsfSetupsCono = data.glsfsetupscono;
            self.glsfSetupsListCono = data.glsfsetupslistcono;
            self.glsfSetupsDivNo = data.glsfsetupsdivno;
            self.glsfSetupsDivList = data.glsfsetupsdivlist;
            self.glsfSetupsDeptNo = data.glsfsetupsdeptno;
            self.glsfSetupsDeptList = data.glsfsetupsdeptlist;
            self.glsfSetupsSort = data.glsfsetupssort;
            self.glsfSetupsValid = data.glsfsetupsvalid;

            self.buildDropdowns();
            self.populateSelectedCompanies();

            self.buildCompanySpecificDropdowns();
            self.populateSelectedDivisions();
            self.populateSelectedDepartments();

            self.buildValidSummaryDetailTypesInfoField();
         }
      });
   };

   self.submit = function () {
      self.initializeCriteria(base.ACTION_SAVE);
      self.glsfSetupOrSave(base.ACTION_SAVE);
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Totals" type.
//It shows all of the details of the sequence.
//Alias: dtlt
app.controller('GlsfDetailTotalsCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupCriteria = {};
   self.glsfSetupT = {};
   self.glsfSetuptCol = [];
   self.glsfSetupResults = {};

   self.isDetailTotals = function () {
      return $state.is('glsf.detail-totals');
   };

   self.includesDetailTotals = function () {
      return $state.includes('glsf.detail-totals');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetuptRequest = {
         glsfsetupcriteria: self.glsfSetupCriteria,
         glsfsetupt: {}
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetuptRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetuptRequest.glsfsetuptcol = self.glsfSetuptCol;
         glsfsetuptRequest.glsfsetupt = self.glsfSetupT;
      }

      DataService.post('api/gl/asglsetup/glsfsetupt', { data: glsfsetuptRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupT = data.glsfsetupt;
            self.glsfSetuptCol = data.glsfsetuptcol;
            self.glsfSetupResults = data.glsfsetupresults;
         }
      });
   };

   self.submit = function () {
      self.initializeCriteria(base.ACTION_SAVE);
      self.glsfSetupOrSave(base.ACTION_SAVE);
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Computation" type.
//It shows all of the details of the sequence.
//Alias: dtlu
app.controller('GlsfDetailComputationCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupCriteria = {};
   self.glsfSetupU = {};
   self.glsfSetupuCol = [];
   self.glsfSetupResults = {};

   self.isDetailComputation = function () {
      return $state.is('glsf.detail-computation');
   };

   self.includesDetailComputation = function () {
      return $state.includes('glsf.detail-computation');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.glsfSetupOrSave = function (action) {
      var glsfsetupuRequest = {
         glsfsetupcriteria: self.glsfSetupCriteria,
         glsfsetupu: {}
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetupuRequest.glsfsetupcriteria = self.glsfSetupCriteria;
         glsfsetupuRequest.glsfsetupu = self.glsfSetupU;
      }

      DataService.post('api/gl/asglsetup/glsfsetupu', { data: glsfsetupuRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupU = data.glsfsetupu;
            self.glsfSetupResults = data.glsfsetupresults;
         }
      });
   };

   self.submit = function () {
      self.initializeCriteria(base.ACTION_SAVE);
      self.glsfSetupOrSave(base.ACTION_SAVE);
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user drills down from a row in the Main Master Grid for an "Horizontal Account" type.
//It shows all of the details of the sequence.
//Alias: dtlz
app.controller('GlsfDetailHorizontalAccountCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, Sasc) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupzAcct = [];
   self.glsfSetupzAcctFiltered = [];
   self.glsfSetupzCol = [];
   self.glsfSetupZ = {};
   self.isNumberOfAccountsLimit = true;

   self.isDetailHorizontalAccount = function () {
      return $state.is('glsf.detail-horizontal-account');
   };

   self.includesDetailHorizontalAccount = function () {
      return $state.includes('glsf.detail-horizontal-account');
   };

   self.initializeCriteria = function (action) {
      self.glsfSetupCriteria = {
         rectype: self.glsfDesignSummary.recType,
         glsfrowid: self.glsfDesignSummary.glsfRowid,
         action: action
      };
   };

   self.rebuildFilteredAccountsList = function () {
      self.glsfSetupzAcctFiltered = [];
      //Need to convert these to strings so we see leading zeros masking in the Account and Sub Account #
      self.glsfSetupzAcct.forEach(function (row) {
         var glsfsetupzacctDisplay = {
            itemno: row.itemno,
            begacctno: Utils.pad(row.begacctno, Sasc.glsize3),
            begsubno: Utils.pad(row.begsubno, Sasc.glsize4),
            endacctno: Utils.pad(row.endacctno, Sasc.glsize3),
            endsubno: Utils.pad(row.endsubno, Sasc.glsize4)
         };
         self.glsfSetupzAcctFiltered.push(glsfsetupzacctDisplay);
      });
   };

   self.back = function () {
      base.search(base.grid.pager);
      $state.go('^.master');
   };

   self.glsfSetupOrSave = function (action) {

      var glsfsetupzRequest = {
         glsfsetupzacct: [],
         glsfsetupzcol: [],
         glsfsetupz: {},
         glsfsetupcriteria: self.glsfSetupCriteria
      };

      //NOTE:  This call is multi-purpose.  It does both Initialize and Save.  If we're in Save mode,
      //we need to pull out what is in process for the UI and send it to the backend.
      if (action && action === base.ACTION_SAVE) {
         glsfsetupzRequest.glsfsetupzacct = self.glsfSetupzAcct;
         glsfsetupzRequest.glsfsetupzcol = self.glsfSetupzCol;
         glsfsetupzRequest.glsfsetupz = self.glsfSetupZ;
         glsfsetupzRequest.glsfsetupcriteria = self.glsfSetupCriteria;
      }

      DataService.post('api/gl/asglsetup/glsfsetupz', { data: glsfsetupzRequest, busy: true }, function (data) {
         if (data) {

            if (action && action === base.ACTION_SAVE) {
               self.back();
            }

            self.glsfSetupZ = data.glsfsetupz;
            self.glsfSetupzCol = data.glsfsetupzcol;
            self.glsfSetupzAcct = data.glsfsetupzacct;

            if (self.glsfSetupZ) {
               self.rebuildFilteredAccountsList();
            } else {
               //If they switch to the List and there isn't a collection built out, create
               //the 15 slots.
               for (var i = 1; i < 16; i++) {
                  var defaultAcctDisplay = {
                     itemno: i,
                     begacctno: Utils.pad('0', Sasc.glsize3),
                     begsubno: Utils.pad('0', Sasc.glsize4),
                     endacctno: Utils.pad('0', Sasc.glsize3),
                     endsubno: Utils.pad('0', Sasc.glsize4)
                  };
                  self.glsfSetupzAcctFiltered.push(defaultAcctDisplay);
               }
            }
         }
      });
   };

   self.deleteAccountFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.accountsGrid);
      selectedRows.forEach(function (row) {
         var index = self.glsfSetupzAcctFiltered.indexOf(row);

         //Determine the row we're working with and clear the keys from the real collection that
         //will be passed back to the backend (i.e. the unfiltered collection).  NOTE that all
         //15 slots, regardless if they are set with valid accounts get sent to/from the backend.
         var itemno = 0;
         if (self.glsfSetupzAcctFiltered[index]) {
            itemno = self.glsfSetupzAcctFiltered[index].itemno;
         }
         self.glsfSetupzAcct.forEach(function (originalRow) {
            if (originalRow.itemno === itemno) {
               originalRow.begacctno = Utils.pad('', Sasc.glsize3);
               originalRow.begsubno = Utils.pad('', Sasc.glsize4);
               originalRow.endacctno = Utils.pad('', Sasc.glsize3);
               originalRow.endsubno = Utils.pad('', Sasc.glsize4);
            }
         });
      });

      //Need to load the entire grid since we have to do some formatting on all rows.
      self.accountsGrid.loadData(self.glsfSetupzAcct);
      self.rebuildFilteredAccountsList();
   };

   self.addAccountToList = function () {
      var selectedRows = GridService.getSelectedRecords(self.accountsGrid);
      if (selectedRows && selectedRows.length === 1) {
         $state.go('.addHorizontalAccount', {
            currentColumn: selectedRows[0].itemno,
            glsfDesignSummary: self.glsfDesignSummary,
            glsfSetupzAcct: self.glsfSetupzAcct
         });
      }
   };

   self.submit = function () {
      self.initializeCriteria(base.ACTION_SAVE);
      self.glsfSetupOrSave(base.ACTION_SAVE);
   };

   //Callbacks
   self.acceptUpdatedAccountCallback = function (glsfDesignSummary, glsfSetupzAcct) {
      self.glsfDesignSummary = glsfDesignSummary;
      self.glsfSetupzAcct = glsfSetupzAcct;

      //Re-build the Filtered list for the UI to keep in sync with the collection for the CRUD.
      if (self.glsfSetupZ) {
         self.rebuildFilteredAccountsList();
      } else {
         self.glsfSetupzAcctFiltered = [];
      }
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.ACTION_FETCH);
      self.glsfSetupOrSave(base.ACTION_FETCH);
   }
});

//This controller is used when the user clicks "Edit Account" from the Detail Page for "Horizontal Account" type.
//Work off the real, unfiltered Account List when doing the Edit since we have a set number of 15 rows in collection.
//Alias: dtlzcrt
app.controller('GlsfDetailHorizontalAccountAddAcctCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, Sasc) {
   var self = this;
   var dtlz = $scope.dtlz;
   var base = $scope.base;
   self.currentColumn = $stateParams.currentColumn;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfSetupzAcct = $stateParams.glsfSetupzAcct;
   self.begAccountNumber = 0;
   self.begSubAccountNumber = 0;
   self.endAccountNumber = 0;
   self.endSubAccountNumber = 0;
   self.beginAccountSubAccount = '';
   self.endAccountSubAccount = '';

   self.initialize = function () {
      //Default the data for the current row.
      if (self.glsfSetupzAcct && self.glsfSetupzAcct.length > 0 && self.currentColumn > 0) {
         self.beginAccountSubAccount = Utils.pad(self.glsfSetupzAcct[self.currentColumn - 1].begacctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(self.glsfSetupzAcct[self.currentColumn - 1].begsubno, Sasc.glsize4);
         self.endAccountSubAccount = Utils.pad(self.glsfSetupzAcct[self.currentColumn - 1].endacctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(self.glsfSetupzAcct[self.currentColumn - 1].endsubno, Sasc.glsize4);
         self.begAccountNumber = self.glsfSetupzAcct[self.currentColumn - 1].begacctno;
         self.begSubAccountNumber = self.glsfSetupzAcct[self.currentColumn - 1].begsubno;
         self.endAccountNumber = self.glsfSetupzAcct[self.currentColumn - 1].endacctno;
         self.endSubAccountNumber = self.glsfSetupzAcct[self.currentColumn - 1].endsubno;
      }
   };

   self.buildBeginAccountSubNo = function () {
      if (self.beginAccountSubAccount) {
         DataService.get('api/gl/asglsetup/glsfparseaccount/' + self.beginAccountSubAccount, function (data) {
            if (data) {
               self.beginAccountSubAccount = Utils.pad(data.iGLAcctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(data.iGLSubno, Sasc.glsize4);
               self.begAccountNumber = data.iGLAcctno;
               self.begSubAccountNumber = data.iGLSubno;
            }
         });
      }
   };

   self.buildEndAccountSubNo = function () {
      if (self.endAccountSubAccount) {
         DataService.get('api/gl/asglsetup/glsfparseaccount/' + self.endAccountSubAccount, function (data) {
            if (data) {
               self.endAccountSubAccount = Utils.pad(data.iGLAcctno, Sasc.glsize3) + base.ACCOUNT_DELIM + Utils.pad(data.iGLSubno, Sasc.glsize4);
               self.endAccountNumber = data.iGLAcctno;
               self.endSubAccountNumber = data.iGLSubno;
            }
         });
      }
   };

   self.back = function () {
      $state.go('^', { glsfDesignSummary: self.glsfDesignSummary });
   };

   self.ok = function () {
      if (self.glsfSetupzAcct) {

         //Either one in the range is required.
         if (self.begAccountNumber === 0 && self.endAccountNumber === 0) {
            MessageService.error('global.error', 'message.account.subaccount.is.required');
            return;
         }

         //Update the current row in the collection.
         self.glsfSetupzAcct.forEach(function (data) {
            if (data.itemno === self.currentColumn) {
               data.begacctno = self.begAccountNumber;
               data.begsubno = self.begSubAccountNumber;
               data.endacctno = self.endAccountNumber;
               data.endsubno = self.endSubAccountNumber;
            }
         });

         dtlz.acceptUpdatedAccountCallback(self.glsfDesignSummary, self.glsfSetupzAcct);
         $state.go('^');
      }
   };

   self.initialize();
});

//This controller is used when the user clicks 'New' from the Main Master Grid.  It allows them to create a
//new Sequence for the Financial Statement.
//Alias: crtdtl
app.controller('GlsfCreateDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary =  $stateParams.glsfDesignSummary;
   self.glsfDesignHdr = $stateParams.glsfDesignHdr;
   self.selectedSeqNo = $stateParams.selectedSeqNo;
   self.glsfInsertCriteria = {
      rectype: self.glsfDesignSummary ? self.glsfDesignSummary.recType.toLowerCase() : base.RECTYPE_HEADING,
      insertseqno: 0,
      insertWhere: base.NEWSEQ_INSERTWHERE_AFTER,
      copyseqno: self.glsfDesignSummary ? self.glsfDesignSummary.seqno : 0,
      designname: self.glsfDesignHdr.designName,
      copyFl: false
   };

   self.back = function () {
      $state.go('^.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.current.sequence.number') + base.LABEL_DELIMITER + self.selectedSeqNo;
   };

   self.validate = function () {
      var isValid = true;
      if (self.glsfInsertCriteria.insertWhere === base.NEWSEQ_INSERTWHERE_ATLINE) {
         if (!self.glsfInsertCriteria || self.glsfInsertCriteria.insertseqno === 0) {
            MessageService.error('global.error', 'message.sequence.number.is.required');
            isValid = false;
         }
      }
      return isValid;
   };

   self.submit = function () {
      if (self.glsfInsertCriteria.insertWhere !== base.NEWSEQ_INSERTWHERE_ATLINE) {
         self.glsfInsertCriteria.insertseqno = self.selectedSeqNo;
      }

      if (self.validate()) {
         DataService.post('api/gl/asglsetup/glsfinsert', { data: self.glsfInsertCriteria, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');

            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         });
      }
   };

   self.copyFromLabel = MessageService.get('global.copy.from.sequence.number') + ' ' + self.selectedSeqNo;
});

//This controller is used when the user clicks 'Move Lines' from the top toolbar.  It allows them to move
//sequences for the Financial Statement.
//Alias: mvdtls
app.controller('GlsfMoveDetailsCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfDesignHdr = $stateParams.glsfDesignHdr;
   self.glsfMoveCriteria = {
      seqno: 0,
      glsfrowid: 0
   };
   self.toValue = 0;

   self.back = function () {
      $state.go('^.master');
   };

   self.renumberRows = function () {
      if (self.glsfDesignSummary) {
         var length = self.glsfDesignSummary.length;
         for (var i = 0; i < length; i++) {
            self.glsfDesignSummary[i].seqno = i * base.RESEQUENCE_SEQ_START + base.RESEQUENCE_SEQ_INCREMENT;
         }
      }
   };

   self.moveToFindIndex = function () {
      var foundIndex = -1;
      var length = self.glsfDesignSummary.length;
      for (var i = 0; i < length; i++) {
         if (self.glsfDesignSummary[i].seqno === self.toValue) {
            foundIndex = i;
            break;
         }
      }
      return foundIndex;
   };

   self.moveTo = function () {
      var index = self.moveToFindIndex();
      if (index >= 0) {
         self.moveToIndex(index);
         self.renumberRows();
         self.toValue = 0;
      } else {
         MessageService.error('global.error', 'message.sequence.not.found');
      }
   };

   self.moveToIndex = function (toIndex) {
      var selectedRows = GridService.getSelectedRecords(self.sequencesGrid);
      if (selectedRows && toIndex >= 0) {
         selectedRows.sort(function (a, b) {
            return a.seqno - b.seqno;
         });
         selectedRows.forEach(function (row) {
            var index = self.glsfDesignSummary.indexOf(row);
            self.glsfDesignSummary.splice(index, 1);
            self.glsfDesignSummary.splice(toIndex, 0, row);
         });
      }
   };

   //NOTE: Might be a candidate to build this into the GridService.  If this type of feature is used in another place, we need to consider that.
   //Breadcrumbs:  Doing so, we'd need to move the building of the selectedRows out of the function because it's unique to the data and
   //the sorting piece is required, and unique to having a property that's sortable (i.e. seqno).
   self.moveUp = function () {
      var selectedRows = GridService.getSelectedRecords(self.sequencesGrid);
      if (selectedRows) {
         //Sorting is required because standard SoHo controls build out the SelectedRecords in the order clicked.  If the user clicks
         //multiple rows, depending on the order you click the rows, you will get varied results on where the rows are moved to.
         selectedRows.sort(function (a, b) {
            return a.seqno - b.seqno;
         });
         var lengthSelectedRows = selectedRows.length;
         for (var i = 0 ; i <= lengthSelectedRows; i++) {
            var currentRowSave = selectedRows[i];
            var index = self.glsfDesignSummary.indexOf(currentRowSave);
            if (index > 0) {
               self.glsfDesignSummary[index] = self.glsfDesignSummary[index - 1];
               self.glsfDesignSummary[index - 1] = currentRowSave;
            }
         }
         self.renumberRows();
      }
   };

   self.moveDown = function () {
      var selectedRows = GridService.getSelectedRecords(self.sequencesGrid);
      if (selectedRows) {
         selectedRows.sort(function (a, b) {
            return a.seqno - b.seqno;
         });
         var lengthSelectedRows = selectedRows.length;
         var lengthAllRows = self.glsfDesignSummary.length;
         for (var i = (lengthSelectedRows - 1) ; i >= 0; i--) {
            var currentRowSave = selectedRows[i];
            var index = self.glsfDesignSummary.indexOf(currentRowSave);
            if (index < lengthAllRows) {
               self.glsfDesignSummary[index] = self.glsfDesignSummary[index + 1];
               self.glsfDesignSummary[index + 1] = currentRowSave;
            }
         }
         self.renumberRows();
      }
   };

   self.moveTop = function () {
      var selectedRows = GridService.getSelectedRecords(self.sequencesGrid);
      if (selectedRows) {
         selectedRows.sort(function (a, b) {
            return a.seqno - b.seqno;
         });
         selectedRows.forEach(function (row) {
            var index = self.glsfDesignSummary.indexOf(row);
            self.glsfDesignSummary.splice(index, 1);
         });

         //Need reverse order so if they select multiple rows to move, they get dropped in correctly.
         selectedRows.reverse().forEach(function (row) {
            self.glsfDesignSummary.unshift(row);
         });
         self.renumberRows();
      }
   };

   self.moveBottom = function () {
      var selectedRows = GridService.getSelectedRecords(self.sequencesGrid);
      if (selectedRows) {
         selectedRows.sort(function (a, b) {
            return a.seqno - b.seqno;
         });
         selectedRows.forEach(function (row) {
            var index = self.glsfDesignSummary.indexOf(row);
            self.glsfDesignSummary.splice(index, 1);
         });

         selectedRows.forEach(function (row) {
            self.glsfDesignSummary.push(row);
         });
         self.renumberRows();
      }
   };

   self.submit = function () {
      var glsfMoveCriteria = [];
      self.glsfDesignSummary.forEach(function (row) {
         var criteria = {
            seqno: row.seqno,
            glsfrowid: row.glsfRowid
         };
         glsfMoveCriteria.push(criteria);
      });

      DataService.post('api/gl/asglsetup/glsfmove', { data: glsfMoveCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   self.copyFromLabel = MessageService.get('global.copy.from.sequence.number') + ' ' + self.selectedSeqNo;
});

//This controller is used when the user clicks 'Duplicate Lines' from the top toolbar.  It allows them to copy sequences
//from the current Layout or even a different Layout to this currently opened layout.  This controller is used when they
//select the source information.  Hitting 'Continue' takes the user to the place where they can do the Target work.
//Alias: dupdtls
app.controller('GlsfDuplicateDetailsCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfDesignHdr = $stateParams.glsfDesignHdr;
   self.glsfDuplicateSourceList = [];
   self.glsfDuplicateTargetList = [];
   self.selectedSourceRows = [];

   self.isDuplicateDetails = function () {
      return $state.is('glsf.duplicate-details');
   };

   self.includesDuplicateDetails = function () {
      return $state.includes('glsf.duplicate-details');
   };

   self.glsfDuplicateCriteria = {
      action: base.DUPLICATE_FETCH_ALL,
      sourceName: self.glsfDesignHdr.designName,
      targetName: self.glsfDesignHdr.designName
   };

   self.back = function () {
      $state.go('^.master');
   };

   self.initializeCriteria = function (action) {
      self.glsfDuplicateCriteria = {
         action: action,
         sourceName: self.glsfDuplicateCriteria.sourceName,
         targetName: self.glsfDuplicateCriteria.targetName
      };
   };

   //Since the source design name changed, rebuild the Source list.
   self.selectedDesignNameChanged = function () {
      self.initializeCriteria(base.DUPLICATE_FETCH_SOURCE);
      self.glsfDuplicate(base.DUPLICATE_FETCH_SOURCE);
   };

   self.glsfDuplicate = function (action) {

      var glsfduplicateRequest = {
         glsfduplicatetargetlist: self.glsfDuplicateTargetList,
         glsfduplicatecriteria: self.glsfDuplicateCriteria
      };

      DataService.post('api/gl/asglsetup/glsfduplicate', { data: glsfduplicateRequest, busy: true }, function (data) {
         if (data) {
            self.glsfDuplicateSourceList = data.glsfduplicatesourcelist;
            self.glsfDuplicateTargetList = data.glsfduplicatetargetlist;
         }
      });
   };

   self.continueWithDuplicate = function () {
      if (base.glsfDesignHdr) {
         self.selectedSourceRows = GridService.getSelectedRecords(self.sequencesGrid);

         $state.go('.duplicate-finish', {
            glsfDesignSummary: self.glsfDesignSummary,
            glsfDesignHdr: self.glsfDesignHdr,
            selectedSourceRows: self.selectedSourceRows,
            glsfDuplicateCriteria: self.glsfDuplicateCriteria,
            glsfDuplicateSourceList: self.glsfDuplicateSourceList,
            glsfDuplicateTargetList: self.glsfDuplicateTargetList
         });
      }
   };

   if (self.glsfDesignSummary) {
      self.initializeCriteria(base.DUPLICATE_FETCH_ALL);
      self.glsfDuplicate(base.DUPLICATE_FETCH_ALL);
   }
});

//This controller is used when the user clicks 'Continue' from the 'Duplicate Lines' View.  This is a sub-view
//from that view where the user can select the Target to copy to and do the final Submit.
//Alias: dupdtlsfnsh
app.controller('GlsfDuplicateDetailsFinishCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.glsfDesignSummary = $stateParams.glsfDesignSummary;
   self.glsfDesignHdr = $stateParams.glsfDesignHdr;
   self.selectedSourceRows = $stateParams.selectedSourceRows;
   self.glsfDuplicateCriteria = $stateParams.glsfDuplicateCriteria;
   self.glsfDuplicateSourceList = $stateParams.glsfDuplicateSourceList;
   self.glsfDuplicateTargetList = $stateParams.glsfDuplicateTargetList;
   self.numberOfCopies = 1;
   self.newSequenceLocation = base.DUPLICATE_NEW_SEQUENCE_AFTER;
   self.toValue = 0;
   self.copyFromSequences = '';

   self.back = function () {
      $state.go('^', {glsfDesignSummary: self.glsfDesignSummary, glsfDesignHdr: self.glsfDesignHdr});
   };

   self.buildCopyFromSequences = function () {
      if (self.selectedSourceRows) {
         //Build the string out in the right order, since the user can click in any order.
         self.selectedSourceRows.sort(function (a, b) {
            return a.seqno - b.seqno;
         });
         self.selectedSourceRows.forEach(function (row) {
            self.copyFromSequences += row.seqno + ' ';
         });
      }
   };

   self.renumberRows = function () {
      if (self.glsfDuplicateTargetList) {
         var length = self.glsfDuplicateTargetList.length;
         for (var i = 0; i < length; i++) {
            self.glsfDuplicateTargetList[i].seqno = i * base.RESEQUENCE_SEQ_START + base.RESEQUENCE_SEQ_INCREMENT;
         }
      }
   };

   self.insertFindIndex = function () {
      var foundIndex = -1;
      var length = self.glsfDuplicateTargetList.length;
      for (var i = 0; i < length; i++) {
         if (self.glsfDuplicateTargetList[i].seqno === self.toValue) {
            foundIndex = i;
            break;
         }
      }
      return foundIndex;
   };

   self.insertTo = function () {
      var index = self.insertFindIndex();
      if (index >= 0) {
         self.insertToIndex(index);
         self.renumberRows();
      } else {
         MessageService.error('global.error', 'message.sequence.not.found');
      }
   };

   self.insertToIndex = function (toIndex) {
      var insertIndex = toIndex;
      //If they want it after, then we need to bump it up from the one that was found.
      if (self.newSequenceLocation === base.DUPLICATE_NEW_SEQUENCE_AFTER) {
         insertIndex++;
      }

      if (self.selectedSourceRows && toIndex >= 0) {
         self.selectedSourceRows.sort(function (a, b) {
            return a.seqno - b.seqno;
         });

         //NOTE: Reverse order so they get dropped in the same order as the Source order.
         self.selectedSourceRows.reverse();

         for (var i = 1; i <= self.numberOfCopies; i++) {
            self.selectedSourceRows.forEach(function (row) {
               var newRow = {
                  seqno: row.seqno,
                  origseqno: row.glsfRowid.length !== 0 ? row.seqno : 0,
                  recType: row.recType,
                  recDesc: row.recDesc,
                  comment: row.comment,
                  glsfRowid: row.glsfRowid,
                  userfield: row.userfield
               };
               self.glsfDuplicateTargetList.splice(insertIndex, 0, newRow);
            });
         }
      }
   };

   self.glsfDuplicate = function (action) {
      self.insertTo();

      self.glsfDuplicateCriteria.action = base.DUPLICATE_SAVE;

      var glsfduplicateRequest = {
         glsfduplicatetargetlist: self.glsfDuplicateTargetList,
         glsfduplicatecriteria: self.glsfDuplicateCriteria
      };

      if (action && action === base.DUPLICATE_SAVE) {
         glsfduplicateRequest.glsfduplicatetargetlist = self.glsfDuplicateTargetList;
         glsfduplicateRequest.glsfduplicatecriteria = self.glsfDuplicateCriteria;
      }

      //NOTE:  This call is multi-purpose.  It does both Fetch and Save.
      DataService.post('api/gl/asglsetup/glsfduplicate', { data: glsfduplicateRequest, busy: true }, function () {
         $state.go('glsf.master', { refreshSearch: true }, { reload: 'glsf.master' });
      });
   };

   self.submit = function () {
      //Get the target Sequence selected; that's where we'll be inserting the new row(s).  (They can only select one target spot.
      var selectedRows = GridService.getSelectedRecords(self.targetSequencesGrid);
      if (selectedRows) {
         self.toValue = selectedRows[0].seqno;
         self.glsfDuplicate(base.DUPLICATE_SAVE);
      }
   };

   self.buildCopyFromSequences();
});
