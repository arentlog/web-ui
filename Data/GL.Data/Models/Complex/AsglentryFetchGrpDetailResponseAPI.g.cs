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

namespace Infor.Sxe.GL.Data.Models.Complex
{
   using Models.Pdsgletresults;

   public partial class AsglentryFetchGrpDetailResponseAPI
   {
      public List<Gletacctresults> gletacctresults { get; set; }
      public Gletamtresults gletamtresults { get; set; }
 
    
      public AsglentryFetchGrpDetailResponseAPI()
      {
         this.gletacctresults = new List<Gletacctresults>(); 

      }
   }
}
#pragma warning restore 1591
