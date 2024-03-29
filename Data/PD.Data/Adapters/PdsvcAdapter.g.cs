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
   using Models.Pdspdsvc;
   using Models.Pdspdsvclookup;
   using Models.Complex;

   public partial class PdsvcAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspdsvc";
      private PDProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pdsvcTableControlKey;
		
      private pdspdsvcDataSet dataSet;
        
      public PdsvcAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PDProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspdsvcDataSet() { DataSetName = DataSetName };
            this.pdsvcTableControlKey = this.dataSet.ttblpdsvc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pdsvcTableControlKey))
            {
               this.CreateTableControlParameters(this.pdsvcTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PdsvcAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pdsvcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPdsvcproxy = this.proxyAppObject.CreatePO_pdsvcproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPdsvcproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pdsvcproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pdsvcTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pdsvcTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pdsvcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPdsvcproxy = this.proxyAppObject.CreatePO_pdsvcproxy())
               {
                  this.SetRequiredContextParameters();
                  poPdsvcproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pdsvcproxy - After Call");
      }
   

      public Pdsvc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Pdsvc pdsvc = null;
         if (row != null)
         {
             pdsvc = this.BuildFromRow(row);
         }
         return pdsvc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pdsvc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpdsvc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Pdsvc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pdsvc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Pdsvc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpdsvc.AsEnumerable().SingleOrDefault();
         Pdsvc pdsvc = null;
         if (row != null)
         {
             pdsvc = this.BuildFromRow(row);
         }
         return pdsvc;
      }
	  
	  
      public IEnumerable<Pdsvc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pdsvc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpdsvc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Pdsvc Get(int cono, string contractno, int levelcd, string whse, decimal vendno, string prod, string unit, DateTime? startdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(contractno)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.contractno = '{0}'", contractno);
         }
         if (levelcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.levelcd = {0}", levelcd);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.whse = '{0}'", whse);
         }
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(unit)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.unit = '{0}'", unit);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.startdt = '{0}'", startdt);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Pdsvc> GetListByCustprod(int cono, decimal custno, string prod, DateTime? startdt, string contractno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.prod = '{0}'", prod);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.startdt = '{0}'", startdt);
         }
         if (!string.IsNullOrEmpty(contractno)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.contractno = '{0}'", contractno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvc> GetListByKprod(int cono, string contractno, string prod, DateTime? startdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(contractno)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.contractno = '{0}'", contractno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.prod = '{0}'", prod);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.startdt = '{0}'", startdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvc> GetListByPdsvcrecno(int cono, int pdsvcrecno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (pdsvcrecno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.pdsvcrecno = {0}", pdsvcrecno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvc> GetListByProdcust(int cono, string prod, decimal custno, DateTime? startdt, string contractno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.prod = '{0}'", prod);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.custno = {0}", custno);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.startdt = '{0}'", startdt);
         }
         if (!string.IsNullOrEmpty(contractno)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.contractno = '{0}'", contractno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvc> GetListByProdwh(int cono, string prod, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvc> GetListByStatprod(int cono, bool statustype, int levelcd, string prod, string whse, string unit, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND pdsvc.statustype = {0}", statustype);
         if (levelcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.levelcd = {0}", levelcd);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(unit)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.unit = '{0}'", unit);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Pdsvc> GetListByVendno(int cono, decimal vendno, string prod, DateTime? startdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pdsvc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.prod = '{0}'", prod);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND pdsvc.startdt = '{0}'", startdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Pdsvc BuildFromRow(DataRow row)
      {
         var returnRecord = Pdsvc.BuildPdsvcFromRow(row);
         returnRecord = this.BuildExtraFromRow<Pdsvc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Pdsvc record)
      {
         Pdsvc.UpdateRowFromPdsvc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Pdsvc Insert(Pdsvc record)
      {
         DataRow row = this.dataSet.ttblpdsvc.NewttblpdsvcRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpdsvc.AddttblpdsvcRow((pdspdsvcDataSet.ttblpdsvcRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpdsvc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpdsvc.Rows[0]) : null;
      }
  

      public Pdsvc Update(Pdsvc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpdsvc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpdsvc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Pdsvc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpdsvc.NewttblpdsvcRow();
            Pdsvc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpdsvc.AddttblpdsvcRow((pdspdsvcDataSet.ttblpdsvcRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Pdsvc() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public PdsvcLookupResponseAPI Lookup(Pdsvclookupcriteria pdsvclookupcriteria)
      {   
         var result = new PdsvcLookupResponseAPI();
         
         var pdspdsvclookup = new pdspdsvclookupDataSet();
            
         DataRow ttblpdsvclookupcriteriaCriteria = pdspdsvclookup.ttblpdsvclookupcriteria.NewttblpdsvclookupcriteriaRow();
         Pdsvclookupcriteria.UpdateRowFromPdsvclookupcriteria(ref ttblpdsvclookupcriteriaCriteria, pdsvclookupcriteria);
         pdspdsvclookup.ttblpdsvclookupcriteria.AddttblpdsvclookupcriteriaRow((pdspdsvclookupDataSet.ttblpdsvclookupcriteriaRow)ttblpdsvclookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Pdsvc - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPdsvcproxy = this.proxyAppObject.CreatePO_pdsvcproxy())
               {
                   this.SetRequiredContextParameters();
                   poPdsvcproxy.Lookup(ref pdsContext, ref pdspdsvclookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Pdsvc - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdspdsvclookup); 
    
         foreach (DataRow row in pdspdsvclookup.ttblpdsvclookupresults)
         {
            result.pdsvclookupresults.Add(Pdsvclookupresults.BuildPdsvclookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
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
  