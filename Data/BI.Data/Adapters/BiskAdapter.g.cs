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
    
namespace Infor.Sxe.BI.Data.Adapters
{
   using com.infor.sxproxy.biproxy;
   using com.infor.sxproxy.biproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsbisk;

   public partial class BiskAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsbisk";
      private BIProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> biskTableControlKey;
		
      private pdsbiskDataSet dataSet;
        
      public BiskAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new BIProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsbiskDataSet() { DataSetName = DataSetName };
            this.biskTableControlKey = this.dataSet.ttblbisk.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.biskTableControlKey))
            {
               this.CreateTableControlParameters(this.biskTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in BiskAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Biskproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poBiskproxy = this.proxyAppObject.CreatePO_biskproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poBiskproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Biskproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.biskTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.biskTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Biskproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poBiskproxy = this.proxyAppObject.CreatePO_biskproxy())
               {
                  this.SetRequiredContextParameters();
                  poBiskproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Biskproxy - After Call");
      }
   

      public Bisk GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Bisk bisk = null;
         if (row != null)
         {
             bisk = this.BuildFromRow(row);
         }
         return bisk;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(bisk) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblbisk.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Bisk> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(bisk)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Bisk Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblbisk.AsEnumerable().SingleOrDefault();
         Bisk bisk = null;
         if (row != null)
         {
             bisk = this.BuildFromRow(row);
         }
         return bisk;
      }
	  
	  
      public IEnumerable<Bisk> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("bisk.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Bisk> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblbisk.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Bisk Get(int cono, string kpi, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("bisk.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(kpi)) 
         {
             sb.AppendFormatWithEscape(" AND bisk.kpi = '{0}'", kpi);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Bisk BuildFromRow(DataRow row)
      {
         var returnRecord = Bisk.BuildBiskFromRow(row);
         returnRecord = this.BuildExtraFromRow<Bisk>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Bisk record)
      {
         Bisk.UpdateRowFromBisk(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Bisk Insert(Bisk record)
      {
         DataRow row = this.dataSet.ttblbisk.NewttblbiskRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblbisk.AddttblbiskRow((pdsbiskDataSet.ttblbiskRow)row);
         this.SaveChanges();
         return this.dataSet.ttblbisk.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbisk.Rows[0]) : null;
      }
  

      public Bisk Update(Bisk record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblbisk.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbisk.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Bisk record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblbisk.NewttblbiskRow();
            Bisk.BuildMinimalRow(ref row, record);
            this.dataSet.ttblbisk.AddttblbiskRow((pdsbiskDataSet.ttblbiskRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Bisk() { rowID = selectRowId }).ToList();
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
  