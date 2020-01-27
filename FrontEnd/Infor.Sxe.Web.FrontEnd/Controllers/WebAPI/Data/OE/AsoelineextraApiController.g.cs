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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.OE
{  
   using Sxe.OE.Data.Models.PdsContext;
   using Sxe.OE.Data.Models.Pdsehfeecriteria;
   using Sxe.OE.Data.Models.Pdsehfeeresults;
   using Sxe.OE.Data.Models.Pdsoeline;
   using Sxe.OE.Data.Models.Pdsoeonetimecost;
   using Sxe.OE.Data.Models.Pdsmessaging;
   using Sxe.OE.Data.Models.Pdsoeonetimerebate;
   using Sxe.OE.Data.Models.Pdsoelineicspclookup;
   using Sxe.OE.Data.Models.Pdsoelinelinetiehdr;
   using Sxe.OE.Data.Models.Pdsoelinelinetie;
   using Sxe.OE.Data.Models.Pdscorereturntype;
   using Sxe.OE.Data.Models.Pdscorereturnautoalloc;
   using Sxe.OE.Data.Models.Pdscoreallocation;
   using Sxe.OE.Data.Models.Pdscoreallocationupdate;
   using Sxe.OE.Data.Models.Pdscoreserials;
   using Sxe.OE.Data.Models.Pdsmultilinesourcing;
   using Sxe.OE.Data.Models.Pdsloadtcomps;
   using Sxe.OE.Data.Models.Pdskitcreatedetailstt;
   using Sxe.OE.Data.Models.Pdsloadoelinesettings;
   using Sxe.OE.Data.Models.Pdsoeheaderretrieve;
   using Sxe.OE.Data.Models.Pdsoecalcordshptot;
   using Sxe.OE.Data.Models.Pdsoeiolines;
   using Sxe.OE.Data.Models.Pdsoehdr;
   using Sxe.OE.Data.Models.Pdswlstatus;
   using Sxe.OE.Data.Models.Pdsoelinepricing;
   using Sxe.OE.Data.Models.Pdsoemultilinecreate;
   using Sxe.OE.Data.Models.Pdsoelinetiedvaord;
   using Sxe.OE.Data.Models.Pdsoelostbusinesslines;
   using Sxe.OE.Data.Models.Pdsoelinesuperavail;
   using Sxe.OE.Data.Models.Pdsoelinerebate;
   using Sxe.OE.Data.Models.Pdsoeonetimerebleavefield;
   using Sxe.OE.Data.Models.Complex;
   using Sxe.OE.Data.Repositories;
    
   [RoutePrefix("api/oe/asoelineextra")]
   public partial class AsoelineextraApiController : ApiControllerBase
   {
      private readonly AsoelineextraRepository repository;
    
      public AsoelineextraApiController(AsoelineextraRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("oegetdefaultehfee")]
      [HttpPost]
      public Ehfeeresults OEGetDefaultEHFee(Ehfeecriteria ehfeecriteria)
      {
         return this.repository.OEGetDefaultEHFee(ehfeecriteria);
      } 
  
      
      [Route("oeonetimecostinit")]
      [HttpPost]
      public AsoelineextraOEOneTimeCostInitResponseAPI OEOneTimeCostInit(AsoelineextraOEOneTimeCostInitRequestAPI AsoelineextraOEOneTimeCostInitRequestAPI)
      {
         return this.repository.OEOneTimeCostInit(AsoelineextraOEOneTimeCostInitRequestAPI);
      } 
  
      
      [Route("oeonetimecostleavefield")]
      [HttpPost]
      public AsoelineextraOEOneTimeCostLeaveFieldResponseAPI OEOneTimeCostLeaveField(AsoelineextraOEOneTimeCostLeaveFieldRequestAPI AsoelineextraOEOneTimeCostLeaveFieldRequestAPI)
      {
         return this.repository.OEOneTimeCostLeaveField(AsoelineextraOEOneTimeCostLeaveFieldRequestAPI);
      } 
  
      
      [Route("oeonetimecostupdt")]
      [HttpPost]
      public AsoelineextraOEOneTimeCostUpdtResponseAPI OEOneTimeCostUpdt(AsoelineextraOEOneTimeCostUpdtRequestAPI AsoelineextraOEOneTimeCostUpdtRequestAPI)
      {
         return this.repository.OEOneTimeCostUpdt(AsoelineextraOEOneTimeCostUpdtRequestAPI);
      } 
  
      
      [Route("oeonetimerebateinit")]
      [HttpPost]
      public AsoelineextraOEOneTimeRebateInitResponseAPI OEOneTimeRebateInit(Oeline oeline)
      {
         return this.repository.OEOneTimeRebateInit(oeline);
      } 
  
      
      [Route("oeonetimerebateupdt")]
      [HttpPost]
      public AsoelineextraOEOneTimeRebateUpdtResponseAPI OEOneTimeRebateUpdt(AsoelineextraOEOneTimeRebateUpdtRequestAPI AsoelineextraOEOneTimeRebateUpdtRequestAPI)
      {
         return this.repository.OEOneTimeRebateUpdt(AsoelineextraOEOneTimeRebateUpdtRequestAPI);
      } 
  
      
      [Route("oelineicspcload")]
      [HttpPost]
      public AsoelineextraOELineICSPCLoadResponseAPI OELineICSPCLoad(Oelineicspccriteria oelineicspccriteria)
      {
         return this.repository.OELineICSPCLoad(oelineicspccriteria);
      } 
  
      
      [Route("oelineicspcupdate")]
      [HttpPost]
      public AsoelineextraOELineICSPCUpdateResponseAPI OELineICSPCUpdate(AsoelineextraOELineICSPCUpdateRequestAPI AsoelineextraOELineICSPCUpdateRequestAPI)
      {
         return this.repository.OELineICSPCUpdate(AsoelineextraOELineICSPCUpdateRequestAPI);
      } 
  
      
      [Route("oelinecomptieupdate")]
      [HttpPost]
      public IEnumerable<Messaging> OELineCompTieUpdate(AsoelineextraOELineCompTieUpdateRequestAPI AsoelineextraOELineCompTieUpdateRequestAPI)
      {
         return this.repository.OELineCompTieUpdate(AsoelineextraOELineCompTieUpdateRequestAPI);
      } 
  
      
      [Route("corereturntypeinit")]
      [HttpPost]
      public Corereturntype CoreReturnTypeInit(Corereturntype corereturntype)
      {
         return this.repository.CoreReturnTypeInit(corereturntype);
      } 
  
      
      [Route("corereturntypechangetype")]
      [HttpPost]
      public Corereturntype CoreReturnTypeChangeType(Corereturntype corereturntype)
      {
         return this.repository.CoreReturnTypeChangeType(corereturntype);
      } 
  
      
      [Route("corereturntypeupdate")]
      [HttpPost]
      public AsoelineextraCoreReturnTypeUpdateResponseAPI CoreReturnTypeUpdate(Corereturntype corereturntype)
      {
         return this.repository.CoreReturnTypeUpdate(corereturntype);
      } 
  
      
      [Route("corereturnautoallocate")]
      [HttpPost]
      public bool CoreReturnAutoAllocate(Corereturnautoalloc corereturnautoalloc)
      {
         return this.repository.CoreReturnAutoAllocate(corereturnautoalloc);
      } 
  
      
      [Route("coreallocationload")]
      [HttpPost]
      public AsoelineextraCoreAllocationLoadResponseAPI CoreAllocationLoad(Coreallocationcriteria coreallocationcriteria)
      {
         return this.repository.CoreAllocationLoad(coreallocationcriteria);
      } 
  
      
      [Route("coreallocationupdate")]
      [HttpPost]
      public AsoelineextraCoreAllocationUpdateResponseAPI CoreAllocationUpdate(AsoelineextraCoreAllocationUpdateRequestAPI AsoelineextraCoreAllocationUpdateRequestAPI)
      {
         return this.repository.CoreAllocationUpdate(AsoelineextraCoreAllocationUpdateRequestAPI);
      } 
  
      
      [Route("coreserialsadd")]
      [HttpPost]
      public AsoelineextraCoreSerialsAddResponseAPI CoreSerialsAdd(AsoelineextraCoreSerialsAddRequestAPI AsoelineextraCoreSerialsAddRequestAPI)
      {
         return this.repository.CoreSerialsAdd(AsoelineextraCoreSerialsAddRequestAPI);
      } 
  
      
      [Route("coreserialsdelete")]
      [HttpPost]
      public AsoelineextraCoreSerialsDeleteResponseAPI CoreSerialsDelete(AsoelineextraCoreSerialsDeleteRequestAPI AsoelineextraCoreSerialsDeleteRequestAPI)
      {
         return this.repository.CoreSerialsDelete(AsoelineextraCoreSerialsDeleteRequestAPI);
      } 
  
      
      [Route("coreserialsload")]
      [HttpPost]
      public AsoelineextraCoreSerialsLoadResponseAPI CoreSerialsLoad(Coreserialscriteria coreserialscriteria)
      {
         return this.repository.CoreSerialsLoad(coreserialscriteria);
      } 
  
      
      [Route("oemulticompsourcingprevalidate")]
      [HttpPost]
      public Multilinesourcing OEMultiCompSourcingPreValidate(AsoelineextraOEMultiCompSourcingPreValidateRequestAPI AsoelineextraOEMultiCompSourcingPreValidateRequestAPI)
      {
         return this.repository.OEMultiCompSourcingPreValidate(AsoelineextraOEMultiCompSourcingPreValidateRequestAPI);
      } 
  
      
      [Route("oemulticompsourcingupdate")]
      [HttpPost]
      public AsoelineextraOEMultiCompSourcingUpdateResponseAPI OEMultiCompSourcingUpdate(AsoelineextraOEMultiCompSourcingUpdateRequestAPI AsoelineextraOEMultiCompSourcingUpdateRequestAPI)
      {
         return this.repository.OEMultiCompSourcingUpdate(AsoelineextraOEMultiCompSourcingUpdateRequestAPI);
      } 
  
      
      [Route("oecompaddtieleavefield")]
      [HttpPost]
      public AsoelineextraOECompAddTieLeaveFieldResponseAPI OECompAddTieLeaveField(AsoelineextraOECompAddTieLeaveFieldRequestAPI AsoelineextraOECompAddTieLeaveFieldRequestAPI)
      {
         return this.repository.OECompAddTieLeaveField(AsoelineextraOECompAddTieLeaveFieldRequestAPI);
      } 
  
      
      [Route("oecompaddtievalidate")]
      [HttpPost]
      public AsoelineextraOECompAddTieValidateResponseAPI OECompAddTieValidate(AsoelineextraOECompAddTieValidateRequestAPI AsoelineextraOECompAddTieValidateRequestAPI)
      {
         return this.repository.OECompAddTieValidate(AsoelineextraOECompAddTieValidateRequestAPI);
      } 
  
      
      [Route("loadoelinesettings")]
      [HttpGet]
      public Loadoelinesettings LoadOELineSettings()
      {
         return this.repository.LoadOELineSettings();
      } 
  
      
      [Route("oegetorderdata")]
      [HttpPost]
      public AsoelineextraOEGetOrderDataResponseAPI OEGetOrderData(AsoelineextraOEGetOrderDataRequestAPI AsoelineextraOEGetOrderDataRequestAPI)
      {
         return this.repository.OEGetOrderData(AsoelineextraOEGetOrderDataRequestAPI);
      } 
  
      
      [Route("oelinequickadd")]
      [HttpPost]
      public AsoelineextraOELineQuickAddResponseAPI OELineQuickAdd(AsoelineextraOELineQuickAddRequestAPI AsoelineextraOELineQuickAddRequestAPI)
      {
         return this.repository.OELineQuickAdd(AsoelineextraOELineQuickAddRequestAPI);
      } 
  
      
      [Route("oelinetiedvaord")]
      [HttpPost]
      public Oelinetiedvaord OELineTiedVAOrd(Oelinetiedvaord oelinetiedvaord)
      {
         return this.repository.OELineTiedVAOrd(oelinetiedvaord);
      } 
  
      
      [Route("oelostbusinesslines")]
      [HttpPost]
      public void OELostBusinessLines(Oelostbusinesslines oelostbusinesslines)
      {
         this.repository.OELostBusinessLines(oelostbusinesslines);
      } 
  
      
      [Route("oelinecorrectionvalidate")]
      [HttpPost]
      public AsoelineextraOelinecorrectionvalidateResponseAPI Oelinecorrectionvalidate(Oeline oeline)
      {
         return this.repository.Oelinecorrectionvalidate(oeline);
      } 
  
      
      [Route("oelinesubavailinit")]
      [HttpPost]
      public AsoelineextraOelinesubavailinitResponseAPI Oelinesubavailinit(Oeline oeline)
      {
         return this.repository.Oelinesubavailinit(oeline);
      } 
  
      
      [Route("oelinerebate")]
      [HttpPost]
      public Oelinerebateresults Oelinerebate(Oelinerebatecriteria oelinerebatecriteria)
      {
         return this.repository.Oelinerebate(oelinerebatecriteria);
      } 
  
      
      [Route("oelinemarginleave")]
      [HttpPost]
      public decimal OELineMarginLeave(Oeline oeline)
      {
         return this.repository.OELineMarginLeave(oeline);
      } 
  
      
      [Route("oeonetimerebleavefield")]
      [HttpPost]
      public Oeonetimerebate OEOneTimeRebLeaveField(AsoelineextraOEOneTimeRebLeaveFieldRequestAPI AsoelineextraOEOneTimeRebLeaveFieldRequestAPI)
      {
         return this.repository.OEOneTimeRebLeaveField(AsoelineextraOEOneTimeRebLeaveFieldRequestAPI);
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
  