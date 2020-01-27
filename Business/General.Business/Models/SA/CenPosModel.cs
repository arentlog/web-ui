using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.SA
{
   public class CenPosModel
   {
      [StringValidation]
      public string CenPosUri { get; set; }

      [StringValidation]
      public string PopTitleType { get; set; }
   }
}