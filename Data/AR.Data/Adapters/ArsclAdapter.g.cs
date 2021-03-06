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
    
namespace Infor.Sxe.AR.Data.Adapters
{
   using com.infor.sxproxy.arproxy;
   using com.infor.sxproxy.arproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsarscl;

   public partial class ArsclAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsarscl";
      private ARProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> arsclTableControlKey;
		
      private pdsarsclDataSet dataSet;
        
      public ArsclAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ARProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsarsclDataSet() { DataSetName = DataSetName };
            this.arsclTableControlKey = this.dataSet.ttblarscl.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.arsclTableControlKey))
            {
               this.CreateTableControlParameters(this.arsclTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ArsclAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Arsclproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poArsclproxy = this.proxyAppObject.CreatePO_arsclproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poArsclproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Arsclproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.arsclTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.arsclTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Arsclproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poArsclproxy = this.proxyAppObject.CreatePO_arsclproxy())
               {
                  this.SetRequiredContextParameters();
                  poArsclproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Arsclproxy - After Call");
      }
   

      public Arscl GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Arscl arscl = null;
         if (row != null)
         {
             arscl = this.BuildFromRow(row);
         }
         return arscl;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(arscl) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblarscl.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Arscl> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(arscl)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Arscl Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblarscl.AsEnumerable().SingleOrDefault();
         Arscl arscl = null;
         if (row != null)
         {
             arscl = this.BuildFromRow(row);
         }
         return arscl;
      }
	  
	  
      public IEnumerable<Arscl> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("arscl.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arscl> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblarscl.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Arscl Get(int cono, string type, decimal custno, string shipto, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arscl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND arscl.type = '{0}'", type);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND arscl.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND arscl.shipto = '{0}'", shipto);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Arscl> GetListByCustno(int cono, decimal custno, string shipto, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arscl.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND arscl.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(shipto)) 
         {
             sb.AppendFormatWithEscape(" AND arscl.shipto = '{0}'", shipto);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Arscl BuildFromRow(DataRow row)
      {
         var returnRecord = Arscl.BuildArsclFromRow(row);
         returnRecord = this.BuildExtraFromRow<Arscl>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Arscl record)
      {
         Arscl.UpdateRowFromArscl(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Arscl Insert(Arscl record)
      {
         DataRow row = this.dataSet.ttblarscl.NewttblarsclRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblarscl.AddttblarsclRow((pdsarsclDataSet.ttblarsclRow)row);
         this.SaveChanges();
         return this.dataSet.ttblarscl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarscl.Rows[0]) : null;
      }
  

      public Arscl Update(Arscl record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblarscl.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarscl.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Arscl record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblarscl.NewttblarsclRow();
            Arscl.BuildMinimalRow(ref row, record);
            this.dataSet.ttblarscl.AddttblarsclRow((pdsarsclDataSet.ttblarsclRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Arscl() { rowID = selectRowId }).ToList();
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
  