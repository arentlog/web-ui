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
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.PdseventTrans;

   public partial class EventTransRepository : RepositoryBase
   {
      private EventTransAdapter adapter;
  
      public EventTransRepository(IProgressConnection connection)
      {
         this.adapter = new EventTransAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public EventTrans GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<EventTrans> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<EventTrans> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public EventTrans Get(int cono, string eventname, DateTime? eventdt, string eventtm, decimal recordno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, eventname, eventdt, eventtm, recordno, batchsize, fldList);
      }
      
      public IEnumerable<EventTrans> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<EventTrans> GetListByCustno(int cono, decimal custno, DateTime? eventdt, string eventtm, int batchsize, string fldList)
      {
         return this.adapter.GetListByCustno(cono, custno, eventdt, eventtm, batchsize, fldList);
      }

      public IEnumerable<EventTrans> GetListByDocument(int cono, string doctype, int docorderno, int docordersuf, DateTime? eventdt, string eventtm, int batchsize, string fldList)
      {
         return this.adapter.GetListByDocument(cono, doctype, docorderno, docordersuf, eventdt, eventtm, batchsize, fldList);
      }

      public IEnumerable<EventTrans> GetListByProd(int cono, string prod, string whse, DateTime? eventdt, string eventtm, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, prod, whse, eventdt, eventtm, batchsize, fldList);
      }

      public IEnumerable<EventTrans> GetListByVendno(int cono, decimal vendno, DateTime? eventdt, string eventtm, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendno(cono, vendno, eventdt, eventtm, batchsize, fldList);
      }

      public EventTrans Insert(EventTrans record)
      {
         return this.adapter.Insert(record);        
      }
  
      public EventTrans Update(EventTrans record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(EventTrans record)
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
  