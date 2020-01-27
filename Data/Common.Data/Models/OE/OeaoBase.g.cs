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
       
namespace Infor.Sxe.Common.Data.Models.OE
{
   /// <summary>
   /// Contains order number ranges for entire company. 
   /// </summary>
   
   public partial class OeaoBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Assign Order #
      /// </summary>
      [StringValidationAttribute]
      public string oeassnty { get; set; }

      /// <summary>
      /// OE #
      /// </summary>
      public int begordno { get; set; }

      /// <summary>
      /// Next Order #
      /// </summary>
      public int nextordno { get; set; }

      /// <summary>
      /// Ending Order #
      /// </summary>
      public int endordno { get; set; }

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
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// User 7
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
      /// eBuy Outbound Directory
      /// </summary>
      [StringValidationAttribute]
      public string ebuyoutdir { get; set; }

      /// <summary>
      /// Promo Price Default
      /// </summary>
      [StringValidationAttribute]
      public string promoprcdflt { get; set; }

      /// <summary>
      /// Credits Due Date Based On
      /// </summary>
      public bool credduedtfl { get; set; }

      /// <summary>
      /// Allow Req/Prom Date Entry On Lines For Non JIT
      /// </summary>
      public bool lndtentfl { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

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
      /// Skip Factor
      /// </summary>
      public int incval { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Auth Hold Code
      /// </summary>
      [StringValidationAttribute]
      public string ccholdauthcd { get; set; }

      /// <summary>
      /// Fail Hold Code
      /// </summary>
      [StringValidationAttribute]
      public string ccholdfailcd { get; set; }

      /// <summary>
      /// Addr Hold Code
      /// </summary>
      [StringValidationAttribute]
      public string ccholdaddrcd { get; set; }

      /// <summary>
      /// Seconds
      /// </summary>
      public int ccseconds { get; set; }

      /// <summary>
      /// Seconds Batch
      /// </summary>
      public int ccsecondsbp { get; set; }

      /// <summary>
      /// Retries
      /// </summary>
      public int ccretries { get; set; }

      /// <summary>
      /// Retries Batch
      /// </summary>
      public int ccretriesbp { get; set; }

      /// <summary>
      /// Minutes
      /// </summary>
      public int ccbatchminutes { get; set; }

      /// <summary>
      /// Batch Size
      /// </summary>
      public int ccbatchsize { get; set; }

      /// <summary>
      /// Ship Fully Tendered?
      /// </summary>
      [StringValidationAttribute]
      public string shiptender { get; set; }

      /// <summary>
      /// Prompt for Certification
      /// </summary>
      [StringValidationAttribute]
      public string certifiedprompt { get; set; }

      /// <summary>
      /// Certified Print
      /// </summary>
      public bool certifiedprint { get; set; }

      /// <summary>
      /// Hold Auth Default
      /// </summary>
      public bool authdefaultfl { get; set; }

      /// <summary>
      /// Have Tendering Give Create Card Prompt?
      /// </summary>
      public bool promptcreatecardfl { get; set; }

      /// <summary>
      /// Require Lost Business Reason
      /// </summary>
      public bool lostbusreasonfl { get; set; }

      /// <summary>
      /// Synchronize ARSC Records to CRM
      /// </summary>
      public bool synccrmarscfl { get; set; }

      /// <summary>
      /// Synchronize ARSS Records to CRM
      /// </summary>
      public bool synccrmarssfl { get; set; }

      /// <summary>
      /// Synchronize APSS Records to CRM
      /// </summary>
      public bool synccrmapssfl { get; set; }

      /// <summary>
      /// Synchronize APSV Records to CRM
      /// </summary>
      public bool synccrmapsvfl { get; set; }

      /// <summary>
      /// Synchronize CONTACTS Records to CRM
      /// </summary>
      public bool synccrmcontactsfl { get; set; }

      /// <summary>
      /// Synchronize CMSP Records to CRM
      /// </summary>
      public bool synccrmcmspfl { get; set; }

      /// <summary>
      /// Synchronize SMSN Records to CRM
      /// </summary>
      public bool synccrmsmsnfl { get; set; }

      /// <summary>
      /// Synchronize ARSC Records to MDD
      /// </summary>
      public bool syncmddarscfl { get; set; }

      /// <summary>
      /// Synchronize ICSC Records to MDD
      /// </summary>
      public bool syncmddicscfl { get; set; }

      /// <summary>
      /// Synchronize ARSS Records to MDD
      /// </summary>
      public bool syncmddarssfl { get; set; }

      /// <summary>
      /// Synchronize ICSP Records to MDD
      /// </summary>
      public bool syncmddicspfl { get; set; }

      /// <summary>
      /// Synchronize CONTACTS Records to MDD
      /// </summary>
      public bool syncmddcontactsfl { get; set; }

      /// <summary>
      /// Synchronize CMSP Records to MDD
      /// </summary>
      public bool syncmddcmspfl { get; set; }

      /// <summary>
      /// Synchronize OEEH Records to MDD
      /// </summary>
      public bool syncmddoeehfl { get; set; }

      /// <summary>
      /// Dollar Hold Type
      /// </summary>
      [StringValidationAttribute]
      public string oedolholdty { get; set; }

      /// <summary>
      /// Margin Hold Type
      /// </summary>
      [StringValidationAttribute]
      public string oemrgholdty { get; set; }

      /// <summary>
      /// Invoice Tolerance Min Amt
      /// </summary>
      public decimal apinvtolminamt { get; set; }

      /// <summary>
      /// Event Mgr OE Hdr Margin Calc
      /// </summary>
      [StringValidationAttribute]
      public string emoemarginty { get; set; }

      /// <summary>
      /// DNR Whse Tie
      /// </summary>
      [StringValidationAttribute]
      public string dnrwttiety { get; set; }

      /// <summary>
      /// Override Contractual Pricing
      /// </summary>
      public bool multlvlcntrfl { get; set; }

      /// <summary>
      /// Multiple Level Pricing
      /// </summary>
      public bool multlvlprcfl { get; set; }

      /// <summary>
      /// Rebate Type Used
      /// </summary>
      [StringValidationAttribute]
      public string multlvlrebty { get; set; }

      /// <summary>
      /// Override Product Rebate
      /// </summary>
      public bool multlvlprodfl { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOeaoBaseFromRow<T>(DataRow row) where T:OeaoBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.oeassnty = row.IsNull("oeassnty") ? string.Empty : row.Field<string>("oeassnty");
         entity.begordno = row.IsNull("begordno") ? 0 : row.Field<int>("begordno");
         entity.nextordno = row.IsNull("nextordno") ? 0 : row.Field<int>("nextordno");
         entity.endordno = row.IsNull("endordno") ? 0 : row.Field<int>("endordno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.ebuyoutdir = row.IsNull("ebuyoutdir") ? string.Empty : row.Field<string>("ebuyoutdir");
         entity.promoprcdflt = row.IsNull("promoprcdflt") ? string.Empty : row.Field<string>("promoprcdflt");
         entity.credduedtfl = row.Field<bool>("credduedtfl");
         entity.lndtentfl = row.Field<bool>("lndtentfl");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.incval = row.IsNull("incval") ? 0 : row.Field<int>("incval");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.ccholdauthcd = row.IsNull("ccholdauthcd") ? string.Empty : row.Field<string>("ccholdauthcd");
         entity.ccholdfailcd = row.IsNull("ccholdfailcd") ? string.Empty : row.Field<string>("ccholdfailcd");
         entity.ccholdaddrcd = row.IsNull("ccholdaddrcd") ? string.Empty : row.Field<string>("ccholdaddrcd");
         entity.ccseconds = row.IsNull("ccseconds") ? 0 : row.Field<int>("ccseconds");
         entity.ccsecondsbp = row.IsNull("ccsecondsbp") ? 0 : row.Field<int>("ccsecondsbp");
         entity.ccretries = row.IsNull("ccretries") ? 0 : row.Field<int>("ccretries");
         entity.ccretriesbp = row.IsNull("ccretriesbp") ? 0 : row.Field<int>("ccretriesbp");
         entity.ccbatchminutes = row.IsNull("ccbatchminutes") ? 0 : row.Field<int>("ccbatchminutes");
         entity.ccbatchsize = row.IsNull("ccbatchsize") ? 0 : row.Field<int>("ccbatchsize");
         entity.shiptender = row.IsNull("shiptender") ? string.Empty : row.Field<string>("shiptender");
         entity.certifiedprompt = row.IsNull("certifiedprompt") ? string.Empty : row.Field<string>("certifiedprompt");
         entity.certifiedprint = row.Field<bool>("certifiedprint");
         entity.authdefaultfl = row.Field<bool>("authdefaultfl");
         entity.promptcreatecardfl = row.Field<bool>("promptcreatecardfl");
         entity.lostbusreasonfl = row.Field<bool>("lostbusreasonfl");
         entity.synccrmarscfl = row.Field<bool>("synccrmarscfl");
         entity.synccrmarssfl = row.Field<bool>("synccrmarssfl");
         entity.synccrmapssfl = row.Field<bool>("synccrmapssfl");
         entity.synccrmapsvfl = row.Field<bool>("synccrmapsvfl");
         entity.synccrmcontactsfl = row.Field<bool>("synccrmcontactsfl");
         entity.synccrmcmspfl = row.Field<bool>("synccrmcmspfl");
         entity.synccrmsmsnfl = row.Field<bool>("synccrmsmsnfl");
         entity.syncmddarscfl = row.Field<bool>("syncmddarscfl");
         entity.syncmddicscfl = row.Field<bool>("syncmddicscfl");
         entity.syncmddarssfl = row.Field<bool>("syncmddarssfl");
         entity.syncmddicspfl = row.Field<bool>("syncmddicspfl");
         entity.syncmddcontactsfl = row.Field<bool>("syncmddcontactsfl");
         entity.syncmddcmspfl = row.Field<bool>("syncmddcmspfl");
         entity.syncmddoeehfl = row.Field<bool>("syncmddoeehfl");
         entity.oedolholdty = row.IsNull("oedolholdty") ? string.Empty : row.Field<string>("oedolholdty");
         entity.oemrgholdty = row.IsNull("oemrgholdty") ? string.Empty : row.Field<string>("oemrgholdty");
         entity.apinvtolminamt = row.IsNull("apinvtolminamt") ? decimal.Zero : row.Field<decimal>("apinvtolminamt");
         entity.emoemarginty = row.IsNull("emoemarginty") ? string.Empty : row.Field<string>("emoemarginty");
         entity.dnrwttiety = row.IsNull("dnrwttiety") ? string.Empty : row.Field<string>("dnrwttiety");
         entity.multlvlcntrfl = row.Field<bool>("multlvlcntrfl");
         entity.multlvlprcfl = row.Field<bool>("multlvlprcfl");
         entity.multlvlrebty = row.IsNull("multlvlrebty") ? string.Empty : row.Field<string>("multlvlrebty");
         entity.multlvlprodfl = row.Field<bool>("multlvlprodfl");
         entity.rowID = row.Field<byte[]>("oeaoRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeaoBase(ref DataRow row, OeaoBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("oeassnty", entity.oeassnty);
         row.SetField("begordno", entity.begordno);
         row.SetField("nextordno", entity.nextordno);
         row.SetField("endordno", entity.endordno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("ebuyoutdir", entity.ebuyoutdir);
         row.SetField("promoprcdflt", entity.promoprcdflt);
         row.SetField("credduedtfl", entity.credduedtfl);
         row.SetField("lndtentfl", entity.lndtentfl);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("incval", entity.incval);
         row.SetField("transproc", entity.transproc);
         row.SetField("ccholdauthcd", entity.ccholdauthcd);
         row.SetField("ccholdfailcd", entity.ccholdfailcd);
         row.SetField("ccholdaddrcd", entity.ccholdaddrcd);
         row.SetField("ccseconds", entity.ccseconds);
         row.SetField("ccsecondsbp", entity.ccsecondsbp);
         row.SetField("ccretries", entity.ccretries);
         row.SetField("ccretriesbp", entity.ccretriesbp);
         row.SetField("ccbatchminutes", entity.ccbatchminutes);
         row.SetField("ccbatchsize", entity.ccbatchsize);
         row.SetField("shiptender", entity.shiptender);
         row.SetField("certifiedprompt", entity.certifiedprompt);
         row.SetField("certifiedprint", entity.certifiedprint);
         row.SetField("authdefaultfl", entity.authdefaultfl);
         row.SetField("promptcreatecardfl", entity.promptcreatecardfl);
         row.SetField("lostbusreasonfl", entity.lostbusreasonfl);
         row.SetField("synccrmarscfl", entity.synccrmarscfl);
         row.SetField("synccrmarssfl", entity.synccrmarssfl);
         row.SetField("synccrmapssfl", entity.synccrmapssfl);
         row.SetField("synccrmapsvfl", entity.synccrmapsvfl);
         row.SetField("synccrmcontactsfl", entity.synccrmcontactsfl);
         row.SetField("synccrmcmspfl", entity.synccrmcmspfl);
         row.SetField("synccrmsmsnfl", entity.synccrmsmsnfl);
         row.SetField("syncmddarscfl", entity.syncmddarscfl);
         row.SetField("syncmddicscfl", entity.syncmddicscfl);
         row.SetField("syncmddarssfl", entity.syncmddarssfl);
         row.SetField("syncmddicspfl", entity.syncmddicspfl);
         row.SetField("syncmddcontactsfl", entity.syncmddcontactsfl);
         row.SetField("syncmddcmspfl", entity.syncmddcmspfl);
         row.SetField("syncmddoeehfl", entity.syncmddoeehfl);
         row.SetField("oedolholdty", entity.oedolholdty);
         row.SetField("oemrgholdty", entity.oemrgholdty);
         row.SetField("apinvtolminamt", entity.apinvtolminamt);
         row.SetField("emoemarginty", entity.emoemarginty);
         row.SetField("dnrwttiety", entity.dnrwttiety);
         row.SetField("multlvlcntrfl", entity.multlvlcntrfl);
         row.SetField("multlvlprcfl", entity.multlvlprcfl);
         row.SetField("multlvlrebty", entity.multlvlrebty);
         row.SetField("multlvlprodfl", entity.multlvlprodfl);
         row.SetField("oeaoRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OeaoBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("oeaoRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	