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
   using Models.Pdssasge;

   public partial class SasgeRepository : RepositoryBase
   {
      private SasgeAdapter adapter;
  
      public SasgeRepository(IProgressConnection connection)
      {
         this.adapter = new SasgeAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Sasge GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Sasge> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Sasge> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Sasge Get(int cono, decimal custno, string shipto, string state, string taxtype, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, custno, shipto, state, taxtype, batchsize, fldList);
      }
      
      public IEnumerable<Sasge> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Sasge Insert(Sasge record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Sasge Update(Sasge record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Sasge record)
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
  