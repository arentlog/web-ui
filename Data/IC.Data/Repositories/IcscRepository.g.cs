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
   using Models.Pdsicsc;
   using Models.Pdsiccataloglookup;
   using Models.Complex;

   public partial class IcscRepository : RepositoryBase
   {
      private IcscAdapter adapter;
  
      public IcscRepository(IProgressConnection connection)
      {
         this.adapter = new IcscAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icsc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icsc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icsc> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Icsc Get(string catalog, int batchsize, string fldList)
      {
         return this.adapter.Get(catalog, batchsize, fldList);
      }
      
      public IEnumerable<Icsc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsc> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByBatch(ecbatchnm, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByCatkeyindex(string catkeyindex, int batchsize, string fldList)
      {
         return this.adapter.GetListByCatkeyindex(catkeyindex, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByDesc(string desckey, int batchsize, string fldList)
      {
         return this.adapter.GetListByDesc(desckey, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByExtprod(string extprod, int batchsize, string fldList)
      {
         return this.adapter.GetListByExtprod(extprod, batchsize, fldList);
      }

      public Icsc GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Icsc> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByVend(decimal vendno, string prodline, string catalog, int batchsize, string fldList)
      {
         return this.adapter.GetListByVend(vendno, prodline, catalog, batchsize, fldList);
      }

      public Icsc Insert(Icsc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icsc Update(Icsc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icsc record)
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
	  
      public IcscLookupResponseAPI Lookup(Iccataloglookupcriteria iccataloglookupcriteria)
      {
         return this.adapter.Lookup(iccataloglookupcriteria);
      }
  
      public IEnumerable<Icsc> GetListByWordIndex(string term, int batchsize, string fldList)
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
  