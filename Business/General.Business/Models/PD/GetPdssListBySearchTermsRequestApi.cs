using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using System;

namespace General.Business.Models.PD
{
   public class GetPdssListBySearchTermsRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string whse { get; set; }

      [StringValidation]
      public string custptype { get; set; }

      [StringValidation]
      public string pricetype { get; set; }

      public DateTime? startdt { get; set; }
   }
}