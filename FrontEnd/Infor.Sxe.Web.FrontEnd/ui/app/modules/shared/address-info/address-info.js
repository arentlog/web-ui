'use strict';

/**
 * Directive for displaying non-editable address information.
 */
app.directive('addressInfo', function addressInfo($compile, $translate, CommonConverters, Sasc) {

   return {
      restrict: 'E',
      scope: true,
      link: function (scope, element, attrs) {
         var options = attrs.options ? JSON.parse(attrs.options) : {};
         var addressLabel = $translate.instant(options.addressLabel);
         var outOfCityLabel = $translate.instant('global.out.of.city');
         var geoCodeLabel = $translate.instant('global.geo.code');
         var isInternationalFormat = Sasc.freeformaddr;

         var html = '<div class="summary-form">';
         html += '<div class="info-field field">';
         if (addressLabel && addressLabel.length > 0) {
            html += '<span class="label">' + addressLabel + '</span>';
         } else {
            html += '<span class="label"></span>';
         }

         html += '<span class="data">';
         html += '{{' + options.addr1Model + '}}<br ng-if="' + options.addr1Model + '" />';
         html += '{{' + options.addr2Model + '}}<br ng-if="' + options.addr2Model + '" />';
         html += '{{' + options.addr3Model + '}}<br ng-if="' + options.addr3Model + '" />';
         html += '{{' + options.cityModel + '}}<span ng-if="' + options.cityModel + '">' + (isInternationalFormat ? '' : ',') + '&nbsp;</span>';
         if (!isInternationalFormat) {
            html += '{{' + options.stateModel + '}}&nbsp;';
         } else {
            html += '<br/>';
         }
         html += '{{' + options.zipCodeModel + '}}<br/>';

         if (options.countryCdVisible) {
            //Set up the HTML and then during the Watch, we set the description on scope so it gets populated when the callback completes.
            //Country Code followed by a space, followed by the Country Description.
            html += '{{' + options.countryCodeModel + '}} {{countryDescription}}<br ng-if="' + options.countryCodeModel + '" />';

            scope.$watch(options.countryCodeModel, function(newValue) {
               if (newValue) {
                  scope.countryDescription = CommonConverters.CountryCodeToName.convert(newValue);
               } else {
                  scope.countryDescription = '';
               }
            });
         }

         if (options.outOfCityVisible) {
            //Only show the Out Of City checkbox if we have data in the Address1
            html += '<div class="field" ng-if="' + options.addr1Model + '" style="margin-bottom: -20px">';
            html += '<input type="checkbox" id="outOfCityFlag"';
            html += 'class="checkbox" ';
            html += 'ng-model="' + options.outOfCityFlagModel + '" ';
            html += 'ng-disabled="::true">';
            html += '<label class="checkbox-label" for="outOfCityFlag">';
            html += outOfCityLabel;
            html += '</label>';
            html += '</div>';
         }

         html += '</span>';
         html += '</div>';

         if (options.geoCodeVisible) {
            //Only show the Out Of GeoCode if we have data in the Address1.
            html += '<div class="info-field field" ng-if="' + options.addr1Model + '">';
            html += '<span class="label">' + geoCodeLabel + '</span>';
            html += '<span class="data">';
            html += '{{' + options.geoCodeModel + '}}<br ng-if="' + options.zipCodeModel + '"/></span>';
            html += '</div>';
         }

         html += '</div>'; //Summary Form

         // Add fields to view
         var compiledHTML = $compile(html)(scope.$new());
         $(element).html(compiledHTML);
      }
   };

});
