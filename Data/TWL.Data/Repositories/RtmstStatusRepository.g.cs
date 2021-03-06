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
    
namespace Infor.Sxe.TWL.Data.Repositories
{
   using Infor.Sxe.TWL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.PdsrtmstStatus;

   public partial class RtmstStatusRepository : RepositoryBase
   {
      private RtmstStatusAdapter adapter;
  
      public RtmstStatusRepository(IProgressConnection connection)
      {
         this.adapter = new RtmstStatusAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public RtmstStatus GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<RtmstStatus> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public RtmstStatus Get(string code, int batchsize, string fldList)
      {
         return this.adapter.Get(code, batchsize, fldList);
      }
      
      public IEnumerable<RtmstStatus> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<RtmstStatus> GetListByName(string name, int batchsize, string fldList)
      {
         return this.adapter.GetListByName(name, batchsize, fldList);
      }

      public RtmstStatus Insert(RtmstStatus record)
      {
         return this.adapter.Insert(record);        
      }
  
      public RtmstStatus Update(RtmstStatus record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(RtmstStatus record)
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
  