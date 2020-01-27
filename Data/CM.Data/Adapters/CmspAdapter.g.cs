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
    
namespace Infor.Sxe.CM.Data.Adapters
{
   using com.infor.sxproxy.cmproxy;
   using com.infor.sxproxy.cmproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdscmsp;
   using Models.Pdscmprospectlookup;
   using Models.Complex;

   public partial class CmspAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscmsp";
      private CMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> cmspTableControlKey;
		
      private pdscmspDataSet dataSet;
        
      public CmspAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new CMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscmspDataSet() { DataSetName = DataSetName };
            this.cmspTableControlKey = this.dataSet.ttblcmsp.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.cmspTableControlKey))
            {
               this.CreateTableControlParameters(this.cmspTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in CmspAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Cmspproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poCmspproxy = this.proxyAppObject.CreatePO_cmspproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poCmspproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Cmspproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.cmspTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.cmspTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Cmspproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCmspproxy = this.proxyAppObject.CreatePO_cmspproxy())
               {
                  this.SetRequiredContextParameters();
                  poCmspproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Cmspproxy - After Call");
      }
   

      public Cmsp GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Cmsp cmsp = null;
         if (row != null)
         {
             cmsp = this.BuildFromRow(row);
         }
         return cmsp;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(cmsp) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcmsp.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Cmsp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(cmsp)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Cmsp Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcmsp.AsEnumerable().SingleOrDefault();
         Cmsp cmsp = null;
         if (row != null)
         {
             cmsp = this.BuildFromRow(row);
         }
         return cmsp;
      }
	  
	  
	  public IEnumerable<Cmsp> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("cmsp.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("cmsp.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcmsp.AsEnumerable().SingleOrDefault();
      }

      public IEnumerable<Cmsp> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcmsp.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Cmsp Get(decimal prosno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("cmsp.prosno = {0}", prosno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Cmsp> GetListByAddr(string state, string city, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(state)) 
         {
             sb.AppendFormatWithEscape("cmsp.state = '{0}'", state);
         }
         if (!string.IsNullOrEmpty(city)) 
         {
             sb.AppendFormatWithEscape(" AND cmsp.city = '{0}'", city);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsp> GetListByCustno(int conoul, decimal custno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (conoul != int.MinValue) 
         {
             sb.AppendFormatWithEscape("cmsp.conoul = {0}", conoul);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmsp.custno = {0}", custno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsp> GetListByName(string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape("cmsp.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsp> GetListByPhoneno(string phoneno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(phoneno)) 
         {
             sb.AppendFormatWithEscape("cmsp.phoneno = '{0}'", phoneno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsp> GetListByProstype(string prostype, decimal prosno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(prostype)) 
         {
             sb.AppendFormatWithEscape("cmsp.prostype = '{0}'", prostype);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmsp.prosno = {0}", prosno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Cmsp GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("cmsp.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Cmsp> GetListBySlsrep(string slsrep, string prostype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmsp.slsrep = '{0}'", slsrep);
         }
         if (!string.IsNullOrEmpty(prostype)) 
         {
             sb.AppendFormatWithEscape(" AND cmsp.prostype = '{0}'", prostype);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsp> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("cmsp.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsp> GetListByZipcd(string zipcd, decimal prosno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(zipcd)) 
         {
             sb.AppendFormatWithEscape("cmsp.zipcd = '{0}'", zipcd);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmsp.prosno = {0}", prosno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Cmsp BuildFromRow(DataRow row)
      {
         var returnRecord = Cmsp.BuildCmspFromRow(row);
         returnRecord = this.BuildExtraFromRow<Cmsp>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Cmsp record)
      {
         Cmsp.UpdateRowFromCmsp(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Cmsp Insert(Cmsp record)
      {
         DataRow row = this.dataSet.ttblcmsp.NewttblcmspRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcmsp.AddttblcmspRow((pdscmspDataSet.ttblcmspRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcmsp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmsp.Rows[0]) : null;
      }
  

      public Cmsp Update(Cmsp record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcmsp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmsp.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Cmsp record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcmsp.NewttblcmspRow();
            Cmsp.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcmsp.AddttblcmspRow((pdscmspDataSet.ttblcmspRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Cmsp record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblcmsp.NewttblcmspRow();
            Cmsp.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcmsp.AddttblcmspRow((pdscmspDataSet.ttblcmspRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Cmsp() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Cmsp() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public CmspLookupResponseAPI Lookup(Cmprospectlookupcriteria cmprospectlookupcriteria)
      {   
         var result = new CmspLookupResponseAPI();
         
         var pdscmprospectlookup = new pdscmprospectlookupDataSet();
            
         DataRow ttblcmprospectlookupcriteriaCriteria = pdscmprospectlookup.ttblcmprospectlookupcriteria.NewttblcmprospectlookupcriteriaRow();
         Cmprospectlookupcriteria.UpdateRowFromCmprospectlookupcriteria(ref ttblcmprospectlookupcriteriaCriteria, cmprospectlookupcriteria);
         pdscmprospectlookup.ttblcmprospectlookupcriteria.AddttblcmprospectlookupcriteriaRow((pdscmprospectlookupDataSet.ttblcmprospectlookupcriteriaRow)ttblcmprospectlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Cmsp - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCmspproxy = this.proxyAppObject.CreatePO_cmspproxy())
               {
                   this.SetRequiredContextParameters();
                   poCmspproxy.Lookup(ref pdsContext, ref pdscmprospectlookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Cmsp - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscmprospectlookup); 
    
         foreach (DataRow row in pdscmprospectlookup.ttblcmprospectlookupresults)
         {
            result.cmprospectlookupresults.Add(Cmprospectlookupresults.BuildCmprospectlookupresultsFromRow(row));
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
  