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
   using Models.Pdssasj;
   using Models.Pdsjournallookup;
   using Models.Complex;

   public partial class SasjAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssasj";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sasjTableControlKey;
		
      private pdssasjDataSet dataSet;
        
      public SasjAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssasjDataSet() { DataSetName = DataSetName };
            this.sasjTableControlKey = this.dataSet.ttblsasj.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sasjTableControlKey))
            {
               this.CreateTableControlParameters(this.sasjTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SasjAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sasjproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSasjproxy = this.proxyAppObject.CreatePO_sasjproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSasjproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sasjproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sasjTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sasjTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sasjproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSasjproxy = this.proxyAppObject.CreatePO_sasjproxy())
               {
                  this.SetRequiredContextParameters();
                  poSasjproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sasjproxy - After Call");
      }
   

      public Sasj GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sasj sasj = null;
         if (row != null)
         {
             sasj = this.BuildFromRow(row);
         }
         return sasj;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sasj) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsasj.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sasj> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sasj)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sasj Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsasj.AsEnumerable().SingleOrDefault();
         Sasj sasj = null;
         if (row != null)
         {
             sasj = this.BuildFromRow(row);
         }
         return sasj;
      }
	  
	  
      public IEnumerable<Sasj> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sasj.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsasj.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sasj Get(int cono, int jrnlno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasj.jrnlno = {0}", jrnlno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Sasj> GetListByBal(int cono, string ourproc, bool balancefl, DateTime? opendt, int jrnlno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(ourproc)) 
         {
             sb.AppendFormatWithEscape(" AND sasj.ourproc = '{0}'", ourproc);
         }
         sb.AppendFormatWithEscape(" AND sasj.balancefl = {0}", balancefl);
         if (opendt != null) 
         {
             sb.AppendFormatWithEscape(" AND sasj.opendt = '{0}'", opendt);
         }
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasj.jrnlno = {0}", jrnlno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByClose(int cono, string oper2, bool closefl, bool batchfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(oper2)) 
         {
             sb.AppendFormatWithEscape(" AND sasj.oper2 = '{0}'", oper2);
         }
         sb.AppendFormatWithEscape(" AND sasj.closefl = {0}", closefl);
         sb.AppendFormatWithEscape(" AND sasj.batchfl = {0}", batchfl);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByInq(int cono, string oper2, int jrnlno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(oper2)) 
         {
             sb.AppendFormatWithEscape(" AND sasj.oper2 = '{0}'", oper2);
         }
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasj.jrnlno = {0}", jrnlno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByInqd(int cono, int jrnlno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasj.jrnlno = {0}", jrnlno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByIntellexdt(int cono, DateTime? intellexdt, DateTime? opendt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (intellexdt != null) 
         {
             sb.AppendFormatWithEscape(" AND sasj.intellexdt = '{0}'", intellexdt);
         }
         if (opendt != null) 
         {
             sb.AppendFormatWithEscape(" AND sasj.opendt = '{0}'", opendt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByPrint(int cono, bool printfl, int jrnlno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND sasj.printfl = {0}", printfl);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasj.jrnlno = {0}", jrnlno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByProc(int cono, string currproc, bool closefl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(currproc)) 
         {
             sb.AppendFormatWithEscape(" AND sasj.currproc = '{0}'", currproc);
         }
         sb.AppendFormatWithEscape(" AND sasj.closefl = {0}", closefl);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListBySmmerge(int cono, bool smmergedfl, string ourproc, int jrnlno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasj.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND sasj.smmergedfl = {0}", smmergedfl);
         if (!string.IsNullOrEmpty(ourproc)) 
         {
             sb.AppendFormatWithEscape(" AND sasj.ourproc = '{0}'", ourproc);
         }
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasj.jrnlno = {0}", jrnlno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasj> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("sasj.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Sasj BuildFromRow(DataRow row)
      {
         var returnRecord = Sasj.BuildSasjFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sasj>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sasj record)
      {
         Sasj.UpdateRowFromSasj(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sasj Insert(Sasj record)
      {
         DataRow row = this.dataSet.ttblsasj.NewttblsasjRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsasj.AddttblsasjRow((pdssasjDataSet.ttblsasjRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsasj.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasj.Rows[0]) : null;
      }
  

      public Sasj Update(Sasj record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsasj.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasj.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sasj record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsasj.NewttblsasjRow();
            Sasj.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsasj.AddttblsasjRow((pdssasjDataSet.ttblsasjRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sasj() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public SasjLookupResponseAPI Lookup(Journallookupcriteria journallookupcriteria)
      {   
         var result = new SasjLookupResponseAPI();
         
         var pdsjournallookup = new pdsjournallookupDataSet();
            
         DataRow ttbljournallookupcriteriaCriteria = pdsjournallookup.ttbljournallookupcriteria.NewttbljournallookupcriteriaRow();
         Journallookupcriteria.UpdateRowFromJournallookupcriteria(ref ttbljournallookupcriteriaCriteria, journallookupcriteria);
         pdsjournallookup.ttbljournallookupcriteria.AddttbljournallookupcriteriaRow((pdsjournallookupDataSet.ttbljournallookupcriteriaRow)ttbljournallookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Sasj - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSasjproxy = this.proxyAppObject.CreatePO_sasjproxy())
               {
                   this.SetRequiredContextParameters();
                   poSasjproxy.Lookup(ref pdsContext, ref pdsjournallookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Sasj - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsjournallookup); 
    
         foreach (DataRow row in pdsjournallookup.ttbljournallookupresults)
         {
            result.journallookupresults.Add(Journallookupresults.BuildJournallookupresultsFromRow(row));
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
  