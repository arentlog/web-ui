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
   using Sxe.IC.Data.Models.Pdsicseu;
   using Sxe.IC.Data.Models.Pdsicproductunitlookup;
   using Sxe.IC.Data.Models.Complex;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icseu")]
   public partial class IcseuApiController : ApiControllerBase
   {
      private readonly IcseuRepository repository;
    
      public IcseuApiController(IcseuRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icseu GetByRowId(string rowid, bool fillmode = false, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fillmode, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icseu> GetListByRowIdList(List<string> rowids, bool fillmode = false, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icseu>();
         }
         return this.repository.GetListByRowIdList(rowids, fillmode, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icseu> GetListAllByCono(bool fillmode = false, int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, fillmode, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Icseu> GetListByRowpointers(List<string> rowpointers, bool fillmode, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Icseu>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fillmode, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Icseu Get(string prod = "", string units = "", bool fillmode = false, string fldlist = "")
      {
         return this.repository.Get(0, prod, units, fillmode, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string prod = "", string units = "")
      {
         return (this.repository.Get(0, prod, units, false, 1, string.Empty) != null);
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
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Icseu GetByRowpointer(string rowpointer, bool fillmode = false, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fillmode, fldlist);
      }

      [HttpGet]
      [Route("listbytransdttmz")]
      public IEnumerable<Icseu> GetListByTransdttmz(DateTime? transdttmz = null,  bool fillmode = false, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTransdttmz(transdttmz, fillmode, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icseu Insert(Icseu record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icseu Update(Icseu record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icseu record)
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
      public IcseuLookupResponseAPI Lookup(Icproductunitlookupcriteria icproductunitlookupcriteria)
      {
         return this.repository.Lookup(icproductunitlookupcriteria);
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
  