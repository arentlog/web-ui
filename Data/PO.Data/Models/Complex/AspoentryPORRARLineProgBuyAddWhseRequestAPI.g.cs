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

namespace Infor.Sxe.PO.Data.Models.Complex
{
   using Models.Pdsporrarlineprogbuy;

   public partial class AspoentryPORRARLineProgBuyAddWhseRequestAPI
   {
      public List<Porrarlineprogbuywhses> porrarlineprogbuywhses { get; set; }
      public Porrarlineprogbuy porrarlineprogbuy { get; set; }
      [StringValidation]
      public string cNewWhse { get; set; }
 
    
      public AspoentryPORRARLineProgBuyAddWhseRequestAPI()
      {
         this.porrarlineprogbuywhses = new List<Porrarlineprogbuywhses>(); 

      }
   }
}
#pragma warning restore 1591
