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
   using Models.PdspvSecure;

   public partial class PvSecureRepository : RepositoryBase
   {
      private PvSecureAdapter adapter;
  
      public PvSecureRepository(IProgressConnection connection)
      {
         this.adapter = new PvSecureAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public PvSecure GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<PvSecure> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<PvSecure> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public PvSecure Get(int cono, string oper2, string functionName, string menuSet, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, oper2, functionName, menuSet, batchsize, fldList);
      }
      
      public IEnumerable<PvSecure> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<PvSecure> GetListByPvFunction(string menuSet, string functionName, int batchsize, string fldList)
      {
         return this.adapter.GetListByPvFunction(menuSet, functionName, batchsize, fldList);
      }

      public PvSecure Insert(PvSecure record)
      {
         return this.adapter.Insert(record);        
      }
  
      public PvSecure Update(PvSecure record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(PvSecure record)
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
  