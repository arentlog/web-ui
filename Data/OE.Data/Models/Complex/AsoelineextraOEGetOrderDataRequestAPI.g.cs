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
   using Models.Pdsoecalcordshptot;
   using Models.Pdsoeheaderretrieve;
using Models.Pdsoeiolines;

   public partial class AsoelineextraOEGetOrderDataRequestAPI
   {
      public Oecalcordshptotcriteria oecalcordshptotcriteria { get; set; }
      public Oeheaderretrievecriteria oeheaderretrievecriteria { get; set; }
      public Oeiolinescriteria oeiolinescriteria { get; set; }
 
    
      public AsoelineextraOEGetOrderDataRequestAPI()
      {

      }
   }
}
#pragma warning restore 1591
