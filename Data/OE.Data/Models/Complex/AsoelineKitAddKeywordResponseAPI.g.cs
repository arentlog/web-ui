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
   using Models.Pdsloadtcomps;
   using Models.Pdsoelinelinetie;

   public partial class AsoelineKitAddKeywordResponseAPI
   {
      public List<Loadtcompsresults> loadtcompsresults { get; set; }
      public List<Loadtcompssubresults> loadtcompssubresults { get; set; }
      public List<Oelinelinetie> oelinelinetie { get; set; }
      public Loadtcompssingle loadtcompssingle { get; set; }
 
    
      public AsoelineKitAddKeywordResponseAPI()
      {
         this.loadtcompsresults = new List<Loadtcompsresults>(); 
         this.loadtcompssubresults = new List<Loadtcompssubresults>(); 
         this.oelinelinetie = new List<Oelinelinetie>(); 

      }
   }
}
#pragma warning restore 1591
