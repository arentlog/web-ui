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
    
namespace Infor.Sxe.TWL.Data.Repositories
{
   using Infor.Sxe.TWL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsbinmst;

   public partial class BinmstRepository : RepositoryBase
   {
      private BinmstAdapter adapter;
  
      public BinmstRepository(IProgressConnection connection)
      {
         this.adapter = new BinmstAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Binmst GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Binmst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Binmst Get(string coNum, string whNum, string binNum, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, binNum, batchsize, fldList);
      }
      
      public IEnumerable<Binmst> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Binmst> GetListByCoWhAbc(string coNum, string whNum, string abc, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhAbc(coNum, whNum, abc, batchsize, fldList);
      }

      public IEnumerable<Binmst> GetListByCoWhAbcPending(string coNum, string whNum, string abcPending, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhAbcPending(coNum, whNum, abcPending, batchsize, fldList);
      }

      public IEnumerable<Binmst> GetListByCoWhPickseqBin(string coNum, string whNum, int pickSequence, string binNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhPickseqBin(coNum, whNum, pickSequence, binNum, batchsize, fldList);
      }

      public IEnumerable<Binmst> GetListByCoWhPrimAbsType(string coNum, string whNum, bool primPick, string absNum, string primPickType, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhPrimAbsType(coNum, whNum, primPick, absNum, primPickType, batchsize, fldList);
      }

      public IEnumerable<Binmst> GetListByCoWhPutgrp(string coNum, string whNum, string putawayGroup, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhPutgrp(coNum, whNum, putawayGroup, batchsize, fldList);
      }

      public IEnumerable<Binmst> GetListByCoWhZoneAbcCubeBin(string coNum, string whNum, string whZone, string abc, decimal cube, string binNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhZoneAbcCubeBin(coNum, whNum, whZone, abc, cube, binNum, batchsize, fldList);
      }

      public IEnumerable<Binmst> GetListByCoWhZoneAisleBin(string coNum, string whNum, string whZone, int aisle, string binNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByCoWhZoneAisleBin(coNum, whNum, whZone, aisle, binNum, batchsize, fldList);
      }

      public Binmst Insert(Binmst record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Binmst Update(Binmst record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Binmst record)
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
  