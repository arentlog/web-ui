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
    
namespace Infor.Sxe.BI.Data.Repositories
{
   using Infor.Sxe.BI.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsbirbd;

   public partial class BirbdRepository : RepositoryBase
   {
      private BirbdAdapter adapter;
  
      public BirbdRepository(IProgressConnection connection)
      {
         this.adapter = new BirbdAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Birbd GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Birbd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Birbd> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Birbd Get(int cono, string kpigroup, int gaugeno, int pagenum, string slicerdata, string row1data, string row2data, string row3data, string col1data, string col2data, string col3data, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, kpigroup, gaugeno, pagenum, slicerdata, row1data, row2data, row3data, col1data, col2data, col3data, batchsize, fldList);
      }
      
      public IEnumerable<Birbd> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Birbd Insert(Birbd record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Birbd Update(Birbd record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Birbd record)
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
  