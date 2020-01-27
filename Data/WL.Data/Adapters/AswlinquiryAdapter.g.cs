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
    
namespace Infor.Sxe.WL.Data.Adapters
{
   using com.infor.sxproxy.wlproxy;
   using com.infor.sxproxy.wlproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsloadwlcartons;
   using Models.Pdsloadwlinq;
   using Models.Pdswlaowhsesettings;
   using Models.Pdswlaowhsecriteria;
   using Models.Pdswlstatus;
   using Models.Pdsmessaging;
   using Models.Pdswlcsship;
   using Models.Pdswlaicriteria;
   using Models.Pdswlitcriteria;
   using Models.Pdswlitresults;
   using Models.Pdswlitorderlinecriteria;
   using Models.Pdswlitorderlineresults;
   using Models.Pdswlitmstrresults;
   using Models.Complex;

   public partial class AswlinquiryAdapter : AdapterBase<pdsContextDataSet>
   {
      private WLProxyAppObject proxyAppObject;
      
      public AswlinquiryAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new WLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AswlinquiryAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      public IEnumerable<Loadwlcartonsresults> LoadWLCartons(Loadwlcartonscriteria loadwlcartonscriteria)
      {   
         var results = new List<Loadwlcartonsresults>();
         
         var pdsloadwlcartons = new pdsloadwlcartonsDataSet();
            
         DataRow ttblloadwlcartonscriteriaCriteria = pdsloadwlcartons.ttblloadwlcartonscriteria.NewttblloadwlcartonscriteriaRow();
         Loadwlcartonscriteria.UpdateRowFromLoadwlcartonscriteria(ref ttblloadwlcartonscriteriaCriteria, loadwlcartonscriteria);
         pdsloadwlcartons.ttblloadwlcartonscriteria.AddttblloadwlcartonscriteriaRow((pdsloadwlcartonsDataSet.ttblloadwlcartonscriteriaRow)ttblloadwlcartonscriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("LoadWLCartons - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.LoadWLCartons(ref pdsContext, ref pdsloadwlcartons, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("LoadWLCartons - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsloadwlcartons); 
    
            foreach (DataRow row in pdsloadwlcartons.ttblloadwlcartonsresults)
            {
                results.Add(Loadwlcartonsresults.BuildLoadwlcartonsresultsFromRow(row));
            }
            return results;
        
      }

      public AswlinquiryLoadWLInquiryResponseAPI LoadWLInquiry(Loadwlinqcriteria loadwlinqcriteria)
      {   
         var result = new AswlinquiryLoadWLInquiryResponseAPI();
         
         var pdsloadwlinq = new pdsloadwlinqDataSet();
            
         DataRow ttblloadwlinqcriteriaCriteria = pdsloadwlinq.ttblloadwlinqcriteria.NewttblloadwlinqcriteriaRow();
         Loadwlinqcriteria.UpdateRowFromLoadwlinqcriteria(ref ttblloadwlinqcriteriaCriteria, loadwlinqcriteria);
         pdsloadwlinq.ttblloadwlinqcriteria.AddttblloadwlinqcriteriaRow((pdsloadwlinqDataSet.ttblloadwlinqcriteriaRow)ttblloadwlinqcriteriaCriteria);
            
         string cUnavailableMessage = string.Empty;
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("LoadWLInquiry - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.LoadWLInquiry(ref pdsContext, ref pdsloadwlinq, out cUnavailableMessage, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("LoadWLInquiry - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsloadwlinq); 
    
         foreach (DataRow row in pdsloadwlinq.ttblloadwlinqdtlresults)
         {
            result.loadwlinqdtlresults.Add(Loadwlinqdtlresults.BuildLoadwlinqdtlresultsFromRow(row));
         }     
         foreach (DataRow row in pdsloadwlinq.ttblloadwlinqhdrresults)
         {
            result.loadwlinqhdrresults.Add(Loadwlinqhdrresults.BuildLoadwlinqhdrresultsFromRow(row));
         }     
         if (pdsloadwlinq.ttblloadwlinqsingle.Count > 0)
         {
            result.loadwlinqsingle = Loadwlinqsingle.BuildLoadwlinqsingleFromRow(pdsloadwlinq.ttblloadwlinqsingle[0]);
         }
                    
         result.cUnavailableMessage = cUnavailableMessage;
          
         return result;
          
      }

      public IEnumerable<Wlaowhsesettings> GetWLAOWhseSettings(string cWhse, int iToCono)
      {   
         var results = new List<Wlaowhsesettings>();
         
         var pdswlaowhsesettings = new pdswlaowhsesettingsDataSet();
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("GetWLAOWhseSettings - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.GetWLAOWhseSettings(ref pdsContext,  cWhse,  iToCono, out pdswlaowhsesettings, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("GetWLAOWhseSettings - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlaowhsesettings); 
    
            foreach (DataRow row in pdswlaowhsesettings.ttblwlaowhsesettings)
            {
                results.Add(Wlaowhsesettings.BuildWlaowhsesettingsFromRow(row));
            }
            return results;
        
      }

      public AswlinquiryGetWLAOManyWhseSettingsResponseAPI GetWLAOManyWhseSettings(IEnumerable<Wlaowhsecriteria> wlaowhsecriteria)
      {   
         var result = new AswlinquiryGetWLAOManyWhseSettingsResponseAPI();
         
         var pdswlaowhsecriteria = new pdswlaowhsecriteriaDataSet();
            
         var pdswlaowhsesettings = new pdswlaowhsesettingsDataSet();
            
         foreach (var obj in wlaowhsecriteria)
         {
             DataRow row = pdswlaowhsecriteria.ttblwlaowhsecriteria.NewttblwlaowhsecriteriaRow();
             Wlaowhsecriteria.UpdateRowFromWlaowhsecriteria(ref row, obj);
             pdswlaowhsecriteria.ttblwlaowhsecriteria.AddttblwlaowhsecriteriaRow((pdswlaowhsecriteriaDataSet.ttblwlaowhsecriteriaRow)row);
         }
        
         bool lModwlfl = false;
         bool lAnywlwhsefl = false;
         bool lAnywlesbfl = false;
         bool lAnywlrcvonlyfl = false;
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("GetWLAOManyWhseSettings - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.GetWLAOManyWhseSettings(ref pdsContext,  pdswlaowhsecriteria, out pdswlaowhsesettings, out lModwlfl, out lAnywlwhsefl, out lAnywlesbfl, out lAnywlrcvonlyfl, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("GetWLAOManyWhseSettings - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlaowhsecriteria); 
    
         foreach (DataRow row in pdswlaowhsesettings.ttblwlaowhsesettings)
         {
            result.wlaowhsesettings.Add(Wlaowhsesettings.BuildWlaowhsesettingsFromRow(row));
         }     
         result.lModwlfl = lModwlfl;
         result.lAnywlwhsefl = lAnywlwhsefl;
         result.lAnywlesbfl = lAnywlesbfl;
         result.lAnywlrcvonlyfl = lAnywlrcvonlyfl;
          
         return result;
          
      }

      public Wlstatus WLStatusGetNew(string cProcedure, int iOrderNo, int iOrderSuf, string cUpdateType)
      {   
         var result = new Wlstatus();
         
         var pdswlstatus = new pdswlstatusDataSet();
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLStatusGetNew - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLStatusGetNew(ref pdsContext,  cProcedure,  iOrderNo,  iOrderSuf,  cUpdateType, out pdswlstatus, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLStatusGetNew - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlstatus); 
    
         if (pdswlstatus.ttblwlstatus.Count > 0) 
         { 
             result = Wlstatus.BuildWlstatusFromRow(pdswlstatus.ttblwlstatus[0]);
         } 
              
          
         return result;
          
      }

      public Wlstatus WLStatusInitiate(Wlstatus wlstatus)
      {   
         var result = new Wlstatus();
         
         var pdswlstatus = new pdswlstatusDataSet();
            
         DataRow ttblwlstatusCriteria = pdswlstatus.ttblwlstatus.NewttblwlstatusRow();
         Wlstatus.UpdateRowFromWlstatus(ref ttblwlstatusCriteria, wlstatus);
         pdswlstatus.ttblwlstatus.AddttblwlstatusRow((pdswlstatusDataSet.ttblwlstatusRow)ttblwlstatusCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLStatusInitiate - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLStatusInitiate(ref pdsContext, ref pdswlstatus, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLStatusInitiate - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlstatus); 
    
         if (pdswlstatus.ttblwlstatus.Count > 0) 
         { 
             result = Wlstatus.BuildWlstatusFromRow(pdswlstatus.ttblwlstatus[0]);
         } 
              
          
         return result;
          
      }

      public Wlstatus WLStatusLeaveUnPickOEFl(Wlstatus wlstatus)
      {   
         var result = new Wlstatus();
         
         var pdswlstatus = new pdswlstatusDataSet();
            
         DataRow ttblwlstatusCriteria = pdswlstatus.ttblwlstatus.NewttblwlstatusRow();
         Wlstatus.UpdateRowFromWlstatus(ref ttblwlstatusCriteria, wlstatus);
         pdswlstatus.ttblwlstatus.AddttblwlstatusRow((pdswlstatusDataSet.ttblwlstatusRow)ttblwlstatusCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLStatusLeaveUnPickOEFl - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLStatusLeaveUnPickOEFl(ref pdsContext, ref pdswlstatus, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLStatusLeaveUnPickOEFl - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlstatus); 
    
         if (pdswlstatus.ttblwlstatus.Count > 0) 
         { 
             result = Wlstatus.BuildWlstatusFromRow(pdswlstatus.ttblwlstatus[0]);
         } 
              
          
         return result;
          
      }

      public Wlstatus WLStatusLeaveWhseChgFl(Wlstatus wlstatus)
      {   
         var result = new Wlstatus();
         
         var pdswlstatus = new pdswlstatusDataSet();
            
         DataRow ttblwlstatusCriteria = pdswlstatus.ttblwlstatus.NewttblwlstatusRow();
         Wlstatus.UpdateRowFromWlstatus(ref ttblwlstatusCriteria, wlstatus);
         pdswlstatus.ttblwlstatus.AddttblwlstatusRow((pdswlstatusDataSet.ttblwlstatusRow)ttblwlstatusCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLStatusLeaveWhseChgFl - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLStatusLeaveWhseChgFl(ref pdsContext, ref pdswlstatus, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLStatusLeaveWhseChgFl - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlstatus); 
    
         if (pdswlstatus.ttblwlstatus.Count > 0) 
         { 
             result = Wlstatus.BuildWlstatusFromRow(pdswlstatus.ttblwlstatus[0]);
         } 
              
          
         return result;
          
      }

      public AswlinquiryWLStatusCompleteResponseAPI WLStatusComplete(AswlinquiryWLStatusCompleteRequestAPI AswlinquiryWLStatusCompleteRequestAPI)
      {   
         var result = new AswlinquiryWLStatusCompleteResponseAPI();
         
         var pdswlstatus = new pdswlstatusDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         bool pvCheckesbauth = false;
         bool pvChecktwlauth = false;
         string cErrorMessage = string.Empty;
   
         DataRow ttblwlstatusRow = pdswlstatus.ttblwlstatus.NewttblwlstatusRow();
         Wlstatus.UpdateRowFromWlstatus(ref ttblwlstatusRow, AswlinquiryWLStatusCompleteRequestAPI.wlstatus);
         pdswlstatus.ttblwlstatus.AddttblwlstatusRow((pdswlstatusDataSet.ttblwlstatusRow)ttblwlstatusRow);
          
         var  cProcedure = AswlinquiryWLStatusCompleteRequestAPI.cProcedure;
            
         
         NLogLoggerP.Trace("WLStatusComplete - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLStatusComplete(ref pdsContext,  cProcedure, out pvCheckesbauth, out pvChecktwlauth, ref pdswlstatus, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLStatusComplete - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlstatus); 
    
         foreach (DataRow row in pdsmessaging.ttblmessaging)
         {
            result.messaging.Add(Messaging.BuildMessagingFromRow(row));
         }     
         if (pdswlstatus.ttblwlstatus.Count > 0)
         {
            result.wlstatus = Wlstatus.BuildWlstatusFromRow(pdswlstatus.ttblwlstatus[0]);
         }
                    
         result.pvCheckesbauth = pvCheckesbauth;
         result.pvChecktwlauth = pvChecktwlauth;
          
         return result;
          
      }

      public Wlcsship WLCsShipRetrieve(int iOrderno, int iOrdersuf)
      {   
         var result = new Wlcsship();
         
         var pdswlcsship = new pdswlcsshipDataSet();
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLCsShipRetrieve - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLCsShipRetrieve(ref pdsContext,  iOrderno,  iOrdersuf, out pdswlcsship, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLCsShipRetrieve - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlcsship); 
    
         if (pdswlcsship.ttblwlcsship.Count > 0) 
         { 
             result = Wlcsship.BuildWlcsshipFromRow(pdswlcsship.ttblwlcsship[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Messaging> WLCsShipUpdate(Wlcsship wlcsship)
      {   
         var results = new List<Messaging>();
         
         var pdswlcsship = new pdswlcsshipDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         DataRow ttblwlcsshipCriteria = pdswlcsship.ttblwlcsship.NewttblwlcsshipRow();
         Wlcsship.UpdateRowFromWlcsship(ref ttblwlcsshipCriteria, wlcsship);
         pdswlcsship.ttblwlcsship.AddttblwlcsshipRow((pdswlcsshipDataSet.ttblwlcsshipRow)ttblwlcsshipCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLCsShipUpdate - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLCsShipUpdate(ref pdsContext,  pdswlcsship, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLCsShipUpdate - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlcsship); 
    
            foreach (DataRow row in pdsmessaging.ttblmessaging)
            {
                results.Add(Messaging.BuildMessagingFromRow(row));
            }
            return results;
        
      }

      public AswlinquiryWLAIFieldChangeWhseResponseAPI WLAIFieldChangeWhse(Wlaicriteria wlaicriteria)
      {   
         var result = new AswlinquiryWLAIFieldChangeWhseResponseAPI();
         
         var pdswlaicriteria = new pdswlaicriteriaDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         DataRow ttblwlaicriteriaCriteria = pdswlaicriteria.ttblwlaicriteria.NewttblwlaicriteriaRow();
         Wlaicriteria.UpdateRowFromWlaicriteria(ref ttblwlaicriteriaCriteria, wlaicriteria);
         pdswlaicriteria.ttblwlaicriteria.AddttblwlaicriteriaRow((pdswlaicriteriaDataSet.ttblwlaicriteriaRow)ttblwlaicriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLAIFieldChangeWhse - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLAIFieldChangeWhse(ref pdsContext, ref pdswlaicriteria, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLAIFieldChangeWhse - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlaicriteria); 
    
         foreach (DataRow row in pdsmessaging.ttblmessaging)
         {
            result.messaging.Add(Messaging.BuildMessagingFromRow(row));
         }     
         if (pdswlaicriteria.ttblwlaicriteria.Count > 0)
         {
            result.wlaicriteria = Wlaicriteria.BuildWlaicriteriaFromRow(pdswlaicriteria.ttblwlaicriteria[0]);
         }
                    
          
         return result;
          
      }

      public IEnumerable<Messaging> WLAIUpdate(Wlaicriteria wlaicriteria)
      {   
         var results = new List<Messaging>();
         
         var pdswlaicriteria = new pdswlaicriteriaDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         DataRow ttblwlaicriteriaCriteria = pdswlaicriteria.ttblwlaicriteria.NewttblwlaicriteriaRow();
         Wlaicriteria.UpdateRowFromWlaicriteria(ref ttblwlaicriteriaCriteria, wlaicriteria);
         pdswlaicriteria.ttblwlaicriteria.AddttblwlaicriteriaRow((pdswlaicriteriaDataSet.ttblwlaicriteriaRow)ttblwlaicriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLAIUpdate - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLAIUpdate(ref pdsContext,  pdswlaicriteria, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLAIUpdate - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlaicriteria); 
    
            foreach (DataRow row in pdsmessaging.ttblmessaging)
            {
                results.Add(Messaging.BuildMessagingFromRow(row));
            }
            return results;
        
      }

      public void WLICSDClearWMFlags(string cWhse)
      {   
         
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLICSDClearWMFlags - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLICSDClearWMFlags(ref pdsContext,  cWhse, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLICSDClearWMFlags - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         
      }

      public AswlinquiryWLITGetListResponseAPI WLITGetList(Wlitcriteria wlitcriteria)
      {   
         var result = new AswlinquiryWLITGetListResponseAPI();
         
         var pdswlitcriteria = new pdswlitcriteriaDataSet();
            
         var pdswlitresults = new pdswlitresultsDataSet();
            
         DataRow ttblwlitcriteriaCriteria = pdswlitcriteria.ttblwlitcriteria.NewttblwlitcriteriaRow();
         Wlitcriteria.UpdateRowFromWlitcriteria(ref ttblwlitcriteriaCriteria, wlitcriteria);
         pdswlitcriteria.ttblwlitcriteria.AddttblwlitcriteriaRow((pdswlitcriteriaDataSet.ttblwlitcriteriaRow)ttblwlitcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("WLITGetList - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITGetList(ref pdsContext,  pdswlitcriteria, out pdswlitresults, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("WLITGetList - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitcriteria); 
    
         foreach (DataRow row in pdswlitresults.ttblwlitresults)
         {
            result.wlitresults.Add(Wlitresults.BuildWlitresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public Wlitresults WLITUpdateStatus(AswlinquiryWLITUpdateStatusRequestAPI AswlinquiryWLITUpdateStatusRequestAPI)
      {   
         var result = new Wlitresults();
         
         var pdswlitresults = new pdswlitresultsDataSet();
            
         string cErrorMessage = string.Empty;
   
         DataRow ttblwlitresultsRow = pdswlitresults.ttblwlitresults.NewttblwlitresultsRow();
         Wlitresults.UpdateRowFromWlitresults(ref ttblwlitresultsRow, AswlinquiryWLITUpdateStatusRequestAPI.wlitresults);
         pdswlitresults.ttblwlitresults.AddttblwlitresultsRow((pdswlitresultsDataSet.ttblwlitresultsRow)ttblwlitresultsRow);
          
         var  pvStatustype = AswlinquiryWLITUpdateStatusRequestAPI.pvStatustype;
            
         
         NLogLoggerP.Trace("WLITUpdateStatus - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITUpdateStatus(ref pdsContext,  pvStatustype, ref pdswlitresults, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLITUpdateStatus - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitresults); 
    
         if (pdswlitresults.ttblwlitresults.Count > 0) 
         { 
             result = Wlitresults.BuildWlitresultsFromRow(pdswlitresults.ttblwlitresults[0]);
         } 
              
          
         return result;
          
      }

      public AswlinquiryWLITOrderLineGetListResponseAPI WLITOrderLineGetList(Wlitorderlinecriteria wlitorderlinecriteria)
      {   
         var result = new AswlinquiryWLITOrderLineGetListResponseAPI();
         
         var pdswlitorderlinecriteria = new pdswlitorderlinecriteriaDataSet();
            
         var pdswlitorderlineresults = new pdswlitorderlineresultsDataSet();
            
         DataRow ttblwlitorderlinecriteriaCriteria = pdswlitorderlinecriteria.ttblwlitorderlinecriteria.NewttblwlitorderlinecriteriaRow();
         Wlitorderlinecriteria.UpdateRowFromWlitorderlinecriteria(ref ttblwlitorderlinecriteriaCriteria, wlitorderlinecriteria);
         pdswlitorderlinecriteria.ttblwlitorderlinecriteria.AddttblwlitorderlinecriteriaRow((pdswlitorderlinecriteriaDataSet.ttblwlitorderlinecriteriaRow)ttblwlitorderlinecriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("WLITOrderLineGetList - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITOrderLineGetList(ref pdsContext,  pdswlitorderlinecriteria, out pdswlitorderlineresults, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("WLITOrderLineGetList - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitorderlinecriteria); 
    
         foreach (DataRow row in pdswlitorderlineresults.ttblwlitorderlineresults)
         {
            result.wlitorderlineresults.Add(Wlitorderlineresults.BuildWlitorderlineresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Wlitresults> WLITResetWIPTrans(IEnumerable<Wlitresults> wlitresults)
      {   
         var results = new List<Wlitresults>();
         
         var pdswlitresults = new pdswlitresultsDataSet();
            
         foreach (var obj in wlitresults)
         {
             DataRow row = pdswlitresults.ttblwlitresults.NewttblwlitresultsRow();
             Wlitresults.UpdateRowFromWlitresults(ref row, obj);
             pdswlitresults.ttblwlitresults.AddttblwlitresultsRow((pdswlitresultsDataSet.ttblwlitresultsRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLITResetWIPTrans - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITResetWIPTrans(ref pdsContext, ref pdswlitresults, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLITResetWIPTrans - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitresults); 
    
            foreach (DataRow row in pdswlitresults.ttblwlitresults)
            {
                results.Add(Wlitresults.BuildWlitresultsFromRow(row));
            }
            return results;
        
      }

      public AswlinquiryWLITMstrGetListResponseAPI WLITMstrGetList(Wlitcriteria wlitcriteria)
      {   
         var result = new AswlinquiryWLITMstrGetListResponseAPI();
         
         var pdswlitcriteria = new pdswlitcriteriaDataSet();
            
         var pdswlitmstrresults = new pdswlitmstrresultsDataSet();
            
         DataRow ttblwlitcriteriaCriteria = pdswlitcriteria.ttblwlitcriteria.NewttblwlitcriteriaRow();
         Wlitcriteria.UpdateRowFromWlitcriteria(ref ttblwlitcriteriaCriteria, wlitcriteria);
         pdswlitcriteria.ttblwlitcriteria.AddttblwlitcriteriaRow((pdswlitcriteriaDataSet.ttblwlitcriteriaRow)ttblwlitcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("WLITMstrGetList - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITMstrGetList(ref pdsContext,  pdswlitcriteria, out pdswlitmstrresults, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("WLITMstrGetList - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitcriteria); 
    
         foreach (DataRow row in pdswlitmstrresults.ttblwlitmstrresults)
         {
            result.wlitmstrresults.Add(Wlitmstrresults.BuildWlitmstrresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public Wlitmstrresults WLITMstrUpdateStatus(AswlinquiryWLITMstrUpdateStatusRequestAPI AswlinquiryWLITMstrUpdateStatusRequestAPI)
      {   
         var result = new Wlitmstrresults();
         
         var pdswlitmstrresults = new pdswlitmstrresultsDataSet();
            
         string cErrorMessage = string.Empty;
   
         DataRow ttblwlitmstrresultsRow = pdswlitmstrresults.ttblwlitmstrresults.NewttblwlitmstrresultsRow();
         Wlitmstrresults.UpdateRowFromWlitmstrresults(ref ttblwlitmstrresultsRow, AswlinquiryWLITMstrUpdateStatusRequestAPI.wlitmstrresults);
         pdswlitmstrresults.ttblwlitmstrresults.AddttblwlitmstrresultsRow((pdswlitmstrresultsDataSet.ttblwlitmstrresultsRow)ttblwlitmstrresultsRow);
          
         var  pvStatustype = AswlinquiryWLITMstrUpdateStatusRequestAPI.pvStatustype;
            
         
         NLogLoggerP.Trace("WLITMstrUpdateStatus - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITMstrUpdateStatus(ref pdsContext,  pvStatustype, ref pdswlitmstrresults, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLITMstrUpdateStatus - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitmstrresults); 
    
         if (pdswlitmstrresults.ttblwlitmstrresults.Count > 0) 
         { 
             result = Wlitmstrresults.BuildWlitmstrresultsFromRow(pdswlitmstrresults.ttblwlitmstrresults[0]);
         } 
              
          
         return result;
          
      }

      public AswlinquiryWLITReturnsPOGetListResponseAPI WLITReturnsPOGetList(Wlitcriteria wlitcriteria)
      {   
         var result = new AswlinquiryWLITReturnsPOGetListResponseAPI();
         
         var pdswlitcriteria = new pdswlitcriteriaDataSet();
            
         var pdswlitresults = new pdswlitresultsDataSet();
            
         DataRow ttblwlitcriteriaCriteria = pdswlitcriteria.ttblwlitcriteria.NewttblwlitcriteriaRow();
         Wlitcriteria.UpdateRowFromWlitcriteria(ref ttblwlitcriteriaCriteria, wlitcriteria);
         pdswlitcriteria.ttblwlitcriteria.AddttblwlitcriteriaRow((pdswlitcriteriaDataSet.ttblwlitcriteriaRow)ttblwlitcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("WLITReturnsPOGetList - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITReturnsPOGetList(ref pdsContext,  pdswlitcriteria, out pdswlitresults, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("WLITReturnsPOGetList - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitcriteria); 
    
         foreach (DataRow row in pdswlitresults.ttblwlitresults)
         {
            result.wlitresults.Add(Wlitresults.BuildWlitresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public Wlitresults WLITReturnsPOUpdateStatus(AswlinquiryWLITReturnsPOUpdateStatusRequestAPI AswlinquiryWLITReturnsPOUpdateStatusRequestAPI)
      {   
         var result = new Wlitresults();
         
         var pdswlitresults = new pdswlitresultsDataSet();
            
         string cErrorMessage = string.Empty;
   
         DataRow ttblwlitresultsRow = pdswlitresults.ttblwlitresults.NewttblwlitresultsRow();
         Wlitresults.UpdateRowFromWlitresults(ref ttblwlitresultsRow, AswlinquiryWLITReturnsPOUpdateStatusRequestAPI.wlitresults);
         pdswlitresults.ttblwlitresults.AddttblwlitresultsRow((pdswlitresultsDataSet.ttblwlitresultsRow)ttblwlitresultsRow);
          
         var  pvStatustype = AswlinquiryWLITReturnsPOUpdateStatusRequestAPI.pvStatustype;
            
         
         NLogLoggerP.Trace("WLITReturnsPOUpdateStatus - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITReturnsPOUpdateStatus(ref pdsContext,  pvStatustype, ref pdswlitresults, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLITReturnsPOUpdateStatus - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitresults); 
    
         if (pdswlitresults.ttblwlitresults.Count > 0) 
         { 
             result = Wlitresults.BuildWlitresultsFromRow(pdswlitresults.ttblwlitresults[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Wlitmstrresults> WLITMstrResetWIPTrans(IEnumerable<Wlitmstrresults> wlitmstrresults)
      {   
         var results = new List<Wlitmstrresults>();
         
         var pdswlitmstrresults = new pdswlitmstrresultsDataSet();
            
         foreach (var obj in wlitmstrresults)
         {
             DataRow row = pdswlitmstrresults.ttblwlitmstrresults.NewttblwlitmstrresultsRow();
             Wlitmstrresults.UpdateRowFromWlitmstrresults(ref row, obj);
             pdswlitmstrresults.ttblwlitmstrresults.AddttblwlitmstrresultsRow((pdswlitmstrresultsDataSet.ttblwlitmstrresultsRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("WLITMstrResetWIPTrans - Aswlinquiry - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAswlinquiryproxy = this.proxyAppObject.CreatePO_aswlinquiryproxy())
               {
                   this.SetRequiredContextParameters();
                   poAswlinquiryproxy.WLITMstrResetWIPTrans(ref pdsContext, ref pdswlitmstrresults, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("WLITMstrResetWIPTrans - Aswlinquiry - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdswlitmstrresults); 
    
            foreach (DataRow row in pdswlitmstrresults.ttblwlitmstrresults)
            {
                results.Add(Wlitmstrresults.BuildWlitmstrresultsFromRow(row));
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
  