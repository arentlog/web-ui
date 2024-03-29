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
   using Models.Pdssastp;

   public partial class SastpAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssastp";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sastpTableControlKey;
		
      private pdssastpDataSet dataSet;
        
      public SastpAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssastpDataSet() { DataSetName = DataSetName };
            this.sastpTableControlKey = this.dataSet.ttblsastp.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sastpTableControlKey))
            {
               this.CreateTableControlParameters(this.sastpTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SastpAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sastpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSastpproxy = this.proxyAppObject.CreatePO_sastpproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSastpproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sastpproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sastpTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sastpTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sastpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSastpproxy = this.proxyAppObject.CreatePO_sastpproxy())
               {
                  this.SetRequiredContextParameters();
                  poSastpproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sastpproxy - After Call");
      }
   

      public Sastp GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sastp sastp = null;
         if (row != null)
         {
             sastp = this.BuildFromRow(row);
         }
         return sastp;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sastp) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsastp.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sastp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sastp)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sastp Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsastp.AsEnumerable().SingleOrDefault();
         Sastp sastp = null;
         if (row != null)
         {
             sastp = this.BuildFromRow(row);
         }
         return sastp;
      }
	  
	  
      public IEnumerable<Sastp> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sastp.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sastp> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsastp.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sastp Get(int cono, int processno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sastp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (processno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sastp.processno = {0}", processno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Sastp BuildFromRow(DataRow row)
      {
         var returnRecord = Sastp.BuildSastpFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sastp>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sastp record)
      {
         Sastp.UpdateRowFromSastp(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sastp Insert(Sastp record)
      {
         DataRow row = this.dataSet.ttblsastp.NewttblsastpRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsastp.AddttblsastpRow((pdssastpDataSet.ttblsastpRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsastp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsastp.Rows[0]) : null;
      }
  

      public Sastp Update(Sastp record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsastp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsastp.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sastp record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsastp.NewttblsastpRow();
            Sastp.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsastp.AddttblsastpRow((pdssastpDataSet.ttblsastpRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sastp() { rowID = selectRowId }).ToList();
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
  