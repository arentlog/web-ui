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
   using Models.Pdsporrarlineaccept;
using Models.Pdsporrarlinetotals;

   public partial class AspoentryPORRARLineLockUnlockResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Porrarlineaccept> porrarlineaccept { get; set; }
      public Porrarlinetotals porrarlinetotals { get; set; }
 
    
      public AspoentryPORRARLineLockUnlockResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.porrarlineaccept = new List<Porrarlineaccept>(); 

      }
   }
}
#pragma warning restore 1591
