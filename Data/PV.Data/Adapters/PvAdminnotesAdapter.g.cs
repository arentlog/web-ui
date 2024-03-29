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
   using Models.PdspvAdminnotes;

   public partial class PvAdminnotesAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspv_adminnotes";
      private PVProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pvAdminnotesTableControlKey;
		
      private pdspv_adminnotesDataSet dataSet;
        
      public PvAdminnotesAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PVProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspv_adminnotesDataSet() { DataSetName = DataSetName };
            this.pvAdminnotesTableControlKey = this.dataSet.ttblpv_adminnotes.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pvAdminnotesTableControlKey))
            {
               this.CreateTableControlParameters(this.pvAdminnotesTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PvAdminnotesAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pv_adminnotesproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPv_adminnotesproxy = this.proxyAppObject.CreatePO_pv_adminnotesproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPv_adminnotesproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pv_adminnotesproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pvAdminnotesTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pvAdminnotesTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pv_adminnotesproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPv_adminnotesproxy = this.proxyAppObject.CreatePO_pv_adminnotesproxy())
               {
                  this.SetRequiredContextParameters();
                  poPv_adminnotesproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pv_adminnotesproxy - After Call");
      }
   

      public PvAdminnotes GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         PvAdminnotes pvAdminnotes = null;
         if (row != null)
         {
             pvAdminnotes = this.BuildFromRow(row);
         }
         return pvAdminnotes;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pv_adminnotes) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpv_adminnotes.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<PvAdminnotes> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pv_adminnotes)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected PvAdminnotes Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpv_adminnotes.AsEnumerable().SingleOrDefault();
         PvAdminnotes pvAdminnotes = null;
         if (row != null)
         {
             pvAdminnotes = this.BuildFromRow(row);
         }
         return pvAdminnotes;
      }
	  
	  
      public IEnumerable<PvAdminnotes> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pv_adminnotes.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<PvAdminnotes> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpv_adminnotes.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public PvAdminnotes Get(int cono, string subject, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_adminnotes.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(subject)) 
         {
             sb.AppendFormatWithEscape(" AND pv_adminnotes.subject = '{0}'", subject);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public PvAdminnotes BuildFromRow(DataRow row)
      {
         var returnRecord = PvAdminnotes.BuildPvAdminnotesFromRow(row);
         returnRecord = this.BuildExtraFromRow<PvAdminnotes>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, PvAdminnotes record)
      {
         PvAdminnotes.UpdateRowFromPvAdminnotes(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public PvAdminnotes Insert(PvAdminnotes record)
      {
         DataRow row = this.dataSet.ttblpv_adminnotes.Newttblpv_adminnotesRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpv_adminnotes.Addttblpv_adminnotesRow((pdspv_adminnotesDataSet.ttblpv_adminnotesRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpv_adminnotes.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_adminnotes.Rows[0]) : null;
      }
  

      public PvAdminnotes Update(PvAdminnotes record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpv_adminnotes.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_adminnotes.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(PvAdminnotes record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpv_adminnotes.Newttblpv_adminnotesRow();
            PvAdminnotes.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpv_adminnotes.Addttblpv_adminnotesRow((pdspv_adminnotesDataSet.ttblpv_adminnotesRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new PvAdminnotes() { rowID = selectRowId }).ToList();
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
  