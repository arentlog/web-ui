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
   using Models.Pdsicsepa;

   public partial class IcsepaAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsepa";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsepaTableControlKey;
		
      private pdsicsepaDataSet dataSet;
        
      public IcsepaAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsepaDataSet() { DataSetName = DataSetName };
            this.icsepaTableControlKey = this.dataSet.ttblicsepa.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsepaTableControlKey))
            {
               this.CreateTableControlParameters(this.icsepaTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsepaAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsepaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsepaproxy = this.proxyAppObject.CreatePO_icsepaproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsepaproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsepaproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsepaTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsepaTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsepaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsepaproxy = this.proxyAppObject.CreatePO_icsepaproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsepaproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsepaproxy - After Call");
      }
   

      public Icsepa GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsepa icsepa = null;
         if (row != null)
         {
             icsepa = this.BuildFromRow(row);
         }
         return icsepa;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsepa) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsepa.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsepa> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsepa)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsepa Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsepa.AsEnumerable().SingleOrDefault();
         Icsepa icsepa = null;
         if (row != null)
         {
             icsepa = this.BuildFromRow(row);
         }
         return icsepa;
      }
	  
	  
      public IEnumerable<Icsepa> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsepa.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsepa> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsepa.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsepa Get(int cono, string whse, int runno, DateTime? updatedt, string binloc, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsepa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.runno = {0}", runno);
         }
         if (updatedt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.updatedt = '{0}'", updatedt);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.binloc = '{0}'", binloc);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsepa> GetListByAdjty(int cono, string whse, int runno, string invadjustty, string binloc, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsepa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.runno = {0}", runno);
         }
         if (!string.IsNullOrEmpty(invadjustty)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.invadjustty = '{0}'", invadjustty);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.binloc = '{0}'", binloc);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsepa> GetListByBin(int cono, string whse, int runno, string binloc, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsepa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.runno = {0}", runno);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.binloc = '{0}'", binloc);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsepa> GetListByProd(int cono, string whse, int runno, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsepa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.whse = '{0}'", whse);
         }
         if (runno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.runno = {0}", runno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsepa.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsepa BuildFromRow(DataRow row)
      {
         var returnRecord = Icsepa.BuildIcsepaFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsepa>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsepa record)
      {
         Icsepa.UpdateRowFromIcsepa(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsepa Insert(Icsepa record)
      {
         DataRow row = this.dataSet.ttblicsepa.NewttblicsepaRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsepa.AddttblicsepaRow((pdsicsepaDataSet.ttblicsepaRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsepa.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsepa.Rows[0]) : null;
      }
  

      public Icsepa Update(Icsepa record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsepa.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsepa.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsepa record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsepa.NewttblicsepaRow();
            Icsepa.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsepa.AddttblicsepaRow((pdsicsepaDataSet.ttblicsepaRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsepa() { rowID = selectRowId }).ToList();
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
  