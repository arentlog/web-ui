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
   using Models.Pdsloadpoaddons;

   public partial class AspoinquiryLoadPOAddonsResponseAPI
   {
      public List<Loadpoaddonsresults> loadpoaddonsresults { get; set; }
      public Loadpoaddonssingle loadpoaddonssingle { get; set; }
 
    
      public AspoinquiryLoadPOAddonsResponseAPI()
      {
         this.loadpoaddonsresults = new List<Loadpoaddonsresults>(); 

      }
   }
}
#pragma warning restore 1591
