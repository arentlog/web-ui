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
    
namespace Infor.Sxe.SA.Data.Repositories
{
   using Infor.Sxe.SA.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdssasj;
   using Models.Pdsjournallookup;
   using Models.Complex;

   public partial class SasjRepository : RepositoryBase
   {
      private SasjAdapter adapter;
  
      public SasjRepository(IProgressConnection connection)
      {
         this.adapter = new SasjAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Sasj GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Sasj> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Sasj> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Sasj Get(int cono, int jrnlno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, jrnlno, batchsize, fldList);
      }
      
      public IEnumerable<Sasj> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Sasj> GetListByBal(int cono, string ourproc, bool balancefl, DateTime? opendt, int jrnlno, int batchsize, string fldList)
      {
         return this.adapter.GetListByBal(cono, ourproc, balancefl, opendt, jrnlno, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByClose(int cono, string oper2, bool closefl, bool batchfl, int batchsize, string fldList)
      {
         return this.adapter.GetListByClose(cono, oper2, closefl, batchfl, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByInq(int cono, string oper2, int jrnlno, int batchsize, string fldList)
      {
         return this.adapter.GetListByInq(cono, oper2, jrnlno, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByInqd(int cono, int jrnlno, int batchsize, string fldList)
      {
         return this.adapter.GetListByInqd(cono, jrnlno, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByIntellexdt(int cono, DateTime? intellexdt, DateTime? opendt, int batchsize, string fldList)
      {
         return this.adapter.GetListByIntellexdt(cono, intellexdt, opendt, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByPrint(int cono, bool printfl, int jrnlno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPrint(cono, printfl, jrnlno, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByProc(int cono, string currproc, bool closefl, int batchsize, string fldList)
      {
         return this.adapter.GetListByProc(cono, currproc, closefl, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListBySmmerge(int cono, bool smmergedfl, string ourproc, int jrnlno, int batchsize, string fldList)
      {
         return this.adapter.GetListBySmmerge(cono, smmergedfl, ourproc, jrnlno, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public Sasj Insert(Sasj record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Sasj Update(Sasj record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Sasj record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	  
      public SasjLookupResponseAPI Lookup(Journallookupcriteria journallookupcriteria)
      {
         return this.adapter.Lookup(journallookupcriteria);
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
  