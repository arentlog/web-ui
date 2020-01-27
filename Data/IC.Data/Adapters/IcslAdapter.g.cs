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
   using Models.Pdsicsl;
   using Models.Pdsicprodlinelookup;
   using Models.Complex;

   public partial class IcslAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsl";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icslTableControlKey;
		
      private pdsicslDataSet dataSet;
        
      public IcslAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicslDataSet() { DataSetName = DataSetName };
            this.icslTableControlKey = this.dataSet.ttblicsl.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icslTableControlKey))
            {
               this.CreateTableControlParameters(this.icslTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcslAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icslproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcslproxy = this.proxyAppObject.CreatePO_icslproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcslproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icslproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icslTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icslTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icslproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcslproxy = this.proxyAppObject.CreatePO_icslproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcslproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icslproxy - After Call");
      }
   

      public Icsl GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsl icsl = null;
         if (row != null)
         {
             icsl = this.BuildFromRow(row);
         }
         return icsl;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsl) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsl.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsl)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsl Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsl.AsEnumerable().SingleOrDefault();
         Icsl icsl = null;
         if (row != null)
         {
             icsl = this.BuildFromRow(row);
         }
         return icsl;
      }
	  
	  
	  public IEnumerable<Icsl> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("icsl.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("icsl.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsl.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Icsl> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsl.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsl> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsl.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsl Get(int cono, string whse, decimal vendno, string prodline, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsl.whse = '{0}'", whse);
         }
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsl.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND icsl.prodline = '{0}'", prodline);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsl> GetListByCoprodln(int cono, string prodline, decimal vendno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND icsl.prodline = '{0}'", prodline);
         }
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsl.vendno = {0}", vendno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsl> GetListByProdline(int cono, string whse, string prodline, decimal vendno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsl.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND icsl.prodline = '{0}'", prodline);
         }
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsl.vendno = {0}", vendno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsl GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("icsl.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Icsl> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("icsl.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsl> GetListByVend(int cono, decimal vendno, string prodline, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsl.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND icsl.prodline = '{0}'", prodline);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsl.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsl BuildFromRow(DataRow row)
      {
         var returnRecord = Icsl.BuildIcslFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsl>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsl record)
      {
         Icsl.UpdateRowFromIcsl(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsl Insert(Icsl record)
      {
         DataRow row = this.dataSet.ttblicsl.NewttblicslRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsl.AddttblicslRow((pdsicslDataSet.ttblicslRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsl.Rows[0]) : null;
      }
  

      public Icsl Update(Icsl record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsl.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsl record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsl.NewttblicslRow();
            Icsl.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsl.AddttblicslRow((pdsicslDataSet.ttblicslRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Icsl record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblicsl.NewttblicslRow();
            Icsl.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsl.AddttblicslRow((pdsicslDataSet.ttblicslRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsl() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Icsl() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public IcslLookupResponseAPI Lookup(Icprodlinelookupcriteria icprodlinelookupcriteria)
      {   
         var result = new IcslLookupResponseAPI();
         
         var pdsicprodlinelookup = new pdsicprodlinelookupDataSet();
            
         DataRow ttblicprodlinelookupcriteriaCriteria = pdsicprodlinelookup.ttblicprodlinelookupcriteria.NewttblicprodlinelookupcriteriaRow();
         Icprodlinelookupcriteria.UpdateRowFromIcprodlinelookupcriteria(ref ttblicprodlinelookupcriteriaCriteria, icprodlinelookupcriteria);
         pdsicprodlinelookup.ttblicprodlinelookupcriteria.AddttblicprodlinelookupcriteriaRow((pdsicprodlinelookupDataSet.ttblicprodlinelookupcriteriaRow)ttblicprodlinelookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Icsl - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcslproxy = this.proxyAppObject.CreatePO_icslproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcslproxy.Lookup(ref pdsContext, ref pdsicprodlinelookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Icsl - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicprodlinelookup); 
    
         foreach (DataRow row in pdsicprodlinelookup.ttblicprodlinelookupresults)
         {
            result.icprodlinelookupresults.Add(Icprodlinelookupresults.BuildIcprodlinelookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
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
  