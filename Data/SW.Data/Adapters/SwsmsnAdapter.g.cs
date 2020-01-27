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
    
namespace Infor.Sxe.SW.Data.Adapters
{
   using com.infor.sxproxy.swproxy;
   using com.infor.sxproxy.swproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsswsmsn;

   public partial class SwsmsnAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsswsmsn";
      private SWProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> swsmsnTableControlKey;
		
      private pdsswsmsnDataSet dataSet;
        
      public SwsmsnAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SWProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsswsmsnDataSet() { DataSetName = DataSetName };
            this.swsmsnTableControlKey = this.dataSet.ttblswsmsn.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.swsmsnTableControlKey))
            {
               this.CreateTableControlParameters(this.swsmsnTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SwsmsnAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Swsmsnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSwsmsnproxy = this.proxyAppObject.CreatePO_swsmsnproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSwsmsnproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Swsmsnproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.swsmsnTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.swsmsnTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Swsmsnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSwsmsnproxy = this.proxyAppObject.CreatePO_swsmsnproxy())
               {
                  this.SetRequiredContextParameters();
                  poSwsmsnproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Swsmsnproxy - After Call");
      }
   

      public Swsmsn GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Swsmsn swsmsn = null;
         if (row != null)
         {
             swsmsn = this.BuildFromRow(row);
         }
         return swsmsn;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(swsmsn) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblswsmsn.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Swsmsn> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(swsmsn)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Swsmsn Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblswsmsn.AsEnumerable().SingleOrDefault();
         Swsmsn swsmsn = null;
         if (row != null)
         {
             swsmsn = this.BuildFromRow(row);
         }
         return swsmsn;
      }
	  
	  
      public IEnumerable<Swsmsn> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("swsmsn.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Swsmsn> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblswsmsn.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Swsmsn Get(int cono, string slsrep, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swsmsn.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape(" AND swsmsn.slsrep = '{0}'", slsrep);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Swsmsn> GetListByEmptype(int cono, string emptype, string slsrep, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swsmsn.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(emptype)) 
         {
             sb.AppendFormatWithEscape(" AND swsmsn.emptype = '{0}'", emptype);
         }
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape(" AND swsmsn.slsrep = '{0}'", slsrep);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Swsmsn> GetListByStatustype(int cono, bool statustype, string whse, int deptno, string slsrep, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swsmsn.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND swsmsn.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND swsmsn.whse = '{0}'", whse);
         }
         if (deptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND swsmsn.deptno = {0}", deptno);
         }
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape(" AND swsmsn.slsrep = '{0}'", slsrep);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Swsmsn BuildFromRow(DataRow row)
      {
         var returnRecord = Swsmsn.BuildSwsmsnFromRow(row);
         returnRecord = this.BuildExtraFromRow<Swsmsn>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Swsmsn record)
      {
         Swsmsn.UpdateRowFromSwsmsn(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Swsmsn Insert(Swsmsn record)
      {
         DataRow row = this.dataSet.ttblswsmsn.NewttblswsmsnRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblswsmsn.AddttblswsmsnRow((pdsswsmsnDataSet.ttblswsmsnRow)row);
         this.SaveChanges();
         return this.dataSet.ttblswsmsn.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswsmsn.Rows[0]) : null;
      }
  

      public Swsmsn Update(Swsmsn record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblswsmsn.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswsmsn.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Swsmsn record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblswsmsn.NewttblswsmsnRow();
            Swsmsn.BuildMinimalRow(ref row, record);
            this.dataSet.ttblswsmsn.AddttblswsmsnRow((pdsswsmsnDataSet.ttblswsmsnRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Swsmsn() { rowID = selectRowId }).ToList();
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
  