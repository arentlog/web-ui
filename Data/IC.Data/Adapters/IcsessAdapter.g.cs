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
    
namespace Infor.Sxe.IC.Data.Adapters
{
   using com.infor.sxproxy.icproxy;
   using com.infor.sxproxy.icproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsicsess;

   public partial class IcsessAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsess";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsessTableControlKey;
		
      private pdsicsessDataSet dataSet;
        
      public IcsessAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsessDataSet() { DataSetName = DataSetName };
            this.icsessTableControlKey = this.dataSet.ttblicsess.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsessTableControlKey))
            {
               this.CreateTableControlParameters(this.icsessTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsessAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsessproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsessproxy = this.proxyAppObject.CreatePO_icsessproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsessproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsessproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsessTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsessTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsessproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsessproxy = this.proxyAppObject.CreatePO_icsessproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsessproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsessproxy - After Call");
      }
   

      public Icsess GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsess icsess = null;
         if (row != null)
         {
             icsess = this.BuildFromRow(row);
         }
         return icsess;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsess) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsess.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsess> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsess)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsess Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsess.AsEnumerable().SingleOrDefault();
         Icsess icsess = null;
         if (row != null)
         {
             icsess = this.BuildFromRow(row);
         }
         return icsess;
      }
	  
	  
      public IEnumerable<Icsess> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsess.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsess> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsess.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsess Get(int cono, decimal vendno, string rectype, int position, string data, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsess.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsess.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(rectype)) 
         {
             sb.AppendFormatWithEscape(" AND icsess.rectype = '{0}'", rectype);
         }
         if (position != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsess.position = {0}", position);
         }
         if (!string.IsNullOrEmpty(data)) 
         {
             sb.AppendFormatWithEscape(" AND icsess.data = '{0}'", data);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Icsess BuildFromRow(DataRow row)
      {
         var returnRecord = Icsess.BuildIcsessFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsess>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsess record)
      {
         Icsess.UpdateRowFromIcsess(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsess Insert(Icsess record)
      {
         DataRow row = this.dataSet.ttblicsess.NewttblicsessRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsess.AddttblicsessRow((pdsicsessDataSet.ttblicsessRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsess.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsess.Rows[0]) : null;
      }
  

      public Icsess Update(Icsess record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsess.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsess.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsess record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsess.NewttblicsessRow();
            Icsess.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsess.AddttblicsessRow((pdsicsessDataSet.ttblicsessRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsess() { rowID = selectRowId }).ToList();
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
  