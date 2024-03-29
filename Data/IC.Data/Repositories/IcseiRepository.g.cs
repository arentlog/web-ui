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
   using Models.Pdsicsei;

   public partial class IcseiRepository : RepositoryBase
   {
      private IcseiAdapter adapter;
  
      public IcseiRepository(IProgressConnection connection)
      {
         this.adapter = new IcseiAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icsei GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icsei> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icsei> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Icsei> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Icsei Get(int cono, string whse, string prod, DateTime? primarykeydt, DateTime? secondarykeydt, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, prod, primarykeydt, secondarykeydt, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Icsei> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsei> GetListByOrder(int cono, string ordertype, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrder(cono, ordertype, orderno, ordersuf, lineno, batchsize, fldList);
      }

      public Icsei GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Icsei> GetListBySrchty(int cono, string statustype, string whse, string prod, string nonstockty, DateTime? primarykeydt, DateTime? secondarykeydt, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListBySrchty(cono, statustype, whse, prod, nonstockty, primarykeydt, secondarykeydt, seqno, batchsize, fldList);
      }

      public Icsei Insert(Icsei record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icsei Update(Icsei record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icsei record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	   

      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         this.adapter.DeleteListByRowPointers(rowpointers);
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
  