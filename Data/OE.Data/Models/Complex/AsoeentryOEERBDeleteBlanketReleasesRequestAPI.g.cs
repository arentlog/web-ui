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
   using Models.Pdsoeblanketdelete;

   public partial class AsoeentryOEERBDeleteBlanketReleasesRequestAPI
   {
      public List<Oeblanketdeleteorders> oeblanketdeleteorders { get; set; }
      public Oeblanketdeletecriteria oeblanketdeletecriteria { get; set; }
 
    
      public AsoeentryOEERBDeleteBlanketReleasesRequestAPI()
      {
         this.oeblanketdeleteorders = new List<Oeblanketdeleteorders>(); 

      }
   }
}
#pragma warning restore 1591
