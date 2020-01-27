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
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdscret;

   public partial class CretRepository : RepositoryBase
   {
      private CretAdapter adapter;
  
      public CretRepository(IProgressConnection connection)
      {
         this.adapter = new CretAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Cret GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Cret> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Cret> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Cret Get(int cono, int bankno, decimal checkno, int ckrectype, bool statustype, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, bankno, checkno, ckrectype, statustype, batchsize, fldList);
      }
      
      public IEnumerable<Cret> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Cret> GetListByBalanced(int cono, int bankno, bool balancedfl, int ckrectype, decimal checkno, int batchsize, string fldList)
      {
         return this.adapter.GetListByBalanced(cono, bankno, balancedfl, ckrectype, checkno, batchsize, fldList);
      }

      public IEnumerable<Cret> GetListByEnterdt(int cono, int bankno, DateTime? enterdt, DateTime? transdt, string transtm, int batchsize, string fldList)
      {
         return this.adapter.GetListByEnterdt(cono, bankno, enterdt, transdt, transtm, batchsize, fldList);
      }

      public IEnumerable<Cret> GetListByPospaydt(int cono, DateTime? pospaydttmz, int batchsize, string fldList)
      {
         return this.adapter.GetListByPospaydt(cono, pospaydttmz, batchsize, fldList);
      }

      public IEnumerable<Cret> GetListByUdnet(int cono, string location, decimal urecno, int batchsize, string fldList)
      {
         return this.adapter.GetListByUdnet(cono, location, urecno, batchsize, fldList);
      }

      public Cret Insert(Cret record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Cret Update(Cret record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Cret record)
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
  