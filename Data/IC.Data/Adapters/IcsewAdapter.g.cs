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
   using Models.Pdsicsew;

   public partial class IcsewAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsew";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsewTableControlKey;
		
      private pdsicsewDataSet dataSet;
        
      public IcsewAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsewDataSet() { DataSetName = DataSetName };
            this.icsewTableControlKey = this.dataSet.ttblicsew.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsewTableControlKey))
            {
               this.CreateTableControlParameters(this.icsewTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsewAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsewproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsewproxy = this.proxyAppObject.CreatePO_icsewproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsewproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsewproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsewTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsewTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsewproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsewproxy = this.proxyAppObject.CreatePO_icsewproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsewproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsewproxy - After Call");
      }
   

      public Icsew GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsew icsew = null;
         if (row != null)
         {
             icsew = this.BuildFromRow(row);
         }
         return icsew;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsew) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsew.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsew> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsew)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsew Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsew.AsEnumerable().SingleOrDefault();
         Icsew icsew = null;
         if (row != null)
         {
             icsew = this.BuildFromRow(row);
         }
         return icsew;
      }
	  
	  
      public IEnumerable<Icsew> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsew.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsew> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsew.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsew Get(int cono, string whse, string whse2, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsew.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsew.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(whse2)) 
         {
             sb.AppendFormatWithEscape(" AND icsew.whse2 = '{0}'", whse2);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Icsew BuildFromRow(DataRow row)
      {
         var returnRecord = Icsew.BuildIcsewFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsew>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsew record)
      {
         Icsew.UpdateRowFromIcsew(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsew Insert(Icsew record)
      {
         DataRow row = this.dataSet.ttblicsew.NewttblicsewRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsew.AddttblicsewRow((pdsicsewDataSet.ttblicsewRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsew.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsew.Rows[0]) : null;
      }
  

      public Icsew Update(Icsew record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsew.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsew.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsew record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsew.NewttblicsewRow();
            Icsew.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsew.AddttblicsewRow((pdsicsewDataSet.ttblicsewRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsew() { rowID = selectRowId }).ToList();
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
  