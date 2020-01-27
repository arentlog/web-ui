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
    
namespace Infor.Sxe.KP.Data.Adapters
{
   using com.infor.sxproxy.kpproxy;
   using com.infor.sxproxy.kpproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdskpet;

   public partial class KpetAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdskpet";
      private KPProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> kpetTableControlKey;
		private readonly Tuple<string, string> icspTableControlKey;
      private pdskpetDataSet dataSet;
        
      public KpetAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new KPProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdskpetDataSet() { DataSetName = DataSetName };
            this.kpetTableControlKey = this.dataSet.ttblkpet.GetTableControlParametersKey();
            this.icspTableControlKey = this.dataSet.ttblicsp.GetTableControlParametersKey();
            if (!this.tempTableControlParameters.ContainsKey(this.kpetTableControlKey))
            {
               this.CreateTableControlParameters(this.kpetTableControlKey);
            }
            if (!this.tempTableControlParameters.ContainsKey(this.icspTableControlKey))
            {
               this.CreateTableControlParameters(this.icspTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in KpetAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, bool fillMode, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Kpetproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, fillMode, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poKpetproxy = this.proxyAppObject.CreatePO_kpetproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poKpetproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Kpetproxy - After Call");
      }
      
      private void SetAndFetch(string where, bool fillMode, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.kpetTableControlKey, where, batchsize, fldList);
         this.SetFetchWhereParameters(this.icspTableControlKey, fillMode);
         this.SetTableParametersOnContext(this.kpetTableControlKey, true);
         this.SetTableParametersOnContext(this.icspTableControlKey);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Kpetproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poKpetproxy = this.proxyAppObject.CreatePO_kpetproxy())
               {
                  this.SetRequiredContextParameters();
                  poKpetproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Kpetproxy - After Call");
      }
   

      public Kpet GetByRowId(string rowId, bool fillMode, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fillMode, fldList);
         Kpet kpet = null;
         if (row != null)
         {
             kpet = this.BuildFromRow(row);
         }
         return kpet;
      }
   
      private DataRow GetRowByRowId(string rowId, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(kpet) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttblkpet.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Kpet> GetListByRowIdList(List<string> rowIds, bool fillMode, int batchsize, string fldList)
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
              where.AppendFormat("rowid(kpet)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), fillMode, batchsize, fldList);
      }

      protected Kpet Fetch(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         var row = this.dataSet.ttblkpet.AsEnumerable().SingleOrDefault();
         Kpet kpet = null;
         if (row != null)
         {
             kpet = this.BuildFromRow(row);
         }
         return kpet;
      }
	  
	  
	  public IEnumerable<Kpet> GetListByRowpointers(List<string> rowpointers, bool fillMode, string fldList)
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
              where.AppendFormat("kpet.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), fillMode, rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("kpet.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttblkpet.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Kpet> GetListAllByCono(int cono, bool fillMode, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("kpet.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Kpet> GetList(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblkpet.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Kpet Get(int cono, int wono, int wosuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (wono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wono = {0}", wono);
         }
         if (wosuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wosuf = {0}", wosuf);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, batchsize, fldList);
      }
  
      public IEnumerable<Kpet> GetListByProd(int cono, string shipprod, string whse, int wono, int wosuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND kpet.shipprod = '{0}'", shipprod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND kpet.whse = '{0}'", whse);
         }
         if (wono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wono = {0}", wono);
         }
         if (wosuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wosuf = {0}", wosuf);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Kpet GetByRowpointer(string rowpointer, bool fillMode, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("kpet.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, 1, fldList);
      }

      public IEnumerable<Kpet> GetListByRrarinit(int cono, string whse, bool statustype, string rrarinit, int wono, int wosuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND kpet.whse = '{0}'", whse);
         }
         sb.AppendFormatWithEscape(" AND kpet.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(rrarinit)) 
         {
             sb.AppendFormatWithEscape(" AND kpet.rrarinit = '{0}'", rrarinit);
         }
         if (wono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wono = {0}", wono);
         }
         if (wosuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wosuf = {0}", wosuf);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Kpet> GetListByTransdttmz(DateTime? transdttmz, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("kpet.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Kpet> GetListByVerno(int cono, string shipprod, int verno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND kpet.shipprod = '{0}'", shipprod);
         }
         if (verno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.verno = {0}", verno);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Kpet> GetListByWhse(int cono, string whse, int wono, int wosuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpet.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND kpet.whse = '{0}'", whse);
         }
         if (wono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wono = {0}", wono);
         }
         if (wosuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpet.wosuf = {0}", wosuf);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Kpet BuildFromRow(DataRow row)
      {
         var returnRecord = Kpet.BuildKpetFromRow(row);
         returnRecord = this.BuildExtraFromRow<Kpet>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Kpet record)
      {
         Kpet.UpdateRowFromKpet(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Kpet Insert(Kpet record)
      {
         DataRow row = this.dataSet.ttblkpet.NewttblkpetRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblkpet.AddttblkpetRow((pdskpetDataSet.ttblkpetRow)row);
         this.SaveChanges();
         return this.dataSet.ttblkpet.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblkpet.Rows[0]) : null;
      }
  

      public Kpet Update(Kpet record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblkpet.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblkpet.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Kpet record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblkpet.NewttblkpetRow();
            Kpet.BuildMinimalRow(ref row, record);
            this.dataSet.ttblkpet.AddttblkpetRow((pdskpetDataSet.ttblkpetRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Kpet record)
      {
         var row = this.GetRowByRowId(record.rowID, false, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblkpet.NewttblkpetRow();
            Kpet.BuildMinimalRow(ref row, record);
            this.dataSet.ttblkpet.AddttblkpetRow((pdskpetDataSet.ttblkpetRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Kpet() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Kpet() { rowpointer = selectRowpointer }).ToList();
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
  