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
   using Models.Pdstransactions;

   public partial class TransactionsRepository : RepositoryBase
   {
      private TransactionsAdapter adapter;
  
      public TransactionsRepository(IProgressConnection connection)
      {
         this.adapter = new TransactionsAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Transactions GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Transactions> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Transactions Get(string coNum, string whNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, dateTime, batchsize, fldList);
      }
      
      public IEnumerable<Transactions> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Transactions> GetListByCargocontrol(string cargoControl, int batchsize, string fldList)
      {
         return this.adapter.GetListByCargocontrol(cargoControl, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhAbsTime(string coNum, string whNum, string absNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhAbsTime(coNum, whNum, absNum, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhBatch(string coNum, string whNum, int batch, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhBatch(coNum, whNum, batch, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhBinTime(string coNum, string whNum, string binNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhBinTime(coNum, whNum, binNum, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhCartonId(string coNum, string whNum, string cartonId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhCartonId(coNum, whNum, cartonId, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhCcid(string coNum, string whNum, int ccId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhCcid(coNum, whNum, ccId, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhCctype(string coNum, string whNum, string ccType, string ccString, int ccId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhCctype(coNum, whNum, ccType, ccString, ccId, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhDeptTypeTime(string coNum, string whNum, int deptNum, string transType, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhDeptTypeTime(coNum, whNum, deptNum, transType, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhDocid(string coNum, string whNum, string docId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhDocid(coNum, whNum, docId, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhEmpTime(string coNum, string whNum, string empNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhEmpTime(coNum, whNum, empNum, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhLotDatetime(string coNum, string whNum, string lot, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhLotDatetime(coNum, whNum, lot, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhPalletfromAbs(string coNum, string whNum, string palletIdFrom, string absNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhPalletfromAbs(coNum, whNum, palletIdFrom, absNum, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhPalletTime(string coNum, string whNum, string palletId, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhPalletTime(coNum, whNum, palletId, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhPoSufTime(string coNum, string whNum, string poNumber, string poSuffix, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhPoSufTime(coNum, whNum, poNumber, poSuffix, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhRtTime(string coNum, string whNum, string rtNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhRtTime(coNum, whNum, rtNum, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhSerialNumDatetime(string coNum, string whNum, string serialNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhSerialNumDatetime(coNum, whNum, serialNum, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhShfTypeTime(string coNum, string whNum, int shfNum, string transType, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhShfTypeTime(coNum, whNum, shfNum, transType, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhTaskDatetime(string coNum, string whNum, int taskId, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhTaskDatetime(coNum, whNum, taskId, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhTypeStatus(string coNum, string whNum, string transType, string rowStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhTypeStatus(coNum, whNum, transType, rowStatus, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByCoWhTypeTime(string coNum, string whNum, string transType, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhTypeTime(coNum, whNum, transType, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByReleaseid(string releaseId, int batchsize, string fldList)
      {
         return this.adapter.GetListByReleaseid(releaseId, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByStatusChrono(string rowStatus, string dateTime, int transSecTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByStatusChrono(rowStatus, dateTime, transSecTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByStatusTypeTime(string rowStatus, string transType, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByStatusTypeTime(rowStatus, transType, dateTime, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByTlink(int transLink, int batchsize, string fldList)
      {
         return this.adapter.GetListByTlink(transLink, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByTransNum(int transNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransNum(transNum, batchsize, fldList);
      }

      public IEnumerable<Transactions> GetListByTypeTransmission(string transType, int transmission, int batchsize, string fldList)
      {
         return this.adapter.GetListByTypeTransmission(transType, transmission, batchsize, fldList);
      }

      public Transactions Insert(Transactions record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Transactions Update(Transactions record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Transactions record)
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
  