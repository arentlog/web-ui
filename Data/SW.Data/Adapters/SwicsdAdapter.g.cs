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
    
namespace Infor.Sxe.SW.Data.Adapters
{
   using com.infor.sxproxy.swproxy;
   using com.infor.sxproxy.swproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsswicsd;

   public partial class SwicsdAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsswicsd";
      private SWProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> swicsdTableControlKey;
		
      private pdsswicsdDataSet dataSet;
        
      public SwicsdAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SWProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsswicsdDataSet() { DataSetName = DataSetName };
            this.swicsdTableControlKey = this.dataSet.ttblswicsd.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.swicsdTableControlKey))
            {
               this.CreateTableControlParameters(this.swicsdTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SwicsdAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Swicsdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSwicsdproxy = this.proxyAppObject.CreatePO_swicsdproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSwicsdproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Swicsdproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.swicsdTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.swicsdTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Swicsdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSwicsdproxy = this.proxyAppObject.CreatePO_swicsdproxy())
               {
                  this.SetRequiredContextParameters();
                  poSwicsdproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Swicsdproxy - After Call");
      }
   

      public Swicsd GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Swicsd swicsd = null;
         if (row != null)
         {
             swicsd = this.BuildFromRow(row);
         }
         return swicsd;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(swicsd) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblswicsd.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Swicsd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(swicsd)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Swicsd Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblswicsd.AsEnumerable().SingleOrDefault();
         Swicsd swicsd = null;
         if (row != null)
         {
             swicsd = this.BuildFromRow(row);
         }
         return swicsd;
      }
	  
	  
      public IEnumerable<Swicsd> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("swicsd.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Swicsd> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblswicsd.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Swicsd Get(int cono, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swicsd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND swicsd.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Swicsd BuildFromRow(DataRow row)
      {
         var returnRecord = Swicsd.BuildSwicsdFromRow(row);
         returnRecord = this.BuildExtraFromRow<Swicsd>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Swicsd record)
      {
         Swicsd.UpdateRowFromSwicsd(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Swicsd Insert(Swicsd record)
      {
         DataRow row = this.dataSet.ttblswicsd.NewttblswicsdRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblswicsd.AddttblswicsdRow((pdsswicsdDataSet.ttblswicsdRow)row);
         this.SaveChanges();
         return this.dataSet.ttblswicsd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswicsd.Rows[0]) : null;
      }
  

      public Swicsd Update(Swicsd record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblswicsd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswicsd.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Swicsd record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblswicsd.NewttblswicsdRow();
            Swicsd.BuildMinimalRow(ref row, record);
            this.dataSet.ttblswicsd.AddttblswicsdRow((pdsswicsdDataSet.ttblswicsdRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Swicsd() { rowID = selectRowId }).ToList();
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
  