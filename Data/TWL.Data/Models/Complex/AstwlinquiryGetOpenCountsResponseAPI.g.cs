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
   using Models.Pdsomopencounts;

   public partial class AstwlinquiryGetOpenCountsResponseAPI
   {
      public List<Opencountscarrier> opencountscarrier { get; set; }
      public List<Opencountscustomer> opencountscustomer { get; set; }
      public List<Opencountscustomer2> opencountscustomer2 { get; set; }
      public List<Opencountspriority> opencountspriority { get; set; }
      public List<Opencountsshipdate> opencountsshipdate { get; set; }
      public Opencountsummary opencountsummary { get; set; }
 
    
      public AstwlinquiryGetOpenCountsResponseAPI()
      {
         this.opencountscarrier = new List<Opencountscarrier>(); 
         this.opencountscustomer = new List<Opencountscustomer>(); 
         this.opencountscustomer2 = new List<Opencountscustomer2>(); 
         this.opencountspriority = new List<Opencountspriority>(); 
         this.opencountsshipdate = new List<Opencountsshipdate>(); 

      }
   }
}
#pragma warning restore 1591