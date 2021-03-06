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
   using Models.Pdspoer;

   public partial class PoerAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspoer";
      private POProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> poerTableControlKey;
		
      private pdspoerDataSet dataSet;
        
      public PoerAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new POProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspoerDataSet() { DataSetName = DataSetName };
            this.poerTableControlKey = this.dataSet.ttblpoer.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.poerTableControlKey))
            {
               this.CreateTableControlParameters(this.poerTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PoerAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Poerproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPoerproxy = this.proxyAppObject.CreatePO_poerproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPoerproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Poerproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.poerTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.poerTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Poerproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPoerproxy = this.proxyAppObject.CreatePO_poerproxy())
               {
                  this.SetRequiredContextParameters();
                  poPoerproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Poerproxy - After Call");
      }
   

      public Poer GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Poer poer = null;
         if (row != null)
         {
             poer = this.BuildFromRow(row);
         }
         return poer;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(poer) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpoer.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Poer> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(poer)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Poer Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpoer.AsEnumerable().SingleOrDefault();
         Poer poer = null;
         if (row != null)
         {
             poer = this.BuildFromRow(row);
         }
         return poer;
      }
	  
	  
      public IEnumerable<Poer> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("poer.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Poer> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpoer.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Poer Get(int cono, string receiverno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poer.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(receiverno)) 
         {
             sb.AppendFormatWithEscape(" AND poer.receiverno = '{0}'", receiverno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Poer> GetListByUdnet(int cono, string location, decimal urecno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poer.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(location)) 
         {
             sb.AppendFormatWithEscape(" AND poer.location = '{0}'", location);
         }
         if (urecno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poer.urecno = {0}", urecno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Poer> GetListByWhse(int cono, string whse, string receiverno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poer.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND poer.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(receiverno)) 
         {
             sb.AppendFormatWithEscape(" AND poer.receiverno = '{0}'", receiverno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Poer BuildFromRow(DataRow row)
      {
         var returnRecord = Poer.BuildPoerFromRow(row);
         returnRecord = this.BuildExtraFromRow<Poer>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Poer record)
      {
         Poer.UpdateRowFromPoer(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Poer Insert(Poer record)
      {
         DataRow row = this.dataSet.ttblpoer.NewttblpoerRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpoer.AddttblpoerRow((pdspoerDataSet.ttblpoerRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpoer.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpoer.Rows[0]) : null;
      }
  

      public Poer Update(Poer record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpoer.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpoer.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Poer record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpoer.NewttblpoerRow();
            Poer.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpoer.AddttblpoerRow((pdspoerDataSet.ttblpoerRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Poer() { rowID = selectRowId }).ToList();
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
  