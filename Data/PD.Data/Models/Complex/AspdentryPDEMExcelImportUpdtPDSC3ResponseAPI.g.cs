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
   using Models.Pdsmessaging;
   using Models.Pdspdemimportexcelerrors;
using Models.Pdspdemloadpdsc3;

   public partial class AspdentryPDEMExcelImportUpdtPDSC3ResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Pdemimportexcelerrors> pdemimportexcelerrors { get; set; }
      public List<Pdemloadpdsc3results> pdemloadpdsc3results { get; set; }
      public List<Pdmerridpdsc3> pdmerridpdsc3 { get; set; }
 
    
      public AspdentryPDEMExcelImportUpdtPDSC3ResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.pdemimportexcelerrors = new List<Pdemimportexcelerrors>(); 
         this.pdemloadpdsc3results = new List<Pdemloadpdsc3results>(); 
         this.pdmerridpdsc3 = new List<Pdmerridpdsc3>(); 

      }
   }
}
#pragma warning restore 1591
