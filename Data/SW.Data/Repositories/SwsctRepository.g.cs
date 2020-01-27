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
    
namespace Infor.Sxe.SW.Data.Repositories
{
   using Infor.Sxe.SW.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsswsct;

   public partial class SwsctRepository : RepositoryBase
   {
      private SwsctAdapter adapter;
  
      public SwsctRepository(IProgressConnection connection)
      {
         this.adapter = new SwsctAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Swsct GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Swsct> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Swsct> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Swsct Get(int cono, int textno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, textno, batchsize, fldList);
      }
      
      public IEnumerable<Swsct> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Swsct> GetListByGrouping(int cono, string grouping, int textno, int batchsize, string fldList)
      {
         return this.adapter.GetListByGrouping(cono, grouping, textno, batchsize, fldList);
      }

      public Swsct Insert(Swsct record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Swsct Update(Swsct record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Swsct record)
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
  