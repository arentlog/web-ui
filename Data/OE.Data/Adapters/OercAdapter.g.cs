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
   using Models.Pdsoerc;

   public partial class OercAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsoerc";
      private OEProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> oercTableControlKey;
		
      private pdsoercDataSet dataSet;
        
      public OercAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OEProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsoercDataSet() { DataSetName = DataSetName };
            this.oercTableControlKey = this.dataSet.ttbloerc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.oercTableControlKey))
            {
               this.CreateTableControlParameters(this.oercTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OercAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Oercproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOercproxy = this.proxyAppObject.CreatePO_oercproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOercproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Oercproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.oercTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.oercTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Oercproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOercproxy = this.proxyAppObject.CreatePO_oercproxy())
               {
                  this.SetRequiredContextParameters();
                  poOercproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Oercproxy - After Call");
      }
   

      public Oerc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Oerc oerc = null;
         if (row != null)
         {
             oerc = this.BuildFromRow(row);
         }
         return oerc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(oerc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbloerc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Oerc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(oerc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Oerc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbloerc.AsEnumerable().SingleOrDefault();
         Oerc oerc = null;
         if (row != null)
         {
             oerc = this.BuildFromRow(row);
         }
         return oerc;
      }
	  
	  
      public IEnumerable<Oerc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("oerc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oerc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbloerc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Oerc Get(int cono, int invno, int invsuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oerc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (invno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oerc.invno = {0}", invno);
         }
         if (invsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oerc.invsuf = {0}", invsuf);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Oerc> GetListByCustno(int cono, decimal custno, string shipto, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oerc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oerc.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND oerc.shipto = '{0}'", shipto);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Oerc> GetListByOrderno(int cono, int orderno, int ordersuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oerc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oerc.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oerc.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Oerc BuildFromRow(DataRow row)
      {
         var returnRecord = Oerc.BuildOercFromRow(row);
         returnRecord = this.BuildExtraFromRow<Oerc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Oerc record)
      {
         Oerc.UpdateRowFromOerc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Oerc Insert(Oerc record)
      {
         DataRow row = this.dataSet.ttbloerc.NewttbloercRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbloerc.AddttbloercRow((pdsoercDataSet.ttbloercRow)row);
         this.SaveChanges();
         return this.dataSet.ttbloerc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloerc.Rows[0]) : null;
      }
  

      public Oerc Update(Oerc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbloerc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloerc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Oerc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbloerc.NewttbloercRow();
            Oerc.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloerc.AddttbloercRow((pdsoercDataSet.ttbloercRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Oerc() { rowID = selectRowId }).ToList();
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
  