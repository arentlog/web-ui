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
   using Sxe.IC.Data.Models.Pdsicses;
   using Sxe.IC.Data.Models.Pdsicseriallookup;
   using Sxe.IC.Data.Models.Complex;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icses")]
   public partial class IcsesApiController : ApiControllerBase
   {
      private readonly IcsesRepository repository;
    
      public IcsesApiController(IcsesRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icses GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icses> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icses>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icses> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Icses> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Icses>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Icses Get(string prod = "", string whse = "", string serialno = "", string fldlist = "")
      {
         return this.repository.Get(0, prod, whse, serialno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string prod = "", string whse = "", string serialno = "")
      {
         return (this.repository.Get(0, prod, whse, serialno, 1, string.Empty) != null);
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
      [Route("listbyavail")]
      public IEnumerable<Icses> GetListByAvail(string whse = "", string prod = "", string currstatus = "", DateTime? receiptdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByAvail(0, whse, prod, currstatus, receiptdt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Icses GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbyserialno")]
      public IEnumerable<Icses> GetListBySerialno(string whse = "", string serialno = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySerialno(0, whse, serialno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyzprod")]
      public IEnumerable<Icses> GetListByZprod(string prod = "", string serialno = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByZprod(0, prod, serialno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icses Insert(Icses record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icses Update(Icses record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icses record)
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
	  
      
      [Route("lookup")]
      [HttpPost]
      public IcsesLookupResponseAPI Lookup(Icseriallookupcriteria icseriallookupcriteria)
      {
         return this.repository.Lookup(icseriallookupcriteria);
      } 
  

      [HttpGet]
      [Route("listbywordindex")]
      public IEnumerable<Icses> GetListByWordIndex(string term = "", int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByWordIndex(term, batchsize, fldlist);
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
  