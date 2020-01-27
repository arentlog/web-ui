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
    
namespace Infor.Sxe.PD.Data.Adapters
{
   using com.infor.sxproxy.pdproxy;
   using com.infor.sxproxy.pdproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdspdsvcd;

   public partial class PdsvcdAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspdsvcd";
      private PDProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pdsvcdTableControlKey;
		
      private pdspdsvcdDataSet dataSet;
        
      public PdsvcdAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PDProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspdsvcdDataSet() { DataSetName = DataSetName };
            this.pdsvcdTableControlKey = this.dataSet.ttblpdsvcd.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pdsvcdTableControlKey))
            {
               this.CreateTableControlParameters(this.pdsvcdTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PdsvcdAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pdsvcdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPdsvcdproxy = this.proxyAppObject.CreatePO_pdsvcdproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPdsvcdproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pdsvcdproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pdsvcdTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pdsvcdTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pdsvcdproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPdsvcdproxy = this.proxyAppObject.CreatePO_pdsvcdproxy())
               {
                  this.SetRequiredContextParameters();
                  poPdsvcdproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pdsvcdproxy - After Call");
      }
   

      public Pdsvcd GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Pdsvcd pdsvcd = null;
         if (row != null)
         {
             pdsvcd = this.BuildFromRow(row);
         }
         return pdsvcd;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pdsvcd) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpdsvcd.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Pdsvcd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pdsvcd)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Pdsvcd Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpdsvcd.AsEnumerable().SingleOrDefault();
         Pdsvcd pdsvcd = null;
         if (row != null)
         {
             pdsvcd = this.BuildFromRow(row);
         }
         return pdsvcd;
      }
	  
	  
      public IEnumerable<Pdsvcd> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pdsvcd.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvcd> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpdsvcd.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Pdsvcd Get(int cono, string whse, decimal vendno, int shipfmno, string prod, string prodline, DateTime? startdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvcd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.whse = '{0}'", whse);
         }
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.vendno = {0}", vendno);
         }
         if (shipfmno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.shipfmno = {0}", shipfmno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.prodline = '{0}'", prodline);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.startdt = '{0}'", startdt);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Pdsvcd> GetListByProd(int cono, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvcd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvcd> GetListByProdline(int cono, string whse, string prodline, DateTime? startdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvcd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.prodline = '{0}'", prodline);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.startdt = '{0}'", startdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvcd> GetListByVendor(int cono, decimal vendno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvcd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.vendno = {0}", vendno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvcd> GetListByVendpdrecno(int cono, int vendpdrecno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvcd.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendpdrecno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvcd.vendpdrecno = {0}", vendpdrecno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Pdsvcd BuildFromRow(DataRow row)
      {
         var returnRecord = Pdsvcd.BuildPdsvcdFromRow(row);
         returnRecord = this.BuildExtraFromRow<Pdsvcd>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Pdsvcd record)
      {
         Pdsvcd.UpdateRowFromPdsvcd(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Pdsvcd Insert(Pdsvcd record)
      {
         DataRow row = this.dataSet.ttblpdsvcd.NewttblpdsvcdRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpdsvcd.AddttblpdsvcdRow((pdspdsvcdDataSet.ttblpdsvcdRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpdsvcd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpdsvcd.Rows[0]) : null;
      }
  

      public Pdsvcd Update(Pdsvcd record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpdsvcd.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpdsvcd.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Pdsvcd record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpdsvcd.NewttblpdsvcdRow();
            Pdsvcd.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpdsvcd.AddttblpdsvcdRow((pdspdsvcdDataSet.ttblpdsvcdRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Pdsvcd() { rowID = selectRowId }).ToList();
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
  