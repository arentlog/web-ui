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
    
namespace Infor.Sxe.PD.Data.Repositories
{
   using Infor.Sxe.PD.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspdscc;

   public partial class PdsccRepository : RepositoryBase
   {
      private PdsccAdapter adapter;
  
      public PdsccRepository(IProgressConnection connection)
      {
         this.adapter = new PdsccAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pdscc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pdscc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Pdscc> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Pdscc Get(int cono, int pdrecno, string channel, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, pdrecno, channel, batchsize, fldList);
      }
      
      public IEnumerable<Pdscc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Pdscc> GetListByChannel(int cono, string channel, int batchsize, string fldList)
      {
         return this.adapter.GetListByChannel(cono, channel, batchsize, fldList);
      }

      public Pdscc Insert(Pdscc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pdscc Update(Pdscc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pdscc record)
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
  