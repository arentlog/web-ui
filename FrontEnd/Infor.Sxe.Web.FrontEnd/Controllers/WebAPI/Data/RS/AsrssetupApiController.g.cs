//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 7622 $
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
using System.Web.Http;
using ServiceInterfaceClient.BaseClasses;
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.RS
{  
   using Sxe.RS.Data.Models.PdsContext;
   using Sxe.RS.Data.Models.Pdsrsaacriteria;
   using Sxe.RS.Data.Models.Pdsrsaaactivity;
   using Sxe.RS.Data.Models.Pdsprintersettings;
   using Sxe.RS.Data.Models.Pdsrsaasystemload;
   using Sxe.RS.Data.Models.Pdsrsaddetail;
   using Sxe.RS.Data.Models.Pdsrsasstatus;
   using Sxe.RS.Data.Models.Pdsrsasdetail;
   using Sxe.RS.Data.Models.Pdsrssjcriteria;
   using Sxe.RS.Data.Models.Pdsrssjcomponentscontrol;
   using Sxe.RS.Data.Models.Pdsrssjcomponents;
   using Sxe.RS.Data.Models.Pdsrssjcopyresults;
   using Sxe.RS.Data.Models.Pdsrssjjobgroup;
   using Sxe.RS.Data.Models.Pdsrssjlookupcriteria;
   using Sxe.RS.Data.Models.Pdsrssjlookupresults;
   using Sxe.RS.Data.Models.Pdsrssqcopyresults;
   using Sxe.RS.Data.Models.Pdsrssqqueue;
   using Sxe.RS.Data.Models.Pdsrssqcriteria;
   using Sxe.RS.Data.Models.Pdssapbdatetime;
   using Sxe.RS.Data.Models.Pdssapjjobdetail;
   using Sxe.RS.Data.Models.Complex;
   using Sxe.RS.Data.Repositories;
    
   [RoutePrefix("api/rs/asrssetup")]
   public partial class AsrssetupApiController : ApiControllerBase
   {
      private readonly AsrssetupRepository repository;
    
      public AsrssetupApiController(AsrssetupRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("rsaainitiate")]
      [HttpPost]
      public Rsaacriteria RSAAInitiate(Rsaacriteria rsaacriteria)
      {
         return this.repository.RSAAInitiate(rsaacriteria);
      } 
  
      
      [Route("rsaacriteriaclearreset")]
      [HttpPost]
      public Rsaacriteria RSAACriteriaClearReset(AsrssetupRSAACriteriaClearResetRequestAPI AsrssetupRSAACriteriaClearResetRequestAPI)
      {
         return this.repository.RSAACriteriaClearReset(AsrssetupRSAACriteriaClearResetRequestAPI);
      } 
  
      
      [Route("rsaacriteriafieldchange")]
      [HttpPost]
      public Rsaacriteria RSAACriteriaFieldChange(AsrssetupRSAACriteriaFieldChangeRequestAPI AsrssetupRSAACriteriaFieldChangeRequestAPI)
      {
         return this.repository.RSAACriteriaFieldChange(AsrssetupRSAACriteriaFieldChangeRequestAPI);
      } 
  
      
      [Route("rsaaactivityload")]
      [HttpPost]
      public AsrssetupRSAAActivityLoadResponseAPI RSAAActivityLoad(Rsaacriteria rsaacriteria)
      {
         return this.repository.RSAAActivityLoad(rsaacriteria);
      } 
  
      
      [Route("rsaaactivitysimplerequests")]
      [HttpPost]
      public IEnumerable<Rsaaactivity> RSAAActivitySimpleRequests(AsrssetupRSAAActivitySimpleRequestsRequestAPI AsrssetupRSAAActivitySimpleRequestsRequestAPI)
      {
         return this.repository.RSAAActivitySimpleRequests(AsrssetupRSAAActivitySimpleRequestsRequestAPI);
      } 
  
      
      [Route("rsaachangeselectedprinters")]
      [HttpPost]
      public IEnumerable<Rsaaactivity> RSAAChangeSelectedPrinters(AsrssetupRSAAChangeSelectedPrintersRequestAPI AsrssetupRSAAChangeSelectedPrintersRequestAPI)
      {
         return this.repository.RSAAChangeSelectedPrinters(AsrssetupRSAAChangeSelectedPrintersRequestAPI);
      } 
  
      
      [Route("rsaasendlog/{cQueueNm}")]
      [HttpGet]
      public void RSAASendLog(string cQueueNm)
      {
         this.repository.RSAASendLog(cQueueNm);
      } 
  
      
      [Route("rsaasystemload/{iTimeZoneClient:int}")]
      [HttpGet]
      public AsrssetupRSAASystemLoadResponseAPI RSAASystemLoad(int iTimeZoneClient)
      {
         return this.repository.RSAASystemLoad(iTimeZoneClient);
      } 
  
      
      [Route("rsadload")]
      [HttpPost]
      public IEnumerable<Rsaddetail> RSADLoad(AsrssetupRSADLoadRequestAPI AsrssetupRSADLoadRequestAPI)
      {
         return this.repository.RSADLoad(AsrssetupRSADLoadRequestAPI);
      } 
  
      
      [Route("rsasload")]
      [HttpPost]
      public AsrssetupRSASLoadResponseAPI RSASLoad(Rsasstatus rsasstatus)
      {
         return this.repository.RSASLoad(rsasstatus);
      } 
  
      
      [Route("rsasstartstop")]
      [HttpPost]
      public Rsasstatus RSASStartStop(AsrssetupRSASStartStopRequestAPI AsrssetupRSASStartStopRequestAPI)
      {
         return this.repository.RSASStartStop(AsrssetupRSASStartStopRequestAPI);
      } 
  
      
      [Route("rsasstopjobs")]
      [HttpPost]
      public void RSASStopJobs(IEnumerable<Rsasdetail> rsasdetail)
      {
         this.repository.RSASStopJobs(rsasdetail);
      } 
  
      
      [Route("rssjcriteriaactions")]
      [HttpPost]
      public Rssjcriteria RSSJCriteriaActions(AsrssetupRSSJCriteriaActionsRequestAPI AsrssetupRSSJCriteriaActionsRequestAPI)
      {
         return this.repository.RSSJCriteriaActions(AsrssetupRSSJCriteriaActionsRequestAPI);
      } 
  
      
      [Route("rssjcomponentsaddchange")]
      [HttpPost]
      public AsrssetupRSSJComponentsAddChangeResponseAPI RSSJComponentsAddChange(AsrssetupRSSJComponentsAddChangeRequestAPI AsrssetupRSSJComponentsAddChangeRequestAPI)
      {
         return this.repository.RSSJComponentsAddChange(AsrssetupRSSJComponentsAddChangeRequestAPI);
      } 
  
      
      [Route("rssjcomponentsdelete")]
      [HttpPost]
      public void RSSJComponentsDelete(IEnumerable<Rssjcomponents> rssjcomponents)
      {
         this.repository.RSSJComponentsDelete(rssjcomponents);
      } 
  
      
      [Route("rssjcomponentsfieldchange")]
      [HttpPost]
      public Rssjcomponents RSSJComponentsFieldChange(AsrssetupRSSJComponentsFieldChangeRequestAPI AsrssetupRSSJComponentsFieldChangeRequestAPI)
      {
         return this.repository.RSSJComponentsFieldChange(AsrssetupRSSJComponentsFieldChangeRequestAPI);
      } 
  
      
      [Route("rssjcomponentsload")]
      [HttpPost]
      public IEnumerable<Rssjcomponents> RSSJComponentsLoad(Rssjcomponentscontrol rssjcomponentscontrol)
      {
         return this.repository.RSSJComponentsLoad(rssjcomponentscontrol);
      } 
  
      
      [Route("rssjcomponentsreposition/{cGroupnm}")]
      [HttpGet]
      public void RSSJComponentsReposition(string cGroupnm)
      {
         this.repository.RSSJComponentsReposition(cGroupnm);
      } 
  
      
      [Route("rssjcopyrecord/{cOrigGroup}/{cNewGroup}/{cNewDesc}")]
      [HttpGet]
      public AsrssetupRSSJCopyRecordResponseAPI RSSJCopyRecord(string cOrigGroup, string cNewGroup, string cNewDesc)
      {
         return this.repository.RSSJCopyRecord(cOrigGroup, cNewGroup, cNewDesc);
      } 
  
      
      [Route("rssjinitiate")]
      [HttpPost]
      public AsrssetupRSSJInitiateResponseAPI RSSJInitiate(Rssjcriteria rssjcriteria)
      {
         return this.repository.RSSJInitiate(rssjcriteria);
      } 
  
      
      [Route("rssjjobgroupdetail")]
      [HttpPost]
      public Rssjjobgroup RSSJJobGroupDetail(Rssjcriteria rssjcriteria)
      {
         return this.repository.RSSJJobGroupDetail(rssjcriteria);
      } 
  
      
      [Route("rssjjobgroupfieldchange")]
      [HttpPost]
      public AsrssetupRSSJJobGroupFieldChangeResponseAPI RSSJJobGroupFieldChange(AsrssetupRSSJJobGroupFieldChangeRequestAPI AsrssetupRSSJJobGroupFieldChangeRequestAPI)
      {
         return this.repository.RSSJJobGroupFieldChange(AsrssetupRSSJJobGroupFieldChangeRequestAPI);
      } 
  
      
      [Route("rssjjobgroupload")]
      [HttpPost]
      public IEnumerable<Rssjjobgroup> RSSJJobGroupLoad(Rssjcriteria rssjcriteria)
      {
         return this.repository.RSSJJobGroupLoad(rssjcriteria);
      } 
  
      
      [Route("rssjjobgroupsimplerequests")]
      [HttpPost]
      public IEnumerable<Rssjjobgroup> RSSJJobGroupSimpleRequests(AsrssetupRSSJJobGroupSimpleRequestsRequestAPI AsrssetupRSSJJobGroupSimpleRequestsRequestAPI)
      {
         return this.repository.RSSJJobGroupSimpleRequests(AsrssetupRSSJJobGroupSimpleRequestsRequestAPI);
      } 
  
      
      [Route("rssjjobgroupupdate")]
      [HttpPost]
      public Rssjjobgroup RSSJJobGroupUpdate(AsrssetupRSSJJobGroupUpdateRequestAPI AsrssetupRSSJJobGroupUpdateRequestAPI)
      {
         return this.repository.RSSJJobGroupUpdate(AsrssetupRSSJJobGroupUpdateRequestAPI);
      } 
  
      
      [Route("rssjlookupload")]
      [HttpPost]
      public IEnumerable<Rssjlookupresults> RSSJLookupLoad(Rssjlookupcriteria rssjlookupcriteria)
      {
         return this.repository.RSSJLookupLoad(rssjlookupcriteria);
      } 
  
      
      [Route("rssjlookupprocess")]
      [HttpPost]
      public Rssjlookupcriteria RSSJLookupProcess(AsrssetupRSSJLookupProcessRequestAPI AsrssetupRSSJLookupProcessRequestAPI)
      {
         return this.repository.RSSJLookupProcess(AsrssetupRSSJLookupProcessRequestAPI);
      } 
  
      
      [Route("rssqcopyrecord")]
      [HttpPost]
      public AsrssetupRSSQCopyRecordResponseAPI RSSQCopyRecord(AsrssetupRSSQCopyRecordRequestAPI AsrssetupRSSQCopyRecordRequestAPI)
      {
         return this.repository.RSSQCopyRecord(AsrssetupRSSQCopyRecordRequestAPI);
      } 
  
      
      [Route("rssqqueuefieldchange")]
      [HttpPost]
      public AsrssetupRSSQQueueFieldChangeResponseAPI RSSQQueueFieldChange(AsrssetupRSSQQueueFieldChangeRequestAPI AsrssetupRSSQQueueFieldChangeRequestAPI)
      {
         return this.repository.RSSQQueueFieldChange(AsrssetupRSSQQueueFieldChangeRequestAPI);
      } 
  
      
      [Route("rssqqueueload")]
      [HttpPost]
      public IEnumerable<Rssqqueue> RSSQQueueLoad(Rssqcriteria rssqcriteria)
      {
         return this.repository.RSSQQueueLoad(rssqcriteria);
      } 
  
      
      [Route("rssqqueuesimplerequests")]
      [HttpPost]
      public IEnumerable<Rssqqueue> RSSQQueueSimpleRequests(AsrssetupRSSQQueueSimpleRequestsRequestAPI AsrssetupRSSQQueueSimpleRequestsRequestAPI)
      {
         return this.repository.RSSQQueueSimpleRequests(AsrssetupRSSQQueueSimpleRequestsRequestAPI);
      } 
  
      
      [Route("rssqqueueupdate")]
      [HttpPost]
      public Rssqcriteria RSSQQueueUpdate(AsrssetupRSSQQueueUpdateRequestAPI AsrssetupRSSQQueueUpdateRequestAPI)
      {
         return this.repository.RSSQQueueUpdate(AsrssetupRSSQQueueUpdateRequestAPI);
      } 
  
      
      [Route("sapbdatetimefieldchange")]
      [HttpPost]
      public Sapbdatetime SAPBDateTimeFieldChange(AsrssetupSAPBDateTimeFieldChangeRequestAPI AsrssetupSAPBDateTimeFieldChangeRequestAPI)
      {
         return this.repository.SAPBDateTimeFieldChange(AsrssetupSAPBDateTimeFieldChangeRequestAPI);
      } 
  
      
      [Route("sapbdatetimeprocess")]
      [HttpPost]
      public Sapbdatetime SAPBDateTimeProcess(AsrssetupSAPBDateTimeProcessRequestAPI AsrssetupSAPBDateTimeProcessRequestAPI)
      {
         return this.repository.SAPBDateTimeProcess(AsrssetupSAPBDateTimeProcessRequestAPI);
      } 
  
      
      [Route("sapjjobdetail/{cReportNm}")]
      [HttpGet]
      public AsrssetupSAPJJobDetailResponseAPI SAPJJobDetail(string cReportNm)
      {
         return this.repository.SAPJJobDetail(cReportNm);
      } 
  
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }   
}
#pragma warning restore 1591
  