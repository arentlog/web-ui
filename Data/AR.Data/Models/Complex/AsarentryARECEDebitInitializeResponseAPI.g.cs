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
   using Models.Pdsareceinvoicesdata;
   using Models.Pdsareceinvoiceslist;

   public partial class AsarentryARECEDebitInitializeResponseAPI
   {
      public List<Areceinvoiceslist> areceinvoiceslist { get; set; }
      public Areceinvoicesdata areceinvoicesdata { get; set; }
 
    
      public AsarentryARECEDebitInitializeResponseAPI()
      {
         this.areceinvoiceslist = new List<Areceinvoiceslist>(); 

      }
   }
}
#pragma warning restore 1591
