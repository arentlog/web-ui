using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class Errorlist
   {
      public int Severity { get; set; }
      public int Code { get; set; }
      [StringValidation]
      public string Message { get; set; }
   }
}