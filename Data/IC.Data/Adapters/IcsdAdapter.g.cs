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
   using Models.Pdsicsd;
   using Models.Pdswarehouselookup;
   using Models.Complex;

   public partial class IcsdAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsd";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsdTableControlKey;
		
      private pdsicsdDataSet dataSet;
        
      public IcsdAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsdDataSet() { DataSetName = DataSetName };
            this.icsdTableControlKey = this.dataSet.ttblicsd.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsdTableControlKey))
            {
               this.CreateTableControlParameters(this.icsdTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsdAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsdproxy = this.proxyAppObject.CreatePO_icsdproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsdproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsdproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsdTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsdTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsdproxy = this.proxyAppObject.CreatePO_icsdproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsdproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsdproxy - After Call");
      }
   

      public Icsd GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsd icsd = null;
         if (row != null)
         {
             icsd = this.BuildFromRow(row);
         }
         return icsd;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsd) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsd.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsd)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsd Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsd.AsEnumerable().SingleOrDefault();
         Icsd icsd = null;
         if (row != null)
         {
             icsd = this.BuildFromRow(row);
         }
         return icsd;
      }
	  
	  
	  public IEnumerable<Icsd> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("icsd.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("icsd.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsd.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Icsd> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsd.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsd> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsd.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsd Get(int cono, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsd.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Icsd GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("icsd.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Icsd> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("icsd.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsd BuildFromRow(DataRow row)
      {
         var returnRecord = Icsd.BuildIcsdFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsd>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsd record)
      {
         Icsd.UpdateRowFromIcsd(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsd Insert(Icsd record)
      {
         DataRow row = this.dataSet.ttblicsd.NewttblicsdRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsd.AddttblicsdRow((pdsicsdDataSet.ttblicsdRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsd.Rows[0]) : null;
      }
  

      public Icsd Update(Icsd record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsd.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsd record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsd.NewttblicsdRow();
            Icsd.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsd.AddttblicsdRow((pdsicsdDataSet.ttblicsdRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Icsd record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblicsd.NewttblicsdRow();
            Icsd.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsd.AddttblicsdRow((pdsicsdDataSet.ttblicsdRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsd() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Icsd() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public IcsdLookupResponseAPI Lookup(Warehouselookupcriteria warehouselookupcriteria)
      {   
         var result = new IcsdLookupResponseAPI();
         
         var pdswarehouselookup = new pdswarehouselookupDataSet();
            
         DataRow ttblwarehouselookupcriteriaCriteria = pdswarehouselookup.ttblwarehouselookupcriteria.NewttblwarehouselookupcriteriaRow();
         Warehouselookupcriteria.UpdateRowFromWarehouselookupcriteria(ref ttblwarehouselookupcriteriaCriteria, warehouselookupcriteria);
         pdswarehouselookup.ttblwarehouselookupcriteria.AddttblwarehouselookupcriteriaRow((pdswarehouselookupDataSet.ttblwarehouselookupcriteriaRow)ttblwarehouselookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Icsd - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsdproxy = this.proxyAppObject.CreatePO_icsdproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcsdproxy.Lookup(ref pdsContext, ref pdswarehouselookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Icsd - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswarehouselookup); 
    
         foreach (DataRow row in pdswarehouselookup.ttblwarehouselookupresults)
         {
            result.warehouselookupresults.Add(Warehouselookupresults.BuildWarehouselookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Icsd> GetListByWordIndex(string searchTerm, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         where.AppendKeywords(string.Empty, searchTerm, true, true, false);
         this.SetAndFetch(where.ToString(), batchsize, fldList);
         this.SearchWordIndex(batchsize == 0 ? DefaultFetchWhereRowCount : batchsize , where.ToString());
         return (from DataRow row in this.dataSet.ttblicsd.Rows select this.BuildFromRow(row)).ToList();
      }
  
      protected void SearchWordIndex(int batchSize, string searchTerm)
      {
         NLogLoggerP.Trace("SearchWordIndex - Icsd - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsdProxy = this.proxyAppObject.CreatePO_icsdproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcsdProxy.SearchWordIndex(batchSize, searchTerm, ref this.pdsContext, out this.dataSet, out string cErrorMessage, out bool moreRecords);
                   ErrorReportingHelper.ReportErrors(cErrorMessage);
                   this.ReportErrors(this.pdsContext);
                   this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SearchWordIndex - Icsd - After Call");
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
  