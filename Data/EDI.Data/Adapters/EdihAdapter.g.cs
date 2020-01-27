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
   using Models.Pdsedih;

   public partial class EdihAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsedih";
      private EDIProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> edihTableControlKey;
		
      private pdsedihDataSet dataSet;
        
      public EdihAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new EDIProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsedihDataSet() { DataSetName = DataSetName };
            this.edihTableControlKey = this.dataSet.ttbledih.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.edihTableControlKey))
            {
               this.CreateTableControlParameters(this.edihTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in EdihAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Edihproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poEdihproxy = this.proxyAppObject.CreatePO_edihproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poEdihproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Edihproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.edihTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.edihTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Edihproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poEdihproxy = this.proxyAppObject.CreatePO_edihproxy())
               {
                  this.SetRequiredContextParameters();
                  poEdihproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Edihproxy - After Call");
      }
   

      public Edih GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Edih edih = null;
         if (row != null)
         {
             edih = this.BuildFromRow(row);
         }
         return edih;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(edih) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbledih.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Edih> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(edih)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Edih Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbledih.AsEnumerable().SingleOrDefault();
         Edih edih = null;
         if (row != null)
         {
             edih = this.BuildFromRow(row);
         }
         return edih;
      }
	  
	  
      public IEnumerable<Edih> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("edih.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Edih> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbledih.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Edih Get(int cono, string batchnm, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edih.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(batchnm)) 
         {
             sb.AppendFormatWithEscape(" AND edih.batchnm = '{0}'", batchnm);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edih.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Edih> GetListByCustno(int cono, decimal custno, string doctype, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edih.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edih.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(doctype)) 
         {
             sb.AppendFormatWithEscape(" AND edih.doctype = '{0}'", doctype);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edih.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Edih> GetListByPo(int cono, string custpo, decimal custno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edih.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(custpo)) 
         {
             sb.AppendFormatWithEscape(" AND edih.custpo = '{0}'", custpo);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edih.custno = {0}", custno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Edih BuildFromRow(DataRow row)
      {
         var returnRecord = Edih.BuildEdihFromRow(row);
         returnRecord = this.BuildExtraFromRow<Edih>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Edih record)
      {
         Edih.UpdateRowFromEdih(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Edih Insert(Edih record)
      {
         DataRow row = this.dataSet.ttbledih.NewttbledihRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbledih.AddttbledihRow((pdsedihDataSet.ttbledihRow)row);
         this.SaveChanges();
         return this.dataSet.ttbledih.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledih.Rows[0]) : null;
      }
  

      public Edih Update(Edih record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbledih.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledih.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Edih record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbledih.NewttbledihRow();
            Edih.BuildMinimalRow(ref row, record);
            this.dataSet.ttbledih.AddttbledihRow((pdsedihDataSet.ttbledihRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Edih() { rowID = selectRowId }).ToList();
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
  