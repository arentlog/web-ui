//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 21496 $
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
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.TWL.Data.Repositories
{
   using Infor.Sxe.TWL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.PdsitemHistory;

   public partial class ItemHistoryRepository : RepositoryBase
   {
      private ItemHistoryAdapter adapter;
  
      public ItemHistoryRepository(IProgressConnection connection)
      {
         this.adapter = new ItemHistoryAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public ItemHistory GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<ItemHistory> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public ItemHistory Get(string coNum, string whNum, string recType, string absNum, string stockStat, DateTime? recDate, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, recType, absNum, stockStat, recDate, batchsize, fldList);
      }
      
      public IEnumerable<ItemHistory> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<ItemHistory> GetListByCoWhAbsLot(string coNum, string whNum, string absNum, string lot, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhAbsLot(coNum, whNum, absNum, lot, batchsize, fldList);
      }

      public IEnumerable<ItemHistory> GetListByCoWhDateType(string coNum, string whNum, DateTime? recDate, string recType, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhDateType(coNum, whNum, recDate, recType, batchsize, fldList);
      }

      public IEnumerable<ItemHistory> GetListByCoWhTypeDateAbsStatus(string coNum, string whNum, string recType, DateTime? recDate, string absNum, string stockStat, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhTypeDateAbsStatus(coNum, whNum, recType, recDate, absNum, stockStat, batchsize, fldList);
      }

      public IEnumerable<ItemHistory> GetListById(int recId, int batchsize, string fldList)
      {
         return this.adapter.GetListById(recId, batchsize, fldList);
      }

      public ItemHistory Insert(ItemHistory record)
      {
         return this.adapter.Insert(record);        
      }
  
      public ItemHistory Update(ItemHistory record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(ItemHistory record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	  
      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }
         this.adapter?.Dispose();	
         this.adapter = null;
         base.Dispose(true);
      }
   }
}
#pragma warning restore 1591
  