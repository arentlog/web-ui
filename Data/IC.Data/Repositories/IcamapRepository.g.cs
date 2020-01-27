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
    
namespace Infor.Sxe.IC.Data.Repositories
{
   using Infor.Sxe.IC.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsicamap;

   public partial class IcamapRepository : RepositoryBase
   {
      private IcamapAdapter adapter;
  
      public IcamapRepository(IProgressConnection connection)
      {
         this.adapter = new IcamapAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icamap GetByRowId(string rowId, bool fillMode, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fillMode, fldList);
      }

      public IEnumerable<Icamap> GetListByRowIdList(List<string> rowIds, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, fillMode, batchsize, fldList);
      }
        
      public IEnumerable<Icamap> GetListAllByCono(int cono, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, fillMode, batchsize, fldList);
      }
      public Icamap Get(int cono, int reportno, string whse, string prod, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, reportno, whse, prod, fillMode, batchsize, fldList);
      }
      
      public IEnumerable<Icamap> GetList(string where, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, fillMode, batchsize, fldList);
      }
  
      public IEnumerable<Icamap> GetListByProd(int cono, int reportno, string prod, string whse, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, reportno, prod, whse, fillMode, batchsize, fldList);
      }

      public Icamap Insert(Icamap record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icamap Update(Icamap record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icamap record)
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
  