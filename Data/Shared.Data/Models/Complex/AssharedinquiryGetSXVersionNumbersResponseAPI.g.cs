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

namespace Infor.Sxe.Shared.Data.Models.Complex
{


   public partial class AssharedinquiryGetSXVersionNumbersResponseAPI
   {
      [StringValidation]
      public string cDisplayVersion { get; set; }
      [StringValidation]
      public string cInternalVersion { get; set; }
      [StringValidation]
      public string cESBVersion { get; set; }
      [StringValidation]
      public string cSIVersion { get; set; }
 
    
      public AssharedinquiryGetSXVersionNumbersResponseAPI()
      {

      }
   }
}
#pragma warning restore 1591
