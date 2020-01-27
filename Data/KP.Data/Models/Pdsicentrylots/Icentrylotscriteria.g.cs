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

namespace Infor.Sxe.KP.Data.Models.Pdsicentrylots
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdsicentrylots.Icentrylotscriteria")]
   public partial class Icentrylotscriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string type { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string linenochar { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string seqnochar { get; set; }
      public bool inquiryfl { get; set; }
      public bool returnfl { get; set; }
      public decimal origqty { get; set; }
      public decimal proofqty { get; set; }
      public decimal ordqty { get; set; }
      public decimal outqty { get; set; }
      [StringValidationAttribute]
      public string ictype { get; set; }
      public decimal cost { get; set; }
      public decimal qtyunavail { get; set; }
      [StringValidationAttribute]
      public string iclotrcptty { get; set; }
      [StringValidationAttribute]
      public string method { get; set; }
      public int retorderno { get; set; }
      public int retordersuf { get; set; }
      public int retlineno { get; set; }
      public int retseqno { get; set; }
      [StringValidationAttribute]
      public string returnty { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      public decimal sQtyunavail { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public decimal vendno { get; set; }
      public int wono { get; set; }
      public int wosuf { get; set; }
      public int cono2 { get; set; }
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string ourproc { get; set; }
      [StringValidationAttribute]
      public string actionty { get; set; }
      public int icspecrecno { get; set; }
      [StringValidationAttribute]
      public string assignoldest { get; set; }
      [StringValidationAttribute]
      public string currproc { get; set; }
      [StringValidationAttribute]
      public string seqdash { get; set; }
      [StringValidationAttribute]
      public string rettext { get; set; }
      [StringValidationAttribute]
      public string kplabel { get; set; }
      [StringValidationAttribute]
      public string wonosuf { get; set; }
      [StringValidationAttribute]
      public string origqtylabel { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      [StringValidationAttribute]
      public string frametitle { get; set; }
      public bool btnoldestenabled { get; set; }
      public bool btnoldesthidden { get; set; }
      public bool btnautoassignenabled { get; set; }
      public bool btnautoassignhidden { get; set; }
      public bool btncreateenabled { get; set; }
      public bool selectfieldenabled { get; set; }
      public bool accesscutsenabled { get; set; }
      public bool accesscutshidden { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icentrylotscriteria BuildIcentrylotscriteriaFromRow(DataRow row)
      {
         Icentrylotscriteria entity = new Icentrylotscriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.linenochar = row.IsNull("linenochar") ? string.Empty : row.Field<string>("linenochar");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.seqnochar = row.IsNull("seqnochar") ? string.Empty : row.Field<string>("seqnochar");
         entity.inquiryfl = row.Field<bool>("inquiryfl");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.origqty = row.IsNull("origqty") ? decimal.Zero : row.Field<decimal>("origqty");
         entity.proofqty = row.IsNull("proofqty") ? decimal.Zero : row.Field<decimal>("proofqty");
         entity.ordqty = row.IsNull("ordqty") ? decimal.Zero : row.Field<decimal>("ordqty");
         entity.outqty = row.IsNull("outqty") ? decimal.Zero : row.Field<decimal>("outqty");
         entity.ictype = row.IsNull("ictype") ? string.Empty : row.Field<string>("ictype");
         entity.cost = row.IsNull("cost") ? decimal.Zero : row.Field<decimal>("cost");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.iclotrcptty = row.IsNull("iclotrcptty") ? string.Empty : row.Field<string>("iclotrcptty");
         entity.method = row.IsNull("method") ? string.Empty : row.Field<string>("method");
         entity.retorderno = row.IsNull("retorderno") ? 0 : row.Field<int>("retorderno");
         entity.retordersuf = row.IsNull("retordersuf") ? 0 : row.Field<int>("retordersuf");
         entity.retlineno = row.IsNull("retlineno") ? 0 : row.Field<int>("retlineno");
         entity.retseqno = row.IsNull("retseqno") ? 0 : row.Field<int>("retseqno");
         entity.returnty = row.IsNull("returnty") ? string.Empty : row.Field<string>("returnty");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.sQtyunavail = row.IsNull("s-qtyunavail") ? decimal.Zero : row.Field<decimal>("s-qtyunavail");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.wono = row.IsNull("wono") ? 0 : row.Field<int>("wono");
         entity.wosuf = row.IsNull("wosuf") ? 0 : row.Field<int>("wosuf");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.actionty = row.IsNull("actionty") ? string.Empty : row.Field<string>("actionty");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.assignoldest = row.IsNull("assignoldest") ? string.Empty : row.Field<string>("assignoldest");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.seqdash = row.IsNull("seqdash") ? string.Empty : row.Field<string>("seqdash");
         entity.rettext = row.IsNull("rettext") ? string.Empty : row.Field<string>("rettext");
         entity.kplabel = row.IsNull("kplabel") ? string.Empty : row.Field<string>("kplabel");
         entity.wonosuf = row.IsNull("wonosuf") ? string.Empty : row.Field<string>("wonosuf");
         entity.origqtylabel = row.IsNull("origqtylabel") ? string.Empty : row.Field<string>("origqtylabel");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.frametitle = row.IsNull("frametitle") ? string.Empty : row.Field<string>("frametitle");
         entity.btnoldestenabled = row.Field<bool>("btnoldestenabled");
         entity.btnoldesthidden = row.Field<bool>("btnoldesthidden");
         entity.btnautoassignenabled = row.Field<bool>("btnautoassignenabled");
         entity.btnautoassignhidden = row.Field<bool>("btnautoassignhidden");
         entity.btncreateenabled = row.Field<bool>("btncreateenabled");
         entity.selectfieldenabled = row.Field<bool>("selectfieldenabled");
         entity.accesscutsenabled = row.Field<bool>("accesscutsenabled");
         entity.accesscutshidden = row.Field<bool>("accesscutshidden");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcentrylotscriteria(ref DataRow row, Icentrylotscriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("type", entity.type);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("linenochar", entity.linenochar);
         row.SetField("seqno", entity.seqno);
         row.SetField("seqnochar", entity.seqnochar);
         row.SetField("inquiryfl", entity.inquiryfl);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("origqty", entity.origqty);
         row.SetField("proofqty", entity.proofqty);
         row.SetField("ordqty", entity.ordqty);
         row.SetField("outqty", entity.outqty);
         row.SetField("ictype", entity.ictype);
         row.SetField("cost", entity.cost);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("iclotrcptty", entity.iclotrcptty);
         row.SetField("method", entity.method);
         row.SetField("retorderno", entity.retorderno);
         row.SetField("retordersuf", entity.retordersuf);
         row.SetField("retlineno", entity.retlineno);
         row.SetField("retseqno", entity.retseqno);
         row.SetField("returnty", entity.returnty);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("s-qtyunavail", entity.sQtyunavail);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("vendno", entity.vendno);
         row.SetField("wono", entity.wono);
         row.SetField("wosuf", entity.wosuf);
         row.SetField("cono2", entity.cono2);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("actionty", entity.actionty);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("assignoldest", entity.assignoldest);
         row.SetField("currproc", entity.currproc);
         row.SetField("seqdash", entity.seqdash);
         row.SetField("rettext", entity.rettext);
         row.SetField("kplabel", entity.kplabel);
         row.SetField("wonosuf", entity.wonosuf);
         row.SetField("origqtylabel", entity.origqtylabel);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("frametitle", entity.frametitle);
         row.SetField("btnoldestenabled", entity.btnoldestenabled);
         row.SetField("btnoldesthidden", entity.btnoldesthidden);
         row.SetField("btnautoassignenabled", entity.btnautoassignenabled);
         row.SetField("btnautoassignhidden", entity.btnautoassignhidden);
         row.SetField("btncreateenabled", entity.btncreateenabled);
         row.SetField("selectfieldenabled", entity.selectfieldenabled);
         row.SetField("accesscutsenabled", entity.accesscutsenabled);
         row.SetField("accesscutshidden", entity.accesscutshidden);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
