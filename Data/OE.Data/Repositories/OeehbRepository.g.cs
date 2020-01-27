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
    
namespace Infor.Sxe.OE.Data.Repositories
{
   using Infor.Sxe.OE.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsoeehb;

   public partial class OeehbRepository : RepositoryBase
   {
      private OeehbAdapter adapter;
  
      public OeehbRepository(IProgressConnection connection)
      {
         this.adapter = new OeehbAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Oeehb GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Oeehb> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Oeehb> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Oeehb Get(int cono, string batchnm, int seqno, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, batchnm, seqno, batchsize, fldList);
      }
      
      public IEnumerable<Oeehb> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Oeehb> GetListByCustno(int cono, decimal custno, int orderno, int batchsize, string fldList)
      {
         return this.adapter.GetListByCustno(cono, custno, orderno, batchsize, fldList);
      }

      public Oeehb Insert(Oeehb record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Oeehb Update(Oeehb record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Oeehb record)
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
  