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

namespace Infor.Sxe.VA.Data.Models.Complex
{
   using Models.Pdsvalineaddchg;

   public partial class AsvalineVALineAddRequestAPI
   {
      public Valineaddchg valineaddchg { get; set; }
      [StringValidation]
      public string pvFunctionnm { get; set; }
      public int pvVano { get; set; }
      public int pvVasuf { get; set; }
      public int pvSeqno { get; set; }
 
    
      public AsvalineVALineAddRequestAPI()
      {

      }
   }
}
#pragma warning restore 1591
