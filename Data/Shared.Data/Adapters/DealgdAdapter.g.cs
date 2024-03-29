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
   using Models.Pdsdealgd;

   public partial class DealgdAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsdealgd";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> dealgdTableControlKey;
		
      private pdsdealgdDataSet dataSet;
        
      public DealgdAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsdealgdDataSet() { DataSetName = DataSetName };
            this.dealgdTableControlKey = this.dataSet.ttbldealgd.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.dealgdTableControlKey))
            {
               this.CreateTableControlParameters(this.dealgdTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in DealgdAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Dealgdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poDealgdproxy = this.proxyAppObject.CreatePO_dealgdproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poDealgdproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Dealgdproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.dealgdTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.dealgdTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Dealgdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poDealgdproxy = this.proxyAppObject.CreatePO_dealgdproxy())
               {
                  this.SetRequiredContextParameters();
                  poDealgdproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Dealgdproxy - After Call");
      }
   

      public Dealgd GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Dealgd dealgd = null;
         if (row != null)
         {
             dealgd = this.BuildFromRow(row);
         }
         return dealgd;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(dealgd) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbldealgd.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Dealgd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(dealgd)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Dealgd Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbldealgd.AsEnumerable().SingleOrDefault();
         Dealgd dealgd = null;
         if (row != null)
         {
             dealgd = this.BuildFromRow(row);
         }
         return dealgd;
      }
	  
	  
      public IEnumerable<Dealgd> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("dealgd.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Dealgd> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbldealgd.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Dealgd Get(int cono, string groupnm, string gdtype, string gdentity, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("dealgd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND dealgd.groupnm = '{0}'", groupnm);
         }
         if (!string.IsNullOrEmpty(gdtype)) 
         {
             sb.AppendFormatWithEscape(" AND dealgd.gdtype = '{0}'", gdtype);
         }
         if (!string.IsNullOrEmpty(gdentity)) 
         {
             sb.AppendFormatWithEscape(" AND dealgd.gdentity = '{0}'", gdentity);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Dealgd> GetListByEntity(int cono, string gdtype, string gdentity, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("dealgd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(gdtype)) 
         {
             sb.AppendFormatWithEscape(" AND dealgd.gdtype = '{0}'", gdtype);
         }
         if (!string.IsNullOrEmpty(gdentity)) 
         {
             sb.AppendFormatWithEscape(" AND dealgd.gdentity = '{0}'", gdentity);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Dealgd BuildFromRow(DataRow row)
      {
         var returnRecord = Dealgd.BuildDealgdFromRow(row);
         returnRecord = this.BuildExtraFromRow<Dealgd>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Dealgd record)
      {
         Dealgd.UpdateRowFromDealgd(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Dealgd Insert(Dealgd record)
      {
         DataRow row = this.dataSet.ttbldealgd.NewttbldealgdRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbldealgd.AddttbldealgdRow((pdsdealgdDataSet.ttbldealgdRow)row);
         this.SaveChanges();
         return this.dataSet.ttbldealgd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldealgd.Rows[0]) : null;
      }
  

      public Dealgd Update(Dealgd record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbldealgd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldealgd.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Dealgd record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbldealgd.NewttbldealgdRow();
            Dealgd.BuildMinimalRow(ref row, record);
            this.dataSet.ttbldealgd.AddttbldealgdRow((pdsdealgdDataSet.ttbldealgdRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Dealgd() { rowID = selectRowId }).ToList();
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
  