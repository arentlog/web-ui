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
   using Sxe.TWL.Data.Models.PdsitemAlloc;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/itemalloc")]
   public partial class ItemAllocApiController : ApiControllerBase
   {
      private readonly ItemAllocRepository repository;
    
      public ItemAllocApiController(ItemAllocRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
    
      [HttpGet]
      [Route("getbyrowid/{rowid:maxLength(30)}")]
      public ItemAlloc GetByRowId(string rowid, string fldlist = "")
      {
         if (string.IsNullOrEmpty(rowid))
         {
            return null;
         }
         return this.repository.GetByRowId(rowid, fldlist);
      }
      
      [HttpPost]
      [Route("listbyrowids")]      
      public IEnumerable<ItemAlloc> GetListByRowIdList(List<string> rowids, string fldlist = "")
      {
         if (rowids == null || rowids.Count == 0)
         {
            return new List<ItemAlloc>();
         }
         return this.repository.GetListByRowIdList(rowids, rowids.Count, fldlist);
      }
        
      [HttpGet]
      [Route("getbypk")]
      public ItemAlloc Get(string coNum = "", string whNum = "", string dateTime = "", string fldlist = "")
      {
         return this.repository.Get(coNum, whNum, dateTime, 1, fldlist);
      }
        
      [HttpGet]
      [Route("existsbypk")]
      public bool Exists(string coNum = "", string whNum = "", string dateTime = "")
      {
         return (this.repository.Get(coNum, whNum, dateTime, 1, string.Empty) != null);
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
      [Route("listbycokeytype")]
      public IEnumerable<ItemAlloc> GetListByCoKeyType(string coNum = "", int key1 = 0, int key2 = 0, int key3 = 0, string type = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoKeyType(coNum, key1, key2, key3, type, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhabstypetime")]
      public IEnumerable<ItemAlloc> GetListByCoWhAbsTypeTime(string coNum = "", string whNum = "", string absNum = "", string type = "", string dateTime = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhAbsTypeTime(coNum, whNum, absNum, type, dateTime, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbycowhtypekeylot")]
      public IEnumerable<ItemAlloc> GetListByCoWhTypeKeyLot(string coNum = "", string whNum = "", string type = "", int key1 = 0, int key2 = 0, int key3 = 0, string lot = "",  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListByCoWhTypeKeyLot(coNum, whNum, type, key1, key2, key3, lot, batchsize, fldlist);
      }

      [HttpGet]
      [Route("listbyid")]
      public IEnumerable<ItemAlloc> GetListById(int id = 0,  int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetListById(id, batchsize, fldlist);
      }

      [HttpPost]
      [Route("")]
      public ItemAlloc Insert(ItemAlloc record)
      {
         return this.repository.Insert(record);
      }
      
      [HttpPut]
      [Route("")]
      public ItemAlloc Update(ItemAlloc record)
      {
         return this.repository.Update(record);
      }
      
      [HttpDelete]
      [Route("")]
      public void Delete(ItemAlloc record)
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
  