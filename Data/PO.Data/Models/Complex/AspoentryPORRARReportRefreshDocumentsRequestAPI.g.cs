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

namespace Infor.Sxe.PO.Data.Models.Complex
{
   using Models.Pdsporrarreptrefreshdoc;
   using Models.Pdsporrarrepttotals;

   public partial class AspoentryPORRARReportRefreshDocumentsRequestAPI
   {
      public List<Porrarreptrefreshdocrepts> porrarreptrefreshdocrepts { get; set; }
      public Porrarrepttotals porrarrepttotals { get; set; }
 
    
      public AspoentryPORRARReportRefreshDocumentsRequestAPI()
      {
         this.porrarreptrefreshdocrepts = new List<Porrarreptrefreshdocrepts>(); 

      }
   }
}
#pragma warning restore 1591
