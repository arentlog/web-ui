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

namespace Infor.Sxe.OE.Data.Models.Pdsloadtcomps
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsloadtcomps.Loadtcompsresults")]
   public partial class Loadtcompsresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string addty { get; set; }
      [StringValidationAttribute]
      public string arpprodline { get; set; }
      public decimal arpvendno { get; set; }
      [StringValidationAttribute]
      public string arpwhse { get; set; }
      public int brseqno { get; set; }
      public bool cataddfl { get; set; }
      [StringValidationAttribute]
      public string compboty { get; set; }
      [StringValidationAttribute]
      public string comptype { get; set; }
      public bool delayresrvfl { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public bool fromoeelk { get; set; }
      [StringValidationAttribute]
      public string groupname { get; set; }
      public int grpqty { get; set; }
      [StringValidationAttribute]
      public string instructions { get; set; }
      public int leadtm { get; set; }
      public int lineno { get; set; }
      public bool nsokfl { get; set; }
      public bool wmfl { get; set; }
      public decimal wmqtyship { get; set; }
      public long oeelkrecid { get; set; }
      [StringValidationAttribute]
      public string oeelkrowid { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ordtype { get; set; }
      [StringValidationAttribute]
      public string ourproc { get; set; }
      public bool ovshipfl { get; set; }
      public decimal price { get; set; }
      public bool pricefl { get; set; }
      [StringValidationAttribute]
      public string pricetype { get; set; }
      public bool printfl { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public decimal prodcost { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal qtyavail { get; set; }
      public decimal qtyneeded { get; set; }
      public decimal qtyreservd { get; set; }
      public decimal qtyship { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public bool reqfl { get; set; }
      public bool returnfl { get; set; }
      public int seqbef { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string serlottype { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string specnstype { get; set; }
      public bool subfl { get; set; }
      public decimal totneeded { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal unitconv { get; set; }
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
      public bool variablefl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool xreffl { get; set; }
      [StringValidationAttribute]
      public string newprodname { get; set; }
      [StringValidationAttribute]
      public string wlpicktype { get; set; }
      public bool costoverfl { get; set; }
      public bool cfgcompfl { get; set; }
      public decimal qtyshort { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string prodname { get; set; }
      [StringValidationAttribute]
      public string prodnotes { get; set; }
      [StringValidationAttribute]
      public string specnstypedesc { get; set; }
      [StringValidationAttribute]
      public string serlottypedesc { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string orderalttype { get; set; }
      public int orderaltno { get; set; }
      public int linealtno { get; set; }
      public bool sourcingenabled { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadtcompsresults BuildLoadtcompsresultsFromRow(DataRow row)
      {
         Loadtcompsresults entity = new Loadtcompsresults();
         entity.addty = row.IsNull("addty") ? string.Empty : row.Field<string>("addty");
         entity.arpprodline = row.IsNull("arpprodline") ? string.Empty : row.Field<string>("arpprodline");
         entity.arpvendno = row.IsNull("arpvendno") ? decimal.Zero : row.Field<decimal>("arpvendno");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.brseqno = row.IsNull("brseqno") ? 0 : row.Field<int>("brseqno");
         entity.cataddfl = row.Field<bool>("cataddfl");
         entity.compboty = row.IsNull("compboty") ? string.Empty : row.Field<string>("compboty");
         entity.comptype = row.IsNull("comptype") ? string.Empty : row.Field<string>("comptype");
         entity.delayresrvfl = row.Field<bool>("delayresrvfl");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.fromoeelk = row.Field<bool>("fromoeelk");
         entity.groupname = row.IsNull("groupname") ? string.Empty : row.Field<string>("groupname");
         entity.grpqty = row.IsNull("grpqty") ? 0 : row.Field<int>("grpqty");
         entity.instructions = row.IsNull("instructions") ? string.Empty : row.Field<string>("instructions");
         entity.leadtm = row.IsNull("leadtm") ? 0 : row.Field<int>("leadtm");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.nsokfl = row.Field<bool>("nsokfl");
         entity.wmfl = row.Field<bool>("wmfl");
         entity.wmqtyship = row.IsNull("wmqtyship") ? decimal.Zero : row.Field<decimal>("wmqtyship");
         entity.oeelkrecid = row.IsNull("oeelkrecid") ? 0 : row.Field<long>("oeelkrecid");
         entity.oeelkrowid = row.Field<byte[]>("oeelkrowid").ToStringEncoded();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ordtype = row.IsNull("ordtype") ? string.Empty : row.Field<string>("ordtype");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.ovshipfl = row.Field<bool>("ovshipfl");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.pricefl = row.Field<bool>("pricefl");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.printfl = row.Field<bool>("printfl");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.qtyavail = row.IsNull("qtyavail") ? decimal.Zero : row.Field<decimal>("qtyavail");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.qtyreservd = row.IsNull("qtyreservd") ? decimal.Zero : row.Field<decimal>("qtyreservd");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.reqfl = row.Field<bool>("reqfl");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.seqbef = row.IsNull("seqbef") ? 0 : row.Field<int>("seqbef");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.specnstype = row.IsNull("specnstype") ? string.Empty : row.Field<string>("specnstype");
         entity.subfl = row.Field<bool>("subfl");
         entity.totneeded = row.IsNull("totneeded") ? decimal.Zero : row.Field<decimal>("totneeded");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.variablefl = row.Field<bool>("variablefl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.xreffl = row.Field<bool>("xreffl");
         entity.newprodname = row.IsNull("newprodname") ? string.Empty : row.Field<string>("newprodname");
         entity.wlpicktype = row.IsNull("wlpicktype") ? string.Empty : row.Field<string>("wlpicktype");
         entity.costoverfl = row.Field<bool>("costoverfl");
         entity.cfgcompfl = row.Field<bool>("cfgcompfl");
         entity.qtyshort = row.IsNull("qtyshort") ? decimal.Zero : row.Field<decimal>("qtyshort");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.prodname = row.IsNull("prodname") ? string.Empty : row.Field<string>("prodname");
         entity.prodnotes = row.IsNull("prodnotes") ? string.Empty : row.Field<string>("prodnotes");
         entity.specnstypedesc = row.IsNull("specnstypedesc") ? string.Empty : row.Field<string>("specnstypedesc");
         entity.serlottypedesc = row.IsNull("serlottypedesc") ? string.Empty : row.Field<string>("serlottypedesc");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.orderalttype = row.IsNull("orderalttype") ? string.Empty : row.Field<string>("orderalttype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.linealtno = row.IsNull("linealtno") ? 0 : row.Field<int>("linealtno");
         entity.sourcingenabled = row.Field<bool>("sourcingenabled");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadtcompsresults(ref DataRow row, Loadtcompsresults entity)
      {
         row.SetField("addty", entity.addty);
         row.SetField("arpprodline", entity.arpprodline);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("brseqno", entity.brseqno);
         row.SetField("cataddfl", entity.cataddfl);
         row.SetField("compboty", entity.compboty);
         row.SetField("comptype", entity.comptype);
         row.SetField("delayresrvfl", entity.delayresrvfl);
         row.SetField("descrip", entity.descrip);
         row.SetField("fromoeelk", entity.fromoeelk);
         row.SetField("groupname", entity.groupname);
         row.SetField("grpqty", entity.grpqty);
         row.SetField("instructions", entity.instructions);
         row.SetField("leadtm", entity.leadtm);
         row.SetField("lineno", entity.lineno);
         row.SetField("nsokfl", entity.nsokfl);
         row.SetField("wmfl", entity.wmfl);
         row.SetField("wmqtyship", entity.wmqtyship);
         row.SetField("oeelkrecid", entity.oeelkrecid);
         row.SetField("oeelkrowid", entity.oeelkrowid.ToByteArray());
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ordtype", entity.ordtype);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("ovshipfl", entity.ovshipfl);
         row.SetField("price", entity.price);
         row.SetField("pricefl", entity.pricefl);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("printfl", entity.printfl);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("qtyavail", entity.qtyavail);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("qtyreservd", entity.qtyreservd);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("refer", entity.refer);
         row.SetField("reqfl", entity.reqfl);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("seqbef", entity.seqbef);
         row.SetField("seqno", entity.seqno);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("specnstype", entity.specnstype);
         row.SetField("subfl", entity.subfl);
         row.SetField("totneeded", entity.totneeded);
         row.SetField("unit", entity.unit);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("variablefl", entity.variablefl);
         row.SetField("whse", entity.whse);
         row.SetField("xreffl", entity.xreffl);
         row.SetField("newprodname", entity.newprodname);
         row.SetField("wlpicktype", entity.wlpicktype);
         row.SetField("costoverfl", entity.costoverfl);
         row.SetField("cfgcompfl", entity.cfgcompfl);
         row.SetField("qtyshort", entity.qtyshort);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("prodname", entity.prodname);
         row.SetField("prodnotes", entity.prodnotes);
         row.SetField("specnstypedesc", entity.specnstypedesc);
         row.SetField("serlottypedesc", entity.serlottypedesc);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("orderalttype", entity.orderalttype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("linealtno", entity.linealtno);
         row.SetField("sourcingenabled", entity.sourcingenabled);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
