'use strict';

/**
 * Directive for the Advanced menu in the header ellipsis.
 */
app.directive('advancedMenu', function advancedMenu(AppInfoService, CacheService, ContextService, DataService, DevToolsService, ImageService, JsonViewService, MessageService) {

   return {
      restrict: 'A',
      scope: true,
      controllerAs: 'advmenu',
      controller: function ($scope) {
         var self = this;
         self.enableContextLogging = ContextService.isLoggingEnabled();

         // Toggle logging of context messaging info
         self.toggleContextLogging = function (isEnable) {
            ContextService.toggleLogging(isEnable);
            self.enableContextLogging = isEnable;
         };

         // Open new window (for dual monitor feature)
         self.openNewWindow = function () {
            var inIframe = window !== window.parent;
            var logicalId = AppInfoService.getUrlParam('LogicalId'); // from sxe's iframe url

            // Get the mingle url (or sxe url if running outside of mingle)
            // Note: We can't get the url from window.parent.location due to cross-origin browser security constraints,
            //       but we can find it as the referrer of the current document.
            var url = inIframe ? window.document.referrer : window.location.href;
            var urlParams = url.includes('?') ? url.substring(url.indexOf('?')) : '';

            // Add the LogicalId for our app if not already on the mingle url
            if (!urlParams.includes('LogicalId=') && logicalId) {
               url += (urlParams.startsWith('?') ? '&' : '?') + 'LogicalId=' + logicalId;
            }

            // Open new window
            // Note: Browsers will usually open a new tab, which the user can drag onto their 2nd monitor to undock it.
            //       There's a way we can force a whole new window, but it becomes an odd window without the standard
            //       browser features (toolbar, menu, etc.)
            window.open(url);
         };

         // Show active view info
         self.showActiveViewInfo = function () {
            DevToolsService.showActiveViews($scope, 'info');
         };

         // Show about/version info
         self.showAbout = function () {
            DataService.get('api/shared/assharedinquiry/getsxversionnumbers', { busy: false }, function (data) {
               var content = '';

               if (data.cDisplayVersion) {
                  content += MessageService.get('special.version.sxe') + ': ' + data.cDisplayVersion + '<br/>';
               }
               if (data.cESBVersion) {
                  content += MessageService.get('special.version.bod.update.pack') + ': ' + data.cESBVersion + '<br/>';
               }
               if (data.cSIVersion) {
                  content += MessageService.get('special.version.service.interface') + ': ' + data.cSIVersion + '<br/>';
               }
               if (data.cInternalVersion) {
                  content += MessageService.get('special.version.internal') + ': ' + data.cInternalVersion + '<br/>';
               }

               $('body').about({
                  appName: MessageService.get('special.app.title'),
                  content: '<p>' + content + '</p>'
               });
            });
         };

         // Clear local cache
         self.clearLocalCaches = function () {
            CacheService.flush(false, 'E');
            CacheService.flush(false, 'M');
            ImageService.clearCache('', false);
            ContextService.clearCache(false);
            JsonViewService.clearViewCache();
         };
      }
   };
});