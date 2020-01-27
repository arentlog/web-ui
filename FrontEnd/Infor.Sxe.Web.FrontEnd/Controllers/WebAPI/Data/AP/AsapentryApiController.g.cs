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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.AP
{  
   using Sxe.AP.Data.Models.PdsContext;
   using Sxe.AP.Data.Models.Pdsapeiinvdetaddlinfo;
   using Sxe.AP.Data.Models.Pdsapeirowids;
   using Sxe.AP.Data.Models.Pdsapeiinvdetmanpyappinv;
   using Sxe.AP.Data.Models.Pdsapeiinvdetmanpyopninv;
   using Sxe.AP.Data.Models.Pdsapeiinvdetcmappinv;
   using Sxe.AP.Data.Models.Pdsapeiinvdetcmopninv;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpolnaddonslct;
   using Sxe.AP.Data.Models.Pdsapeiinvdetaddonpoaddons;
   using Sxe.AP.Data.Models.Pdsapeiinvdetbanner;
   using Sxe.AP.Data.Models.Pdsapeiinvdettaxes;
   using Sxe.AP.Data.Models.Pdsapeiinvdettaxjur;
   using Sxe.AP.Data.Models.Pdsapeceserial;
   using Sxe.AP.Data.Models.Pdsapeceserialview;
   using Sxe.AP.Data.Models.Pdsapeiinvoicelist;
   using Sxe.AP.Data.Models.Pdsapeiinvdetdropdowns;
   using Sxe.AP.Data.Models.Pdsapeiinvoicedetail;
   using Sxe.AP.Data.Models.Pdsmessaging;
   using Sxe.AP.Data.Models.Pdsapeiinvoicetotals;
   using Sxe.AP.Data.Models.Pdsapeiinvdetgldist;
   using Sxe.AP.Data.Models.Pdsapeiinvdetgldistproof;
   using Sxe.AP.Data.Models.Pdsapeelookup;
   using Sxe.AP.Data.Models.Pdsapeetotlookup;
   using Sxe.AP.Data.Models.Pdsapeemaint;
   using Sxe.AP.Data.Models.Pdsapeesplitpayrowids;
   using Sxe.AP.Data.Models.Pdsapeesplitpay;
   using Sxe.AP.Data.Models.Pdsprintersettings;
   using Sxe.AP.Data.Models.Pdsapemb;
   using Sxe.AP.Data.Models.Pdsapems;
   using Sxe.AP.Data.Models.Pdsapeiinvdetdelete;
   using Sxe.AP.Data.Models.Pdsapeiinvdetfinalupdt;
   using Sxe.AP.Data.Models.Pdsapeiinvdeterrors;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpohdrlist;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpohdr;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpolnproof;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpoln;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpolnlist;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpolntally;
   using Sxe.AP.Data.Models.Pdsapeiinvdetpolnmanadd;
   using Sxe.AP.Data.Models.Pdsapemacredits;
   using Sxe.AP.Data.Models.Pdsapemainvoices;
   using Sxe.AP.Data.Models.Pdsapemaupdate;
   using Sxe.AP.Data.Models.Pdsapeiinvdetaddon;
   using Sxe.AP.Data.Models.Pdsapeiinvdetaddontotals;
   using Sxe.AP.Data.Models.Pdsapeiinvdetterms;
   using Sxe.AP.Data.Models.Pdsapeiinvdettermstotals;
   using Sxe.AP.Data.Models.Pdsapeiinvdettermssplit;
   using Sxe.AP.Data.Models.Pdsapeiinvoicedetailflags;
   using Sxe.AP.Data.Models.Complex;
   using Sxe.AP.Data.Repositories;
    
   [RoutePrefix("api/ap/asapentry")]
   public partial class AsapentryApiController : ApiControllerBase
   {
      private readonly AsapentryRepository repository;
    
      public AsapentryApiController(AsapentryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("apeiinvdetaddlinforetrieve")]
      [HttpPost]
      public Apeiinvdetaddlinfo APEIInvDetAddlInfoRetrieve(AsapentryAPEIInvDetAddlInfoRetrieveRequestAPI AsapentryAPEIInvDetAddlInfoRetrieveRequestAPI)
      {
         return this.repository.APEIInvDetAddlInfoRetrieve(AsapentryAPEIInvDetAddlInfoRetrieveRequestAPI);
      } 
  
      
      [Route("apeiinvdetaddlinfoupdate")]
      [HttpPost]
      public Apeiinvdetaddlinfo APEIInvDetAddlInfoUpdate(Apeiinvdetaddlinfo apeiinvdetaddlinfo)
      {
         return this.repository.APEIInvDetAddlInfoUpdate(apeiinvdetaddlinfo);
      } 
  
      
      [Route("apeiinvdetmanpayappliedinvlist")]
      [HttpPost]
      public AsapentryAPEIInvDetManPayAppliedInvListResponseAPI APEIInvDetManPayAppliedInvList(Apeirowids apeirowids)
      {
         return this.repository.APEIInvDetManPayAppliedInvList(apeirowids);
      } 
  
      
      [Route("apeiinvdetmanpayopeninvlist")]
      [HttpPost]
      public IEnumerable<Apeiinvdetmanpyopninv> APEIInvDetManPayOpenInvList(Apeirowids apeirowids)
      {
         return this.repository.APEIInvDetManPayOpenInvList(apeirowids);
      } 
  
      
      [Route("apeiinvdetmanpayopeninvselect")]
      [HttpPost]
      public bool APEIInvDetManPayOpenInvSelect(AsapentryAPEIInvDetManPayOpenInvSelectRequestAPI AsapentryAPEIInvDetManPayOpenInvSelectRequestAPI)
      {
         return this.repository.APEIInvDetManPayOpenInvSelect(AsapentryAPEIInvDetManPayOpenInvSelectRequestAPI);
      } 
  
      
      [Route("apeiinvdetmanpayappliedinvdelete")]
      [HttpPost]
      public decimal APEIInvDetManPayAppliedInvDelete(AsapentryAPEIInvDetManPayAppliedInvDeleteRequestAPI AsapentryAPEIInvDetManPayAppliedInvDeleteRequestAPI)
      {
         return this.repository.APEIInvDetManPayAppliedInvDelete(AsapentryAPEIInvDetManPayAppliedInvDeleteRequestAPI);
      } 
  
      
      [Route("apeiinvdetmanpayappliedinvinit")]
      [HttpPost]
      public Apeiinvdetmanpyappinv APEIInvDetManPayAppliedInvInit(Apeiinvdetmanpyappinv apeiinvdetmanpyappinv)
      {
         return this.repository.APEIInvDetManPayAppliedInvInit(apeiinvdetmanpyappinv);
      } 
  
      
      [Route("apeiinvdetmanpayappliedaddprep")]
      [HttpPost]
      public Apeiinvdetmanpyappinv APEIInvDetManPayAppliedAddPrep(Apeiinvdetmanpyappinv apeiinvdetmanpyappinv)
      {
         return this.repository.APEIInvDetManPayAppliedAddPrep(apeiinvdetmanpyappinv);
      } 
  
      
      [Route("apeiinvdetmanpayappliedaddupdt")]
      [HttpPost]
      public Apeiinvdetmanpyappinv APEIInvDetManPayAppliedAddUpdt(Apeiinvdetmanpyappinv apeiinvdetmanpyappinv)
      {
         return this.repository.APEIInvDetManPayAppliedAddUpdt(apeiinvdetmanpyappinv);
      } 
  
      
      [Route("apeiinvdetmanpayappliedchgretr")]
      [HttpPost]
      public Apeiinvdetmanpyappinv APEIInvDetManPayAppliedChgRetr(AsapentryAPEIInvDetManPayAppliedChgRetrRequestAPI AsapentryAPEIInvDetManPayAppliedChgRetrRequestAPI)
      {
         return this.repository.APEIInvDetManPayAppliedChgRetr(AsapentryAPEIInvDetManPayAppliedChgRetrRequestAPI);
      } 
  
      
      [Route("apeiinvdetmanpayappliedchgupdt")]
      [HttpPost]
      public Apeiinvdetmanpyappinv APEIInvDetManPayAppliedChgUpdt(Apeiinvdetmanpyappinv apeiinvdetmanpyappinv)
      {
         return this.repository.APEIInvDetManPayAppliedChgUpdt(apeiinvdetmanpyappinv);
      } 
  
      
      [Route("apeiinvdetcreditmemoappliedinvlist")]
      [HttpPost]
      public AsapentryAPEIInvDetCreditMemoAppliedInvListResponseAPI APEIInvDetCreditMemoAppliedInvList(Apeirowids apeirowids)
      {
         return this.repository.APEIInvDetCreditMemoAppliedInvList(apeirowids);
      } 
  
      
      [Route("apeiinvdetcreditmemoopeninvlist")]
      [HttpPost]
      public IEnumerable<Apeiinvdetcmopninv> APEIInvDetCreditMemoOpenInvList(Apeirowids apeirowids)
      {
         return this.repository.APEIInvDetCreditMemoOpenInvList(apeirowids);
      } 
  
      
      [Route("apeiinvdetcreditmemoappliedinvdelete")]
      [HttpPost]
      public decimal APEIInvDetCreditMemoAppliedInvDelete(AsapentryAPEIInvDetCreditMemoAppliedInvDeleteRequestAPI AsapentryAPEIInvDetCreditMemoAppliedInvDeleteRequestAPI)
      {
         return this.repository.APEIInvDetCreditMemoAppliedInvDelete(AsapentryAPEIInvDetCreditMemoAppliedInvDeleteRequestAPI);
      } 
  
      
      [Route("apeiinvdetcreditmemoopeninvselect")]
      [HttpPost]
      public bool APEIInvDetCreditMemoOpenInvSelect(AsapentryAPEIInvDetCreditMemoOpenInvSelectRequestAPI AsapentryAPEIInvDetCreditMemoOpenInvSelectRequestAPI)
      {
         return this.repository.APEIInvDetCreditMemoOpenInvSelect(AsapentryAPEIInvDetCreditMemoOpenInvSelectRequestAPI);
      } 
  
      
      [Route("apeiinvdetcreditmemoappliedinvinit")]
      [HttpPost]
      public Apeiinvdetcmappinv APEIInvDetCreditMemoAppliedInvInit(Apeiinvdetcmappinv apeiinvdetcmappinv)
      {
         return this.repository.APEIInvDetCreditMemoAppliedInvInit(apeiinvdetcmappinv);
      } 
  
      
      [Route("apeiinvdetcreditmemoappliedaddprep")]
      [HttpPost]
      public Apeiinvdetcmappinv APEIInvDetCreditMemoAppliedAddPrep(Apeiinvdetcmappinv apeiinvdetcmappinv)
      {
         return this.repository.APEIInvDetCreditMemoAppliedAddPrep(apeiinvdetcmappinv);
      } 
  
      
      [Route("apeiinvdetcreditmemoappliedaddupdt")]
      [HttpPost]
      public Apeiinvdetcmappinv APEIInvDetCreditMemoAppliedAddUpdt(Apeiinvdetcmappinv apeiinvdetcmappinv)
      {
         return this.repository.APEIInvDetCreditMemoAppliedAddUpdt(apeiinvdetcmappinv);
      } 
  
      
      [Route("apeiinvdetcreditmemoappliedchgretr")]
      [HttpPost]
      public Apeiinvdetcmappinv APEIInvDetCreditMemoAppliedChgRetr(AsapentryAPEIInvDetCreditMemoAppliedChgRetrRequestAPI AsapentryAPEIInvDetCreditMemoAppliedChgRetrRequestAPI)
      {
         return this.repository.APEIInvDetCreditMemoAppliedChgRetr(AsapentryAPEIInvDetCreditMemoAppliedChgRetrRequestAPI);
      } 
  
      
      [Route("apeiinvdetcreditmemoappliedchgupdt")]
      [HttpPost]
      public Apeiinvdetcmappinv APEIInvDetCreditMemoAppliedChgUpdt(Apeiinvdetcmappinv apeiinvdetcmappinv)
      {
         return this.repository.APEIInvDetCreditMemoAppliedChgUpdt(apeiinvdetcmappinv);
      } 
  
      
      [Route("apeiinvdetpolineaddonselect/{iPONo:int}/{iPOSuf:int}")]
      [HttpGet]
      public IEnumerable<Apeiinvdetpolnaddonslct> APEIInvDetPOLineAddonSelect(int iPONo, int iPOSuf)
      {
         return this.repository.APEIInvDetPOLineAddonSelect(iPONo, iPOSuf);
      } 
  
      
      [Route("apeiinvdetaddonpoaddonget/{iPONo:int}/{iPOSuf:int}")]
      [HttpGet]
      public IEnumerable<Apeiinvdetaddonpoaddons> APEIInvDetAddonPOAddonGet(int iPONo, int iPOSuf)
      {
         return this.repository.APEIInvDetAddonPOAddonGet(iPONo, iPOSuf);
      } 
  
      
      [Route("apeiinvdetaddonpoaddonupdt")]
      [HttpPost]
      public void APEIInvDetAddonPOAddonUpdt(AsapentryAPEIInvDetAddonPOAddonUpdtRequestAPI AsapentryAPEIInvDetAddonPOAddonUpdtRequestAPI)
      {
         this.repository.APEIInvDetAddonPOAddonUpdt(AsapentryAPEIInvDetAddonPOAddonUpdtRequestAPI);
      } 
  
      
      [Route("apeiinvdettaxeslist")]
      [HttpPost]
      public AsapentryAPEIInvDetTaxesListResponseAPI APEIInvDetTaxesList(Apeiinvdetbanner apeiinvdetbanner)
      {
         return this.repository.APEIInvDetTaxesList(apeiinvdetbanner);
      } 
  
      
      [Route("apeiinvdettaxesfieldchange")]
      [HttpPost]
      public Apeiinvdettaxes APEIInvDetTaxesFieldChange(AsapentryAPEIInvDetTaxesFieldChangeRequestAPI AsapentryAPEIInvDetTaxesFieldChangeRequestAPI)
      {
         return this.repository.APEIInvDetTaxesFieldChange(AsapentryAPEIInvDetTaxesFieldChangeRequestAPI);
      } 
  
      
      [Route("apeiinvdettaxesupdate")]
      [HttpPost]
      public string APEIInvDetTaxesUpdate(Apeiinvdettaxes apeiinvdettaxes)
      {
         return this.repository.APEIInvDetTaxesUpdate(apeiinvdettaxes);
      } 
  
      
      [Route("apeceserialpopup")]
      [HttpPost]
      public IEnumerable<Apeceserialresult> apeceserialpopup(Apeceserialcriteria apeceserialcriteria)
      {
         return this.repository.apeceserialpopup(apeceserialcriteria);
      } 
  
      
      [Route("apeceserialview")]
      [HttpPost]
      public AsapentryapeceserialviewResponseAPI apeceserialview(Apeceserialviewcriteria apeceserialviewcriteria)
      {
         return this.repository.apeceserialview(apeceserialviewcriteria);
      } 
  
      
      [Route("apeiinvoicelist")]
      [HttpPost]
      public AsapentryAPEIInvoiceListResponseAPI APEIInvoiceList(Apeiinvoicelistcriteria apeiinvoicelistcriteria)
      {
         return this.repository.APEIInvoiceList(apeiinvoicelistcriteria);
      } 
  
      
      [Route("apeiinvdetdropdown")]
      [HttpPost]
      public Apeiinvdetdropdowns APEIInvDetDropDown(Apeiinvdetdropdowns apeiinvdetdropdowns)
      {
         return this.repository.APEIInvDetDropDown(apeiinvdetdropdowns);
      } 
  
      
      [Route("apeiinvdetinitialize")]
      [HttpPost]
      public Apeiinvoicedetail APEIInvDetInitialize(Apeiinvoicedetail apeiinvoicedetail)
      {
         return this.repository.APEIInvDetInitialize(apeiinvoicedetail);
      } 
  
      
      [Route("apeiinvdetaddprepare")]
      [HttpPost]
      public Apeiinvoicedetail APEIInvDetAddPrepare(Apeiinvoicedetail apeiinvoicedetail)
      {
         return this.repository.APEIInvDetAddPrepare(apeiinvoicedetail);
      } 
  
      
      [Route("apeiinvdetaddupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetAddUpdateResponseAPI APEIInvDetAddUpdate(Apeiinvoicedetail apeiinvoicedetail)
      {
         return this.repository.APEIInvDetAddUpdate(apeiinvoicedetail);
      } 
  
      
      [Route("apeiinvdetchangeretrieve")]
      [HttpPost]
      public AsapentryAPEIInvDetChangeRetrieveResponseAPI APEIInvDetChangeRetrieve(AsapentryAPEIInvDetChangeRetrieveRequestAPI AsapentryAPEIInvDetChangeRetrieveRequestAPI)
      {
         return this.repository.APEIInvDetChangeRetrieve(AsapentryAPEIInvDetChangeRetrieveRequestAPI);
      } 
  
      
      [Route("apeiinvdetchangeupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetChangeUpdateResponseAPI APEIInvDetChangeUpdate(Apeiinvoicedetail apeiinvoicedetail)
      {
         return this.repository.APEIInvDetChangeUpdate(apeiinvoicedetail);
      } 
  
      
      [Route("apeiinvdetfieldchange")]
      [HttpPost]
      public AsapentryAPEIInvDetFieldChangeResponseAPI APEIInvDetFieldChange(AsapentryAPEIInvDetFieldChangeRequestAPI AsapentryAPEIInvDetFieldChangeRequestAPI)
      {
         return this.repository.APEIInvDetFieldChange(AsapentryAPEIInvDetFieldChangeRequestAPI);
      } 
  
      
      [Route("apeiinvdetcheckdrilldownaccess")]
      [HttpPost]
      public void APEIInvDetCheckDrilldownAccess(Apeiinvoicedetail apeiinvoicedetail)
      {
         this.repository.APEIInvDetCheckDrilldownAccess(apeiinvoicedetail);
      } 
  
      
      [Route("apeiinvdetunlocksoftlock")]
      [HttpPost]
      public void APEIInvDetUnlockSoftLock(Apeiinvdetbanner apeiinvdetbanner)
      {
         this.repository.APEIInvDetUnlockSoftLock(apeiinvdetbanner);
      } 
  
      
      [Route("apeiinvdetbanner")]
      [HttpPost]
      public AsapentryAPEIInvDetBannerResponseAPI APEIInvDetBanner(Apeiinvdetbanner apeiinvdetbanner)
      {
         return this.repository.APEIInvDetBanner(apeiinvdetbanner);
      } 
  
      
      [Route("apeiinvdetgldistlist")]
      [HttpPost]
      public AsapentryAPEIInvDetGLDistListResponseAPI APEIInvDetGLDistList(AsapentryAPEIInvDetGLDistListRequestAPI AsapentryAPEIInvDetGLDistListRequestAPI)
      {
         return this.repository.APEIInvDetGLDistList(AsapentryAPEIInvDetGLDistListRequestAPI);
      } 
  
      
      [Route("apeiinvdetgldistinitialize")]
      [HttpPost]
      public Apeiinvdetgldist APEIInvDetGLDistInitialize(Apeiinvdetgldist apeiinvdetgldist)
      {
         return this.repository.APEIInvDetGLDistInitialize(apeiinvdetgldist);
      } 
  
      
      [Route("apeiinvdetgldistaddprepare")]
      [HttpPost]
      public Apeiinvdetgldist APEIInvDetGLDistAddPrepare(Apeiinvdetgldist apeiinvdetgldist)
      {
         return this.repository.APEIInvDetGLDistAddPrepare(apeiinvdetgldist);
      } 
  
      
      [Route("apeiinvdetgldistaddupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetGLDistAddUpdateResponseAPI APEIInvDetGLDistAddUpdate(AsapentryAPEIInvDetGLDistAddUpdateRequestAPI AsapentryAPEIInvDetGLDistAddUpdateRequestAPI)
      {
         return this.repository.APEIInvDetGLDistAddUpdate(AsapentryAPEIInvDetGLDistAddUpdateRequestAPI);
      } 
  
      
      [Route("apeiinvdetgldistchgretrieve")]
      [HttpPost]
      public AsapentryAPEIInvDetGLDistChgRetrieveResponseAPI APEIInvDetGLDistChgRetrieve(AsapentryAPEIInvDetGLDistChgRetrieveRequestAPI AsapentryAPEIInvDetGLDistChgRetrieveRequestAPI)
      {
         return this.repository.APEIInvDetGLDistChgRetrieve(AsapentryAPEIInvDetGLDistChgRetrieveRequestAPI);
      } 
  
      
      [Route("apeiinvdetgldistchgupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetGLDistChgUpdateResponseAPI APEIInvDetGLDistChgUpdate(AsapentryAPEIInvDetGLDistChgUpdateRequestAPI AsapentryAPEIInvDetGLDistChgUpdateRequestAPI)
      {
         return this.repository.APEIInvDetGLDistChgUpdate(AsapentryAPEIInvDetGLDistChgUpdateRequestAPI);
      } 
  
      
      [Route("apeiinvdetgldistfieldchange")]
      [HttpPost]
      public AsapentryAPEIInvDetGLDistFieldChangeResponseAPI APEIInvDetGLDistFieldChange(AsapentryAPEIInvDetGLDistFieldChangeRequestAPI AsapentryAPEIInvDetGLDistFieldChangeRequestAPI)
      {
         return this.repository.APEIInvDetGLDistFieldChange(AsapentryAPEIInvDetGLDistFieldChangeRequestAPI);
      } 
  
      
      [Route("apeiinvdetgldistdelete")]
      [HttpPost]
      public Apeiinvdetgldistproof APEIInvDetGLDistDelete(AsapentryAPEIInvDetGLDistDeleteRequestAPI AsapentryAPEIInvDetGLDistDeleteRequestAPI)
      {
         return this.repository.APEIInvDetGLDistDelete(AsapentryAPEIInvDetGLDistDeleteRequestAPI);
      } 
  
      
      [Route("apentryeditbrowseload")]
      [HttpPost]
      public IEnumerable<Apeelookupresults> APEntryEditBrowseLoad(Apeelookupcriteria apeelookupcriteria)
      {
         return this.repository.APEntryEditBrowseLoad(apeelookupcriteria);
      } 
  
      
      [Route("apentryedittotalsload")]
      [HttpPost]
      public IEnumerable<Apeetotlookupresults> APEntryEditTotalsLoad(Apeetotlookupcriteria apeetotlookupcriteria)
      {
         return this.repository.APEntryEditTotalsLoad(apeetotlookupcriteria);
      } 
  
      
      [Route("apentryeditmaintload")]
      [HttpPost]
      public Apeemaint APEntryEditMaintLoad(Apeemaint apeemaint)
      {
         return this.repository.APEntryEditMaintLoad(apeemaint);
      } 
  
      
      [Route("apentryeditmaintsave")]
      [HttpPost]
      public void APEntryEditMaintSave(AsapentryAPEntryEditMaintSaveRequestAPI AsapentryAPEntryEditMaintSaveRequestAPI)
      {
         this.repository.APEntryEditMaintSave(AsapentryAPEntryEditMaintSaveRequestAPI);
      } 
  
      
      [Route("apentryeditsplitpayprevalidate")]
      [HttpPost]
      public bool APEntryEditSplitPayPreValidate(Apeesplitpayrowids apeesplitpayrowids)
      {
         return this.repository.APEntryEditSplitPayPreValidate(apeesplitpayrowids);
      } 
  
      
      [Route("apentryeditsplitpayload")]
      [HttpPost]
      public IEnumerable<Apeesplitpay> APEntryEditSplitPayLoad(AsapentryAPEntryEditSplitPayLoadRequestAPI AsapentryAPEntryEditSplitPayLoadRequestAPI)
      {
         return this.repository.APEntryEditSplitPayLoad(AsapentryAPEntryEditSplitPayLoadRequestAPI);
      } 
  
      
      [Route("apentryeditsplitpayvalidate")]
      [HttpPost]
      public void APEntryEditSplitPayValidate(AsapentryAPEntryEditSplitPayValidateRequestAPI AsapentryAPEntryEditSplitPayValidateRequestAPI)
      {
         this.repository.APEntryEditSplitPayValidate(AsapentryAPEntryEditSplitPayValidateRequestAPI);
      } 
  
      
      [Route("apentryeditsplitpayupdate")]
      [HttpPost]
      public void APEntryEditSplitPayUpdate(AsapentryAPEntryEditSplitPayUpdateRequestAPI AsapentryAPEntryEditSplitPayUpdateRequestAPI)
      {
         this.repository.APEntryEditSplitPayUpdate(AsapentryAPEntryEditSplitPayUpdateRequestAPI);
      } 
  
      
      [Route("apentryeditupdate")]
      [HttpPost]
      public void APEntryEditUpdate(AsapentryAPEntryEditUpdateRequestAPI AsapentryAPEntryEditUpdateRequestAPI)
      {
         this.repository.APEntryEditUpdate(AsapentryAPEntryEditUpdateRequestAPI);
      } 
  
      
      [Route("apentryeditupdatenotfinal")]
      [HttpPost]
      public IEnumerable<Apeelookupresults> APEntryEditUpdateNotFinal(AsapentryAPEntryEditUpdateNotFinalRequestAPI AsapentryAPEntryEditUpdateNotFinalRequestAPI)
      {
         return this.repository.APEntryEditUpdateNotFinal(AsapentryAPEntryEditUpdateNotFinalRequestAPI);
      } 
  
      
      [Route("apembapply")]
      [HttpPost]
      public Apembsingle APEMBApply(Apembsingle apembsingle)
      {
         return this.repository.APEMBApply(apembsingle);
      } 
  
      
      [Route("apembretrieve")]
      [HttpPost]
      public IEnumerable<Apembsingle> APEMBRetrieve(AsapentryAPEMBRetrieveRequestAPI AsapentryAPEMBRetrieveRequestAPI)
      {
         return this.repository.APEMBRetrieve(AsapentryAPEMBRetrieveRequestAPI);
      } 
  
      
      [Route("apembupdate")]
      [HttpPost]
      public Apembsingle APEMBUpdate(Apembsingle apembsingle)
      {
         return this.repository.APEMBUpdate(apembsingle);
      } 
  
      
      [Route("apemsretrieve")]
      [HttpPost]
      public IEnumerable<Apemsresults> APEMSRetrieve(Apemscriteria apemscriteria)
      {
         return this.repository.APEMSRetrieve(apemscriteria);
      } 
  
      
      [Route("apemschg")]
      [HttpPost]
      public void APEMSChg(AsapentryAPEMSChgRequestAPI AsapentryAPEMSChgRequestAPI)
      {
         this.repository.APEMSChg(AsapentryAPEMSChgRequestAPI);
      } 
  
      
      [Route("apeiinvdetdelete")]
      [HttpPost]
      public void APEIInvDetDelete(IEnumerable<Apeiinvdetdelete> apeiinvdetdelete)
      {
         this.repository.APEIInvDetDelete(apeiinvdetdelete);
      } 
  
      
      [Route("apeiinvdetfinalupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetFinalUpdateResponseAPI APEIInvDetFinalUpdate(AsapentryAPEIInvDetFinalUpdateRequestAPI AsapentryAPEIInvDetFinalUpdateRequestAPI)
      {
         return this.repository.APEIInvDetFinalUpdate(AsapentryAPEIInvDetFinalUpdateRequestAPI);
      } 
  
      
      [Route("apeiinvdetgeterrors")]
      [HttpPost]
      public IEnumerable<Apeiinvdeterrors> APEIInvDetGetErrors(Apeirowids apeirowids)
      {
         return this.repository.APEIInvDetGetErrors(apeirowids);
      } 
  
      
      [Route("apeiinvdetfinalupdateinitialize")]
      [HttpPost]
      public Apeiinvdetfinalupdt APEIInvDetFinalUpdateInitialize(Apeiinvdetfinalupdt apeiinvdetfinalupdt)
      {
         return this.repository.APEIInvDetFinalUpdateInitialize(apeiinvdetfinalupdt);
      } 
  
      
      [Route("apeiinvdetfinalupdatevalidate")]
      [HttpPost]
      public Apeiinvdetfinalupdt APEIInvDetFinalUpdateValidate(Apeiinvdetfinalupdt apeiinvdetfinalupdt)
      {
         return this.repository.APEIInvDetFinalUpdateValidate(apeiinvdetfinalupdt);
      } 
  
      
      [Route("apeiinvdetpoheaderlist")]
      [HttpPost]
      public IEnumerable<Apeiinvdetpohdrlist> APEIInvDetPOHeaderList(AsapentryAPEIInvDetPOHeaderListRequestAPI AsapentryAPEIInvDetPOHeaderListRequestAPI)
      {
         return this.repository.APEIInvDetPOHeaderList(AsapentryAPEIInvDetPOHeaderListRequestAPI);
      } 
  
      
      [Route("apeiinvdetpoheaderinitialize")]
      [HttpPost]
      public AsapentryAPEIInvDetPOHeaderInitializeResponseAPI APEIInvDetPOHeaderInitialize(Apeiinvdetpohdr apeiinvdetpohdr)
      {
         return this.repository.APEIInvDetPOHeaderInitialize(apeiinvdetpohdr);
      } 
  
      
      [Route("apeiinvdetpoheaderaddprepare")]
      [HttpPost]
      public Apeiinvdetpohdr APEIInvDetPOHeaderAddPrepare(Apeiinvdetpohdr apeiinvdetpohdr)
      {
         return this.repository.APEIInvDetPOHeaderAddPrepare(apeiinvdetpohdr);
      } 
  
      
      [Route("apeiinvdetpoheaderfieldchange")]
      [HttpPost]
      public Apeiinvdetpohdr APEIInvDetPOHeaderFieldChange(AsapentryAPEIInvDetPOHeaderFieldChangeRequestAPI AsapentryAPEIInvDetPOHeaderFieldChangeRequestAPI)
      {
         return this.repository.APEIInvDetPOHeaderFieldChange(AsapentryAPEIInvDetPOHeaderFieldChangeRequestAPI);
      } 
  
      
      [Route("apeiinvdetpoheaderaddupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetPOHeaderAddUpdateResponseAPI APEIInvDetPOHeaderAddUpdate(Apeiinvdetpohdr apeiinvdetpohdr)
      {
         return this.repository.APEIInvDetPOHeaderAddUpdate(apeiinvdetpohdr);
      } 
  
      
      [Route("apeiinvdetpoheaderchgretrieve")]
      [HttpPost]
      public AsapentryAPEIInvDetPOHeaderChgRetrieveResponseAPI APEIInvDetPOHeaderChgRetrieve(AsapentryAPEIInvDetPOHeaderChgRetrieveRequestAPI AsapentryAPEIInvDetPOHeaderChgRetrieveRequestAPI)
      {
         return this.repository.APEIInvDetPOHeaderChgRetrieve(AsapentryAPEIInvDetPOHeaderChgRetrieveRequestAPI);
      } 
  
      
      [Route("apeiinvdetpoheaderchgupdate")]
      [HttpPost]
      public Apeiinvdetpohdr APEIInvDetPOHeaderChgUpdate(Apeiinvdetpohdr apeiinvdetpohdr)
      {
         return this.repository.APEIInvDetPOHeaderChgUpdate(apeiinvdetpohdr);
      } 
  
      
      [Route("apeiinvdetpolineinitialize")]
      [HttpPost]
      public Apeiinvdetpoln APEIInvDetPOLineInitialize(Apeiinvdetpoln apeiinvdetpoln)
      {
         return this.repository.APEIInvDetPOLineInitialize(apeiinvdetpoln);
      } 
  
      
      [Route("apeiinvdetpolinechgretrieve")]
      [HttpPost]
      public AsapentryAPEIInvDetPOLineChgRetrieveResponseAPI APEIInvDetPOLineChgRetrieve(AsapentryAPEIInvDetPOLineChgRetrieveRequestAPI AsapentryAPEIInvDetPOLineChgRetrieveRequestAPI)
      {
         return this.repository.APEIInvDetPOLineChgRetrieve(AsapentryAPEIInvDetPOLineChgRetrieveRequestAPI);
      } 
  
      
      [Route("apeiinvdetpolinechgupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetPOLineChgUpdateResponseAPI APEIInvDetPOLineChgUpdate(AsapentryAPEIInvDetPOLineChgUpdateRequestAPI AsapentryAPEIInvDetPOLineChgUpdateRequestAPI)
      {
         return this.repository.APEIInvDetPOLineChgUpdate(AsapentryAPEIInvDetPOLineChgUpdateRequestAPI);
      } 
  
      
      [Route("apeiinvdetpolinefieldchange")]
      [HttpPost]
      public AsapentryAPEIInvDetPOLineFieldChangeResponseAPI APEIInvDetPOLineFieldChange(AsapentryAPEIInvDetPOLineFieldChangeRequestAPI AsapentryAPEIInvDetPOLineFieldChangeRequestAPI)
      {
         return this.repository.APEIInvDetPOLineFieldChange(AsapentryAPEIInvDetPOLineFieldChangeRequestAPI);
      } 
  
      
      [Route("apeiinvdetpolinedelete")]
      [HttpPost]
      public void APEIInvDetPOLineDelete(IEnumerable<Apeirowids> apeirowids)
      {
         this.repository.APEIInvDetPOLineDelete(apeirowids);
      } 
  
      
      [Route("apeiinvdetpolineloadmanaddon")]
      [HttpPost]
      public IEnumerable<Apeiinvdetpolnmanadd> APEIInvDetPOLineLoadManAddon(Apeiinvdetpoln apeiinvdetpoln)
      {
         return this.repository.APEIInvDetPOLineLoadManAddon(apeiinvdetpoln);
      } 
  
      
      [Route("apeiinvdetpolinechgmanaddon")]
      [HttpPost]
      public Apeiinvdetpolnmanadd APEIInvDetPOLineChgManAddon(Apeiinvdetpolnmanadd apeiinvdetpolnmanadd)
      {
         return this.repository.APEIInvDetPOLineChgManAddon(apeiinvdetpolnmanadd);
      } 
  
      
      [Route("apeiinvdetpolineuncost")]
      [HttpPost]
      public IEnumerable<Apeiinvdetpolnlist> APEIInvDetPOLineUncost(IEnumerable<Apeiinvdetpolnlist> apeiinvdetpolnlist)
      {
         return this.repository.APEIInvDetPOLineUncost(apeiinvdetpolnlist);
      } 
  
      
      [Route("apemagetcredits")]
      [HttpPost]
      public IEnumerable<Apemacredits> APEMAGetCredits(AsapentryAPEMAGetCreditsRequestAPI AsapentryAPEMAGetCreditsRequestAPI)
      {
         return this.repository.APEMAGetCredits(AsapentryAPEMAGetCreditsRequestAPI);
      } 
  
      
      [Route("apemagetinvoices")]
      [HttpPost]
      public IEnumerable<Apemainvoices> APEMAGetInvoices(AsapentryAPEMAGetInvoicesRequestAPI AsapentryAPEMAGetInvoicesRequestAPI)
      {
         return this.repository.APEMAGetInvoices(AsapentryAPEMAGetInvoicesRequestAPI);
      } 
  
      
      [Route("apemapreupdate")]
      [HttpPost]
      public Apemaupdate APEMAPreUpdate(AsapentryAPEMAPreUpdateRequestAPI AsapentryAPEMAPreUpdateRequestAPI)
      {
         return this.repository.APEMAPreUpdate(AsapentryAPEMAPreUpdateRequestAPI);
      } 
  
      
      [Route("apemaupdate")]
      [HttpPost]
      public void APEMAUpdate(AsapentryAPEMAUpdateRequestAPI AsapentryAPEMAUpdateRequestAPI)
      {
         this.repository.APEMAUpdate(AsapentryAPEMAUpdateRequestAPI);
      } 
  
      
      [Route("apexchangerateupdate/{cCurrencyty}/{lUpdate:bool}/{dVouchexrate:decimal}")]
      [HttpGet]
      public void APExchangeRateUpdate(string cCurrencyty, bool lUpdate, decimal dVouchexrate)
      {
         this.repository.APExchangeRateUpdate(cCurrencyty, lUpdate, dVouchexrate);
      } 
  
      
      [Route("apeiinvdetpolinelist")]
      [HttpPost]
      public IEnumerable<Apeiinvdetpolnlist> APEIInvDetPOLineList(Apeirowids apeirowids)
      {
         return this.repository.APEIInvDetPOLineList(apeirowids);
      } 
  
      
      [Route("apeiinvdetpoheaderdelete")]
      [HttpPost]
      public void APEIInvDetPOHeaderDelete(IEnumerable<Apeirowids> apeirowids)
      {
         this.repository.APEIInvDetPOHeaderDelete(apeirowids);
      } 
  
      
      [Route("apeiinvdetaddonlist")]
      [HttpPost]
      public AsapentryAPEIInvDetAddonListResponseAPI APEIInvDetAddonList(Apeiinvdetbanner apeiinvdetbanner)
      {
         return this.repository.APEIInvDetAddonList(apeiinvdetbanner);
      } 
  
      
      [Route("apeiinvdetaddoninitialize")]
      [HttpPost]
      public Apeiinvdetaddon APEIInvDetAddonInitialize(Apeiinvdetaddon apeiinvdetaddon)
      {
         return this.repository.APEIInvDetAddonInitialize(apeiinvdetaddon);
      } 
  
      
      [Route("apeiinvdetaddonaddprepare")]
      [HttpPost]
      public Apeiinvdetaddon APEIInvDetAddonAddPrepare(Apeiinvdetaddon apeiinvdetaddon)
      {
         return this.repository.APEIInvDetAddonAddPrepare(apeiinvdetaddon);
      } 
  
      
      [Route("apeiinvdetaddonaddupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetAddonAddUpdateResponseAPI APEIInvDetAddonAddUpdate(Apeiinvdetaddon apeiinvdetaddon)
      {
         return this.repository.APEIInvDetAddonAddUpdate(apeiinvdetaddon);
      } 
  
      
      [Route("apeiinvdetaddonchgretrieve")]
      [HttpPost]
      public Apeiinvdetaddon APEIInvDetAddonChgRetrieve(AsapentryAPEIInvDetAddonChgRetrieveRequestAPI AsapentryAPEIInvDetAddonChgRetrieveRequestAPI)
      {
         return this.repository.APEIInvDetAddonChgRetrieve(AsapentryAPEIInvDetAddonChgRetrieveRequestAPI);
      } 
  
      
      [Route("apeiinvdetaddonchgupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetAddonChgUpdateResponseAPI APEIInvDetAddonChgUpdate(Apeiinvdetaddon apeiinvdetaddon)
      {
         return this.repository.APEIInvDetAddonChgUpdate(apeiinvdetaddon);
      } 
  
      
      [Route("apeiinvdetaddondelete")]
      [HttpPost]
      public Apeiinvdetaddontotals APEIInvDetAddonDelete(IEnumerable<Apeiinvdetaddon> apeiinvdetaddon)
      {
         return this.repository.APEIInvDetAddonDelete(apeiinvdetaddon);
      } 
  
      
      [Route("apeiinvdettermslist")]
      [HttpPost]
      public AsapentryAPEIInvDetTermsListResponseAPI APEIInvDetTermsList(Apeiinvdetbanner apeiinvdetbanner)
      {
         return this.repository.APEIInvDetTermsList(apeiinvdetbanner);
      } 
  
      
      [Route("apeiinvdettermsinitialize")]
      [HttpPost]
      public Apeiinvdetterms APEIInvDetTermsInitialize(Apeiinvdetterms apeiinvdetterms)
      {
         return this.repository.APEIInvDetTermsInitialize(apeiinvdetterms);
      } 
  
      
      [Route("apeiinvdettermsaddprepare")]
      [HttpPost]
      public Apeiinvdetterms APEIInvDetTermsAddPrepare(Apeiinvdetterms apeiinvdetterms)
      {
         return this.repository.APEIInvDetTermsAddPrepare(apeiinvdetterms);
      } 
  
      
      [Route("apeiinvdettermsaddupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetTermsAddUpdateResponseAPI APEIInvDetTermsAddUpdate(Apeiinvdetterms apeiinvdetterms)
      {
         return this.repository.APEIInvDetTermsAddUpdate(apeiinvdetterms);
      } 
  
      
      [Route("apeiinvdettermsdelete")]
      [HttpPost]
      public Apeiinvdettermstotals APEIInvDetTermsDelete(IEnumerable<Apeiinvdetterms> apeiinvdetterms)
      {
         return this.repository.APEIInvDetTermsDelete(apeiinvdetterms);
      } 
  
      
      [Route("apeiinvdettermschgretrieve")]
      [HttpPost]
      public Apeiinvdetterms APEIInvDetTermsChgRetrieve(AsapentryAPEIInvDetTermsChgRetrieveRequestAPI AsapentryAPEIInvDetTermsChgRetrieveRequestAPI)
      {
         return this.repository.APEIInvDetTermsChgRetrieve(AsapentryAPEIInvDetTermsChgRetrieveRequestAPI);
      } 
  
      
      [Route("apeiinvdettermschgupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetTermsChgUpdateResponseAPI APEIInvDetTermsChgUpdate(Apeiinvdetterms apeiinvdetterms)
      {
         return this.repository.APEIInvDetTermsChgUpdate(apeiinvdetterms);
      } 
  
      
      [Route("apeiinvdettermssplitinit")]
      [HttpPost]
      public Apeiinvdettermssplit APEIInvDetTermsSplitInit(Apeiinvdettermssplit apeiinvdettermssplit)
      {
         return this.repository.APEIInvDetTermsSplitInit(apeiinvdettermssplit);
      } 
  
      
      [Route("apeiinvdettermssplitupdate")]
      [HttpPost]
      public AsapentryAPEIInvDetTermsSplitUpdateResponseAPI APEIInvDetTermsSplitUpdate(Apeiinvdettermssplit apeiinvdettermssplit)
      {
         return this.repository.APEIInvDetTermsSplitUpdate(apeiinvdettermssplit);
      } 
  
      
      [Route("apeiinvoicedetailtoggleflags")]
      [HttpPost]
      public IEnumerable<Apeiinvoicedetailflags> APEIInvoiceDetailToggleFlags(AsapentryAPEIInvoiceDetailToggleFlagsRequestAPI AsapentryAPEIInvoiceDetailToggleFlagsRequestAPI)
      {
         return this.repository.APEIInvoiceDetailToggleFlags(AsapentryAPEIInvoiceDetailToggleFlagsRequestAPI);
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
  