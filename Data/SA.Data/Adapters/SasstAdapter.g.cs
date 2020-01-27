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
    
namespace Infor.Sxe.SA.Data.Adapters
{
   using com.infor.sxproxy.saproxy;
   using com.infor.sxproxy.saproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssasst;

   public partial class SasstAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssasst";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sasstTableControlKey;
		
      private pdssasstDataSet dataSet;
        
      public SasstAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssasstDataSet() { DataSetName = DataSetName };
            this.sasstTableControlKey = this.dataSet.ttblsasst.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sasstTableControlKey))
            {
               this.CreateTableControlParameters(this.sasstTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SasstAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sasstproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSasstproxy = this.proxyAppObject.CreatePO_sasstproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSasstproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sasstproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sasstTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sasstTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sasstproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSasstproxy = this.proxyAppObject.CreatePO_sasstproxy())
               {
                  this.SetRequiredContextParameters();
                  poSasstproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sasstproxy - After Call");
      }
   

      public Sasst GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sasst sasst = null;
         if (row != null)
         {
             sasst = this.BuildFromRow(row);
         }
         return sasst;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sasst) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsasst.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sasst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sasst)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sasst Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsasst.AsEnumerable().SingleOrDefault();
         Sasst sasst = null;
         if (row != null)
         {
             sasst = this.BuildFromRow(row);
         }
         return sasst;
      }
	  
	  

      public IEnumerable<Sasst> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsasst.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sasst Get(string zipcd, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(zipcd)) 
         {
             sb.AppendFormatWithEscape("sasst.zipcd = '{0}'", zipcd);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Sasst BuildFromRow(DataRow row)
      {
         var returnRecord = Sasst.BuildSasstFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sasst>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sasst record)
      {
         Sasst.UpdateRowFromSasst(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sasst Insert(Sasst record)
      {
         DataRow row = this.dataSet.ttblsasst.NewttblsasstRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsasst.AddttblsasstRow((pdssasstDataSet.ttblsasstRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsasst.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasst.Rows[0]) : null;
      }
  

      public Sasst Update(Sasst record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsasst.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasst.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sasst record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsasst.NewttblsasstRow();
            Sasst.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsasst.AddttblsasstRow((pdssasstDataSet.ttblsasstRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sasst() { rowID = selectRowId }).ToList();
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
  