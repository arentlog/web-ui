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
    
namespace Infor.Sxe.CM.Data.Adapters
{
   using com.infor.sxproxy.cmproxy;
   using com.infor.sxproxy.cmproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdscmsn;

   public partial class CmsnAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscmsn";
      private CMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> cmsnTableControlKey;
		
      private pdscmsnDataSet dataSet;
        
      public CmsnAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new CMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscmsnDataSet() { DataSetName = DataSetName };
            this.cmsnTableControlKey = this.dataSet.ttblcmsn.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.cmsnTableControlKey))
            {
               this.CreateTableControlParameters(this.cmsnTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in CmsnAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Cmsnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poCmsnproxy = this.proxyAppObject.CreatePO_cmsnproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poCmsnproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Cmsnproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.cmsnTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.cmsnTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Cmsnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCmsnproxy = this.proxyAppObject.CreatePO_cmsnproxy())
               {
                  this.SetRequiredContextParameters();
                  poCmsnproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Cmsnproxy - After Call");
      }
   

      public Cmsn GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Cmsn cmsn = null;
         if (row != null)
         {
             cmsn = this.BuildFromRow(row);
         }
         return cmsn;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(cmsn) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcmsn.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Cmsn> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(cmsn)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Cmsn Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcmsn.AsEnumerable().SingleOrDefault();
         Cmsn cmsn = null;
         if (row != null)
         {
             cmsn = this.BuildFromRow(row);
         }
         return cmsn;
      }
	  
	  

      public IEnumerable<Cmsn> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcmsn.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Cmsn Get(decimal prosno, int priority, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("cmsn.prosno = {0}", prosno);
         }
         if (priority != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cmsn.priority = {0}", priority);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Cmsn> GetListByCname(string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape("cmsn.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsn> GetListByName(decimal prosno, string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("cmsn.prosno = {0}", prosno);
         }
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape(" AND cmsn.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsn> GetListByPhone(string phoneno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(phoneno)) 
         {
             sb.AppendFormatWithEscape("cmsn.phoneno = '{0}'", phoneno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cmsn> GetListByProsno(decimal prosno, DateTime? transdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (prosno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape("cmsn.prosno = {0}", prosno);
         }
         if (transdt != null) 
         {
             sb.AppendFormatWithEscape(" AND cmsn.transdt = '{0}'", transdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Cmsn BuildFromRow(DataRow row)
      {
         var returnRecord = Cmsn.BuildCmsnFromRow(row);
         returnRecord = this.BuildExtraFromRow<Cmsn>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Cmsn record)
      {
         Cmsn.UpdateRowFromCmsn(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Cmsn Insert(Cmsn record)
      {
         DataRow row = this.dataSet.ttblcmsn.NewttblcmsnRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcmsn.AddttblcmsnRow((pdscmsnDataSet.ttblcmsnRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcmsn.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmsn.Rows[0]) : null;
      }
  

      public Cmsn Update(Cmsn record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcmsn.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcmsn.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Cmsn record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcmsn.NewttblcmsnRow();
            Cmsn.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcmsn.AddttblcmsnRow((pdscmsnDataSet.ttblcmsnRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Cmsn() { rowID = selectRowId }).ToList();
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
  