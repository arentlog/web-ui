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
    
namespace Infor.Sxe.PV.Data.Adapters
{
   using com.infor.sxproxy.pvproxy;
   using com.infor.sxproxy.pvproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.PdspvSwewh;

   public partial class PvSwewhAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspv_swewh";
      private PVProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pvSwewhTableControlKey;
		
      private pdspv_swewhDataSet dataSet;
        
      public PvSwewhAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PVProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspv_swewhDataSet() { DataSetName = DataSetName };
            this.pvSwewhTableControlKey = this.dataSet.ttblpv_swewh.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pvSwewhTableControlKey))
            {
               this.CreateTableControlParameters(this.pvSwewhTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PvSwewhAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pv_swewhproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPv_swewhproxy = this.proxyAppObject.CreatePO_pv_swewhproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPv_swewhproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pv_swewhproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pvSwewhTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pvSwewhTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pv_swewhproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPv_swewhproxy = this.proxyAppObject.CreatePO_pv_swewhproxy())
               {
                  this.SetRequiredContextParameters();
                  poPv_swewhproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pv_swewhproxy - After Call");
      }
   

      public PvSwewh GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         PvSwewh pvSwewh = null;
         if (row != null)
         {
             pvSwewh = this.BuildFromRow(row);
         }
         return pvSwewh;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pv_swewh) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpv_swewh.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<PvSwewh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pv_swewh)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected PvSwewh Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpv_swewh.AsEnumerable().SingleOrDefault();
         PvSwewh pvSwewh = null;
         if (row != null)
         {
             pvSwewh = this.BuildFromRow(row);
         }
         return pvSwewh;
      }
	  
	  
      public IEnumerable<PvSwewh> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pv_swewh.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<PvSwewh> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpv_swewh.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public PvSwewh Get(int cono, int recjrnlno, int intclaimno, int swsuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_swewh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (recjrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_swewh.recjrnlno = {0}", recjrnlno);
         }
         if (intclaimno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_swewh.intclaimno = {0}", intclaimno);
         }
         if (swsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_swewh.swsuf = {0}", swsuf);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<PvSwewh> GetListByVendno(int cono, int recjrnlno, decimal vendno, int intclaimno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_swewh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (recjrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_swewh.recjrnlno = {0}", recjrnlno);
         }
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_swewh.vendno = {0}", vendno);
         }
         if (intclaimno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_swewh.intclaimno = {0}", intclaimno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public PvSwewh BuildFromRow(DataRow row)
      {
         var returnRecord = PvSwewh.BuildPvSwewhFromRow(row);
         returnRecord = this.BuildExtraFromRow<PvSwewh>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, PvSwewh record)
      {
         PvSwewh.UpdateRowFromPvSwewh(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public PvSwewh Insert(PvSwewh record)
      {
         DataRow row = this.dataSet.ttblpv_swewh.Newttblpv_swewhRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpv_swewh.Addttblpv_swewhRow((pdspv_swewhDataSet.ttblpv_swewhRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpv_swewh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_swewh.Rows[0]) : null;
      }
  

      public PvSwewh Update(PvSwewh record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpv_swewh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_swewh.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(PvSwewh record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpv_swewh.Newttblpv_swewhRow();
            PvSwewh.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpv_swewh.Addttblpv_swewhRow((pdspv_swewhDataSet.ttblpv_swewhRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new PvSwewh() { rowID = selectRowId }).ToList();
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
  