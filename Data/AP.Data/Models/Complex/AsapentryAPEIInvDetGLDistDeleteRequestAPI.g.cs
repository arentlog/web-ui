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

namespace Infor.Sxe.AP.Data.Models.Complex
{
   using Models.Pdsapeiinvdetgldistproof;
   using Models.Pdsapeirowids;

   public partial class AsapentryAPEIInvDetGLDistDeleteRequestAPI
   {
      public List<Apeirowids> apeirowids { get; set; }
      public Apeiinvdetgldistproof apeiinvdetgldistproof { get; set; }
 
    
      public AsapentryAPEIInvDetGLDistDeleteRequestAPI()
      {
         this.apeirowids = new List<Apeirowids>(); 

      }
   }
}
#pragma warning restore 1591
