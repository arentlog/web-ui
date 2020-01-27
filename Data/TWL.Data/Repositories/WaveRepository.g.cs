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
   using Models.Pdswave;

   public partial class WaveRepository : RepositoryBase
   {
      private WaveAdapter adapter;
  
      public WaveRepository(IProgressConnection connection)
      {
         this.adapter = new WaveAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Wave GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Wave> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Wave Get(string coNum, string whNum, int batch, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, batch, batchsize, fldList);
      }
      
      public IEnumerable<Wave> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Wave> GetListByCoWhCartStatus(string coNum, string whNum, string cart, string waveStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhCartStatus(coNum, whNum, cart, waveStatus, batchsize, fldList);
      }

      public IEnumerable<Wave> GetListByCoWhHostbatch(string coNum, string whNum, string hostBatch, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhHostbatch(coNum, whNum, hostBatch, batchsize, fldList);
      }

      public IEnumerable<Wave> GetListByCoWhStatusBatch(string coNum, string whNum, string waveStatus, int batch, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhStatusBatch(coNum, whNum, waveStatus, batch, batchsize, fldList);
      }

      public IEnumerable<Wave> GetListByWave(int batch, int batchsize, string fldList)
      {
         return this.adapter.GetListByWave(batch, batchsize, fldList);
      }

      public Wave Insert(Wave record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Wave Update(Wave record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Wave record)
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
  