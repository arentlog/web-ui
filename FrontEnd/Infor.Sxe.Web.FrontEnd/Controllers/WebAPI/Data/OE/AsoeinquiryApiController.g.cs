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
   using Sxe.OE.Data.Models.Pdscrtimplcorestt;
   using Sxe.OE.Data.Models.Pdscreateoealloctt;
   using Sxe.OE.Data.Models.Pdscorescrtretstt;
   using Sxe.OE.Data.Models.Pdscrtserialcorestt;
   using Sxe.OE.Data.Models.Pdscrtbundleidrcds;
   using Sxe.OE.Data.Models.Pdscreatetoeelmtt;
   using Sxe.OE.Data.Models.Pdsgetcomplist;
   using Sxe.OE.Data.Models.Pdsloadtcomps;
   using Sxe.OE.Data.Models.Pdsgetedilinedata;
   using Sxe.OE.Data.Models.Pdskitcreatedetailstt;
   using Sxe.OE.Data.Models.Pdsmessaging;
   using Sxe.OE.Data.Models.Pdskitscriteria;
   using Sxe.OE.Data.Models.Pdskitcreatekwdstt;
   using Sxe.OE.Data.Models.Pdsloadoeelalltt;
   using Sxe.OE.Data.Models.Pdsloadoeelctt;
   using Sxe.OE.Data.Models.Pdsloadoeelktt;
   using Sxe.OE.Data.Models.Pdsloadoeelmtt;
   using Sxe.OE.Data.Models.Pdsoeaddons;
   using Sxe.OE.Data.Models.Pdsoecalcordmargin;
   using Sxe.OE.Data.Models.Pdsoecalcordshptot;
   using Sxe.OE.Data.Models.Pdscrttaxdisptt;
   using Sxe.OE.Data.Models.Pdsoeioloadlnext;
   using Sxe.OE.Data.Models.Pdsoeioloadlnhist;
   using Sxe.OE.Data.Models.Pdsoeipaltprodload;
   using Sxe.OE.Data.Models.Pdsoeipcreatequotes;
   using Sxe.OE.Data.Models.Pdsoeipdisplay;
   using Sxe.OE.Data.Models.Pdsoelinehist;
   using Sxe.OE.Data.Models.Pdsoeoriglinehist;
   using Sxe.OE.Data.Models.Pdsoetenderhistory;
   using Sxe.OE.Data.Models.Pdsreportcchist;
   using Sxe.OE.Data.Models.Pdstiecreatetiett;
   using Sxe.OE.Data.Models.Pdsoeirinitialize;
   using Sxe.OE.Data.Models.Pdsoeirholdall;
   using Sxe.OE.Data.Models.Pdsoeirorderlist;
   using Sxe.OE.Data.Models.Pdsoeirupdateorder;
   using Sxe.OE.Data.Models.Pdsoeirapproveorders;
   using Sxe.OE.Data.Models.Pdsoeirapproveintlorders;
   using Sxe.OE.Data.Models.Pdsoeirquotestostock;
   using Sxe.OE.Data.Models.Pdsoeirheaderfieldsinit;
   using Sxe.OE.Data.Models.Pdsoeirheaderunlock;
   using Sxe.OE.Data.Models.Pdsoeirheaderretrieve;
   using Sxe.OE.Data.Models.Pdsoeircustomercredit;
   using Sxe.OE.Data.Models.Pdsoeircchistory;
   using Sxe.OE.Data.Models.Pdsoeirccdetail;
   using Sxe.OE.Data.Models.Pdsoeixinquiry;
   using Sxe.OE.Data.Models.Pdsoeixdelete;
   using Sxe.OE.Data.Models.Pdsoelinelist;
   using Sxe.OE.Data.Models.Pdsoeprodhistory;
   using Sxe.OE.Data.Models.Pdsoeorderhistory;
   using Sxe.OE.Data.Models.Pdsoeioloadordtot;
   using Sxe.OE.Data.Models.Pdsoeioloadordtax;
   using Sxe.OE.Data.Models.Pdsoeioloadordhist;
   using Sxe.OE.Data.Models.Pdsoeioloadlinetabs;
   using Sxe.OE.Data.Models.Pdsoeiolineext;
   using Sxe.OE.Data.Models.Pdsoessreupdate;
   using Sxe.OE.Data.Models.Pdsoessresearch;
   using Sxe.OE.Data.Models.Pdsoeifsearch;
   using Sxe.OE.Data.Models.Pdsoeiftiedorders;
   using Sxe.OE.Data.Models.Complex;
   using Sxe.OE.Data.Repositories;
    
   [RoutePrefix("api/oe/asoeinquiry")]
   public partial class AsoeinquiryApiController : ApiControllerBase
   {
      private readonly AsoeinquiryRepository repository;
    
      public AsoeinquiryApiController(AsoeinquiryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("corescreateimpliedcorestt")]
      [HttpPost]
      public AsoeinquiryCoresCreateImpliedCoresTTResponseAPI CoresCreateImpliedCoresTT(Crtimplcoresttcriteria crtimplcoresttcriteria)
      {
         return this.repository.CoresCreateImpliedCoresTT(crtimplcoresttcriteria);
      } 
  
      
      [Route("corescreateoeallocationtt")]
      [HttpPost]
      public IEnumerable<Createoeallocttresults> CoresCreateOEAllocationTT(Createoeallocttcriteria createoeallocttcriteria)
      {
         return this.repository.CoresCreateOEAllocationTT(createoeallocttcriteria);
      } 
  
      
      [Route("corescreatereturnstt")]
      [HttpPost]
      public AsoeinquiryCoresCreateReturnsTTResponseAPI CoresCreateReturnsTT(Corescrtretsttcriteria corescrtretsttcriteria)
      {
         return this.repository.CoresCreateReturnsTT(corescrtretsttcriteria);
      } 
  
      
      [Route("corescreateserialcorestt")]
      [HttpPost]
      public IEnumerable<Crtserialcoresttresults> CoresCreateSerialCoresTT(Crtserialcoresttcriteria crtserialcoresttcriteria)
      {
         return this.repository.CoresCreateSerialCoresTT(crtserialcoresttcriteria);
      } 
  
      
      [Route("createbundleidrecords")]
      [HttpPost]
      public AsoeinquiryCreateBundleidRecordsResponseAPI CreateBundleidRecords(Crtbundleidrcdscriteria crtbundleidrcdscriteria)
      {
         return this.repository.CreateBundleidRecords(crtbundleidrcdscriteria);
      } 
  
      
      [Route("createtoeelmfromoeelm")]
      [HttpPost]
      public IEnumerable<Createtoeelmttresults> CreateTOeelmFromOeelm(Createtoeelmttcriteria createtoeelmttcriteria)
      {
         return this.repository.CreateTOeelmFromOeelm(createtoeelmttcriteria);
      } 
  
      
      [Route("getcomponentlist")]
      [HttpPost]
      public Getcomplistresults GetComponentList(Getcomplistcriteria getcomplistcriteria)
      {
         return this.repository.GetComponentList(getcomplistcriteria);
      } 
  
      
      [Route("componentcheckserlot")]
      [HttpPost]
      public AsoeinquiryComponentCheckSerLotResponseAPI ComponentCheckSerLot(AsoeinquiryComponentCheckSerLotRequestAPI AsoeinquiryComponentCheckSerLotRequestAPI)
      {
         return this.repository.ComponentCheckSerLot(AsoeinquiryComponentCheckSerLotRequestAPI);
      } 
  
      
      [Route("getedilinedata")]
      [HttpPost]
      public Getedilinedataresults GetEDILineData(Getedilinedatacriteria getedilinedatacriteria)
      {
         return this.repository.GetEDILineData(getedilinedatacriteria);
      } 
  
      
      [Route("kitcreatedetailstt")]
      [HttpPost]
      public AsoeinquiryKitCreateDetailsTTResponseAPI KitCreateDetailsTT(Kitcreatedetailsttcriteria kitcreatedetailsttcriteria)
      {
         return this.repository.KitCreateDetailsTT(kitcreatedetailsttcriteria);
      } 
  
      
      [Route("kitcreatekeywordstt")]
      [HttpPost]
      public AsoeinquiryKitCreateKeywordsTTResponseAPI KitCreateKeywordsTT(AsoeinquiryKitCreateKeywordsTTRequestAPI AsoeinquiryKitCreateKeywordsTTRequestAPI)
      {
         return this.repository.KitCreateKeywordsTT(AsoeinquiryKitCreateKeywordsTTRequestAPI);
      } 
  
      
      [Route("loadoeelalltt")]
      [HttpPost]
      public AsoeinquiryLoadOeelAllTTResponseAPI LoadOeelAllTT(Loadoeelallttcriteria loadoeelallttcriteria)
      {
         return this.repository.LoadOeelAllTT(loadoeelallttcriteria);
      } 
  
      
      [Route("loadoeelctemptable")]
      [HttpPost]
      public IEnumerable<Loadoeelcttresults> LoadOEELCTempTable(Loadoeelcttcriteria loadoeelcttcriteria)
      {
         return this.repository.LoadOEELCTempTable(loadoeelcttcriteria);
      } 
  
      
      [Route("loadoeelktt")]
      [HttpPost]
      public AsoeinquiryLoadOeelkTTResponseAPI LoadOeelkTT(Loadoeelkttcriteria loadoeelkttcriteria)
      {
         return this.repository.LoadOeelkTT(loadoeelkttcriteria);
      } 
  
      
      [Route("loadoeelmtt")]
      [HttpPost]
      public AsoeinquiryLoadOeelmTTResponseAPI LoadOeelmTT(Loadoeelmttcriteria loadoeelmttcriteria)
      {
         return this.repository.LoadOeelmTT(loadoeelmttcriteria);
      } 
  
      
      [Route("loadorderaddons/{iOrderNo:int}/{iOrderSuf:int}/{lInquiryMode:bool}")]
      [HttpGet]
      public IEnumerable<Oeaddons> LoadOrderAddons(int iOrderNo, int iOrderSuf, bool lInquiryMode)
      {
         return this.repository.LoadOrderAddons(iOrderNo, iOrderSuf, lInquiryMode);
      } 
  
      
      [Route("loadtcomps")]
      [HttpPost]
      public AsoeinquiryLoadTCompsResponseAPI LoadTComps(Kitscriteria kitscriteria)
      {
         return this.repository.LoadTComps(kitscriteria);
      } 
  
      
      [Route("oecalcordermargin")]
      [HttpPost]
      public Oecalcordmarginresults OECalcOrderMargin(Oecalcordmargincriteria oecalcordmargincriteria)
      {
         return this.repository.OECalcOrderMargin(oecalcordmargincriteria);
      } 
  
      
      [Route("oecalculateordshptotals")]
      [HttpPost]
      public Oecalcordshptotresults OECalculateOrdShpTotals(Oecalcordshptotcriteria oecalcordshptotcriteria)
      {
         return this.repository.OECalculateOrdShpTotals(oecalcordshptotcriteria);
      } 
  
      
      [Route("oeiocreatetaxdisplaytt")]
      [HttpPost]
      public IEnumerable<Crttaxdispttresults> OEIOCreateTaxDisplayTT(Crttaxdispttcriteria crttaxdispttcriteria)
      {
         return this.repository.OEIOCreateTaxDisplayTT(crttaxdispttcriteria);
      } 
  
      
      [Route("oeioloadlineextended")]
      [HttpPost]
      public Oeioloadlnextresults OEIOLoadLineExtended(Oeioloadlnextcriteria oeioloadlnextcriteria)
      {
         return this.repository.OEIOLoadLineExtended(oeioloadlnextcriteria);
      } 
  
      
      [Route("oeioloadlinehistory")]
      [HttpPost]
      public IEnumerable<Oeioloadlnhistresults> OEIOLoadLineHistory(Oeioloadlnhistcriteria oeioloadlnhistcriteria)
      {
         return this.repository.OEIOLoadLineHistory(oeioloadlnhistcriteria);
      } 
  
      
      [Route("oeipaltprodload")]
      [HttpPost]
      public AsoeinquiryOEIPAltProdLoadResponseAPI OEIPAltProdLoad(Oeipaltprodloadcriteria oeipaltprodloadcriteria)
      {
         return this.repository.OEIPAltProdLoad(oeipaltprodloadcriteria);
      } 
  
      
      [Route("oeipcreatequotes")]
      [HttpPost]
      public AsoeinquiryOEIPCreateQuotesResponseAPI OEIPCreateQuotes(IEnumerable<Oeipcreatequotesprod> oeipcreatequotesprod)
      {
         return this.repository.OEIPCreateQuotes(oeipcreatequotesprod);
      } 
  
      
      [Route("oeipdisplay")]
      [HttpPost]
      public AsoeinquiryOEIPDisplayResponseAPI OEIPDisplay(Oeipdisplaycriteria oeipdisplaycriteria)
      {
         return this.repository.OEIPDisplay(oeipdisplaycriteria);
      } 
  
      
      [Route("oelinehistory")]
      [HttpPost]
      public IEnumerable<Oelinehistresults> OELineHistory(Oelinehistcriteria oelinehistcriteria)
      {
         return this.repository.OELineHistory(oelinehistcriteria);
      } 
  
      
      [Route("oeoriglinehistory")]
      [HttpPost]
      public IEnumerable<Oeoriglinehistresults> OEOrigLineHistory(Oeoriglinehistcriteria oeoriglinehistcriteria)
      {
         return this.repository.OEOrigLineHistory(oeoriglinehistcriteria);
      } 
  
      
      [Route("oetenderhistory")]
      [HttpPost]
      public AsoeinquiryOETenderHistoryResponseAPI OETenderHistory(Oetenderhistorycriteria oetenderhistorycriteria)
      {
         return this.repository.OETenderHistory(oetenderhistorycriteria);
      } 
  
      
      [Route("reportcreditcardhist")]
      [HttpPost]
      public IEnumerable<Reportcchistresults> ReportCreditCardHist(Reportcchistcriteria reportcchistcriteria)
      {
         return this.repository.ReportCreditCardHist(reportcchistcriteria);
      } 
  
      
      [Route("tiecreatetietemptable")]
      [HttpPost]
      public IEnumerable<Tiecreatetiettresults> TieCreateTieTempTable(Tiecreatetiettcriteria tiecreatetiettcriteria)
      {
         return this.repository.TieCreateTieTempTable(tiecreatetiettcriteria);
      } 
  
      
      [Route("oeirinitialize")]
      [HttpGet]
      public Oeirinitialize OEIRInitialize()
      {
         return this.repository.OEIRInitialize();
      } 
  
      
      [Route("oeirvalidateapprovalsecurity/{pvOrderno:int}/{pvOrdersuf:int}")]
      [HttpGet]
      public bool OEIRValidateApprovalSecurity(int pvOrderno, int pvOrdersuf)
      {
         return this.repository.OEIRValidateApprovalSecurity(pvOrderno, pvOrdersuf);
      } 
  
      
      [Route("oeirholdall")]
      [HttpPost]
      public void OEIRHoldAll(Oeirholdall oeirholdall)
      {
         this.repository.OEIRHoldAll(oeirholdall);
      } 
  
      
      [Route("oeirreleaseall")]
      [HttpPost]
      public IEnumerable<Messaging> OEIRReleaseAll(Oeirholdall oeirholdall)
      {
         return this.repository.OEIRReleaseAll(oeirholdall);
      } 
  
      
      [Route("oeirorderlist")]
      [HttpPost]
      public IEnumerable<Oeirorderlistresults> OEIROrderList(Oeirorderlistcriteria oeirorderlistcriteria)
      {
         return this.repository.OEIROrderList(oeirorderlistcriteria);
      } 
  
      
      [Route("oeirupdateorder")]
      [HttpPost]
      public AsoeinquiryOEIRUpdateOrderResponseAPI OEIRUpdateOrder(Oeirupdateorder oeirupdateorder)
      {
         return this.repository.OEIRUpdateOrder(oeirupdateorder);
      } 
  
      
      [Route("oeirapproveorders")]
      [HttpPost]
      public AsoeinquiryOEIRApproveOrdersResponseAPI OEIRApproveOrders(IEnumerable<Oeirapproveorders> oeirapproveorders)
      {
         return this.repository.OEIRApproveOrders(oeirapproveorders);
      } 
  
      
      [Route("oeirapproveinternationalorders")]
      [HttpPost]
      public AsoeinquiryOEIRApproveInternationalOrdersResponseAPI OEIRApproveInternationalOrders(IEnumerable<Oeirapproveintlorders> oeirapproveintlorders)
      {
         return this.repository.OEIRApproveInternationalOrders(oeirapproveintlorders);
      } 
  
      
      [Route("oeirconvertquotestostock")]
      [HttpPost]
      public void OEIRConvertQuotesToStock(IEnumerable<Oeirquotestostock> oeirquotestostock)
      {
         this.repository.OEIRConvertQuotesToStock(oeirquotestostock);
      } 
  
      
      [Route("oeirheaderfieldsinit")]
      [HttpPost]
      public Oeirheaderfieldsinitresults OEIRHeaderFieldsInit(Oeirheaderfieldsinitcriteria oeirheaderfieldsinitcriteria)
      {
         return this.repository.OEIRHeaderFieldsInit(oeirheaderfieldsinitcriteria);
      } 
  
      
      [Route("oeirheaderunlock")]
      [HttpPost]
      public void OEIRHeaderUnlock(Oeirheaderunlock oeirheaderunlock)
      {
         this.repository.OEIRHeaderUnlock(oeirheaderunlock);
      } 
  
      
      [Route("oeirheaderfieldsupdate")]
      [HttpPost]
      public IEnumerable<Messaging> OEIRHeaderFieldsUpdate(AsoeinquiryOEIRHeaderFieldsUpdateRequestAPI AsoeinquiryOEIRHeaderFieldsUpdateRequestAPI)
      {
         return this.repository.OEIRHeaderFieldsUpdate(AsoeinquiryOEIRHeaderFieldsUpdateRequestAPI);
      } 
  
      
      [Route("oeircheckdrilldownaccess")]
      [HttpPost]
      public void OEIRCheckDrilldownAccess(Oeirupdateorder oeirupdateorder)
      {
         this.repository.OEIRCheckDrilldownAccess(oeirupdateorder);
      } 
  
      
      [Route("oeirheaderretrieve")]
      [HttpPost]
      public Oeirheaderretrieveresults OEIRHeaderRetrieve(AsoeinquiryOEIRHeaderRetrieveRequestAPI AsoeinquiryOEIRHeaderRetrieveRequestAPI)
      {
         return this.repository.OEIRHeaderRetrieve(AsoeinquiryOEIRHeaderRetrieveRequestAPI);
      } 
  
      
      [Route("oeircustomercredit")]
      [HttpPost]
      public Oeircustomercreditresults OEIRCustomerCredit(Oeircustomercreditcriteria oeircustomercreditcriteria)
      {
         return this.repository.OEIRCustomerCredit(oeircustomercreditcriteria);
      } 
  
      
      [Route("oeircchistory")]
      [HttpPost]
      public IEnumerable<Oeircchistoryresults> OEIRCCHistory(Oeircchistorycriteria oeircchistorycriteria)
      {
         return this.repository.OEIRCCHistory(oeircchistorycriteria);
      } 
  
      
      [Route("oeirccdetail")]
      [HttpPost]
      public Oeirccdetailresults OEIRCCDetail(Oeirccdetailcriteria oeirccdetailcriteria)
      {
         return this.repository.OEIRCCDetail(oeirccdetailcriteria);
      } 
  
      
      [Route("oeixbuildlist")]
      [HttpPost]
      public AsoeinquiryOEIXBuildListResponseAPI OEIXBuildList(Oeixcriteria oeixcriteria)
      {
         return this.repository.OEIXBuildList(oeixcriteria);
      } 
  
      
      [Route("oeixdeletelist")]
      [HttpPost]
      public void OEIXDeleteList(IEnumerable<Oeixdeletelist> oeixdeletelist)
      {
         this.repository.OEIXDeleteList(oeixdeletelist);
      } 
  
      
      [Route("oecheckcancelalllinestieauth/{pvOrderno:int}/{pvOrdersuf:int}")]
      [HttpGet]
      public bool OECheckCancelAllLinesTieAuth(int pvOrderno, int pvOrdersuf)
      {
         return this.repository.OECheckCancelAllLinesTieAuth(pvOrderno, pvOrdersuf);
      } 
  
      
      [Route("oecheckcancellinetieauth")]
      [HttpPost]
      public bool OECheckCancelLineTieAuth(IEnumerable<Oelinelist> oelinelist)
      {
         return this.repository.OECheckCancelLineTieAuth(oelinelist);
      } 
  
      
      [Route("oeesauthpointinfo/{pvOrderno:int}/{pvOrdersuf:int}")]
      [HttpGet]
      public AsoeinquiryOEESAuthPointInfoResponseAPI OEESAuthPointInfo(int pvOrderno, int pvOrdersuf)
      {
         return this.repository.OEESAuthPointInfo(pvOrderno, pvOrdersuf);
      } 
  
      
      [Route("oeirauthpointinfo")]
      [HttpPost]
      public AsoeinquiryOEIRAuthPointInfoResponseAPI OEIRAuthPointInfo(AsoeinquiryOEIRAuthPointInfoRequestAPI AsoeinquiryOEIRAuthPointInfoRequestAPI)
      {
         return this.repository.OEIRAuthPointInfo(AsoeinquiryOEIRAuthPointInfoRequestAPI);
      } 
  
      
      [Route("oeproducthistory/{dCustomerNumber:decimal}/{iRecordLimit:int}")]
      [HttpGet]
      public IEnumerable<Oeprodhistory> OEProductHistory(decimal dCustomerNumber, int iRecordLimit)
      {
         return this.repository.OEProductHistory(dCustomerNumber, iRecordLimit);
      } 
  
      
      [Route("oeorderhistory/{dCustomerNumber:decimal}/{iRecordLimit:int}")]
      [HttpGet]
      public IEnumerable<Oeorderhistory> OEOrderHistory(decimal dCustomerNumber, int iRecordLimit)
      {
         return this.repository.OEOrderHistory(dCustomerNumber, iRecordLimit);
      } 
  
      
      [Route("oeioloadordertotals/{iOrderNo:int}/{iOrderSuf:int}")]
      [HttpGet]
      public AsoeinquiryOEIOLoadOrderTotalsResponseAPI OEIOLoadOrderTotals(int iOrderNo, int iOrderSuf)
      {
         return this.repository.OEIOLoadOrderTotals(iOrderNo, iOrderSuf);
      } 
  
      
      [Route("oeioloadordertaxes/{iOrderNo:int}/{iOrderSuf:int}")]
      [HttpGet]
      public AsoeinquiryOEIOLoadOrderTaxesResponseAPI OEIOLoadOrderTaxes(int iOrderNo, int iOrderSuf)
      {
         return this.repository.OEIOLoadOrderTaxes(iOrderNo, iOrderSuf);
      } 
  
      
      [Route("oeioloadorderhistory/{iOrderNo:int}/{iOrderSuf:int}")]
      [HttpGet]
      public IEnumerable<Oeioloadordhist> OEIOLoadOrderHistory(int iOrderNo, int iOrderSuf)
      {
         return this.repository.OEIOLoadOrderHistory(iOrderNo, iOrderSuf);
      } 
  
      
      [Route("oeioloadlinetabs")]
      [HttpPost]
      public Oeioloadlinetabsresults OEIOLoadLineTabs(Oeioloadlinetabscriteria oeioloadlinetabscriteria)
      {
         return this.repository.OEIOLoadLineTabs(oeioloadlinetabscriteria);
      } 
  
      
      [Route("oeioextline")]
      [HttpPost]
      public IEnumerable<Oeiolineextresults> OEIOExtline(Oeiolineextcriteria oeiolineextcriteria)
      {
         return this.repository.OEIOExtline(oeiolineextcriteria);
      } 
  
      
      [Route("oessreadd")]
      [HttpPost]
      public Oessreupdate OESSREAdd(Oessreupdate oessreupdate)
      {
         return this.repository.OESSREAdd(oessreupdate);
      } 
  
      
      [Route("oessrechange")]
      [HttpPost]
      public Oessreupdate OESSREChange(Oessreupdate oessreupdate)
      {
         return this.repository.OESSREChange(oessreupdate);
      } 
  
      
      [Route("oessredelete")]
      [HttpPost]
      public IEnumerable<Oessreupdate> OESSREDelete(IEnumerable<Oessreupdate> oessreupdate)
      {
         return this.repository.OESSREDelete(oessreupdate);
      } 
  
      
      [Route("oessreretrieve")]
      [HttpPost]
      public Oessreupdate OESSRERetrieve(Oessreupdate oessreupdate)
      {
         return this.repository.OESSRERetrieve(oessreupdate);
      } 
  
      
      [Route("oessresearch")]
      [HttpPost]
      public AsoeinquiryOESSRESearchResponseAPI OESSRESearch(Oessresearchcriteria oessresearchcriteria)
      {
         return this.repository.OESSRESearch(oessresearchcriteria);
      } 
  
      
      [Route("oeifsearch")]
      [HttpPost]
      public AsoeinquiryOEIFSearchResponseAPI OEIFSearch(Oeifsearchcriteria oeifsearchcriteria)
      {
         return this.repository.OEIFSearch(oeifsearchcriteria);
      } 
  
      
      [Route("oeifupdate")]
      [HttpPost]
      public AsoeinquiryOEIFUpdateResponseAPI OEIFUpdate(AsoeinquiryOEIFUpdateRequestAPI AsoeinquiryOEIFUpdateRequestAPI)
      {
         return this.repository.OEIFUpdate(AsoeinquiryOEIFUpdateRequestAPI);
      } 
  
      
      [Route("oeiftiedorders/{pvOrderno:int}/{pvOrdersuf:int}")]
      [HttpGet]
      public IEnumerable<Oeiftiedorders> OEIFTiedOrders(int pvOrderno, int pvOrdersuf)
      {
         return this.repository.OEIFTiedOrders(pvOrderno, pvOrdersuf);
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
  