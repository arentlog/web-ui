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
   using Sxe.IC.Data.Models.Pdsicsd;
   using Sxe.IC.Data.Models.Pdswarehouselookup;
   using Sxe.IC.Data.Models.Complex;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icsd")]
   public partial class IcsdApiController : ApiControllerBase
   {
      private readonly IcsdRepository repository;
    
      public IcsdApiController(IcsdRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icsd GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icsd> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icsd>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icsd> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Icsd> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Icsd>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Icsd Get(string whse = "", string fldlist = "")
      {
         return this.repository.Get(0, whse, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string whse = "")
      {
         return (this.repository.Get(0, whse, 1, string.Empty) != null);
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
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Icsd GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbytransdttmz")]
      public IEnumerable<Icsd> GetListByTransdttmz(DateTime? transdttmz = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTransdttmz(transdttmz, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icsd Insert(Icsd record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icsd Update(Icsd record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icsd record)
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
      public IcsdLookupResponseAPI Lookup(Warehouselookupcriteria warehouselookupcriteria)
      {
         return this.repository.Lookup(warehouselookupcriteria);
      } 
  

      [HttpGet]
      [Route("listbywordindex")]
      public IEnumerable<Icsd> GetListByWordIndex(string term = "", int batchsize = 0, string fldlist = "")
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
  