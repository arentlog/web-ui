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

namespace Infor.Sxe.PD.Data.Models.Complex
{
   using Models.Pdsgleta;
   using Models.Pdspderfinalupdate;

   public partial class AspdentryPDERFinalUpdateRequestAPI
   {
      public List<Gleta> gleta { get; set; }
      public Gletaheader gletaheader { get; set; }
      public Pderfinalupdate pderfinalupdate { get; set; }
 
    
      public AspdentryPDERFinalUpdateRequestAPI()
      {
         this.gleta = new List<Gleta>(); 

      }
   }
}
#pragma warning restore 1591