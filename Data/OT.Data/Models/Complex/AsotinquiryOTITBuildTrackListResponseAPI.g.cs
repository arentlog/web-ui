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

namespace Infor.Sxe.OT.Data.Models.Complex
{
   using Models.Pdsotittracklist;

   public partial class AsotinquiryOTITBuildTrackListResponseAPI
   {
      public List<Otittrackresults1> otittrackresults1 { get; set; }
      public List<Otittrackresults2> otittrackresults2 { get; set; }
      public List<Otittrackresults3> otittrackresults3 { get; set; }
 
    
      public AsotinquiryOTITBuildTrackListResponseAPI()
      {
         this.otittrackresults1 = new List<Otittrackresults1>(); 
         this.otittrackresults2 = new List<Otittrackresults2>(); 
         this.otittrackresults3 = new List<Otittrackresults3>(); 

      }
   }
}
#pragma warning restore 1591
