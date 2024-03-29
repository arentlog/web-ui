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
   using Sxe.TWL.Data.Models.Pdsmovemst;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/movemst")]
   public partial class MovemstApiController : ApiControllerBase
   {
      private readonly MovemstRepository repository;
    
      public MovemstApiController(MovemstRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Movemst GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Movemst> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Movemst>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Movemst Get(string coNum = "", string whNum = "", string binFrom = "", string absNum = "", string rowStatus = "", string fldlist = "")
      {
         return this.repository.Get(coNum, whNum, binFrom, absNum, rowStatus, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string coNum = "", string whNum = "", string binFrom = "", string absNum = "", string rowStatus = "")
      {
         return (this.repository.Get(coNum, whNum, binFrom, absNum, rowStatus, 1, string.Empty) != null);
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
      [Route("listbybatchitemfromto")]
      public IEnumerable<Movemst> GetListByBatchItemFromTo(int batch = 0, string absNum = "", string binFrom = "", string binTo = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByBatchItemFromTo(batch, absNum, binFrom, binTo, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhabs")]
      public IEnumerable<Movemst> GetListByCoWhAbs(string coNum = "", string whNum = "", string absNum = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhAbs(coNum, whNum, absNum, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhordersuffix")]
      public IEnumerable<Movemst> GetListByCoWhOrderSuffix(string coNum = "", string whNum = "", string order = "", string orderSuffix = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhOrderSuffix(coNum, whNum, order, orderSuffix, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhtask")]
      public IEnumerable<Movemst> GetListByCoWhTask(string coNum = "", string whNum = "", int taskId = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhTask(coNum, whNum, taskId, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhtoabsstatus")]
      public IEnumerable<Movemst> GetListByCoWhToAbsStatus(string coNum = "", string whNum = "", string binTo = "", string absNum = "", string rowStatus = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhToAbsStatus(coNum, whNum, binTo, absNum, rowStatus, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhtruck")]
      public IEnumerable<Movemst> GetListByCoWhTruck(string coNum = "", string whNum = "", string truckId = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhTruck(coNum, whNum, truckId, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyid")]
      public IEnumerable<Movemst> GetListById(int id = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListById(id, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Movemst Insert(Movemst record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Movemst Update(Movemst record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Movemst record)
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
  