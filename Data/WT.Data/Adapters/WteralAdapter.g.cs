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
    
namespace Infor.Sxe.WT.Data.Adapters
{
   using com.infor.sxproxy.wtproxy;
   using com.infor.sxproxy.wtproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdswteral;

   public partial class WteralAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdswteral";
      private WTProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> wteralTableControlKey;
		
      private pdswteralDataSet dataSet;
        
      public WteralAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new WTProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdswteralDataSet() { DataSetName = DataSetName };
            this.wteralTableControlKey = this.dataSet.ttblwteral.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.wteralTableControlKey))
            {
               this.CreateTableControlParameters(this.wteralTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in WteralAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Wteralproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poWteralproxy = this.proxyAppObject.CreatePO_wteralproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poWteralproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Wteralproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.wteralTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.wteralTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Wteralproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poWteralproxy = this.proxyAppObject.CreatePO_wteralproxy())
               {
                  this.SetRequiredContextParameters();
                  poWteralproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Wteralproxy - After Call");
      }
   

      public Wteral GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Wteral wteral = null;
         if (row != null)
         {
             wteral = this.BuildFromRow(row);
         }
         return wteral;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(wteral) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblwteral.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Wteral> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(wteral)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Wteral Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblwteral.AsEnumerable().SingleOrDefault();
         Wteral wteral = null;
         if (row != null)
         {
             wteral = this.BuildFromRow(row);
         }
         return wteral;
      }
	  
	  
      public IEnumerable<Wteral> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("wteral.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Wteral> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblwteral.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Wteral Get(int cono, int reportno, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wteral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wteral.reportno = {0}", reportno);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wteral.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wteral.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Wteral> GetListByProd(int cono, string shipprod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wteral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND wteral.shipprod = '{0}'", shipprod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Wteral> GetListByReptprod(int cono, int reportno, string shipprod, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wteral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wteral.reportno = {0}", reportno);
         }
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND wteral.shipprod = '{0}'", shipprod);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wteral.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wteral.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Wteral BuildFromRow(DataRow row)
      {
         var returnRecord = Wteral.BuildWteralFromRow(row);
         returnRecord = this.BuildExtraFromRow<Wteral>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Wteral record)
      {
         Wteral.UpdateRowFromWteral(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Wteral Insert(Wteral record)
      {
         DataRow row = this.dataSet.ttblwteral.NewttblwteralRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblwteral.AddttblwteralRow((pdswteralDataSet.ttblwteralRow)row);
         this.SaveChanges();
         return this.dataSet.ttblwteral.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblwteral.Rows[0]) : null;
      }
  

      public Wteral Update(Wteral record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblwteral.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblwteral.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Wteral record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblwteral.NewttblwteralRow();
            Wteral.BuildMinimalRow(ref row, record);
            this.dataSet.ttblwteral.AddttblwteralRow((pdswteralDataSet.ttblwteralRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Wteral() { rowID = selectRowId }).ToList();
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
  