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

namespace Infor.Sxe.RS.Data.Models.Complex
{
   using Models.Pdsrssqqueue;

   public partial class AsrssetupRSSQQueueSimpleRequestsRequestAPI
   {
      public List<Rssqqueue> rssqqueue { get; set; }
      [StringValidation]
      public string cAction { get; set; }
      public int iNbrRcds { get; set; }
      [StringValidation]
      public string cAnswer { get; set; }
 
    
      public AsrssetupRSSQQueueSimpleRequestsRequestAPI()
      {
         this.rssqqueue = new List<Rssqqueue>(); 

      }
   }
}
#pragma warning restore 1591
