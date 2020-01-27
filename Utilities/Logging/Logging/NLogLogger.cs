using System;
using System.Web;
using Logging.Helpers;
using NLog;
using Security.Security;

namespace Logging.Logging
{
   public class NLogLogger : ILogger
   {
      public Logger Logger { get; set; }

      public NLogLogger(string tenant, string oper, int cono, Guid sessionId, string function, string remotehost)
      {
         SetCommonMdcs(tenant, oper, cono, sessionId, function, remotehost, string.Empty);
         this.Logger = LogManager.GetLogger("SxeLogger");
      }

      public NLogLogger(string function) : this("SxeLogger", function)
      {
      }

      public NLogLogger(string name, string function)
      {
         var loggingParams = ApplicationCookieUtilities.GetLoggingParams(HttpContext.Current.User, function);
         var callGuid = (string.IsNullOrEmpty(loggingParams.tenant) ? "" : loggingParams.tenant) + loggingParams.cono + loggingParams.oper.StripOffDomain() + loggingParams.callGuid;
         SetCommonMdcs(loggingParams.tenant, loggingParams.oper, loggingParams.cono, loggingParams.sessionid, loggingParams.function, loggingParams.host, callGuid);
         this.Logger = LogManager.GetLogger(name);
      }

      private static void SetCommonMdcs(string tenant, string oper, int cono, Guid sessionId, string function, string remotehost, string callGuid)
      {
         MappedDiagnosticsContext.Set("tenant", string.IsNullOrEmpty(tenant) ? "DefaultTenant" : tenant);
         MappedDiagnosticsContext.Set("oper", oper.StripOffDomain());
         MappedDiagnosticsContext.Set("cono", cono.ToString());
         MappedDiagnosticsContext.Set("sessionid", sessionId.ToString("D"));
         MappedDiagnosticsContext.Set("function", function);
         MappedDiagnosticsContext.Set("remotehost", remotehost);
         MappedDiagnosticsContext.Set("callguid", callGuid);
         MappedDiagnosticsContext.Set("where", string.Empty);
         MappedDiagnosticsContext.Set("elapsed", string.Empty);
         MappedDiagnosticsContext.Set("fldlist", string.Empty);
         MappedDiagnosticsContext.Set("batchsize", string.Empty);
         MappedDiagnosticsContext.Set("exclude", string.Empty);
      }

      public void Debug(string message)
      {
         this.Debug(message, string.Empty);
      }

      public void Trace(string message)
      {
         this.Trace(message, string.Empty);
      }

      public void Info(string message)
      {
         this.Info(message, string.Empty);
      }

      public void Warn(string message)
      {
         this.Warn(message, string.Empty);
      }

      public void Error(string message)
      {
         this.Error(message, string.Empty);
      }

      public void ErrorException(string message, Exception exception)
      {
         this.ErrorException(message, exception, string.Empty);
      }

      public void Fatal(string message)
      {
         this.Fatal(message, string.Empty);
      }

      public void FatalException(string message, Exception exception)
      {
         this.FatalException(message, exception, string.Empty);
      }

      public void Debug(string message, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Debug(message);
      }

      public void Trace(string message, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Trace(message);
      }

      public void Info(string message, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Info(message);
      }

      public void Warn(string message, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Warn(message);
      }

      public void Error(string message, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Error(message);
      }

      public void ErrorException(string message, Exception exception, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Error(exception, message);
      }

      public void Fatal(string message, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Fatal(message);
      }

      public void FatalException(string message, Exception exception, string functionName)
      {
         if (!string.IsNullOrEmpty(functionName)) MappedDiagnosticsContext.Set("function", functionName);
         this.Logger.Fatal(exception, message);
      }
   }
}