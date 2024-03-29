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
    
namespace Infor.Sxe.IC.Data.Adapters
{
   using com.infor.sxproxy.icproxy;
   using com.infor.sxproxy.icproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsicamue;

   public partial class IcamueAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicamue";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icamueTableControlKey;
		
      private pdsicamueDataSet dataSet;
        
      public IcamueAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicamueDataSet() { DataSetName = DataSetName };
            this.icamueTableControlKey = this.dataSet.ttblicamue.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icamueTableControlKey))
            {
               this.CreateTableControlParameters(this.icamueTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcamueAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icamueproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcamueproxy = this.proxyAppObject.CreatePO_icamueproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcamueproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icamueproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icamueTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icamueTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icamueproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcamueproxy = this.proxyAppObject.CreatePO_icamueproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcamueproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icamueproxy - After Call");
      }
   

      public Icamue GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icamue icamue = null;
         if (row != null)
         {
             icamue = this.BuildFromRow(row);
         }
         return icamue;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icamue) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicamue.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icamue> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icamue)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icamue Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicamue.AsEnumerable().SingleOrDefault();
         Icamue icamue = null;
         if (row != null)
         {
             icamue = this.BuildFromRow(row);
         }
         return icamue;
      }
	  
	  
      public IEnumerable<Icamue> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icamue.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icamue> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicamue.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icamue Get(int cono, bool activefl, string whse, string buyer, string prod, string frozentype, string frozenmmyy, string exctype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icamue.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND icamue.activefl = {0}", activefl);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icamue.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(buyer)) 
         {
             sb.AppendFormatWithEscape(" AND icamue.buyer = '{0}'", buyer);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icamue.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(frozentype)) 
         {
             sb.AppendFormatWithEscape(" AND icamue.frozentype = '{0}'", frozentype);
         }
         if (!string.IsNullOrEmpty(frozenmmyy)) 
         {
             sb.AppendFormatWithEscape(" AND icamue.frozenmmyy = '{0}'", frozenmmyy);
         }
         if (!string.IsNullOrEmpty(exctype)) 
         {
             sb.AppendFormatWithEscape(" AND icamue.exctype = '{0}'", exctype);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Icamue BuildFromRow(DataRow row)
      {
         var returnRecord = Icamue.BuildIcamueFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icamue>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icamue record)
      {
         Icamue.UpdateRowFromIcamue(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icamue Insert(Icamue record)
      {
         DataRow row = this.dataSet.ttblicamue.NewttblicamueRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicamue.AddttblicamueRow((pdsicamueDataSet.ttblicamueRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicamue.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicamue.Rows[0]) : null;
      }
  

      public Icamue Update(Icamue record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicamue.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicamue.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icamue record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicamue.NewttblicamueRow();
            Icamue.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicamue.AddttblicamueRow((pdsicamueDataSet.ttblicamueRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icamue() { rowID = selectRowId }).ToList();
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
  