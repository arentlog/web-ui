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
   using Models.Pdsmultilinesourcing;
   using Models.Pdsoeiolines;

   public partial class AsoelineOEMultiLineSourcingPreValidateRequestAPI
   {
      public List<Oeiolinesresults> oeiolinesresults { get; set; }
      public Multilinesourcing multilinesourcing { get; set; }
 
    
      public AsoelineOEMultiLineSourcingPreValidateRequestAPI()
      {
         this.oeiolinesresults = new List<Oeiolinesresults>(); 

      }
   }
}
#pragma warning restore 1591
