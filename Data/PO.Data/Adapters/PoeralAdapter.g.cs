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
    
namespace Infor.Sxe.PO.Data.Adapters
{
   using com.infor.sxproxy.poproxy;
   using com.infor.sxproxy.poproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdspoeral;

   public partial class PoeralAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspoeral";
      private POProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> poeralTableControlKey;
		
      private pdspoeralDataSet dataSet;
        
      public PoeralAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new POProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspoeralDataSet() { DataSetName = DataSetName };
            this.poeralTableControlKey = this.dataSet.ttblpoeral.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.poeralTableControlKey))
            {
               this.CreateTableControlParameters(this.poeralTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PoeralAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Poeralproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPoeralproxy = this.proxyAppObject.CreatePO_poeralproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPoeralproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Poeralproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.poeralTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.poeralTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Poeralproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPoeralproxy = this.proxyAppObject.CreatePO_poeralproxy())
               {
                  this.SetRequiredContextParameters();
                  poPoeralproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Poeralproxy - After Call");
      }
   

      public Poeral GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Poeral poeral = null;
         if (row != null)
         {
             poeral = this.BuildFromRow(row);
         }
         return poeral;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(poeral) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpoeral.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Poeral> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(poeral)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Poeral Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpoeral.AsEnumerable().SingleOrDefault();
         Poeral poeral = null;
         if (row != null)
         {
             poeral = this.BuildFromRow(row);
         }
         return poeral;
      }
	  
	  
      public IEnumerable<Poeral> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("poeral.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Poeral> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpoeral.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Poeral Get(int cono, int reportno, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poeral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.reportno = {0}", reportno);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Poeral> GetListByComprank(int cono, int reportno, string companyrank, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poeral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.reportno = {0}", reportno);
         }
         if (!string.IsNullOrEmpty(companyrank)) 
         {
             sb.AppendFormatWithEscape(" AND poeral.companyrank = '{0}'", companyrank);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Poeral> GetListByProd(int cono, int reportno, string shipprod, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poeral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.reportno = {0}", reportno);
         }
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND poeral.shipprod = '{0}'", shipprod);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Poeral> GetListByProduct(int cono, string shipprod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poeral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND poeral.shipprod = '{0}'", shipprod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Poeral> GetListByWhserank(int cono, int reportno, string whserank, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poeral.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (reportno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.reportno = {0}", reportno);
         }
         if (!string.IsNullOrEmpty(whserank)) 
         {
             sb.AppendFormatWithEscape(" AND poeral.whserank = '{0}'", whserank);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poeral.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Poeral BuildFromRow(DataRow row)
      {
         var returnRecord = Poeral.BuildPoeralFromRow(row);
         returnRecord = this.BuildExtraFromRow<Poeral>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Poeral record)
      {
         Poeral.UpdateRowFromPoeral(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Poeral Insert(Poeral record)
      {
         DataRow row = this.dataSet.ttblpoeral.NewttblpoeralRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpoeral.AddttblpoeralRow((pdspoeralDataSet.ttblpoeralRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpoeral.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpoeral.Rows[0]) : null;
      }
  

      public Poeral Update(Poeral record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpoeral.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpoeral.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Poeral record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpoeral.NewttblpoeralRow();
            Poeral.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpoeral.AddttblpoeralRow((pdspoeralDataSet.ttblpoeralRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Poeral() { rowID = selectRowId }).ToList();
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
  