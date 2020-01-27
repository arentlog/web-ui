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
   using Sxe.IC.Data.Models.Pdsicspr;
   using Sxe.IC.Data.Repositories;
    
   [RoutePrefix("api/ic/icspr")]
   public partial class IcsprApiController : ApiControllerBase
   {
      private readonly IcsprRepository repository;
    
      public IcsprApiController(IcsprRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Icspr GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Icspr> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Icspr>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Icspr> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpPost]
      [Route("listbyrowpointers")] 
      public IEnumerable<Icspr> GetListByRowpointers(List<string> rowpointers, string fldlist)
      {
         if (rowpointers == null || rowpointers.Count == 0)
         {
            return new List<Icspr>();
         }	  
         return this.repository.GetListByRowpointers(rowpointers, fldlist);
      }
	  
	  
      [HttpGet]
      [Route("getbypk")]
      public Icspr Get(string recordtype = "", string restricttype = "", string srcrowpointer = "", string whse = "", DateTime? startdt = null, string fldlist = "")
      {
         return this.repository.Get(0, recordtype, restricttype, srcrowpointer, whse, startdt, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string recordtype = "", string restricttype = "", string srcrowpointer = "", string whse = "", DateTime? startdt = null)
      {
         return (this.repository.Get(0, recordtype, restricttype, srcrowpointer, whse, startdt, 1, string.Empty) != null);
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
      [Route("listbyexpiredt")]
      public IEnumerable<Icspr> GetListByExpiredt(DateTime? expiredt = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByExpiredt(0, expiredt, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyrestrictcd")]
      public IEnumerable<Icspr> GetListByRestrictcd(string restrictcd = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByRestrictcd(0, restrictcd, batchsize, fldlist);
      }

      [HttpGet]
      [Route("getbyrowpointer/{rowpointer:guid}")]
      public Icspr GetByRowpointer(string rowpointer, string fldlist = "")
      {
         return this.repository.GetByRowpointer(rowpointer, fldlist);
      }

      [HttpGet]
      [Route("listbyvendno")]
      public IEnumerable<Icspr> GetListByVendno(decimal vendno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVendno(0, vendno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Icspr Insert(Icspr record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Icspr Update(Icspr record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Icspr record)
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
  