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
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsjurtaxdet;

   public partial class JurtaxdetRepository : RepositoryBase
   {
      private JurtaxdetAdapter adapter;
  
      public JurtaxdetRepository(IProgressConnection connection)
      {
         this.adapter = new JurtaxdetAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Jurtaxdet GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Jurtaxdet> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Jurtaxdet> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Jurtaxdet Get(int cono, string srcrowpointer, int jurid, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, srcrowpointer, jurid, batchsize, fldList);
      }
      
      public IEnumerable<Jurtaxdet> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Jurtaxdet> GetListByDisplay(int cono, string dispjurtype, int batchsize, string fldList)
      {
         return this.adapter.GetListByDisplay(cono, dispjurtype, batchsize, fldList);
      }

      public IEnumerable<Jurtaxdet> GetListBySrc(int cono, string srcrowpointer, int batchsize, string fldList)
      {
         return this.adapter.GetListBySrc(cono, srcrowpointer, batchsize, fldList);
      }

      public Jurtaxdet Insert(Jurtaxdet record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Jurtaxdet Update(Jurtaxdet record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Jurtaxdet record)
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
  