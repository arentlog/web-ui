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
   using Models.Pdsareceglobaldata;
   using Models.Pdsareceinvoiceslist;
using Models.Pdsarecemaindata;

   public partial class AsarentryARECEDebitLeaveFieldRequestAPI
   {
      public Areceglobaldata areceglobaldata { get; set; }
      public Areceinvoiceslist areceinvoiceslist { get; set; }
      public Arecemaindata arecemaindata { get; set; }
      [StringValidation]
      public string cField { get; set; }
 
    
      public AsarentryARECEDebitLeaveFieldRequestAPI()
      {

      }
   }
}
#pragma warning restore 1591
