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

namespace Infor.Sxe.IC.Data.Models.Complex
{
   using Models.Pdsicamumain;

   public partial class AsicadminICAMUValidateMainRequestAPI
   {
      public List<Icamuresults> icamuresults { get; set; }
      public Icamucriteria icamucriteria { get; set; }
      public Icamusingle icamusingle { get; set; }
 
    
      public AsicadminICAMUValidateMainRequestAPI()
      {
         this.icamuresults = new List<Icamuresults>(); 

      }
   }
}
#pragma warning restore 1591
