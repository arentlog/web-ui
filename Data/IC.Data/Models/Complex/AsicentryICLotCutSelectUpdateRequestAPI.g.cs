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

namespace Infor.Sxe.IC.Data.Models.Complex
{
   using Models.Pdsicentrylots;
   using Models.Pdsiclotcutlist;

   public partial class AsicentryICLotCutSelectUpdateRequestAPI
   {
      public List<Lotcutlist> lotcutlist { get; set; }
      public Icentrylotscriteria icentrylotscriteria { get; set; }
      public Icentrylotslist icentrylotslist { get; set; }
      [StringValidation]
      public string cUpdateType { get; set; }
 
    
      public AsicentryICLotCutSelectUpdateRequestAPI()
      {
         this.lotcutlist = new List<Lotcutlist>(); 

      }
   }
}
#pragma warning restore 1591
