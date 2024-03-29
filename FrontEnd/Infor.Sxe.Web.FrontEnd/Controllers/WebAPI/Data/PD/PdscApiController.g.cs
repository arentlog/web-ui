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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.PD
{  
   using Sxe.PD.Data.Models.PdsContext;
   using Sxe.PD.Data.Models.Pdspdsc;
   using Sxe.PD.Data.Models.Pdspricesheetinq;
   using Sxe.PD.Data.Models.Pdspdscpricinglookup;
   using Sxe.PD.Data.Models.Complex;
   using Sxe.PD.Data.Repositories;
    
   [RoutePrefix("api/pd/pdsc")]
   public partial class PdscApiController : ApiControllerBase
   {
      private readonly PdscRepository repository;
    
      public PdscApiController(PdscRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Pdsc GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Pdsc> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Pdsc>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Pdsc> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Pdsc> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Pdsc>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Pdsc Get(int levelcd = 0, string whse = "", decimal custno = 0, string custtype = "", string prod = "", string units = "", DateTime? startdt = null, string fldlist = "")
      {
         return this.repository.Get(0, levelcd, whse, custno, custtype, prod, units, startdt, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int levelcd = 0, string whse = "", decimal custno = 0, string custtype = "", string prod = "", string units = "", DateTime? startdt = null)
      {
         return (this.repository.Get(0, levelcd, whse, custno, custtype, prod, units, startdt, 1, string.Empty) != null);
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
      [Route("listbyctprod")]
      public IEnumerable<Pdsc> GetListByCtprod(bool statustype = false, int levelcd = 0, string custtype = "", string prod = "", string whse = "", string units = "", DateTime? startdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCtprod(0, statustype, levelcd, custtype, prod, whse, units, startdt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycustprod")]
      public IEnumerable<Pdsc> GetListByCustprod(bool statustype = false, int levelcd = 0, decimal custno = 0, string prod = "", string whse = "", string custtype = "", string units = "", DateTime? startdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustprod(0, statustype, levelcd, custno, prod, whse, custtype, units, startdt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyenddt")]
      public IEnumerable<Pdsc> GetListByEnddt(bool statustype = false, DateTime? enddt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByEnddt(0, statustype, enddt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbypdprod")]
      public IEnumerable<Pdsc> GetListByPdprod(string prod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPdprod(0, prod, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbypdrecno")]
      public IEnumerable<Pdsc> GetListByPdrecno(int pdrecno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPdrecno(0, pdrecno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprod")]
      public IEnumerable<Pdsc> GetListByProd(bool statustype = false, int levelcd = 0, bool promofl = false, string prod = "", string whse = "", string units = "", DateTime? startdt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, statustype, levelcd, promofl, prod, whse, units, startdt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprodwh")]
      public IEnumerable<Pdsc> GetListByProdwh(string prod = "", string whse = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProdwh(0, prod, whse, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Pdsc GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbytransdttmz")]
      public IEnumerable<Pdsc> GetListByTransdttmz(DateTime? transdttmz = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByTransdttmz(transdttmz, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Pdsc Insert(Pdsc record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Pdsc Update(Pdsc record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Pdsc record)
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
      public IEnumerable<Pricesheetinqresults> Lookup(Pricesheetinqcriteria pricesheetinqcriteria)
      {
         return this.repository.Lookup(pricesheetinqcriteria);
      } 
  
      
      [Route("lookuppricing")]
      [HttpPost]
      public PdscLookupPricingResponseAPI LookupPricing(Pdsclookupcriteria pdsclookupcriteria)
      {
         return this.repository.LookupPricing(pdsclookupcriteria);
      } 
  

      [HttpGet]
      [Route("listbywordindex")]
      public IEnumerable<Pdsc> GetListByWordIndex(string term = "", int batchsize = 0, string fldlist = "")
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
  