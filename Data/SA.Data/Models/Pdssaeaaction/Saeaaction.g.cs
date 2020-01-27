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

namespace Infor.Sxe.SA.Data.Models.Pdssaeaaction
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaeaaction.Saeaaction")]
   public partial class Saeaaction : ModelBase
   {
      public int actionseqno { get; set; }
      [StringValidationAttribute]
      public string actionsubjectty { get; set; }
      [StringValidationAttribute]
      public string actionsubjectval { get; set; }
      [StringValidationAttribute]
      public string actiontype { get; set; }
      [StringValidationAttribute]
      public string camactivitycd { get; set; }
      [StringValidationAttribute]
      public string cmactivitycd { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      public int cono { get; set; }
      public decimal contactid { get; set; }
      public decimal custnobeg { get; set; }
      public decimal custnoend { get; set; }
      [StringValidationAttribute]
      public string custnorangety { get; set; }
      [StringValidationAttribute]
      public string emailsubject { get; set; }
      [StringValidationAttribute]
      public string emailtext { get; set; }
      [StringValidationAttribute]
      public string eventname { get; set; }
      public DateTime? expiredt { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string prodbeg { get; set; }
      [StringValidationAttribute]
      public string prodcatbeg { get; set; }
      [StringValidationAttribute]
      public string prodcatend { get; set; }
      [StringValidationAttribute]
      public string prodcatrangety { get; set; }
      [StringValidationAttribute]
      public string prodend { get; set; }
      [StringValidationAttribute]
      public string prodrangety { get; set; }
      [StringValidationAttribute]
      public string programtorun { get; set; }
      public decimal prosno { get; set; }
      [StringValidationAttribute]
      public string regionbeg { get; set; }
      [StringValidationAttribute]
      public string regionend { get; set; }
      [StringValidationAttribute]
      public string regionrangety { get; set; }
      public int slctamountary { get; set; }
      [StringValidationAttribute]
      public string slctamountty { get; set; }
      public decimal slctamountval { get; set; }
      public int slctcharary { get; set; }
      [StringValidationAttribute]
      public string slctcharty { get; set; }
      [StringValidationAttribute]
      public string slctcharval { get; set; }
      public int slctdateary { get; set; }
      [StringValidationAttribute]
      public string slctdatety { get; set; }
      public int slctdateval { get; set; }
      public int slctpriceary { get; set; }
      [StringValidationAttribute]
      public string slctpricety { get; set; }
      public decimal slctpriceval { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transproc { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      public decimal vendnobeg { get; set; }
      public decimal vendnoend { get; set; }
      [StringValidationAttribute]
      public string vendnorangety { get; set; }
      [StringValidationAttribute]
      public string whsebeg { get; set; }
      [StringValidationAttribute]
      public string whseend { get; set; }
      [StringValidationAttribute]
      public string whserangety { get; set; }
      [StringValidationAttribute]
      public string whooper { get; set; }
      [StringValidationAttribute]
      public string whogroup { get; set; }
      [StringValidationAttribute]
      public string whoemail { get; set; }
      [StringValidationAttribute]
      public string whopos { get; set; }
      public decimal whocontact { get; set; }
      public bool custenabled { get; set; }
      public bool regenabled { get; set; }
      public bool prodenabled { get; set; }
      public bool pcatenabled { get; set; }
      public bool vendenabled { get; set; }
      public bool whseenabled { get; set; }
      public bool amtenabled { get; set; }
      public bool charenabled { get; set; }
      public bool prcenabled { get; set; }
      public bool dateenabled { get; set; }
      [StringValidationAttribute]
      public string actionrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saeaaction BuildSaeaactionFromRow(DataRow row)
      {
         Saeaaction entity = new Saeaaction();
         entity.actionseqno = row.IsNull("actionseqno") ? 0 : row.Field<int>("actionseqno");
         entity.actionsubjectty = row.IsNull("actionsubjectty") ? string.Empty : row.Field<string>("actionsubjectty");
         entity.actionsubjectval = row.IsNull("actionsubjectval") ? string.Empty : row.Field<string>("actionsubjectval");
         entity.actiontype = row.IsNull("actiontype") ? string.Empty : row.Field<string>("actiontype");
         entity.camactivitycd = row.IsNull("camactivitycd") ? string.Empty : row.Field<string>("camactivitycd");
         entity.cmactivitycd = row.IsNull("cmactivitycd") ? string.Empty : row.Field<string>("cmactivitycd");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.contactid = row.IsNull("contactid") ? decimal.Zero : row.Field<decimal>("contactid");
         entity.custnobeg = row.IsNull("custnobeg") ? decimal.Zero : row.Field<decimal>("custnobeg");
         entity.custnoend = row.IsNull("custnoend") ? decimal.Zero : row.Field<decimal>("custnoend");
         entity.custnorangety = row.IsNull("custnorangety") ? string.Empty : row.Field<string>("custnorangety");
         entity.emailsubject = row.IsNull("emailsubject") ? string.Empty : row.Field<string>("emailsubject");
         entity.emailtext = row.IsNull("emailtext") ? string.Empty : row.Field<string>("emailtext");
         entity.eventname = row.IsNull("eventname") ? string.Empty : row.Field<string>("eventname");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.prodbeg = row.IsNull("prodbeg") ? string.Empty : row.Field<string>("prodbeg");
         entity.prodcatbeg = row.IsNull("prodcatbeg") ? string.Empty : row.Field<string>("prodcatbeg");
         entity.prodcatend = row.IsNull("prodcatend") ? string.Empty : row.Field<string>("prodcatend");
         entity.prodcatrangety = row.IsNull("prodcatrangety") ? string.Empty : row.Field<string>("prodcatrangety");
         entity.prodend = row.IsNull("prodend") ? string.Empty : row.Field<string>("prodend");
         entity.prodrangety = row.IsNull("prodrangety") ? string.Empty : row.Field<string>("prodrangety");
         entity.programtorun = row.IsNull("programtorun") ? string.Empty : row.Field<string>("programtorun");
         entity.prosno = row.IsNull("prosno") ? decimal.Zero : row.Field<decimal>("prosno");
         entity.regionbeg = row.IsNull("regionbeg") ? string.Empty : row.Field<string>("regionbeg");
         entity.regionend = row.IsNull("regionend") ? string.Empty : row.Field<string>("regionend");
         entity.regionrangety = row.IsNull("regionrangety") ? string.Empty : row.Field<string>("regionrangety");
         entity.slctamountary = row.IsNull("slctamountary") ? 0 : row.Field<int>("slctamountary");
         entity.slctamountty = row.IsNull("slctamountty") ? string.Empty : row.Field<string>("slctamountty");
         entity.slctamountval = row.IsNull("slctamountval") ? decimal.Zero : row.Field<decimal>("slctamountval");
         entity.slctcharary = row.IsNull("slctcharary") ? 0 : row.Field<int>("slctcharary");
         entity.slctcharty = row.IsNull("slctcharty") ? string.Empty : row.Field<string>("slctcharty");
         entity.slctcharval = row.IsNull("slctcharval") ? string.Empty : row.Field<string>("slctcharval");
         entity.slctdateary = row.IsNull("slctdateary") ? 0 : row.Field<int>("slctdateary");
         entity.slctdatety = row.IsNull("slctdatety") ? string.Empty : row.Field<string>("slctdatety");
         entity.slctdateval = row.IsNull("slctdateval") ? 0 : row.Field<int>("slctdateval");
         entity.slctpriceary = row.IsNull("slctpriceary") ? 0 : row.Field<int>("slctpriceary");
         entity.slctpricety = row.IsNull("slctpricety") ? string.Empty : row.Field<string>("slctpricety");
         entity.slctpriceval = row.IsNull("slctpriceval") ? decimal.Zero : row.Field<decimal>("slctpriceval");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.vendnobeg = row.IsNull("vendnobeg") ? decimal.Zero : row.Field<decimal>("vendnobeg");
         entity.vendnoend = row.IsNull("vendnoend") ? decimal.Zero : row.Field<decimal>("vendnoend");
         entity.vendnorangety = row.IsNull("vendnorangety") ? string.Empty : row.Field<string>("vendnorangety");
         entity.whsebeg = row.IsNull("whsebeg") ? string.Empty : row.Field<string>("whsebeg");
         entity.whseend = row.IsNull("whseend") ? string.Empty : row.Field<string>("whseend");
         entity.whserangety = row.IsNull("whserangety") ? string.Empty : row.Field<string>("whserangety");
         entity.whooper = row.IsNull("whooper") ? string.Empty : row.Field<string>("whooper");
         entity.whogroup = row.IsNull("whogroup") ? string.Empty : row.Field<string>("whogroup");
         entity.whoemail = row.IsNull("whoemail") ? string.Empty : row.Field<string>("whoemail");
         entity.whopos = row.IsNull("whopos") ? string.Empty : row.Field<string>("whopos");
         entity.whocontact = row.IsNull("whocontact") ? decimal.Zero : row.Field<decimal>("whocontact");
         entity.custenabled = row.Field<bool>("custenabled");
         entity.regenabled = row.Field<bool>("regenabled");
         entity.prodenabled = row.Field<bool>("prodenabled");
         entity.pcatenabled = row.Field<bool>("pcatenabled");
         entity.vendenabled = row.Field<bool>("vendenabled");
         entity.whseenabled = row.Field<bool>("whseenabled");
         entity.amtenabled = row.Field<bool>("amtenabled");
         entity.charenabled = row.Field<bool>("charenabled");
         entity.prcenabled = row.Field<bool>("prcenabled");
         entity.dateenabled = row.Field<bool>("dateenabled");
         entity.actionrowid = row.Field<byte[]>("actionrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaeaaction(ref DataRow row, Saeaaction entity)
      {
         row.SetField("actionseqno", entity.actionseqno);
         row.SetField("actionsubjectty", entity.actionsubjectty);
         row.SetField("actionsubjectval", entity.actionsubjectval);
         row.SetField("actiontype", entity.actiontype);
         row.SetField("camactivitycd", entity.camactivitycd);
         row.SetField("cmactivitycd", entity.cmactivitycd);
         row.SetField("comment", entity.comment);
         row.SetField("cono", entity.cono);
         row.SetField("contactid", entity.contactid);
         row.SetField("custnobeg", entity.custnobeg);
         row.SetField("custnoend", entity.custnoend);
         row.SetField("custnorangety", entity.custnorangety);
         row.SetField("emailsubject", entity.emailsubject);
         row.SetField("emailtext", entity.emailtext);
         row.SetField("eventname", entity.eventname);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("operinit", entity.operinit);
         row.SetField("prodbeg", entity.prodbeg);
         row.SetField("prodcatbeg", entity.prodcatbeg);
         row.SetField("prodcatend", entity.prodcatend);
         row.SetField("prodcatrangety", entity.prodcatrangety);
         row.SetField("prodend", entity.prodend);
         row.SetField("prodrangety", entity.prodrangety);
         row.SetField("programtorun", entity.programtorun);
         row.SetField("prosno", entity.prosno);
         row.SetField("regionbeg", entity.regionbeg);
         row.SetField("regionend", entity.regionend);
         row.SetField("regionrangety", entity.regionrangety);
         row.SetField("slctamountary", entity.slctamountary);
         row.SetField("slctamountty", entity.slctamountty);
         row.SetField("slctamountval", entity.slctamountval);
         row.SetField("slctcharary", entity.slctcharary);
         row.SetField("slctcharty", entity.slctcharty);
         row.SetField("slctcharval", entity.slctcharval);
         row.SetField("slctdateary", entity.slctdateary);
         row.SetField("slctdatety", entity.slctdatety);
         row.SetField("slctdateval", entity.slctdateval);
         row.SetField("slctpriceary", entity.slctpriceary);
         row.SetField("slctpricety", entity.slctpricety);
         row.SetField("slctpriceval", entity.slctpriceval);
         row.SetField("statustype", entity.statustype);
         row.SetField("transdt", entity.transdt);
         row.SetField("transproc", entity.transproc);
         row.SetField("transtm", entity.transtm);
         row.SetField("vendnobeg", entity.vendnobeg);
         row.SetField("vendnoend", entity.vendnoend);
         row.SetField("vendnorangety", entity.vendnorangety);
         row.SetField("whsebeg", entity.whsebeg);
         row.SetField("whseend", entity.whseend);
         row.SetField("whserangety", entity.whserangety);
         row.SetField("whooper", entity.whooper);
         row.SetField("whogroup", entity.whogroup);
         row.SetField("whoemail", entity.whoemail);
         row.SetField("whopos", entity.whopos);
         row.SetField("whocontact", entity.whocontact);
         row.SetField("custenabled", entity.custenabled);
         row.SetField("regenabled", entity.regenabled);
         row.SetField("prodenabled", entity.prodenabled);
         row.SetField("pcatenabled", entity.pcatenabled);
         row.SetField("vendenabled", entity.vendenabled);
         row.SetField("whseenabled", entity.whseenabled);
         row.SetField("amtenabled", entity.amtenabled);
         row.SetField("charenabled", entity.charenabled);
         row.SetField("prcenabled", entity.prcenabled);
         row.SetField("dateenabled", entity.dateenabled);
         row.SetField("actionrowid", entity.actionrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591