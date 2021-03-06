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
   using Models.Pdsglsx;

   public partial class GlsxAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsglsx";
      private GLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> glsxTableControlKey;
		
      private pdsglsxDataSet dataSet;
        
      public GlsxAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new GLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsglsxDataSet() { DataSetName = DataSetName };
            this.glsxTableControlKey = this.dataSet.ttblglsx.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.glsxTableControlKey))
            {
               this.CreateTableControlParameters(this.glsxTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in GlsxAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Glsxproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poGlsxproxy = this.proxyAppObject.CreatePO_glsxproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poGlsxproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Glsxproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.glsxTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.glsxTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Glsxproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGlsxproxy = this.proxyAppObject.CreatePO_glsxproxy())
               {
                  this.SetRequiredContextParameters();
                  poGlsxproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Glsxproxy - After Call");
      }
   

      public Glsx GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Glsx glsx = null;
         if (row != null)
         {
             glsx = this.BuildFromRow(row);
         }
         return glsx;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(glsx) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblglsx.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Glsx> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(glsx)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Glsx Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblglsx.AsEnumerable().SingleOrDefault();
         Glsx glsx = null;
         if (row != null)
         {
             glsx = this.BuildFromRow(row);
         }
         return glsx;
      }
	  
	  
      public IEnumerable<Glsx> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("glsx.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glsx> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblglsx.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Glsx Get(int cono, string currencyty, int yr, string acctgrp, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glsx.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(currencyty)) 
         {
             sb.AppendFormatWithEscape(" AND glsx.currencyty = '{0}'", currencyty);
         }
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsx.yr = {0}", yr);
         }
         if (!string.IsNullOrEmpty(acctgrp)) 
         {
             sb.AppendFormatWithEscape(" AND glsx.acctgrp = '{0}'", acctgrp);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Glsx BuildFromRow(DataRow row)
      {
         var returnRecord = Glsx.BuildGlsxFromRow(row);
         returnRecord = this.BuildExtraFromRow<Glsx>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Glsx record)
      {
         Glsx.UpdateRowFromGlsx(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Glsx Insert(Glsx record)
      {
         DataRow row = this.dataSet.ttblglsx.NewttblglsxRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblglsx.AddttblglsxRow((pdsglsxDataSet.ttblglsxRow)row);
         this.SaveChanges();
         return this.dataSet.ttblglsx.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglsx.Rows[0]) : null;
      }
  

      public Glsx Update(Glsx record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblglsx.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglsx.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Glsx record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblglsx.NewttblglsxRow();
            Glsx.BuildMinimalRow(ref row, record);
            this.dataSet.ttblglsx.AddttblglsxRow((pdsglsxDataSet.ttblglsxRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Glsx() { rowID = selectRowId }).ToList();
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
  