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
   using Models.Pdsicamapm;

   public partial class IcamapmAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicamapm";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icamapmTableControlKey;
		
      private pdsicamapmDataSet dataSet;
        
      public IcamapmAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicamapmDataSet() { DataSetName = DataSetName };
            this.icamapmTableControlKey = this.dataSet.ttblicamapm.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icamapmTableControlKey))
            {
               this.CreateTableControlParameters(this.icamapmTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcamapmAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icamapmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcamapmproxy = this.proxyAppObject.CreatePO_icamapmproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcamapmproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icamapmproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icamapmTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icamapmTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icamapmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcamapmproxy = this.proxyAppObject.CreatePO_icamapmproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcamapmproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icamapmproxy - After Call");
      }
   

      public Icamapm GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icamapm icamapm = null;
         if (row != null)
         {
             icamapm = this.BuildFromRow(row);
         }
         return icamapm;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icamapm) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicamapm.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icamapm> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icamapm)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icamapm Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicamapm.AsEnumerable().SingleOrDefault();
         Icamapm icamapm = null;
         if (row != null)
         {
             icamapm = this.BuildFromRow(row);
         }
         return icamapm;
      }
	  
	  
      public IEnumerable<Icamapm> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icamapm.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icamapm> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicamapm.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icamapm Get(int cono, int reportno, string whse, string prod, string usagectrl, int usgmths, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icamapm.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.reportno = {0}", reportno);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(usagectrl)) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.usagectrl = '{0}'", usagectrl);
         }
         if (usgmths != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.usgmths = {0}", usgmths);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icamapm> GetListByNewmethod(int cono, int reportno, bool newmethodfl, string whse, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icamapm.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.reportno = {0}", reportno);
         }
         sb.AppendFormatWithEscape(" AND icamapm.newmethodfl = {0}", newmethodfl);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icamapm.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icamapm BuildFromRow(DataRow row)
      {
         var returnRecord = Icamapm.BuildIcamapmFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icamapm>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icamapm record)
      {
         Icamapm.UpdateRowFromIcamapm(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icamapm Insert(Icamapm record)
      {
         DataRow row = this.dataSet.ttblicamapm.NewttblicamapmRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicamapm.AddttblicamapmRow((pdsicamapmDataSet.ttblicamapmRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicamapm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicamapm.Rows[0]) : null;
      }
  

      public Icamapm Update(Icamapm record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicamapm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicamapm.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icamapm record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicamapm.NewttblicamapmRow();
            Icamapm.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicamapm.AddttblicamapmRow((pdsicamapmDataSet.ttblicamapmRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icamapm() { rowID = selectRowId }).ToList();
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
  