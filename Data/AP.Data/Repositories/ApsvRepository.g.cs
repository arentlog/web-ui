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
   using Models.Pdsapsv;
   using Models.Pdsapvendorlookup;
   using Models.Complex;

   public partial class ApsvRepository : RepositoryBase
   {
      private ApsvAdapter adapter;
  
      public ApsvRepository(IProgressConnection connection)
      {
         this.adapter = new ApsvAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Apsv GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Apsv> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Apsv> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Apsv> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Apsv Get(int cono, decimal vendno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, vendno, batchsize, fldList);
      }
      
      public IEnumerable<Apsv> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Apsv> GetListByAddr(int cono, string state, string city, int batchsize, string fldList)
      {
         return this.adapter.GetListByAddr(cono, state, city, batchsize, fldList);
      }

      public IEnumerable<Apsv> GetListByCustno(int cono, decimal arcustno, int batchsize, string fldList)
      {
         return this.adapter.GetListByCustno(cono, arcustno, batchsize, fldList);
      }

      public IEnumerable<Apsv> GetListByEdiptnr(int cono, string edipartner, int batchsize, string fldList)
      {
         return this.adapter.GetListByEdiptnr(cono, edipartner, batchsize, fldList);
      }

      public IEnumerable<Apsv> GetListByLkup(int cono, string lookupnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByLkup(cono, lookupnm, batchsize, fldList);
      }

      public IEnumerable<Apsv> GetListByPhone(int cono, string phoneno, decimal vendno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPhone(cono, phoneno, vendno, batchsize, fldList);
      }

      public Apsv GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Apsv> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public IEnumerable<Apsv> GetListByZipcd(int cono, string zipcd, decimal vendno, int batchsize, string fldList)
      {
         return this.adapter.GetListByZipcd(cono, zipcd, vendno, batchsize, fldList);
      }

      public Apsv Insert(Apsv record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Apsv Update(Apsv record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Apsv record)
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
	  
      public ApsvLookupResponseAPI Lookup(Apvendorlookupcriteria apvendorlookupcriteria)
      {
         return this.adapter.Lookup(apvendorlookupcriteria);
      }
  
      public IEnumerable<Apsv> GetListByWordIndex(string term, int batchsize, string fldList)
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
  