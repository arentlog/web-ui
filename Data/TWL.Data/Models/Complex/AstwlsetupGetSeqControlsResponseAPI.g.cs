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
   using Models.Pdsseqcontrollist;

   public partial class AstwlsetupGetSeqControlsResponseAPI
   {
      public List<Seqcontrollist> seqcontrollist { get; set; }
      [StringValidation]
      public string defaultSequence { get; set; }
 
    
      public AstwlsetupGetSeqControlsResponseAPI()
      {
         this.seqcontrollist = new List<Seqcontrollist>(); 

      }
   }
}
#pragma warning restore 1591