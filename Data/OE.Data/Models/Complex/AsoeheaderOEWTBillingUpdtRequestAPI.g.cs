//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 6149 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.Collections.Generic;
using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.OE.Data.Models.Complex
{
   using Models.Pdsoewtbillingsearch;

   public partial class AsoeheaderOEWTBillingUpdtRequestAPI
   {
      public List<Oewtbillingresults> oewtbillingresults { get; set; }
      public Oewtbillingcriteria oewtbillingcriteria { get; set; }
      [StringValidation]
      public string cUpdType { get; set; }
 
    
      public AsoeheaderOEWTBillingUpdtRequestAPI()
      {
         this.oewtbillingresults = new List<Oewtbillingresults>(); 

      }
   }
}
#pragma warning restore 1591
