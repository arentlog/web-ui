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
    
namespace Infor.Sxe.BP.Data.Repositories
{
   using Infor.Sxe.BP.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsbpehv;

   public partial class BpehvRepository : RepositoryBase
   {
      private BpehvAdapter adapter;
  
      public BpehvRepository(IProgressConnection connection)
      {
         this.adapter = new BpehvAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Bpehv GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Bpehv> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Bpehv> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Bpehv Get(int cono, string bpid, decimal vendno, int shipfmno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, bpid, vendno, shipfmno, batchsize, fldList);
      }
      
      public IEnumerable<Bpehv> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Bpehv Insert(Bpehv record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Bpehv Update(Bpehv record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Bpehv record)
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
  