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
   using Models.Pdsicsg;

   public partial class IcsgRepository : RepositoryBase
   {
      private IcsgAdapter adapter;
  
      public IcsgRepository(IProgressConnection connection)
      {
         this.adapter = new IcsgAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icsg GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icsg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Icsg Get(int groupno, int batchsize, string fldList)
      {
         return this.adapter.Get(groupno, batchsize, fldList);
      }
      
      public IEnumerable<Icsg> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsg> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {
         return this.adapter.GetListByBatch(ecbatchnm, batchsize, fldList);
      }

      public IEnumerable<Icsg> GetListByDescrip(string descrip, int batchsize, string fldList)
      {
         return this.adapter.GetListByDescrip(descrip, batchsize, fldList);
      }

      public IEnumerable<Icsg> GetListByLangcd(string langcd, int batchsize, string fldList)
      {
         return this.adapter.GetListByLangcd(langcd, batchsize, fldList);
      }

      public IEnumerable<Icsg> GetListByStoreid(int corpid, int storeid, int groupno, int batchsize, string fldList)
      {
         return this.adapter.GetListByStoreid(corpid, storeid, groupno, batchsize, fldList);
      }

      public Icsg Insert(Icsg record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icsg Update(Icsg record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icsg record)
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
  