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

namespace Infor.Sxe.OE.Data.Models.Complex
{
   using Models.Pdsoeifsearch;

   public partial class AsoeinquiryOEIFUpdateRequestAPI
   {
      public List<Oeifsearchresults> oeifsearchresults { get; set; }
      public Oeifsearchcriteria oeifsearchcriteria { get; set; }
 
    
      public AsoeinquiryOEIFUpdateRequestAPI()
      {
         this.oeifsearchresults = new List<Oeifsearchresults>(); 

      }
   }
}
#pragma warning restore 1591