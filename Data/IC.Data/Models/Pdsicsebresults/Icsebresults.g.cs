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

namespace Infor.Sxe.IC.Data.Models.Pdsicsebresults
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsebresults.Icsebresults")]
   public partial class Icsebresults : ModelBase, IUserFields
   {
      public int cono { get; set; }
      public int bundleseqno { get; set; }
      [StringValidationAttribute]
      public string bundleid { get; set; }
      [StringValidationAttribute]
      public string bundlestatus { get; set; }
      [StringValidationAttribute]
      public string intype { get; set; }
      [StringValidationAttribute]
      public string docno { get; set; }
      public decimal totlf { get; set; }
      public decimal totbf { get; set; }
      public bool loosefl { get; set; }
      public decimal qty1 { get; set; }
      public decimal qty2 { get; set; }
      public decimal qty3 { get; set; }
      public decimal qty4 { get; set; }
      public decimal qty5 { get; set; }
      public decimal qty6 { get; set; }
      public decimal qty7 { get; set; }
      public decimal qty8 { get; set; }
      public decimal qty9 { get; set; }
      public decimal qty10 { get; set; }
      public decimal qty11 { get; set; }
      public decimal qty12 { get; set; }
      public decimal qty13 { get; set; }
      public decimal qty14 { get; set; }
      public decimal qty15 { get; set; }
      public decimal qty16 { get; set; }
      public decimal qty17 { get; set; }
      public decimal qty18 { get; set; }
      public decimal qty19 { get; set; }
      public decimal qty20 { get; set; }
      public decimal prevqty1 { get; set; }
      public decimal prevqty2 { get; set; }
      public decimal prevqty3 { get; set; }
      public decimal prevqty4 { get; set; }
      public decimal prevqty5 { get; set; }
      public decimal prevqty6 { get; set; }
      public decimal prevqty7 { get; set; }
      public decimal prevqty8 { get; set; }
      public decimal prevqty9 { get; set; }
      public decimal prevqty10 { get; set; }
      public decimal prevqty11 { get; set; }
      public decimal prevqty12 { get; set; }
      public decimal prevqty13 { get; set; }
      public decimal prevqty14 { get; set; }
      public decimal prevqty15 { get; set; }
      public decimal prevqty16 { get; set; }
      public decimal prevqty17 { get; set; }
      public decimal prevqty18 { get; set; }
      public decimal prevqty19 { get; set; }
      public decimal prevqty20 { get; set; }
      public int length1 { get; set; }
      public int length2 { get; set; }
      public int length3 { get; set; }
      public int length4 { get; set; }
      public int length5 { get; set; }
      public int length6 { get; set; }
      public int length7 { get; set; }
      public int length8 { get; set; }
      public int length9 { get; set; }
      public int length10 { get; set; }
      public int length11 { get; set; }
      public int length12 { get; set; }
      public int length13 { get; set; }
      public int length14 { get; set; }
      public int length15 { get; set; }
      public int length16 { get; set; }
      public int length17 { get; set; }
      public int length18 { get; set; }
      public int length19 { get; set; }
      public int length20 { get; set; }
      public decimal csunperstk1 { get; set; }
      public decimal csunperstk2 { get; set; }
      public decimal csunperstk3 { get; set; }
      public decimal csunperstk4 { get; set; }
      public decimal csunperstk5 { get; set; }
      public decimal csunperstk6 { get; set; }
      public decimal csunperstk7 { get; set; }
      public decimal csunperstk8 { get; set; }
      public decimal csunperstk9 { get; set; }
      public decimal csunperstk10 { get; set; }
      public decimal csunperstk11 { get; set; }
      public decimal csunperstk12 { get; set; }
      public decimal csunperstk13 { get; set; }
      public decimal csunperstk14 { get; set; }
      public decimal csunperstk15 { get; set; }
      public decimal csunperstk16 { get; set; }
      public decimal csunperstk17 { get; set; }
      public decimal csunperstk18 { get; set; }
      public decimal csunperstk19 { get; set; }
      public decimal csunperstk20 { get; set; }
      [StringValidationAttribute]
      public string prod1 { get; set; }
      [StringValidationAttribute]
      public string prod2 { get; set; }
      [StringValidationAttribute]
      public string prod3 { get; set; }
      [StringValidationAttribute]
      public string prod4 { get; set; }
      [StringValidationAttribute]
      public string prod5 { get; set; }
      [StringValidationAttribute]
      public string prod6 { get; set; }
      [StringValidationAttribute]
      public string prod7 { get; set; }
      [StringValidationAttribute]
      public string prod8 { get; set; }
      [StringValidationAttribute]
      public string prod9 { get; set; }
      [StringValidationAttribute]
      public string prod10 { get; set; }
      [StringValidationAttribute]
      public string prod11 { get; set; }
      [StringValidationAttribute]
      public string prod12 { get; set; }
      [StringValidationAttribute]
      public string prod13 { get; set; }
      [StringValidationAttribute]
      public string prod14 { get; set; }
      [StringValidationAttribute]
      public string prod15 { get; set; }
      [StringValidationAttribute]
      public string prod16 { get; set; }
      [StringValidationAttribute]
      public string prod17 { get; set; }
      [StringValidationAttribute]
      public string prod18 { get; set; }
      [StringValidationAttribute]
      public string prod19 { get; set; }
      [StringValidationAttribute]
      public string prod20 { get; set; }
      public bool changefl { get; set; }
      [StringValidationAttribute]
      public string extrafld { get; set; }
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
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string indoc { get; set; }
      [StringValidationAttribute]
      public string outdoc { get; set; }
      [StringValidationAttribute]
      public string pProd { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string rowidIcseb { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsebresults BuildIcsebresultsFromRow(DataRow row)
      {
         Icsebresults entity = new Icsebresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.bundleseqno = row.IsNull("bundleseqno") ? 0 : row.Field<int>("bundleseqno");
         entity.bundleid = row.IsNull("bundleid") ? string.Empty : row.Field<string>("bundleid");
         entity.bundlestatus = row.IsNull("bundlestatus") ? string.Empty : row.Field<string>("bundlestatus");
         entity.intype = row.IsNull("intype") ? string.Empty : row.Field<string>("intype");
         entity.docno = row.IsNull("docno") ? string.Empty : row.Field<string>("docno");
         entity.totlf = row.IsNull("totlf") ? decimal.Zero : row.Field<decimal>("totlf");
         entity.totbf = row.IsNull("totbf") ? decimal.Zero : row.Field<decimal>("totbf");
         entity.loosefl = row.Field<bool>("loosefl");
         entity.qty1 = row.IsNull("qty1") ? decimal.Zero : row.Field<decimal>("qty1");
         entity.qty2 = row.IsNull("qty2") ? decimal.Zero : row.Field<decimal>("qty2");
         entity.qty3 = row.IsNull("qty3") ? decimal.Zero : row.Field<decimal>("qty3");
         entity.qty4 = row.IsNull("qty4") ? decimal.Zero : row.Field<decimal>("qty4");
         entity.qty5 = row.IsNull("qty5") ? decimal.Zero : row.Field<decimal>("qty5");
         entity.qty6 = row.IsNull("qty6") ? decimal.Zero : row.Field<decimal>("qty6");
         entity.qty7 = row.IsNull("qty7") ? decimal.Zero : row.Field<decimal>("qty7");
         entity.qty8 = row.IsNull("qty8") ? decimal.Zero : row.Field<decimal>("qty8");
         entity.qty9 = row.IsNull("qty9") ? decimal.Zero : row.Field<decimal>("qty9");
         entity.qty10 = row.IsNull("qty10") ? decimal.Zero : row.Field<decimal>("qty10");
         entity.qty11 = row.IsNull("qty11") ? decimal.Zero : row.Field<decimal>("qty11");
         entity.qty12 = row.IsNull("qty12") ? decimal.Zero : row.Field<decimal>("qty12");
         entity.qty13 = row.IsNull("qty13") ? decimal.Zero : row.Field<decimal>("qty13");
         entity.qty14 = row.IsNull("qty14") ? decimal.Zero : row.Field<decimal>("qty14");
         entity.qty15 = row.IsNull("qty15") ? decimal.Zero : row.Field<decimal>("qty15");
         entity.qty16 = row.IsNull("qty16") ? decimal.Zero : row.Field<decimal>("qty16");
         entity.qty17 = row.IsNull("qty17") ? decimal.Zero : row.Field<decimal>("qty17");
         entity.qty18 = row.IsNull("qty18") ? decimal.Zero : row.Field<decimal>("qty18");
         entity.qty19 = row.IsNull("qty19") ? decimal.Zero : row.Field<decimal>("qty19");
         entity.qty20 = row.IsNull("qty20") ? decimal.Zero : row.Field<decimal>("qty20");
         entity.prevqty1 = row.IsNull("prevqty1") ? decimal.Zero : row.Field<decimal>("prevqty1");
         entity.prevqty2 = row.IsNull("prevqty2") ? decimal.Zero : row.Field<decimal>("prevqty2");
         entity.prevqty3 = row.IsNull("prevqty3") ? decimal.Zero : row.Field<decimal>("prevqty3");
         entity.prevqty4 = row.IsNull("prevqty4") ? decimal.Zero : row.Field<decimal>("prevqty4");
         entity.prevqty5 = row.IsNull("prevqty5") ? decimal.Zero : row.Field<decimal>("prevqty5");
         entity.prevqty6 = row.IsNull("prevqty6") ? decimal.Zero : row.Field<decimal>("prevqty6");
         entity.prevqty7 = row.IsNull("prevqty7") ? decimal.Zero : row.Field<decimal>("prevqty7");
         entity.prevqty8 = row.IsNull("prevqty8") ? decimal.Zero : row.Field<decimal>("prevqty8");
         entity.prevqty9 = row.IsNull("prevqty9") ? decimal.Zero : row.Field<decimal>("prevqty9");
         entity.prevqty10 = row.IsNull("prevqty10") ? decimal.Zero : row.Field<decimal>("prevqty10");
         entity.prevqty11 = row.IsNull("prevqty11") ? decimal.Zero : row.Field<decimal>("prevqty11");
         entity.prevqty12 = row.IsNull("prevqty12") ? decimal.Zero : row.Field<decimal>("prevqty12");
         entity.prevqty13 = row.IsNull("prevqty13") ? decimal.Zero : row.Field<decimal>("prevqty13");
         entity.prevqty14 = row.IsNull("prevqty14") ? decimal.Zero : row.Field<decimal>("prevqty14");
         entity.prevqty15 = row.IsNull("prevqty15") ? decimal.Zero : row.Field<decimal>("prevqty15");
         entity.prevqty16 = row.IsNull("prevqty16") ? decimal.Zero : row.Field<decimal>("prevqty16");
         entity.prevqty17 = row.IsNull("prevqty17") ? decimal.Zero : row.Field<decimal>("prevqty17");
         entity.prevqty18 = row.IsNull("prevqty18") ? decimal.Zero : row.Field<decimal>("prevqty18");
         entity.prevqty19 = row.IsNull("prevqty19") ? decimal.Zero : row.Field<decimal>("prevqty19");
         entity.prevqty20 = row.IsNull("prevqty20") ? decimal.Zero : row.Field<decimal>("prevqty20");
         entity.length1 = row.IsNull("length1") ? 0 : row.Field<int>("length1");
         entity.length2 = row.IsNull("length2") ? 0 : row.Field<int>("length2");
         entity.length3 = row.IsNull("length3") ? 0 : row.Field<int>("length3");
         entity.length4 = row.IsNull("length4") ? 0 : row.Field<int>("length4");
         entity.length5 = row.IsNull("length5") ? 0 : row.Field<int>("length5");
         entity.length6 = row.IsNull("length6") ? 0 : row.Field<int>("length6");
         entity.length7 = row.IsNull("length7") ? 0 : row.Field<int>("length7");
         entity.length8 = row.IsNull("length8") ? 0 : row.Field<int>("length8");
         entity.length9 = row.IsNull("length9") ? 0 : row.Field<int>("length9");
         entity.length10 = row.IsNull("length10") ? 0 : row.Field<int>("length10");
         entity.length11 = row.IsNull("length11") ? 0 : row.Field<int>("length11");
         entity.length12 = row.IsNull("length12") ? 0 : row.Field<int>("length12");
         entity.length13 = row.IsNull("length13") ? 0 : row.Field<int>("length13");
         entity.length14 = row.IsNull("length14") ? 0 : row.Field<int>("length14");
         entity.length15 = row.IsNull("length15") ? 0 : row.Field<int>("length15");
         entity.length16 = row.IsNull("length16") ? 0 : row.Field<int>("length16");
         entity.length17 = row.IsNull("length17") ? 0 : row.Field<int>("length17");
         entity.length18 = row.IsNull("length18") ? 0 : row.Field<int>("length18");
         entity.length19 = row.IsNull("length19") ? 0 : row.Field<int>("length19");
         entity.length20 = row.IsNull("length20") ? 0 : row.Field<int>("length20");
         entity.csunperstk1 = row.IsNull("csunperstk1") ? decimal.Zero : row.Field<decimal>("csunperstk1");
         entity.csunperstk2 = row.IsNull("csunperstk2") ? decimal.Zero : row.Field<decimal>("csunperstk2");
         entity.csunperstk3 = row.IsNull("csunperstk3") ? decimal.Zero : row.Field<decimal>("csunperstk3");
         entity.csunperstk4 = row.IsNull("csunperstk4") ? decimal.Zero : row.Field<decimal>("csunperstk4");
         entity.csunperstk5 = row.IsNull("csunperstk5") ? decimal.Zero : row.Field<decimal>("csunperstk5");
         entity.csunperstk6 = row.IsNull("csunperstk6") ? decimal.Zero : row.Field<decimal>("csunperstk6");
         entity.csunperstk7 = row.IsNull("csunperstk7") ? decimal.Zero : row.Field<decimal>("csunperstk7");
         entity.csunperstk8 = row.IsNull("csunperstk8") ? decimal.Zero : row.Field<decimal>("csunperstk8");
         entity.csunperstk9 = row.IsNull("csunperstk9") ? decimal.Zero : row.Field<decimal>("csunperstk9");
         entity.csunperstk10 = row.IsNull("csunperstk10") ? decimal.Zero : row.Field<decimal>("csunperstk10");
         entity.csunperstk11 = row.IsNull("csunperstk11") ? decimal.Zero : row.Field<decimal>("csunperstk11");
         entity.csunperstk12 = row.IsNull("csunperstk12") ? decimal.Zero : row.Field<decimal>("csunperstk12");
         entity.csunperstk13 = row.IsNull("csunperstk13") ? decimal.Zero : row.Field<decimal>("csunperstk13");
         entity.csunperstk14 = row.IsNull("csunperstk14") ? decimal.Zero : row.Field<decimal>("csunperstk14");
         entity.csunperstk15 = row.IsNull("csunperstk15") ? decimal.Zero : row.Field<decimal>("csunperstk15");
         entity.csunperstk16 = row.IsNull("csunperstk16") ? decimal.Zero : row.Field<decimal>("csunperstk16");
         entity.csunperstk17 = row.IsNull("csunperstk17") ? decimal.Zero : row.Field<decimal>("csunperstk17");
         entity.csunperstk18 = row.IsNull("csunperstk18") ? decimal.Zero : row.Field<decimal>("csunperstk18");
         entity.csunperstk19 = row.IsNull("csunperstk19") ? decimal.Zero : row.Field<decimal>("csunperstk19");
         entity.csunperstk20 = row.IsNull("csunperstk20") ? decimal.Zero : row.Field<decimal>("csunperstk20");
         entity.prod1 = row.IsNull("prod1") ? string.Empty : row.Field<string>("prod1");
         entity.prod2 = row.IsNull("prod2") ? string.Empty : row.Field<string>("prod2");
         entity.prod3 = row.IsNull("prod3") ? string.Empty : row.Field<string>("prod3");
         entity.prod4 = row.IsNull("prod4") ? string.Empty : row.Field<string>("prod4");
         entity.prod5 = row.IsNull("prod5") ? string.Empty : row.Field<string>("prod5");
         entity.prod6 = row.IsNull("prod6") ? string.Empty : row.Field<string>("prod6");
         entity.prod7 = row.IsNull("prod7") ? string.Empty : row.Field<string>("prod7");
         entity.prod8 = row.IsNull("prod8") ? string.Empty : row.Field<string>("prod8");
         entity.prod9 = row.IsNull("prod9") ? string.Empty : row.Field<string>("prod9");
         entity.prod10 = row.IsNull("prod10") ? string.Empty : row.Field<string>("prod10");
         entity.prod11 = row.IsNull("prod11") ? string.Empty : row.Field<string>("prod11");
         entity.prod12 = row.IsNull("prod12") ? string.Empty : row.Field<string>("prod12");
         entity.prod13 = row.IsNull("prod13") ? string.Empty : row.Field<string>("prod13");
         entity.prod14 = row.IsNull("prod14") ? string.Empty : row.Field<string>("prod14");
         entity.prod15 = row.IsNull("prod15") ? string.Empty : row.Field<string>("prod15");
         entity.prod16 = row.IsNull("prod16") ? string.Empty : row.Field<string>("prod16");
         entity.prod17 = row.IsNull("prod17") ? string.Empty : row.Field<string>("prod17");
         entity.prod18 = row.IsNull("prod18") ? string.Empty : row.Field<string>("prod18");
         entity.prod19 = row.IsNull("prod19") ? string.Empty : row.Field<string>("prod19");
         entity.prod20 = row.IsNull("prod20") ? string.Empty : row.Field<string>("prod20");
         entity.changefl = row.Field<bool>("changefl");
         entity.extrafld = row.IsNull("extrafld") ? string.Empty : row.Field<string>("extrafld");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.indoc = row.IsNull("indoc") ? string.Empty : row.Field<string>("indoc");
         entity.outdoc = row.IsNull("outdoc") ? string.Empty : row.Field<string>("outdoc");
         entity.pProd = row.IsNull("p-prod") ? string.Empty : row.Field<string>("p-prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.rowidIcseb = row.Field<byte[]>("rowid-icseb").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsebresults(ref DataRow row, Icsebresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bundleseqno", entity.bundleseqno);
         row.SetField("bundleid", entity.bundleid);
         row.SetField("bundlestatus", entity.bundlestatus);
         row.SetField("intype", entity.intype);
         row.SetField("docno", entity.docno);
         row.SetField("totlf", entity.totlf);
         row.SetField("totbf", entity.totbf);
         row.SetField("loosefl", entity.loosefl);
         row.SetField("qty1", entity.qty1);
         row.SetField("qty2", entity.qty2);
         row.SetField("qty3", entity.qty3);
         row.SetField("qty4", entity.qty4);
         row.SetField("qty5", entity.qty5);
         row.SetField("qty6", entity.qty6);
         row.SetField("qty7", entity.qty7);
         row.SetField("qty8", entity.qty8);
         row.SetField("qty9", entity.qty9);
         row.SetField("qty10", entity.qty10);
         row.SetField("qty11", entity.qty11);
         row.SetField("qty12", entity.qty12);
         row.SetField("qty13", entity.qty13);
         row.SetField("qty14", entity.qty14);
         row.SetField("qty15", entity.qty15);
         row.SetField("qty16", entity.qty16);
         row.SetField("qty17", entity.qty17);
         row.SetField("qty18", entity.qty18);
         row.SetField("qty19", entity.qty19);
         row.SetField("qty20", entity.qty20);
         row.SetField("prevqty1", entity.prevqty1);
         row.SetField("prevqty2", entity.prevqty2);
         row.SetField("prevqty3", entity.prevqty3);
         row.SetField("prevqty4", entity.prevqty4);
         row.SetField("prevqty5", entity.prevqty5);
         row.SetField("prevqty6", entity.prevqty6);
         row.SetField("prevqty7", entity.prevqty7);
         row.SetField("prevqty8", entity.prevqty8);
         row.SetField("prevqty9", entity.prevqty9);
         row.SetField("prevqty10", entity.prevqty10);
         row.SetField("prevqty11", entity.prevqty11);
         row.SetField("prevqty12", entity.prevqty12);
         row.SetField("prevqty13", entity.prevqty13);
         row.SetField("prevqty14", entity.prevqty14);
         row.SetField("prevqty15", entity.prevqty15);
         row.SetField("prevqty16", entity.prevqty16);
         row.SetField("prevqty17", entity.prevqty17);
         row.SetField("prevqty18", entity.prevqty18);
         row.SetField("prevqty19", entity.prevqty19);
         row.SetField("prevqty20", entity.prevqty20);
         row.SetField("length1", entity.length1);
         row.SetField("length2", entity.length2);
         row.SetField("length3", entity.length3);
         row.SetField("length4", entity.length4);
         row.SetField("length5", entity.length5);
         row.SetField("length6", entity.length6);
         row.SetField("length7", entity.length7);
         row.SetField("length8", entity.length8);
         row.SetField("length9", entity.length9);
         row.SetField("length10", entity.length10);
         row.SetField("length11", entity.length11);
         row.SetField("length12", entity.length12);
         row.SetField("length13", entity.length13);
         row.SetField("length14", entity.length14);
         row.SetField("length15", entity.length15);
         row.SetField("length16", entity.length16);
         row.SetField("length17", entity.length17);
         row.SetField("length18", entity.length18);
         row.SetField("length19", entity.length19);
         row.SetField("length20", entity.length20);
         row.SetField("csunperstk1", entity.csunperstk1);
         row.SetField("csunperstk2", entity.csunperstk2);
         row.SetField("csunperstk3", entity.csunperstk3);
         row.SetField("csunperstk4", entity.csunperstk4);
         row.SetField("csunperstk5", entity.csunperstk5);
         row.SetField("csunperstk6", entity.csunperstk6);
         row.SetField("csunperstk7", entity.csunperstk7);
         row.SetField("csunperstk8", entity.csunperstk8);
         row.SetField("csunperstk9", entity.csunperstk9);
         row.SetField("csunperstk10", entity.csunperstk10);
         row.SetField("csunperstk11", entity.csunperstk11);
         row.SetField("csunperstk12", entity.csunperstk12);
         row.SetField("csunperstk13", entity.csunperstk13);
         row.SetField("csunperstk14", entity.csunperstk14);
         row.SetField("csunperstk15", entity.csunperstk15);
         row.SetField("csunperstk16", entity.csunperstk16);
         row.SetField("csunperstk17", entity.csunperstk17);
         row.SetField("csunperstk18", entity.csunperstk18);
         row.SetField("csunperstk19", entity.csunperstk19);
         row.SetField("csunperstk20", entity.csunperstk20);
         row.SetField("prod1", entity.prod1);
         row.SetField("prod2", entity.prod2);
         row.SetField("prod3", entity.prod3);
         row.SetField("prod4", entity.prod4);
         row.SetField("prod5", entity.prod5);
         row.SetField("prod6", entity.prod6);
         row.SetField("prod7", entity.prod7);
         row.SetField("prod8", entity.prod8);
         row.SetField("prod9", entity.prod9);
         row.SetField("prod10", entity.prod10);
         row.SetField("prod11", entity.prod11);
         row.SetField("prod12", entity.prod12);
         row.SetField("prod13", entity.prod13);
         row.SetField("prod14", entity.prod14);
         row.SetField("prod15", entity.prod15);
         row.SetField("prod16", entity.prod16);
         row.SetField("prod17", entity.prod17);
         row.SetField("prod18", entity.prod18);
         row.SetField("prod19", entity.prod19);
         row.SetField("prod20", entity.prod20);
         row.SetField("changefl", entity.changefl);
         row.SetField("extrafld", entity.extrafld);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("indoc", entity.indoc);
         row.SetField("outdoc", entity.outdoc);
         row.SetField("p-prod", entity.pProd);
         row.SetField("whse", entity.whse);
         row.SetField("rowid-icseb", entity.rowidIcseb.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
