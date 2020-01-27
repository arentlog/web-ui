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
    
namespace Infor.Sxe.AR.Data.Adapters
{
   using com.infor.sxproxy.arproxy;
   using com.infor.sxproxy.arproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsariccreatetrans;
   using Models.Pdsaricloadaretset;
   using Models.Pdsarilcriteria;
   using Models.Pdsarilbatchsingle;
   using Models.Pdsarilcheckresults;
   using Models.Pdsariltransresults;
   using Models.Pdsariltransmission;
   using Models.Pdsarilwocriteria;
   using Models.Pdsarilworesults;
   using Models.Pdsarsdlookup;
   using Models.Pdsarspdisplaytotals;
   using Models.Pdsbuildcustcredit;
   using Models.Pdscalccreditavail;
   using Models.Pdscustbaldisplay;
   using Models.Pdscustmessage;
   using Models.Pdscustpmtsdisplay;
   using Models.Pdsarshiptoaging;
   using Models.Pdsartransdetail;
   using Models.Pdsaricgrpdisp;
   using Models.Complex;

   public partial class AsarinquiryAdapter : AdapterBase<pdsContextDataSet>
   {
      private ARProxyAppObject proxyAppObject;
      
      public AsarinquiryAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ARProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AsarinquiryAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      public AsarinquiryARICCreateTransactionsResponseAPI ARICCreateTransactions(Ariccreatetranscriteria ariccreatetranscriteria)
      {   
         var result = new AsarinquiryARICCreateTransactionsResponseAPI();
         
         var pdsariccreatetrans = new pdsariccreatetransDataSet();
            
         DataRow ttblariccreatetranscriteriaCriteria = pdsariccreatetrans.ttblariccreatetranscriteria.NewttblariccreatetranscriteriaRow();
         Ariccreatetranscriteria.UpdateRowFromAriccreatetranscriteria(ref ttblariccreatetranscriteriaCriteria, ariccreatetranscriteria);
         pdsariccreatetrans.ttblariccreatetranscriteria.AddttblariccreatetranscriteriaRow((pdsariccreatetransDataSet.ttblariccreatetranscriteriaRow)ttblariccreatetranscriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         string cWarningMess = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("ARICCreateTransactions - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARICCreateTransactions(ref pdsContext, ref pdsariccreatetrans, out cErrorMessage, out cWarningMess, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("ARICCreateTransactions - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsariccreatetrans); 
    
         foreach (DataRow row in pdsariccreatetrans.ttblariccreatetransresults)
         {
            result.ariccreatetransresults.Add(Ariccreatetransresults.BuildAriccreatetransresultsFromRow(row));
         }     
         result.cWarningMess = cWarningMess;
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Aricloadaretsetresults> ARICLoadAretsetTT(Aricloadaretsetcriteria aricloadaretsetcriteria)
      {   
         var results = new List<Aricloadaretsetresults>();
         
         var pdsaricloadaretset = new pdsaricloadaretsetDataSet();
            
         DataRow ttblaricloadaretsetcriteriaCriteria = pdsaricloadaretset.ttblaricloadaretsetcriteria.NewttblaricloadaretsetcriteriaRow();
         Aricloadaretsetcriteria.UpdateRowFromAricloadaretsetcriteria(ref ttblaricloadaretsetcriteriaCriteria, aricloadaretsetcriteria);
         pdsaricloadaretset.ttblaricloadaretsetcriteria.AddttblaricloadaretsetcriteriaRow((pdsaricloadaretsetDataSet.ttblaricloadaretsetcriteriaRow)ttblaricloadaretsetcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARICLoadAretsetTT - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARICLoadAretsetTT(ref pdsContext, ref pdsaricloadaretset, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARICLoadAretsetTT - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsaricloadaretset); 
    
            foreach (DataRow row in pdsaricloadaretset.ttblaricloadaretsetresults)
            {
                results.Add(Aricloadaretsetresults.BuildAricloadaretsetresultsFromRow(row));
            }
            return results;
        
      }

      public Arilbatchsingle ARILBatchLoad(Arilcriteria arilcriteria)
      {   
         var result = new Arilbatchsingle();
         
         var pdsarilcriteria = new pdsarilcriteriaDataSet();
            
         var pdsarilbatchsingle = new pdsarilbatchsingleDataSet();
            
         DataRow ttblarilcriteriaCriteria = pdsarilcriteria.ttblarilcriteria.NewttblarilcriteriaRow();
         Arilcriteria.UpdateRowFromArilcriteria(ref ttblarilcriteriaCriteria, arilcriteria);
         pdsarilcriteria.ttblarilcriteria.AddttblarilcriteriaRow((pdsarilcriteriaDataSet.ttblarilcriteriaRow)ttblarilcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARILBatchLoad - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARILBatchLoad(ref pdsContext,  pdsarilcriteria, out pdsarilbatchsingle, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARILBatchLoad - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsarilcriteria); 
    
         if (pdsarilbatchsingle.ttblarilbatchsingle.Count > 0) 
         { 
             result = Arilbatchsingle.BuildArilbatchsingleFromRow(pdsarilbatchsingle.ttblarilbatchsingle[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Arilcheckresults> ARILCheckLoad(Arilcriteria arilcriteria)
      {   
         var results = new List<Arilcheckresults>();
         
         var pdsarilcriteria = new pdsarilcriteriaDataSet();
            
         var pdsarilcheckresults = new pdsarilcheckresultsDataSet();
            
         DataRow ttblarilcriteriaCriteria = pdsarilcriteria.ttblarilcriteria.NewttblarilcriteriaRow();
         Arilcriteria.UpdateRowFromArilcriteria(ref ttblarilcriteriaCriteria, arilcriteria);
         pdsarilcriteria.ttblarilcriteria.AddttblarilcriteriaRow((pdsarilcriteriaDataSet.ttblarilcriteriaRow)ttblarilcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARILCheckLoad - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARILCheckLoad(ref pdsContext,  pdsarilcriteria, out pdsarilcheckresults, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARILCheckLoad - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsarilcriteria); 
    
            foreach (DataRow row in pdsarilcheckresults.ttblarilcheckresults)
            {
                results.Add(Arilcheckresults.BuildArilcheckresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Ariltransresults> ARILTransLoad(Arilcriteria arilcriteria)
      {   
         var results = new List<Ariltransresults>();
         
         var pdsarilcriteria = new pdsarilcriteriaDataSet();
            
         var pdsariltransresults = new pdsariltransresultsDataSet();
            
         DataRow ttblarilcriteriaCriteria = pdsarilcriteria.ttblarilcriteria.NewttblarilcriteriaRow();
         Arilcriteria.UpdateRowFromArilcriteria(ref ttblarilcriteriaCriteria, arilcriteria);
         pdsarilcriteria.ttblarilcriteria.AddttblarilcriteriaRow((pdsarilcriteriaDataSet.ttblarilcriteriaRow)ttblarilcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARILTransLoad - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARILTransLoad(ref pdsContext,  pdsarilcriteria, out pdsariltransresults, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARILTransLoad - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsarilcriteria); 
    
            foreach (DataRow row in pdsariltransresults.ttblariltransresults)
            {
                results.Add(Ariltransresults.BuildAriltransresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Ariltransmissionresults> ARILTransmissionLoad(Ariltransmissioncriteria ariltransmissioncriteria)
      {   
         var results = new List<Ariltransmissionresults>();
         
         var pdsariltransmission = new pdsariltransmissionDataSet();
            
         DataRow ttblariltransmissioncriteriaCriteria = pdsariltransmission.ttblariltransmissioncriteria.NewttblariltransmissioncriteriaRow();
         Ariltransmissioncriteria.UpdateRowFromAriltransmissioncriteria(ref ttblariltransmissioncriteriaCriteria, ariltransmissioncriteria);
         pdsariltransmission.ttblariltransmissioncriteria.AddttblariltransmissioncriteriaRow((pdsariltransmissionDataSet.ttblariltransmissioncriteriaRow)ttblariltransmissioncriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARILTransmissionLoad - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARILTransmissionLoad(ref pdsContext, ref pdsariltransmission, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARILTransmissionLoad - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsariltransmission); 
    
            foreach (DataRow row in pdsariltransmission.ttblariltransmissionresults)
            {
                results.Add(Ariltransmissionresults.BuildAriltransmissionresultsFromRow(row));
            }
            return results;
        
      }

      public AsarinquiryARILWOLoadResponseAPI ARILWOLoad(Arilwocriteria arilwocriteria)
      {   
         var result = new AsarinquiryARILWOLoadResponseAPI();
         
         var pdsarilwocriteria = new pdsarilwocriteriaDataSet();
            
         var pdsarilworesults = new pdsarilworesultsDataSet();
            
         DataRow ttblarilwocriteriaCriteria = pdsarilwocriteria.ttblarilwocriteria.NewttblarilwocriteriaRow();
         Arilwocriteria.UpdateRowFromArilwocriteria(ref ttblarilwocriteriaCriteria, arilwocriteria);
         pdsarilwocriteria.ttblarilwocriteria.AddttblarilwocriteriaRow((pdsarilwocriteriaDataSet.ttblarilwocriteriaRow)ttblarilwocriteriaCriteria);
            
         decimal deTotalWO = 0;
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARILWOLoad - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARILWOLoad(ref pdsContext,  pdsarilwocriteria, out pdsarilworesults, out deTotalWO, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARILWOLoad - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsarilwocriteria); 
    
         foreach (DataRow row in pdsarilworesults.ttblarilworesults)
         {
            result.arilworesults.Add(Arilworesults.BuildArilworesultsFromRow(row));
         }     
         result.deTotalWO = deTotalWO;
          
         return result;
          
      }

      public IEnumerable<Arsdlookupresults> ARSDlookup(Arsdlookupcriteria arsdlookupcriteria)
      {   
         var results = new List<Arsdlookupresults>();
         
         var pdsarsdlookup = new pdsarsdlookupDataSet();
            
         DataRow ttblarsdlookupcriteriaCriteria = pdsarsdlookup.ttblarsdlookupcriteria.NewttblarsdlookupcriteriaRow();
         Arsdlookupcriteria.UpdateRowFromArsdlookupcriteria(ref ttblarsdlookupcriteriaCriteria, arsdlookupcriteria);
         pdsarsdlookup.ttblarsdlookupcriteria.AddttblarsdlookupcriteriaRow((pdsarsdlookupDataSet.ttblarsdlookupcriteriaRow)ttblarsdlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARSDlookup - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARSDlookup(ref pdsContext, ref pdsarsdlookup, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARSDlookup - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsarsdlookup); 
    
            foreach (DataRow row in pdsarsdlookup.ttblarsdlookupresults)
            {
                results.Add(Arsdlookupresults.BuildArsdlookupresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Arspdisplaytotalsresults> ARSPDisplayTotals(Arspdisplaytotalscriteria arspdisplaytotalscriteria)
      {   
         var results = new List<Arspdisplaytotalsresults>();
         
         var pdsarspdisplaytotals = new pdsarspdisplaytotalsDataSet();
            
         DataRow ttblarspdisplaytotalscriteriaCriteria = pdsarspdisplaytotals.ttblarspdisplaytotalscriteria.NewttblarspdisplaytotalscriteriaRow();
         Arspdisplaytotalscriteria.UpdateRowFromArspdisplaytotalscriteria(ref ttblarspdisplaytotalscriteriaCriteria, arspdisplaytotalscriteria);
         pdsarspdisplaytotals.ttblarspdisplaytotalscriteria.AddttblarspdisplaytotalscriteriaRow((pdsarspdisplaytotalsDataSet.ttblarspdisplaytotalscriteriaRow)ttblarspdisplaytotalscriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARSPDisplayTotals - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARSPDisplayTotals(ref pdsContext, ref pdsarspdisplaytotals, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARSPDisplayTotals - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsarspdisplaytotals); 
    
            foreach (DataRow row in pdsarspdisplaytotals.ttblarspdisplaytotalsresults)
            {
                results.Add(Arspdisplaytotalsresults.BuildArspdisplaytotalsresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Buildcustcreditresults> BuildCustCreditTT(Buildcustcreditcriteria buildcustcreditcriteria)
      {   
         var results = new List<Buildcustcreditresults>();
         
         var pdsbuildcustcredit = new pdsbuildcustcreditDataSet();
            
         DataRow ttblbuildcustcreditcriteriaCriteria = pdsbuildcustcredit.ttblbuildcustcreditcriteria.NewttblbuildcustcreditcriteriaRow();
         Buildcustcreditcriteria.UpdateRowFromBuildcustcreditcriteria(ref ttblbuildcustcreditcriteriaCriteria, buildcustcreditcriteria);
         pdsbuildcustcredit.ttblbuildcustcreditcriteria.AddttblbuildcustcreditcriteriaRow((pdsbuildcustcreditDataSet.ttblbuildcustcreditcriteriaRow)ttblbuildcustcreditcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("BuildCustCreditTT - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.BuildCustCreditTT(ref pdsContext, ref pdsbuildcustcredit, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("BuildCustCreditTT - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsbuildcustcredit); 
    
            foreach (DataRow row in pdsbuildcustcredit.ttblbuildcustcreditresults)
            {
                results.Add(Buildcustcreditresults.BuildBuildcustcreditresultsFromRow(row));
            }
            return results;
        
      }

      public Calccreditavailresults CalcOnOrderCreditAvail(Calccreditavailcriteria calccreditavailcriteria)
      {   
         var result = new Calccreditavailresults();
         
         var pdscalccreditavail = new pdscalccreditavailDataSet();
            
         DataRow ttblcalccreditavailcriteriaCriteria = pdscalccreditavail.ttblcalccreditavailcriteria.NewttblcalccreditavailcriteriaRow();
         Calccreditavailcriteria.UpdateRowFromCalccreditavailcriteria(ref ttblcalccreditavailcriteriaCriteria, calccreditavailcriteria);
         pdscalccreditavail.ttblcalccreditavailcriteria.AddttblcalccreditavailcriteriaRow((pdscalccreditavailDataSet.ttblcalccreditavailcriteriaRow)ttblcalccreditavailcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("CalcOnOrderCreditAvail - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.CalcOnOrderCreditAvail(ref pdsContext, ref pdscalccreditavail, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("CalcOnOrderCreditAvail - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscalccreditavail); 
    
         if (pdscalccreditavail.ttblcalccreditavailresults.Count > 0) 
         { 
             result = Calccreditavailresults.BuildCalccreditavailresultsFromRow(pdscalccreditavail.ttblcalccreditavailresults[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Custbaldisplayresults> CustBalDisplay(Custbaldisplaycriteria custbaldisplaycriteria)
      {   
         var results = new List<Custbaldisplayresults>();
         
         var pdscustbaldisplay = new pdscustbaldisplayDataSet();
            
         DataRow ttblcustbaldisplaycriteriaCriteria = pdscustbaldisplay.ttblcustbaldisplaycriteria.NewttblcustbaldisplaycriteriaRow();
         Custbaldisplaycriteria.UpdateRowFromCustbaldisplaycriteria(ref ttblcustbaldisplaycriteriaCriteria, custbaldisplaycriteria);
         pdscustbaldisplay.ttblcustbaldisplaycriteria.AddttblcustbaldisplaycriteriaRow((pdscustbaldisplayDataSet.ttblcustbaldisplaycriteriaRow)ttblcustbaldisplaycriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("CustBalDisplay - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.CustBalDisplay(ref pdsContext, ref pdscustbaldisplay, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("CustBalDisplay - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscustbaldisplay); 
    
            foreach (DataRow row in pdscustbaldisplay.ttblcustbaldisplayresults)
            {
                results.Add(Custbaldisplayresults.BuildCustbaldisplayresultsFromRow(row));
            }
            return results;
        
      }

      public Custmessageresults CustMessage(Custmessagecriteria custmessagecriteria)
      {   
         var result = new Custmessageresults();
         
         var pdscustmessage = new pdscustmessageDataSet();
            
         DataRow ttblcustmessagecriteriaCriteria = pdscustmessage.ttblcustmessagecriteria.NewttblcustmessagecriteriaRow();
         Custmessagecriteria.UpdateRowFromCustmessagecriteria(ref ttblcustmessagecriteriaCriteria, custmessagecriteria);
         pdscustmessage.ttblcustmessagecriteria.AddttblcustmessagecriteriaRow((pdscustmessageDataSet.ttblcustmessagecriteriaRow)ttblcustmessagecriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("CustMessage - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.CustMessage(ref pdsContext, ref pdscustmessage, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("CustMessage - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscustmessage); 
    
         if (pdscustmessage.ttblcustmessageresults.Count > 0) 
         { 
             result = Custmessageresults.BuildCustmessageresultsFromRow(pdscustmessage.ttblcustmessageresults[0]);
         } 
              
          
         return result;
          
      }

      public Custpmtsdisplayresults CustPaymentsDisplay(Custpmtsdisplaycriteria custpmtsdisplaycriteria)
      {   
         var result = new Custpmtsdisplayresults();
         
         var pdscustpmtsdisplay = new pdscustpmtsdisplayDataSet();
            
         DataRow ttblcustpmtsdisplaycriteriaCriteria = pdscustpmtsdisplay.ttblcustpmtsdisplaycriteria.NewttblcustpmtsdisplaycriteriaRow();
         Custpmtsdisplaycriteria.UpdateRowFromCustpmtsdisplaycriteria(ref ttblcustpmtsdisplaycriteriaCriteria, custpmtsdisplaycriteria);
         pdscustpmtsdisplay.ttblcustpmtsdisplaycriteria.AddttblcustpmtsdisplaycriteriaRow((pdscustpmtsdisplayDataSet.ttblcustpmtsdisplaycriteriaRow)ttblcustpmtsdisplaycriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("CustPaymentsDisplay - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.CustPaymentsDisplay(ref pdsContext, ref pdscustpmtsdisplay, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("CustPaymentsDisplay - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscustpmtsdisplay); 
    
         if (pdscustpmtsdisplay.ttblcustpmtsdisplayresults.Count > 0) 
         { 
             result = Custpmtsdisplayresults.BuildCustpmtsdisplayresultsFromRow(pdscustpmtsdisplay.ttblcustpmtsdisplayresults[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Arshiptoagingresults> ShipToAging(Arshiptoagingcriteria arshiptoagingcriteria)
      {   
         var results = new List<Arshiptoagingresults>();
         
         var pdsarshiptoaging = new pdsarshiptoagingDataSet();
            
         DataRow ttblarshiptoagingcriteriaCriteria = pdsarshiptoaging.ttblarshiptoagingcriteria.NewttblarshiptoagingcriteriaRow();
         Arshiptoagingcriteria.UpdateRowFromArshiptoagingcriteria(ref ttblarshiptoagingcriteriaCriteria, arshiptoagingcriteria);
         pdsarshiptoaging.ttblarshiptoagingcriteria.AddttblarshiptoagingcriteriaRow((pdsarshiptoagingDataSet.ttblarshiptoagingcriteriaRow)ttblarshiptoagingcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ShipToAging - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ShipToAging(ref pdsContext, ref pdsarshiptoaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ShipToAging - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsarshiptoaging); 
    
            foreach (DataRow row in pdsarshiptoaging.ttblarshiptoagingresults)
            {
                results.Add(Arshiptoagingresults.BuildArshiptoagingresultsFromRow(row));
            }
            return results;
        
      }

      public Artransdetailresults ARTransactionDetail(Artransdetailcriteria artransdetailcriteria)
      {   
         var result = new Artransdetailresults();
         
         var pdsartransdetail = new pdsartransdetailDataSet();
            
         DataRow ttblartransdetailcriteriaCriteria = pdsartransdetail.ttblartransdetailcriteria.NewttblartransdetailcriteriaRow();
         Artransdetailcriteria.UpdateRowFromArtransdetailcriteria(ref ttblartransdetailcriteriaCriteria, artransdetailcriteria);
         pdsartransdetail.ttblartransdetailcriteria.AddttblartransdetailcriteriaRow((pdsartransdetailDataSet.ttblartransdetailcriteriaRow)ttblartransdetailcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ARTransactionDetail - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.ARTransactionDetail(ref pdsContext, ref pdsartransdetail, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ARTransactionDetail - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsartransdetail); 
    
         if (pdsartransdetail.ttblartransdetailresults.Count > 0) 
         { 
             result = Artransdetailresults.BuildArtransdetailresultsFromRow(pdsartransdetail.ttblartransdetailresults[0]);
         } 
              
          
         return result;
          
      }

      public Aricgrpdispresults AricGroupDisplay(Aricgrpdispcriteria aricgrpdispcriteria)
      {   
         var result = new Aricgrpdispresults();
         
         var pdsaricgrpdisp = new pdsaricgrpdispDataSet();
            
         DataRow ttblaricgrpdispcriteriaCriteria = pdsaricgrpdisp.ttblaricgrpdispcriteria.NewttblaricgrpdispcriteriaRow();
         Aricgrpdispcriteria.UpdateRowFromAricgrpdispcriteria(ref ttblaricgrpdispcriteriaCriteria, aricgrpdispcriteria);
         pdsaricgrpdisp.ttblaricgrpdispcriteria.AddttblaricgrpdispcriteriaRow((pdsaricgrpdispDataSet.ttblaricgrpdispcriteriaRow)ttblaricgrpdispcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("AricGroupDisplay - Asarinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsarinquiryproxy = this.proxyAppObject.CreatePO_asarinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsarinquiryproxy.AricGroupDisplay(ref pdsContext, ref pdsaricgrpdisp, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("AricGroupDisplay - Asarinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsaricgrpdisp); 
    
         if (pdsaricgrpdisp.ttblaricgrpdispresults.Count > 0) 
         { 
             result = Aricgrpdispresults.BuildAricgrpdispresultsFromRow(pdsaricgrpdisp.ttblaricgrpdispresults[0]);
         } 
              
          
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

         base.Dispose(true);
      }
  
   }
}
#pragma warning restore 1591
  