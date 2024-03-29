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
   using Models.Pdsicsoc;

   public partial class IcsocRepository : RepositoryBase
   {
      private IcsocAdapter adapter;
  
      public IcsocRepository(IProgressConnection connection)
      {
         this.adapter = new IcsocAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icsoc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icsoc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icsoc> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icsoc Get(int cono, int levelcd, decimal custno, string shipto, string pricetype, string whse, string custtype, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, levelcd, custno, shipto, pricetype, whse, custtype, batchsize, fldList);
      }
      
      public IEnumerable<Icsoc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsoc> GetListByCustty(int cono, int levelcd, string custtype, string pricetype, string whse, decimal custno, string shipto, int batchsize, string fldList)
      {
         return this.adapter.GetListByCustty(cono, levelcd, custtype, pricetype, whse, custno, shipto, batchsize, fldList);
      }

      public Icsoc Insert(Icsoc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icsoc Update(Icsoc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icsoc record)
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
  