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
   using Models.Pdsicepeload;
   using Models.Pdsmessaging;

   public partial class AsicentryICEPELoadResponseAPI
   {
      public List<Icepeloadresults> icepeloadresults { get; set; }
      public List<Messaging> messaging { get; set; }
 
    
      public AsicentryICEPELoadResponseAPI()
      {
         this.icepeloadresults = new List<Icepeloadresults>(); 
         this.messaging = new List<Messaging>(); 

      }
   }
}
#pragma warning restore 1591
