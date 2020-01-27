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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SA
{  
   using Sxe.SA.Data.Models.PdsContext;
   using Sxe.SA.Data.Models.Pdssasta;
   using Sxe.SA.Data.Models.Pdslookupcarrierresults;
   using Sxe.SA.Data.Models.Complex;
   using Sxe.SA.Data.Repositories;
    
   [RoutePrefix("api/sa/sasta")]
   public partial class SastaApiController : ApiControllerBase
   {
      private readonly SastaRepository repository;
    
      public SastaApiController(SastaRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Sasta GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Sasta> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Sasta>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Sasta> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Sasta> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Sasta>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Sasta Get(string codeiden = "", string codeval = "", string fldlist = "")
      {
         return this.repository.Get(0, codeiden, codeval, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string codeiden = "", string codeval = "")
      {
         return (this.repository.Get(0, codeiden, codeval, 1, string.Empty) != null);
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
      [Route("listbydesc")]
      public IEnumerable<Sasta> GetListByDesc(string codeiden = "", string descrip = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByDesc(0, codeiden, descrip, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Sasta GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbytransdttmz")]
      public IEnumerable<Sasta> GetListByTransdttmz(DateTime? transdttmz = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTransdttmz(transdttmz, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Sasta Insert(Sasta record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Sasta Update(Sasta record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Sasta record)
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
	  
      
      [Route("lookupcarrier")]
      [HttpPost]
      public SastaLookupCarrierResponseAPI LookupCarrier(SastaLookupCarrierRequestAPI SastaLookupCarrierRequestAPI)
      {
         return this.repository.LookupCarrier(SastaLookupCarrierRequestAPI);
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
  