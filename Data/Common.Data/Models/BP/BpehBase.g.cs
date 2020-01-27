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
       
namespace Infor.Sxe.Common.Data.Models.BP
{
   /// <summary>
   /// Bid Prep Entry Header
   /// </summary>
   
   public partial class BpehBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Bid Identifier
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string bpid { get; set; }

      /// <summary>
      /// Revision #
      /// </summary>
      [Key,Order]
      public int revno { get; set; }

      /// <summary>
      /// Quote #
      /// </summary>
      public int quoteno { get; set; }

      /// <summary>
      /// Ship To:
      /// </summary>
      [StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// Customer/Prospect #
      /// </summary>
      [StringValidationAttribute]
      public string custpros { get; set; }

      /// <summary>
      /// Bid Type
      /// </summary>
      [StringValidationAttribute]
      public string bptype { get; set; }

      /// <summary>
      /// C/P
      /// </summary>
      [StringValidationAttribute]
      public string cptype { get; set; }

      /// <summary>
      /// Default Warehouse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Bid Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }

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
      /// Taken By
      /// </summary>
      [StringValidationAttribute]
      public string takenby { get; set; }

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
      /// Comm Type
      /// </summary>
      [StringValidationAttribute]
      public string commtype { get; set; }

      /// <summary>
      /// Paragraph #
      /// </summary>
      [StringValidationAttribute]
      public string lettercd1 { get; set; }
      [StringValidationAttribute]
      public string lettercd2 { get; set; }
      [StringValidationAttribute]
      public string lettercd3 { get; set; }
      [StringValidationAttribute]
      public string lettercd4 { get; set; }
      [StringValidationAttribute]
      public string lettercd5 { get; set; }
      [StringValidationAttribute]
      public string lettercd6 { get; set; }

      /// <summary>
      /// Stage
      /// </summary>
      public int stagecd { get; set; }

      /// <summary>
      /// Awarded To:
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
      /// User 8
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Revision
      /// </summary>
      [StringValidationAttribute]
      public string revision { get; set; }

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
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Changed By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

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
      /// Highest Revision
      /// </summary>
      public int hirevno { get; set; }

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
      /// Submit Lock
      /// </summary>
      public bool submitfl { get; set; }

      /// <summary>
      /// origcustpros
      /// </summary>
      [StringValidationAttribute]
      public string origcustpros { get; set; }

      /// <summary>
      /// origcptype
      /// </summary>
      [StringValidationAttribute]
      public string origcptype { get; set; }

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
      /// Use Ship To
      /// </summary>
      public bool useshiptofl { get; set; }

      /// <summary>
      /// Use Whse
      /// </summary>
      public bool usewhsefl { get; set; }

      /// <summary>
      /// Overwrite Existing PDSC
      /// </summary>
      public bool overpdscfl { get; set; }

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
      /// Requested Ship Date
      /// </summary>
      public DateTime? reqshipdt { get; set; }

      /// <summary>
      /// Promised Date
      /// </summary>
      public DateTime? promisedt { get; set; }

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
      /// Invoice To
      /// </summary>
      public decimal fpcustno { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildBpehBaseFromRow<T>(DataRow row) where T:BpehBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.bpid = row.IsNull("bpid") ? string.Empty : row.Field<string>("bpid");
         entity.revno = row.IsNull("revno") ? 0 : row.Field<int>("revno");
         entity.quoteno = row.IsNull("quoteno") ? 0 : row.Field<int>("quoteno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.custpros = row.IsNull("custpros") ? string.Empty : row.Field<string>("custpros");
         entity.bptype = row.IsNull("bptype") ? string.Empty : row.Field<string>("bptype");
         entity.cptype = row.IsNull("cptype") ? string.Empty : row.Field<string>("cptype");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.entertm = row.IsNull("entertm") ? string.Empty : row.Field<string>("entertm");
         entity.takenby = row.IsNull("takenby") ? string.Empty : row.Field<string>("takenby");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.begindt = row.Field<DateTime?>("begindt");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.awarddt = row.Field<DateTime?>("awarddt");
         entity.commtype = row.IsNull("commtype") ? string.Empty : row.Field<string>("commtype");
         entity.lettercd1 = row.IsNull("lettercd1") ? string.Empty : row.Field<string>("lettercd1");
         entity.lettercd2 = row.IsNull("lettercd2") ? string.Empty : row.Field<string>("lettercd2");
         entity.lettercd3 = row.IsNull("lettercd3") ? string.Empty : row.Field<string>("lettercd3");
         entity.lettercd4 = row.IsNull("lettercd4") ? string.Empty : row.Field<string>("lettercd4");
         entity.lettercd5 = row.IsNull("lettercd5") ? string.Empty : row.Field<string>("lettercd5");
         entity.lettercd6 = row.IsNull("lettercd6") ? string.Empty : row.Field<string>("lettercd6");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.awardnm = row.IsNull("awardnm") ? string.Empty : row.Field<string>("awardnm");
         entity.awarddesc = row.IsNull("awarddesc") ? string.Empty : row.Field<string>("awarddesc");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.revision = row.IsNull("revision") ? string.Empty : row.Field<string>("revision");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.contact = row.IsNull("contact") ? string.Empty : row.Field<string>("contact");
         entity.contactphno = row.IsNull("contactphno") ? string.Empty : row.Field<string>("contactphno");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.lostbusty = row.IsNull("lostbusty") ? string.Empty : row.Field<string>("lostbusty");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.termstype = row.IsNull("termstype") ? string.Empty : row.Field<string>("termstype");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.hirevno = row.IsNull("hirevno") ? 0 : row.Field<int>("hirevno");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.pricecd = row.IsNull("pricecd") ? 0 : row.Field<int>("pricecd");
         entity.disccd = row.IsNull("disccd") ? 0 : row.Field<int>("disccd");
         entity.submitfl = row.Field<bool>("submitfl");
         entity.origcustpros = row.IsNull("origcustpros") ? string.Empty : row.Field<string>("origcustpros");
         entity.origcptype = row.IsNull("origcptype") ? string.Empty : row.Field<string>("origcptype");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.relprocessfl = row.Field<bool>("relprocessfl");
         entity.relcompfl = row.Field<bool>("relcompfl");
         entity.relinit = row.IsNull("relinit") ? string.Empty : row.Field<string>("relinit");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.useshiptofl = row.Field<bool>("useshiptofl");
         entity.usewhsefl = row.Field<bool>("usewhsefl");
         entity.overpdscfl = row.Field<bool>("overpdscfl");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.restrictty = row.IsNull("restrictty") ? string.Empty : row.Field<string>("restrictty");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.opentorelfl = row.Field<bool>("opentorelfl");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.lumpbillamt = row.IsNull("lumpbillamt") ? decimal.Zero : row.Field<decimal>("lumpbillamt");
         entity.lumpbillfl = row.Field<bool>("lumpbillfl");
         entity.lumppricefl = row.Field<bool>("lumppricefl");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.fpcustno = row.IsNull("fpcustno") ? decimal.Zero : row.Field<decimal>("fpcustno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("bpehRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBpehBase(ref DataRow row, BpehBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bpid", entity.bpid);
         row.SetField("revno", entity.revno);
         row.SetField("quoteno", entity.quoteno);
         row.SetField("shipto", entity.shipto);
         row.SetField("custpros", entity.custpros);
         row.SetField("bptype", entity.bptype);
         row.SetField("cptype", entity.cptype);
         row.SetField("whse", entity.whse);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("entertm", entity.entertm);
         row.SetField("takenby", entity.takenby);
         row.SetField("duedt", entity.duedt);
         row.SetField("begindt", entity.begindt);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("awarddt", entity.awarddt);
         row.SetField("commtype", entity.commtype);
         row.SetField("lettercd1", entity.lettercd1);
         row.SetField("lettercd2", entity.lettercd2);
         row.SetField("lettercd3", entity.lettercd3);
         row.SetField("lettercd4", entity.lettercd4);
         row.SetField("lettercd5", entity.lettercd5);
         row.SetField("lettercd6", entity.lettercd6);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("awardnm", entity.awardnm);
         row.SetField("awarddesc", entity.awarddesc);
         row.SetField("custpo", entity.custpo);
         row.SetField("user9", entity.user9);
         row.SetField("revision", entity.revision);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("contact", entity.contact);
         row.SetField("contactphno", entity.contactphno);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("lostbusty", entity.lostbusty);
         row.SetField("openinit", entity.openinit);
         row.SetField("termstype", entity.termstype);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("hirevno", entity.hirevno);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("pricecd", entity.pricecd);
         row.SetField("disccd", entity.disccd);
         row.SetField("submitfl", entity.submitfl);
         row.SetField("origcustpros", entity.origcustpros);
         row.SetField("origcptype", entity.origcptype);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("relprocessfl", entity.relprocessfl);
         row.SetField("relcompfl", entity.relcompfl);
         row.SetField("relinit", entity.relinit);
         row.SetField("refer", entity.refer);
         row.SetField("useshiptofl", entity.useshiptofl);
         row.SetField("usewhsefl", entity.usewhsefl);
         row.SetField("overpdscfl", entity.overpdscfl);
         row.SetField("transtype", entity.transtype);
         row.SetField("restrictty", entity.restrictty);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("opentorelfl", entity.opentorelfl);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("lumpbillamt", entity.lumpbillamt);
         row.SetField("lumpbillfl", entity.lumpbillfl);
         row.SetField("lumppricefl", entity.lumppricefl);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("approvty", entity.approvty);
         row.SetField("fpcustno", entity.fpcustno);
         row.SetField("transproc", entity.transproc);
         row.SetField("bpehRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, BpehBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bpid", entity.bpid);
         row.SetField("revno", entity.revno);
         row.SetField("bpehRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	