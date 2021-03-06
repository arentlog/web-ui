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

namespace Infor.Sxe.OE.Data.Models.Pdsloadoeeltt
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsloadoeeltt.Loadoeelttresults")]
   public partial class Loadoeelttresults : ModelBase, IUserFields
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string oenotesfl { get; set; }
      public bool commentfl { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      [StringValidationAttribute]
      public string arscname { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string arssname { get; set; }
      [StringValidationAttribute]
      public string shiptonm { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string icsdname { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string custpo { get; set; }
      [StringValidationAttribute]
      public string jobno { get; set; }
      [StringValidationAttribute]
      public string takenby { get; set; }
      public DateTime? enterdt { get; set; }
      public DateTime? promisedt { get; set; }
      public DateTime? invoicedt { get; set; }
      public DateTime? shipdt { get; set; }
      [StringValidationAttribute]
      public string suspend { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyship { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal netord { get; set; }
      public decimal netamt { get; set; }
      public int bono { get; set; }
      public decimal prodcost { get; set; }
      public bool priceoverfl { get; set; }
      [StringValidationAttribute]
      public string priceclty { get; set; }
      public decimal lnPricecd { get; set; }
      public bool ptlkitbofl { get; set; }
      [StringValidationAttribute]
      public string specnstype { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }
      [StringValidationAttribute]
      public string orderDisp { get; set; }
      public bool autoaltwhsefl { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string origincd { get; set; }
      [StringValidationAttribute]
      public string origincopyty { get; set; }
      public int originorderno { get; set; }
      public int originordersuf { get; set; }
      [StringValidationAttribute]
      public string restrictcd { get; set; }
      public bool restrictovrfl { get; set; }
      [StringValidationAttribute]
      public string certcode { get; set; }
      public bool custreserveovrfl { get; set; }
      [StringValidationAttribute]
      public string custreservecontractno { get; set; }
      [StringValidationAttribute]
      public string saleswhse { get; set; }
      public bool fulfillmentordfl { get; set; }
      public bool fulfillmenttiedfl { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadoeelttresults BuildLoadoeelttresultsFromRow(DataRow row)
      {
         Loadoeelttresults entity = new Loadoeelttresults();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.oenotesfl = row.IsNull("oenotesfl") ? string.Empty : row.Field<string>("oenotesfl");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.arscname = row.IsNull("arscname") ? string.Empty : row.Field<string>("arscname");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.arssname = row.IsNull("arssname") ? string.Empty : row.Field<string>("arssname");
         entity.shiptonm = row.IsNull("shiptonm") ? string.Empty : row.Field<string>("shiptonm");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.icsdname = row.IsNull("icsdname") ? string.Empty : row.Field<string>("icsdname");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.jobno = row.IsNull("jobno") ? string.Empty : row.Field<string>("jobno");
         entity.takenby = row.IsNull("takenby") ? string.Empty : row.Field<string>("takenby");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.invoicedt = row.Field<DateTime?>("invoicedt");
         entity.shipdt = row.Field<DateTime?>("shipdt");
         entity.suspend = row.IsNull("suspend") ? string.Empty : row.Field<string>("suspend");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.netord = row.IsNull("netord") ? decimal.Zero : row.Field<decimal>("netord");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.bono = row.IsNull("bono") ? 0 : row.Field<int>("bono");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.priceoverfl = row.Field<bool>("priceoverfl");
         entity.priceclty = row.IsNull("priceclty") ? string.Empty : row.Field<string>("priceclty");
         entity.lnPricecd = row.IsNull("LnPricecd") ? decimal.Zero : row.Field<decimal>("LnPricecd");
         entity.ptlkitbofl = row.Field<bool>("ptlkitbofl");
         entity.specnstype = row.IsNull("specnstype") ? string.Empty : row.Field<string>("specnstype");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.orderDisp = row.IsNull("orderDisp") ? string.Empty : row.Field<string>("orderDisp");
         entity.autoaltwhsefl = row.Field<bool>("autoaltwhsefl");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.origincd = row.IsNull("origincd") ? string.Empty : row.Field<string>("origincd");
         entity.origincopyty = row.IsNull("origincopyty") ? string.Empty : row.Field<string>("origincopyty");
         entity.originorderno = row.IsNull("originorderno") ? 0 : row.Field<int>("originorderno");
         entity.originordersuf = row.IsNull("originordersuf") ? 0 : row.Field<int>("originordersuf");
         entity.restrictcd = row.IsNull("restrictcd") ? string.Empty : row.Field<string>("restrictcd");
         entity.restrictovrfl = row.Field<bool>("restrictovrfl");
         entity.certcode = row.IsNull("certcode") ? string.Empty : row.Field<string>("certcode");
         entity.custreserveovrfl = row.Field<bool>("custreserveovrfl");
         entity.custreservecontractno = row.IsNull("custreservecontractno") ? string.Empty : row.Field<string>("custreservecontractno");
         entity.saleswhse = row.IsNull("saleswhse") ? string.Empty : row.Field<string>("saleswhse");
         entity.fulfillmentordfl = row.Field<bool>("fulfillmentordfl");
         entity.fulfillmenttiedfl = row.Field<bool>("fulfillmenttiedfl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadoeelttresults(ref DataRow row, Loadoeelttresults entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("oenotesfl", entity.oenotesfl);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("arscname", entity.arscname);
         row.SetField("shipto", entity.shipto);
         row.SetField("arssname", entity.arssname);
         row.SetField("shiptonm", entity.shiptonm);
         row.SetField("whse", entity.whse);
         row.SetField("icsdname", entity.icsdname);
         row.SetField("transtype", entity.transtype);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("custpo", entity.custpo);
         row.SetField("jobno", entity.jobno);
         row.SetField("takenby", entity.takenby);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("invoicedt", entity.invoicedt);
         row.SetField("shipdt", entity.shipdt);
         row.SetField("suspend", entity.suspend);
         row.SetField("approvty", entity.approvty);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("unit", entity.unit);
         row.SetField("netord", entity.netord);
         row.SetField("netamt", entity.netamt);
         row.SetField("bono", entity.bono);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("priceoverfl", entity.priceoverfl);
         row.SetField("priceclty", entity.priceclty);
         row.SetField("LnPricecd", entity.lnPricecd);
         row.SetField("ptlkitbofl", entity.ptlkitbofl);
         row.SetField("specnstype", entity.specnstype);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("orderDisp", entity.orderDisp);
         row.SetField("autoaltwhsefl", entity.autoaltwhsefl);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("origincd", entity.origincd);
         row.SetField("origincopyty", entity.origincopyty);
         row.SetField("originorderno", entity.originorderno);
         row.SetField("originordersuf", entity.originordersuf);
         row.SetField("restrictcd", entity.restrictcd);
         row.SetField("restrictovrfl", entity.restrictovrfl);
         row.SetField("certcode", entity.certcode);
         row.SetField("custreserveovrfl", entity.custreserveovrfl);
         row.SetField("custreservecontractno", entity.custreservecontractno);
         row.SetField("saleswhse", entity.saleswhse);
         row.SetField("fulfillmentordfl", entity.fulfillmentordfl);
         row.SetField("fulfillmenttiedfl", entity.fulfillmenttiedfl);
         row.SetField("refer", entity.refer);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
