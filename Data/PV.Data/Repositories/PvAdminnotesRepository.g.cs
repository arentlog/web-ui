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
   using Models.PdspvAdminnotes;

   public partial class PvAdminnotesRepository : RepositoryBase
   {
      private PvAdminnotesAdapter adapter;
  
      public PvAdminnotesRepository(IProgressConnection connection)
      {
         this.adapter = new PvAdminnotesAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public PvAdminnotes GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<PvAdminnotes> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<PvAdminnotes> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public PvAdminnotes Get(int cono, string subject, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, subject, batchsize, fldList);
      }
      
      public IEnumerable<PvAdminnotes> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public PvAdminnotes Insert(PvAdminnotes record)
      {
         return this.adapter.Insert(record);        
      }
  
      public PvAdminnotes Update(PvAdminnotes record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(PvAdminnotes record)
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
  