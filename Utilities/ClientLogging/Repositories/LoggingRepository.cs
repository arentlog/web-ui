using System;
using ClientLogging.Adapters;
using Logging.Logging;
using ServiceInterfaceClient.Interfaces;

namespace ClientLogging.Repositories
{
   public class LoggingRespository : IRepository, IDisposable
   {
      private readonly LoggingAdapter adapter;

      private bool disposed;

      public LoggingRespository()
      {
         this.adapter = new LoggingAdapter();
      }

      public void LogFatal(string message, string function)
      {
         this.adapter.LogFatal(message, function);
      }

      public void LogError(string message, string function)
      {
         this.adapter.LogError(message, function);
      }

      public void LogWarn(string message, string function)
      {
         this.adapter.LogWarn(message, function);
      }

      public void LogInfo(string message, string function)
      {
         this.adapter.LogInfo(message, function);
      }

      public void LogDebug(string message, string function)
      {
         this.adapter.LogDebug(message, function);
      }

      public void LogTrace(string message, string function)
      {
         this.adapter.LogTrace(message, function);
      }

      public void Dispose()
      {
         this.Dispose(true);
         GC.SuppressFinalize(this);
      }

      protected virtual void Dispose(bool disposing)
      {
         this.adapter?.Dispose();
         if (this.disposed)
         {
            return;
         }
         this.disposed = true;
      }

      ~LoggingRespository()
      {
         this.Dispose(false);
      }
   }
}