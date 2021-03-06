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
    
namespace Infor.Sxe.GL.Data.Repositories
{
   using Infor.Sxe.GL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsglifa;

   public partial class GlifaRepository : RepositoryBase
   {
      private GlifaAdapter adapter;
  
      public GlifaRepository(IProgressConnection connection)
      {
         this.adapter = new GlifaAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Glifa GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Glifa> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Glifa> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Glifa Get(int cono, string groupnm, string reportnm, int seqlineno, int columnno, int gldivno, int gldeptno, int glacctno, int glsubno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, groupnm, reportnm, seqlineno, columnno, gldivno, gldeptno, glacctno, glsubno, batchsize, fldList);
      }
      
      public IEnumerable<Glifa> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public Glifa Insert(Glifa record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Glifa Update(Glifa record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Glifa record)
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
  