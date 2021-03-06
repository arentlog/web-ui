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

namespace Infor.Sxe.PO.Data.Models.Pdspoline
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoline.Poline")]
   public partial class Poline : ModelBase, IUserFields
   {
      public DateTime? ackdt { get; set; }
      [StringValidationAttribute]
      public string ackrsn { get; set; }
      public decimal backorder { get; set; }
      public bool commentfl { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      public decimal csunperstk { get; set; }
      public decimal cubes { get; set; }
      public DateTime? duedt { get; set; }
      public decimal dutyrate { get; set; }
      public DateTime? expshipdt { get; set; }
      [StringValidationAttribute]
      public string filler1 { get; set; }
      [StringValidationAttribute]
      public string filler2 { get; set; }
      [StringValidationAttribute]
      public string filler3 { get; set; }
      [StringValidationAttribute]
      public string filler4 { get; set; }
      public int icspecrecno { get; set; }
      public long idicsp { get; set; }
      public long idicsw { get; set; }
      public long idpoel { get; set; }
      public bool launchtallyfl { get; set; }
      public bool linefl { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string maintL { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      public decimal netamt { get; set; }
      public decimal netavail { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      public decimal nosnlots { get; set; }
      public decimal onorder { get; set; }
      public bool orgcatwtfl { get; set; }
      public decimal orgcubes { get; set; }
      public long orgidicsp { get; set; }
      public long orgidicsw { get; set; }
      public decimal orgnetamt { get; set; }
      [StringValidationAttribute]
      public string orgnonstockty { get; set; }
      public decimal orgnosnlots { get; set; }
      public int orgpdsvcrecno { get; set; }
      public decimal orgprice { get; set; }
      [StringValidationAttribute]
      public string orgprod { get; set; }
      public decimal orgqtyord { get; set; }
      public decimal orgqtyrcv { get; set; }
      [StringValidationAttribute]
      public string orgreasunavty { get; set; }
      public decimal orgsqtyord { get; set; }
      public decimal orgstkqtyord { get; set; }
      [StringValidationAttribute]
      public string orgunit { get; set; }
      public decimal orgweight { get; set; }
      public int pdsvcrecno { get; set; }
      public long poelrecid { get; set; }
      [StringValidationAttribute]
      public string poelrowid { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string prccostper { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string proddesc1 { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      public DateTime? reqshipdt { get; set; }
      public decimal scrnprice { get; set; }
      [StringValidationAttribute]
      public string serlottype { get; set; }
      public int specconv { get; set; }
      [StringValidationAttribute]
      public string speccostty { get; set; }
      public decimal stkqtyord { get; set; }
      [StringValidationAttribute]
      public string stkunit { get; set; }
      public bool tallyfl { get; set; }
      public bool reqbundleidfl { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal unitconv { get; set; }
      [StringValidationAttribute]
      public string upcid { get; set; }
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
      [StringValidationAttribute]
      public string userchr1 { get; set; }
      [StringValidationAttribute]
      public string userchr2 { get; set; }
      [StringValidationAttribute]
      public string userchr3 { get; set; }
      [StringValidationAttribute]
      public string userchr4 { get; set; }
      public decimal userdec1 { get; set; }
      public decimal userdec2 { get; set; }
      public DateTime? userdt1 { get; set; }
      public DateTime? userdt2 { get; set; }
      public decimal weight { get; set; }
      public bool ackdtenabled { get; set; }
      public bool ackrsnenabled { get; set; }
      public bool btncontractnoenabled { get; set; }
      public bool btnproductenabled { get; set; }
      public bool cbnonstocktyenabled { get; set; }
      public bool commentsenabled { get; set; }
      public bool contractnoenabled { get; set; }
      public bool duedtenabled { get; set; }
      public bool expshipdtenabled { get; set; }
      public bool ignoreltflenabled { get; set; }
      public bool linenoenabled { get; set; }
      public bool ncnrenabled { get; set; }
      public bool priceenabled { get; set; }
      public bool prodenabled { get; set; }
      public bool qtyordenabled { get; set; }
      public bool reasunavtyenabled { get; set; }
      public bool reqshipdtenabled { get; set; }
      public bool unitenabled { get; set; }
      public bool whseenabled { get; set; }
      public bool icspimplfl { get; set; }
      public bool icspcorefl { get; set; }
      public bool icspremnfl { get; set; }
      public bool pricevisible { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string notescheckprod { get; set; }
      public bool ignoreltfl { get; set; }
      [StringValidationAttribute]
      public string specprcst { get; set; }
      [StringValidationAttribute]
      public string txtRMSignOnQtyOrd { get; set; }
      [StringValidationAttribute]
      public string cIcspstatustype { get; set; }
      public bool nonStkNFRDataOk { get; set; }
      public bool lWarrantyFl { get; set; }
      public bool lWarrChgFl { get; set; }
      public bool lVaFakeProdFl { get; set; }
      public decimal totWeight { get; set; }
      public decimal totCubes { get; set; }
      public bool lForceTallyMix { get; set; }
      public bool lCoreReturnFl { get; set; }
      public decimal calcprice { get; set; }
      [StringValidationAttribute]
      public string sourceproc { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public decimal dAvgCost { get; set; }
      public decimal dLastCost { get; set; }
      public decimal dOrigPrice { get; set; }
      public decimal dReplCost { get; set; }
      public decimal dStndCost { get; set; }
      public decimal dSystemPrice { get; set; }
      public bool manprice { get; set; }
      public decimal priceover { get; set; }
      [StringValidationAttribute]
      public string priceclty { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string errormess { get; set; }
      public decimal price { get; set; }
      public bool priceReset { get; set; }
      public bool forceRepricingFl { get; set; }
      public bool worksheetpricesetfl { get; set; }
      public bool lPricingModified { get; set; }
      public int lvl { get; set; }
      [StringValidationAttribute]
      public string basisType { get; set; }
      public decimal basis { get; set; }
      public decimal operand { get; set; }
      [StringValidationAttribute]
      public string @operator { get; set; }
      public bool cbbasistypesensitive { get; set; }
      [StringValidationAttribute]
      public string cbbasistypelist { get; set; }
      public bool fibasissensitive { get; set; }
      [StringValidationAttribute]
      public string cboperatorlist { get; set; }
      public bool cboperatorsensitive { get; set; }
      public bool fioperandsensitive { get; set; }
      public bool btnsystempricingsensitive { get; set; }
      public bool btnrestorepricingsensitive { get; set; }
      public bool forcespecialfl { get; set; }
      public bool lICSNPOFl { get; set; }
      [StringValidationAttribute]
      public string cICLotRcptTy { get; set; }
      public bool lNonStockEntry { get; set; }
      public bool lResaleEntry { get; set; }
      [StringValidationAttribute]
      public string cDefaultNonStockTy { get; set; }
      [StringValidationAttribute]
      public string cICNSProdCat { get; set; }
      public bool lSeeCostFl { get; set; }
      public bool lIgnoreTWL8744Warn { get; set; }
      [StringValidationAttribute]
      public string cMaintModeL { get; set; }
      public bool lNonStkNFRDataOk { get; set; }
      public bool lLaunchedTally { get; set; }
      public bool lLaunchedResale { get; set; }
      public bool lLaunchedCore { get; set; }
      [StringValidationAttribute]
      public string vendretauth { get; set; }
      public bool restrictovrfl { get; set; }
      [StringValidationAttribute]
      public string restricterrmess { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poline BuildPolineFromRow(DataRow row)
      {
         Poline entity = new Poline();
         entity.ackdt = row.Field<DateTime?>("ackdt");
         entity.ackrsn = row.IsNull("ackrsn") ? string.Empty : row.Field<string>("ackrsn");
         entity.backorder = row.IsNull("backorder") ? decimal.Zero : row.Field<decimal>("backorder");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.dutyrate = row.IsNull("dutyrate") ? decimal.Zero : row.Field<decimal>("dutyrate");
         entity.expshipdt = row.Field<DateTime?>("expshipdt");
         entity.filler1 = row.IsNull("filler-1") ? string.Empty : row.Field<string>("filler-1");
         entity.filler2 = row.IsNull("filler-2") ? string.Empty : row.Field<string>("filler-2");
         entity.filler3 = row.IsNull("filler-3") ? string.Empty : row.Field<string>("filler-3");
         entity.filler4 = row.IsNull("filler-4") ? string.Empty : row.Field<string>("filler-4");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.idicsp = row.IsNull("idicsp") ? 0 : row.Field<long>("idicsp");
         entity.idicsw = row.IsNull("idicsw") ? 0 : row.Field<long>("idicsw");
         entity.idpoel = row.IsNull("idpoel") ? 0 : row.Field<long>("idpoel");
         entity.launchtallyfl = row.Field<bool>("launchtallyfl");
         entity.linefl = row.Field<bool>("linefl");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.maintL = row.IsNull("maint-l") ? string.Empty : row.Field<string>("maint-l");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.nosnlots = row.IsNull("nosnlots") ? decimal.Zero : row.Field<decimal>("nosnlots");
         entity.onorder = row.IsNull("onorder") ? decimal.Zero : row.Field<decimal>("onorder");
         entity.orgcatwtfl = row.Field<bool>("orgcatwtfl");
         entity.orgcubes = row.IsNull("orgcubes") ? decimal.Zero : row.Field<decimal>("orgcubes");
         entity.orgidicsp = row.IsNull("orgidicsp") ? 0 : row.Field<long>("orgidicsp");
         entity.orgidicsw = row.IsNull("orgidicsw") ? 0 : row.Field<long>("orgidicsw");
         entity.orgnetamt = row.IsNull("orgnetamt") ? decimal.Zero : row.Field<decimal>("orgnetamt");
         entity.orgnonstockty = row.IsNull("orgnonstockty") ? string.Empty : row.Field<string>("orgnonstockty");
         entity.orgnosnlots = row.IsNull("orgnosnlots") ? decimal.Zero : row.Field<decimal>("orgnosnlots");
         entity.orgpdsvcrecno = row.IsNull("orgpdsvcrecno") ? 0 : row.Field<int>("orgpdsvcrecno");
         entity.orgprice = row.IsNull("orgprice") ? decimal.Zero : row.Field<decimal>("orgprice");
         entity.orgprod = row.IsNull("orgprod") ? string.Empty : row.Field<string>("orgprod");
         entity.orgqtyord = row.IsNull("orgqtyord") ? decimal.Zero : row.Field<decimal>("orgqtyord");
         entity.orgqtyrcv = row.IsNull("orgqtyrcv") ? decimal.Zero : row.Field<decimal>("orgqtyrcv");
         entity.orgreasunavty = row.IsNull("orgreasunavty") ? string.Empty : row.Field<string>("orgreasunavty");
         entity.orgsqtyord = row.IsNull("orgsqtyord") ? decimal.Zero : row.Field<decimal>("orgsqtyord");
         entity.orgstkqtyord = row.IsNull("orgstkqtyord") ? decimal.Zero : row.Field<decimal>("orgstkqtyord");
         entity.orgunit = row.IsNull("orgunit") ? string.Empty : row.Field<string>("orgunit");
         entity.orgweight = row.IsNull("orgweight") ? decimal.Zero : row.Field<decimal>("orgweight");
         entity.pdsvcrecno = row.IsNull("pdsvcrecno") ? 0 : row.Field<int>("pdsvcrecno");
         entity.poelrecid = row.IsNull("poelrecid") ? 0 : row.Field<long>("poelrecid");
         entity.poelrowid = row.IsNull("poelrowid") ? string.Empty : row.Field<string>("poelrowid");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc1 = row.IsNull("proddesc1") ? string.Empty : row.Field<string>("proddesc1");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.scrnprice = row.IsNull("scrnprice") ? decimal.Zero : row.Field<decimal>("scrnprice");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.specconv = row.IsNull("specconv") ? 0 : row.Field<int>("specconv");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.stkunit = row.IsNull("stkunit") ? string.Empty : row.Field<string>("stkunit");
         entity.tallyfl = row.Field<bool>("tallyfl");
         entity.reqbundleidfl = row.Field<bool>("reqbundleidfl");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
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
         entity.userchr1 = row.IsNull("userchr1") ? string.Empty : row.Field<string>("userchr1");
         entity.userchr2 = row.IsNull("userchr2") ? string.Empty : row.Field<string>("userchr2");
         entity.userchr3 = row.IsNull("userchr3") ? string.Empty : row.Field<string>("userchr3");
         entity.userchr4 = row.IsNull("userchr4") ? string.Empty : row.Field<string>("userchr4");
         entity.userdec1 = row.IsNull("userdec1") ? decimal.Zero : row.Field<decimal>("userdec1");
         entity.userdec2 = row.IsNull("userdec2") ? decimal.Zero : row.Field<decimal>("userdec2");
         entity.userdt1 = row.Field<DateTime?>("userdt1");
         entity.userdt2 = row.Field<DateTime?>("userdt2");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.ackdtenabled = row.Field<bool>("ackdtenabled");
         entity.ackrsnenabled = row.Field<bool>("ackrsnenabled");
         entity.btncontractnoenabled = row.Field<bool>("btncontractnoenabled");
         entity.btnproductenabled = row.Field<bool>("btnproductenabled");
         entity.cbnonstocktyenabled = row.Field<bool>("cbnonstocktyenabled");
         entity.commentsenabled = row.Field<bool>("commentsenabled");
         entity.contractnoenabled = row.Field<bool>("contractnoenabled");
         entity.duedtenabled = row.Field<bool>("duedtenabled");
         entity.expshipdtenabled = row.Field<bool>("expshipdtenabled");
         entity.ignoreltflenabled = row.Field<bool>("ignoreltflenabled");
         entity.linenoenabled = row.Field<bool>("linenoenabled");
         entity.ncnrenabled = row.Field<bool>("ncnrenabled");
         entity.priceenabled = row.Field<bool>("priceenabled");
         entity.prodenabled = row.Field<bool>("prodenabled");
         entity.qtyordenabled = row.Field<bool>("qtyordenabled");
         entity.reasunavtyenabled = row.Field<bool>("reasunavtyenabled");
         entity.reqshipdtenabled = row.Field<bool>("reqshipdtenabled");
         entity.unitenabled = row.Field<bool>("unitenabled");
         entity.whseenabled = row.Field<bool>("whseenabled");
         entity.icspimplfl = row.Field<bool>("icspimplfl");
         entity.icspcorefl = row.Field<bool>("icspcorefl");
         entity.icspremnfl = row.Field<bool>("icspremnfl");
         entity.pricevisible = row.Field<bool>("pricevisible");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.notescheckprod = row.IsNull("notescheckprod") ? string.Empty : row.Field<string>("notescheckprod");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.specprcst = row.IsNull("specprcst") ? string.Empty : row.Field<string>("specprcst");
         entity.txtRMSignOnQtyOrd = row.IsNull("txtRMSignOnQtyOrd") ? string.Empty : row.Field<string>("txtRMSignOnQtyOrd");
         entity.cIcspstatustype = row.IsNull("cIcspstatustype") ? string.Empty : row.Field<string>("cIcspstatustype");
         entity.nonStkNFRDataOk = row.Field<bool>("NonStkNFRDataOk");
         entity.lWarrantyFl = row.Field<bool>("lWarrantyFl");
         entity.lWarrChgFl = row.Field<bool>("lWarrChgFl");
         entity.lVaFakeProdFl = row.Field<bool>("lVaFakeProdFl");
         entity.totWeight = row.IsNull("TotWeight") ? decimal.Zero : row.Field<decimal>("TotWeight");
         entity.totCubes = row.IsNull("TotCubes") ? decimal.Zero : row.Field<decimal>("TotCubes");
         entity.lForceTallyMix = row.Field<bool>("lForceTallyMix");
         entity.lCoreReturnFl = row.Field<bool>("lCoreReturnFl");
         entity.calcprice = row.IsNull("calcprice") ? decimal.Zero : row.Field<decimal>("calcprice");
         entity.sourceproc = row.IsNull("sourceproc") ? string.Empty : row.Field<string>("sourceproc");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.dAvgCost = row.IsNull("dAvgCost") ? decimal.Zero : row.Field<decimal>("dAvgCost");
         entity.dLastCost = row.IsNull("dLastCost") ? decimal.Zero : row.Field<decimal>("dLastCost");
         entity.dOrigPrice = row.IsNull("dOrigPrice") ? decimal.Zero : row.Field<decimal>("dOrigPrice");
         entity.dReplCost = row.IsNull("dReplCost") ? decimal.Zero : row.Field<decimal>("dReplCost");
         entity.dStndCost = row.IsNull("dStndCost") ? decimal.Zero : row.Field<decimal>("dStndCost");
         entity.dSystemPrice = row.IsNull("dSystemPrice") ? decimal.Zero : row.Field<decimal>("dSystemPrice");
         entity.manprice = row.Field<bool>("manprice");
         entity.priceover = row.IsNull("priceover") ? decimal.Zero : row.Field<decimal>("priceover");
         entity.priceclty = row.IsNull("priceclty") ? string.Empty : row.Field<string>("priceclty");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.errormess = row.IsNull("errormess") ? string.Empty : row.Field<string>("errormess");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.priceReset = row.Field<bool>("PriceReset");
         entity.forceRepricingFl = row.Field<bool>("ForceRepricingFl");
         entity.worksheetpricesetfl = row.Field<bool>("worksheetpricesetfl");
         entity.lPricingModified = row.Field<bool>("lPricingModified");
         entity.lvl = row.IsNull("lvl") ? 0 : row.Field<int>("lvl");
         entity.basisType = row.IsNull("BasisType") ? string.Empty : row.Field<string>("BasisType");
         entity.basis = row.IsNull("basis") ? decimal.Zero : row.Field<decimal>("basis");
         entity.operand = row.IsNull("operand") ? decimal.Zero : row.Field<decimal>("operand");
         entity.@operator = row.IsNull("Operator") ? string.Empty : row.Field<string>("Operator");
         entity.cbbasistypesensitive = row.Field<bool>("cbbasistypesensitive");
         entity.cbbasistypelist = row.IsNull("cbbasistypelist") ? string.Empty : row.Field<string>("cbbasistypelist");
         entity.fibasissensitive = row.Field<bool>("fibasissensitive");
         entity.cboperatorlist = row.IsNull("cboperatorlist") ? string.Empty : row.Field<string>("cboperatorlist");
         entity.cboperatorsensitive = row.Field<bool>("cboperatorsensitive");
         entity.fioperandsensitive = row.Field<bool>("fioperandsensitive");
         entity.btnsystempricingsensitive = row.Field<bool>("btnsystempricingsensitive");
         entity.btnrestorepricingsensitive = row.Field<bool>("btnrestorepricingsensitive");
         entity.forcespecialfl = row.Field<bool>("forcespecialfl");
         entity.lICSNPOFl = row.Field<bool>("lICSNPOFl");
         entity.cICLotRcptTy = row.IsNull("cICLotRcptTy") ? string.Empty : row.Field<string>("cICLotRcptTy");
         entity.lNonStockEntry = row.Field<bool>("lNonStockEntry");
         entity.lResaleEntry = row.Field<bool>("lResaleEntry");
         entity.cDefaultNonStockTy = row.IsNull("cDefaultNonStockTy") ? string.Empty : row.Field<string>("cDefaultNonStockTy");
         entity.cICNSProdCat = row.IsNull("cICNSProdCat") ? string.Empty : row.Field<string>("cICNSProdCat");
         entity.lSeeCostFl = row.Field<bool>("lSeeCostFl");
         entity.lIgnoreTWL8744Warn = row.Field<bool>("lIgnoreTWL8744Warn");
         entity.cMaintModeL = row.IsNull("cMaintModeL") ? string.Empty : row.Field<string>("cMaintModeL");
         entity.lNonStkNFRDataOk = row.Field<bool>("lNonStkNFRDataOk");
         entity.lLaunchedTally = row.Field<bool>("lLaunchedTally");
         entity.lLaunchedResale = row.Field<bool>("lLaunchedResale");
         entity.lLaunchedCore = row.Field<bool>("lLaunchedCore");
         entity.vendretauth = row.IsNull("vendretauth") ? string.Empty : row.Field<string>("vendretauth");
         entity.restrictovrfl = row.Field<bool>("restrictovrfl");
         entity.restricterrmess = row.IsNull("restricterrmess") ? string.Empty : row.Field<string>("restricterrmess");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoline(ref DataRow row, Poline entity)
      {
         row.SetField("ackdt", entity.ackdt);
         row.SetField("ackrsn", entity.ackrsn);
         row.SetField("backorder", entity.backorder);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("cono", entity.cono);
         row.SetField("contractno", entity.contractno);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("cubes", entity.cubes);
         row.SetField("duedt", entity.duedt);
         row.SetField("dutyrate", entity.dutyrate);
         row.SetField("expshipdt", entity.expshipdt);
         row.SetField("filler-1", entity.filler1);
         row.SetField("filler-2", entity.filler2);
         row.SetField("filler-3", entity.filler3);
         row.SetField("filler-4", entity.filler4);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("idicsp", entity.idicsp);
         row.SetField("idicsw", entity.idicsw);
         row.SetField("idpoel", entity.idpoel);
         row.SetField("launchtallyfl", entity.launchtallyfl);
         row.SetField("linefl", entity.linefl);
         row.SetField("lineno", entity.lineno);
         row.SetField("maint-l", entity.maintL);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("netamt", entity.netamt);
         row.SetField("netavail", entity.netavail);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("nosnlots", entity.nosnlots);
         row.SetField("onorder", entity.onorder);
         row.SetField("orgcatwtfl", entity.orgcatwtfl);
         row.SetField("orgcubes", entity.orgcubes);
         row.SetField("orgidicsp", entity.orgidicsp);
         row.SetField("orgidicsw", entity.orgidicsw);
         row.SetField("orgnetamt", entity.orgnetamt);
         row.SetField("orgnonstockty", entity.orgnonstockty);
         row.SetField("orgnosnlots", entity.orgnosnlots);
         row.SetField("orgpdsvcrecno", entity.orgpdsvcrecno);
         row.SetField("orgprice", entity.orgprice);
         row.SetField("orgprod", entity.orgprod);
         row.SetField("orgqtyord", entity.orgqtyord);
         row.SetField("orgqtyrcv", entity.orgqtyrcv);
         row.SetField("orgreasunavty", entity.orgreasunavty);
         row.SetField("orgsqtyord", entity.orgsqtyord);
         row.SetField("orgstkqtyord", entity.orgstkqtyord);
         row.SetField("orgunit", entity.orgunit);
         row.SetField("orgweight", entity.orgweight);
         row.SetField("pdsvcrecno", entity.pdsvcrecno);
         row.SetField("poelrecid", entity.poelrecid);
         row.SetField("poelrowid", entity.poelrowid);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("prod", entity.prod);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc1", entity.proddesc1);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("scrnprice", entity.scrnprice);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("specconv", entity.specconv);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("stkunit", entity.stkunit);
         row.SetField("tallyfl", entity.tallyfl);
         row.SetField("reqbundleidfl", entity.reqbundleidfl);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("unit", entity.unit);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("upcid", entity.upcid);
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
         row.SetField("userchr1", entity.userchr1);
         row.SetField("userchr2", entity.userchr2);
         row.SetField("userchr3", entity.userchr3);
         row.SetField("userchr4", entity.userchr4);
         row.SetField("userdec1", entity.userdec1);
         row.SetField("userdec2", entity.userdec2);
         row.SetField("userdt1", entity.userdt1);
         row.SetField("userdt2", entity.userdt2);
         row.SetField("weight", entity.weight);
         row.SetField("ackdtenabled", entity.ackdtenabled);
         row.SetField("ackrsnenabled", entity.ackrsnenabled);
         row.SetField("btncontractnoenabled", entity.btncontractnoenabled);
         row.SetField("btnproductenabled", entity.btnproductenabled);
         row.SetField("cbnonstocktyenabled", entity.cbnonstocktyenabled);
         row.SetField("commentsenabled", entity.commentsenabled);
         row.SetField("contractnoenabled", entity.contractnoenabled);
         row.SetField("duedtenabled", entity.duedtenabled);
         row.SetField("expshipdtenabled", entity.expshipdtenabled);
         row.SetField("ignoreltflenabled", entity.ignoreltflenabled);
         row.SetField("linenoenabled", entity.linenoenabled);
         row.SetField("ncnrenabled", entity.ncnrenabled);
         row.SetField("priceenabled", entity.priceenabled);
         row.SetField("prodenabled", entity.prodenabled);
         row.SetField("qtyordenabled", entity.qtyordenabled);
         row.SetField("reasunavtyenabled", entity.reasunavtyenabled);
         row.SetField("reqshipdtenabled", entity.reqshipdtenabled);
         row.SetField("unitenabled", entity.unitenabled);
         row.SetField("whseenabled", entity.whseenabled);
         row.SetField("icspimplfl", entity.icspimplfl);
         row.SetField("icspcorefl", entity.icspcorefl);
         row.SetField("icspremnfl", entity.icspremnfl);
         row.SetField("pricevisible", entity.pricevisible);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("notescheckprod", entity.notescheckprod);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("specprcst", entity.specprcst);
         row.SetField("txtRMSignOnQtyOrd", entity.txtRMSignOnQtyOrd);
         row.SetField("cIcspstatustype", entity.cIcspstatustype);
         row.SetField("NonStkNFRDataOk", entity.nonStkNFRDataOk);
         row.SetField("lWarrantyFl", entity.lWarrantyFl);
         row.SetField("lWarrChgFl", entity.lWarrChgFl);
         row.SetField("lVaFakeProdFl", entity.lVaFakeProdFl);
         row.SetField("TotWeight", entity.totWeight);
         row.SetField("TotCubes", entity.totCubes);
         row.SetField("lForceTallyMix", entity.lForceTallyMix);
         row.SetField("lCoreReturnFl", entity.lCoreReturnFl);
         row.SetField("calcprice", entity.calcprice);
         row.SetField("sourceproc", entity.sourceproc);
         row.SetField("transtype", entity.transtype);
         row.SetField("dAvgCost", entity.dAvgCost);
         row.SetField("dLastCost", entity.dLastCost);
         row.SetField("dOrigPrice", entity.dOrigPrice);
         row.SetField("dReplCost", entity.dReplCost);
         row.SetField("dStndCost", entity.dStndCost);
         row.SetField("dSystemPrice", entity.dSystemPrice);
         row.SetField("manprice", entity.manprice);
         row.SetField("priceover", entity.priceover);
         row.SetField("priceclty", entity.priceclty);
         row.SetField("whse", entity.whse);
         row.SetField("errormess", entity.errormess);
         row.SetField("price", entity.price);
         row.SetField("PriceReset", entity.priceReset);
         row.SetField("ForceRepricingFl", entity.forceRepricingFl);
         row.SetField("worksheetpricesetfl", entity.worksheetpricesetfl);
         row.SetField("lPricingModified", entity.lPricingModified);
         row.SetField("lvl", entity.lvl);
         row.SetField("BasisType", entity.basisType);
         row.SetField("basis", entity.basis);
         row.SetField("operand", entity.operand);
         row.SetField("Operator", entity.@operator);
         row.SetField("cbbasistypesensitive", entity.cbbasistypesensitive);
         row.SetField("cbbasistypelist", entity.cbbasistypelist);
         row.SetField("fibasissensitive", entity.fibasissensitive);
         row.SetField("cboperatorlist", entity.cboperatorlist);
         row.SetField("cboperatorsensitive", entity.cboperatorsensitive);
         row.SetField("fioperandsensitive", entity.fioperandsensitive);
         row.SetField("btnsystempricingsensitive", entity.btnsystempricingsensitive);
         row.SetField("btnrestorepricingsensitive", entity.btnrestorepricingsensitive);
         row.SetField("forcespecialfl", entity.forcespecialfl);
         row.SetField("lICSNPOFl", entity.lICSNPOFl);
         row.SetField("cICLotRcptTy", entity.cICLotRcptTy);
         row.SetField("lNonStockEntry", entity.lNonStockEntry);
         row.SetField("lResaleEntry", entity.lResaleEntry);
         row.SetField("cDefaultNonStockTy", entity.cDefaultNonStockTy);
         row.SetField("cICNSProdCat", entity.cICNSProdCat);
         row.SetField("lSeeCostFl", entity.lSeeCostFl);
         row.SetField("lIgnoreTWL8744Warn", entity.lIgnoreTWL8744Warn);
         row.SetField("cMaintModeL", entity.cMaintModeL);
         row.SetField("lNonStkNFRDataOk", entity.lNonStkNFRDataOk);
         row.SetField("lLaunchedTally", entity.lLaunchedTally);
         row.SetField("lLaunchedResale", entity.lLaunchedResale);
         row.SetField("lLaunchedCore", entity.lLaunchedCore);
         row.SetField("vendretauth", entity.vendretauth);
         row.SetField("restrictovrfl", entity.restrictovrfl);
         row.SetField("restricterrmess", entity.restricterrmess);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
