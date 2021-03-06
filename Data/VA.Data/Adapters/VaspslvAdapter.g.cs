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
    
namespace Infor.Sxe.VA.Data.Adapters
{
   using com.infor.sxproxy.vaproxy;
   using com.infor.sxproxy.vaproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsvaspslv;

   public partial class VaspslvAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsvaspslv";
      private VAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> vaspslvTableControlKey;
		
      private pdsvaspslvDataSet dataSet;
        
      public VaspslvAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new VAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsvaspslvDataSet() { DataSetName = DataSetName };
            this.vaspslvTableControlKey = this.dataSet.ttblvaspslv.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.vaspslvTableControlKey))
            {
               this.CreateTableControlParameters(this.vaspslvTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in VaspslvAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Vaspslvproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poVaspslvproxy = this.proxyAppObject.CreatePO_vaspslvproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poVaspslvproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Vaspslvproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.vaspslvTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.vaspslvTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Vaspslvproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poVaspslvproxy = this.proxyAppObject.CreatePO_vaspslvproxy())
               {
                  this.SetRequiredContextParameters();
                  poVaspslvproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Vaspslvproxy - After Call");
      }
   

      public Vaspslv GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Vaspslv vaspslv = null;
         if (row != null)
         {
             vaspslv = this.BuildFromRow(row);
         }
         return vaspslv;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(vaspslv) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblvaspslv.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Vaspslv> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(vaspslv)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Vaspslv Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblvaspslv.AsEnumerable().SingleOrDefault();
         Vaspslv vaspslv = null;
         if (row != null)
         {
             vaspslv = this.BuildFromRow(row);
         }
         return vaspslv;
      }
	  
	  
      public IEnumerable<Vaspslv> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("vaspslv.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Vaspslv> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblvaspslv.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Vaspslv Get(int cono, string shipprod, string whse, int verno, int seqno, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("vaspslv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.shipprod = '{0}'", shipprod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.whse = '{0}'", whse);
         }
         if (verno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.verno = {0}", verno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.seqno = {0}", seqno);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Vaspslv> GetListByProd(int cono, string compprod, string shipprod, string whse, int verno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("vaspslv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(compprod)) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.compprod = '{0}'", compprod);
         }
         if (!string.IsNullOrEmpty(shipprod)) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.shipprod = '{0}'", shipprod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.whse = '{0}'", whse);
         }
         if (verno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND vaspslv.verno = {0}", verno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Vaspslv BuildFromRow(DataRow row)
      {
         var returnRecord = Vaspslv.BuildVaspslvFromRow(row);
         returnRecord = this.BuildExtraFromRow<Vaspslv>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Vaspslv record)
      {
         Vaspslv.UpdateRowFromVaspslv(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Vaspslv Insert(Vaspslv record)
      {
         DataRow row = this.dataSet.ttblvaspslv.NewttblvaspslvRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblvaspslv.AddttblvaspslvRow((pdsvaspslvDataSet.ttblvaspslvRow)row);
         this.SaveChanges();
         return this.dataSet.ttblvaspslv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblvaspslv.Rows[0]) : null;
      }
  

      public Vaspslv Update(Vaspslv record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblvaspslv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblvaspslv.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Vaspslv record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblvaspslv.NewttblvaspslvRow();
            Vaspslv.BuildMinimalRow(ref row, record);
            this.dataSet.ttblvaspslv.AddttblvaspslvRow((pdsvaspslvDataSet.ttblvaspslvRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Vaspslv() { rowID = selectRowId }).ToList();
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
  