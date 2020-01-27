'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pi',
      menuFn: 'pisp',
      dataPath: 'api/sl/slsp',
      resultsRowIdField: 'slspRowidStr', //WebHandler call requires Rowid as a String.
      recordName: 'pisp',
      searchDefaultWarehouseField: 'whse',
      createStateView: 'pi/pisp/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'pi/pisp/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sl/asslsetup/slpricecostmultcopy',
      detailSubTitle: [
         { label: 'global.import.type', value: 'imptype' },
         { label: 'global.supplier.group', value: 'slgroup' },
         { label: 'global.warehouse', value: 'whse' }
      ],
      recentlyVisited: {
         title: { label: 'global.import.type', value: 'imptype' },
         description: [{ label: 'global.supplier.group', value: 'slgroup' }, { label: 'global.warehouse', value: 'whse' }]
      }
   });
});

app.service('PispService', function ($state, ConfigService, DataService, GridService, MessageService, Utils, Sasoo) {    //ignore jslint

   //This function overrides the standard Search with our custom version.
   this.search = function (self, criteria, scope, callback) {
      var requestCriteria = {
         imptype: criteria.imptype,
         slgroup: criteria.slgroup,
         whse: criteria.whse,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      DataService.post('/web/api/sl/slspgetlist', { data: requestCriteria, busy: true }, function (data) {
         if (data && data.ttblslspresults) {
            callback(data.ttblslspresults);
         } else {
            //Important so we don't get residual data from previous searches if no records are returned.
            callback([]);
         }
      });
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      // Load the inital data values needed in the copy screen
      request.fromslgroup = stateParams.object.slgroup;
      request.toslgroup = stateParams.object.slgroup;
      request.fromwhse = stateParams.object.whse;
      request.towhse = stateParams.object.whse;
      request.imptype = stateParams.object.imptype;
   };

   this.extendCreateController = function (self, base, pisp, scope) {  //ignore jslint

      // Load initial values needed for new record creation
      self.pisp.autopricecd = 'i';
      self.pisp.barcodecd = 'i';
      self.pisp.calcorder1 = 1;
      self.pisp.calcorder2 = 2;
      self.pisp.calcorder3 = 3;
      self.pisp.calcorder4 = 4;
      self.pisp.calcorder5 = 5;
      self.pisp.ccd = 'i';
      self.pisp.cpricemt1 = 1;
      self.pisp.cpricemt2 = 1;
      self.pisp.cpricemt3 = 1;
      self.pisp.cpricemt4 = 1;
      self.pisp.cpricemt5 = 1;
      self.pisp.cpricemt6 = 1;
      self.pisp.cpricemt7 = 1;
      self.pisp.cpricemt8 = 1;
      self.pisp.cpricemt9 = 1;
      self.pisp.cpround1 = 'n';
      self.pisp.cpround2 = 'n';
      self.pisp.cpround3 = 'n';
      self.pisp.cpround4 = 'n';
      self.pisp.cpround5 = 'n';
      self.pisp.cpround6 = 'n';
      self.pisp.cpround7 = 'n';
      self.pisp.cpround8 = 'n';
      self.pisp.cpround9 = 'n';
      self.pisp.cptarget1 = 5;
      self.pisp.cptarget2 = 5;
      self.pisp.cptarget3 = 5;
      self.pisp.cptarget4 = 5;
      self.pisp.cptarget5 = 5;
      self.pisp.deletecd = 'u';
      self.pisp.descripcd1 = 'u';
      self.pisp.descripcd2 = 'u';
      self.pisp.descrip3cd = 'u';
      self.pisp.detailcd = 'n';
      self.pisp.discountcd = 'u';
      self.pisp.holdzerofl1 = true;
      self.pisp.holdzerofl2 = true;
      self.pisp.holdzerofl3 = true;
      self.pisp.holdzerofl4 = true;
      self.pisp.holdzerofl5 = true;
      self.pisp.interchgcd = 'i';
      self.pisp.msdscd = 'u';
      self.pisp.notety = 'i';
      self.pisp.noteupdtcd = 'n';
      self.pisp.pricemult1 = 1;
      self.pisp.pricemult2 = 1;
      self.pisp.pricemult3 = 1;
      self.pisp.pricemult4 = 1;
      self.pisp.pricemult5 = 1;
      self.pisp.prodcd = 'u';
      self.pisp.prodlinecd = 'u';
      self.pisp.pround1 = 'n';
      self.pisp.pround2 = 'n';
      self.pisp.pround3 = 'n';
      self.pisp.pround4 = 'n';
      self.pisp.pround5 = 'n';
      self.pisp.ptarget1 = 5;
      self.pisp.ptarget2 = 5;
      self.pisp.ptarget3 = 5;
      self.pisp.ptarget4 = 5;
      self.pisp.ptarget5 = 5;
      self.pisp.qtybrkcd = 'u';
      self.pisp.supercd = 'u';
      self.pisp.unitcd = 'u';
      self.pisp.upccd = 'u';
      self.pisp.updatecd = 'u';
      self.pisp.vbuytype = 'q';
      self.pisp.vcd = 'i';
      self.pisp.vendpartcd = 'i';
      self.pisp.vpricemt1 = 1;
      self.pisp.vpricemt2 = 1;
      self.pisp.vpricemt3 = 1;
      self.pisp.vpricemt4 = 1;
      self.pisp.vpricemt5 = 1;
      self.pisp.vpricemt6 = 1;
      self.pisp.vpricemt7 = 1;
      self.pisp.vpricemt8 = 1;
      self.pisp.vpricemt9 = 1;
      self.pisp.vpround1 = 'n';
      self.pisp.vpround2 = 'n';
      self.pisp.vpround3 = 'n';
      self.pisp.vpround4 = 'n';
      self.pisp.vpround5 = 'n';
      self.pisp.vpround6 = 'n';
      self.pisp.vpround7 = 'n';
      self.pisp.vpround8 = 'n';
      self.pisp.vpround9 = 'n';
      self.pisp.vptarget1 = 5;
      self.pisp.vptarget2 = 5;
      self.pisp.vptarget3 = 5;
      self.pisp.vptarget4 = 5;
      self.pisp.vptarget5 = 5;
      self.pisp.weightcd = 'u';
      self.pisp.whse = '';
   };

   this.extendDetailController = function (self, base, pisp, scope) {    //ignore jslint

      pisp.$promise.then(function () {

         // Populate the data for the grid
         self.multipliers = [
            { pricecost: MessageService.get('global.base.price'), calcorder: pisp.calcorder1, calccd: pisp.calccd1.toLowerCase(), pricemult: pisp.pricemult1, addon: pisp.addon1, pround: pisp.pround1.toLowerCase(), ptarget: pisp.ptarget1, pexactrnd: pisp.pexactrnd1, holdzero: pisp.holdzerofl1, holddeclim: pisp.holddeclim1, holdinclim: pisp.holdinclim1 },
            { pricecost: MessageService.get('global.list.price'), calcorder: pisp.calcorder2, calccd: pisp.calccd2.toLowerCase(), pricemult: pisp.pricemult2, addon: pisp.addon2, pround: pisp.pround2.toLowerCase(), ptarget: pisp.ptarget2, pexactrnd: pisp.pexactrnd2, holdzero: pisp.holdzerofl2, holddeclim: pisp.holddeclim2, holdinclim: pisp.holdinclim2 },
            { pricecost: MessageService.get('global.replacement.cost'), calcorder: pisp.calcorder3, calccd: pisp.calccd3.toLowerCase(), pricemult: pisp.pricemult3, addon: pisp.addon3, pround: pisp.pround3.toLowerCase(), ptarget: pisp.ptarget3, pexactrnd: pisp.pexactrnd3, holdzero: pisp.holdzerofl3, holddeclim: pisp.holddeclim3, holdinclim: pisp.holdinclim3 },
            { pricecost: MessageService.get('global.standard.cost'), calcorder: pisp.calcorder4, calccd: pisp.calccd4.toLowerCase(), pricemult: pisp.pricemult4, addon: pisp.addon4, pround: pisp.pround4.toLowerCase(), ptarget: pisp.ptarget4, pexactrnd: pisp.pexactrnd4, holdzero: pisp.holdzerofl4, holddeclim: pisp.holddeclim4, holdinclim: pisp.holdinclim4 },
            { pricecost: MessageService.get('global.last.foreign.cost'), calcorder: pisp.calcorder5, calccd: pisp.calccd5.toLowerCase(), pricemult: pisp.pricemult5, addon: pisp.addon5, pround: pisp.pround5.toLowerCase(), ptarget: pisp.ptarget5, pexactrnd: pisp.pexactrnd5, holdzero: pisp.holdzerofl5, holddeclim: pisp.holddeclim5, holdinclim: pisp.holdinclim5 }
         ];

      });

      self.targetFormatter = function (row, cell, value, column, item) {   //ignore jslint
         if (value || value === 0) {

            if (value === 0) {
               return MessageService.get('global.no.change');
            } else if (value === 1) {
               return MessageService.get('number.100');
            } else if (value === 2) {
               return MessageService.get('number.10');
            } else if (value === 3) {
               return MessageService.get('number.1');
            } else if (value === 4) {
               return MessageService.get('number.0.1');
            } else if (value === 5) {
               return MessageService.get('number.0.01');
            } else if (value === 6) {
               return MessageService.get('number.0.001');
            } else if (value === 7) {
               return MessageService.get('number.0.0001');
            } else if (value === 8) {
               return MessageService.get('number.0.00001');
            } else {
               return MessageService.get('global.user');
            }

         } else {
            return value;
         }
      };

      self.customSubmit = function () {

         // Load data from grid back into the table
         for (var i = 0; i < 5; i++) {
            var obj = self.multipliers[i];
            var element = i + 1;
            pisp['calcorder' + element] = obj.calcorder;
            pisp['calccd' + element] = obj.calccd;
            pisp['pricemult' + element] = obj.pricemult;
            pisp['addon' + element] = obj.addon;
            pisp['pround' + element] = obj.pround;
            pisp['ptarget' + element] = obj.ptarget;
            pisp['pexactrnd' + element] = obj.pexactrnd;
            pisp['holdzerofl' + element] = obj.holdzero;
            pisp['holddeclim' + element] = obj.holddeclim;
            pisp['holdinclim' + element] = obj.holdinclim;
         }

         // If Note is "next" then set page to 0
         if (pisp.noteupdtcd.toLowerCase() === 'n') {
            pisp.notepg = 0;
         }

         if (!pisp.whse) {
            pisp.whse = '';
         }

         self.submit();
      };

   };

});