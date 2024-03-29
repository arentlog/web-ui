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
   using Models.Pdssasgt;

   public partial class SasgtRepository : RepositoryBase
   {
      private SasgtAdapter adapter;
  
      public SasgtRepository(IProgressConnection connection)
      {
         this.adapter = new SasgtAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Sasgt GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Sasgt> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Sasgt> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public IEnumerable<Sasgt> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         return this.adapter.GetListByRowpointers(rowpointers, fldList);
      }
	  
	  
      public Sasgt Get(int cono, string tariffcd, string countryoforigin, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, tariffcd, countryoforigin, batchsize, fldList);
      }
      
      public IEnumerable<Sasgt> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Sasgt GetByRowpointer(string rowpointer, string fldList)
      {
         return this.adapter.GetByRowpointer(rowpointer, fldList);
      }

      public IEnumerable<Sasgt> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByTransdttmz(transdttmz, batchsize, fldList);
      }

      public Sasgt Insert(Sasgt record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Sasgt Update(Sasgt record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Sasgt record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	   

      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         this.adapter.DeleteListByRowPointers(rowpointers);
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
  