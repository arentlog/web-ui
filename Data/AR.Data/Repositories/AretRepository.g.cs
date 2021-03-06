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
    
namespace Infor.Sxe.AR.Data.Repositories
{
   using Infor.Sxe.AR.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsaret;
   using Models.Pdsaretlookup;
   using Models.Complex;

   public partial class AretRepository : RepositoryBase
   {
      private AretAdapter adapter;
  
      public AretRepository(IProgressConnection connection)
      {
         this.adapter = new AretAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Aret GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Aret> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Aret> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Aret> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Aret Get(int cono, int jrnlno, int setno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, jrnlno, setno, batchsize, fldList);
      }
      
      public IEnumerable<Aret> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Aret> GetListByCod(int cono, int invno, int invsuf, bool statustype, int transcd, int sourcecd, int batchsize, string fldList)
      {
         return this.adapter.GetListByCod(cono, invno, invsuf, statustype, transcd, sourcecd, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByCrjrnl(int cono, int crjrnlno, int crsetno, int batchsize, string fldList)
      {
         return this.adapter.GetListByCrjrnl(cono, crjrnlno, crsetno, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByDuedt(int cono, decimal custno, int transcd, int sourcecd, bool statustype, DateTime? duedt, int batchsize, string fldList)
      {
         return this.adapter.GetListByDuedt(cono, custno, transcd, sourcecd, statustype, duedt, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByInq(int cono, decimal custno, DateTime? invdt, int invno, int invsuf, int transcd, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByInq(cono, custno, invdt, invno, invsuf, transcd, seqno, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByInvdt(int cono, decimal custno, int invno, int invsuf, int seqno, DateTime? invdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByInvdt(cono, custno, invno, invsuf, seqno, invdt, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByInvno(int cono, decimal custno, bool statustype, int transcd, int invno, int invsuf, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByInvno(cono, custno, statustype, transcd, invno, invsuf, seqno, batchsize, fldList);
      }

      public Aret GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Aret> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByUdnet(int cono, string location, decimal urecno, int batchsize, string fldList)
      {
         return this.adapter.GetListByUdnet(cono, location, urecno, batchsize, fldList);
      }

      public Aret Insert(Aret record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Aret Update(Aret record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Aret record)
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
	  
      public AretLookupResponseAPI Lookup(Aretlookupcriteria aretlookupcriteria)
      {
         return this.adapter.Lookup(aretlookupcriteria);
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
  