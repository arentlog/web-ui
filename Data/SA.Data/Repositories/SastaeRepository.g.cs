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
   using Models.Pdssastae;

   public partial class SastaeRepository : RepositoryBase
   {
      private SastaeAdapter adapter;
  
      public SastaeRepository(IProgressConnection connection)
      {
         this.adapter = new SastaeAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Sastae GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Sastae> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Sastae> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Sastae Get(int cono, string codeiden, string codeval, string codedata, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, codeiden, codeval, codedata, batchsize, fldList);
      }
      
      public IEnumerable<Sastae> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Sastae> GetListByData(int cono, string codeiden, string codedata, int batchsize, string fldList)
      {
         return this.adapter.GetListByData(cono, codeiden, codedata, batchsize, fldList);
      }

      public Sastae Insert(Sastae record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Sastae Update(Sastae record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Sastae record)
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
  