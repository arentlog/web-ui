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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.AR
{  
   using Sxe.AR.Data.Models.PdsContext;
   using Sxe.AR.Data.Models.Pdsarettrans;
   using Sxe.AR.Data.Models.Pdsaretsplitpay;
   using Sxe.AR.Data.Models.Pdsarettranscdload;
   using Sxe.AR.Data.Models.Pdsaretfortranscdload;
   using Sxe.AR.Data.Models.Pdsmessaging;
   using Sxe.AR.Data.Models.Pdsarmanualterms;
   using Sxe.AR.Data.Models.Pdsglupdate;
   using Sxe.AR.Data.Models.Pdsaretcm;
   using Sxe.AR.Data.Models.Pdsaretlist;
   using Sxe.AR.Data.Models.Pdsarexchrate;
   using Sxe.AR.Data.Models.Pdsareceglobaldata;
   using Sxe.AR.Data.Models.Pdsarecemaindata;
   using Sxe.AR.Data.Models.Pdsarececheckdata;
   using Sxe.AR.Data.Models.Pdsgleta;
   using Sxe.AR.Data.Models.Pdsgletaparam;
   using Sxe.AR.Data.Models.Pdsareceinvoicesdata;
   using Sxe.AR.Data.Models.Pdsareceinvoiceslist;
   using Sxe.AR.Data.Models.Pdsareceworeport;
   using Sxe.AR.Data.Models.Pdsarecewodata;
   using Sxe.AR.Data.Models.Pdsarececoddata;
   using Sxe.AR.Data.Models.Pdsarececodlookup;
   using Sxe.AR.Data.Models.Pdsareceinvoicesoldestcriteria;
   using Sxe.AR.Data.Models.Pdsareceinvoicesoldestsingle;
   using Sxe.AR.Data.Models.Pdsareceupdatescrnoutput;
   using Sxe.AR.Data.Models.Pdsarecesimcdiv;
   using Sxe.AR.Data.Models.Pdsareceupdatescrncriteria;
   using Sxe.AR.Data.Models.Pdsareceupdatedata;
   using Sxe.AR.Data.Models.Pdsarecemisccashdata;
   using Sxe.AR.Data.Models.Pdsglopenjournal;
   using Sxe.AR.Data.Models.Pdsareceupdatescrnsingle;
   using Sxe.AR.Data.Models.Pdsarecewodisplay;
   using Sxe.AR.Data.Models.Pdsarelearetadd;
   using Sxe.AR.Data.Models.Pdsarelecheckhdr;
   using Sxe.AR.Data.Models.Pdsarelecheckdtl;
   using Sxe.AR.Data.Models.Pdsarelecheckdtlwo;
   using Sxe.AR.Data.Models.Pdsareledebitadd;
   using Sxe.AR.Data.Models.Pdsaremb;
   using Sxe.AR.Data.Models.Complex;
   using Sxe.AR.Data.Repositories;
    
   [RoutePrefix("api/ar/asarentry")]
   public partial class AsarentryApiController : ApiControllerBase
   {
      private readonly AsarentryRepository repository;
    
      public AsarentryApiController(AsarentryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("aretsplitpayrowleave")]
      [HttpPost]
      public AsarentryARETSplitPayRowLeaveResponseAPI ARETSplitPayRowLeave(AsarentryARETSplitPayRowLeaveRequestAPI AsarentryARETSplitPayRowLeaveRequestAPI)
      {
         return this.repository.ARETSplitPayRowLeave(AsarentryARETSplitPayRowLeaveRequestAPI);
      } 
  
      
      [Route("aretsplitpayupdate")]
      [HttpPost]
      public AsarentryARETSplitPayUpdateResponseAPI ARETSplitPayUpdate(AsarentryARETSplitPayUpdateRequestAPI AsarentryARETSplitPayUpdateRequestAPI)
      {
         return this.repository.ARETSplitPayUpdate(AsarentryARETSplitPayUpdateRequestAPI);
      } 
  
      
      [Route("aretstep1continuebtn")]
      [HttpPost]
      public AsarentryARETStep1ContinueBtnResponseAPI ARETStep1ContinueBtn(AsarentryARETStep1ContinueBtnRequestAPI AsarentryARETStep1ContinueBtnRequestAPI)
      {
         return this.repository.ARETStep1ContinueBtn(AsarentryARETStep1ContinueBtnRequestAPI);
      } 
  
      
      [Route("aretstep2cancelbtn")]
      [HttpPost]
      public Arettrans ARETStep2CancelBtn(Arettrans arettrans)
      {
         return this.repository.ARETStep2CancelBtn(arettrans);
      } 
  
      
      [Route("aretstep2clearbtn")]
      [HttpPost]
      public Arettrans ARETStep2ClearBtn(Arettrans arettrans)
      {
         return this.repository.ARETStep2ClearBtn(arettrans);
      } 
  
      
      [Route("aretstep2continuebtn")]
      [HttpPost]
      public AsarentryARETStep2ContinueBtnResponseAPI ARETStep2ContinueBtn(AsarentryARETStep2ContinueBtnRequestAPI AsarentryARETStep2ContinueBtnRequestAPI)
      {
         return this.repository.ARETStep2ContinueBtn(AsarentryARETStep2ContinueBtnRequestAPI);
      } 
  
      
      [Route("aretstep3cancelauto")]
      [HttpPost]
      public Arettrans ARETStep3CancelAuto(Arettrans arettrans)
      {
         return this.repository.ARETStep3CancelAuto(arettrans);
      } 
  
      
      [Route("aretstep3continueauto")]
      [HttpPost]
      public Arettrans ARETStep3ContinueAuto(Arettrans arettrans)
      {
         return this.repository.ARETStep3ContinueAuto(arettrans);
      } 
  
      
      [Route("arettranscdload/{lCheckSecurity:bool}")]
      [HttpGet]
      public IEnumerable<Arettranscdload> ARETTranscdLoad(bool lCheckSecurity)
      {
         return this.repository.ARETTranscdLoad(lCheckSecurity);
      } 
  
      
      [Route("arettranscdvaluechanged")]
      [HttpPost]
      public AsarentryARETTransCdValueChangedResponseAPI ARETTransCdValueChanged(Arettrans arettrans)
      {
         return this.repository.ARETTransCdValueChanged(arettrans);
      } 
  
      
      [Route("aretupdate")]
      [HttpPost]
      public AsarentryARETUpdateResponseAPI ARETUpdate(AsarentryARETUpdateRequestAPI AsarentryARETUpdateRequestAPI)
      {
         return this.repository.ARETUpdate(AsarentryARETUpdateRequestAPI);
      } 
  
      
      [Route("arexchrateinitiate")]
      [HttpPost]
      public Arexchrate ARExchRateInitiate(Arexchrate arexchrate)
      {
         return this.repository.ARExchRateInitiate(arexchrate);
      } 
  
      
      [Route("arexchrateupdate")]
      [HttpPost]
      public AsarentryARExchRateUpdateResponseAPI ARExchRateUpdate(AsarentryARExchRateUpdateRequestAPI AsarentryARExchRateUpdateRequestAPI)
      {
         return this.repository.ARExchRateUpdate(AsarentryARExchRateUpdateRequestAPI);
      } 
  
      
      [Route("aretgletaupdatesetup")]
      [HttpPost]
      public AsarentryARETGLETAUpdateSetupResponseAPI ARETGLETAUpdateSetup(Arettrans arettrans)
      {
         return this.repository.ARETGLETAUpdateSetup(arettrans);
      } 
  
      
      [Route("armanualtermsinitiate")]
      [HttpPost]
      public Armanualterms ARManualTermsInitiate(Armanualterms armanualterms)
      {
         return this.repository.ARManualTermsInitiate(armanualterms);
      } 
  
      
      [Route("armanualtermsresetdiscfields")]
      [HttpPost]
      public Armanualterms ARManualTermsResetDiscFields(AsarentryARManualTermsResetDiscFieldsRequestAPI AsarentryARManualTermsResetDiscFieldsRequestAPI)
      {
         return this.repository.ARManualTermsResetDiscFields(AsarentryARManualTermsResetDiscFieldsRequestAPI);
      } 
  
      
      [Route("armanualtermsupdate")]
      [HttpPost]
      public Armanualterms ARManualTermsUpdate(Armanualterms armanualterms)
      {
         return this.repository.ARManualTermsUpdate(armanualterms);
      } 
  
      
      [Route("arececancelprocess")]
      [HttpPost]
      public AsarentryARECECancelProcessResponseAPI ARECECancelProcess(AsarentryARECECancelProcessRequestAPI AsarentryARECECancelProcessRequestAPI)
      {
         return this.repository.ARECECancelProcess(AsarentryARECECancelProcessRequestAPI);
      } 
  
      
      [Route("arececheckfieldtrigger")]
      [HttpPost]
      public AsarentryARECECheckFieldTriggerResponseAPI ARECECheckFieldTrigger(AsarentryARECECheckFieldTriggerRequestAPI AsarentryARECECheckFieldTriggerRequestAPI)
      {
         return this.repository.ARECECheckFieldTrigger(AsarentryARECECheckFieldTriggerRequestAPI);
      } 
  
      
      [Route("arececheckinitialize")]
      [HttpPost]
      public AsarentryARECECheckInitializeResponseAPI ARECECheckInitialize(AsarentryARECECheckInitializeRequestAPI AsarentryARECECheckInitializeRequestAPI)
      {
         return this.repository.ARECECheckInitialize(AsarentryARECECheckInitializeRequestAPI);
      } 
  
      
      [Route("arececheckvalidate")]
      [HttpPost]
      public AsarentryARECECheckValidateResponseAPI ARECECheckValidate(AsarentryARECECheckValidateRequestAPI AsarentryARECECheckValidateRequestAPI)
      {
         return this.repository.ARECECheckValidate(AsarentryARECECheckValidateRequestAPI);
      } 
  
      
      [Route("arececredinvdbtinitialize")]
      [HttpPost]
      public AsarentryARECECredInvDbtInitializeResponseAPI ARECECredInvDbtInitialize(AsarentryARECECredInvDbtInitializeRequestAPI AsarentryARECECredInvDbtInitializeRequestAPI)
      {
         return this.repository.ARECECredInvDbtInitialize(AsarentryARECECredInvDbtInitializeRequestAPI);
      } 
  
      
      [Route("arececreditscancelwriteoff")]
      [HttpPost]
      public IEnumerable<Areceinvoiceslist> ARECECreditsCancelWriteoff(IEnumerable<Areceinvoiceslist> areceinvoiceslist)
      {
         return this.repository.ARECECreditsCancelWriteoff(areceinvoiceslist);
      } 
  
      
      [Route("arececreditschooseorigdisc")]
      [HttpPost]
      public AsarentryARECECreditsChooseOrigDiscResponseAPI ARECECreditsChooseOrigDisc(AsarentryARECECreditsChooseOrigDiscRequestAPI AsarentryARECECreditsChooseOrigDiscRequestAPI)
      {
         return this.repository.ARECECreditsChooseOrigDisc(AsarentryARECECreditsChooseOrigDiscRequestAPI);
      } 
  
      
      [Route("arececreditschoosereset")]
      [HttpPost]
      public AsarentryARECECreditsChooseResetResponseAPI ARECECreditsChooseReset(AsarentryARECECreditsChooseResetRequestAPI AsarentryARECECreditsChooseResetRequestAPI)
      {
         return this.repository.ARECECreditsChooseReset(AsarentryARECECreditsChooseResetRequestAPI);
      } 
  
      
      [Route("arececreditschoosewriteoff")]
      [HttpPost]
      public AsarentryARECECreditsChooseWriteoffResponseAPI ARECECreditsChooseWriteoff(AsarentryARECECreditsChooseWriteoffRequestAPI AsarentryARECECreditsChooseWriteoffRequestAPI)
      {
         return this.repository.ARECECreditsChooseWriteoff(AsarentryARECECreditsChooseWriteoffRequestAPI);
      } 
  
      
      [Route("arececoddelete")]
      [HttpPost]
      public AsarentryARECECODDeleteResponseAPI ARECECODDelete(AsarentryARECECODDeleteRequestAPI AsarentryARECECODDeleteRequestAPI)
      {
         return this.repository.ARECECODDelete(AsarentryARECECODDeleteRequestAPI);
      } 
  
      
      [Route("arececodinitialize")]
      [HttpPost]
      public AsarentryARECECODInitializeResponseAPI ARECECODInitialize(Areceglobaldata areceglobaldata)
      {
         return this.repository.ARECECODInitialize(areceglobaldata);
      } 
  
      
      [Route("arececodleavefield")]
      [HttpPost]
      public AsarentryARECECODLeaveFieldResponseAPI ARECECODLeaveField(AsarentryARECECODLeaveFieldRequestAPI AsarentryARECECODLeaveFieldRequestAPI)
      {
         return this.repository.ARECECODLeaveField(AsarentryARECECODLeaveFieldRequestAPI);
      } 
  
      
      [Route("arececodvalidate")]
      [HttpPost]
      public AsarentryARECECODValidateResponseAPI ARECECODValidate(AsarentryARECECODValidateRequestAPI AsarentryARECECODValidateRequestAPI)
      {
         return this.repository.ARECECODValidate(AsarentryARECECODValidateRequestAPI);
      } 
  
      
      [Route("arececodvalidaterow")]
      [HttpPost]
      public AsarentryARECECODValidateRowResponseAPI ARECECODValidateRow(AsarentryARECECODValidateRowRequestAPI AsarentryARECECODValidateRowRequestAPI)
      {
         return this.repository.ARECECODValidateRow(AsarentryARECECODValidateRowRequestAPI);
      } 
  
      
      [Route("arececreditsfieldleave")]
      [HttpPost]
      public AsarentryARECECreditsFieldLeaveResponseAPI ARECECreditsFieldLeave(AsarentryARECECreditsFieldLeaveRequestAPI AsarentryARECECreditsFieldLeaveRequestAPI)
      {
         return this.repository.ARECECreditsFieldLeave(AsarentryARECECreditsFieldLeaveRequestAPI);
      } 
  
      
      [Route("arececreditsokwriteoff")]
      [HttpPost]
      public AsarentryARECECreditsOKWriteoffResponseAPI ARECECreditsOKWriteoff(AsarentryARECECreditsOKWriteoffRequestAPI AsarentryARECECreditsOKWriteoffRequestAPI)
      {
         return this.repository.ARECECreditsOKWriteoff(AsarentryARECECreditsOKWriteoffRequestAPI);
      } 
  
      
      [Route("arececreditsoldest")]
      [HttpPost]
      public AsarentryARECECreditsOldestResponseAPI ARECECreditsOldest(AsarentryARECECreditsOldestRequestAPI AsarentryARECECreditsOldestRequestAPI)
      {
         return this.repository.ARECECreditsOldest(AsarentryARECECreditsOldestRequestAPI);
      } 
  
      
      [Route("arecedebitdelete")]
      [HttpPost]
      public AsarentryARECEDebitDeleteResponseAPI ARECEDebitDelete(AsarentryARECEDebitDeleteRequestAPI AsarentryARECEDebitDeleteRequestAPI)
      {
         return this.repository.ARECEDebitDelete(AsarentryARECEDebitDeleteRequestAPI);
      } 
  
      
      [Route("arecedebitinitialize")]
      [HttpPost]
      public AsarentryARECEDebitInitializeResponseAPI ARECEDebitInitialize(AsarentryARECEDebitInitializeRequestAPI AsarentryARECEDebitInitializeRequestAPI)
      {
         return this.repository.ARECEDebitInitialize(AsarentryARECEDebitInitializeRequestAPI);
      } 
  
      
      [Route("arecedebitleavefield")]
      [HttpPost]
      public AsarentryARECEDebitLeaveFieldResponseAPI ARECEDebitLeaveField(AsarentryARECEDebitLeaveFieldRequestAPI AsarentryARECEDebitLeaveFieldRequestAPI)
      {
         return this.repository.ARECEDebitLeaveField(AsarentryARECEDebitLeaveFieldRequestAPI);
      } 
  
      
      [Route("arecedebitvalidate")]
      [HttpPost]
      public AsarentryARECEDebitValidateResponseAPI ARECEDebitValidate(AsarentryARECEDebitValidateRequestAPI AsarentryARECEDebitValidateRequestAPI)
      {
         return this.repository.ARECEDebitValidate(AsarentryARECEDebitValidateRequestAPI);
      } 
  
      
      [Route("areceinvoiceschooseorigdisc")]
      [HttpPost]
      public AsarentryARECEInvoicesChooseOrigDiscResponseAPI ARECEInvoicesChooseOrigDisc(AsarentryARECEInvoicesChooseOrigDiscRequestAPI AsarentryARECEInvoicesChooseOrigDiscRequestAPI)
      {
         return this.repository.ARECEInvoicesChooseOrigDisc(AsarentryARECEInvoicesChooseOrigDiscRequestAPI);
      } 
  
      
      [Route("areceinvoiceschoosereset")]
      [HttpPost]
      public AsarentryARECEInvoicesChooseResetResponseAPI ARECEInvoicesChooseReset(AsarentryARECEInvoicesChooseResetRequestAPI AsarentryARECEInvoicesChooseResetRequestAPI)
      {
         return this.repository.ARECEInvoicesChooseReset(AsarentryARECEInvoicesChooseResetRequestAPI);
      } 
  
      
      [Route("areceinvoiceschoosewriteoff")]
      [HttpPost]
      public AsarentryARECEInvoicesChooseWriteoffResponseAPI ARECEInvoicesChooseWriteoff(AsarentryARECEInvoicesChooseWriteoffRequestAPI AsarentryARECEInvoicesChooseWriteoffRequestAPI)
      {
         return this.repository.ARECEInvoicesChooseWriteoff(AsarentryARECEInvoicesChooseWriteoffRequestAPI);
      } 
  
      
      [Route("areceinvoicesfieldleave")]
      [HttpPost]
      public AsarentryARECEInvoicesFieldLeaveResponseAPI ARECEInvoicesFieldLeave(AsarentryARECEInvoicesFieldLeaveRequestAPI AsarentryARECEInvoicesFieldLeaveRequestAPI)
      {
         return this.repository.ARECEInvoicesFieldLeave(AsarentryARECEInvoicesFieldLeaveRequestAPI);
      } 
  
      
      [Route("areceinvoicesoldestinitialize")]
      [HttpPost]
      public Areceinvoicesoldestsingle ARECEInvoicesOldestInitialize(Areceinvoicesoldestcriteria areceinvoicesoldestcriteria)
      {
         return this.repository.ARECEInvoicesOldestInitialize(areceinvoicesoldestcriteria);
      } 
  
      
      [Route("areceinvoicesoldestok")]
      [HttpPost]
      public AsarentryARECEInvoicesOldestOKResponseAPI ARECEInvoicesOldestOK(AsarentryARECEInvoicesOldestOKRequestAPI AsarentryARECEInvoicesOldestOKRequestAPI)
      {
         return this.repository.ARECEInvoicesOldestOK(AsarentryARECEInvoicesOldestOKRequestAPI);
      } 
  
      
      [Route("areceinvoicespifbutton")]
      [HttpPost]
      public AsarentryARECEInvoicesPIFButtonResponseAPI ARECEInvoicesPIFButton(AsarentryARECEInvoicesPIFButtonRequestAPI AsarentryARECEInvoicesPIFButtonRequestAPI)
      {
         return this.repository.ARECEInvoicesPIFButton(AsarentryARECEInvoicesPIFButtonRequestAPI);
      } 
  
      
      [Route("areceinvoicesvalidate")]
      [HttpPost]
      public AsarentryARECEInvoicesValidateResponseAPI ARECEInvoicesValidate(AsarentryARECEInvoicesValidateRequestAPI AsarentryARECEInvoicesValidateRequestAPI)
      {
         return this.repository.ARECEInvoicesValidate(AsarentryARECEInvoicesValidateRequestAPI);
      } 
  
      
      [Route("arecemaininitialize")]
      [HttpPost]
      public AsarentryARECEMainInitializeResponseAPI ARECEMainInitialize(AsarentryARECEMainInitializeRequestAPI AsarentryARECEMainInitializeRequestAPI)
      {
         return this.repository.ARECEMainInitialize(AsarentryARECEMainInitializeRequestAPI);
      } 
  
      
      [Route("arecemisccashgletadelete")]
      [HttpPost]
      public AsarentryARECEMiscCashGLETADeleteResponseAPI ARECEMiscCashGLETADelete(AsarentryARECEMiscCashGLETADeleteRequestAPI AsarentryARECEMiscCashGLETADeleteRequestAPI)
      {
         return this.repository.ARECEMiscCashGLETADelete(AsarentryARECEMiscCashGLETADeleteRequestAPI);
      } 
  
      
      [Route("arecemisccashgletaleavefield")]
      [HttpPost]
      public AsarentryARECEMiscCashGLETALeaveFieldResponseAPI ARECEMiscCashGLETALeaveField(AsarentryARECEMiscCashGLETALeaveFieldRequestAPI AsarentryARECEMiscCashGLETALeaveFieldRequestAPI)
      {
         return this.repository.ARECEMiscCashGLETALeaveField(AsarentryARECEMiscCashGLETALeaveFieldRequestAPI);
      } 
  
      
      [Route("arecemisccashinitialize")]
      [HttpPost]
      public AsarentryARECEMiscCashInitializeResponseAPI ARECEMiscCashInitialize(AsarentryARECEMiscCashInitializeRequestAPI AsarentryARECEMiscCashInitializeRequestAPI)
      {
         return this.repository.ARECEMiscCashInitialize(AsarentryARECEMiscCashInitializeRequestAPI);
      } 
  
      
      [Route("arecemisccashleavefield")]
      [HttpPost]
      public Arecemisccashdata ARECEMiscCashLeaveField(AsarentryARECEMiscCashLeaveFieldRequestAPI AsarentryARECEMiscCashLeaveFieldRequestAPI)
      {
         return this.repository.ARECEMiscCashLeaveField(AsarentryARECEMiscCashLeaveFieldRequestAPI);
      } 
  
      
      [Route("arecemisccashvalidate")]
      [HttpPost]
      public AsarentryARECEMiscCashValidateResponseAPI ARECEMiscCashValidate(AsarentryARECEMiscCashValidateRequestAPI AsarentryARECEMiscCashValidateRequestAPI)
      {
         return this.repository.ARECEMiscCashValidate(AsarentryARECEMiscCashValidateRequestAPI);
      } 
  
      
      [Route("areceupdateprocess")]
      [HttpPost]
      public AsarentryARECEUpdateProcessResponseAPI ARECEUpdateProcess(AsarentryARECEUpdateProcessRequestAPI AsarentryARECEUpdateProcessRequestAPI)
      {
         return this.repository.ARECEUpdateProcess(AsarentryARECEUpdateProcessRequestAPI);
      } 
  
      
      [Route("areceupdatescrnfieldleave")]
      [HttpPost]
      public Areceupdatescrnsingle ARECEUpdateScrnFieldLeave(AsarentryARECEUpdateScrnFieldLeaveRequestAPI AsarentryARECEUpdateScrnFieldLeaveRequestAPI)
      {
         return this.repository.ARECEUpdateScrnFieldLeave(AsarentryARECEUpdateScrnFieldLeaveRequestAPI);
      } 
  
      
      [Route("areceupdatescrninitialize")]
      [HttpPost]
      public Areceupdatescrnsingle ARECEUpdateScrnInitialize(Areceupdatescrncriteria areceupdatescrncriteria)
      {
         return this.repository.ARECEUpdateScrnInitialize(areceupdatescrncriteria);
      } 
  
      
      [Route("areceupdatescrnok")]
      [HttpPost]
      public Areceupdatescrnoutput ARECEUpdateScrnOK(AsarentryARECEUpdateScrnOKRequestAPI AsarentryARECEUpdateScrnOKRequestAPI)
      {
         return this.repository.ARECEUpdateScrnOK(AsarentryARECEUpdateScrnOKRequestAPI);
      } 
  
      
      [Route("arecewoadd")]
      [HttpPost]
      public AsarentryARECEWOAddResponseAPI ARECEWOAdd(AsarentryARECEWOAddRequestAPI AsarentryARECEWOAddRequestAPI)
      {
         return this.repository.ARECEWOAdd(AsarentryARECEWOAddRequestAPI);
      } 
  
      
      [Route("arecewocancel")]
      [HttpPost]
      public AsarentryARECEWOCancelResponseAPI ARECEWOCancel(AsarentryARECEWOCancelRequestAPI AsarentryARECEWOCancelRequestAPI)
      {
         return this.repository.ARECEWOCancel(AsarentryARECEWOCancelRequestAPI);
      } 
  
      
      [Route("arecewofieldleave")]
      [HttpPost]
      public AsarentryARECEWOFieldLeaveResponseAPI ARECEWOFieldLeave(AsarentryARECEWOFieldLeaveRequestAPI AsarentryARECEWOFieldLeaveRequestAPI)
      {
         return this.repository.ARECEWOFieldLeave(AsarentryARECEWOFieldLeaveRequestAPI);
      } 
  
      
      [Route("arecewoinitialize")]
      [HttpPost]
      public AsarentryARECEWOInitializeResponseAPI ARECEWOInitialize(AsarentryARECEWOInitializeRequestAPI AsarentryARECEWOInitializeRequestAPI)
      {
         return this.repository.ARECEWOInitialize(AsarentryARECEWOInitializeRequestAPI);
      } 
  
      
      [Route("arecewook")]
      [HttpPost]
      public AsarentryARECEWOOKResponseAPI ARECEWOOK(AsarentryARECEWOOKRequestAPI AsarentryARECEWOOKRequestAPI)
      {
         return this.repository.ARECEWOOK(AsarentryARECEWOOKRequestAPI);
      } 
  
      
      [Route("arecewowriteofftax")]
      [HttpPost]
      public AsarentryARECEWOWriteoffTaxResponseAPI ARECEWOWriteoffTax(AsarentryARECEWOWriteoffTaxRequestAPI AsarentryARECEWOWriteoffTaxRequestAPI)
      {
         return this.repository.ARECEWOWriteoffTax(AsarentryARECEWOWriteoffTaxRequestAPI);
      } 
  
      
      [Route("arelearetadd")]
      [HttpPost]
      public AsarentryARELEAretAddResponseAPI ARELEAretAdd(AsarentryARELEAretAddRequestAPI AsarentryARELEAretAddRequestAPI)
      {
         return this.repository.ARELEAretAdd(AsarentryARELEAretAddRequestAPI);
      } 
  
      
      [Route("arelearetload")]
      [HttpPost]
      public AsarentryARELEAretLoadResponseAPI ARELEAretLoad(Arelearetcriteria arelearetcriteria)
      {
         return this.repository.ARELEAretLoad(arelearetcriteria);
      } 
  
      
      [Route("arelecalcproof")]
      [HttpPost]
      public Arelecheckhdr ARELECalcProof(AsarentryARELECalcProofRequestAPI AsarentryARELECalcProofRequestAPI)
      {
         return this.repository.ARELECalcProof(AsarentryARELECalcProofRequestAPI);
      } 
  
      
      [Route("arelecheckload/{cBatch}/{dCustno:decimal}/{iCheckNo:int}/{iSecure:int}")]
      [HttpGet]
      public AsarentryARELECheckLoadResponseAPI ARELECheckLoad(string cBatch, decimal dCustno, int iCheckNo, int iSecure)
      {
         return this.repository.ARELECheckLoad(cBatch, dCustno, iCheckNo, iSecure);
      } 
  
      
      [Route("arelechecksaveverify")]
      [HttpPost]
      public AsarentryARELECheckSaveVerifyResponseAPI ARELECheckSaveVerify(AsarentryARELECheckSaveVerifyRequestAPI AsarentryARELECheckSaveVerifyRequestAPI)
      {
         return this.repository.ARELECheckSaveVerify(AsarentryARELECheckSaveVerifyRequestAPI);
      } 
  
      
      [Route("arelechecksavefinal")]
      [HttpPost]
      public AsarentryARELECheckSaveFinalResponseAPI ARELECheckSaveFinal(AsarentryARELECheckSaveFinalRequestAPI AsarentryARELECheckSaveFinalRequestAPI)
      {
         return this.repository.ARELECheckSaveFinal(AsarentryARELECheckSaveFinalRequestAPI);
      } 
  
      
      [Route("arelecustomerchange")]
      [HttpPost]
      public AsarentryARELECustomerChangeResponseAPI ARELECustomerChange(AsarentryARELECustomerChangeRequestAPI AsarentryARELECustomerChangeRequestAPI)
      {
         return this.repository.ARELECustomerChange(AsarentryARELECustomerChangeRequestAPI);
      } 
  
      
      [Route("areledebitadd")]
      [HttpPost]
      public AsarentryARELEDebitAddResponseAPI ARELEDebitAdd(AsarentryARELEDebitAddRequestAPI AsarentryARELEDebitAddRequestAPI)
      {
         return this.repository.ARELEDebitAdd(AsarentryARELEDebitAddRequestAPI);
      } 
  
      
      [Route("areledtlchargebackreason")]
      [HttpPost]
      public Arelecheckdtl ARELEDtlChargeBackReason(Arelecheckdtl arelecheckdtl)
      {
         return this.repository.ARELEDtlChargeBackReason(arelecheckdtl);
      } 
  
      
      [Route("areledtlrecalldiscount")]
      [HttpPost]
      public AsarentryARELEDtlRecallDiscountResponseAPI ARELEDtlRecallDiscount(AsarentryARELEDtlRecallDiscountRequestAPI AsarentryARELEDtlRecallDiscountRequestAPI)
      {
         return this.repository.ARELEDtlRecallDiscount(AsarentryARELEDtlRecallDiscountRequestAPI);
      } 
  
      
      [Route("areledtlrowentry")]
      [HttpPost]
      public AsarentryARELEDtlRowEntryResponseAPI ARELEDtlRowEntry(AsarentryARELEDtlRowEntryRequestAPI AsarentryARELEDtlRowEntryRequestAPI)
      {
         return this.repository.ARELEDtlRowEntry(AsarentryARELEDtlRowEntryRequestAPI);
      } 
  
      
      [Route("areledtlrowleavefinal")]
      [HttpPost]
      public AsarentryARELEDtlRowLeaveFinalResponseAPI ARELEDtlRowLeaveFinal(AsarentryARELEDtlRowLeaveFinalRequestAPI AsarentryARELEDtlRowLeaveFinalRequestAPI)
      {
         return this.repository.ARELEDtlRowLeaveFinal(AsarentryARELEDtlRowLeaveFinalRequestAPI);
      } 
  
      
      [Route("areledtlrowleaveverify")]
      [HttpPost]
      public AsarentryARELEDtlRowLeaveVerifyResponseAPI ARELEDtlRowLeaveVerify(AsarentryARELEDtlRowLeaveVerifyRequestAPI AsarentryARELEDtlRowLeaveVerifyRequestAPI)
      {
         return this.repository.ARELEDtlRowLeaveVerify(AsarentryARELEDtlRowLeaveVerifyRequestAPI);
      } 
  
      
      [Route("areledtlsuspendunsuspend")]
      [HttpPost]
      public Arelecheckdtl ARELEDtlSuspendUnsuspend(Arelecheckdtl arelecheckdtl)
      {
         return this.repository.ARELEDtlSuspendUnsuspend(arelecheckdtl);
      } 
  
      
      [Route("areledtlundochanges")]
      [HttpPost]
      public AsarentryARELEDtlUndoChangesResponseAPI ARELEDtlUndoChanges(AsarentryARELEDtlUndoChangesRequestAPI AsarentryARELEDtlUndoChangesRequestAPI)
      {
         return this.repository.ARELEDtlUndoChanges(AsarentryARELEDtlUndoChangesRequestAPI);
      } 
  
      
      [Route("areledtlwofinal")]
      [HttpPost]
      public AsarentryARELEDtlWOFinalResponseAPI ARELEDtlWOFinal(AsarentryARELEDtlWOFinalRequestAPI AsarentryARELEDtlWOFinalRequestAPI)
      {
         return this.repository.ARELEDtlWOFinal(AsarentryARELEDtlWOFinalRequestAPI);
      } 
  
      
      [Route("areledtlwosetup")]
      [HttpPost]
      public AsarentryARELEDtlWOSetupResponseAPI ARELEDtlWOSetup(AsarentryARELEDtlWOSetupRequestAPI AsarentryARELEDtlWOSetupRequestAPI)
      {
         return this.repository.ARELEDtlWOSetup(AsarentryARELEDtlWOSetupRequestAPI);
      } 
  
      
      [Route("arelehdrrecalldiscount")]
      [HttpPost]
      public AsarentryARELEHdrRecallDiscountResponseAPI ARELEHdrRecallDiscount(AsarentryARELEHdrRecallDiscountRequestAPI AsarentryARELEHdrRecallDiscountRequestAPI)
      {
         return this.repository.ARELEHdrRecallDiscount(AsarentryARELEHdrRecallDiscountRequestAPI);
      } 
  
      
      [Route("arelehdrsuspendunsuspend")]
      [HttpPost]
      public Arelecheckhdr ARELEHdrSuspendUnsuspend(AsarentryARELEHdrSuspendUnsuspendRequestAPI AsarentryARELEHdrSuspendUnsuspendRequestAPI)
      {
         return this.repository.ARELEHdrSuspendUnsuspend(AsarentryARELEHdrSuspendUnsuspendRequestAPI);
      } 
  
      
      [Route("arembapply")]
      [HttpPost]
      public Arembsingle AREMBApply(Arembsingle arembsingle)
      {
         return this.repository.AREMBApply(arembsingle);
      } 
  
      
      [Route("arembretrieve")]
      [HttpPost]
      public IEnumerable<Arembsingle> AREMBRetrieve(AsarentryAREMBRetrieveRequestAPI AsarentryAREMBRetrieveRequestAPI)
      {
         return this.repository.AREMBRetrieve(AsarentryAREMBRetrieveRequestAPI);
      } 
  
      
      [Route("arembupdate")]
      [HttpPost]
      public Arembsingle AREMBUpdate(Arembsingle arembsingle)
      {
         return this.repository.AREMBUpdate(arembsingle);
      } 
  
      
      [Route("aretcminitiate/{pvRecidARET:long}/{pvIpOrigAmt:decimal}/{pvIpOrigDisc:decimal}/{pvDPostDt:DateTime?}")]
      [HttpGet]
      public AsarentryARETCMInitiateResponseAPI ARETCMInitiate(long pvRecidARET, decimal pvIpOrigAmt, decimal pvIpOrigDisc, DateTime? pvDPostDt)
      {
         return this.repository.ARETCMInitiate(pvRecidARET, pvIpOrigAmt, pvIpOrigDisc, pvDPostDt);
      } 
  
      
      [Route("aretcmrowleave")]
      [HttpPost]
      public AsarentryARETCMRowLeaveResponseAPI ARETCMRowLeave(AsarentryARETCMRowLeaveRequestAPI AsarentryARETCMRowLeaveRequestAPI)
      {
         return this.repository.ARETCMRowLeave(AsarentryARETCMRowLeaveRequestAPI);
      } 
  
      
      [Route("aretcmupdate")]
      [HttpPost]
      public AsarentryARETCMUpdateResponseAPI ARETCMUpdate(AsarentryARETCMUpdateRequestAPI AsarentryARETCMUpdateRequestAPI)
      {
         return this.repository.ARETCMUpdate(AsarentryARETCMUpdateRequestAPI);
      } 
  
      
      [Route("aretfortranscdload/{iTransCd:int}")]
      [HttpGet]
      public IEnumerable<Aretfortranscdload> ARETForTransCdLoad(int iTransCd)
      {
         return this.repository.ARETForTransCdLoad(iTransCd);
      } 
  
      
      [Route("aretfortranscdvaluechanged")]
      [HttpPost]
      public Arettrans ARETForTransCdValueChanged(Arettrans arettrans)
      {
         return this.repository.ARETForTransCdValueChanged(arettrans);
      } 
  
      
      [Route("aretinitiate/{iJrnlNo:int}")]
      [HttpGet]
      public Arettrans ARETInitiate(int iJrnlNo)
      {
         return this.repository.ARETInitiate(iJrnlNo);
      } 
  
      
      [Route("aretinvnosufvaluechanged")]
      [HttpPost]
      public Arettrans ARETInvNoSufValueChanged(Arettrans arettrans)
      {
         return this.repository.ARETInvNoSufValueChanged(arettrans);
      } 
  
      
      [Route("aretlistbuild/{iJrnlNo:int}/{iSetNo:int}")]
      [HttpGet]
      public IEnumerable<Aretlist> ARETListBuild(int iJrnlNo, int iSetNo)
      {
         return this.repository.ARETListBuild(iJrnlNo, iSetNo);
      } 
  
      
      [Route("aretmanualtermsprocess")]
      [HttpPost]
      public AsarentryARETManualTermsProcessResponseAPI ARETManualTermsProcess(AsarentryARETManualTermsProcessRequestAPI AsarentryARETManualTermsProcessRequestAPI)
      {
         return this.repository.ARETManualTermsProcess(AsarentryARETManualTermsProcessRequestAPI);
      } 
  
      
      [Route("aretrefervaluechanged")]
      [HttpPost]
      public Arettrans ARETReferValueChanged(Arettrans arettrans)
      {
         return this.repository.ARETReferValueChanged(arettrans);
      } 
  
      
      [Route("aretsplitpayinitiate")]
      [HttpPost]
      public AsarentryARETSplitPayInitiateResponseAPI ARETSplitPayInitiate(AsarentryARETSplitPayInitiateRequestAPI AsarentryARETSplitPayInitiateRequestAPI)
      {
         return this.repository.ARETSplitPayInitiate(AsarentryARETSplitPayInitiateRequestAPI);
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
  