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

namespace Infor.Sxe.KP.Data.Models.Complex
{
   using Models.Pdsmessaging;
   using Models.Pdsoelinelinetie;

   public partial class AskpentryKPMultiCompSourcingUpdateResponseAPI
   {
      public List<Messaging> messaging { get; set; }
      public List<Oelinelinetie> oelinelinetie { get; set; }
 
    
      public AskpentryKPMultiCompSourcingUpdateResponseAPI()
      {
         this.messaging = new List<Messaging>(); 
         this.oelinelinetie = new List<Oelinelinetie>(); 

      }
   }
}
#pragma warning restore 1591