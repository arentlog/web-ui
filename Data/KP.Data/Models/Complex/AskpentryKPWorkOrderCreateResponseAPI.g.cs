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
   using Models.Pdskpewavail;
   using Models.Pdskpqentry;
using Models.Pdskpworkorder;

   public partial class AskpentryKPWorkOrderCreateResponseAPI
   {
      public Kpewavail kpewavail { get; set; }
      public Kpqentryresults kpqentryresults { get; set; }
      public Kpworkorder kpworkorder { get; set; }
 
    
      public AskpentryKPWorkOrderCreateResponseAPI()
      {

      }
   }
}
#pragma warning restore 1591