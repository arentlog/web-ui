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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.CM
{  
   using Sxe.CM.Data.Models.PdsContext;
   using Sxe.CM.Data.Models.Pdscmfu;
   using Sxe.CM.Data.Repositories;
    
   [RoutePrefix("api/cm/cmfu")]
   public partial class CmfuApiController : ApiControllerBase
   {
      private readonly CmfuRepository repository;
    
      public CmfuApiController(CmfuRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Cmfu GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Cmfu> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Cmfu>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Cmfu Get(string slsrep = "", decimal prosno = 0, int sequenceno = 0, string fldlist = "")
      {
         return this.repository.Get(slsrep, prosno, sequenceno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string slsrep = "", decimal prosno = 0, int sequenceno = 0)
      {
         return (this.repository.Get(slsrep, prosno, sequenceno, 1, string.Empty) != null);
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
      [Route("listbyactstatus")]
      public IEnumerable<Cmfu> GetListByActstatus(string slsrep = "", string statuscd = "", DateTime? schstartdt = null, string schstarttm = "", bool mustdo = false, string name = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByActstatus(slsrep, statuscd, schstartdt, schstarttm, mustdo, name, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbymustdo")]
      public IEnumerable<Cmfu> GetListByMustdo(string slsrep = "", DateTime? schstartdt = null, bool mustdo = false, string schstarttm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByMustdo(slsrep, schstartdt, mustdo, schstarttm, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprosno")]
      public IEnumerable<Cmfu> GetListByProsno(decimal prosno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProsno(prosno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbysched")]
      public IEnumerable<Cmfu> GetListBySched(string slsrep = "", decimal prosno = 0, DateTime? schstartdt = null, string schstarttm = "", string name = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySched(slsrep, prosno, schstartdt, schstarttm, name, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyslsrep")]
      public IEnumerable<Cmfu> GetListBySlsrep(string slsrep = "", DateTime? schstartdt = null, string schstarttm = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySlsrep(slsrep, schstartdt, schstarttm, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Cmfu Insert(Cmfu record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Cmfu Update(Cmfu record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Cmfu record)
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
  