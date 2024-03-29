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
   using Models.Pdsorddtl;

   public partial class OrddtlAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsorddtl";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> orddtlTableControlKey;
		
      private pdsorddtlDataSet dataSet;
        
      public OrddtlAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsorddtlDataSet() { DataSetName = DataSetName };
            this.orddtlTableControlKey = this.dataSet.ttblorddtl.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.orddtlTableControlKey))
            {
               this.CreateTableControlParameters(this.orddtlTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OrddtlAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Orddtlproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOrddtlproxy = this.proxyAppObject.CreatePO_orddtlproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOrddtlproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Orddtlproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.orddtlTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.orddtlTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Orddtlproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOrddtlproxy = this.proxyAppObject.CreatePO_orddtlproxy())
               {
                  this.SetRequiredContextParameters();
                  poOrddtlproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Orddtlproxy - After Call");
      }
   

      public Orddtl GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Orddtl orddtl = null;
         if (row != null)
         {
             orddtl = this.BuildFromRow(row);
         }
         return orddtl;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(orddtl) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblorddtl.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Orddtl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(orddtl)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Orddtl Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblorddtl.AsEnumerable().SingleOrDefault();
         Orddtl orddtl = null;
         if (row != null)
         {
             orddtl = this.BuildFromRow(row);
         }
         return orddtl;
      }
	  
	  

      public IEnumerable<Orddtl> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblorddtl.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Orddtl Get(int id, int line, int lineSequence, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (id != int.MinValue) 
         {
             sb.AppendFormatWithEscape("orddtl.id = {0}", id);
         }
         if (line != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND orddtl.line = {0}", line);
         }
         if (lineSequence != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND orddtl.line_sequence = {0}", lineSequence);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Orddtl> GetListByCoWhAssignedAbs(string coNum, string whNum, bool assigned, string absNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("orddtl.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND orddtl.wh_num = '{0}'", whNum);
         }
         sb.AppendFormatWithEscape(" AND orddtl.assigned = {0}", assigned);
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND orddtl.abs_num = '{0}'", absNum);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Orddtl> GetListByCoWhLineStatus(string coNum, string whNum, string lineStatus, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("orddtl.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND orddtl.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(lineStatus)) 
         {
             sb.AppendFormatWithEscape(" AND orddtl.line_status = '{0}'", lineStatus);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Orddtl> GetListByIdAbs(int id, string absNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (id != int.MinValue) 
         {
             sb.AppendFormatWithEscape("orddtl.id = {0}", id);
         }
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND orddtl.abs_num = '{0}'", absNum);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Orddtl BuildFromRow(DataRow row)
      {
         var returnRecord = Orddtl.BuildOrddtlFromRow(row);
         returnRecord = this.BuildExtraFromRow<Orddtl>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Orddtl record)
      {
         Orddtl.UpdateRowFromOrddtl(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Orddtl Insert(Orddtl record)
      {
         DataRow row = this.dataSet.ttblorddtl.NewttblorddtlRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblorddtl.AddttblorddtlRow((pdsorddtlDataSet.ttblorddtlRow)row);
         this.SaveChanges();
         return this.dataSet.ttblorddtl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblorddtl.Rows[0]) : null;
      }
  

      public Orddtl Update(Orddtl record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblorddtl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblorddtl.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Orddtl record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblorddtl.NewttblorddtlRow();
            Orddtl.BuildMinimalRow(ref row, record);
            this.dataSet.ttblorddtl.AddttblorddtlRow((pdsorddtlDataSet.ttblorddtlRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Orddtl() { rowID = selectRowId }).ToList();
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
  