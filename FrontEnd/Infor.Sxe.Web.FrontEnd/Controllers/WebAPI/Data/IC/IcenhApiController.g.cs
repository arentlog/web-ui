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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.IC
{  
   using Sxe.IC.Data.Models.PdsContext;
   using Sxe.IC.Data.Models.Pdsicenh;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icenh")]
   public partial class IcenhApiController : ApiControllerBase
   {
      private readonly IcenhRepository repository;
    
      public IcenhApiController(IcenhRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icenh GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icenh> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icenh>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icenh> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Icenh> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Icenh>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Icenh Get(string typecd = "", string whse = "", string prod = "", string prodcat = "", int seqnoh = 0, string fldlist = "")
      {
         return this.repository.Get(0, typecd, whse, prod, prodcat, seqnoh, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string typecd = "", string whse = "", string prod = "", string prodcat = "", int seqnoh = 0)
      {
         return (this.repository.Get(0, typecd, whse, prod, prodcat, seqnoh, 1, string.Empty) != null);
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
      [Route("existsbyrowpointer/{rowpointer:guid}")]
      public bool ExistsByRowpointer(string rowpointer)
      {
         if (string.IsNullOrEmpty(rowpointer))
         {
            return false;
         }
         return (this.repository.GetByRowpointer(rowpointer, string.Empty) != null);
      }
	  
	  
      [HttpGet]
      [Route("listbyactivefl")]
      public IEnumerable<Icenh> GetListByActivefl(string typecd = "", string whse = "", bool activefl = false,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByActivefl(0, typecd, whse, activefl, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyjrnl")]
      public IEnumerable<Icenh> GetListByJrnl(int jrnlno = 0, int setno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByJrnl(0, jrnlno, setno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyopendt")]
      public IEnumerable<Icenh> GetListByOpendt(string typecd = "", string whse = "", DateTime? opendt = null, string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByOpendt(0, typecd, whse, opendt, prod, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Icenh GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbytransdttmz")]
      public IEnumerable<Icenh> GetListByTransdttmz(DateTime? transdttmz = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTransdttmz(transdttmz, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icenh Insert(Icenh record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icenh Update(Icenh record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icenh record)
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
  