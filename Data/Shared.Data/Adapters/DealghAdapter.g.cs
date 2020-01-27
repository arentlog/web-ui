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
   using Models.Pdsdealgh;

   public partial class DealghAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsdealgh";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> dealghTableControlKey;
		
      private pdsdealghDataSet dataSet;
        
      public DealghAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsdealghDataSet() { DataSetName = DataSetName };
            this.dealghTableControlKey = this.dataSet.ttbldealgh.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.dealghTableControlKey))
            {
               this.CreateTableControlParameters(this.dealghTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in DealghAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Dealghproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poDealghproxy = this.proxyAppObject.CreatePO_dealghproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poDealghproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Dealghproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.dealghTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.dealghTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Dealghproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poDealghproxy = this.proxyAppObject.CreatePO_dealghproxy())
               {
                  this.SetRequiredContextParameters();
                  poDealghproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Dealghproxy - After Call");
      }
   

      public Dealgh GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Dealgh dealgh = null;
         if (row != null)
         {
             dealgh = this.BuildFromRow(row);
         }
         return dealgh;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(dealgh) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbldealgh.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Dealgh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(dealgh)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Dealgh Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbldealgh.AsEnumerable().SingleOrDefault();
         Dealgh dealgh = null;
         if (row != null)
         {
             dealgh = this.BuildFromRow(row);
         }
         return dealgh;
      }
	  
	  
      public IEnumerable<Dealgh> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("dealgh.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Dealgh> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbldealgh.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Dealgh Get(int cono, string groupnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("dealgh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND dealgh.groupnm = '{0}'", groupnm);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Dealgh> GetListByGrouptype(int cono, string grouptype, string groupnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("dealgh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(grouptype)) 
         {
             sb.AppendFormatWithEscape(" AND dealgh.grouptype = '{0}'", grouptype);
         }
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND dealgh.groupnm = '{0}'", groupnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Dealgh BuildFromRow(DataRow row)
      {
         var returnRecord = Dealgh.BuildDealghFromRow(row);
         returnRecord = this.BuildExtraFromRow<Dealgh>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Dealgh record)
      {
         Dealgh.UpdateRowFromDealgh(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Dealgh Insert(Dealgh record)
      {
         DataRow row = this.dataSet.ttbldealgh.NewttbldealghRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbldealgh.AddttbldealghRow((pdsdealghDataSet.ttbldealghRow)row);
         this.SaveChanges();
         return this.dataSet.ttbldealgh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldealgh.Rows[0]) : null;
      }
  

      public Dealgh Update(Dealgh record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbldealgh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldealgh.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Dealgh record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbldealgh.NewttbldealghRow();
            Dealgh.BuildMinimalRow(ref row, record);
            this.dataSet.ttbldealgh.AddttbldealghRow((pdsdealghDataSet.ttbldealghRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Dealgh() { rowID = selectRowId }).ToList();
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
  