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

namespace Infor.Sxe.Shared.Data.Models.Complex
{
   using Models.Pdscamcontact;
   using Models.Pdsmessaging;

   public partial class AscamCAMContactUpdateResponseAPI
   {
      public List<Camcontactmethods> camcontactmethods { get; set; }
      public List<Messaging> messaging { get; set; }
      public Camcontact camcontact { get; set; }
 
    
      public AscamCAMContactUpdateResponseAPI()
      {
         this.camcontactmethods = new List<Camcontactmethods>(); 
         this.messaging = new List<Messaging>(); 

      }
   }
}
#pragma warning restore 1591
