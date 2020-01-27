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
    
namespace Infor.Sxe.AP.Data.Adapters
{
   using com.infor.sxproxy.approxy;
   using com.infor.sxproxy.approxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsapvendorvalidatestatus;
   using Models.Pdsapvendorglfetch;
   using Models.Pdsapvendorglsave;
   using Models.Pdsapsv;
   using Models.Pdsapvendoredidropdowns;
   using Models.Pdsapvendorcopy;
   using Models.Pdsapshipfromcopy;
   using Models.Pdsapemmsetup;
   using Models.Pdsmessaging;
   using Models.Pdsapspcopy;
   using Models.Pdsapsplabel;
   using Models.Pdsapemt;
   using Models.Pdsapsdgetlist;
   using Models.Pdsapshipfromvalidatedelete;
   using Models.Pdsapsvaddtoken;
   using Models.Complex;

   public partial class AsapsetupAdapter : AdapterBase<pdsContextDataSet>
   {
      private APProxyAppObject proxyAppObject;
      
      public AsapsetupAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new APProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AsapsetupAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      public IEnumerable<Apvendorvalidatestatus> VendorValidateStatus(IEnumerable<Apvendorvalidatestatus> apvendorvalidatestatus)
      {   
         var results = new List<Apvendorvalidatestatus>();
         
         var pdsapvendorvalidatestatus = new pdsapvendorvalidatestatusDataSet();
            
         foreach (var obj in apvendorvalidatestatus)
         {
             DataRow row = pdsapvendorvalidatestatus.ttblapvendorvalidatestatus.NewttblapvendorvalidatestatusRow();
             Apvendorvalidatestatus.UpdateRowFromApvendorvalidatestatus(ref row, obj);
             pdsapvendorvalidatestatus.ttblapvendorvalidatestatus.AddttblapvendorvalidatestatusRow((pdsapvendorvalidatestatusDataSet.ttblapvendorvalidatestatusRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("VendorValidateStatus - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.VendorValidateStatus(ref pdsContext, ref pdsapvendorvalidatestatus, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("VendorValidateStatus - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapvendorvalidatestatus); 
    
            foreach (DataRow row in pdsapvendorvalidatestatus.ttblapvendorvalidatestatus)
            {
                results.Add(Apvendorvalidatestatus.BuildApvendorvalidatestatusFromRow(row));
            }
            return results;
        
      }

      public Apvendorglfetchresults APVendorGLFetch(Apvendorglfetchcriteria apvendorglfetchcriteria)
      {   
         var result = new Apvendorglfetchresults();
         
         var pdsapvendorglfetch = new pdsapvendorglfetchDataSet();
            
         DataRow ttblapvendorglfetchcriteriaCriteria = pdsapvendorglfetch.ttblapvendorglfetchcriteria.NewttblapvendorglfetchcriteriaRow();
         Apvendorglfetchcriteria.UpdateRowFromApvendorglfetchcriteria(ref ttblapvendorglfetchcriteriaCriteria, apvendorglfetchcriteria);
         pdsapvendorglfetch.ttblapvendorglfetchcriteria.AddttblapvendorglfetchcriteriaRow((pdsapvendorglfetchDataSet.ttblapvendorglfetchcriteriaRow)ttblapvendorglfetchcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APVendorGLFetch - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APVendorGLFetch(ref pdsContext, ref pdsapvendorglfetch, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APVendorGLFetch - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapvendorglfetch); 
    
         if (pdsapvendorglfetch.ttblapvendorglfetchresults.Count > 0) 
         { 
             result = Apvendorglfetchresults.BuildApvendorglfetchresultsFromRow(pdsapvendorglfetch.ttblapvendorglfetchresults[0]);
         } 
              
          
         return result;
          
      }

      public IEnumerable<Apvendorglsave> APVendorGLSave(IEnumerable<Apvendorglsave> apvendorglsave)
      {   
         var results = new List<Apvendorglsave>();
         
         var pdsapvendorglsave = new pdsapvendorglsaveDataSet();
            
         foreach (var obj in apvendorglsave)
         {
             DataRow row = pdsapvendorglsave.ttblapvendorglsave.NewttblapvendorglsaveRow();
             Apvendorglsave.UpdateRowFromApvendorglsave(ref row, obj);
             pdsapvendorglsave.ttblapvendorglsave.AddttblapvendorglsaveRow((pdsapvendorglsaveDataSet.ttblapvendorglsaveRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APVendorGLSave - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APVendorGLSave(ref pdsContext, ref pdsapvendorglsave, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APVendorGLSave - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapvendorglsave); 
    
            foreach (DataRow row in pdsapvendorglsave.ttblapvendorglsave)
            {
                results.Add(Apvendorglsave.BuildApvendorglsaveFromRow(row));
            }
            return results;
        
      }

      public string ValidateGLAccount(string cGLAccount)
      {   
          
         string cErrorMessage = string.Empty;
         string cGLAccountDesc = string.Empty;
   
         
         NLogLoggerP.Trace("ValidateGLAccount - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.ValidateGLAccount(ref pdsContext,  cGLAccount, out cErrorMessage, out cGLAccountDesc);
               }
            });
         NLogLoggerP.Info("ValidateGLAccount - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
          
    
         return cGLAccountDesc;
      
      }

      public void VendorSaveUpateShipFroms(Apsv apsv)
      {   
         
         var pdsapsv = new pdsapsvDataSet();
            
         DataRow ttblapsvCriteria = pdsapsv.ttblapsv.NewttblapsvRow();
         Apsv.UpdateRowFromApsv(ref ttblapsvCriteria, apsv);
         pdsapsv.ttblapsv.AddttblapsvRow((pdsapsvDataSet.ttblapsvRow)ttblapsvCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("VendorSaveUpateShipFroms - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.VendorSaveUpateShipFroms(ref pdsContext, ref pdsapsv, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("VendorSaveUpateShipFroms - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapsv);
      }

      public IEnumerable<Apvendoredidropdowns> APVendorEDIDropDowns()
      {   
         var results = new List<Apvendoredidropdowns>();
         
         var pdsapvendoredidropdowns = new pdsapvendoredidropdownsDataSet();
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APVendorEDIDropDowns - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APVendorEDIDropDowns(ref pdsContext, out pdsapvendoredidropdowns, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APVendorEDIDropDowns - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapvendoredidropdowns); 
    
            foreach (DataRow row in pdsapvendoredidropdowns.ttblapvendoredidropdowns)
            {
                results.Add(Apvendoredidropdowns.BuildApvendoredidropdownsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Apvendorcopy> APVendorCopy(IEnumerable<Apvendorcopy> apvendorcopy)
      {   
         var results = new List<Apvendorcopy>();
         
         var pdsapvendorcopy = new pdsapvendorcopyDataSet();
            
         foreach (var obj in apvendorcopy)
         {
             DataRow row = pdsapvendorcopy.ttblapvendorcopy.NewttblapvendorcopyRow();
             Apvendorcopy.UpdateRowFromApvendorcopy(ref row, obj);
             pdsapvendorcopy.ttblapvendorcopy.AddttblapvendorcopyRow((pdsapvendorcopyDataSet.ttblapvendorcopyRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APVendorCopy - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APVendorCopy(ref pdsContext, ref pdsapvendorcopy, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APVendorCopy - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapvendorcopy); 
    
            foreach (DataRow row in pdsapvendorcopy.ttblapvendorcopy)
            {
                results.Add(Apvendorcopy.BuildApvendorcopyFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Apshipfromcopy> APShipFromCopy(IEnumerable<Apshipfromcopy> apshipfromcopy)
      {   
         var results = new List<Apshipfromcopy>();
         
         var pdsapshipfromcopy = new pdsapshipfromcopyDataSet();
            
         foreach (var obj in apshipfromcopy)
         {
             DataRow row = pdsapshipfromcopy.ttblapshipfromcopy.NewttblapshipfromcopyRow();
             Apshipfromcopy.UpdateRowFromApshipfromcopy(ref row, obj);
             pdsapshipfromcopy.ttblapshipfromcopy.AddttblapshipfromcopyRow((pdsapshipfromcopyDataSet.ttblapshipfromcopyRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APShipFromCopy - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APShipFromCopy(ref pdsContext, ref pdsapshipfromcopy, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APShipFromCopy - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapshipfromcopy); 
    
            foreach (DataRow row in pdsapshipfromcopy.ttblapshipfromcopy)
            {
                results.Add(Apshipfromcopy.BuildApshipfromcopyFromRow(row));
            }
            return results;
        
      }

      public AsapsetupAPEMMBuildTransactionsResponseAPI APEMMBuildTransactions(AsapsetupAPEMMBuildTransactionsRequestAPI AsapsetupAPEMMBuildTransactionsRequestAPI)
      {   
         var result = new AsapsetupAPEMMBuildTransactionsResponseAPI();
         
         var pdsapemmsetup = new pdsapemmsetupDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         string cErrorMessage = string.Empty;
   
         foreach (var obj in AsapsetupAPEMMBuildTransactionsRequestAPI.apemmresults)
         {
            DataRow ttblapemmresultsRow = pdsapemmsetup.ttblapemmresults.NewttblapemmresultsRow();
            Apemmresults.UpdateRowFromApemmresults(ref ttblapemmresultsRow, obj);
            pdsapemmsetup.ttblapemmresults.AddttblapemmresultsRow((pdsapemmsetupDataSet.ttblapemmresultsRow)ttblapemmresultsRow);
         }
          
         DataRow ttblapemmupatecriteriaRow = pdsapemmsetup.ttblapemmupatecriteria.NewttblapemmupatecriteriaRow();
         Apemmupatecriteria.UpdateRowFromApemmupatecriteria(ref ttblapemmupatecriteriaRow, AsapsetupAPEMMBuildTransactionsRequestAPI.apemmupatecriteria);
         pdsapemmsetup.ttblapemmupatecriteria.AddttblapemmupatecriteriaRow((pdsapemmsetupDataSet.ttblapemmupatecriteriaRow)ttblapemmupatecriteriaRow);
          
         DataRow ttblapemmupdatesingleRow = pdsapemmsetup.ttblapemmupdatesingle.NewttblapemmupdatesingleRow();
         Apemmupdatesingle.UpdateRowFromApemmupdatesingle(ref ttblapemmupdatesingleRow, AsapsetupAPEMMBuildTransactionsRequestAPI.apemmupdatesingle);
         pdsapemmsetup.ttblapemmupdatesingle.AddttblapemmupdatesingleRow((pdsapemmsetupDataSet.ttblapemmupdatesingleRow)ttblapemmupdatesingleRow);
          
         var  pvJrnlno = AsapsetupAPEMMBuildTransactionsRequestAPI.pvJrnlno;
            
         
         NLogLoggerP.Trace("APEMMBuildTransactions - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APEMMBuildTransactions(ref pdsContext, ref pdsapemmsetup,  pvJrnlno, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APEMMBuildTransactions - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapemmsetup); 
    
         foreach (DataRow row in pdsapemmsetup.ttblapemmresults)
         {
            result.apemmresults.Add(Apemmresults.BuildApemmresultsFromRow(row));
         }     
         if (pdsapemmsetup.ttblapemmupdatesingle.Count > 0)
         {
            result.apemmupdatesingle = Apemmupdatesingle.BuildApemmupdatesingleFromRow(pdsapemmsetup.ttblapemmupdatesingle[0]);
         }
                    
         foreach (DataRow row in pdsmessaging.ttblmessaging)
         {
            result.messaging.Add(Messaging.BuildMessagingFromRow(row));
         }     
          
         return result;
          
      }

      public AsapsetupAPEMMValidateLoadResponseAPI APEMMValidateLoad(AsapsetupAPEMMValidateLoadRequestAPI AsapsetupAPEMMValidateLoadRequestAPI)
      {   
         var result = new AsapsetupAPEMMValidateLoadResponseAPI();
         
         var pdsapemmsetup = new pdsapemmsetupDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         string cErrorMessage = string.Empty;
   
         foreach (var obj in AsapsetupAPEMMValidateLoadRequestAPI.apemmresults)
         {
            DataRow ttblapemmresultsRow = pdsapemmsetup.ttblapemmresults.NewttblapemmresultsRow();
            Apemmresults.UpdateRowFromApemmresults(ref ttblapemmresultsRow, obj);
            pdsapemmsetup.ttblapemmresults.AddttblapemmresultsRow((pdsapemmsetupDataSet.ttblapemmresultsRow)ttblapemmresultsRow);
         }
          
         DataRow ttblapemmupatecriteriaRow = pdsapemmsetup.ttblapemmupatecriteria.NewttblapemmupatecriteriaRow();
         Apemmupatecriteria.UpdateRowFromApemmupatecriteria(ref ttblapemmupatecriteriaRow, AsapsetupAPEMMValidateLoadRequestAPI.apemmupatecriteria);
         pdsapemmsetup.ttblapemmupatecriteria.AddttblapemmupatecriteriaRow((pdsapemmsetupDataSet.ttblapemmupatecriteriaRow)ttblapemmupatecriteriaRow);
          
         DataRow ttblapemmupdatesingleRow = pdsapemmsetup.ttblapemmupdatesingle.NewttblapemmupdatesingleRow();
         Apemmupdatesingle.UpdateRowFromApemmupdatesingle(ref ttblapemmupdatesingleRow, AsapsetupAPEMMValidateLoadRequestAPI.apemmupdatesingle);
         pdsapemmsetup.ttblapemmupdatesingle.AddttblapemmupdatesingleRow((pdsapemmsetupDataSet.ttblapemmupdatesingleRow)ttblapemmupdatesingleRow);
          
         
         NLogLoggerP.Trace("APEMMValidateLoad - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APEMMValidateLoad(ref pdsContext, ref pdsapemmsetup, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APEMMValidateLoad - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapemmsetup); 
    
         foreach (DataRow row in pdsapemmsetup.ttblapemmresults)
         {
            result.apemmresults.Add(Apemmresults.BuildApemmresultsFromRow(row));
         }     
         if (pdsapemmsetup.ttblapemmupdatesingle.Count > 0)
         {
            result.apemmupdatesingle = Apemmupdatesingle.BuildApemmupdatesingleFromRow(pdsapemmsetup.ttblapemmupdatesingle[0]);
         }
                    
         foreach (DataRow row in pdsmessaging.ttblmessaging)
         {
            result.messaging.Add(Messaging.BuildMessagingFromRow(row));
         }     
          
         return result;
          
      }

      public AsapsetupAPEMMCopyVendorAddressResponseAPI APEMMCopyVendorAddress(AsapsetupAPEMMCopyVendorAddressRequestAPI AsapsetupAPEMMCopyVendorAddressRequestAPI)
      {   
         var result = new AsapsetupAPEMMCopyVendorAddressResponseAPI();
         
         var pdsapemmsetup = new pdsapemmsetupDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         string cErrorMessage = string.Empty;
   
         foreach (var obj in AsapsetupAPEMMCopyVendorAddressRequestAPI.apemmresults)
         {
            DataRow ttblapemmresultsRow = pdsapemmsetup.ttblapemmresults.NewttblapemmresultsRow();
            Apemmresults.UpdateRowFromApemmresults(ref ttblapemmresultsRow, obj);
            pdsapemmsetup.ttblapemmresults.AddttblapemmresultsRow((pdsapemmsetupDataSet.ttblapemmresultsRow)ttblapemmresultsRow);
         }
          
         DataRow ttblapemmupatecriteriaRow = pdsapemmsetup.ttblapemmupatecriteria.NewttblapemmupatecriteriaRow();
         Apemmupatecriteria.UpdateRowFromApemmupatecriteria(ref ttblapemmupatecriteriaRow, AsapsetupAPEMMCopyVendorAddressRequestAPI.apemmupatecriteria);
         pdsapemmsetup.ttblapemmupatecriteria.AddttblapemmupatecriteriaRow((pdsapemmsetupDataSet.ttblapemmupatecriteriaRow)ttblapemmupatecriteriaRow);
          
         DataRow ttblapemmupdatesingleRow = pdsapemmsetup.ttblapemmupdatesingle.NewttblapemmupdatesingleRow();
         Apemmupdatesingle.UpdateRowFromApemmupdatesingle(ref ttblapemmupdatesingleRow, AsapsetupAPEMMCopyVendorAddressRequestAPI.apemmupdatesingle);
         pdsapemmsetup.ttblapemmupdatesingle.AddttblapemmupdatesingleRow((pdsapemmsetupDataSet.ttblapemmupdatesingleRow)ttblapemmupdatesingleRow);
          
         
         NLogLoggerP.Trace("APEMMCopyVendorAddress - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APEMMCopyVendorAddress(ref pdsContext, ref pdsapemmsetup, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APEMMCopyVendorAddress - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapemmsetup); 
    
         foreach (DataRow row in pdsapemmsetup.ttblapemmresults)
         {
            result.apemmresults.Add(Apemmresults.BuildApemmresultsFromRow(row));
         }     
         if (pdsapemmsetup.ttblapemmupdatesingle.Count > 0)
         {
            result.apemmupdatesingle = Apemmupdatesingle.BuildApemmupdatesingleFromRow(pdsapemmsetup.ttblapemmupdatesingle[0]);
         }
                    
         foreach (DataRow row in pdsmessaging.ttblmessaging)
         {
            result.messaging.Add(Messaging.BuildMessagingFromRow(row));
         }     
          
         return result;
          
      }

      public Apspcopy APSPCopy(Apspcopy apspcopy)
      {   
         var result = new Apspcopy();
         
         var pdsapspcopy = new pdsapspcopyDataSet();
            
         DataRow ttblapspcopyCriteria = pdsapspcopy.ttblapspcopy.NewttblapspcopyRow();
         Apspcopy.UpdateRowFromApspcopy(ref ttblapspcopyCriteria, apspcopy);
         pdsapspcopy.ttblapspcopy.AddttblapspcopyRow((pdsapspcopyDataSet.ttblapspcopyRow)ttblapspcopyCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APSPCopy - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APSPCopy(ref pdsContext, ref pdsapspcopy, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APSPCopy - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapspcopy); 
    
         if (pdsapspcopy.ttblapspcopy.Count > 0) 
         { 
             result = Apspcopy.BuildApspcopyFromRow(pdsapspcopy.ttblapspcopy[0]);
         } 
              
          
         return result;
          
      }

      public Apsplabelresults APSPLabel(Apsplabelcriteria apsplabelcriteria)
      {   
         var result = new Apsplabelresults();
         
         var pdsapsplabel = new pdsapsplabelDataSet();
            
         DataRow ttblapsplabelcriteriaCriteria = pdsapsplabel.ttblapsplabelcriteria.NewttblapsplabelcriteriaRow();
         Apsplabelcriteria.UpdateRowFromApsplabelcriteria(ref ttblapsplabelcriteriaCriteria, apsplabelcriteria);
         pdsapsplabel.ttblapsplabelcriteria.AddttblapsplabelcriteriaRow((pdsapsplabelDataSet.ttblapsplabelcriteriaRow)ttblapsplabelcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APSPLabel - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APSPLabel(ref pdsContext, ref pdsapsplabel, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APSPLabel - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapsplabel); 
    
         if (pdsapsplabel.ttblapsplabelresults.Count > 0) 
         { 
             result = Apsplabelresults.BuildApsplabelresultsFromRow(pdsapsplabel.ttblapsplabelresults[0]);
         } 
              
          
         return result;
          
      }

      public AsapsetupAPEMTRetrieveResponseAPI APEMTRetrieve(Apemtcriteria apemtcriteria)
      {   
         var result = new AsapsetupAPEMTRetrieveResponseAPI();
         
         var pdsapemt = new pdsapemtDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         DataRow ttblapemtcriteriaCriteria = pdsapemt.ttblapemtcriteria.NewttblapemtcriteriaRow();
         Apemtcriteria.UpdateRowFromApemtcriteria(ref ttblapemtcriteriaCriteria, apemtcriteria);
         pdsapemt.ttblapemtcriteria.AddttblapemtcriteriaRow((pdsapemtDataSet.ttblapemtcriteriaRow)ttblapemtcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APEMTRetrieve - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APEMTRetrieve(ref pdsContext, ref pdsapemt, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APEMTRetrieve - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapemt); 
    
         foreach (DataRow row in pdsapemt.ttblapemtresults)
         {
            result.apemtresults.Add(Apemtresults.BuildApemtresultsFromRow(row));
         }     
         foreach (DataRow row in pdsmessaging.ttblmessaging)
         {
            result.messaging.Add(Messaging.BuildMessagingFromRow(row));
         }     
          
         return result;
          
      }

      public IEnumerable<Apsdgetlistresults> APSDGetList(Apsdgetlistcriteria apsdgetlistcriteria)
      {   
         var results = new List<Apsdgetlistresults>();
         
         var pdsapsdgetlist = new pdsapsdgetlistDataSet();
            
         DataRow ttblapsdgetlistcriteriaCriteria = pdsapsdgetlist.ttblapsdgetlistcriteria.NewttblapsdgetlistcriteriaRow();
         Apsdgetlistcriteria.UpdateRowFromApsdgetlistcriteria(ref ttblapsdgetlistcriteriaCriteria, apsdgetlistcriteria);
         pdsapsdgetlist.ttblapsdgetlistcriteria.AddttblapsdgetlistcriteriaRow((pdsapsdgetlistDataSet.ttblapsdgetlistcriteriaRow)ttblapsdgetlistcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APSDGetList - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APSDGetList(ref pdsContext, ref pdsapsdgetlist, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APSDGetList - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapsdgetlist); 
    
            foreach (DataRow row in pdsapsdgetlist.ttblapsdgetlistresults)
            {
                results.Add(Apsdgetlistresults.BuildApsdgetlistresultsFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Messaging> VendorSaveUpdateWarnings(Apsv apsv)
      {   
         var results = new List<Messaging>();
         
         var pdsapsv = new pdsapsvDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         DataRow ttblapsvCriteria = pdsapsv.ttblapsv.NewttblapsvRow();
         Apsv.UpdateRowFromApsv(ref ttblapsvCriteria, apsv);
         pdsapsv.ttblapsv.AddttblapsvRow((pdsapsvDataSet.ttblapsvRow)ttblapsvCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("VendorSaveUpdateWarnings - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.VendorSaveUpdateWarnings(ref pdsContext,  pdsapsv, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("VendorSaveUpdateWarnings - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapsv); 
    
            foreach (DataRow row in pdsmessaging.ttblmessaging)
            {
                results.Add(Messaging.BuildMessagingFromRow(row));
            }
            return results;
        
      }

      public IEnumerable<Messaging> APShipFromValidateDelete(IEnumerable<Apshipfromvalidatedelete> apshipfromvalidatedelete)
      {   
         var results = new List<Messaging>();
         
         var pdsapshipfromvalidatedelete = new pdsapshipfromvalidatedeleteDataSet();
            
         var pdsmessaging = new pdsmessagingDataSet();
            
         foreach (var obj in apshipfromvalidatedelete)
         {
             DataRow row = pdsapshipfromvalidatedelete.ttblapshipfromvalidatedelete.NewttblapshipfromvalidatedeleteRow();
             Apshipfromvalidatedelete.UpdateRowFromApshipfromvalidatedelete(ref row, obj);
             pdsapshipfromvalidatedelete.ttblapshipfromvalidatedelete.AddttblapshipfromvalidatedeleteRow((pdsapshipfromvalidatedeleteDataSet.ttblapshipfromvalidatedeleteRow)row);
         }
        
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APShipFromValidateDelete - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APShipFromValidateDelete(ref pdsContext,  pdsapshipfromvalidatedelete, out pdsmessaging, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APShipFromValidateDelete - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapshipfromvalidatedelete); 
    
            foreach (DataRow row in pdsmessaging.ttblmessaging)
            {
                results.Add(Messaging.BuildMessagingFromRow(row));
            }
            return results;
        
      }

      public Apsvaddtoken APSVAddToken(decimal pvVendno)
      {   
         var result = new Apsvaddtoken();
         
         var pdsapsvaddtoken = new pdsapsvaddtokenDataSet();
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APSVAddToken - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APSVAddToken(ref pdsContext,  pvVendno, out pdsapsvaddtoken, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APSVAddToken - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapsvaddtoken); 
    
         if (pdsapsvaddtoken.ttblapsvaddtoken.Count > 0) 
         { 
             result = Apsvaddtoken.BuildApsvaddtokenFromRow(pdsapsvaddtoken.ttblapsvaddtoken[0]);
         } 
              
          
         return result;
          
      }

      public Apsvaddtoken APSVDeleteToken(decimal pvVendno)
      {   
         var result = new Apsvaddtoken();
         
         var pdsapsvaddtoken = new pdsapsvaddtokenDataSet();
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APSVDeleteToken - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APSVDeleteToken(ref pdsContext,  pvVendno, out pdsapsvaddtoken, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APSVDeleteToken - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapsvaddtoken); 
    
         if (pdsapsvaddtoken.ttblapsvaddtoken.Count > 0) 
         { 
             result = Apsvaddtoken.BuildApsvaddtokenFromRow(pdsapsvaddtoken.ttblapsvaddtoken[0]);
         } 
              
          
         return result;
          
      }

      public Apsvaddtoken APSVUnscrambleAcct(Apsvaddtoken apsvaddtoken)
      {   
         var result = new Apsvaddtoken();
         
         var pdsapsvaddtoken = new pdsapsvaddtokenDataSet();
            
         DataRow ttblapsvaddtokenCriteria = pdsapsvaddtoken.ttblapsvaddtoken.NewttblapsvaddtokenRow();
         Apsvaddtoken.UpdateRowFromApsvaddtoken(ref ttblapsvaddtokenCriteria, apsvaddtoken);
         pdsapsvaddtoken.ttblapsvaddtoken.AddttblapsvaddtokenRow((pdsapsvaddtokenDataSet.ttblapsvaddtokenRow)ttblapsvaddtokenCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("APSVUnscrambleAcct - Asapsetup - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAsapsetupproxy = this.proxyAppObject.CreatePO_asapsetupproxy())
               {
                   this.SetRequiredContextParameters();
                   poAsapsetupproxy.APSVUnscrambleAcct(ref pdsContext, ref pdsapsvaddtoken, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("APSVUnscrambleAcct - Asapsetup - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsapsvaddtoken); 
    
         if (pdsapsvaddtoken.ttblapsvaddtoken.Count > 0) 
         { 
             result = Apsvaddtoken.BuildApsvaddtokenFromRow(pdsapsvaddtoken.ttblapsvaddtoken[0]);
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
  