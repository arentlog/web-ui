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
   using Models.Pdswavesummary;

   public partial class AstwlinquiryGetWaveSummaryResponseAPI
   {
      public List<Wavesummarycartons> wavesummarycartons { get; set; }
      public List<Wavesummarypicks> wavesummarypicks { get; set; }
      public List<Wavesummaryshipments> wavesummaryshipments { get; set; }
      public List<Wavesummaryzones> wavesummaryzones { get; set; }
      public Wavesummary wavesummary { get; set; }
 
    
      public AstwlinquiryGetWaveSummaryResponseAPI()
      {
         this.wavesummarycartons = new List<Wavesummarycartons>(); 
         this.wavesummarypicks = new List<Wavesummarypicks>(); 
         this.wavesummaryshipments = new List<Wavesummaryshipments>(); 
         this.wavesummaryzones = new List<Wavesummaryzones>(); 

      }
   }
}
#pragma warning restore 1591
