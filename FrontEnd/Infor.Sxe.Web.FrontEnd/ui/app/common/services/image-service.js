'use strict';

/**
 * Service for retrieving images
 */
app.service('ImageService', function ImageService(DataService, ConfigService, CacheService) {

   var imageRepository = {};

   var majorBucket = 'I';

   this.clearCache = function (repositoryName, serverAlso, callback) {

      if (!repositoryName) {
         repositoryName = '';
      }

      if (serverAlso === undefined) {
         serverAlso = false;
      }
      CacheService.flush(false, majorBucket, repositoryName);

      if (repositoryName === '') {
         imageRepository = {};
      } else {
         delete imageRepository[repositoryName];
      }

      if (serverAlso) {
         DataService.get('api/shared/integration/idm/items/clearcache', { params: { repositoryName: repositoryName }, busy: false }, function () {
            if (callback) {
               callback();
            }
         });
      }
   };

   /**
    * Get url of a single image.
    * @param imageType - 'Thumbnail', 'SmallPreview', 'Preview', or ''
    */
   this.getImageUrl = function (key, repositoryName, imageType, ignoreCache, finished) {

      if (!imageType) {
         imageType = '';
      }

      var url = CacheService.get(ignoreCache, majorBucket, repositoryName, { Key: key, ImageType: imageType });
      if (!url) {

         var imageRequestWrapper = {
            IgnoreCache: ignoreCache,
            Repository: repositoryName,
            GetImageUrlRequest: [{ Key: key, ImageType: imageType } ]
         };

         DataService.post('api/shared/integration/idm/items/getimageurl', { data: imageRequestWrapper, busy: false }, function(imageResponseWrapper) {
            var validMinutes = 30;
            // Can't find repository
            if (!imageResponseWrapper.RepositoryFound) {
               imageRepository[repositoryName] = false;
               url = '';
            } else {
               // Extract url
               if (imageResponseWrapper.GetImageUrlResponse.length > 0) {
                  url = imageResponseWrapper.GetImageUrlResponse[0].Url;
                  validMinutes = imageResponseWrapper.GetImageUrlResponse[0].ValidMinutes;
               } else {
                  url = '';
               }
            }
            CacheService.set(ignoreCache, majorBucket, repositoryName, { Key: key, ImageType: imageType }, url === '' ? '{None}' : url, validMinutes);
            if (finished) {
               finished(url);
            }

         });
      } else {
         url = url === '{None}' ? '' : url;
         if (finished) {
            finished(url);
         }
      }
   };

   /**
    * Add image urls to a list of objects.
    */
   this.getImages = function (searchResults, repositoryName, keyField, imageField, imageType, ignoreCache, finished) {
      if (searchResults.length > 0 && ConfigService.isShowImages()) {

         if (!repositoryName) {
            repositoryName = 'icsw';
         }

         if (imageRepository[repositoryName] === undefined) {
            imageRepository[repositoryName] = true;
         }

         if (!imageRepository[repositoryName]) {
            if (finished) {
               finished(searchResults);
            }
            return;
         }

         if (ignoreCache === undefined) {
            ignoreCache = false;
         }

         if (!keyField) {
            keyField = 'value';
         }

         if (!imageField) {
            imageField = 'image';
         }

         if (!imageType) {
            imageType = 'Thumbnail';
         }

         var imageRequestWrapper = {};
         imageRequestWrapper.IgnoreCache = ignoreCache;
         imageRequestWrapper.Repository = repositoryName;
         imageRequestWrapper.GetImageUrlRequest = [];

         searchResults.forEach(function(item) {
            var resp = CacheService.get(ignoreCache,
               majorBucket,
               repositoryName,
               { Key: item[keyField], ImageType: imageType });
            if (resp) {
               item.image = resp === '{None}' ? '' : resp;
            } else {
               resp = $.grep(imageRequestWrapper.GetImageUrlRequest,
                  function(i) { return item[keyField] === i.Key && i.ImageType === imageType; })[0];
               if (!resp) {
                  var imageRequest = {};
                  imageRequest.Key = item[keyField];
                  imageRequest.ImageType = imageType;
                  imageRequestWrapper.GetImageUrlRequest.push(imageRequest);
               }
            }
         });

         if (imageRequestWrapper.GetImageUrlRequest.length > 0) {
            DataService.post('api/shared/integration/idm/items/getimageurl',
               { data: imageRequestWrapper, busy: false },
               function(imageResponseWrapper) {

                  if (imageResponseWrapper &&
                     imageResponseWrapper.RepositoryFound !== undefined &&
                     imageResponseWrapper.RepositoryFound === false) {
                     imageRepository[repositoryName] = false;
                     if (finished) {
                        finished(searchResults);
                     }
                     return;
                  }

                  if (imageResponseWrapper && imageResponseWrapper.InError) {
                     searchResults.forEach(function(item) {
                        item[imageField] = 'ui/app/assets/images/error-icon.png';
                     });
                     if (finished) {
                        finished(searchResults);
                     }
                     return;
                  }

                  if (imageResponseWrapper && imageResponseWrapper.GetImageUrlResponse.length > 0) {
                     imageResponseWrapper.GetImageUrlResponse.forEach(function(item) {
                        if (!item.Url) {
                           item.Url = '';
                        }
                        CacheService.set(ignoreCache,
                           majorBucket,
                           repositoryName,
                           { Key: item.Key, ImageType: imageType },
                           item.Url === '' ? '{None}' : item.Url,
                           item.ValidMinutes);
                        searchResults = replaceValuesInResult(searchResults, item.Key, keyField, item.Url, imageField);
                     });
                  } else {
                     imageRequestWrapper.GetImageUrlRequest.forEach(function(item) {
                        CacheService.set(ignoreCache,
                           majorBucket,
                           repositoryName,
                           { Key: item.Key, ImageType: item.ImageType },
                           '{None}',
                           30);
                        searchResults = replaceValuesInResult(searchResults, item.Key, keyField, '', imageField);
                     });
                  }
                  if (finished) {
                     finished(searchResults);
                  }
                  return;
               });
         } else {
            if (finished) {
               finished(searchResults);
            }
         }
      } else {
         if (finished) {
            finished(searchResults);
         }
      }
   };

   function replaceValuesInResult(searchResults, key, keyField, url, imageField) {
      var resp = $.grep(searchResults, function (p) { return key === p[keyField]; });
      if (resp && resp.length > 0) {
         resp.forEach(function (item) {
            item[imageField] = url;
         });
      }
      return searchResults;
   }
});