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
   using Models.Pdsicsg;

   public partial class IcsgAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsg";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsgTableControlKey;
		
      private pdsicsgDataSet dataSet;
        
      public IcsgAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsgDataSet() { DataSetName = DataSetName };
            this.icsgTableControlKey = this.dataSet.ttblicsg.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsgTableControlKey))
            {
               this.CreateTableControlParameters(this.icsgTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsgAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsgproxy = this.proxyAppObject.CreatePO_icsgproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsgproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsgproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsgTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsgTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsgproxy = this.proxyAppObject.CreatePO_icsgproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsgproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsgproxy - After Call");
      }
   

      public Icsg GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsg icsg = null;
         if (row != null)
         {
             icsg = this.BuildFromRow(row);
         }
         return icsg;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsg) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsg.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsg)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsg Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsg.AsEnumerable().SingleOrDefault();
         Icsg icsg = null;
         if (row != null)
         {
             icsg = this.BuildFromRow(row);
         }
         return icsg;
      }
	  
	  

      public IEnumerable<Icsg> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsg.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsg Get(int groupno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (groupno != int.MinValue) 
         {
             sb.AppendFormatWithEscape("icsg.groupno = {0}", groupno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsg> GetListByBatch(string ecbatchnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(ecbatchnm)) 
         {
             sb.AppendFormatWithEscape("icsg.ecbatchnm = '{0}'", ecbatchnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsg> GetListByDescrip(string descrip, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(descrip)) 
         {
             sb.AppendFormatWithEscape("icsg.descrip = '{0}'", descrip);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsg> GetListByLangcd(string langcd, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(langcd)) 
         {
             sb.AppendFormatWithEscape("icsg.langcd = '{0}'", langcd);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsg> GetListByStoreid(int corpid, int storeid, int groupno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (corpid != int.MinValue) 
         {
             sb.AppendFormatWithEscape("icsg.corpid = {0}", corpid);
         }
         if (storeid != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsg.storeid = {0}", storeid);
         }
         if (groupno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsg.groupno = {0}", groupno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsg BuildFromRow(DataRow row)
      {
         var returnRecord = Icsg.BuildIcsgFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsg>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsg record)
      {
         Icsg.UpdateRowFromIcsg(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsg Insert(Icsg record)
      {
         DataRow row = this.dataSet.ttblicsg.NewttblicsgRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsg.AddttblicsgRow((pdsicsgDataSet.ttblicsgRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsg.Rows[0]) : null;
      }
  

      public Icsg Update(Icsg record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsg.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsg record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsg.NewttblicsgRow();
            Icsg.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsg.AddttblicsgRow((pdsicsgDataSet.ttblicsgRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsg() { rowID = selectRowId }).ToList();
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
  