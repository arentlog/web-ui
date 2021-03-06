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
   using Models.PdsbinSize;

   public partial class BinSizeRepository : RepositoryBase
   {
      private BinSizeAdapter adapter;
  
      public BinSizeRepository(IProgressConnection connection)
      {
         this.adapter = new BinSizeAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public BinSize GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<BinSize> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public BinSize Get(string coNum, string whNum, string locType, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, locType, batchsize, fldList);
      }
      
      public IEnumerable<BinSize> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public BinSize Insert(BinSize record)
      {
         return this.adapter.Insert(record);        
      }
  
      public BinSize Update(BinSize record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(BinSize record)
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
  