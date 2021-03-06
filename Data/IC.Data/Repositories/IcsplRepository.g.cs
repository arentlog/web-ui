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
   using Models.Pdsicspl;

   public partial class IcsplRepository : RepositoryBase
   {
      private IcsplAdapter adapter;
  
      public IcsplRepository(IProgressConnection connection)
      {
         this.adapter = new IcsplAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icspl GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Icspl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Icspl> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Icspl Get(int cono, string type, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, type, batchsize, fldList);
      }
      
      public IEnumerable<Icspl> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Icspl> GetListByDesc(int cono, string descrip, int batchsize, string fldList)
      {
         return this.adapter.GetListByDesc(cono, descrip, batchsize, fldList);
      }

      public IEnumerable<Icspl> GetListByEsales(int cono, decimal custno, string login, int batchsize, string fldList)
      {
         return this.adapter.GetListByEsales(cono, custno, login, batchsize, fldList);
      }

      public Icspl Insert(Icspl record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Icspl Update(Icspl record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Icspl record)
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
  