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
    
namespace Infor.Sxe.IC.Data.Repositories
{
   using Infor.Sxe.IC.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsicseb;

   public partial class IcsebRepository : RepositoryBase
   {
      private IcsebAdapter adapter;
  
      public IcsebRepository(IProgressConnection connection)
      {
         this.adapter = new IcsebAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icseb GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icseb> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icseb> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icseb Get(int cono, string whse, string prod, string bundleid, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, prod, bundleid, batchsize, fldList);
      }
      
      public IEnumerable<Icseb> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icseb> GetListByProd(int cono, string whse, string prod, string bundlestatus, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, whse, prod, bundlestatus, batchsize, fldList);
      }

      public Icseb Insert(Icseb record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icseb Update(Icseb record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icseb record)
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
  