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
   using Models.Pdsswapet;

   public partial class SwapetAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsswapet";
      private SWProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> swapetTableControlKey;
		
      private pdsswapetDataSet dataSet;
        
      public SwapetAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SWProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsswapetDataSet() { DataSetName = DataSetName };
            this.swapetTableControlKey = this.dataSet.ttblswapet.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.swapetTableControlKey))
            {
               this.CreateTableControlParameters(this.swapetTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SwapetAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Swapetproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSwapetproxy = this.proxyAppObject.CreatePO_swapetproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSwapetproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Swapetproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.swapetTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.swapetTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Swapetproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSwapetproxy = this.proxyAppObject.CreatePO_swapetproxy())
               {
                  this.SetRequiredContextParameters();
                  poSwapetproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Swapetproxy - After Call");
      }
   

      public Swapet GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Swapet swapet = null;
         if (row != null)
         {
             swapet = this.BuildFromRow(row);
         }
         return swapet;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(swapet) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblswapet.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Swapet> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(swapet)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Swapet Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblswapet.AsEnumerable().SingleOrDefault();
         Swapet swapet = null;
         if (row != null)
         {
             swapet = this.BuildFromRow(row);
         }
         return swapet;
      }
	  
	  
      public IEnumerable<Swapet> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("swapet.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Swapet> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblswapet.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Swapet Get(int cono, int jrnlno, int setno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("swapet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND swapet.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND swapet.setno = {0}", setno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Swapet BuildFromRow(DataRow row)
      {
         var returnRecord = Swapet.BuildSwapetFromRow(row);
         returnRecord = this.BuildExtraFromRow<Swapet>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Swapet record)
      {
         Swapet.UpdateRowFromSwapet(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Swapet Insert(Swapet record)
      {
         DataRow row = this.dataSet.ttblswapet.NewttblswapetRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblswapet.AddttblswapetRow((pdsswapetDataSet.ttblswapetRow)row);
         this.SaveChanges();
         return this.dataSet.ttblswapet.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswapet.Rows[0]) : null;
      }
  

      public Swapet Update(Swapet record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblswapet.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblswapet.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Swapet record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblswapet.NewttblswapetRow();
            Swapet.BuildMinimalRow(ref row, record);
            this.dataSet.ttblswapet.AddttblswapetRow((pdsswapetDataSet.ttblswapetRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Swapet() { rowID = selectRowId }).ToList();
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
  