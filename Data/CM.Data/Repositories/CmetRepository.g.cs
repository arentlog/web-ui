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
   using Models.Pdscmet;

   public partial class CmetRepository : RepositoryBase
   {
      private CmetAdapter adapter;
  
      public CmetRepository(IProgressConnection connection)
      {
         this.adapter = new CmetAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Cmet GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Cmet> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Cmet Get(decimal prosno, int sequenceno, int batchsize, string fldList)
      {
         return this.adapter.Get(prosno, sequenceno, batchsize, fldList);
      }
      
      public IEnumerable<Cmet> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Cmet> GetListByActstatus(decimal prosno, string statuscd, DateTime? schstartdt, string schstarttm, bool mustdo, int batchsize, string fldList)
      {
         return this.adapter.GetListByActstatus(prosno, statuscd, schstartdt, schstarttm, mustdo, batchsize, fldList);
      }

      public IEnumerable<Cmet> GetListByCampaign(string campaigncd, int batchsize, string fldList)
      {
         return this.adapter.GetListByCampaign(campaigncd, batchsize, fldList);
      }

      public IEnumerable<Cmet> GetListByCmet(decimal prosno, DateTime? schstartdt, string schstarttm, string name, int batchsize, string fldList)
      {
         return this.adapter.GetListByCmet(prosno, schstartdt, schstarttm, name, batchsize, fldList);
      }

      public IEnumerable<Cmet> GetListByProsno(decimal prosno, DateTime? transdt, int batchsize, string fldList)
      {
         return this.adapter.GetListByProsno(prosno, transdt, batchsize, fldList);
      }

      public IEnumerable<Cmet> GetListByProsstatus(decimal prosno, string statuscd, DateTime? actstartdt, string actstarttm, int batchsize, string fldList)
      {
         return this.adapter.GetListByProsstatus(prosno, statuscd, actstartdt, actstarttm, batchsize, fldList);
      }

      public IEnumerable<Cmet> GetListBySlsrep(string slsrep, string statuscd, DateTime? schstartdt, string schstarttm, int batchsize, string fldList)
      {
         return this.adapter.GetListBySlsrep(slsrep, statuscd, schstartdt, schstarttm, batchsize, fldList);
      }

      public Cmet Insert(Cmet record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Cmet Update(Cmet record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Cmet record)
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
  