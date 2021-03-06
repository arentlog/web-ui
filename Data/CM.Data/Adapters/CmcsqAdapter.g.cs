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
    
namespace Infor.Sxe.CM.Data.Adapters
{
   using com.infor.sxproxy.cmproxy;
   using com.infor.sxproxy.cmproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdscmcsq;

   public partial class CmcsqAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscmcsq";
      private CMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> cmcsqTableControlKey;
		
      private pdscmcsqDataSet dataSet;
        
      public CmcsqAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new CMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscmcsqDataSet() { DataSetName = DataSetName };
            this.cmcsqTableControlKey = this.dataSet.ttblcmcsq.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.cmcsqTableControlKey))
            {
               this.CreateTableControlParameters(this.cmcsqTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in CmcsqAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Cmcsqproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poCmcsqproxy = this.proxyAppObject.CreatePO_cmcsqproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poCmcsqproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Cmcsqproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.cmcsqTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.cmcsqTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Cmcsqproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCmcsqproxy = this.proxyAppObject.CreatePO_cmcsqproxy())
               {
                  this.SetRequiredContextParameters();
                  poCmcsqproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Cmcsqproxy - After Call");
      }
   

      public Cmcsq GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Cmcsq cmcsq = null;
         if (row != null)
         {
             cmcsq = this.BuildFromRow(row);
         }
         return cmcsq;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(cmcsq) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcmcsq.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Cmcsq> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(cmcsq)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Cmcsq Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcmcsq.AsEnumerable().SingleOrDefault();
         Cmcsq cmcsq = null;
         if (row != null)
         {
             cmcsq = this.BuildFromRow(row);
         }
         return cmcsq;
      }
	  
	  

      public IEnumerable<Cmcsq> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcmcsq.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Cmcsq Get(string campaigncd, int pageno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(campaigncd)) 
         {
             sb.AppendFormatWithEscape("cmcsq.campaigncd = '{0}'", campaigncd);
         }
         if (pageno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmcsq.pageno = {0}", pageno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Cmcsq BuildFromRow(DataRow row)
      {
         var returnRecord = Cmcsq.BuildCmcsqFromRow(row);
         returnRecord = this.BuildExtraFromRow<Cmcsq>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Cmcsq record)
      {
         Cmcsq.UpdateRowFromCmcsq(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Cmcsq Insert(Cmcsq record)
      {
         DataRow row = this.dataSet.ttblcmcsq.NewttblcmcsqRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcmcsq.AddttblcmcsqRow((pdscmcsqDataSet.ttblcmcsqRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcmcsq.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmcsq.Rows[0]) : null;
      }
  

      public Cmcsq Update(Cmcsq record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcmcsq.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmcsq.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Cmcsq record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcmcsq.NewttblcmcsqRow();
            Cmcsq.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcmcsq.AddttblcmcsqRow((pdscmcsqDataSet.ttblcmcsqRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Cmcsq() { rowID = selectRowId }).ToList();
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
  