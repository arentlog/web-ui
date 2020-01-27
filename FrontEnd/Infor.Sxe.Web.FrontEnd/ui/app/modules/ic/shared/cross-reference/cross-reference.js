'use-strict';
/**
 * Control for displaying IC Cross Reference data.  Used in ICIA, ICIP Cross Reference tabs.
 * Alias: crf
 */
app.controller('IcCrossreferenceCtrl', function ($scope, DataService, ConfigService) {
   var self = this;
   var base = $scope.base;
   self.loadCrossRefTTCriteria = {
      whse: base.whse,
      prod: base.prod,
      altprod: null,
      rectype: '',
      custno: null,
      shipto: null,
      vendno: null,
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   self.getCrossReferences = function () {
      DataService.post('api/ic/asicwhseprod/loadcrossreferencett', { data: self.loadCrossRefTTCriteria, busy: true }, function (data) {
         if (data) {
            self.crossReferenceCollection = data.loadcrossrefttresults;
         }
      });
   };

   self.getCrossReferences();

   self.crossReferenceFilter = function () {
      self.getCrossReferences();
   };
});