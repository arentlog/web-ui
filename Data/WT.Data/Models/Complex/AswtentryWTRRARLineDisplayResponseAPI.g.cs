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

namespace Infor.Sxe.WT.Data.Models.Complex
{
   using Models.Pdswtrrarlinedspl;
   using Models.Pdswtrrarlinetotals;

   public partial class AswtentryWTRRARLineDisplayResponseAPI
   {
      public List<Wtrrarlinedsplline> wtrrarlinedsplline { get; set; }
      public Wtrrarlinetotals wtrrarlinetotals { get; set; }
 
    
      public AswtentryWTRRARLineDisplayResponseAPI()
      {
         this.wtrrarlinedsplline = new List<Wtrrarlinedsplline>(); 

      }
   }
}
#pragma warning restore 1591
