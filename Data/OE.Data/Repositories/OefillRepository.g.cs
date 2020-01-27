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
    
namespace Infor.Sxe.OE.Data.Repositories
{
   using Infor.Sxe.OE.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsoefill;

   public partial class OefillRepository : RepositoryBase
   {
      private OefillAdapter adapter;
  
      public OefillRepository(IProgressConnection connection)
      {
         this.adapter = new OefillAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Oefill GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Oefill> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Oefill> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Oefill Get(int cono, string oper2, string reportnm, string processty, int pickprno, DateTime? reqshipdt, string ordertype, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, oper2, reportnm, processty, pickprno, reqshipdt, ordertype, orderno, ordersuf, lineno, batchsize, fldList);
      }
      
      public IEnumerable<Oefill> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Oefill> GetListByOrder(int cono, string oper2, string reportnm, string processty, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrder(cono, oper2, reportnm, processty, orderno, ordersuf, lineno, batchsize, fldList);
      }

      public IEnumerable<Oefill> GetListByProd(int cono, string oper2, string reportnm, string processty, string prod, int pickprno, DateTime? reqshipdt, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, oper2, reportnm, processty, prod, pickprno, reqshipdt, orderno, ordersuf, lineno, batchsize, fldList);
      }

      public Oefill Insert(Oefill record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Oefill Update(Oefill record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Oefill record)
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
  