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
    
namespace Infor.Sxe.PO.Data.Repositories
{
   using Infor.Sxe.PO.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspoela;

   public partial class PoelaRepository : RepositoryBase
   {
      private PoelaAdapter adapter;
  
      public PoelaRepository(IProgressConnection connection)
      {
         this.adapter = new PoelaAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Poela GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Poela> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Poela> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Poela Get(int cono, int jrnlno, int setno, int addonno, int pono, int posuf, int lineno, int compseqno, string bundleid, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, jrnlno, setno, addonno, pono, posuf, lineno, compseqno, bundleid, batchsize, fldList);
      }
      
      public IEnumerable<Poela> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Poela> GetListByPono(int cono, int pono, int posuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPono(cono, pono, posuf, lineno, batchsize, fldList);
      }

      public Poela Insert(Poela record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Poela Update(Poela record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Poela record)
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
  