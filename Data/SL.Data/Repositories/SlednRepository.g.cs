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
    
namespace Infor.Sxe.SL.Data.Repositories
{
   using Infor.Sxe.SL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdssledn;

   public partial class SlednRepository : RepositoryBase
   {
      private SlednAdapter adapter;
  
      public SlednRepository(IProgressConnection connection)
      {
         this.adapter = new SlednAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Sledn GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Sledn> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Sledn> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Sledn Get(int cono, string imptype, string slupdtno, string newpartno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, imptype, slupdtno, newpartno, batchsize, fldList);
      }
      
      public IEnumerable<Sledn> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Sledn> GetListByProd(int cono, string imptype, string slupdtno, string prod, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, imptype, slupdtno, prod, batchsize, fldList);
      }

      public Sledn Insert(Sledn record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Sledn Update(Sledn record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Sledn record)
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
  