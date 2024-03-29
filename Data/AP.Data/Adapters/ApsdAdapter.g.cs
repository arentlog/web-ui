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
    
namespace Infor.Sxe.AP.Data.Adapters
{
   using com.infor.sxproxy.approxy;
   using com.infor.sxproxy.approxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsapsd;

   public partial class ApsdAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsapsd";
      private APProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> apsdTableControlKey;
		
      private pdsapsdDataSet dataSet;
        
      public ApsdAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new APProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsapsdDataSet() { DataSetName = DataSetName };
            this.apsdTableControlKey = this.dataSet.ttblapsd.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.apsdTableControlKey))
            {
               this.CreateTableControlParameters(this.apsdTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ApsdAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Apsdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poApsdproxy = this.proxyAppObject.CreatePO_apsdproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poApsdproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Apsdproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.apsdTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.apsdTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Apsdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poApsdproxy = this.proxyAppObject.CreatePO_apsdproxy())
               {
                  this.SetRequiredContextParameters();
                  poApsdproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Apsdproxy - After Call");
      }
   

      public Apsd GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Apsd apsd = null;
         if (row != null)
         {
             apsd = this.BuildFromRow(row);
         }
         return apsd;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(apsd) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblapsd.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Apsd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(apsd)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Apsd Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblapsd.AsEnumerable().SingleOrDefault();
         Apsd apsd = null;
         if (row != null)
         {
             apsd = this.BuildFromRow(row);
         }
         return apsd;
      }
	  
	  
      public IEnumerable<Apsd> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("apsd.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apsd> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblapsd.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Apsd Get(int cono, string srcrowpointer, string shipviaty, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apsd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(srcrowpointer)) 
         {
             sb.AppendFormatWithEscape(" AND apsd.srcrowpointer = '{0}'", srcrowpointer);
         }
         if (!string.IsNullOrEmpty(shipviaty)) 
         {
             sb.AppendFormatWithEscape(" AND apsd.shipviaty = '{0}'", shipviaty);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Apsd BuildFromRow(DataRow row)
      {
         var returnRecord = Apsd.BuildApsdFromRow(row);
         returnRecord = this.BuildExtraFromRow<Apsd>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Apsd record)
      {
         Apsd.UpdateRowFromApsd(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Apsd Insert(Apsd record)
      {
         DataRow row = this.dataSet.ttblapsd.NewttblapsdRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblapsd.AddttblapsdRow((pdsapsdDataSet.ttblapsdRow)row);
         this.SaveChanges();
         return this.dataSet.ttblapsd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapsd.Rows[0]) : null;
      }
  

      public Apsd Update(Apsd record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblapsd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapsd.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Apsd record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblapsd.NewttblapsdRow();
            Apsd.BuildMinimalRow(ref row, record);
            this.dataSet.ttblapsd.AddttblapsdRow((pdsapsdDataSet.ttblapsdRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Apsd() { rowID = selectRowId }).ToList();
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
  