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
   using Models.Pdswmet;

   public partial class WmetRepository : RepositoryBase
   {
      private WmetAdapter adapter;
  
      public WmetRepository(IProgressConnection connection)
      {
         this.adapter = new WmetAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Wmet GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Wmet> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Wmet> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Wmet Get(int cono, string whse, string binloc, string prod, int stagecd, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, binloc, prod, stagecd, batchsize, fldList);
      }
      
      public IEnumerable<Wmet> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Wmet> GetListByOrd(int cono, string ordertype, int orderno, int ordersuf, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrd(cono, ordertype, orderno, ordersuf, lineno, seqno, batchsize, fldList);
      }

      public IEnumerable<Wmet> GetListByProd(int cono, string whse, string prod, int stagecd, string ordertype, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, whse, prod, stagecd, ordertype, seqno, batchsize, fldList);
      }

      public IEnumerable<Wmet> GetListByType(int cono, string whse, int stagecd, string ordertype, string pickinit, string binloc, int batchsize, string fldList)
      {
         return this.adapter.GetListByType(cono, whse, stagecd, ordertype, pickinit, binloc, batchsize, fldList);
      }

      public Wmet Insert(Wmet record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Wmet Update(Wmet record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Wmet record)
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
  