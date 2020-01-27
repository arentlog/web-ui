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
    
namespace Infor.Sxe.AR.Data.Repositories
{
   using Infor.Sxe.AR.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsarsde;

   public partial class ArsdeRepository : RepositoryBase
   {
      private ArsdeAdapter adapter;
  
      public ArsdeRepository(IProgressConnection connection)
      {
         this.adapter = new ArsdeAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Arsde GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Arsde> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Arsde Get(int encseqno, int batchsize, string fldList)
      {
         return this.adapter.Get(encseqno, batchsize, fldList);
      }
      
      public IEnumerable<Arsde> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Arsde Insert(Arsde record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Arsde Update(Arsde record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Arsde record)
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
  