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
   using Models.Pdsoeblanketupdbyrelease;

   public partial class AsoeentryOEERBInitBlanketUpdByReleaseResponseAPI
   {
      public List<Oeblanketupdbyreleaseresults> oeblanketupdbyreleaseresults { get; set; }
      public List<Oeblanketupdbyrelupdresults> oeblanketupdbyrelupdresults { get; set; }
      public Oeblanketupdbyreleasesingle oeblanketupdbyreleasesingle { get; set; }
 
    
      public AsoeentryOEERBInitBlanketUpdByReleaseResponseAPI()
      {
         this.oeblanketupdbyreleaseresults = new List<Oeblanketupdbyreleaseresults>(); 
         this.oeblanketupdbyrelupdresults = new List<Oeblanketupdbyrelupdresults>(); 

      }
   }
}
#pragma warning restore 1591
