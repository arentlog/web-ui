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
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.Shared
{  
   using Sxe.Shared.Data.Models.PdsContext;
   using Sxe.Shared.Data.Models.Pdsaosystemusertable;
   using Sxe.Shared.Data.Models.Pdsaosystemuserflds;
   using Sxe.Shared.Data.Models.Pdsmessaging;
   using Sxe.Shared.Data.Models.Pdsaosystemfunctyp;
   using Sxe.Shared.Data.Models.Pdsaosystemlanguage;
   using Sxe.Shared.Data.Models.Pdsaosystemmenuitem;
   using Sxe.Shared.Data.Models.Pdsaosystemmenuitemrectyp;
   using Sxe.Shared.Data.Models.Pdsaosystemmenuitemnew;
   using Sxe.Shared.Data.Models.Pdsaosystemrptitem;
   using Sxe.Shared.Data.Models.Pdsaosystemrptitemnew;
   using Sxe.Shared.Data.Models.Pdsaologistics;
   using Sxe.Shared.Data.Models.Pdsaologisticswlloc;
   using Sxe.Shared.Data.Models.Pdsaointegrations;
   using Sxe.Shared.Data.Models.Pdswebsettingdetails;
   using Sxe.Shared.Data.Models.Pdswebsettingload;
   using Sxe.Shared.Data.Models.Pdsreporttransfer;
   using Sxe.Shared.Data.Models.Pdswebmodrecord;
   using Sxe.Shared.Data.Models.Pdswebmodcriteria;
   using Sxe.Shared.Data.Models.Pdswebmodlistcriteria;
   using Sxe.Shared.Data.Models.Pdswebmodlistresults;
   using Sxe.Shared.Data.Models.Pdswebnoterecord;
   using Sxe.Shared.Data.Models.Pdswebnotecriteria;
   using Sxe.Shared.Data.Models.Pdswebnotelistcriteria;
   using Sxe.Shared.Data.Models.Pdswebnotelistresults;
   using Sxe.Shared.Data.Models.Pdsnotemovepageno;
   using Sxe.Shared.Data.Models.Pdsvendorcurrency;
   using Sxe.Shared.Data.Models.Pdsgeocodelookup;
   using Sxe.Shared.Data.Models.Pdsmenusecurity;
   using Sxe.Shared.Data.Models.Pdsprinterinitialize;
   using Sxe.Shared.Data.Models.Pdsprintervalidate;
   using Sxe.Shared.Data.Models.Pdsreptgrouplookup;
   using Sxe.Shared.Data.Models.Pdsreportsecurity;
   using Sxe.Shared.Data.Models.Pdsreptwizarddefn;
   using Sxe.Shared.Data.Models.Pdsreptwizardlistproc;
   using Sxe.Shared.Data.Models.Pdsreptwizardenablesapbs;
   using Sxe.Shared.Data.Models.Pdsreptwizardfinish;
   using Sxe.Shared.Data.Models.Pdsprintersettings;
   using Sxe.Shared.Data.Models.Pdsreptwizardvalsapbo;
   using Sxe.Shared.Data.Models.Pdsreptwizardvalsapbp;
   using Sxe.Shared.Data.Models.Pdsreptwizardvalsapbs;
   using Sxe.Shared.Data.Models.Pdsreptwizardvalsapbva;
   using Sxe.Shared.Data.Models.Pdsreptwizardvalsapbw;
   using Sxe.Shared.Data.Models.Pdsreptwizardlstprcapinv;
   using Sxe.Shared.Data.Models.Pdssharedcommentcriteria;
   using Sxe.Shared.Data.Models.Pdssharedcommentresults;
   using Sxe.Shared.Data.Models.Pdssharedpvregistry;
   using Sxe.Shared.Data.Models.Pdsshoplistchange;
   using Sxe.Shared.Data.Models.Pdsshoplistdelete;
   using Sxe.Shared.Data.Models.Pdsshoplistpopulate;
   using Sxe.Shared.Data.Models.Pdsshoplistprepare;
   using Sxe.Shared.Data.Models.Pdsshoplistupdate;
   using Sxe.Shared.Data.Models.Pdsauthpointtrans;
   using Sxe.Shared.Data.Models.Pdsauthpointsecurity;
   using Sxe.Shared.Data.Models.Pdsauthpointsecurityupdate;
   using Sxe.Shared.Data.Models.Pdspvrecoveryrecord;
   using Sxe.Shared.Data.Models.Pdsopervalidate;
   using Sxe.Shared.Data.Models.Pdsaocustomer;
   using Sxe.Shared.Data.Models.Pdsaovendor;
   using Sxe.Shared.Data.Models.Pdsaoproduct;
   using Sxe.Shared.Data.Models.Pdsaokitproduction;
   using Sxe.Shared.Data.Models.Pdsaosalesorders;
   using Sxe.Shared.Data.Models.Pdsaoarscl;
   using Sxe.Shared.Data.Models.Pdsaopurchaseorders;
   using Sxe.Shared.Data.Models.Pdsaojobmanagement;
   using Sxe.Shared.Data.Models.Pdsaowarehousetransfers;
   using Sxe.Shared.Data.Models.Pdsaoservicewarranty;
   using Sxe.Shared.Data.Models.Pdsaovalueadd;
   using Sxe.Shared.Data.Models.Pdsaofinancials;
   using Sxe.Shared.Data.Models.Pdsaosaleshistory;
   using Sxe.Shared.Data.Models.Pdsaosystem;
   using Sxe.Shared.Data.Models.Complex;
   using Sxe.Shared.Data.Repositories;
    
   [RoutePrefix("api/shared/assharedentry")]
   public partial class AssharedentryApiController : ApiControllerBase
   {
      private readonly AssharedentryRepository repository;
    
      public AssharedentryApiController(AssharedentryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("aosystemusertableload")]
      [HttpGet]
      public IEnumerable<Aosystemusertable> AOSystemUserTableLoad()
      {
         return this.repository.AOSystemUserTableLoad();
      } 
  
      
      [Route("aosystemuserfldsload")]
      [HttpPost]
      public Aosystemuserflds AOSystemUserFldsLoad(Aosystemuserflds aosystemuserflds)
      {
         return this.repository.AOSystemUserFldsLoad(aosystemuserflds);
      } 
  
      
      [Route("aosystemuserfldssave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemUserFldsSave(Aosystemuserflds aosystemuserflds)
      {
         return this.repository.AOSystemUserFldsSave(aosystemuserflds);
      } 
  
      
      [Route("aosystemfunctypload")]
      [HttpGet]
      public IEnumerable<Aosystemfunctyp> AOSystemFuncTypLoad()
      {
         return this.repository.AOSystemFuncTypLoad();
      } 
  
      
      [Route("aosystemfunctypsave")]
      [HttpPost]
      public AssharedentryAOSystemFuncTypSaveResponseAPI AOSystemFuncTypSave(Aosystemfunctyp aosystemfunctyp)
      {
         return this.repository.AOSystemFuncTypSave(aosystemfunctyp);
      } 
  
      
      [Route("aosystemfunctypdelete")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemFuncTypDelete(Aosystemfunctyp aosystemfunctyp)
      {
         return this.repository.AOSystemFuncTypDelete(aosystemfunctyp);
      } 
  
      
      [Route("aosystemlanguageload")]
      [HttpGet]
      public AssharedentryAOSystemLanguageLoadResponseAPI AOSystemLanguageLoad()
      {
         return this.repository.AOSystemLanguageLoad();
      } 
  
      
      [Route("aosystemmenuitemload")]
      [HttpPost]
      public AssharedentryAOSystemMenuItemLoadResponseAPI AOSystemMenuItemLoad(Aosystemmenuitem aosystemmenuitem)
      {
         return this.repository.AOSystemMenuItemLoad(aosystemmenuitem);
      } 
  
      
      [Route("aosystemmenuitemrectypload")]
      [HttpPost]
      public Aosystemmenuitemrectyp AOSystemMenuItemRecTypLoad(Aosystemmenuitemrectyp aosystemmenuitemrectyp)
      {
         return this.repository.AOSystemMenuItemRecTypLoad(aosystemmenuitemrectyp);
      } 
  
      
      [Route("aosystemmenuitemnewsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemMenuItemNewSave(Aosystemmenuitemnew aosystemmenuitemnew)
      {
         return this.repository.AOSystemMenuItemNewSave(aosystemmenuitemnew);
      } 
  
      
      [Route("aosystemmenuitemsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemMenuItemSave(AssharedentryAOSystemMenuItemSaveRequestAPI AssharedentryAOSystemMenuItemSaveRequestAPI)
      {
         return this.repository.AOSystemMenuItemSave(AssharedentryAOSystemMenuItemSaveRequestAPI);
      } 
  
      
      [Route("aosystemmenuitemdelete")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemMenuItemDelete(AssharedentryAOSystemMenuItemDeleteRequestAPI AssharedentryAOSystemMenuItemDeleteRequestAPI)
      {
         return this.repository.AOSystemMenuItemDelete(AssharedentryAOSystemMenuItemDeleteRequestAPI);
      } 
  
      
      [Route("aosystemrptitemload")]
      [HttpPost]
      public AssharedentryAOSystemRptItemLoadResponseAPI AOSystemRptItemLoad(IEnumerable<Aosystemrptitem> aosystemrptitem)
      {
         return this.repository.AOSystemRptItemLoad(aosystemrptitem);
      } 
  
      
      [Route("aosystemrptitemnewsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemRptItemNewSave(Aosystemrptitemnew aosystemrptitemnew)
      {
         return this.repository.AOSystemRptItemNewSave(aosystemrptitemnew);
      } 
  
      
      [Route("aosystemrptitemsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemRptItemSave(AssharedentryAOSystemRptItemSaveRequestAPI AssharedentryAOSystemRptItemSaveRequestAPI)
      {
         return this.repository.AOSystemRptItemSave(AssharedentryAOSystemRptItemSaveRequestAPI);
      } 
  
      
      [Route("aosystemrptitemdelete")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemRptItemDelete(AssharedentryAOSystemRptItemDeleteRequestAPI AssharedentryAOSystemRptItemDeleteRequestAPI)
      {
         return this.repository.AOSystemRptItemDelete(AssharedentryAOSystemRptItemDeleteRequestAPI);
      } 
  
      
      [Route("aosystemrsactive/{lRSActivefl:bool}")]
      [HttpGet]
      public IEnumerable<Messaging> AOSystemRSActive(bool lRSActivefl)
      {
         return this.repository.AOSystemRSActive(lRSActivefl);
      } 
  
      
      [Route("aologisticsload")]
      [HttpGet]
      public Aologistics AOLogisticsLoad()
      {
         return this.repository.AOLogisticsLoad();
      } 
  
      
      [Route("aologisticssave")]
      [HttpPost]
      public IEnumerable<Messaging> AOLogisticsSave(Aologistics aologistics)
      {
         return this.repository.AOLogisticsSave(aologistics);
      } 
  
      
      [Route("aologisticswllocload")]
      [HttpPost]
      public Aologisticswlloc AOLogisticsWLLocLoad(Aologisticswlloc aologisticswlloc)
      {
         return this.repository.AOLogisticsWLLocLoad(aologisticswlloc);
      } 
  
      
      [Route("aologisticswllocsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOLogisticsWLLocSave(Aologisticswlloc aologisticswlloc)
      {
         return this.repository.AOLogisticsWLLocSave(aologisticswlloc);
      } 
  
      
      [Route("aologisticswllocdelete")]
      [HttpPost]
      public IEnumerable<Messaging> AOLogisticsWLLocDelete(Aologisticswlloc aologisticswlloc)
      {
         return this.repository.AOLogisticsWLLocDelete(aologisticswlloc);
      } 
  
      
      [Route("aointegrationsload")]
      [HttpGet]
      public Aointegrations AOIntegrationsLoad()
      {
         return this.repository.AOIntegrationsLoad();
      } 
  
      
      [Route("aointegrationssave")]
      [HttpPost]
      public IEnumerable<Messaging> AOIntegrationsSave(Aointegrations aointegrations)
      {
         return this.repository.AOIntegrationsSave(aointegrations);
      } 
  
      
      [Route("retrievewebsetting")]
      [HttpPost]
      public IEnumerable<Websettingdetails> RetrieveWebSetting(AssharedentryRetrieveWebSettingRequestAPI AssharedentryRetrieveWebSettingRequestAPI)
      {
         return this.repository.RetrieveWebSetting(AssharedentryRetrieveWebSettingRequestAPI);
      } 
  
      
      [Route("savewebsetting")]
      [HttpPost]
      public void SaveWebSetting(IEnumerable<Websettingdetails> websettingdetails)
      {
         this.repository.SaveWebSetting(websettingdetails);
      } 
  
      
      [Route("loadwebsetting")]
      [HttpPost]
      public IEnumerable<Websettingdetails> LoadWebSetting(Websettingload websettingload)
      {
         return this.repository.LoadWebSetting(websettingload);
      } 
  
      
      [Route("filetransfer")]
      [HttpPost]
      public void FileTransfer(AssharedentryFileTransferRequestAPI AssharedentryFileTransferRequestAPI)
      {
         this.repository.FileTransfer(AssharedentryFileTransferRequestAPI);
      } 
  
      
      [Route("webmodificationcreate")]
      [HttpPost]
      public Webmodrecord WebModificationCreate(Webmodrecord webmodrecord)
      {
         return this.repository.WebModificationCreate(webmodrecord);
      } 
  
      
      [Route("webmodificationdelete")]
      [HttpPost]
      public void WebModificationDelete(IEnumerable<Webmodcriteria> webmodcriteria)
      {
         this.repository.WebModificationDelete(webmodcriteria);
      } 
  
      
      [Route("getwebmodificationlist")]
      [HttpPost]
      public AssharedentryGetWebModificationListResponseAPI GetWebModificationList(Webmodlistcriteria webmodlistcriteria)
      {
         return this.repository.GetWebModificationList(webmodlistcriteria);
      } 
  
      
      [Route("getactivewebmodification")]
      [HttpPost]
      public Webmodlistresults GetActiveWebModification(Webmodlistcriteria webmodlistcriteria)
      {
         return this.repository.GetActiveWebModification(webmodlistcriteria);
      } 
  
      
      [Route("webmodificationread")]
      [HttpPost]
      public Webmodrecord WebModificationRead(Webmodcriteria webmodcriteria)
      {
         return this.repository.WebModificationRead(webmodcriteria);
      } 
  
      
      [Route("webmodificationupdate")]
      [HttpPost]
      public void WebModificationUpdate(Webmodrecord webmodrecord)
      {
         this.repository.WebModificationUpdate(webmodrecord);
      } 
  
      
      [Route("webnotecreate")]
      [HttpPost]
      public Webnoterecord WebNoteCreate(Webnoterecord webnoterecord)
      {
         return this.repository.WebNoteCreate(webnoterecord);
      } 
  
      
      [Route("webnotedelete")]
      [HttpPost]
      public void WebNoteDelete(IEnumerable<Webnotecriteria> webnotecriteria)
      {
         this.repository.WebNoteDelete(webnotecriteria);
      } 
  
      
      [Route("getwebnotelist")]
      [HttpPost]
      public AssharedentryGetWebNoteListResponseAPI GetWebNoteList(Webnotelistcriteria webnotelistcriteria)
      {
         return this.repository.GetWebNoteList(webnotelistcriteria);
      } 
  
      
      [Route("webnoteread")]
      [HttpPost]
      public Webnoterecord WebNoteRead(Webnotecriteria webnotecriteria)
      {
         return this.repository.WebNoteRead(webnotecriteria);
      } 
  
      
      [Route("webnoteupdate")]
      [HttpPost]
      public void WebNoteUpdate(Webnoterecord webnoterecord)
      {
         this.repository.WebNoteUpdate(webnoterecord);
      } 
  
      
      [Route("webnotemovepagenumber")]
      [HttpPost]
      public IEnumerable<Notemovepagenoresults> WebNoteMovePageNumber(Notemovepageno notemovepageno)
      {
         return this.repository.WebNoteMovePageNumber(notemovepageno);
      } 
  
      
      [Route("ionimspingtest")]
      [HttpGet]
      public void IONIMSPingTest()
      {
         this.repository.IONIMSPingTest();
      } 
  
      
      [Route("calculatevendorcurrency")]
      [HttpPost]
      public Vendorcurrencysingle CalculateVendorCurrency(Vendorcurrencycriteria vendorcurrencycriteria)
      {
         return this.repository.CalculateVendorCurrency(vendorcurrencycriteria);
      } 
  
      
      [Route("clearshoppinglist")]
      [HttpGet]
      public void ClearShoppingList()
      {
         this.repository.ClearShoppingList();
      } 
  
      
      [Route("geocodelookup")]
      [HttpPost]
      public IEnumerable<Geocodelookupresults> GEOCodeLookup(Geocodelookupcriteria geocodelookupcriteria)
      {
         return this.repository.GEOCodeLookup(geocodelookupcriteria);
      } 
  
      
      [Route("menufunctionsecuritysettings/{cSecurityRoles}")]
      [HttpGet]
      public AssharedentryMenuFunctionSecuritySettingsResponseAPI MenuFunctionSecuritySettings(string cSecurityRoles)
      {
         return this.repository.MenuFunctionSecuritySettings(cSecurityRoles);
      } 
  
      
      [Route("printerinitialize")]
      [HttpPost]
      public Printerinitialize PrinterInitialize(AssharedentryPrinterInitializeRequestAPI AssharedentryPrinterInitializeRequestAPI)
      {
         return this.repository.PrinterInitialize(AssharedentryPrinterInitializeRequestAPI);
      } 
  
      
      [Route("printervalidate")]
      [HttpPost]
      public IEnumerable<Messaging> PrinterValidate(Printervalidate printervalidate)
      {
         return this.repository.PrinterValidate(printervalidate);
      } 
  
      
      [Route("reportgrouplookup")]
      [HttpPost]
      public IEnumerable<Reptgrouplookupresults> ReportGroupLookup(Reptgrouplookupcriteria reptgrouplookupcriteria)
      {
         return this.repository.ReportGroupLookup(reptgrouplookupcriteria);
      } 
  
      
      [Route("reportsecuritysettings")]
      [HttpPost]
      public IEnumerable<Reportsecurity> ReportSecuritySettings(AssharedentryReportSecuritySettingsRequestAPI AssharedentryReportSecuritySettingsRequestAPI)
      {
         return this.repository.ReportSecuritySettings(AssharedentryReportSecuritySettingsRequestAPI);
      } 
  
      
      [Route("reportsend/{cReportName}/{cUsersList}")]
      [HttpGet]
      public void ReportSend(string cReportName, string cUsersList)
      {
         this.repository.ReportSend(cReportName, cUsersList);
      } 
  
      
      [Route("reporttransfer/{cReportName}/{cFileName}")]
      [HttpGet]
      public Reporttransfer ReportTransfer(string cReportName, string cFileName)
      {
         return this.repository.ReportTransfer(cReportName, cFileName);
      } 
  
      
      [Route("reportwizarddefinition")]
      [HttpPost]
      public AssharedentryReportWizardDefinitionResponseAPI ReportWizardDefinition(Reptwizarddefncriteria reptwizarddefncriteria)
      {
         return this.repository.ReportWizardDefinition(reptwizarddefncriteria);
      } 
  
      
      [Route("reportwizarddeletereport/{cReportName}")]
      [HttpGet]
      public void ReportWizardDeleteReport(string cReportName)
      {
         this.repository.ReportWizardDeleteReport(cReportName);
      } 
  
      
      [Route("reportwizardenablesapbs")]
      [HttpPost]
      public Reptwizardenablesapbs ReportWizardEnableSAPBS(Reptwizardenablesapbs reptwizardenablesapbs)
      {
         return this.repository.ReportWizardEnableSAPBS(reptwizardenablesapbs);
      } 
  
      
      [Route("reportwizardfinish")]
      [HttpPost]
      public IEnumerable<Messaging> ReportWizardFinish(AssharedentryReportWizardFinishRequestAPI AssharedentryReportWizardFinishRequestAPI)
      {
         return this.repository.ReportWizardFinish(AssharedentryReportWizardFinishRequestAPI);
      } 
  
      
      [Route("reportwizardlockreportrecord/{cReportName}")]
      [HttpGet]
      public void ReportWizardLockReportRecord(string cReportName)
      {
         this.repository.ReportWizardLockReportRecord(cReportName);
      } 
  
      
      [Route("reportwizardnextreportname")]
      [HttpGet]
      public string ReportWizardNextReportName()
      {
         return this.repository.ReportWizardNextReportName();
      } 
  
      
      [Route("reportwizardunlockreportrecord/{cReportName}")]
      [HttpGet]
      public void ReportWizardUnlockReportRecord(string cReportName)
      {
         this.repository.ReportWizardUnlockReportRecord(cReportName);
      } 
  
      
      [Route("reportwizardvalidateoptions")]
      [HttpPost]
      public IEnumerable<Messaging> ReportWizardValidateOptions(AssharedentryReportWizardValidateOptionsRequestAPI AssharedentryReportWizardValidateOptionsRequestAPI)
      {
         return this.repository.ReportWizardValidateOptions(AssharedentryReportWizardValidateOptionsRequestAPI);
      } 
  
      
      [Route("reportwizardvalidateranges")]
      [HttpPost]
      public IEnumerable<Messaging> ReportWizardValidateRanges(AssharedentryReportWizardValidateRangesRequestAPI AssharedentryReportWizardValidateRangesRequestAPI)
      {
         return this.repository.ReportWizardValidateRanges(AssharedentryReportWizardValidateRangesRequestAPI);
      } 
  
      
      [Route("reportwizardvalidatesapbo")]
      [HttpPost]
      public void ReportWizardValidateSAPBO(Reptwizardvalsapbo reptwizardvalsapbo)
      {
         this.repository.ReportWizardValidateSAPBO(reptwizardvalsapbo);
      } 
  
      
      [Route("reportwizardvalidatesapbp")]
      [HttpPost]
      public void ReportWizardValidateSAPBP(Reptwizardvalsapbp reptwizardvalsapbp)
      {
         this.repository.ReportWizardValidateSAPBP(reptwizardvalsapbp);
      } 
  
      
      [Route("reportwizardvalidatesapbs")]
      [HttpPost]
      public Reptwizardvalsapbs ReportWizardValidateSAPBS(Reptwizardvalsapbs reptwizardvalsapbs)
      {
         return this.repository.ReportWizardValidateSAPBS(reptwizardvalsapbs);
      } 
  
      
      [Route("reportwizardvalidatesapbva")]
      [HttpPost]
      public Reptwizardvalsapbva ReportWizardValidateSAPBVA(Reptwizardvalsapbva reptwizardvalsapbva)
      {
         return this.repository.ReportWizardValidateSAPBVA(reptwizardvalsapbva);
      } 
  
      
      [Route("reportwizardvalidatesapbw")]
      [HttpPost]
      public void ReportWizardValidateSAPBW(Reptwizardvalsapbw reptwizardvalsapbw)
      {
         this.repository.ReportWizardValidateSAPBW(reptwizardvalsapbw);
      } 
  
      
      [Route("reportwizardlistprocapinvlist")]
      [HttpPost]
      public IEnumerable<Reptwizardlstprcapinvlst> ReportWizardListProcAPInvList(AssharedentryReportWizardListProcAPInvListRequestAPI AssharedentryReportWizardListProcAPInvListRequestAPI)
      {
         return this.repository.ReportWizardListProcAPInvList(AssharedentryReportWizardListProcAPInvListRequestAPI);
      } 
  
      
      [Route("sharedcommentload")]
      [HttpPost]
      public IEnumerable<Sharedcommentresults> SharedCommentLoad(Sharedcommentcriteria sharedcommentcriteria)
      {
         return this.repository.SharedCommentLoad(sharedcommentcriteria);
      } 
  
      
      [Route("sharedcommentsave")]
      [HttpPost]
      public AssharedentrySharedCommentSaveResponseAPI SharedCommentSave(IEnumerable<Sharedcommentresults> sharedcommentresults)
      {
         return this.repository.SharedCommentSave(sharedcommentresults);
      } 
  
      
      [Route("sharedcommentdelete")]
      [HttpPost]
      public AssharedentrySharedCommentDeleteResponseAPI SharedCommentDelete(IEnumerable<Sharedcommentresults> sharedcommentresults)
      {
         return this.repository.SharedCommentDelete(sharedcommentresults);
      } 
  
      
      [Route("sharedpvregistryload")]
      [HttpPost]
      public IEnumerable<Sharedpvregistry> SharedPVRegistryLoad(IEnumerable<Sharedpvregistry> sharedpvregistry)
      {
         return this.repository.SharedPVRegistryLoad(sharedpvregistry);
      } 
  
      
      [Route("sharedpvregistrysave")]
      [HttpPost]
      public IEnumerable<Sharedpvregistry> SharedPVRegistrySave(IEnumerable<Sharedpvregistry> sharedpvregistry)
      {
         return this.repository.SharedPVRegistrySave(sharedpvregistry);
      } 
  
      
      [Route("shoppinglistchange")]
      [HttpPost]
      public Shoplistchangetotals ShoppingListChange(AssharedentryShoppingListChangeRequestAPI AssharedentryShoppingListChangeRequestAPI)
      {
         return this.repository.ShoppingListChange(AssharedentryShoppingListChangeRequestAPI);
      } 
  
      
      [Route("shoppinglistdelete")]
      [HttpPost]
      public Shoplistdeletetotals ShoppingListDelete(AssharedentryShoppingListDeleteRequestAPI AssharedentryShoppingListDeleteRequestAPI)
      {
         return this.repository.ShoppingListDelete(AssharedentryShoppingListDeleteRequestAPI);
      } 
  
      
      [Route("shoppinglistpopulate")]
      [HttpPost]
      public Shoplistpopulatetotals ShoppingListPopulate(AssharedentryShoppingListPopulateRequestAPI AssharedentryShoppingListPopulateRequestAPI)
      {
         return this.repository.ShoppingListPopulate(AssharedentryShoppingListPopulateRequestAPI);
      } 
  
      
      [Route("shoppinglistprepare")]
      [HttpPost]
      public Shoplistpreparetotals ShoppingListPrepare(Shoplistpreparecriteria shoplistpreparecriteria)
      {
         return this.repository.ShoppingListPrepare(shoplistpreparecriteria);
      } 
  
      
      [Route("shoppinglistupdateall")]
      [HttpPost]
      public AssharedentryShoppingListUpdateAllResponseAPI ShoppingListUpdateAll(AssharedentryShoppingListUpdateAllRequestAPI AssharedentryShoppingListUpdateAllRequestAPI)
      {
         return this.repository.ShoppingListUpdateAll(AssharedentryShoppingListUpdateAllRequestAPI);
      } 
  
      
      [Route("shoppinglistupdatefromlist")]
      [HttpPost]
      public AssharedentryShoppingListUpdateFromListResponseAPI ShoppingListUpdateFromList(AssharedentryShoppingListUpdateFromListRequestAPI AssharedentryShoppingListUpdateFromListRequestAPI)
      {
         return this.repository.ShoppingListUpdateFromList(AssharedentryShoppingListUpdateFromListRequestAPI);
      } 
  
      
      [Route("authpointtranscancel")]
      [HttpPost]
      public void AuthPointTransCancel(Authpointtrans authpointtrans)
      {
         this.repository.AuthPointTransCancel(authpointtrans);
      } 
  
      
      [Route("authpointtransauthcheck")]
      [HttpPost]
      public AssharedentryAuthPointTransAuthCheckResponseAPI AuthPointTransAuthCheck(Authpointtrans authpointtrans)
      {
         return this.repository.AuthPointTransAuthCheck(authpointtrans);
      } 
  
      
      [Route("authpointtransvalidate")]
      [HttpPost]
      public AssharedentryAuthPointTransValidateResponseAPI AuthPointTransValidate(Authpointtrans authpointtrans)
      {
         return this.repository.AuthPointTransValidate(authpointtrans);
      } 
  
      
      [Route("authpointtransretrieve")]
      [HttpPost]
      public IEnumerable<Authpointtrans> AuthPointTransRetrieve(AssharedentryAuthPointTransRetrieveRequestAPI AssharedentryAuthPointTransRetrieveRequestAPI)
      {
         return this.repository.AuthPointTransRetrieve(AssharedentryAuthPointTransRetrieveRequestAPI);
      } 
  
      
      [Route("authpointtransgrant")]
      [HttpPost]
      public IEnumerable<Authpointtrans> AuthPointTransGrant(IEnumerable<Authpointtrans> authpointtrans)
      {
         return this.repository.AuthPointTransGrant(authpointtrans);
      } 
  
      
      [Route("authpointtransdeny")]
      [HttpPost]
      public IEnumerable<Authpointtrans> AuthPointTransDeny(IEnumerable<Authpointtrans> authpointtrans)
      {
         return this.repository.AuthPointTransDeny(authpointtrans);
      } 
  
      
      [Route("authpointtransreset")]
      [HttpPost]
      public IEnumerable<Authpointtrans> AuthPointTransReset(IEnumerable<Authpointtrans> authpointtrans)
      {
         return this.repository.AuthPointTransReset(authpointtrans);
      } 
  
      
      [Route("authpointsecurityretrieve")]
      [HttpPost]
      public IEnumerable<Authpointsecurityresults> AuthPointSecurityRetrieve(Authpointsecuritycriteria authpointsecuritycriteria)
      {
         return this.repository.AuthPointSecurityRetrieve(authpointsecuritycriteria);
      } 
  
      
      [Route("authpointsetsecurity")]
      [HttpPost]
      public IEnumerable<Authpointsecurityupdate> AuthPointSetSecurity(IEnumerable<Authpointsecurityupdate> authpointsecurityupdate)
      {
         return this.repository.AuthPointSetSecurity(authpointsecurityupdate);
      } 
  
      
      [Route("pvrecoveryrecord")]
      [HttpPost]
      public void PVRecoveryRecord(Pvrecoveryrecord pvrecoveryrecord)
      {
         this.repository.PVRecoveryRecord(pvrecoveryrecord);
      } 
  
      
      [Route("operatorvalidate")]
      [HttpPost]
      public void OperatorValidate(Opervalidate opervalidate)
      {
         this.repository.OperatorValidate(opervalidate);
      } 
  
      
      [Route("aocustomerload")]
      [HttpGet]
      public Aocustomer AOCustomerLoad()
      {
         return this.repository.AOCustomerLoad();
      } 
  
      
      [Route("aocustomerloadsctype")]
      [HttpPost]
      public Aocustomer AOCustomerLoadSCType(Aocustomer aocustomer)
      {
         return this.repository.AOCustomerLoadSCType(aocustomer);
      } 
  
      
      [Route("aocustsetpermonth")]
      [HttpPost]
      public Aocustomer AOCustSetPerMonth(Aocustomer aocustomer)
      {
         return this.repository.AOCustSetPerMonth(aocustomer);
      } 
  
      
      [Route("aocustomersave")]
      [HttpPost]
      public IEnumerable<Messaging> AOCustomerSave(Aocustomer aocustomer)
      {
         return this.repository.AOCustomerSave(aocustomer);
      } 
  
      
      [Route("aovendorload")]
      [HttpGet]
      public Aovendor AOVendorLoad()
      {
         return this.repository.AOVendorLoad();
      } 
  
      
      [Route("aovendorsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOVendorSave(Aovendor aovendor)
      {
         return this.repository.AOVendorSave(aovendor);
      } 
  
      
      [Route("aoproductload")]
      [HttpGet]
      public Aoproduct AOProductLoad()
      {
         return this.repository.AOProductLoad();
      } 
  
      
      [Route("aoproductsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOProductSave(Aoproduct aoproduct)
      {
         return this.repository.AOProductSave(aoproduct);
      } 
  
      
      [Route("aokitproductionload")]
      [HttpGet]
      public Aokitproduction AOKitProductionLoad()
      {
         return this.repository.AOKitProductionLoad();
      } 
  
      
      [Route("aokitproductionsave")]
      [HttpPost]
      public void AOKitProductionSave(Aokitproduction aokitproduction)
      {
         this.repository.AOKitProductionSave(aokitproduction);
      } 
  
      
      [Route("aosalesordersload")]
      [HttpGet]
      public Aosalesorders AOSalesOrdersLoad()
      {
         return this.repository.AOSalesOrdersLoad();
      } 
  
      
      [Route("aosalesorderssave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSalesOrdersSave(Aosalesorders aosalesorders)
      {
         return this.repository.AOSalesOrdersSave(aosalesorders);
      } 
  
      
      [Route("aoarsclload")]
      [HttpGet]
      public IEnumerable<Aoarscl> AOarsclLoad()
      {
         return this.repository.AOarsclLoad();
      } 
  
      
      [Route("aoarsclsave/{pvCustno:decimal}")]
      [HttpGet]
      public void AOarsclSave(decimal pvCustno)
      {
         this.repository.AOarsclSave(pvCustno);
      } 
  
      
      [Route("aoarscldelete/{pvCustno:decimal}")]
      [HttpGet]
      public void AOarsclDelete(decimal pvCustno)
      {
         this.repository.AOarsclDelete(pvCustno);
      } 
  
      
      [Route("aopurchaseordersload")]
      [HttpGet]
      public Aopurchaseorders AOPurchaseOrdersLoad()
      {
         return this.repository.AOPurchaseOrdersLoad();
      } 
  
      
      [Route("aopurchaseorderssave")]
      [HttpPost]
      public IEnumerable<Messaging> AOPurchaseOrdersSave(Aopurchaseorders aopurchaseorders)
      {
         return this.repository.AOPurchaseOrdersSave(aopurchaseorders);
      } 
  
      
      [Route("aojobmanagementload")]
      [HttpGet]
      public Aojobmanagement AOJobManagementLoad()
      {
         return this.repository.AOJobManagementLoad();
      } 
  
      
      [Route("aojobmanagementsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOJobManagementSave(Aojobmanagement aojobmanagement)
      {
         return this.repository.AOJobManagementSave(aojobmanagement);
      } 
  
      
      [Route("aowarehousetransfersload")]
      [HttpGet]
      public Aowarehousetransfers AOWarehouseTransfersLoad()
      {
         return this.repository.AOWarehouseTransfersLoad();
      } 
  
      
      [Route("aowarehousetransferssave")]
      [HttpPost]
      public IEnumerable<Messaging> AOWarehouseTransfersSave(Aowarehousetransfers aowarehousetransfers)
      {
         return this.repository.AOWarehouseTransfersSave(aowarehousetransfers);
      } 
  
      
      [Route("aoservicewarrantyload")]
      [HttpGet]
      public Aoservicewarranty AOServiceWarrantyLoad()
      {
         return this.repository.AOServiceWarrantyLoad();
      } 
  
      
      [Route("aoservicewarrantysave")]
      [HttpPost]
      public IEnumerable<Messaging> AOServiceWarrantySave(Aoservicewarranty aoservicewarranty)
      {
         return this.repository.AOServiceWarrantySave(aoservicewarranty);
      } 
  
      
      [Route("aovalueaddload")]
      [HttpGet]
      public Aovalueadd AOValueAddLoad()
      {
         return this.repository.AOValueAddLoad();
      } 
  
      
      [Route("aovalueaddsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOValueAddSave(Aovalueadd aovalueadd)
      {
         return this.repository.AOValueAddSave(aovalueadd);
      } 
  
      
      [Route("aofinancialsload")]
      [HttpGet]
      public Aofinancials AOFinancialsLoad()
      {
         return this.repository.AOFinancialsLoad();
      } 
  
      
      [Route("aofinancialssave")]
      [HttpPost]
      public IEnumerable<Messaging> AOFinancialsSave(Aofinancials aofinancials)
      {
         return this.repository.AOFinancialsSave(aofinancials);
      } 
  
      
      [Route("aosaleshistoryload")]
      [HttpGet]
      public Aosaleshistory AOSalesHistoryLoad()
      {
         return this.repository.AOSalesHistoryLoad();
      } 
  
      
      [Route("aosaleshistorysave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSalesHistorySave(Aosaleshistory aosaleshistory)
      {
         return this.repository.AOSalesHistorySave(aosaleshistory);
      } 
  
      
      [Route("aosystemload")]
      [HttpGet]
      public Aosystem AOSystemLoad()
      {
         return this.repository.AOSystemLoad();
      } 
  
      
      [Route("aosystemsave")]
      [HttpPost]
      public IEnumerable<Messaging> AOSystemSave(Aosystem aosystem)
      {
         return this.repository.AOSystemSave(aosystem);
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
  