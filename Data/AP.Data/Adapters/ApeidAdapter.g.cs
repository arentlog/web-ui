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
    
namespace Infor.Sxe.AP.Data.Adapters
{
   using com.infor.sxproxy.approxy;
   using com.infor.sxproxy.approxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsapeid;

   public partial class ApeidAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsapeid";
      private APProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> apeidTableControlKey;
		
      private pdsapeidDataSet dataSet;
        
      public ApeidAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new APProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsapeidDataSet() { DataSetName = DataSetName };
            this.apeidTableControlKey = this.dataSet.ttblapeid.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.apeidTableControlKey))
            {
               this.CreateTableControlParameters(this.apeidTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ApeidAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Apeidproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poApeidproxy = this.proxyAppObject.CreatePO_apeidproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poApeidproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Apeidproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.apeidTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.apeidTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Apeidproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poApeidproxy = this.proxyAppObject.CreatePO_apeidproxy())
               {
                  this.SetRequiredContextParameters();
                  poApeidproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Apeidproxy - After Call");
      }
   

      public Apeid GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Apeid apeid = null;
         if (row != null)
         {
             apeid = this.BuildFromRow(row);
         }
         return apeid;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(apeid) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblapeid.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Apeid> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(apeid)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Apeid Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblapeid.AsEnumerable().SingleOrDefault();
         Apeid apeid = null;
         if (row != null)
         {
             apeid = this.BuildFromRow(row);
         }
         return apeid;
      }
	  
	  
      public IEnumerable<Apeid> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("apeid.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblapeid.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Apeid Get(int cono, string groupnm, DateTime? createddt, int groupseqno, int detailseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apeid.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupseqno = {0}", groupseqno);
         }
         if (detailseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.detailseqno = {0}", detailseqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Apeid> GetListByAddonseqno(int cono, string groupnm, DateTime? createddt, int groupseqno, int pono, int posuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apeid.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupseqno = {0}", groupseqno);
         }
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.pono = {0}", pono);
         }
         if (posuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.posuf = {0}", posuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByDetailty(int cono, string groupnm, DateTime? createddt, int groupseqno, string detailty, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apeid.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupseqno = {0}", groupseqno);
         }
         if (!string.IsNullOrEmpty(detailty)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.detailty = '{0}'", detailty);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByPoline(int cono, string groupnm, DateTime? createddt, int groupseqno, int pono, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apeid.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupseqno = {0}", groupseqno);
         }
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.pono = {0}", pono);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByPono(int pono, int posuf, int lineno, string bundleid, int compseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape("apeid.pono = {0}", pono);
         }
         if (posuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.posuf = {0}", posuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.lineno = {0}", lineno);
         }
         if (!string.IsNullOrEmpty(bundleid)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.bundleid = '{0}'", bundleid);
         }
         if (compseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.compseqno = {0}", compseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByPosufline(int cono, string groupnm, DateTime? createddt, int groupseqno, int pono, int posuf, int lineno, string bundleid, int compseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apeid.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupseqno = {0}", groupseqno);
         }
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.pono = {0}", pono);
         }
         if (posuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.posuf = {0}", posuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.lineno = {0}", lineno);
         }
         if (!string.IsNullOrEmpty(bundleid)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.bundleid = '{0}'", bundleid);
         }
         if (compseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.compseqno = {0}", compseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByShipprod(int cono, string groupnm, DateTime? createddt, int groupseqno, string shipprod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apeid.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupseqno = {0}", groupseqno);
         }
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.shipprod = '{0}'", shipprod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByStatus(int cono, bool statustype, decimal vendno, string apinvno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND apeid.statustype = {0}", statustype);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(apinvno)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.apinvno = '{0}'", apinvno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeid> GetListByVendprod(int cono, string groupnm, DateTime? createddt, int groupseqno, string vendprod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeid.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupnm = '{0}'", groupnm);
         }
         if (createddt != null) 
         {
             sb.AppendFormatWithEscape(" AND apeid.createddt = '{0}'", createddt);
         }
         if (groupseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeid.groupseqno = {0}", groupseqno);
         }
         if (!string.IsNullOrEmpty(vendprod)) 
         {
             sb.AppendFormatWithEscape(" AND apeid.vendprod = '{0}'", vendprod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Apeid BuildFromRow(DataRow row)
      {
         var returnRecord = Apeid.BuildApeidFromRow(row);
         returnRecord = this.BuildExtraFromRow<Apeid>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Apeid record)
      {
         Apeid.UpdateRowFromApeid(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Apeid Insert(Apeid record)
      {
         DataRow row = this.dataSet.ttblapeid.NewttblapeidRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblapeid.AddttblapeidRow((pdsapeidDataSet.ttblapeidRow)row);
         this.SaveChanges();
         return this.dataSet.ttblapeid.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapeid.Rows[0]) : null;
      }
  

      public Apeid Update(Apeid record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblapeid.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapeid.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Apeid record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblapeid.NewttblapeidRow();
            Apeid.BuildMinimalRow(ref row, record);
            this.dataSet.ttblapeid.AddttblapeidRow((pdsapeidDataSet.ttblapeidRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Apeid() { rowID = selectRowId }).ToList();
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
  