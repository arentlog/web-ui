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
   using Models.Pdsoeline;
   using Models.Pdsoelinenonstock;
using Models.Pdsoelinenonstockhdr;

   public partial class AsoelineOELineNonStockLeaveFieldRequestAPI
   {
      public Oeline oeline { get; set; }
      public Oelinenonstock oelinenonstock { get; set; }
      public Oelinenonstockhdr oelinenonstockhdr { get; set; }
      [StringValidation]
      public string cFieldName { get; set; }
 
    
      public AsoelineOELineNonStockLeaveFieldRequestAPI()
      {

      }
   }
}
#pragma warning restore 1591
