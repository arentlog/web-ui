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
    
namespace Infor.Sxe.BP.Data.Adapters
{
   using com.infor.sxproxy.bpproxy;
   using com.infor.sxproxy.bpproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsbpsc;

   public partial class BpscAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsbpsc";
      private BPProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> bpscTableControlKey;
		
      private pdsbpscDataSet dataSet;
        
      public BpscAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new BPProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsbpscDataSet() { DataSetName = DataSetName };
            this.bpscTableControlKey = this.dataSet.ttblbpsc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.bpscTableControlKey))
            {
               this.CreateTableControlParameters(this.bpscTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in BpscAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Bpscproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poBpscproxy = this.proxyAppObject.CreatePO_bpscproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poBpscproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Bpscproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.bpscTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.bpscTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Bpscproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poBpscproxy = this.proxyAppObject.CreatePO_bpscproxy())
               {
                  this.SetRequiredContextParameters();
                  poBpscproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Bpscproxy - After Call");
      }
   

      public Bpsc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Bpsc bpsc = null;
         if (row != null)
         {
             bpsc = this.BuildFromRow(row);
         }
         return bpsc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(bpsc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblbpsc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Bpsc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(bpsc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Bpsc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblbpsc.AsEnumerable().SingleOrDefault();
         Bpsc bpsc = null;
         if (row != null)
         {
             bpsc = this.BuildFromRow(row);
         }
         return bpsc;
      }
	  
	  
      public IEnumerable<Bpsc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("bpsc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Bpsc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblbpsc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Bpsc Get(int cono, string itemid, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("bpsc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(itemid)) 
         {
             sb.AppendFormatWithEscape(" AND bpsc.itemid = '{0}'", itemid);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpsc.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Bpsc BuildFromRow(DataRow row)
      {
         var returnRecord = Bpsc.BuildBpscFromRow(row);
         returnRecord = this.BuildExtraFromRow<Bpsc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Bpsc record)
      {
         Bpsc.UpdateRowFromBpsc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Bpsc Insert(Bpsc record)
      {
         DataRow row = this.dataSet.ttblbpsc.NewttblbpscRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblbpsc.AddttblbpscRow((pdsbpscDataSet.ttblbpscRow)row);
         this.SaveChanges();
         return this.dataSet.ttblbpsc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbpsc.Rows[0]) : null;
      }
  

      public Bpsc Update(Bpsc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblbpsc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbpsc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Bpsc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblbpsc.NewttblbpscRow();
            Bpsc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblbpsc.AddttblbpscRow((pdsbpscDataSet.ttblbpscRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Bpsc() { rowID = selectRowId }).ToList();
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
  