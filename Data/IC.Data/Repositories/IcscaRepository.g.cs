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
   using Models.Pdsicsca;

   public partial class IcscaRepository : RepositoryBase
   {
      private IcscaAdapter adapter;
  
      public IcscaRepository(IProgressConnection connection)
      {
         this.adapter = new IcscaAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icsca GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icsca> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Icsca Get(int cono, string catalog, string authgrp, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, catalog, authgrp, batchsize, fldList);
      }
      
      public IEnumerable<Icsca> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsca> GetListByAuthgrp(int cono, string authgrp, int batchsize, string fldList)
      {
         return this.adapter.GetListByAuthgrp(cono, authgrp, batchsize, fldList);
      }

      public IEnumerable<Icsca> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByBatch(ecbatchnm, batchsize, fldList);
      }

      public Icsca Insert(Icsca record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icsca Update(Icsca record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icsca record)
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
  