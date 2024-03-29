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
    
namespace Infor.Sxe.GL.Data.Repositories
{
   using Infor.Sxe.GL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsglss;

   public partial class GlssRepository : RepositoryBase
   {
      private GlssAdapter adapter;
  
      public GlssRepository(IProgressConnection connection)
      {
         this.adapter = new GlssAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Glss GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Glss> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Glss> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Glss Get(int cono, string subledger, string key1, string key2, string key3, string key4, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, subledger, key1, key2, key3, key4, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Glss> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Glss Insert(Glss record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Glss Update(Glss record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Glss record)
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
  