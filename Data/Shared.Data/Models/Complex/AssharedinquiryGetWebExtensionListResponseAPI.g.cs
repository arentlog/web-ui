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
   using Models.Pdswebextendrecord;

   public partial class AssharedinquiryGetWebExtensionListResponseAPI
   {
      public List<Webextendrecord> webextendrecord { get; set; }
      public bool lMoreRecords { get; set; }
 
    
      public AssharedinquiryGetWebExtensionListResponseAPI()
      {
         this.webextendrecord = new List<Webextendrecord>(); 

      }
   }
}
#pragma warning restore 1591
