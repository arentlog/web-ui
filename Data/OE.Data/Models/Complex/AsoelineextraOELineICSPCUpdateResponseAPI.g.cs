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
   using Models.Pdsoelineicspclookup;

   public partial class AsoelineextraOELineICSPCUpdateResponseAPI
   {
      public List<Oelineicspcresults> oelineicspcresults { get; set; }
      public Oelineicspccriteria oelineicspccriteria { get; set; }
 
    
      public AsoelineextraOELineICSPCUpdateResponseAPI()
      {
         this.oelineicspcresults = new List<Oelineicspcresults>(); 

      }
   }
}
#pragma warning restore 1591
