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
   using Models.Pdsicsebcompcriteria;
   using Models.Pdsicsebcompresults;
using Models.Pdsicsebresults;

   public partial class AsicsetupICSEBSaveRequestAPI
   {
      public List<Icsebcompresults> icsebcompresults { get; set; }
      public List<Icsebresults> icsebresults { get; set; }
      public Icsebcompcriteria icsebcompcriteria { get; set; }
 
    
      public AsicsetupICSEBSaveRequestAPI()
      {
         this.icsebcompresults = new List<Icsebcompresults>(); 
         this.icsebresults = new List<Icsebresults>(); 

      }
   }
}
#pragma warning restore 1591
