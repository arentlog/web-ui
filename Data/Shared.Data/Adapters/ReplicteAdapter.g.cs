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
    
namespace Infor.Sxe.Shared.Data.Adapters
{
   using com.infor.sxproxy.sharedproxy;
   using com.infor.sxproxy.sharedproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsreplicte;

   public partial class ReplicteAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsreplicte";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> replicteTableControlKey;
		
      private pdsreplicteDataSet dataSet;
        
      public ReplicteAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsreplicteDataSet() { DataSetName = DataSetName };
            this.replicteTableControlKey = this.dataSet.ttblreplicte.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.replicteTableControlKey))
            {
               this.CreateTableControlParameters(this.replicteTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ReplicteAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Replicteproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poReplicteproxy = this.proxyAppObject.CreatePO_replicteproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poReplicteproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Replicteproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.replicteTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.replicteTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Replicteproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poReplicteproxy = this.proxyAppObject.CreatePO_replicteproxy())
               {
                  this.SetRequiredContextParameters();
                  poReplicteproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Replicteproxy - After Call");
      }
   

      public Replicte GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Replicte replicte = null;
         if (row != null)
         {
             replicte = this.BuildFromRow(row);
         }
         return replicte;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(replicte) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblreplicte.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Replicte> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(replicte)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Replicte Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblreplicte.AsEnumerable().SingleOrDefault();
         Replicte replicte = null;
         if (row != null)
         {
             replicte = this.BuildFromRow(row);
         }
         return replicte;
      }
	  
	  

      public IEnumerable<Replicte> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblreplicte.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Replicte Get(string tablenm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(tablenm)) 
         {
             sb.AppendFormatWithEscape("replicte.tablenm = '{0}'", tablenm);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Replicte BuildFromRow(DataRow row)
      {
         var returnRecord = Replicte.BuildReplicteFromRow(row);
         returnRecord = this.BuildExtraFromRow<Replicte>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Replicte record)
      {
         Replicte.UpdateRowFromReplicte(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Replicte Insert(Replicte record)
      {
         DataRow row = this.dataSet.ttblreplicte.NewttblreplicteRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblreplicte.AddttblreplicteRow((pdsreplicteDataSet.ttblreplicteRow)row);
         this.SaveChanges();
         return this.dataSet.ttblreplicte.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblreplicte.Rows[0]) : null;
      }
  

      public Replicte Update(Replicte record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblreplicte.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblreplicte.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Replicte record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblreplicte.NewttblreplicteRow();
            Replicte.BuildMinimalRow(ref row, record);
            this.dataSet.ttblreplicte.AddttblreplicteRow((pdsreplicteDataSet.ttblreplicteRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Replicte() { rowID = selectRowId }).ToList();
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
  