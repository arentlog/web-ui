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
    
namespace Infor.Sxe.SW.Data.Repositories
{
   using Infor.Sxe.SW.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsswewh;

   public partial class SwewhRepository : RepositoryBase
   {
      private SwewhAdapter adapter;
  
      public SwewhRepository(IProgressConnection connection)
      {
         this.adapter = new SwewhAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Swewh GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Swewh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Swewh> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Swewh Get(int cono, int intclaimno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, intclaimno, batchsize, fldList);
      }
      
      public IEnumerable<Swewh> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Swewh> GetListByVendno(int cono, decimal vendno, int intclaimno, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendno(cono, vendno, intclaimno, batchsize, fldList);
      }

      public Swewh Insert(Swewh record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Swewh Update(Swewh record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Swewh record)
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
  