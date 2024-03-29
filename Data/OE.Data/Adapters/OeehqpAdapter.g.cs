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
    
namespace Infor.Sxe.OE.Data.Adapters
{
   using com.infor.sxproxy.oeproxy;
   using com.infor.sxproxy.oeproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsoeehqp;

   public partial class OeehqpAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsoeehqp";
      private OEProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> oeehqpTableControlKey;
		
      private pdsoeehqpDataSet dataSet;
        
      public OeehqpAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OEProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsoeehqpDataSet() { DataSetName = DataSetName };
            this.oeehqpTableControlKey = this.dataSet.ttbloeehqp.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.oeehqpTableControlKey))
            {
               this.CreateTableControlParameters(this.oeehqpTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OeehqpAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Oeehqpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOeehqpproxy = this.proxyAppObject.CreatePO_oeehqpproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOeehqpproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Oeehqpproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.oeehqpTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.oeehqpTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Oeehqpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOeehqpproxy = this.proxyAppObject.CreatePO_oeehqpproxy())
               {
                  this.SetRequiredContextParameters();
                  poOeehqpproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Oeehqpproxy - After Call");
      }
   

      public Oeehqp GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Oeehqp oeehqp = null;
         if (row != null)
         {
             oeehqp = this.BuildFromRow(row);
         }
         return oeehqp;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(oeehqp) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbloeehqp.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Oeehqp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(oeehqp)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Oeehqp Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbloeehqp.AsEnumerable().SingleOrDefault();
         Oeehqp oeehqp = null;
         if (row != null)
         {
             oeehqp = this.BuildFromRow(row);
         }
         return oeehqp;
      }
	  
	  
      public IEnumerable<Oeehqp> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("oeehqp.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeehqp> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbloeehqp.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Oeehqp Get(int cono, int orderno, int ordersuf, string type, string typekey, decimal vendno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeehqp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.ordersuf = {0}", ordersuf);
         }
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.type = '{0}'", type);
         }
         if (!string.IsNullOrEmpty(typekey)) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.typekey = '{0}'", typekey);
         }
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.vendno = {0}", vendno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Oeehqp> GetListByLineno(int cono, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeehqp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oeehqp> GetListByVendno(int cono, decimal vendno, string typekey, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeehqp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(typekey)) 
         {
             sb.AppendFormatWithEscape(" AND oeehqp.typekey = '{0}'", typekey);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Oeehqp BuildFromRow(DataRow row)
      {
         var returnRecord = Oeehqp.BuildOeehqpFromRow(row);
         returnRecord = this.BuildExtraFromRow<Oeehqp>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Oeehqp record)
      {
         Oeehqp.UpdateRowFromOeehqp(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Oeehqp Insert(Oeehqp record)
      {
         DataRow row = this.dataSet.ttbloeehqp.NewttbloeehqpRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbloeehqp.AddttbloeehqpRow((pdsoeehqpDataSet.ttbloeehqpRow)row);
         this.SaveChanges();
         return this.dataSet.ttbloeehqp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeehqp.Rows[0]) : null;
      }
  

      public Oeehqp Update(Oeehqp record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbloeehqp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeehqp.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Oeehqp record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbloeehqp.NewttbloeehqpRow();
            Oeehqp.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloeehqp.AddttbloeehqpRow((pdsoeehqpDataSet.ttbloeehqpRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Oeehqp() { rowID = selectRowId }).ToList();
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
  