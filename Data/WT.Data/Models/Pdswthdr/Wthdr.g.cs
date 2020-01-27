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

namespace Infor.Sxe.WT.Data.Models.Pdswthdr
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswthdr.Wthdr")]
   public partial class Wthdr : ModelBase, IUserFields
   {
      public decimal addonamt1 { get; set; }
      public decimal addonamt2 { get; set; }
      public decimal addondist1 { get; set; }
      public decimal addondist2 { get; set; }
      public decimal addonnet1 { get; set; }
      public decimal addonnet2 { get; set; }
      [StringValidationAttribute]
      public string addontype1 { get; set; }
      [StringValidationAttribute]
      public string addontype2 { get; set; }
      [StringValidationAttribute]
      public string addr1 { get; set; }
      [StringValidationAttribute]
      public string addr2 { get; set; }
      [StringValidationAttribute]
      public string addr3 { get; set; }
      [StringValidationAttribute]
      public string approvety { get; set; }
      public bool boexistsfl { get; set; }
      public bool borelfl { get; set; }
      public int bostage { get; set; }
      [StringValidationAttribute]
      public string city { get; set; }
      public int cono { get; set; }
      public int cono2 { get; set; }
      [StringValidationAttribute]
      public string countrycd { get; set; }
      [StringValidationAttribute]
      public string createdby { get; set; }
      public int divno { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string errormess { get; set; }
      [StringValidationAttribute]
      public string filler1 { get; set; }
      [StringValidationAttribute]
      public string filler2 { get; set; }
      [StringValidationAttribute]
      public string fmcountrycd { get; set; }
      public bool ignoreltfl { get; set; }
      public bool linefl { get; set; }
      public bool locallymexicofl { get; set; }
      [StringValidationAttribute]
      public string lspinvregstatus { get; set; }
      public DateTime? lspinvregstatdttmz { get; set; }
      public bool markupaddonfl { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public int nolineitem { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      public DateTime? orderdt { get; set; }
      [StringValidationAttribute]
      public string phoneno { get; set; }
      [StringValidationAttribute]
      public string reasoncode { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public DateTime? reqshipdt { get; set; }
      public bool rushfl { get; set; }
      public int secure { get; set; }
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }
      [StringValidationAttribute]
      public string shipinstr { get; set; }
      [StringValidationAttribute]
      public string extshipinstr { get; set; }
      [StringValidationAttribute]
      public string shippingpt { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr1 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr2 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr3 { get; set; }
      [StringValidationAttribute]
      public string shiptocity { get; set; }
      [StringValidationAttribute]
      public string shiptonm { get; set; }
      [StringValidationAttribute]
      public string shiptophoneno { get; set; }
      [StringValidationAttribute]
      public string shiptost { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      [StringValidationAttribute]
      public string shiptozip { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string stagearea { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string stagecdx { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      public decimal totcubes { get; set; }
      public decimal totlineamt { get; set; }
      public decimal totordamt { get; set; }
      public decimal totqtyord { get; set; }
      public decimal totqtyshp { get; set; }
      public decimal totshipamt { get; set; }
      public decimal totweight { get; set; }
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
      public string warning { get; set; }
      [StringValidationAttribute]
      public string wletsetno { get; set; }
      public bool wlwhsefl { get; set; }
      public int wtauth { get; set; }
      public long wtehrecid { get; set; }
      [StringValidationAttribute]
      public string wtehrowid { get; set; }
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      [StringValidationAttribute]
      public string wttype { get; set; }
      [StringValidationAttribute]
      public string zipcd { get; set; }
      [StringValidationAttribute]
      public string zone { get; set; }
      [StringValidationAttribute]
      public string vaoeno { get; set; }
      [StringValidationAttribute]
      public string vaoename { get; set; }
      [StringValidationAttribute]
      public string pickedby { get; set; }
      [StringValidationAttribute]
      public string pkgid { get; set; }
      public int nopackages { get; set; }
      public DateTime? receiptdt { get; set; }
      public DateTime? shipdt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      public string CompleteAddress { get { return this.shiptoaddr1 + "," + this.shiptocity + "," + this.shiptost + "," + this.shiptozip; } }


      public static Wthdr BuildWthdrFromRow(DataRow row)
      {
         Wthdr entity = new Wthdr();
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addonamt2 = row.IsNull("addonamt2") ? decimal.Zero : row.Field<decimal>("addonamt2");
         entity.addondist1 = row.IsNull("addondist1") ? decimal.Zero : row.Field<decimal>("addondist1");
         entity.addondist2 = row.IsNull("addondist2") ? decimal.Zero : row.Field<decimal>("addondist2");
         entity.addonnet1 = row.IsNull("addonnet1") ? decimal.Zero : row.Field<decimal>("addonnet1");
         entity.addonnet2 = row.IsNull("addonnet2") ? decimal.Zero : row.Field<decimal>("addonnet2");
         entity.addontype1 = row.IsNull("addontype1") ? string.Empty : row.Field<string>("addontype1");
         entity.addontype2 = row.IsNull("addontype2") ? string.Empty : row.Field<string>("addontype2");
         entity.addr1 = row.IsNull("addr1") ? string.Empty : row.Field<string>("addr1");
         entity.addr2 = row.IsNull("addr2") ? string.Empty : row.Field<string>("addr2");
         entity.addr3 = row.IsNull("addr3") ? string.Empty : row.Field<string>("addr3");
         entity.approvety = row.IsNull("approvety") ? string.Empty : row.Field<string>("approvety");
         entity.boexistsfl = row.Field<bool>("boexistsfl");
         entity.borelfl = row.Field<bool>("borelfl");
         entity.bostage = row.IsNull("bostage") ? 0 : row.Field<int>("bostage");
         entity.city = row.IsNull("city") ? string.Empty : row.Field<string>("city");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.countrycd = row.IsNull("countrycd") ? string.Empty : row.Field<string>("countrycd");
         entity.createdby = row.IsNull("createdby") ? string.Empty : row.Field<string>("createdby");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.errormess = row.IsNull("errormess") ? string.Empty : row.Field<string>("errormess");
         entity.filler1 = row.IsNull("filler-1") ? string.Empty : row.Field<string>("filler-1");
         entity.filler2 = row.IsNull("filler-2") ? string.Empty : row.Field<string>("filler-2");
         entity.fmcountrycd = row.IsNull("fmcountrycd") ? string.Empty : row.Field<string>("fmcountrycd");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.linefl = row.Field<bool>("linefl");
         entity.locallymexicofl = row.Field<bool>("locallymexicofl");
         entity.lspinvregstatus = row.IsNull("lspinvregstatus") ? string.Empty : row.Field<string>("lspinvregstatus");
         entity.lspinvregstatdttmz = row.Field<DateTime?>("lspinvregstatdttmz");
         entity.markupaddonfl = row.Field<bool>("markupaddonfl");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.nolineitem = row.IsNull("nolineitem") ? 0 : row.Field<int>("nolineitem");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.orderdt = row.Field<DateTime?>("orderdt");
         entity.phoneno = row.IsNull("phoneno") ? string.Empty : row.Field<string>("phoneno");
         entity.reasoncode = row.IsNull("reasoncode") ? string.Empty : row.Field<string>("reasoncode");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shipinstr = row.IsNull("shipinstr") ? string.Empty : row.Field<string>("shipinstr");
         entity.extshipinstr = row.IsNull("extshipinstr") ? string.Empty : row.Field<string>("extshipinstr");
         entity.shippingpt = row.IsNull("shippingpt") ? string.Empty : row.Field<string>("shippingpt");
         entity.shiptoaddr1 = row.IsNull("shiptoaddr1") ? string.Empty : row.Field<string>("shiptoaddr1");
         entity.shiptoaddr2 = row.IsNull("shiptoaddr2") ? string.Empty : row.Field<string>("shiptoaddr2");
         entity.shiptoaddr3 = row.IsNull("shiptoaddr3") ? string.Empty : row.Field<string>("shiptoaddr3");
         entity.shiptocity = row.IsNull("shiptocity") ? string.Empty : row.Field<string>("shiptocity");
         entity.shiptonm = row.IsNull("shiptonm") ? string.Empty : row.Field<string>("shiptonm");
         entity.shiptophoneno = row.IsNull("shiptophoneno") ? string.Empty : row.Field<string>("shiptophoneno");
         entity.shiptost = row.IsNull("shiptost") ? string.Empty : row.Field<string>("shiptost");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.shiptozip = row.IsNull("shiptozip") ? string.Empty : row.Field<string>("shiptozip");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.stagearea = row.IsNull("stagearea") ? string.Empty : row.Field<string>("stagearea");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.stagecdx = row.IsNull("stagecdx") ? string.Empty : row.Field<string>("stagecdx");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         entity.totlineamt = row.IsNull("totlineamt") ? decimal.Zero : row.Field<decimal>("totlineamt");
         entity.totordamt = row.IsNull("totordamt") ? decimal.Zero : row.Field<decimal>("totordamt");
         entity.totqtyord = row.IsNull("totqtyord") ? decimal.Zero : row.Field<decimal>("totqtyord");
         entity.totqtyshp = row.IsNull("totqtyshp") ? decimal.Zero : row.Field<decimal>("totqtyshp");
         entity.totshipamt = row.IsNull("totshipamt") ? decimal.Zero : row.Field<decimal>("totshipamt");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
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
         entity.warning = row.IsNull("warning") ? string.Empty : row.Field<string>("warning");
         entity.wletsetno = row.IsNull("wletsetno") ? string.Empty : row.Field<string>("wletsetno");
         entity.wlwhsefl = row.Field<bool>("wlwhsefl");
         entity.wtauth = row.IsNull("wtauth") ? 0 : row.Field<int>("wtauth");
         entity.wtehrecid = row.IsNull("wtehrecid") ? 0 : row.Field<long>("wtehrecid");
         entity.wtehrowid = row.IsNull("wtehrowid") ? string.Empty : row.Field<string>("wtehrowid");
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.wttype = row.IsNull("wttype") ? string.Empty : row.Field<string>("wttype");
         entity.zipcd = row.IsNull("zipcd") ? string.Empty : row.Field<string>("zipcd");
         entity.zone = row.IsNull("zone") ? string.Empty : row.Field<string>("zone");
         entity.vaoeno = row.IsNull("vaoeno") ? string.Empty : row.Field<string>("vaoeno");
         entity.vaoename = row.IsNull("vaoename") ? string.Empty : row.Field<string>("vaoename");
         entity.pickedby = row.IsNull("pickedby") ? string.Empty : row.Field<string>("pickedby");
         entity.pkgid = row.IsNull("pkgid") ? string.Empty : row.Field<string>("pkgid");
         entity.nopackages = row.IsNull("nopackages") ? 0 : row.Field<int>("nopackages");
         entity.receiptdt = row.Field<DateTime?>("receiptdt");
         entity.shipdt = row.Field<DateTime?>("shipdt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWthdr(ref DataRow row, Wthdr entity)
      {
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addonamt2", entity.addonamt2);
         row.SetField("addondist1", entity.addondist1);
         row.SetField("addondist2", entity.addondist2);
         row.SetField("addonnet1", entity.addonnet1);
         row.SetField("addonnet2", entity.addonnet2);
         row.SetField("addontype1", entity.addontype1);
         row.SetField("addontype2", entity.addontype2);
         row.SetField("addr1", entity.addr1);
         row.SetField("addr2", entity.addr2);
         row.SetField("addr3", entity.addr3);
         row.SetField("approvety", entity.approvety);
         row.SetField("boexistsfl", entity.boexistsfl);
         row.SetField("borelfl", entity.borelfl);
         row.SetField("bostage", entity.bostage);
         row.SetField("city", entity.city);
         row.SetField("cono", entity.cono);
         row.SetField("cono2", entity.cono2);
         row.SetField("countrycd", entity.countrycd);
         row.SetField("createdby", entity.createdby);
         row.SetField("divno", entity.divno);
         row.SetField("duedt", entity.duedt);
         row.SetField("errormess", entity.errormess);
         row.SetField("filler-1", entity.filler1);
         row.SetField("filler-2", entity.filler2);
         row.SetField("fmcountrycd", entity.fmcountrycd);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("linefl", entity.linefl);
         row.SetField("locallymexicofl", entity.locallymexicofl);
         row.SetField("lspinvregstatus", entity.lspinvregstatus);
         row.SetField("lspinvregstatdttmz", entity.lspinvregstatdttmz);
         row.SetField("markupaddonfl", entity.markupaddonfl);
         row.SetField("name", entity.name);
         row.SetField("nolineitem", entity.nolineitem);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("orderdt", entity.orderdt);
         row.SetField("phoneno", entity.phoneno);
         row.SetField("reasoncode", entity.reasoncode);
         row.SetField("refer", entity.refer);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("secure", entity.secure);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shipinstr", entity.shipinstr);
         row.SetField("extshipinstr", entity.extshipinstr);
         row.SetField("shippingpt", entity.shippingpt);
         row.SetField("shiptoaddr1", entity.shiptoaddr1);
         row.SetField("shiptoaddr2", entity.shiptoaddr2);
         row.SetField("shiptoaddr3", entity.shiptoaddr3);
         row.SetField("shiptocity", entity.shiptocity);
         row.SetField("shiptonm", entity.shiptonm);
         row.SetField("shiptophoneno", entity.shiptophoneno);
         row.SetField("shiptost", entity.shiptost);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("shiptozip", entity.shiptozip);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("stagearea", entity.stagearea);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("stagecdx", entity.stagecdx);
         row.SetField("state", entity.state);
         row.SetField("totcubes", entity.totcubes);
         row.SetField("totlineamt", entity.totlineamt);
         row.SetField("totordamt", entity.totordamt);
         row.SetField("totqtyord", entity.totqtyord);
         row.SetField("totqtyshp", entity.totqtyshp);
         row.SetField("totshipamt", entity.totshipamt);
         row.SetField("totweight", entity.totweight);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
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
         row.SetField("warning", entity.warning);
         row.SetField("wletsetno", entity.wletsetno);
         row.SetField("wlwhsefl", entity.wlwhsefl);
         row.SetField("wtauth", entity.wtauth);
         row.SetField("wtehrecid", entity.wtehrecid);
         row.SetField("wtehrowid", entity.wtehrowid);
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("wttype", entity.wttype);
         row.SetField("zipcd", entity.zipcd);
         row.SetField("zone", entity.zone);
         row.SetField("vaoeno", entity.vaoeno);
         row.SetField("vaoename", entity.vaoename);
         row.SetField("pickedby", entity.pickedby);
         row.SetField("pkgid", entity.pkgid);
         row.SetField("nopackages", entity.nopackages);
         row.SetField("receiptdt", entity.receiptdt);
         row.SetField("shipdt", entity.shipdt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
