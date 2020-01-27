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
    
namespace Infor.Sxe.OE.Data.Adapters
{
   using com.infor.sxproxy.oeproxy;
   using com.infor.sxproxy.oeproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsoeds;

   public partial class OedsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsoeds";
      private OEProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> oedsTableControlKey;
		
      private pdsoedsDataSet dataSet;
        
      public OedsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OEProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsoedsDataSet() { DataSetName = DataSetName };
            this.oedsTableControlKey = this.dataSet.ttbloeds.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.oedsTableControlKey))
            {
               this.CreateTableControlParameters(this.oedsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OedsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Oedsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOedsproxy = this.proxyAppObject.CreatePO_oedsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOedsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Oedsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.oedsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.oedsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Oedsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOedsproxy = this.proxyAppObject.CreatePO_oedsproxy())
               {
                  this.SetRequiredContextParameters();
                  poOedsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Oedsproxy - After Call");
      }
   

      public Oeds GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Oeds oeds = null;
         if (row != null)
         {
             oeds = this.BuildFromRow(row);
         }
         return oeds;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(oeds) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbloeds.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Oeds> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(oeds)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Oeds Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbloeds.AsEnumerable().SingleOrDefault();
         Oeds oeds = null;
         if (row != null)
         {
             oeds = this.BuildFromRow(row);
         }
         return oeds;
      }
	  
	  
      public IEnumerable<Oeds> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("oeds.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeds> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbloeds.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Oeds Get(int cono, string whse, string equipcd, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeds.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND oeds.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(equipcd)) 
         {
             sb.AppendFormatWithEscape(" AND oeds.equipcd = '{0}'", equipcd);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Oeds BuildFromRow(DataRow row)
      {
         var returnRecord = Oeds.BuildOedsFromRow(row);
         returnRecord = this.BuildExtraFromRow<Oeds>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Oeds record)
      {
         Oeds.UpdateRowFromOeds(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Oeds Insert(Oeds record)
      {
         DataRow row = this.dataSet.ttbloeds.NewttbloedsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbloeds.AddttbloedsRow((pdsoedsDataSet.ttbloedsRow)row);
         this.SaveChanges();
         return this.dataSet.ttbloeds.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeds.Rows[0]) : null;
      }
  

      public Oeds Update(Oeds record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbloeds.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeds.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Oeds record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbloeds.NewttbloedsRow();
            Oeds.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloeds.AddttbloedsRow((pdsoedsDataSet.ttbloedsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Oeds() { rowID = selectRowId }).ToList();
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
  