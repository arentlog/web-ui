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

namespace Infor.Sxe.OT.Data.Models.Complex
{
   using Models.Pdsmessaging;
   using Models.Pdsotaddons;
using Models.Pdsotettrackdetail;
using Models.Pdsotittrackline;

   public partial class AsotentryOTETAddPOLineUpdateResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Otaddons> otaddons { get; set; }
      public List<Otittrackline> otittrackline { get; set; }
      public Otettrackdetail otettrackdetail { get; set; }
 
    
      public AsotentryOTETAddPOLineUpdateResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.otaddons = new List<Otaddons>(); 
         this.otittrackline = new List<Otittrackline>(); 

      }
   }
}
#pragma warning restore 1591
