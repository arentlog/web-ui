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
    
namespace Infor.Sxe.Shared.Data.Adapters
{
   using com.infor.sxproxy.sharedproxy;
   using com.infor.sxproxy.sharedproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsemaillistforedi;
   using Models.Pdsupdateemaillistforedi;

   public partial class AscamsetupAdapter : AdapterBase<pdsContextDataSet>
   {
      private SharedProxyAppObject proxyAppObject;
      
      public AscamsetupAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AscamsetupAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      public IEnumerable<Emaillistforediresults> EmailListForEDI(Emaillistforedicriteria emaillistforedicriteria)
      {   
         var results = new List<Emaillistforediresults>();
         
         var pdsemaillistforedi = new pdsemaillistforediDataSet();
            
         DataRow ttblemaillistforedicriteriaCriteria = pdsemaillistforedi.ttblemaillistforedicriteria.NewttblemaillistforedicriteriaRow();
         Emaillistforedicriteria.UpdateRowFromEmaillistforedicriteria(ref ttblemaillistforedicriteriaCriteria, emaillistforedicriteria);
         pdsemaillistforedi.ttblemaillistforedicriteria.AddttblemaillistforedicriteriaRow((pdsemaillistforediDataSet.ttblemaillistforedicriteriaRow)ttblemaillistforedicriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("EmailListForEDI - Ascamsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAscamsetupproxy = this.proxyAppObject.CreatePO_ascamsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAscamsetupproxy.EmailListForEDI(ref pdsContext, ref pdsemaillistforedi, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("EmailListForEDI - Ascamsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsemaillistforedi); 
    
            foreach (DataRow row in pdsemaillistforedi.ttblemaillistforediresults)
            {
                results.Add(Emaillistforediresults.BuildEmaillistforediresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Updateemaillistforedi> UpdateEmailListForEDI(IEnumerable<Updateemaillistforedi> updateemaillistforedi)
      {   
         var results = new List<Updateemaillistforedi>();
         
         var pdsupdateemaillistforedi = new pdsupdateemaillistforediDataSet();
            
         foreach (var obj in updateemaillistforedi)
         {
             DataRow row = pdsupdateemaillistforedi.ttblupdateemaillistforedi.NewttblupdateemaillistforediRow();
             Updateemaillistforedi.UpdateRowFromUpdateemaillistforedi(ref row, obj);
             pdsupdateemaillistforedi.ttblupdateemaillistforedi.AddttblupdateemaillistforediRow((pdsupdateemaillistforediDataSet.ttblupdateemaillistforediRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("UpdateEmailListForEDI - Ascamsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAscamsetupproxy = this.proxyAppObject.CreatePO_ascamsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAscamsetupproxy.UpdateEmailListForEDI(ref pdsContext, ref pdsupdateemaillistforedi, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("UpdateEmailListForEDI - Ascamsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsupdateemaillistforedi); 
    
            foreach (DataRow row in pdsupdateemaillistforedi.ttblupdateemaillistforedi)
            {
                results.Add(Updateemaillistforedi.BuildUpdateemaillistforediFromRow(row));
            }
            return results;
        
      }

      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }	
         this.proxyAppObject?.Dispose();

         base.Dispose(true);
      }
  
   }
}
#pragma warning restore 1591
  