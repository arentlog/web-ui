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
   using Models.Pdsapeba;

   public partial class ApebaRepository : RepositoryBase
   {
      private ApebaAdapter adapter;
  
      public ApebaRepository(IProgressConnection connection)
      {
         this.adapter = new ApebaAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Apeba GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Apeba> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Apeba> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Apeba Get(int cono, int jrnlno, int setno, int addonno, int pono, decimal posuf, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, jrnlno, setno, addonno, pono, posuf, batchsize, fldList);
      }
      
      public IEnumerable<Apeba> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Apeba> GetListByStatus(int cono, bool statustype, decimal vendno, string apinvno, int batchsize, string fldList)
      {
         return this.adapter.GetListByStatus(cono, statustype, vendno, apinvno, batchsize, fldList);
      }

      public Apeba Insert(Apeba record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Apeba Update(Apeba record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Apeba record)
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
  