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
   using Models.Pdsbuildcomptt;
   using Models.Pdscheckprodxref;
   using Models.Pdscreateicfuturett;
   using Models.Pdscreateictranstt;
   using Models.Pdsiciafetchprod;
   using Models.Pdsicipfetchadj;
   using Models.Pdsicipfetchbal;
   using Models.Pdsicipfetchpricing;
   using Models.Pdsicipfetchprod;
   using Models.Pdsicipfetchrepl;
   using Models.Pdsicipfetchrollup;
   using Models.Pdsicipfetchroai;
   using Models.Pdsicipfetchtransdet;
   using Models.Pdsicipfetchtrend;
   using Models.Pdsloadaltvendtt;
   using Models.Pdsloadcrossreftt;
   using Models.Pdsloadlotshisttt;
   using Models.Pdsloadserialshisttt;
   using Models.Pdsloadunavailtt;
   using Models.Complex;

   public partial class AsicwhseprodAdapter : AdapterBase<pdsContextDataSet>
   {
      private ICProxyAppObject proxyAppObject;
      
      public AsicwhseprodAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AsicwhseprodAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      public AsicwhseprodBuildComponentTempTableResponseAPI BuildComponentTempTable(Buildcompttcriteria buildcompttcriteria)
      {   
         var result = new AsicwhseprodBuildComponentTempTableResponseAPI();
         
         var pdsbuildcomptt = new pdsbuildcompttDataSet();
            
         DataRow ttblbuildcompttcriteriaCriteria = pdsbuildcomptt.ttblbuildcompttcriteria.NewttblbuildcompttcriteriaRow();
         Buildcompttcriteria.UpdateRowFromBuildcompttcriteria(ref ttblbuildcompttcriteriaCriteria, buildcompttcriteria);
         pdsbuildcomptt.ttblbuildcompttcriteria.AddttblbuildcompttcriteriaRow((pdsbuildcompttDataSet.ttblbuildcompttcriteriaRow)ttblbuildcompttcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("BuildComponentTempTable - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.BuildComponentTempTable(ref pdsContext, ref pdsbuildcomptt, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("BuildComponentTempTable - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsbuildcomptt); 
    
         foreach (DataRow row in pdsbuildcomptt.ttblbuildcompttresults)
         {
            result.buildcompttresults.Add(Buildcompttresults.BuildBuildcompttresultsFromRow(row));
         }     
         if (pdsbuildcomptt.ttblbuildcompttsingle.Count > 0)
         {
            result.buildcompttsingle = Buildcompttsingle.BuildBuildcompttsingleFromRow(pdsbuildcomptt.ttblbuildcompttsingle[0]);
         }
                    
          
         return result;
          
      }

      public AsicwhseprodCheckProductCrossReferenceResponseAPI CheckProductCrossReference(Checkprodxrefcriteria checkprodxrefcriteria)
      {   
         var result = new AsicwhseprodCheckProductCrossReferenceResponseAPI();
         
         var pdscheckprodxref = new pdscheckprodxrefDataSet();
            
         DataRow ttblcheckprodxrefcriteriaCriteria = pdscheckprodxref.ttblcheckprodxrefcriteria.NewttblcheckprodxrefcriteriaRow();
         Checkprodxrefcriteria.UpdateRowFromCheckprodxrefcriteria(ref ttblcheckprodxrefcriteriaCriteria, checkprodxrefcriteria);
         pdscheckprodxref.ttblcheckprodxrefcriteria.AddttblcheckprodxrefcriteriaRow((pdscheckprodxrefDataSet.ttblcheckprodxrefcriteriaRow)ttblcheckprodxrefcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("CheckProductCrossReference - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.CheckProductCrossReference(ref pdsContext, ref pdscheckprodxref, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("CheckProductCrossReference - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscheckprodxref); 
    
         foreach (DataRow row in pdscheckprodxref.ttblcheckprodxrefresults)
         {
            result.checkprodxrefresults.Add(Checkprodxrefresults.BuildCheckprodxrefresultsFromRow(row));
         }     
         if (pdscheckprodxref.ttblcheckprodxrefsingle.Count > 0)
         {
            result.checkprodxrefsingle = Checkprodxrefsingle.BuildCheckprodxrefsingleFromRow(pdscheckprodxref.ttblcheckprodxrefsingle[0]);
         }
                    
          
         return result;
          
      }

      public AsicwhseprodCreateICFutureAvailTTResponseAPI CreateICFutureAvailTT(Createicfuturettcriteria createicfuturettcriteria)
      {   
         var result = new AsicwhseprodCreateICFutureAvailTTResponseAPI();
         
         var pdscreateicfuturett = new pdscreateicfuturettDataSet();
            
         DataRow ttblcreateicfuturettcriteriaCriteria = pdscreateicfuturett.ttblcreateicfuturettcriteria.NewttblcreateicfuturettcriteriaRow();
         Createicfuturettcriteria.UpdateRowFromCreateicfuturettcriteria(ref ttblcreateicfuturettcriteriaCriteria, createicfuturettcriteria);
         pdscreateicfuturett.ttblcreateicfuturettcriteria.AddttblcreateicfuturettcriteriaRow((pdscreateicfuturettDataSet.ttblcreateicfuturettcriteriaRow)ttblcreateicfuturettcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("CreateICFutureAvailTT - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.CreateICFutureAvailTT(ref pdsContext, ref pdscreateicfuturett, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("CreateICFutureAvailTT - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscreateicfuturett); 
    
         foreach (DataRow row in pdscreateicfuturett.ttblcreateicfuturettresults)
         {
            result.createicfuturettresults.Add(Createicfuturettresults.BuildCreateicfuturettresultsFromRow(row));
         }     
         if (pdscreateicfuturett.ttblcreateicfuturettsingle.Count > 0)
         {
            result.createicfuturettsingle = Createicfuturettsingle.BuildCreateicfuturettsingleFromRow(pdscreateicfuturett.ttblcreateicfuturettsingle[0]);
         }
                    
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public AsicwhseprodCreateICTransTTResponseAPI CreateICTransTT(Createictransttcriteria createictransttcriteria)
      {   
         var result = new AsicwhseprodCreateICTransTTResponseAPI();
         
         var pdscreateictranstt = new pdscreateictransttDataSet();
            
         DataRow ttblcreateictransttcriteriaCriteria = pdscreateictranstt.ttblcreateictransttcriteria.NewttblcreateictransttcriteriaRow();
         Createictransttcriteria.UpdateRowFromCreateictransttcriteria(ref ttblcreateictransttcriteriaCriteria, createictransttcriteria);
         pdscreateictranstt.ttblcreateictransttcriteria.AddttblcreateictransttcriteriaRow((pdscreateictransttDataSet.ttblcreateictransttcriteriaRow)ttblcreateictransttcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("CreateICTransTT - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.CreateICTransTT(ref pdsContext, ref pdscreateictranstt, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("CreateICTransTT - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscreateictranstt); 
    
         foreach (DataRow row in pdscreateictranstt.ttblcreateictransttresults)
         {
            result.createictransttresults.Add(Createictransttresults.BuildCreateictransttresultsFromRow(row));
         }     
         if (pdscreateictranstt.ttblcreateictransttsingle.Count > 0)
         {
            result.createictransttsingle = Createictransttsingle.BuildCreateictransttsingleFromRow(pdscreateictranstt.ttblcreateictransttsingle[0]);
         }
                    
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public Iciafetchprodresults ICIAFetchProduct(Iciafetchprodcriteria iciafetchprodcriteria)
      {   
         var result = new Iciafetchprodresults();
         
         var pdsiciafetchprod = new pdsiciafetchprodDataSet();
            
         DataRow ttbliciafetchprodcriteriaCriteria = pdsiciafetchprod.ttbliciafetchprodcriteria.NewttbliciafetchprodcriteriaRow();
         Iciafetchprodcriteria.UpdateRowFromIciafetchprodcriteria(ref ttbliciafetchprodcriteriaCriteria, iciafetchprodcriteria);
         pdsiciafetchprod.ttbliciafetchprodcriteria.AddttbliciafetchprodcriteriaRow((pdsiciafetchprodDataSet.ttbliciafetchprodcriteriaRow)ttbliciafetchprodcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIAFetchProduct - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIAFetchProduct(ref pdsContext, ref pdsiciafetchprod, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIAFetchProduct - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsiciafetchprod); 
    
         if (pdsiciafetchprod.ttbliciafetchprodresults.Count > 0) 
         { 
             result = Iciafetchprodresults.BuildIciafetchprodresultsFromRow(pdsiciafetchprod.ttbliciafetchprodresults[0]);
         } 
              
          
         return result;
          
      }

      public Icipfetchadjresults ICIPFetchAdjusters(Icipfetchadjcriteria icipfetchadjcriteria)
      {   
         var result = new Icipfetchadjresults();
         
         var pdsicipfetchadj = new pdsicipfetchadjDataSet();
            
         DataRow ttblicipfetchadjcriteriaCriteria = pdsicipfetchadj.ttblicipfetchadjcriteria.NewttblicipfetchadjcriteriaRow();
         Icipfetchadjcriteria.UpdateRowFromIcipfetchadjcriteria(ref ttblicipfetchadjcriteriaCriteria, icipfetchadjcriteria);
         pdsicipfetchadj.ttblicipfetchadjcriteria.AddttblicipfetchadjcriteriaRow((pdsicipfetchadjDataSet.ttblicipfetchadjcriteriaRow)ttblicipfetchadjcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchAdjusters - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchAdjusters(ref pdsContext, ref pdsicipfetchadj, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchAdjusters - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchadj); 
    
         if (pdsicipfetchadj.ttblicipfetchadjresults.Count > 0) 
         { 
             result = Icipfetchadjresults.BuildIcipfetchadjresultsFromRow(pdsicipfetchadj.ttblicipfetchadjresults[0]);
         } 
              
          
         return result;
          
      }

      public Icipfetchbalresults ICIPFetchBalances(Icipfetchbalcriteria icipfetchbalcriteria)
      {   
         var result = new Icipfetchbalresults();
         
         var pdsicipfetchbal = new pdsicipfetchbalDataSet();
            
         DataRow ttblicipfetchbalcriteriaCriteria = pdsicipfetchbal.ttblicipfetchbalcriteria.NewttblicipfetchbalcriteriaRow();
         Icipfetchbalcriteria.UpdateRowFromIcipfetchbalcriteria(ref ttblicipfetchbalcriteriaCriteria, icipfetchbalcriteria);
         pdsicipfetchbal.ttblicipfetchbalcriteria.AddttblicipfetchbalcriteriaRow((pdsicipfetchbalDataSet.ttblicipfetchbalcriteriaRow)ttblicipfetchbalcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchBalances - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchBalances(ref pdsContext, ref pdsicipfetchbal, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchBalances - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchbal); 
    
         if (pdsicipfetchbal.ttblicipfetchbalresults.Count > 0) 
         { 
             result = Icipfetchbalresults.BuildIcipfetchbalresultsFromRow(pdsicipfetchbal.ttblicipfetchbalresults[0]);
         } 
              
          
         return result;
          
      }

      public Icipfetchpricingresults ICIPFetchPricing(Icipfetchpricingcriteria icipfetchpricingcriteria)
      {   
         var result = new Icipfetchpricingresults();
         
         var pdsicipfetchpricing = new pdsicipfetchpricingDataSet();
            
         DataRow ttblicipfetchpricingcriteriaCriteria = pdsicipfetchpricing.ttblicipfetchpricingcriteria.NewttblicipfetchpricingcriteriaRow();
         Icipfetchpricingcriteria.UpdateRowFromIcipfetchpricingcriteria(ref ttblicipfetchpricingcriteriaCriteria, icipfetchpricingcriteria);
         pdsicipfetchpricing.ttblicipfetchpricingcriteria.AddttblicipfetchpricingcriteriaRow((pdsicipfetchpricingDataSet.ttblicipfetchpricingcriteriaRow)ttblicipfetchpricingcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchPricing - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchPricing(ref pdsContext, ref pdsicipfetchpricing, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchPricing - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchpricing); 
    
         if (pdsicipfetchpricing.ttblicipfetchpricingresults.Count > 0) 
         { 
             result = Icipfetchpricingresults.BuildIcipfetchpricingresultsFromRow(pdsicipfetchpricing.ttblicipfetchpricingresults[0]);
         } 
              
          
         return result;
          
      }

      public Icipfetchprodresults ICIPFetchProduct(Icipfetchprodcriteria icipfetchprodcriteria)
      {   
         var result = new Icipfetchprodresults();
         
         var pdsicipfetchprod = new pdsicipfetchprodDataSet();
            
         DataRow ttblicipfetchprodcriteriaCriteria = pdsicipfetchprod.ttblicipfetchprodcriteria.NewttblicipfetchprodcriteriaRow();
         Icipfetchprodcriteria.UpdateRowFromIcipfetchprodcriteria(ref ttblicipfetchprodcriteriaCriteria, icipfetchprodcriteria);
         pdsicipfetchprod.ttblicipfetchprodcriteria.AddttblicipfetchprodcriteriaRow((pdsicipfetchprodDataSet.ttblicipfetchprodcriteriaRow)ttblicipfetchprodcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchProduct - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchProduct(ref pdsContext, ref pdsicipfetchprod, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchProduct - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchprod); 
    
         if (pdsicipfetchprod.ttblicipfetchprodresults.Count > 0) 
         { 
             result = Icipfetchprodresults.BuildIcipfetchprodresultsFromRow(pdsicipfetchprod.ttblicipfetchprodresults[0]);
         } 
              
          
         return result;
          
      }

      public Icipfetchreplresults ICIPFetchReplenishment(Icipfetchreplcriteria icipfetchreplcriteria)
      {   
         var result = new Icipfetchreplresults();
         
         var pdsicipfetchrepl = new pdsicipfetchreplDataSet();
            
         DataRow ttblicipfetchreplcriteriaCriteria = pdsicipfetchrepl.ttblicipfetchreplcriteria.NewttblicipfetchreplcriteriaRow();
         Icipfetchreplcriteria.UpdateRowFromIcipfetchreplcriteria(ref ttblicipfetchreplcriteriaCriteria, icipfetchreplcriteria);
         pdsicipfetchrepl.ttblicipfetchreplcriteria.AddttblicipfetchreplcriteriaRow((pdsicipfetchreplDataSet.ttblicipfetchreplcriteriaRow)ttblicipfetchreplcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchReplenishment - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchReplenishment(ref pdsContext, ref pdsicipfetchrepl, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchReplenishment - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchrepl); 
    
         if (pdsicipfetchrepl.ttblicipfetchreplresults.Count > 0) 
         { 
             result = Icipfetchreplresults.BuildIcipfetchreplresultsFromRow(pdsicipfetchrepl.ttblicipfetchreplresults[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Icipfetchrollup> ICIPFetchRollup(string cWhse, string cProd)
      {   
         var results = new List<Icipfetchrollup>();
         
         var pdsicipfetchrollup = new pdsicipfetchrollupDataSet();
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchRollup - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchRollup(ref pdsContext,  cWhse,  cProd, out pdsicipfetchrollup, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchRollup - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchrollup); 
    
            foreach (DataRow row in pdsicipfetchrollup.ttblicipfetchrollup)
            {
                results.Add(Icipfetchrollup.BuildIcipfetchrollupFromRow(row));
            }
            return results;
        
      }

      public Icipfetchroairesults ICIPFetchROAI(Icipfetchroaicriteria icipfetchroaicriteria)
      {   
         var result = new Icipfetchroairesults();
         
         var pdsicipfetchroai = new pdsicipfetchroaiDataSet();
            
         DataRow ttblicipfetchroaicriteriaCriteria = pdsicipfetchroai.ttblicipfetchroaicriteria.NewttblicipfetchroaicriteriaRow();
         Icipfetchroaicriteria.UpdateRowFromIcipfetchroaicriteria(ref ttblicipfetchroaicriteriaCriteria, icipfetchroaicriteria);
         pdsicipfetchroai.ttblicipfetchroaicriteria.AddttblicipfetchroaicriteriaRow((pdsicipfetchroaiDataSet.ttblicipfetchroaicriteriaRow)ttblicipfetchroaicriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchROAI - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchROAI(ref pdsContext, ref pdsicipfetchroai, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchROAI - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchroai); 
    
         if (pdsicipfetchroai.ttblicipfetchroairesults.Count > 0) 
         { 
             result = Icipfetchroairesults.BuildIcipfetchroairesultsFromRow(pdsicipfetchroai.ttblicipfetchroairesults[0]);
         } 
              
          
         return result;
          
      }

      public Icipfetchtransdetresults ICIPFetchTransDetail(Icipfetchtransdetcriteria icipfetchtransdetcriteria)
      {   
         var result = new Icipfetchtransdetresults();
         
         var pdsicipfetchtransdet = new pdsicipfetchtransdetDataSet();
            
         DataRow ttblicipfetchtransdetcriteriaCriteria = pdsicipfetchtransdet.ttblicipfetchtransdetcriteria.NewttblicipfetchtransdetcriteriaRow();
         Icipfetchtransdetcriteria.UpdateRowFromIcipfetchtransdetcriteria(ref ttblicipfetchtransdetcriteriaCriteria, icipfetchtransdetcriteria);
         pdsicipfetchtransdet.ttblicipfetchtransdetcriteria.AddttblicipfetchtransdetcriteriaRow((pdsicipfetchtransdetDataSet.ttblicipfetchtransdetcriteriaRow)ttblicipfetchtransdetcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchTransDetail - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchTransDetail(ref pdsContext, ref pdsicipfetchtransdet, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchTransDetail - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchtransdet); 
    
         if (pdsicipfetchtransdet.ttblicipfetchtransdetresults.Count > 0) 
         { 
             result = Icipfetchtransdetresults.BuildIcipfetchtransdetresultsFromRow(pdsicipfetchtransdet.ttblicipfetchtransdetresults[0]);
         } 
              
          
         return result;
          
      }

      public Icipfetchtrendresults ICIPFetchTrend(Icipfetchtrendcriteria icipfetchtrendcriteria)
      {   
         var result = new Icipfetchtrendresults();
         
         var pdsicipfetchtrend = new pdsicipfetchtrendDataSet();
            
         DataRow ttblicipfetchtrendcriteriaCriteria = pdsicipfetchtrend.ttblicipfetchtrendcriteria.NewttblicipfetchtrendcriteriaRow();
         Icipfetchtrendcriteria.UpdateRowFromIcipfetchtrendcriteria(ref ttblicipfetchtrendcriteriaCriteria, icipfetchtrendcriteria);
         pdsicipfetchtrend.ttblicipfetchtrendcriteria.AddttblicipfetchtrendcriteriaRow((pdsicipfetchtrendDataSet.ttblicipfetchtrendcriteriaRow)ttblicipfetchtrendcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("ICIPFetchTrend - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.ICIPFetchTrend(ref pdsContext, ref pdsicipfetchtrend, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("ICIPFetchTrend - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicipfetchtrend); 
    
         if (pdsicipfetchtrend.ttblicipfetchtrendresults.Count > 0) 
         { 
             result = Icipfetchtrendresults.BuildIcipfetchtrendresultsFromRow(pdsicipfetchtrend.ttblicipfetchtrendresults[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Loadaltvendttresults> LoadAltVendorsTT(Loadaltvendttcriteria loadaltvendttcriteria)
      {   
         var results = new List<Loadaltvendttresults>();
         
         var pdsloadaltvendtt = new pdsloadaltvendttDataSet();
            
         DataRow ttblloadaltvendttcriteriaCriteria = pdsloadaltvendtt.ttblloadaltvendttcriteria.NewttblloadaltvendttcriteriaRow();
         Loadaltvendttcriteria.UpdateRowFromLoadaltvendttcriteria(ref ttblloadaltvendttcriteriaCriteria, loadaltvendttcriteria);
         pdsloadaltvendtt.ttblloadaltvendttcriteria.AddttblloadaltvendttcriteriaRow((pdsloadaltvendttDataSet.ttblloadaltvendttcriteriaRow)ttblloadaltvendttcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("LoadAltVendorsTT - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.LoadAltVendorsTT(ref pdsContext, ref pdsloadaltvendtt, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("LoadAltVendorsTT - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsloadaltvendtt); 
    
            foreach (DataRow row in pdsloadaltvendtt.ttblloadaltvendttresults)
            {
                results.Add(Loadaltvendttresults.BuildLoadaltvendttresultsFromRow(row));
            }
            return results;
        
      }

      public AsicwhseprodLoadCrossReferenceTTResponseAPI LoadCrossReferenceTT(Loadcrossrefttcriteria loadcrossrefttcriteria)
      {   
         var result = new AsicwhseprodLoadCrossReferenceTTResponseAPI();
         
         var pdsloadcrossreftt = new pdsloadcrossrefttDataSet();
            
         DataRow ttblloadcrossrefttcriteriaCriteria = pdsloadcrossreftt.ttblloadcrossrefttcriteria.NewttblloadcrossrefttcriteriaRow();
         Loadcrossrefttcriteria.UpdateRowFromLoadcrossrefttcriteria(ref ttblloadcrossrefttcriteriaCriteria, loadcrossrefttcriteria);
         pdsloadcrossreftt.ttblloadcrossrefttcriteria.AddttblloadcrossrefttcriteriaRow((pdsloadcrossrefttDataSet.ttblloadcrossrefttcriteriaRow)ttblloadcrossrefttcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("LoadCrossReferenceTT - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.LoadCrossReferenceTT(ref pdsContext, ref pdsloadcrossreftt, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("LoadCrossReferenceTT - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsloadcrossreftt); 
    
         foreach (DataRow row in pdsloadcrossreftt.ttblloadcrossrefttresults)
         {
            result.loadcrossrefttresults.Add(Loadcrossrefttresults.BuildLoadcrossrefttresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Loadlotshistttresults> LoadLotsHistoryTT(Loadlotshistttcriteria loadlotshistttcriteria)
      {   
         var results = new List<Loadlotshistttresults>();
         
         var pdsloadlotshisttt = new pdsloadlotshistttDataSet();
            
         DataRow ttblloadlotshistttcriteriaCriteria = pdsloadlotshisttt.ttblloadlotshistttcriteria.NewttblloadlotshistttcriteriaRow();
         Loadlotshistttcriteria.UpdateRowFromLoadlotshistttcriteria(ref ttblloadlotshistttcriteriaCriteria, loadlotshistttcriteria);
         pdsloadlotshisttt.ttblloadlotshistttcriteria.AddttblloadlotshistttcriteriaRow((pdsloadlotshistttDataSet.ttblloadlotshistttcriteriaRow)ttblloadlotshistttcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("LoadLotsHistoryTT - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.LoadLotsHistoryTT(ref pdsContext, ref pdsloadlotshisttt, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("LoadLotsHistoryTT - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsloadlotshisttt); 
    
            foreach (DataRow row in pdsloadlotshisttt.ttblloadlotshistttresults)
            {
                results.Add(Loadlotshistttresults.BuildLoadlotshistttresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Loadserialshistttresults> LoadSerialsHistoryTT(Loadserialshistttcriteria loadserialshistttcriteria)
      {   
         var results = new List<Loadserialshistttresults>();
         
         var pdsloadserialshisttt = new pdsloadserialshistttDataSet();
            
         DataRow ttblloadserialshistttcriteriaCriteria = pdsloadserialshisttt.ttblloadserialshistttcriteria.NewttblloadserialshistttcriteriaRow();
         Loadserialshistttcriteria.UpdateRowFromLoadserialshistttcriteria(ref ttblloadserialshistttcriteriaCriteria, loadserialshistttcriteria);
         pdsloadserialshisttt.ttblloadserialshistttcriteria.AddttblloadserialshistttcriteriaRow((pdsloadserialshistttDataSet.ttblloadserialshistttcriteriaRow)ttblloadserialshistttcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("LoadSerialsHistoryTT - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.LoadSerialsHistoryTT(ref pdsContext, ref pdsloadserialshisttt, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("LoadSerialsHistoryTT - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsloadserialshisttt); 
    
            foreach (DataRow row in pdsloadserialshisttt.ttblloadserialshistttresults)
            {
                results.Add(Loadserialshistttresults.BuildLoadserialshistttresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Loadunavailttresults> LoadUnavailableTT(Loadunavailttcriteria loadunavailttcriteria)
      {   
         var results = new List<Loadunavailttresults>();
         
         var pdsloadunavailtt = new pdsloadunavailttDataSet();
            
         DataRow ttblloadunavailttcriteriaCriteria = pdsloadunavailtt.ttblloadunavailttcriteria.NewttblloadunavailttcriteriaRow();
         Loadunavailttcriteria.UpdateRowFromLoadunavailttcriteria(ref ttblloadunavailttcriteriaCriteria, loadunavailttcriteria);
         pdsloadunavailtt.ttblloadunavailttcriteria.AddttblloadunavailttcriteriaRow((pdsloadunavailttDataSet.ttblloadunavailttcriteriaRow)ttblloadunavailttcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("LoadUnavailableTT - Asicwhseprod - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsicwhseprodproxy = this.proxyAppObject.CreatePO_asicwhseprodproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsicwhseprodproxy.LoadUnavailableTT(ref pdsContext, ref pdsloadunavailtt, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("LoadUnavailableTT - Asicwhseprod - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsloadunavailtt); 
    
            foreach (DataRow row in pdsloadunavailtt.ttblloadunavailttresults)
            {
                results.Add(Loadunavailttresults.BuildLoadunavailttresultsFromRow(row));
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
  