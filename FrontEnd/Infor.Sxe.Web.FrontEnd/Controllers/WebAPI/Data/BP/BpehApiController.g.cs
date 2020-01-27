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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.BP
{  
   using Sxe.BP.Data.Models.PdsContext;
   using Sxe.BP.Data.Models.Pdsbpeh;
   using Sxe.BP.Data.Repositories;
    
   [RoutePrefix("api/bp/bpeh")]
   public partial class BpehApiController : ApiControllerBase
   {
      private readonly BpehRepository repository;
    
      public BpehApiController(BpehRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Bpeh GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Bpeh> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Bpeh>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Bpeh> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Bpeh Get(string bpid = "", int revno = 0, string fldlist = "")
      {
         return this.repository.Get(0, bpid, revno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string bpid = "", int revno = 0)
      {
         return (this.repository.Get(0, bpid, revno, 1, string.Empty) != null);
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
      [Route("listbybiddate")]
      public IEnumerable<Bpeh> GetListByBiddate(DateTime? enterdt = null, string bpid = "", int revno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBiddate(0, enterdt, bpid, revno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycustpros")]
      public IEnumerable<Bpeh> GetListByCustpros(string custpros = "", string cptype = "", string bpid = "", int revno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustpros(0, custpros, cptype, bpid, revno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyquoteno")]
      public IEnumerable<Bpeh> GetListByQuoteno(int quoteno = 0, int revno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByQuoteno(0, quoteno, revno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyrelinit")]
      public IEnumerable<Bpeh> GetListByRelinit(bool relprocessfl = false, string relinit = "", string bpid = "", int revno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByRelinit(0, relprocessfl, relinit, bpid, revno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Bpeh Insert(Bpeh record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Bpeh Update(Bpeh record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Bpeh record)
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
  