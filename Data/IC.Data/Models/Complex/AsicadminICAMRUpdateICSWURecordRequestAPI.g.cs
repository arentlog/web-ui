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

namespace Infor.Sxe.IC.Data.Models.Complex
{
   using Models.Pdsloadusagehistory;

   public partial class AsicadminICAMRUpdateICSWURecordRequestAPI
   {
      public List<Loadusagehistoryresults> loadusagehistoryresults { get; set; }
      public Loadusagecriteria loadusagecriteria { get; set; }
      public Loadusagehistorysingle loadusagehistorysingle { get; set; }
 
    
      public AsicadminICAMRUpdateICSWURecordRequestAPI()
      {
         this.loadusagehistoryresults = new List<Loadusagehistoryresults>(); 

      }
   }
}
#pragma warning restore 1591
