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
   using Models.Pdspdemloadpdsc3;

   public partial class AspdentryPDEMLoadPDSC3RequestAPI
   {
      public List<Pdmerridpdsc3> pdmerridpdsc3 { get; set; }
      public Pdemloadpdsc3criteria pdemloadpdsc3criteria { get; set; }
 
    
      public AspdentryPDEMLoadPDSC3RequestAPI()
      {
         this.pdmerridpdsc3 = new List<Pdmerridpdsc3>(); 

      }
   }
}
#pragma warning restore 1591
