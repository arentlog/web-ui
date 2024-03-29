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
   using Models.Pdslostbus;

   public partial class LostbusAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdslostbus";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> lostbusTableControlKey;
		
      private pdslostbusDataSet dataSet;
        
      public LostbusAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdslostbusDataSet() { DataSetName = DataSetName };
            this.lostbusTableControlKey = this.dataSet.ttbllostbus.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.lostbusTableControlKey))
            {
               this.CreateTableControlParameters(this.lostbusTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in LostbusAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Lostbusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poLostbusproxy = this.proxyAppObject.CreatePO_lostbusproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poLostbusproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Lostbusproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.lostbusTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.lostbusTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Lostbusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poLostbusproxy = this.proxyAppObject.CreatePO_lostbusproxy())
               {
                  this.SetRequiredContextParameters();
                  poLostbusproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Lostbusproxy - After Call");
      }
   

      public Lostbus GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Lostbus lostbus = null;
         if (row != null)
         {
             lostbus = this.BuildFromRow(row);
         }
         return lostbus;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(lostbus) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbllostbus.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Lostbus> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(lostbus)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Lostbus Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbllostbus.AsEnumerable().SingleOrDefault();
         Lostbus lostbus = null;
         if (row != null)
         {
             lostbus = this.BuildFromRow(row);
         }
         return lostbus;
      }
	  
	  
      public IEnumerable<Lostbus> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("lostbus.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Lostbus> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbllostbus.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Lostbus Get(int cono, string whse, string prod, decimal seq, DateTime? postdt, string transtype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("lostbus.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.prod = '{0}'", prod);
         }
         if (seq != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.seq = {0}", seq);
         }
         if (postdt != null) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.postdt = '{0}'", postdt);
         }
         if (!string.IsNullOrEmpty(transtype)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.transtype = '{0}'", transtype);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Lostbus> GetListByCustno(int cono, decimal custno, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("lostbus.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Lostbus> GetListByLostbusty(int cono, string lostbusty, string whse, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("lostbus.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(lostbusty)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.lostbusty = '{0}'", lostbusty);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Lostbus> GetListByProd(int cono, string prod, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("lostbus.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Lostbus> GetListByUsagefl(int cono, bool usagefl, bool mergedfl, string whse, string prod, DateTime? postdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("lostbus.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND lostbus.usagefl = {0}", usagefl);
         sb.AppendFormatWithEscape(" AND lostbus.mergedfl = {0}", mergedfl);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.prod = '{0}'", prod);
         }
         if (postdt != null) 
         {
             sb.AppendFormatWithEscape(" AND lostbus.postdt = '{0}'", postdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Lostbus BuildFromRow(DataRow row)
      {
         var returnRecord = Lostbus.BuildLostbusFromRow(row);
         returnRecord = this.BuildExtraFromRow<Lostbus>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Lostbus record)
      {
         Lostbus.UpdateRowFromLostbus(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Lostbus Insert(Lostbus record)
      {
         DataRow row = this.dataSet.ttbllostbus.NewttbllostbusRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbllostbus.AddttbllostbusRow((pdslostbusDataSet.ttbllostbusRow)row);
         this.SaveChanges();
         return this.dataSet.ttbllostbus.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbllostbus.Rows[0]) : null;
      }
  

      public Lostbus Update(Lostbus record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbllostbus.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbllostbus.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Lostbus record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbllostbus.NewttbllostbusRow();
            Lostbus.BuildMinimalRow(ref row, record);
            this.dataSet.ttbllostbus.AddttbllostbusRow((pdslostbusDataSet.ttbllostbusRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Lostbus() { rowID = selectRowId }).ToList();
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
  