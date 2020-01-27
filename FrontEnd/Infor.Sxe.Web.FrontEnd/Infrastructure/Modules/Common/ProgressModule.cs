using System.Web;
using System.Web.Mvc;
using Logging.Helpers;
using Ninject.Modules;
using Ninject.Web.Common;
using Progress.Open4GL.Proxy;
using Security.Security;
using ServiceInterfaceClient.Progress;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Modules.Common
{
   class ProgressModule : NinjectModule
   {
      public override void Load()
      {
         this.Bind<IProgressConnection>().ToMethod(context => InitProgressConnection()).InRequestScope();
      }

      private static IProgressConnection InitProgressConnection()
      {
         var connection = new ProgressConnection(DependencyResolver.Current.GetService<Connection>());
         string host;
         var tokenObject = ApplicationCookieUtilities.Principal(HttpContext.Current.User, out host);
         connection.CompanyNumber = tokenObject.Cono;
         connection.Operator = tokenObject.Oper.StripOffDomain();
         connection.SessionId = tokenObject.SessionidGuid.ToString("D");
         connection.CurrentUiCulture = tokenObject.CurrentUiCulture;
         connection.DefaultRecordCount = tokenObject.DefaultRecordLimit;
         return connection;
      }
   }
}