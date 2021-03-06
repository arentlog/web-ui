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
    
namespace Infor.Sxe.IC.Data.Adapters
{
   using com.infor.sxproxy.icproxy;
   using com.infor.sxproxy.icproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsiceab;

   public partial class IceabAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsiceab";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> iceabTableControlKey;
		
      private pdsiceabDataSet dataSet;
        
      public IceabAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsiceabDataSet() { DataSetName = DataSetName };
            this.iceabTableControlKey = this.dataSet.ttbliceab.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.iceabTableControlKey))
            {
               this.CreateTableControlParameters(this.iceabTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IceabAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Iceabproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIceabproxy = this.proxyAppObject.CreatePO_iceabproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIceabproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Iceabproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.iceabTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.iceabTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Iceabproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIceabproxy = this.proxyAppObject.CreatePO_iceabproxy())
               {
                  this.SetRequiredContextParameters();
                  poIceabproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Iceabproxy - After Call");
      }
   

      public Iceab GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Iceab iceab = null;
         if (row != null)
         {
             iceab = this.BuildFromRow(row);
         }
         return iceab;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(iceab) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbliceab.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Iceab> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(iceab)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Iceab Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbliceab.AsEnumerable().SingleOrDefault();
         Iceab iceab = null;
         if (row != null)
         {
             iceab = this.BuildFromRow(row);
         }
         return iceab;
      }
	  
	  
      public IEnumerable<Iceab> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("iceab.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Iceab> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbliceab.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Iceab Get(int cono, decimal custno, string shipto, string coreprod, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("iceab.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND iceab.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND iceab.shipto = '{0}'", shipto);
         }
         if (!string.IsNullOrEmpty(coreprod)) 
         {
             sb.AppendFormatWithEscape(" AND iceab.coreprod = '{0}'", coreprod);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND iceab.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND iceab.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND iceab.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Iceab> GetListByCoreprod(int cono, string coreprod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("iceab.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(coreprod)) 
         {
             sb.AppendFormatWithEscape(" AND iceab.coreprod = '{0}'", coreprod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Iceab> GetListByOrder(int cono, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("iceab.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND iceab.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND iceab.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND iceab.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Iceab BuildFromRow(DataRow row)
      {
         var returnRecord = Iceab.BuildIceabFromRow(row);
         returnRecord = this.BuildExtraFromRow<Iceab>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Iceab record)
      {
         Iceab.UpdateRowFromIceab(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Iceab Insert(Iceab record)
      {
         DataRow row = this.dataSet.ttbliceab.NewttbliceabRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbliceab.AddttbliceabRow((pdsiceabDataSet.ttbliceabRow)row);
         this.SaveChanges();
         return this.dataSet.ttbliceab.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbliceab.Rows[0]) : null;
      }
  

      public Iceab Update(Iceab record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbliceab.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbliceab.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Iceab record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbliceab.NewttbliceabRow();
            Iceab.BuildMinimalRow(ref row, record);
            this.dataSet.ttbliceab.AddttbliceabRow((pdsiceabDataSet.ttbliceabRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Iceab() { rowID = selectRowId }).ToList();
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
  