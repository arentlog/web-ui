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

namespace Infor.Sxe.IC.Data.Models.Complex
{
   using Models.Pdsicsprcaddchg;
   using Models.Pdsmessaging;

   public partial class AsicsetupICSPRCUpdateResponseAPI
   {
      public List<Icsprcaddchg> icsprcaddchg { get; set; }
      public List<Messaging> messaging { get; set; }
 
    
      public AsicsetupICSPRCUpdateResponseAPI()
      {
         this.icsprcaddchg = new List<Icsprcaddchg>(); 
         this.messaging = new List<Messaging>(); 

      }
   }
}
#pragma warning restore 1591
