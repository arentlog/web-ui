using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class IcsdpSavePwRequestApi 
   {
      [StringValidation]
      public string cWhse { get; set; }

      public int iMediaCd { get; set; }

      [StringValidation]
      public string cMerchantPassword { get; set; }
   }
}