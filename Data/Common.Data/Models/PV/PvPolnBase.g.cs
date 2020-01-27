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
   /// PO line item creation storage table
   /// </summary>
   
   public partial class PvPolnBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      public int cono { get; set; }

      /// <summary>
      /// g-pono
      /// </summary>
      public int pono { get; set; }

      /// <summary>
      /// g-posuf
      /// </summary>
      public int posuf { get; set; }

      /// <summary>
      /// s-lineno
      /// </summary>
      public int lineno { get; set; }

      /// <summary>
      /// filler
      /// </summary>
      [StringValidationAttribute]
      public string filler1 { get; set; }

      /// <summary>
      /// o-catwtfl
      /// </summary>
      public bool orgcatwtfl { get; set; }

      /// <summary>
      /// o-cubes
      /// </summary>
      public decimal orgcubes { get; set; }

      /// <summary>
      /// o-netamt
      /// </summary>
      public decimal orgnetamt { get; set; }

      /// <summary>
      /// o-nonstockty
      /// </summary>
      [StringValidationAttribute]
      public string orgnonstockty { get; set; }

      /// <summary>
      /// o-nosnlots
      /// </summary>
      public decimal orgnosnlots { get; set; }

      /// <summary>
      /// o-prod
      /// </summary>
      [StringValidationAttribute]
      public string orgprod { get; set; }

      /// <summary>
      /// o-price
      /// </summary>
      public decimal orgprice { get; set; }

      /// <summary>
      /// o-sqtyord
      /// </summary>
      public decimal orgsqtyord { get; set; }

      /// <summary>
      /// o-stkqtyord
      /// </summary>
      public decimal orgstkqtyord { get; set; }

      /// <summary>
      /// o-qtyord
      /// </summary>
      public decimal orgqtyord { get; set; }

      /// <summary>
      /// o-qtyrcv
      /// </summary>
      public decimal orgqtyrcv { get; set; }

      /// <summary>
      /// o-unit
      /// </summary>
      [StringValidationAttribute]
      public string orgunit { get; set; }

      /// <summary>
      /// o-v-idicsp
      /// </summary>
      public long orgidicsp { get; set; }

      /// <summary>
      /// o-v-idicsw
      /// </summary>
      public long orgidicsw { get; set; }

      /// <summary>
      /// o-weight
      /// </summary>
      public decimal orgweight { get; set; }

      /// <summary>
      /// filler
      /// </summary>
      [StringValidationAttribute]
      public string filler2 { get; set; }

      /// <summary>
      /// s-cubes
      /// </summary>
      public decimal cubes { get; set; }

      /// <summary>
      /// s-duedt
      /// </summary>
      public DateTime? duedt { get; set; }

      /// <summary>
      /// s-nonstockty
      /// </summary>
      [StringValidationAttribute]
      public string nonstockty { get; set; }

      /// <summary>
      /// s-prod
      /// </summary>
      [StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// s-price
      /// </summary>
      public decimal scrnprice { get; set; }

      /// <summary>
      /// s-prodcat
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// s-proddesc
      /// </summary>
      [StringValidationAttribute]
      public string proddesc { get; set; }

      /// <summary>
      /// s-qtyord
      /// </summary>
      public decimal qtyord { get; set; }

      /// <summary>
      /// s-stkqtyord
      /// </summary>
      public decimal stkqtyord { get; set; }

      /// <summary>
      /// s-unit
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// s-weight
      /// </summary>
      public decimal weight { get; set; }

      /// <summary>
      /// s-reasunavty
      /// </summary>
      [StringValidationAttribute]
      public string reasunavty { get; set; }

      /// <summary>
      /// filler
      /// </summary>
      [StringValidationAttribute]
      public string filler3 { get; set; }

      /// <summary>
      /// v-commentfl
      /// </summary>
      public bool commentfl { get; set; }

      /// <summary>
      /// v-conv
      /// </summary>
      public decimal unitconv { get; set; }

      /// <summary>
      /// v-idpoel
      /// </summary>
      public long idpoel { get; set; }

      /// <summary>
      /// v-idicsp
      /// </summary>
      public long idicsp { get; set; }

      /// <summary>
      /// v-idicsw
      /// </summary>
      public long idicsw { get; set; }

      /// <summary>
      /// v-linefl
      /// </summary>
      public bool linefl { get; set; }

      /// <summary>
      /// v-maint-l
      /// </summary>
      [StringValidationAttribute]
      public string maintL { get; set; }

      /// <summary>
      /// v-nosnlots
      /// </summary>
      public decimal nosnlots { get; set; }

      /// <summary>
      /// v-priceover
      /// </summary>
      public decimal priceover { get; set; }

      /// <summary>
      /// filler
      /// </summary>
      [StringValidationAttribute]
      public string filler4 { get; set; }

      /// <summary>
      /// v-speccostty
      /// </summary>
      [StringValidationAttribute]
      public string speccostty { get; set; }

      /// <summary>
      /// v-csunperstk
      /// </summary>
      public decimal csunperstk { get; set; }

      /// <summary>
      /// v-specconv
      /// </summary>
      public int specconv { get; set; }

      /// <summary>
      /// v-prccostper
      /// </summary>
      [StringValidationAttribute]
      public string prccostper { get; set; }

      /// <summary>
      /// v-icspecrecno
      /// </summary>
      public int icspecrecno { get; set; }

      /// <summary>
      /// icsw.serlottype
      /// </summary>
      [StringValidationAttribute]
      public string serlottype { get; set; }

      /// <summary>
      /// s-netavail
      /// </summary>
      public decimal netavail { get; set; }

      /// <summary>
      /// s-proddesc1
      /// </summary>
      [StringValidationAttribute]
      public string proddesc1 { get; set; }

      /// <summary>
      /// s-netamt
      /// </summary>
      public decimal netamt { get; set; }

      /// <summary>
      /// s-proddesc2
      /// </summary>
      [StringValidationAttribute]
      public string proddesc2 { get; set; }

      /// <summary>
      /// v-price
      /// </summary>
      public decimal calcprice { get; set; }

      /// <summary>
      /// recid(poel)
      /// </summary>
      public long poelrecid { get; set; }

      /// <summary>
      /// v-manprice
      /// </summary>
      public bool manprice { get; set; }

      /// <summary>
      /// rowid(poel)
      /// </summary>
      [StringValidationAttribute]
      public string poelrowid { get; set; }

      /// <summary>
      /// s-stkunit
      /// </summary>
      [StringValidationAttribute]
      public string stkunit { get; set; }

      /// <summary>
      /// Tally
      /// </summary>
      public bool tallyfl { get; set; }

      /// <summary>
      /// poel.user1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// poel.user2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// poel.user3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// poel.user4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// poel.user5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// poel.user6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// poel.user7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// poel.user8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// poel.user9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// o-reasunavty
      /// </summary>
      [StringValidationAttribute]
      public string orgreasunavty { get; set; }

      /// <summary>
      /// Expected Ship
      /// </summary>
      public DateTime? expshipdt { get; set; }

      /// <summary>
      /// Req Ship
      /// </summary>
      public DateTime? reqshipdt { get; set; }

      /// <summary>
      /// n/a
      /// </summary>
      public bool launchtallyfl { get; set; }

      /// <summary>
      /// s-backorder
      /// </summary>
      public decimal backorder { get; set; }

      /// <summary>
      /// s-onorder
      /// </summary>
      public decimal onorder { get; set; }

      /// <summary>
      /// User 10
      /// </summary>
      [StringValidationAttribute]
      public string user10 { get; set; }

      /// <summary>
      /// User 11
      /// </summary>
      [StringValidationAttribute]
      public string user11 { get; set; }

      /// <summary>
      /// User 12
      /// </summary>
      [StringValidationAttribute]
      public string user12 { get; set; }

      /// <summary>
      /// User 13
      /// </summary>
      [StringValidationAttribute]
      public string user13 { get; set; }

      /// <summary>
      /// User 14
      /// </summary>
      [StringValidationAttribute]
      public string user14 { get; set; }

      /// <summary>
      /// User 15
      /// </summary>
      [StringValidationAttribute]
      public string user15 { get; set; }

      /// <summary>
      /// User 16
      /// </summary>
      [StringValidationAttribute]
      public string user16 { get; set; }

      /// <summary>
      /// User 17
      /// </summary>
      [StringValidationAttribute]
      public string user17 { get; set; }

      /// <summary>
      /// User 18
      /// </summary>
      [StringValidationAttribute]
      public string user18 { get; set; }

      /// <summary>
      /// User 19
      /// </summary>
      [StringValidationAttribute]
      public string user19 { get; set; }

      /// <summary>
      /// User 20
      /// </summary>
      [StringValidationAttribute]
      public string user20 { get; set; }

      /// <summary>
      /// User 21
      /// </summary>
      [StringValidationAttribute]
      public string user21 { get; set; }

      /// <summary>
      /// User 22
      /// </summary>
      [StringValidationAttribute]
      public string user22 { get; set; }

      /// <summary>
      /// User 23
      /// </summary>
      [StringValidationAttribute]
      public string user23 { get; set; }

      /// <summary>
      /// User 24
      /// </summary>
      [StringValidationAttribute]
      public string user24 { get; set; }

      /// <summary>
      /// User Chr 1
      /// </summary>
      [StringValidationAttribute]
      public string userchr1 { get; set; }

      /// <summary>
      /// User Chr 2
      /// </summary>
      [StringValidationAttribute]
      public string userchr2 { get; set; }

      /// <summary>
      /// User Chr 3
      /// </summary>
      [StringValidationAttribute]
      public string userchr3 { get; set; }

      /// <summary>
      /// User Chr 4
      /// </summary>
      [StringValidationAttribute]
      public string userchr4 { get; set; }

      /// <summary>
      /// User Dec 1
      /// </summary>
      public decimal userdec1 { get; set; }

      /// <summary>
      /// User Dec 2
      /// </summary>
      public decimal userdec2 { get; set; }

      /// <summary>
      /// User Date 1
      /// </summary>
      public DateTime? userdt1 { get; set; }

      /// <summary>
      /// User Date 1
      /// </summary>
      public DateTime? userdt2 { get; set; }

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
      /// PDSVC #
      /// </summary>
      public int orgpdsvcrecno { get; set; }

      /// <summary>
      /// Acknowledgment Date
      /// </summary>
      public DateTime? ackdt { get; set; }

      /// <summary>
      /// Acknowledgement Reason
      /// </summary>
      [StringValidationAttribute]
      public string ackrsn { get; set; }

      /// <summary>
      /// NCNR
      /// </summary>
      [StringValidationAttribute]
      public string ncnr { get; set; }

      /// <summary>
      /// Country of Origin
      /// </summary>
      [StringValidationAttribute]
      public string countryoforigin { get; set; }

      /// <summary>
      /// HS Code
      /// </summary>
      [StringValidationAttribute]
      public string tariffcd { get; set; }

      /// <summary>
      /// UPC Identifier
      /// </summary>
      [StringValidationAttribute]
      public string upcid { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPvPolnBaseFromRow<T>(DataRow row) where T:PvPolnBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.filler1 = row.IsNull("filler-1") ? string.Empty : row.Field<string>("filler-1");
         entity.orgcatwtfl = row.Field<bool>("orgcatwtfl");
         entity.orgcubes = row.IsNull("orgcubes") ? decimal.Zero : row.Field<decimal>("orgcubes");
         entity.orgnetamt = row.IsNull("orgnetamt") ? decimal.Zero : row.Field<decimal>("orgnetamt");
         entity.orgnonstockty = row.IsNull("orgnonstockty") ? string.Empty : row.Field<string>("orgnonstockty");
         entity.orgnosnlots = row.IsNull("orgnosnlots") ? decimal.Zero : row.Field<decimal>("orgnosnlots");
         entity.orgprod = row.IsNull("orgprod") ? string.Empty : row.Field<string>("orgprod");
         entity.orgprice = row.IsNull("orgprice") ? decimal.Zero : row.Field<decimal>("orgprice");
         entity.orgsqtyord = row.IsNull("orgsqtyord") ? decimal.Zero : row.Field<decimal>("orgsqtyord");
         entity.orgstkqtyord = row.IsNull("orgstkqtyord") ? decimal.Zero : row.Field<decimal>("orgstkqtyord");
         entity.orgqtyord = row.IsNull("orgqtyord") ? decimal.Zero : row.Field<decimal>("orgqtyord");
         entity.orgqtyrcv = row.IsNull("orgqtyrcv") ? decimal.Zero : row.Field<decimal>("orgqtyrcv");
         entity.orgunit = row.IsNull("orgunit") ? string.Empty : row.Field<string>("orgunit");
         entity.orgidicsp = row.IsNull("orgidicsp") ? 0 : row.Field<long>("orgidicsp");
         entity.orgidicsw = row.IsNull("orgidicsw") ? 0 : row.Field<long>("orgidicsw");
         entity.orgweight = row.IsNull("orgweight") ? decimal.Zero : row.Field<decimal>("orgweight");
         entity.filler2 = row.IsNull("filler-2") ? string.Empty : row.Field<string>("filler-2");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.scrnprice = row.IsNull("scrnprice") ? decimal.Zero : row.Field<decimal>("scrnprice");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.filler3 = row.IsNull("filler-3") ? string.Empty : row.Field<string>("filler-3");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.idpoel = row.IsNull("idpoel") ? 0 : row.Field<long>("idpoel");
         entity.idicsp = row.IsNull("idicsp") ? 0 : row.Field<long>("idicsp");
         entity.idicsw = row.IsNull("idicsw") ? 0 : row.Field<long>("idicsw");
         entity.linefl = row.Field<bool>("linefl");
         entity.maintL = row.IsNull("maint-l") ? string.Empty : row.Field<string>("maint-l");
         entity.nosnlots = row.IsNull("nosnlots") ? decimal.Zero : row.Field<decimal>("nosnlots");
         entity.priceover = row.IsNull("priceover") ? decimal.Zero : row.Field<decimal>("priceover");
         entity.filler4 = row.IsNull("filler-4") ? string.Empty : row.Field<string>("filler-4");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.specconv = row.IsNull("specconv") ? 0 : row.Field<int>("specconv");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.proddesc1 = row.IsNull("proddesc1") ? string.Empty : row.Field<string>("proddesc1");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.calcprice = row.IsNull("calcprice") ? decimal.Zero : row.Field<decimal>("calcprice");
         entity.poelrecid = row.IsNull("poelrecid") ? 0 : row.Field<long>("poelrecid");
         entity.manprice = row.Field<bool>("manprice");
         entity.poelrowid = row.IsNull("poelrowid") ? string.Empty : row.Field<string>("poelrowid");
         entity.stkunit = row.IsNull("stkunit") ? string.Empty : row.Field<string>("stkunit");
         entity.tallyfl = row.Field<bool>("tallyfl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.orgreasunavty = row.IsNull("orgreasunavty") ? string.Empty : row.Field<string>("orgreasunavty");
         entity.expshipdt = row.Field<DateTime?>("expshipdt");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.launchtallyfl = row.Field<bool>("launchtallyfl");
         entity.backorder = row.IsNull("backorder") ? decimal.Zero : row.Field<decimal>("backorder");
         entity.onorder = row.IsNull("onorder") ? decimal.Zero : row.Field<decimal>("onorder");
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
         entity.user20 = row.IsNull("user20") ? string.Empty : row.Field<string>("user20");
         entity.user21 = row.IsNull("user21") ? string.Empty : row.Field<string>("user21");
         entity.user22 = row.IsNull("user22") ? string.Empty : row.Field<string>("user22");
         entity.user23 = row.IsNull("user23") ? string.Empty : row.Field<string>("user23");
         entity.user24 = row.IsNull("user24") ? string.Empty : row.Field<string>("user24");
         entity.userchr1 = row.IsNull("userchr1") ? string.Empty : row.Field<string>("userchr1");
         entity.userchr2 = row.IsNull("userchr2") ? string.Empty : row.Field<string>("userchr2");
         entity.userchr3 = row.IsNull("userchr3") ? string.Empty : row.Field<string>("userchr3");
         entity.userchr4 = row.IsNull("userchr4") ? string.Empty : row.Field<string>("userchr4");
         entity.userdec1 = row.IsNull("userdec1") ? decimal.Zero : row.Field<decimal>("userdec1");
         entity.userdec2 = row.IsNull("userdec2") ? decimal.Zero : row.Field<decimal>("userdec2");
         entity.userdt1 = row.Field<DateTime?>("userdt1");
         entity.userdt2 = row.Field<DateTime?>("userdt2");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.pdsvcrecno = row.IsNull("pdsvcrecno") ? 0 : row.Field<int>("pdsvcrecno");
         entity.orgpdsvcrecno = row.IsNull("orgpdsvcrecno") ? 0 : row.Field<int>("orgpdsvcrecno");
         entity.ackdt = row.Field<DateTime?>("ackdt");
         entity.ackrsn = row.IsNull("ackrsn") ? string.Empty : row.Field<string>("ackrsn");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.rowID = row.Field<byte[]>("pv_polnRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPvPolnBase(ref DataRow row, PvPolnBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("filler-1", entity.filler1);
         row.SetField("orgcatwtfl", entity.orgcatwtfl);
         row.SetField("orgcubes", entity.orgcubes);
         row.SetField("orgnetamt", entity.orgnetamt);
         row.SetField("orgnonstockty", entity.orgnonstockty);
         row.SetField("orgnosnlots", entity.orgnosnlots);
         row.SetField("orgprod", entity.orgprod);
         row.SetField("orgprice", entity.orgprice);
         row.SetField("orgsqtyord", entity.orgsqtyord);
         row.SetField("orgstkqtyord", entity.orgstkqtyord);
         row.SetField("orgqtyord", entity.orgqtyord);
         row.SetField("orgqtyrcv", entity.orgqtyrcv);
         row.SetField("orgunit", entity.orgunit);
         row.SetField("orgidicsp", entity.orgidicsp);
         row.SetField("orgidicsw", entity.orgidicsw);
         row.SetField("orgweight", entity.orgweight);
         row.SetField("filler-2", entity.filler2);
         row.SetField("cubes", entity.cubes);
         row.SetField("duedt", entity.duedt);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("prod", entity.prod);
         row.SetField("scrnprice", entity.scrnprice);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("unit", entity.unit);
         row.SetField("weight", entity.weight);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("filler-3", entity.filler3);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("idpoel", entity.idpoel);
         row.SetField("idicsp", entity.idicsp);
         row.SetField("idicsw", entity.idicsw);
         row.SetField("linefl", entity.linefl);
         row.SetField("maint-l", entity.maintL);
         row.SetField("nosnlots", entity.nosnlots);
         row.SetField("priceover", entity.priceover);
         row.SetField("filler-4", entity.filler4);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("specconv", entity.specconv);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("netavail", entity.netavail);
         row.SetField("proddesc1", entity.proddesc1);
         row.SetField("netamt", entity.netamt);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("calcprice", entity.calcprice);
         row.SetField("poelrecid", entity.poelrecid);
         row.SetField("manprice", entity.manprice);
         row.SetField("poelrowid", entity.poelrowid);
         row.SetField("stkunit", entity.stkunit);
         row.SetField("tallyfl", entity.tallyfl);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("orgreasunavty", entity.orgreasunavty);
         row.SetField("expshipdt", entity.expshipdt);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("launchtallyfl", entity.launchtallyfl);
         row.SetField("backorder", entity.backorder);
         row.SetField("onorder", entity.onorder);
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
         row.SetField("user20", entity.user20);
         row.SetField("user21", entity.user21);
         row.SetField("user22", entity.user22);
         row.SetField("user23", entity.user23);
         row.SetField("user24", entity.user24);
         row.SetField("userchr1", entity.userchr1);
         row.SetField("userchr2", entity.userchr2);
         row.SetField("userchr3", entity.userchr3);
         row.SetField("userchr4", entity.userchr4);
         row.SetField("userdec1", entity.userdec1);
         row.SetField("userdec2", entity.userdec2);
         row.SetField("userdt1", entity.userdt1);
         row.SetField("userdt2", entity.userdt2);
         row.SetField("contractno", entity.contractno);
         row.SetField("pdsvcrecno", entity.pdsvcrecno);
         row.SetField("orgpdsvcrecno", entity.orgpdsvcrecno);
         row.SetField("ackdt", entity.ackdt);
         row.SetField("ackrsn", entity.ackrsn);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("upcid", entity.upcid);
         row.SetField("pv_polnRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PvPolnBase entity)
      {
         row.SetField("pv_polnRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	