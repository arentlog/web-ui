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
    
namespace Infor.Sxe.OT.Data.Repositories
{
   using Infor.Sxe.OT.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsotepl;

   public partial class OteplRepository : RepositoryBase
   {
      private OteplAdapter adapter;
  
      public OteplRepository(IProgressConnection connection)
      {
         this.adapter = new OteplAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Otepl GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Otepl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Otepl> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Otepl Get(int cono, int trackno, int lineno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, trackno, lineno, batchsize, fldList);
      }
      
      public IEnumerable<Otepl> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Otepl> GetListByOtpo(int cono, int pono, int posuf, int polineno, int batchsize, string fldList)
      {
         return this.adapter.GetListByOtpo(cono, pono, posuf, polineno, batchsize, fldList);
      }

      public IEnumerable<Otepl> GetListByStatus(int cono, bool statustype, int batchsize, string fldList)
      {
         return this.adapter.GetListByStatus(cono, statustype, batchsize, fldList);
      }

      public Otepl Insert(Otepl record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Otepl Update(Otepl record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Otepl record)
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
  