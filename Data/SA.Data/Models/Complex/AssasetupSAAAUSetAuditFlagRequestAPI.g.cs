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

namespace Infor.Sxe.SA.Data.Models.Complex
{
   using Models.Pdssaaautablelist;

   public partial class AssasetupSAAAUSetAuditFlagRequestAPI
   {
      public List<Saaautablelist> saaautablelist { get; set; }
      public bool lSelect { get; set; }
 
    
      public AssasetupSAAAUSetAuditFlagRequestAPI()
      {
         this.saaautablelist = new List<Saaautablelist>(); 

      }
   }
}
#pragma warning restore 1591
