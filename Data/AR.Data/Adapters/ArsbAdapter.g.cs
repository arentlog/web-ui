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
    
namespace Infor.Sxe.AR.Data.Adapters
{
   using com.infor.sxproxy.arproxy;
   using com.infor.sxproxy.arproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsarsb;

   public partial class ArsbAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsarsb";
      private ARProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> arsbTableControlKey;
		
      private pdsarsbDataSet dataSet;
        
      public ArsbAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ARProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsarsbDataSet() { DataSetName = DataSetName };
            this.arsbTableControlKey = this.dataSet.ttblarsb.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.arsbTableControlKey))
            {
               this.CreateTableControlParameters(this.arsbTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ArsbAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Arsbproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poArsbproxy = this.proxyAppObject.CreatePO_arsbproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poArsbproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Arsbproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.arsbTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.arsbTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Arsbproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poArsbproxy = this.proxyAppObject.CreatePO_arsbproxy())
               {
                  this.SetRequiredContextParameters();
                  poArsbproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Arsbproxy - After Call");
      }
   

      public Arsb GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Arsb arsb = null;
         if (row != null)
         {
             arsb = this.BuildFromRow(row);
         }
         return arsb;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(arsb) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblarsb.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Arsb> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(arsb)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Arsb Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblarsb.AsEnumerable().SingleOrDefault();
         Arsb arsb = null;
         if (row != null)
         {
             arsb = this.BuildFromRow(row);
         }
         return arsb;
      }
	  
	  
      public IEnumerable<Arsb> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("arsb.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsb> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblarsb.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Arsb Get(int cono, string billingtype, string billingprimarykey, string billingsecondarykey, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsb.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(billingtype)) 
         {
             sb.AppendFormatWithEscape(" AND arsb.billingtype = '{0}'", billingtype);
         }
         if (!string.IsNullOrEmpty(billingprimarykey)) 
         {
             sb.AppendFormatWithEscape(" AND arsb.billingprimarykey = '{0}'", billingprimarykey);
         }
         if (!string.IsNullOrEmpty(billingsecondarykey)) 
         {
             sb.AppendFormatWithEscape(" AND arsb.billingsecondarykey = '{0}'", billingsecondarykey);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Arsb BuildFromRow(DataRow row)
      {
         var returnRecord = Arsb.BuildArsbFromRow(row);
         returnRecord = this.BuildExtraFromRow<Arsb>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Arsb record)
      {
         Arsb.UpdateRowFromArsb(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Arsb Insert(Arsb record)
      {
         DataRow row = this.dataSet.ttblarsb.NewttblarsbRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblarsb.AddttblarsbRow((pdsarsbDataSet.ttblarsbRow)row);
         this.SaveChanges();
         return this.dataSet.ttblarsb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsb.Rows[0]) : null;
      }
  

      public Arsb Update(Arsb record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblarsb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsb.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Arsb record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblarsb.NewttblarsbRow();
            Arsb.BuildMinimalRow(ref row, record);
            this.dataSet.ttblarsb.AddttblarsbRow((pdsarsbDataSet.ttblarsbRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Arsb() { rowID = selectRowId }).ToList();
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
  