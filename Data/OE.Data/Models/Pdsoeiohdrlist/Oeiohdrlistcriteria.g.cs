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

namespace Infor.Sxe.OE.Data.Models.Pdsoeiohdrlist
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeiohdrlist.Oeiohdrlistcriteria")]
   public partial class Oeiohdrlistcriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string slsrepin { get; set; }
      [StringValidationAttribute]
      public string slsrepout { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int divno { get; set; }
      [StringValidationAttribute]
      public string custpo { get; set; }
      [StringValidationAttribute]
      public string transtypelist { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      [StringValidationAttribute]
      public string stagelist { get; set; }
      [StringValidationAttribute]
      public string takenby { get; set; }
      [StringValidationAttribute]
      public string doonlyflag { get; set; }
      [StringValidationAttribute]
      public string frtoutreqonlyfl { get; set; }
      [StringValidationAttribute]
      public string trackerno { get; set; }
      public DateTime? fromentered { get; set; }
      public DateTime? frompromised { get; set; }
      public DateTime? fromreqship { get; set; }
      public DateTime? fromshipped { get; set; }
      public DateTime? frominvoiced { get; set; }
      public DateTime? fromccsubmitd { get; set; }
      public DateTime? toentered { get; set; }
      public DateTime? topromised { get; set; }
      public DateTime? toreqship { get; set; }
      public DateTime? toshipped { get; set; }
      public DateTime? toinvoiced { get; set; }
      public DateTime? toccsubmitd { get; set; }
      [StringValidationAttribute]
      public string orderdisp { get; set; }
      [StringValidationAttribute]
      public string wtbilled { get; set; }
      [StringValidationAttribute]
      public string customfield { get; set; }
      public int recordlimit { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      public bool susponlyfl { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string saleswhse { get; set; }
      [StringValidationAttribute]
      public string fulfillmentordty { get; set; }
      [StringValidationAttribute]
      public string fulfillmenttiedty { get; set; }
      [StringValidationAttribute]
      public string lspinvregstatus { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeiohdrlistcriteria BuildOeiohdrlistcriteriaFromRow(DataRow row)
      {
         Oeiohdrlistcriteria entity = new Oeiohdrlistcriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.transtypelist = row.IsNull("transtypelist") ? string.Empty : row.Field<string>("transtypelist");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.stagelist = row.IsNull("stagelist") ? string.Empty : row.Field<string>("stagelist");
         entity.takenby = row.IsNull("takenby") ? string.Empty : row.Field<string>("takenby");
         entity.doonlyflag = row.IsNull("doonlyflag") ? string.Empty : row.Field<string>("doonlyflag");
         entity.frtoutreqonlyfl = row.IsNull("frtoutreqonlyfl") ? string.Empty : row.Field<string>("frtoutreqonlyfl");
         entity.trackerno = row.IsNull("trackerno") ? string.Empty : row.Field<string>("trackerno");
         entity.fromentered = row.Field<DateTime?>("fromentered");
         entity.frompromised = row.Field<DateTime?>("frompromised");
         entity.fromreqship = row.Field<DateTime?>("fromreqship");
         entity.fromshipped = row.Field<DateTime?>("fromshipped");
         entity.frominvoiced = row.Field<DateTime?>("frominvoiced");
         entity.fromccsubmitd = row.Field<DateTime?>("fromccsubmitd");
         entity.toentered = row.Field<DateTime?>("toentered");
         entity.topromised = row.Field<DateTime?>("topromised");
         entity.toreqship = row.Field<DateTime?>("toreqship");
         entity.toshipped = row.Field<DateTime?>("toshipped");
         entity.toinvoiced = row.Field<DateTime?>("toinvoiced");
         entity.toccsubmitd = row.Field<DateTime?>("toccsubmitd");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.wtbilled = row.IsNull("wtbilled") ? string.Empty : row.Field<string>("wtbilled");
         entity.customfield = row.IsNull("customfield") ? string.Empty : row.Field<string>("customfield");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.susponlyfl = row.Field<bool>("susponlyfl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.saleswhse = row.IsNull("saleswhse") ? string.Empty : row.Field<string>("saleswhse");
         entity.fulfillmentordty = row.IsNull("fulfillmentordty") ? string.Empty : row.Field<string>("fulfillmentordty");
         entity.fulfillmenttiedty = row.IsNull("fulfillmenttiedty") ? string.Empty : row.Field<string>("fulfillmenttiedty");
         entity.lspinvregstatus = row.IsNull("lspinvregstatus") ? string.Empty : row.Field<string>("lspinvregstatus");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeiohdrlistcriteria(ref DataRow row, Oeiohdrlistcriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("prod", entity.prod);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("whse", entity.whse);
         row.SetField("divno", entity.divno);
         row.SetField("custpo", entity.custpo);
         row.SetField("transtypelist", entity.transtypelist);
         row.SetField("botype", entity.botype);
         row.SetField("stagelist", entity.stagelist);
         row.SetField("takenby", entity.takenby);
         row.SetField("doonlyflag", entity.doonlyflag);
         row.SetField("frtoutreqonlyfl", entity.frtoutreqonlyfl);
         row.SetField("trackerno", entity.trackerno);
         row.SetField("fromentered", entity.fromentered);
         row.SetField("frompromised", entity.frompromised);
         row.SetField("fromreqship", entity.fromreqship);
         row.SetField("fromshipped", entity.fromshipped);
         row.SetField("frominvoiced", entity.frominvoiced);
         row.SetField("fromccsubmitd", entity.fromccsubmitd);
         row.SetField("toentered", entity.toentered);
         row.SetField("topromised", entity.topromised);
         row.SetField("toreqship", entity.toreqship);
         row.SetField("toshipped", entity.toshipped);
         row.SetField("toinvoiced", entity.toinvoiced);
         row.SetField("toccsubmitd", entity.toccsubmitd);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("wtbilled", entity.wtbilled);
         row.SetField("customfield", entity.customfield);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("approvty", entity.approvty);
         row.SetField("susponlyfl", entity.susponlyfl);
         row.SetField("refer", entity.refer);
         row.SetField("saleswhse", entity.saleswhse);
         row.SetField("fulfillmentordty", entity.fulfillmentordty);
         row.SetField("fulfillmenttiedty", entity.fulfillmenttiedty);
         row.SetField("lspinvregstatus", entity.lspinvregstatus);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
