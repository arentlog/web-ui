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
   using Models.Pdsswoeeh;

   public partial class SwoeehRepository : RepositoryBase
   {
      private SwoeehAdapter adapter;
  
      public SwoeehRepository(IProgressConnection connection)
      {
         this.adapter = new SwoeehAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Swoeeh GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Swoeeh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Swoeeh> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Swoeeh Get(int cono, int orderno, int ordersuf, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, orderno, ordersuf, batchsize, fldList);
      }
      
      public IEnumerable<Swoeeh> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Swoeeh Insert(Swoeeh record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Swoeeh Update(Swoeeh record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Swoeeh record)
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
  