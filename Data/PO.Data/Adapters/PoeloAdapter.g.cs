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
    
namespace Infor.Sxe.PO.Data.Adapters
{
   using com.infor.sxproxy.poproxy;
   using com.infor.sxproxy.poproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdspoelo;

   public partial class PoeloAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspoelo";
      private POProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> poeloTableControlKey;
		
      private pdspoeloDataSet dataSet;
        
      public PoeloAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new POProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspoeloDataSet() { DataSetName = DataSetName };
            this.poeloTableControlKey = this.dataSet.ttblpoelo.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.poeloTableControlKey))
            {
               this.CreateTableControlParameters(this.poeloTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PoeloAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Poeloproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPoeloproxy = this.proxyAppObject.CreatePO_poeloproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPoeloproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Poeloproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.poeloTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.poeloTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Poeloproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPoeloproxy = this.proxyAppObject.CreatePO_poeloproxy())
               {
                  this.SetRequiredContextParameters();
                  poPoeloproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Poeloproxy - After Call");
      }
   

      public Poelo GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Poelo poelo = null;
         if (row != null)
         {
             poelo = this.BuildFromRow(row);
         }
         return poelo;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(poelo) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpoelo.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Poelo> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(poelo)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Poelo Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpoelo.AsEnumerable().SingleOrDefault();
         Poelo poelo = null;
         if (row != null)
         {
             poelo = this.BuildFromRow(row);
         }
         return poelo;
      }
	  
	  
      public IEnumerable<Poelo> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("poelo.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Poelo> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpoelo.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Poelo Get(int cono, int pono, int posuf, int lineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poelo.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (pono != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.pono = {0}", pono);
         }
         if (posuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.posuf = {0}", posuf);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.lineno = {0}", lineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Poelo> GetListByOrder(int cono, string ordertype, int orderaltno, int orderaltsuf, int linealtno, int seqaltno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("poelo.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(ordertype)) 
         {
             sb.AppendFormatWithEscape(" AND poelo.ordertype = '{0}'", ordertype);
         }
         if (orderaltno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.orderaltno = {0}", orderaltno);
         }
         if (orderaltsuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.orderaltsuf = {0}", orderaltsuf);
         }
         if (linealtno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.linealtno = {0}", linealtno);
         }
         if (seqaltno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND poelo.seqaltno = {0}", seqaltno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Poelo BuildFromRow(DataRow row)
      {
         var returnRecord = Poelo.BuildPoeloFromRow(row);
         returnRecord = this.BuildExtraFromRow<Poelo>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Poelo record)
      {
         Poelo.UpdateRowFromPoelo(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Poelo Insert(Poelo record)
      {
         DataRow row = this.dataSet.ttblpoelo.NewttblpoeloRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpoelo.AddttblpoeloRow((pdspoeloDataSet.ttblpoeloRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpoelo.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpoelo.Rows[0]) : null;
      }
  

      public Poelo Update(Poelo record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpoelo.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpoelo.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Poelo record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpoelo.NewttblpoeloRow();
            Poelo.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpoelo.AddttblpoeloRow((pdspoeloDataSet.ttblpoeloRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Poelo() { rowID = selectRowId }).ToList();
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
  