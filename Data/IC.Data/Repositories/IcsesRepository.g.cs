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
   using Models.Pdsicses;
   using Models.Pdsicseriallookup;
   using Models.Complex;

   public partial class IcsesRepository : RepositoryBase
   {
      private IcsesAdapter adapter;
  
      public IcsesRepository(IProgressConnection connection)
      {
         this.adapter = new IcsesAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icses GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icses> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icses> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Icses> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Icses Get(int cono, string prod, string whse, string serialno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, prod, whse, serialno, batchsize, fldList);
      }
      
      public IEnumerable<Icses> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icses> GetListByAvail(int cono, string whse, string prod, string currstatus, DateTime? receiptdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByAvail(cono, whse, prod, currstatus, receiptdt, batchsize, fldList);
      }

      public Icses GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Icses> GetListBySerialno(int cono, string whse, string serialno, int batchsize, string fldList)
      {
         return this.adapter.GetListBySerialno(cono, whse, serialno, batchsize, fldList);
      }

      public IEnumerable<Icses> GetListByZprod(int cono, string prod, string serialno, int batchsize, string fldList)
      {
         return this.adapter.GetListByZprod(cono, prod, serialno, batchsize, fldList);
      }

      public Icses Insert(Icses record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icses Update(Icses record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icses record)
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
	  
      public IcsesLookupResponseAPI Lookup(Icseriallookupcriteria icseriallookupcriteria)
      {
         return this.adapter.Lookup(icseriallookupcriteria);
      }
  
      public IEnumerable<Icses> GetListByWordIndex(string term, int batchsize, string fldList)
      {
         return this.adapter.GetListByWordIndex(term, batchsize, fldList);
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
  