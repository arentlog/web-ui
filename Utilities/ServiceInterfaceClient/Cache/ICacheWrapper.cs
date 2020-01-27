using System.Runtime.Caching;
using Security.Security;

namespace ServiceInterfaceClient.Cache
{
   public interface ICacheWrapper
   {
      TokenObject TokenObject { get; set; }
      T Get<T>(string majorBucket, string key);
      void Add<T>(string majorBucket, string key, T value, CacheItemPolicy cacheItemPolicy);
      void Remove(string majorBucket, string key);
      void ClearCache(string majorBucket, string minorBucket);
   }
}