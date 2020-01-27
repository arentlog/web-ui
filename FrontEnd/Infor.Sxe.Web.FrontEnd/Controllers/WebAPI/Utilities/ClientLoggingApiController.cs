using System;
using System.Web.Http;
using ClientLogging.Models;
using ClientLogging.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Utilities
{
   [RoutePrefix("api/utilities/logging")]
   public class ClientLoggingApiController : ApiControllerBase
   {
      private readonly LoggingRespository _repository;

      public ClientLoggingApiController(LoggingRespository repository)
      {
         this._repository = repository;
      }

      [Route("logfatal")]
      [HttpPost]
      public void LogFatal(LoggingMessage loggingMessage)
      {
         this._repository.LogFatal(loggingMessage.Message, loggingMessage.ClientFunction);
      }

      [Route("logerror")]
      [HttpPost]
      public void LogError(LoggingMessage loggingMessage)
      {
         this._repository.LogError(loggingMessage.Message, loggingMessage.ClientFunction);
      }

      [Route("logwarn")]
      [HttpPost]
      public void LogWarn(LoggingMessage loggingMessage)
      {
         this._repository.LogWarn(loggingMessage.Message, loggingMessage.ClientFunction);
      }

      [Route("loginfo")]
      [HttpPost]
      public void LogInfo(LoggingMessage loggingMessage)
      {
         this._repository.LogInfo(loggingMessage.Message, loggingMessage.ClientFunction);
      }

      [Route("logdebug")]
      [HttpPost]
      public void LogDebug(LoggingMessage loggingMessage)
      {
         this._repository.LogDebug(loggingMessage.Message, loggingMessage.ClientFunction);
      }

      [Route("logtrace")]
      [HttpPost]
      public void LogTrace(LoggingMessage loggingMessage)
      {
         this._repository.LogTrace(loggingMessage.Message, loggingMessage.ClientFunction);
      }

#if DEBUG
      [Route("testexception")]
      [HttpGet]
      public void TestException(int type)
      {
         switch (type)
         {
            case 401:
               ErrorReportingHelper.ReportErrors("SESSION ID NOT FOUND IN CORE_SESSION");
               break;
            case 420:
               ErrorReportingHelper.ReportErrors("420 Error");
               break;
            case 421:
               ErrorReportingHelper.ReportErrors("421 Error", 421);
               break;
            case 500:
               throw new DivideByZeroException();
            default:
               ErrorReportingHelper.ReportProgramErrors("Invalid exception");
               break;
         }
      }
#endif

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this._repository?.Dispose();
         base.Dispose(true);
      }
   }
}