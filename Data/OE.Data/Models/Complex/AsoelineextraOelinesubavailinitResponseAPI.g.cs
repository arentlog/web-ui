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
   using Models.Pdsoelinesuperavail;

   public partial class AsoelineextraOelinesubavailinitResponseAPI
   {
      public List<Oelinesuperavailresults> oelinesuperavailresults { get; set; }
      public Oelinesuperavailcriteria oelinesuperavailcriteria { get; set; }
 
    
      public AsoelineextraOelinesubavailinitResponseAPI()
      {
         this.oelinesuperavailresults = new List<Oelinesuperavailresults>(); 

      }
   }
}
#pragma warning restore 1591