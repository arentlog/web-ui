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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.KP
{  
   using Sxe.KP.Data.Models.PdsContext;
   using Sxe.KP.Data.Models.Pdskpsk;
   using Sxe.KP.Data.Models.Pdskpcomponentslookup;
   using Sxe.KP.Data.Repositories;
    
   [RoutePrefix("api/kp/kpsk")]
   public partial class KpskApiController : ApiControllerBase
   {
      private readonly KpskRepository repository;
    
      public KpskApiController(KpskRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Kpsk GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Kpsk> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Kpsk>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Kpsk> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Kpsk Get(string prod = "", int seqno = 0, string fldlist = "")
      {
         return this.repository.Get(0, prod, seqno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string prod = "", int seqno = 0)
      {
         return (this.repository.Get(0, prod, seqno, 1, string.Empty) != null);
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
      [Route("listbycomprod")]
      public IEnumerable<Kpsk> GetListByComprod(string comptype = "", string comprod = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByComprod(0, comptype, comprod, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycomptype")]
      public IEnumerable<Kpsk> GetListByComptype(string prod = "", string comptype = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByComptype(0, prod, comptype, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Kpsk Insert(Kpsk record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Kpsk Update(Kpsk record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Kpsk record)
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
	  
      
      [Route("lookup")]
      [HttpPost]
      public IEnumerable<Kpcomponentslookupresults> Lookup(Kpcomponentslookupcriteria kpcomponentslookupcriteria)
      {
         return this.repository.Lookup(kpcomponentslookupcriteria);
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
  