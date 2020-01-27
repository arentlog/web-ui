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
    
namespace Infor.Sxe.SL.Data.Adapters
{
   using com.infor.sxproxy.slproxy;
   using com.infor.sxproxy.slproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssled;

   public partial class SledAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssled";
      private SLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sledTableControlKey;
		
      private pdssledDataSet dataSet;
        
      public SledAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssledDataSet() { DataSetName = DataSetName };
            this.sledTableControlKey = this.dataSet.ttblsled.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sledTableControlKey))
            {
               this.CreateTableControlParameters(this.sledTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SledAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sledproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSledproxy = this.proxyAppObject.CreatePO_sledproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSledproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sledproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sledTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sledTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sledproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSledproxy = this.proxyAppObject.CreatePO_sledproxy())
               {
                  this.SetRequiredContextParameters();
                  poSledproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sledproxy - After Call");
      }
   

      public Sled GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sled sled = null;
         if (row != null)
         {
             sled = this.BuildFromRow(row);
         }
         return sled;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sled) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsled.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sled> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sled)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sled Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsled.AsEnumerable().SingleOrDefault();
         Sled sled = null;
         if (row != null)
         {
             sled = this.BuildFromRow(row);
         }
         return sled;
      }
	  
	  
	  public IEnumerable<Sled> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("sled.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("sled.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsled.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Sled> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sled.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sled> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsled.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sled Get(int cono, bool statustype, string imptype, string slupdtno, string prod, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sled.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND sled.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(imptype)) 
         {
             sb.AppendFormatWithEscape(" AND sled.imptype = '{0}'", imptype);
         }
         if (!string.IsNullOrEmpty(slupdtno)) 
         {
             sb.AppendFormatWithEscape(" AND sled.slupdtno = '{0}'", slupdtno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND sled.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND sled.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Sled> GetListByPbseqno(int cono, bool statustype, string imptype, string slupdtno, int slpbseqno, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sled.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND sled.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(imptype)) 
         {
             sb.AppendFormatWithEscape(" AND sled.imptype = '{0}'", imptype);
         }
         if (!string.IsNullOrEmpty(slupdtno)) 
         {
             sb.AppendFormatWithEscape(" AND sled.slupdtno = '{0}'", slupdtno);
         }
         if (slpbseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sled.slpbseqno = {0}", slpbseqno);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND sled.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sled> GetListByProd(int cono, string prod, string imptype, bool statustype, string slupdtno, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sled.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND sled.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(imptype)) 
         {
             sb.AppendFormatWithEscape(" AND sled.imptype = '{0}'", imptype);
         }
         sb.AppendFormatWithEscape(" AND sled.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(slupdtno)) 
         {
             sb.AppendFormatWithEscape(" AND sled.slupdtno = '{0}'", slupdtno);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND sled.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Sled GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("sled.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Sled> GetListByStatuscd(int cono, bool statustype, string imptype, string slupdtno, string statuscd, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sled.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND sled.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(imptype)) 
         {
             sb.AppendFormatWithEscape(" AND sled.imptype = '{0}'", imptype);
         }
         if (!string.IsNullOrEmpty(slupdtno)) 
         {
             sb.AppendFormatWithEscape(" AND sled.slupdtno = '{0}'", slupdtno);
         }
         if (!string.IsNullOrEmpty(statuscd)) 
         {
             sb.AppendFormatWithEscape(" AND sled.statuscd = '{0}'", statuscd);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND sled.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sled> GetListByWhse(int cono, bool statustype, string imptype, string slupdtno, string whse, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sled.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND sled.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(imptype)) 
         {
             sb.AppendFormatWithEscape(" AND sled.imptype = '{0}'", imptype);
         }
         if (!string.IsNullOrEmpty(slupdtno)) 
         {
             sb.AppendFormatWithEscape(" AND sled.slupdtno = '{0}'", slupdtno);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND sled.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND sled.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Sled BuildFromRow(DataRow row)
      {
         var returnRecord = Sled.BuildSledFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sled>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sled record)
      {
         Sled.UpdateRowFromSled(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sled Insert(Sled record)
      {
         DataRow row = this.dataSet.ttblsled.NewttblsledRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsled.AddttblsledRow((pdssledDataSet.ttblsledRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsled.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsled.Rows[0]) : null;
      }
  

      public Sled Update(Sled record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsled.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsled.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sled record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsled.NewttblsledRow();
            Sled.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsled.AddttblsledRow((pdssledDataSet.ttblsledRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Sled record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblsled.NewttblsledRow();
            Sled.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsled.AddttblsledRow((pdssledDataSet.ttblsledRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sled() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Sled() { rowpointer = selectRowpointer }).ToList();
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
  