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
   using Models.Pdsareceinvoicesdata;
using Models.Pdsareceinvoiceslist;
using Models.Pdsarecemaindata;
using Models.Pdsarecesimcdiv;
using Models.Pdsareceupdatescrnoutput;

   public partial class AsarentryARECEInvoicesValidateRequestAPI
   {
      public List<Areceinvoiceslist> areceinvoiceslist { get; set; }
      public List<Arecesimcdiv> arecesimcdiv { get; set; }
      public Areceglobaldata areceglobaldata { get; set; }
      public Areceinvoicesdata areceinvoicesdata { get; set; }
      public Arecemaindata arecemaindata { get; set; }
      public Areceupdatescrnoutput areceupdatescrnoutput { get; set; }
      public int pvJrnlno { get; set; }
 
    
      public AsarentryARECEInvoicesValidateRequestAPI()
      {
         this.areceinvoiceslist = new List<Areceinvoiceslist>(); 
         this.arecesimcdiv = new List<Arecesimcdiv>(); 

      }
   }
}
#pragma warning restore 1591
