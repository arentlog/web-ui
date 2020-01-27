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
    
namespace Infor.Sxe.CM.Data.Repositories
{
   using Infor.Sxe.CM.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdscmsn;

   public partial class CmsnRepository : RepositoryBase
   {
      private CmsnAdapter adapter;
  
      public CmsnRepository(IProgressConnection connection)
      {
         this.adapter = new CmsnAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Cmsn GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Cmsn> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Cmsn Get(decimal prosno, int priority, int batchsize, string fldList)
      {
         return this.adapter.Get(prosno, priority, batchsize, fldList);
      }
      
      public IEnumerable<Cmsn> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Cmsn> GetListByCname(string name, int batchsize, string fldList)
      {
         return this.adapter.GetListByCname(name, batchsize, fldList);
      }

      public IEnumerable<Cmsn> GetListByName(decimal prosno, string name, int batchsize, string fldList)
      {
         return this.adapter.GetListByName(prosno, name, batchsize, fldList);
      }

      public IEnumerable<Cmsn> GetListByPhone(string phoneno, int batchsize, string fldList)
      {
         return this.adapter.GetListByPhone(phoneno, batchsize, fldList);
      }

      public IEnumerable<Cmsn> GetListByProsno(decimal prosno, DateTime? transdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByProsno(prosno, transdt, batchsize, fldList);
      }

      public Cmsn Insert(Cmsn record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Cmsn Update(Cmsn record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Cmsn record)
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
  