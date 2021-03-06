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
    
namespace Infor.Sxe.BP.Data.Repositories
{
   using Infor.Sxe.BP.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsbpehc;

   public partial class BpehcRepository : RepositoryBase
   {
      private BpehcAdapter adapter;
  
      public BpehcRepository(IProgressConnection connection)
      {
         this.adapter = new BpehcAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Bpehc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Bpehc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Bpehc> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Bpehc Get(int cono, string bpid, int revno, string custpros, string cptype, DateTime? sentdt, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, bpid, revno, custpros, cptype, sentdt, batchsize, fldList);
      }
      
      public IEnumerable<Bpehc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Bpehc> GetListByCustpros(int cono, string custpros, string cptype, string bpid, int revno, DateTime? sentdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByCustpros(cono, custpros, cptype, bpid, revno, sentdt, batchsize, fldList);
      }

      public Bpehc Insert(Bpehc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Bpehc Update(Bpehc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Bpehc record)
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
  