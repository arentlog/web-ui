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
    
namespace Infor.Sxe.IC.Data.Repositories
{
   using Infor.Sxe.IC.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsicenl;

   public partial class IcenlRepository : RepositoryBase
   {
      private IcenlAdapter adapter;
  
      public IcenlRepository(IProgressConnection connection)
      {
         this.adapter = new IcenlAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icenl GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icenl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icenl> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icenl Get(int cono, string typecd, string whse, string prod, string prodcat, int seqnoh, int seqnod, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, typecd, whse, prod, prodcat, seqnoh, seqnod, batchsize, fldList);
      }
      
      public IEnumerable<Icenl> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icenl> GetListByJrnlno(int cono, int jrnlno, int setno, int batchsize, string fldList)
      {
         return this.adapter.GetListByJrnlno(cono, jrnlno, setno, batchsize, fldList);
      }

      public IEnumerable<Icenl> GetListByOrder(int cono, int orderno, int ordersuf, string ordtype, int batchsize, string fldList)
      {
         return this.adapter.GetListByOrder(cono, orderno, ordersuf, ordtype, batchsize, fldList);
      }

      public Icenl Insert(Icenl record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icenl Update(Icenl record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icenl record)
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
  