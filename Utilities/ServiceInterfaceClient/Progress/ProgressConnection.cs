using System;
using Progress.Open4GL.Proxy;

namespace ServiceInterfaceClient.Progress
{
   public class ProgressConnection : IProgressConnection, IDisposable
   {
      private readonly bool ownsConnection;

      private bool disposed;

      public Connection Connection { get; set; }

      public ProgressConnection(Connection connection)
      {
         this.Connection = connection;
         var progressConfiguration = new ProgressConfiguration();
         this.Connection.CompressionEnabled = progressConfiguration.ProgressSessionCompressionEnabled;
         this.Connection.CompressionLevel = progressConfiguration.ProgressSessionCompressionLevel;
         this.Connection.CompressionEnabled = progressConfiguration.ProgressSessionCompressionEnabled;
         this.ownsConnection = connection.SessionModel != SessionModelConstants.SessionFree || progressConfiguration.InforProgressOwnsConnection;
      }

      public int CompanyNumber { get; set; }

      public string Operator { get; set; }

      public string SessionId { get; set; }

      public string CurrentUiCulture { get; set; }

      public int DefaultRecordCount { get; set; }

      protected virtual void Dispose(bool disposing)
      {
         if (this.disposed) { return; }

         if (Connection.SessionModel == SessionModelConstants.SessionFree)
         {
            Connection.ReleaseConnection();
         }

         if (disposing && (this.Connection != null && this.ownsConnection))
         {
            this.Connection.Dispose();
         }

         this.disposed = true;
      }

      public void Dispose()
      {
         this.Dispose(true);
         GC.SuppressFinalize(this);
      }

      ~ProgressConnection()
      {
         this.Dispose(false);
      }
   }
}