using LazyCache;
using Ninject.Modules;
using Security.Security;
using ServiceInterfaceClient.Cache;
using ServiceInterfaceClient.Progress;
using ServiceInterfaceClient.Utilities;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Modules.Common
{
   public class CommmonModule : NinjectModule
   {
      public override void Load()
      {
         this.Bind<IAppCache>().To<CachingService>();
         this.Bind<ICacheWrapper>().To<CacheWrapper>();
         this.Bind<IProgressConfiguration>().To<ProgressConfiguration>();
      }
   }
}