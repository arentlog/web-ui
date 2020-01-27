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
   using Models.Pdsicsc;
   using Models.Pdsiccataloglookup;
   using Models.Complex;

   public partial class IcscAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsc";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icscTableControlKey;
		
      private pdsicscDataSet dataSet;
        
      public IcscAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicscDataSet() { DataSetName = DataSetName };
            this.icscTableControlKey = this.dataSet.ttblicsc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icscTableControlKey))
            {
               this.CreateTableControlParameters(this.icscTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcscAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icscproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcscproxy = this.proxyAppObject.CreatePO_icscproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcscproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icscproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icscTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icscTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icscproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcscproxy = this.proxyAppObject.CreatePO_icscproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcscproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icscproxy - After Call");
      }
   

      public Icsc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsc icsc = null;
         if (row != null)
         {
             icsc = this.BuildFromRow(row);
         }
         return icsc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsc.AsEnumerable().SingleOrDefault();
         Icsc icsc = null;
         if (row != null)
         {
             icsc = this.BuildFromRow(row);
         }
         return icsc;
      }
	  
	  
	  public IEnumerable<Icsc> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("icsc.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("icsc.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsc.AsEnumerable().SingleOrDefault();
      }

      public IEnumerable<Icsc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsc Get(string catalog, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(catalog)) 
         {
             sb.AppendFormatWithEscape("icsc.catalog = '{0}'", catalog);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsc> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(ecbatchnm)) 
         {
             sb.AppendFormatWithEscape("icsc.ecbatchnm = '{0}'", ecbatchnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByCatkeyindex(string catkeyindex, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(catkeyindex)) 
         {
             sb.AppendFormatWithEscape("icsc.catkeyindex = '{0}'", catkeyindex);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByDesc(string desckey, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(desckey)) 
         {
             sb.AppendFormatWithEscape("icsc.desckey = '{0}'", desckey);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByExtprod(string extprod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(extprod)) 
         {
             sb.AppendFormatWithEscape("icsc.extprod = '{0}'", extprod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsc GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("icsc.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Icsc> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("icsc.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsc> GetListByVend(decimal vendno, string prodline, string catalog, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("icsc.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND icsc.prodline = '{0}'", prodline);
         }
         if (!string.IsNullOrEmpty(catalog)) 
         {
             sb.AppendFormatWithEscape(" AND icsc.catalog = '{0}'", catalog);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsc BuildFromRow(DataRow row)
      {
         var returnRecord = Icsc.BuildIcscFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsc record)
      {
         Icsc.UpdateRowFromIcsc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsc Insert(Icsc record)
      {
         DataRow row = this.dataSet.ttblicsc.NewttblicscRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsc.AddttblicscRow((pdsicscDataSet.ttblicscRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsc.Rows[0]) : null;
      }
  

      public Icsc Update(Icsc record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsc record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsc.NewttblicscRow();
            Icsc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsc.AddttblicscRow((pdsicscDataSet.ttblicscRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Icsc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblicsc.NewttblicscRow();
            Icsc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsc.AddttblicscRow((pdsicscDataSet.ttblicscRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsc() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Icsc() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public IcscLookupResponseAPI Lookup(Iccataloglookupcriteria iccataloglookupcriteria)
      {   
         var result = new IcscLookupResponseAPI();
         
         var pdsiccataloglookup = new pdsiccataloglookupDataSet();
            
         DataRow ttbliccataloglookupcriteriaCriteria = pdsiccataloglookup.ttbliccataloglookupcriteria.NewttbliccataloglookupcriteriaRow();
         Iccataloglookupcriteria.UpdateRowFromIccataloglookupcriteria(ref ttbliccataloglookupcriteriaCriteria, iccataloglookupcriteria);
         pdsiccataloglookup.ttbliccataloglookupcriteria.AddttbliccataloglookupcriteriaRow((pdsiccataloglookupDataSet.ttbliccataloglookupcriteriaRow)ttbliccataloglookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Icsc - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcscproxy = this.proxyAppObject.CreatePO_icscproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcscproxy.Lookup(ref pdsContext, ref pdsiccataloglookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Icsc - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsiccataloglookup); 
    
         foreach (DataRow row in pdsiccataloglookup.ttbliccataloglookupresults)
         {
            result.iccataloglookupresults.Add(Iccataloglookupresults.BuildIccataloglookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Icsc> GetListByWordIndex(string searchTerm, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         where.AppendKeywords(string.Empty, searchTerm, true, true, false);
         this.SetAndFetch(where.ToString(), batchsize, fldList);
         this.SearchWordIndex(batchsize == 0 ? DefaultFetchWhereRowCount : batchsize , where.ToString());
         return (from DataRow row in this.dataSet.ttblicsc.Rows select this.BuildFromRow(row)).ToList();
      }
  
      protected void SearchWordIndex(int batchSize, string searchTerm)
      {
         NLogLoggerP.Trace("SearchWordIndex - Icsc - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcscProxy = this.proxyAppObject.CreatePO_icscproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcscProxy.SearchWordIndex(batchSize, searchTerm, ref this.pdsContext, out this.dataSet, out string cErrorMessage, out bool moreRecords);
                   ErrorReportingHelper.ReportErrors(cErrorMessage);
                   this.ReportErrors(this.pdsContext);
                   this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SearchWordIndex - Icsc - After Call");
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
  