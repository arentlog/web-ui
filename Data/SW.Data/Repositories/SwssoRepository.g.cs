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
   using Models.Pdsswsso;

   public partial class SwssoRepository : RepositoryBase
   {
      private SwssoAdapter adapter;
  
      public SwssoRepository(IProgressConnection connection)
      {
         this.adapter = new SwssoAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Swsso GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Swsso> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Swsso> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Swsso Get(int cono, string whse, string tech, DateTime? startdt, string schedopttype, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, tech, startdt, schedopttype, batchsize, fldList);
      }
      
      public IEnumerable<Swsso> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Swsso> GetListByStartdt(int cono, DateTime? startdt, string whse, string tech, int batchsize, string fldList)
      {
         return this.adapter.GetListByStartdt(cono, startdt, whse, tech, batchsize, fldList);
      }

      public IEnumerable<Swsso> GetListByTech(int cono, DateTime? startdt, string tech, string whse, int batchsize, string fldList)
      {
         return this.adapter.GetListByTech(cono, startdt, tech, whse, batchsize, fldList);
      }

      public Swsso Insert(Swsso record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Swsso Update(Swsso record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Swsso record)
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
  