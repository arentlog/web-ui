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
using Models.Pdsoelinepricetab;
using Models.Pdsoelinepricetabsave;

   public partial class AsoelineOELinePriceTabLeaveFieldResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public Oeline oeline { get; set; }
      public Oelinepricetab oelinepricetab { get; set; }
      public Oelinepricetabsave oelinepricetabsave { get; set; }
      [StringValidation]
      public string pvChangelist { get; set; }
 
    
      public AsoelineOELinePriceTabLeaveFieldResponseAPI()
      {
         this.messaging = new List<Messaging>(); 

      }
   }
}
#pragma warning restore 1591