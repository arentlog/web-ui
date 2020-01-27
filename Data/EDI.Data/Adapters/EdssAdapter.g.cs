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
    
namespace Infor.Sxe.EDI.Data.Adapters
{
   using com.infor.sxproxy.ediproxy;
   using com.infor.sxproxy.ediproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsedss;

   public partial class EdssAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsedss";
      private EDIProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> edssTableControlKey;
		
      private pdsedssDataSet dataSet;
        
      public EdssAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new EDIProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsedssDataSet() { DataSetName = DataSetName };
            this.edssTableControlKey = this.dataSet.ttbledss.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.edssTableControlKey))
            {
               this.CreateTableControlParameters(this.edssTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in EdssAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Edssproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poEdssproxy = this.proxyAppObject.CreatePO_edssproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poEdssproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Edssproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.edssTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.edssTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Edssproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poEdssproxy = this.proxyAppObject.CreatePO_edssproxy())
               {
                  this.SetRequiredContextParameters();
                  poEdssproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Edssproxy - After Call");
      }
   

      public Edss GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Edss edss = null;
         if (row != null)
         {
             edss = this.BuildFromRow(row);
         }
         return edss;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(edss) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbledss.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Edss> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(edss)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Edss Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbledss.AsEnumerable().SingleOrDefault();
         Edss edss = null;
         if (row != null)
         {
             edss = this.BuildFromRow(row);
         }
         return edss;
      }
	  
	  

      public IEnumerable<Edss> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbledss.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Edss Get(string version, string segment, decimal element, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(version)) 
         {
             sb.AppendFormatWithEscape("edss.version = '{0}'", version);
         }
         if (!string.IsNullOrEmpty(segment)) 
         {
             sb.AppendFormatWithEscape(" AND edss.segment = '{0}'", segment);
         }
         if (element != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edss.element = {0}", element);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Edss BuildFromRow(DataRow row)
      {
         var returnRecord = Edss.BuildEdssFromRow(row);
         returnRecord = this.BuildExtraFromRow<Edss>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Edss record)
      {
         Edss.UpdateRowFromEdss(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Edss Insert(Edss record)
      {
         DataRow row = this.dataSet.ttbledss.NewttbledssRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbledss.AddttbledssRow((pdsedssDataSet.ttbledssRow)row);
         this.SaveChanges();
         return this.dataSet.ttbledss.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledss.Rows[0]) : null;
      }
  

      public Edss Update(Edss record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbledss.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledss.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Edss record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbledss.NewttbledssRow();
            Edss.BuildMinimalRow(ref row, record);
            this.dataSet.ttbledss.AddttbledssRow((pdsedssDataSet.ttbledssRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Edss() { rowID = selectRowId }).ToList();
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
  