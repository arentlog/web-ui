'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pi',
      menuFn: 'pisi',
      dataPath: 'api/sl/slsi',
      searchMethod: 'POST',
      searchPath: 'api/sl/slsi/getslsilistbyimptypebegins',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'pi/pisi/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'pi/pisi/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sl/asslsetup/slimportdefcopy',
      detailSubTitle: [
         { label: null, value: 'imptype' },
         { label: null, value: 'impdescrip' }
      ],
      recentlyVisited: {
         title: { label: 'global.import.type', value: 'imptype' },
         description: { label: 'global.description', value: 'impdescrip' }
      }
   });
});

app.service('PisiService', function ($state, DataService, GridService, MessageService, Utils, Sasc) {

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      // Load the inital data values needed in the copy screen
      request.fromimptype = stateParams.object.imptype;
      request.toimptype = stateParams.object.imptype;
      request.impdescrip = stateParams.object.impdescrip;
      self.fromimpdescrip = stateParams.object.impdescrip;
   };

   this.extendCreateController = function (self, base, pisi, scope) {

      // Load initial values needed for new record creation
      self.pisi.filetype = 'F';
      self.pisi.naedlength = 9;
      self.pisi.pdscpriceonty = 'B';
      self.pisi.pdsvbuytype = 'Q';
      self.pisi.sorttype = 'P';
      self.pisi.supersedefl = true;
   };

   this.extendMasterController = function (self, base, scope) {

      self.fileTypeFormatter = function (row, cell, value, column, item) {

         if (value) {
            if (value.toLowerCase() === 'c') {
               return MessageService.get('global.custom');
            } else if (value.toLowerCase() === 'd') {
               return MessageService.get('global.delimited');
            } else if (value.toLowerCase() === 'f') {
               return MessageService.get('global.fixed');
            } else if (value.toLowerCase() === 'i') {
               return MessageService.get('global.i2.pricing');
            } else {
               return MessageService.get('global.trade.service');
            }

         } else {
            return value;
         }

      };
   };

   this.extendDetailController = function (self, base, pisi, scope) {
      var i = 0;
      var str = '';

      // UPC - Load UPC data from SASC
      self.upc1Label = Sasc.icupclabel1;
      self.upc2Label = Sasc.icupclabel2;
      self.upc3Label = MessageService.get('global.vendor');
      self.upc4Label = MessageService.get('global.product');
      self.upc5Label = Sasc.icupclabel5;
      self.upc6Label = Sasc.icupclabel6;
      self.upc1Length = Sasc.icupclength1;
      self.upc2Length = Sasc.icupclength2;
      self.upc3Length = Sasc.icupclength3;
      self.upc4Length = Sasc.icupclength4;
      self.upc5Length = Sasc.icupclength5;
      self.upc6Length = Sasc.icupclength6;

      // Once the record is in scope, load values from the record
      pisi.$promise.then(function () {

         self.changeFileType();

      });

      self.changeFileType = function () {

         if (pisi.filetype) {

            // Trade Service and I2 file types have pre-defined layouts.
            // Force the values into the fields.
            switch (pisi.filetype.toLowerCase()) {

               case 'i':

                  // Load I2 specific values, zero out all other fields in case the user has changed the file type
                  // Don't need to clear the length fields since they will never be used when importing I2 data
                  pisi.sldelim = 'T';
                  pisi.importproc = '';

                  for (i = 0; i < 6; i++) {
                     pisi['bupcpno' + (i + 1)] = 0;
                  }

                  pisi.bvendcd = 4;
                  pisi.bupcpno3 = 4;
                  pisi.bupcpno4 = 5;
                  pisi.bprod = 22;
                  pisi.bdescrip1 = 27;
                  pisi.bdiscount = 29;
                  pisi.bspcunit = 39;
                  pisi.bunit = 40;
                  pisi.blist = 46;
                  pisi.bcost = 51;
                  pisi.bweight = 55;
                  pisi.bmsdsfl = 60;
                  pisi.bmsdsno = 62;

                  pisi.bcubes = 0;
                  pisi.bdescrip2 = 0;
                  pisi.blinecd = 0;
                  pisi.bnotes = 0;
                  pisi.brebatecost = 0;
                  pisi.brebatety = 0;
                  pisi.brebsubty = 0;
                  pisi.bsupersede = 0;
                  pisi.bunitmult = 0;
                  pisi.bunitstnd = 0;
                  pisi.bvendate = 0;
                  pisi.bwhse = 0;

                  for (i = 0; i < 4; i++) {
                     pisi['bcrossref' + (i + 1)] = 0;
                  }

                  for (i = 0; i < 5; i++) {
                     pisi['buser' + (i + 1)] = 0;
                  }

                  for (i = 0; i < 9; i++) {
                     pisi['bqtybrk' + (i + 1)] = 0;
                     pisi['bpricebrk' + (i + 1)] = 0;
                     pisi['bcostbrk' + (i + 1)] = 0;
                  }

                  pisi.bqtybrk1 = 35;
                  pisi.bqtybrk2 = 36;
                  pisi.bqtybrk3 = 37;
                  pisi.bqtybrk4 = 38;
                  pisi.bpricebrk1 = 47;
                  pisi.bpricebrk2 = 48;
                  pisi.bpricebrk3 = 49;
                  pisi.bpricebrk4 = 50;

                  self.itemStatus = 3;
                  self.unspscCode = 8;
                  self.zone = 10;
                  self.industryClass = 13;
                  self.replProd = 15;
                  self.minOrderQty = 21;
                  self.invoiceDescrip = 27;
                  self.priceGroup2 = 28;
                  self.priceGroup3 = 31;
                  self.costUOM = 40;
                  self.priceUOM = 40;
                  self.minOrderUOM = 40;
                  self.priceSheet = 42;
                  self.priceEffectDt = 44;
                  self.priceExpireDt = 45;
                  self.minOrderMultQty = 58;
                  self.minOrderMultUOM = 59;
                  self.priceGroup1 = 63;
                  self.priceBreakTy = 0;
                  self.alternateClass = 0;
                  self.optOrderMultQty = 0;
                  self.optOrderMultUOM = 0;
                  self.itemStatusDt = 0;
                  self.replUPC = 0;
                  self.sellerClass = 0;
                  self.sellerSubClass = 0;

                  break;

               case 't':

                  // Load Trade Service specific values, zero out all other fields in case the user has changed the file type
                  // Need to clear the length fields since they are used when importing Trade Service data
                  pisi.sldelim = '';
                  pisi.importproc = '';

                  for (i = 0; i < 6; i++) {
                     pisi['bupcpno' + (i + 1)] = 0;
                     pisi['lupcpno' + (i + 1)] = 0;
                  }

                  if (pisi.naedlength === 9) {
                     pisi.bvendcd = 3;
                     pisi.lvendcd = 4;
                     pisi.bupcpno3 = 3;
                     pisi.lupcpno3 = 4;
                  } else {
                     pisi.bvendcd = 1;
                     pisi.lvendcd = 6;
                     pisi.bupcpno3 = 1;
                     pisi.lupcpno3 = 6;
                  }
                  pisi.bupcpno4 = 7;
                  pisi.lupcpno4 = 5;
                  pisi.bline = 12;
                  pisi.lline = 4;
                  pisi.bprod = 22;
                  pisi.lprod = 35;
                  pisi.bweight = 58;
                  pisi.lweight = 4;
                  pisi.bdiscount = 63;
                  pisi.ldiscount = 2;
                  pisi.bunit = 79;
                  pisi.lunit = 1;
                  pisi.bspcunit = 79;
                  pisi.lspcunit = 2;
                  pisi.blist = 83;
                  pisi.llist = 6;
                  pisi.bcost = 115;
                  pisi.lcost = 6;

                  pisi.bcubes = 0;
                  pisi.lcubes = 0;
                  pisi.bdescrip1 = 0;
                  pisi.ldescrip1 = 0;
                  pisi.bdescrip2 = 0;
                  pisi.ldescrip2 = 0;
                  pisi.bmsdsfl = 0;
                  pisi.lmsdsfl = 0;
                  pisi.bmsdsno = 0;
                  pisi.lmsdsno = 0;
                  pisi.bnotes = 0;
                  pisi.lnotes = 0;
                  pisi.brebatecost = 0;
                  pisi.lrebatecost = 0;
                  pisi.brebatety = 0;
                  pisi.lrebatety = 0;
                  pisi.brebsubty = 0;
                  pisi.lrebsubty = 0;
                  pisi.bsupersede = 0;
                  pisi.lsupersede = 0;
                  pisi.bunitmult = 0;
                  pisi.lunitmult = 0;
                  pisi.bunitstnd = 0;
                  pisi.lunitstnd = 0;
                  pisi.bvendate = 0;
                  pisi.lvendate = 0;
                  pisi.bwhse = 0;
                  pisi.lwhse = 0;

                  for (i = 0; i < 4; i++) {
                     pisi['bcrossref' + (i + 1)] = 0;
                     pisi['lcrossref' + (i + 1)] = 0;
                  }

                  for (i = 0; i < 5; i++) {
                     pisi['buser' + (i + 1)] = 0;
                     pisi['luser' + (i + 1)] = 0;
                  }

                  for (i = 0; i < 9; i++) {
                     pisi['bqtybrk' + (i + 1)] = 0;
                     pisi['bpricebrk' + (i + 1)] = 0;
                     pisi['bcostbrk' + (i + 1)] = 0;
                     pisi['lqtybrk' + (i + 1)] = 0;
                     pisi['lpricebrk' + (i + 1)] = 0;
                     pisi['lcostbrk' + (i + 1)] = 0;
                  }

                  pisi.bqtybrk1 = 67;
                  pisi.lqtybrk1 = 4;
                  pisi.bqtybrk2 = 73;
                  pisi.lqtybrk2 = 4;
                  pisi.bpricebrk1 = 91;
                  pisi.lpricebrk1 = 6;
                  pisi.bpricebrk2 = 99;
                  pisi.lpricebrk2 = 6;
                  pisi.bpricebrk3 = 107;
                  pisi.lpricebrk3 = 6;

                  break;

               case 'd':
                  pisi.importproc = '';

                  // Get the values from the IDW Data Postion string when working with a delmited import
                  self.priceSheet = parseInt(pisi.idwdatapos.substring(0, 4), 10);
                  self.priceEffectDt = parseInt(pisi.idwdatapos.substring(4, 8), 10);
                  self.priceExpireDt = parseInt(pisi.idwdatapos.substring(8, 12), 10);
                  self.unspscCode = parseInt(pisi.idwdatapos.substring(12, 16), 10);
                  self.minOrderQty = parseInt(pisi.idwdatapos.substring(16, 20), 10);
                  self.minOrderUOM = parseInt(pisi.idwdatapos.substring(20, 24), 10);
                  self.minOrderMultQty = parseInt(pisi.idwdatapos.substring(24, 28), 10);
                  self.minOrderMultUOM = parseInt(pisi.idwdatapos.substring(28, 32), 10);
                  self.optOrderMultQty = parseInt(pisi.idwdatapos.substring(32, 36), 10);
                  self.optOrderMultUOM = parseInt(pisi.idwdatapos.substring(36, 40), 10);
                  self.priceBreakTy = parseInt(pisi.idwdatapos.substring(40, 44), 10);
                  self.priceUOM = parseInt(pisi.idwdatapos.substring(44, 48), 10);
                  self.costUOM = parseInt(pisi.idwdatapos.substring(48, 52), 10);
                  self.zone = parseInt(pisi.idwdatapos.substring(52, 56), 10);
                  self.itemStatus = parseInt(pisi.idwdatapos.substring(56, 60), 10);
                  self.itemStatusDt = parseInt(pisi.idwdatapos.substring(60, 64), 10);
                  self.priceGroup1 = parseInt(pisi.idwdatapos.substring(64, 68), 10);
                  self.priceGroup2 = parseInt(pisi.idwdatapos.substring(68, 72), 10);
                  self.priceGroup3 = parseInt(pisi.idwdatapos.substring(72, 76), 10);
                  self.replProd = parseInt(pisi.idwdatapos.substring(76, 80), 10);
                  self.replUPC = parseInt(pisi.idwdatapos.substring(80, 84), 10);
                  self.industryClass = parseInt(pisi.idwdatapos.substring(84, 88), 10);
                  self.alternateClass = parseInt(pisi.idwdatapos.substring(88, 92), 10);
                  self.sellerClass = parseInt(pisi.idwdatapos.substring(92, 96), 10);
                  self.invoiceDescrip = parseInt(pisi.idwdatapos.substring(96, 100), 10);
                  self.sellerSubClass = parseInt(pisi.idwdatapos.substring(100, 104), 10);

                  // Load the data to be displayed in the Packages grid
                  self.packageInfo = [
                     { containerCode: parseInt(pisi.idwdatapos.substring(104, 108), 10), packDesc: parseInt(pisi.idwdatapos.substring(108, 112), 10), packUOM: parseInt(pisi.idwdatapos.substring(112, 116), 10), totalUnits: parseInt(pisi.idwdatapos.substring(116, 120), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(120, 124), 10), lowerCode: parseInt(pisi.idwdatapos.substring(124, 128), 10), subPacks: parseInt(pisi.idwdatapos.substring(128, 132), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(132, 136), 10), packDesc: parseInt(pisi.idwdatapos.substring(136, 140), 10), packUOM: parseInt(pisi.idwdatapos.substring(140, 144), 10), totalUnits: parseInt(pisi.idwdatapos.substring(144, 148), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(148, 152), 10), lowerCode: parseInt(pisi.idwdatapos.substring(152, 156), 10), subPacks: parseInt(pisi.idwdatapos.substring(156, 160), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(160, 164), 10), packDesc: parseInt(pisi.idwdatapos.substring(164, 168), 10), packUOM: parseInt(pisi.idwdatapos.substring(168, 172), 10), totalUnits: parseInt(pisi.idwdatapos.substring(172, 176), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(176, 180), 10), lowerCode: parseInt(pisi.idwdatapos.substring(180, 184), 10), subPacks: parseInt(pisi.idwdatapos.substring(184, 188), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(188, 192), 10), packDesc: parseInt(pisi.idwdatapos.substring(192, 196), 10), packUOM: parseInt(pisi.idwdatapos.substring(196, 200), 10), totalUnits: parseInt(pisi.idwdatapos.substring(200, 204), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(204, 208), 10), lowerCode: parseInt(pisi.idwdatapos.substring(208, 212), 10), subPacks: parseInt(pisi.idwdatapos.substring(212, 216), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(216, 220), 10), packDesc: parseInt(pisi.idwdatapos.substring(220, 224), 10), packUOM: parseInt(pisi.idwdatapos.substring(224, 228), 10), totalUnits: parseInt(pisi.idwdatapos.substring(228, 232), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(232, 236), 10), lowerCode: parseInt(pisi.idwdatapos.substring(236, 240), 10), subPacks: parseInt(pisi.idwdatapos.substring(240, 244), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(244, 248), 10), packDesc: parseInt(pisi.idwdatapos.substring(248, 252), 10), packUOM: parseInt(pisi.idwdatapos.substring(252, 256), 10), totalUnits: parseInt(pisi.idwdatapos.substring(256, 260), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(260, 264), 10), lowerCode: parseInt(pisi.idwdatapos.substring(264, 268), 10), subPacks: parseInt(pisi.idwdatapos.substring(268, 272), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(272, 276), 10), packDesc: parseInt(pisi.idwdatapos.substring(276, 280), 10), packUOM: parseInt(pisi.idwdatapos.substring(280, 284), 10), totalUnits: parseInt(pisi.idwdatapos.substring(284, 288), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(288, 292), 10), lowerCode: parseInt(pisi.idwdatapos.substring(292, 296), 10), subPacks: parseInt(pisi.idwdatapos.substring(296, 300), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(300, 304), 10), packDesc: parseInt(pisi.idwdatapos.substring(304, 308), 10), packUOM: parseInt(pisi.idwdatapos.substring(308, 312), 10), totalUnits: parseInt(pisi.idwdatapos.substring(312, 316), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(316, 320), 10), lowerCode: parseInt(pisi.idwdatapos.substring(320, 324), 10), subPacks: parseInt(pisi.idwdatapos.substring(324, 328), 10) },
                     { containerCode: parseInt(pisi.idwdatapos.substring(328, 332), 10), packDesc: parseInt(pisi.idwdatapos.substring(332, 336), 10), packUOM: parseInt(pisi.idwdatapos.substring(336, 340), 10), totalUnits: parseInt(pisi.idwdatapos.substring(340, 344), 10), lowestUOM: parseInt(pisi.idwdatapos.substring(344, 348), 10), lowerCode: parseInt(pisi.idwdatapos.substring(348, 352), 10), subPacks: parseInt(pisi.idwdatapos.substring(352, 356), 10) }
                  ];

                  break;

                  // For either Fixed Length import types or Custom import types, the user will have access to all the fields on the screen.
                  // If they change the file type to be Fixed or Custom, it is the user's responsibility to clear any data that may have been held from the previous file type
                  // The only data we are clearing programatically is the IDW data since the user will not have access to those tabs
               case 'f':
                  pisi.sldelim = '';
                  pisi.importproc = '';
                  pisi.idwdatapos = new Array(357).join('0');

                  break;

               case 'c':
                  pisi.sldelim = '';
                  pisi.idwdatapos = new Array(357).join('0');

                  break;
            }

         }

         //User Hook (do not rename)
         if (self.changeFileTypeContinue) {
            self.changeFileTypeContinue();
         }
      };

      self.changeLength = function () {

         if (pisi.filetype.toLowerCase() === 't') {

            if (pisi.naedlength === 9) {
               pisi.bvendcd = 3;
               pisi.lvendcd = 4;
               pisi.bupcpno3 = 3;
               pisi.lupcpno3 = 4;
            } else {
               pisi.bvendcd = 1;
               pisi.lvendcd = 6;
               pisi.bupcpno3 = 1;
               pisi.lupcpno3 = 6;
            }

         }
      };

      self.customSubmitContinue = function () {
         self.submit();
      };

      self.customSubmit = function () {

         // Before saving the record, rebuild the IDW data string
         str = Utils.pad(self.priceSheet, 4);
         str += Utils.pad(self.priceEffectDt, 4);
         str += Utils.pad(self.priceExpireDt, 4);
         str += Utils.pad(self.unspscCode, 4);
         str += Utils.pad(self.minOrderQty, 4);
         str += Utils.pad(self.minOrderUOM, 4);
         str += Utils.pad(self.minOrderMultQty, 4);
         str += Utils.pad(self.minOrderMultUOM, 4);
         str += Utils.pad(self.optOrderMultQty, 4);
         str += Utils.pad(self.optOrderMultUOM, 4);
         str += Utils.pad(self.priceBreakTy, 4);
         str += Utils.pad(self.priceUOM, 4);
         str += Utils.pad(self.costUOM, 4);
         str += Utils.pad(self.zone, 4);
         str += Utils.pad(self.itemStatus, 4);
         str += Utils.pad(self.itemStatusDt, 4);
         str += Utils.pad(self.priceGroup1, 4);
         str += Utils.pad(self.priceGroup2, 4);
         str += Utils.pad(self.priceGroup3, 4);
         str += Utils.pad(self.replProd, 4);
         str += Utils.pad(self.replUPC, 4);
         str += Utils.pad(self.industryClass, 4);
         str += Utils.pad(self.alternateClass, 4);
         str += Utils.pad(self.sellerClass, 4);
         str += Utils.pad(self.invoiceDescrip, 4);
         str += Utils.pad(self.sellerSubClass, 4);

         // Get the data from the grid on the detail screen and load it into the string
         if (self.packageInfo) {

            for (i = 0; i < 9; i++) {
               var obj = self.packageInfo[i];

               str += Utils.pad(obj.containerCode, 4) + Utils.pad(obj.packDesc, 4) + Utils.pad(obj.packUOM, 4) + Utils.pad(obj.totalUnits, 4) + Utils.pad(obj.lowestUOM, 4) + Utils.pad(obj.lowerCode, 4) + Utils.pad(obj.subPacks, 4);

            }

         } else {

            str += new Array(253).join('0');

         }

         pisi.idwdatapos = str;

         // Clear the delimiter if not a delimited file type
         if (pisi.filetype.toLowerCase() !== 'd') {
            pisi.sldelim = '';
         }

         // Force the delimiter to be a tab if an I2 file type
         if (pisi.filetype.toLowerCase() === 'i') {
            pisi.sldelim = 'T';
         }

         // Clear the import procedure if not a custom file type
         if (pisi.filetype.toLowerCase() !== 'c') {
            pisi.importproc = '';
         }

         // Handle both edit and create.  If in Edit mode, it would have already been set.
         if (pisi.slrecno === 0) {
            DataService.get('api/sl/asslsetup/slsigetlastrecno', { busy: true }, function (data) {
               if (data) {
                  pisi.slrecno = data + 1;
               }
               self.customSubmitContinue();
            });
         } else {
            self.customSubmitContinue();
         }
      };

   };

});