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

namespace Infor.Sxe.AR.Data.Models.Complex
{
   using Models.Pdsarelecheckdtl;
   using Models.Pdsarelecheckdtlwo;
using Models.Pdsarelecheckhdr;

   public partial class AsarentryARELEDtlUndoChangesResponseAPI
   {
      public List<Arelecheckdtlwo> arelecheckdtlwo { get; set; }
      public Arelecheckdtl arelecheckdtl { get; set; }
      public Arelecheckhdr arelecheckhdr { get; set; }
 
    
      public AsarentryARELEDtlUndoChangesResponseAPI()
      {
         this.arelecheckdtlwo = new List<Arelecheckdtlwo>(); 

      }
   }
}
#pragma warning restore 1591
