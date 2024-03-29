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
   using Models.Pdsarsop;

   public partial class ArsopAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsarsop";
      private ARProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> arsopTableControlKey;
		
      private pdsarsopDataSet dataSet;
        
      public ArsopAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ARProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsarsopDataSet() { DataSetName = DataSetName };
            this.arsopTableControlKey = this.dataSet.ttblarsop.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.arsopTableControlKey))
            {
               this.CreateTableControlParameters(this.arsopTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ArsopAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Arsopproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poArsopproxy = this.proxyAppObject.CreatePO_arsopproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poArsopproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Arsopproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.arsopTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.arsopTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Arsopproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poArsopproxy = this.proxyAppObject.CreatePO_arsopproxy())
               {
                  this.SetRequiredContextParameters();
                  poArsopproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Arsopproxy - After Call");
      }
   

      public Arsop GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Arsop arsop = null;
         if (row != null)
         {
             arsop = this.BuildFromRow(row);
         }
         return arsop;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(arsop) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblarsop.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Arsop> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(arsop)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Arsop Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblarsop.AsEnumerable().SingleOrDefault();
         Arsop arsop = null;
         if (row != null)
         {
             arsop = this.BuildFromRow(row);
         }
         return arsop;
      }
	  
	  
      public IEnumerable<Arsop> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("arsop.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsop> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblarsop.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Arsop Get(int cono, decimal custno, string shipto, string certifiedtype, string certifiedname, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsop.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND arsop.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND arsop.shipto = '{0}'", shipto);
         }
         if (!string.IsNullOrEmpty(certifiedtype)) 
         {
             sb.AppendFormatWithEscape(" AND arsop.certifiedtype = '{0}'", certifiedtype);
         }
         if (!string.IsNullOrEmpty(certifiedname)) 
         {
             sb.AppendFormatWithEscape(" AND arsop.certifiedname = '{0}'", certifiedname);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Arsop> GetListByCertifiednbr(int cono, string certifiedtype, string certifiednbr, decimal custno, string shipto, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsop.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(certifiedtype)) 
         {
             sb.AppendFormatWithEscape(" AND arsop.certifiedtype = '{0}'", certifiedtype);
         }
         if (!string.IsNullOrEmpty(certifiednbr)) 
         {
             sb.AppendFormatWithEscape(" AND arsop.certifiednbr = '{0}'", certifiednbr);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND arsop.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND arsop.shipto = '{0}'", shipto);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Arsop BuildFromRow(DataRow row)
      {
         var returnRecord = Arsop.BuildArsopFromRow(row);
         returnRecord = this.BuildExtraFromRow<Arsop>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Arsop record)
      {
         Arsop.UpdateRowFromArsop(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Arsop Insert(Arsop record)
      {
         DataRow row = this.dataSet.ttblarsop.NewttblarsopRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblarsop.AddttblarsopRow((pdsarsopDataSet.ttblarsopRow)row);
         this.SaveChanges();
         return this.dataSet.ttblarsop.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsop.Rows[0]) : null;
      }
  

      public Arsop Update(Arsop record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblarsop.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsop.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Arsop record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblarsop.NewttblarsopRow();
            Arsop.BuildMinimalRow(ref row, record);
            this.dataSet.ttblarsop.AddttblarsopRow((pdsarsopDataSet.ttblarsopRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Arsop() { rowID = selectRowId }).ToList();
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
  