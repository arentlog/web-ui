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

namespace Infor.Sxe.OE.Data.Models.Complex
{
   using Models.Pdsoeetprint;
   using Models.Pdsprintersettings;

   public partial class AsoeentryOEETPrintValidateRequestAPI
   {
      public List<Oeetprintreportlist> oeetprintreportlist { get; set; }
      public List<Printersettings> printersettings { get; set; }
      public Oeetprintscreensingle oeetprintscreensingle { get; set; }
      public int iOrderNo { get; set; }
      public int iOrderSuf { get; set; }
 
    
      public AsoeentryOEETPrintValidateRequestAPI()
      {
         this.oeetprintreportlist = new List<Oeetprintreportlist>(); 
         this.printersettings = new List<Printersettings>(); 

      }
   }
}
#pragma warning restore 1591
