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
    
namespace Infor.Sxe.SW.Data.Adapters
{
   using com.infor.sxproxy.swproxy;
   using com.infor.sxproxy.swproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsswsr;

   public partial class SwsrAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsswsr";
      private SWProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> swsrTableControlKey;
		
      private pdsswsrDataSet dataSet;
        
      public SwsrAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SWProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsswsrDataSet() { DataSetName = DataSetName };
            this.swsrTableControlKey = this.dataSet.ttblswsr.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.swsrTableControlKey))
            {
               this.CreateTableControlParameters(this.swsrTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SwsrAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Swsrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSwsrproxy = this.proxyAppObject.CreatePO_swsrproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSwsrproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Swsrproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.swsrTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.swsrTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Swsrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSwsrproxy = this.proxyAppObject.CreatePO_swsrproxy())
               {
                  this.SetRequiredContextParameters();
                  poSwsrproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Swsrproxy - After Call");
      }
   

      public Swsr GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Swsr swsr = null;
         if (row != null)
         {
             swsr = this.BuildFromRow(row);
         }
         return swsr;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(swsr) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblswsr.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Swsr> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(swsr)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Swsr Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblswsr.AsEnumerable().SingleOrDefault();
         Swsr swsr = null;
         if (row != null)
         {
             swsr = this.BuildFromRow(row);
         }
         return swsr;
      }
	  
	  
      public IEnumerable<Swsr> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("swsr.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Swsr> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblswsr.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Swsr Get(int cono, decimal vendno, string prodline, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swsr.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND swsr.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND swsr.prodline = '{0}'", prodline);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND swsr.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Swsr BuildFromRow(DataRow row)
      {
         var returnRecord = Swsr.BuildSwsrFromRow(row);
         returnRecord = this.BuildExtraFromRow<Swsr>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Swsr record)
      {
         Swsr.UpdateRowFromSwsr(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Swsr Insert(Swsr record)
      {
         DataRow row = this.dataSet.ttblswsr.NewttblswsrRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblswsr.AddttblswsrRow((pdsswsrDataSet.ttblswsrRow)row);
         this.SaveChanges();
         return this.dataSet.ttblswsr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswsr.Rows[0]) : null;
      }
  

      public Swsr Update(Swsr record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblswsr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswsr.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Swsr record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblswsr.NewttblswsrRow();
            Swsr.BuildMinimalRow(ref row, record);
            this.dataSet.ttblswsr.AddttblswsrRow((pdsswsrDataSet.ttblswsrRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Swsr() { rowID = selectRowId }).ToList();
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
  