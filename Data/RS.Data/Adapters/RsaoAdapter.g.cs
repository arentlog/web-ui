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
    
namespace Infor.Sxe.RS.Data.Adapters
{
   using com.infor.sxproxy.rsproxy;
   using com.infor.sxproxy.rsproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsrsao;

   public partial class RsaoAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsrsao";
      private RSProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> rsaoTableControlKey;
		
      private pdsrsaoDataSet dataSet;
        
      public RsaoAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new RSProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsrsaoDataSet() { DataSetName = DataSetName };
            this.rsaoTableControlKey = this.dataSet.ttblrsao.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.rsaoTableControlKey))
            {
               this.CreateTableControlParameters(this.rsaoTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in RsaoAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Rsaoproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poRsaoproxy = this.proxyAppObject.CreatePO_rsaoproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poRsaoproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Rsaoproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.rsaoTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.rsaoTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Rsaoproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poRsaoproxy = this.proxyAppObject.CreatePO_rsaoproxy())
               {
                  this.SetRequiredContextParameters();
                  poRsaoproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Rsaoproxy - After Call");
      }
   

      public Rsao GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Rsao rsao = null;
         if (row != null)
         {
             rsao = this.BuildFromRow(row);
         }
         return rsao;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(rsao) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblrsao.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Rsao> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(rsao)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Rsao Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblrsao.AsEnumerable().SingleOrDefault();
         Rsao rsao = null;
         if (row != null)
         {
             rsao = this.BuildFromRow(row);
         }
         return rsao;
      }
	  
	  

      public IEnumerable<Rsao> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblrsao.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Rsao Get(string rsoper, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rsoper)) 
         {
             sb.AppendFormatWithEscape("rsao.rsoper = '{0}'", rsoper);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Rsao BuildFromRow(DataRow row)
      {
         var returnRecord = Rsao.BuildRsaoFromRow(row);
         returnRecord = this.BuildExtraFromRow<Rsao>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Rsao record)
      {
         Rsao.UpdateRowFromRsao(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Rsao Insert(Rsao record)
      {
         DataRow row = this.dataSet.ttblrsao.NewttblrsaoRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblrsao.AddttblrsaoRow((pdsrsaoDataSet.ttblrsaoRow)row);
         this.SaveChanges();
         return this.dataSet.ttblrsao.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrsao.Rows[0]) : null;
      }
  

      public Rsao Update(Rsao record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblrsao.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrsao.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Rsao record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblrsao.NewttblrsaoRow();
            Rsao.BuildMinimalRow(ref row, record);
            this.dataSet.ttblrsao.AddttblrsaoRow((pdsrsaoDataSet.ttblrsaoRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Rsao() { rowID = selectRowId }).ToList();
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
  