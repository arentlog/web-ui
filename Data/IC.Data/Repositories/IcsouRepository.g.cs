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
   using Models.Pdsicsou;

   public partial class IcsouRepository : RepositoryBase
   {
      private IcsouAdapter adapter;
  
      public IcsouRepository(IProgressConnection connection)
      {
         this.adapter = new IcsouAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icsou GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icsou> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icsou> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icsou Get(int cono, string whse, string prod, string reasunavty, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, prod, reasunavty, batchsize, fldList);
      }
      
      public IEnumerable<Icsou> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsou> GetListByReason(int cono, string whse, string reasunavty, string prod, int batchsize, string fldList)
      {
         return this.adapter.GetListByReason(cono, whse, reasunavty, prod, batchsize, fldList);
      }

      public Icsou Insert(Icsou record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icsou Update(Icsou record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icsou record)
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
  