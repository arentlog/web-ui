using System;
using System.Web;
using Infor.Sxe.Web.FrontEnd;
using Infor.Sxe.Web.FrontEnd.Infrastructure.Modules.Common;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using Ninject;
using Ninject.Extensions.Conventions;
using Ninject.Web.Common;
using Ninject.Web.Common.WebHost;
using Progress.Open4GL;
using Progress.Open4GL.Proxy;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;
using WebActivatorEx;


[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(NinjectWebCommon), "Start")]
[assembly: ApplicationShutdownMethod(typeof(NinjectWebCommon), "Stop")]

namespace Infor.Sxe.Web.FrontEnd
{
   public static class NinjectWebCommon
   {
      private static readonly Bootstrapper bootstrapper = new Bootstrapper();

      /// <summary>
      /// Starts the application
      /// </summary>
      public static void Start()
      {
         DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
         DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
         bootstrapper.Initialize(CreateKernel);
      }

      /// <summary>
      /// Stops the application.
      /// </summary>
      public static void Stop()
      {
         bootstrapper.ShutDown();
      }

      /// <summary>
      /// Creates the kernel that will manage your application.
      /// </summary>
      /// <returns>The created kernel.</returns>
      private static IKernel CreateKernel()
      {
         var kernel = new StandardKernel();
         try
         {
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

            var progressConfiguration = new ProgressConfiguration();

            var properties = RunTimeProperties.GetStaticProperties();
            if (properties.SessionModel == SessionModelConstants.SessionManaged || progressConfiguration.InforProgressOwnsConnection)
            {
               // Get a new instance of the Connection object each time
               kernel.Bind<Connection>()
                  .To<Connection>()
                  .WithConstructorArgument(RunTimeProperties.GetStaticProperties());
            }
            else
            {
               // This registration causes the Connection to act as a Pool and stays around for the lifetime of the application
               kernel.Bind<Connection>()
                  .To<Connection>()
                  .InSingletonScope()
                  .WithConstructorArgument(RunTimeProperties.GetStaticProperties());
            }

            kernel.Bind(scanner => scanner.FromAssembliesMatching("General.Business.dll")
               .SelectAllClasses()
               .InheritedFrom<IService>().BindDefaultInterfaces());

            kernel.Bind(scanner => scanner.FromAssembliesMatching("Infor.Sxe.*.Data.dll")
               .SelectAllClasses()
               .InheritedFrom<IRepository>().BindDefaultInterfaces());

            RegisterServices(kernel);
            return kernel;
         }
         catch
         {
            kernel.Dispose();
            throw;
         }
      }

      /// <summary>
      /// Load your modules or register your services here!
      /// </summary>
      /// <param name="kernel">The kernel.</param>
      private static void RegisterServices(IKernel kernel)
      {
         kernel.Load(new CommmonModule(), new ProgressModule());
      }
   }
}