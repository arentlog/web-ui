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
   using Models.Pdsmessaging;
   using Models.Pdsoeline;
using Models.Pdsoelinexrefprod;

   public partial class AsoelineOELineValidateResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Oelinexrefprodlist> oelinexrefprodlist { get; set; }
      public Oeline oeline { get; set; }
      [StringValidation]
      public string cUpdateMessage { get; set; }
 
    
      public AsoelineOELineValidateResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.oelinexrefprodlist = new List<Oelinexrefprodlist>(); 

      }
   }
}
#pragma warning restore 1591
