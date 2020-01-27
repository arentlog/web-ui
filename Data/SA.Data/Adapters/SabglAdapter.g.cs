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
   using Models.Pdssabgl;

   public partial class SabglAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssabgl";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sabglTableControlKey;
		
      private pdssabglDataSet dataSet;
        
      public SabglAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssabglDataSet() { DataSetName = DataSetName };
            this.sabglTableControlKey = this.dataSet.ttblsabgl.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sabglTableControlKey))
            {
               this.CreateTableControlParameters(this.sabglTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SabglAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sabglproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSabglproxy = this.proxyAppObject.CreatePO_sabglproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSabglproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sabglproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sabglTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sabglTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sabglproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSabglproxy = this.proxyAppObject.CreatePO_sabglproxy())
               {
                  this.SetRequiredContextParameters();
                  poSabglproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sabglproxy - After Call");
      }
   

      public Sabgl GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sabgl sabgl = null;
         if (row != null)
         {
             sabgl = this.BuildFromRow(row);
         }
         return sabgl;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sabgl) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsabgl.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sabgl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sabgl)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sabgl Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsabgl.AsEnumerable().SingleOrDefault();
         Sabgl sabgl = null;
         if (row != null)
         {
             sabgl = this.BuildFromRow(row);
         }
         return sabgl;
      }
	  
	  
      public IEnumerable<Sabgl> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sabgl.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sabgl> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsabgl.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sabgl Get(int cono, string batchnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sabgl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(batchnm)) 
         {
             sb.AppendFormatWithEscape(" AND sabgl.batchnm = '{0}'", batchnm);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Sabgl BuildFromRow(DataRow row)
      {
         var returnRecord = Sabgl.BuildSabglFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sabgl>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sabgl record)
      {
         Sabgl.UpdateRowFromSabgl(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sabgl Insert(Sabgl record)
      {
         DataRow row = this.dataSet.ttblsabgl.NewttblsabglRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsabgl.AddttblsabglRow((pdssabglDataSet.ttblsabglRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsabgl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsabgl.Rows[0]) : null;
      }
  

      public Sabgl Update(Sabgl record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsabgl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsabgl.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sabgl record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsabgl.NewttblsabglRow();
            Sabgl.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsabgl.AddttblsabglRow((pdssabglDataSet.ttblsabglRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sabgl() { rowID = selectRowId }).ToList();
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
  