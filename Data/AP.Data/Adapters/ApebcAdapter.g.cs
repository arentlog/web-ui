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
    
namespace Infor.Sxe.AP.Data.Adapters
{
   using com.infor.sxproxy.approxy;
   using com.infor.sxproxy.approxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsapebc;

   public partial class ApebcAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsapebc";
      private APProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> apebcTableControlKey;
		
      private pdsapebcDataSet dataSet;
        
      public ApebcAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new APProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsapebcDataSet() { DataSetName = DataSetName };
            this.apebcTableControlKey = this.dataSet.ttblapebc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.apebcTableControlKey))
            {
               this.CreateTableControlParameters(this.apebcTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ApebcAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Apebcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poApebcproxy = this.proxyAppObject.CreatePO_apebcproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poApebcproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Apebcproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.apebcTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.apebcTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Apebcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poApebcproxy = this.proxyAppObject.CreatePO_apebcproxy())
               {
                  this.SetRequiredContextParameters();
                  poApebcproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Apebcproxy - After Call");
      }
   

      public Apebc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Apebc apebc = null;
         if (row != null)
         {
             apebc = this.BuildFromRow(row);
         }
         return apebc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(apebc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblapebc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Apebc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(apebc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Apebc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblapebc.AsEnumerable().SingleOrDefault();
         Apebc apebc = null;
         if (row != null)
         {
             apebc = this.BuildFromRow(row);
         }
         return apebc;
      }
	  
	  
      public IEnumerable<Apebc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("apebc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apebc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblapebc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Apebc Get(int cono, int jrnlno, int setno, int pono, decimal posuf, decimal lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apebc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.setno = {0}", setno);
         }
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.pono = {0}", pono);
         }
         if (posuf != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.posuf = {0}", posuf);
         }
         if (lineno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Apebc> GetListByPono(int cono, int pono, decimal posuf, decimal lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apebc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.pono = {0}", pono);
         }
         if (posuf != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.posuf = {0}", posuf);
         }
         if (lineno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apebc> GetListByStatus(int cono, bool statustype, decimal vendno, string apinvno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apebc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND apebc.statustype = {0}", statustype);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apebc.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(apinvno)) 
         {
             sb.AppendFormatWithEscape(" AND apebc.apinvno = '{0}'", apinvno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Apebc BuildFromRow(DataRow row)
      {
         var returnRecord = Apebc.BuildApebcFromRow(row);
         returnRecord = this.BuildExtraFromRow<Apebc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Apebc record)
      {
         Apebc.UpdateRowFromApebc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Apebc Insert(Apebc record)
      {
         DataRow row = this.dataSet.ttblapebc.NewttblapebcRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblapebc.AddttblapebcRow((pdsapebcDataSet.ttblapebcRow)row);
         this.SaveChanges();
         return this.dataSet.ttblapebc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapebc.Rows[0]) : null;
      }
  

      public Apebc Update(Apebc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblapebc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapebc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Apebc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblapebc.NewttblapebcRow();
            Apebc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblapebc.AddttblapebcRow((pdsapebcDataSet.ttblapebcRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Apebc() { rowID = selectRowId }).ToList();
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
  