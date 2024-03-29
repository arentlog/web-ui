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
    
namespace Infor.Sxe.SM.Data.Adapters
{
   using com.infor.sxproxy.smproxy;
   using com.infor.sxproxy.smproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssmsm;

   public partial class SmsmAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssmsm";
      private SMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> smsmTableControlKey;
		
      private pdssmsmDataSet dataSet;
        
      public SmsmAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssmsmDataSet() { DataSetName = DataSetName };
            this.smsmTableControlKey = this.dataSet.ttblsmsm.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.smsmTableControlKey))
            {
               this.CreateTableControlParameters(this.smsmTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SmsmAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Smsmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSmsmproxy = this.proxyAppObject.CreatePO_smsmproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSmsmproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Smsmproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.smsmTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.smsmTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Smsmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSmsmproxy = this.proxyAppObject.CreatePO_smsmproxy())
               {
                  this.SetRequiredContextParameters();
                  poSmsmproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Smsmproxy - After Call");
      }
   

      public Smsm GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Smsm smsm = null;
         if (row != null)
         {
             smsm = this.BuildFromRow(row);
         }
         return smsm;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(smsm) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsmsm.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Smsm> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(smsm)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Smsm Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsmsm.AsEnumerable().SingleOrDefault();
         Smsm smsm = null;
         if (row != null)
         {
             smsm = this.BuildFromRow(row);
         }
         return smsm;
      }
	  
	  
      public IEnumerable<Smsm> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("smsm.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Smsm> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsmsm.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Smsm Get(int cono, string commtype, string slsrep, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("smsm.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(commtype)) 
         {
             sb.AppendFormatWithEscape(" AND smsm.commtype = '{0}'", commtype);
         }
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape(" AND smsm.slsrep = '{0}'", slsrep);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Smsm BuildFromRow(DataRow row)
      {
         var returnRecord = Smsm.BuildSmsmFromRow(row);
         returnRecord = this.BuildExtraFromRow<Smsm>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Smsm record)
      {
         Smsm.UpdateRowFromSmsm(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Smsm Insert(Smsm record)
      {
         DataRow row = this.dataSet.ttblsmsm.NewttblsmsmRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsmsm.AddttblsmsmRow((pdssmsmDataSet.ttblsmsmRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsmsm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsmsm.Rows[0]) : null;
      }
  

      public Smsm Update(Smsm record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsmsm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsmsm.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Smsm record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsmsm.NewttblsmsmRow();
            Smsm.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsmsm.AddttblsmsmRow((pdssmsmDataSet.ttblsmsmRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Smsm() { rowID = selectRowId }).ToList();
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
  