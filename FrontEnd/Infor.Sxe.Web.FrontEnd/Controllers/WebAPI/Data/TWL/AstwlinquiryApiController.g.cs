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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.TWL
{  
   using Sxe.TWL.Data.Models.PdsContext;
   using Sxe.TWL.Data.Models.Pdsaltloclistcriteria;
   using Sxe.TWL.Data.Models.Pdsaltloclistresults;
   using Sxe.TWL.Data.Models.Pdsactivepalletscriteria;
   using Sxe.TWL.Data.Models.Pdsactivepallets;
   using Sxe.TWL.Data.Models.Pdsinventorylistcriteria;
   using Sxe.TWL.Data.Models.Pdsinventorylistresults;
   using Sxe.TWL.Data.Models.Pdsinventorydetailcriteria;
   using Sxe.TWL.Data.Models.Pdsinventorydetail;
   using Sxe.TWL.Data.Models.Pdsitembucketdetailcriteria;
   using Sxe.TWL.Data.Models.Pdsitembucketdetail;
   using Sxe.TWL.Data.Models.Pdsphysuncountedloccriteria;
   using Sxe.TWL.Data.Models.Pdsphysuncountedlocresults;
   using Sxe.TWL.Data.Models.Pdslocpendingpickcriteria;
   using Sxe.TWL.Data.Models.Pdslocpendingpickresults;
   using Sxe.TWL.Data.Models.Pdspick;
   using Sxe.TWL.Data.Models.Pdscartoninfocriteria;
   using Sxe.TWL.Data.Models.Pdscartonmst;
   using Sxe.TWL.Data.Models.Pdscartoncontentscriteria;
   using Sxe.TWL.Data.Models.Pdscartoncontents;
   using Sxe.TWL.Data.Models.Pdslocpendmoverepcriteria;
   using Sxe.TWL.Data.Models.Pdslocpendmoverepresults;
   using Sxe.TWL.Data.Models.Pdsmovemst;
   using Sxe.TWL.Data.Models.Pdsphysuncountedinvcriteria;
   using Sxe.TWL.Data.Models.Pdsphysuncountedinvresults;
   using Sxe.TWL.Data.Models.Pdsphysinv;
   using Sxe.TWL.Data.Models.Pdsphysinvdisclocresults;
   using Sxe.TWL.Data.Models.Pdsphysinvdiscinvresults;
   using Sxe.TWL.Data.Models.Pdssyspadate;
   using Sxe.TWL.Data.Models.Pdszonebincriteria;
   using Sxe.TWL.Data.Models.Pdszonebins;
   using Sxe.TWL.Data.Models.Pdszoneinventorycriteria;
   using Sxe.TWL.Data.Models.Pdszoneinventory;
   using Sxe.TWL.Data.Models.Pdszonereplenishmentcriteria;
   using Sxe.TWL.Data.Models.Pdszonereplenishments;
   using Sxe.TWL.Data.Models.Pdsinvtranscriteria;
   using Sxe.TWL.Data.Models.Pdsinvtrans;
   using Sxe.TWL.Data.Models.Pdsinvmovementcriteria;
   using Sxe.TWL.Data.Models.Pdsinvmovement;
   using Sxe.TWL.Data.Models.Pdsinvpickscriteria;
   using Sxe.TWL.Data.Models.Pdsinvpicks;
   using Sxe.TWL.Data.Models.Pdsinvreplcriteria;
   using Sxe.TWL.Data.Models.Pdsinvrepl;
   using Sxe.TWL.Data.Models.Pdsinvserialscriteria;
   using Sxe.TWL.Data.Models.Pdsinvserials;
   using Sxe.TWL.Data.Models.Pdsccinquirycriteria;
   using Sxe.TWL.Data.Models.Pdsccinquirysummary;
   using Sxe.TWL.Data.Models.Pdsccwavelistcriteria;
   using Sxe.TWL.Data.Models.Pdsccwavelist;
   using Sxe.TWL.Data.Models.Pdsccinvdisccriteria;
   using Sxe.TWL.Data.Models.Pdsccinvdisc;
   using Sxe.TWL.Data.Models.Pdsccinvtranscriteria;
   using Sxe.TWL.Data.Models.Pdsccinvtrans;
   using Sxe.TWL.Data.Models.Pdscarriercriteria;
   using Sxe.TWL.Data.Models.Pdscarrierlist;
   using Sxe.TWL.Data.Models.Pdsemptransdetailcriteria;
   using Sxe.TWL.Data.Models.Pdsemptransdetail;
   using Sxe.TWL.Data.Models.Pdsordertransdetailcriteria;
   using Sxe.TWL.Data.Models.Pdsordertransdetail;
   using Sxe.TWL.Data.Models.Pdsemptranssummarycriteria;
   using Sxe.TWL.Data.Models.Pdsemptranssummary;
   using Sxe.TWL.Data.Models.Pdseodrunhist;
   using Sxe.TWL.Data.Models.Pdsomwaveinfocriteria;
   using Sxe.TWL.Data.Models.Pdsomwaveinfo;
   using Sxe.TWL.Data.Models.Pdsomorderlistcriteria;
   using Sxe.TWL.Data.Models.Pdsomorderlist;
   using Sxe.TWL.Data.Models.Pdsomordersummary;
   using Sxe.TWL.Data.Models.Pdsomorderexceptionlistcriteria;
   using Sxe.TWL.Data.Models.Pdsomorderexceptionlist;
   using Sxe.TWL.Data.Models.Pdsomorderkey;
   using Sxe.TWL.Data.Models.Pdsomorderexceptionholdlines;
   using Sxe.TWL.Data.Models.Pdsdbconnectsum;
   using Sxe.TWL.Data.Models.Pdsdbconnectdtl;
   using Sxe.TWL.Data.Models.Pdsdbfieldnamecriteria;
   using Sxe.TWL.Data.Models.Pdsdbfieldnameresults;
   using Sxe.TWL.Data.Models.Pdsitemaltwhsecriteria;
   using Sxe.TWL.Data.Models.Pdsitemaltwhsetot;
   using Sxe.TWL.Data.Models.Pdsitemaltwhse;
   using Sxe.TWL.Data.Models.Pdsitemavailcriteria;
   using Sxe.TWL.Data.Models.Pdsitemavailprime;
   using Sxe.TWL.Data.Models.Pdsitemavail;
   using Sxe.TWL.Data.Models.Pdsitemintranscriteria;
   using Sxe.TWL.Data.Models.Pdsitemintrans;
   using Sxe.TWL.Data.Models.Pdsitemoutordcriteria;
   using Sxe.TWL.Data.Models.Pdsitemoutord;
   using Sxe.TWL.Data.Models.Pdsitemresvcriteria;
   using Sxe.TWL.Data.Models.Pdsitemresv;
   using Sxe.TWL.Data.Models.Pdsitemtranscriteria;
   using Sxe.TWL.Data.Models.Pdsitemtrans;
   using Sxe.TWL.Data.Models.Pdsitemunavailcriteria;
   using Sxe.TWL.Data.Models.Pdsitemunavail;
   using Sxe.TWL.Data.Models.Pdsitemlistcriteria;
   using Sxe.TWL.Data.Models.Pdsitemlist;
   using Sxe.TWL.Data.Models.Pdsitemdetailcriteria;
   using Sxe.TWL.Data.Models.Pdsitemdetail;
   using Sxe.TWL.Data.Models.Pdsitemhistdtlcriteria;
   using Sxe.TWL.Data.Models.Pdsitemhistdtl;
   using Sxe.TWL.Data.Models.Pdsorderinquirylistcriteria;
   using Sxe.TWL.Data.Models.Pdsorderinquirylist;
   using Sxe.TWL.Data.Models.Pdsorderdetail;
   using Sxe.TWL.Data.Models.Pdsserialhistorycriteria;
   using Sxe.TWL.Data.Models.Pdsserialhistorylist;
   using Sxe.TWL.Data.Models.Pdsordercartoncriteria;
   using Sxe.TWL.Data.Models.Pdsordercartonresults;
   using Sxe.TWL.Data.Models.Pdsomopencountcriteria;
   using Sxe.TWL.Data.Models.Pdsomopencounts;
   using Sxe.TWL.Data.Models.Pdscommentcriteria;
   using Sxe.TWL.Data.Models.Pdscommentresults;
   using Sxe.TWL.Data.Models.Pdswavesummary;
   using Sxe.TWL.Data.Models.Pdsgetpocriteria;
   using Sxe.TWL.Data.Models.Pdsgetporesults;
   using Sxe.TWL.Data.Models.Pdsgetvendorcriteria;
   using Sxe.TWL.Data.Models.Pdsgetvendorresults;
   using Sxe.TWL.Data.Models.Pdsordermanifests;
   using Sxe.TWL.Data.Models.Pdsorderavailsummary;
   using Sxe.TWL.Data.Models.Pdsorderavail;
   using Sxe.TWL.Data.Models.Pdsomorderlinekey;
   using Sxe.TWL.Data.Models.Pdsorderlinetransinfo;
   using Sxe.TWL.Data.Models.Pdsmanifestcriteria;
   using Sxe.TWL.Data.Models.Pdsmanifestresults;
   using Sxe.TWL.Data.Models.Pdsitemlotcriteria;
   using Sxe.TWL.Data.Models.Pdsitemlottotals;
   using Sxe.TWL.Data.Models.Pdsitemlotsummary;
   using Sxe.TWL.Data.Models.Pdsitemlotexpiration;
   using Sxe.TWL.Data.Models.Pdsdrplogcriteria;
   using Sxe.TWL.Data.Models.Pdsdrplogresults;
   using Sxe.TWL.Data.Models.Complex;
   using Sxe.TWL.Data.Repositories;
    
   [RoutePrefix("api/twl/astwlinquiry")]
   public partial class AstwlinquiryApiController : ApiControllerBase
   {
      private readonly AstwlinquiryRepository repository;
    
      public AstwlinquiryApiController(AstwlinquiryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("getaltloclist")]
      [HttpPost]
      public AstwlinquiryGetAltLocListResponseAPI GetAltLocList(Altloclistcriteria altloclistcriteria)
      {
         return this.repository.GetAltLocList(altloclistcriteria);
      } 
  
      
      [Route("getactivepallets")]
      [HttpPost]
      public IEnumerable<Activepallets> GetActivePallets(Activepalletscriteria activepalletscriteria)
      {
         return this.repository.GetActivePallets(activepalletscriteria);
      } 
  
      
      [Route("getinventorylist")]
      [HttpPost]
      public AstwlinquiryGetInventoryListResponseAPI GetInventoryList(Inventorylistcriteria inventorylistcriteria)
      {
         return this.repository.GetInventoryList(inventorylistcriteria);
      } 
  
      
      [Route("getinventorydetail")]
      [HttpPost]
      public Inventorydetail GetInventoryDetail(Inventorydetailcriteria inventorydetailcriteria)
      {
         return this.repository.GetInventoryDetail(inventorydetailcriteria);
      } 
  
      
      [Route("getitembucketdetail")]
      [HttpPost]
      public Itembucketdetail GetItemBucketDetail(Itembucketdetailcriteria itembucketdetailcriteria)
      {
         return this.repository.GetItemBucketDetail(itembucketdetailcriteria);
      } 
  
      
      [Route("getphysinvuncountedlocations")]
      [HttpPost]
      public IEnumerable<Physuncountedlocresults> GetPhysInvUncountedLocations(Physuncountedloccriteria physuncountedloccriteria)
      {
         return this.repository.GetPhysInvUncountedLocations(physuncountedloccriteria);
      } 
  
      
      [Route("getlocationpendingpick")]
      [HttpPost]
      public AstwlinquiryGetLocationPendingPickResponseAPI GetLocationPendingPick(Locpendingpickcriteria locpendingpickcriteria)
      {
         return this.repository.GetLocationPendingPick(locpendingpickcriteria);
      } 
  
      
      [Route("getcartoninfo")]
      [HttpPost]
      public IEnumerable<Cartonmst> GetCartonInfo(Cartoninfocriteria cartoninfocriteria)
      {
         return this.repository.GetCartonInfo(cartoninfocriteria);
      } 
  
      
      [Route("getcartoncontents")]
      [HttpPost]
      public IEnumerable<Cartoncontents> GetCartonContents(Cartoncontentscriteria cartoncontentscriteria)
      {
         return this.repository.GetCartonContents(cartoncontentscriteria);
      } 
  
      
      [Route("getlocationpendingmove")]
      [HttpPost]
      public AstwlinquiryGetLocationPendingMoveResponseAPI GetLocationPendingMove(AstwlinquiryGetLocationPendingMoveRequestAPI AstwlinquiryGetLocationPendingMoveRequestAPI)
      {
         return this.repository.GetLocationPendingMove(AstwlinquiryGetLocationPendingMoveRequestAPI);
      } 
  
      
      [Route("getphysinvuncountedinventory")]
      [HttpPost]
      public IEnumerable<Physuncountedinvresults> GetPhysInvUncountedInventory(Physuncountedinvcriteria physuncountedinvcriteria)
      {
         return this.repository.GetPhysInvUncountedInventory(physuncountedinvcriteria);
      } 
  
      
      [Route("getphysinvdisclocations")]
      [HttpPost]
      public AstwlinquiryGetPhysInvDiscLocationsResponseAPI GetPhysInvDiscLocations(IEnumerable<Physinv> physinv)
      {
         return this.repository.GetPhysInvDiscLocations(physinv);
      } 
  
      
      [Route("getphysinvdiscinventory")]
      [HttpPost]
      public AstwlinquiryGetPhysInvDiscInventoryResponseAPI GetPhysInvDiscInventory(IEnumerable<Physinv> physinv)
      {
         return this.repository.GetPhysInvDiscInventory(physinv);
      } 
  
      
      [Route("getsyspacharacter")]
      [HttpPost]
      public string GetSysPaCharacter(AstwlinquiryGetSysPaCharacterRequestAPI AstwlinquiryGetSysPaCharacterRequestAPI)
      {
         return this.repository.GetSysPaCharacter(AstwlinquiryGetSysPaCharacterRequestAPI);
      } 
  
      
      [Route("getsyspadate/{pvTwlcompany}/{pvTwlwarehouse}/{pvParameterid:int}")]
      [HttpPost]
      public Syspadate GetSysPaDate(string pvTwlcompany, string pvTwlwarehouse, int pvParameterid)
      {
         return this.repository.GetSysPaDate(pvTwlcompany, pvTwlwarehouse, pvParameterid);
      } 
  
      
      [Route("getsyspadatetime")]
      [HttpPost]
      public string GetSysPaDateTime(AstwlinquiryGetSysPaDateTimeRequestAPI AstwlinquiryGetSysPaDateTimeRequestAPI)
      {
         return this.repository.GetSysPaDateTime(AstwlinquiryGetSysPaDateTimeRequestAPI);
      } 
  
      
      [Route("getsyspadecimal")]
      [HttpPost]
      public decimal GetSysPaDecimal(AstwlinquiryGetSysPaDecimalRequestAPI AstwlinquiryGetSysPaDecimalRequestAPI)
      {
         return this.repository.GetSysPaDecimal(AstwlinquiryGetSysPaDecimalRequestAPI);
      } 
  
      
      [Route("getsyspainteger")]
      [HttpPost]
      public int GetSysPaInteger(AstwlinquiryGetSysPaIntegerRequestAPI AstwlinquiryGetSysPaIntegerRequestAPI)
      {
         return this.repository.GetSysPaInteger(AstwlinquiryGetSysPaIntegerRequestAPI);
      } 
  
      
      [Route("getsyspalogical")]
      [HttpPost]
      public bool GetSysPaLogical(AstwlinquiryGetSysPaLogicalRequestAPI AstwlinquiryGetSysPaLogicalRequestAPI)
      {
         return this.repository.GetSysPaLogical(AstwlinquiryGetSysPaLogicalRequestAPI);
      } 
  
      
      [Route("getzonebins")]
      [HttpPost]
      public AstwlinquiryGetZoneBinsResponseAPI GetZoneBins(Zonebincriteria zonebincriteria)
      {
         return this.repository.GetZoneBins(zonebincriteria);
      } 
  
      
      [Route("getzoneinventory")]
      [HttpPost]
      public IEnumerable<Zoneinventory> GetZoneInventory(Zoneinventorycriteria zoneinventorycriteria)
      {
         return this.repository.GetZoneInventory(zoneinventorycriteria);
      } 
  
      
      [Route("getzonereplenishments")]
      [HttpPost]
      public IEnumerable<Zonereplenishments> GetZoneReplenishments(Zonereplenishmentcriteria zonereplenishmentcriteria)
      {
         return this.repository.GetZoneReplenishments(zonereplenishmentcriteria);
      } 
  
      
      [Route("getinvtransactions")]
      [HttpPost]
      public IEnumerable<Invtrans> GetInvTransactions(Invtranscriteria invtranscriteria)
      {
         return this.repository.GetInvTransactions(invtranscriteria);
      } 
  
      
      [Route("getinvpendingmovement")]
      [HttpPost]
      public IEnumerable<Invmovement> GetInvPendingMovement(Invmovementcriteria invmovementcriteria)
      {
         return this.repository.GetInvPendingMovement(invmovementcriteria);
      } 
  
      
      [Route("getinvpendingpicks")]
      [HttpPost]
      public AstwlinquiryGetInvPendingPicksResponseAPI GetInvPendingPicks(Invpickscriteria invpickscriteria)
      {
         return this.repository.GetInvPendingPicks(invpickscriteria);
      } 
  
      
      [Route("getinvpendingrepl")]
      [HttpPost]
      public IEnumerable<Invrepl> GetInvPendingRepl(Invreplcriteria invreplcriteria)
      {
         return this.repository.GetInvPendingRepl(invreplcriteria);
      } 
  
      
      [Route("getinvserialnumbers")]
      [HttpPost]
      public IEnumerable<Invserials> GetInvSerialNumbers(Invserialscriteria invserialscriteria)
      {
         return this.repository.GetInvSerialNumbers(invserialscriteria);
      } 
  
      
      [Route("getccwavedetail")]
      [HttpPost]
      public AstwlinquiryGetCCWaveDetailResponseAPI GetCCWaveDetail(Ccinquirycriteria ccinquirycriteria)
      {
         return this.repository.GetCCWaveDetail(ccinquirycriteria);
      } 
  
      
      [Route("getccwavelist")]
      [HttpPost]
      public IEnumerable<Ccwavelist> GetCCWaveList(Ccwavelistcriteria ccwavelistcriteria)
      {
         return this.repository.GetCCWaveList(ccwavelistcriteria);
      } 
  
      
      [Route("getccinvdiscrepancies")]
      [HttpPost]
      public IEnumerable<Ccinvdisc> GetCCInvDiscrepancies(Ccinvdisccriteria ccinvdisccriteria)
      {
         return this.repository.GetCCInvDiscrepancies(ccinvdisccriteria);
      } 
  
      
      [Route("getcctransactions")]
      [HttpPost]
      public AstwlinquiryGetCCTransactionsResponseAPI GetCCTransactions(Ccinvtranscriteria ccinvtranscriteria)
      {
         return this.repository.GetCCTransactions(ccinvtranscriteria);
      } 
  
      
      [Route("getcarrierlist")]
      [HttpPost]
      public IEnumerable<Carrierlist> GetCarrierList(Carriercriteria carriercriteria)
      {
         return this.repository.GetCarrierList(carriercriteria);
      } 
  
      
      [Route("getemptransdetail")]
      [HttpPost]
      public IEnumerable<Emptransdetail> GetEmpTransDetail(Emptransdetailcriteria emptransdetailcriteria)
      {
         return this.repository.GetEmpTransDetail(emptransdetailcriteria);
      } 
  
      
      [Route("getordertransdetail")]
      [HttpPost]
      public IEnumerable<Ordertransdetail> GetOrderTransDetail(Ordertransdetailcriteria ordertransdetailcriteria)
      {
         return this.repository.GetOrderTransDetail(ordertransdetailcriteria);
      } 
  
      
      [Route("getemptranssummary")]
      [HttpPost]
      public AstwlinquiryGetEmpTransSummaryResponseAPI GetEmpTransSummary(Emptranssummarycriteria emptranssummarycriteria)
      {
         return this.repository.GetEmpTransSummary(emptranssummarycriteria);
      } 
  
      
      [Route("geteodrunhistory")]
      [HttpGet]
      public IEnumerable<Eodrunhist> GetEodRunHistory()
      {
         return this.repository.GetEodRunHistory();
      } 
  
      
      [Route("getomwaveinfo")]
      [HttpPost]
      public Omwaveinfo GetOMWaveInfo(Omwaveinfocriteria omwaveinfocriteria)
      {
         return this.repository.GetOMWaveInfo(omwaveinfocriteria);
      } 
  
      
      [Route("getomorderlist")]
      [HttpPost]
      public AstwlinquiryGetOMOrderListResponseAPI GetOMOrderList(Omorderlistcriteria omorderlistcriteria)
      {
         return this.repository.GetOMOrderList(omorderlistcriteria);
      } 
  
      
      [Route("getomorderexceptionlist")]
      [HttpPost]
      public AstwlinquiryGetOMOrderExceptionListResponseAPI GetOMOrderExceptionList(Omorderexceptionlistcriteria omorderexceptionlistcriteria)
      {
         return this.repository.GetOMOrderExceptionList(omorderexceptionlistcriteria);
      } 
  
      
      [Route("getomorderexceptionholdlines")]
      [HttpPost]
      public AstwlinquiryGetOMOrderExceptionHoldLinesResponseAPI GetOMOrderExceptionHoldLines(Omorderkey omorderkey)
      {
         return this.repository.GetOMOrderExceptionHoldLines(omorderkey);
      } 
  
      
      [Route("getdbconnections")]
      [HttpGet]
      public AstwlinquiryGetDbConnectionsResponseAPI GetDbConnections()
      {
         return this.repository.GetDbConnections();
      } 
  
      
      [Route("getdbfieldnames")]
      [HttpPost]
      public IEnumerable<Dbfieldnameresults> GetDbFieldNames(Dbfieldnamecriteria dbfieldnamecriteria)
      {
         return this.repository.GetDbFieldNames(dbfieldnamecriteria);
      } 
  
      
      [Route("getitemaltwhsedetail")]
      [HttpPost]
      public AstwlinquiryGetItemAltWhseDetailResponseAPI GetItemAltWhseDetail(Itemaltwhsecriteria itemaltwhsecriteria)
      {
         return this.repository.GetItemAltWhseDetail(itemaltwhsecriteria);
      } 
  
      
      [Route("getitemavaildetail")]
      [HttpPost]
      public AstwlinquiryGetItemAvailDetailResponseAPI GetItemAvailDetail(Itemavailcriteria itemavailcriteria)
      {
         return this.repository.GetItemAvailDetail(itemavailcriteria);
      } 
  
      
      [Route("getitemintransdetail")]
      [HttpPost]
      public IEnumerable<Itemintrans> GetItemIntransDetail(Itemintranscriteria itemintranscriteria)
      {
         return this.repository.GetItemIntransDetail(itemintranscriteria);
      } 
  
      
      [Route("getitemoutorddetail")]
      [HttpPost]
      public IEnumerable<Itemoutord> GetItemOutOrdDetail(Itemoutordcriteria itemoutordcriteria)
      {
         return this.repository.GetItemOutOrdDetail(itemoutordcriteria);
      } 
  
      
      [Route("getitemresvdetail")]
      [HttpPost]
      public IEnumerable<Itemresv> GetItemResvDetail(Itemresvcriteria itemresvcriteria)
      {
         return this.repository.GetItemResvDetail(itemresvcriteria);
      } 
  
      
      [Route("getitemtransdetail")]
      [HttpPost]
      public AstwlinquiryGetItemTransDetailResponseAPI GetItemTransDetail(Itemtranscriteria itemtranscriteria)
      {
         return this.repository.GetItemTransDetail(itemtranscriteria);
      } 
  
      
      [Route("getitemunavaildetail")]
      [HttpPost]
      public IEnumerable<Itemunavail> GetItemUnavailDetail(Itemunavailcriteria itemunavailcriteria)
      {
         return this.repository.GetItemUnavailDetail(itemunavailcriteria);
      } 
  
      
      [Route("getitemlist")]
      [HttpPost]
      public AstwlinquiryGetItemListResponseAPI GetItemList(Itemlistcriteria itemlistcriteria)
      {
         return this.repository.GetItemList(itemlistcriteria);
      } 
  
      
      [Route("getitemdetail")]
      [HttpPost]
      public Itemdetail GetItemDetail(Itemdetailcriteria itemdetailcriteria)
      {
         return this.repository.GetItemDetail(itemdetailcriteria);
      } 
  
      
      [Route("getitemhistorydetail")]
      [HttpPost]
      public IEnumerable<Itemhistdtl> GetItemHistoryDetail(Itemhistdtlcriteria itemhistdtlcriteria)
      {
         return this.repository.GetItemHistoryDetail(itemhistdtlcriteria);
      } 
  
      
      [Route("getorderinquirylist")]
      [HttpPost]
      public AstwlinquiryGetOrderInquiryListResponseAPI GetOrderInquiryList(Orderinquirylistcriteria orderinquirylistcriteria)
      {
         return this.repository.GetOrderInquiryList(orderinquirylistcriteria);
      } 
  
      
      [Route("getorderdetail")]
      [HttpPost]
      public AstwlinquiryGetOrderDetailResponseAPI GetOrderDetail(Omorderkey omorderkey)
      {
         return this.repository.GetOrderDetail(omorderkey);
      } 
  
      
      [Route("getserialhistory")]
      [HttpPost]
      public IEnumerable<Serialhistorylist> GetSerialHistory(Serialhistorycriteria serialhistorycriteria)
      {
         return this.repository.GetSerialHistory(serialhistorycriteria);
      } 
  
      
      [Route("getordercarton")]
      [HttpPost]
      public AstwlinquiryGetOrderCartonResponseAPI GetOrderCarton(Ordercartoncriteria ordercartoncriteria)
      {
         return this.repository.GetOrderCarton(ordercartoncriteria);
      } 
  
      
      [Route("getopencounts")]
      [HttpPost]
      public AstwlinquiryGetOpenCountsResponseAPI GetOpenCounts(Opencountcriteria opencountcriteria)
      {
         return this.repository.GetOpenCounts(opencountcriteria);
      } 
  
      
      [Route("getcomments")]
      [HttpPost]
      public IEnumerable<Commentresults> GetComments(Commentcriteria commentcriteria)
      {
         return this.repository.GetComments(commentcriteria);
      } 
  
      
      [Route("getwavesummary")]
      [HttpPost]
      public AstwlinquiryGetWaveSummaryResponseAPI GetWaveSummary(Wavesummarycriteria wavesummarycriteria)
      {
         return this.repository.GetWaveSummary(wavesummarycriteria);
      } 
  
      
      [Route("getpolist")]
      [HttpPost]
      public AstwlinquiryGetPOListResponseAPI GetPOList(Getpocriteria getpocriteria)
      {
         return this.repository.GetPOList(getpocriteria);
      } 
  
      
      [Route("getvendorlist")]
      [HttpPost]
      public AstwlinquiryGetVendorListResponseAPI GetVendorList(Getvendorcriteria getvendorcriteria)
      {
         return this.repository.GetVendorList(getvendorcriteria);
      } 
  
      
      [Route("getordermanifests")]
      [HttpPost]
      public IEnumerable<Ordermanifests> GetOrderManifests(Omorderkey omorderkey)
      {
         return this.repository.GetOrderManifests(omorderkey);
      } 
  
      
      [Route("getorderavailability")]
      [HttpPost]
      public AstwlinquiryGetOrderAvailabilityResponseAPI GetOrderAvailability(Omorderkey omorderkey)
      {
         return this.repository.GetOrderAvailability(omorderkey);
      } 
  
      
      [Route("getorderlinetransinfo")]
      [HttpPost]
      public Orderlinetransinfo GetOrderLineTransInfo(Omorderlinekey omorderlinekey)
      {
         return this.repository.GetOrderLineTransInfo(omorderlinekey);
      } 
  
      
      [Route("getshippingmanifests")]
      [HttpPost]
      public IEnumerable<Manifestresults> GetShippingManifests(Manifestcriteria manifestcriteria)
      {
         return this.repository.GetShippingManifests(manifestcriteria);
      } 
  
      
      [Route("getitemlotsummary")]
      [HttpPost]
      public AstwlinquiryGetItemLotSummaryResponseAPI GetItemLotSummary(Itemlotcriteria itemlotcriteria)
      {
         return this.repository.GetItemLotSummary(itemlotcriteria);
      } 
  
      
      [Route("getdrplog")]
      [HttpPost]
      public AstwlinquiryGetDrpLogResponseAPI GetDrpLog(Drplogcriteria drplogcriteria)
      {
         return this.repository.GetDrpLog(drplogcriteria);
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
  