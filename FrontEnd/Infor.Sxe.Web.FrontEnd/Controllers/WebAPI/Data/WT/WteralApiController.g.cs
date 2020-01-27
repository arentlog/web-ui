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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.WT
{  
   using Sxe.WT.Data.Models.PdsContext;
   using Sxe.WT.Data.Models.Pdswteral;
   using Sxe.WT.Data.Repositories;
    
   [RoutePrefix("api/wt/wteral")]
   public partial class WteralApiController : ApiControllerBase
   {
      private readonly WteralRepository repository;
    
      public WteralApiController(WteralRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Wteral GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Wteral> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Wteral>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Wteral> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Wteral Get(int reportno = 0, int lineno = 0, int seqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, reportno, lineno, seqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int reportno = 0, int lineno = 0, int seqno = 0)
      {
         return (this.repository.Get(0, reportno, lineno, seqno, 1, string.Empty) != null);
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
      [Route("listbyprod")]
      public IEnumerable<Wteral> GetListByProd(string shipprod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, shipprod, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyreptprod")]
      public IEnumerable<Wteral> GetListByReptprod(int reportno = 0, string shipprod = "", int lineno = 0, int seqno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByReptprod(0, reportno, shipprod, lineno, seqno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Wteral Insert(Wteral record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Wteral Update(Wteral record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Wteral record)
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
  