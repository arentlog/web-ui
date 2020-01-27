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
   using Models.Pdsglsa;
   using Models.Pdsglaccountlookup;
   using Models.Complex;

   public partial class GlsaAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsglsa";
      private GLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> glsaTableControlKey;
		
      private pdsglsaDataSet dataSet;
        
      public GlsaAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new GLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsglsaDataSet() { DataSetName = DataSetName };
            this.glsaTableControlKey = this.dataSet.ttblglsa.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.glsaTableControlKey))
            {
               this.CreateTableControlParameters(this.glsaTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in GlsaAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Glsaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poGlsaproxy = this.proxyAppObject.CreatePO_glsaproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poGlsaproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Glsaproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.glsaTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.glsaTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Glsaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGlsaproxy = this.proxyAppObject.CreatePO_glsaproxy())
               {
                  this.SetRequiredContextParameters();
                  poGlsaproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Glsaproxy - After Call");
      }
   

      public Glsa GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Glsa glsa = null;
         if (row != null)
         {
             glsa = this.BuildFromRow(row);
         }
         return glsa;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(glsa) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblglsa.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Glsa> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(glsa)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Glsa Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblglsa.AsEnumerable().SingleOrDefault();
         Glsa glsa = null;
         if (row != null)
         {
             glsa = this.BuildFromRow(row);
         }
         return glsa;
      }
	  
	  
	  public IEnumerable<Glsa> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("glsa.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("glsa.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblglsa.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Glsa> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("glsa.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glsa> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblglsa.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Glsa Get(int cono, int yr, int gldivno, int gldeptno, int glacctno, int glsubno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glsa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.yr = {0}", yr);
         }
         if (gldivno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.gldivno = {0}", gldivno);
         }
         if (gldeptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.gldeptno = {0}", gldeptno);
         }
         if (glacctno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.glacctno = {0}", glacctno);
         }
         if (glsubno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.glsubno = {0}", glsubno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Glsa> GetListByAcctsub(decimal acctsub, int yr, int cono, int gldeptno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (acctsub != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("glsa.acctsub = {0}", acctsub);
         }
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.yr = {0}", yr);
         }
         sb.AppendFormatWithEscape(" AND glsa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (gldeptno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.gldeptno = {0}", gldeptno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glsa> GetListByEsbupdtfl(int cono, int yr, bool esbupdtfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glsa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.yr = {0}", yr);
         }
         sb.AppendFormatWithEscape(" AND glsa.esbupdtfl = {0}", esbupdtfl);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glsa> GetListByGlrptgroup(int cono, int yr, string glrptgroup, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glsa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.yr = {0}", yr);
         }
         if (!string.IsNullOrEmpty(glrptgroup)) 
         {
             sb.AppendFormatWithEscape(" AND glsa.glrptgroup = '{0}'", glrptgroup);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Glsa> GetListByLkup(int cono, int yr, string lookupnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("glsa.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (yr != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND glsa.yr = {0}", yr);
         }
         if (!string.IsNullOrEmpty(lookupnm)) 
         {
             sb.AppendFormatWithEscape(" AND glsa.lookupnm = '{0}'", lookupnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Glsa GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("glsa.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Glsa> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("glsa.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Glsa BuildFromRow(DataRow row)
      {
         var returnRecord = Glsa.BuildGlsaFromRow(row);
         returnRecord = this.BuildExtraFromRow<Glsa>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Glsa record)
      {
         Glsa.UpdateRowFromGlsa(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Glsa Insert(Glsa record)
      {
         DataRow row = this.dataSet.ttblglsa.NewttblglsaRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblglsa.AddttblglsaRow((pdsglsaDataSet.ttblglsaRow)row);
         this.SaveChanges();
         return this.dataSet.ttblglsa.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglsa.Rows[0]) : null;
      }
  

      public Glsa Update(Glsa record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblglsa.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblglsa.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Glsa record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblglsa.NewttblglsaRow();
            Glsa.BuildMinimalRow(ref row, record);
            this.dataSet.ttblglsa.AddttblglsaRow((pdsglsaDataSet.ttblglsaRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Glsa record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblglsa.NewttblglsaRow();
            Glsa.BuildMinimalRow(ref row, record);
            this.dataSet.ttblglsa.AddttblglsaRow((pdsglsaDataSet.ttblglsaRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Glsa() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Glsa() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public GlsaLookupResponseAPI Lookup(Glaccountlookupcriteria glaccountlookupcriteria)
      {   
         var result = new GlsaLookupResponseAPI();
         
         var pdsglaccountlookup = new pdsglaccountlookupDataSet();
            
         DataRow ttblglaccountlookupcriteriaCriteria = pdsglaccountlookup.ttblglaccountlookupcriteria.NewttblglaccountlookupcriteriaRow();
         Glaccountlookupcriteria.UpdateRowFromGlaccountlookupcriteria(ref ttblglaccountlookupcriteriaCriteria, glaccountlookupcriteria);
         pdsglaccountlookup.ttblglaccountlookupcriteria.AddttblglaccountlookupcriteriaRow((pdsglaccountlookupDataSet.ttblglaccountlookupcriteriaRow)ttblglaccountlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Glsa - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGlsaproxy = this.proxyAppObject.CreatePO_glsaproxy())
               {
                   this.SetRequiredContextParameters();
                   poGlsaproxy.Lookup(ref pdsContext, ref pdsglaccountlookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Glsa - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsglaccountlookup); 
    
         foreach (DataRow row in pdsglaccountlookup.ttblglaccountlookupresults)
         {
            result.glaccountlookupresults.Add(Glaccountlookupresults.BuildGlaccountlookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Glsa> GetListByWordIndex(string searchTerm, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         where.AppendKeywords(string.Empty, searchTerm, true, true, false);
         this.SetAndFetch(where.ToString(), batchsize, fldList);
         this.SearchWordIndex(batchsize == 0 ? DefaultFetchWhereRowCount : batchsize , where.ToString());
         return (from DataRow row in this.dataSet.ttblglsa.Rows select this.BuildFromRow(row)).ToList();
      }
  
      protected void SearchWordIndex(int batchSize, string searchTerm)
      {
         NLogLoggerP.Trace("SearchWordIndex - Glsa - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poGlsaProxy = this.proxyAppObject.CreatePO_glsaproxy())
               {
                   this.SetRequiredContextParameters();
                   poGlsaProxy.SearchWordIndex(batchSize, searchTerm, ref this.pdsContext, out this.dataSet, out string cErrorMessage, out bool moreRecords);
                   ErrorReportingHelper.ReportErrors(cErrorMessage);
                   this.ReportErrors(this.pdsContext);
                   this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SearchWordIndex - Glsa - After Call");
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
  