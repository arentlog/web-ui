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

namespace Infor.Sxe.TWL.Data.Models.Complex
{
   using Models.Pdslocpendmoverepresults;
   using Models.Pdsmovemst;

   public partial class AstwlinquiryGetLocationPendingMoveResponseAPI
   {
      public List<Movemst> movemst { get; set; }
      public Locpendmoverepresults locpendmoverepresults { get; set; }
 
    
      public AstwlinquiryGetLocationPendingMoveResponseAPI()
      {
         this.movemst = new List<Movemst>(); 

      }
   }
}
#pragma warning restore 1591