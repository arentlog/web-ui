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

namespace Infor.Sxe.PD.Data.Models.Complex
{
   using Models.Pdspdspcustprodsearch;

   public partial class AspdsetupPDSPCustProdSearchResponseAPI
   {
      public List<Pdspcustprodresults> pdspcustprodresults { get; set; }
      public Pdspcprecnoresults pdspcprecnoresults { get; set; }
      public bool lMorerecords { get; set; }
      [StringValidation]
      public string cWarningMsg { get; set; }
 
    
      public AspdsetupPDSPCustProdSearchResponseAPI()
      {
         this.pdspcustprodresults = new List<Pdspcustprodresults>(); 

      }
   }
}
#pragma warning restore 1591
