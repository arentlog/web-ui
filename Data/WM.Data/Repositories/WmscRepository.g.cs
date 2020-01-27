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
    
namespace Infor.Sxe.WM.Data.Repositories
{
   using Infor.Sxe.WM.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdswmsc;

   public partial class WmscRepository : RepositoryBase
   {
      private WmscAdapter adapter;
  
      public WmscRepository(IProgressConnection connection)
      {
         this.adapter = new WmscAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Wmsc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Wmsc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Wmsc> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Wmsc Get(int cono, string whse, string sizetype, string prod, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, sizetype, prod, batchsize, fldList);
      }
      
      public IEnumerable<Wmsc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Wmsc> GetListByProd(int cono, string whse, string prod, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, whse, prod, batchsize, fldList);
      }

      public Wmsc Insert(Wmsc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Wmsc Update(Wmsc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Wmsc record)
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
  