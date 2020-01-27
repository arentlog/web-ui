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
    
namespace Infor.Sxe.OE.Data.Adapters
{
   using com.infor.sxproxy.oeproxy;
   using com.infor.sxproxy.oeproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsoeeha;

   public partial class OeehaAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsoeeha";
      private OEProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> oeehaTableControlKey;
		
      private pdsoeehaDataSet dataSet;
        
      public OeehaAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OEProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsoeehaDataSet() { DataSetName = DataSetName };
            this.oeehaTableControlKey = this.dataSet.ttbloeeha.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.oeehaTableControlKey))
            {
               this.CreateTableControlParameters(this.oeehaTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OeehaAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Oeehaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOeehaproxy = this.proxyAppObject.CreatePO_oeehaproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOeehaproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Oeehaproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.oeehaTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.oeehaTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Oeehaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOeehaproxy = this.proxyAppObject.CreatePO_oeehaproxy())
               {
                  this.SetRequiredContextParameters();
                  poOeehaproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Oeehaproxy - After Call");
      }
   

      public Oeeha GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Oeeha oeeha = null;
         if (row != null)
         {
             oeeha = this.BuildFromRow(row);
         }
         return oeeha;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(oeeha) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbloeeha.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Oeeha> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(oeeha)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Oeeha Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbloeeha.AsEnumerable().SingleOrDefault();
         Oeeha oeeha = null;
         if (row != null)
         {
             oeeha = this.BuildFromRow(row);
         }
         return oeeha;
      }
	  
	  
      public IEnumerable<Oeeha> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("oeeha.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeeha> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbloeeha.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Oeeha Get(int cono, int orderno, int ordersuf, int mediacd, string cardno, string transcd, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeha.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.ordersuf = {0}", ordersuf);
         }
         if (mediacd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.mediacd = {0}", mediacd);
         }
         if (!string.IsNullOrEmpty(cardno)) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.cardno = '{0}'", cardno);
         }
         if (!string.IsNullOrEmpty(transcd)) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.transcd = '{0}'", transcd);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Oeeha> GetListByBatch(int cono, int processno, int processcd, bool statustype, int orderno, int ordersuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeha.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (processno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.processno = {0}", processno);
         }
         if (processcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.processcd = {0}", processcd);
         }
         sb.AppendFormatWithEscape(" AND oeeha.statustype = {0}", statustype);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeeha> GetListByCcqueue(int cono, int processcd, bool statustype, DateTime? createdt, string createtm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeha.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (processcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.processcd = {0}", processcd);
         }
         sb.AppendFormatWithEscape(" AND oeeha.statustype = {0}", statustype);
         if (createdt != null) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.createdt = '{0}'", createdt);
         }
         if (!string.IsNullOrEmpty(createtm)) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.createtm = '{0}'", createtm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeeha> GetListByProcess(int processcd, int processno, DateTime? createdt, string createtm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (processcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape("oeeha.processcd = {0}", processcd);
         }
         if (processno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.processno = {0}", processno);
         }
         if (createdt != null) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.createdt = '{0}'", createdt);
         }
         if (!string.IsNullOrEmpty(createtm)) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.createtm = '{0}'", createtm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeeha> GetListByStatustype(int cono, int mediacd, string cardno, bool statustype, int processcd, int commcd, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeha.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (mediacd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.mediacd = {0}", mediacd);
         }
         if (!string.IsNullOrEmpty(cardno)) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.cardno = '{0}'", cardno);
         }
         sb.AppendFormatWithEscape(" AND oeeha.statustype = {0}", statustype);
         if (processcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.processcd = {0}", processcd);
         }
         if (commcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.commcd = {0}", commcd);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeeha> GetListBySubmit(int cono, bool statustype, DateTime? submitdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeha.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND oeeha.statustype = {0}", statustype);
         if (submitdt != null) 
         {
             sb.AppendFormatWithEscape(" AND oeeha.submitdt = '{0}'", submitdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Oeeha BuildFromRow(DataRow row)
      {
         var returnRecord = Oeeha.BuildOeehaFromRow(row);
         returnRecord = this.BuildExtraFromRow<Oeeha>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Oeeha record)
      {
         Oeeha.UpdateRowFromOeeha(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Oeeha Insert(Oeeha record)
      {
         DataRow row = this.dataSet.ttbloeeha.NewttbloeehaRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbloeeha.AddttbloeehaRow((pdsoeehaDataSet.ttbloeehaRow)row);
         this.SaveChanges();
         return this.dataSet.ttbloeeha.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeeha.Rows[0]) : null;
      }
  

      public Oeeha Update(Oeeha record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbloeeha.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeeha.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Oeeha record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbloeeha.NewttbloeehaRow();
            Oeeha.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloeeha.AddttbloeehaRow((pdsoeehaDataSet.ttbloeehaRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Oeeha() { rowID = selectRowId }).ToList();
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
  