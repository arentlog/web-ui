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
   using Models.Pdscmrp;

   public partial class CmrpAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscmrp";
      private CMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> cmrpTableControlKey;
		
      private pdscmrpDataSet dataSet;
        
      public CmrpAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new CMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscmrpDataSet() { DataSetName = DataSetName };
            this.cmrpTableControlKey = this.dataSet.ttblcmrp.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.cmrpTableControlKey))
            {
               this.CreateTableControlParameters(this.cmrpTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in CmrpAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Cmrpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poCmrpproxy = this.proxyAppObject.CreatePO_cmrpproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poCmrpproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Cmrpproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.cmrpTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.cmrpTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Cmrpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCmrpproxy = this.proxyAppObject.CreatePO_cmrpproxy())
               {
                  this.SetRequiredContextParameters();
                  poCmrpproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Cmrpproxy - After Call");
      }
   

      public Cmrp GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Cmrp cmrp = null;
         if (row != null)
         {
             cmrp = this.BuildFromRow(row);
         }
         return cmrp;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(cmrp) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcmrp.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Cmrp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(cmrp)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Cmrp Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcmrp.AsEnumerable().SingleOrDefault();
         Cmrp cmrp = null;
         if (row != null)
         {
             cmrp = this.BuildFromRow(row);
         }
         return cmrp;
      }
	  
	  

      public IEnumerable<Cmrp> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcmrp.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Cmrp Get(string slsrep, decimal prosno, DateTime? schstartdt, string schstarttm, decimal proposalno, string name, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmrp.slsrep = '{0}'", slsrep);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prosno = {0}", prosno);
         }
         if (schstartdt != null) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.schstartdt = '{0}'", schstartdt);
         }
         if (!string.IsNullOrEmpty(schstarttm)) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.schstarttm = '{0}'", schstarttm);
         }
         if (proposalno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.proposalno = {0}", proposalno);
         }
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.name = '{0}'", name);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Cmrp> GetListByActdate(string slsrep, decimal prosno, DateTime? schstartdt, string schstarttm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmrp.slsrep = '{0}'", slsrep);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prosno = {0}", prosno);
         }
         if (schstartdt != null) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.schstartdt = '{0}'", schstartdt);
         }
         if (!string.IsNullOrEmpty(schstarttm)) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.schstarttm = '{0}'", schstarttm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmrp> GetListByLevel(string slsrep, decimal prosno, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmrp.slsrep = '{0}'", slsrep);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prosno = {0}", prosno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmrp> GetListByPriority(string slsrep, decimal prosno, string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmrp.slsrep = '{0}'", slsrep);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prosno = {0}", prosno);
         }
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmrp> GetListByProposal(string slsrep, decimal prosno, decimal proposalno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmrp.slsrep = '{0}'", slsrep);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prosno = {0}", prosno);
         }
         if (proposalno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.proposalno = {0}", proposalno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmrp> GetListByProsno(decimal prosno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("cmrp.prosno = {0}", prosno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmrp> GetListByProspect(string slsrep, decimal prosno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmrp.slsrep = '{0}'", slsrep);
         }
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.prosno = {0}", prosno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmrp> GetListBySlsrep(string slsrep, DateTime? schstartdt, string schstarttm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("cmrp.slsrep = '{0}'", slsrep);
         }
         if (schstartdt != null) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.schstartdt = '{0}'", schstartdt);
         }
         if (!string.IsNullOrEmpty(schstarttm)) 
         {
             sb.AppendFormatWithEscape(" AND cmrp.schstarttm = '{0}'", schstarttm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Cmrp BuildFromRow(DataRow row)
      {
         var returnRecord = Cmrp.BuildCmrpFromRow(row);
         returnRecord = this.BuildExtraFromRow<Cmrp>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Cmrp record)
      {
         Cmrp.UpdateRowFromCmrp(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Cmrp Insert(Cmrp record)
      {
         DataRow row = this.dataSet.ttblcmrp.NewttblcmrpRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcmrp.AddttblcmrpRow((pdscmrpDataSet.ttblcmrpRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcmrp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmrp.Rows[0]) : null;
      }
  

      public Cmrp Update(Cmrp record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcmrp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmrp.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Cmrp record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcmrp.NewttblcmrpRow();
            Cmrp.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcmrp.AddttblcmrpRow((pdscmrpDataSet.ttblcmrpRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Cmrp() { rowID = selectRowId }).ToList();
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
  