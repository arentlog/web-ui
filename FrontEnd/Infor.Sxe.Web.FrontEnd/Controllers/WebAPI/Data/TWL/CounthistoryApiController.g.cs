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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.TWL
{  
   using Sxe.TWL.Data.Models.PdsContext;
   using Sxe.TWL.Data.Models.Pdscounthistory;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/counthistory")]
   public partial class CounthistoryApiController : ApiControllerBase
   {
      private readonly CounthistoryRepository repository;
    
      public CounthistoryApiController(CounthistoryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Counthistory GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Counthistory> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Counthistory>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Counthistory Get(string coNum = "", string whNum = "", string absNum = "", string countType = "", DateTime? countDate = null, string binNum = "", string fldlist = "")
      {
         return this.repository.Get(coNum, whNum, absNum, countType, countDate, binNum, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string coNum = "", string whNum = "", string absNum = "", string countType = "", DateTime? countDate = null, string binNum = "")
      {
         return (this.repository.Get(coNum, whNum, absNum, countType, countDate, binNum, 1, string.Empty) != null);
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
      [Route("listbycowhbin")]
      public IEnumerable<Counthistory> GetListByCoWhBin(string coNum = "", string whNum = "", string binNum = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhBin(coNum, whNum, binNum, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhdate")]
      public IEnumerable<Counthistory> GetListByCoWhDate(string coNum = "", string whNum = "", DateTime? countDate = null,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhDate(coNum, whNum, countDate, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhtype")]
      public IEnumerable<Counthistory> GetListByCoWhType(string coNum = "", string whNum = "", string countType = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhType(coNum, whNum, countType, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Counthistory Insert(Counthistory record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Counthistory Update(Counthistory record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Counthistory record)
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
  