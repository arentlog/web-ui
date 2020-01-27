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

namespace Infor.Sxe.OE.Data.Models.Pdsloadoeelktt
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsloadoeelktt.Loadoeelkttresults")]
   public partial class Loadoeelkttresults : ModelBase, IUserFields
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string rectype { get; set; }
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
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
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
      public string compprod { get; set; }
      [StringValidationAttribute]
      public string compprodnotesfl { get; set; }
      [StringValidationAttribute]
      public string compproddesc { get; set; }
      public decimal qtyneeded { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyreservd { get; set; }
      public decimal qtyship { get; set; }
      public bool reqfl { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public int compseqno { get; set; }
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
      public string suspend { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      [StringValidationAttribute]
      public string extra { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string saleswhse { get; set; }
      public bool fulfillmentordfl { get; set; }
      public bool fulfillmenttiedfl { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }


      public static Loadoeelkttresults BuildLoadoeelkttresultsFromRow(DataRow row)
      {
         Loadoeelkttresults entity = new Loadoeelkttresults();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.rectype = row.IsNull("rectype") ? string.Empty : row.Field<string>("rectype");
         entity.oenotesfl = row.IsNull("oenotesfl") ? string.Empty : row.Field<string>("oenotesfl");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.jobno = row.IsNull("jobno") ? string.Empty : row.Field<string>("jobno");
         entity.takenby = row.IsNull("takenby") ? string.Empty : row.Field<string>("takenby");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.invoicedt = row.Field<DateTime?>("invoicedt");
         entity.shipdt = row.Field<DateTime?>("shipdt");
         entity.compprod = row.IsNull("compprod") ? string.Empty : row.Field<string>("compprod");
         entity.compprodnotesfl = row.IsNull("compprodnotesfl") ? string.Empty : row.Field<string>("compprodnotesfl");
         entity.compproddesc = row.IsNull("compproddesc") ? string.Empty : row.Field<string>("compproddesc");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyreservd = row.IsNull("qtyreservd") ? decimal.Zero : row.Field<decimal>("qtyreservd");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.reqfl = row.Field<bool>("reqfl");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.compseqno = row.IsNull("compseqno") ? 0 : row.Field<int>("compseqno");
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
         entity.suspend = row.IsNull("suspend") ? string.Empty : row.Field<string>("suspend");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.extra = row.IsNull("extra") ? string.Empty : row.Field<string>("extra");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.saleswhse = row.IsNull("saleswhse") ? string.Empty : row.Field<string>("saleswhse");
         entity.fulfillmentordfl = row.Field<bool>("fulfillmentordfl");
         entity.fulfillmenttiedfl = row.Field<bool>("fulfillmenttiedfl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadoeelkttresults(ref DataRow row, Loadoeelkttresults entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("rectype", entity.rectype);
         row.SetField("oenotesfl", entity.oenotesfl);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("shipto", entity.shipto);
         row.SetField("whse", entity.whse);
         row.SetField("transtype", entity.transtype);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("custpo", entity.custpo);
         row.SetField("jobno", entity.jobno);
         row.SetField("takenby", entity.takenby);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("invoicedt", entity.invoicedt);
         row.SetField("shipdt", entity.shipdt);
         row.SetField("compprod", entity.compprod);
         row.SetField("compprodnotesfl", entity.compprodnotesfl);
         row.SetField("compproddesc", entity.compproddesc);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyreservd", entity.qtyreservd);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("reqfl", entity.reqfl);
         row.SetField("unit", entity.unit);
         row.SetField("compseqno", entity.compseqno);
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
         row.SetField("suspend", entity.suspend);
         row.SetField("approvty", entity.approvty);
         row.SetField("extra", entity.extra);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("saleswhse", entity.saleswhse);
         row.SetField("fulfillmentordfl", entity.fulfillmentordfl);
         row.SetField("fulfillmenttiedfl", entity.fulfillmenttiedfl);
         row.SetField("refer", entity.refer);

      }
   
   }
}
#pragma warning restore 1591
