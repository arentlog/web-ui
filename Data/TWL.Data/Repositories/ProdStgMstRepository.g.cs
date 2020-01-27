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
   using Models.PdsprodStgMst;

   public partial class ProdStgMstRepository : RepositoryBase
   {
      private ProdStgMstAdapter adapter;
  
      public ProdStgMstRepository(IProgressConnection connection)
      {
         this.adapter = new ProdStgMstAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public ProdStgMst GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<ProdStgMst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public ProdStgMst Get(int id, int batchsize, string fldList)
      {
         return this.adapter.Get(id, batchsize, fldList);
      }
      
      public IEnumerable<ProdStgMst> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<ProdStgMst> GetListByCoWhDate(string coNum, string whNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhDate(coNum, whNum, dateTime, batchsize, fldList);
      }

      public IEnumerable<ProdStgMst> GetListByCoWhDeptDate(string coNum, string whNum, int deptNum, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhDeptDate(coNum, whNum, deptNum, dateTime, batchsize, fldList);
      }

      public IEnumerable<ProdStgMst> GetListByCoWhDeptNameDate(string coNum, string whNum, int deptNum, string name, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhDeptNameDate(coNum, whNum, deptNum, name, dateTime, batchsize, fldList);
      }

      public IEnumerable<ProdStgMst> GetListByCoWhNameDate(string coNum, string whNum, string name, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhNameDate(coNum, whNum, name, dateTime, batchsize, fldList);
      }

      public IEnumerable<ProdStgMst> GetListByCoWhNameLine(string coNum, string whNum, string name, int orderLine, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhNameLine(coNum, whNum, name, orderLine, batchsize, fldList);
      }

      public IEnumerable<ProdStgMst> GetListByCoWhStgDate(string coNum, string whNum, string stagingStatus, string dateTime, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhStgDate(coNum, whNum, stagingStatus, dateTime, batchsize, fldList);
      }

      public ProdStgMst Insert(ProdStgMst record)
      {
         return this.adapter.Insert(record);        
      }
  
      public ProdStgMst Update(ProdStgMst record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(ProdStgMst record)
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
  