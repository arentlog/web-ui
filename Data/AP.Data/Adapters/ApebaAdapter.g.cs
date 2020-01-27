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
   using Models.Pdsapeba;

   public partial class ApebaAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsapeba";
      private APProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> apebaTableControlKey;
		
      private pdsapebaDataSet dataSet;
        
      public ApebaAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new APProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsapebaDataSet() { DataSetName = DataSetName };
            this.apebaTableControlKey = this.dataSet.ttblapeba.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.apebaTableControlKey))
            {
               this.CreateTableControlParameters(this.apebaTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ApebaAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Apebaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poApebaproxy = this.proxyAppObject.CreatePO_apebaproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poApebaproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Apebaproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.apebaTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.apebaTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Apebaproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poApebaproxy = this.proxyAppObject.CreatePO_apebaproxy())
               {
                  this.SetRequiredContextParameters();
                  poApebaproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Apebaproxy - After Call");
      }
   

      public Apeba GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Apeba apeba = null;
         if (row != null)
         {
             apeba = this.BuildFromRow(row);
         }
         return apeba;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(apeba) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblapeba.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Apeba> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(apeba)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Apeba Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblapeba.AsEnumerable().SingleOrDefault();
         Apeba apeba = null;
         if (row != null)
         {
             apeba = this.BuildFromRow(row);
         }
         return apeba;
      }
	  
	  
      public IEnumerable<Apeba> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("apeba.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apeba> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblapeba.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Apeba Get(int cono, int jrnlno, int setno, int addonno, int pono, decimal posuf, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeba.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeba.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeba.setno = {0}", setno);
         }
         if (addonno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeba.addonno = {0}", addonno);
         }
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeba.pono = {0}", pono);
         }
         if (posuf != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeba.posuf = {0}", posuf);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Apeba> GetListByStatus(int cono, bool statustype, decimal vendno, string apinvno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apeba.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND apeba.statustype = {0}", statustype);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apeba.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(apinvno)) 
         {
             sb.AppendFormatWithEscape(" AND apeba.apinvno = '{0}'", apinvno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Apeba BuildFromRow(DataRow row)
      {
         var returnRecord = Apeba.BuildApebaFromRow(row);
         returnRecord = this.BuildExtraFromRow<Apeba>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Apeba record)
      {
         Apeba.UpdateRowFromApeba(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Apeba Insert(Apeba record)
      {
         DataRow row = this.dataSet.ttblapeba.NewttblapebaRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblapeba.AddttblapebaRow((pdsapebaDataSet.ttblapebaRow)row);
         this.SaveChanges();
         return this.dataSet.ttblapeba.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapeba.Rows[0]) : null;
      }
  

      public Apeba Update(Apeba record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblapeba.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapeba.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Apeba record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblapeba.NewttblapebaRow();
            Apeba.BuildMinimalRow(ref row, record);
            this.dataSet.ttblapeba.AddttblapebaRow((pdsapebaDataSet.ttblapebaRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Apeba() { rowID = selectRowId }).ToList();
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
  