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
    
namespace Infor.Sxe.BI.Data.Repositories
{
   using Infor.Sxe.BI.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsbirbg;

   public partial class BirbgRepository : RepositoryBase
   {
      private BirbgAdapter adapter;
  
      public BirbgRepository(IProgressConnection connection)
      {
         this.adapter = new BirbgAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Birbg GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Birbg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Birbg> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Birbg Get(int cono, string kpigroup, int gaugeno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, kpigroup, gaugeno, batchsize, fldList);
      }
      
      public IEnumerable<Birbg> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Birbg Insert(Birbg record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Birbg Update(Birbg record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Birbg record)
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
  