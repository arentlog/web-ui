'use strict';

// SXe low level cache - replacment for opensource lscache

app.service('lscache', function () {
   var self = this;

   var cache = [];

   var bucket;

   self.supported = function () {
      return true;
   };

   self.setBucket = function (setBucket) {
      bucket = setBucket;
   };

   self.set = function (key, value, mins) {
      if (!bucket) {
         self.setBucket('');
      }
      self.remove(key);
      var cacheItem = {
         key: key,
         bucket: bucket,
         value: value,
         mins: new Date().getTime() + mins * 60000
      };
      cache.push(cacheItem);
   };

   self.get = function (key) {
      if (!bucket) {
         self.setBucket('');
      }
      var now = new Date().getTime();
      var objToFind = cache.find(function (obj) { return obj.key === key && obj.bucket === bucket && obj.mins >= now; });
      return objToFind ? objToFind.value : null;
   };

   self.remove = function (key) {
      if (!bucket) {
         self.setBucket('');
      }
      var objToFind = cache.find(function (obj) { return obj.key === key && obj.bucket === bucket; });
      if (objToFind) {
         cache = cache.filter(function (item) { return item !== objToFind; });
      }
   };

   self.flush = function () {
      if (!bucket) {
         self.setBucket('');
      }
      var objToFind = cache.find(function (obj) { return obj.bucket === bucket; });
      if (objToFind) {
         cache = cache.filter(function (item) { return item !== objToFind; });
         self.flush();
      }
   };

   self.flushExpired = function () {
      if (!bucket) {
         self.setBucket('');
      }
      var expiredTime = new Date().getTime();
      internalFlushExpired(expiredTime);
   };

   // private functions

   function internalFlushExpired(expiredTime) {
      var objToFind = cache.find(function (obj) { return obj.bucket === bucket && obj.mins < expiredTime; });
      if (objToFind) {
         cache = cache.filter(function (item) { return item !== objToFind; });
         internalFlushExpired(expiredTime);
      }
   }
});