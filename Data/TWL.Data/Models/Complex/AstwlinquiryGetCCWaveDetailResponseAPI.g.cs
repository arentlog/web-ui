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

namespace Infor.Sxe.TWL.Data.Models.Complex
{
   using Models.Pdsccinquirysummary;
   using Models.Pdsinventorylistresults;

   public partial class AstwlinquiryGetCCWaveDetailResponseAPI
   {
      public List<Inventorylistresults> inventorylistresults { get; set; }
      public Ccinquirysummary ccinquirysummary { get; set; }
 
    
      public AstwlinquiryGetCCWaveDetailResponseAPI()
      {
         this.inventorylistresults = new List<Inventorylistresults>(); 

      }
   }
}
#pragma warning restore 1591