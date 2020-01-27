using System;
using System.Collections.Generic;
using Ninject;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.DependencyResolvers
{
   public class NinjectDependencyResolver : System.Web.Mvc.IDependencyResolver, System.Web.Http.Dependencies.IDependencyResolver
   {
      public NinjectDependencyResolver(IKernel kernel)
      {
         this._kernel = kernel;

         this.AddBindings();
      }

      public object GetService(Type serviceType)
      {
         return this._kernel.TryGet(serviceType);
      }

      public IEnumerable<object> GetServices(Type serviceType)
      {
         return this._kernel.GetAll(serviceType);
      }

      private void AddBindings()
      {
         // Add any bindings in here
      }

      public System.Web.Http.Dependencies.IDependencyScope BeginScope()
      {
         return this;
      }

      public void Dispose()
      {
         // When BeginScope returns 'this', the Dispose method must be a no-op.
      }

      private readonly IKernel _kernel;
   }
}