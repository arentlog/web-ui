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
   using Sxe.TWL.Data.Models.Pdscartonmst;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/cartonmst")]
   public partial class CartonmstApiController : ApiControllerBase
   {
      private readonly CartonmstRepository repository;
    
      public CartonmstApiController(CartonmstRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Cartonmst GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Cartonmst> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Cartonmst>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Cartonmst Get(int cartonNum = 0, string fldlist = "")
      {
         return this.repository.Get(cartonNum, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(int cartonNum = 0)
      {
         return (this.repository.Get(cartonNum, 1, string.Empty) != null);
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
      [Route("listbycowhbatchordersufseq")]
      public IEnumerable<Cartonmst> GetListByCoWhBatchOrderSufSeq(string coNum = "", string whNum = "", int batch = 0, string lastOrder = "", string lastOrderSuffix = "", int sequence = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhBatchOrderSufSeq(coNum, whNum, batch, lastOrder, lastOrderSuffix, sequence, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhbatchsequence")]
      public IEnumerable<Cartonmst> GetListByCoWhBatchSequence(string coNum = "", string whNum = "", int batch = 0, int sequence = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhBatchSequence(coNum, whNum, batch, sequence, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhcarrier")]
      public IEnumerable<Cartonmst> GetListByCoWhCarrier(string coNum = "", string whNum = "", string carrierId = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhCarrier(coNum, whNum, carrierId, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhcustcarrier")]
      public IEnumerable<Cartonmst> GetListByCoWhCustCarrier(string coNum = "", string whNum = "", string custCode = "", string carrierId = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhCustCarrier(coNum, whNum, custCode, carrierId, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhid")]
      public IEnumerable<Cartonmst> GetListByCoWhId(string coNum = "", string whNum = "", string cartonId = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhId(coNum, whNum, cartonId, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhordersuffix")]
      public IEnumerable<Cartonmst> GetListByCoWhOrderSuffix(string coNum = "", string whNum = "", string lastOrder = "", string lastOrderSuffix = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhOrderSuffix(coNum, whNum, lastOrder, lastOrderSuffix, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhreference")]
      public IEnumerable<Cartonmst> GetListByCoWhReference(string coNum = "", string whNum = "", string reference = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhReference(coNum, whNum, reference, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhstatus")]
      public IEnumerable<Cartonmst> GetListByCoWhStatus(string coNum = "", string whNum = "", string rowStatus = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhStatus(coNum, whNum, rowStatus, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhtracking")]
      public IEnumerable<Cartonmst> GetListByCoWhTracking(string coNum = "", string whNum = "", string trackingId = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhTracking(coNum, whNum, trackingId, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Cartonmst Insert(Cartonmst record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Cartonmst Update(Cartonmst record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Cartonmst record)
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
  