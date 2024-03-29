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
   using Models.Pdsapei;

   public partial class ApeiAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsapei";
      private APProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> apeiTableControlKey;
		
      private pdsapeiDataSet dataSet;
        
      public ApeiAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new APProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsapeiDataSet() { DataSetName = DataSetName };
            this.apeiTableControlKey = this.dataSet.ttblapei.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.apeiTableControlKey))
            {
               this.CreateTableControlParameters(this.apeiTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ApeiAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Apeiproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poApeiproxy = this.proxyAppObject.CreatePO_apeiproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poApeiproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Apeiproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.apeiTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.apeiTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Apeiproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poApeiproxy = this.proxyAppObject.CreatePO_apeiproxy())
               {
                  this.SetRequiredContextParameters();
                  poApeiproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Apeiproxy - After Call");
      }
   

      public Apei GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Apei apei = null;
         if (row != null)
         {
             apei = this.BuildFromRow(row);
         }
         return apei;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(apei) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblapei.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Apei> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(apei)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Apei Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblapei.AsEnumerable().SingleOrDefault();
         Apei apei = null;
         if (row != null)
         {
             apei = this.BuildFromRow(row);
         }
         return apei;
      }
	  
	  
	  public IEnumerable<Apei> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         var where = new StringBuilder();
         if (rowpointers != null && rowpointers.Count > 0)
         {
           foreach (var rowpointer in rowpointers)
           {
              if (where.ToString().Length > 0)
              {
                 where.Append(" OR ");
              }
              where.AppendFormat("apei.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("apei.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblapei.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Apei> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("apei.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apei> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblapei.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Apei Get(int cono, string groupnm, DateTime? createddt, int groupseqno, int invseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apei.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apei.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.groupseqno = {0}", groupseqno);
         }
         if (invseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.invseqno = {0}", invseqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Apei> GetListByApinvno(int cono, decimal vendno, string apinvno, int transcd, bool statustype, int invseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(apinvno)) 
         {
             sb.AppendFormatWithEscape(" AND apei.apinvno = '{0}'", apinvno);
         }
         if (transcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.transcd = {0}", transcd);
         }
         sb.AppendFormatWithEscape(" AND apei.statustype = {0}", statustype);
         if (invseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.invseqno = {0}", invseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apei> GetListByCreateddt(int cono, DateTime? createddt, string groupnm, int groupseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apei.createddt = '{0}'", createddt);
         }
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apei.groupnm = '{0}'", groupnm);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.groupseqno = {0}", groupseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apei> GetListByGroupnm(int cono, string groupnm, DateTime? createddt, int groupseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apei.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apei.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.groupseqno = {0}", groupseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apei> GetListByInvdt(int cono, decimal vendno, DateTime? invdt, string apinvno, int transcd, int invseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.vendno = {0}", vendno);
         }
         if (invdt != null) 
         {
             sb.AppendFormatWithEscape(" AND apei.invdt = '{0}'", invdt);
         }
         if (!string.IsNullOrEmpty(apinvno)) 
         {
             sb.AppendFormatWithEscape(" AND apei.apinvno = '{0}'", apinvno);
         }
         if (transcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.transcd = {0}", transcd);
         }
         if (invseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.invseqno = {0}", invseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Apei GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("apei.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Apei> GetListByStatustype(int cono, bool statustype, int stagecd, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND apei.statustype = {0}", statustype);
         if (stagecd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.stagecd = {0}", stagecd);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apei> GetListByVendnogroupnm(int cono, decimal vendno, string groupnm, DateTime? invdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apei.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apei.groupnm = '{0}'", groupnm);
         }
         if (invdt != null) 
         {
             sb.AppendFormatWithEscape(" AND apei.invdt = '{0}'", invdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Apei BuildFromRow(DataRow row)
      {
         var returnRecord = Apei.BuildApeiFromRow(row);
         returnRecord = this.BuildExtraFromRow<Apei>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Apei record)
      {
         Apei.UpdateRowFromApei(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Apei Insert(Apei record)
      {
         DataRow row = this.dataSet.ttblapei.NewttblapeiRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblapei.AddttblapeiRow((pdsapeiDataSet.ttblapeiRow)row);
         this.SaveChanges();
         return this.dataSet.ttblapei.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapei.Rows[0]) : null;
      }
  

      public Apei Update(Apei record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblapei.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapei.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Apei record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblapei.NewttblapeiRow();
            Apei.BuildMinimalRow(ref row, record);
            this.dataSet.ttblapei.AddttblapeiRow((pdsapeiDataSet.ttblapeiRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Apei record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblapei.NewttblapeiRow();
            Apei.BuildMinimalRow(ref row, record);
            this.dataSet.ttblapei.AddttblapeiRow((pdsapeiDataSet.ttblapeiRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Apei() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.DeleteUseRowID(rec);
            }
         }
      }
	  
 
      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         if (rowpointers != null)
         {
            var recList = rowpointers.Select(selectRowpointer => new Apei() { rowpointer = selectRowpointer }).ToList();
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
  