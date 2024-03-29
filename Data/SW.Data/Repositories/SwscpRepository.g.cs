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
   using Models.Pdsswscp;

   public partial class SwscpRepository : RepositoryBase
   {
      private SwscpAdapter adapter;
  
      public SwscpRepository(IProgressConnection connection)
      {
         this.adapter = new SwscpAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Swscp GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Swscp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Swscp> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Swscp Get(int cono, string probfailcd, decimal vendno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, probfailcd, vendno, batchsize, fldList);
      }
      
      public IEnumerable<Swscp> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Swscp Insert(Swscp record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Swscp Update(Swscp record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Swscp record)
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
  