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
   using Models.Pdspdsra;

   public partial class PdsraRepository : RepositoryBase
   {
      private PdsraAdapter adapter;
  
      public PdsraRepository(IProgressConnection connection)
      {
         this.adapter = new PdsraAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pdsra GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pdsra> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Pdsra> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Pdsra> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Pdsra Get(int cono, int methodno, int vendno, string altprodgrp, string custrebty, string whse, DateTime? startdt, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, methodno, vendno, altprodgrp, custrebty, whse, startdt, batchsize, fldList);
      }
      
      public IEnumerable<Pdsra> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Pdsra> GetListByAltrebrecno(int cono, int altrebrecno, int batchsize, string fldList)
      {
         return this.adapter.GetListByAltrebrecno(cono, altrebrecno, batchsize, fldList);
      }

      public Pdsra GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public Pdsra Insert(Pdsra record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pdsra Update(Pdsra record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pdsra record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	   

      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         this.adapter.DeleteListByRowPointers(rowpointers);
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
  