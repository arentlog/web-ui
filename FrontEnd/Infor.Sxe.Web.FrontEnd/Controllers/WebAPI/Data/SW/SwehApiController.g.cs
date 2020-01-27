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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SW
{  
   using Sxe.SW.Data.Models.PdsContext;
   using Sxe.SW.Data.Models.Pdssweh;
   using Sxe.SW.Data.Models.Pdssworderlookup;
   using Sxe.SW.Data.Models.Complex;
   using Sxe.SW.Data.Repositories;
    
   [RoutePrefix("api/sw/sweh")]
   public partial class SwehApiController : ApiControllerBase
   {
      private readonly SwehRepository repository;
    
      public SwehApiController(SwehRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Sweh GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Sweh> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Sweh>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("")]
      public IEnumerable<Sweh> GetListAllByCono(int batchsize = 0, string fldlist = "")
      {  
         return this.repository.GetListAllByCono(0, batchsize, fldlist);
      }
      [HttpGet]
      [Route("getbypk")]
      public Sweh Get(int repairordno = 0, int repairordsuf = 0, string fldlist = "")
      {
         return this.repository.Get(0, repairordno, repairordsuf, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int repairordno = 0, int repairordsuf = 0)
      {
         return (this.repository.Get(0, repairordno, repairordsuf, 1, string.Empty) != null);
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
      [Route("listbycustno")]
      public IEnumerable<Sweh> GetListByCustno(decimal custno = 0, int stagecd = 0, int repairordno = 0, int repairordsuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCustno(0, custno, stagecd, repairordno, repairordsuf, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbydeliverby")]
      public IEnumerable<Sweh> GetListByDeliverby(string delivertech = "", string whse = "", DateTime? schddeliverdt = null, int repairordno = 0, int repairordsuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByDeliverby(0, delivertech, whse, schddeliverdt, repairordno, repairordsuf, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyorderno")]
      public IEnumerable<Sweh> GetListByOrderno(int orderno = 0, int ordersuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByOrderno(0, orderno, ordersuf, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbypickupby")]
      public IEnumerable<Sweh> GetListByPickupby(string pickuptech = "", string whse = "", DateTime? schdpickupdt = null, int repairordno = 0, int repairordsuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByPickupby(0, pickuptech, whse, schdpickupdt, repairordno, repairordsuf, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbysched")]
      public IEnumerable<Sweh> GetListBySched(decimal custno = 0, int repairordno = 0, int repairordsuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListBySched(0, custno, repairordno, repairordsuf, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbywhse")]
      public IEnumerable<Sweh> GetListByWhse(string whse = "", string leadtech = "", int repairordno = 0, int repairordsuf = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByWhse(0, whse, leadtech, repairordno, repairordsuf, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Sweh Insert(Sweh record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Sweh Update(Sweh record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Sweh record)
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
      public SwehLookupResponseAPI Lookup(Sworderlookupcriteria sworderlookupcriteria)
      {
         return this.repository.Lookup(sworderlookupcriteria);
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
  