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
   using Models.Pdsglet;

   public partial class GletAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsglet";
      private GLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> gletTableControlKey;
		
      private pdsgletDataSet dataSet;
        
      public GletAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new GLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsgletDataSet() { DataSetName = DataSetName };
            this.gletTableControlKey = this.dataSet.ttblglet.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.gletTableControlKey))
            {
               this.CreateTableControlParameters(this.gletTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in GletAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Gletproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poGletproxy = this.proxyAppObject.CreatePO_gletproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poGletproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Gletproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.gletTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.gletTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Gletproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGletproxy = this.proxyAppObject.CreatePO_gletproxy())
               {
                  this.SetRequiredContextParameters();
                  poGletproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Gletproxy - After Call");
      }
   

      public Glet GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Glet glet = null;
         if (row != null)
         {
             glet = this.BuildFromRow(row);
         }
         return glet;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(glet) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblglet.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Glet> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(glet)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Glet Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblglet.AsEnumerable().SingleOrDefault();
         Glet glet = null;
         if (row != null)
         {
             glet = this.BuildFromRow(row);
         }
         return glet;
      }
	  
	  
      public IEnumerable<Glet> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("glet.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glet> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblglet.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Glet Get(int cono, int jrnlno, int setno, int transno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.setno = {0}", setno);
         }
         if (transno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.transno = {0}", transno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Glet> GetListByInvno(int cono, string currproc, int invno, int invsuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(currproc)) 
         {
             sb.AppendFormatWithEscape(" AND glet.currproc = '{0}'", currproc);
         }
         if (invno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.invno = {0}", invno);
         }
         if (invsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.invsuf = {0}", invsuf);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glet> GetListByPeriod(int cono, int gldivno, int gldeptno, int glacctno, int glsubno, int perfisc, DateTime? postdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (gldivno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.gldivno = {0}", gldivno);
         }
         if (gldeptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.gldeptno = {0}", gldeptno);
         }
         if (glacctno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.glacctno = {0}", glacctno);
         }
         if (glsubno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.glsubno = {0}", glsubno);
         }
         if (perfisc != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.perfisc = {0}", perfisc);
         }
         if (postdt != null) 
         {
             sb.AppendFormatWithEscape(" AND glet.postdt = '{0}'", postdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glet> GetListByPostdt(int cono, int gldivno, int gldeptno, int glacctno, int glsubno, DateTime? postdt, DateTime? transdt, string transtm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (gldivno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.gldivno = {0}", gldivno);
         }
         if (gldeptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.gldeptno = {0}", gldeptno);
         }
         if (glacctno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.glacctno = {0}", glacctno);
         }
         if (glsubno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glet.glsubno = {0}", glsubno);
         }
         if (postdt != null) 
         {
             sb.AppendFormatWithEscape(" AND glet.postdt = '{0}'", postdt);
         }
         if (transdt != null) 
         {
             sb.AppendFormatWithEscape(" AND glet.transdt = '{0}'", transdt);
         }
         if (!string.IsNullOrEmpty(transtm)) 
         {
             sb.AppendFormatWithEscape(" AND glet.transtm = '{0}'", transtm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glet> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("glet.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Glet BuildFromRow(DataRow row)
      {
         var returnRecord = Glet.BuildGletFromRow(row);
         returnRecord = this.BuildExtraFromRow<Glet>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Glet record)
      {
         Glet.UpdateRowFromGlet(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Glet Insert(Glet record)
      {
         DataRow row = this.dataSet.ttblglet.NewttblgletRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblglet.AddttblgletRow((pdsgletDataSet.ttblgletRow)row);
         this.SaveChanges();
         return this.dataSet.ttblglet.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglet.Rows[0]) : null;
      }
  

      public Glet Update(Glet record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblglet.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglet.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Glet record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblglet.NewttblgletRow();
            Glet.BuildMinimalRow(ref row, record);
            this.dataSet.ttblglet.AddttblgletRow((pdsgletDataSet.ttblgletRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Glet() { rowID = selectRowId }).ToList();
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
  