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
   using Models.Pdsicsgn;

   public partial class IcsgnRepository : RepositoryBase
   {
      private IcsgnAdapter adapter;
  
      public IcsgnRepository(IProgressConnection connection)
      {
         this.adapter = new IcsgnAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icsgn GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icsgn> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Icsgn Get(int nodeid, int batchsize, string fldList)
      {
         return this.adapter.Get(nodeid, batchsize, fldList);
      }
      
      public IEnumerable<Icsgn> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsgn> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByBatch(ecbatchnm, batchsize, fldList);
      }

      public IEnumerable<Icsgn> GetListByGav(string gav, int batchsize, string fldList)
      {
         return this.adapter.GetListByGav(gav, batchsize, fldList);
      }

      public IEnumerable<Icsgn> GetListByGroup(int groupno, string gav, int batchsize, string fldList)
      {
         return this.adapter.GetListByGroup(groupno, gav, batchsize, fldList);
      }

      public IEnumerable<Icsgn> GetListByNodekey(string nodekey, int batchsize, string fldList)
      {
         return this.adapter.GetListByNodekey(nodekey, batchsize, fldList);
      }

      public IEnumerable<Icsgn> GetListByStoreid(int corpid, int storeid, int batchsize, string fldList)
      {
         return this.adapter.GetListByStoreid(corpid, storeid, batchsize, fldList);
      }

      public Icsgn Insert(Icsgn record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icsgn Update(Icsgn record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icsgn record)
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
  