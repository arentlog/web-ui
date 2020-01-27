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
   using Models.PdswhZone;

   public partial class WhZoneRepository : RepositoryBase
   {
      private WhZoneAdapter adapter;
  
      public WhZoneRepository(IProgressConnection connection)
      {
         this.adapter = new WhZoneAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public WhZone GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<WhZone> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public WhZone Get(string coNum, string whNum, int pickSequence, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, pickSequence, batchsize, fldList);
      }
      
      public IEnumerable<WhZone> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<WhZone> GetListByCoWhName(string coNum, string whNum, string whZone, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhName(coNum, whNum, whZone, batchsize, fldList);
      }

      public IEnumerable<WhZone> GetListByCoZone(string coNum, string whZone, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoZone(coNum, whZone, batchsize, fldList);
      }

      public WhZone Insert(WhZone record)
      {
         return this.adapter.Insert(record);        
      }
  
      public WhZone Update(WhZone record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(WhZone record)
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
  