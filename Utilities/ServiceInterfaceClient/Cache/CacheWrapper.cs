using System.Linq;
using System.Runtime.Caching;
using System.Threading.Tasks;
using LazyCache;
using Security.Security;

namespace ServiceInterfaceClient.Cache
{
   public class CacheWrapper : ICacheWrapper
   {
      private readonly IAppCache _appCache;

      public TokenObject TokenObject { get; set; }

      public CacheWrapper(IAppCache appCache)
      {
         this._appCache = appCache;
      }

      public T Get<T>(string majorBucket, string key)
      {
         return this._appCache.Get<T>($"{majorBucket}|{this.TokenObject.Tenant}|{this.TokenObject.Cono}|{key}");
      }

      public void Add<T>(string majorBucket, string key, T value, CacheItemPolicy cacheItemPolicy)
      {
         this._appCache.Add($"{majorBucket}|{this.TokenObject.Tenant}|{this.TokenObject.Cono}|{key}", value, cacheItemPolicy);
      }

      public void Remove(string majorBucket, string key)
      {
         this._appCache.Remove($"{majorBucket}|{this.TokenObject.Tenant}|{this.TokenObject.Cono}|{key}");
      }

      public void ClearCache(string majorBucket, string minorBucket)
      {
         var allKeys = this._appCache.ObjectCache.Select(o => o.Key).Where(x => x.StartsWith($"{majorBucket}|{this.TokenObject.Tenant}|{this.TokenObject.Cono}|" + (!string.IsNullOrEmpty(minorBucket) ? $"{minorBucket}|" : string.Empty)));
         Parallel.ForEach(allKeys, key => this._appCache.Remove(key));
      }
   }
}