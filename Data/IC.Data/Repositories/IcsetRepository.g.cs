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
   using Models.Pdsicset;

   public partial class IcsetRepository : RepositoryBase
   {
      private IcsetAdapter adapter;
  
      public IcsetRepository(IProgressConnection connection)
      {
         this.adapter = new IcsetAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icset GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icset> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icset> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icset Get(int cono, string whse, int runno, int ticketno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, whse, runno, ticketno, batchsize, fldList);
      }
      
      public IEnumerable<Icset> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icset> GetListByBin(int cono, string whse, int runno, string binloc, int batchsize, string fldList)
      {
         return this.adapter.GetListByBin(cono, whse, runno, binloc, batchsize, fldList);
      }

      public IEnumerable<Icset> GetListByProd(int cono, string whse, int runno, string prod, string binloc, int batchsize, string fldList)
      {
         return this.adapter.GetListByProd(cono, whse, runno, prod, binloc, batchsize, fldList);
      }

      public IEnumerable<Icset> GetListByProduct(int cono, string prod, int batchsize, string fldList)
      {
         return this.adapter.GetListByProduct(cono, prod, batchsize, fldList);
      }

      public IEnumerable<Icset> GetListByUtick(int cono, string whse, int runno, int uticketno, int batchsize, string fldList)
      {
         return this.adapter.GetListByUtick(cono, whse, runno, uticketno, batchsize, fldList);
      }

      public Icset Insert(Icset record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icset Update(Icset record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icset record)
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
  