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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.PV
{  
   using Sxe.PV.Data.Models.PdsContext;
   using Sxe.PV.Data.Models.PdspvSwewh;
   using Sxe.PV.Data.Repositories;
    
   [RoutePrefix("api/pv/pvswewh")]
   public partial class PvSwewhApiController : ApiControllerBase
   {
      private readonly PvSwewhRepository repository;
    
      public PvSwewhApiController(PvSwewhRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public PvSwewh GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<PvSwewh> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<PvSwewh>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<PvSwewh> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public PvSwewh Get(int recjrnlno = 0, int intclaimno = 0, int swsuf = 0, string fldlist = "")
      {
         return this.repository.Get(0, recjrnlno, intclaimno, swsuf, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int recjrnlno = 0, int intclaimno = 0, int swsuf = 0)
      {
         return (this.repository.Get(0, recjrnlno, intclaimno, swsuf, 1, string.Empty) != null);
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
      [Route("listbyvendno")]
      public IEnumerable<PvSwewh> GetListByVendno(int recjrnlno = 0, decimal vendno = 0, int intclaimno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByVendno(0, recjrnlno, vendno, intclaimno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public PvSwewh Insert(PvSwewh record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public PvSwewh Update(PvSwewh record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(PvSwewh record)
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
  