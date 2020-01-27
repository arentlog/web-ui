'use strict';

/**
 * Service for caching - Implements a wrapper over lscache.js.  If we want to replace lscache in the future with something else, we can just change this wrapper.
 *
 * The cache key is made up of three distinct parts, a major bucket, minor bucket and the individual key.
 *
 * The following area utilize server and/or client caching.
 *
 * Major Bucket      Minor Bucket               Where             Description
 * B                 B                          Client/Server     Business context and addresses.
 * E                 Lookup Param               Client            Exact match calls from lookup
 * I                 Repository                 Client/Server     IDM Images
 * M                 UDF                        Client            User Defined fields.
 * M                 VERA                       Client            Cache the results of the isverazipinstalledforenablement call.
 */
app.service('CacheService', function CacheService(lscache) {

   var cacheBucket = {};

   var lsCacheCheckSupported = lscache.supported();

   this.clearAllExpired = function ()
   {
      for (var property in cacheBucket) {
         if (cacheBucket.hasOwnProperty(property)) {
            this.flushExpired(false, property);
         }
      }
   };

   this.clearCompleteCache = function () {
      lscache.flush();
   };

   this.set = function (ignoreCache, majorBucket, minorBucket, key, value, mins) {
      if (!checkAndStore(ignoreCache, majorBucket, minorBucket, true)) {
         return;
      }
      if (!mins) {
         mins = 30;
      }
      lscache.set(returnStringIfNeeded(key), value, mins);
   };

   this.get = function (ignoreCache, majorBucket, minorBucket, key) {
      if (!checkAndStore(ignoreCache, majorBucket, minorBucket, true)) {
         return null;
      }
      return lscache.get(returnStringIfNeeded(key));
   };

   this.remove = function (ignoreCache, majorBucket, minorBucket, key) {
      if (!checkAndStore(ignoreCache, majorBucket, minorBucket, true)) {
         return;
      }
      lscache.remove(returnStringIfNeeded(key));
   };

   this.flush = function (ignoreCache, majorBucket, minorBucket) {
      flushExpiredOrFlush(ignoreCache, majorBucket, minorBucket, false);
   };

   this.flushExpired = function (ignoreCache, majorBucket, minorBucket) {
      flushExpiredOrFlush(ignoreCache, majorBucket, minorBucket, true);
   };

   // Private functions
   function storeInformation(majorBucket, minorBucket) {
      if (cacheBucket[majorBucket] === undefined) {
         cacheBucket[majorBucket] = [];
      }
      if (!minorBucket) {
         return;
      }
      var resp = $.grep(cacheBucket[majorBucket], function (i) { return minorBucket === i; })[0];
      if (resp) {
         return;
      }
      cacheBucket[majorBucket].push(minorBucket);
   }

   function returnStringIfNeeded(key) {
      if (typeof key === 'string') {
         return key;
      }
      if (!isNaN(key)) {
         return key.toString();
      }
      return JSON.stringify(key);
   }

   function checkAndStore(ignoreCache, majorBucket, minorBucket, setBucket) {
      if (!lsCacheCheckSupported || ignoreCache) {
         return false;
      }
      storeInformation(majorBucket, minorBucket);
      if (setBucket) {
         lscache.setBucket(majorBucket + '|' + minorBucket);
      }
      return true;
   }

   function flushExpiredOrFlush(ignoreCache, majorBucket, minorBucket, expiredOnly) {
      if (!checkAndStore(ignoreCache, majorBucket, minorBucket, false)) {
         return;
      }
      if (!minorBucket) {
         cacheBucket[majorBucket].forEach(function (subBucket) {
            lscache.setBucket(majorBucket + '|' + subBucket);
            if (expiredOnly) {
               lscache.flushExpired();
            } else {
               lscache.flush();
            }
         });
         return;
      }
      lscache.setBucket(majorBucket + '|' + minorBucket);
      if (expiredOnly) {
         lscache.flushExpired();
      } else {
         lscache.flush();
      }
   }
});