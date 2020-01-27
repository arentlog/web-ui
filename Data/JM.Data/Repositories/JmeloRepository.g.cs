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
    
namespace Infor.Sxe.JM.Data.Repositories
{
   using Infor.Sxe.JM.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsjmelo;

   public partial class JmeloRepository : RepositoryBase
   {
      private JmeloAdapter adapter;
  
      public JmeloRepository(IProgressConnection connection)
      {
         this.adapter = new JmeloAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Jmelo GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Jmelo> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Jmelo> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Jmelo Get(int cono, string jobid, int jobrevno, int lineno, int seqno, string ordertype, int orderaltno, int orderaltsuf, int linealtno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, jobid, jobrevno, lineno, seqno, ordertype, orderaltno, orderaltsuf, linealtno, batchsize, fldList);
      }
      
      public IEnumerable<Jmelo> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Jmelo> GetListByOrder(int cono, string ordertype, int orderaltno, int orderaltsuf, int linealtno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrder(cono, ordertype, orderaltno, orderaltsuf, linealtno, batchsize, fldList);
      }

      public Jmelo Insert(Jmelo record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Jmelo Update(Jmelo record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Jmelo record)
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
  