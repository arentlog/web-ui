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
   using Models.Pdswtline;

   public partial class AswtlineWTLineUpdateRequestAPI
   {
      public List<Wtlnties> wtlnties { get; set; }
      public Wtline wtline { get; set; }
      public bool lMaintMode { get; set; }
      [StringValidation]
      public string cChangeList { get; set; }
 
    
      public AswtlineWTLineUpdateRequestAPI()
      {
         this.wtlnties = new List<Wtlnties>(); 

      }
   }
}
#pragma warning restore 1591