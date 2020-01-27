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
   using Models.Pdsoefill;

   public partial class OefillAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsoefill";
      private OEProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> oefillTableControlKey;
		
      private pdsoefillDataSet dataSet;
        
      public OefillAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OEProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsoefillDataSet() { DataSetName = DataSetName };
            this.oefillTableControlKey = this.dataSet.ttbloefill.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.oefillTableControlKey))
            {
               this.CreateTableControlParameters(this.oefillTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OefillAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Oefillproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOefillproxy = this.proxyAppObject.CreatePO_oefillproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOefillproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Oefillproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.oefillTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.oefillTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Oefillproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOefillproxy = this.proxyAppObject.CreatePO_oefillproxy())
               {
                  this.SetRequiredContextParameters();
                  poOefillproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Oefillproxy - After Call");
      }
   

      public Oefill GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Oefill oefill = null;
         if (row != null)
         {
             oefill = this.BuildFromRow(row);
         }
         return oefill;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(oefill) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbloefill.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Oefill> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(oefill)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Oefill Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbloefill.AsEnumerable().SingleOrDefault();
         Oefill oefill = null;
         if (row != null)
         {
             oefill = this.BuildFromRow(row);
         }
         return oefill;
      }
	  
	  
      public IEnumerable<Oefill> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("oefill.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oefill> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbloefill.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Oefill Get(int cono, string oper2, string reportnm, string processty, int pickprno, DateTime? reqshipdt, string ordertype, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oefill.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(oper2)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.oper2 = '{0}'", oper2);
         }
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.reportnm = '{0}'", reportnm);
         }
         if (!string.IsNullOrEmpty(processty)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.processty = '{0}'", processty);
         }
         if (pickprno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.pickprno = {0}", pickprno);
         }
         if (reqshipdt != null) 
         {
             sb.AppendFormatWithEscape(" AND oefill.reqshipdt = '{0}'", reqshipdt);
         }
         if (!string.IsNullOrEmpty(ordertype)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.ordertype = '{0}'", ordertype);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Oefill> GetListByOrder(int cono, string oper2, string reportnm, string processty, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oefill.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(oper2)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.oper2 = '{0}'", oper2);
         }
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.reportnm = '{0}'", reportnm);
         }
         if (!string.IsNullOrEmpty(processty)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.processty = '{0}'", processty);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oefill> GetListByProd(int cono, string oper2, string reportnm, string processty, string prod, int pickprno, DateTime? reqshipdt, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oefill.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(oper2)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.oper2 = '{0}'", oper2);
         }
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.reportnm = '{0}'", reportnm);
         }
         if (!string.IsNullOrEmpty(processty)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.processty = '{0}'", processty);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND oefill.prod = '{0}'", prod);
         }
         if (pickprno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.pickprno = {0}", pickprno);
         }
         if (reqshipdt != null) 
         {
             sb.AppendFormatWithEscape(" AND oefill.reqshipdt = '{0}'", reqshipdt);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oefill.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Oefill BuildFromRow(DataRow row)
      {
         var returnRecord = Oefill.BuildOefillFromRow(row);
         returnRecord = this.BuildExtraFromRow<Oefill>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Oefill record)
      {
         Oefill.UpdateRowFromOefill(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Oefill Insert(Oefill record)
      {
         DataRow row = this.dataSet.ttbloefill.NewttbloefillRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbloefill.AddttbloefillRow((pdsoefillDataSet.ttbloefillRow)row);
         this.SaveChanges();
         return this.dataSet.ttbloefill.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloefill.Rows[0]) : null;
      }
  

      public Oefill Update(Oefill record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbloefill.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloefill.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Oefill record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbloefill.NewttbloefillRow();
            Oefill.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloefill.AddttbloefillRow((pdsoefillDataSet.ttbloefillRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Oefill() { rowID = selectRowId }).ToList();
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
  