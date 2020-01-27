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
   using Models.Pdsicseps;

   public partial class IcsepsRepository : RepositoryBase
   {
      private IcsepsAdapter adapter;
  
      public IcsepsRepository(IProgressConnection connection)
      {
         this.adapter = new IcsepsAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icseps GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icseps> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icseps> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icseps Get(int cono, string whse, int runno, string prod, string serialno, bool unavailfl, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, runno, prod, serialno, unavailfl, batchsize, fldList);
      }
      
      public IEnumerable<Icseps> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icseps> GetListByProd(int cono, string prod, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, prod, batchsize, fldList);
      }

      public Icseps Insert(Icseps record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icseps Update(Icseps record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icseps record)
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
  