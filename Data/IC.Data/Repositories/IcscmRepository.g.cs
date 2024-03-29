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
   using Models.Pdsicscm;

   public partial class IcscmRepository : RepositoryBase
   {
      private IcscmAdapter adapter;
  
      public IcscmRepository(IProgressConnection connection)
      {
         this.adapter = new IcscmAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icscm GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icscm> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Icscm Get(decimal mfgno, string name, int batchsize, string fldList)
      {
         return this.adapter.Get(mfgno, name, batchsize, fldList);
      }
      
      public IEnumerable<Icscm> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icscm> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByBatch(ecbatchnm, batchsize, fldList);
      }

      public IEnumerable<Icscm> GetListByMfgnm(string mfgnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByMfgnm(mfgnm, batchsize, fldList);
      }

      public IEnumerable<Icscm> GetListByMfgno(decimal mfgno, int batchsize, string fldList)
      {
         return this.adapter.GetListByMfgno(mfgno, batchsize, fldList);
      }

      public IEnumerable<Icscm> GetListByName(string name, int batchsize, string fldList)
      {
         return this.adapter.GetListByName(name, batchsize, fldList);
      }

      public IEnumerable<Icscm> GetListByStoreid(int corpid, int storeid, decimal mfgno, string name, int batchsize, string fldList)
      {
         return this.adapter.GetListByStoreid(corpid, storeid, mfgno, name, batchsize, fldList);
      }

      public Icscm Insert(Icscm record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icscm Update(Icscm record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icscm record)
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
  