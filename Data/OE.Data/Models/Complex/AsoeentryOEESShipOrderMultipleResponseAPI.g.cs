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
   using Models.Pdsmessaging;
   using Models.Pdsoeesshipordermultiple;

   public partial class AsoeentryOEESShipOrderMultipleResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Oeesshipordermultiple> oeesshipordermultiple { get; set; }
      public bool lIBRSFl { get; set; }
 
    
      public AsoeentryOEESShipOrderMultipleResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.oeesshipordermultiple = new List<Oeesshipordermultiple>(); 

      }
   }
}
#pragma warning restore 1591
