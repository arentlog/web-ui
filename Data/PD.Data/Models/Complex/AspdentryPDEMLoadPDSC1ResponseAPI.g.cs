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

namespace Infor.Sxe.PD.Data.Models.Complex
{
   using Models.Pdsmessaging;
   using Models.Pdspdemloadpdsc1;

   public partial class AspdentryPDEMLoadPDSC1ResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Pdemloadpdsc1results> pdemloadpdsc1results { get; set; }
      public List<Pdmerridpdsc1> pdmerridpdsc1 { get; set; }
 
    
      public AspdentryPDEMLoadPDSC1ResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.pdemloadpdsc1results = new List<Pdemloadpdsc1results>(); 
         this.pdmerridpdsc1 = new List<Pdmerridpdsc1>(); 

      }
   }
}
#pragma warning restore 1591
