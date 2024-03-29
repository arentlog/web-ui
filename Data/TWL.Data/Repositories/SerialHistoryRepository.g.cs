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
   using Models.PdsserialHistory;

   public partial class SerialHistoryRepository : RepositoryBase
   {
      private SerialHistoryAdapter adapter;
  
      public SerialHistoryRepository(IProgressConnection connection)
      {
         this.adapter = new SerialHistoryAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public SerialHistory GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<SerialHistory> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public SerialHistory Get(string coNum, string whNum, string order, string orderSuffix, int line, int lineSequence, string serialNum, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, order, orderSuffix, line, lineSequence, serialNum, batchsize, fldList);
      }
      
      public IEnumerable<SerialHistory> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<SerialHistory> GetListByAbsSerial(string absNum, string serialNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByAbsSerial(absNum, serialNum, batchsize, fldList);
      }

      public IEnumerable<SerialHistory> GetListByCOWHABSSERIAL(string coNum, string whNum, string absNum, string serialNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByCOWHABSSERIAL(coNum, whNum, absNum, serialNum, batchsize, fldList);
      }

      public IEnumerable<SerialHistory> GetListByRma(string rma, int batchsize, string fldList)
      {
         return this.adapter.GetListByRma(rma, batchsize, fldList);
      }

      public SerialHistory Insert(SerialHistory record)
      {
         return this.adapter.Insert(record);        
      }
  
      public SerialHistory Update(SerialHistory record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(SerialHistory record)
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
  