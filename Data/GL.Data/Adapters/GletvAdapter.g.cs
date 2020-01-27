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
    
namespace Infor.Sxe.GL.Data.Adapters
{
   using com.infor.sxproxy.glproxy;
   using com.infor.sxproxy.glproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsgletv;

   public partial class GletvAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsgletv";
      private GLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> gletvTableControlKey;
		private readonly Tuple<string, string> glarTableControlKey;
      private pdsgletvDataSet dataSet;
        
      public GletvAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new GLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsgletvDataSet() { DataSetName = DataSetName };
            this.gletvTableControlKey = this.dataSet.ttblgletv.GetTableControlParametersKey();
            this.glarTableControlKey = this.dataSet.ttblglar.GetTableControlParametersKey();
            if (!this.tempTableControlParameters.ContainsKey(this.gletvTableControlKey))
            {
               this.CreateTableControlParameters(this.gletvTableControlKey);
            }
            if (!this.tempTableControlParameters.ContainsKey(this.glarTableControlKey))
            {
               this.CreateTableControlParameters(this.glarTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in GletvAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, bool fillMode, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Gletvproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, fillMode, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poGletvproxy = this.proxyAppObject.CreatePO_gletvproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poGletvproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Gletvproxy - After Call");
      }
      
      private void SetAndFetch(string where, bool fillMode, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.gletvTableControlKey, where, batchsize, fldList);
         this.SetFetchWhereParameters(this.glarTableControlKey, fillMode);
         this.SetTableParametersOnContext(this.gletvTableControlKey, true);
         this.SetTableParametersOnContext(this.glarTableControlKey);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Gletvproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGletvproxy = this.proxyAppObject.CreatePO_gletvproxy())
               {
                  this.SetRequiredContextParameters();
                  poGletvproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Gletvproxy - After Call");
      }
   

      public Gletv GetByRowId(string rowId, bool fillMode, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fillMode, fldList);
         Gletv gletv = null;
         if (row != null)
         {
             gletv = this.BuildFromRow(row);
         }
         return gletv;
      }
   
      private DataRow GetRowByRowId(string rowId, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(gletv) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttblgletv.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Gletv> GetListByRowIdList(List<string> rowIds, bool fillMode, int batchsize, string fldList)
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
              where.AppendFormat("rowid(gletv)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), fillMode, batchsize, fldList);
      }

      protected Gletv Fetch(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         var row = this.dataSet.ttblgletv.AsEnumerable().SingleOrDefault();
         Gletv gletv = null;
         if (row != null)
         {
             gletv = this.BuildFromRow(row);
         }
         return gletv;
      }
	  
	  
	  public IEnumerable<Gletv> GetListByRowpointers(List<string> rowpointers, bool fillMode, string fldList)
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
              where.AppendFormat("gletv.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), fillMode, rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("gletv.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttblgletv.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Gletv> GetListAllByCono(int cono, bool fillMode, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("gletv.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Gletv> GetList(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblgletv.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Gletv Get(int cono, int revalno, int seqno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("gletv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (revalno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.revalno = {0}", revalno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, batchsize, fldList);
      }
  
      public IEnumerable<Gletv> GetListByGlacct(int cono, int gldivno, int gldeptno, int glacctno, int glsubno, int revalno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("gletv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (gldivno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.gldivno = {0}", gldivno);
         }
         if (gldeptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.gldeptno = {0}", gldeptno);
         }
         if (glacctno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.glacctno = {0}", glacctno);
         }
         if (glsubno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.glsubno = {0}", glsubno);
         }
         if (revalno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.revalno = {0}", revalno);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Gletv> GetListByJrnlno(int cono, int jrnlno, int setno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("gletv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.setno = {0}", setno);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Gletv GetByRowpointer(string rowpointer, bool fillMode, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("gletv.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, 1, fldList);
      }

      public IEnumerable<Gletv> GetListBySourcekey(int cono, string sourcecd, decimal idno, string docno, int docsuf, int transcd, int docseqno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("gletv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(sourcecd)) 
         {
             sb.AppendFormatWithEscape(" AND gletv.sourcecd = '{0}'", sourcecd);
         }
         if (idno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.idno = {0}", idno);
         }
         if (!string.IsNullOrEmpty(docno)) 
         {
             sb.AppendFormatWithEscape(" AND gletv.docno = '{0}'", docno);
         }
         if (docsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.docsuf = {0}", docsuf);
         }
         if (transcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.transcd = {0}", transcd);
         }
         if (docseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gletv.docseqno = {0}", docseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Gletv BuildFromRow(DataRow row)
      {
         var returnRecord = Gletv.BuildGletvFromRow(row);
         returnRecord = this.BuildExtraFromRow<Gletv>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Gletv record)
      {
         Gletv.UpdateRowFromGletv(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Gletv Insert(Gletv record)
      {
         DataRow row = this.dataSet.ttblgletv.NewttblgletvRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblgletv.AddttblgletvRow((pdsgletvDataSet.ttblgletvRow)row);
         this.SaveChanges();
         return this.dataSet.ttblgletv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblgletv.Rows[0]) : null;
      }
  

      public Gletv Update(Gletv record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblgletv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblgletv.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Gletv record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblgletv.NewttblgletvRow();
            Gletv.BuildMinimalRow(ref row, record);
            this.dataSet.ttblgletv.AddttblgletvRow((pdsgletvDataSet.ttblgletvRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Gletv record)
      {
         var row = this.GetRowByRowId(record.rowID, false, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblgletv.NewttblgletvRow();
            Gletv.BuildMinimalRow(ref row, record);
            this.dataSet.ttblgletv.AddttblgletvRow((pdsgletvDataSet.ttblgletvRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Gletv() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Gletv() { rowpointer = selectRowpointer }).ToList();
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
  