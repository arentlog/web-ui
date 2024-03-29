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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.WT
{  
   using Sxe.WT.Data.Models.PdsContext;
   using Sxe.WT.Data.Models.Pdswterah;
   using Sxe.WT.Data.Repositories;
    
   [RoutePrefix("api/wt/wterah")]
   public partial class WterahApiController : ApiControllerBase
   {
      private readonly WterahRepository repository;
    
      public WterahApiController(WterahRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Wterah GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Wterah> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Wterah>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Wterah> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Wterah Get(int reportno = 0, string fldlist = "")
      {
         return this.repository.Get(0, reportno, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int reportno = 0)
      {
         return (this.repository.Get(0, reportno, 1, string.Empty) != null);
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
      [Route("listbyrrar")]
      public IEnumerable<Wterah> GetListByRrar(string oper2 = "", string reportnm = "", string shipfmwhse = "", int cono2 = 0, string shiptowhse = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByRrar(0, oper2, reportnm, shipfmwhse, cono2, shiptowhse, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyrush")]
      public IEnumerable<Wterah> GetListByRush(string shipfmwhse = "", int cono2 = 0, string shiptowhse = "", bool rushfl = false,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByRush(0, shipfmwhse, cono2, shiptowhse, rushfl, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Wterah Insert(Wterah record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Wterah Update(Wterah record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Wterah record)
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
  