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
   using Models.Pdsoeetassemblyfinal;
   using Models.Pdsoeetassemblynonstock;
using Models.Pdsoeetassemblysegmentinfo;
using Models.Pdsoeline;

   public partial class AsoelineOEETAssemblyFinalRequestAPI
   {
      public List<Oeetassemblynonstockresults> oeetassemblynonstockresults { get; set; }
      public List<Oeetassemblysegmentdelim> oeetassemblysegmentdelim { get; set; }
      public List<Oeetassemblysegmentinfo> oeetassemblysegmentinfo { get; set; }
      public Oeetassemblyfinalcriteria oeetassemblyfinalcriteria { get; set; }
      public Oeetassemblynonstockcriteria oeetassemblynonstockcriteria { get; set; }
      public Oeline oeline { get; set; }
 
    
      public AsoelineOEETAssemblyFinalRequestAPI()
      {
         this.oeetassemblynonstockresults = new List<Oeetassemblynonstockresults>(); 
         this.oeetassemblysegmentdelim = new List<Oeetassemblysegmentdelim>(); 
         this.oeetassemblysegmentinfo = new List<Oeetassemblysegmentinfo>(); 

      }
   }
}
#pragma warning restore 1591
