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
    
namespace Infor.Sxe.TWL.Data.Adapters
{
   using com.infor.sxproxy.twlproxy;
   using com.infor.sxproxy.twlproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsstntbl;

   public partial class StntblAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsstntbl";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> stntblTableControlKey;
		
      private pdsstntblDataSet dataSet;
        
      public StntblAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsstntblDataSet() { DataSetName = DataSetName };
            this.stntblTableControlKey = this.dataSet.ttblstntbl.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.stntblTableControlKey))
            {
               this.CreateTableControlParameters(this.stntblTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in StntblAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Stntblproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poStntblproxy = this.proxyAppObject.CreatePO_stntblproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poStntblproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Stntblproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.stntblTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.stntblTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Stntblproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poStntblproxy = this.proxyAppObject.CreatePO_stntblproxy())
               {
                  this.SetRequiredContextParameters();
                  poStntblproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Stntblproxy - After Call");
      }
   

      public Stntbl GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Stntbl stntbl = null;
         if (row != null)
         {
             stntbl = this.BuildFromRow(row);
         }
         return stntbl;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(stntbl) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblstntbl.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Stntbl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(stntbl)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Stntbl Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblstntbl.AsEnumerable().SingleOrDefault();
         Stntbl stntbl = null;
         if (row != null)
         {
             stntbl = this.BuildFromRow(row);
         }
         return stntbl;
      }
	  
	  

      public IEnumerable<Stntbl> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblstntbl.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Stntbl Get(string coNum, string whNum, string stnNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("stntbl.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND stntbl.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(stnNum)) 
         {
             sb.AppendFormatWithEscape(" AND stntbl.stn_num = '{0}'", stnNum);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Stntbl BuildFromRow(DataRow row)
      {
         var returnRecord = Stntbl.BuildStntblFromRow(row);
         returnRecord = this.BuildExtraFromRow<Stntbl>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Stntbl record)
      {
         Stntbl.UpdateRowFromStntbl(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Stntbl Insert(Stntbl record)
      {
         DataRow row = this.dataSet.ttblstntbl.NewttblstntblRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblstntbl.AddttblstntblRow((pdsstntblDataSet.ttblstntblRow)row);
         this.SaveChanges();
         return this.dataSet.ttblstntbl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblstntbl.Rows[0]) : null;
      }
  

      public Stntbl Update(Stntbl record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblstntbl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblstntbl.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Stntbl record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblstntbl.NewttblstntblRow();
            Stntbl.BuildMinimalRow(ref row, record);
            this.dataSet.ttblstntbl.AddttblstntblRow((pdsstntblDataSet.ttblstntblRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Stntbl() { rowID = selectRowId }).ToList();
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
  