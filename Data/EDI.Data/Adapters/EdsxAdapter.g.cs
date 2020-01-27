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
    
namespace Infor.Sxe.EDI.Data.Adapters
{
   using com.infor.sxproxy.ediproxy;
   using com.infor.sxproxy.ediproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsedsx;

   public partial class EdsxAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsedsx";
      private EDIProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> edsxTableControlKey;
		
      private pdsedsxDataSet dataSet;
        
      public EdsxAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new EDIProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsedsxDataSet() { DataSetName = DataSetName };
            this.edsxTableControlKey = this.dataSet.ttbledsx.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.edsxTableControlKey))
            {
               this.CreateTableControlParameters(this.edsxTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in EdsxAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Edsxproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poEdsxproxy = this.proxyAppObject.CreatePO_edsxproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poEdsxproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Edsxproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.edsxTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.edsxTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Edsxproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poEdsxproxy = this.proxyAppObject.CreatePO_edsxproxy())
               {
                  this.SetRequiredContextParameters();
                  poEdsxproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Edsxproxy - After Call");
      }
   

      public Edsx GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Edsx edsx = null;
         if (row != null)
         {
             edsx = this.BuildFromRow(row);
         }
         return edsx;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(edsx) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbledsx.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Edsx> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(edsx)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Edsx Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbledsx.AsEnumerable().SingleOrDefault();
         Edsx edsx = null;
         if (row != null)
         {
             edsx = this.BuildFromRow(row);
         }
         return edsx;
      }
	  
	  

      public IEnumerable<Edsx> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbledsx.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Edsx Get(bool transmitty, decimal docno, string version, string pseudo, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edsx.transmitty = {0}", transmitty);
         if (docno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edsx.docno = {0}", docno);
         }
         if (!string.IsNullOrEmpty(version)) 
         {
             sb.AppendFormatWithEscape(" AND edsx.version = '{0}'", version);
         }
         if (!string.IsNullOrEmpty(pseudo)) 
         {
             sb.AppendFormatWithEscape(" AND edsx.pseudo = '{0}'", pseudo);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Edsx BuildFromRow(DataRow row)
      {
         var returnRecord = Edsx.BuildEdsxFromRow(row);
         returnRecord = this.BuildExtraFromRow<Edsx>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Edsx record)
      {
         Edsx.UpdateRowFromEdsx(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Edsx Insert(Edsx record)
      {
         DataRow row = this.dataSet.ttbledsx.NewttbledsxRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbledsx.AddttbledsxRow((pdsedsxDataSet.ttbledsxRow)row);
         this.SaveChanges();
         return this.dataSet.ttbledsx.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledsx.Rows[0]) : null;
      }
  

      public Edsx Update(Edsx record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbledsx.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledsx.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Edsx record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbledsx.NewttbledsxRow();
            Edsx.BuildMinimalRow(ref row, record);
            this.dataSet.ttbledsx.AddttbledsxRow((pdsedsxDataSet.ttbledsxRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Edsx() { rowID = selectRowId }).ToList();
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
  