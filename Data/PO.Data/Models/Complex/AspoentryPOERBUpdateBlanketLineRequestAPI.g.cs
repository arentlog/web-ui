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
   using Models.Pdspoblanketlines;

   public partial class AspoentryPOERBUpdateBlanketLineRequestAPI
   {
      public List<Poblanketlinesresults> poblanketlinesresults { get; set; }
      public Poblanketlinescriteria poblanketlinescriteria { get; set; }
      public Poblanketlinessingle poblanketlinessingle { get; set; }
 
    
      public AspoentryPOERBUpdateBlanketLineRequestAPI()
      {
         this.poblanketlinesresults = new List<Poblanketlinesresults>(); 

      }
   }
}
#pragma warning restore 1591
