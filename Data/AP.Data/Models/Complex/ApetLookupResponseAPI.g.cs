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

namespace Infor.Sxe.AP.Data.Models.Complex
{
   using Models.Pdsapetlookup;

   public partial class ApetLookupResponseAPI
   {
      public List<Apetlookupresults> apetlookupresults { get; set; }
      public bool lMoreRecords { get; set; }
 
    
      public ApetLookupResponseAPI()
      {
         this.apetlookupresults = new List<Apetlookupresults>(); 

      }
   }
}
#pragma warning restore 1591
