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
   using Models.Pdsccemployees;

   public partial class AstwladminSetCCEmployeesRequestAPI
   {
      public List<Ccemployees> ccemployees { get; set; }
      [StringValidation]
      public string company { get; set; }
      [StringValidation]
      public string warehouse { get; set; }
      public int cyclewave { get; set; }
 
    
      public AstwladminSetCCEmployeesRequestAPI()
      {
         this.ccemployees = new List<Ccemployees>(); 

      }
   }
}
#pragma warning restore 1591