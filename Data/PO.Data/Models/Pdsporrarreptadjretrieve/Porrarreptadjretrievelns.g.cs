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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarreptadjretrieve
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarreptadjretrieve.Porrarreptadjretrievelns")]
   public partial class Porrarreptadjretrievelns : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string accepttype { get; set; }
      public decimal addlcarrycost { get; set; }
      public bool belowopfl { get; set; }
      public int blno { get; set; }
      public int blsuf { get; set; }
      public bool commentfl { get; set; }
      [StringValidationAttribute]
      public string companyrank { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      public bool criticalfl { get; set; }
      public decimal cubes { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string esrqstid { get; set; }
      [StringValidationAttribute]
      public string famgrptype { get; set; }
      public int icspecrecno { get; set; }
      public bool ignoreltfl { get; set; }
      public int linealtno { get; set; }
      public int lineno { get; set; }
      public bool lockfl { get; set; }
      public decimal netamt { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      public bool npnafl { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public decimal orignetamt { get; set; }
      public int pdsvcrecno { get; set; }
      public bool pdsvfl { get; set; }
      public decimal price { get; set; }
      public bool priceoverfl { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtysurplus { get; set; }
      public int reportno { get; set; }
      public int reportpri { get; set; }
      public DateTime? reqshipdt { get; set; }
      [StringValidationAttribute]
      public string rpterr { get; set; }
      public bool rushfl { get; set; }
      [StringValidationAttribute]
      public string seasontype { get; set; }
      public int seqaltno { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      public decimal stkqtyord { get; set; }
      public bool superfl { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transproc { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal unitconv { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user10 { get; set; }
      [StringValidationAttribute]
      public string user11 { get; set; }
      [StringValidationAttribute]
      public string user12 { get; set; }
      [StringValidationAttribute]
      public string user13 { get; set; }
      [StringValidationAttribute]
      public string user14 { get; set; }
      [StringValidationAttribute]
      public string user15 { get; set; }
      [StringValidationAttribute]
      public string user16 { get; set; }
      [StringValidationAttribute]
      public string user17 { get; set; }
      [StringValidationAttribute]
      public string user18 { get; set; }
      [StringValidationAttribute]
      public string user19 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user20 { get; set; }
      [StringValidationAttribute]
      public string user21 { get; set; }
      [StringValidationAttribute]
      public string user22 { get; set; }
      [StringValidationAttribute]
      public string user23 { get; set; }
      [StringValidationAttribute]
      public string user24 { get; set; }
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
      public bool vendfl { get; set; }
      public decimal weight { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string whserank { get; set; }
      public int wtcono { get; set; }


      public static Porrarreptadjretrievelns BuildPorrarreptadjretrievelnsFromRow(DataRow row)
      {
         Porrarreptadjretrievelns entity = new Porrarreptadjretrievelns();
         entity.accepttype = row.IsNull("accepttype") ? string.Empty : row.Field<string>("accepttype");
         entity.addlcarrycost = row.IsNull("addlcarrycost") ? decimal.Zero : row.Field<decimal>("addlcarrycost");
         entity.belowopfl = row.Field<bool>("belowopfl");
         entity.blno = row.IsNull("blno") ? 0 : row.Field<int>("blno");
         entity.blsuf = row.IsNull("blsuf") ? 0 : row.Field<int>("blsuf");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.companyrank = row.IsNull("companyrank") ? string.Empty : row.Field<string>("companyrank");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.criticalfl = row.Field<bool>("criticalfl");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.esrqstid = row.IsNull("esrqstid") ? string.Empty : row.Field<string>("esrqstid");
         entity.famgrptype = row.IsNull("famgrptype") ? string.Empty : row.Field<string>("famgrptype");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.linealtno = row.IsNull("linealtno") ? 0 : row.Field<int>("linealtno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.lockfl = row.Field<bool>("lockfl");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.npnafl = row.Field<bool>("npnafl");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orignetamt = row.IsNull("orignetamt") ? decimal.Zero : row.Field<decimal>("orignetamt");
         entity.pdsvcrecno = row.IsNull("pdsvcrecno") ? 0 : row.Field<int>("pdsvcrecno");
         entity.pdsvfl = row.Field<bool>("pdsvfl");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.priceoverfl = row.Field<bool>("priceoverfl");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtysurplus = row.IsNull("qtysurplus") ? decimal.Zero : row.Field<decimal>("qtysurplus");
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.reportpri = row.IsNull("reportpri") ? 0 : row.Field<int>("reportpri");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.rpterr = row.IsNull("rpterr") ? string.Empty : row.Field<string>("rpterr");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.seasontype = row.IsNull("seasontype") ? string.Empty : row.Field<string>("seasontype");
         entity.seqaltno = row.IsNull("seqaltno") ? 0 : row.Field<int>("seqaltno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.superfl = row.Field<bool>("superfl");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user10 = row.IsNull("user10") ? string.Empty : row.Field<string>("user10");
         entity.user11 = row.IsNull("user11") ? string.Empty : row.Field<string>("user11");
         entity.user12 = row.IsNull("user12") ? string.Empty : row.Field<string>("user12");
         entity.user13 = row.IsNull("user13") ? string.Empty : row.Field<string>("user13");
         entity.user14 = row.IsNull("user14") ? string.Empty : row.Field<string>("user14");
         entity.user15 = row.IsNull("user15") ? string.Empty : row.Field<string>("user15");
         entity.user16 = row.IsNull("user16") ? string.Empty : row.Field<string>("user16");
         entity.user17 = row.IsNull("user17") ? string.Empty : row.Field<string>("user17");
         entity.user18 = row.IsNull("user18") ? string.Empty : row.Field<string>("user18");
         entity.user19 = row.IsNull("user19") ? string.Empty : row.Field<string>("user19");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user20 = row.IsNull("user20") ? string.Empty : row.Field<string>("user20");
         entity.user21 = row.IsNull("user21") ? string.Empty : row.Field<string>("user21");
         entity.user22 = row.IsNull("user22") ? string.Empty : row.Field<string>("user22");
         entity.user23 = row.IsNull("user23") ? string.Empty : row.Field<string>("user23");
         entity.user24 = row.IsNull("user24") ? string.Empty : row.Field<string>("user24");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.vendfl = row.Field<bool>("vendfl");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.whserank = row.IsNull("whserank") ? string.Empty : row.Field<string>("whserank");
         entity.wtcono = row.IsNull("wtcono") ? 0 : row.Field<int>("wtcono");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarreptadjretrievelns(ref DataRow row, Porrarreptadjretrievelns entity)
      {
         row.SetField("accepttype", entity.accepttype);
         row.SetField("addlcarrycost", entity.addlcarrycost);
         row.SetField("belowopfl", entity.belowopfl);
         row.SetField("blno", entity.blno);
         row.SetField("blsuf", entity.blsuf);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("companyrank", entity.companyrank);
         row.SetField("cono", entity.cono);
         row.SetField("contractno", entity.contractno);
         row.SetField("criticalfl", entity.criticalfl);
         row.SetField("cubes", entity.cubes);
         row.SetField("duedt", entity.duedt);
         row.SetField("esrqstid", entity.esrqstid);
         row.SetField("famgrptype", entity.famgrptype);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("linealtno", entity.linealtno);
         row.SetField("lineno", entity.lineno);
         row.SetField("lockfl", entity.lockfl);
         row.SetField("netamt", entity.netamt);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("npnafl", entity.npnafl);
         row.SetField("operinit", entity.operinit);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orignetamt", entity.orignetamt);
         row.SetField("pdsvcrecno", entity.pdsvcrecno);
         row.SetField("pdsvfl", entity.pdsvfl);
         row.SetField("price", entity.price);
         row.SetField("priceoverfl", entity.priceoverfl);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtysurplus", entity.qtysurplus);
         row.SetField("reportno", entity.reportno);
         row.SetField("reportpri", entity.reportpri);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("rpterr", entity.rpterr);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("seasontype", entity.seasontype);
         row.SetField("seqaltno", entity.seqaltno);
         row.SetField("seqno", entity.seqno);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("superfl", entity.superfl);
         row.SetField("transdt", entity.transdt);
         row.SetField("transproc", entity.transproc);
         row.SetField("transtm", entity.transtm);
         row.SetField("unit", entity.unit);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("user1", entity.user1);
         row.SetField("user10", entity.user10);
         row.SetField("user11", entity.user11);
         row.SetField("user12", entity.user12);
         row.SetField("user13", entity.user13);
         row.SetField("user14", entity.user14);
         row.SetField("user15", entity.user15);
         row.SetField("user16", entity.user16);
         row.SetField("user17", entity.user17);
         row.SetField("user18", entity.user18);
         row.SetField("user19", entity.user19);
         row.SetField("user2", entity.user2);
         row.SetField("user20", entity.user20);
         row.SetField("user21", entity.user21);
         row.SetField("user22", entity.user22);
         row.SetField("user23", entity.user23);
         row.SetField("user24", entity.user24);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("vendfl", entity.vendfl);
         row.SetField("weight", entity.weight);
         row.SetField("whse", entity.whse);
         row.SetField("whserank", entity.whserank);
         row.SetField("wtcono", entity.wtcono);

      }
   
   }
}
#pragma warning restore 1591
