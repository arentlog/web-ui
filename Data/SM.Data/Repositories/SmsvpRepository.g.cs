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
    
namespace Infor.Sxe.SM.Data.Repositories
{
   using Infor.Sxe.SM.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdssmsvp;

   public partial class SmsvpRepository : RepositoryBase
   {
      private SmsvpAdapter adapter;
  
      public SmsvpRepository(IProgressConnection connection)
      {
         this.adapter = new SmsvpAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Smsvp GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Smsvp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Smsvp> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Smsvp Get(int cono, int yr, decimal vendno, string whse, string prodcat, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, yr, vendno, whse, prodcat, batchsize, fldList);
      }
      
      public IEnumerable<Smsvp> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Smsvp> GetListByProdcat(int cono, int yr, string prodcat, string whse, decimal vendno, int batchsize, string fldList)
      {
         return this.adapter.GetListByProdcat(cono, yr, prodcat, whse, vendno, batchsize, fldList);
      }

      public Smsvp Insert(Smsvp record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Smsvp Update(Smsvp record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Smsvp record)
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
  