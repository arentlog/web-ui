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
   using Models.Pdskitscriteria;

   public partial class AsoeinquiryKitCreateKeywordsTTRequestAPI
   {
      public Kitscriteria kitscriteria { get; set; }
      [StringValidation]
      public string cKeyWords { get; set; }
 
    
      public AsoeinquiryKitCreateKeywordsTTRequestAPI()
      {

      }
   }
}
#pragma warning restore 1591
