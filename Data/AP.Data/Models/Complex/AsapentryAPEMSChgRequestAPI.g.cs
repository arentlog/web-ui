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

namespace Infor.Sxe.AP.Data.Models.Complex
{
   using Models.Pdsapems;

   public partial class AsapentryAPEMSChgRequestAPI
   {
      public List<Apemschg> apemschg { get; set; }
      public int istagecd { get; set; }
 
    
      public AsapentryAPEMSChgRequestAPI()
      {
         this.apemschg = new List<Apemschg>(); 

      }
   }
}
#pragma warning restore 1591
