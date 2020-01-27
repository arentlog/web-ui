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
    
namespace Infor.Sxe.SM.Data.Adapters
{
   using com.infor.sxproxy.smproxy;
   using com.infor.sxproxy.smproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssmsn;

   public partial class SmsnAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssmsn";
      private SMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> smsnTableControlKey;
		
      private pdssmsnDataSet dataSet;
        
      public SmsnAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssmsnDataSet() { DataSetName = DataSetName };
            this.smsnTableControlKey = this.dataSet.ttblsmsn.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.smsnTableControlKey))
            {
               this.CreateTableControlParameters(this.smsnTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SmsnAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Smsnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSmsnproxy = this.proxyAppObject.CreatePO_smsnproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSmsnproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Smsnproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.smsnTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.smsnTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Smsnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSmsnproxy = this.proxyAppObject.CreatePO_smsnproxy())
               {
                  this.SetRequiredContextParameters();
                  poSmsnproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Smsnproxy - After Call");
      }
   

      public Smsn GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Smsn smsn = null;
         if (row != null)
         {
             smsn = this.BuildFromRow(row);
         }
         return smsn;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(smsn) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsmsn.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Smsn> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(smsn)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Smsn Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsmsn.AsEnumerable().SingleOrDefault();
         Smsn smsn = null;
         if (row != null)
         {
             smsn = this.BuildFromRow(row);
         }
         return smsn;
      }
	  
	  
	  public IEnumerable<Smsn> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         var where = new StringBuilder();
         if (rowpointers != null && rowpointers.Count > 0)
         {
           foreach (var rowpointer in rowpointers)
           {
              if (where.ToString().Length > 0)
              {
                 where.Append(" OR ");
              }
              where.AppendFormat("smsn.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("smsn.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsmsn.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Smsn> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("smsn.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Smsn> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsmsn.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Smsn Get(int cono, string slsrep, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("smsn.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape(" AND smsn.slsrep = '{0}'", slsrep);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Smsn> GetListByCmslsrep(string slsrep, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(slsrep)) 
         {
             sb.AppendFormatWithEscape("smsn.slsrep = '{0}'", slsrep);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Smsn> GetListByName(int cono, string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("smsn.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape(" AND smsn.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Smsn GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("smsn.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Smsn> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("smsn.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Smsn BuildFromRow(DataRow row)
      {
         var returnRecord = Smsn.BuildSmsnFromRow(row);
         returnRecord = this.BuildExtraFromRow<Smsn>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Smsn record)
      {
         Smsn.UpdateRowFromSmsn(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Smsn Insert(Smsn record)
      {
         DataRow row = this.dataSet.ttblsmsn.NewttblsmsnRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsmsn.AddttblsmsnRow((pdssmsnDataSet.ttblsmsnRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsmsn.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsmsn.Rows[0]) : null;
      }
  

      public Smsn Update(Smsn record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsmsn.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsmsn.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Smsn record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsmsn.NewttblsmsnRow();
            Smsn.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsmsn.AddttblsmsnRow((pdssmsnDataSet.ttblsmsnRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Smsn record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblsmsn.NewttblsmsnRow();
            Smsn.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsmsn.AddttblsmsnRow((pdssmsnDataSet.ttblsmsnRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Smsn() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.DeleteUseRowID(rec);
            }
         }
      }
	  
 
      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         if (rowpointers != null)
         {
            var recList = rowpointers.Select(selectRowpointer => new Smsn() { rowpointer = selectRowpointer }).ToList();
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
  