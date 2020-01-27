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
   using Models.Pdsordhdr;

   public partial class OrdhdrAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsordhdr";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> ordhdrTableControlKey;
		
      private pdsordhdrDataSet dataSet;
        
      public OrdhdrAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsordhdrDataSet() { DataSetName = DataSetName };
            this.ordhdrTableControlKey = this.dataSet.ttblordhdr.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.ordhdrTableControlKey))
            {
               this.CreateTableControlParameters(this.ordhdrTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OrdhdrAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Ordhdrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOrdhdrproxy = this.proxyAppObject.CreatePO_ordhdrproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOrdhdrproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Ordhdrproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.ordhdrTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.ordhdrTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Ordhdrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOrdhdrproxy = this.proxyAppObject.CreatePO_ordhdrproxy())
               {
                  this.SetRequiredContextParameters();
                  poOrdhdrproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Ordhdrproxy - After Call");
      }
   

      public Ordhdr GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Ordhdr ordhdr = null;
         if (row != null)
         {
             ordhdr = this.BuildFromRow(row);
         }
         return ordhdr;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(ordhdr) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblordhdr.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Ordhdr> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(ordhdr)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Ordhdr Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblordhdr.AsEnumerable().SingleOrDefault();
         Ordhdr ordhdr = null;
         if (row != null)
         {
             ordhdr = this.BuildFromRow(row);
         }
         return ordhdr;
      }
	  
	  

      public IEnumerable<Ordhdr> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblordhdr.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Ordhdr Get(int id, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (id != int.MinValue) 
         {
             sb.AppendFormatWithEscape("ordhdr.id = {0}", id);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Ordhdr> GetListByBatch(int batch, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (batch != int.MinValue) 
         {
             sb.AppendFormatWithEscape("ordhdr.batch = {0}", batch);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByClearance(bool clearanceRequired, string clearanceCode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("ordhdr.clearance_required = {0}", clearanceRequired);
         if (!string.IsNullOrEmpty(clearanceCode)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.clearance_code = '{0}'", clearanceCode);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhAssignedCselector(string coNum, string whNum, bool assigned, string customSelector, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         if (!string.IsNullOrEmpty(customSelector)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.custom_selector = '{0}'", customSelector);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhAssignedHostbatch(string coNum, string whNum, bool assigned, string hostBatch, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         if (!string.IsNullOrEmpty(hostBatch)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.host_batch = '{0}'", hostBatch);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhAssignedHselector(string coNum, string whNum, bool assigned, string hostSelector, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         if (!string.IsNullOrEmpty(hostSelector)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.host_selector = '{0}'", hostSelector);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhAssignedType(string coNum, string whNum, bool assigned, string type, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.type = '{0}'", type);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhAssPriCarSer(string coNum, string whNum, bool assigned, bool printed, string carrier, string service, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         sb.AppendFormatWithEscape(" AND ordhdr.printed = {0}", printed);
         if (!string.IsNullOrEmpty(carrier)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.carrier = '{0}'", carrier);
         }
         if (!string.IsNullOrEmpty(service)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.service = '{0}'", service);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhBatch(string coNum, string whNum, int batch, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (batch != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.batch = {0}", batch);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhBranchAssigned(string coNum, string whNum, string branchId, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(branchId)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.branch_id = '{0}'", branchId);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhCarrierAssigned(string coNum, string whNum, string carrier, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(carrier)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.carrier = '{0}'", carrier);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhClassAssigned(string coNum, string whNum, string @class, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(@class)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.class = '{0}'", @class);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhCustShipto(string coNum, string whNum, string shipCustCode, string shipToCode, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(shipCustCode)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.ship_cust_code = '{0}'", shipCustCode);
         }
         if (!string.IsNullOrEmpty(shipToCode)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.ship_to_code = '{0}'", shipToCode);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhDate(string coNum, string whNum, DateTime? orderDate, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (orderDate != null) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.order_date = '{0}'", orderDate);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhExpship(string coNum, string whNum, DateTime? expShipDate, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (expShipDate != null) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.exp_ship_date = '{0}'", expShipDate);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhHostbatchHostsequence(string coNum, string whNum, string hostBatch, int hostSequence, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(hostBatch)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.host_batch = '{0}'", hostBatch);
         }
         if (hostSequence != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.host_sequence = {0}", hostSequence);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhOrderSuffix(string coNum, string whNum, string order, string orderSuffix, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(order)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.order = '{0}'", order);
         }
         if (!string.IsNullOrEmpty(orderSuffix)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.order_suffix = '{0}'", orderSuffix);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhPriorityAssigned(string coNum, string whNum, int priority, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (priority != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.priority = {0}", priority);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhProdLinecntAssigned(string coNum, string whNum, string product, int lineCount, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(product)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.product = '{0}'", product);
         }
         if (lineCount != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.line_count = {0}", lineCount);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhRouteStatus(string coNum, string whNum, string route, string orderStatus, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(route)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.route = '{0}'", route);
         }
         if (!string.IsNullOrEmpty(orderStatus)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.order_status = '{0}'", orderStatus);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhShip(string coNum, string whNum, DateTime? shipDate, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (shipDate != null) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.ship_date = '{0}'", shipDate);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhStatus(string coNum, string whNum, string orderStatus, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(orderStatus)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.order_status = '{0}'", orderStatus);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhStatusAssigned(string coNum, string whNum, string orderStatus, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(orderStatus)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.order_status = '{0}'", orderStatus);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByCoWhTypeAssigned(string coNum, string whNum, string type, bool assigned, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND ordhdr.type = '{0}'", type);
         }
         sb.AppendFormatWithEscape(" AND ordhdr.assigned = {0}", assigned);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByShipname(string shipName, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(shipName)) 
         {
             sb.AppendFormatWithEscape("ordhdr.ship_name = '{0}'", shipName);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Ordhdr> GetListByShipzip(string shipZip, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(shipZip)) 
         {
             sb.AppendFormatWithEscape("ordhdr.ship_zip = '{0}'", shipZip);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Ordhdr BuildFromRow(DataRow row)
      {
         var returnRecord = Ordhdr.BuildOrdhdrFromRow(row);
         returnRecord = this.BuildExtraFromRow<Ordhdr>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Ordhdr record)
      {
         Ordhdr.UpdateRowFromOrdhdr(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Ordhdr Insert(Ordhdr record)
      {
         DataRow row = this.dataSet.ttblordhdr.NewttblordhdrRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblordhdr.AddttblordhdrRow((pdsordhdrDataSet.ttblordhdrRow)row);
         this.SaveChanges();
         return this.dataSet.ttblordhdr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblordhdr.Rows[0]) : null;
      }
  

      public Ordhdr Update(Ordhdr record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblordhdr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblordhdr.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Ordhdr record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblordhdr.NewttblordhdrRow();
            Ordhdr.BuildMinimalRow(ref row, record);
            this.dataSet.ttblordhdr.AddttblordhdrRow((pdsordhdrDataSet.ttblordhdrRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Ordhdr() { rowID = selectRowId }).ToList();
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
  