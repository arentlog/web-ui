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
   using Models.Pdsarelearetadd;
   using Models.Pdsarelecheckhdr;

   public partial class AsarentryARELEAretAddRequestAPI
   {
      public List<Arelearetresults> arelearetresults { get; set; }
      public Arelearetcriteria arelearetcriteria { get; set; }
      public Arelecheckhdr arelecheckhdr { get; set; }
 
    
      public AsarentryARELEAretAddRequestAPI()
      {
         this.arelearetresults = new List<Arelearetresults>(); 

      }
   }
}
#pragma warning restore 1591