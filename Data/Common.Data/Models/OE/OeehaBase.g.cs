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
   /// Credit Card Transaction File   
   /// </summary>
   
   public partial class OeehaBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Order #
      /// </summary>
      [Key,Order]
      public int orderno { get; set; }

      /// <summary>
      /// Order Suffix
      /// </summary>
      [Key,Order]
      public int ordersuf { get; set; }

      /// <summary>
      /// Card Type
      /// </summary>
      [Key,Order]
      public int mediacd { get; set; }

      /// <summary>
      /// Credit Card #
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string cardno { get; set; }

      /// <summary>
      /// Transaction
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string transcd { get; set; }

      /// <summary>
      /// Sequence #
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      public int processcd { get; set; }

      /// <summary>
      /// Communication Status
      /// </summary>
      public int commcd { get; set; }

      /// <summary>
      /// Processor
      /// </summary>
      public int processno { get; set; }

      /// <summary>
      /// Amount
      /// </summary>
      public decimal amount { get; set; }

      /// <summary>
      /// Authorization Amount
      /// </summary>
      public decimal authamt { get; set; }

      /// <summary>
      /// Invoiced Amount
      /// </summary>
      public decimal saleamt { get; set; }

      /// <summary>
      /// PreAuthorization #
      /// </summary>
      public int preauthno { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string category { get; set; }

      /// <summary>
      /// Response
      /// </summary>
      [StringValidationAttribute]
      public string response { get; set; }

      /// <summary>
      /// Authorization
      /// </summary>
      public int mediaauth { get; set; }

      /// <summary>
      /// Create Date
      /// </summary>
      public DateTime? createdt { get; set; }

      /// <summary>
      /// Create Time
      /// </summary>
      [StringValidationAttribute]
      public string createtm { get; set; }

      /// <summary>
      /// Submit Date
      /// </summary>
      public DateTime? submitdt { get; set; }

      /// <summary>
      /// Submit Time
      /// </summary>
      [StringValidationAttribute]
      public string submittm { get; set; }

      /// <summary>
      /// Response Date
      /// </summary>
      public DateTime? respdt { get; set; }

      /// <summary>
      /// Response Time
      /// </summary>
      [StringValidationAttribute]
      public string resptm { get; set; }

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
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Bank #
      /// </summary>
      public int bankno { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      public bool statustype { get; set; }

      /// <summary>
      /// Created During
      /// </summary>
      [StringValidationAttribute]
      public string currproc { get; set; }

      /// <summary>
      /// Address Verification
      /// </summary>
      [StringValidationAttribute]
      public string avadd { get; set; }

      /// <summary>
      /// Address Verification Zip
      /// </summary>
      [StringValidationAttribute]
      public string avzip { get; set; }

      /// <summary>
      /// CPC Destination Zip Code
      /// </summary>
      [StringValidationAttribute]
      public string destzip { get; set; }

      /// <summary>
      /// CPC Tax Amount
      /// </summary>
      public decimal taxamt { get; set; }

      /// <summary>
      /// CPC Card ID
      /// </summary>
      public int cardid { get; set; }

      /// <summary>
      /// ICVerify CMC
      /// </summary>
      [StringValidationAttribute]
      public string cmc { get; set; }

      /// <summary>
      /// ICVerify CMM
      /// </summary>
      [StringValidationAttribute]
      public string cmm { get; set; }

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
      /// PreAuthorization
      /// </summary>
      [StringValidationAttribute]
      public string charpreauth { get; set; }

      /// <summary>
      /// Authorization
      /// </summary>
      [StringValidationAttribute]
      public string charmediaauth { get; set; }

      /// <summary>
      /// Original Auth Amount
      /// </summary>
      public decimal origamt { get; set; }

      /// <summary>
      /// Backorder Suffix
      /// </summary>
      public int bosuf { get; set; }

      /// <summary>
      /// Original Process Code
      /// </summary>
      public int origproccd { get; set; }

      /// <summary>
      /// Expiration Date
      /// </summary>
      [StringValidationAttribute]
      public string exp { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Hold Credit Card
      /// </summary>
      public bool ccholdbofl { get; set; }

      /// <summary>
      /// Merchant ID
      /// </summary>
      [StringValidationAttribute]
      public string merchantid { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOeehaBaseFromRow<T>(DataRow row) where T:OeehaBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.mediacd = row.IsNull("mediacd") ? 0 : row.Field<int>("mediacd");
         entity.cardno = row.IsNull("cardno") ? string.Empty : row.Field<string>("cardno");
         entity.transcd = row.IsNull("transcd") ? string.Empty : row.Field<string>("transcd");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.processcd = row.IsNull("processcd") ? 0 : row.Field<int>("processcd");
         entity.commcd = row.IsNull("commcd") ? 0 : row.Field<int>("commcd");
         entity.processno = row.IsNull("processno") ? 0 : row.Field<int>("processno");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.authamt = row.IsNull("authamt") ? decimal.Zero : row.Field<decimal>("authamt");
         entity.saleamt = row.IsNull("saleamt") ? decimal.Zero : row.Field<decimal>("saleamt");
         entity.preauthno = row.IsNull("preauthno") ? 0 : row.Field<int>("preauthno");
         entity.category = row.IsNull("category") ? string.Empty : row.Field<string>("category");
         entity.response = row.IsNull("response") ? string.Empty : row.Field<string>("response");
         entity.mediaauth = row.IsNull("mediaauth") ? 0 : row.Field<int>("mediaauth");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.createtm = row.IsNull("createtm") ? string.Empty : row.Field<string>("createtm");
         entity.submitdt = row.Field<DateTime?>("submitdt");
         entity.submittm = row.IsNull("submittm") ? string.Empty : row.Field<string>("submittm");
         entity.respdt = row.Field<DateTime?>("respdt");
         entity.resptm = row.IsNull("resptm") ? string.Empty : row.Field<string>("resptm");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.statustype = row.Field<bool>("statustype");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.avadd = row.IsNull("avadd") ? string.Empty : row.Field<string>("avadd");
         entity.avzip = row.IsNull("avzip") ? string.Empty : row.Field<string>("avzip");
         entity.destzip = row.IsNull("destzip") ? string.Empty : row.Field<string>("destzip");
         entity.taxamt = row.IsNull("taxamt") ? decimal.Zero : row.Field<decimal>("taxamt");
         entity.cardid = row.IsNull("cardid") ? 0 : row.Field<int>("cardid");
         entity.cmc = row.IsNull("cmc") ? string.Empty : row.Field<string>("cmc");
         entity.cmm = row.IsNull("cmm") ? string.Empty : row.Field<string>("cmm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.charpreauth = row.IsNull("charpreauth") ? string.Empty : row.Field<string>("charpreauth");
         entity.charmediaauth = row.IsNull("charmediaauth") ? string.Empty : row.Field<string>("charmediaauth");
         entity.origamt = row.IsNull("origamt") ? decimal.Zero : row.Field<decimal>("origamt");
         entity.bosuf = row.IsNull("bosuf") ? 0 : row.Field<int>("bosuf");
         entity.origproccd = row.IsNull("origproccd") ? 0 : row.Field<int>("origproccd");
         entity.exp = row.IsNull("exp") ? string.Empty : row.Field<string>("exp");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.ccholdbofl = row.Field<bool>("ccholdbofl");
         entity.merchantid = row.IsNull("merchantid") ? string.Empty : row.Field<string>("merchantid");
         entity.rowID = row.Field<byte[]>("oeehaRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeehaBase(ref DataRow row, OeehaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("mediacd", entity.mediacd);
         row.SetField("cardno", entity.cardno);
         row.SetField("transcd", entity.transcd);
         row.SetField("seqno", entity.seqno);
         row.SetField("processcd", entity.processcd);
         row.SetField("commcd", entity.commcd);
         row.SetField("processno", entity.processno);
         row.SetField("amount", entity.amount);
         row.SetField("authamt", entity.authamt);
         row.SetField("saleamt", entity.saleamt);
         row.SetField("preauthno", entity.preauthno);
         row.SetField("category", entity.category);
         row.SetField("response", entity.response);
         row.SetField("mediaauth", entity.mediaauth);
         row.SetField("createdt", entity.createdt);
         row.SetField("createtm", entity.createtm);
         row.SetField("submitdt", entity.submitdt);
         row.SetField("submittm", entity.submittm);
         row.SetField("respdt", entity.respdt);
         row.SetField("resptm", entity.resptm);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("bankno", entity.bankno);
         row.SetField("statustype", entity.statustype);
         row.SetField("currproc", entity.currproc);
         row.SetField("avadd", entity.avadd);
         row.SetField("avzip", entity.avzip);
         row.SetField("destzip", entity.destzip);
         row.SetField("taxamt", entity.taxamt);
         row.SetField("cardid", entity.cardid);
         row.SetField("cmc", entity.cmc);
         row.SetField("cmm", entity.cmm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("charpreauth", entity.charpreauth);
         row.SetField("charmediaauth", entity.charmediaauth);
         row.SetField("origamt", entity.origamt);
         row.SetField("bosuf", entity.bosuf);
         row.SetField("origproccd", entity.origproccd);
         row.SetField("exp", entity.exp);
         row.SetField("transproc", entity.transproc);
         row.SetField("ccholdbofl", entity.ccholdbofl);
         row.SetField("merchantid", entity.merchantid);
         row.SetField("oeehaRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OeehaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("mediacd", entity.mediacd);
         row.SetField("cardno", entity.cardno);
         row.SetField("transcd", entity.transcd);
         row.SetField("seqno", entity.seqno);
         row.SetField("oeehaRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	