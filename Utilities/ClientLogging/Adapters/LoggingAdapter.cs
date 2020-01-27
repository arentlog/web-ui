using System;
using Logging.Logging;
using ServiceInterfaceClient.Interfaces;

namespace ClientLogging.Adapters
{
   public class LoggingAdapter : IAdapter, IDisposable
   {
      private bool disposed;

      protected static NLogLogger NLogLogger { get; private set; }

      public LoggingAdapter()
      {
         NLogLogger = new NLogLogger(string.Empty);
      }

      public void LogFatal(string message, string function)
      {
         NLogLogger.Fatal(message, function);
      }

      public void LogError(string message, string function)
      {
         NLogLogger.Error(message, function);
      }

      public void LogWarn(string message, string function)
      {
         NLogLogger.Warn(message, function);
      }

      public void LogInfo(string message, string function)
      {
         NLogLogger.Info(message, function);
      }

      public void LogDebug(string message, string function)
      {
         NLogLogger.Debug(message, function);
      }

      public void LogTrace(string message, string function)
      {
         NLogLogger.Trace(message, function);
      }

      public void Dispose()
      {
         this.Dispose(true);
         GC.SuppressFinalize(this);
      }

      protected virtual void Dispose(bool disposing)
      {
         if (this.disposed)
         {
            return;
         }
         this.disposed = true;
      }

      ~LoggingAdapter()
      {
         this.Dispose(false);
      }

      public virtual void SetConnectionFromToken()
      {
      }
   }
}