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
   using Models.Pdsicetf;

   public partial class IcetfAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicetf";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icetfTableControlKey;
		
      private pdsicetfDataSet dataSet;
        
      public IcetfAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicetfDataSet() { DataSetName = DataSetName };
            this.icetfTableControlKey = this.dataSet.ttblicetf.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icetfTableControlKey))
            {
               this.CreateTableControlParameters(this.icetfTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcetfAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icetfproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcetfproxy = this.proxyAppObject.CreatePO_icetfproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcetfproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icetfproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icetfTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icetfTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icetfproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcetfproxy = this.proxyAppObject.CreatePO_icetfproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcetfproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icetfproxy - After Call");
      }
   

      public Icetf GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icetf icetf = null;
         if (row != null)
         {
             icetf = this.BuildFromRow(row);
         }
         return icetf;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icetf) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicetf.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icetf> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icetf)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icetf Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicetf.AsEnumerable().SingleOrDefault();
         Icetf icetf = null;
         if (row != null)
         {
             icetf = this.BuildFromRow(row);
         }
         return icetf;
      }
	  
	  
      public IEnumerable<Icetf> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icetf.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icetf> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicetf.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icetf Get(int cono, string prod, string whse, DateTime? issuedt, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icetf.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icetf.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icetf.whse = '{0}'", whse);
         }
         if (issuedt != null) 
         {
             sb.AppendFormatWithEscape(" AND icetf.issuedt = '{0}'", issuedt);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetf.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icetf> GetListByBackpst(int cono, string prod, string whse, bool bpfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icetf.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icetf.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icetf.whse = '{0}'", whse);
         }
         sb.AppendFormatWithEscape(" AND icetf.bpfl = {0}", bpfl);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icetf> GetListByPono(int cono, int pono, int posuf, int polineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icetf.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetf.pono = {0}", pono);
         }
         if (posuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetf.posuf = {0}", posuf);
         }
         if (polineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetf.polineno = {0}", polineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icetf BuildFromRow(DataRow row)
      {
         var returnRecord = Icetf.BuildIcetfFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icetf>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icetf record)
      {
         Icetf.UpdateRowFromIcetf(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icetf Insert(Icetf record)
      {
         DataRow row = this.dataSet.ttblicetf.NewttblicetfRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicetf.AddttblicetfRow((pdsicetfDataSet.ttblicetfRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicetf.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicetf.Rows[0]) : null;
      }
  

      public Icetf Update(Icetf record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicetf.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicetf.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icetf record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicetf.NewttblicetfRow();
            Icetf.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicetf.AddttblicetfRow((pdsicetfDataSet.ttblicetfRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icetf() { rowID = selectRowId }).ToList();
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
  