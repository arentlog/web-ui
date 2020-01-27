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
   using Models.PdspvExratelog;

   public partial class PvExratelogRepository : RepositoryBase
   {
      private PvExratelogAdapter adapter;
  
      public PvExratelogRepository(IProgressConnection connection)
      {
         this.adapter = new PvExratelogAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public PvExratelog GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<PvExratelog> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<PvExratelog> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public PvExratelog Get(int cono, string currencyty, string ratefield, DateTime? changedt, int changetm, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, currencyty, ratefield, changedt, changetm, batchsize, fldList);
      }
      
      public IEnumerable<PvExratelog> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<PvExratelog> GetListByTime(int cono, DateTime? changedt, int changetm, int batchsize, string fldList)
      {
         return this.adapter.GetListByTime(cono, changedt, changetm, batchsize, fldList);
      }

      public PvExratelog Insert(PvExratelog record)
      {
         return this.adapter.Insert(record);        
      }
  
      public PvExratelog Update(PvExratelog record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(PvExratelog record)
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
  