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
    
namespace Infor.Sxe.SA.Data.Adapters
{
   using com.infor.sxproxy.saproxy;
   using com.infor.sxproxy.saproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssasz;

   public partial class SaszAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssasz";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> saszTableControlKey;
		
      private pdssaszDataSet dataSet;
        
      public SaszAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssaszDataSet() { DataSetName = DataSetName };
            this.saszTableControlKey = this.dataSet.ttblsasz.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.saszTableControlKey))
            {
               this.CreateTableControlParameters(this.saszTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SaszAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Saszproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSaszproxy = this.proxyAppObject.CreatePO_saszproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSaszproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Saszproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.saszTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.saszTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Saszproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSaszproxy = this.proxyAppObject.CreatePO_saszproxy())
               {
                  this.SetRequiredContextParameters();
                  poSaszproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Saszproxy - After Call");
      }
   

      public Sasz GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sasz sasz = null;
         if (row != null)
         {
             sasz = this.BuildFromRow(row);
         }
         return sasz;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sasz) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsasz.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sasz> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sasz)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sasz Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsasz.AsEnumerable().SingleOrDefault();
         Sasz sasz = null;
         if (row != null)
         {
             sasz = this.BuildFromRow(row);
         }
         return sasz;
      }
	  
	  
      public IEnumerable<Sasz> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sasz.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasz> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsasz.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sasz Get(int cono, string whse, string shipvia, string begdestzip, string enddestzip, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasz.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND sasz.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(shipvia)) 
         {
             sb.AppendFormatWithEscape(" AND sasz.shipvia = '{0}'", shipvia);
         }
         if (!string.IsNullOrEmpty(begdestzip)) 
         {
             sb.AppendFormatWithEscape(" AND sasz.begdestzip = '{0}'", begdestzip);
         }
         if (!string.IsNullOrEmpty(enddestzip)) 
         {
             sb.AppendFormatWithEscape(" AND sasz.enddestzip = '{0}'", enddestzip);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Sasz BuildFromRow(DataRow row)
      {
         var returnRecord = Sasz.BuildSaszFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sasz>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sasz record)
      {
         Sasz.UpdateRowFromSasz(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sasz Insert(Sasz record)
      {
         DataRow row = this.dataSet.ttblsasz.NewttblsaszRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsasz.AddttblsaszRow((pdssaszDataSet.ttblsaszRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsasz.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasz.Rows[0]) : null;
      }
  

      public Sasz Update(Sasz record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsasz.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasz.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sasz record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsasz.NewttblsaszRow();
            Sasz.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsasz.AddttblsaszRow((pdssaszDataSet.ttblsaszRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sasz() { rowID = selectRowId }).ToList();
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
  