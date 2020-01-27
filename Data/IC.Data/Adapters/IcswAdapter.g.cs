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
   using Models.Pdsicsw;
   using Models.Pdsicswlookup;
   using Models.Complex;

   public partial class IcswAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsw";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icswTableControlKey;
		private readonly Tuple<string, string> icspTableControlKey;
      private pdsicswDataSet dataSet;
        
      public IcswAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicswDataSet() { DataSetName = DataSetName };
            this.icswTableControlKey = this.dataSet.ttblicsw.GetTableControlParametersKey();
            this.icspTableControlKey = this.dataSet.ttblicsp.GetTableControlParametersKey();
            if (!this.tempTableControlParameters.ContainsKey(this.icswTableControlKey))
            {
               this.CreateTableControlParameters(this.icswTableControlKey);
            }
            if (!this.tempTableControlParameters.ContainsKey(this.icspTableControlKey))
            {
               this.CreateTableControlParameters(this.icspTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcswAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, bool fillMode, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icswproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, fillMode, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcswproxy = this.proxyAppObject.CreatePO_icswproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcswproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icswproxy - After Call");
      }
      
      private void SetAndFetch(string where, bool fillMode, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icswTableControlKey, where, batchsize, fldList);
         this.SetFetchWhereParameters(this.icspTableControlKey, fillMode);
         this.SetTableParametersOnContext(this.icswTableControlKey, true);
         this.SetTableParametersOnContext(this.icspTableControlKey);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icswproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcswproxy = this.proxyAppObject.CreatePO_icswproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcswproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icswproxy - After Call");
      }
   

      public Icsw GetByRowId(string rowId, bool fillMode, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fillMode, fldList);
         Icsw icsw = null;
         if (row != null)
         {
             icsw = this.BuildFromRow(row);
         }
         return icsw;
      }
   
      private DataRow GetRowByRowId(string rowId, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsw) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttblicsw.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsw> GetListByRowIdList(List<string> rowIds, bool fillMode, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsw)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), fillMode, batchsize, fldList);
      }

      protected Icsw Fetch(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         var row = this.dataSet.ttblicsw.AsEnumerable().SingleOrDefault();
         Icsw icsw = null;
         if (row != null)
         {
             icsw = this.BuildFromRow(row);
         }
         return icsw;
      }
	  
	  
	  public IEnumerable<Icsw> GetListByRowpointers(List<string> rowpointers, bool fillMode, string fldList)
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
              where.AppendFormat("icsw.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), fillMode, rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("icsw.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttblicsw.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Icsw> GetListAllByCono(int cono, bool fillMode, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsw.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetList(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsw.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsw Get(int cono, string prod, string whse, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, batchsize, fldList);
      }
  
      public IEnumerable<Icsw> GetListByArpwhse(int cono, string arptype, bool arppushfl, string arpwhse, string whse, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(arptype)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.arptype = '{0}'", arptype);
         }
         sb.AppendFormatWithEscape(" AND icsw.arppushfl = {0}", arppushfl);
         if (!string.IsNullOrEmpty(arpwhse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.arpwhse = '{0}'", arpwhse);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetListByBin(int cono, string whse, string binloc1, string prod, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(binloc1)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.binloc1 = '{0}'", binloc1);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetListByCount(int cono, string whse, bool countfl, DateTime? lastcntdt, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         sb.AppendFormatWithEscape(" AND icsw.countfl = {0}", countfl);
         if (lastcntdt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsw.lastcntdt = '{0}'", lastcntdt);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetListByManprod(int cono, string whse, string vendprod, decimal arpvendno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(vendprod)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.vendprod = '{0}'", vendprod);
         }
         if (arpvendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsw.arpvendno = {0}", arpvendno);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetListByProdco(string prod, int cono, string whse, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape("icsw.prod = '{0}'", prod);
         }
         sb.AppendFormatWithEscape(" AND icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Icsw GetByRowpointer(string rowpointer, bool fillMode, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("icsw.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, 1, fldList);
      }

      public IEnumerable<Icsw> GetListByTransdttmz(DateTime? transdttmz, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("icsw.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetListByVendor(int cono, string whse, decimal arpvendno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         if (arpvendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsw.arpvendno = {0}", arpvendno);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetListByVendprod(int cono, string whse, string arptype, decimal arpvendno, string prodline, string vendprod, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(arptype)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.arptype = '{0}'", arptype);
         }
         if (arpvendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsw.arpvendno = {0}", arpvendno);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.prodline = '{0}'", prodline);
         }
         if (!string.IsNullOrEmpty(vendprod)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.vendprod = '{0}'", vendprod);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Icsw> GetListByWhse(int cono, string whse, string prod, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsw.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsw.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Icsw BuildFromRow(DataRow row)
      {
         var returnRecord = Icsw.BuildIcswFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsw>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsw record)
      {
         Icsw.UpdateRowFromIcsw(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsw Insert(Icsw record)
      {
         DataRow row = this.dataSet.ttblicsw.NewttblicswRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsw.AddttblicswRow((pdsicswDataSet.ttblicswRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsw.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsw.Rows[0]) : null;
      }
  

      public Icsw Update(Icsw record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsw.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsw.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsw record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsw.NewttblicswRow();
            Icsw.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsw.AddttblicswRow((pdsicswDataSet.ttblicswRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Icsw record)
      {
         var row = this.GetRowByRowId(record.rowID, false, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblicsw.NewttblicswRow();
            Icsw.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsw.AddttblicswRow((pdsicswDataSet.ttblicswRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsw() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Icsw() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public IEnumerable<Icswlookupresults> Lookup(Icswlookupcriteria icswlookupcriteria)
      {   
         var results = new List<Icswlookupresults>();
         
         var pdsicswlookup = new pdsicswlookupDataSet();
            
         DataRow ttblicswlookupcriteriaCriteria = pdsicswlookup.ttblicswlookupcriteria.NewttblicswlookupcriteriaRow();
         Icswlookupcriteria.UpdateRowFromIcswlookupcriteria(ref ttblicswlookupcriteriaCriteria, icswlookupcriteria);
         pdsicswlookup.ttblicswlookupcriteria.AddttblicswlookupcriteriaRow((pdsicswlookupDataSet.ttblicswlookupcriteriaRow)ttblicswlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("Lookup - Icsw - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcswproxy = this.proxyAppObject.CreatePO_icswproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcswproxy.Lookup(ref pdsContext, ref pdsicswlookup, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("Lookup - Icsw - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicswlookup); 
    
            foreach (DataRow row in pdsicswlookup.ttblicswlookupresults)
            {
                results.Add(Icswlookupresults.BuildIcswlookupresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Icsw> GetListByWordIndex(string searchTerm, bool fillMode, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         where.AppendKeywords(string.Empty, searchTerm, true, true, false);
         this.SetAndFetch(where.ToString(), fillMode, batchsize, fldList);
         this.SearchWordIndex(batchsize == 0 ? DefaultFetchWhereRowCount : batchsize , where.ToString());
         return (from DataRow row in this.dataSet.ttblicsw.Rows select this.BuildFromRow(row)).ToList();
      }
  
      protected void SearchWordIndex(int batchSize, string searchTerm)
      {
         NLogLoggerP.Trace("SearchWordIndex - Icsw - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcswProxy = this.proxyAppObject.CreatePO_icswproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcswProxy.SearchWordIndex(batchSize, searchTerm, ref this.pdsContext, out this.dataSet, out string cErrorMessage, out bool moreRecords);
                   ErrorReportingHelper.ReportErrors(cErrorMessage);
                   this.ReportErrors(this.pdsContext);
                   this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SearchWordIndex - Icsw - After Call");
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
  