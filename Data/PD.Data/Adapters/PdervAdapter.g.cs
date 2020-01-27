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
    
namespace Infor.Sxe.PD.Data.Adapters
{
   using com.infor.sxproxy.pdproxy;
   using com.infor.sxproxy.pdproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdspderv;

   public partial class PdervAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspderv";
      private PDProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pdervTableControlKey;
		
      private pdspdervDataSet dataSet;
        
      public PdervAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PDProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspdervDataSet() { DataSetName = DataSetName };
            this.pdervTableControlKey = this.dataSet.ttblpderv.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pdervTableControlKey))
            {
               this.CreateTableControlParameters(this.pdervTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PdervAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pdervproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPdervproxy = this.proxyAppObject.CreatePO_pdervproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPdervproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pdervproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pdervTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pdervTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pdervproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPdervproxy = this.proxyAppObject.CreatePO_pdervproxy())
               {
                  this.SetRequiredContextParameters();
                  poPdervproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pdervproxy - After Call");
      }
   

      public Pderv GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Pderv pderv = null;
         if (row != null)
         {
             pderv = this.BuildFromRow(row);
         }
         return pderv;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pderv) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpderv.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Pderv> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pderv)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Pderv Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpderv.AsEnumerable().SingleOrDefault();
         Pderv pderv = null;
         if (row != null)
         {
             pderv = this.BuildFromRow(row);
         }
         return pderv;
      }
	  
	  
	  public IEnumerable<Pderv> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("pderv.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("pderv.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpderv.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Pderv> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pderv.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pderv> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpderv.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Pderv Get(int cono, int intclaimno, int claimseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pderv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (intclaimno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pderv.intclaimno = {0}", intclaimno);
         }
         if (claimseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pderv.claimseqno = {0}", claimseqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Pderv> GetListByIntclaimno(int cono, string statustype, int intclaimno, int claimseqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pderv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(statustype)) 
         {
             sb.AppendFormatWithEscape(" AND pderv.statustype = '{0}'", statustype);
         }
         if (intclaimno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pderv.intclaimno = {0}", intclaimno);
         }
         if (claimseqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pderv.claimseqno = {0}", claimseqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pderv> GetListByJrnlno(int cono, int jrnlno, int setno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pderv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pderv.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pderv.setno = {0}", setno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Pderv GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("pderv.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public Pderv BuildFromRow(DataRow row)
      {
         var returnRecord = Pderv.BuildPdervFromRow(row);
         returnRecord = this.BuildExtraFromRow<Pderv>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Pderv record)
      {
         Pderv.UpdateRowFromPderv(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Pderv Insert(Pderv record)
      {
         DataRow row = this.dataSet.ttblpderv.NewttblpdervRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpderv.AddttblpdervRow((pdspdervDataSet.ttblpdervRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpderv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpderv.Rows[0]) : null;
      }
  

      public Pderv Update(Pderv record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpderv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpderv.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Pderv record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpderv.NewttblpdervRow();
            Pderv.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpderv.AddttblpdervRow((pdspdervDataSet.ttblpdervRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Pderv record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblpderv.NewttblpdervRow();
            Pderv.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpderv.AddttblpdervRow((pdspdervDataSet.ttblpdervRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Pderv() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Pderv() { rowpointer = selectRowpointer }).ToList();
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
  