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
   using Models.Pdsapeiinvdetfinalupdt;
   using Models.Pdsapeirowids;
using Models.Pdsprintersettings;

   public partial class AsapentryAPEIInvDetFinalUpdateRequestAPI
   {
      public List<Apeirowids> apeirowids { get; set; }
      public Apeiinvdetfinalupdt apeiinvdetfinalupdt { get; set; }
      public Printersettings printersettings { get; set; }
 
    
      public AsapentryAPEIInvDetFinalUpdateRequestAPI()
      {
         this.apeirowids = new List<Apeirowids>(); 

      }
   }
}
#pragma warning restore 1591
