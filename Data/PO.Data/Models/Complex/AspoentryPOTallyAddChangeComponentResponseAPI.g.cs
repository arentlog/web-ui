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
   using Models.Pdsloadpotally;
   using Models.Pdsmessaging;
using Models.Pdspotallycomponent;

   public partial class AspoentryPOTallyAddChangeComponentResponseAPI
   {
      public List<Loadpotallyresults> loadpotallyresults { get; set; }
      public List<Messaging> messaging { get; set; }
      public Loadpotallysingle loadpotallysingle { get; set; }
      public Potallycomponent potallycomponent { get; set; }
 
    
      public AspoentryPOTallyAddChangeComponentResponseAPI()
      {
         this.loadpotallyresults = new List<Loadpotallyresults>(); 
         this.messaging = new List<Messaging>(); 

      }
   }
}
#pragma warning restore 1591
