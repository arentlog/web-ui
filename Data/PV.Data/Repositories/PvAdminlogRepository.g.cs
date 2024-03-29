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
    
namespace Infor.Sxe.PV.Data.Repositories
{
   using Infor.Sxe.PV.Data.Adapters;
   
   using Models.PdsContext;
   using Models.PdspvAdminlog;

   public partial class PvAdminlogRepository : RepositoryBase
   {
      private PvAdminlogAdapter adapter;
  
      public PvAdminlogRepository(IProgressConnection connection)
      {
         this.adapter = new PvAdminlogAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public PvAdminlog GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<PvAdminlog> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<PvAdminlog> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public PvAdminlog Get(int cono, string subject, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, subject, batchsize, fldList);
      }
      
      public IEnumerable<PvAdminlog> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<PvAdminlog> GetListByFunction(int cono, string function, int batchsize, string fldList)
      {
         return this.adapter.GetListByFunction(cono, function, batchsize, fldList);
      }

      public PvAdminlog Insert(PvAdminlog record)
      {
         return this.adapter.Insert(record);        
      }
  
      public PvAdminlog Update(PvAdminlog record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(PvAdminlog record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	  
      public void pv_adminlogSave(IEnumerable<PvAdminlog> pv_adminlog)
      {
         this.adapter.pv_adminlogSave(pv_adminlog);
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
  