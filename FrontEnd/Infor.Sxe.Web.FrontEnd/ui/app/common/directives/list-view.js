'use strict';

/**
 * Directive for list views to help with paging.
 */
app.directive('listView', function listView($compile, Constants) {

   return {
      restrict: 'A',
      scope: true,
      controllerAs: 'list',
      controller: function ($scope) {
         var self = this;
         self.activePage = 1;
         self.pageSize = Constants.EASY_ENTRY_PAGE_SIZE;
         self.startIndex = 0;
         self.totalPages = 0;
         self.onPaging = null;
         self.dataset = null;

         // Soho provides us these tooltip labels
         self.firstLabel = Locale.translate('FirstPage');
         self.previousLabel = Locale.translate('PreviousPage');
         self.nextLabel = Locale.translate('NextPage');
         self.lastLabel = Locale.translate('LastPage');

         self.initialize = function (attrs) {
            self.onPaging = attrs.onPaging;

            // Set up watch for the data model
            // Note: this also helps fire the initial paging event for a dataset, which is what we want
            $scope.$watchCollection(attrs.model, function (dataset) {
               if (dataset) {
                  self.dataset = dataset;
                  self.refreshPager();
               }
            });
         };

         // Update pager and force back to page 1 to prevent user remaining on a non-existant page
         self.refreshPager = function () {
            self.totalPages = Math.ceil(self.dataset.length / self.pageSize);
            self.goToPage(1);
         };

         // User changes page size
         self.setPageSize = function (size) {
            self.pageSize = size;
            self.refreshPager();
         };

         self.goToFirst = function () {
            if (self.activePage > 1) {
               self.goToPage(1);
            }
         };

         self.goToLast = function () {
            if (self.activePage < self.totalPages) {
               self.goToPage(self.totalPages);
            }
         };

         self.goToPrevious = function () {
            if (self.activePage > 1) {
               self.goToPage(self.activePage - 1);
            }
         };

         self.goToNext = function () {
            if (self.activePage < self.totalPages) {
               self.goToPage(self.activePage + 1);
            }
         };

         // User types in a page number
         self.pageEntered = function () {
            if (self.activePage >= 1 && self.activePage <= self.totalPages) {
               self.goToPage(self.activePage);
            } else {
               self.goToPage(1);
            }
         };

         // Listen for 'enter' key in the page number field
         self.onPageKeyPress = function (event) {
            if (event.which === 13) {
               // Fire page number entered logic by forcing a blur (since model is set to updateOn blur)
               $(document.activeElement).blur().focus();

               // Prevent form submission (pager may be inside of another form)
               event.preventDefault();
            }
         };

         self.goToPage = function (pageNum) {
            self.activePage = pageNum;
            self.startIndex = self.pageSize * (pageNum - 1);

            // Invoke onPaging action
            if (self.onPaging) {
               var onPaging = self.onPaging;
               var args = {
                  activePage: self.activePage,
                  pageSize: self.pageSize,
                  startIndex: self.startIndex
               };
               onPaging = onPaging.endsWith('()') ? onPaging : onPaging + '()';

               // Prepare function call to take parameters
               onPaging = onPaging.replace('()', '(args)');

               // Evaluate the expression (passing params)
               $scope.$eval(onPaging, { args: args });
            }
         };
      },
      link: function (scope, element, attrs, ctrl) {
         var pager, $pager;

         // Initialize controller with attributes
         ctrl.initialize(attrs);

         // Pager html (not using Soho's pagination since it doesn't work well with Angular and ng-repeat)
         pager = '<ul class="pager-toolbar">';
         pager += '<li class="pager-first" title="{{::list.firstLabel}}" tabindex="0"><a ng-click="list.goToFirst()" ng-disabled="list.activePage <= 1" class="hide-focus"><svg class="icon"><use xlink:href="#icon-first-page"></use></svg></a></li>';
         pager += '<li class="pager-prev" title="{{::list.previousLabel}}" tabindex="0"><a ng-click="list.goToPrevious()" ng-disabled="list.activePage <= 1" data-multiple-clicks="true" class="hide-focus" rel="prev"><svg class="icon"><use xlink:href="#icon-previous-page"></use></svg></a></li>';
         pager += '<li class="pager-count"><label><span translate>global.page</span> <input name="pager-pageno" ng-model="list.activePage" ng-change="list.pageEntered()" ng-keypress="list.onPageKeyPress($event)" ng-model-options=\'{"updateOn": "blur", "debounce": 1}\' field-format="INTEGER" data-digits="3" data-sign="+"> <span translate>global.of</span> <span class="pager-total-pages">{{list.totalPages}}</span></label></li>';
         pager += '<li class="pager-next" title="{{::list.nextLabel}}" tabindex="0"><a ng-click="list.goToNext()" ng-disabled="list.activePage >= list.totalPages" data-multiple-clicks="true" class="hide-focus" rel="next"><svg class="icon"><use xlink:href="#icon-next-page"></use></svg></a></li>';
         pager += '<li class="pager-last" title="{{::list.lastLabel}}" tabindex="0"><a ng-click="list.goToLast()" ng-disabled="list.activePage >= list.totalPages" class="hide-focus"><svg class="icon"><use xlink:href="#icon-last-page"></use></svg></a></li>';

         // Optionally add page size selector (currently we don't include this in easy entry because of pricing and rendering performance)
         if (attrs.pageSizeSelector === 'true') {
            pager += '<li class="pager-pagesize">';
            pager += '<button type="button" class="btn-menu"><span>{{list.pageSize}}</span> <span translate>global.records.per.page</span> <svg class="icon icon-dropdown"><use xlink:href="#icon-dropdown"></use></svg></button>';
            pager += '<ul class="popupmenu has-icons">';
            pager += '<li ng-class="{\'is-checked\': list.pageSize === 5}"><a ng-click="list.setPageSize(5)">5</a></li>';
            pager += '<li ng-class="{\'is-checked\': list.pageSize === 10}"><a ng-click="list.setPageSize(10)">10</a></li>';
            pager += '<li ng-class="{\'is-checked\': list.pageSize === 25}"><a ng-click="list.setPageSize(25)">25</a></li>';
            pager += '<li ng-class="{\'is-checked\': list.pageSize === 50}"><a ng-click="list.setPageSize(50)">50</a></li>';
            pager += '</ul>';
            pager += '</li>';
         }

         pager += '</ul>';
         $pager = $(pager);

         // Append html and compile it
         element.append($pager);
         $compile($pager)(scope.$new());
      }
   };

});