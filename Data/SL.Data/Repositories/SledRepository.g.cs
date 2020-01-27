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
    
namespace Infor.Sxe.SL.Data.Repositories
{
   using Infor.Sxe.SL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdssled;

   public partial class SledRepository : RepositoryBase
   {
      private SledAdapter adapter;
  
      public SledRepository(IProgressConnection connection)
      {
         this.adapter = new SledAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Sled GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Sled> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Sled> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Sled> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Sled Get(int cono, bool statustype, string imptype, string slupdtno, string prod, string whse, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, statustype, imptype, slupdtno, prod, whse, batchsize, fldList);
      }
      
      public IEnumerable<Sled> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Sled> GetListByPbseqno(int cono, bool statustype, string imptype, string slupdtno, int slpbseqno, string whse, int batchsize, string fldList)
      {
         return this.adapter.GetListByPbseqno(cono, statustype, imptype, slupdtno, slpbseqno, whse, batchsize, fldList);
      }

      public IEnumerable<Sled> GetListByProd(int cono, string prod, string imptype, bool statustype, string slupdtno, string whse, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, prod, imptype, statustype, slupdtno, whse, batchsize, fldList);
      }

      public Sled GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Sled> GetListByStatuscd(int cono, bool statustype, string imptype, string slupdtno, string statuscd, string whse, int batchsize, string fldList)
      {
         return this.adapter.GetListByStatuscd(cono, statustype, imptype, slupdtno, statuscd, whse, batchsize, fldList);
      }

      public IEnumerable<Sled> GetListByWhse(int cono, bool statustype, string imptype, string slupdtno, string whse, string prod, int batchsize, string fldList)
      {
         return this.adapter.GetListByWhse(cono, statustype, imptype, slupdtno, whse, prod, batchsize, fldList);
      }

      public Sled Insert(Sled record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Sled Update(Sled record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Sled record)
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
  