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

namespace Infor.Sxe.WT.Data.Models.Complex
{
   using Models.Pdswtesdetailline;

   public partial class AswtentryWTESDetailLineCheckSerLotRequestAPI
   {
      public Wtesdetailline wtesdetailline { get; set; }
      public int iLineNo { get; set; }
      [StringValidation]
      public string cShipFmWhse { get; set; }
      public bool lIsFromMenu { get; set; }
 
    
      public AswtentryWTESDetailLineCheckSerLotRequestAPI()
      {

      }
   }
}
#pragma warning restore 1591