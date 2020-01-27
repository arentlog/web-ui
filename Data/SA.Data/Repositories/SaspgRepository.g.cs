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
    
namespace Infor.Sxe.SA.Data.Repositories
{
   using Infor.Sxe.SA.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdssaspg;

   public partial class SaspgRepository : RepositoryBase
   {
      private SaspgAdapter adapter;
  
      public SaspgRepository(IProgressConnection connection)
      {
         this.adapter = new SaspgAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Saspg GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Saspg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Saspg Get(string saspgroup, int batchsize, string fldList)
      {
         return this.adapter.Get(saspgroup, batchsize, fldList);
      }
      
      public IEnumerable<Saspg> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Saspg Insert(Saspg record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Saspg Update(Saspg record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Saspg record)
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
  