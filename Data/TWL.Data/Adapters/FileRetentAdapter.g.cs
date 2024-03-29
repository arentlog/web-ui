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
    
namespace Infor.Sxe.TWL.Data.Adapters
{
   using com.infor.sxproxy.twlproxy;
   using com.infor.sxproxy.twlproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.PdsfileRetent;

   public partial class FileRetentAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsfile_retent";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> fileRetentTableControlKey;
		
      private pdsfile_retentDataSet dataSet;
        
      public FileRetentAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsfile_retentDataSet() { DataSetName = DataSetName };
            this.fileRetentTableControlKey = this.dataSet.ttblfile_retent.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.fileRetentTableControlKey))
            {
               this.CreateTableControlParameters(this.fileRetentTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in FileRetentAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - File_retentproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poFile_retentproxy = this.proxyAppObject.CreatePO_file_retentproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poFile_retentproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - File_retentproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.fileRetentTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.fileRetentTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - File_retentproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poFile_retentproxy = this.proxyAppObject.CreatePO_file_retentproxy())
               {
                  this.SetRequiredContextParameters();
                  poFile_retentproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - File_retentproxy - After Call");
      }
   

      public FileRetent GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         FileRetent fileRetent = null;
         if (row != null)
         {
             fileRetent = this.BuildFromRow(row);
         }
         return fileRetent;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(file_retent) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblfile_retent.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<FileRetent> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(file_retent)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected FileRetent Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblfile_retent.AsEnumerable().SingleOrDefault();
         FileRetent fileRetent = null;
         if (row != null)
         {
             fileRetent = this.BuildFromRow(row);
         }
         return fileRetent;
      }
	  
	  

      public IEnumerable<FileRetent> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblfile_retent.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public FileRetent Get(string fileName, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(fileName)) 
         {
             sb.AppendFormatWithEscape("file_retent.file_name = '{0}'", fileName);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public FileRetent BuildFromRow(DataRow row)
      {
         var returnRecord = FileRetent.BuildFileRetentFromRow(row);
         returnRecord = this.BuildExtraFromRow<FileRetent>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, FileRetent record)
      {
         FileRetent.UpdateRowFromFileRetent(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public FileRetent Insert(FileRetent record)
      {
         DataRow row = this.dataSet.ttblfile_retent.Newttblfile_retentRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblfile_retent.Addttblfile_retentRow((pdsfile_retentDataSet.ttblfile_retentRow)row);
         this.SaveChanges();
         return this.dataSet.ttblfile_retent.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblfile_retent.Rows[0]) : null;
      }
  

      public FileRetent Update(FileRetent record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblfile_retent.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblfile_retent.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(FileRetent record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblfile_retent.Newttblfile_retentRow();
            FileRetent.BuildMinimalRow(ref row, record);
            this.dataSet.ttblfile_retent.Addttblfile_retentRow((pdsfile_retentDataSet.ttblfile_retentRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new FileRetent() { rowID = selectRowId }).ToList();
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
  