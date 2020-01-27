using ServiceInterfaceClient.Attributes;

namespace ClientLogging.Models
{
   public class LoggingMessage
   {
      [StringValidation]
      public string Message { get; set; }
      [StringValidation]
      public string Function { get; set; }
      [StringValidation]
      public string ClientFunction => $"Client-({this.Function})";
   }
}