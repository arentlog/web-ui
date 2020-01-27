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
    
namespace Infor.Sxe.EDI.Data.Repositories
{
   using Infor.Sxe.EDI.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsedsc;

   public partial class EdscRepository : RepositoryBase
   {
      private EdscAdapter adapter;
  
      public EdscRepository(IProgressConnection connection)
      {
         this.adapter = new EdscAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Edsc GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Edsc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Edsc Get(bool transmitty, string partnerid, decimal docno, string version, string segment, decimal element, string loop, string condvalue, string condfield, int batchsize, string fldList)
      {
         return this.adapter.Get(transmitty, partnerid, docno, version, segment, element, loop, condvalue, condfield, batchsize, fldList);
      }
      
      public IEnumerable<Edsc> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Edsc> GetListByOut(bool transmitty, decimal docno, string version, string segment, decimal element, int batchsize, string fldList)
      {
         return this.adapter.GetListByOut(transmitty, docno, version, segment, element, batchsize, fldList);
      }

      public Edsc Insert(Edsc record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Edsc Update(Edsc record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Edsc record)
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
  