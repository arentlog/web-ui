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
   using Models.Pdsetccdetdata849iline;
using Models.Pdsetccdetdata855ihdr;
using Models.Pdsetccdetdata855iline;

   public partial class AsedientryETCCDetailGetDataListResponseAPI
   {
      public List<Etccdetdata849ihdr> etccdetdata849ihdr { get; set; }
      public List<Etccdetdata849iline> etccdetdata849iline { get; set; }
      public List<Etccdetdata855ihdr> etccdetdata855ihdr { get; set; }
      public List<Etccdetdata855iline> etccdetdata855iline { get; set; }
 
    
      public AsedientryETCCDetailGetDataListResponseAPI()
      {
         this.etccdetdata849ihdr = new List<Etccdetdata849ihdr>(); 
         this.etccdetdata849iline = new List<Etccdetdata849iline>(); 
         this.etccdetdata855ihdr = new List<Etccdetdata855ihdr>(); 
         this.etccdetdata855iline = new List<Etccdetdata855iline>(); 

      }
   }
}
#pragma warning restore 1591
