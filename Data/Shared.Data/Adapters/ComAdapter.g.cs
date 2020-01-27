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
using System.Data;
using System.Linq;
using System.Text;
using NLog;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.Shared.Data.Adapters
{
   using com.infor.sxproxy.sharedproxy;
   using com.infor.sxproxy.sharedproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdscom;

   public partial class ComAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscom";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> comTableControlKey;
		
      private pdscomDataSet dataSet;
        
      public ComAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscomDataSet() { DataSetName = DataSetName };
            this.comTableControlKey = this.dataSet.ttblcom.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.comTableControlKey))
            {
               this.CreateTableControlParameters(this.comTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ComAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Comproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poComproxy = this.proxyAppObject.CreatePO_comproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poComproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Comproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.comTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.comTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Comproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poComproxy = this.proxyAppObject.CreatePO_comproxy())
               {
                  this.SetRequiredContextParameters();
                  poComproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Comproxy - After Call");
      }
   

      public Com GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Com com = null;
         if (row != null)
         {
             com = this.BuildFromRow(row);
         }
         return com;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(com) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcom.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Com> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         if (rowIds != null && rowIds.Count > 0)
         {
           foreach (var rowId in rowIds)
           {
              if (where.ToString().Length > 0)
              {
                 where.Append(" OR ");
              }
              where.AppendFormat("rowid(com)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Com Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcom.AsEnumerable().SingleOrDefault();
         Com com = null;
         if (row != null)
         {
             com = this.BuildFromRow(row);
         }
         return com;
      }
	  
	  
      public IEnumerable<Com> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("com.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Com> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcom.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Com Get(int cono, string comtype, int orderno, int ordersuf, int lineno, bool printfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("com.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(comtype)) 
         {
             sb.AppendFormatWithEscape(" AND com.comtype = '{0}'", comtype);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND com.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND com.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND com.lineno = {0}", lineno);
         }
         sb.AppendFormatWithEscape(" AND com.printfl = {0}", printfl);
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Com BuildFromRow(DataRow row)
      {
         var returnRecord = Com.BuildComFromRow(row);
         returnRecord = this.BuildExtraFromRow<Com>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Com record)
      {
         Com.UpdateRowFromCom(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Com Insert(Com record)
      {
         DataRow row = this.dataSet.ttblcom.NewttblcomRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcom.AddttblcomRow((pdscomDataSet.ttblcomRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcom.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcom.Rows[0]) : null;
      }
  

      public Com Update(Com record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcom.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcom.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Com record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcom.NewttblcomRow();
            Com.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcom.AddttblcomRow((pdscomDataSet.ttblcomRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Com() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }	
         this.proxyAppObject?.Dispose();

         this.dataSet?.Dispose();
         base.Dispose(true);
      }
  
   }
}
#pragma warning restore 1591
  