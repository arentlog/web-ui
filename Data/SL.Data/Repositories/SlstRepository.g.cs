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
    
namespace Infor.Sxe.SL.Data.Repositories
{
   using Infor.Sxe.SL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsslst;

   public partial class SlstRepository : RepositoryBase
   {
      private SlstAdapter adapter;
  
      public SlstRepository(IProgressConnection connection)
      {
         this.adapter = new SlstAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Slst GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Slst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Slst> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Slst Get(int cono, string codeiden, string codeval, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, codeiden, codeval, batchsize, fldList);
      }
      
      public IEnumerable<Slst> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Slst> GetListByDesc(int cono, string codeiden, string descrip, int batchsize, string fldList)
      {
         return this.adapter.GetListByDesc(cono, codeiden, descrip, batchsize, fldList);
      }

      public Slst Insert(Slst record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Slst Update(Slst record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Slst record)
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
  