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
   using Models.Pdsicseglookup;

   public partial class IcsegLookupResponseAPI
   {
      public List<Icseglookupresults> icseglookupresults { get; set; }
      public bool lMoreRecords { get; set; }
 
    
      public IcsegLookupResponseAPI()
      {
         this.icseglookupresults = new List<Icseglookupresults>(); 

      }
   }
}
#pragma warning restore 1591
