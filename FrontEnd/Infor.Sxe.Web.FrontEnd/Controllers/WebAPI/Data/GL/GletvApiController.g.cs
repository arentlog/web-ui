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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.GL
{  
   using Sxe.GL.Data.Models.PdsContext;
   using Sxe.GL.Data.Models.Pdsgletv;
   using Sxe.GL.Data.Repositories;
    
   [RoutePrefix("api/gl/gletv")]
   public partial class GletvApiController : ApiControllerBase
   {
      private readonly GletvRepository repository;
    
      public GletvApiController(GletvRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Gletv GetByRowId(string rowid, bool fillmode = false, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fillmode, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Gletv> GetListByRowIdList(List<string> rowids, bool fillmode = false, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Gletv>();
         }
         return this.repository.GetListByRowIdList(rowids, fillmode, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Gletv> GetListAllByCono(bool fillmode = false, int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, fillmode, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Gletv> GetListByRowpointers(List<string> rowpointers, bool fillmode, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Gletv>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fillmode, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Gletv Get(int revalno = 0, int seqno = 0, bool fillmode = false, string fldlist = "")
      {
         return this.repository.Get(0, revalno, seqno, fillmode, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int revalno = 0, int seqno = 0)
      {
         return (this.repository.Get(0, revalno, seqno, false, 1, string.Empty) != null);
      }

      [HttpGet]
      [Route("existsbyrowid/{rowid:maxLength(30)}")]
      public bool ExistsByRowId(string rowid)
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return false;
         }
         return (this.repository.GetByRowId(rowid, false, string.Empty) != null);
      }
	  

      [HttpGet]
      [Route("existsbyrowpointer/{rowpointer:guid}")]
      public bool ExistsByRowpointer(string rowpointer)
      {
         if (string.IsNullOrEmpty(rowpointer))
         {
            return false;
         }
         return (this.repository.GetByRowpointer(rowpointer, false, string.Empty) != null);
      }
	  
	  
      [HttpGet]
      [Route("listbyglacct")]
      public IEnumerable<Gletv> GetListByGlacct(int gldivno = 0, int gldeptno = 0, int glacctno = 0, int glsubno = 0, int revalno = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByGlacct(0, gldivno, gldeptno, glacctno, glsubno, revalno, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyjrnlno")]
      public IEnumerable<Gletv> GetListByJrnlno(int jrnlno = 0, int setno = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByJrnlno(0, jrnlno, setno, fillmode, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Gletv GetByRowpointer(string rowpointer, bool fillmode = false, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fillmode, fldlist);
      }

      [HttpGet]
      [Route("listbysourcekey")]
      public IEnumerable<Gletv> GetListBySourcekey(string sourcecd = "", decimal idno = 0, string docno = "", int docsuf = 0, int transcd = 0, int docseqno = 0,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySourcekey(0, sourcecd, idno, docno, docsuf, transcd, docseqno, fillmode, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Gletv Insert(Gletv record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Gletv Update(Gletv record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Gletv record)
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
	   
	  
      [HttpDelete]
      [Route("deletelistbyrowpointers")]
      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return;
         }
         this.repository.DeleteListByRowPointers(rowpointers);
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
  