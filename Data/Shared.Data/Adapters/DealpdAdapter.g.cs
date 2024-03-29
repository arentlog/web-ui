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
   using Models.Pdsdealpd;

   public partial class DealpdAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsdealpd";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> dealpdTableControlKey;
		
      private pdsdealpdDataSet dataSet;
        
      public DealpdAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsdealpdDataSet() { DataSetName = DataSetName };
            this.dealpdTableControlKey = this.dataSet.ttbldealpd.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.dealpdTableControlKey))
            {
               this.CreateTableControlParameters(this.dealpdTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in DealpdAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Dealpdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poDealpdproxy = this.proxyAppObject.CreatePO_dealpdproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poDealpdproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Dealpdproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.dealpdTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.dealpdTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Dealpdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poDealpdproxy = this.proxyAppObject.CreatePO_dealpdproxy())
               {
                  this.SetRequiredContextParameters();
                  poDealpdproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Dealpdproxy - After Call");
      }
   

      public Dealpd GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Dealpd dealpd = null;
         if (row != null)
         {
             dealpd = this.BuildFromRow(row);
         }
         return dealpd;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(dealpd) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbldealpd.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Dealpd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(dealpd)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Dealpd Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbldealpd.AsEnumerable().SingleOrDefault();
         Dealpd dealpd = null;
         if (row != null)
         {
             dealpd = this.BuildFromRow(row);
         }
         return dealpd;
      }
	  
	  
      public IEnumerable<Dealpd> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("dealpd.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Dealpd> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbldealpd.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Dealpd Get(int cono, int dealrecno, string pdtype, string pdentity, bool varfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("dealpd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (dealrecno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND dealpd.dealrecno = {0}", dealrecno);
         }
         if (!string.IsNullOrEmpty(pdtype)) 
         {
             sb.AppendFormatWithEscape(" AND dealpd.pdtype = '{0}'", pdtype);
         }
         if (!string.IsNullOrEmpty(pdentity)) 
         {
             sb.AppendFormatWithEscape(" AND dealpd.pdentity = '{0}'", pdentity);
         }
         sb.AppendFormatWithEscape(" AND dealpd.varfl = {0}", varfl);
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Dealpd> GetListByEntity(int cono, string pdtype, string pdentity, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("dealpd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(pdtype)) 
         {
             sb.AppendFormatWithEscape(" AND dealpd.pdtype = '{0}'", pdtype);
         }
         if (!string.IsNullOrEmpty(pdentity)) 
         {
             sb.AppendFormatWithEscape(" AND dealpd.pdentity = '{0}'", pdentity);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Dealpd BuildFromRow(DataRow row)
      {
         var returnRecord = Dealpd.BuildDealpdFromRow(row);
         returnRecord = this.BuildExtraFromRow<Dealpd>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Dealpd record)
      {
         Dealpd.UpdateRowFromDealpd(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Dealpd Insert(Dealpd record)
      {
         DataRow row = this.dataSet.ttbldealpd.NewttbldealpdRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbldealpd.AddttbldealpdRow((pdsdealpdDataSet.ttbldealpdRow)row);
         this.SaveChanges();
         return this.dataSet.ttbldealpd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldealpd.Rows[0]) : null;
      }
  

      public Dealpd Update(Dealpd record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbldealpd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldealpd.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Dealpd record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbldealpd.NewttbldealpdRow();
            Dealpd.BuildMinimalRow(ref row, record);
            this.dataSet.ttbldealpd.AddttbldealpdRow((pdsdealpdDataSet.ttbldealpdRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Dealpd() { rowID = selectRowId }).ToList();
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
  