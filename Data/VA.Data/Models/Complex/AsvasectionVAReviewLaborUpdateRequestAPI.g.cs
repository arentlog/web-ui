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

namespace Infor.Sxe.VA.Data.Models.Complex
{
   using Models.Pdsvalinelaborreview;

   public partial class AsvasectionVAReviewLaborUpdateRequestAPI
   {
      public List<Valinelaborreview> valinelaborreview { get; set; }
      public Valinelaborreviewcriteria valinelaborreviewcriteria { get; set; }
      public Valinelaborreviewtotals valinelaborreviewtotals { get; set; }
      [StringValidation]
      public string cThisFunction { get; set; }
 
    
      public AsvasectionVAReviewLaborUpdateRequestAPI()
      {
         this.valinelaborreview = new List<Valinelaborreview>(); 

      }
   }
}
#pragma warning restore 1591