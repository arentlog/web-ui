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
    
namespace Infor.Sxe.VA.Data.Repositories
{
   using Infor.Sxe.VA.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsvaspsas;

   public partial class VaspsasRepository : RepositoryBase
   {
      private VaspsasAdapter adapter;
  
      public VaspsasRepository(IProgressConnection connection)
      {
         this.adapter = new VaspsasAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Vaspsas GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Vaspsas> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Vaspsas> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Vaspsas Get(int cono, string shipprod, string whse, int segment, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, shipprod, whse, segment, batchsize, fldList);
      }
      
      public IEnumerable<Vaspsas> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Vaspsas Insert(Vaspsas record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Vaspsas Update(Vaspsas record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Vaspsas record)
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
  