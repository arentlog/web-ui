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
   using Models.Pdsarececoddata;
   using Models.Pdsareceglobaldata;
using Models.Pdsarecemaindata;

   public partial class AsarentryARECECODValidateResponseAPI
   {
      public List<Arececoddata> arececoddata { get; set; }
      public Areceglobaldata areceglobaldata { get; set; }
      public Arecemaindata arecemaindata { get; set; }
      public bool lOK { get; set; }
      [StringValidation]
      public string cCreditRefer { get; set; }
      public decimal deCreditAmount { get; set; }
      [StringValidation]
      public string cDivnos { get; set; }
      [StringValidation]
      public string cDivamounts { get; set; }
      public bool lRunmisc { get; set; }
 
    
      public AsarentryARECECODValidateResponseAPI()
      {
         this.arececoddata = new List<Arececoddata>(); 

      }
   }
}
#pragma warning restore 1591
