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
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspmes;

   public partial class PmesRepository : RepositoryBase
   {
      private PmesAdapter adapter;
  
      public PmesRepository(IProgressConnection connection)
      {
         this.adapter = new PmesAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pmes GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pmes> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Pmes> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Pmes Get(int cono, int shipreqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, shipreqno, batchsize, fldList);
      }
      
      public IEnumerable<Pmes> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Pmes> GetListByName(int cono, string name, DateTime? shipdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByName(cono, name, shipdt, batchsize, fldList);
      }

      public IEnumerable<Pmes> GetListByReqinit(int cono, string reqinit, DateTime? shipdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByReqinit(cono, reqinit, shipdt, batchsize, fldList);
      }

      public IEnumerable<Pmes> GetListBySend(int cono, string sendtype, decimal sendno, int shipreqno, int batchsize, string fldList)
      {
         return this.adapter.GetListBySend(cono, sendtype, sendno, shipreqno, batchsize, fldList);
      }

      public Pmes Insert(Pmes record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pmes Update(Pmes record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pmes record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
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
  