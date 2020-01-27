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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SL
{  
   using Sxe.SL.Data.Models.PdsContext;
   using Sxe.SL.Data.Models.Pdssled;
   using Sxe.SL.Data.Repositories;
    
   [RoutePrefix("api/sl/sled")]
   public partial class SledApiController : ApiControllerBase
   {
      private readonly SledRepository repository;
    
      public SledApiController(SledRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Sled GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Sled> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Sled>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Sled> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Sled> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Sled>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Sled Get(bool statustype = false, string imptype = "", string slupdtno = "", string prod = "", string whse = "", string fldlist = "")
      {
         return this.repository.Get(0, statustype, imptype, slupdtno, prod, whse, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(bool statustype = false, string imptype = "", string slupdtno = "", string prod = "", string whse = "")
      {
         return (this.repository.Get(0, statustype, imptype, slupdtno, prod, whse, 1, string.Empty) != null);
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
      [Route("listbypbseqno")]
      public IEnumerable<Sled> GetListByPbseqno(bool statustype = false, string imptype = "", string slupdtno = "", int slpbseqno = 0, string whse = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPbseqno(0, statustype, imptype, slupdtno, slpbseqno, whse, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Sled> GetListByProd(string prod = "", string imptype = "", bool statustype = false, string slupdtno = "", string whse = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, prod, imptype, statustype, slupdtno, whse, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Sled GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbystatuscd")]
      public IEnumerable<Sled> GetListByStatuscd(bool statustype = false, string imptype = "", string slupdtno = "", string statuscd = "", string whse = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByStatuscd(0, statustype, imptype, slupdtno, statuscd, whse, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbywhse")]
      public IEnumerable<Sled> GetListByWhse(bool statustype = false, string imptype = "", string slupdtno = "", string whse = "", string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByWhse(0, statustype, imptype, slupdtno, whse, prod, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Sled Insert(Sled record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Sled Update(Sled record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Sled record)
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
  