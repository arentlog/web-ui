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
    
namespace Infor.Sxe.OE.Data.Adapters
{
   using com.infor.sxproxy.oeproxy;
   using com.infor.sxproxy.oeproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsoeehs;

   public partial class OeehsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsoeehs";
      private OEProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> oeehsTableControlKey;
		
      private pdsoeehsDataSet dataSet;
        
      public OeehsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OEProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsoeehsDataSet() { DataSetName = DataSetName };
            this.oeehsTableControlKey = this.dataSet.ttbloeehs.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.oeehsTableControlKey))
            {
               this.CreateTableControlParameters(this.oeehsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OeehsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Oeehsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOeehsproxy = this.proxyAppObject.CreatePO_oeehsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOeehsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Oeehsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.oeehsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.oeehsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Oeehsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOeehsproxy = this.proxyAppObject.CreatePO_oeehsproxy())
               {
                  this.SetRequiredContextParameters();
                  poOeehsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Oeehsproxy - After Call");
      }
   

      public Oeehs GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Oeehs oeehs = null;
         if (row != null)
         {
             oeehs = this.BuildFromRow(row);
         }
         return oeehs;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(oeehs) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbloeehs.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Oeehs> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(oeehs)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Oeehs Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbloeehs.AsEnumerable().SingleOrDefault();
         Oeehs oeehs = null;
         if (row != null)
         {
             oeehs = this.BuildFromRow(row);
         }
         return oeehs;
      }
	  
	  
      public IEnumerable<Oeehs> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("oeehs.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeehs> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbloeehs.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Oeehs Get(int cono, int orderno, int ordersuf, string pricetype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeehs.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehs.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehs.ordersuf = {0}", ordersuf);
         }
         if (!string.IsNullOrEmpty(pricetype)) 
         {
             sb.AppendFormatWithEscape(" AND oeehs.pricetype = '{0}'", pricetype);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Oeehs BuildFromRow(DataRow row)
      {
         var returnRecord = Oeehs.BuildOeehsFromRow(row);
         returnRecord = this.BuildExtraFromRow<Oeehs>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Oeehs record)
      {
         Oeehs.UpdateRowFromOeehs(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Oeehs Insert(Oeehs record)
      {
         DataRow row = this.dataSet.ttbloeehs.NewttbloeehsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbloeehs.AddttbloeehsRow((pdsoeehsDataSet.ttbloeehsRow)row);
         this.SaveChanges();
         return this.dataSet.ttbloeehs.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeehs.Rows[0]) : null;
      }
  

      public Oeehs Update(Oeehs record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbloeehs.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeehs.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Oeehs record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbloeehs.NewttbloeehsRow();
            Oeehs.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloeehs.AddttbloeehsRow((pdsoeehsDataSet.ttbloeehsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Oeehs() { rowID = selectRowId }).ToList();
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
  