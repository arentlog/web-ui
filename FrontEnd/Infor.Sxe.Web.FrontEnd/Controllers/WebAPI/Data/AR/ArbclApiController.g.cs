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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.AR
{  
   using Sxe.AR.Data.Models.PdsContext;
   using Sxe.AR.Data.Models.Pdsarbcl;
   using Sxe.AR.Data.Repositories;
    
   [RoutePrefix("api/ar/arbcl")]
   public partial class ArbclApiController : ApiControllerBase
   {
      private readonly ArbclRepository repository;
    
      public ArbclApiController(ArbclRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Arbcl GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Arbcl> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Arbcl>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Arbcl> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Arbcl Get(string batch = "", decimal custno = 0, int checkno = 0, int invno = 0, int invsuf = 0, int seqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, batch, custno, checkno, invno, invsuf, seqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string batch = "", decimal custno = 0, int checkno = 0, int invno = 0, int invsuf = 0, int seqno = 0)
      {
         return (this.repository.Get(0, batch, custno, checkno, invno, invsuf, seqno, 1, string.Empty) != null);
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
      [Route("listbyaretid")]
      public IEnumerable<Arbcl> GetListByAretid(long aretid = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByAretid(0, aretid, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycustno")]
      public IEnumerable<Arbcl> GetListByCustno(decimal custno = 0, int checkno = 0, int invno = 0, int invsuf = 0, int seqno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustno(0, custno, checkno, invno, invsuf, seqno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbytrancd")]
      public IEnumerable<Arbcl> GetListByTrancd(decimal custno = 0, int checkno = 0, string trancd = "", int invno = 0, int invsuf = 0, int seqno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTrancd(0, custno, checkno, trancd, invno, invsuf, seqno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Arbcl Insert(Arbcl record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Arbcl Update(Arbcl record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Arbcl record)
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
  