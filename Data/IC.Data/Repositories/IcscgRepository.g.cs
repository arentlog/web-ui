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
   using Models.Pdsicscg;

   public partial class IcscgRepository : RepositoryBase
   {
      private IcscgAdapter adapter;
  
      public IcscgRepository(IProgressConnection connection)
      {
         this.adapter = new IcscgAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icscg GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icscg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Icscg Get(string catalog, int groupno, int attrno, int batchsize, string fldList)
      {
         return this.adapter.Get(catalog, groupno, attrno, batchsize, fldList);
      }
      
      public IEnumerable<Icscg> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icscg> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByBatch(ecbatchnm, batchsize, fldList);
      }

      public IEnumerable<Icscg> GetListByGroupno(int groupno, int attrno, int batchsize, string fldList)
      {
         return this.adapter.GetListByGroupno(groupno, attrno, batchsize, fldList);
      }

      public Icscg Insert(Icscg record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icscg Update(Icscg record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icscg record)
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
  