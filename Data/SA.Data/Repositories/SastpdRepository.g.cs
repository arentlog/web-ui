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
    
namespace Infor.Sxe.SA.Data.Repositories
{
   using Infor.Sxe.SA.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdssastpd;

   public partial class SastpdRepository : RepositoryBase
   {
      private SastpdAdapter adapter;
  
      public SastpdRepository(IProgressConnection connection)
      {
         this.adapter = new SastpdAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Sastpd GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Sastpd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Sastpd Get(bool statusfl, string appname, string deviceid, string appuserid, int batchsize, string fldList)
      {
         return this.adapter.Get(statusfl, appname, deviceid, appuserid, batchsize, fldList);
      }
      
      public IEnumerable<Sastpd> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Sastpd Insert(Sastpd record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Sastpd Update(Sastpd record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Sastpd record)
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
  