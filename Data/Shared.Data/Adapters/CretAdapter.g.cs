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
    
namespace Infor.Sxe.Shared.Data.Adapters
{
   using com.infor.sxproxy.sharedproxy;
   using com.infor.sxproxy.sharedproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdscret;

   public partial class CretAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscret";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> cretTableControlKey;
		
      private pdscretDataSet dataSet;
        
      public CretAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscretDataSet() { DataSetName = DataSetName };
            this.cretTableControlKey = this.dataSet.ttblcret.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.cretTableControlKey))
            {
               this.CreateTableControlParameters(this.cretTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in CretAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Cretproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poCretproxy = this.proxyAppObject.CreatePO_cretproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poCretproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Cretproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.cretTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.cretTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Cretproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCretproxy = this.proxyAppObject.CreatePO_cretproxy())
               {
                  this.SetRequiredContextParameters();
                  poCretproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Cretproxy - After Call");
      }
   

      public Cret GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Cret cret = null;
         if (row != null)
         {
             cret = this.BuildFromRow(row);
         }
         return cret;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(cret) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcret.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Cret> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(cret)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Cret Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcret.AsEnumerable().SingleOrDefault();
         Cret cret = null;
         if (row != null)
         {
             cret = this.BuildFromRow(row);
         }
         return cret;
      }
	  
	  
      public IEnumerable<Cret> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("cret.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cret> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcret.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Cret Get(int cono, int bankno, decimal checkno, int ckrectype, bool statustype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("cret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (bankno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.bankno = {0}", bankno);
         }
         if (checkno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.checkno = {0}", checkno);
         }
         if (ckrectype != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.ckrectype = {0}", ckrectype);
         }
         sb.AppendFormatWithEscape(" AND cret.statustype = {0}", statustype);
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Cret> GetListByBalanced(int cono, int bankno, bool balancedfl, int ckrectype, decimal checkno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("cret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (bankno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.bankno = {0}", bankno);
         }
         sb.AppendFormatWithEscape(" AND cret.balancedfl = {0}", balancedfl);
         if (ckrectype != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.ckrectype = {0}", ckrectype);
         }
         if (checkno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.checkno = {0}", checkno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cret> GetListByEnterdt(int cono, int bankno, DateTime? enterdt, DateTime? transdt, string transtm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("cret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (bankno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.bankno = {0}", bankno);
         }
         if (enterdt != null) 
         {
             sb.AppendFormatWithEscape(" AND cret.enterdt = '{0}'", enterdt);
         }
         if (transdt != null) 
         {
             sb.AppendFormatWithEscape(" AND cret.transdt = '{0}'", transdt);
         }
         if (!string.IsNullOrEmpty(transtm)) 
         {
             sb.AppendFormatWithEscape(" AND cret.transtm = '{0}'", transtm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cret> GetListByPospaydt(int cono, DateTime? pospaydttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("cret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (pospaydttmz != null) 
         {
             sb.AppendFormatWithEscape(" AND cret.pospaydttmz = '{0}'", pospaydttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cret> GetListByUdnet(int cono, string location, decimal urecno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("cret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(location)) 
         {
             sb.AppendFormatWithEscape(" AND cret.location = '{0}'", location);
         }
         if (urecno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cret.urecno = {0}", urecno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Cret BuildFromRow(DataRow row)
      {
         var returnRecord = Cret.BuildCretFromRow(row);
         returnRecord = this.BuildExtraFromRow<Cret>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Cret record)
      {
         Cret.UpdateRowFromCret(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Cret Insert(Cret record)
      {
         DataRow row = this.dataSet.ttblcret.NewttblcretRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcret.AddttblcretRow((pdscretDataSet.ttblcretRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcret.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcret.Rows[0]) : null;
      }
  

      public Cret Update(Cret record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcret.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcret.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Cret record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcret.NewttblcretRow();
            Cret.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcret.AddttblcretRow((pdscretDataSet.ttblcretRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Cret() { rowID = selectRowId }).ToList();
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
  