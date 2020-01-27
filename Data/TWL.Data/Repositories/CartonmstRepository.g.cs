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
   using Models.Pdscartonmst;

   public partial class CartonmstRepository : RepositoryBase
   {
      private CartonmstAdapter adapter;
  
      public CartonmstRepository(IProgressConnection connection)
      {
         this.adapter = new CartonmstAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Cartonmst GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Cartonmst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Cartonmst Get(int cartonNum, int batchsize, string fldList)
      {
         return this.adapter.Get(cartonNum, batchsize, fldList);
      }
      
      public IEnumerable<Cartonmst> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Cartonmst> GetListByCoWhBatchOrderSufSeq(string coNum, string whNum, int batch, string lastOrder, string lastOrderSuffix, int sequence, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhBatchOrderSufSeq(coNum, whNum, batch, lastOrder, lastOrderSuffix, sequence, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhBatchSequence(string coNum, string whNum, int batch, int sequence, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhBatchSequence(coNum, whNum, batch, sequence, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhCarrier(string coNum, string whNum, string carrierId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhCarrier(coNum, whNum, carrierId, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhCustCarrier(string coNum, string whNum, string custCode, string carrierId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhCustCarrier(coNum, whNum, custCode, carrierId, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhId(string coNum, string whNum, string cartonId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhId(coNum, whNum, cartonId, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhOrderSuffix(string coNum, string whNum, string lastOrder, string lastOrderSuffix, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhOrderSuffix(coNum, whNum, lastOrder, lastOrderSuffix, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhReference(string coNum, string whNum, string reference, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhReference(coNum, whNum, reference, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhStatus(string coNum, string whNum, string rowStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhStatus(coNum, whNum, rowStatus, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhTracking(string coNum, string whNum, string trackingId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhTracking(coNum, whNum, trackingId, batchsize, fldList);
      }

      public Cartonmst Insert(Cartonmst record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Cartonmst Update(Cartonmst record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Cartonmst record)
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
  