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
    
namespace Infor.Sxe.PV.Data.Repositories
{
   using Infor.Sxe.PV.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspvsassmattr;

   public partial class PvsassmattrRepository : RepositoryBase
   {
      private PvsassmattrAdapter adapter;
  
      public PvsassmattrRepository(IProgressConnection connection)
      {
         this.adapter = new PvsassmattrAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pvsassmattr GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pvsassmattr> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Pvsassmattr Get(string menuset, string functionname, string trmgrlang, int objid, int attrid, int batchsize, string fldList)
      {
         return this.adapter.Get(menuset, functionname, trmgrlang, objid, attrid, batchsize, fldList);
      }
      
      public IEnumerable<Pvsassmattr> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Pvsassmattr> GetListByIdname(string menuset, string functionname, string trmgrlang, int objid, string attrname, int batchsize, string fldList)
      {
         return this.adapter.GetListByIdname(menuset, functionname, trmgrlang, objid, attrname, batchsize, fldList);
      }

      public IEnumerable<Pvsassmattr> GetListByName(string menuset, string functionname, string trmgrlang, string attrname, int batchsize, string fldList)
      {
         return this.adapter.GetListByName(menuset, functionname, trmgrlang, attrname, batchsize, fldList);
      }

      public Pvsassmattr Insert(Pvsassmattr record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pvsassmattr Update(Pvsassmattr record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pvsassmattr record)
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
  