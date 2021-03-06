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
    
namespace Infor.Sxe.CM.Data.Repositories
{
   using Infor.Sxe.CM.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdscmsc;

   public partial class CmscRepository : RepositoryBase
   {
      private CmscAdapter adapter;
  
      public CmscRepository(IProgressConnection connection)
      {
         this.adapter = new CmscAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Cmsc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Cmsc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Cmsc Get(string campaigncd, int batchsize, string fldList)
      {
         return this.adapter.Get(campaigncd, batchsize, fldList);
      }
      
      public IEnumerable<Cmsc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Cmsc Insert(Cmsc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Cmsc Update(Cmsc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Cmsc record)
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
  