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

   public partial class AspoentryPOERBBuildBlanketLinesResponseAPI
   {
      public List<Poblanketlinesresults> poblanketlinesresults { get; set; }
      public List<Poblanketlinesupdateresults> poblanketlinesupdateresults { get; set; }
      public Poblanketlinessingle poblanketlinessingle { get; set; }
 
    
      public AspoentryPOERBBuildBlanketLinesResponseAPI()
      {
         this.poblanketlinesresults = new List<Poblanketlinesresults>(); 
         this.poblanketlinesupdateresults = new List<Poblanketlinesupdateresults>(); 

      }
   }
}
#pragma warning restore 1591
