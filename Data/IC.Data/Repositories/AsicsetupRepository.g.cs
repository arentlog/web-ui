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
    
namespace Infor.Sxe.IC.Data.Repositories
{
   using Infor.Sxe.IC.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsicspcaddchg;
   using Models.Pdsmessaging;
   using Models.Pdsicspcdsearch;
   using Models.Pdsicspcdaddchg;
   using Models.Pdsicspclookup;
   using Models.Pdsicspesetup;
   using Models.Pdsicspesetupcriteria;
   using Models.Pdsicsprsrcrestrict;
   using Models.Pdsicsprsrcsearch;
   using Models.Pdsicssdefaulttype;
   using Models.Pdsicsabcloadtt;
   using Models.Pdsicserialretrievepo;
   using Models.Pdsicsewloadtt;
   using Models.Pdsicproductremandefaults;
   using Models.Pdsicsevloadtt;
   using Models.Pdsicproductfieldcontrols;
   using Models.Pdsicsp;
   using Models.Pdsicsc;
   using Models.Pdsicsprcload;
   using Models.Pdsicsprcaddchg;
   using Models.Pdsicsoesetupcriteria;
   using Models.Pdsicsoesetup;
   using Models.Pdsicsehhazardous;
   using Models.Pdsiccatalogcopy;
   using Models.Pdsiclotcopy;
   using Models.Pdsicserialcopy;
   using Models.Pdsicprodlinecopy;
   using Models.Pdsicproductcopy;
   using Models.Pdsicprodlistadd;
   using Models.Pdsicspecprccost;
   using Models.Pdsicspecprccostcreate;
   using Models.Pdsicspecprccostupdate;
   using Models.Pdsicsdploadtt;
   using Models.Pdsicsecoppositeenable;
   using Models.Pdsicsecoppositecreate;
   using Models.Pdsicsecsuperxrefcreate;
   using Models.Pdsicsegkeyfields;
   using Models.Pdsicsegkeyfieldsload;
   using Models.Pdsicsegreq;
   using Models.Pdsicwhseproductcopy;
   using Models.Pdsicwarehousecopy;
   using Models.Pdsicwarehouseglfetch;
   using Models.Pdsicwarehouseglsave;
   using Models.Pdsicscupdpd;
   using Models.Pdsicswordunit;
   using Models.Pdsicsrcostmatrixcriteria;
   using Models.Pdsicsrcostmatrix;
   using Models.Pdsicsrrank;
   using Models.Pdsicsebcriteria;
   using Models.Pdsicsebcontrol;
   using Models.Pdsicsebresults;
   using Models.Pdsicsebadd;
   using Models.Pdsicsebloose;
   using Models.Pdsicsebcompcriteria;
   using Models.Pdsicsebdelete;
   using Models.Pdsicsebcompresults;
   using Models.Pdsicsebcomptopbanner;
   using Models.Pdsicsebcompdelete;
   using Models.Pdsicsebcompnew;
   using Models.Pdsicsehcopy;
   using Models.Pdsicseegetlist;
   using Models.Pdsicsvcontrol;
   using Models.Pdsicsv;
   using Models.Pdsicsefcriteria;
   using Models.Pdsicsefresults;
   using Models.Pdsicsoclevelcds;
   using Models.Pdsicsocload;
   using Models.Pdsicsprinitialize;
   using Models.Pdsicsprsearch;
   using Models.Pdsicspraddchg;
   using Models.Pdsicsprtsearch;
   using Models.Pdsicsprtaddchg;
   using Models.Pdsicsprcsearch;
   using Models.Pdsicsprclookup;
   using Models.Pdsicspcsearch;
   using Models.Complex;

   public partial class AsicsetupRepository : RepositoryBase
   {
      private AsicsetupAdapter adapter;
  
      public AsicsetupRepository(IProgressConnection connection)
      {
         this.adapter = new AsicsetupAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Icspcaddchg ICSPCLeaveField(AsicsetupICSPCLeaveFieldRequestAPI AsicsetupICSPCLeaveFieldRequestAPI)
      {
         return this.adapter.ICSPCLeaveField(AsicsetupICSPCLeaveFieldRequestAPI);
      }
  
      public Icspcaddchg ICSPCLoad(string cRowPointer)
      {
         return this.adapter.ICSPCLoad(cRowPointer);
      }
  
      public AsicsetupICSPCUpdateResponseAPI ICSPCUpdate(IEnumerable<Icspcaddchg> icspcaddchg)
      {
         return this.adapter.ICSPCUpdate(icspcaddchg);
      }
  
      public IEnumerable<Messaging> ICSPCCancel(string pvRowpointer)
      {
         return this.adapter.ICSPCCancel(pvRowpointer);
      }
  
      public IEnumerable<Icspcdresults> ICSPCDSearch(Icspcdcriteria icspcdcriteria)
      {
         return this.adapter.ICSPCDSearch(icspcdcriteria);
      }
  
      public Icspcdaddchg ICSPCDLoad(string pvSrcrowpointer, string pvIcsprowpointer, bool pvIcspcdinitfl)
      {
         return this.adapter.ICSPCDLoad(pvSrcrowpointer, pvIcsprowpointer, pvIcspcdinitfl);
      }
  
      public AsicsetupICSPCDUpdateResponseAPI ICSPCDUpdate(Icspcdaddchg icspcdaddchg)
      {
         return this.adapter.ICSPCDUpdate(icspcdaddchg);
      }
  
      public AsicsetupICSPCLookupResponseAPI ICSPCLookup(Icspclookupcriteria icspclookupcriteria)
      {
         return this.adapter.ICSPCLookup(icspclookupcriteria);
      }
  
      public Icspesetup ICSPECreate(Icspesetup icspesetup)
      {
         return this.adapter.ICSPECreate(icspesetup);
      }
  
      public void ICSPEDelete(IEnumerable<Icspesetup> icspesetup)
      {
         this.adapter.ICSPEDelete(icspesetup);
      }
  
      public AsicsetupGetICSPEListResponseAPI GetICSPEList(Icspesetupcriteria icspesetupcriteria)
      {
         return this.adapter.GetICSPEList(icspesetupcriteria);
      }
  
      public void ICSPESave(Icspesetup icspesetup)
      {
         this.adapter.ICSPESave(icspesetup);
      }
  
      public Icsprsrcrestrict ICSPRSourcingCreate(Icsprsrcrestrict icsprsrcrestrict)
      {
         return this.adapter.ICSPRSourcingCreate(icsprsrcrestrict);
      }
  
      public AsicsetupICSPRSourcingSearchResponseAPI ICSPRSourcingSearch(Icsprsrcsearchcriteria icsprsrcsearchcriteria)
      {
         return this.adapter.ICSPRSourcingSearch(icsprsrcsearchcriteria);
      }
  
      public void ICSPRSourcingDelete(IEnumerable<Icsprsrcsearchresults> icsprsrcsearchresults)
      {
         this.adapter.ICSPRSourcingDelete(icsprsrcsearchresults);
      }
  
      public Icsprsrcrestrict ICSPRSourcingRetrieve(Icsprsrcrestrict icsprsrcrestrict)
      {
         return this.adapter.ICSPRSourcingRetrieve(icsprsrcrestrict);
      }
  
      public void ICSPRSourcingUpdate(Icsprsrcrestrict icsprsrcrestrict)
      {
         this.adapter.ICSPRSourcingUpdate(icsprsrcrestrict);
      }
  
      public void ICSPRSourcingActivate(AsicsetupICSPRSourcingActivateRequestAPI AsicsetupICSPRSourcingActivateRequestAPI)
      {
         this.adapter.ICSPRSourcingActivate(AsicsetupICSPRSourcingActivateRequestAPI);
      }
  
      public string ICSWCheckTierPrefPriority(AsicsetupICSWCheckTierPrefPriorityRequestAPI AsicsetupICSWCheckTierPrefPriorityRequestAPI)
      {
         return this.adapter.ICSWCheckTierPrefPriority(AsicsetupICSWCheckTierPrefPriorityRequestAPI);
      }
  
      public Icssdefaulttype GetICSSDefaultType(Icssdefaulttype icssdefaulttype)
      {
         return this.adapter.GetICSSDefaultType(icssdefaulttype);
      }
  
      public IEnumerable<Icsabcloadttresults> ICSABCLoadTT(Icsabcloadttcriteria icsabcloadttcriteria)
      {
         return this.adapter.ICSABCLoadTT(icsabcloadttcriteria);
      }
  
      public Icserialretrievepo ICSerialRetrievePO(Icserialretrievepo icserialretrievepo)
      {
         return this.adapter.ICSerialRetrievePO(icserialretrievepo);
      }
  
      public IEnumerable<Icsewloadttresults> ICSEWLoadTT(Icsewloadttcriteria icsewloadttcriteria)
      {
         return this.adapter.ICSEWLoadTT(icsewloadttcriteria);
      }
  
      public Icproductremandefaults ICProductRemanDefaults(Icproductremandefaults icproductremandefaults)
      {
         return this.adapter.ICProductRemanDefaults(icproductremandefaults);
      }
  
      public IEnumerable<Icsevloadttresults> ICSEVLoadTT(Icsevloadttcriteria icsevloadttcriteria)
      {
         return this.adapter.ICSEVLoadTT(icsevloadttcriteria);
      }
  
      public Icproductfieldcontrols ICProductFieldControls(Icproductfieldcontrols icproductfieldcontrols)
      {
         return this.adapter.ICProductFieldControls(icproductfieldcontrols);
      }
  
      public AsicsetupICNCNRCheckResponseAPI ICNCNRCheck(AsicsetupICNCNRCheckRequestAPI AsicsetupICNCNRCheckRequestAPI)
      {
         return this.adapter.ICNCNRCheck(AsicsetupICNCNRCheckRequestAPI);
      }
  
      public Icsprcaddchg ICSPRCLoad(Icsprcloadcriteria icsprcloadcriteria)
      {
         return this.adapter.ICSPRCLoad(icsprcloadcriteria);
      }
  
      public Icsoesetup ICSOELoad(Icsoesetupcriteria icsoesetupcriteria)
      {
         return this.adapter.ICSOELoad(icsoesetupcriteria);
      }
  
      public Icspesetup ICSPELoad(Icspesetupcriteria icspesetupcriteria)
      {
         return this.adapter.ICSPELoad(icspesetupcriteria);
      }
  
      public Icsehhazardous ICSEHHazardousLoad(Icsehhazardous icsehhazardous)
      {
         return this.adapter.ICSEHHazardousLoad(icsehhazardous);
      }
  
      public string ICSEHHazardousSave(Icsehhazardous icsehhazardous)
      {
         return this.adapter.ICSEHHazardousSave(icsehhazardous);
      }
  
      public Iccatalogcopy ICCatalogCopy(Iccatalogcopy iccatalogcopy)
      {
         return this.adapter.ICCatalogCopy(iccatalogcopy);
      }
  
      public Iclotcopy ICLotCopy(Iclotcopy iclotcopy)
      {
         return this.adapter.ICLotCopy(iclotcopy);
      }
  
      public string GetICLotSpecPriceLabel(AsicsetupGetICLotSpecPriceLabelRequestAPI AsicsetupGetICLotSpecPriceLabelRequestAPI)
      {
         return this.adapter.GetICLotSpecPriceLabel(AsicsetupGetICLotSpecPriceLabelRequestAPI);
      }
  
      public Icserialcopy ICSerialCopy(Icserialcopy icserialcopy)
      {
         return this.adapter.ICSerialCopy(icserialcopy);
      }
  
      public Icprodlinecopy ICProductLineCopy(Icprodlinecopy icprodlinecopy)
      {
         return this.adapter.ICProductLineCopy(icprodlinecopy);
      }
  
      public Icproductcopy ICProductCopy(Icproductcopy icproductcopy)
      {
         return this.adapter.ICProductCopy(icproductcopy);
      }
  
      public void ICProductListAdd(AsicsetupICProductListAddRequestAPI AsicsetupICProductListAddRequestAPI)
      {
         this.adapter.ICProductListAdd(AsicsetupICProductListAddRequestAPI);
      }
  
      public Icspecprccost ICUpdateICSPSpecPriceCost(Icspecprccost icspecprccost)
      {
         return this.adapter.ICUpdateICSPSpecPriceCost(icspecprccost);
      }
  
      public bool ICProductCheckStatusEnabled(AsicsetupICProductCheckStatusEnabledRequestAPI AsicsetupICProductCheckStatusEnabledRequestAPI)
      {
         return this.adapter.ICProductCheckStatusEnabled(AsicsetupICProductCheckStatusEnabledRequestAPI);
      }
  
      public Icspecprccostcreate ICSpecPriceCostCreate(Icspecprccostcreate icspecprccostcreate)
      {
         return this.adapter.ICSpecPriceCostCreate(icspecprccostcreate);
      }
  
      public Icspecprccostupdate ICSpecPriceCostUpdate(Icspecprccostupdate icspecprccostupdate)
      {
         return this.adapter.ICSpecPriceCostUpdate(icspecprccostupdate);
      }
  
      public AsicsetupICSDPLoadTTResponseAPI ICSDPLoadTT(AsicsetupICSDPLoadTTRequestAPI AsicsetupICSDPLoadTTRequestAPI)
      {
         return this.adapter.ICSDPLoadTT(AsicsetupICSDPLoadTTRequestAPI);
      }
  
      public void ICSDPSavePW(string cWhse, int iMediaCd, string cMerchantPassword)
      {
         this.adapter.ICSDPSavePW(cWhse, iMediaCd, cMerchantPassword);
      }
  
      public bool ICSECOppositeScreenSupersedeLaunch(AsicsetupICSECOppositeScreenSupersedeLaunchRequestAPI AsicsetupICSECOppositeScreenSupersedeLaunchRequestAPI)
      {
         return this.adapter.ICSECOppositeScreenSupersedeLaunch(AsicsetupICSECOppositeScreenSupersedeLaunchRequestAPI);
      }
  
      public Icsecoppositeenable ICSECOppositeScreenEnablement(AsicsetupICSECOppositeScreenEnablementRequestAPI AsicsetupICSECOppositeScreenEnablementRequestAPI)
      {
         return this.adapter.ICSECOppositeScreenEnablement(AsicsetupICSECOppositeScreenEnablementRequestAPI);
      }
  
      public void ICSECOppositeCreate(Icsecoppositecreate icsecoppositecreate)
      {
         this.adapter.ICSECOppositeCreate(icsecoppositecreate);
      }
  
      public void ICSECSuperXrefCreate(Icsecsuperxrefcreate icsecsuperxrefcreate)
      {
         this.adapter.ICSECSuperXrefCreate(icsecsuperxrefcreate);
      }
  
      public Icsegkeyfields ICSEGCopy(Icsegkeyfields icsegkeyfields)
      {
         return this.adapter.ICSEGCopy(icsegkeyfields);
      }
  
      public Icsegkeyfields ICSEGCreate(Icsegkeyfields icsegkeyfields)
      {
         return this.adapter.ICSEGCreate(icsegkeyfields);
      }
  
      public Icsegkeyfieldsload ICSEGKeyFieldsLoad(Icsegkeyfieldsload icsegkeyfieldsload)
      {
         return this.adapter.ICSEGKeyFieldsLoad(icsegkeyfieldsload);
      }
  
      public Icsegreq ICSEGRequiredFetch(Icsegreq icsegreq)
      {
         return this.adapter.ICSEGRequiredFetch(icsegreq);
      }
  
      public Icsegreq ICSEGRequiredSave(Icsegreq icsegreq)
      {
         return this.adapter.ICSEGRequiredSave(icsegreq);
      }
  
      public AsicsetupICValidateProductUnitResponseAPI ICValidateProductUnit(AsicsetupICValidateProductUnitRequestAPI AsicsetupICValidateProductUnitRequestAPI)
      {
         return this.adapter.ICValidateProductUnit(AsicsetupICValidateProductUnitRequestAPI);
      }
  
      public IEnumerable<Icwhseproductcopyresults> ICWhseProductCopy(AsicsetupICWhseProductCopyRequestAPI AsicsetupICWhseProductCopyRequestAPI)
      {
         return this.adapter.ICWhseProductCopy(AsicsetupICWhseProductCopyRequestAPI);
      }
  
      public Icwarehousecopy ICWarehouseCopy(Icwarehousecopy icwarehousecopy)
      {
         return this.adapter.ICWarehouseCopy(icwarehousecopy);
      }
  
      public Icwarehouseglfetchresults ICWarehouseGLFetch(Icwarehouseglfetchcriteria icwarehouseglfetchcriteria)
      {
         return this.adapter.ICWarehouseGLFetch(icwarehouseglfetchcriteria);
      }
  
      public IEnumerable<Icwarehouseglsave> ICWarehouseGLSave(IEnumerable<Icwarehouseglsave> icwarehouseglsave)
      {
         return this.adapter.ICWarehouseGLSave(icwarehouseglsave);
      }
  
      public string ValidateGLAccount(string cGLAccount)
      {
         return this.adapter.ValidateGLAccount(cGLAccount);
      }
  
      public void ICSCUpdatePD(Icscupdpd icscupdpd)
      {
         this.adapter.ICSCUpdatePD(icscupdpd);
      }
  
      public Icswordunitresult ICSWOrdUnit(Icswordunitcriteria icswordunitcriteria)
      {
         return this.adapter.ICSWOrdUnit(icswordunitcriteria);
      }
  
      public Icprodlinecopy ICSRCopy(Icprodlinecopy icprodlinecopy)
      {
         return this.adapter.ICSRCopy(icprodlinecopy);
      }
  
      public IEnumerable<Icsrcostmatrix> ICSRLoadCostMatrix(Icsrcostmatrixcriteria icsrcostmatrixcriteria)
      {
         return this.adapter.ICSRLoadCostMatrix(icsrcostmatrixcriteria);
      }
  
      public void ICSRValidateCostMatrix(AsicsetupICSRValidateCostMatrixRequestAPI AsicsetupICSRValidateCostMatrixRequestAPI)
      {
         this.adapter.ICSRValidateCostMatrix(AsicsetupICSRValidateCostMatrixRequestAPI);
      }
  
      public void ICSRSaveCostMatrix(AsicsetupICSRSaveCostMatrixRequestAPI AsicsetupICSRSaveCostMatrixRequestAPI)
      {
         this.adapter.ICSRSaveCostMatrix(AsicsetupICSRSaveCostMatrixRequestAPI);
      }
  
      public AsicsetupICSRLoadRankDataResponseAPI ICSRLoadRankData(Icsrrankdata icsrrankdata)
      {
         return this.adapter.ICSRLoadRankData(icsrrankdata);
      }
  
      public IEnumerable<Messaging> ICSRSaveRankData(AsicsetupICSRSaveRankDataRequestAPI AsicsetupICSRSaveRankDataRequestAPI)
      {
         return this.adapter.ICSRSaveRankData(AsicsetupICSRSaveRankDataRequestAPI);
      }
  
      public IEnumerable<Icsrdetailranks> ICSRBuildHierarchy(AsicsetupICSRBuildHierarchyRequestAPI AsicsetupICSRBuildHierarchyRequestAPI)
      {
         return this.adapter.ICSRBuildHierarchy(AsicsetupICSRBuildHierarchyRequestAPI);
      }
  
      public string ICSRRankLeaveField(string pvRankty, int pvRank)
      {
         return this.adapter.ICSRRankLeaveField(pvRankty, pvRank);
      }
  
      public string ICSRPctHitLeaveField(string pvRecordty, string pvRankty, string pvPcthit)
      {
         return this.adapter.ICSRPctHitLeaveField(pvRecordty, pvRankty, pvPcthit);
      }
  
      public void ICSRRankValidate(AsicsetupICSRRankValidateRequestAPI AsicsetupICSRRankValidateRequestAPI)
      {
         this.adapter.ICSRRankValidate(AsicsetupICSRRankValidateRequestAPI);
      }
  
      public IEnumerable<Icsrdetailranks> ICSRRankAfterDelete(AsicsetupICSRRankAfterDeleteRequestAPI AsicsetupICSRRankAfterDeleteRequestAPI)
      {
         return this.adapter.ICSRRankAfterDelete(AsicsetupICSRRankAfterDeleteRequestAPI);
      }
  
      public IEnumerable<Icsrdetailranks> ICSRRankAfterSave(AsicsetupICSRRankAfterSaveRequestAPI AsicsetupICSRRankAfterSaveRequestAPI)
      {
         return this.adapter.ICSRRankAfterSave(AsicsetupICSRRankAfterSaveRequestAPI);
      }
  
      public void ICSRRankOKToClose(AsicsetupICSRRankOKToCloseRequestAPI AsicsetupICSRRankOKToCloseRequestAPI)
      {
         this.adapter.ICSRRankOKToClose(AsicsetupICSRRankOKToCloseRequestAPI);
      }
  
      public Icsebcontrol ICSEBGetControl(Icsebcriteria icsebcriteria)
      {
         return this.adapter.ICSEBGetControl(icsebcriteria);
      }
  
      public IEnumerable<Icsebresults> ICSEBGetList(Icsebcriteria icsebcriteria)
      {
         return this.adapter.ICSEBGetList(icsebcriteria);
      }
  
      public AsicsetupICSEBAddResponseAPI ICSEBAdd(Icsebadd icsebadd)
      {
         return this.adapter.ICSEBAdd(icsebadd);
      }
  
      public Icsebloose ICSEBDelete(Icsebdelete icsebdelete)
      {
         return this.adapter.ICSEBDelete(icsebdelete);
      }
  
      public AsicsetupICSEBCompGetListResponseAPI ICSEBCompGetList(AsicsetupICSEBCompGetListRequestAPI AsicsetupICSEBCompGetListRequestAPI)
      {
         return this.adapter.ICSEBCompGetList(AsicsetupICSEBCompGetListRequestAPI);
      }
  
      public AsicsetupICSEBUpdateResponseAPI ICSEBUpdate(AsicsetupICSEBUpdateRequestAPI AsicsetupICSEBUpdateRequestAPI)
      {
         return this.adapter.ICSEBUpdate(AsicsetupICSEBUpdateRequestAPI);
      }
  
      public void ICSEBSave(AsicsetupICSEBSaveRequestAPI AsicsetupICSEBSaveRequestAPI)
      {
         this.adapter.ICSEBSave(AsicsetupICSEBSaveRequestAPI);
      }
  
      public AsicsetupICSEBCompDeleteResponseAPI ICSEBCompDelete(AsicsetupICSEBCompDeleteRequestAPI AsicsetupICSEBCompDeleteRequestAPI)
      {
         return this.adapter.ICSEBCompDelete(AsicsetupICSEBCompDeleteRequestAPI);
      }
  
      public Icsebcontrol ICSEBCompAddUpdInitialize(AsicsetupICSEBCompAddUpdInitializeRequestAPI AsicsetupICSEBCompAddUpdInitializeRequestAPI)
      {
         return this.adapter.ICSEBCompAddUpdInitialize(AsicsetupICSEBCompAddUpdInitializeRequestAPI);
      }
  
      public AsicsetupICSEBCompAddUpdValidateResponseAPI ICSEBCompAddUpdValidate(AsicsetupICSEBCompAddUpdValidateRequestAPI AsicsetupICSEBCompAddUpdValidateRequestAPI)
      {
         return this.adapter.ICSEBCompAddUpdValidate(AsicsetupICSEBCompAddUpdValidateRequestAPI);
      }
  
      public AsicsetupICSEBCompAddUpdSaveResponseAPI ICSEBCompAddUpdSave(AsicsetupICSEBCompAddUpdSaveRequestAPI AsicsetupICSEBCompAddUpdSaveRequestAPI)
      {
         return this.adapter.ICSEBCompAddUpdSave(AsicsetupICSEBCompAddUpdSaveRequestAPI);
      }
  
      public Icsehcopy ICSEHCopy(Icsehcopy icsehcopy)
      {
         return this.adapter.ICSEHCopy(icsehcopy);
      }
  
      public IEnumerable<Icseegetlistresults> ICSEEGetList(Icseegetlistcriteria icseegetlistcriteria)
      {
         return this.adapter.ICSEEGetList(icseegetlistcriteria);
      }
  
      public Icsvcontrol ICSVInitiate()
      {
         return this.adapter.ICSVInitiate();
      }
  
      public string ICSVFieldLeave(AsicsetupICSVFieldLeaveRequestAPI AsicsetupICSVFieldLeaveRequestAPI)
      {
         return this.adapter.ICSVFieldLeave(AsicsetupICSVFieldLeaveRequestAPI);
      }
  
      public AsicsetupICSVRowSelectResponseAPI ICSVRowSelect(Icsv icsv)
      {
         return this.adapter.ICSVRowSelect(icsv);
      }
  
      public IEnumerable<Icsefresults> ICSEFRetrieve(Icsefcriteria icsefcriteria)
      {
         return this.adapter.ICSEFRetrieve(icsefcriteria);
      }
  
      public IEnumerable<Icsoclevelcds> ICSOCLevelCdsInitiate()
      {
         return this.adapter.ICSOCLevelCdsInitiate();
      }
  
      public IEnumerable<Icsocresults> ICSOCLoad(Icsoccriteria icsoccriteria)
      {
         return this.adapter.ICSOCLoad(icsoccriteria);
      }
  
      public AsicsetupGetICSOEListResponseAPI GetICSOEList(Icsoesetupcriteria icsoesetupcriteria)
      {
         return this.adapter.GetICSOEList(icsoesetupcriteria);
      }
  
      public Icsoesetup ICSOECreate(Icsoesetup icsoesetup)
      {
         return this.adapter.ICSOECreate(icsoesetup);
      }
  
      public void ICSOEDelete(IEnumerable<Icsoesetup> icsoesetup)
      {
         this.adapter.ICSOEDelete(icsoesetup);
      }
  
      public void ICSOESave(Icsoesetup icsoesetup)
      {
         this.adapter.ICSOESave(icsoesetup);
      }
  
      public Icsprinitialize ICSPRInitialize()
      {
         return this.adapter.ICSPRInitialize();
      }
  
      public AsicsetupICSPRSearchResponseAPI ICSPRSearch(Icsprcriteria icsprcriteria)
      {
         return this.adapter.ICSPRSearch(icsprcriteria);
      }
  
      public Icspraddchg ICSPRLoad(string pvRowpointer)
      {
         return this.adapter.ICSPRLoad(pvRowpointer);
      }
  
      public Icsprinitialize ICSPRLeaveField(AsicsetupICSPRLeaveFieldRequestAPI AsicsetupICSPRLeaveFieldRequestAPI)
      {
         return this.adapter.ICSPRLeaveField(AsicsetupICSPRLeaveFieldRequestAPI);
      }
  
      public IEnumerable<Messaging> ICSPRCancel(string pvRowpointer)
      {
         return this.adapter.ICSPRCancel(pvRowpointer);
      }
  
      public AsicsetupICSPRUpdateResponseAPI ICSPRUpdate(IEnumerable<Icspraddchg> icspraddchg)
      {
         return this.adapter.ICSPRUpdate(icspraddchg);
      }
  
      public IEnumerable<Icsprtresults> ICSPRTSearch(IEnumerable<Icsprtcriteria> icsprtcriteria)
      {
         return this.adapter.ICSPRTSearch(icsprtcriteria);
      }
  
      public AsicsetupICSPRTUpdateResponseAPI ICSPRTUpdate(Icsprtaddchg icsprtaddchg)
      {
         return this.adapter.ICSPRTUpdate(icsprtaddchg);
      }
  
      public AsicsetupICSPRCSearchResponseAPI ICSPRCSearch(Icsprccriteria icsprccriteria)
      {
         return this.adapter.ICSPRCSearch(icsprccriteria);
      }
  
      public AsicsetupICSPRCUpdateResponseAPI ICSPRCUpdate(IEnumerable<Icsprcaddchg> icsprcaddchg)
      {
         return this.adapter.ICSPRCUpdate(icsprcaddchg);
      }
  
      public AsicsetupICSPRCLookupResponseAPI ICSPRCLookup(Icsprclookupcriteria icsprclookupcriteria)
      {
         return this.adapter.ICSPRCLookup(icsprclookupcriteria);
      }
  
      public AsicsetupICSPCSearchResponseAPI ICSPCSearch(Icspccriteria icspccriteria)
      {
         return this.adapter.ICSPCSearch(icspccriteria);
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
  