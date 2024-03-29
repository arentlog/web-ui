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
   using Models.Pdsaodata;

   public partial class AodataAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsaodata";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> aodataTableControlKey;
		
      private pdsaodataDataSet dataSet;
        
      public AodataAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsaodataDataSet() { DataSetName = DataSetName };
            this.aodataTableControlKey = this.dataSet.ttblaodata.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.aodataTableControlKey))
            {
               this.CreateTableControlParameters(this.aodataTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AodataAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Aodataproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poAodataproxy = this.proxyAppObject.CreatePO_aodataproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poAodataproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Aodataproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.aodataTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.aodataTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Aodataproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAodataproxy = this.proxyAppObject.CreatePO_aodataproxy())
               {
                  this.SetRequiredContextParameters();
                  poAodataproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Aodataproxy - After Call");
      }
   

      public Aodata GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Aodata aodata = null;
         if (row != null)
         {
             aodata = this.BuildFromRow(row);
         }
         return aodata;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(aodata) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblaodata.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Aodata> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(aodata)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Aodata Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblaodata.AsEnumerable().SingleOrDefault();
         Aodata aodata = null;
         if (row != null)
         {
             aodata = this.BuildFromRow(row);
         }
         return aodata;
      }
	  
	  
      public IEnumerable<Aodata> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("aodata.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aodata> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblaodata.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Aodata Get(int cono, string recordtype, string fieldname, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aodata.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(recordtype)) 
         {
             sb.AppendFormatWithEscape(" AND aodata.recordtype = '{0}'", recordtype);
         }
         if (!string.IsNullOrEmpty(fieldname)) 
         {
             sb.AppendFormatWithEscape(" AND aodata.fieldname = '{0}'", fieldname);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Aodata BuildFromRow(DataRow row)
      {
         var returnRecord = Aodata.BuildAodataFromRow(row);
         returnRecord = this.BuildExtraFromRow<Aodata>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Aodata record)
      {
         Aodata.UpdateRowFromAodata(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Aodata Insert(Aodata record)
      {
         DataRow row = this.dataSet.ttblaodata.NewttblaodataRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblaodata.AddttblaodataRow((pdsaodataDataSet.ttblaodataRow)row);
         this.SaveChanges();
         return this.dataSet.ttblaodata.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblaodata.Rows[0]) : null;
      }
  

      public Aodata Update(Aodata record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblaodata.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblaodata.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Aodata record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblaodata.NewttblaodataRow();
            Aodata.BuildMinimalRow(ref row, record);
            this.dataSet.ttblaodata.AddttblaodataRow((pdsaodataDataSet.ttblaodataRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Aodata() { rowID = selectRowId }).ToList();
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
  