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
   using Models.Pdsomorderkey;

   public partial class AstwladminChangeOrderCarrierRequestAPI
   {
      public List<Omorderkey> omorderkey { get; set; }
      [StringValidation]
      public string carrier { get; set; }
      [StringValidation]
      public string service { get; set; }
 
    
      public AstwladminChangeOrderCarrierRequestAPI()
      {
         this.omorderkey = new List<Omorderkey>(); 

      }
   }
}
#pragma warning restore 1591
