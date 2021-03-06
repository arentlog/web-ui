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
    
namespace Infor.Sxe.PD.Data.Repositories
{
   using Infor.Sxe.PD.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspdsvcd;

   public partial class PdsvcdRepository : RepositoryBase
   {
      private PdsvcdAdapter adapter;
  
      public PdsvcdRepository(IProgressConnection connection)
      {
         this.adapter = new PdsvcdAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pdsvcd GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pdsvcd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Pdsvcd> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Pdsvcd Get(int cono, string whse, decimal vendno, int shipfmno, string prod, string prodline, DateTime? startdt, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, vendno, shipfmno, prod, prodline, startdt, batchsize, fldList);
      }
      
      public IEnumerable<Pdsvcd> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Pdsvcd> GetListByProd(int cono, string prod, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, prod, batchsize, fldList);
      }

      public IEnumerable<Pdsvcd> GetListByProdline(int cono, string whse, string prodline, DateTime? startdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByProdline(cono, whse, prodline, startdt, batchsize, fldList);
      }

      public IEnumerable<Pdsvcd> GetListByVendor(int cono, decimal vendno, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendor(cono, vendno, batchsize, fldList);
      }

      public IEnumerable<Pdsvcd> GetListByVendpdrecno(int cono, int vendpdrecno, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendpdrecno(cono, vendpdrecno, batchsize, fldList);
      }

      public Pdsvcd Insert(Pdsvcd record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pdsvcd Update(Pdsvcd record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pdsvcd record)
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
  