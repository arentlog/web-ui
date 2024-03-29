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
   using Models.Pdsicscr;

   public partial class IcscrAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicscr";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icscrTableControlKey;
		
      private pdsicscrDataSet dataSet;
        
      public IcscrAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicscrDataSet() { DataSetName = DataSetName };
            this.icscrTableControlKey = this.dataSet.ttblicscr.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icscrTableControlKey))
            {
               this.CreateTableControlParameters(this.icscrTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcscrAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icscrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcscrproxy = this.proxyAppObject.CreatePO_icscrproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcscrproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icscrproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icscrTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icscrTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icscrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcscrproxy = this.proxyAppObject.CreatePO_icscrproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcscrproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icscrproxy - After Call");
      }
   

      public Icscr GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icscr icscr = null;
         if (row != null)
         {
             icscr = this.BuildFromRow(row);
         }
         return icscr;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icscr) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicscr.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icscr> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icscr)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icscr Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicscr.AsEnumerable().SingleOrDefault();
         Icscr icscr = null;
         if (row != null)
         {
             icscr = this.BuildFromRow(row);
         }
         return icscr;
      }
	  
	  
      public IEnumerable<Icscr> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icscr.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icscr> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicscr.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icscr Get(int cono, int resno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icscr.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (resno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icscr.resno = {0}", resno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icscr> GetListByActive(bool activefl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icscr.activefl = {0}", activefl);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icscr> GetListByCatalog(string catalog, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(catalog)) 
         {
             sb.AppendFormatWithEscape("icscr.catalog = '{0}'", catalog);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icscr> GetListByCono(int cono, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icscr.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icscr> GetListByCustno(decimal custno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("icscr.custno = {0}", custno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icscr> GetListByDesc(int cono, string resdesc, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icscr.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(resdesc)) 
         {
             sb.AppendFormatWithEscape(" AND icscr.resdesc = '{0}'", resdesc);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icscr> GetListByProdcat(string prodcat, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(prodcat)) 
         {
             sb.AppendFormatWithEscape("icscr.prodcat = '{0}'", prodcat);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icscr> GetListByVendno(decimal vendno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("icscr.vendno = {0}", vendno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icscr BuildFromRow(DataRow row)
      {
         var returnRecord = Icscr.BuildIcscrFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icscr>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icscr record)
      {
         Icscr.UpdateRowFromIcscr(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icscr Insert(Icscr record)
      {
         DataRow row = this.dataSet.ttblicscr.NewttblicscrRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicscr.AddttblicscrRow((pdsicscrDataSet.ttblicscrRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicscr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicscr.Rows[0]) : null;
      }
  

      public Icscr Update(Icscr record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicscr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicscr.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icscr record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicscr.NewttblicscrRow();
            Icscr.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicscr.AddttblicscrRow((pdsicscrDataSet.ttblicscrRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icscr() { rowID = selectRowId }).ToList();
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
  