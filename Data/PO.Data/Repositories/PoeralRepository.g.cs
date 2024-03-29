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
   using Models.Pdspoeral;

   public partial class PoeralRepository : RepositoryBase
   {
      private PoeralAdapter adapter;
  
      public PoeralRepository(IProgressConnection connection)
      {
         this.adapter = new PoeralAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Poeral GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Poeral> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Poeral> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Poeral Get(int cono, int reportno, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, reportno, lineno, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Poeral> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Poeral> GetListByComprank(int cono, int reportno, string companyrank, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByComprank(cono, reportno, companyrank, lineno, seqno, batchsize, fldList);
      }

      public IEnumerable<Poeral> GetListByProd(int cono, int reportno, string shipprod, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, reportno, shipprod, lineno, seqno, batchsize, fldList);
      }

      public IEnumerable<Poeral> GetListByProduct(int cono, string shipprod, int batchsize, string fldList)
      {
         return this.adapter.GetListByProduct(cono, shipprod, batchsize, fldList);
      }

      public IEnumerable<Poeral> GetListByWhserank(int cono, int reportno, string whserank, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByWhserank(cono, reportno, whserank, lineno, seqno, batchsize, fldList);
      }

      public Poeral Insert(Poeral record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Poeral Update(Poeral record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Poeral record)
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
  