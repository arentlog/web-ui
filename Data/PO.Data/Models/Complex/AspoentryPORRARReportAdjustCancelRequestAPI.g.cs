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
   using Models.Pdsporrarreptadjretrieve;

   public partial class AspoentryPORRARReportAdjustCancelRequestAPI
   {
      public List<Porrarreptadjretrievehdr> porrarreptadjretrievehdr { get; set; }
      public List<Porrarreptadjretrievelns> porrarreptadjretrievelns { get; set; }
      public Porrarreptadjretrievesng porrarreptadjretrievesng { get; set; }
      public int iReportNo { get; set; }
 
    
      public AspoentryPORRARReportAdjustCancelRequestAPI()
      {
         this.porrarreptadjretrievehdr = new List<Porrarreptadjretrievehdr>(); 
         this.porrarreptadjretrievelns = new List<Porrarreptadjretrievelns>(); 

      }
   }
}
#pragma warning restore 1591
