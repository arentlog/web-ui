using System;
using System.Reflection;
using ServiceInterfaceClient.Interfaces;

namespace ServiceInterfaceClient.BaseClasses
{
   public class RepositoryBase : IRepository, IDisposable
   {
      public int Cono { get; set; }

      protected bool disposed;

      public RepositoryBase()
      {
      }

      public void SetConnectionFromToken()
      {
         var adapterField = this.GetType().GetField("adapter", BindingFlags.NonPublic | BindingFlags.Instance);
         var adapter = adapterField?.GetValue(this) as IAdapter;
         adapter?.SetConnectionFromToken();
      }

      protected virtual void Dispose(bool disposing)
      {
         if (this.disposed)
         {
            return;
         }
         this.disposed = true;
      }

      public void Dispose()
      {
         this.Dispose(true);
         GC.SuppressFinalize(this);
      }

      ~RepositoryBase()
      {
         this.Dispose(false);
      }
   }
}