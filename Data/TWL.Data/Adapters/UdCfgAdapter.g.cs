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
    
namespace Infor.Sxe.TWL.Data.Adapters
{
   using com.infor.sxproxy.twlproxy;
   using com.infor.sxproxy.twlproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.PdsudCfg;

   public partial class UdCfgAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsud_cfg";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> udCfgTableControlKey;
		
      private pdsud_cfgDataSet dataSet;
        
      public UdCfgAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsud_cfgDataSet() { DataSetName = DataSetName };
            this.udCfgTableControlKey = this.dataSet.ttblud_cfg.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.udCfgTableControlKey))
            {
               this.CreateTableControlParameters(this.udCfgTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in UdCfgAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Ud_cfgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poUd_cfgproxy = this.proxyAppObject.CreatePO_ud_cfgproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poUd_cfgproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Ud_cfgproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.udCfgTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.udCfgTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Ud_cfgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poUd_cfgproxy = this.proxyAppObject.CreatePO_ud_cfgproxy())
               {
                  this.SetRequiredContextParameters();
                  poUd_cfgproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Ud_cfgproxy - After Call");
      }
   

      public UdCfg GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         UdCfg udCfg = null;
         if (row != null)
         {
             udCfg = this.BuildFromRow(row);
         }
         return udCfg;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(ud_cfg) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblud_cfg.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<UdCfg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(ud_cfg)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected UdCfg Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblud_cfg.AsEnumerable().SingleOrDefault();
         UdCfg udCfg = null;
         if (row != null)
         {
             udCfg = this.BuildFromRow(row);
         }
         return udCfg;
      }
	  
	  

      public IEnumerable<UdCfg> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblud_cfg.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public UdCfg Get(string coNum, string whNum, int deptNum, string empNum, string udcType, string udcId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ud_cfg.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.wh_num = '{0}'", whNum);
         }
         if (deptNum != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.dept_num = {0}", deptNum);
         }
         if (!string.IsNullOrEmpty(empNum)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.emp_num = '{0}'", empNum);
         }
         if (!string.IsNullOrEmpty(udcType)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.udc_type = '{0}'", udcType);
         }
         if (!string.IsNullOrEmpty(udcId)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.udc_id = '{0}'", udcId);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<UdCfg> GetListByCoWhSysnameUdctypeUdcidEmpn(string coNum, string whNum, string sysName, string udcType, string udcId, string empNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ud_cfg.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(sysName)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.sys_name = '{0}'", sysName);
         }
         if (!string.IsNullOrEmpty(udcType)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.udc_type = '{0}'", udcType);
         }
         if (!string.IsNullOrEmpty(udcId)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.udc_id = '{0}'", udcId);
         }
         if (!string.IsNullOrEmpty(empNum)) 
         {
             sb.AppendFormatWithEscape(" AND ud_cfg.emp_num = '{0}'", empNum);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public UdCfg BuildFromRow(DataRow row)
      {
         var returnRecord = UdCfg.BuildUdCfgFromRow(row);
         returnRecord = this.BuildExtraFromRow<UdCfg>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, UdCfg record)
      {
         UdCfg.UpdateRowFromUdCfg(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public UdCfg Insert(UdCfg record)
      {
         DataRow row = this.dataSet.ttblud_cfg.Newttblud_cfgRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblud_cfg.Addttblud_cfgRow((pdsud_cfgDataSet.ttblud_cfgRow)row);
         this.SaveChanges();
         return this.dataSet.ttblud_cfg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblud_cfg.Rows[0]) : null;
      }
  

      public UdCfg Update(UdCfg record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblud_cfg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblud_cfg.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(UdCfg record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblud_cfg.Newttblud_cfgRow();
            UdCfg.BuildMinimalRow(ref row, record);
            this.dataSet.ttblud_cfg.Addttblud_cfgRow((pdsud_cfgDataSet.ttblud_cfgRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new UdCfg() { rowID = selectRowId }).ToList();
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
  