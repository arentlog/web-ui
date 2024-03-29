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
    
namespace Infor.Sxe.SA.Data.Adapters
{
   using com.infor.sxproxy.saproxy;
   using com.infor.sxproxy.saproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssasc;

   public partial class SascAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssasc";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sascTableControlKey;
		
      private pdssascDataSet dataSet;
        
      public SascAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssascDataSet() { DataSetName = DataSetName };
            this.sascTableControlKey = this.dataSet.ttblsasc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sascTableControlKey))
            {
               this.CreateTableControlParameters(this.sascTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SascAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sascproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSascproxy = this.proxyAppObject.CreatePO_sascproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSascproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sascproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sascTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sascTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sascproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSascproxy = this.proxyAppObject.CreatePO_sascproxy())
               {
                  this.SetRequiredContextParameters();
                  poSascproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sascproxy - After Call");
      }
   

      public Sasc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sasc sasc = null;
         if (row != null)
         {
             sasc = this.BuildFromRow(row);
         }
         return sasc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sasc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsasc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sasc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sasc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sasc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsasc.AsEnumerable().SingleOrDefault();
         Sasc sasc = null;
         if (row != null)
         {
             sasc = this.BuildFromRow(row);
         }
         return sasc;
      }
	  
	  
      public IEnumerable<Sasc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sasc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsasc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sasc Get(int cono, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Sasc BuildFromRow(DataRow row)
      {
         var returnRecord = Sasc.BuildSascFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sasc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sasc record)
      {
         Sasc.UpdateRowFromSasc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sasc Insert(Sasc record)
      {
         DataRow row = this.dataSet.ttblsasc.NewttblsascRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsasc.AddttblsascRow((pdssascDataSet.ttblsascRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsasc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasc.Rows[0]) : null;
      }
  

      public Sasc Update(Sasc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsasc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sasc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsasc.NewttblsascRow();
            Sasc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsasc.AddttblsascRow((pdssascDataSet.ttblsascRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sasc() { rowID = selectRowId }).ToList();
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
  