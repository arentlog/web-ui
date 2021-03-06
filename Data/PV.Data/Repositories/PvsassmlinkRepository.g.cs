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
   using Models.Pdspvsassmlink;

   public partial class PvsassmlinkRepository : RepositoryBase
   {
      private PvsassmlinkAdapter adapter;
  
      public PvsassmlinkRepository(IProgressConnection connection)
      {
         this.adapter = new PvsassmlinkAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Pvsassmlink GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Pvsassmlink> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Pvsassmlink Get(string menuset, string functionname, string trmgrlang, int objid, int linkid, int batchsize, string fldList)
      {
         return this.adapter.Get(menuset, functionname, trmgrlang, objid, linkid, batchsize, fldList);
      }
      
      public IEnumerable<Pvsassmlink> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Pvsassmlink Insert(Pvsassmlink record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Pvsassmlink Update(Pvsassmlink record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Pvsassmlink record)
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
  