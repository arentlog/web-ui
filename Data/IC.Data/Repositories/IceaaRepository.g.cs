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
   using Models.Pdsiceaa;

   public partial class IceaaRepository : RepositoryBase
   {
      private IceaaAdapter adapter;
  
      public IceaaRepository(IProgressConnection connection)
      {
         this.adapter = new IceaaAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Iceaa GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Iceaa> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Iceaa> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Iceaa Get(int cono, string transty, int orderno, int ordersuf, int lineno, int retorderno, int retordersuf, int retlineno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, transty, orderno, ordersuf, lineno, retorderno, retordersuf, retlineno, batchsize, fldList);
      }
      
      public IEnumerable<Iceaa> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Iceaa> GetListByProd(int cono, string prod, string transty, int orderno, int ordersuf, int lineno, int retorderno, int retordersuf, int retlineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, prod, transty, orderno, ordersuf, lineno, retorderno, retordersuf, retlineno, batchsize, fldList);
      }

      public IEnumerable<Iceaa> GetListByReturn(int cono, string transty, int retorderno, int retordersuf, int retlineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByReturn(cono, transty, retorderno, retordersuf, retlineno, batchsize, fldList);
      }

      public Iceaa Insert(Iceaa record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Iceaa Update(Iceaa record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Iceaa record)
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
  