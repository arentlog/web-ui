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
   using Models.Pdsgeneratelabelprintcriteria;
   using Models.Pdsgeneratelabelprtbincrit;
using Models.Pdsgeneratelabelprtinvcrit;
using Models.Pdsgeneratelabelprtitmcrit;

   public partial class AstwladminGenerateLabelPrintRequestAPI
   {
      public List<Generatelabelprtbincrit> generatelabelprtbincrit { get; set; }
      public List<Generatelabelprtinvcrit> generatelabelprtinvcrit { get; set; }
      public List<Generatelabelprtitmcrit> generatelabelprtitmcrit { get; set; }
      public Generatelabelprintcriteria generatelabelprintcriteria { get; set; }
 
    
      public AstwladminGenerateLabelPrintRequestAPI()
      {
         this.generatelabelprtbincrit = new List<Generatelabelprtbincrit>(); 
         this.generatelabelprtinvcrit = new List<Generatelabelprtinvcrit>(); 
         this.generatelabelprtitmcrit = new List<Generatelabelprtitmcrit>(); 

      }
   }
}
#pragma warning restore 1591