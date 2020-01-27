namespace Infor.Sxe.Web.HealthCheck.Models
{
   public class HealthCheckModel
   {
      public string success { get; set; }

      public string web { get; set; }

      public string ejb { get; set; }

      public string failuremessage { get; set; }

      public string messagingservice { get; set; }
   }
}