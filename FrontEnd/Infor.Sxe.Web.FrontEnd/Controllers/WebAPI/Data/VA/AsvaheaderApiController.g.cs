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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.VA
{  
   using Sxe.VA.Data.Models.PdsContext;
   using Sxe.VA.Data.Models.Pdsvaordercfg;
   using Sxe.VA.Data.Models.Pdsvaorderdelete;
   using Sxe.VA.Data.Models.Pdsmessaging;
   using Sxe.VA.Data.Models.Pdstiecreatetiett;
   using Sxe.VA.Data.Models.Pdsvaheaderaddchg;
   using Sxe.VA.Data.Models.Pdsvaheaderlist;
   using Sxe.VA.Data.Models.Pdsvaheadersettings;
   using Sxe.VA.Data.Models.Pdsvanonstockvalidate;
   using Sxe.VA.Data.Models.Pdsvaheadercopy;
   using Sxe.VA.Data.Models.Pdsvaheaderprint;
   using Sxe.VA.Data.Models.Pdsvaheaderextrafields;
   using Sxe.VA.Data.Models.Pdsvaheaderallcomponent;
   using Sxe.VA.Data.Models.Complex;
   using Sxe.VA.Data.Repositories;
    
   [RoutePrefix("api/va/asvaheader")]
   public partial class AsvaheaderApiController : ApiControllerBase
   {
      private readonly AsvaheaderRepository repository;
    
      public AsvaheaderApiController(AsvaheaderRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("vaordercfgexecfunc")]
      [HttpPost]
      public AsvaheaderVAOrderCfgExecFuncResponseAPI VAOrderCfgExecFunc(Vaordercfg vaordercfg)
      {
         return this.repository.VAOrderCfgExecFunc(vaordercfg);
      } 
  
      
      [Route("vaordercfgfinish")]
      [HttpPost]
      public bool VAOrderCfgFinish(Vaordercfg vaordercfg)
      {
         return this.repository.VAOrderCfgFinish(vaordercfg);
      } 
  
      
      [Route("vaordercfglaunch")]
      [HttpPost]
      public string VAOrderCfgLaunch(Vaordercfg vaordercfg)
      {
         return this.repository.VAOrderCfgLaunch(vaordercfg);
      } 
  
      
      [Route("vadeleteorder")]
      [HttpPost]
      public IEnumerable<Messaging> VADeleteOrder(Vaorderdelete vaorderdelete)
      {
         return this.repository.VADeleteOrder(vaorderdelete);
      } 
  
      
      [Route("vaheadersoftlock/{pvVano:int}/{pvVasuf:int}")]
      [HttpGet]
      public void VAHeaderSoftLock(int pvVano, int pvVasuf)
      {
         this.repository.VAHeaderSoftLock(pvVano, pvVasuf);
      } 
  
      
      [Route("vaheadersoftlockv2/{pvVano:int}/{pvVasuf:int}/{pvTransproc}")]
      [HttpGet]
      public void VAHeaderSoftLockV2(int pvVano, int pvVasuf, string pvTransproc)
      {
         this.repository.VAHeaderSoftLockV2(pvVano, pvVasuf, pvTransproc);
      } 
  
      
      [Route("vaheaderties")]
      [HttpPost]
      public IEnumerable<Tiecreatetiettresults> VAHeaderTies(Tiecreatetiettcriteria tiecreatetiettcriteria)
      {
         return this.repository.VAHeaderTies(tiecreatetiettcriteria);
      } 
  
      
      [Route("vaheadertieeditvalidate")]
      [HttpPost]
      public AsvaheaderVAHeaderTieEditValidateResponseAPI VAHeaderTieEditValidate(AsvaheaderVAHeaderTieEditValidateRequestAPI AsvaheaderVAHeaderTieEditValidateRequestAPI)
      {
         return this.repository.VAHeaderTieEditValidate(AsvaheaderVAHeaderTieEditValidateRequestAPI);
      } 
  
      
      [Route("vaheadertiefinalupdate")]
      [HttpPost]
      public IEnumerable<Messaging> VAHeaderTieFinalUpdate(AsvaheaderVAHeaderTieFinalUpdateRequestAPI AsvaheaderVAHeaderTieFinalUpdateRequestAPI)
      {
         return this.repository.VAHeaderTieFinalUpdate(AsvaheaderVAHeaderTieFinalUpdateRequestAPI);
      } 
  
      
      [Route("vaheaderaddrecord")]
      [HttpPost]
      public AsvaheaderVAHeaderAddRecordResponseAPI VAHeaderAddRecord(Vaheaderaddchg vaheaderaddchg)
      {
         return this.repository.VAHeaderAddRecord(vaheaderaddchg);
      } 
  
      
      [Route("vaheaderchangerecord")]
      [HttpPost]
      public AsvaheaderVAHeaderChangeRecordResponseAPI VAHeaderChangeRecord(Vaheaderaddchg vaheaderaddchg)
      {
         return this.repository.VAHeaderChangeRecord(vaheaderaddchg);
      } 
  
      
      [Route("vaheaderretrieve")]
      [HttpPost]
      public AsvaheaderVAHeaderRetrieveResponseAPI VAHeaderRetrieve(Vaheaderlistcriteria vaheaderlistcriteria)
      {
         return this.repository.VAHeaderRetrieve(vaheaderlistcriteria);
      } 
  
      
      [Route("vaheaderdetailcheckaccess/{iVANo:int}/{iVASuf:int}")]
      [HttpGet]
      public IEnumerable<Messaging> VAHeaderDetailCheckAccess(int iVANo, int iVASuf)
      {
         return this.repository.VAHeaderDetailCheckAccess(iVANo, iVASuf);
      } 
  
      
      [Route("vaheaderremovesoftlock/{pvVano:int}/{pvVasuf:int}")]
      [HttpGet]
      public void VAHeaderRemoveSoftLock(int pvVano, int pvVasuf)
      {
         this.repository.VAHeaderRemoveSoftLock(pvVano, pvVasuf);
      } 
  
      
      [Route("vaheaderinitialize/{iVANo:int}/{iVASuf:int}")]
      [HttpGet]
      public Vaheaderaddchg VAHeaderInitialize(int iVANo, int iVASuf)
      {
         return this.repository.VAHeaderInitialize(iVANo, iVASuf);
      } 
  
      
      [Route("vaheaderleavefield")]
      [HttpPost]
      public Vaheaderaddchg VAHeaderLeaveField(AsvaheaderVAHeaderLeaveFieldRequestAPI AsvaheaderVAHeaderLeaveFieldRequestAPI)
      {
         return this.repository.VAHeaderLeaveField(AsvaheaderVAHeaderLeaveFieldRequestAPI);
      } 
  
      
      [Route("vaheadergetsettings")]
      [HttpGet]
      public Vaheadersettings VAHeaderGetSettings()
      {
         return this.repository.VAHeaderGetSettings();
      } 
  
      
      [Route("vaheadersetsettings")]
      [HttpPost]
      public void VAHeaderSetSettings(Vaheadersettings vaheadersettings)
      {
         this.repository.VAHeaderSetSettings(vaheadersettings);
      } 
  
      
      [Route("vaheadernonstockval")]
      [HttpPost]
      public Vanonstockvalidate VAHeaderNonStockVal(Vanonstockvalidate vanonstockvalidate)
      {
         return this.repository.VAHeaderNonStockVal(vanonstockvalidate);
      } 
  
      
      [Route("vaheaderquickentry")]
      [HttpPost]
      public Vaheaderlistresults VAHeaderQuickEntry(Vaheaderlistcriteria vaheaderlistcriteria)
      {
         return this.repository.VAHeaderQuickEntry(vaheaderlistcriteria);
      } 
  
      
      [Route("vaheadercopyretrieve/{pvVano:int}/{pvVasuf:int}")]
      [HttpGet]
      public Vaheadercopy VAHeaderCopyRetrieve(int pvVano, int pvVasuf)
      {
         return this.repository.VAHeaderCopyRetrieve(pvVano, pvVasuf);
      } 
  
      
      [Route("vaheadercopyleavefield")]
      [HttpPost]
      public Vaheadercopy VAHeaderCopyLeaveField(AsvaheaderVAHeaderCopyLeaveFieldRequestAPI AsvaheaderVAHeaderCopyLeaveFieldRequestAPI)
      {
         return this.repository.VAHeaderCopyLeaveField(AsvaheaderVAHeaderCopyLeaveFieldRequestAPI);
      } 
  
      
      [Route("vaheadercopycreate")]
      [HttpPost]
      public AsvaheaderVAHeaderCopyCreateResponseAPI VAHeaderCopyCreate(Vaheadercopy vaheadercopy)
      {
         return this.repository.VAHeaderCopyCreate(vaheadercopy);
      } 
  
      
      [Route("vaheaderprintinitialize/{pvVano:int}/{pvVasuf:int}")]
      [HttpGet]
      public IEnumerable<Vaheaderprint> VAHeaderPrintInitialize(int pvVano, int pvVasuf)
      {
         return this.repository.VAHeaderPrintInitialize(pvVano, pvVasuf);
      } 
  
      
      [Route("vaheaderprintrun")]
      [HttpPost]
      public IEnumerable<Messaging> VAHeaderPrintRun(AsvaheaderVAHeaderPrintRunRequestAPI AsvaheaderVAHeaderPrintRunRequestAPI)
      {
         return this.repository.VAHeaderPrintRun(AsvaheaderVAHeaderPrintRunRequestAPI);
      } 
  
      
      [Route("vaheaderdetailload/{pvVano:int}/{pvVasuf:int}")]
      [HttpGet]
      public AsvaheaderVAHeaderDetailLoadResponseAPI VAHeaderDetailLoad(int pvVano, int pvVasuf)
      {
         return this.repository.VAHeaderDetailLoad(pvVano, pvVasuf);
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
  