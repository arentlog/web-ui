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
   using Models.Pdsesbwlstatl;

   public partial class EsbwlstatlRepository : RepositoryBase
   {
      private EsbwlstatlAdapter adapter;
  
      public EsbwlstatlRepository(IProgressConnection connection)
      {
         this.adapter = new EsbwlstatlAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Esbwlstatl GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Esbwlstatl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Esbwlstatl> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Esbwlstatl Get(int cono, string whse, string ordertype, int orderno, int ordersuf, int seqno, int lineno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, ordertype, orderno, ordersuf, seqno, lineno, batchsize, fldList);
      }
      
      public IEnumerable<Esbwlstatl> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Esbwlstatl Insert(Esbwlstatl record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Esbwlstatl Update(Esbwlstatl record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Esbwlstatl record)
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
  