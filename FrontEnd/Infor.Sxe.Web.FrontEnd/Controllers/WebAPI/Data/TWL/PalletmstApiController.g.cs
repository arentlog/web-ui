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
   using Sxe.TWL.Data.Models.Pdspalletmst;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/palletmst")]
   public partial class PalletmstApiController : ApiControllerBase
   {
      private readonly PalletmstRepository repository;
    
      public PalletmstApiController(PalletmstRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public Palletmst GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<Palletmst> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<Palletmst>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public Palletmst Get(string coNum = "", string whNum = "", string palletId = "", string fldlist = "")
      {
         return this.repository.Get(coNum, whNum, palletId, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string coNum = "", string whNum = "", string palletId = "")
      {
         return (this.repository.Get(coNum, whNum, palletId, 1, string.Empty) != null);
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
      [Route("listbycowhcarrierstat")]
      public IEnumerable<Palletmst> GetListByCoWhCarrierStat(string coNum = "", string whNum = "", string carrierId = "", string rowStatus = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhCarrierStat(coNum, whNum, carrierId, rowStatus, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhcartidcartbinpallet")]
      public IEnumerable<Palletmst> GetListByCoWhCartidCartbinPallet(string coNum = "", string whNum = "", string cartId = "", string cartBin = "", string palletId = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhCartidCartbinPallet(coNum, whNum, cartId, cartBin, palletId, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhcuststat")]
      public IEnumerable<Palletmst> GetListByCoWhCustStat(string coNum = "", string whNum = "", string custCode = "", string rowStatus = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhCustStat(coNum, whNum, custCode, rowStatus, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhpallettype")]
      public IEnumerable<Palletmst> GetListByCoWhPalletType(string coNum = "", string whNum = "", string palletType = "", string rowStatus = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhPalletType(coNum, whNum, palletType, rowStatus, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhtracking")]
      public IEnumerable<Palletmst> GetListByCoWhTracking(string coNum = "", string whNum = "", string trackingId = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhTracking(coNum, whNum, trackingId, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbynum")]
      public IEnumerable<Palletmst> GetListByNum(int palletNum = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByNum(palletNum, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public Palletmst Insert(Palletmst record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public Palletmst Update(Palletmst record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(Palletmst record)
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
  