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

namespace Infor.Sxe.AR.Data.Models.Complex
{
   using Models.Pdsarecewodata;
   using Models.Pdsarecewodisplay;
using Models.Pdsareceworeport;

   public partial class AsarentryARECEWOAddRequestAPI
   {
      public List<Arecewodata> arecewodata { get; set; }
      public List<Areceworeport> areceworeport { get; set; }
      public Arecewodisplay arecewodisplay { get; set; }
 
    
      public AsarentryARECEWOAddRequestAPI()
      {
         this.arecewodata = new List<Arecewodata>(); 
         this.areceworeport = new List<Areceworeport>(); 

      }
   }
}
#pragma warning restore 1591
