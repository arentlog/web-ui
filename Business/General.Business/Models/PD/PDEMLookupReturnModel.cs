using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.PD
{
   public class PDEMLookupReturnModel
   {
      [StringValidation]
      public string codeval { get; set; }

      [StringValidation]
      public string descrip { get; set; }
   }
}