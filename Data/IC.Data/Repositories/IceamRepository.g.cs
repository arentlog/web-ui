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
   using Models.Pdsiceam;

   public partial class IceamRepository : RepositoryBase
   {
      private IceamAdapter adapter;
  
      public IceamRepository(IProgressConnection connection)
      {
         this.adapter = new IceamAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Iceam GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Iceam> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Iceam> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Iceam Get(int cono, string transty, int orderno, int ordersuf, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, transty, orderno, ordersuf, lineno, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Iceam> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Iceam> GetListByCoreprod(int cono, string coreprod, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoreprod(cono, coreprod, batchsize, fldList);
      }

      public IEnumerable<Iceam> GetListByCustno(int cono, decimal custno, string transty, DateTime? coreduedt, bool statusfl, int batchsize, string fldList)
      {
         return this.adapter.GetListByCustno(cono, custno, transty, coreduedt, statusfl, batchsize, fldList);
      }

      public IEnumerable<Iceam> GetListByImplyprod(int cono, string implyprod, string transty, int orderno, int ordersuf, int implylineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByImplyprod(cono, implyprod, transty, orderno, ordersuf, implylineno, batchsize, fldList);
      }

      public IEnumerable<Iceam> GetListByOrigprod(int cono, string origprod, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrigprod(cono, origprod, batchsize, fldList);
      }

      public IEnumerable<Iceam> GetListByReturn(int cono, decimal custno, string coreprod, bool statusfl, DateTime? coreduedt, int batchsize, string fldList)
      {
         return this.adapter.GetListByReturn(cono, custno, coreprod, statusfl, coreduedt, batchsize, fldList);
      }

      public IEnumerable<Iceam> GetListByVendno(int cono, decimal vendno, string transty, DateTime? coreduedt, bool statusfl, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendno(cono, vendno, transty, coreduedt, statusfl, batchsize, fldList);
      }

      public Iceam Insert(Iceam record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Iceam Update(Iceam record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Iceam record)
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
  