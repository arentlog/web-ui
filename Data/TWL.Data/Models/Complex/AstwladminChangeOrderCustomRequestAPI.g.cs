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

namespace Infor.Sxe.TWL.Data.Models.Complex
{
   using Models.Pdsomorderkey;

   public partial class AstwladminChangeOrderCustomRequestAPI
   {
      public Omorderkey omorderkey { get; set; }
      [StringValidation]
      public string custom1 { get; set; }
      [StringValidation]
      public string custom2 { get; set; }
      [StringValidation]
      public string custom3 { get; set; }
      [StringValidation]
      public string custom4 { get; set; }
      [StringValidation]
      public string custom5 { get; set; }
 
    
      public AstwladminChangeOrderCustomRequestAPI()
      {

      }
   }
}
#pragma warning restore 1591
