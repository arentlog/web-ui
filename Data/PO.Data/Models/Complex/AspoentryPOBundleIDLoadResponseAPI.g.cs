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
   using Models.Pdspobundles;

   public partial class AspoentryPOBundleIDLoadResponseAPI
   {
      public List<Pobundlesresults> pobundlesresults { get; set; }
      public Pobundlescontrol pobundlescontrol { get; set; }
 
    
      public AspoentryPOBundleIDLoadResponseAPI()
      {
         this.pobundlesresults = new List<Pobundlesresults>(); 

      }
   }
}
#pragma warning restore 1591
