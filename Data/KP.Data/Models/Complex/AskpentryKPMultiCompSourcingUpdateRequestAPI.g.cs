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
   using Models.Pdsmultilinesourcing;
   using Models.Pdsoelinelinetie;

   public partial class AskpentryKPMultiCompSourcingUpdateRequestAPI
   {
      public List<Oelinelinetie> oelinelinetie { get; set; }
      public Multilinesourcing multilinesourcing { get; set; }
 
    
      public AskpentryKPMultiCompSourcingUpdateRequestAPI()
      {
         this.oelinelinetie = new List<Oelinelinetie>(); 

      }
   }
}
#pragma warning restore 1591