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
    
namespace Infor.Sxe.AR.Data.Adapters
{
   using com.infor.sxproxy.arproxy;
   using com.infor.sxproxy.arproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsarsde;

   public partial class ArsdeAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsarsde";
      private ARProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> arsdeTableControlKey;
		
      private pdsarsdeDataSet dataSet;
        
      public ArsdeAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ARProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsarsdeDataSet() { DataSetName = DataSetName };
            this.arsdeTableControlKey = this.dataSet.ttblarsde.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.arsdeTableControlKey))
            {
               this.CreateTableControlParameters(this.arsdeTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ArsdeAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Arsdeproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poArsdeproxy = this.proxyAppObject.CreatePO_arsdeproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poArsdeproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Arsdeproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.arsdeTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.arsdeTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Arsdeproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poArsdeproxy = this.proxyAppObject.CreatePO_arsdeproxy())
               {
                  this.SetRequiredContextParameters();
                  poArsdeproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Arsdeproxy - After Call");
      }
   

      public Arsde GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Arsde arsde = null;
         if (row != null)
         {
             arsde = this.BuildFromRow(row);
         }
         return arsde;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(arsde) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblarsde.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Arsde> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(arsde)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Arsde Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblarsde.AsEnumerable().SingleOrDefault();
         Arsde arsde = null;
         if (row != null)
         {
             arsde = this.BuildFromRow(row);
         }
         return arsde;
      }
	  
	  

      public IEnumerable<Arsde> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblarsde.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Arsde Get(int encseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (encseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape("arsde.encseqno = {0}", encseqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Arsde BuildFromRow(DataRow row)
      {
         var returnRecord = Arsde.BuildArsdeFromRow(row);
         returnRecord = this.BuildExtraFromRow<Arsde>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Arsde record)
      {
         Arsde.UpdateRowFromArsde(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Arsde Insert(Arsde record)
      {
         DataRow row = this.dataSet.ttblarsde.NewttblarsdeRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblarsde.AddttblarsdeRow((pdsarsdeDataSet.ttblarsdeRow)row);
         this.SaveChanges();
         return this.dataSet.ttblarsde.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsde.Rows[0]) : null;
      }
  

      public Arsde Update(Arsde record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblarsde.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsde.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Arsde record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblarsde.NewttblarsdeRow();
            Arsde.BuildMinimalRow(ref row, record);
            this.dataSet.ttblarsde.AddttblarsdeRow((pdsarsdeDataSet.ttblarsdeRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Arsde() { rowID = selectRowId }).ToList();
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
  