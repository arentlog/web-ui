'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('search', {
      url: '/search',
      deepStateRedirect: {default: 'search.master'},
      sticky: true,
      views: {
         'search@': {
            templateUrl: 'ui/app/modules/search/search.html',
            controller: 'SearchBaseCtrl as base'
         }
      },
      data: {
         tabTitle: 'title.search',
         module: 'search',
         menuFn: 'search'
      }
   });
   $stateProvider.state('search.master', {
      url: '/master',
      sticky: true
   });
});

app.controller('SearchBaseCtrl', function ($compile, $q, $scope, $state, $translate, Constants, DataService, Utils) {
   var self = this;

   self.maxRepoResults = 6;
   self.maxResults = 50;

   //local vars
   self.criteria = {};
   self.promises = [];
   self.results = {};
   self.facets = [];
   self.repositories = [];

   self.previousRepository = null;
   self.activeRepository = null;
   self.activeFacet = null;
   self.hasSearch = false;
   self.isFacetChange = false; //track multiselect dropdown for facets

   //on page load
   DataService.get(Constants.SEARCH_PATH, { busy: false, errorFunction: 'getrepos' }, function (data) {
      for (var i = 0; i < data.hits.length; i++) {
         data.hits[i].disable = true;
         data.hits[i].name = $translate.instant('global.repository.' + data.hits[i].id);
      }
      self.repositories = data.hits;
   });

   self.showInRepoList = function (item) {
      return !item.disable;
   };

   self.resetRepoList = function () {
      for (var i = 0; i < self.repositories.length; i++) {
         self.repositories[i].disable = true;
      }
   };

   self.enableRepoListItem = function (repo) {
      for (var i = 0; i < self.repositories.length; i++) {
         if (self.repositories[i].id === repo) {
            self.repositories[i].disable = false;
            return;
         }
      }
   };

   //watch for multiselect dropdown changes (facets)
   self.facetChange = function () {
      self.isFacetChange = true;
   };

   self.getDate = function (datetime) {
      var dt = datetime.split(' ');
      return dt.length === 2 ? dt[0] : datetime;
   };

   self.resetFacets = function () {
      self.facets = [];
      self.activeFacet = {};
      self.search();
   };

   self.navigate = function (link) {
      var params = {};
      var paramList = link.params || [];

      // Build state params object from param list
      for (var i = 0; i < paramList.length; i++) {
         var param = paramList[i];
         params[param.name] = param.value;
      }

      $state.go(link.state, params);
   };

   self.cancel = function () {
      var i = self.promises.length;
      while (i--) {
         var promise = self.promises.shift();
         promise.cancel();
      }
   };

   self.formatBadge = function (size) {
      if (!self.activeRepository && size > self.maxRepoResults - 1) {
         return size - 1 + ' +';
      } else if (self.activeRepository && size > self.maxResults - 1) {
         return size - 1 + ' +';
      } else {
         return size;
      }
   };

   self.searchRepository = function (id) {
      self.activeRepository = id;
      $('#repository').val('string:' + id).trigger('updated');
      self.search();
   };

   self.search = function () {
      var promises = [];

      //@todo; probably want to clean up the input text before searching against it
      var queryTxt = self.criteria.data;

      // If no user input then do nothing (not making the search field required because the required indicator below the field is undesirable)
      if (!queryTxt) {
         return;
      }

      //cancel any pending requests
      self.cancel();

      $('body').trigger('start.busyindicator');

      //make sure view is in intended state
      $('#filter-container').hide();

      //find and clear result area
      var element = $('#ies-results');
      element.html('');

      //set default search set
      var searchRepoSet = self.repositories;
      var loadFacets = false;

      //if a repo selected, set as search set and enable facets
      if (self.activeRepository) {
         searchRepoSet = [self.activeRepository];
         loadFacets = true;
      }

      //reset facet selections if repo change
      if (self.previousRepository !== self.activeRepository) {
         self.activeFacet = {};
      }

      var recLimit = loadFacets ? self.maxResults : self.maxRepoResults;

      angular.forEach(searchRepoSet, function (value) {
         var repo = typeof value === 'object' ? value.id : value;
         var query = buildQuery(queryTxt, recLimit, repo);

         var promise = DataService.sendWithCancel(Constants.SEARCH_PATH, { data: query, busy: false, method: 'POST', errorFunction: 'globalsearch' }, function (data) {

            if (data && data.hits && data.hits.length) {

               data = Utils.processData(query, data);

               self.enableRepoListItem(repo);

               $('body').trigger('complete.busyindicator');

               if (loadFacets) {
                  self.facets = [];
                  if (data.facets && data.facets.length > 0) {
                     self.facets = Utils.processFacets(repo, data.facets);
                  }

                  setTimeout(function () {
                     $('#search .multiselect').multiselect();
                     $('#search #filter-container').show(300);
                     $('#search .dropdown').focus(function () {
                        if (self.isFacetChange) {
                           self.isFacetChange = false;
                           self.search();
                        }
                     });
                  }, 0);
               }

               DataService.get('ui/app/modules/search/results.tmpl.html', function (htmlcontent) {
                  htmlcontent = htmlcontent.replace(/.results./g, '.results.' + repo + '.');

                  var compiledHtml = $compile(htmlcontent)($scope);
                  self.results[repo] = {};
                  self.results[repo].id = repo;
                  self.results[repo].title = $translate.instant('global.repository.' + repo);
                  self.results[repo].hits = data.hits;
                  element.append(compiledHtml);

                  $('body').trigger('complete.busyindicator');
               });

               return true;
            }
            else {
               return false;
            }
            //return data; // used by promise
         },
         function error() {
            $('body').trigger('complete.busyindicator');
         });

         promises.push(promise.promise); //q.all expects promises as flat array
         self.promises.push(promise);
      });

      self.previousRepository = self.activeRepository;
      self.hasSearch = true;
      self.sidebarCollapsed = false;
      self.hideSidebar = false;

      // wait for all calls to complete
      $q.all(promises).then(function (data) {
         var emptyResults = true;
         data.forEach(function (repo) {
            if (repo) {
               emptyResults = false;
            }
         });

         if (emptyResults) {
            var html = '<p>' + $translate.instant('global.search.returned.no.results') + '</p>';
            element.append(html);
         }

         $('body').trigger('complete.busyindicator');
      });
   };

   self.reset = function () {
      $('body').trigger('start.busyindicator');

      //cancel any pending requests
      self.cancel();

      self.results = {};
      self.facets = [];

      self.hasSearch = false;

      $('#filter-container').hide();

      self.criteria.data = null;

      self.activeRepository = null;

      $('#repository').val(null).trigger('updated');

      self.activeFacet = {};
      self.isFacetChange = false;

      setTimeout(function () {
         $('body').trigger('complete.busyindicator');
      }, 200);
   };


   /*private functions*/
   function buildQuery(queryTxt, maxResults, repository) {
      var qry = { "QueryText": queryTxt, "MaxResults": maxResults, IsGlobalSearch: true, "LookupParameter": repository };

      if (self.activeFacet) {
         var fq = null;
         //iterate facet keys
         for (var keys = Object.keys(self.activeFacet), i = 0, keyLen = keys.length; i < keyLen; i++) {
            var key = keys[i], values = self.activeFacet[key];
            //iterate facet values
            if (values && values.length > 0) {
               if (!fq) {
                  fq = {};
               }
               fq[key] = [];
               for (var j = 0, valLen = values.length; j < valLen; j++) {
                  fq[key].push(Utils.checkForTranslate(key, values[j]));
               }
            }
         }
         if (fq) {
            qry.FacetQuery = fq;
         }
      }
      return qry;
   }
});