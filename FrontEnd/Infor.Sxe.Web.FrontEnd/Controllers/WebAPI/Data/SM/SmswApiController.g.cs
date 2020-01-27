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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SM
{  
   using Sxe.SM.Data.Models.PdsContext;
   using Sxe.SM.Data.Models.Pdssmsw;
   using Sxe.SM.Data.Repositories;
    
   [RoutePrefix("api/sm/smsw")]
   public partial class SmswApiController : ApiControllerBase
   {
      private readonly SmswRepository repository;
    
      public SmswApiController(SmswRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Smsw GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Smsw> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Smsw>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Smsw> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Smsw Get(int yr = 0, string whse = "", string prod = "", bool componentfl = false, bool stockfl = false, string fldlist = "")
      {
         return this.repository.Get(0, yr, whse, prod, componentfl, stockfl, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int yr = 0, string whse = "", string prod = "", bool componentfl = false, bool stockfl = false)
      {
         return (this.repository.Get(0, yr, whse, prod, componentfl, stockfl, 1, string.Empty) != null);
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
      [Route("listbyprod")]
      public IEnumerable<Smsw> GetListByProd(int yr = 0, string prod = "", string whse = "", bool componentfl = false, bool stockfl = false,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProd(0, yr, prod, whse, componentfl, stockfl, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyprodwh")]
      public IEnumerable<Smsw> GetListByProdwh(string prod = "", string whse = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByProdwh(0, prod, whse, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Smsw Insert(Smsw record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Smsw Update(Smsw record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Smsw record)
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
  