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
    
namespace Infor.Sxe.OE.Data.Repositories
{
   using Infor.Sxe.OE.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsaddoeaddon;
   using Models.Pdsoeaddons;
   using Models.Pdsoeirccauthorize;
   using Models.Pdscalcsubtotals;
   using Models.Pdsmessaging;
   using Models.Pdstendering;
   using Models.Pdsloadoeaddonlist;
   using Models.Pdsloadoetaxcombos;
   using Models.Pdsloadoetaxsettings;
   using Models.Pdsoehdr;
   using Models.Pdstenderingload;
   using Models.Pdspayments;
   using Models.Pdsoeetcardlookup;
   using Models.Pdsloadoetranstypes;
   using Models.Pdsoecalcdiscnet;
   using Models.Pdsoecopyquote;
   using Models.Pdsoedisccalcupdate;
   using Models.Pdsoefloorplan;
   using Models.Pdsoeheaderchangedates;
   using Models.Pdsoeheaderfinish;
   using Models.Pdsoeheaderretrieve;
   using Models.Pdswlstatus;
   using Models.Pdsoeheadertaxrecalc;
   using Models.Pdsoeiohdrlist;
   using Models.Pdsoeordercancel;
   using Models.Pdsoeordercheckautoship;
   using Models.Pdsoeordercopyaddorder;
   using Models.Pdsoeordercopyorderlist;
   using Models.Pdsoeordercopy;
   using Models.Pdsoeordercopylinelist;
   using Models.Pdsoeordercopyfabwhse;
   using Models.Pdsoeordercopypricing;
   using Models.Pdsoeordersuspendloadcriteria;
   using Models.Pdsoeordersuspendglobals;
   using Models.Pdsoeordersuspend;
   using Models.Pdsprintersettings;
   using Models.Pdssubmitreport;
   using Models.Pdsgeocodelookup;
   using Models.Pdsoetaxdetail;
   using Models.Pdsoetenderingupdate;
   using Models.Pdsoeheaderviewedidata;
   using Models.Pdsoeheaderroa;
   using Models.Pdsoeetprint;
   using Models.Pdsoeheadercrrmpopup;
   using Models.Pdsoeheadermaintcustpo;
   using Models.Pdsoeimportfile;
   using Models.Pdsoeimportdata;
   using Models.Pdsoewtbillingsearch;
   using Models.Complex;

   public partial class AsoeheaderRepository : RepositoryBase
   {
      private AsoeheaderAdapter adapter;
  
      public AsoeheaderRepository(IProgressConnection connection)
      {
         this.adapter = new AsoeheaderAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public IEnumerable<Oeaddons> AddOEAddon(AsoeheaderAddOEAddonRequestAPI AsoeheaderAddOEAddonRequestAPI)
      {
         return this.adapter.AddOEAddon(AsoeheaderAddOEAddonRequestAPI);
      }
  
      public string AuthorizeOEIRCreditCard(Oeirccauthorize oeirccauthorize)
      {
         return this.adapter.AuthorizeOEIRCreditCard(oeirccauthorize);
      }
  
      public Calcsubtotalsresults CalculateRunningSubTotals(Calcsubtotalscriteria calcsubtotalscriteria)
      {
         return this.adapter.CalculateRunningSubTotals(calcsubtotalscriteria);
      }
  
      public Oeaddons ChangeOEAddon(AsoeheaderChangeOEAddonRequestAPI AsoeheaderChangeOEAddonRequestAPI)
      {
         return this.adapter.ChangeOEAddon(AsoeheaderChangeOEAddonRequestAPI);
      }
  
      public IEnumerable<Messaging> CreateQuoteRevision(int iOrderNo, int iOrderSuf)
      {
         return this.adapter.CreateQuoteRevision(iOrderNo, iOrderSuf);
      }
  
      public AsoeheaderLoadCenPOSSaleResponseAPI LoadCenPOSSale(IEnumerable<Tendering> tendering)
      {
         return this.adapter.LoadCenPOSSale(tendering);
      }
  
      public string LoadLevel3LineData(int iOrderNo, int iOrderSuf)
      {
         return this.adapter.LoadLevel3LineData(iOrderNo, iOrderSuf);
      }
  
      public IEnumerable<Loadoeaddonlist> LoadOEAddonList(int iOrderNo, int iOrderSuf)
      {
         return this.adapter.LoadOEAddonList(iOrderNo, iOrderSuf);
      }
  
      public AsoeheaderLoadOEBannerWarehouseResponseAPI LoadOEBannerWarehouse(decimal dCustNo, string cShipTo)
      {
         return this.adapter.LoadOEBannerWarehouse(dCustNo, cShipTo);
      }
  
      public Loadoetaxcombosresults LoadOETaxCombos(Loadoetaxcomboscriteria loadoetaxcomboscriteria)
      {
         return this.adapter.LoadOETaxCombos(loadoetaxcomboscriteria);
      }
  
      public AsoeheaderLoadOETaxSettingsResponseAPI LoadOETaxSettings(Loadoetaxsettingscriteria loadoetaxsettingscriteria)
      {
         return this.adapter.LoadOETaxSettings(loadoetaxsettingscriteria);
      }
  
      public AsoeheaderLoadOETenderingResponseAPI LoadOETendering(AsoeheaderLoadOETenderingRequestAPI AsoeheaderLoadOETenderingRequestAPI)
      {
         return this.adapter.LoadOETendering(AsoeheaderLoadOETenderingRequestAPI);
      }
  
      public IEnumerable<Oeetcardlookupresults> LoadOETenderingCard(Oeetcardlookupcriteria oeetcardlookupcriteria)
      {
         return this.adapter.LoadOETenderingCard(oeetcardlookupcriteria);
      }
  
      public AsoeheaderLoadOETenderingMerchantResponseAPI LoadOETenderingMerchant(string cWhse, int iMediaCd)
      {
         return this.adapter.LoadOETenderingMerchant(cWhse, iMediaCd);
      }
  
      public AsoeheaderLoadOETransTypesResponseAPI LoadOETransTypes(bool lCheckSecurity)
      {
         return this.adapter.LoadOETransTypes(lCheckSecurity);
      }
  
      public decimal OECalculateDiscountNet(Oecalcdiscnetcriteria oecalcdiscnetcriteria)
      {
         return this.adapter.OECalculateDiscountNet(oecalcdiscnetcriteria);
      }
  
      public AsoeheaderOECopyQuoteResponseAPI OECopyQuote(Oecopyquotecriteria oecopyquotecriteria)
      {
         return this.adapter.OECopyQuote(oecopyquotecriteria);
      }
  
      public void OEDiscountCalculatorUpdate(Oedisccalcupdatecriteria oedisccalcupdatecriteria)
      {
         this.adapter.OEDiscountCalculatorUpdate(oedisccalcupdatecriteria);
      }
  
      public Oefloorplan OEFloorPlanUpdate(Oefloorplan oefloorplan)
      {
         return this.adapter.OEFloorPlanUpdate(oefloorplan);
      }
  
      public void OEHeaderChangeDates(Oeheaderchangedatescriteria oeheaderchangedatescriteria)
      {
         this.adapter.OEHeaderChangeDates(oeheaderchangedatescriteria);
      }
  
      public AsoeheaderOEHeaderCreateResponseAPI OEHeaderCreate(Oehdr oehdr)
      {
         return this.adapter.OEHeaderCreate(oehdr);
      }
  
      public AsoeheaderOEHeaderFinishResponseAPI OEHeaderFinish(Oeheaderfinishcriteria oeheaderfinishcriteria)
      {
         return this.adapter.OEHeaderFinish(oeheaderfinishcriteria);
      }
  
      public AsoeheaderOEHeaderRetrieveResponseAPI OEHeaderRetrieve(Oeheaderretrievecriteria oeheaderretrievecriteria)
      {
         return this.adapter.OEHeaderRetrieve(oeheaderretrievecriteria);
      }
  
      public void OEHeaderSoftLock(int iOrderNo, int iOrderSuf)
      {
         this.adapter.OEHeaderSoftLock(iOrderNo, iOrderSuf);
      }
  
      public string OEHeaderTaxRecalc(Oeheadertaxrecalccriteria oeheadertaxrecalccriteria)
      {
         return this.adapter.OEHeaderTaxRecalc(oeheadertaxrecalccriteria);
      }
  
      public IEnumerable<Messaging> OEHeaderUpdate(AsoeheaderOEHeaderUpdateRequestAPI AsoeheaderOEHeaderUpdateRequestAPI)
      {
         return this.adapter.OEHeaderUpdate(AsoeheaderOEHeaderUpdateRequestAPI);
      }
  
      public AsoeheaderOEIOHeaderListFetchResponseAPI OEIOHeaderListFetch(Oeiohdrlistcriteria oeiohdrlistcriteria)
      {
         return this.adapter.OEIOHeaderListFetch(oeiohdrlistcriteria);
      }
  
      public AsoeheaderOEIOSimpleSearchListResponseAPI OEIOSimpleSearchList(AsoeheaderOEIOSimpleSearchListRequestAPI AsoeheaderOEIOSimpleSearchListRequestAPI)
      {
         return this.adapter.OEIOSimpleSearchList(AsoeheaderOEIOSimpleSearchListRequestAPI);
      }
  
      public string OEOrderCancel(Oeordercancel oeordercancel)
      {
         return this.adapter.OEOrderCancel(oeordercancel);
      }
  
      public void OEOrderCancelValidate(Oeordercancel oeordercancel)
      {
         this.adapter.OEOrderCancelValidate(oeordercancel);
      }
  
      public AsoeheaderOEOrderCheckAutoShipResponseAPI OEOrderCheckAutoShip(Oeordercheckautoship oeordercheckautoship)
      {
         return this.adapter.OEOrderCheckAutoShip(oeordercheckautoship);
      }
  
      public AsoeheaderOEOrderCopyAddOrderResponseAPI OEOrderCopyAddOrder(AsoeheaderOEOrderCopyAddOrderRequestAPI AsoeheaderOEOrderCopyAddOrderRequestAPI)
      {
         return this.adapter.OEOrderCopyAddOrder(AsoeheaderOEOrderCopyAddOrderRequestAPI);
      }
  
      public AsoeheaderOEOrderCopyContinueResponseAPI OEOrderCopyContinue(AsoeheaderOEOrderCopyContinueRequestAPI AsoeheaderOEOrderCopyContinueRequestAPI)
      {
         return this.adapter.OEOrderCopyContinue(AsoeheaderOEOrderCopyContinueRequestAPI);
      }
  
      public Oeordercopyfabwhse OEOrderCopyFabWhseInit(Oeordercopyfabwhse oeordercopyfabwhse)
      {
         return this.adapter.OEOrderCopyFabWhseInit(oeordercopyfabwhse);
      }
  
      public void OEOrderCopyFabWhseValidate(Oeordercopyfabwhse oeordercopyfabwhse)
      {
         this.adapter.OEOrderCopyFabWhseValidate(oeordercopyfabwhse);
      }
  
      public Oeordercopy OEOrderCopyInitialize()
      {
         return this.adapter.OEOrderCopyInitialize();
      }
  
      public Oeordercopy OEOrderCopyLeaveCustShipto(Oeordercopy oeordercopy)
      {
         return this.adapter.OEOrderCopyLeaveCustShipto(oeordercopy);
      }
  
      public IEnumerable<Oeordercopylinelist> OEOrderCopyLinesConvert(IEnumerable<Oeordercopylinelist> oeordercopylinelist)
      {
         return this.adapter.OEOrderCopyLinesConvert(oeordercopylinelist);
      }
  
      public Oeordercopypricing OEOrderCopyPDInitialize(int iOrderNo, int iOrderSuf)
      {
         return this.adapter.OEOrderCopyPDInitialize(iOrderNo, iOrderSuf);
      }
  
      public IEnumerable<Messaging> OEOrderCopyPDUpdate(Oeordercopypricing oeordercopypricing)
      {
         return this.adapter.OEOrderCopyPDUpdate(oeordercopypricing);
      }
  
      public AsoeheaderOEOrderCopyUpdateResponseAPI OEOrderCopyUpdate(AsoeheaderOEOrderCopyUpdateRequestAPI AsoeheaderOEOrderCopyUpdateRequestAPI)
      {
         return this.adapter.OEOrderCopyUpdate(AsoeheaderOEOrderCopyUpdateRequestAPI);
      }
  
      public IEnumerable<Messaging> OEOrderCopyValidate(AsoeheaderOEOrderCopyValidateRequestAPI AsoeheaderOEOrderCopyValidateRequestAPI)
      {
         return this.adapter.OEOrderCopyValidate(AsoeheaderOEOrderCopyValidateRequestAPI);
      }
  
      public AsoeheaderOEOrderSuspendLoadResponseAPI OEOrderSuspendLoad(AsoeheaderOEOrderSuspendLoadRequestAPI AsoeheaderOEOrderSuspendLoadRequestAPI)
      {
         return this.adapter.OEOrderSuspendLoad(AsoeheaderOEOrderSuspendLoadRequestAPI);
      }
  
      public Oeordersuspendsingle OEOrderSuspendProcess(AsoeheaderOEOrderSuspendProcessRequestAPI AsoeheaderOEOrderSuspendProcessRequestAPI)
      {
         return this.adapter.OEOrderSuspendProcess(AsoeheaderOEOrderSuspendProcessRequestAPI);
      }
  
      public Oeordersuspendsingle OEOrderSuspendValidate(AsoeheaderOEOrderSuspendValidateRequestAPI AsoeheaderOEOrderSuspendValidateRequestAPI)
      {
         return this.adapter.OEOrderSuspendValidate(AsoeheaderOEOrderSuspendValidateRequestAPI);
      }
  
      public void OEPrintAck(Submitreport submitreport)
      {
         this.adapter.OEPrintAck(submitreport);
      }
  
      public AsoeheaderOEProcessGeoCodeResponseAPI OEProcessGeoCode(Geocodelookupcriteria geocodelookupcriteria)
      {
         return this.adapter.OEProcessGeoCode(geocodelookupcriteria);
      }
  
      public void OERemoveSoftLock(int iOrderNo, int iOrderSuf)
      {
         this.adapter.OERemoveSoftLock(iOrderNo, iOrderSuf);
      }
  
      public void OETaxDetailCreate(AsoeheaderOETaxDetailCreateRequestAPI AsoeheaderOETaxDetailCreateRequestAPI)
      {
         this.adapter.OETaxDetailCreate(AsoeheaderOETaxDetailCreateRequestAPI);
      }
  
      public void OETaxDetailDelete(AsoeheaderOETaxDetailDeleteRequestAPI AsoeheaderOETaxDetailDeleteRequestAPI)
      {
         this.adapter.OETaxDetailDelete(AsoeheaderOETaxDetailDeleteRequestAPI);
      }
  
      public IEnumerable<Oetaxdetail> OETaxDetailRetrieve(int iOrderNo, int iOrderSuf)
      {
         return this.adapter.OETaxDetailRetrieve(iOrderNo, iOrderSuf);
      }
  
      public void OETaxDetailUpdate(AsoeheaderOETaxDetailUpdateRequestAPI AsoeheaderOETaxDetailUpdateRequestAPI)
      {
         this.adapter.OETaxDetailUpdate(AsoeheaderOETaxDetailUpdateRequestAPI);
      }
  
      public IEnumerable<Messaging> OETaxesTotalsUpdate(AsoeheaderOETaxesTotalsUpdateRequestAPI AsoeheaderOETaxesTotalsUpdateRequestAPI)
      {
         return this.adapter.OETaxesTotalsUpdate(AsoeheaderOETaxesTotalsUpdateRequestAPI);
      }
  
      public AsoeheaderOETenderingUpdateResponseAPI OETenderingUpdate(AsoeheaderOETenderingUpdateRequestAPI AsoeheaderOETenderingUpdateRequestAPI)
      {
         return this.adapter.OETenderingUpdate(AsoeheaderOETenderingUpdateRequestAPI);
      }
  
      public AsoeheaderOEHeaderViewEDIErrExcInitResponseAPI OEHeaderViewEDIErrExcInit(AsoeheaderOEHeaderViewEDIErrExcInitRequestAPI AsoeheaderOEHeaderViewEDIErrExcInitRequestAPI)
      {
         return this.adapter.OEHeaderViewEDIErrExcInit(AsoeheaderOEHeaderViewEDIErrExcInitRequestAPI);
      }
  
      public AsoeheaderOEHeaderViewEDIErrExcActionResponseAPI OEHeaderViewEDIErrExcAction(AsoeheaderOEHeaderViewEDIErrExcActionRequestAPI AsoeheaderOEHeaderViewEDIErrExcActionRequestAPI)
      {
         return this.adapter.OEHeaderViewEDIErrExcAction(AsoeheaderOEHeaderViewEDIErrExcActionRequestAPI);
      }
  
      public Oeheaderediresults OEHeaderViewEDIErrExcFinish(AsoeheaderOEHeaderViewEDIErrExcFinishRequestAPI AsoeheaderOEHeaderViewEDIErrExcFinishRequestAPI)
      {
         return this.adapter.OEHeaderViewEDIErrExcFinish(AsoeheaderOEHeaderViewEDIErrExcFinishRequestAPI);
      }
  
      public AsoeheaderOEHeaderLeaveFieldResponseAPI OEHeaderLeaveField(AsoeheaderOEHeaderLeaveFieldRequestAPI AsoeheaderOEHeaderLeaveFieldRequestAPI)
      {
         return this.adapter.OEHeaderLeaveField(AsoeheaderOEHeaderLeaveFieldRequestAPI);
      }
  
      public Oeheaderroa OEHeaderROAInitialize()
      {
         return this.adapter.OEHeaderROAInitialize();
      }
  
      public AsoeheaderOEHeaderROALeaveFieldResponseAPI OEHeaderROALeaveField(AsoeheaderOEHeaderROALeaveFieldRequestAPI AsoeheaderOEHeaderROALeaveFieldRequestAPI)
      {
         return this.adapter.OEHeaderROALeaveField(AsoeheaderOEHeaderROALeaveFieldRequestAPI);
      }
  
      public Oeheaderroa OEHeaderROAValidate(AsoeheaderOEHeaderROAValidateRequestAPI AsoeheaderOEHeaderROAValidateRequestAPI)
      {
         return this.adapter.OEHeaderROAValidate(AsoeheaderOEHeaderROAValidateRequestAPI);
      }
  
      public AsoeheaderOEHeaderROAUpdateResponseAPI OEHeaderROAUpdate(AsoeheaderOEHeaderROAUpdateRequestAPI AsoeheaderOEHeaderROAUpdateRequestAPI)
      {
         return this.adapter.OEHeaderROAUpdate(AsoeheaderOEHeaderROAUpdateRequestAPI);
      }
  
      public Oeheaderroa OEHeaderROACancel(Oeheaderroa oeheaderroa)
      {
         return this.adapter.OEHeaderROACancel(oeheaderroa);
      }
  
      public AsoeheaderOEHeaderROABeforeOneTimeResponseAPI OEHeaderROABeforeOneTime(AsoeheaderOEHeaderROABeforeOneTimeRequestAPI AsoeheaderOEHeaderROABeforeOneTimeRequestAPI)
      {
         return this.adapter.OEHeaderROABeforeOneTime(AsoeheaderOEHeaderROABeforeOneTimeRequestAPI);
      }
  
      public AsoeheaderOEHeaderROAAfterOneTimeResponseAPI OEHeaderROAAfterOneTime(AsoeheaderOEHeaderROAAfterOneTimeRequestAPI AsoeheaderOEHeaderROAAfterOneTimeRequestAPI)
      {
         return this.adapter.OEHeaderROAAfterOneTime(AsoeheaderOEHeaderROAAfterOneTimeRequestAPI);
      }
  
      public Oeheadercrrmpopup OEHeaderCRRMPopupValidate(Oeheadercrrmpopup oeheadercrrmpopup)
      {
         return this.adapter.OEHeaderCRRMPopupValidate(oeheadercrrmpopup);
      }
  
      public AsoeheaderOELoadForceTenderResponseAPI OELoadForceTender(AsoeheaderOELoadForceTenderRequestAPI AsoeheaderOELoadForceTenderRequestAPI)
      {
         return this.adapter.OELoadForceTender(AsoeheaderOELoadForceTenderRequestAPI);
      }
  
      public AsoeheaderOEHeaderMaintCustPOLeaveFieldResponseAPI OEHeaderMaintCustPOLeaveField(AsoeheaderOEHeaderMaintCustPOLeaveFieldRequestAPI AsoeheaderOEHeaderMaintCustPOLeaveFieldRequestAPI)
      {
         return this.adapter.OEHeaderMaintCustPOLeaveField(AsoeheaderOEHeaderMaintCustPOLeaveFieldRequestAPI);
      }
  
      public IEnumerable<Messaging> OEHeaderMaintCustPOUpdate(Oeheadermaintcustpo oeheadermaintcustpo)
      {
         return this.adapter.OEHeaderMaintCustPOUpdate(oeheadermaintcustpo);
      }
  
      public AsoeheaderOEImportLoadResponseAPI OEImportLoad(AsoeheaderOEImportLoadRequestAPI AsoeheaderOEImportLoadRequestAPI)
      {
         return this.adapter.OEImportLoad(AsoeheaderOEImportLoadRequestAPI);
      }
  
      public IEnumerable<Messaging> OEImportUpdate(AsoeheaderOEImportUpdateRequestAPI AsoeheaderOEImportUpdateRequestAPI)
      {
         return this.adapter.OEImportUpdate(AsoeheaderOEImportUpdateRequestAPI);
      }
  
      public AsoeheaderOEImportValidateResponseAPI OEImportValidate(IEnumerable<Oeimportdata> oeimportdata)
      {
         return this.adapter.OEImportValidate(oeimportdata);
      }
  
      public AsoeheaderOEWTBillingSearchResponseAPI OEWTBillingSearch(Oewtbillingcriteria oewtbillingcriteria)
      {
         return this.adapter.OEWTBillingSearch(oewtbillingcriteria);
      }
  
      public IEnumerable<Messaging> OEWTBillingUpdt(AsoeheaderOEWTBillingUpdtRequestAPI AsoeheaderOEWTBillingUpdtRequestAPI)
      {
         return this.adapter.OEWTBillingUpdt(AsoeheaderOEWTBillingUpdtRequestAPI);
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
  