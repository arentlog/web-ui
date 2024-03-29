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
   using Models.Pdsaret;
   using Models.Pdsaretlookup;
   using Models.Complex;

   public partial class AretAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsaret";
      private ARProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> aretTableControlKey;
		
      private pdsaretDataSet dataSet;
        
      public AretAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ARProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsaretDataSet() { DataSetName = DataSetName };
            this.aretTableControlKey = this.dataSet.ttblaret.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.aretTableControlKey))
            {
               this.CreateTableControlParameters(this.aretTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AretAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Aretproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poAretproxy = this.proxyAppObject.CreatePO_aretproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poAretproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Aretproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.aretTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.aretTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Aretproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAretproxy = this.proxyAppObject.CreatePO_aretproxy())
               {
                  this.SetRequiredContextParameters();
                  poAretproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Aretproxy - After Call");
      }
   

      public Aret GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Aret aret = null;
         if (row != null)
         {
             aret = this.BuildFromRow(row);
         }
         return aret;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(aret) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblaret.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Aret> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(aret)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Aret Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblaret.AsEnumerable().SingleOrDefault();
         Aret aret = null;
         if (row != null)
         {
             aret = this.BuildFromRow(row);
         }
         return aret;
      }
	  
	  
	  public IEnumerable<Aret> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("aret.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("aret.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblaret.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Aret> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("aret.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aret> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblaret.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Aret Get(int cono, int jrnlno, int setno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.setno = {0}", setno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Aret> GetListByCod(int cono, int invno, int invsuf, bool statustype, int transcd, int sourcecd, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (invno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invno = {0}", invno);
         }
         if (invsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invsuf = {0}", invsuf);
         }
         sb.AppendFormatWithEscape(" AND aret.statustype = {0}", statustype);
         if (transcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.transcd = {0}", transcd);
         }
         if (sourcecd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.sourcecd = {0}", sourcecd);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByCrjrnl(int cono, int crjrnlno, int crsetno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (crjrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.crjrnlno = {0}", crjrnlno);
         }
         if (crsetno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.crsetno = {0}", crsetno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByDuedt(int cono, decimal custno, int transcd, int sourcecd, bool statustype, DateTime? duedt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.custno = {0}", custno);
         }
         if (transcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.transcd = {0}", transcd);
         }
         if (sourcecd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.sourcecd = {0}", sourcecd);
         }
         sb.AppendFormatWithEscape(" AND aret.statustype = {0}", statustype);
         if (duedt != null) 
         {
             sb.AppendFormatWithEscape(" AND aret.duedt = '{0}'", duedt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByInq(int cono, decimal custno, DateTime? invdt, int invno, int invsuf, int transcd, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.custno = {0}", custno);
         }
         if (invdt != null) 
         {
             sb.AppendFormatWithEscape(" AND aret.invdt = '{0}'", invdt);
         }
         if (invno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invno = {0}", invno);
         }
         if (invsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invsuf = {0}", invsuf);
         }
         if (transcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.transcd = {0}", transcd);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByInvdt(int cono, decimal custno, int invno, int invsuf, int seqno, DateTime? invdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.custno = {0}", custno);
         }
         if (invno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invno = {0}", invno);
         }
         if (invsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invsuf = {0}", invsuf);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.seqno = {0}", seqno);
         }
         if (invdt != null) 
         {
             sb.AppendFormatWithEscape(" AND aret.invdt = '{0}'", invdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByInvno(int cono, decimal custno, bool statustype, int transcd, int invno, int invsuf, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.custno = {0}", custno);
         }
         sb.AppendFormatWithEscape(" AND aret.statustype = {0}", statustype);
         if (transcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.transcd = {0}", transcd);
         }
         if (invno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invno = {0}", invno);
         }
         if (invsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.invsuf = {0}", invsuf);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Aret GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("aret.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Aret> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("aret.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Aret> GetListByUdnet(int cono, string location, decimal urecno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("aret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(location)) 
         {
             sb.AppendFormatWithEscape(" AND aret.location = '{0}'", location);
         }
         if (urecno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND aret.urecno = {0}", urecno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Aret BuildFromRow(DataRow row)
      {
         var returnRecord = Aret.BuildAretFromRow(row);
         returnRecord = this.BuildExtraFromRow<Aret>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Aret record)
      {
         Aret.UpdateRowFromAret(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Aret Insert(Aret record)
      {
         DataRow row = this.dataSet.ttblaret.NewttblaretRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblaret.AddttblaretRow((pdsaretDataSet.ttblaretRow)row);
         this.SaveChanges();
         return this.dataSet.ttblaret.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblaret.Rows[0]) : null;
      }
  

      public Aret Update(Aret record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblaret.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblaret.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Aret record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblaret.NewttblaretRow();
            Aret.BuildMinimalRow(ref row, record);
            this.dataSet.ttblaret.AddttblaretRow((pdsaretDataSet.ttblaretRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Aret record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblaret.NewttblaretRow();
            Aret.BuildMinimalRow(ref row, record);
            this.dataSet.ttblaret.AddttblaretRow((pdsaretDataSet.ttblaretRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Aret() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Aret() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public AretLookupResponseAPI Lookup(Aretlookupcriteria aretlookupcriteria)
      {   
         var result = new AretLookupResponseAPI();
         
         var pdsaretlookup = new pdsaretlookupDataSet();
            
         DataRow ttblaretlookupcriteriaCriteria = pdsaretlookup.ttblaretlookupcriteria.NewttblaretlookupcriteriaRow();
         Aretlookupcriteria.UpdateRowFromAretlookupcriteria(ref ttblaretlookupcriteriaCriteria, aretlookupcriteria);
         pdsaretlookup.ttblaretlookupcriteria.AddttblaretlookupcriteriaRow((pdsaretlookupDataSet.ttblaretlookupcriteriaRow)ttblaretlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Aret - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAretproxy = this.proxyAppObject.CreatePO_aretproxy())
               {
                   this.SetRequiredContextParameters();
                   poAretproxy.Lookup(ref pdsContext, ref pdsaretlookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Aret - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsaretlookup); 
    
         foreach (DataRow row in pdsaretlookup.ttblaretlookupresults)
         {
            result.aretlookupresults.Add(Aretlookupresults.BuildAretlookupresultsFromRow(row));
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
  