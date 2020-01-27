//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
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
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.PV
{
   /// <summary>
   /// Product Shopping List
   /// </summary>
   
   public partial class PvShoplistBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string oper2 { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [StringValidationAttribute]
      public string dsplprod { get; set; }

      /// <summary>
      /// Add SW Optional Product
      /// </summary>
      public bool addswoptprodfl { get; set; }

      /// <summary>
      /// Change For This Line
      /// </summary>
      [StringValidationAttribute]
      public string chrg { get; set; }

      /// <summary>
      /// Cubes
      /// </summary>
      public decimal cubes { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip { get; set; }

      /// <summary>
      /// Description 2
      /// </summary>
      [StringValidationAttribute]
      public string descrip2 { get; set; }

      /// <summary>
      /// Spec Rec Link
      /// </summary>
      public int icspecrecno { get; set; }

      /// <summary>
      /// Special Price/Cost
      /// </summary>
      [StringValidationAttribute]
      public string speccostty { get; set; }

      /// <summary>
      /// Price/Cost Units Per Stk Unit
      /// </summary>
      public decimal csunperstk { get; set; }

      /// <summary>
      /// Special Price/Cost Unit
      /// </summary>
      [StringValidationAttribute]
      public string prccostper { get; set; }

      /// <summary>
      /// Discount
      /// </summary>
      public decimal discamt { get; set; }

      /// <summary>
      /// Disc Over
      /// </summary>
      public bool discoverfl { get; set; }

      /// <summary>
      /// Discount Type
      /// </summary>
      public bool disctype { get; set; }

      /// <summary>
      /// Extra 1
      /// </summary>
      [StringValidationAttribute]
      public string extra1 { get; set; }

      /// <summary>
      /// Extra 2
      /// </summary>
      [StringValidationAttribute]
      public string extra2 { get; set; }

      /// <summary>
      /// Last Purchase
      /// </summary>
      public DateTime? lastpurdt { get; set; }

      /// <summary>
      /// Last Price
      /// </summary>
      public decimal lastprice { get; set; }

      /// <summary>
      /// Lookup Name
      /// </summary>
      [StringValidationAttribute]
      public string lookupnm { get; set; }

      /// <summary>
      /// Margin Amount
      /// </summary>
      public decimal marginamt { get; set; }

      /// <summary>
      /// Margin %
      /// </summary>
      public decimal marginpct { get; set; }

      /// <summary>
      /// Net Ord
      /// </summary>
      public decimal netord { get; set; }

      /// <summary>
      /// Net Recommended
      /// </summary>
      public decimal netrecommend { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// PD Rec #
      /// </summary>
      public int pdrecno { get; set; }

      /// <summary>
      /// PDSV Flag
      /// </summary>
      public bool pdsvfl { get; set; }

      /// <summary>
      /// ARP Line
      /// </summary>
      [StringValidationAttribute]
      public string arpprodline { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public decimal price { get; set; }

      /// <summary>
      /// Price Over
      /// </summary>
      public bool priceoverfl { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// Qty Available
      /// </summary>
      public decimal qtyavail { get; set; }

      /// <summary>
      /// Qty Brk On
      /// </summary>
      [StringValidationAttribute]
      public string qtybreakty { get; set; }

      /// <summary>
      /// Ordered
      /// </summary>
      public decimal qtyord { get; set; }

      /// <summary>
      /// Qty Recommended
      /// </summary>
      public decimal qtyrecommend { get; set; }

      /// <summary>
      /// seasontype
      /// </summary>
      [StringValidationAttribute]
      public string seasontype { get; set; }

      /// <summary>
      /// Spec/NS
      /// </summary>
      [StringValidationAttribute]
      public string specnstype { get; set; }

      /// <summary>
      /// Special Conversion
      /// </summary>
      public decimal specconv { get; set; }

      /// <summary>
      /// Status Message
      /// </summary>
      [StringValidationAttribute]
      public string statmessage { get; set; }

      /// <summary>
      /// Stk Qty Ord
      /// </summary>
      public decimal stkqtyord { get; set; }

      /// <summary>
      /// Stk Qty Recommend
      /// </summary>
      public decimal stkqtyrecommend { get; set; }

      /// <summary>
      /// Total Stk Qty
      /// </summary>
      public decimal totalstkqty { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// # Stk Units
      /// </summary>
      public decimal unitconv { get; set; }

      /// <summary>
      /// Weight
      /// </summary>
      public decimal weight { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Sequence #
      /// </summary>
      public int seqno { get; set; }

      /// <summary>
      /// Optional Words
      /// </summary>
      [StringValidationAttribute]
      public string optionalwords { get; set; }

      /// <summary>
      /// ARP Vendor #
      /// </summary>
      public decimal arpvendno { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// user6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// user7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Contract #
      /// </summary>
      [StringValidationAttribute]
      public string contractno { get; set; }

      /// <summary>
      /// PDSVC #
      /// </summary>
      public int pdsvcrecno { get; set; }

      /// <summary>
      /// Qty Available
      /// </summary>
      [StringValidationAttribute]
      public string dsplqtyavail { get; set; }

      /// <summary>
      /// Reservation Found
      /// </summary>
      public bool custreservefoundfl { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPvShoplistBaseFromRow<T>(DataRow row) where T:PvShoplistBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.oper2 = row.IsNull("oper2") ? string.Empty : row.Field<string>("oper2");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.dsplprod = row.IsNull("dsplprod") ? string.Empty : row.Field<string>("dsplprod");
         entity.addswoptprodfl = row.Field<bool>("addswoptprodfl");
         entity.chrg = row.IsNull("chrg") ? string.Empty : row.Field<string>("chrg");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.discamt = row.IsNull("discamt") ? decimal.Zero : row.Field<decimal>("discamt");
         entity.discoverfl = row.Field<bool>("discoverfl");
         entity.disctype = row.Field<bool>("disctype");
         entity.extra1 = row.IsNull("extra-1") ? string.Empty : row.Field<string>("extra-1");
         entity.extra2 = row.IsNull("extra-2") ? string.Empty : row.Field<string>("extra-2");
         entity.lastpurdt = row.Field<DateTime?>("lastpurdt");
         entity.lastprice = row.IsNull("lastprice") ? decimal.Zero : row.Field<decimal>("lastprice");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.marginamt = row.IsNull("marginamt") ? decimal.Zero : row.Field<decimal>("marginamt");
         entity.marginpct = row.IsNull("marginpct") ? decimal.Zero : row.Field<decimal>("marginpct");
         entity.netord = row.IsNull("netord") ? decimal.Zero : row.Field<decimal>("netord");
         entity.netrecommend = row.IsNull("netrecommend") ? decimal.Zero : row.Field<decimal>("netrecommend");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.pdrecno = row.IsNull("pdrecno") ? 0 : row.Field<int>("pdrecno");
         entity.pdsvfl = row.Field<bool>("pdsvfl");
         entity.arpprodline = row.IsNull("arpprodline") ? string.Empty : row.Field<string>("arpprodline");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.priceoverfl = row.Field<bool>("priceoverfl");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.qtyavail = row.IsNull("qtyavail") ? decimal.Zero : row.Field<decimal>("qtyavail");
         entity.qtybreakty = row.IsNull("qtybreakty") ? string.Empty : row.Field<string>("qtybreakty");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyrecommend = row.IsNull("qtyrecommend") ? decimal.Zero : row.Field<decimal>("qtyrecommend");
         entity.seasontype = row.IsNull("seasontype") ? string.Empty : row.Field<string>("seasontype");
         entity.specnstype = row.IsNull("specnstype") ? string.Empty : row.Field<string>("specnstype");
         entity.specconv = row.IsNull("specconv") ? decimal.Zero : row.Field<decimal>("specconv");
         entity.statmessage = row.IsNull("statmessage") ? string.Empty : row.Field<string>("statmessage");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.stkqtyrecommend = row.IsNull("stkqtyrecommend") ? decimal.Zero : row.Field<decimal>("stkqtyrecommend");
         entity.totalstkqty = row.IsNull("totalstkqty") ? decimal.Zero : row.Field<decimal>("totalstkqty");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.optionalwords = row.IsNull("optionalwords") ? string.Empty : row.Field<string>("optionalwords");
         entity.arpvendno = row.IsNull("arpvendno") ? decimal.Zero : row.Field<decimal>("arpvendno");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.pdsvcrecno = row.IsNull("pdsvcrecno") ? 0 : row.Field<int>("pdsvcrecno");
         entity.dsplqtyavail = row.IsNull("dsplqtyavail") ? string.Empty : row.Field<string>("dsplqtyavail");
         entity.custreservefoundfl = row.Field<bool>("custreservefoundfl");
         entity.rowID = row.Field<byte[]>("pv_shoplistRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPvShoplistBase(ref DataRow row, PvShoplistBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("oper2", entity.oper2);
         row.SetField("prod", entity.prod);
         row.SetField("dsplprod", entity.dsplprod);
         row.SetField("addswoptprodfl", entity.addswoptprodfl);
         row.SetField("chrg", entity.chrg);
         row.SetField("cubes", entity.cubes);
         row.SetField("descrip", entity.descrip);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("discamt", entity.discamt);
         row.SetField("discoverfl", entity.discoverfl);
         row.SetField("disctype", entity.disctype);
         row.SetField("extra-1", entity.extra1);
         row.SetField("extra-2", entity.extra2);
         row.SetField("lastpurdt", entity.lastpurdt);
         row.SetField("lastprice", entity.lastprice);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("marginamt", entity.marginamt);
         row.SetField("marginpct", entity.marginpct);
         row.SetField("netord", entity.netord);
         row.SetField("netrecommend", entity.netrecommend);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("pdrecno", entity.pdrecno);
         row.SetField("pdsvfl", entity.pdsvfl);
         row.SetField("arpprodline", entity.arpprodline);
         row.SetField("price", entity.price);
         row.SetField("priceoverfl", entity.priceoverfl);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("qtyavail", entity.qtyavail);
         row.SetField("qtybreakty", entity.qtybreakty);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyrecommend", entity.qtyrecommend);
         row.SetField("seasontype", entity.seasontype);
         row.SetField("specnstype", entity.specnstype);
         row.SetField("specconv", entity.specconv);
         row.SetField("statmessage", entity.statmessage);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("stkqtyrecommend", entity.stkqtyrecommend);
         row.SetField("totalstkqty", entity.totalstkqty);
         row.SetField("unit", entity.unit);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("weight", entity.weight);
         row.SetField("whse", entity.whse);
         row.SetField("seqno", entity.seqno);
         row.SetField("optionalwords", entity.optionalwords);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("operinit", entity.operinit);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("contractno", entity.contractno);
         row.SetField("pdsvcrecno", entity.pdsvcrecno);
         row.SetField("dsplqtyavail", entity.dsplqtyavail);
         row.SetField("custreservefoundfl", entity.custreservefoundfl);
         row.SetField("pv_shoplistRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PvShoplistBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("oper2", entity.oper2);
         row.SetField("prod", entity.prod);
         row.SetField("pv_shoplistRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	