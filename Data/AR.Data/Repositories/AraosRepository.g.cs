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
    
namespace Infor.Sxe.AR.Data.Repositories
{
   using Infor.Sxe.AR.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsaraos;

   public partial class AraosRepository : RepositoryBase
   {
      private AraosAdapter adapter;
  
      public AraosRepository(IProgressConnection connection)
      {
         this.adapter = new AraosAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Araos GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Araos> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Araos> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Araos Get(int cono, string recty, string state, decimal custno, string shipto, string groupid, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, recty, state, custno, shipto, groupid, batchsize, fldList);
      }
      
      public IEnumerable<Araos> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Araos Insert(Araos record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Araos Update(Araos record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Araos record)
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
  