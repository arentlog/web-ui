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
    
namespace Infor.Sxe.PV.Data.Repositories
{
   using Infor.Sxe.PV.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspvcontainers;

   public partial class PvcontainersRepository : RepositoryBase
   {
      private PvcontainersAdapter adapter;
  
      public PvcontainersRepository(IProgressConnection connection)
      {
         this.adapter = new PvcontainersAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pvcontainers GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pvcontainers> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Pvcontainers> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Pvcontainers Get(int cono, string oper2, string name, string type, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, oper2, name, type, batchsize, fldList);
      }
      
      public IEnumerable<Pvcontainers> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Pvcontainers Insert(Pvcontainers record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pvcontainers Update(Pvcontainers record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pvcontainers record)
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
  