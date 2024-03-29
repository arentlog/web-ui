//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 7622 $
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
using System.Web.Http;
using ServiceInterfaceClient.BaseClasses;
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.Shared
{  
   using Sxe.Shared.Data.Models.PdsContext;
   using Sxe.Shared.Data.Models.PdscontactsRoles;
   using Sxe.Shared.Data.Repositories;
    
   [RoutePrefix("api/shared/contactsroles")]
   public partial class ContactsRolesApiController : ApiControllerBase
   {
      private readonly ContactsRolesRepository repository;
    
      public ContactsRolesApiController(ContactsRolesRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      [HttpPost]
      [Route("")]
      public ContactsRoles Insert(ContactsRoles record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public ContactsRoles Update(ContactsRoles record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(ContactsRoles record)
      {
         this.repository.Delete(record);
      }
  
      [HttpDelete]
      [Route("deletelistbyrowids")]
      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds == null || rowIds.Count == 0)
         {
            return;
         }
         this.repository.DeleteListByRowIds(rowIds);
      }
	  
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }   
}
#pragma warning restore 1591
  