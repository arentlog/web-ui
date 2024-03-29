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
   using Models.Pdscmfus;

   public partial class CmfusAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscmfus";
      private CMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> cmfusTableControlKey;
		
      private pdscmfusDataSet dataSet;
        
      public CmfusAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new CMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscmfusDataSet() { DataSetName = DataSetName };
            this.cmfusTableControlKey = this.dataSet.ttblcmfus.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.cmfusTableControlKey))
            {
               this.CreateTableControlParameters(this.cmfusTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in CmfusAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Cmfusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poCmfusproxy = this.proxyAppObject.CreatePO_cmfusproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poCmfusproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Cmfusproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.cmfusTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.cmfusTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Cmfusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCmfusproxy = this.proxyAppObject.CreatePO_cmfusproxy())
               {
                  this.SetRequiredContextParameters();
                  poCmfusproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Cmfusproxy - After Call");
      }
   

      public Cmfus GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Cmfus cmfus = null;
         if (row != null)
         {
             cmfus = this.BuildFromRow(row);
         }
         return cmfus;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(cmfus) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcmfus.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Cmfus> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(cmfus)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Cmfus Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcmfus.AsEnumerable().SingleOrDefault();
         Cmfus cmfus = null;
         if (row != null)
         {
             cmfus = this.BuildFromRow(row);
         }
         return cmfus;
      }
	  
	  

      public IEnumerable<Cmfus> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcmfus.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Cmfus Get(string slsrep, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmfus.slsrep = '{0}'", slsrep);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Cmfus BuildFromRow(DataRow row)
      {
         var returnRecord = Cmfus.BuildCmfusFromRow(row);
         returnRecord = this.BuildExtraFromRow<Cmfus>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Cmfus record)
      {
         Cmfus.UpdateRowFromCmfus(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Cmfus Insert(Cmfus record)
      {
         DataRow row = this.dataSet.ttblcmfus.NewttblcmfusRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcmfus.AddttblcmfusRow((pdscmfusDataSet.ttblcmfusRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcmfus.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmfus.Rows[0]) : null;
      }
  

      public Cmfus Update(Cmfus record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcmfus.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmfus.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Cmfus record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcmfus.NewttblcmfusRow();
            Cmfus.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcmfus.AddttblcmfusRow((pdscmfusDataSet.ttblcmfusRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Cmfus() { rowID = selectRowId }).ToList();
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
  