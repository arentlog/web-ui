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
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsdealph;

   public partial class DealphRepository : RepositoryBase
   {
      private DealphAdapter adapter;
  
      public DealphRepository(IProgressConnection connection)
      {
         this.adapter = new DealphAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Dealph GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Dealph> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Dealph> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Dealph Get(int cono, string qualtype, string qualentity, string whse, string pricetype, DateTime? startdt, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, qualtype, qualentity, whse, pricetype, startdt, batchsize, fldList);
      }
      
      public IEnumerable<Dealph> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Dealph> GetListByDealrecno(int cono, int dealrecno, int batchsize, string fldList)
      {
         return this.adapter.GetListByDealrecno(cono, dealrecno, batchsize, fldList);
      }

      public IEnumerable<Dealph> GetListByStartdt(int cono, DateTime? startdt, string qualtype, string qualentity, string whse, string pricetype, int batchsize, string fldList)
      {
         return this.adapter.GetListByStartdt(cono, startdt, qualtype, qualentity, whse, pricetype, batchsize, fldList);
      }

      public IEnumerable<Dealph> GetListByWhse(int cono, string whse, string qualtype, string qualentity, string pricetype, DateTime? startdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByWhse(cono, whse, qualtype, qualentity, pricetype, startdt, batchsize, fldList);
      }

      public Dealph Insert(Dealph record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Dealph Update(Dealph record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Dealph record)
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
  