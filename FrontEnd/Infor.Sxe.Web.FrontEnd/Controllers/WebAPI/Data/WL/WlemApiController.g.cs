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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.WL
{  
   using Sxe.WL.Data.Models.PdsContext;
   using Sxe.WL.Data.Models.Pdswlem;
   using Sxe.WL.Data.Repositories;
    
   [RoutePrefix("api/wl/wlem")]
   public partial class WlemApiController : ApiControllerBase
   {
      private readonly WlemRepository repository;
    
      public WlemApiController(WlemRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Wlem GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Wlem> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Wlem>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Wlem> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Wlem Get(string whse = "", string setno = "", string field1 = "", string field2 = "", string fldlist = "")
      {
         return this.repository.Get(0, whse, setno, field1, field2, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string whse = "", string setno = "", string field1 = "", string field2 = "")
      {
         return (this.repository.Get(0, whse, setno, field1, field2, 1, string.Empty) != null);
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
      [Route("listbyprocessty")]
      public IEnumerable<Wlem> GetListByProcessty(string whse = "", string statustype = "", string processty = "", string specnstype = "", string setno = "", string reasunavty = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProcessty(0, whse, statustype, processty, specnstype, setno, reasunavty, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Wlem> GetListByProd(string whse = "", string setno = "", string prod = "", string serlottype = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, whse, setno, prod, serlottype, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod2")]
      public IEnumerable<Wlem> GetListByProd2(string prod = "", string whse = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd2(0, prod, whse, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbystatustype")]
      public IEnumerable<Wlem> GetListByStatustype(string whse = "", string setno = "", string statustype = "", string field1 = "", string field2 = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStatustype(0, whse, setno, statustype, field1, field2, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Wlem Insert(Wlem record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Wlem Update(Wlem record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Wlem record)
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
  