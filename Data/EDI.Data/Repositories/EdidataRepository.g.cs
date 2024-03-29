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
    
namespace Infor.Sxe.EDI.Data.Repositories
{
   using Infor.Sxe.EDI.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsedidata;

   public partial class EdidataRepository : RepositoryBase
   {
      private EdidataAdapter adapter;
  
      public EdidataRepository(IProgressConnection connection)
      {
         this.adapter = new EdidataAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Edidata GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Edidata> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public IEnumerable<Edidata> GetListAllByCono(int cono, int batchsize, string fldList)
      {
         return this.adapter.GetListAllByCono(cono, batchsize, fldList);
      }
      public Edidata Get(int cono, string edifilename, string section, int secseq, int docid, int batchsize, string fldList)
      {
         return this.adapter.Get(cono, edifilename, section, secseq, docid, batchsize, fldList);
      }
      
      public IEnumerable<Edidata> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Edidata> GetListByApprov(int cono, int docid, string approvty, string section, int secseq, int batchsize, string fldList)
      {
         return this.adapter.GetListByApprov(cono, docid, approvty, section, secseq, batchsize, fldList);
      }

      public IEnumerable<Edidata> GetListByDocid(int cono, int docid, string section, int secseq, int batchsize, string fldList)
      {
         return this.adapter.GetListByDocid(cono, docid, section, secseq, batchsize, fldList);
      }

      public IEnumerable<Edidata> GetListByDocseq(int cono, int docid, int docseq, string section, int secseq, int batchsize, string fldList)
      {
         return this.adapter.GetListByDocseq(cono, docid, docseq, section, secseq, batchsize, fldList);
      }

      public IEnumerable<Edidata> GetListByStage(int cono, int docid, int stagecd, string section, int secseq, int batchsize, string fldList)
      {
         return this.adapter.GetListByStage(cono, docid, stagecd, section, secseq, batchsize, fldList);
      }

      public Edidata Insert(Edidata record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Edidata Update(Edidata record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Edidata record)
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
  