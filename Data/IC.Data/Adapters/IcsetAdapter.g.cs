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
   using Models.Pdsicset;

   public partial class IcsetAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicset";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsetTableControlKey;
		
      private pdsicsetDataSet dataSet;
        
      public IcsetAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsetDataSet() { DataSetName = DataSetName };
            this.icsetTableControlKey = this.dataSet.ttblicset.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsetTableControlKey))
            {
               this.CreateTableControlParameters(this.icsetTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsetAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsetproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsetproxy = this.proxyAppObject.CreatePO_icsetproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsetproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsetproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsetTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsetTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsetproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsetproxy = this.proxyAppObject.CreatePO_icsetproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsetproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsetproxy - After Call");
      }
   

      public Icset GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icset icset = null;
         if (row != null)
         {
             icset = this.BuildFromRow(row);
         }
         return icset;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icset) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicset.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icset> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icset)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icset Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicset.AsEnumerable().SingleOrDefault();
         Icset icset = null;
         if (row != null)
         {
             icset = this.BuildFromRow(row);
         }
         return icset;
      }
	  
	  
      public IEnumerable<Icset> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icset.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icset> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicset.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icset Get(int cono, string whse, int runno, int ticketno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icset.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icset.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icset.runno = {0}", runno);
         }
         if (ticketno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icset.ticketno = {0}", ticketno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icset> GetListByBin(int cono, string whse, int runno, string binloc, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icset.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icset.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icset.runno = {0}", runno);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND icset.binloc = '{0}'", binloc);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icset> GetListByProd(int cono, string whse, int runno, string prod, string binloc, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icset.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icset.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icset.runno = {0}", runno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icset.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND icset.binloc = '{0}'", binloc);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icset> GetListByProduct(int cono, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icset.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icset.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icset> GetListByUtick(int cono, string whse, int runno, int uticketno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icset.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icset.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icset.runno = {0}", runno);
         }
         if (uticketno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icset.uticketno = {0}", uticketno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icset BuildFromRow(DataRow row)
      {
         var returnRecord = Icset.BuildIcsetFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icset>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icset record)
      {
         Icset.UpdateRowFromIcset(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icset Insert(Icset record)
      {
         DataRow row = this.dataSet.ttblicset.NewttblicsetRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicset.AddttblicsetRow((pdsicsetDataSet.ttblicsetRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicset.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicset.Rows[0]) : null;
      }
  

      public Icset Update(Icset record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicset.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicset.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icset record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicset.NewttblicsetRow();
            Icset.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicset.AddttblicsetRow((pdsicsetDataSet.ttblicsetRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icset() { rowID = selectRowId }).ToList();
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
  