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
    
namespace Infor.Sxe.Shared.Data.Repositories
{
   using Infor.Sxe.Shared.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsaosystemusertable;
   using Models.Pdsaosystemuserflds;
   using Models.Pdsmessaging;
   using Models.Pdsaosystemfunctyp;
   using Models.Pdsaosystemlanguage;
   using Models.Pdsaosystemmenuitem;
   using Models.Pdsaosystemmenuitemrectyp;
   using Models.Pdsaosystemmenuitemnew;
   using Models.Pdsaosystemrptitem;
   using Models.Pdsaosystemrptitemnew;
   using Models.Pdsaologistics;
   using Models.Pdsaologisticswlloc;
   using Models.Pdsaointegrations;
   using Models.Pdswebsettingdetails;
   using Models.Pdswebsettingload;
   using Models.Pdsreporttransfer;
   using Models.Pdswebmodrecord;
   using Models.Pdswebmodcriteria;
   using Models.Pdswebmodlistcriteria;
   using Models.Pdswebmodlistresults;
   using Models.Pdswebnoterecord;
   using Models.Pdswebnotecriteria;
   using Models.Pdswebnotelistcriteria;
   using Models.Pdswebnotelistresults;
   using Models.Pdsnotemovepageno;
   using Models.Pdsvendorcurrency;
   using Models.Pdsgeocodelookup;
   using Models.Pdsmenusecurity;
   using Models.Pdsprinterinitialize;
   using Models.Pdsprintervalidate;
   using Models.Pdsreptgrouplookup;
   using Models.Pdsreportsecurity;
   using Models.Pdsreptwizarddefn;
   using Models.Pdsreptwizardlistproc;
   using Models.Pdsreptwizardenablesapbs;
   using Models.Pdsreptwizardfinish;
   using Models.Pdsprintersettings;
   using Models.Pdsreptwizardvalsapbo;
   using Models.Pdsreptwizardvalsapbp;
   using Models.Pdsreptwizardvalsapbs;
   using Models.Pdsreptwizardvalsapbva;
   using Models.Pdsreptwizardvalsapbw;
   using Models.Pdsreptwizardlstprcapinv;
   using Models.Pdssharedcommentcriteria;
   using Models.Pdssharedcommentresults;
   using Models.Pdssharedpvregistry;
   using Models.Pdsshoplistchange;
   using Models.Pdsshoplistdelete;
   using Models.Pdsshoplistpopulate;
   using Models.Pdsshoplistprepare;
   using Models.Pdsshoplistupdate;
   using Models.Pdsauthpointtrans;
   using Models.Pdsauthpointsecurity;
   using Models.Pdsauthpointsecurityupdate;
   using Models.Pdspvrecoveryrecord;
   using Models.Pdsopervalidate;
   using Models.Pdsaocustomer;
   using Models.Pdsaovendor;
   using Models.Pdsaoproduct;
   using Models.Pdsaokitproduction;
   using Models.Pdsaosalesorders;
   using Models.Pdsaoarscl;
   using Models.Pdsaopurchaseorders;
   using Models.Pdsaojobmanagement;
   using Models.Pdsaowarehousetransfers;
   using Models.Pdsaoservicewarranty;
   using Models.Pdsaovalueadd;
   using Models.Pdsaofinancials;
   using Models.Pdsaosaleshistory;
   using Models.Pdsaosystem;
   using Models.Complex;

   public partial class AssharedentryRepository : RepositoryBase
   {
      private AssharedentryAdapter adapter;
  
      public AssharedentryRepository(IProgressConnection connection)
      {
         this.adapter = new AssharedentryAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public IEnumerable<Aosystemusertable> AOSystemUserTableLoad()
      {
         return this.adapter.AOSystemUserTableLoad();
      }
  
      public Aosystemuserflds AOSystemUserFldsLoad(Aosystemuserflds aosystemuserflds)
      {
         return this.adapter.AOSystemUserFldsLoad(aosystemuserflds);
      }
  
      public IEnumerable<Messaging> AOSystemUserFldsSave(Aosystemuserflds aosystemuserflds)
      {
         return this.adapter.AOSystemUserFldsSave(aosystemuserflds);
      }
  
      public IEnumerable<Aosystemfunctyp> AOSystemFuncTypLoad()
      {
         return this.adapter.AOSystemFuncTypLoad();
      }
  
      public AssharedentryAOSystemFuncTypSaveResponseAPI AOSystemFuncTypSave(Aosystemfunctyp aosystemfunctyp)
      {
         return this.adapter.AOSystemFuncTypSave(aosystemfunctyp);
      }
  
      public IEnumerable<Messaging> AOSystemFuncTypDelete(Aosystemfunctyp aosystemfunctyp)
      {
         return this.adapter.AOSystemFuncTypDelete(aosystemfunctyp);
      }
  
      public AssharedentryAOSystemLanguageLoadResponseAPI AOSystemLanguageLoad()
      {
         return this.adapter.AOSystemLanguageLoad();
      }
  
      public AssharedentryAOSystemMenuItemLoadResponseAPI AOSystemMenuItemLoad(Aosystemmenuitem aosystemmenuitem)
      {
         return this.adapter.AOSystemMenuItemLoad(aosystemmenuitem);
      }
  
      public Aosystemmenuitemrectyp AOSystemMenuItemRecTypLoad(Aosystemmenuitemrectyp aosystemmenuitemrectyp)
      {
         return this.adapter.AOSystemMenuItemRecTypLoad(aosystemmenuitemrectyp);
      }
  
      public IEnumerable<Messaging> AOSystemMenuItemNewSave(Aosystemmenuitemnew aosystemmenuitemnew)
      {
         return this.adapter.AOSystemMenuItemNewSave(aosystemmenuitemnew);
      }
  
      public IEnumerable<Messaging> AOSystemMenuItemSave(AssharedentryAOSystemMenuItemSaveRequestAPI AssharedentryAOSystemMenuItemSaveRequestAPI)
      {
         return this.adapter.AOSystemMenuItemSave(AssharedentryAOSystemMenuItemSaveRequestAPI);
      }
  
      public IEnumerable<Messaging> AOSystemMenuItemDelete(AssharedentryAOSystemMenuItemDeleteRequestAPI AssharedentryAOSystemMenuItemDeleteRequestAPI)
      {
         return this.adapter.AOSystemMenuItemDelete(AssharedentryAOSystemMenuItemDeleteRequestAPI);
      }
  
      public AssharedentryAOSystemRptItemLoadResponseAPI AOSystemRptItemLoad(IEnumerable<Aosystemrptitem> aosystemrptitem)
      {
         return this.adapter.AOSystemRptItemLoad(aosystemrptitem);
      }
  
      public IEnumerable<Messaging> AOSystemRptItemNewSave(Aosystemrptitemnew aosystemrptitemnew)
      {
         return this.adapter.AOSystemRptItemNewSave(aosystemrptitemnew);
      }
  
      public IEnumerable<Messaging> AOSystemRptItemSave(AssharedentryAOSystemRptItemSaveRequestAPI AssharedentryAOSystemRptItemSaveRequestAPI)
      {
         return this.adapter.AOSystemRptItemSave(AssharedentryAOSystemRptItemSaveRequestAPI);
      }
  
      public IEnumerable<Messaging> AOSystemRptItemDelete(AssharedentryAOSystemRptItemDeleteRequestAPI AssharedentryAOSystemRptItemDeleteRequestAPI)
      {
         return this.adapter.AOSystemRptItemDelete(AssharedentryAOSystemRptItemDeleteRequestAPI);
      }
  
      public IEnumerable<Messaging> AOSystemRSActive(bool lRSActivefl)
      {
         return this.adapter.AOSystemRSActive(lRSActivefl);
      }
  
      public Aologistics AOLogisticsLoad()
      {
         return this.adapter.AOLogisticsLoad();
      }
  
      public IEnumerable<Messaging> AOLogisticsSave(Aologistics aologistics)
      {
         return this.adapter.AOLogisticsSave(aologistics);
      }
  
      public Aologisticswlloc AOLogisticsWLLocLoad(Aologisticswlloc aologisticswlloc)
      {
         return this.adapter.AOLogisticsWLLocLoad(aologisticswlloc);
      }
  
      public IEnumerable<Messaging> AOLogisticsWLLocSave(Aologisticswlloc aologisticswlloc)
      {
         return this.adapter.AOLogisticsWLLocSave(aologisticswlloc);
      }
  
      public IEnumerable<Messaging> AOLogisticsWLLocDelete(Aologisticswlloc aologisticswlloc)
      {
         return this.adapter.AOLogisticsWLLocDelete(aologisticswlloc);
      }
  
      public Aointegrations AOIntegrationsLoad()
      {
         return this.adapter.AOIntegrationsLoad();
      }
  
      public IEnumerable<Messaging> AOIntegrationsSave(Aointegrations aointegrations)
      {
         return this.adapter.AOIntegrationsSave(aointegrations);
      }
  
      public IEnumerable<Websettingdetails> RetrieveWebSetting(AssharedentryRetrieveWebSettingRequestAPI AssharedentryRetrieveWebSettingRequestAPI)
      {
         return this.adapter.RetrieveWebSetting(AssharedentryRetrieveWebSettingRequestAPI);
      }
  
      public void SaveWebSetting(IEnumerable<Websettingdetails> websettingdetails)
      {
         this.adapter.SaveWebSetting(websettingdetails);
      }
  
      public IEnumerable<Websettingdetails> LoadWebSetting(Websettingload websettingload)
      {
         return this.adapter.LoadWebSetting(websettingload);
      }
  
      public void FileTransfer(AssharedentryFileTransferRequestAPI AssharedentryFileTransferRequestAPI)
      {
         this.adapter.FileTransfer(AssharedentryFileTransferRequestAPI);
      }
  
      public Webmodrecord WebModificationCreate(Webmodrecord webmodrecord)
      {
         return this.adapter.WebModificationCreate(webmodrecord);
      }
  
      public void WebModificationDelete(IEnumerable<Webmodcriteria> webmodcriteria)
      {
         this.adapter.WebModificationDelete(webmodcriteria);
      }
  
      public AssharedentryGetWebModificationListResponseAPI GetWebModificationList(Webmodlistcriteria webmodlistcriteria)
      {
         return this.adapter.GetWebModificationList(webmodlistcriteria);
      }
  
      public Webmodlistresults GetActiveWebModification(Webmodlistcriteria webmodlistcriteria)
      {
         return this.adapter.GetActiveWebModification(webmodlistcriteria);
      }
  
      public Webmodrecord WebModificationRead(Webmodcriteria webmodcriteria)
      {
         return this.adapter.WebModificationRead(webmodcriteria);
      }
  
      public void WebModificationUpdate(Webmodrecord webmodrecord)
      {
         this.adapter.WebModificationUpdate(webmodrecord);
      }
  
      public Webnoterecord WebNoteCreate(Webnoterecord webnoterecord)
      {
         return this.adapter.WebNoteCreate(webnoterecord);
      }
  
      public void WebNoteDelete(IEnumerable<Webnotecriteria> webnotecriteria)
      {
         this.adapter.WebNoteDelete(webnotecriteria);
      }
  
      public AssharedentryGetWebNoteListResponseAPI GetWebNoteList(Webnotelistcriteria webnotelistcriteria)
      {
         return this.adapter.GetWebNoteList(webnotelistcriteria);
      }
  
      public Webnoterecord WebNoteRead(Webnotecriteria webnotecriteria)
      {
         return this.adapter.WebNoteRead(webnotecriteria);
      }
  
      public void WebNoteUpdate(Webnoterecord webnoterecord)
      {
         this.adapter.WebNoteUpdate(webnoterecord);
      }
  
      public IEnumerable<Notemovepagenoresults> WebNoteMovePageNumber(Notemovepageno notemovepageno)
      {
         return this.adapter.WebNoteMovePageNumber(notemovepageno);
      }
  
      public void IONIMSPingTest()
      {
         this.adapter.IONIMSPingTest();
      }
  
      public Vendorcurrencysingle CalculateVendorCurrency(Vendorcurrencycriteria vendorcurrencycriteria)
      {
         return this.adapter.CalculateVendorCurrency(vendorcurrencycriteria);
      }
  
      public void ClearShoppingList()
      {
         this.adapter.ClearShoppingList();
      }
  
      public IEnumerable<Geocodelookupresults> GEOCodeLookup(Geocodelookupcriteria geocodelookupcriteria)
      {
         return this.adapter.GEOCodeLookup(geocodelookupcriteria);
      }
  
      public AssharedentryMenuFunctionSecuritySettingsResponseAPI MenuFunctionSecuritySettings(string cSecurityRoles)
      {
         return this.adapter.MenuFunctionSecuritySettings(cSecurityRoles);
      }
  
      public Printerinitialize PrinterInitialize(AssharedentryPrinterInitializeRequestAPI AssharedentryPrinterInitializeRequestAPI)
      {
         return this.adapter.PrinterInitialize(AssharedentryPrinterInitializeRequestAPI);
      }
  
      public IEnumerable<Messaging> PrinterValidate(Printervalidate printervalidate)
      {
         return this.adapter.PrinterValidate(printervalidate);
      }
  
      public IEnumerable<Reptgrouplookupresults> ReportGroupLookup(Reptgrouplookupcriteria reptgrouplookupcriteria)
      {
         return this.adapter.ReportGroupLookup(reptgrouplookupcriteria);
      }
  
      public IEnumerable<Reportsecurity> ReportSecuritySettings(AssharedentryReportSecuritySettingsRequestAPI AssharedentryReportSecuritySettingsRequestAPI)
      {
         return this.adapter.ReportSecuritySettings(AssharedentryReportSecuritySettingsRequestAPI);
      }
  
      public void ReportSend(string cReportName, string cUsersList)
      {
         this.adapter.ReportSend(cReportName, cUsersList);
      }
  
      public Reporttransfer ReportTransfer(string cReportName, string cFileName)
      {
         return this.adapter.ReportTransfer(cReportName, cFileName);
      }
  
      public AssharedentryReportWizardDefinitionResponseAPI ReportWizardDefinition(Reptwizarddefncriteria reptwizarddefncriteria)
      {
         return this.adapter.ReportWizardDefinition(reptwizarddefncriteria);
      }
  
      public void ReportWizardDeleteReport(string cReportName)
      {
         this.adapter.ReportWizardDeleteReport(cReportName);
      }
  
      public Reptwizardenablesapbs ReportWizardEnableSAPBS(Reptwizardenablesapbs reptwizardenablesapbs)
      {
         return this.adapter.ReportWizardEnableSAPBS(reptwizardenablesapbs);
      }
  
      public IEnumerable<Messaging> ReportWizardFinish(AssharedentryReportWizardFinishRequestAPI AssharedentryReportWizardFinishRequestAPI)
      {
         return this.adapter.ReportWizardFinish(AssharedentryReportWizardFinishRequestAPI);
      }
  
      public void ReportWizardLockReportRecord(string cReportName)
      {
         this.adapter.ReportWizardLockReportRecord(cReportName);
      }
  
      public string ReportWizardNextReportName()
      {
         return this.adapter.ReportWizardNextReportName();
      }
  
      public void ReportWizardUnlockReportRecord(string cReportName)
      {
         this.adapter.ReportWizardUnlockReportRecord(cReportName);
      }
  
      public IEnumerable<Messaging> ReportWizardValidateOptions(AssharedentryReportWizardValidateOptionsRequestAPI AssharedentryReportWizardValidateOptionsRequestAPI)
      {
         return this.adapter.ReportWizardValidateOptions(AssharedentryReportWizardValidateOptionsRequestAPI);
      }
  
      public IEnumerable<Messaging> ReportWizardValidateRanges(AssharedentryReportWizardValidateRangesRequestAPI AssharedentryReportWizardValidateRangesRequestAPI)
      {
         return this.adapter.ReportWizardValidateRanges(AssharedentryReportWizardValidateRangesRequestAPI);
      }
  
      public void ReportWizardValidateSAPBO(Reptwizardvalsapbo reptwizardvalsapbo)
      {
         this.adapter.ReportWizardValidateSAPBO(reptwizardvalsapbo);
      }
  
      public void ReportWizardValidateSAPBP(Reptwizardvalsapbp reptwizardvalsapbp)
      {
         this.adapter.ReportWizardValidateSAPBP(reptwizardvalsapbp);
      }
  
      public Reptwizardvalsapbs ReportWizardValidateSAPBS(Reptwizardvalsapbs reptwizardvalsapbs)
      {
         return this.adapter.ReportWizardValidateSAPBS(reptwizardvalsapbs);
      }
  
      public Reptwizardvalsapbva ReportWizardValidateSAPBVA(Reptwizardvalsapbva reptwizardvalsapbva)
      {
         return this.adapter.ReportWizardValidateSAPBVA(reptwizardvalsapbva);
      }
  
      public void ReportWizardValidateSAPBW(Reptwizardvalsapbw reptwizardvalsapbw)
      {
         this.adapter.ReportWizardValidateSAPBW(reptwizardvalsapbw);
      }
  
      public IEnumerable<Reptwizardlstprcapinvlst> ReportWizardListProcAPInvList(AssharedentryReportWizardListProcAPInvListRequestAPI AssharedentryReportWizardListProcAPInvListRequestAPI)
      {
         return this.adapter.ReportWizardListProcAPInvList(AssharedentryReportWizardListProcAPInvListRequestAPI);
      }
  
      public IEnumerable<Sharedcommentresults> SharedCommentLoad(Sharedcommentcriteria sharedcommentcriteria)
      {
         return this.adapter.SharedCommentLoad(sharedcommentcriteria);
      }
  
      public AssharedentrySharedCommentSaveResponseAPI SharedCommentSave(IEnumerable<Sharedcommentresults> sharedcommentresults)
      {
         return this.adapter.SharedCommentSave(sharedcommentresults);
      }
  
      public AssharedentrySharedCommentDeleteResponseAPI SharedCommentDelete(IEnumerable<Sharedcommentresults> sharedcommentresults)
      {
         return this.adapter.SharedCommentDelete(sharedcommentresults);
      }
  
      public IEnumerable<Sharedpvregistry> SharedPVRegistryLoad(IEnumerable<Sharedpvregistry> sharedpvregistry)
      {
         return this.adapter.SharedPVRegistryLoad(sharedpvregistry);
      }
  
      public IEnumerable<Sharedpvregistry> SharedPVRegistrySave(IEnumerable<Sharedpvregistry> sharedpvregistry)
      {
         return this.adapter.SharedPVRegistrySave(sharedpvregistry);
      }
  
      public Shoplistchangetotals ShoppingListChange(AssharedentryShoppingListChangeRequestAPI AssharedentryShoppingListChangeRequestAPI)
      {
         return this.adapter.ShoppingListChange(AssharedentryShoppingListChangeRequestAPI);
      }
  
      public Shoplistdeletetotals ShoppingListDelete(AssharedentryShoppingListDeleteRequestAPI AssharedentryShoppingListDeleteRequestAPI)
      {
         return this.adapter.ShoppingListDelete(AssharedentryShoppingListDeleteRequestAPI);
      }
  
      public Shoplistpopulatetotals ShoppingListPopulate(AssharedentryShoppingListPopulateRequestAPI AssharedentryShoppingListPopulateRequestAPI)
      {
         return this.adapter.ShoppingListPopulate(AssharedentryShoppingListPopulateRequestAPI);
      }
  
      public Shoplistpreparetotals ShoppingListPrepare(Shoplistpreparecriteria shoplistpreparecriteria)
      {
         return this.adapter.ShoppingListPrepare(shoplistpreparecriteria);
      }
  
      public AssharedentryShoppingListUpdateAllResponseAPI ShoppingListUpdateAll(AssharedentryShoppingListUpdateAllRequestAPI AssharedentryShoppingListUpdateAllRequestAPI)
      {
         return this.adapter.ShoppingListUpdateAll(AssharedentryShoppingListUpdateAllRequestAPI);
      }
  
      public AssharedentryShoppingListUpdateFromListResponseAPI ShoppingListUpdateFromList(AssharedentryShoppingListUpdateFromListRequestAPI AssharedentryShoppingListUpdateFromListRequestAPI)
      {
         return this.adapter.ShoppingListUpdateFromList(AssharedentryShoppingListUpdateFromListRequestAPI);
      }
  
      public void AuthPointTransCancel(Authpointtrans authpointtrans)
      {
         this.adapter.AuthPointTransCancel(authpointtrans);
      }
  
      public AssharedentryAuthPointTransAuthCheckResponseAPI AuthPointTransAuthCheck(Authpointtrans authpointtrans)
      {
         return this.adapter.AuthPointTransAuthCheck(authpointtrans);
      }
  
      public AssharedentryAuthPointTransValidateResponseAPI AuthPointTransValidate(Authpointtrans authpointtrans)
      {
         return this.adapter.AuthPointTransValidate(authpointtrans);
      }
  
      public IEnumerable<Authpointtrans> AuthPointTransRetrieve(AssharedentryAuthPointTransRetrieveRequestAPI AssharedentryAuthPointTransRetrieveRequestAPI)
      {
         return this.adapter.AuthPointTransRetrieve(AssharedentryAuthPointTransRetrieveRequestAPI);
      }
  
      public IEnumerable<Authpointtrans> AuthPointTransGrant(IEnumerable<Authpointtrans> authpointtrans)
      {
         return this.adapter.AuthPointTransGrant(authpointtrans);
      }
  
      public IEnumerable<Authpointtrans> AuthPointTransDeny(IEnumerable<Authpointtrans> authpointtrans)
      {
         return this.adapter.AuthPointTransDeny(authpointtrans);
      }
  
      public IEnumerable<Authpointtrans> AuthPointTransReset(IEnumerable<Authpointtrans> authpointtrans)
      {
         return this.adapter.AuthPointTransReset(authpointtrans);
      }
  
      public IEnumerable<Authpointsecurityresults> AuthPointSecurityRetrieve(Authpointsecuritycriteria authpointsecuritycriteria)
      {
         return this.adapter.AuthPointSecurityRetrieve(authpointsecuritycriteria);
      }
  
      public IEnumerable<Authpointsecurityupdate> AuthPointSetSecurity(IEnumerable<Authpointsecurityupdate> authpointsecurityupdate)
      {
         return this.adapter.AuthPointSetSecurity(authpointsecurityupdate);
      }
  
      public void PVRecoveryRecord(Pvrecoveryrecord pvrecoveryrecord)
      {
         this.adapter.PVRecoveryRecord(pvrecoveryrecord);
      }
  
      public void OperatorValidate(Opervalidate opervalidate)
      {
         this.adapter.OperatorValidate(opervalidate);
      }
  
      public Aocustomer AOCustomerLoad()
      {
         return this.adapter.AOCustomerLoad();
      }
  
      public Aocustomer AOCustomerLoadSCType(Aocustomer aocustomer)
      {
         return this.adapter.AOCustomerLoadSCType(aocustomer);
      }
  
      public Aocustomer AOCustSetPerMonth(Aocustomer aocustomer)
      {
         return this.adapter.AOCustSetPerMonth(aocustomer);
      }
  
      public IEnumerable<Messaging> AOCustomerSave(Aocustomer aocustomer)
      {
         return this.adapter.AOCustomerSave(aocustomer);
      }
  
      public Aovendor AOVendorLoad()
      {
         return this.adapter.AOVendorLoad();
      }
  
      public IEnumerable<Messaging> AOVendorSave(Aovendor aovendor)
      {
         return this.adapter.AOVendorSave(aovendor);
      }
  
      public Aoproduct AOProductLoad()
      {
         return this.adapter.AOProductLoad();
      }
  
      public IEnumerable<Messaging> AOProductSave(Aoproduct aoproduct)
      {
         return this.adapter.AOProductSave(aoproduct);
      }
  
      public Aokitproduction AOKitProductionLoad()
      {
         return this.adapter.AOKitProductionLoad();
      }
  
      public void AOKitProductionSave(Aokitproduction aokitproduction)
      {
         this.adapter.AOKitProductionSave(aokitproduction);
      }
  
      public Aosalesorders AOSalesOrdersLoad()
      {
         return this.adapter.AOSalesOrdersLoad();
      }
  
      public IEnumerable<Messaging> AOSalesOrdersSave(Aosalesorders aosalesorders)
      {
         return this.adapter.AOSalesOrdersSave(aosalesorders);
      }
  
      public IEnumerable<Aoarscl> AOarsclLoad()
      {
         return this.adapter.AOarsclLoad();
      }
  
      public void AOarsclSave(decimal pvCustno)
      {
         this.adapter.AOarsclSave(pvCustno);
      }
  
      public void AOarsclDelete(decimal pvCustno)
      {
         this.adapter.AOarsclDelete(pvCustno);
      }
  
      public Aopurchaseorders AOPurchaseOrdersLoad()
      {
         return this.adapter.AOPurchaseOrdersLoad();
      }
  
      public IEnumerable<Messaging> AOPurchaseOrdersSave(Aopurchaseorders aopurchaseorders)
      {
         return this.adapter.AOPurchaseOrdersSave(aopurchaseorders);
      }
  
      public Aojobmanagement AOJobManagementLoad()
      {
         return this.adapter.AOJobManagementLoad();
      }
  
      public IEnumerable<Messaging> AOJobManagementSave(Aojobmanagement aojobmanagement)
      {
         return this.adapter.AOJobManagementSave(aojobmanagement);
      }
  
      public Aowarehousetransfers AOWarehouseTransfersLoad()
      {
         return this.adapter.AOWarehouseTransfersLoad();
      }
  
      public IEnumerable<Messaging> AOWarehouseTransfersSave(Aowarehousetransfers aowarehousetransfers)
      {
         return this.adapter.AOWarehouseTransfersSave(aowarehousetransfers);
      }
  
      public Aoservicewarranty AOServiceWarrantyLoad()
      {
         return this.adapter.AOServiceWarrantyLoad();
      }
  
      public IEnumerable<Messaging> AOServiceWarrantySave(Aoservicewarranty aoservicewarranty)
      {
         return this.adapter.AOServiceWarrantySave(aoservicewarranty);
      }
  
      public Aovalueadd AOValueAddLoad()
      {
         return this.adapter.AOValueAddLoad();
      }
  
      public IEnumerable<Messaging> AOValueAddSave(Aovalueadd aovalueadd)
      {
         return this.adapter.AOValueAddSave(aovalueadd);
      }
  
      public Aofinancials AOFinancialsLoad()
      {
         return this.adapter.AOFinancialsLoad();
      }
  
      public IEnumerable<Messaging> AOFinancialsSave(Aofinancials aofinancials)
      {
         return this.adapter.AOFinancialsSave(aofinancials);
      }
  
      public Aosaleshistory AOSalesHistoryLoad()
      {
         return this.adapter.AOSalesHistoryLoad();
      }
  
      public IEnumerable<Messaging> AOSalesHistorySave(Aosaleshistory aosaleshistory)
      {
         return this.adapter.AOSalesHistorySave(aosaleshistory);
      }
  
      public Aosystem AOSystemLoad()
      {
         return this.adapter.AOSystemLoad();
      }
  
      public IEnumerable<Messaging> AOSystemSave(Aosystem aosystem)
      {
         return this.adapter.AOSystemSave(aosystem);
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
  