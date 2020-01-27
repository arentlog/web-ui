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
   using Sxe.Shared.Data.Models.Pdsaudit;
   using Sxe.Shared.Data.Repositories;
    
   [RoutePrefix("api/shared/audit")]
   public partial class AuditApiController : ApiControllerBase
   {
      private readonly AuditRepository repository;
    
      public AuditApiController(AuditRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Audit GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Audit> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Audit>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Audit Get(string tablenm = "", string fldlist = "")
      {
         return this.repository.Get(tablenm, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string tablenm = "")
      {
         return (this.repository.Get(tablenm, 1, string.Empty) != null);
      }

      [HttpGet]
      [Route("existsbyrowid/{rowid:maxLength(30)}")]
      public bool ExistsByRowId(string rowid)
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return false;
         }
         return (this.repository.GetByRowId(rowid, string.Empty) != null);
      }
	  

      [HttpGet]
      [Route("listbycreatedt")]
      public IEnumerable<Audit> GetListByCreatedt(DateTime? createdt = null, int createtm = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCreatedt(createdt, createtm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbydate")]
      public IEnumerable<Audit> GetListByDate(string tablenm = "", DateTime? transdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByDate(tablenm, transdt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbykey")]
      public IEnumerable<Audit> GetListByKey(string key = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByKey(key, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyoper")]
      public IEnumerable<Audit> GetListByOper(string tablenm = "", string operinit = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByOper(tablenm, operinit, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyproc")]
      public IEnumerable<Audit> GetListByProc(string tablenm = "", string transproc = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProc(tablenm, transproc, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Audit Insert(Audit record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Audit Update(Audit record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Audit record)
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
  