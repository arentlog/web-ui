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
   using Models.Pdsdepmst;

   public partial class DepmstRepository : RepositoryBase
   {
      private DepmstAdapter adapter;
  
      public DepmstRepository(IProgressConnection connection)
      {
         this.adapter = new DepmstAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Depmst GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Depmst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Depmst Get(string coNum, string whNum, int deptNum, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, deptNum, batchsize, fldList);
      }
      
      public IEnumerable<Depmst> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Depmst Insert(Depmst record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Depmst Update(Depmst record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Depmst record)
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
  