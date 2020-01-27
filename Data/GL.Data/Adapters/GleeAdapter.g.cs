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
   using Models.Pdsglee;

   public partial class GleeAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsglee";
      private GLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> gleeTableControlKey;
		
      private pdsgleeDataSet dataSet;
        
      public GleeAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new GLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsgleeDataSet() { DataSetName = DataSetName };
            this.gleeTableControlKey = this.dataSet.ttblglee.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.gleeTableControlKey))
            {
               this.CreateTableControlParameters(this.gleeTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in GleeAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Gleeproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poGleeproxy = this.proxyAppObject.CreatePO_gleeproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poGleeproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Gleeproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.gleeTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.gleeTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Gleeproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGleeproxy = this.proxyAppObject.CreatePO_gleeproxy())
               {
                  this.SetRequiredContextParameters();
                  poGleeproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Gleeproxy - After Call");
      }
   

      public Glee GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Glee glee = null;
         if (row != null)
         {
             glee = this.BuildFromRow(row);
         }
         return glee;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(glee) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblglee.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Glee> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(glee)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Glee Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblglee.AsEnumerable().SingleOrDefault();
         Glee glee = null;
         if (row != null)
         {
             glee = this.BuildFromRow(row);
         }
         return glee;
      }
	  
	  
      public IEnumerable<Glee> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("glee.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glee> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblglee.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Glee Get(int cono, string keyno, int setno, int transno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glee.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(keyno)) 
         {
             sb.AppendFormatWithEscape(" AND glee.keyno = '{0}'", keyno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glee.setno = {0}", setno);
         }
         if (transno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glee.transno = {0}", transno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Glee BuildFromRow(DataRow row)
      {
         var returnRecord = Glee.BuildGleeFromRow(row);
         returnRecord = this.BuildExtraFromRow<Glee>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Glee record)
      {
         Glee.UpdateRowFromGlee(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Glee Insert(Glee record)
      {
         DataRow row = this.dataSet.ttblglee.NewttblgleeRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblglee.AddttblgleeRow((pdsgleeDataSet.ttblgleeRow)row);
         this.SaveChanges();
         return this.dataSet.ttblglee.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglee.Rows[0]) : null;
      }
  

      public Glee Update(Glee record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblglee.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglee.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Glee record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblglee.NewttblgleeRow();
            Glee.BuildMinimalRow(ref row, record);
            this.dataSet.ttblglee.AddttblgleeRow((pdsgleeDataSet.ttblgleeRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Glee() { rowID = selectRowId }).ToList();
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
  