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
   using Models.Pdspdemimportnewfile;

   public partial class AspdentryPDEMExcelImportNewOkResponseAPI
   {
      public List<Pdemimportnewexcelerrors> pdemimportnewexcelerrors { get; set; }
      [StringValidation]
      public string cNextView { get; set; }
 
    
      public AspdentryPDEMExcelImportNewOkResponseAPI()
      {
         this.pdemimportnewexcelerrors = new List<Pdemimportnewexcelerrors>(); 

      }
   }
}
#pragma warning restore 1591
