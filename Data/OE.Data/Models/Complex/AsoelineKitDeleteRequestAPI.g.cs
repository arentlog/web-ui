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
   using Models.Pdskitscriteria;
   using Models.Pdsloadtcomps;

   public partial class AsoelineKitDeleteRequestAPI
   {
      public List<Loadtcompsresults> loadtcompsresults { get; set; }
      public List<Loadtcompssubresults> loadtcompssubresults { get; set; }
      public Kitscriteria kitscriteria { get; set; }
 
    
      public AsoelineKitDeleteRequestAPI()
      {
         this.loadtcompsresults = new List<Loadtcompsresults>(); 
         this.loadtcompssubresults = new List<Loadtcompssubresults>(); 

      }
   }
}
#pragma warning restore 1591
