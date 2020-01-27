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

namespace Infor.Sxe.VA.Data.Models.Pdsvasplineadd
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvasplineadd.Vasplineadd")]
   public partial class Vasplineadd : ModelBase
   {
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      public int groupprodty { get; set; }
      [StringValidationAttribute]
      public string groupnm { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string arpprodline { get; set; }
      public decimal arpvendno { get; set; }
      [StringValidationAttribute]
      public string arpwhse { get; set; }
      public decimal cubes { get; set; }
      public decimal cutofflength { get; set; }
      [StringValidationAttribute]
      public string cutoffty { get; set; }
      [StringValidationAttribute]
      public string dspldesc { get; set; }
      [StringValidationAttribute]
      public string icspstatus { get; set; }
      public bool lgthcompfl { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public decimal prodcost { get; set; }
      [StringValidationAttribute]
      public string prodcostdspl { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      public bool qtybasetotfl { get; set; }
      public decimal qtyneeded { get; set; }
      public bool rushfl { get; set; }
      public decimal scrapfctr { get; set; }
      [StringValidationAttribute]
      public string sctntype { get; set; }
      public decimal stkqtyneed { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal unitconv { get; set; }
      public bool usagefl { get; set; }
      public bool vafabfl { get; set; }
      [StringValidationAttribute]
      public string vaprod { get; set; }
      [StringValidationAttribute]
      public string vawhse { get; set; }
      public int vaverno { get; set; }
      public decimal weight { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      public int leadtm { get; set; }
      public bool xrefcatflasked { get; set; }
      public bool xrefcatflanswer { get; set; }
      public bool promptedxreflookup { get; set; }
      [StringValidationAttribute]
      public string xreflookupoutprod { get; set; }
      [StringValidationAttribute]
      public string xreflookupouttype { get; set; }
      public bool createcatflasked { get; set; }
      public bool createcatflanswer { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vasplineadd BuildVasplineaddFromRow(DataRow row)
      {
         Vasplineadd entity = new Vasplineadd();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.groupprodty = row.IsNull("groupprodty") ? 0 : row.Field<int>("groupprodty");
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.arpprodline = row.IsNull("arpprodline") ? string.Empty : row.Field<string>("arpprodline");
         entity.arpvendno = row.IsNull("arpvendno") ? decimal.Zero : row.Field<decimal>("arpvendno");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.cutofflength = row.IsNull("cutofflength") ? decimal.Zero : row.Field<decimal>("cutofflength");
         entity.cutoffty = row.IsNull("cutoffty") ? string.Empty : row.Field<string>("cutoffty");
         entity.dspldesc = row.IsNull("dspldesc") ? string.Empty : row.Field<string>("dspldesc");
         entity.icspstatus = row.IsNull("icspstatus") ? string.Empty : row.Field<string>("icspstatus");
         entity.lgthcompfl = row.Field<bool>("lgthcompfl");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.prodcostdspl = row.IsNull("prodcostdspl") ? string.Empty : row.Field<string>("prodcostdspl");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.qtybasetotfl = row.Field<bool>("qtybasetotfl");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.scrapfctr = row.IsNull("scrapfctr") ? decimal.Zero : row.Field<decimal>("scrapfctr");
         entity.sctntype = row.IsNull("sctntype") ? string.Empty : row.Field<string>("sctntype");
         entity.stkqtyneed = row.IsNull("stkqtyneed") ? decimal.Zero : row.Field<decimal>("stkqtyneed");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.usagefl = row.Field<bool>("usagefl");
         entity.vafabfl = row.Field<bool>("vafabfl");
         entity.vaprod = row.IsNull("vaprod") ? string.Empty : row.Field<string>("vaprod");
         entity.vawhse = row.IsNull("vawhse") ? string.Empty : row.Field<string>("vawhse");
         entity.vaverno = row.IsNull("vaverno") ? 0 : row.Field<int>("vaverno");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.leadtm = row.IsNull("leadtm") ? 0 : row.Field<int>("leadtm");
         entity.xrefcatflasked = row.Field<bool>("xrefcatflasked");
         entity.xrefcatflanswer = row.Field<bool>("xrefcatflanswer");
         entity.promptedxreflookup = row.Field<bool>("promptedxreflookup");
         entity.xreflookupoutprod = row.IsNull("xreflookupoutprod") ? string.Empty : row.Field<string>("xreflookupoutprod");
         entity.xreflookupouttype = row.IsNull("xreflookupouttype") ? string.Empty : row.Field<string>("xreflookupouttype");
         entity.createcatflasked = row.Field<bool>("createcatflasked");
         entity.createcatflanswer = row.Field<bool>("createcatflanswer");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVasplineadd(ref DataRow row, Vasplineadd entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("groupprodty", entity.groupprodty);
         row.SetField("groupnm", entity.groupnm);
         row.SetField("whse", entity.whse);
         row.SetField("arpprodline", entity.arpprodline);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("cubes", entity.cubes);
         row.SetField("cutofflength", entity.cutofflength);
         row.SetField("cutoffty", entity.cutoffty);
         row.SetField("dspldesc", entity.dspldesc);
         row.SetField("icspstatus", entity.icspstatus);
         row.SetField("lgthcompfl", entity.lgthcompfl);
         row.SetField("lineno", entity.lineno);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("prodcostdspl", entity.prodcostdspl);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("qtybasetotfl", entity.qtybasetotfl);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("scrapfctr", entity.scrapfctr);
         row.SetField("sctntype", entity.sctntype);
         row.SetField("stkqtyneed", entity.stkqtyneed);
         row.SetField("unit", entity.unit);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("usagefl", entity.usagefl);
         row.SetField("vafabfl", entity.vafabfl);
         row.SetField("vaprod", entity.vaprod);
         row.SetField("vawhse", entity.vawhse);
         row.SetField("vaverno", entity.vaverno);
         row.SetField("weight", entity.weight);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("leadtm", entity.leadtm);
         row.SetField("xrefcatflasked", entity.xrefcatflasked);
         row.SetField("xrefcatflanswer", entity.xrefcatflanswer);
         row.SetField("promptedxreflookup", entity.promptedxreflookup);
         row.SetField("xreflookupoutprod", entity.xreflookupoutprod);
         row.SetField("xreflookupouttype", entity.xreflookupouttype);
         row.SetField("createcatflasked", entity.createcatflasked);
         row.SetField("createcatflanswer", entity.createcatflanswer);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
