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
   using Models.Pdsicets;

   public partial class IcetsRepository : RepositoryBase
   {
      private IcetsAdapter adapter;
  
      public IcetsRepository(IProgressConnection connection)
      {
         this.adapter = new IcetsAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icets GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icets> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icets> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icets Get(int cono, string prod, string whse, string serialno, string ordertype, int orderno, int ordersuf, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, prod, whse, serialno, ordertype, orderno, ordersuf, lineno, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Icets> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icets> GetListByOrder(int cono, string ordertype, int orderno, int ordersuf, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrder(cono, ordertype, orderno, ordersuf, lineno, seqno, batchsize, fldList);
      }

      public Icets Insert(Icets record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icets Update(Icets record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icets record)
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
  