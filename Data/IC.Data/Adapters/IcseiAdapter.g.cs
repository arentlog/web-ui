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
   using Models.Pdsicsei;

   public partial class IcseiAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsei";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icseiTableControlKey;
		
      private pdsicseiDataSet dataSet;
        
      public IcseiAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicseiDataSet() { DataSetName = DataSetName };
            this.icseiTableControlKey = this.dataSet.ttblicsei.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icseiTableControlKey))
            {
               this.CreateTableControlParameters(this.icseiTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcseiAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icseiproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcseiproxy = this.proxyAppObject.CreatePO_icseiproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcseiproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icseiproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icseiTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icseiTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icseiproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcseiproxy = this.proxyAppObject.CreatePO_icseiproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcseiproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icseiproxy - After Call");
      }
   

      public Icsei GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsei icsei = null;
         if (row != null)
         {
             icsei = this.BuildFromRow(row);
         }
         return icsei;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsei) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsei.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsei> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsei)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsei Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsei.AsEnumerable().SingleOrDefault();
         Icsei icsei = null;
         if (row != null)
         {
             icsei = this.BuildFromRow(row);
         }
         return icsei;
      }
	  
	  
	  public IEnumerable<Icsei> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("icsei.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("icsei.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsei.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Icsei> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsei.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsei> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsei.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsei Get(int cono, string whse, string prod, DateTime? primarykeydt, DateTime? secondarykeydt, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsei.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsei.prod = '{0}'", prod);
         }
         if (primarykeydt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsei.primarykeydt = '{0}'", primarykeydt);
         }
         if (secondarykeydt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsei.secondarykeydt = '{0}'", secondarykeydt);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsei.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsei> GetListByOrder(int cono, string ordertype, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(ordertype)) 
         {
             sb.AppendFormatWithEscape(" AND icsei.ordertype = '{0}'", ordertype);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsei.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsei.ordersuf = {0}", ordersuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsei.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsei GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("icsei.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Icsei> GetListBySrchty(int cono, string statustype, string whse, string prod, string nonstockty, DateTime? primarykeydt, DateTime? secondarykeydt, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsei.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(statustype)) 
         {
             sb.AppendFormatWithEscape(" AND icsei.statustype = '{0}'", statustype);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsei.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icsei.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(nonstockty)) 
         {
             sb.AppendFormatWithEscape(" AND icsei.nonstockty = '{0}'", nonstockty);
         }
         if (primarykeydt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsei.primarykeydt = '{0}'", primarykeydt);
         }
         if (secondarykeydt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsei.secondarykeydt = '{0}'", secondarykeydt);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsei.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsei BuildFromRow(DataRow row)
      {
         var returnRecord = Icsei.BuildIcseiFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsei>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsei record)
      {
         Icsei.UpdateRowFromIcsei(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsei Insert(Icsei record)
      {
         DataRow row = this.dataSet.ttblicsei.NewttblicseiRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsei.AddttblicseiRow((pdsicseiDataSet.ttblicseiRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsei.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsei.Rows[0]) : null;
      }
  

      public Icsei Update(Icsei record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsei.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsei.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsei record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsei.NewttblicseiRow();
            Icsei.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsei.AddttblicseiRow((pdsicseiDataSet.ttblicseiRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Icsei record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblicsei.NewttblicseiRow();
            Icsei.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsei.AddttblicseiRow((pdsicseiDataSet.ttblicseiRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsei() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Icsei() { rowpointer = selectRowpointer }).ToList();
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
  