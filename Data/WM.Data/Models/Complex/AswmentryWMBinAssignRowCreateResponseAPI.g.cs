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
   using Models.Pdsmessaging;
   using Models.Pdswmbinassignment;
using Models.Pdswmbinassignmenttrans;

   public partial class AswmentryWMBinAssignRowCreateResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Wmbinassignmenttrans> wmbinassignmenttrans { get; set; }
      public Wmbinassignment wmbinassignment { get; set; }
 
    
      public AswmentryWMBinAssignRowCreateResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.wmbinassignmenttrans = new List<Wmbinassignmenttrans>(); 

      }
   }
}
#pragma warning restore 1591