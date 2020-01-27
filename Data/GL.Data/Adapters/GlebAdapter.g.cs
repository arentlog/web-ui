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
   using Models.Pdsgleb;

   public partial class GlebAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsgleb";
      private GLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> glebTableControlKey;
		
      private pdsglebDataSet dataSet;
        
      public GlebAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new GLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsglebDataSet() { DataSetName = DataSetName };
            this.glebTableControlKey = this.dataSet.ttblgleb.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.glebTableControlKey))
            {
               this.CreateTableControlParameters(this.glebTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in GlebAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Glebproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poGlebproxy = this.proxyAppObject.CreatePO_glebproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poGlebproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Glebproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.glebTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.glebTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Glebproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGlebproxy = this.proxyAppObject.CreatePO_glebproxy())
               {
                  this.SetRequiredContextParameters();
                  poGlebproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Glebproxy - After Call");
      }
   

      public Gleb GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Gleb gleb = null;
         if (row != null)
         {
             gleb = this.BuildFromRow(row);
         }
         return gleb;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(gleb) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblgleb.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Gleb> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(gleb)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Gleb Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblgleb.AsEnumerable().SingleOrDefault();
         Gleb gleb = null;
         if (row != null)
         {
             gleb = this.BuildFromRow(row);
         }
         return gleb;
      }
	  
	  
      public IEnumerable<Gleb> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("gleb.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Gleb> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblgleb.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Gleb Get(int cono, string function, string reportnm, int yr, int gldivno, int gldeptno, int glacctno, int glsubno, DateTime? asofdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("gleb.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(function)) 
         {
             sb.AppendFormatWithEscape(" AND gleb.function = '{0}'", function);
         }
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND gleb.reportnm = '{0}'", reportnm);
         }
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.yr = {0}", yr);
         }
         if (gldivno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.gldivno = {0}", gldivno);
         }
         if (gldeptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.gldeptno = {0}", gldeptno);
         }
         if (glacctno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.glacctno = {0}", glacctno);
         }
         if (glsubno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.glsubno = {0}", glsubno);
         }
         if (asofdt != null) 
         {
             sb.AppendFormatWithEscape(" AND gleb.asofdt = '{0}'", asofdt);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Gleb> GetListByGlno(int yr, int gldivno, int gldeptno, int glacctno, int glsubno, DateTime? asofdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape("gleb.yr = {0}", yr);
         }
         if (gldivno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.gldivno = {0}", gldivno);
         }
         if (gldeptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.gldeptno = {0}", gldeptno);
         }
         if (glacctno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.glacctno = {0}", glacctno);
         }
         if (glsubno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND gleb.glsubno = {0}", glsubno);
         }
         if (asofdt != null) 
         {
             sb.AppendFormatWithEscape(" AND gleb.asofdt = '{0}'", asofdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Gleb BuildFromRow(DataRow row)
      {
         var returnRecord = Gleb.BuildGlebFromRow(row);
         returnRecord = this.BuildExtraFromRow<Gleb>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Gleb record)
      {
         Gleb.UpdateRowFromGleb(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Gleb Insert(Gleb record)
      {
         DataRow row = this.dataSet.ttblgleb.NewttblglebRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblgleb.AddttblglebRow((pdsglebDataSet.ttblglebRow)row);
         this.SaveChanges();
         return this.dataSet.ttblgleb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblgleb.Rows[0]) : null;
      }
  

      public Gleb Update(Gleb record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblgleb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblgleb.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Gleb record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblgleb.NewttblglebRow();
            Gleb.BuildMinimalRow(ref row, record);
            this.dataSet.ttblgleb.AddttblglebRow((pdsglebDataSet.ttblglebRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Gleb() { rowID = selectRowId }).ToList();
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
  