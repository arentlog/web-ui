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
   using Models.Pdsswsr;

   public partial class SwsrRepository : RepositoryBase
   {
      private SwsrAdapter adapter;
  
      public SwsrRepository(IProgressConnection connection)
      {
         this.adapter = new SwsrAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Swsr GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Swsr> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Swsr> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Swsr Get(int cono, decimal vendno, string prodline, string prod, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, vendno, prodline, prod, batchsize, fldList);
      }
      
      public IEnumerable<Swsr> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Swsr Insert(Swsr record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Swsr Update(Swsr record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Swsr record)
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
  