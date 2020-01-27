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
   using Models.Pdsswsss;

   public partial class SwsssAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsswsss";
      private SWProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> swsssTableControlKey;
		
      private pdsswsssDataSet dataSet;
        
      public SwsssAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SWProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsswsssDataSet() { DataSetName = DataSetName };
            this.swsssTableControlKey = this.dataSet.ttblswsss.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.swsssTableControlKey))
            {
               this.CreateTableControlParameters(this.swsssTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SwsssAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Swsssproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSwsssproxy = this.proxyAppObject.CreatePO_swsssproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSwsssproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Swsssproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.swsssTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.swsssTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Swsssproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSwsssproxy = this.proxyAppObject.CreatePO_swsssproxy())
               {
                  this.SetRequiredContextParameters();
                  poSwsssproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Swsssproxy - After Call");
      }
   

      public Swsss GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Swsss swsss = null;
         if (row != null)
         {
             swsss = this.BuildFromRow(row);
         }
         return swsss;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(swsss) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblswsss.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Swsss> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(swsss)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Swsss Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblswsss.AsEnumerable().SingleOrDefault();
         Swsss swsss = null;
         if (row != null)
         {
             swsss = this.BuildFromRow(row);
         }
         return swsss;
      }
	  
	  
      public IEnumerable<Swsss> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("swsss.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Swsss> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblswsss.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Swsss Get(int cono, string tech, DateTime? wkstartdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swsss.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(tech)) 
         {
             sb.AppendFormatWithEscape(" AND swsss.tech = '{0}'", tech);
         }
         if (wkstartdt != null) 
         {
             sb.AppendFormatWithEscape(" AND swsss.wkstartdt = '{0}'", wkstartdt);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Swsss BuildFromRow(DataRow row)
      {
         var returnRecord = Swsss.BuildSwsssFromRow(row);
         returnRecord = this.BuildExtraFromRow<Swsss>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Swsss record)
      {
         Swsss.UpdateRowFromSwsss(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Swsss Insert(Swsss record)
      {
         DataRow row = this.dataSet.ttblswsss.NewttblswsssRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblswsss.AddttblswsssRow((pdsswsssDataSet.ttblswsssRow)row);
         this.SaveChanges();
         return this.dataSet.ttblswsss.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswsss.Rows[0]) : null;
      }
  

      public Swsss Update(Swsss record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblswsss.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswsss.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Swsss record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblswsss.NewttblswsssRow();
            Swsss.BuildMinimalRow(ref row, record);
            this.dataSet.ttblswsss.AddttblswsssRow((pdsswsssDataSet.ttblswsssRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Swsss() { rowID = selectRowId }).ToList();
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
  