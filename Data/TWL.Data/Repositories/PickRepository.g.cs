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
   using Models.Pdspick;

   public partial class PickRepository : RepositoryBase
   {
      private PickAdapter adapter;
  
      public PickRepository(IProgressConnection connection)
      {
         this.adapter = new PickAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pick GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pick> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Pick Get(string coNum, string whNum, int batch, int pickSequence, string binNum, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, batch, pickSequence, binNum, batchsize, fldList);
      }
      
      public IEnumerable<Pick> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Pick> GetListByCoAltwhAbsStatus(string coNum, string altwhse, string absNum, string pickStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoAltwhAbsStatus(coNum, altwhse, absNum, pickStatus, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListByCoWhAbsStatus(string coNum, string whNum, string absNum, string pickStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhAbsStatus(coNum, whNum, absNum, pickStatus, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListByCoWhBinAbsStatus(string coNum, string whNum, string binNum, string absNum, string pickStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhBinAbsStatus(coNum, whNum, binNum, absNum, pickStatus, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListByCoWhCarton(string coNum, string whNum, string cartonId, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhCarton(coNum, whNum, cartonId, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListByCoWhOSLSStatus(string coNum, string whNum, string order, string orderSuffix, int line, int lineSequence, string pickStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhOSLSStatus(coNum, whNum, order, orderSuffix, line, lineSequence, pickStatus, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListByCoWhStatus(string coNum, string whNum, string pickStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhStatus(coNum, whNum, pickStatus, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListByCoWhZoneAisleBin(string coNum, string whNum, string whZone, int aisle, string binNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhZoneAisleBin(coNum, whNum, whZone, aisle, binNum, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListById(int id, int batchsize, string fldList)
      {
         return this.adapter.GetListById(id, batchsize, fldList);
      }

      public IEnumerable<Pick> GetListByOSLSStatus(string order, string orderSuffix, int line, int lineSequence, string pickStatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByOSLSStatus(order, orderSuffix, line, lineSequence, pickStatus, batchsize, fldList);
      }

      public Pick Insert(Pick record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pick Update(Pick record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pick record)
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
  