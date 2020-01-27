using Progress.Open4GL.Proxy;

namespace ServiceInterfaceClient.Progress
{
   public interface IProgressConnection
   {
      Connection Connection { get; set; }

      int CompanyNumber { get; set; }

      string Operator { get; set; }

      string SessionId { get; set; }

      string CurrentUiCulture { get; set; }

      int DefaultRecordCount { get; set; }
   }
}