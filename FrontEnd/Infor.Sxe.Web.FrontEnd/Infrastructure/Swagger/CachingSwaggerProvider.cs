using System.Collections.Concurrent;
using Swagger.Net;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Swagger
{
   public class CachingSwaggerProvider : ISwaggerProvider
   {
      private static readonly ConcurrentDictionary<string, SwaggerDocument> Cache =
         new ConcurrentDictionary<string, SwaggerDocument>();

      private readonly ISwaggerProvider _swaggerProvider;

      public CachingSwaggerProvider(ISwaggerProvider swaggerProvider)
      {
         _swaggerProvider = swaggerProvider;
      }

      public SwaggerDocument GetSwagger(string rootUrl, string apiVersion)
      {
         var cacheKey = $"{rootUrl}_{apiVersion}";
         return Cache.GetOrAdd(cacheKey, (key) => _swaggerProvider.GetSwagger(rootUrl, apiVersion));
      }
   }
}