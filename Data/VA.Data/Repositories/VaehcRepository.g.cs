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
   using Models.Pdsvaehc;

   public partial class VaehcRepository : RepositoryBase
   {
      private VaehcAdapter adapter;
  
      public VaehcRepository(IProgressConnection connection)
      {
         this.adapter = new VaehcAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Vaehc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Vaehc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Vaehc> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Vaehc Get(int cono, int vano, int vasuf, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, vano, vasuf, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Vaehc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Vaehc> GetListByEnterdt(int cono, int vano, int vasuf, DateTime? enterdt, int seqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByEnterdt(cono, vano, vasuf, enterdt, seqno, batchsize, fldList);
      }

      public Vaehc Insert(Vaehc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Vaehc Update(Vaehc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Vaehc record)
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
  