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
   using Models.Pdswtel;

   public partial class WtelRepository : RepositoryBase
   {
      private WtelAdapter adapter;
  
      public WtelRepository(IProgressConnection connection)
      {
         this.adapter = new WtelAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Wtel GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Wtel> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Wtel> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Wtel> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Wtel Get(int wtno, int wtsuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.Get(wtno, wtsuf, lineno, batchsize, fldList);
      }
      
      public IEnumerable<Wtel> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Wtel> GetListByFill(int cono, string statustype, string shipfmwhse, string shipprod, string nonstockty, int bono, string approvety, int batchsize, string fldList)
      {
         return this.adapter.GetListByFill(cono, statustype, shipfmwhse, shipprod, nonstockty, bono, approvety, batchsize, fldList);
      }

      public IEnumerable<Wtel> GetListByProdi(int cono2, string shipprod, string shiptowhse, string statustype, string transtype, DateTime? duedt, int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByProdi(cono2, shipprod, shiptowhse, statustype, transtype, duedt, wtno, wtsuf, batchsize, fldList);
      }

      public IEnumerable<Wtel> GetListByProdo(int cono, string shipprod, string shipfmwhse, int wtno, int wtsuf, int batchsize, string fldList)
      {
         return this.adapter.GetListByProdo(cono, shipprod, shipfmwhse, wtno, wtsuf, batchsize, fldList);
      }

      public Wtel GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Wtel> GetListBySpecns(int cono, string statustype, string nonstockty, string shipfmwhse, string ordertype, string shipprod, int batchsize, string fldList)
      {
         return this.adapter.GetListBySpecns(cono, statustype, nonstockty, shipfmwhse, ordertype, shipprod, batchsize, fldList);
      }

      public IEnumerable<Wtel> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public Wtel Insert(Wtel record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Wtel Update(Wtel record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Wtel record)
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
  