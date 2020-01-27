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
    
namespace Infor.Sxe.VA.Data.Repositories
{
   using Infor.Sxe.VA.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsvast;

   public partial class VastRepository : RepositoryBase
   {
      private VastAdapter adapter;
  
      public VastRepository(IProgressConnection connection)
      {
         this.adapter = new VastAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Vast GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Vast> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Vast> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Vast Get(int cono, string codeiden, string codeval, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, codeiden, codeval, batchsize, fldList);
      }
      
      public IEnumerable<Vast> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Vast> GetListByDescrip(int cono, string codeiden, string descrip, int batchsize, string fldList)
      {
         return this.adapter.GetListByDescrip(cono, codeiden, descrip, batchsize, fldList);
      }

      public IEnumerable<Vast> GetListByVendno(int cono, string codeiden, decimal destvendno, string codeval, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendno(cono, codeiden, destvendno, codeval, batchsize, fldList);
      }

      public Vast Insert(Vast record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Vast Update(Vast record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Vast record)
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
  