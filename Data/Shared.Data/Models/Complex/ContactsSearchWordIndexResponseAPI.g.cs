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
   using Models.Pdscontacts;

   public partial class ContactsSearchWordIndexResponseAPI
   {
      public List<Contacts> contacts { get; set; }
      public bool lMoreRecords { get; set; }
 
    
      public ContactsSearchWordIndexResponseAPI()
      {
         this.contacts = new List<Contacts>(); 

      }
   }
}
#pragma warning restore 1591
