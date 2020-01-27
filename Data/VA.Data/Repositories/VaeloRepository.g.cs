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
   using Models.Pdsvaelo;

   public partial class VaeloRepository : RepositoryBase
   {
      private VaeloAdapter adapter;
  
      public VaeloRepository(IProgressConnection connection)
      {
         this.adapter = new VaeloAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Vaelo GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Vaelo> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Vaelo> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Vaelo Get(int cono, int vano, int vasuf, int lineno, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, vano, vasuf, lineno, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Vaelo> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Vaelo> GetListByOrder(int cono, string ordertype, int orderaltno, int orderaltsuf, int linealtno, int seqaltno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrder(cono, ordertype, orderaltno, orderaltsuf, linealtno, seqaltno, batchsize, fldList);
      }

      public Vaelo Insert(Vaelo record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Vaelo Update(Vaelo record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Vaelo record)
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
  