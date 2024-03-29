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
    
namespace Infor.Sxe.WT.Data.Repositories
{
   using Infor.Sxe.WT.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdswteh;
   using Models.Pdswtorderlookup;
   using Models.Complex;

   public partial class WtehRepository : RepositoryBase
   {
      private WtehAdapter adapter;
  
      public WtehRepository(IProgressConnection connection)
      {
         this.adapter = new WtehAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Wteh GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Wteh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Wteh> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Wteh> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Wteh Get(int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.Get(wtno, wtsuf, batchsize, fldList);
      }
      
      public IEnumerable<Wteh> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Wteh> GetListByFmwhse(int cono, string shipfmwhse, int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByFmwhse(cono, shipfmwhse, wtno, wtsuf, batchsize, fldList);
      }

      public IEnumerable<Wteh> GetListByJrnlno(int cono, int jrnlno, int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByJrnlno(cono, jrnlno, wtno, wtsuf, batchsize, fldList);
      }

      public IEnumerable<Wteh> GetListByJrnlno2(int cono2, int jrnlno2, int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByJrnlno2(cono2, jrnlno2, wtno, wtsuf, batchsize, fldList);
      }

      public IEnumerable<Wteh> GetListByJrnlno3(int cono, int jrnlno3, int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByJrnlno3(cono, jrnlno3, wtno, wtsuf, batchsize, fldList);
      }

      public Wteh GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Wteh> GetListByTowhse(int cono2, string shiptowhse, int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByTowhse(cono2, shiptowhse, wtno, wtsuf, batchsize, fldList);
      }

      public IEnumerable<Wteh> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public Wteh Insert(Wteh record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Wteh Update(Wteh record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Wteh record)
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
	  
      public WtehLookupResponseAPI Lookup(Wtorderlookupcriteria wtorderlookupcriteria)
      {
         return this.adapter.Lookup(wtorderlookupcriteria);
      }
  
      public IEnumerable<Wteh> GetListByWordIndex(string term, int batchsize, string fldList)
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
  