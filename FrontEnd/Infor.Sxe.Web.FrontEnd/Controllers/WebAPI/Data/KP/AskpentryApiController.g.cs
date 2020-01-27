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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.KP
{  
   using Sxe.KP.Data.Models.PdsContext;
   using Sxe.KP.Data.Models.Pdsoelinelinetiehdr;
   using Sxe.KP.Data.Models.Pdsoelinelinetie;
   using Sxe.KP.Data.Models.Pdsmessaging;
   using Sxe.KP.Data.Models.Pdskpewselected;
   using Sxe.KP.Data.Models.Pdsicentrylots;
   using Sxe.KP.Data.Models.Pdsicentryserials;
   using Sxe.KP.Data.Models.Pdskpewload;
   using Sxe.KP.Data.Models.Pdskpewextend;
   using Sxe.KP.Data.Models.Pdskpewfinal;
   using Sxe.KP.Data.Models.Pdskpewprint;
   using Sxe.KP.Data.Models.Pdsprintersettings;
   using Sxe.KP.Data.Models.Pdskpewactions;
   using Sxe.KP.Data.Models.Pdskpewavail;
   using Sxe.KP.Data.Models.Pdskpewties;
   using Sxe.KP.Data.Models.Pdskpewupdate;
   using Sxe.KP.Data.Models.Pdskpeuupdate;
   using Sxe.KP.Data.Models.Pdskpworkorder;
   using Sxe.KP.Data.Models.Pdskpqentry;
   using Sxe.KP.Data.Models.Pdskpworkorderlist;
   using Sxe.KP.Data.Models.Pdsmultilinesourcing;
   using Sxe.KP.Data.Models.Pdsloadtcomps;
   using Sxe.KP.Data.Models.Pdskitcreatedetailstt;
   using Sxe.KP.Data.Models.Complex;
   using Sxe.KP.Data.Repositories;
    
   [RoutePrefix("api/kp/askpentry")]
   public partial class AskpentryApiController : ApiControllerBase
   {
      private readonly AskpentryRepository repository;
    
      public AskpentryApiController(AskpentryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("kpcomptieleavefield")]
      [HttpPost]
      public AskpentryKPCompTieLeaveFieldResponseAPI KPCompTieLeaveField(AskpentryKPCompTieLeaveFieldRequestAPI AskpentryKPCompTieLeaveFieldRequestAPI)
      {
         return this.repository.KPCompTieLeaveField(AskpentryKPCompTieLeaveFieldRequestAPI);
      } 
  
      
      [Route("kpcomptieretrieve")]
      [HttpPost]
      public IEnumerable<Oelinelinetie> KPCompTieRetrieve(Oelinelinetiehdr oelinelinetiehdr)
      {
         return this.repository.KPCompTieRetrieve(oelinelinetiehdr);
      } 
  
      
      [Route("kpcomptieupdate")]
      [HttpPost]
      public IEnumerable<Messaging> KPCompTieUpdate(AskpentryKPCompTieUpdateRequestAPI AskpentryKPCompTieUpdateRequestAPI)
      {
         return this.repository.KPCompTieUpdate(AskpentryKPCompTieUpdateRequestAPI);
      } 
  
      
      [Route("kpcomptievalidate")]
      [HttpPost]
      public AskpentryKPCompTieValidateResponseAPI KPCompTieValidate(AskpentryKPCompTieValidateRequestAPI AskpentryKPCompTieValidateRequestAPI)
      {
         return this.repository.KPCompTieValidate(AskpentryKPCompTieValidateRequestAPI);
      } 
  
      
      [Route("kpewbuildlotcriteria")]
      [HttpPost]
      public Icentrylotscriteria KPEWBuildLotCriteria(Kpewselected kpewselected)
      {
         return this.repository.KPEWBuildLotCriteria(kpewselected);
      } 
  
      
      [Route("kpewbuildserialcriteria")]
      [HttpPost]
      public Icentryserialscriteria KPEWBuildSerialCriteria(Kpewselected kpewselected)
      {
         return this.repository.KPEWBuildSerialCriteria(kpewselected);
      } 
  
      
      [Route("kpewloadtt")]
      [HttpPost]
      public AskpentryKPEWLoadTTResponseAPI KPEWLoadTT(Kpewloadcriteria kpewloadcriteria)
      {
         return this.repository.KPEWLoadTT(kpewloadcriteria);
      } 
  
      
      [Route("kpewextendinit")]
      [HttpPost]
      public Kpewextend KPEWExtendInit(Kpewselected kpewselected)
      {
         return this.repository.KPEWExtendInit(kpewselected);
      } 
  
      
      [Route("kpewextendupdt")]
      [HttpPost]
      public Kpewextend KPEWExtendUpdt(Kpewextend kpewextend)
      {
         return this.repository.KPEWExtendUpdt(kpewextend);
      } 
  
      
      [Route("kpewfinalinit")]
      [HttpPost]
      public Kpewfinal KPEWFinalInit(Kpewfinal kpewfinal)
      {
         return this.repository.KPEWFinalInit(kpewfinal);
      } 
  
      
      [Route("kpewfinalupdt")]
      [HttpPost]
      public Kpewfinal KPEWFinalUpdt(Kpewfinal kpewfinal)
      {
         return this.repository.KPEWFinalUpdt(kpewfinal);
      } 
  
      
      [Route("kpewprintinit")]
      [HttpPost]
      public Kpewprint KPEWPrintInit(Kpewprint kpewprint)
      {
         return this.repository.KPEWPrintInit(kpewprint);
      } 
  
      
      [Route("kpewprintrun")]
      [HttpPost]
      public Kpewprint KPEWPrintRun(AskpentryKPEWPrintRunRequestAPI AskpentryKPEWPrintRunRequestAPI)
      {
         return this.repository.KPEWPrintRun(AskpentryKPEWPrintRunRequestAPI);
      } 
  
      
      [Route("kpewrowselected")]
      [HttpPost]
      public AskpentryKPEWRowSelectedResponseAPI KPEWRowSelected(Kpewselected kpewselected)
      {
         return this.repository.KPEWRowSelected(kpewselected);
      } 
  
      
      [Route("kpewties")]
      [HttpPost]
      public AskpentryKPEWTiesResponseAPI KPEWTies(Kpewselected kpewselected)
      {
         return this.repository.KPEWTies(kpewselected);
      } 
  
      
      [Route("kpewupdate")]
      [HttpPost]
      public AskpentryKPEWUpdateResponseAPI KPEWUpdate(Kpewselected kpewselected)
      {
         return this.repository.KPEWUpdate(kpewselected);
      } 
  
      
      [Route("kpeuloadtt/{cKitProd}")]
      [HttpGet]
      public AskpentryKPEULoadTTResponseAPI KPEULoadTT(string cKitProd)
      {
         return this.repository.KPEULoadTT(cKitProd);
      } 
  
      
      [Route("kpeuupdate")]
      [HttpPost]
      public void KPEUUpdate(Kpeuupdate kpeuupdate)
      {
         this.repository.KPEUUpdate(kpeuupdate);
      } 
  
      
      [Route("kpworkordercancel")]
      [HttpPost]
      public Kpworkorder KPWorkOrderCancel(Kpworkorder kpworkorder)
      {
         return this.repository.KPWorkOrderCancel(kpworkorder);
      } 
  
      
      [Route("kpworkordercreate")]
      [HttpPost]
      public AskpentryKPWorkOrderCreateResponseAPI KPWorkOrderCreate(Kpqentrycriteria kpqentrycriteria)
      {
         return this.repository.KPWorkOrderCreate(kpqentrycriteria);
      } 
  
      
      [Route("kpworkorderupdate")]
      [HttpPost]
      public AskpentryKPWorkOrderUpdateResponseAPI KPWorkOrderUpdate(AskpentryKPWorkOrderUpdateRequestAPI AskpentryKPWorkOrderUpdateRequestAPI)
      {
         return this.repository.KPWorkOrderUpdate(AskpentryKPWorkOrderUpdateRequestAPI);
      } 
  
      
      [Route("kpmulticompsourcingprevalidate")]
      [HttpPost]
      public Multilinesourcing KPMultiCompSourcingPreValidate(AskpentryKPMultiCompSourcingPreValidateRequestAPI AskpentryKPMultiCompSourcingPreValidateRequestAPI)
      {
         return this.repository.KPMultiCompSourcingPreValidate(AskpentryKPMultiCompSourcingPreValidateRequestAPI);
      } 
  
      
      [Route("kpmulticompsourcingupdate")]
      [HttpPost]
      public AskpentryKPMultiCompSourcingUpdateResponseAPI KPMultiCompSourcingUpdate(AskpentryKPMultiCompSourcingUpdateRequestAPI AskpentryKPMultiCompSourcingUpdateRequestAPI)
      {
         return this.repository.KPMultiCompSourcingUpdate(AskpentryKPMultiCompSourcingUpdateRequestAPI);
      } 
  
      
      [Route("kpcompaddtieleavefield")]
      [HttpPost]
      public AskpentryKPCompAddTieLeaveFieldResponseAPI KPCompAddTieLeaveField(AskpentryKPCompAddTieLeaveFieldRequestAPI AskpentryKPCompAddTieLeaveFieldRequestAPI)
      {
         return this.repository.KPCompAddTieLeaveField(AskpentryKPCompAddTieLeaveFieldRequestAPI);
      } 
  
      
      [Route("kpcompaddtievalidate")]
      [HttpPost]
      public AskpentryKPCompAddTieValidateResponseAPI KPCompAddTieValidate(AskpentryKPCompAddTieValidateRequestAPI AskpentryKPCompAddTieValidateRequestAPI)
      {
         return this.repository.KPCompAddTieValidate(AskpentryKPCompAddTieValidateRequestAPI);
      } 
  
      
      [Route("kpcompaddupdate")]
      [HttpPost]
      public Oelinelinetie KPCompAddUpdate(AskpentryKPCompAddUpdateRequestAPI AskpentryKPCompAddUpdateRequestAPI)
      {
         return this.repository.KPCompAddUpdate(AskpentryKPCompAddUpdateRequestAPI);
      } 
  
      
      [Route("kpwocreatefieldleave")]
      [HttpPost]
      public Kpworkorder KPWOCreateFieldLeave(AskpentryKPWOCreateFieldLeaveRequestAPI AskpentryKPWOCreateFieldLeaveRequestAPI)
      {
         return this.repository.KPWOCreateFieldLeave(AskpentryKPWOCreateFieldLeaveRequestAPI);
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
  