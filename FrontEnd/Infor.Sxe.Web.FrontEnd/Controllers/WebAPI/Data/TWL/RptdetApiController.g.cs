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
   using Sxe.TWL.Data.Models.Pdsrptdet;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/rptdet")]
   public partial class RptdetApiController : ApiControllerBase
   {
      private readonly RptdetRepository repository;
    
      public RptdetApiController(RptdetRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Rptdet GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Rptdet> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Rptdet>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Rptdet Get(string coNum = "", string whNum = "", int reportid = 0, string reportname = "", string fldlist = "")
      {
         return this.repository.Get(coNum, whNum, reportid, reportname, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string coNum = "", string whNum = "", int reportid = 0, string reportname = "")
      {
         return (this.repository.Get(coNum, whNum, reportid, reportname, 1, string.Empty) != null);
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
      [Route("listbyreportnameindex")]
      public IEnumerable<Rptdet> GetListByReportNameIndex(string coNum = "", string whNum = "", string reportname = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByReportNameIndex(coNum, whNum, reportname, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyreporttypefindindex")]
      public IEnumerable<Rptdet> GetListByReportTypeFindIndex(string reporttypeid = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByReportTypeFindIndex(reporttypeid, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Rptdet Insert(Rptdet record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Rptdet Update(Rptdet record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Rptdet record)
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
  