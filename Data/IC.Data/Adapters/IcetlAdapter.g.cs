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
   using Models.Pdsicetl;

   public partial class IcetlAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicetl";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icetlTableControlKey;
		
      private pdsicetlDataSet dataSet;
        
      public IcetlAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicetlDataSet() { DataSetName = DataSetName };
            this.icetlTableControlKey = this.dataSet.ttblicetl.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icetlTableControlKey))
            {
               this.CreateTableControlParameters(this.icetlTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcetlAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icetlproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcetlproxy = this.proxyAppObject.CreatePO_icetlproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcetlproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icetlproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icetlTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icetlTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icetlproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcetlproxy = this.proxyAppObject.CreatePO_icetlproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcetlproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icetlproxy - After Call");
      }
   

      public Icetl GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icetl icetl = null;
         if (row != null)
         {
             icetl = this.BuildFromRow(row);
         }
         return icetl;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icetl) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicetl.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icetl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icetl)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icetl Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicetl.AsEnumerable().SingleOrDefault();
         Icetl icetl = null;
         if (row != null)
         {
             icetl = this.BuildFromRow(row);
         }
         return icetl;
      }
	  
	  
      public IEnumerable<Icetl> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icetl.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icetl> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicetl.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icetl Get(int cono, string prod, string whse, string lotno, string ordertype, int orderno, int ordersuf, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icetl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(lotno)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.lotno = '{0}'", lotno);
         }
         if (!string.IsNullOrEmpty(ordertype)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.ordertype = '{0}'", ordertype);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icetl> GetListByOrder(int cono, string ordertype, int orderno, int ordersuf, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icetl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(ordertype)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.ordertype = '{0}'", ordertype);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icetl.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icetl> GetListByPostdt(int cono, string whse, string prod, string lotno, DateTime? postdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icetl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(lotno)) 
         {
             sb.AppendFormatWithEscape(" AND icetl.lotno = '{0}'", lotno);
         }
         if (postdt != null) 
         {
             sb.AppendFormatWithEscape(" AND icetl.postdt = '{0}'", postdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icetl BuildFromRow(DataRow row)
      {
         var returnRecord = Icetl.BuildIcetlFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icetl>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icetl record)
      {
         Icetl.UpdateRowFromIcetl(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icetl Insert(Icetl record)
      {
         DataRow row = this.dataSet.ttblicetl.NewttblicetlRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicetl.AddttblicetlRow((pdsicetlDataSet.ttblicetlRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicetl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicetl.Rows[0]) : null;
      }
  

      public Icetl Update(Icetl record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicetl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicetl.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icetl record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicetl.NewttblicetlRow();
            Icetl.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicetl.AddttblicetlRow((pdsicetlDataSet.ttblicetlRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icetl() { rowID = selectRowId }).ToList();
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
  