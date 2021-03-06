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
   using Sxe.CM.Data.Models.Pdscmsa;
   using Sxe.CM.Data.Repositories;
    
   [RoutePrefix("api/cm/cmsa")]
   public partial class CmsaApiController : ApiControllerBase
   {
      private readonly CmsaRepository repository;
    
      public CmsaApiController(CmsaRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Cmsa GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Cmsa> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Cmsa>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Cmsa Get(string campaigncd = "", decimal prosno = 0, int pageno = 0, string fldlist = "")
      {
         return this.repository.Get(campaigncd, prosno, pageno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string campaigncd = "", decimal prosno = 0, int pageno = 0)
      {
         return (this.repository.Get(campaigncd, prosno, pageno, 1, string.Empty) != null);
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
      [Route("listbyprosno")]
      public IEnumerable<Cmsa> GetListByProsno(decimal prosno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProsno(prosno, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyseqno")]
      public IEnumerable<Cmsa> GetListBySeqno(string campaigncd = "", decimal prosno = 0, int sequenceno = 0, int pageno = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySeqno(campaigncd, prosno, sequenceno, pageno, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Cmsa Insert(Cmsa record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Cmsa Update(Cmsa record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Cmsa record)
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
  