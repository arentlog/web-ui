using System.Web.Http;
using ServiceInterfaceClient.Filters;

namespace ServiceInterfaceClient.BaseClasses
{
   [ManipulateException]
   [SxeAuthorization]
   [Logging]
   public class ApiControllerBase : ApiController
   {
      public ApiControllerBase()
      {
      }
   }
}