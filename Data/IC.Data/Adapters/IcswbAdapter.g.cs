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
   using Models.Pdsicswb;

   public partial class IcswbAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicswb";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icswbTableControlKey;
		private readonly Tuple<string, string> icspTableControlKey;private readonly Tuple<string, string> icswTableControlKey;
      private pdsicswbDataSet dataSet;
        
      public IcswbAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicswbDataSet() { DataSetName = DataSetName };
            this.icswbTableControlKey = this.dataSet.ttblicswb.GetTableControlParametersKey();
            this.icspTableControlKey = this.dataSet.ttblicsp.GetTableControlParametersKey();this.icswTableControlKey = this.dataSet.ttblicsw.GetTableControlParametersKey();
            if (!this.tempTableControlParameters.ContainsKey(this.icswbTableControlKey))
            {
               this.CreateTableControlParameters(this.icswbTableControlKey);
            }
            if (!this.tempTableControlParameters.ContainsKey(this.icspTableControlKey))
            {
               this.CreateTableControlParameters(this.icspTableControlKey);
            }
            if (!this.tempTableControlParameters.ContainsKey(this.icswTableControlKey))
            {
               this.CreateTableControlParameters(this.icswTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcswbAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, bool fillMode, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icswbproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, fillMode, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcswbproxy = this.proxyAppObject.CreatePO_icswbproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcswbproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icswbproxy - After Call");
      }
      
      private void SetAndFetch(string where, bool fillMode, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icswbTableControlKey, where, batchsize, fldList);
         this.SetFetchWhereParameters(this.icspTableControlKey, fillMode);
         this.SetFetchWhereParameters(this.icswTableControlKey, fillMode);
         this.SetTableParametersOnContext(this.icswbTableControlKey, true);
         this.SetTableParametersOnContext(this.icspTableControlKey);
         this.SetTableParametersOnContext(this.icswTableControlKey);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icswbproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcswbproxy = this.proxyAppObject.CreatePO_icswbproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcswbproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icswbproxy - After Call");
      }
   

      public Icswb GetByRowId(string rowId, bool fillMode, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fillMode, fldList);
         Icswb icswb = null;
         if (row != null)
         {
             icswb = this.BuildFromRow(row);
         }
         return icswb;
      }
   
      private DataRow GetRowByRowId(string rowId, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icswb) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttblicswb.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icswb> GetListByRowIdList(List<string> rowIds, bool fillMode, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icswb)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), fillMode, batchsize, fldList);
      }

      protected Icswb Fetch(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         var row = this.dataSet.ttblicswb.AsEnumerable().SingleOrDefault();
         Icswb icswb = null;
         if (row != null)
         {
             icswb = this.BuildFromRow(row);
         }
         return icswb;
      }
	  
	  
      public IEnumerable<Icswb> GetListAllByCono(int cono, bool fillMode, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icswb.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icswb> GetList(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicswb.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icswb Get(int cono, string prod, string whse, string binloc, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icswb.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.binloc = '{0}'", binloc);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, batchsize, fldList);
      }
  
      public IEnumerable<Icswb> GetListByBinloc(int cono, string whse, string binloc, string prod, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icswb.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.binloc = '{0}'", binloc);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icswb> GetListByWhse(int cono, string whse, string prod, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icswb.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icswb.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Icswb BuildFromRow(DataRow row)
      {
         var returnRecord = Icswb.BuildIcswbFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icswb>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icswb record)
      {
         Icswb.UpdateRowFromIcswb(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icswb Insert(Icswb record)
      {
         DataRow row = this.dataSet.ttblicswb.NewttblicswbRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicswb.AddttblicswbRow((pdsicswbDataSet.ttblicswbRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicswb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicswb.Rows[0]) : null;
      }
  

      public Icswb Update(Icswb record)
      {
        var row = this.GetRowByRowId(record.rowID, false, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicswb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicswb.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icswb record)
      {
         var row = this.GetRowByRowId(record.rowID, false, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicswb.NewttblicswbRow();
            Icswb.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicswb.AddttblicswbRow((pdsicswbDataSet.ttblicswbRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icswb() { rowID = selectRowId }).ToList();
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
  