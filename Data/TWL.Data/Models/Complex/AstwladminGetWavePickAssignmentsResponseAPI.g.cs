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
   using Models.Pdswavepickassignments;

   public partial class AstwladminGetWavePickAssignmentsResponseAPI
   {
      public List<Wavepickpicks> wavepickpicks { get; set; }
      public List<Wavepickwaves> wavepickwaves { get; set; }
 
    
      public AstwladminGetWavePickAssignmentsResponseAPI()
      {
         this.wavepickpicks = new List<Wavepickpicks>(); 
         this.wavepickwaves = new List<Wavepickwaves>(); 

      }
   }
}
#pragma warning restore 1591
