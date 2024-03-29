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

namespace Infor.Sxe.Shared.Data.Models.Pdsaosystem
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaosystem.Aosystem")]
   public partial class Aosystem : ModelBase
   {
      public int cono { get; set; }
      public bool oASActivitiesFl { get; set; }
      public bool cmupdarfl { get; set; }
      public bool disableWildCardFilters { get; set; }
      public bool lookupwildfl { get; set; }
      public int maxRecordCount { get; set; }
      public bool iccommcatfl { get; set; }
      public bool iccommcaticscfl { get; set; }
      public bool iccommcaticscflSensitive { get; set; }
      [StringValidationAttribute]
      public string url { get; set; }
      public bool syncmddarscfl { get; set; }
      public bool syncmddoeehfl { get; set; }
      public bool syncmddicspfl { get; set; }
      public bool syncmddarssfl { get; set; }
      public bool syncmddicscfl { get; set; }
      public bool syncmddcontactsfl { get; set; }
      [StringValidationAttribute]
      public string phonemask { get; set; }
      public bool lpdf { get; set; }
      public bool llandscape { get; set; }
      public bool lbold { get; set; }
      public bool lpdfHold { get; set; }
      public bool llandscapeHold { get; set; }
      public bool lboldHold { get; set; }
      public bool mIMEEmail { get; set; }
      [StringValidationAttribute]
      public string securityLogDir { get; set; }
      [StringValidationAttribute]
      public string xMLEmailCommand { get; set; }
      [StringValidationAttribute]
      public string userlabel1 { get; set; }
      [StringValidationAttribute]
      public string userlabel2 { get; set; }
      [StringValidationAttribute]
      public string userlabel3 { get; set; }
      [StringValidationAttribute]
      public string userlabel4 { get; set; }
      [StringValidationAttribute]
      public string userlabel5 { get; set; }
      [StringValidationAttribute]
      public string userlabel6 { get; set; }
      [StringValidationAttribute]
      public string userlabel7 { get; set; }
      [StringValidationAttribute]
      public string userlabel8 { get; set; }
      [StringValidationAttribute]
      public string userlabel9 { get; set; }
      public bool userinuse1 { get; set; }
      public bool userinuse2 { get; set; }
      public bool userinuse3 { get; set; }
      public bool userinuse4 { get; set; }
      public bool userinuse5 { get; set; }
      public bool userinuse6 { get; set; }
      public bool userinuse7 { get; set; }
      public bool userinuse8 { get; set; }
      public bool userinuse9 { get; set; }
      [StringValidationAttribute]
      public string usercando1 { get; set; }
      [StringValidationAttribute]
      public string usercando2 { get; set; }
      [StringValidationAttribute]
      public string usercando3 { get; set; }
      [StringValidationAttribute]
      public string usercando4 { get; set; }
      [StringValidationAttribute]
      public string usercando5 { get; set; }
      [StringValidationAttribute]
      public string usercando6 { get; set; }
      [StringValidationAttribute]
      public string usercando7 { get; set; }
      [StringValidationAttribute]
      public string usercando8 { get; set; }
      [StringValidationAttribute]
      public string usercando9 { get; set; }
      [StringValidationAttribute]
      public string userhelp1 { get; set; }
      [StringValidationAttribute]
      public string userhelp2 { get; set; }
      [StringValidationAttribute]
      public string userhelp3 { get; set; }
      [StringValidationAttribute]
      public string userhelp4 { get; set; }
      [StringValidationAttribute]
      public string userhelp5 { get; set; }
      [StringValidationAttribute]
      public string userhelp6 { get; set; }
      [StringValidationAttribute]
      public string userhelp7 { get; set; }
      [StringValidationAttribute]
      public string userhelp8 { get; set; }
      [StringValidationAttribute]
      public string userhelp9 { get; set; }
      public int usermin1 { get; set; }
      public int usermin2 { get; set; }
      public int usermin3 { get; set; }
      public int usermin4 { get; set; }
      public int usermin5 { get; set; }
      public int usermin6 { get; set; }
      public int usermin7 { get; set; }
      public int usermin8 { get; set; }
      public int usermin9 { get; set; }
      public int usermax1 { get; set; }
      public int usermax2 { get; set; }
      public int usermax3 { get; set; }
      public int usermax4 { get; set; }
      public int usermax5 { get; set; }
      public int usermax6 { get; set; }
      public int usermax7 { get; set; }
      public int usermax8 { get; set; }
      public int usermax9 { get; set; }
      public DateTime? userdatemin1 { get; set; }
      public DateTime? userdatemin2 { get; set; }
      public DateTime? userdatemin3 { get; set; }
      public DateTime? userdatemin4 { get; set; }
      public DateTime? userdatemin5 { get; set; }
      public DateTime? userdatemin6 { get; set; }
      public DateTime? userdatemin7 { get; set; }
      public DateTime? userdatemin8 { get; set; }
      public DateTime? userdatemin9 { get; set; }
      public DateTime? userdatemax1 { get; set; }
      public DateTime? userdatemax2 { get; set; }
      public DateTime? userdatemax3 { get; set; }
      public DateTime? userdatemax4 { get; set; }
      public DateTime? userdatemax5 { get; set; }
      public DateTime? userdatemax6 { get; set; }
      public DateTime? userdatemax7 { get; set; }
      public DateTime? userdatemax8 { get; set; }
      public DateTime? userdatemax9 { get; set; }
      public int pwmaxdays { get; set; }
      public int pwmindays { get; set; }
      public DateTime? pwLastChgDt { get; set; }
      public int pwmaxlength { get; set; }
      public int pwminlength { get; set; }
      public int pwminalpha { get; set; }
      public int pwminnumeric { get; set; }
      public int pwminspecial { get; set; }
      public int pwminprev { get; set; }
      public int pwmaxattempt { get; set; }
      public bool activefl { get; set; }
      public bool activeflSensitive { get; set; }
      public int maxsysjobs1 { get; set; }
      public int maxsysjobs2 { get; set; }
      public int maxsysjobs3 { get; set; }
      public int maxsysjobs4 { get; set; }
      public int maxsysjobs5 { get; set; }
      public int maxsysjobs6 { get; set; }
      public int maxsysjobs7 { get; set; }
      public int maxsysjobs8 { get; set; }
      public int maxsysjobs9 { get; set; }
      public int maxsysjobs10 { get; set; }
      public int maxsysjobs11 { get; set; }
      public int maxsysjobs12 { get; set; }
      public int maxsysjobs13 { get; set; }
      public int maxsysjobs14 { get; set; }
      public int maxsysjobs15 { get; set; }
      public int maxsysjobs16 { get; set; }
      public int maxsysjobs17 { get; set; }
      public int maxsysjobs18 { get; set; }
      public int maxsysjobs19 { get; set; }
      public int maxsysjobs20 { get; set; }
      public int maxsysjobs21 { get; set; }
      public int maxsysjobs22 { get; set; }
      public int maxsysjobs23 { get; set; }
      public int maxsysjobs24 { get; set; }
      public int interval { get; set; }
      [StringValidationAttribute]
      public string rsoper { get; set; }
      [StringValidationAttribute]
      public string rspasswd { get; set; }
      public bool rspasswdSensitive { get; set; }
      [StringValidationAttribute]
      public string rspasswdOld { get; set; }
      public int rsminutes { get; set; }
      public int rsseconds { get; set; }
      [StringValidationAttribute]
      public string auditdeltadir { get; set; }
      [StringValidationAttribute]
      public string auditgeneratedir { get; set; }
      public bool lSasaRS { get; set; }
      public bool prodAutoCompFl { get; set; }
      [StringValidationAttribute]
      public string sysadminuser { get; set; }
      public bool dropboxinterfacefl { get; set; }
      public bool lDSTEnableFl { get; set; }
      public bool lIDMEmailFl { get; set; }
      public bool lIDMFileFl { get; set; }
      public bool lIDMCopySaveFl { get; set; }
      [StringValidationAttribute]
      public string genIDMEmailAddr { get; set; }
      [StringValidationAttribute]
      public string genIDMEmailName { get; set; }
      [StringValidationAttribute]
      public string sascRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      public bool sAAllowExpandedNameAddress { get; set; }


      public static Aosystem BuildAosystemFromRow(DataRow row)
      {
         Aosystem entity = new Aosystem();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.oASActivitiesFl = row.Field<bool>("OASActivitiesFl");
         entity.cmupdarfl = row.Field<bool>("cmupdarfl");
         entity.disableWildCardFilters = row.Field<bool>("DisableWildCardFilters");
         entity.lookupwildfl = row.Field<bool>("lookupwildfl");
         entity.maxRecordCount = row.IsNull("MaxRecordCount") ? 0 : row.Field<int>("MaxRecordCount");
         entity.iccommcatfl = row.Field<bool>("iccommcatfl");
         entity.iccommcaticscfl = row.Field<bool>("iccommcaticscfl");
         entity.iccommcaticscflSensitive = row.Field<bool>("iccommcaticscfl-sensitive");
         entity.url = row.IsNull("url") ? string.Empty : row.Field<string>("url");
         entity.syncmddarscfl = row.Field<bool>("syncmddarscfl");
         entity.syncmddoeehfl = row.Field<bool>("syncmddoeehfl");
         entity.syncmddicspfl = row.Field<bool>("syncmddicspfl");
         entity.syncmddarssfl = row.Field<bool>("syncmddarssfl");
         entity.syncmddicscfl = row.Field<bool>("syncmddicscfl");
         entity.syncmddcontactsfl = row.Field<bool>("syncmddcontactsfl");
         entity.phonemask = row.IsNull("phonemask") ? string.Empty : row.Field<string>("phonemask");
         entity.lpdf = row.Field<bool>("lpdf");
         entity.llandscape = row.Field<bool>("llandscape");
         entity.lbold = row.Field<bool>("lbold");
         entity.lpdfHold = row.Field<bool>("lpdf-hold");
         entity.llandscapeHold = row.Field<bool>("llandscape-hold");
         entity.lboldHold = row.Field<bool>("lbold-hold");
         entity.mIMEEmail = row.Field<bool>("MIMEEmail");
         entity.securityLogDir = row.IsNull("SecurityLogDir") ? string.Empty : row.Field<string>("SecurityLogDir");
         entity.xMLEmailCommand = row.IsNull("XMLEmailCommand") ? string.Empty : row.Field<string>("XMLEmailCommand");
         entity.userlabel1 = row.IsNull("userlabel1") ? string.Empty : row.Field<string>("userlabel1");
         entity.userlabel2 = row.IsNull("userlabel2") ? string.Empty : row.Field<string>("userlabel2");
         entity.userlabel3 = row.IsNull("userlabel3") ? string.Empty : row.Field<string>("userlabel3");
         entity.userlabel4 = row.IsNull("userlabel4") ? string.Empty : row.Field<string>("userlabel4");
         entity.userlabel5 = row.IsNull("userlabel5") ? string.Empty : row.Field<string>("userlabel5");
         entity.userlabel6 = row.IsNull("userlabel6") ? string.Empty : row.Field<string>("userlabel6");
         entity.userlabel7 = row.IsNull("userlabel7") ? string.Empty : row.Field<string>("userlabel7");
         entity.userlabel8 = row.IsNull("userlabel8") ? string.Empty : row.Field<string>("userlabel8");
         entity.userlabel9 = row.IsNull("userlabel9") ? string.Empty : row.Field<string>("userlabel9");
         entity.userinuse1 = row.Field<bool>("userinuse1");
         entity.userinuse2 = row.Field<bool>("userinuse2");
         entity.userinuse3 = row.Field<bool>("userinuse3");
         entity.userinuse4 = row.Field<bool>("userinuse4");
         entity.userinuse5 = row.Field<bool>("userinuse5");
         entity.userinuse6 = row.Field<bool>("userinuse6");
         entity.userinuse7 = row.Field<bool>("userinuse7");
         entity.userinuse8 = row.Field<bool>("userinuse8");
         entity.userinuse9 = row.Field<bool>("userinuse9");
         entity.usercando1 = row.IsNull("usercando1") ? string.Empty : row.Field<string>("usercando1");
         entity.usercando2 = row.IsNull("usercando2") ? string.Empty : row.Field<string>("usercando2");
         entity.usercando3 = row.IsNull("usercando3") ? string.Empty : row.Field<string>("usercando3");
         entity.usercando4 = row.IsNull("usercando4") ? string.Empty : row.Field<string>("usercando4");
         entity.usercando5 = row.IsNull("usercando5") ? string.Empty : row.Field<string>("usercando5");
         entity.usercando6 = row.IsNull("usercando6") ? string.Empty : row.Field<string>("usercando6");
         entity.usercando7 = row.IsNull("usercando7") ? string.Empty : row.Field<string>("usercando7");
         entity.usercando8 = row.IsNull("usercando8") ? string.Empty : row.Field<string>("usercando8");
         entity.usercando9 = row.IsNull("usercando9") ? string.Empty : row.Field<string>("usercando9");
         entity.userhelp1 = row.IsNull("userhelp1") ? string.Empty : row.Field<string>("userhelp1");
         entity.userhelp2 = row.IsNull("userhelp2") ? string.Empty : row.Field<string>("userhelp2");
         entity.userhelp3 = row.IsNull("userhelp3") ? string.Empty : row.Field<string>("userhelp3");
         entity.userhelp4 = row.IsNull("userhelp4") ? string.Empty : row.Field<string>("userhelp4");
         entity.userhelp5 = row.IsNull("userhelp5") ? string.Empty : row.Field<string>("userhelp5");
         entity.userhelp6 = row.IsNull("userhelp6") ? string.Empty : row.Field<string>("userhelp6");
         entity.userhelp7 = row.IsNull("userhelp7") ? string.Empty : row.Field<string>("userhelp7");
         entity.userhelp8 = row.IsNull("userhelp8") ? string.Empty : row.Field<string>("userhelp8");
         entity.userhelp9 = row.IsNull("userhelp9") ? string.Empty : row.Field<string>("userhelp9");
         entity.usermin1 = row.IsNull("usermin1") ? 0 : row.Field<int>("usermin1");
         entity.usermin2 = row.IsNull("usermin2") ? 0 : row.Field<int>("usermin2");
         entity.usermin3 = row.IsNull("usermin3") ? 0 : row.Field<int>("usermin3");
         entity.usermin4 = row.IsNull("usermin4") ? 0 : row.Field<int>("usermin4");
         entity.usermin5 = row.IsNull("usermin5") ? 0 : row.Field<int>("usermin5");
         entity.usermin6 = row.IsNull("usermin6") ? 0 : row.Field<int>("usermin6");
         entity.usermin7 = row.IsNull("usermin7") ? 0 : row.Field<int>("usermin7");
         entity.usermin8 = row.IsNull("usermin8") ? 0 : row.Field<int>("usermin8");
         entity.usermin9 = row.IsNull("usermin9") ? 0 : row.Field<int>("usermin9");
         entity.usermax1 = row.IsNull("usermax1") ? 0 : row.Field<int>("usermax1");
         entity.usermax2 = row.IsNull("usermax2") ? 0 : row.Field<int>("usermax2");
         entity.usermax3 = row.IsNull("usermax3") ? 0 : row.Field<int>("usermax3");
         entity.usermax4 = row.IsNull("usermax4") ? 0 : row.Field<int>("usermax4");
         entity.usermax5 = row.IsNull("usermax5") ? 0 : row.Field<int>("usermax5");
         entity.usermax6 = row.IsNull("usermax6") ? 0 : row.Field<int>("usermax6");
         entity.usermax7 = row.IsNull("usermax7") ? 0 : row.Field<int>("usermax7");
         entity.usermax8 = row.IsNull("usermax8") ? 0 : row.Field<int>("usermax8");
         entity.usermax9 = row.IsNull("usermax9") ? 0 : row.Field<int>("usermax9");
         entity.userdatemin1 = row.Field<DateTime?>("userdatemin1");
         entity.userdatemin2 = row.Field<DateTime?>("userdatemin2");
         entity.userdatemin3 = row.Field<DateTime?>("userdatemin3");
         entity.userdatemin4 = row.Field<DateTime?>("userdatemin4");
         entity.userdatemin5 = row.Field<DateTime?>("userdatemin5");
         entity.userdatemin6 = row.Field<DateTime?>("userdatemin6");
         entity.userdatemin7 = row.Field<DateTime?>("userdatemin7");
         entity.userdatemin8 = row.Field<DateTime?>("userdatemin8");
         entity.userdatemin9 = row.Field<DateTime?>("userdatemin9");
         entity.userdatemax1 = row.Field<DateTime?>("userdatemax1");
         entity.userdatemax2 = row.Field<DateTime?>("userdatemax2");
         entity.userdatemax3 = row.Field<DateTime?>("userdatemax3");
         entity.userdatemax4 = row.Field<DateTime?>("userdatemax4");
         entity.userdatemax5 = row.Field<DateTime?>("userdatemax5");
         entity.userdatemax6 = row.Field<DateTime?>("userdatemax6");
         entity.userdatemax7 = row.Field<DateTime?>("userdatemax7");
         entity.userdatemax8 = row.Field<DateTime?>("userdatemax8");
         entity.userdatemax9 = row.Field<DateTime?>("userdatemax9");
         entity.pwmaxdays = row.IsNull("pwmaxdays") ? 0 : row.Field<int>("pwmaxdays");
         entity.pwmindays = row.IsNull("pwmindays") ? 0 : row.Field<int>("pwmindays");
         entity.pwLastChgDt = row.Field<DateTime?>("PwLastChgDt");
         entity.pwmaxlength = row.IsNull("pwmaxlength") ? 0 : row.Field<int>("pwmaxlength");
         entity.pwminlength = row.IsNull("pwminlength") ? 0 : row.Field<int>("pwminlength");
         entity.pwminalpha = row.IsNull("pwminalpha") ? 0 : row.Field<int>("pwminalpha");
         entity.pwminnumeric = row.IsNull("pwminnumeric") ? 0 : row.Field<int>("pwminnumeric");
         entity.pwminspecial = row.IsNull("pwminspecial") ? 0 : row.Field<int>("pwminspecial");
         entity.pwminprev = row.IsNull("pwminprev") ? 0 : row.Field<int>("pwminprev");
         entity.pwmaxattempt = row.IsNull("pwmaxattempt") ? 0 : row.Field<int>("pwmaxattempt");
         entity.activefl = row.Field<bool>("activefl");
         entity.activeflSensitive = row.Field<bool>("activefl-sensitive");
         entity.maxsysjobs1 = row.IsNull("maxsysjobs1") ? 0 : row.Field<int>("maxsysjobs1");
         entity.maxsysjobs2 = row.IsNull("maxsysjobs2") ? 0 : row.Field<int>("maxsysjobs2");
         entity.maxsysjobs3 = row.IsNull("maxsysjobs3") ? 0 : row.Field<int>("maxsysjobs3");
         entity.maxsysjobs4 = row.IsNull("maxsysjobs4") ? 0 : row.Field<int>("maxsysjobs4");
         entity.maxsysjobs5 = row.IsNull("maxsysjobs5") ? 0 : row.Field<int>("maxsysjobs5");
         entity.maxsysjobs6 = row.IsNull("maxsysjobs6") ? 0 : row.Field<int>("maxsysjobs6");
         entity.maxsysjobs7 = row.IsNull("maxsysjobs7") ? 0 : row.Field<int>("maxsysjobs7");
         entity.maxsysjobs8 = row.IsNull("maxsysjobs8") ? 0 : row.Field<int>("maxsysjobs8");
         entity.maxsysjobs9 = row.IsNull("maxsysjobs9") ? 0 : row.Field<int>("maxsysjobs9");
         entity.maxsysjobs10 = row.IsNull("maxsysjobs10") ? 0 : row.Field<int>("maxsysjobs10");
         entity.maxsysjobs11 = row.IsNull("maxsysjobs11") ? 0 : row.Field<int>("maxsysjobs11");
         entity.maxsysjobs12 = row.IsNull("maxsysjobs12") ? 0 : row.Field<int>("maxsysjobs12");
         entity.maxsysjobs13 = row.IsNull("maxsysjobs13") ? 0 : row.Field<int>("maxsysjobs13");
         entity.maxsysjobs14 = row.IsNull("maxsysjobs14") ? 0 : row.Field<int>("maxsysjobs14");
         entity.maxsysjobs15 = row.IsNull("maxsysjobs15") ? 0 : row.Field<int>("maxsysjobs15");
         entity.maxsysjobs16 = row.IsNull("maxsysjobs16") ? 0 : row.Field<int>("maxsysjobs16");
         entity.maxsysjobs17 = row.IsNull("maxsysjobs17") ? 0 : row.Field<int>("maxsysjobs17");
         entity.maxsysjobs18 = row.IsNull("maxsysjobs18") ? 0 : row.Field<int>("maxsysjobs18");
         entity.maxsysjobs19 = row.IsNull("maxsysjobs19") ? 0 : row.Field<int>("maxsysjobs19");
         entity.maxsysjobs20 = row.IsNull("maxsysjobs20") ? 0 : row.Field<int>("maxsysjobs20");
         entity.maxsysjobs21 = row.IsNull("maxsysjobs21") ? 0 : row.Field<int>("maxsysjobs21");
         entity.maxsysjobs22 = row.IsNull("maxsysjobs22") ? 0 : row.Field<int>("maxsysjobs22");
         entity.maxsysjobs23 = row.IsNull("maxsysjobs23") ? 0 : row.Field<int>("maxsysjobs23");
         entity.maxsysjobs24 = row.IsNull("maxsysjobs24") ? 0 : row.Field<int>("maxsysjobs24");
         entity.interval = row.IsNull("interval") ? 0 : row.Field<int>("interval");
         entity.rsoper = row.IsNull("rsoper") ? string.Empty : row.Field<string>("rsoper");
         entity.rspasswd = row.IsNull("rspasswd") ? string.Empty : row.Field<string>("rspasswd");
         entity.rspasswdSensitive = row.Field<bool>("rspasswd-sensitive");
         entity.rspasswdOld = row.IsNull("rspasswd-old") ? string.Empty : row.Field<string>("rspasswd-old");
         entity.rsminutes = row.IsNull("rsminutes") ? 0 : row.Field<int>("rsminutes");
         entity.rsseconds = row.IsNull("rsseconds") ? 0 : row.Field<int>("rsseconds");
         entity.auditdeltadir = row.IsNull("auditdeltadir") ? string.Empty : row.Field<string>("auditdeltadir");
         entity.auditgeneratedir = row.IsNull("auditgeneratedir") ? string.Empty : row.Field<string>("auditgeneratedir");
         entity.lSasaRS = row.Field<bool>("lSasaRS");
         entity.prodAutoCompFl = row.Field<bool>("ProdAutoCompFl");
         entity.sysadminuser = row.IsNull("sysadminuser") ? string.Empty : row.Field<string>("sysadminuser");
         entity.dropboxinterfacefl = row.Field<bool>("dropboxinterfacefl");
         entity.lDSTEnableFl = row.Field<bool>("lDSTEnableFl");
         entity.lIDMEmailFl = row.Field<bool>("lIDMEmailFl");
         entity.lIDMFileFl = row.Field<bool>("lIDMFileFl");
         entity.lIDMCopySaveFl = row.Field<bool>("lIDMCopySaveFl");
         entity.genIDMEmailAddr = row.IsNull("GenIDMEmailAddr") ? string.Empty : row.Field<string>("GenIDMEmailAddr");
         entity.genIDMEmailName = row.IsNull("GenIDMEmailName") ? string.Empty : row.Field<string>("GenIDMEmailName");
         entity.sascRowid = row.Field<byte[]>("sasc-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.sAAllowExpandedNameAddress = row.Field<bool>("SAAllowExpandedNameAddress");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAosystem(ref DataRow row, Aosystem entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("OASActivitiesFl", entity.oASActivitiesFl);
         row.SetField("cmupdarfl", entity.cmupdarfl);
         row.SetField("DisableWildCardFilters", entity.disableWildCardFilters);
         row.SetField("lookupwildfl", entity.lookupwildfl);
         row.SetField("MaxRecordCount", entity.maxRecordCount);
         row.SetField("iccommcatfl", entity.iccommcatfl);
         row.SetField("iccommcaticscfl", entity.iccommcaticscfl);
         row.SetField("iccommcaticscfl-sensitive", entity.iccommcaticscflSensitive);
         row.SetField("url", entity.url);
         row.SetField("syncmddarscfl", entity.syncmddarscfl);
         row.SetField("syncmddoeehfl", entity.syncmddoeehfl);
         row.SetField("syncmddicspfl", entity.syncmddicspfl);
         row.SetField("syncmddarssfl", entity.syncmddarssfl);
         row.SetField("syncmddicscfl", entity.syncmddicscfl);
         row.SetField("syncmddcontactsfl", entity.syncmddcontactsfl);
         row.SetField("phonemask", entity.phonemask);
         row.SetField("lpdf", entity.lpdf);
         row.SetField("llandscape", entity.llandscape);
         row.SetField("lbold", entity.lbold);
         row.SetField("lpdf-hold", entity.lpdfHold);
         row.SetField("llandscape-hold", entity.llandscapeHold);
         row.SetField("lbold-hold", entity.lboldHold);
         row.SetField("MIMEEmail", entity.mIMEEmail);
         row.SetField("SecurityLogDir", entity.securityLogDir);
         row.SetField("XMLEmailCommand", entity.xMLEmailCommand);
         row.SetField("userlabel1", entity.userlabel1);
         row.SetField("userlabel2", entity.userlabel2);
         row.SetField("userlabel3", entity.userlabel3);
         row.SetField("userlabel4", entity.userlabel4);
         row.SetField("userlabel5", entity.userlabel5);
         row.SetField("userlabel6", entity.userlabel6);
         row.SetField("userlabel7", entity.userlabel7);
         row.SetField("userlabel8", entity.userlabel8);
         row.SetField("userlabel9", entity.userlabel9);
         row.SetField("userinuse1", entity.userinuse1);
         row.SetField("userinuse2", entity.userinuse2);
         row.SetField("userinuse3", entity.userinuse3);
         row.SetField("userinuse4", entity.userinuse4);
         row.SetField("userinuse5", entity.userinuse5);
         row.SetField("userinuse6", entity.userinuse6);
         row.SetField("userinuse7", entity.userinuse7);
         row.SetField("userinuse8", entity.userinuse8);
         row.SetField("userinuse9", entity.userinuse9);
         row.SetField("usercando1", entity.usercando1);
         row.SetField("usercando2", entity.usercando2);
         row.SetField("usercando3", entity.usercando3);
         row.SetField("usercando4", entity.usercando4);
         row.SetField("usercando5", entity.usercando5);
         row.SetField("usercando6", entity.usercando6);
         row.SetField("usercando7", entity.usercando7);
         row.SetField("usercando8", entity.usercando8);
         row.SetField("usercando9", entity.usercando9);
         row.SetField("userhelp1", entity.userhelp1);
         row.SetField("userhelp2", entity.userhelp2);
         row.SetField("userhelp3", entity.userhelp3);
         row.SetField("userhelp4", entity.userhelp4);
         row.SetField("userhelp5", entity.userhelp5);
         row.SetField("userhelp6", entity.userhelp6);
         row.SetField("userhelp7", entity.userhelp7);
         row.SetField("userhelp8", entity.userhelp8);
         row.SetField("userhelp9", entity.userhelp9);
         row.SetField("usermin1", entity.usermin1);
         row.SetField("usermin2", entity.usermin2);
         row.SetField("usermin3", entity.usermin3);
         row.SetField("usermin4", entity.usermin4);
         row.SetField("usermin5", entity.usermin5);
         row.SetField("usermin6", entity.usermin6);
         row.SetField("usermin7", entity.usermin7);
         row.SetField("usermin8", entity.usermin8);
         row.SetField("usermin9", entity.usermin9);
         row.SetField("usermax1", entity.usermax1);
         row.SetField("usermax2", entity.usermax2);
         row.SetField("usermax3", entity.usermax3);
         row.SetField("usermax4", entity.usermax4);
         row.SetField("usermax5", entity.usermax5);
         row.SetField("usermax6", entity.usermax6);
         row.SetField("usermax7", entity.usermax7);
         row.SetField("usermax8", entity.usermax8);
         row.SetField("usermax9", entity.usermax9);
         row.SetField("userdatemin1", entity.userdatemin1);
         row.SetField("userdatemin2", entity.userdatemin2);
         row.SetField("userdatemin3", entity.userdatemin3);
         row.SetField("userdatemin4", entity.userdatemin4);
         row.SetField("userdatemin5", entity.userdatemin5);
         row.SetField("userdatemin6", entity.userdatemin6);
         row.SetField("userdatemin7", entity.userdatemin7);
         row.SetField("userdatemin8", entity.userdatemin8);
         row.SetField("userdatemin9", entity.userdatemin9);
         row.SetField("userdatemax1", entity.userdatemax1);
         row.SetField("userdatemax2", entity.userdatemax2);
         row.SetField("userdatemax3", entity.userdatemax3);
         row.SetField("userdatemax4", entity.userdatemax4);
         row.SetField("userdatemax5", entity.userdatemax5);
         row.SetField("userdatemax6", entity.userdatemax6);
         row.SetField("userdatemax7", entity.userdatemax7);
         row.SetField("userdatemax8", entity.userdatemax8);
         row.SetField("userdatemax9", entity.userdatemax9);
         row.SetField("pwmaxdays", entity.pwmaxdays);
         row.SetField("pwmindays", entity.pwmindays);
         row.SetField("PwLastChgDt", entity.pwLastChgDt);
         row.SetField("pwmaxlength", entity.pwmaxlength);
         row.SetField("pwminlength", entity.pwminlength);
         row.SetField("pwminalpha", entity.pwminalpha);
         row.SetField("pwminnumeric", entity.pwminnumeric);
         row.SetField("pwminspecial", entity.pwminspecial);
         row.SetField("pwminprev", entity.pwminprev);
         row.SetField("pwmaxattempt", entity.pwmaxattempt);
         row.SetField("activefl", entity.activefl);
         row.SetField("activefl-sensitive", entity.activeflSensitive);
         row.SetField("maxsysjobs1", entity.maxsysjobs1);
         row.SetField("maxsysjobs2", entity.maxsysjobs2);
         row.SetField("maxsysjobs3", entity.maxsysjobs3);
         row.SetField("maxsysjobs4", entity.maxsysjobs4);
         row.SetField("maxsysjobs5", entity.maxsysjobs5);
         row.SetField("maxsysjobs6", entity.maxsysjobs6);
         row.SetField("maxsysjobs7", entity.maxsysjobs7);
         row.SetField("maxsysjobs8", entity.maxsysjobs8);
         row.SetField("maxsysjobs9", entity.maxsysjobs9);
         row.SetField("maxsysjobs10", entity.maxsysjobs10);
         row.SetField("maxsysjobs11", entity.maxsysjobs11);
         row.SetField("maxsysjobs12", entity.maxsysjobs12);
         row.SetField("maxsysjobs13", entity.maxsysjobs13);
         row.SetField("maxsysjobs14", entity.maxsysjobs14);
         row.SetField("maxsysjobs15", entity.maxsysjobs15);
         row.SetField("maxsysjobs16", entity.maxsysjobs16);
         row.SetField("maxsysjobs17", entity.maxsysjobs17);
         row.SetField("maxsysjobs18", entity.maxsysjobs18);
         row.SetField("maxsysjobs19", entity.maxsysjobs19);
         row.SetField("maxsysjobs20", entity.maxsysjobs20);
         row.SetField("maxsysjobs21", entity.maxsysjobs21);
         row.SetField("maxsysjobs22", entity.maxsysjobs22);
         row.SetField("maxsysjobs23", entity.maxsysjobs23);
         row.SetField("maxsysjobs24", entity.maxsysjobs24);
         row.SetField("interval", entity.interval);
         row.SetField("rsoper", entity.rsoper);
         row.SetField("rspasswd", entity.rspasswd);
         row.SetField("rspasswd-sensitive", entity.rspasswdSensitive);
         row.SetField("rspasswd-old", entity.rspasswdOld);
         row.SetField("rsminutes", entity.rsminutes);
         row.SetField("rsseconds", entity.rsseconds);
         row.SetField("auditdeltadir", entity.auditdeltadir);
         row.SetField("auditgeneratedir", entity.auditgeneratedir);
         row.SetField("lSasaRS", entity.lSasaRS);
         row.SetField("ProdAutoCompFl", entity.prodAutoCompFl);
         row.SetField("sysadminuser", entity.sysadminuser);
         row.SetField("dropboxinterfacefl", entity.dropboxinterfacefl);
         row.SetField("lDSTEnableFl", entity.lDSTEnableFl);
         row.SetField("lIDMEmailFl", entity.lIDMEmailFl);
         row.SetField("lIDMFileFl", entity.lIDMFileFl);
         row.SetField("lIDMCopySaveFl", entity.lIDMCopySaveFl);
         row.SetField("GenIDMEmailAddr", entity.genIDMEmailAddr);
         row.SetField("GenIDMEmailName", entity.genIDMEmailName);
         row.SetField("sasc-rowid", entity.sascRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);
         row.SetField("SAAllowExpandedNameAddress", entity.sAAllowExpandedNameAddress);

      }
   
   }
}
#pragma warning restore 1591
