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
    
namespace Infor.Sxe.PO.Data.Repositories
{
   using Infor.Sxe.PO.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspoeh;
   using Models.Pdspoorderlookup;
   using Models.Complex;

   public partial class PoehRepository : RepositoryBase
   {
      private PoehAdapter adapter;
  
      public PoehRepository(IProgressConnection connection)
      {
         this.adapter = new PoehAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Poeh GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Poeh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Poeh> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Poeh> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Poeh Get(int cono, int pono, int posuf, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, pono, posuf, batchsize, fldList);
      }
      
      public IEnumerable<Poeh> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Poeh> GetListByConvert(int cono, string transtype, int stagecd, int pono, int posuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByConvert(cono, transtype, stagecd, pono, posuf, batchsize, fldList);
      }

      public IEnumerable<Poeh> GetListByJrnl(int cono, int jrnlno, int pono, int posuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByJrnl(cono, jrnlno, pono, posuf, batchsize, fldList);
      }

      public IEnumerable<Poeh> GetListByReceiverno(int cono, string receiverno, int stagecd, int pono, int posuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByReceiverno(cono, receiverno, stagecd, pono, posuf, batchsize, fldList);
      }

      public Poeh GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Poeh> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public IEnumerable<Poeh> GetListByVendno(int cono, decimal vendno, int pono, int posuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendno(cono, vendno, pono, posuf, batchsize, fldList);
      }

      public IEnumerable<Poeh> GetListByWhse(int cono, string whse, int pono, int posuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByWhse(cono, whse, pono, posuf, batchsize, fldList);
      }

      public IEnumerable<Poeh> GetListByWhsevendno(int cono, string whse, decimal vendno, int pono, int posuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByWhsevendno(cono, whse, vendno, pono, posuf, batchsize, fldList);
      }

      public Poeh Insert(Poeh record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Poeh Update(Poeh record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Poeh record)
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
	  
      public PoehLookupResponseAPI Lookup(Poorderlookupcriteria poorderlookupcriteria)
      {
         return this.adapter.Lookup(poorderlookupcriteria);
      }
  
      public IEnumerable<Poeh> GetListByWordIndex(string term, int batchsize, string fldList)
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
  