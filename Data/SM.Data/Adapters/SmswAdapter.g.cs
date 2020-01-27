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
    
namespace Infor.Sxe.SM.Data.Adapters
{
   using com.infor.sxproxy.smproxy;
   using com.infor.sxproxy.smproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssmsw;

   public partial class SmswAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssmsw";
      private SMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> smswTableControlKey;
		
      private pdssmswDataSet dataSet;
        
      public SmswAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssmswDataSet() { DataSetName = DataSetName };
            this.smswTableControlKey = this.dataSet.ttblsmsw.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.smswTableControlKey))
            {
               this.CreateTableControlParameters(this.smswTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SmswAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Smswproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSmswproxy = this.proxyAppObject.CreatePO_smswproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSmswproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Smswproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.smswTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.smswTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Smswproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSmswproxy = this.proxyAppObject.CreatePO_smswproxy())
               {
                  this.SetRequiredContextParameters();
                  poSmswproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Smswproxy - After Call");
      }
   

      public Smsw GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Smsw smsw = null;
         if (row != null)
         {
             smsw = this.BuildFromRow(row);
         }
         return smsw;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(smsw) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsmsw.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Smsw> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(smsw)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Smsw Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsmsw.AsEnumerable().SingleOrDefault();
         Smsw smsw = null;
         if (row != null)
         {
             smsw = this.BuildFromRow(row);
         }
         return smsw;
      }
	  
	  
      public IEnumerable<Smsw> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("smsw.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Smsw> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsmsw.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Smsw Get(int cono, int yr, string whse, string prod, bool componentfl, bool stockfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("smsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND smsw.yr = {0}", yr);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND smsw.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND smsw.prod = '{0}'", prod);
         }
         sb.AppendFormatWithEscape(" AND smsw.componentfl = {0}", componentfl);
         sb.AppendFormatWithEscape(" AND smsw.stockfl = {0}", stockfl);
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Smsw> GetListByProd(int cono, int yr, string prod, string whse, bool componentfl, bool stockfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("smsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND smsw.yr = {0}", yr);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND smsw.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND smsw.whse = '{0}'", whse);
         }
         sb.AppendFormatWithEscape(" AND smsw.componentfl = {0}", componentfl);
         sb.AppendFormatWithEscape(" AND smsw.stockfl = {0}", stockfl);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Smsw> GetListByProdwh(int cono, string prod, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("smsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND smsw.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND smsw.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Smsw BuildFromRow(DataRow row)
      {
         var returnRecord = Smsw.BuildSmswFromRow(row);
         returnRecord = this.BuildExtraFromRow<Smsw>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Smsw record)
      {
         Smsw.UpdateRowFromSmsw(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Smsw Insert(Smsw record)
      {
         DataRow row = this.dataSet.ttblsmsw.NewttblsmswRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsmsw.AddttblsmswRow((pdssmswDataSet.ttblsmswRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsmsw.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsmsw.Rows[0]) : null;
      }
  

      public Smsw Update(Smsw record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsmsw.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsmsw.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Smsw record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsmsw.NewttblsmswRow();
            Smsw.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsmsw.AddttblsmswRow((pdssmswDataSet.ttblsmswRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Smsw() { rowID = selectRowId }).ToList();
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
  