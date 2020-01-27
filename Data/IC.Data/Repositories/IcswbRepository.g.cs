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
   using Models.Pdsicswb;

   public partial class IcswbRepository : RepositoryBase
   {
      private IcswbAdapter adapter;
  
      public IcswbRepository(IProgressConnection connection)
      {
         this.adapter = new IcswbAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icswb GetByRowId(string rowId, bool fillMode, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fillMode, fldList);
      }

      public IEnumerable<Icswb> GetListByRowIdList(List<string> rowIds, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, fillMode, batchsize, fldList);
      }
        
      public IEnumerable<Icswb> GetListAllByCono(int cono, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, fillMode, batchsize, fldList);
      }
      public Icswb Get(int cono, string prod, string whse, string binloc, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, prod, whse, binloc, fillMode, batchsize, fldList);
      }
      
      public IEnumerable<Icswb> GetList(string where, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, fillMode, batchsize, fldList);
      }
  
      public IEnumerable<Icswb> GetListByBinloc(int cono, string whse, string binloc, string prod, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetListByBinloc(cono, whse, binloc, prod, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icswb> GetListByWhse(int cono, string whse, string prod, bool fillMode, int batchsize, string fldList)
      {
         return this.adapter.GetListByWhse(cono, whse, prod, fillMode, batchsize, fldList);
      }

      public Icswb Insert(Icswb record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icswb Update(Icswb record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icswb record)
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
  