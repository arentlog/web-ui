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

namespace Infor.Sxe.KP.Data.Models.Complex
{
   using Models.Pdskpeuupdate;

   public partial class AskpentryKPEULoadTTResponseAPI
   {
      public List<Kpeuupdate> kpeuupdate { get; set; }
      public int iVerNo { get; set; }
 
    
      public AskpentryKPEULoadTTResponseAPI()
      {
         this.kpeuupdate = new List<Kpeuupdate>(); 

      }
   }
}
#pragma warning restore 1591
