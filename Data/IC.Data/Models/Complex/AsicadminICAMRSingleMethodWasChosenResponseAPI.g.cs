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
   using Models.Pdsicamrloadusagerateanalysistt;
   using Models.Pdsicamrusagesensitivity;
using Models.Pdssinglemethodwaschosen;

   public partial class AsicadminICAMRSingleMethodWasChosenResponseAPI
   {
      public List<Icamrloadusagerateanalysistt> icamrloadusagerateanalysistt { get; set; }
      public List<Icamrloadusagerateprodtt> icamrloadusagerateprodtt { get; set; }
      public List<Icamrusagerateanalysisupdtt> icamrusagerateanalysisupdtt { get; set; }
      public Icamrusagesensitivitysingle icamrusagesensitivitysingle { get; set; }
      public Singlemethodwaschosencrit singlemethodwaschosencrit { get; set; }
 
    
      public AsicadminICAMRSingleMethodWasChosenResponseAPI()
      {
         this.icamrloadusagerateanalysistt = new List<Icamrloadusagerateanalysistt>(); 
         this.icamrloadusagerateprodtt = new List<Icamrloadusagerateprodtt>(); 
         this.icamrusagerateanalysisupdtt = new List<Icamrusagerateanalysisupdtt>(); 

      }
   }
}
#pragma warning restore 1591
