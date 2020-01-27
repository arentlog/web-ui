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
       
namespace Infor.Sxe.Common.Data.Models.JM
{
   /// <summary>
   /// Job Management Entry Change Order Request - Header
   /// </summary>
   
   public partial class JmechBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Job Identifier
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string jobid { get; set; }

      /// <summary>
      /// Revision #
      /// </summary>
      [Key,Order]
      public int jobrevno { get; set; }

      /// <summary>
      /// Change Request #
      /// </summary>
      [Key,Order]
      public int changereqno { get; set; }

      /// <summary>
      /// Quote #
      /// </summary>
      public int quoteno { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      public decimal custno { get; set; }

      /// <summary>
      /// Ship To
      /// </summary>
      [StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// Default Warehouse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Stage
      /// </summary>
      public int stagecd { get; set; }

      /// <summary>
      /// Enter Date
      /// </summary>
      public DateTime? enterdt { get; set; }

      /// <summary>
      /// Enter Time
      /// </summary>
      [StringValidationAttribute]
      public string entertm { get; set; }

      /// <summary>
      /// Due Date
      /// </summary>
      public DateTime? duedt { get; set; }

      /// <summary>
      /// Start Date
      /// </summary>
      public DateTime? begindt { get; set; }

      /// <summary>
      /// Expire Date
      /// </summary>
      public DateTime? expiredt { get; set; }

      /// <summary>
      /// Award Date
      /// </summary>
      public DateTime? awarddt { get; set; }

      /// <summary>
      /// Requested Ship Date
      /// </summary>
      public DateTime? reqshipdt { get; set; }

      /// <summary>
      /// Promised Date
      /// </summary>
      public DateTime? promisedt { get; set; }

      /// <summary>
      /// Bid Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }

      /// <summary>
      /// Taken By
      /// </summary>
      [StringValidationAttribute]
      public string takenby { get; set; }

      /// <summary>
      /// Awarded To
      /// </summary>
      [StringValidationAttribute]
      public string awardnm { get; set; }

      /// <summary>
      /// Award Note
      /// </summary>
      [StringValidationAttribute]
      public string awarddesc { get; set; }

      /// <summary>
      /// PO
      /// </summary>
      [StringValidationAttribute]
      public string custpo { get; set; }

      /// <summary>
      /// Contact Name
      /// </summary>
      [StringValidationAttribute]
      public string contact { get; set; }

      /// <summary>
      /// Contact Phone #
      /// </summary>
      [StringValidationAttribute]
      public string contactphno { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// Lost Business
      /// </summary>
      [StringValidationAttribute]
      public string lostbusty { get; set; }

      /// <summary>
      /// Open Initials
      /// </summary>
      [StringValidationAttribute]
      public string openinit { get; set; }

      /// <summary>
      /// Comm Type
      /// </summary>
      [StringValidationAttribute]
      public string commtype { get; set; }

      /// <summary>
      /// Terms
      /// </summary>
      [StringValidationAttribute]
      public string termstype { get; set; }

      /// <summary>
      /// Inside Salesrep
      /// </summary>
      [StringValidationAttribute]
      public string slsrepin { get; set; }

      /// <summary>
      /// Outside Salesrep
      /// </summary>
      [StringValidationAttribute]
      public string slsrepout { get; set; }

      /// <summary>
      /// Price Type
      /// </summary>
      [StringValidationAttribute]
      public string pricetype { get; set; }

      /// <summary>
      /// Price Level
      /// </summary>
      public int pricecd { get; set; }

      /// <summary>
      /// Disc Level
      /// </summary>
      public int disccd { get; set; }

      /// <summary>
      /// Release Process
      /// </summary>
      public bool relprocessfl { get; set; }

      /// <summary>
      /// Release Process Complete
      /// </summary>
      public bool relcompfl { get; set; }

      /// <summary>
      /// Release Initials
      /// </summary>
      [StringValidationAttribute]
      public string relinit { get; set; }

      /// <summary>
      /// Reference
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// Order Type
      /// </summary>
      [StringValidationAttribute]
      public string transtype { get; set; }

      /// <summary>
      /// Restrict Changes
      /// </summary>
      [StringValidationAttribute]
      public string restrictty { get; set; }

      /// <summary>
      /// Order Disposition
      /// </summary>
      [StringValidationAttribute]
      public string orderdisp { get; set; }

      /// <summary>
      /// Open To Release
      /// </summary>
      public bool opentorelfl { get; set; }

      /// <summary>
      /// Ship Via
      /// </summary>
      [StringValidationAttribute]
      public string shipviaty { get; set; }

      /// <summary>
      /// Lump Bill Amount
      /// </summary>
      public decimal lumpbillamt { get; set; }

      /// <summary>
      /// Lump Sum Bill
      /// </summary>
      public bool lumpbillfl { get; set; }

      /// <summary>
      /// Print Lump Prices
      /// </summary>
      public bool lumppricefl { get; set; }

      /// <summary>
      /// ARP Whse
      /// </summary>
      [StringValidationAttribute]
      public string arpwhse { get; set; }

      /// <summary>
      /// Appr
      /// </summary>
      [StringValidationAttribute]
      public string approvty { get; set; }

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
      /// Last Changed By
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
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Total Price
      /// </summary>
      public decimal totprice { get; set; }

      /// <summary>
      /// Toals Cost
      /// </summary>
      public decimal totcost { get; set; }

      /// <summary>
      /// Total Margin
      /// </summary>
      public decimal totmargin { get; set; }

      /// <summary>
      /// Product Line
      /// </summary>
      [StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Print Type
      /// </summary>
      [StringValidationAttribute]
      public string printtype { get; set; }

      /// <summary>
      /// Minimum Margin
      /// </summary>
      public decimal minmargin { get; set; }

      /// <summary>
      /// Total Ext Price
      /// </summary>
      public decimal totextprice { get; set; }

      /// <summary>
      /// Total Ext Cost
      /// </summary>
      public decimal totextcost { get; set; }

      /// <summary>
      /// Ship
      /// </summary>
      [StringValidationAttribute]
      public string shiptoaddr1 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr2 { get; set; }

      /// <summary>
      /// Ship
      /// </summary>
      [StringValidationAttribute]
      public string shiptoaddr3 { get; set; }

      /// <summary>
      /// City
      /// </summary>
      [StringValidationAttribute]
      public string shiptocity { get; set; }

      /// <summary>
      /// Ship To:
      /// </summary>
      [StringValidationAttribute]
      public string shiptonm { get; set; }

      /// <summary>
      /// shiptost
      /// </summary>
      [StringValidationAttribute]
      public string shiptost { get; set; }

      /// <summary>
      /// shiptozip
      /// </summary>
      [StringValidationAttribute]
      public string shiptozip { get; set; }

      /// <summary>
      /// Fax Phone
      /// </summary>
      [StringValidationAttribute]
      public string shiptofaxphoneno { get; set; }

      /// <summary>
      /// Phone
      /// </summary>
      [StringValidationAttribute]
      public string shiptophoneno { get; set; }

      /// <summary>
      /// Cancel
      /// </summary>
      public DateTime? canceldt { get; set; }

      /// <summary>
      /// Costs Approved?
      /// </summary>
      public bool costapprovfl { get; set; }

      /// <summary>
      /// Prices Approved?
      /// </summary>
      public bool prcapprovfl { get; set; }

      /// <summary>
      /// Released to Pricing Records?
      /// </summary>
      public bool relpricefl { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }


      /// <summary>
      /// string
      /// </summary>
      public string CompleteAddress { get { return this.shiptoaddr1 + "," + this.shiptocity + "," + this.shiptost + "," + this.shiptozip; } }


      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildJmechBaseFromRow<T>(DataRow row) where T:JmechBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.jobid = row.IsNull("jobid") ? string.Empty : row.Field<string>("jobid");
         entity.jobrevno = row.IsNull("jobrevno") ? 0 : row.Field<int>("jobrevno");
         entity.quoteno = row.IsNull("quoteno") ? 0 : row.Field<int>("quoteno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.entertm = row.IsNull("entertm") ? string.Empty : row.Field<string>("entertm");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.begindt = row.Field<DateTime?>("begindt");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.awarddt = row.Field<DateTime?>("awarddt");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.takenby = row.IsNull("takenby") ? string.Empty : row.Field<string>("takenby");
         entity.awardnm = row.IsNull("awardnm") ? string.Empty : row.Field<string>("awardnm");
         entity.awarddesc = row.IsNull("awarddesc") ? string.Empty : row.Field<string>("awarddesc");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.contact = row.IsNull("contact") ? string.Empty : row.Field<string>("contact");
         entity.contactphno = row.IsNull("contactphno") ? string.Empty : row.Field<string>("contactphno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.lostbusty = row.IsNull("lostbusty") ? string.Empty : row.Field<string>("lostbusty");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.commtype = row.IsNull("commtype") ? string.Empty : row.Field<string>("commtype");
         entity.termstype = row.IsNull("termstype") ? string.Empty : row.Field<string>("termstype");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.pricecd = row.IsNull("pricecd") ? 0 : row.Field<int>("pricecd");
         entity.disccd = row.IsNull("disccd") ? 0 : row.Field<int>("disccd");
         entity.relprocessfl = row.Field<bool>("relprocessfl");
         entity.relcompfl = row.Field<bool>("relcompfl");
         entity.relinit = row.IsNull("relinit") ? string.Empty : row.Field<string>("relinit");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.restrictty = row.IsNull("restrictty") ? string.Empty : row.Field<string>("restrictty");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.opentorelfl = row.Field<bool>("opentorelfl");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.lumpbillamt = row.IsNull("lumpbillamt") ? decimal.Zero : row.Field<decimal>("lumpbillamt");
         entity.lumpbillfl = row.Field<bool>("lumpbillfl");
         entity.lumppricefl = row.Field<bool>("lumppricefl");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
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
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.totprice = row.IsNull("totprice") ? decimal.Zero : row.Field<decimal>("totprice");
         entity.totcost = row.IsNull("totcost") ? decimal.Zero : row.Field<decimal>("totcost");
         entity.totmargin = row.IsNull("totmargin") ? decimal.Zero : row.Field<decimal>("totmargin");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.printtype = row.IsNull("printtype") ? string.Empty : row.Field<string>("printtype");
         entity.minmargin = row.IsNull("minmargin") ? decimal.Zero : row.Field<decimal>("minmargin");
         entity.changereqno = row.IsNull("changereqno") ? 0 : row.Field<int>("changereqno");
         entity.totextprice = row.IsNull("totextprice") ? decimal.Zero : row.Field<decimal>("totextprice");
         entity.totextcost = row.IsNull("totextcost") ? decimal.Zero : row.Field<decimal>("totextcost");
         entity.shiptoaddr1 = row.IsNull("shiptoaddr1") ? string.Empty : row.Field<string>("shiptoaddr1");
         entity.shiptoaddr2 = row.IsNull("shiptoaddr2") ? string.Empty : row.Field<string>("shiptoaddr2");
         entity.shiptoaddr3 = row.IsNull("shiptoaddr3") ? string.Empty : row.Field<string>("shiptoaddr3");
         entity.shiptocity = row.IsNull("shiptocity") ? string.Empty : row.Field<string>("shiptocity");
         entity.shiptonm = row.IsNull("shiptonm") ? string.Empty : row.Field<string>("shiptonm");
         entity.shiptost = row.IsNull("shiptost") ? string.Empty : row.Field<string>("shiptost");
         entity.shiptozip = row.IsNull("shiptozip") ? string.Empty : row.Field<string>("shiptozip");
         entity.shiptofaxphoneno = row.IsNull("shiptofaxphoneno") ? string.Empty : row.Field<string>("shiptofaxphoneno");
         entity.shiptophoneno = row.IsNull("shiptophoneno") ? string.Empty : row.Field<string>("shiptophoneno");
         entity.canceldt = row.Field<DateTime?>("canceldt");
         entity.costapprovfl = row.Field<bool>("costapprovfl");
         entity.prcapprovfl = row.Field<bool>("prcapprovfl");
         entity.relpricefl = row.Field<bool>("relpricefl");
         entity.rowID = row.Field<byte[]>("jmechRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromJmechBase(ref DataRow row, JmechBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jobid", entity.jobid);
         row.SetField("jobrevno", entity.jobrevno);
         row.SetField("quoteno", entity.quoteno);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("whse", entity.whse);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("entertm", entity.entertm);
         row.SetField("duedt", entity.duedt);
         row.SetField("begindt", entity.begindt);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("awarddt", entity.awarddt);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("takenby", entity.takenby);
         row.SetField("awardnm", entity.awardnm);
         row.SetField("awarddesc", entity.awarddesc);
         row.SetField("custpo", entity.custpo);
         row.SetField("contact", entity.contact);
         row.SetField("contactphno", entity.contactphno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("lostbusty", entity.lostbusty);
         row.SetField("openinit", entity.openinit);
         row.SetField("commtype", entity.commtype);
         row.SetField("termstype", entity.termstype);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("pricecd", entity.pricecd);
         row.SetField("disccd", entity.disccd);
         row.SetField("relprocessfl", entity.relprocessfl);
         row.SetField("relcompfl", entity.relcompfl);
         row.SetField("relinit", entity.relinit);
         row.SetField("refer", entity.refer);
         row.SetField("transtype", entity.transtype);
         row.SetField("restrictty", entity.restrictty);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("opentorelfl", entity.opentorelfl);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("lumpbillamt", entity.lumpbillamt);
         row.SetField("lumpbillfl", entity.lumpbillfl);
         row.SetField("lumppricefl", entity.lumppricefl);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("approvty", entity.approvty);
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
         row.SetField("vendno", entity.vendno);
         row.SetField("totprice", entity.totprice);
         row.SetField("totcost", entity.totcost);
         row.SetField("totmargin", entity.totmargin);
         row.SetField("prodline", entity.prodline);
         row.SetField("printtype", entity.printtype);
         row.SetField("minmargin", entity.minmargin);
         row.SetField("changereqno", entity.changereqno);
         row.SetField("totextprice", entity.totextprice);
         row.SetField("totextcost", entity.totextcost);
         row.SetField("shiptoaddr1", entity.shiptoaddr1);
         row.SetField("shiptoaddr2", entity.shiptoaddr2);
         row.SetField("shiptoaddr3", entity.shiptoaddr3);
         row.SetField("shiptocity", entity.shiptocity);
         row.SetField("shiptonm", entity.shiptonm);
         row.SetField("shiptost", entity.shiptost);
         row.SetField("shiptozip", entity.shiptozip);
         row.SetField("shiptofaxphoneno", entity.shiptofaxphoneno);
         row.SetField("shiptophoneno", entity.shiptophoneno);
         row.SetField("canceldt", entity.canceldt);
         row.SetField("costapprovfl", entity.costapprovfl);
         row.SetField("prcapprovfl", entity.prcapprovfl);
         row.SetField("relpricefl", entity.relpricefl);
         row.SetField("jmechRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, JmechBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jobid", entity.jobid);
         row.SetField("jobrevno", entity.jobrevno);
         row.SetField("changereqno", entity.changereqno);
         row.SetField("jmechRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	