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
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.RS.Data.Repositories
{
   using Infor.Sxe.RS.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsrsaacriteria;
   using Models.Pdsrsaaactivity;
   using Models.Pdsprintersettings;
   using Models.Pdsrsaasystemload;
   using Models.Pdsrsaddetail;
   using Models.Pdsrsasstatus;
   using Models.Pdsrsasdetail;
   using Models.Pdsrssjcriteria;
   using Models.Pdsrssjcomponentscontrol;
   using Models.Pdsrssjcomponents;
   using Models.Pdsrssjcopyresults;
   using Models.Pdsrssjjobgroup;
   using Models.Pdsrssjlookupcriteria;
   using Models.Pdsrssjlookupresults;
   using Models.Pdsrssqcopyresults;
   using Models.Pdsrssqqueue;
   using Models.Pdsrssqcriteria;
   using Models.Pdssapbdatetime;
   using Models.Pdssapjjobdetail;
   using Models.Complex;

   public partial class AsrssetupRepository : RepositoryBase
   {
      private AsrssetupAdapter adapter;
  
      public AsrssetupRepository(IProgressConnection connection)
      {
         this.adapter = new AsrssetupAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Rsaacriteria RSAAInitiate(Rsaacriteria rsaacriteria)
      {
         return this.adapter.RSAAInitiate(rsaacriteria);
      }
  
      public Rsaacriteria RSAACriteriaClearReset(AsrssetupRSAACriteriaClearResetRequestAPI AsrssetupRSAACriteriaClearResetRequestAPI)
      {
         return this.adapter.RSAACriteriaClearReset(AsrssetupRSAACriteriaClearResetRequestAPI);
      }
  
      public Rsaacriteria RSAACriteriaFieldChange(AsrssetupRSAACriteriaFieldChangeRequestAPI AsrssetupRSAACriteriaFieldChangeRequestAPI)
      {
         return this.adapter.RSAACriteriaFieldChange(AsrssetupRSAACriteriaFieldChangeRequestAPI);
      }
  
      public AsrssetupRSAAActivityLoadResponseAPI RSAAActivityLoad(Rsaacriteria rsaacriteria)
      {
         return this.adapter.RSAAActivityLoad(rsaacriteria);
      }
  
      public IEnumerable<Rsaaactivity> RSAAActivitySimpleRequests(AsrssetupRSAAActivitySimpleRequestsRequestAPI AsrssetupRSAAActivitySimpleRequestsRequestAPI)
      {
         return this.adapter.RSAAActivitySimpleRequests(AsrssetupRSAAActivitySimpleRequestsRequestAPI);
      }
  
      public IEnumerable<Rsaaactivity> RSAAChangeSelectedPrinters(AsrssetupRSAAChangeSelectedPrintersRequestAPI AsrssetupRSAAChangeSelectedPrintersRequestAPI)
      {
         return this.adapter.RSAAChangeSelectedPrinters(AsrssetupRSAAChangeSelectedPrintersRequestAPI);
      }
  
      public void RSAASendLog(string cQueueNm)
      {
         this.adapter.RSAASendLog(cQueueNm);
      }
  
      public AsrssetupRSAASystemLoadResponseAPI RSAASystemLoad(int iTimeZoneClient)
      {
         return this.adapter.RSAASystemLoad(iTimeZoneClient);
      }
  
      public IEnumerable<Rsaddetail> RSADLoad(AsrssetupRSADLoadRequestAPI AsrssetupRSADLoadRequestAPI)
      {
         return this.adapter.RSADLoad(AsrssetupRSADLoadRequestAPI);
      }
  
      public AsrssetupRSASLoadResponseAPI RSASLoad(Rsasstatus rsasstatus)
      {
         return this.adapter.RSASLoad(rsasstatus);
      }
  
      public Rsasstatus RSASStartStop(AsrssetupRSASStartStopRequestAPI AsrssetupRSASStartStopRequestAPI)
      {
         return this.adapter.RSASStartStop(AsrssetupRSASStartStopRequestAPI);
      }
  
      public void RSASStopJobs(IEnumerable<Rsasdetail> rsasdetail)
      {
         this.adapter.RSASStopJobs(rsasdetail);
      }
  
      public Rssjcriteria RSSJCriteriaActions(AsrssetupRSSJCriteriaActionsRequestAPI AsrssetupRSSJCriteriaActionsRequestAPI)
      {
         return this.adapter.RSSJCriteriaActions(AsrssetupRSSJCriteriaActionsRequestAPI);
      }
  
      public AsrssetupRSSJComponentsAddChangeResponseAPI RSSJComponentsAddChange(AsrssetupRSSJComponentsAddChangeRequestAPI AsrssetupRSSJComponentsAddChangeRequestAPI)
      {
         return this.adapter.RSSJComponentsAddChange(AsrssetupRSSJComponentsAddChangeRequestAPI);
      }
  
      public void RSSJComponentsDelete(IEnumerable<Rssjcomponents> rssjcomponents)
      {
         this.adapter.RSSJComponentsDelete(rssjcomponents);
      }
  
      public Rssjcomponents RSSJComponentsFieldChange(AsrssetupRSSJComponentsFieldChangeRequestAPI AsrssetupRSSJComponentsFieldChangeRequestAPI)
      {
         return this.adapter.RSSJComponentsFieldChange(AsrssetupRSSJComponentsFieldChangeRequestAPI);
      }
  
      public IEnumerable<Rssjcomponents> RSSJComponentsLoad(Rssjcomponentscontrol rssjcomponentscontrol)
      {
         return this.adapter.RSSJComponentsLoad(rssjcomponentscontrol);
      }
  
      public void RSSJComponentsReposition(string cGroupnm)
      {
         this.adapter.RSSJComponentsReposition(cGroupnm);
      }
  
      public AsrssetupRSSJCopyRecordResponseAPI RSSJCopyRecord(string cOrigGroup, string cNewGroup, string cNewDesc)
      {
         return this.adapter.RSSJCopyRecord(cOrigGroup, cNewGroup, cNewDesc);
      }
  
      public AsrssetupRSSJInitiateResponseAPI RSSJInitiate(Rssjcriteria rssjcriteria)
      {
         return this.adapter.RSSJInitiate(rssjcriteria);
      }
  
      public Rssjjobgroup RSSJJobGroupDetail(Rssjcriteria rssjcriteria)
      {
         return this.adapter.RSSJJobGroupDetail(rssjcriteria);
      }
  
      public AsrssetupRSSJJobGroupFieldChangeResponseAPI RSSJJobGroupFieldChange(AsrssetupRSSJJobGroupFieldChangeRequestAPI AsrssetupRSSJJobGroupFieldChangeRequestAPI)
      {
         return this.adapter.RSSJJobGroupFieldChange(AsrssetupRSSJJobGroupFieldChangeRequestAPI);
      }
  
      public IEnumerable<Rssjjobgroup> RSSJJobGroupLoad(Rssjcriteria rssjcriteria)
      {
         return this.adapter.RSSJJobGroupLoad(rssjcriteria);
      }
  
      public IEnumerable<Rssjjobgroup> RSSJJobGroupSimpleRequests(AsrssetupRSSJJobGroupSimpleRequestsRequestAPI AsrssetupRSSJJobGroupSimpleRequestsRequestAPI)
      {
         return this.adapter.RSSJJobGroupSimpleRequests(AsrssetupRSSJJobGroupSimpleRequestsRequestAPI);
      }
  
      public Rssjjobgroup RSSJJobGroupUpdate(AsrssetupRSSJJobGroupUpdateRequestAPI AsrssetupRSSJJobGroupUpdateRequestAPI)
      {
         return this.adapter.RSSJJobGroupUpdate(AsrssetupRSSJJobGroupUpdateRequestAPI);
      }
  
      public IEnumerable<Rssjlookupresults> RSSJLookupLoad(Rssjlookupcriteria rssjlookupcriteria)
      {
         return this.adapter.RSSJLookupLoad(rssjlookupcriteria);
      }
  
      public Rssjlookupcriteria RSSJLookupProcess(AsrssetupRSSJLookupProcessRequestAPI AsrssetupRSSJLookupProcessRequestAPI)
      {
         return this.adapter.RSSJLookupProcess(AsrssetupRSSJLookupProcessRequestAPI);
      }
  
      public AsrssetupRSSQCopyRecordResponseAPI RSSQCopyRecord(AsrssetupRSSQCopyRecordRequestAPI AsrssetupRSSQCopyRecordRequestAPI)
      {
         return this.adapter.RSSQCopyRecord(AsrssetupRSSQCopyRecordRequestAPI);
      }
  
      public AsrssetupRSSQQueueFieldChangeResponseAPI RSSQQueueFieldChange(AsrssetupRSSQQueueFieldChangeRequestAPI AsrssetupRSSQQueueFieldChangeRequestAPI)
      {
         return this.adapter.RSSQQueueFieldChange(AsrssetupRSSQQueueFieldChangeRequestAPI);
      }
  
      public IEnumerable<Rssqqueue> RSSQQueueLoad(Rssqcriteria rssqcriteria)
      {
         return this.adapter.RSSQQueueLoad(rssqcriteria);
      }
  
      public IEnumerable<Rssqqueue> RSSQQueueSimpleRequests(AsrssetupRSSQQueueSimpleRequestsRequestAPI AsrssetupRSSQQueueSimpleRequestsRequestAPI)
      {
         return this.adapter.RSSQQueueSimpleRequests(AsrssetupRSSQQueueSimpleRequestsRequestAPI);
      }
  
      public Rssqcriteria RSSQQueueUpdate(AsrssetupRSSQQueueUpdateRequestAPI AsrssetupRSSQQueueUpdateRequestAPI)
      {
         return this.adapter.RSSQQueueUpdate(AsrssetupRSSQQueueUpdateRequestAPI);
      }
  
      public Sapbdatetime SAPBDateTimeFieldChange(AsrssetupSAPBDateTimeFieldChangeRequestAPI AsrssetupSAPBDateTimeFieldChangeRequestAPI)
      {
         return this.adapter.SAPBDateTimeFieldChange(AsrssetupSAPBDateTimeFieldChangeRequestAPI);
      }
  
      public Sapbdatetime SAPBDateTimeProcess(AsrssetupSAPBDateTimeProcessRequestAPI AsrssetupSAPBDateTimeProcessRequestAPI)
      {
         return this.adapter.SAPBDateTimeProcess(AsrssetupSAPBDateTimeProcessRequestAPI);
      }
  
      public AsrssetupSAPJJobDetailResponseAPI SAPJJobDetail(string cReportNm)
      {
         return this.adapter.SAPJJobDetail(cReportNm);
      }
  
      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }
         this.adapter?.Dispose();	
         this.adapter = null;
         base.Dispose(true);
      }
   }
}
#pragma warning restore 1591
  