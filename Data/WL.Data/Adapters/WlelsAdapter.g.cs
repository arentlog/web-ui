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
    
namespace Infor.Sxe.WL.Data.Adapters
{
   using com.infor.sxproxy.wlproxy;
   using com.infor.sxproxy.wlproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdswlels;

   public partial class WlelsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdswlels";
      private WLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> wlelsTableControlKey;
		
      private pdswlelsDataSet dataSet;
        
      public WlelsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new WLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdswlelsDataSet() { DataSetName = DataSetName };
            this.wlelsTableControlKey = this.dataSet.ttblwlels.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.wlelsTableControlKey))
            {
               this.CreateTableControlParameters(this.wlelsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in WlelsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Wlelsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poWlelsproxy = this.proxyAppObject.CreatePO_wlelsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poWlelsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Wlelsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.wlelsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.wlelsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Wlelsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poWlelsproxy = this.proxyAppObject.CreatePO_wlelsproxy())
               {
                  this.SetRequiredContextParameters();
                  poWlelsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Wlelsproxy - After Call");
      }
   

      public Wlels GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Wlels wlels = null;
         if (row != null)
         {
             wlels = this.BuildFromRow(row);
         }
         return wlels;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(wlels) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblwlels.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Wlels> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(wlels)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Wlels Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblwlels.AsEnumerable().SingleOrDefault();
         Wlels wlels = null;
         if (row != null)
         {
             wlels = this.BuildFromRow(row);
         }
         return wlels;
      }
	  
	  
      public IEnumerable<Wlels> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("wlels.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Wlels> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblwlels.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Wlels Get(int cono, string whse, string setno, string ordertype, int orderno, int ordersuf, int lineno, int seqno, string serlottype, string serlotno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wlels.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(setno)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.setno = '{0}'", setno);
         }
         if (!string.IsNullOrEmpty(ordertype)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.ordertype = '{0}'", ordertype);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.seqno = {0}", seqno);
         }
         if (!string.IsNullOrEmpty(serlottype)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.serlottype = '{0}'", serlottype);
         }
         if (!string.IsNullOrEmpty(serlotno)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.serlotno = '{0}'", serlotno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Wlels> GetListByOrder(int cono, string whse, string ordertype, int orderno, int ordersuf, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wlels.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(ordertype)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.ordertype = '{0}'", ordertype);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND wlels.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Wlels> GetListByProd(int cono, string whse, string setno, string prod, string serlottype, string serlotno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wlels.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(setno)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.setno = '{0}'", setno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(serlottype)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.serlottype = '{0}'", serlottype);
         }
         if (!string.IsNullOrEmpty(serlotno)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.serlotno = '{0}'", serlotno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Wlels> GetListByProd2(int cono, string prod, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wlels.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND wlels.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Wlels BuildFromRow(DataRow row)
      {
         var returnRecord = Wlels.BuildWlelsFromRow(row);
         returnRecord = this.BuildExtraFromRow<Wlels>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Wlels record)
      {
         Wlels.UpdateRowFromWlels(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Wlels Insert(Wlels record)
      {
         DataRow row = this.dataSet.ttblwlels.NewttblwlelsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblwlels.AddttblwlelsRow((pdswlelsDataSet.ttblwlelsRow)row);
         this.SaveChanges();
         return this.dataSet.ttblwlels.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblwlels.Rows[0]) : null;
      }
  

      public Wlels Update(Wlels record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblwlels.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblwlels.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Wlels record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblwlels.NewttblwlelsRow();
            Wlels.BuildMinimalRow(ref row, record);
            this.dataSet.ttblwlels.AddttblwlelsRow((pdswlelsDataSet.ttblwlelsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Wlels() { rowID = selectRowId }).ToList();
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
  