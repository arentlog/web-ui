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
    
namespace Infor.Sxe.VA.Data.Adapters
{
   using com.infor.sxproxy.vaproxy;
   using com.infor.sxproxy.vaproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsvaspsav;

   public partial class VaspsavAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsvaspsav";
      private VAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> vaspsavTableControlKey;
		
      private pdsvaspsavDataSet dataSet;
        
      public VaspsavAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new VAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsvaspsavDataSet() { DataSetName = DataSetName };
            this.vaspsavTableControlKey = this.dataSet.ttblvaspsav.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.vaspsavTableControlKey))
            {
               this.CreateTableControlParameters(this.vaspsavTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in VaspsavAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Vaspsavproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poVaspsavproxy = this.proxyAppObject.CreatePO_vaspsavproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poVaspsavproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Vaspsavproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.vaspsavTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.vaspsavTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Vaspsavproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poVaspsavproxy = this.proxyAppObject.CreatePO_vaspsavproxy())
               {
                  this.SetRequiredContextParameters();
                  poVaspsavproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Vaspsavproxy - After Call");
      }
   

      public Vaspsav GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Vaspsav vaspsav = null;
         if (row != null)
         {
             vaspsav = this.BuildFromRow(row);
         }
         return vaspsav;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(vaspsav) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblvaspsav.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Vaspsav> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(vaspsav)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Vaspsav Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblvaspsav.AsEnumerable().SingleOrDefault();
         Vaspsav vaspsav = null;
         if (row != null)
         {
             vaspsav = this.BuildFromRow(row);
         }
         return vaspsav;
      }
	  
	  
      public IEnumerable<Vaspsav> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("vaspsav.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Vaspsav> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblvaspsav.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Vaspsav Get(int cono, string shipprod, string whse, int verno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("vaspsav.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND vaspsav.shipprod = '{0}'", shipprod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND vaspsav.whse = '{0}'", whse);
         }
         if (verno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND vaspsav.verno = {0}", verno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Vaspsav BuildFromRow(DataRow row)
      {
         var returnRecord = Vaspsav.BuildVaspsavFromRow(row);
         returnRecord = this.BuildExtraFromRow<Vaspsav>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Vaspsav record)
      {
         Vaspsav.UpdateRowFromVaspsav(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Vaspsav Insert(Vaspsav record)
      {
         DataRow row = this.dataSet.ttblvaspsav.NewttblvaspsavRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblvaspsav.AddttblvaspsavRow((pdsvaspsavDataSet.ttblvaspsavRow)row);
         this.SaveChanges();
         return this.dataSet.ttblvaspsav.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblvaspsav.Rows[0]) : null;
      }
  

      public Vaspsav Update(Vaspsav record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblvaspsav.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblvaspsav.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Vaspsav record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblvaspsav.NewttblvaspsavRow();
            Vaspsav.BuildMinimalRow(ref row, record);
            this.dataSet.ttblvaspsav.AddttblvaspsavRow((pdsvaspsavDataSet.ttblvaspsavRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Vaspsav() { rowID = selectRowId }).ToList();
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
  