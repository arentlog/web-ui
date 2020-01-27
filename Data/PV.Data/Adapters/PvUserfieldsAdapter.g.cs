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
   using Models.PdspvUserfields;

   public partial class PvUserfieldsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspv_userfields";
      private PVProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pvUserfieldsTableControlKey;
		
      private pdspv_userfieldsDataSet dataSet;
        
      public PvUserfieldsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PVProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspv_userfieldsDataSet() { DataSetName = DataSetName };
            this.pvUserfieldsTableControlKey = this.dataSet.ttblpv_userfields.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pvUserfieldsTableControlKey))
            {
               this.CreateTableControlParameters(this.pvUserfieldsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PvUserfieldsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pv_userfieldsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPv_userfieldsproxy = this.proxyAppObject.CreatePO_pv_userfieldsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPv_userfieldsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pv_userfieldsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pvUserfieldsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pvUserfieldsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pv_userfieldsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPv_userfieldsproxy = this.proxyAppObject.CreatePO_pv_userfieldsproxy())
               {
                  this.SetRequiredContextParameters();
                  poPv_userfieldsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pv_userfieldsproxy - After Call");
      }
   

      public PvUserfields GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         PvUserfields pvUserfields = null;
         if (row != null)
         {
             pvUserfields = this.BuildFromRow(row);
         }
         return pvUserfields;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pv_userfields) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpv_userfields.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<PvUserfields> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pv_userfields)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected PvUserfields Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpv_userfields.AsEnumerable().SingleOrDefault();
         PvUserfields pvUserfields = null;
         if (row != null)
         {
             pvUserfields = this.BuildFromRow(row);
         }
         return pvUserfields;
      }
	  
	  

      public IEnumerable<PvUserfields> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpv_userfields.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public PvUserfields Get(string tablename, string fieldname, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(tablename)) 
         {
             sb.AppendFormatWithEscape("pv_userfields.tablename = '{0}'", tablename);
         }
         if (!string.IsNullOrEmpty(fieldname)) 
         {
             sb.AppendFormatWithEscape(" AND pv_userfields.fieldname = '{0}'", fieldname);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public PvUserfields BuildFromRow(DataRow row)
      {
         var returnRecord = PvUserfields.BuildPvUserfieldsFromRow(row);
         returnRecord = this.BuildExtraFromRow<PvUserfields>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, PvUserfields record)
      {
         PvUserfields.UpdateRowFromPvUserfields(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public PvUserfields Insert(PvUserfields record)
      {
         DataRow row = this.dataSet.ttblpv_userfields.Newttblpv_userfieldsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpv_userfields.Addttblpv_userfieldsRow((pdspv_userfieldsDataSet.ttblpv_userfieldsRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpv_userfields.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_userfields.Rows[0]) : null;
      }
  

      public PvUserfields Update(PvUserfields record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpv_userfields.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_userfields.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(PvUserfields record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpv_userfields.Newttblpv_userfieldsRow();
            PvUserfields.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpv_userfields.Addttblpv_userfieldsRow((pdspv_userfieldsDataSet.ttblpv_userfieldsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new PvUserfields() { rowID = selectRowId }).ToList();
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
  