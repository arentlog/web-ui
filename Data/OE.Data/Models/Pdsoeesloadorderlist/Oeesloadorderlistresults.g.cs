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

namespace Infor.Sxe.OE.Data.Models.Pdsoeesloadorderlist
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeesloadorderlist.Oeesloadorderlistresults")]
   public partial class Oeesloadorderlistresults : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ordernox { get; set; }
      [StringValidationAttribute]
      public string oeehrowid { get; set; }
      [StringValidationAttribute]
      public string arscrowid { get; set; }
      [StringValidationAttribute]
      public string arssrowid { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdx { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public DateTime? printdt { get; set; }
      public DateTime? createdt { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnox { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string pickinit { get; set; }
      [StringValidationAttribute]
      public string route { get; set; }
      [StringValidationAttribute]
      public string oehdrshipto { get; set; }
      [StringValidationAttribute]
      public string cOeehNotesFl { get; set; }
      [StringValidationAttribute]
      public string cArscNotesfl { get; set; }
      [StringValidationAttribute]
      public string cArssNotesfl { get; set; }
      [StringValidationAttribute]
      public string shipviadesc { get; set; }
      [StringValidationAttribute]
      public string shiptocity { get; set; }
      [StringValidationAttribute]
      public string shiptost { get; set; }
      public decimal totweight { get; set; }
      public decimal totcube { get; set; }
      [StringValidationAttribute]
      public string dsplorderdisp { get; set; }
      public DateTime? reqshipdt { get; set; }
      public DateTime? promisedt { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public DateTime? sortdt1 { get; set; }
      public DateTime? sortdt2 { get; set; }
      [StringValidationAttribute]
      public string sortfld { get; set; }
      public int amounti { get; set; }
      public decimal amount { get; set; }
      public bool packagesexist { get; set; }
      [StringValidationAttribute]
      public string custselltype { get; set; }
      public bool isfullytendered { get; set; }
      public bool issignaturerequired { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeesloadorderlistresults BuildOeesloadorderlistresultsFromRow(DataRow row)
      {
         Oeesloadorderlistresults entity = new Oeesloadorderlistresults();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ordernox = row.IsNull("ordernox") ? string.Empty : row.Field<string>("ordernox");
         entity.oeehrowid = row.Field<byte[]>("oeehrowid").ToStringEncoded();
         entity.arscrowid = row.Field<byte[]>("arscrowid").ToStringEncoded();
         entity.arssrowid = row.Field<byte[]>("arssrowid").ToStringEncoded();
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdx = row.IsNull("stagecdx") ? string.Empty : row.Field<string>("stagecdx");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.printdt = row.Field<DateTime?>("printdt");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnox = row.IsNull("custnox") ? string.Empty : row.Field<string>("custnox");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.pickinit = row.IsNull("pickinit") ? string.Empty : row.Field<string>("pickinit");
         entity.route = row.IsNull("route") ? string.Empty : row.Field<string>("route");
         entity.oehdrshipto = row.IsNull("oehdrshipto") ? string.Empty : row.Field<string>("oehdrshipto");
         entity.cOeehNotesFl = row.IsNull("cOeehNotesFl") ? string.Empty : row.Field<string>("cOeehNotesFl");
         entity.cArscNotesfl = row.IsNull("cArscNotesfl") ? string.Empty : row.Field<string>("cArscNotesfl");
         entity.cArssNotesfl = row.IsNull("cArssNotesfl") ? string.Empty : row.Field<string>("cArssNotesfl");
         entity.shipviadesc = row.IsNull("shipviadesc") ? string.Empty : row.Field<string>("shipviadesc");
         entity.shiptocity = row.IsNull("shiptocity") ? string.Empty : row.Field<string>("shiptocity");
         entity.shiptost = row.IsNull("shiptost") ? string.Empty : row.Field<string>("shiptost");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.totcube = row.IsNull("totcube") ? decimal.Zero : row.Field<decimal>("totcube");
         entity.dsplorderdisp = row.IsNull("dsplorderdisp") ? string.Empty : row.Field<string>("dsplorderdisp");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.sortdt1 = row.Field<DateTime?>("sortdt1");
         entity.sortdt2 = row.Field<DateTime?>("sortdt2");
         entity.sortfld = row.IsNull("sortfld") ? string.Empty : row.Field<string>("sortfld");
         entity.amounti = row.IsNull("amounti") ? 0 : row.Field<int>("amounti");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.packagesexist = row.Field<bool>("packagesexist");
         entity.custselltype = row.IsNull("custselltype") ? string.Empty : row.Field<string>("custselltype");
         entity.isfullytendered = row.Field<bool>("isfullytendered");
         entity.issignaturerequired = row.Field<bool>("issignaturerequired");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeesloadorderlistresults(ref DataRow row, Oeesloadorderlistresults entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ordernox", entity.ordernox);
         row.SetField("oeehrowid", entity.oeehrowid.ToByteArray());
         row.SetField("arscrowid", entity.arscrowid.ToByteArray());
         row.SetField("arssrowid", entity.arssrowid.ToByteArray());
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdx", entity.stagecdx);
         row.SetField("transtype", entity.transtype);
         row.SetField("printdt", entity.printdt);
         row.SetField("createdt", entity.createdt);
         row.SetField("custno", entity.custno);
         row.SetField("custnox", entity.custnox);
         row.SetField("shipto", entity.shipto);
         row.SetField("name", entity.name);
         row.SetField("whse", entity.whse);
         row.SetField("pickinit", entity.pickinit);
         row.SetField("route", entity.route);
         row.SetField("oehdrshipto", entity.oehdrshipto);
         row.SetField("cOeehNotesFl", entity.cOeehNotesFl);
         row.SetField("cArscNotesfl", entity.cArscNotesfl);
         row.SetField("cArssNotesfl", entity.cArssNotesfl);
         row.SetField("shipviadesc", entity.shipviadesc);
         row.SetField("shiptocity", entity.shiptocity);
         row.SetField("shiptost", entity.shiptost);
         row.SetField("totweight", entity.totweight);
         row.SetField("totcube", entity.totcube);
         row.SetField("dsplorderdisp", entity.dsplorderdisp);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("refer", entity.refer);
         row.SetField("sortdt1", entity.sortdt1);
         row.SetField("sortdt2", entity.sortdt2);
         row.SetField("sortfld", entity.sortfld);
         row.SetField("amounti", entity.amounti);
         row.SetField("amount", entity.amount);
         row.SetField("packagesexist", entity.packagesexist);
         row.SetField("custselltype", entity.custselltype);
         row.SetField("isfullytendered", entity.isfullytendered);
         row.SetField("issignaturerequired", entity.issignaturerequired);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591