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
    
namespace Infor.Sxe.EDI.Data.Adapters
{
   using com.infor.sxproxy.ediproxy;
   using com.infor.sxproxy.ediproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsedie;

   public partial class EdieAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsedie";
      private EDIProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> edieTableControlKey;
		
      private pdsedieDataSet dataSet;
        
      public EdieAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new EDIProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsedieDataSet() { DataSetName = DataSetName };
            this.edieTableControlKey = this.dataSet.ttbledie.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.edieTableControlKey))
            {
               this.CreateTableControlParameters(this.edieTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in EdieAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Edieproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poEdieproxy = this.proxyAppObject.CreatePO_edieproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poEdieproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Edieproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.edieTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.edieTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Edieproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poEdieproxy = this.proxyAppObject.CreatePO_edieproxy())
               {
                  this.SetRequiredContextParameters();
                  poEdieproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Edieproxy - After Call");
      }
   

      public Edie GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Edie edie = null;
         if (row != null)
         {
             edie = this.BuildFromRow(row);
         }
         return edie;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(edie) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbledie.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Edie> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(edie)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Edie Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbledie.AsEnumerable().SingleOrDefault();
         Edie edie = null;
         if (row != null)
         {
             edie = this.BuildFromRow(row);
         }
         return edie;
      }
	  
	  
      public IEnumerable<Edie> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("edie.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Edie> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbledie.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Edie Get(int cono, string batchnm, int seqno, bool level, int lineno, int errseqno, string docty, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edie.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(batchnm)) 
         {
             sb.AppendFormatWithEscape(" AND edie.batchnm = '{0}'", batchnm);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edie.seqno = {0}", seqno);
         }
         sb.AppendFormatWithEscape(" AND edie.level = {0}", level);
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edie.lineno = {0}", lineno);
         }
         if (errseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edie.errseqno = {0}", errseqno);
         }
         if (!string.IsNullOrEmpty(docty)) 
         {
             sb.AppendFormatWithEscape(" AND edie.docty = '{0}'", docty);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Edie> GetListByCustno(int cono, decimal custno, string whse, string docty, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edie.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edie.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND edie.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(docty)) 
         {
             sb.AppendFormatWithEscape(" AND edie.docty = '{0}'", docty);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Edie> GetListByEdiline(int cono, string batchnm, int seqno, bool level, string edilineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edie.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(batchnm)) 
         {
             sb.AppendFormatWithEscape(" AND edie.batchnm = '{0}'", batchnm);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND edie.seqno = {0}", seqno);
         }
         sb.AppendFormatWithEscape(" AND edie.level = {0}", level);
         if (!string.IsNullOrEmpty(edilineno)) 
         {
             sb.AppendFormatWithEscape(" AND edie.edilineno = '{0}'", edilineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Edie> GetListByErrty(int cono, string whse, string errty, string docty, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edie.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND edie.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(errty)) 
         {
             sb.AppendFormatWithEscape(" AND edie.errty = '{0}'", errty);
         }
         if (!string.IsNullOrEmpty(docty)) 
         {
             sb.AppendFormatWithEscape(" AND edie.docty = '{0}'", docty);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Edie> GetListByWhse(int cono, string whse, string docty, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("edie.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND edie.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(docty)) 
         {
             sb.AppendFormatWithEscape(" AND edie.docty = '{0}'", docty);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Edie BuildFromRow(DataRow row)
      {
         var returnRecord = Edie.BuildEdieFromRow(row);
         returnRecord = this.BuildExtraFromRow<Edie>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Edie record)
      {
         Edie.UpdateRowFromEdie(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Edie Insert(Edie record)
      {
         DataRow row = this.dataSet.ttbledie.NewttbledieRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbledie.AddttbledieRow((pdsedieDataSet.ttbledieRow)row);
         this.SaveChanges();
         return this.dataSet.ttbledie.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledie.Rows[0]) : null;
      }
  

      public Edie Update(Edie record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbledie.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbledie.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Edie record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbledie.NewttbledieRow();
            Edie.BuildMinimalRow(ref row, record);
            this.dataSet.ttbledie.AddttbledieRow((pdsedieDataSet.ttbledieRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Edie() { rowID = selectRowId }).ToList();
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
  