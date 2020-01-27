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
   using Models.Pdsicsoc;

   public partial class IcsocAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsoc";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsocTableControlKey;
		
      private pdsicsocDataSet dataSet;
        
      public IcsocAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsocDataSet() { DataSetName = DataSetName };
            this.icsocTableControlKey = this.dataSet.ttblicsoc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsocTableControlKey))
            {
               this.CreateTableControlParameters(this.icsocTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsocAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsocproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsocproxy = this.proxyAppObject.CreatePO_icsocproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsocproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsocproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsocTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsocTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsocproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsocproxy = this.proxyAppObject.CreatePO_icsocproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsocproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsocproxy - After Call");
      }
   

      public Icsoc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsoc icsoc = null;
         if (row != null)
         {
             icsoc = this.BuildFromRow(row);
         }
         return icsoc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsoc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsoc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsoc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsoc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsoc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsoc.AsEnumerable().SingleOrDefault();
         Icsoc icsoc = null;
         if (row != null)
         {
             icsoc = this.BuildFromRow(row);
         }
         return icsoc;
      }
	  
	  
      public IEnumerable<Icsoc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsoc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsoc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsoc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsoc Get(int cono, int levelcd, decimal custno, string shipto, string pricetype, string whse, string custtype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsoc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (levelcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.levelcd = {0}", levelcd);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.shipto = '{0}'", shipto);
         }
         if (!string.IsNullOrEmpty(pricetype)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.pricetype = '{0}'", pricetype);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(custtype)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.custtype = '{0}'", custtype);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsoc> GetListByCustty(int cono, int levelcd, string custtype, string pricetype, string whse, decimal custno, string shipto, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsoc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (levelcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.levelcd = {0}", levelcd);
         }
         if (!string.IsNullOrEmpty(custtype)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.custtype = '{0}'", custtype);
         }
         if (!string.IsNullOrEmpty(pricetype)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.pricetype = '{0}'", pricetype);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.whse = '{0}'", whse);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND icsoc.shipto = '{0}'", shipto);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsoc BuildFromRow(DataRow row)
      {
         var returnRecord = Icsoc.BuildIcsocFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsoc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsoc record)
      {
         Icsoc.UpdateRowFromIcsoc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsoc Insert(Icsoc record)
      {
         DataRow row = this.dataSet.ttblicsoc.NewttblicsocRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsoc.AddttblicsocRow((pdsicsocDataSet.ttblicsocRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsoc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsoc.Rows[0]) : null;
      }
  

      public Icsoc Update(Icsoc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsoc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsoc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsoc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsoc.NewttblicsocRow();
            Icsoc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsoc.AddttblicsocRow((pdsicsocDataSet.ttblicsocRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsoc() { rowID = selectRowId }).ToList();
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
  