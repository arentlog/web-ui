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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarreptlist
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarreptlist.Porrarreptlistresults")]
   public partial class Porrarreptlistresults : ModelBase
   {
      public int reportno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string poerahnotesfl { get; set; }
      public int totrush { get; set; }
      public int totorderpt { get; set; }
      public int totcrit { get; set; }
      public int totnpna { get; set; }
      public int totties { get; set; }
      [StringValidationAttribute]
      public string consty { get; set; }
      [StringValidationAttribute]
      public string lookupnm { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string icsdname { get; set; }
      [StringValidationAttribute]
      public string billtowhse { get; set; }
      [StringValidationAttribute]
      public string buyer { get; set; }
      public DateTime? createdt { get; set; }
      public int totlineamti { get; set; }
      public decimal totlineamtdec { get; set; }
      public int pcttarget { get; set; }
      public bool mergefl { get; set; }
      public int nolines { get; set; }
      [StringValidationAttribute]
      public string purchprio { get; set; }
      [StringValidationAttribute]
      public string pridesc { get; set; }
      public DateTime? lastpowtdt { get; set; }
      public int revcyclin { get; set; }
      public int totcubesi { get; set; }
      public int totweighti { get; set; }
      public int totqtyordi { get; set; }
      public decimal addlcarrycost { get; set; }
      public int blno { get; set; }
      public int blsuf { get; set; }
      public int totsuper { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      [StringValidationAttribute]
      public string rowidPoerah { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Porrarreptlistresults BuildPorrarreptlistresultsFromRow(DataRow row)
      {
         Porrarreptlistresults entity = new Porrarreptlistresults();
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.poerahnotesfl = row.IsNull("poerahnotesfl") ? string.Empty : row.Field<string>("poerahnotesfl");
         entity.totrush = row.IsNull("totrush") ? 0 : row.Field<int>("totrush");
         entity.totorderpt = row.IsNull("totorderpt") ? 0 : row.Field<int>("totorderpt");
         entity.totcrit = row.IsNull("totcrit") ? 0 : row.Field<int>("totcrit");
         entity.totnpna = row.IsNull("totnpna") ? 0 : row.Field<int>("totnpna");
         entity.totties = row.IsNull("totties") ? 0 : row.Field<int>("totties");
         entity.consty = row.IsNull("consty") ? string.Empty : row.Field<string>("consty");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.icsdname = row.IsNull("icsdname") ? string.Empty : row.Field<string>("icsdname");
         entity.billtowhse = row.IsNull("billtowhse") ? string.Empty : row.Field<string>("billtowhse");
         entity.buyer = row.IsNull("buyer") ? string.Empty : row.Field<string>("buyer");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.totlineamti = row.IsNull("totlineamti") ? 0 : row.Field<int>("totlineamti");
         entity.totlineamtdec = row.IsNull("totlineamtdec") ? decimal.Zero : row.Field<decimal>("totlineamtdec");
         entity.pcttarget = row.IsNull("pcttarget") ? 0 : row.Field<int>("pcttarget");
         entity.mergefl = row.Field<bool>("mergefl");
         entity.nolines = row.IsNull("nolines") ? 0 : row.Field<int>("nolines");
         entity.purchprio = row.IsNull("purchprio") ? string.Empty : row.Field<string>("purchprio");
         entity.pridesc = row.IsNull("pridesc") ? string.Empty : row.Field<string>("pridesc");
         entity.lastpowtdt = row.Field<DateTime?>("lastpowtdt");
         entity.revcyclin = row.IsNull("revcyclin") ? 0 : row.Field<int>("revcyclin");
         entity.totcubesi = row.IsNull("totcubesi") ? 0 : row.Field<int>("totcubesi");
         entity.totweighti = row.IsNull("totweighti") ? 0 : row.Field<int>("totweighti");
         entity.totqtyordi = row.IsNull("totqtyordi") ? 0 : row.Field<int>("totqtyordi");
         entity.addlcarrycost = row.IsNull("addlcarrycost") ? decimal.Zero : row.Field<decimal>("addlcarrycost");
         entity.blno = row.IsNull("blno") ? 0 : row.Field<int>("blno");
         entity.blsuf = row.IsNull("blsuf") ? 0 : row.Field<int>("blsuf");
         entity.totsuper = row.IsNull("totsuper") ? 0 : row.Field<int>("totsuper");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.rowidPoerah = row.Field<byte[]>("rowid-poerah").ToStringEncoded();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarreptlistresults(ref DataRow row, Porrarreptlistresults entity)
      {
         row.SetField("reportno", entity.reportno);
         row.SetField("vendno", entity.vendno);
         row.SetField("poerahnotesfl", entity.poerahnotesfl);
         row.SetField("totrush", entity.totrush);
         row.SetField("totorderpt", entity.totorderpt);
         row.SetField("totcrit", entity.totcrit);
         row.SetField("totnpna", entity.totnpna);
         row.SetField("totties", entity.totties);
         row.SetField("consty", entity.consty);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("prodline", entity.prodline);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("whse", entity.whse);
         row.SetField("icsdname", entity.icsdname);
         row.SetField("billtowhse", entity.billtowhse);
         row.SetField("buyer", entity.buyer);
         row.SetField("createdt", entity.createdt);
         row.SetField("totlineamti", entity.totlineamti);
         row.SetField("totlineamtdec", entity.totlineamtdec);
         row.SetField("pcttarget", entity.pcttarget);
         row.SetField("mergefl", entity.mergefl);
         row.SetField("nolines", entity.nolines);
         row.SetField("purchprio", entity.purchprio);
         row.SetField("pridesc", entity.pridesc);
         row.SetField("lastpowtdt", entity.lastpowtdt);
         row.SetField("revcyclin", entity.revcyclin);
         row.SetField("totcubesi", entity.totcubesi);
         row.SetField("totweighti", entity.totweighti);
         row.SetField("totqtyordi", entity.totqtyordi);
         row.SetField("addlcarrycost", entity.addlcarrycost);
         row.SetField("blno", entity.blno);
         row.SetField("blsuf", entity.blsuf);
         row.SetField("totsuper", entity.totsuper);
         row.SetField("contractno", entity.contractno);
         row.SetField("rowid-poerah", entity.rowidPoerah.ToByteArray());
         row.SetField("seqno", entity.seqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
