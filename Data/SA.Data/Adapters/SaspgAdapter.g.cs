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
   using Models.Pdssaspg;

   public partial class SaspgAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssaspg";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> saspgTableControlKey;
		
      private pdssaspgDataSet dataSet;
        
      public SaspgAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssaspgDataSet() { DataSetName = DataSetName };
            this.saspgTableControlKey = this.dataSet.ttblsaspg.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.saspgTableControlKey))
            {
               this.CreateTableControlParameters(this.saspgTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SaspgAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Saspgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSaspgproxy = this.proxyAppObject.CreatePO_saspgproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSaspgproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Saspgproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.saspgTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.saspgTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Saspgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSaspgproxy = this.proxyAppObject.CreatePO_saspgproxy())
               {
                  this.SetRequiredContextParameters();
                  poSaspgproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Saspgproxy - After Call");
      }
   

      public Saspg GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Saspg saspg = null;
         if (row != null)
         {
             saspg = this.BuildFromRow(row);
         }
         return saspg;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(saspg) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsaspg.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Saspg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(saspg)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Saspg Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsaspg.AsEnumerable().SingleOrDefault();
         Saspg saspg = null;
         if (row != null)
         {
             saspg = this.BuildFromRow(row);
         }
         return saspg;
      }
	  
	  

      public IEnumerable<Saspg> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsaspg.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Saspg Get(string saspgroup, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(saspgroup)) 
         {
             sb.AppendFormatWithEscape("saspg.saspgroup = '{0}'", saspgroup);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Saspg BuildFromRow(DataRow row)
      {
         var returnRecord = Saspg.BuildSaspgFromRow(row);
         returnRecord = this.BuildExtraFromRow<Saspg>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Saspg record)
      {
         Saspg.UpdateRowFromSaspg(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Saspg Insert(Saspg record)
      {
         DataRow row = this.dataSet.ttblsaspg.NewttblsaspgRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsaspg.AddttblsaspgRow((pdssaspgDataSet.ttblsaspgRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsaspg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsaspg.Rows[0]) : null;
      }
  

      public Saspg Update(Saspg record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsaspg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsaspg.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Saspg record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsaspg.NewttblsaspgRow();
            Saspg.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsaspg.AddttblsaspgRow((pdssaspgDataSet.ttblsaspgRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Saspg() { rowID = selectRowId }).ToList();
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
  