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
   using Models.Pdsarett;

   public partial class ArettRepository : RepositoryBase
   {
      private ArettAdapter adapter;
  
      public ArettRepository(IProgressConnection connection)
      {
         this.adapter = new ArettAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Arett GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Arett> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Arett> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Arett Get(int cono, int recty, int taxgroup, string statecd, string countycd, string citycd, string othercd, string taxexemptcd, int orderno, int ordersuf, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, recty, taxgroup, statecd, countycd, citycd, othercd, taxexemptcd, orderno, ordersuf, batchsize, fldList);
      }
      
      public IEnumerable<Arett> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Arett> GetListByInvdt(int cono, int recty, int taxgroup, string statecd, string countycd, string citycd, string othercd, DateTime? invdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByInvdt(cono, recty, taxgroup, statecd, countycd, citycd, othercd, invdt, batchsize, fldList);
      }

      public IEnumerable<Arett> GetListByOrderno(int cono, int orderno, int ordersuf, int recty, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrderno(cono, orderno, ordersuf, recty, batchsize, fldList);
      }

      public IEnumerable<Arett> GetListByPaiddt(int cono, int recty, int taxgroup, string statecd, string countycd, string citycd, string othercd, DateTime? paiddt, int batchsize, string fldList)
      {
         return this.adapter.GetListByPaiddt(cono, recty, taxgroup, statecd, countycd, citycd, othercd, paiddt, batchsize, fldList);
      }

      public IEnumerable<Arett> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public Arett Insert(Arett record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Arett Update(Arett record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Arett record)
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
  