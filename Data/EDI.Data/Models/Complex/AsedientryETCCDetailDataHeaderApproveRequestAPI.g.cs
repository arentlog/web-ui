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

namespace Infor.Sxe.EDI.Data.Models.Complex
{
   using Models.Pdsetccdetdata849ihdr;
   using Models.Pdsetccdetdata855ihdr;

   public partial class AsedientryETCCDetailDataHeaderApproveRequestAPI
   {
      public List<Etccdetdata849ihdr> etccdetdata849ihdr { get; set; }
      public List<Etccdetdata855ihdr> etccdetdata855ihdr { get; set; }
      [StringValidation]
      public string cApproveType { get; set; }
 
    
      public AsedientryETCCDetailDataHeaderApproveRequestAPI()
      {
         this.etccdetdata849ihdr = new List<Etccdetdata849ihdr>(); 
         this.etccdetdata855ihdr = new List<Etccdetdata855ihdr>(); 

      }
   }
}
#pragma warning restore 1591