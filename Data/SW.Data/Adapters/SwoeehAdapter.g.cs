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
   using Models.Pdsswoeeh;

   public partial class SwoeehAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsswoeeh";
      private SWProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> swoeehTableControlKey;
		
      private pdsswoeehDataSet dataSet;
        
      public SwoeehAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SWProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsswoeehDataSet() { DataSetName = DataSetName };
            this.swoeehTableControlKey = this.dataSet.ttblswoeeh.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.swoeehTableControlKey))
            {
               this.CreateTableControlParameters(this.swoeehTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SwoeehAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Swoeehproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSwoeehproxy = this.proxyAppObject.CreatePO_swoeehproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSwoeehproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Swoeehproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.swoeehTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.swoeehTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Swoeehproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSwoeehproxy = this.proxyAppObject.CreatePO_swoeehproxy())
               {
                  this.SetRequiredContextParameters();
                  poSwoeehproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Swoeehproxy - After Call");
      }
   

      public Swoeeh GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Swoeeh swoeeh = null;
         if (row != null)
         {
             swoeeh = this.BuildFromRow(row);
         }
         return swoeeh;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(swoeeh) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblswoeeh.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Swoeeh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(swoeeh)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Swoeeh Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblswoeeh.AsEnumerable().SingleOrDefault();
         Swoeeh swoeeh = null;
         if (row != null)
         {
             swoeeh = this.BuildFromRow(row);
         }
         return swoeeh;
      }
	  
	  
      public IEnumerable<Swoeeh> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("swoeeh.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Swoeeh> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblswoeeh.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Swoeeh Get(int cono, int orderno, int ordersuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swoeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND swoeeh.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND swoeeh.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Swoeeh BuildFromRow(DataRow row)
      {
         var returnRecord = Swoeeh.BuildSwoeehFromRow(row);
         returnRecord = this.BuildExtraFromRow<Swoeeh>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Swoeeh record)
      {
         Swoeeh.UpdateRowFromSwoeeh(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Swoeeh Insert(Swoeeh record)
      {
         DataRow row = this.dataSet.ttblswoeeh.NewttblswoeehRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblswoeeh.AddttblswoeehRow((pdsswoeehDataSet.ttblswoeehRow)row);
         this.SaveChanges();
         return this.dataSet.ttblswoeeh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswoeeh.Rows[0]) : null;
      }
  

      public Swoeeh Update(Swoeeh record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblswoeeh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswoeeh.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Swoeeh record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblswoeeh.NewttblswoeehRow();
            Swoeeh.BuildMinimalRow(ref row, record);
            this.dataSet.ttblswoeeh.AddttblswoeehRow((pdsswoeehDataSet.ttblswoeehRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Swoeeh() { rowID = selectRowId }).ToList();
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
  