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
   using Models.Pdsoereturn;
   using Models.Pdsoereturnparams;
using Models.Pdsoereturnupdatelist;

   public partial class AsoelineOEReturnNoProdUpdateRequestAPI
   {
      public List<Oereturnupdatelist> oereturnupdatelist { get; set; }
      public Oereturn oereturn { get; set; }
      public Oereturnparams oereturnparams { get; set; }
 
    
      public AsoelineOEReturnNoProdUpdateRequestAPI()
      {
         this.oereturnupdatelist = new List<Oereturnupdatelist>(); 

      }
   }
}
#pragma warning restore 1591
