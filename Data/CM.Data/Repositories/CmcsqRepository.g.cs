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
   using Models.Pdscmcsq;

   public partial class CmcsqRepository : RepositoryBase
   {
      private CmcsqAdapter adapter;
  
      public CmcsqRepository(IProgressConnection connection)
      {
         this.adapter = new CmcsqAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Cmcsq GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Cmcsq> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Cmcsq Get(string campaigncd, int pageno, int batchsize, string fldList)
      {
         return this.adapter.Get(campaigncd, pageno, batchsize, fldList);
      }
      
      public IEnumerable<Cmcsq> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Cmcsq Insert(Cmcsq record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Cmcsq Update(Cmcsq record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Cmcsq record)
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
  