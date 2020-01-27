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
   using Models.Pdsiceab;

   public partial class IceabRepository : RepositoryBase
   {
      private IceabAdapter adapter;
  
      public IceabRepository(IProgressConnection connection)
      {
         this.adapter = new IceabAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Iceab GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Iceab> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Iceab> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Iceab Get(int cono, decimal custno, string shipto, string coreprod, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, custno, shipto, coreprod, orderno, ordersuf, lineno, batchsize, fldList);
      }
      
      public IEnumerable<Iceab> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Iceab> GetListByCoreprod(int cono, string coreprod, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoreprod(cono, coreprod, batchsize, fldList);
      }

      public IEnumerable<Iceab> GetListByOrder(int cono, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrder(cono, orderno, ordersuf, lineno, batchsize, fldList);
      }

      public Iceab Insert(Iceab record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Iceab Update(Iceab record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Iceab record)
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
  