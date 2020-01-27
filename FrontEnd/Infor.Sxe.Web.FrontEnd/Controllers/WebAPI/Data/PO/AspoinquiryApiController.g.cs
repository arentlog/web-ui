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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.PO
{  
   using Sxe.PO.Data.Models.PdsContext;
   using Sxe.PO.Data.Models.Pdsloadpoaddons;
   using Sxe.PO.Data.Models.Pdsloadpoapdetail;
   using Sxe.PO.Data.Models.Pdsloadpocostact;
   using Sxe.PO.Data.Models.Pdsloadpoheader;
   using Sxe.PO.Data.Models.Pdsloadpoheaderaddlmisc;
   using Sxe.PO.Data.Models.Pdsloadpoheaderaddlwhse;
   using Sxe.PO.Data.Models.Pdsloadpolinedetail;
   using Sxe.PO.Data.Models.Pdsloadpolineext;
   using Sxe.PO.Data.Models.Pdsloadpolinehistory;
   using Sxe.PO.Data.Models.Pdsloadpolinenonstock;
   using Sxe.PO.Data.Models.Pdsloadpoquickview;
   using Sxe.PO.Data.Models.Pdsloadpoquickviewties;
   using Sxe.PO.Data.Models.Pdsloadporetnalloc;
   using Sxe.PO.Data.Models.Pdsloadpotally;
   using Sxe.PO.Data.Models.Pdsloadpototals;
   using Sxe.PO.Data.Models.Pdspoipbuildpolist;
   using Sxe.PO.Data.Models.Pdspoitcheader;
   using Sxe.PO.Data.Models.Pdspoitccomponent;
   using Sxe.PO.Data.Models.Pdspobundles;
   using Sxe.PO.Data.Models.Complex;
   using Sxe.PO.Data.Repositories;
    
   [RoutePrefix("api/po/aspoinquiry")]
   public partial class AspoinquiryApiController : ApiControllerBase
   {
      private readonly AspoinquiryRepository repository;
    
      public AspoinquiryApiController(AspoinquiryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("loadpoaddons")]
      [HttpPost]
      public AspoinquiryLoadPOAddonsResponseAPI LoadPOAddons(Loadpoaddonscriteria loadpoaddonscriteria)
      {
         return this.repository.LoadPOAddons(loadpoaddonscriteria);
      } 
  
      
      [Route("loadpoapdetail")]
      [HttpPost]
      public IEnumerable<Loadpoapdetailresults> LoadPOAPDetail(Loadpoapdetailcriteria loadpoapdetailcriteria)
      {
         return this.repository.LoadPOAPDetail(loadpoapdetailcriteria);
      } 
  
      
      [Route("loadpocostact")]
      [HttpPost]
      public IEnumerable<Loadpocostactresults> LoadPOCostAct(Loadpocostactcriteria loadpocostactcriteria)
      {
         return this.repository.LoadPOCostAct(loadpocostactcriteria);
      } 
  
      
      [Route("loadpoheader")]
      [HttpPost]
      public Loadpoheaderresults LoadPOHeader(Loadpoheadercriteria loadpoheadercriteria)
      {
         return this.repository.LoadPOHeader(loadpoheadercriteria);
      } 
  
      
      [Route("loadpoheaderaddlmisc")]
      [HttpPost]
      public Loadpoheaderaddlmiscresults LoadPOHeaderAddlMisc(Loadpoheaderaddlmisccriteria loadpoheaderaddlmisccriteria)
      {
         return this.repository.LoadPOHeaderAddlMisc(loadpoheaderaddlmisccriteria);
      } 
  
      
      [Route("loadpoheaderaddlwhse")]
      [HttpPost]
      public Loadpoheaderaddlwhseresults LoadPOHeaderAddlWhse(Loadpoheaderaddlwhsecriteria loadpoheaderaddlwhsecriteria)
      {
         return this.repository.LoadPOHeaderAddlWhse(loadpoheaderaddlwhsecriteria);
      } 
  
      
      [Route("loadpolinedetail")]
      [HttpPost]
      public IEnumerable<Loadpolinedetailresults> LoadPOLineDetail(Loadpolinedetailcriteria loadpolinedetailcriteria)
      {
         return this.repository.LoadPOLineDetail(loadpolinedetailcriteria);
      } 
  
      
      [Route("loadpolineextended")]
      [HttpPost]
      public Loadpolineextresults LoadPOLineExtended(Loadpolineextcriteria loadpolineextcriteria)
      {
         return this.repository.LoadPOLineExtended(loadpolineextcriteria);
      } 
  
      
      [Route("loadpolinehistory")]
      [HttpPost]
      public IEnumerable<Loadpolinehistoryresults> LoadPOLineHistory(Loadpolinehistorycriteria loadpolinehistorycriteria)
      {
         return this.repository.LoadPOLineHistory(loadpolinehistorycriteria);
      } 
  
      
      [Route("loadpolinenonstock")]
      [HttpPost]
      public Loadpolinenonstockresults LoadPOLineNonstock(Loadpolinenonstockcriteria loadpolinenonstockcriteria)
      {
         return this.repository.LoadPOLineNonstock(loadpolinenonstockcriteria);
      } 
  
      
      [Route("loadpoquickview")]
      [HttpPost]
      public AspoinquiryLoadPOQuickViewResponseAPI LoadPOQuickView(Loadpoquickviewcriteria loadpoquickviewcriteria)
      {
         return this.repository.LoadPOQuickView(loadpoquickviewcriteria);
      } 
  
      
      [Route("loadpoquickviewties")]
      [HttpPost]
      public AspoinquiryLoadPOQuickViewTiesResponseAPI LoadPOQuickViewTies(Loadpoquickviewtiescriteria loadpoquickviewtiescriteria)
      {
         return this.repository.LoadPOQuickViewTies(loadpoquickviewtiescriteria);
      } 
  
      
      [Route("loadporetnalloc")]
      [HttpPost]
      public AspoinquiryLoadPORetnAllocResponseAPI LoadPORetnAlloc(Loadporetnalloccriteria loadporetnalloccriteria)
      {
         return this.repository.LoadPORetnAlloc(loadporetnalloccriteria);
      } 
  
      
      [Route("loadpotally")]
      [HttpPost]
      public AspoinquiryLoadPOTallyResponseAPI LoadPOTally(Loadpotallycriteria loadpotallycriteria)
      {
         return this.repository.LoadPOTally(loadpotallycriteria);
      } 
  
      
      [Route("loadpototals")]
      [HttpPost]
      public Loadpototalsresults LoadPOTotals(Loadpototalscriteria loadpototalscriteria)
      {
         return this.repository.LoadPOTotals(loadpototalscriteria);
      } 
  
      
      [Route("poipbuildpolist")]
      [HttpPost]
      public AspoinquiryPOIPBuildPOListResponseAPI POIPBuildPOList(Poipbuildpolistcriteria poipbuildpolistcriteria)
      {
         return this.repository.POIPBuildPOList(poipbuildpolistcriteria);
      } 
  
      
      [Route("poipsimplesearchlist")]
      [HttpPost]
      public AspoinquiryPOIPSimpleSearchListResponseAPI POIPSimpleSearchList(AspoinquiryPOIPSimpleSearchListRequestAPI AspoinquiryPOIPSimpleSearchListRequestAPI)
      {
         return this.repository.POIPSimpleSearchList(AspoinquiryPOIPSimpleSearchListRequestAPI);
      } 
  
      
      [Route("poitccomponentok")]
      [HttpPost]
      public AspoinquiryPOITCComponentOKResponseAPI POITCComponentOK(AspoinquiryPOITCComponentOKRequestAPI AspoinquiryPOITCComponentOKRequestAPI)
      {
         return this.repository.POITCComponentOK(AspoinquiryPOITCComponentOKRequestAPI);
      } 
  
      
      [Route("poitccomponentfieldleave")]
      [HttpPost]
      public Poitccomponent POITCComponentFieldLeave(AspoinquiryPOITCComponentFieldLeaveRequestAPI AspoinquiryPOITCComponentFieldLeaveRequestAPI)
      {
         return this.repository.POITCComponentFieldLeave(AspoinquiryPOITCComponentFieldLeaveRequestAPI);
      } 
  
      
      [Route("poitctallycalctotals")]
      [HttpPost]
      public AspoinquiryPOITCTallyCalcTotalsResponseAPI POITCTallyCalcTotals(AspoinquiryPOITCTallyCalcTotalsRequestAPI AspoinquiryPOITCTallyCalcTotalsRequestAPI)
      {
         return this.repository.POITCTallyCalcTotals(AspoinquiryPOITCTallyCalcTotalsRequestAPI);
      } 
  
      
      [Route("poitctallyload")]
      [HttpPost]
      public AspoinquiryPOITCTallyLoadResponseAPI POITCTallyLoad(Poitcheader poitcheader)
      {
         return this.repository.POITCTallyLoad(poitcheader);
      } 
  
      
      [Route("poitctallyunitchange")]
      [HttpPost]
      public Poitcheader POITCTallyUnitChange(AspoinquiryPOITCTallyUnitChangeRequestAPI AspoinquiryPOITCTallyUnitChangeRequestAPI)
      {
         return this.repository.POITCTallyUnitChange(AspoinquiryPOITCTallyUnitChangeRequestAPI);
      } 
  
      
      [Route("pobundlesload")]
      [HttpPost]
      public AspoinquiryPOBundlesLoadResponseAPI POBundlesLoad(Pobundlescriteria pobundlescriteria)
      {
         return this.repository.POBundlesLoad(pobundlescriteria);
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
  