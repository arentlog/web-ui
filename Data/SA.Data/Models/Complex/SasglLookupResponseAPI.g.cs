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

namespace Infor.Sxe.SA.Data.Models.Complex
{
   using Models.Pdssalocaltaxlookup;

   public partial class SasglLookupResponseAPI
   {
      public List<Salocaltaxlookupresults> salocaltaxlookupresults { get; set; }
      public bool lMoreRecords { get; set; }
 
    
      public SasglLookupResponseAPI()
      {
         this.salocaltaxlookupresults = new List<Salocaltaxlookupresults>(); 

      }
   }
}
#pragma warning restore 1591