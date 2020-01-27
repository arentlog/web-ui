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
    
namespace Infor.Sxe.AP.Data.Repositories
{
   using Infor.Sxe.AP.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsapss;
   using Models.Pdsapshipfromlookup;
   using Models.Complex;

   public partial class ApssRepository : RepositoryBase
   {
      private ApssAdapter adapter;
  
      public ApssRepository(IProgressConnection connection)
      {
         this.adapter = new ApssAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Apss GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Apss> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Apss> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Apss> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Apss Get(int cono, decimal vendno, int shipfmno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, vendno, shipfmno, batchsize, fldList);
      }
      
      public IEnumerable<Apss> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Apss> GetListByAddr(int cono, decimal vendno, string state, string city, int batchsize, string fldList)
      {
         return this.adapter.GetListByAddr(cono, vendno, state, city, batchsize, fldList);
      }

      public IEnumerable<Apss> GetListByPhone(int cono, string phoneno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPhone(cono, phoneno, batchsize, fldList);
      }

      public Apss GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Apss> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public IEnumerable<Apss> GetListByZipcd(int cono, string zipcd, decimal vendno, int shipfmno, int batchsize, string fldList)
      {
         return this.adapter.GetListByZipcd(cono, zipcd, vendno, shipfmno, batchsize, fldList);
      }

      public Apss Insert(Apss record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Apss Update(Apss record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Apss record)
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
	  
      public ApssLookupResponseAPI Lookup(Apshipfromlookupcriteria apshipfromlookupcriteria)
      {
         return this.adapter.Lookup(apshipfromlookupcriteria);
      }
  
      public IEnumerable<Apss> GetListByWordIndex(string term, int batchsize, string fldList)
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
  