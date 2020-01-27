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
    
namespace Infor.Sxe.PO.Data.Repositories
{
   using Infor.Sxe.PO.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdspoeidrilldown;
   using Models.Pdspoeidetailfinish;
   using Models.Pdspoeivaproportion;
   using Models.Pdspoeidetailaddons;
   using Models.Pdspoeilineaddons;
   using Models.Pdspoeilineadd;
   using Models.Pdsmessaging;
   using Models.Pdspononstockresults;
   using Models.Pdspoeiaddonsva;
   using Models.Pdspoeireceiverno;
   using Models.Pdspoeilinedetail;
   using Models.Pdsicentryserials;
   using Models.Pdspoeidetailtotal;
   using Models.Pdsicentrylots;
   using Models.Pdsporrarlineprogbuy;
   using Models.Pdsporrarlineprogbuycriteria;
   using Models.Pdsporrarvendcredit;
   using Models.Pdsloadpotally;
   using Models.Pdspotallycomponent;
   using Models.Pdspobundles;
   using Models.Pdspoline;
   using Models.Pdsloadpoea;
   using Models.Pdsupdatepoea;
   using Models.Pdspoebtdeletebatch;
   using Models.Pdspoebtgetdata;
   using Models.Pdspoebtqueueputawayreport;
   using Models.Pdsprintersettings;
   using Models.Pdspoebtupdatedata;
   using Models.Pdsporrarreptlist;
   using Models.Pdsporrarrepttotals;
   using Models.Pdsporrarreptdelete;
   using Models.Pdsporrarreptadjmerge;
   using Models.Pdsporrarreptupdate;
   using Models.Pdsporrarreptvendchg;
   using Models.Pdsporrarreptaddnew;
   using Models.Pdsporrarreptrefreshdoc;
   using Models.Pdsporrarreptheader;
   using Models.Pdsporrarreptcombinq;
   using Models.Pdsporrarreptadjretrieve;
   using Models.Pdsporrarreptadjcalc;
   using Models.Pdsporrarreptadjdaysinit;
   using Models.Pdsporrarreptadjdaysupdt;
   using Models.Pdsporrarreptnewreptinit;
   using Models.Pdsporrarreptnewreptrun;
   using Models.Pdsporrarreptmergeinit;
   using Models.Pdsporrarreptmergerun;
   using Models.Pdspoblanket;
   using Models.Pdspoblanketcheckshipfmno;
   using Models.Pdspoblanketupdate;
   using Models.Pdspoblanketdelete;
   using Models.Pdspoblanketrelease;
   using Models.Pdspoblanketbanner;
   using Models.Pdspoblanketheader;
   using Models.Pdspoblanketlines;
   using Models.Pdspoblanketupdbyrelease;
   using Models.Pdsporrarlinedspl;
   using Models.Pdsporrarlinetotals;
   using Models.Pdsporrarlineadd;
   using Models.Pdsporrarlinechange;
   using Models.Pdsporrarlineaccept;
   using Models.Pdsporrarlineextend;
   using Models.Pdsporrarlineqtybreak;
   using Models.Pdsporrarlinemsg;
   using Models.Pdsporrarreptfullrefreshrun;
   using Models.Pdspoeilist;
   using Models.Pdspoeicancelwork;
   using Models.Pdspoeifullreceipt;
   using Models.Pdsporeceiptreport;
   using Models.Pdspoeifinalinit;
   using Models.Pdspoeifinalupdate;
   using Models.Pdspoeidetailheader;
   using Models.Pdspoeilinesubsuper;
   using Models.Pdspoeilineextend;
   using Models.Pdspoeilinereprice;
   using Models.Complex;

   public partial class AspoentryRepository : RepositoryBase
   {
      private AspoentryAdapter adapter;
  
      public AspoentryRepository(IProgressConnection connection)
      {
         this.adapter = new AspoentryAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public AspoentryPOEIDetailFinishResponseAPI POEIDetailFinish(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEIDetailFinish(poeidrilldown);
      }
  
      public Poeidetailaddons POEIInitializeAddons(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEIInitializeAddons(poeidrilldown);
      }
  
      public Poeidetailaddons POEIAddonLeaveField(AspoentryPOEIAddonLeaveFieldRequestAPI AspoentryPOEIAddonLeaveFieldRequestAPI)
      {
         return this.adapter.POEIAddonLeaveField(AspoentryPOEIAddonLeaveFieldRequestAPI);
      }
  
      public void POEIUpdateAddons(Poeidetailaddons poeidetailaddons)
      {
         this.adapter.POEIUpdateAddons(poeidetailaddons);
      }
  
      public Poeilineaddons POEIInitializeLineAddons(Poeilineaddons poeilineaddons)
      {
         return this.adapter.POEIInitializeLineAddons(poeilineaddons);
      }
  
      public Poeilineaddons POEILineAddonLeaveField(AspoentryPOEILineAddonLeaveFieldRequestAPI AspoentryPOEILineAddonLeaveFieldRequestAPI)
      {
         return this.adapter.POEILineAddonLeaveField(AspoentryPOEILineAddonLeaveFieldRequestAPI);
      }
  
      public void POEIUpdateLineAddons(Poeilineaddons poeilineaddons)
      {
         this.adapter.POEIUpdateLineAddons(poeilineaddons);
      }
  
      public Poeilineadd POEILineAddInitialize(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEILineAddInitialize(poeidrilldown);
      }
  
      public IEnumerable<Messaging> POEILineAddNewItem(Poeilineadd poeilineadd)
      {
         return this.adapter.POEILineAddNewItem(poeilineadd);
      }
  
      public AspoentryPOEILineAddLeaveFieldResponseAPI POEILineAddLeaveField(AspoentryPOEILineAddLeaveFieldRequestAPI AspoentryPOEILineAddLeaveFieldRequestAPI)
      {
         return this.adapter.POEILineAddLeaveField(AspoentryPOEILineAddLeaveFieldRequestAPI);
      }
  
      public AspoentryPOEIInitializeAddonsVAResponseAPI POEIInitializeAddonsVA(int iPoNo, int iPoSuf)
      {
         return this.adapter.POEIInitializeAddonsVA(iPoNo, iPoSuf);
      }
  
      public void POEIUpdateAddonsVA(AspoentryPOEIUpdateAddonsVARequestAPI AspoentryPOEIUpdateAddonsVARequestAPI)
      {
         this.adapter.POEIUpdateAddonsVA(AspoentryPOEIUpdateAddonsVARequestAPI);
      }
  
      public string POEIInitializeVaSurplus(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEIInitializeVaSurplus(poeidrilldown);
      }
  
      public Poeireceiverno POEIInitializeReceiverNo(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEIInitializeReceiverNo(poeidrilldown);
      }
  
      public AspoentryPOEIReceiverLeaveFieldResponseAPI POEIReceiverLeaveField(AspoentryPOEIReceiverLeaveFieldRequestAPI AspoentryPOEIReceiverLeaveFieldRequestAPI)
      {
         return this.adapter.POEIReceiverLeaveField(AspoentryPOEIReceiverLeaveFieldRequestAPI);
      }
  
      public void POEIUpdateReceiverNo(Poeireceiverno poeireceiverno)
      {
         this.adapter.POEIUpdateReceiverNo(poeireceiverno);
      }
  
      public AspoentryPOEILineBeforeSerialResponseAPI POEILineBeforeSerial(Poeilinedetail poeilinedetail)
      {
         return this.adapter.POEILineBeforeSerial(poeilinedetail);
      }
  
      public AspoentryPOEILineUpdateSerialResponseAPI POEILineUpdateSerial(AspoentryPOEILineUpdateSerialRequestAPI AspoentryPOEILineUpdateSerialRequestAPI)
      {
         return this.adapter.POEILineUpdateSerial(AspoentryPOEILineUpdateSerialRequestAPI);
      }
  
      public AspoentryPOEILineBeforeLotResponseAPI POEILineBeforeLot(Poeilinedetail poeilinedetail)
      {
         return this.adapter.POEILineBeforeLot(poeilinedetail);
      }
  
      public AspoentryPOEILineUpdateLotResponseAPI POEILineUpdateLot(AspoentryPOEILineUpdateLotRequestAPI AspoentryPOEILineUpdateLotRequestAPI)
      {
         return this.adapter.POEILineUpdateLot(AspoentryPOEILineUpdateLotRequestAPI);
      }
  
      public void POEILeaveTrackNo(int iTrackNo)
      {
         this.adapter.POEILeaveTrackNo(iTrackNo);
      }
  
      public AspoentryPORRARLineProgBuyAddWhseResponseAPI PORRARLineProgBuyAddWhse(AspoentryPORRARLineProgBuyAddWhseRequestAPI AspoentryPORRARLineProgBuyAddWhseRequestAPI)
      {
         return this.adapter.PORRARLineProgBuyAddWhse(AspoentryPORRARLineProgBuyAddWhseRequestAPI);
      }
  
      public AspoentryPORRARLineProgBuyChgWhseQtyResponseAPI PORRARLineProgBuyChgWhseQty(AspoentryPORRARLineProgBuyChgWhseQtyRequestAPI AspoentryPORRARLineProgBuyChgWhseQtyRequestAPI)
      {
         return this.adapter.PORRARLineProgBuyChgWhseQty(AspoentryPORRARLineProgBuyChgWhseQtyRequestAPI);
      }
  
      public AspoentryPORRARLineProgBuyDeleteWhseResponseAPI PORRARLineProgBuyDeleteWhse(AspoentryPORRARLineProgBuyDeleteWhseRequestAPI AspoentryPORRARLineProgBuyDeleteWhseRequestAPI)
      {
         return this.adapter.PORRARLineProgBuyDeleteWhse(AspoentryPORRARLineProgBuyDeleteWhseRequestAPI);
      }
  
      public AspoentryPORRARLineProgBuyInitializeResponseAPI PORRARLineProgBuyInitialize(Porrarlineprogbuycriteria porrarlineprogbuycriteria)
      {
         return this.adapter.PORRARLineProgBuyInitialize(porrarlineprogbuycriteria);
      }
  
      public AspoentryPORRARLineProgBuySubmitResponseAPI PORRARLineProgBuySubmit(AspoentryPORRARLineProgBuySubmitRequestAPI AspoentryPORRARLineProgBuySubmitRequestAPI)
      {
         return this.adapter.PORRARLineProgBuySubmit(AspoentryPORRARLineProgBuySubmitRequestAPI);
      }
  
      public IEnumerable<Porrarvendcredit> PORRARVendorCreditRetrieve(decimal dVendorNo)
      {
         return this.adapter.PORRARVendorCreditRetrieve(dVendorNo);
      }
  
      public void PORRARVendorCreditUpdate(AspoentryPORRARVendorCreditUpdateRequestAPI AspoentryPORRARVendorCreditUpdateRequestAPI)
      {
         this.adapter.PORRARVendorCreditUpdate(AspoentryPORRARVendorCreditUpdateRequestAPI);
      }
  
      public AspoentryPOTallyLeaveFieldResponseAPI POTallyLeaveField(AspoentryPOTallyLeaveFieldRequestAPI AspoentryPOTallyLeaveFieldRequestAPI)
      {
         return this.adapter.POTallyLeaveField(AspoentryPOTallyLeaveFieldRequestAPI);
      }
  
      public AspoentryPOTallyCalcNewMixResponseAPI POTallyCalcNewMix(AspoentryPOTallyCalcNewMixRequestAPI AspoentryPOTallyCalcNewMixRequestAPI)
      {
         return this.adapter.POTallyCalcNewMix(AspoentryPOTallyCalcNewMixRequestAPI);
      }
  
      public Loadpotallysingle POTallyDeleteComponent(AspoentryPOTallyDeleteComponentRequestAPI AspoentryPOTallyDeleteComponentRequestAPI)
      {
         return this.adapter.POTallyDeleteComponent(AspoentryPOTallyDeleteComponentRequestAPI);
      }
  
      public AspoentryPOTallyAddChangeComponentResponseAPI POTallyAddChangeComponent(AspoentryPOTallyAddChangeComponentRequestAPI AspoentryPOTallyAddChangeComponentRequestAPI)
      {
         return this.adapter.POTallyAddChangeComponent(AspoentryPOTallyAddChangeComponentRequestAPI);
      }
  
      public AspoentryPOTallyCompLeaveProdResponseAPI POTallyCompLeaveProd(AspoentryPOTallyCompLeaveProdRequestAPI AspoentryPOTallyCompLeaveProdRequestAPI)
      {
         return this.adapter.POTallyCompLeaveProd(AspoentryPOTallyCompLeaveProdRequestAPI);
      }
  
      public Loadpotallycriteria POTallyUpdate(AspoentryPOTallyUpdateRequestAPI AspoentryPOTallyUpdateRequestAPI)
      {
         return this.adapter.POTallyUpdate(AspoentryPOTallyUpdateRequestAPI);
      }
  
      public AspoentryPOBundlesDeleteResponseAPI POBundlesDelete(AspoentryPOBundlesDeleteRequestAPI AspoentryPOBundlesDeleteRequestAPI)
      {
         return this.adapter.POBundlesDelete(AspoentryPOBundlesDeleteRequestAPI);
      }
  
      public AspoentryPOBundlesAddResponseAPI POBundlesAdd(AspoentryPOBundlesAddRequestAPI AspoentryPOBundlesAddRequestAPI)
      {
         return this.adapter.POBundlesAdd(AspoentryPOBundlesAddRequestAPI);
      }
  
      public AspoentryPOBundleIDLoadResponseAPI POBundleIDLoad(AspoentryPOBundleIDLoadRequestAPI AspoentryPOBundleIDLoadRequestAPI)
      {
         return this.adapter.POBundleIDLoad(AspoentryPOBundleIDLoadRequestAPI);
      }
  
      public AspoentryPOBundlesAfterDetailResponseAPI POBundlesAfterDetail(AspoentryPOBundlesAfterDetailRequestAPI AspoentryPOBundlesAfterDetailRequestAPI)
      {
         return this.adapter.POBundlesAfterDetail(AspoentryPOBundlesAfterDetailRequestAPI);
      }
  
      public Pobundlescontrol POBundlesCalcAdjust(AspoentryPOBundlesCalcAdjustRequestAPI AspoentryPOBundlesCalcAdjustRequestAPI)
      {
         return this.adapter.POBundlesCalcAdjust(AspoentryPOBundlesCalcAdjustRequestAPI);
      }
  
      public Pobundlescriteria POEIBundlesDone(AspoentryPOEIBundlesDoneRequestAPI AspoentryPOEIBundlesDoneRequestAPI)
      {
         return this.adapter.POEIBundlesDone(AspoentryPOEIBundlesDoneRequestAPI);
      }
  
      public Icentryserialscriteria POETLineBeforeSerial(AspoentryPOETLineBeforeSerialRequestAPI AspoentryPOETLineBeforeSerialRequestAPI)
      {
         return this.adapter.POETLineBeforeSerial(AspoentryPOETLineBeforeSerialRequestAPI);
      }
  
      public Icentrylotscriteria POETLineBeforeLot(AspoentryPOETLineBeforeLotRequestAPI AspoentryPOETLineBeforeLotRequestAPI)
      {
         return this.adapter.POETLineBeforeLot(AspoentryPOETLineBeforeLotRequestAPI);
      }
  
      public AspoentryPOEARetrieveResponseAPI POEARetrieve(Loadpoeacriteria loadpoeacriteria)
      {
         return this.adapter.POEARetrieve(loadpoeacriteria);
      }
  
      public IEnumerable<Messaging> POEAUpdt(IEnumerable<Updatepoea> updatepoea)
      {
         return this.adapter.POEAUpdt(updatepoea);
      }
  
      public void POEBTDeleteBatch(Poebtdeletebatch poebtdeletebatch)
      {
         this.adapter.POEBTDeleteBatch(poebtdeletebatch);
      }
  
      public IEnumerable<Poebtgetdataresults> POEBTGetData(Poebtgetdatacriteria poebtgetdatacriteria)
      {
         return this.adapter.POEBTGetData(poebtgetdatacriteria);
      }
  
      public void POEBTQueuePutAwayReport(AspoentryPOEBTQueuePutAwayReportRequestAPI AspoentryPOEBTQueuePutAwayReportRequestAPI)
      {
         this.adapter.POEBTQueuePutAwayReport(AspoentryPOEBTQueuePutAwayReportRequestAPI);
      }
  
      public void POEBTUpdateData(Poebtupdatedata poebtupdatedata)
      {
         this.adapter.POEBTUpdateData(poebtupdatedata);
      }
  
      public AspoentryPORRARReportListResponseAPI PORRARReportList(Porrarreptlistcriteria porrarreptlistcriteria)
      {
         return this.adapter.PORRARReportList(porrarreptlistcriteria);
      }
  
      public Porrarrepttotals PORRARReportDelete(AspoentryPORRARReportDeleteRequestAPI AspoentryPORRARReportDeleteRequestAPI)
      {
         return this.adapter.PORRARReportDelete(AspoentryPORRARReportDeleteRequestAPI);
      }
  
      public Porrarreptadjmergetotals PORRARReportAdjustMerge(AspoentryPORRARReportAdjustMergeRequestAPI AspoentryPORRARReportAdjustMergeRequestAPI)
      {
         return this.adapter.PORRARReportAdjustMerge(AspoentryPORRARReportAdjustMergeRequestAPI);
      }
  
      public Porrarreptupdatetotals PORRARReportUpdate(AspoentryPORRARReportUpdateRequestAPI AspoentryPORRARReportUpdateRequestAPI)
      {
         return this.adapter.PORRARReportUpdate(AspoentryPORRARReportUpdateRequestAPI);
      }
  
      public AspoentryPORRARReportVendorChangeResponseAPI PORRARReportVendorChange(AspoentryPORRARReportVendorChangeRequestAPI AspoentryPORRARReportVendorChangeRequestAPI)
      {
         return this.adapter.PORRARReportVendorChange(AspoentryPORRARReportVendorChangeRequestAPI);
      }
  
      public IEnumerable<Porrarreptaddnew> PORRARReportAddNew(IEnumerable<Porrarreptaddnew> porrarreptaddnew)
      {
         return this.adapter.PORRARReportAddNew(porrarreptaddnew);
      }
  
      public AspoentryPORRARReportRefreshDocumentsResponseAPI PORRARReportRefreshDocuments(AspoentryPORRARReportRefreshDocumentsRequestAPI AspoentryPORRARReportRefreshDocumentsRequestAPI)
      {
         return this.adapter.PORRARReportRefreshDocuments(AspoentryPORRARReportRefreshDocumentsRequestAPI);
      }
  
      public Porrarreptheader PORRARReportHeaderLeaveField(AspoentryPORRARReportHeaderLeaveFieldRequestAPI AspoentryPORRARReportHeaderLeaveFieldRequestAPI)
      {
         return this.adapter.PORRARReportHeaderLeaveField(AspoentryPORRARReportHeaderLeaveFieldRequestAPI);
      }
  
      public Porrarreptheader PORRARReportHeaderRetrieve(int iReportNo)
      {
         return this.adapter.PORRARReportHeaderRetrieve(iReportNo);
      }
  
      public AspoentryPORRARReportHeaderUpdateResponseAPI PORRARReportHeaderUpdate(Porrarreptheader porrarreptheader)
      {
         return this.adapter.PORRARReportHeaderUpdate(porrarreptheader);
      }
  
      public void PORRARReportHeaderAcceptDenyAll(int iReportNo, bool lAccept)
      {
         this.adapter.PORRARReportHeaderAcceptDenyAll(iReportNo, lAccept);
      }
  
      public AspoentryPORRARReportCombineInqResponseAPI PORRARReportCombineInq(int iReportNo)
      {
         return this.adapter.PORRARReportCombineInq(iReportNo);
      }
  
      public AspoentryPORRARReportAdjustRetrieveResponseAPI PORRARReportAdjustRetrieve(int iReportNo)
      {
         return this.adapter.PORRARReportAdjustRetrieve(iReportNo);
      }
  
      public void PORRARReportAdjustCancel(AspoentryPORRARReportAdjustCancelRequestAPI AspoentryPORRARReportAdjustCancelRequestAPI)
      {
         this.adapter.PORRARReportAdjustCancel(AspoentryPORRARReportAdjustCancelRequestAPI);
      }
  
      public Porrarreptadjcalc PORRARReportAdjustCalc(Porrarreptadjcalc porrarreptadjcalc)
      {
         return this.adapter.PORRARReportAdjustCalc(porrarreptadjcalc);
      }
  
      public Porrarreptadjdaysinit PORRARReportAdjustDaysInit(Porrarreptadjdaysinit porrarreptadjdaysinit)
      {
         return this.adapter.PORRARReportAdjustDaysInit(porrarreptadjdaysinit);
      }
  
      public Porrarreptadjdaysupdt PORRARReportAdjustDaysUpdate(AspoentryPORRARReportAdjustDaysUpdateRequestAPI AspoentryPORRARReportAdjustDaysUpdateRequestAPI)
      {
         return this.adapter.PORRARReportAdjustDaysUpdate(AspoentryPORRARReportAdjustDaysUpdateRequestAPI);
      }
  
      public Porrarreptnewreptinit PORRARReportNewReptInit(string cBuyer)
      {
         return this.adapter.PORRARReportNewReptInit(cBuyer);
      }
  
      public void PORRARReportNewReptRun(AspoentryPORRARReportNewReptRunRequestAPI AspoentryPORRARReportNewReptRunRequestAPI)
      {
         this.adapter.PORRARReportNewReptRun(AspoentryPORRARReportNewReptRunRequestAPI);
      }
  
      public Porrarreptmergeinit PORRARReportMergeInit(string cBuyer)
      {
         return this.adapter.PORRARReportMergeInit(cBuyer);
      }
  
      public void PORRARReportMergeRun(AspoentryPORRARReportMergeRunRequestAPI AspoentryPORRARReportMergeRunRequestAPI)
      {
         this.adapter.PORRARReportMergeRun(AspoentryPORRARReportMergeRunRequestAPI);
      }
  
      public AspoentryPOERBValidateBlanketOrderResponseAPI POERBValidateBlanketOrder(AspoentryPOERBValidateBlanketOrderRequestAPI AspoentryPOERBValidateBlanketOrderRequestAPI)
      {
         return this.adapter.POERBValidateBlanketOrder(AspoentryPOERBValidateBlanketOrderRequestAPI);
      }
  
      public AspoentryPOERBBuildBlanketTempTableResponseAPI POERBBuildBlanketTempTable(Poblanketcriteria poblanketcriteria)
      {
         return this.adapter.POERBBuildBlanketTempTable(poblanketcriteria);
      }
  
      public Poblanketcheckshipfmnosingle POERBCheckChangeOfShipFmNo(Poblanketcheckshipfmnocrit poblanketcheckshipfmnocrit)
      {
         return this.adapter.POERBCheckChangeOfShipFmNo(poblanketcheckshipfmnocrit);
      }
  
      public Poblanketupdateresults POERBUpdateExistingOrder(Poblanketupdatecriteria poblanketupdatecriteria)
      {
         return this.adapter.POERBUpdateExistingOrder(poblanketupdatecriteria);
      }
  
      public IEnumerable<Poblanketdeleteresults> POERBDeleteBlanketReleases(AspoentryPOERBDeleteBlanketReleasesRequestAPI AspoentryPOERBDeleteBlanketReleasesRequestAPI)
      {
         return this.adapter.POERBDeleteBlanketReleases(AspoentryPOERBDeleteBlanketReleasesRequestAPI);
      }
  
      public Poblanketreleasesingle POERBSetupScreenForNextRelease(Poblanketreleasecriteria poblanketreleasecriteria)
      {
         return this.adapter.POERBSetupScreenForNextRelease(poblanketreleasecriteria);
      }
  
      public IEnumerable<Messaging> POERBCreateNewBlanketRelease(AspoentryPOERBCreateNewBlanketReleaseRequestAPI AspoentryPOERBCreateNewBlanketReleaseRequestAPI)
      {
         return this.adapter.POERBCreateNewBlanketRelease(AspoentryPOERBCreateNewBlanketReleaseRequestAPI);
      }
  
      public Poblanketreleasesingle POERBDisplayShipToInformation(AspoentryPOERBDisplayShipToInformationRequestAPI AspoentryPOERBDisplayShipToInformationRequestAPI)
      {
         return this.adapter.POERBDisplayShipToInformation(AspoentryPOERBDisplayShipToInformationRequestAPI);
      }
  
      public Poblanketreleasesingle POERBDisplayBillToInformation(AspoentryPOERBDisplayBillToInformationRequestAPI AspoentryPOERBDisplayBillToInformationRequestAPI)
      {
         return this.adapter.POERBDisplayBillToInformation(AspoentryPOERBDisplayBillToInformationRequestAPI);
      }
  
      public Poblanketreleasesingle POERBDisplayShipFmNoInformation(AspoentryPOERBDisplayShipFmNoInformationRequestAPI AspoentryPOERBDisplayShipFmNoInformationRequestAPI)
      {
         return this.adapter.POERBDisplayShipFmNoInformation(AspoentryPOERBDisplayShipFmNoInformationRequestAPI);
      }
  
      public Poblanketbannersingle POERBInitializeBannner(Poblanketbannercriteria poblanketbannercriteria)
      {
         return this.adapter.POERBInitializeBannner(poblanketbannercriteria);
      }
  
      public AspoentryPOERBLogOffResponseAPI POERBLogOff(AspoentryPOERBLogOffRequestAPI AspoentryPOERBLogOffRequestAPI)
      {
         return this.adapter.POERBLogOff(AspoentryPOERBLogOffRequestAPI);
      }
  
      public Poblanketheadersingle POERBDisplayBlanketHeader(Poblanketheadercriteria poblanketheadercriteria)
      {
         return this.adapter.POERBDisplayBlanketHeader(poblanketheadercriteria);
      }
  
      public Poblanketheadersingle POERBUpdateBlanketHeaderShipViaTy(AspoentryPOERBUpdateBlanketHeaderShipViaTyRequestAPI AspoentryPOERBUpdateBlanketHeaderShipViaTyRequestAPI)
      {
         return this.adapter.POERBUpdateBlanketHeaderShipViaTy(AspoentryPOERBUpdateBlanketHeaderShipViaTyRequestAPI);
      }
  
      public Poblanketheadersingle POERBUpdateBlanketHeader(AspoentryPOERBUpdateBlanketHeaderRequestAPI AspoentryPOERBUpdateBlanketHeaderRequestAPI)
      {
         return this.adapter.POERBUpdateBlanketHeader(AspoentryPOERBUpdateBlanketHeaderRequestAPI);
      }
  
      public AspoentryPOERBBuildBlanketLinesResponseAPI POERBBuildBlanketLines(Poblanketlinescriteria poblanketlinescriteria)
      {
         return this.adapter.POERBBuildBlanketLines(poblanketlinescriteria);
      }
  
      public AspoentryPOERBUpdateBlanketLineResponseAPI POERBUpdateBlanketLine(AspoentryPOERBUpdateBlanketLineRequestAPI AspoentryPOERBUpdateBlanketLineRequestAPI)
      {
         return this.adapter.POERBUpdateBlanketLine(AspoentryPOERBUpdateBlanketLineRequestAPI);
      }
  
      public AspoentryPOERBInitBlanketUpdByReleaseResponseAPI POERBInitBlanketUpdByRelease(Poblanketupdbyreleasecrit poblanketupdbyreleasecrit)
      {
         return this.adapter.POERBInitBlanketUpdByRelease(poblanketupdbyreleasecrit);
      }
  
      public AspoentryPOERBBlanketUpdByReleaseUpdateResponseAPI POERBBlanketUpdByReleaseUpdate(AspoentryPOERBBlanketUpdByReleaseUpdateRequestAPI AspoentryPOERBBlanketUpdByReleaseUpdateRequestAPI)
      {
         return this.adapter.POERBBlanketUpdByReleaseUpdate(AspoentryPOERBBlanketUpdByReleaseUpdateRequestAPI);
      }
  
      public AspoentryPOERBBlanketUpdByReleaseFinalUpdateResponseAPI POERBBlanketUpdByReleaseFinalUpdate(AspoentryPOERBBlanketUpdByReleaseFinalUpdateRequestAPI AspoentryPOERBBlanketUpdByReleaseFinalUpdateRequestAPI)
      {
         return this.adapter.POERBBlanketUpdByReleaseFinalUpdate(AspoentryPOERBBlanketUpdByReleaseFinalUpdateRequestAPI);
      }
  
      public AspoentryPORRARLineDisplayResponseAPI PORRARLineDisplay(int iReportNo)
      {
         return this.adapter.PORRARLineDisplay(iReportNo);
      }
  
      public Porrarlineadd PORRARLineAddLeaveField(AspoentryPORRARLineAddLeaveFieldRequestAPI AspoentryPORRARLineAddLeaveFieldRequestAPI)
      {
         return this.adapter.PORRARLineAddLeaveField(AspoentryPORRARLineAddLeaveFieldRequestAPI);
      }
  
      public AspoentryPORRARLineAddCreateResponseAPI PORRARLineAddCreate(Porrarlineadd porrarlineadd)
      {
         return this.adapter.PORRARLineAddCreate(porrarlineadd);
      }
  
      public AspoentryPORRARLineChangeResponseAPI PORRARLineChange(Porrarlinechange porrarlinechange)
      {
         return this.adapter.PORRARLineChange(porrarlinechange);
      }
  
      public AspoentryPORRARLineAcceptResponseAPI PORRARLineAccept(AspoentryPORRARLineAcceptRequestAPI AspoentryPORRARLineAcceptRequestAPI)
      {
         return this.adapter.PORRARLineAccept(AspoentryPORRARLineAcceptRequestAPI);
      }
  
      public AspoentryPORRARLineLockUnlockResponseAPI PORRARLineLockUnlock(IEnumerable<Porrarlineaccept> porrarlineaccept)
      {
         return this.adapter.PORRARLineLockUnlock(porrarlineaccept);
      }
  
      public Porrarlineextend PORRARLineExtendRetrieve(Porrarlineextend porrarlineextend)
      {
         return this.adapter.PORRARLineExtendRetrieve(porrarlineextend);
      }
  
      public Porrarlineextend PORRARLineExtendUpdate(Porrarlineextend porrarlineextend)
      {
         return this.adapter.PORRARLineExtendUpdate(porrarlineextend);
      }
  
      public Porrarlineqtybreak PORRARLineQtyBreak(Porrarlineqtybreak porrarlineqtybreak)
      {
         return this.adapter.PORRARLineQtyBreak(porrarlineqtybreak);
      }
  
      public IEnumerable<Porrarlinemsgresults> PORRARLineMessages(Porrarlinemsgcriteria porrarlinemsgcriteria)
      {
         return this.adapter.PORRARLineMessages(porrarlinemsgcriteria);
      }
  
      public void PORRARReportFullRefreshRun(AspoentryPORRARReportFullRefreshRunRequestAPI AspoentryPORRARReportFullRefreshRunRequestAPI)
      {
         this.adapter.PORRARReportFullRefreshRun(AspoentryPORRARReportFullRefreshRunRequestAPI);
      }
  
      public void PORRARReportCheckDrilldownAccess(int iReportNo)
      {
         this.adapter.PORRARReportCheckDrilldownAccess(iReportNo);
      }
  
      public void PORRARReportUnlockHeader(int iReportNo)
      {
         this.adapter.PORRARReportUnlockHeader(iReportNo);
      }
  
      public AspoentryPOEIRefreshDocumentsResponseAPI POEIRefreshDocuments(Poeilistcriteria poeilistcriteria)
      {
         return this.adapter.POEIRefreshDocuments(poeilistcriteria);
      }
  
      public Poeicancelwork POEICancelWork(Poeicancelwork poeicancelwork)
      {
         return this.adapter.POEICancelWork(poeicancelwork);
      }
  
      public Poeifullreceipt POEIReceiptStart(AspoentryPOEIReceiptStartRequestAPI AspoentryPOEIReceiptStartRequestAPI)
      {
         return this.adapter.POEIReceiptStart(AspoentryPOEIReceiptStartRequestAPI);
      }
  
      public AspoentryPOEIReceiptFinishResponseAPI POEIReceiptFinish(Poeifullreceipt poeifullreceipt)
      {
         return this.adapter.POEIReceiptFinish(poeifullreceipt);
      }
  
      public void POEIReceiptReportPrint(AspoentryPOEIReceiptReportPrintRequestAPI AspoentryPOEIReceiptReportPrintRequestAPI)
      {
         this.adapter.POEIReceiptReportPrint(AspoentryPOEIReceiptReportPrintRequestAPI);
      }
  
      public Poeifinalinit POEIFinalInit(int iJrnlNo, string cWhse)
      {
         return this.adapter.POEIFinalInit(iJrnlNo, cWhse);
      }
  
      public IEnumerable<Messaging> POEIFinalUpdate(Poeifinalupdate poeifinalupdate)
      {
         return this.adapter.POEIFinalUpdate(poeifinalupdate);
      }
  
      public void POEIFinalUpdateAfter(int iJrnlNo)
      {
         this.adapter.POEIFinalUpdateAfter(iJrnlNo);
      }
  
      public string POEICheckDrillDownAccess(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEICheckDrillDownAccess(poeidrilldown);
      }
  
      public AspoentryPOEIInitializeHeaderResponseAPI POEIInitializeHeader(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEIInitializeHeader(poeidrilldown);
      }
  
      public void POEIUpdateHeader(Poeidetailheader poeidetailheader)
      {
         this.adapter.POEIUpdateHeader(poeidetailheader);
      }
  
      public IEnumerable<Poeilinedetail> POEIDisplayLines(Poeidrilldown poeidrilldown)
      {
         return this.adapter.POEIDisplayLines(poeidrilldown);
      }
  
      public AspoentryPOEILineUpdateResponseAPI POEILineUpdate(Poeilinedetail poeilinedetail)
      {
         return this.adapter.POEILineUpdate(poeilinedetail);
      }
  
      public Poeilinedetail POEILineLeaveField(AspoentryPOEILineLeaveFieldRequestAPI AspoentryPOEILineLeaveFieldRequestAPI)
      {
         return this.adapter.POEILineLeaveField(AspoentryPOEILineLeaveFieldRequestAPI);
      }
  
      public AspoentryPOEILineSubSuperUpdateResponseAPI POEILineSubSuperUpdate(Poeilinesubsuper poeilinesubsuper)
      {
         return this.adapter.POEILineSubSuperUpdate(poeilinesubsuper);
      }
  
      public Poeilineextend POEILineExtendInitialize(Poeilineextend poeilineextend)
      {
         return this.adapter.POEILineExtendInitialize(poeilineextend);
      }
  
      public void POEILineExtendUpdate(Poeilineextend poeilineextend)
      {
         this.adapter.POEILineExtendUpdate(poeilineextend);
      }
  
      public void POEILineReprice(Poeilinereprice poeilinereprice)
      {
         this.adapter.POEILineReprice(poeilinereprice);
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
  