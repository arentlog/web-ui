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

namespace Infor.Sxe.WM.Data.Models.Complex
{
   using Models.Pdswmbinassigncriteria;
   using Models.Pdswmbinassignment;
using Models.Pdswmbinassignmenttrans;

   public partial class AswmentryWMBinAssignAutoAllocateRequestAPI
   {
      public List<Wmbinassignmenttrans> wmbinassignmenttrans { get; set; }
      public Wmbinassigncriteria wmbinassigncriteria { get; set; }
      public Wmbinassignment wmbinassignment { get; set; }
 
    
      public AswmentryWMBinAssignAutoAllocateRequestAPI()
      {
         this.wmbinassignmenttrans = new List<Wmbinassignmenttrans>(); 

      }
   }
}
#pragma warning restore 1591
