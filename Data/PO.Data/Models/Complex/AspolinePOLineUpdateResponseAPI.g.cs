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
   using Models.Pdsmessaging;
   using Models.Pdspoline;
using Models.Pdspolineties;

   public partial class AspolinePOLineUpdateResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Polineties> polineties { get; set; }
      public Poline poline { get; set; }
      [StringValidation]
      public string cUpdateMessage { get; set; }
 
    
      public AspolinePOLineUpdateResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.polineties = new List<Polineties>(); 

      }
   }
}
#pragma warning restore 1591
