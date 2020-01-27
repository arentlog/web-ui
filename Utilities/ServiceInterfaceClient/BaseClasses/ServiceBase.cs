using System;
using Logging.Logging;
using ServiceInterfaceClient.Interfaces;

namespace ServiceInterfaceClient.BaseClasses
{
   public class ServiceBase : IService, IDisposable
   {
      protected bool disposed;

      protected static NLogLogger NLogLogger { get; private set; }

      public ServiceBase()
      {
         NLogLogger = new NLogLogger(string.Empty);
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

      ~ServiceBase()
      {
         this.Dispose(false);
      }
   }
}