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
    
namespace Infor.Sxe.TWL.Data.Repositories
{
   using Infor.Sxe.TWL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsaltloclistcriteria;
   using Models.Pdsaltloclistresults;
   using Models.Pdsactivepalletscriteria;
   using Models.Pdsactivepallets;
   using Models.Pdsinventorylistcriteria;
   using Models.Pdsinventorylistresults;
   using Models.Pdsinventorydetailcriteria;
   using Models.Pdsinventorydetail;
   using Models.Pdsitembucketdetailcriteria;
   using Models.Pdsitembucketdetail;
   using Models.Pdsphysuncountedloccriteria;
   using Models.Pdsphysuncountedlocresults;
   using Models.Pdslocpendingpickcriteria;
   using Models.Pdslocpendingpickresults;
   using Models.Pdspick;
   using Models.Pdscartoninfocriteria;
   using Models.Pdscartonmst;
   using Models.Pdscartoncontentscriteria;
   using Models.Pdscartoncontents;
   using Models.Pdslocpendmoverepcriteria;
   using Models.Pdslocpendmoverepresults;
   using Models.Pdsmovemst;
   using Models.Pdsphysuncountedinvcriteria;
   using Models.Pdsphysuncountedinvresults;
   using Models.Pdsphysinv;
   using Models.Pdsphysinvdisclocresults;
   using Models.Pdsphysinvdiscinvresults;
   using Models.Pdssyspadate;
   using Models.Pdszonebincriteria;
   using Models.Pdszonebins;
   using Models.Pdszoneinventorycriteria;
   using Models.Pdszoneinventory;
   using Models.Pdszonereplenishmentcriteria;
   using Models.Pdszonereplenishments;
   using Models.Pdsinvtranscriteria;
   using Models.Pdsinvtrans;
   using Models.Pdsinvmovementcriteria;
   using Models.Pdsinvmovement;
   using Models.Pdsinvpickscriteria;
   using Models.Pdsinvpicks;
   using Models.Pdsinvreplcriteria;
   using Models.Pdsinvrepl;
   using Models.Pdsinvserialscriteria;
   using Models.Pdsinvserials;
   using Models.Pdsccinquirycriteria;
   using Models.Pdsccinquirysummary;
   using Models.Pdsccwavelistcriteria;
   using Models.Pdsccwavelist;
   using Models.Pdsccinvdisccriteria;
   using Models.Pdsccinvdisc;
   using Models.Pdsccinvtranscriteria;
   using Models.Pdsccinvtrans;
   using Models.Pdscarriercriteria;
   using Models.Pdscarrierlist;
   using Models.Pdsemptransdetailcriteria;
   using Models.Pdsemptransdetail;
   using Models.Pdsordertransdetailcriteria;
   using Models.Pdsordertransdetail;
   using Models.Pdsemptranssummarycriteria;
   using Models.Pdsemptranssummary;
   using Models.Pdseodrunhist;
   using Models.Pdsomwaveinfocriteria;
   using Models.Pdsomwaveinfo;
   using Models.Pdsomorderlistcriteria;
   using Models.Pdsomorderlist;
   using Models.Pdsomordersummary;
   using Models.Pdsomorderexceptionlistcriteria;
   using Models.Pdsomorderexceptionlist;
   using Models.Pdsomorderkey;
   using Models.Pdsomorderexceptionholdlines;
   using Models.Pdsdbconnectsum;
   using Models.Pdsdbconnectdtl;
   using Models.Pdsdbfieldnamecriteria;
   using Models.Pdsdbfieldnameresults;
   using Models.Pdsitemaltwhsecriteria;
   using Models.Pdsitemaltwhsetot;
   using Models.Pdsitemaltwhse;
   using Models.Pdsitemavailcriteria;
   using Models.Pdsitemavailprime;
   using Models.Pdsitemavail;
   using Models.Pdsitemintranscriteria;
   using Models.Pdsitemintrans;
   using Models.Pdsitemoutordcriteria;
   using Models.Pdsitemoutord;
   using Models.Pdsitemresvcriteria;
   using Models.Pdsitemresv;
   using Models.Pdsitemtranscriteria;
   using Models.Pdsitemtrans;
   using Models.Pdsitemunavailcriteria;
   using Models.Pdsitemunavail;
   using Models.Pdsitemlistcriteria;
   using Models.Pdsitemlist;
   using Models.Pdsitemdetailcriteria;
   using Models.Pdsitemdetail;
   using Models.Pdsitemhistdtlcriteria;
   using Models.Pdsitemhistdtl;
   using Models.Pdsorderinquirylistcriteria;
   using Models.Pdsorderinquirylist;
   using Models.Pdsorderdetail;
   using Models.Pdsserialhistorycriteria;
   using Models.Pdsserialhistorylist;
   using Models.Pdsordercartoncriteria;
   using Models.Pdsordercartonresults;
   using Models.Pdsomopencountcriteria;
   using Models.Pdsomopencounts;
   using Models.Pdscommentcriteria;
   using Models.Pdscommentresults;
   using Models.Pdswavesummary;
   using Models.Pdsgetpocriteria;
   using Models.Pdsgetporesults;
   using Models.Pdsgetvendorcriteria;
   using Models.Pdsgetvendorresults;
   using Models.Pdsordermanifests;
   using Models.Pdsorderavailsummary;
   using Models.Pdsorderavail;
   using Models.Pdsomorderlinekey;
   using Models.Pdsorderlinetransinfo;
   using Models.Pdsmanifestcriteria;
   using Models.Pdsmanifestresults;
   using Models.Pdsitemlotcriteria;
   using Models.Pdsitemlottotals;
   using Models.Pdsitemlotsummary;
   using Models.Pdsitemlotexpiration;
   using Models.Pdsdrplogcriteria;
   using Models.Pdsdrplogresults;
   using Models.Complex;

   public partial class AstwlinquiryRepository : RepositoryBase
   {
      private AstwlinquiryAdapter adapter;
  
      public AstwlinquiryRepository(IProgressConnection connection)
      {
         this.adapter = new AstwlinquiryAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public AstwlinquiryGetAltLocListResponseAPI GetAltLocList(Altloclistcriteria altloclistcriteria)
      {
         return this.adapter.GetAltLocList(altloclistcriteria);
      }
  
      public IEnumerable<Activepallets> GetActivePallets(Activepalletscriteria activepalletscriteria)
      {
         return this.adapter.GetActivePallets(activepalletscriteria);
      }
  
      public AstwlinquiryGetInventoryListResponseAPI GetInventoryList(Inventorylistcriteria inventorylistcriteria)
      {
         return this.adapter.GetInventoryList(inventorylistcriteria);
      }
  
      public Inventorydetail GetInventoryDetail(Inventorydetailcriteria inventorydetailcriteria)
      {
         return this.adapter.GetInventoryDetail(inventorydetailcriteria);
      }
  
      public Itembucketdetail GetItemBucketDetail(Itembucketdetailcriteria itembucketdetailcriteria)
      {
         return this.adapter.GetItemBucketDetail(itembucketdetailcriteria);
      }
  
      public IEnumerable<Physuncountedlocresults> GetPhysInvUncountedLocations(Physuncountedloccriteria physuncountedloccriteria)
      {
         return this.adapter.GetPhysInvUncountedLocations(physuncountedloccriteria);
      }
  
      public AstwlinquiryGetLocationPendingPickResponseAPI GetLocationPendingPick(Locpendingpickcriteria locpendingpickcriteria)
      {
         return this.adapter.GetLocationPendingPick(locpendingpickcriteria);
      }
  
      public IEnumerable<Cartonmst> GetCartonInfo(Cartoninfocriteria cartoninfocriteria)
      {
         return this.adapter.GetCartonInfo(cartoninfocriteria);
      }
  
      public IEnumerable<Cartoncontents> GetCartonContents(Cartoncontentscriteria cartoncontentscriteria)
      {
         return this.adapter.GetCartonContents(cartoncontentscriteria);
      }
  
      public AstwlinquiryGetLocationPendingMoveResponseAPI GetLocationPendingMove(AstwlinquiryGetLocationPendingMoveRequestAPI AstwlinquiryGetLocationPendingMoveRequestAPI)
      {
         return this.adapter.GetLocationPendingMove(AstwlinquiryGetLocationPendingMoveRequestAPI);
      }
  
      public IEnumerable<Physuncountedinvresults> GetPhysInvUncountedInventory(Physuncountedinvcriteria physuncountedinvcriteria)
      {
         return this.adapter.GetPhysInvUncountedInventory(physuncountedinvcriteria);
      }
  
      public AstwlinquiryGetPhysInvDiscLocationsResponseAPI GetPhysInvDiscLocations(IEnumerable<Physinv> physinv)
      {
         return this.adapter.GetPhysInvDiscLocations(physinv);
      }
  
      public AstwlinquiryGetPhysInvDiscInventoryResponseAPI GetPhysInvDiscInventory(IEnumerable<Physinv> physinv)
      {
         return this.adapter.GetPhysInvDiscInventory(physinv);
      }
  
      public string GetSysPaCharacter(AstwlinquiryGetSysPaCharacterRequestAPI AstwlinquiryGetSysPaCharacterRequestAPI)
      {
         return this.adapter.GetSysPaCharacter(AstwlinquiryGetSysPaCharacterRequestAPI);
      }
  
      public Syspadate GetSysPaDate(string pvTwlcompany, string pvTwlwarehouse, int pvParameterid)
      {
         return this.adapter.GetSysPaDate(pvTwlcompany, pvTwlwarehouse, pvParameterid);
      }
  
      public string GetSysPaDateTime(AstwlinquiryGetSysPaDateTimeRequestAPI AstwlinquiryGetSysPaDateTimeRequestAPI)
      {
         return this.adapter.GetSysPaDateTime(AstwlinquiryGetSysPaDateTimeRequestAPI);
      }
  
      public decimal GetSysPaDecimal(AstwlinquiryGetSysPaDecimalRequestAPI AstwlinquiryGetSysPaDecimalRequestAPI)
      {
         return this.adapter.GetSysPaDecimal(AstwlinquiryGetSysPaDecimalRequestAPI);
      }
  
      public int GetSysPaInteger(AstwlinquiryGetSysPaIntegerRequestAPI AstwlinquiryGetSysPaIntegerRequestAPI)
      {
         return this.adapter.GetSysPaInteger(AstwlinquiryGetSysPaIntegerRequestAPI);
      }
  
      public bool GetSysPaLogical(AstwlinquiryGetSysPaLogicalRequestAPI AstwlinquiryGetSysPaLogicalRequestAPI)
      {
         return this.adapter.GetSysPaLogical(AstwlinquiryGetSysPaLogicalRequestAPI);
      }
  
      public AstwlinquiryGetZoneBinsResponseAPI GetZoneBins(Zonebincriteria zonebincriteria)
      {
         return this.adapter.GetZoneBins(zonebincriteria);
      }
  
      public IEnumerable<Zoneinventory> GetZoneInventory(Zoneinventorycriteria zoneinventorycriteria)
      {
         return this.adapter.GetZoneInventory(zoneinventorycriteria);
      }
  
      public IEnumerable<Zonereplenishments> GetZoneReplenishments(Zonereplenishmentcriteria zonereplenishmentcriteria)
      {
         return this.adapter.GetZoneReplenishments(zonereplenishmentcriteria);
      }
  
      public IEnumerable<Invtrans> GetInvTransactions(Invtranscriteria invtranscriteria)
      {
         return this.adapter.GetInvTransactions(invtranscriteria);
      }
  
      public IEnumerable<Invmovement> GetInvPendingMovement(Invmovementcriteria invmovementcriteria)
      {
         return this.adapter.GetInvPendingMovement(invmovementcriteria);
      }
  
      public AstwlinquiryGetInvPendingPicksResponseAPI GetInvPendingPicks(Invpickscriteria invpickscriteria)
      {
         return this.adapter.GetInvPendingPicks(invpickscriteria);
      }
  
      public IEnumerable<Invrepl> GetInvPendingRepl(Invreplcriteria invreplcriteria)
      {
         return this.adapter.GetInvPendingRepl(invreplcriteria);
      }
  
      public IEnumerable<Invserials> GetInvSerialNumbers(Invserialscriteria invserialscriteria)
      {
         return this.adapter.GetInvSerialNumbers(invserialscriteria);
      }
  
      public AstwlinquiryGetCCWaveDetailResponseAPI GetCCWaveDetail(Ccinquirycriteria ccinquirycriteria)
      {
         return this.adapter.GetCCWaveDetail(ccinquirycriteria);
      }
  
      public IEnumerable<Ccwavelist> GetCCWaveList(Ccwavelistcriteria ccwavelistcriteria)
      {
         return this.adapter.GetCCWaveList(ccwavelistcriteria);
      }
  
      public IEnumerable<Ccinvdisc> GetCCInvDiscrepancies(Ccinvdisccriteria ccinvdisccriteria)
      {
         return this.adapter.GetCCInvDiscrepancies(ccinvdisccriteria);
      }
  
      public AstwlinquiryGetCCTransactionsResponseAPI GetCCTransactions(Ccinvtranscriteria ccinvtranscriteria)
      {
         return this.adapter.GetCCTransactions(ccinvtranscriteria);
      }
  
      public IEnumerable<Carrierlist> GetCarrierList(Carriercriteria carriercriteria)
      {
         return this.adapter.GetCarrierList(carriercriteria);
      }
  
      public IEnumerable<Emptransdetail> GetEmpTransDetail(Emptransdetailcriteria emptransdetailcriteria)
      {
         return this.adapter.GetEmpTransDetail(emptransdetailcriteria);
      }
  
      public IEnumerable<Ordertransdetail> GetOrderTransDetail(Ordertransdetailcriteria ordertransdetailcriteria)
      {
         return this.adapter.GetOrderTransDetail(ordertransdetailcriteria);
      }
  
      public AstwlinquiryGetEmpTransSummaryResponseAPI GetEmpTransSummary(Emptranssummarycriteria emptranssummarycriteria)
      {
         return this.adapter.GetEmpTransSummary(emptranssummarycriteria);
      }
  
      public IEnumerable<Eodrunhist> GetEodRunHistory()
      {
         return this.adapter.GetEodRunHistory();
      }
  
      public Omwaveinfo GetOMWaveInfo(Omwaveinfocriteria omwaveinfocriteria)
      {
         return this.adapter.GetOMWaveInfo(omwaveinfocriteria);
      }
  
      public AstwlinquiryGetOMOrderListResponseAPI GetOMOrderList(Omorderlistcriteria omorderlistcriteria)
      {
         return this.adapter.GetOMOrderList(omorderlistcriteria);
      }
  
      public AstwlinquiryGetOMOrderExceptionListResponseAPI GetOMOrderExceptionList(Omorderexceptionlistcriteria omorderexceptionlistcriteria)
      {
         return this.adapter.GetOMOrderExceptionList(omorderexceptionlistcriteria);
      }
  
      public AstwlinquiryGetOMOrderExceptionHoldLinesResponseAPI GetOMOrderExceptionHoldLines(Omorderkey omorderkey)
      {
         return this.adapter.GetOMOrderExceptionHoldLines(omorderkey);
      }
  
      public AstwlinquiryGetDbConnectionsResponseAPI GetDbConnections()
      {
         return this.adapter.GetDbConnections();
      }
  
      public IEnumerable<Dbfieldnameresults> GetDbFieldNames(Dbfieldnamecriteria dbfieldnamecriteria)
      {
         return this.adapter.GetDbFieldNames(dbfieldnamecriteria);
      }
  
      public AstwlinquiryGetItemAltWhseDetailResponseAPI GetItemAltWhseDetail(Itemaltwhsecriteria itemaltwhsecriteria)
      {
         return this.adapter.GetItemAltWhseDetail(itemaltwhsecriteria);
      }
  
      public AstwlinquiryGetItemAvailDetailResponseAPI GetItemAvailDetail(Itemavailcriteria itemavailcriteria)
      {
         return this.adapter.GetItemAvailDetail(itemavailcriteria);
      }
  
      public IEnumerable<Itemintrans> GetItemIntransDetail(Itemintranscriteria itemintranscriteria)
      {
         return this.adapter.GetItemIntransDetail(itemintranscriteria);
      }
  
      public IEnumerable<Itemoutord> GetItemOutOrdDetail(Itemoutordcriteria itemoutordcriteria)
      {
         return this.adapter.GetItemOutOrdDetail(itemoutordcriteria);
      }
  
      public IEnumerable<Itemresv> GetItemResvDetail(Itemresvcriteria itemresvcriteria)
      {
         return this.adapter.GetItemResvDetail(itemresvcriteria);
      }
  
      public AstwlinquiryGetItemTransDetailResponseAPI GetItemTransDetail(Itemtranscriteria itemtranscriteria)
      {
         return this.adapter.GetItemTransDetail(itemtranscriteria);
      }
  
      public IEnumerable<Itemunavail> GetItemUnavailDetail(Itemunavailcriteria itemunavailcriteria)
      {
         return this.adapter.GetItemUnavailDetail(itemunavailcriteria);
      }
  
      public AstwlinquiryGetItemListResponseAPI GetItemList(Itemlistcriteria itemlistcriteria)
      {
         return this.adapter.GetItemList(itemlistcriteria);
      }
  
      public Itemdetail GetItemDetail(Itemdetailcriteria itemdetailcriteria)
      {
         return this.adapter.GetItemDetail(itemdetailcriteria);
      }
  
      public IEnumerable<Itemhistdtl> GetItemHistoryDetail(Itemhistdtlcriteria itemhistdtlcriteria)
      {
         return this.adapter.GetItemHistoryDetail(itemhistdtlcriteria);
      }
  
      public AstwlinquiryGetOrderInquiryListResponseAPI GetOrderInquiryList(Orderinquirylistcriteria orderinquirylistcriteria)
      {
         return this.adapter.GetOrderInquiryList(orderinquirylistcriteria);
      }
  
      public AstwlinquiryGetOrderDetailResponseAPI GetOrderDetail(Omorderkey omorderkey)
      {
         return this.adapter.GetOrderDetail(omorderkey);
      }
  
      public IEnumerable<Serialhistorylist> GetSerialHistory(Serialhistorycriteria serialhistorycriteria)
      {
         return this.adapter.GetSerialHistory(serialhistorycriteria);
      }
  
      public AstwlinquiryGetOrderCartonResponseAPI GetOrderCarton(Ordercartoncriteria ordercartoncriteria)
      {
         return this.adapter.GetOrderCarton(ordercartoncriteria);
      }
  
      public AstwlinquiryGetOpenCountsResponseAPI GetOpenCounts(Opencountcriteria opencountcriteria)
      {
         return this.adapter.GetOpenCounts(opencountcriteria);
      }
  
      public IEnumerable<Commentresults> GetComments(Commentcriteria commentcriteria)
      {
         return this.adapter.GetComments(commentcriteria);
      }
  
      public AstwlinquiryGetWaveSummaryResponseAPI GetWaveSummary(Wavesummarycriteria wavesummarycriteria)
      {
         return this.adapter.GetWaveSummary(wavesummarycriteria);
      }
  
      public AstwlinquiryGetPOListResponseAPI GetPOList(Getpocriteria getpocriteria)
      {
         return this.adapter.GetPOList(getpocriteria);
      }
  
      public AstwlinquiryGetVendorListResponseAPI GetVendorList(Getvendorcriteria getvendorcriteria)
      {
         return this.adapter.GetVendorList(getvendorcriteria);
      }
  
      public IEnumerable<Ordermanifests> GetOrderManifests(Omorderkey omorderkey)
      {
         return this.adapter.GetOrderManifests(omorderkey);
      }
  
      public AstwlinquiryGetOrderAvailabilityResponseAPI GetOrderAvailability(Omorderkey omorderkey)
      {
         return this.adapter.GetOrderAvailability(omorderkey);
      }
  
      public Orderlinetransinfo GetOrderLineTransInfo(Omorderlinekey omorderlinekey)
      {
         return this.adapter.GetOrderLineTransInfo(omorderlinekey);
      }
  
      public IEnumerable<Manifestresults> GetShippingManifests(Manifestcriteria manifestcriteria)
      {
         return this.adapter.GetShippingManifests(manifestcriteria);
      }
  
      public AstwlinquiryGetItemLotSummaryResponseAPI GetItemLotSummary(Itemlotcriteria itemlotcriteria)
      {
         return this.adapter.GetItemLotSummary(itemlotcriteria);
      }
  
      public AstwlinquiryGetDrpLogResponseAPI GetDrpLog(Drplogcriteria drplogcriteria)
      {
         return this.adapter.GetDrpLog(drplogcriteria);
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
  