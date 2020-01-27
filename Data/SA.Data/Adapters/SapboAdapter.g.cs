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
   using Models.Pdssapbo;

   public partial class SapboAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssapbo";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sapboTableControlKey;
		
      private pdssapboDataSet dataSet;
        
      public SapboAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssapboDataSet() { DataSetName = DataSetName };
            this.sapboTableControlKey = this.dataSet.ttblsapbo.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sapboTableControlKey))
            {
               this.CreateTableControlParameters(this.sapboTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SapboAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sapboproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSapboproxy = this.proxyAppObject.CreatePO_sapboproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSapboproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sapboproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sapboTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sapboTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sapboproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSapboproxy = this.proxyAppObject.CreatePO_sapboproxy())
               {
                  this.SetRequiredContextParameters();
                  poSapboproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sapboproxy - After Call");
      }
   

      public Sapbo GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sapbo sapbo = null;
         if (row != null)
         {
             sapbo = this.BuildFromRow(row);
         }
         return sapbo;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sapbo) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsapbo.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sapbo> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sapbo)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sapbo Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsapbo.AsEnumerable().SingleOrDefault();
         Sapbo sapbo = null;
         if (row != null)
         {
             sapbo = this.BuildFromRow(row);
         }
         return sapbo;
      }
	  
	  
      public IEnumerable<Sapbo> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sapbo.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sapbo> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsapbo.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sapbo Get(int cono, string reportnm, int orderno, int ordersuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sapbo.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.reportnm = '{0}'", reportnm);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Sapbo> GetListByOutputty(int cono, string reportnm, string outputty, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sapbo.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.reportnm = '{0}'", reportnm);
         }
         if (!string.IsNullOrEmpty(outputty)) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.outputty = '{0}'", outputty);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sapbo> GetListByTranstm(int cono, string reportnm, DateTime? transdt, string transtm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sapbo.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.reportnm = '{0}'", reportnm);
         }
         if (transdt != null) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.transdt = '{0}'", transdt);
         }
         if (!string.IsNullOrEmpty(transtm)) 
         {
             sb.AppendFormatWithEscape(" AND sapbo.transtm = '{0}'", transtm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Sapbo BuildFromRow(DataRow row)
      {
         var returnRecord = Sapbo.BuildSapboFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sapbo>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sapbo record)
      {
         Sapbo.UpdateRowFromSapbo(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sapbo Insert(Sapbo record)
      {
         DataRow row = this.dataSet.ttblsapbo.NewttblsapboRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsapbo.AddttblsapboRow((pdssapboDataSet.ttblsapboRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsapbo.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsapbo.Rows[0]) : null;
      }
  

      public Sapbo Update(Sapbo record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsapbo.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsapbo.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sapbo record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsapbo.NewttblsapboRow();
            Sapbo.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsapbo.AddttblsapboRow((pdssapboDataSet.ttblsapboRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sapbo() { rowID = selectRowId }).ToList();
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
  