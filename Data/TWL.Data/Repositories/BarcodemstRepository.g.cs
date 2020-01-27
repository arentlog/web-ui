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
   using Models.Pdsbarcodemst;

   public partial class BarcodemstRepository : RepositoryBase
   {
      private BarcodemstAdapter adapter;
  
      public BarcodemstRepository(IProgressConnection connection)
      {
         this.adapter = new BarcodemstAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Barcodemst GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Barcodemst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Barcodemst Get(string coNum, string whNum, string vendorId, string barcodeId, int batchsize, string fldList)
      {
         return this.adapter.Get(coNum, whNum, vendorId, barcodeId, batchsize, fldList);
      }
      
      public IEnumerable<Barcodemst> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Barcodemst> GetListByBarcodeID(string barcodeId, int batchsize, string fldList)
      {
         return this.adapter.GetListByBarcodeID(barcodeId, batchsize, fldList);
      }

      public IEnumerable<Barcodemst> GetListByLength(int barcodeLength, int batchsize, string fldList)
      {
         return this.adapter.GetListByLength(barcodeLength, batchsize, fldList);
      }

      public IEnumerable<Barcodemst> GetListByVendor(string vendorId, int batchsize, string fldList)
      {
         return this.adapter.GetListByVendor(vendorId, batchsize, fldList);
      }

      public Barcodemst Insert(Barcodemst record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Barcodemst Update(Barcodemst record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Barcodemst record)
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
  