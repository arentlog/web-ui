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
   using Models.Pdsloadoetally;
   using Models.Pdsmessaging;
using Models.Pdsoetallycomponent;

   public partial class AsoelineOETallyAddChangeComponentResponseAPI
   {
      public List<Loadoetallyresults> loadoetallyresults { get; set; }
      public List<Messaging> messaging { get; set; }
      public Loadoetallysingle loadoetallysingle { get; set; }
      public Oetallycomponent oetallycomponent { get; set; }
 
    
      public AsoelineOETallyAddChangeComponentResponseAPI()
      {
         this.loadoetallyresults = new List<Loadoetallyresults>(); 
         this.messaging = new List<Messaging>(); 

      }
   }
}
#pragma warning restore 1591
