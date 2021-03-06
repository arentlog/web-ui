//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.Shared.Data.Models.Pdsaointegrations
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaointegrations.Aointegrations")]
   public partial class Aointegrations : ModelBase
   {
      [StringValidationAttribute]
      public string serviceURL { get; set; }
      [StringValidationAttribute]
      public string applicationID { get; set; }
      [StringValidationAttribute]
      public string instanceID { get; set; }
      [StringValidationAttribute]
      public string namespaceID { get; set; }
      [StringValidationAttribute]
      public string profileID { get; set; }
      [StringValidationAttribute]
      public string apiKey { get; set; }
      [StringValidationAttribute]
      public string taxApplicationID { get; set; }
      [StringValidationAttribute]
      public string taxServiceURL { get; set; }
      [StringValidationAttribute]
      public string taxAdminName { get; set; }
      [StringValidationAttribute]
      public string taxAdminPassword { get; set; }
      [StringValidationAttribute]
      public string taxAppVersion { get; set; }
      [StringValidationAttribute]
      public string certApplicationID { get; set; }
      [StringValidationAttribute]
      public string certAdminName { get; set; }
      [StringValidationAttribute]
      public string certAdminPassword { get; set; }
      [StringValidationAttribute]
      public string certConnection { get; set; }
      [StringValidationAttribute]
      public string certService { get; set; }
      [StringValidationAttribute]
      public string certContent { get; set; }
      [StringValidationAttribute]
      public string addrServiceURL { get; set; }
      [StringValidationAttribute]
      public string addrAcctId { get; set; }
      [StringValidationAttribute]
      public string addrAcctPswrd { get; set; }
      [StringValidationAttribute]
      public string finIntegrationTy { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning1 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning2 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning3 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning4 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning5 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning6 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning7 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning8 { get; set; }
      [StringValidationAttribute]
      public string finIntTyWarning9 { get; set; }
      public bool ionactivateshipto { get; set; }
      [StringValidationAttribute]
      public string currproc { get; set; }
      [StringValidationAttribute]
      public string fTPProcess { get; set; }
      [StringValidationAttribute]
      public string sIGProcess { get; set; }
      [StringValidationAttribute]
      public string printer { get; set; }
      [StringValidationAttribute]
      public string fAXPrinter { get; set; }
      [StringValidationAttribute]
      public string fTPAddress { get; set; }
      [StringValidationAttribute]
      public string fTPUser { get; set; }
      [StringValidationAttribute]
      public string fTPPassword { get; set; }
      [StringValidationAttribute]
      public string fTPEmail { get; set; }
      [StringValidationAttribute]
      public string fTPRemDir { get; set; }
      [StringValidationAttribute]
      public string fTPLogFile { get; set; }
      [StringValidationAttribute]
      public string filePrefix { get; set; }
      [StringValidationAttribute]
      public string lockBox { get; set; }
      [StringValidationAttribute]
      public string payDir { get; set; }
      public bool eDIfl { get; set; }
      public bool dnbiinterfacefl { get; set; }
      [StringValidationAttribute]
      public string dnbihostname { get; set; }
      public int dnbiportnumber { get; set; }
      [StringValidationAttribute]
      public string dnbiresourcename { get; set; }
      public decimal dnbidefaultcredlim { get; set; }
      public decimal dnbimaxcredlim { get; set; }
      public decimal dnbiincreasecredlim { get; set; }
      public int dnbireviewperiod { get; set; }
      public bool dnbioecreditcheckfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      public bool multitenantfl { get; set; }
      public bool cloudedition { get; set; }
      public bool taxHostedInterface { get; set; }
      [StringValidationAttribute]
      public string taxHostedSecurityKey { get; set; }
      public bool iSMPrint { get; set; }
      [StringValidationAttribute]
      public string iSMNonImpactProduct { get; set; }
      public bool iSMLive { get; set; }
      [StringValidationAttribute]
      public string iSMApiUrl { get; set; }
      [StringValidationAttribute]
      public string iSMApiUserName { get; set; }
      [StringValidationAttribute]
      public string iSMApiPassWord { get; set; }
      [StringValidationAttribute]
      public string iSMApiConfigName { get; set; }
      public bool allowRental { get; set; }
      public bool automaticallyPurgeIORecord { get; set; }
      public bool outboundProcessing { get; set; }
      public int outboundProcessingThreads { get; set; }
      [StringValidationAttribute]
      public string inboundOperator { get; set; }
      public int surchargeAddon { get; set; }
      public int discountAddon { get; set; }
      public int waiverAddon { get; set; }
      [StringValidationAttribute]
      public string lostBusiness { get; set; }
      public bool iONEDI810InLive { get; set; }
      public bool iONEDI849InLive { get; set; }
      public bool iONEDI855InLive { get; set; }
      public bool iONEDI856InLive { get; set; }
      [StringValidationAttribute]
      public string laborReturnReason { get; set; }
      [StringValidationAttribute]
      public string miscReturnReason { get; set; }
      [StringValidationAttribute]
      public string iSMLogicalID { get; set; }
      public int freightAddon { get; set; }
      public int miscAddon { get; set; }
      [StringValidationAttribute]
      public string logicalID { get; set; }
      public bool locallyMexicoFl { get; set; }


      public static Aointegrations BuildAointegrationsFromRow(DataRow row)
      {
         Aointegrations entity = new Aointegrations();
         entity.serviceURL = row.IsNull("ServiceURL") ? string.Empty : row.Field<string>("ServiceURL");
         entity.applicationID = row.IsNull("ApplicationID") ? string.Empty : row.Field<string>("ApplicationID");
         entity.instanceID = row.IsNull("InstanceID") ? string.Empty : row.Field<string>("InstanceID");
         entity.namespaceID = row.IsNull("NamespaceID") ? string.Empty : row.Field<string>("NamespaceID");
         entity.profileID = row.IsNull("ProfileID") ? string.Empty : row.Field<string>("ProfileID");
         entity.apiKey = row.IsNull("ApiKey") ? string.Empty : row.Field<string>("ApiKey");
         entity.taxApplicationID = row.IsNull("TaxApplicationID") ? string.Empty : row.Field<string>("TaxApplicationID");
         entity.taxServiceURL = row.IsNull("TaxServiceURL") ? string.Empty : row.Field<string>("TaxServiceURL");
         entity.taxAdminName = row.IsNull("TaxAdminName") ? string.Empty : row.Field<string>("TaxAdminName");
         entity.taxAdminPassword = row.IsNull("TaxAdminPassword") ? string.Empty : row.Field<string>("TaxAdminPassword");
         entity.taxAppVersion = row.IsNull("TaxAppVersion") ? string.Empty : row.Field<string>("TaxAppVersion");
         entity.certApplicationID = row.IsNull("CertApplicationID") ? string.Empty : row.Field<string>("CertApplicationID");
         entity.certAdminName = row.IsNull("CertAdminName") ? string.Empty : row.Field<string>("CertAdminName");
         entity.certAdminPassword = row.IsNull("CertAdminPassword") ? string.Empty : row.Field<string>("CertAdminPassword");
         entity.certConnection = row.IsNull("CertConnection") ? string.Empty : row.Field<string>("CertConnection");
         entity.certService = row.IsNull("CertService") ? string.Empty : row.Field<string>("CertService");
         entity.certContent = row.IsNull("CertContent") ? string.Empty : row.Field<string>("CertContent");
         entity.addrServiceURL = row.IsNull("AddrServiceURL") ? string.Empty : row.Field<string>("AddrServiceURL");
         entity.addrAcctId = row.IsNull("AddrAcctId") ? string.Empty : row.Field<string>("AddrAcctId");
         entity.addrAcctPswrd = row.IsNull("AddrAcctPswrd") ? string.Empty : row.Field<string>("AddrAcctPswrd");
         entity.finIntegrationTy = row.IsNull("FinIntegrationTy") ? string.Empty : row.Field<string>("FinIntegrationTy");
         entity.finIntTyWarning1 = row.IsNull("FinIntTyWarning1") ? string.Empty : row.Field<string>("FinIntTyWarning1");
         entity.finIntTyWarning2 = row.IsNull("FinIntTyWarning2") ? string.Empty : row.Field<string>("FinIntTyWarning2");
         entity.finIntTyWarning3 = row.IsNull("FinIntTyWarning3") ? string.Empty : row.Field<string>("FinIntTyWarning3");
         entity.finIntTyWarning4 = row.IsNull("FinIntTyWarning4") ? string.Empty : row.Field<string>("FinIntTyWarning4");
         entity.finIntTyWarning5 = row.IsNull("FinIntTyWarning5") ? string.Empty : row.Field<string>("FinIntTyWarning5");
         entity.finIntTyWarning6 = row.IsNull("FinIntTyWarning6") ? string.Empty : row.Field<string>("FinIntTyWarning6");
         entity.finIntTyWarning7 = row.IsNull("FinIntTyWarning7") ? string.Empty : row.Field<string>("FinIntTyWarning7");
         entity.finIntTyWarning8 = row.IsNull("FinIntTyWarning8") ? string.Empty : row.Field<string>("FinIntTyWarning8");
         entity.finIntTyWarning9 = row.IsNull("FinIntTyWarning9") ? string.Empty : row.Field<string>("FinIntTyWarning9");
         entity.ionactivateshipto = row.Field<bool>("ionactivateshipto");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.fTPProcess = row.IsNull("FTPProcess") ? string.Empty : row.Field<string>("FTPProcess");
         entity.sIGProcess = row.IsNull("SIGProcess") ? string.Empty : row.Field<string>("SIGProcess");
         entity.printer = row.IsNull("Printer") ? string.Empty : row.Field<string>("Printer");
         entity.fAXPrinter = row.IsNull("FAXPrinter") ? string.Empty : row.Field<string>("FAXPrinter");
         entity.fTPAddress = row.IsNull("FTPAddress") ? string.Empty : row.Field<string>("FTPAddress");
         entity.fTPUser = row.IsNull("FTPUser") ? string.Empty : row.Field<string>("FTPUser");
         entity.fTPPassword = row.IsNull("FTPPassword") ? string.Empty : row.Field<string>("FTPPassword");
         entity.fTPEmail = row.IsNull("FTPEmail") ? string.Empty : row.Field<string>("FTPEmail");
         entity.fTPRemDir = row.IsNull("FTPRemDir") ? string.Empty : row.Field<string>("FTPRemDir");
         entity.fTPLogFile = row.IsNull("FTPLogFile") ? string.Empty : row.Field<string>("FTPLogFile");
         entity.filePrefix = row.IsNull("FilePrefix") ? string.Empty : row.Field<string>("FilePrefix");
         entity.lockBox = row.IsNull("LockBox") ? string.Empty : row.Field<string>("LockBox");
         entity.payDir = row.IsNull("PayDir") ? string.Empty : row.Field<string>("PayDir");
         entity.eDIfl = row.Field<bool>("EDIfl");
         entity.dnbiinterfacefl = row.Field<bool>("dnbiinterfacefl");
         entity.dnbihostname = row.IsNull("dnbihostname") ? string.Empty : row.Field<string>("dnbihostname");
         entity.dnbiportnumber = row.IsNull("dnbiportnumber") ? 0 : row.Field<int>("dnbiportnumber");
         entity.dnbiresourcename = row.IsNull("dnbiresourcename") ? string.Empty : row.Field<string>("dnbiresourcename");
         entity.dnbidefaultcredlim = row.IsNull("dnbidefaultcredlim") ? decimal.Zero : row.Field<decimal>("dnbidefaultcredlim");
         entity.dnbimaxcredlim = row.IsNull("dnbimaxcredlim") ? decimal.Zero : row.Field<decimal>("dnbimaxcredlim");
         entity.dnbiincreasecredlim = row.IsNull("dnbiincreasecredlim") ? decimal.Zero : row.Field<decimal>("dnbiincreasecredlim");
         entity.dnbireviewperiod = row.IsNull("dnbireviewperiod") ? 0 : row.Field<int>("dnbireviewperiod");
         entity.dnbioecreditcheckfl = row.Field<bool>("dnbioecreditcheckfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.multitenantfl = row.Field<bool>("multitenantfl");
         entity.cloudedition = row.Field<bool>("cloudedition");
         entity.taxHostedInterface = row.Field<bool>("TaxHostedInterface");
         entity.taxHostedSecurityKey = row.IsNull("TaxHostedSecurityKey") ? string.Empty : row.Field<string>("TaxHostedSecurityKey");
         entity.iSMPrint = row.Field<bool>("ISMPrint");
         entity.iSMNonImpactProduct = row.IsNull("ISMNonImpactProduct") ? string.Empty : row.Field<string>("ISMNonImpactProduct");
         entity.iSMLive = row.Field<bool>("ISMLive");
         entity.iSMApiUrl = row.IsNull("ISMApiUrl") ? string.Empty : row.Field<string>("ISMApiUrl");
         entity.iSMApiUserName = row.IsNull("ISMApiUserName") ? string.Empty : row.Field<string>("ISMApiUserName");
         entity.iSMApiPassWord = row.IsNull("ISMApiPassWord") ? string.Empty : row.Field<string>("ISMApiPassWord");
         entity.iSMApiConfigName = row.IsNull("ISMApiConfigName") ? string.Empty : row.Field<string>("ISMApiConfigName");
         entity.allowRental = row.Field<bool>("AllowRental");
         entity.automaticallyPurgeIORecord = row.Field<bool>("AutomaticallyPurgeIORecord");
         entity.outboundProcessing = row.Field<bool>("OutboundProcessing");
         entity.outboundProcessingThreads = row.IsNull("OutboundProcessingThreads") ? 0 : row.Field<int>("OutboundProcessingThreads");
         entity.inboundOperator = row.IsNull("InboundOperator") ? string.Empty : row.Field<string>("InboundOperator");
         entity.surchargeAddon = row.IsNull("SurchargeAddon") ? 0 : row.Field<int>("SurchargeAddon");
         entity.discountAddon = row.IsNull("DiscountAddon") ? 0 : row.Field<int>("DiscountAddon");
         entity.waiverAddon = row.IsNull("WaiverAddon") ? 0 : row.Field<int>("WaiverAddon");
         entity.lostBusiness = row.IsNull("LostBusiness") ? string.Empty : row.Field<string>("LostBusiness");
         entity.iONEDI810InLive = row.Field<bool>("IONEDI810InLive");
         entity.iONEDI849InLive = row.Field<bool>("IONEDI849InLive");
         entity.iONEDI855InLive = row.Field<bool>("IONEDI855InLive");
         entity.iONEDI856InLive = row.Field<bool>("IONEDI856InLive");
         entity.laborReturnReason = row.IsNull("LaborReturnReason") ? string.Empty : row.Field<string>("LaborReturnReason");
         entity.miscReturnReason = row.IsNull("MiscReturnReason") ? string.Empty : row.Field<string>("MiscReturnReason");
         entity.iSMLogicalID = row.IsNull("ISMLogicalID") ? string.Empty : row.Field<string>("ISMLogicalID");
         entity.freightAddon = row.IsNull("FreightAddon") ? 0 : row.Field<int>("FreightAddon");
         entity.miscAddon = row.IsNull("MiscAddon") ? 0 : row.Field<int>("MiscAddon");
         entity.logicalID = row.IsNull("LogicalID") ? string.Empty : row.Field<string>("LogicalID");
         entity.locallyMexicoFl = row.Field<bool>("locallyMexicoFl");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAointegrations(ref DataRow row, Aointegrations entity)
      {
         row.SetField("ServiceURL", entity.serviceURL);
         row.SetField("ApplicationID", entity.applicationID);
         row.SetField("InstanceID", entity.instanceID);
         row.SetField("NamespaceID", entity.namespaceID);
         row.SetField("ProfileID", entity.profileID);
         row.SetField("ApiKey", entity.apiKey);
         row.SetField("TaxApplicationID", entity.taxApplicationID);
         row.SetField("TaxServiceURL", entity.taxServiceURL);
         row.SetField("TaxAdminName", entity.taxAdminName);
         row.SetField("TaxAdminPassword", entity.taxAdminPassword);
         row.SetField("TaxAppVersion", entity.taxAppVersion);
         row.SetField("CertApplicationID", entity.certApplicationID);
         row.SetField("CertAdminName", entity.certAdminName);
         row.SetField("CertAdminPassword", entity.certAdminPassword);
         row.SetField("CertConnection", entity.certConnection);
         row.SetField("CertService", entity.certService);
         row.SetField("CertContent", entity.certContent);
         row.SetField("AddrServiceURL", entity.addrServiceURL);
         row.SetField("AddrAcctId", entity.addrAcctId);
         row.SetField("AddrAcctPswrd", entity.addrAcctPswrd);
         row.SetField("FinIntegrationTy", entity.finIntegrationTy);
         row.SetField("FinIntTyWarning1", entity.finIntTyWarning1);
         row.SetField("FinIntTyWarning2", entity.finIntTyWarning2);
         row.SetField("FinIntTyWarning3", entity.finIntTyWarning3);
         row.SetField("FinIntTyWarning4", entity.finIntTyWarning4);
         row.SetField("FinIntTyWarning5", entity.finIntTyWarning5);
         row.SetField("FinIntTyWarning6", entity.finIntTyWarning6);
         row.SetField("FinIntTyWarning7", entity.finIntTyWarning7);
         row.SetField("FinIntTyWarning8", entity.finIntTyWarning8);
         row.SetField("FinIntTyWarning9", entity.finIntTyWarning9);
         row.SetField("ionactivateshipto", entity.ionactivateshipto);
         row.SetField("currproc", entity.currproc);
         row.SetField("FTPProcess", entity.fTPProcess);
         row.SetField("SIGProcess", entity.sIGProcess);
         row.SetField("Printer", entity.printer);
         row.SetField("FAXPrinter", entity.fAXPrinter);
         row.SetField("FTPAddress", entity.fTPAddress);
         row.SetField("FTPUser", entity.fTPUser);
         row.SetField("FTPPassword", entity.fTPPassword);
         row.SetField("FTPEmail", entity.fTPEmail);
         row.SetField("FTPRemDir", entity.fTPRemDir);
         row.SetField("FTPLogFile", entity.fTPLogFile);
         row.SetField("FilePrefix", entity.filePrefix);
         row.SetField("LockBox", entity.lockBox);
         row.SetField("PayDir", entity.payDir);
         row.SetField("EDIfl", entity.eDIfl);
         row.SetField("dnbiinterfacefl", entity.dnbiinterfacefl);
         row.SetField("dnbihostname", entity.dnbihostname);
         row.SetField("dnbiportnumber", entity.dnbiportnumber);
         row.SetField("dnbiresourcename", entity.dnbiresourcename);
         row.SetField("dnbidefaultcredlim", entity.dnbidefaultcredlim);
         row.SetField("dnbimaxcredlim", entity.dnbimaxcredlim);
         row.SetField("dnbiincreasecredlim", entity.dnbiincreasecredlim);
         row.SetField("dnbireviewperiod", entity.dnbireviewperiod);
         row.SetField("dnbioecreditcheckfl", entity.dnbioecreditcheckfl);
         row.SetField("userfield", entity.userfield);
         row.SetField("multitenantfl", entity.multitenantfl);
         row.SetField("cloudedition", entity.cloudedition);
         row.SetField("TaxHostedInterface", entity.taxHostedInterface);
         row.SetField("TaxHostedSecurityKey", entity.taxHostedSecurityKey);
         row.SetField("ISMPrint", entity.iSMPrint);
         row.SetField("ISMNonImpactProduct", entity.iSMNonImpactProduct);
         row.SetField("ISMLive", entity.iSMLive);
         row.SetField("ISMApiUrl", entity.iSMApiUrl);
         row.SetField("ISMApiUserName", entity.iSMApiUserName);
         row.SetField("ISMApiPassWord", entity.iSMApiPassWord);
         row.SetField("ISMApiConfigName", entity.iSMApiConfigName);
         row.SetField("AllowRental", entity.allowRental);
         row.SetField("AutomaticallyPurgeIORecord", entity.automaticallyPurgeIORecord);
         row.SetField("OutboundProcessing", entity.outboundProcessing);
         row.SetField("OutboundProcessingThreads", entity.outboundProcessingThreads);
         row.SetField("InboundOperator", entity.inboundOperator);
         row.SetField("SurchargeAddon", entity.surchargeAddon);
         row.SetField("DiscountAddon", entity.discountAddon);
         row.SetField("WaiverAddon", entity.waiverAddon);
         row.SetField("LostBusiness", entity.lostBusiness);
         row.SetField("IONEDI810InLive", entity.iONEDI810InLive);
         row.SetField("IONEDI849InLive", entity.iONEDI849InLive);
         row.SetField("IONEDI855InLive", entity.iONEDI855InLive);
         row.SetField("IONEDI856InLive", entity.iONEDI856InLive);
         row.SetField("LaborReturnReason", entity.laborReturnReason);
         row.SetField("MiscReturnReason", entity.miscReturnReason);
         row.SetField("ISMLogicalID", entity.iSMLogicalID);
         row.SetField("FreightAddon", entity.freightAddon);
         row.SetField("MiscAddon", entity.miscAddon);
         row.SetField("LogicalID", entity.logicalID);
         row.SetField("locallyMexicoFl", entity.locallyMexicoFl);

      }
   
   }
}
#pragma warning restore 1591
