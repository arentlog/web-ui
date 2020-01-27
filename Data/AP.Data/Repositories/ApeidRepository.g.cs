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
    
namespace Infor.Sxe.AP.Data.Repositories
{
   using Infor.Sxe.AP.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsapeid;

   public partial class ApeidRepository : RepositoryBase
   {
      private ApeidAdapter adapter;
  
      public ApeidRepository(IProgressConnection connection)
      {
         this.adapter = new ApeidAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Apeid GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Apeid> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Apeid> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Apeid Get(int cono, string groupnm, DateTime? createddt, int groupseqno, int detailseqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, groupnm, createddt, groupseqno, detailseqno, batchsize, fldList);
      }
      
      public IEnumerable<Apeid> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Apeid> GetListByAddonseqno(int cono, string groupnm, DateTime? createddt, int groupseqno, int pono, int posuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByAddonseqno(cono, groupnm, createddt, groupseqno, pono, posuf, lineno, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByDetailty(int cono, string groupnm, DateTime? createddt, int groupseqno, string detailty, int batchsize, string fldList)
      {
         return this.adapter.GetListByDetailty(cono, groupnm, createddt, groupseqno, detailty, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByPoline(int cono, string groupnm, DateTime? createddt, int groupseqno, int pono, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPoline(cono, groupnm, createddt, groupseqno, pono, lineno, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByPono(int pono, int posuf, int lineno, string bundleid, int compseqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPono(pono, posuf, lineno, bundleid, compseqno, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByPosufline(int cono, string groupnm, DateTime? createddt, int groupseqno, int pono, int posuf, int lineno, string bundleid, int compseqno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPosufline(cono, groupnm, createddt, groupseqno, pono, posuf, lineno, bundleid, compseqno, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByShipprod(int cono, string groupnm, DateTime? createddt, int groupseqno, string shipprod, int batchsize, string fldList)
      {
         return this.adapter.GetListByShipprod(cono, groupnm, createddt, groupseqno, shipprod, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByStatus(int cono, bool statustype, decimal vendno, string apinvno, int batchsize, string fldList)
      {
         return this.adapter.GetListByStatus(cono, statustype, vendno, apinvno, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByVendprod(int cono, string groupnm, DateTime? createddt, int groupseqno, string vendprod, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendprod(cono, groupnm, createddt, groupseqno, vendprod, batchsize, fldList);
      }

      public Apeid Insert(Apeid record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Apeid Update(Apeid record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Apeid record)
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
  