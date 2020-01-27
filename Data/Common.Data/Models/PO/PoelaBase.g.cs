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
       
namespace Infor.Sxe.Common.Data.Models.PO
{
   /// <summary>
   /// PO Costing Addons
   /// </summary>
   
   public partial class PoelaBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Addons
      /// </summary>
      [Key,Order]
      public int addonno { get; set; }

      /// <summary>
      /// PO #
      /// </summary>
      [Key,Order]
      public int pono { get; set; }

      /// <summary>
      /// PO Suffix
      /// </summary>
      [Key,Order]
      public int posuf { get; set; }

      /// <summary>
      /// Line#
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Jrnl #
      /// </summary>
      [Key,Order]
      public int jrnlno { get; set; }

      /// <summary>
      /// Set #
      /// </summary>
      [Key,Order]
      public int setno { get; set; }

      /// <summary>
      /// Bundle ID
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string bundleid { get; set; }

      /// <summary>
      /// Comp Seq#
      /// </summary>
      [Key,Order]
      public int compseqno { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Currency
      /// </summary>
      [StringValidationAttribute]
      public string currencyty { get; set; }

      /// <summary>
      /// Addon Amt
      /// </summary>
      public decimal addonamt { get; set; }

      /// <summary>
      /// Updated?
      /// </summary>
      public bool updatefl { get; set; }

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
      /// Source
      /// </summary>
      [StringValidationAttribute]
      public string src { get; set; }

      /// <summary>
      /// Exchange Rate
      /// </summary>
      public decimal exchgrate1 { get; set; }
      public decimal exchgrate2 { get; set; }

      /// <summary>
      /// alloctype
      /// </summary>
      [StringValidationAttribute]
      public string alloctype { get; set; }

      /// <summary>
      /// Amt Uninv
      /// </summary>
      public decimal uninvamt { get; set; }

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
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// APET Jrnl #
      /// </summary>
      public int apetjrnlno { get; set; }

      /// <summary>
      /// APET Set #
      /// </summary>
      public int apetsetno { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPoelaBaseFromRow<T>(DataRow row) where T:PoelaBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.addonno = row.IsNull("addonno") ? 0 : row.Field<int>("addonno");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.addonamt = row.IsNull("addonamt") ? decimal.Zero : row.Field<decimal>("addonamt");
         entity.updatefl = row.Field<bool>("updatefl");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.bundleid = row.IsNull("bundleid") ? string.Empty : row.Field<string>("bundleid");
         entity.src = row.IsNull("src") ? string.Empty : row.Field<string>("src");
         entity.exchgrate1 = row.IsNull("exchgrate1") ? decimal.Zero : row.Field<decimal>("exchgrate1");
         entity.exchgrate2 = row.IsNull("exchgrate2") ? decimal.Zero : row.Field<decimal>("exchgrate2");
         entity.alloctype = row.IsNull("alloctype") ? string.Empty : row.Field<string>("alloctype");
         entity.uninvamt = row.IsNull("uninvamt") ? decimal.Zero : row.Field<decimal>("uninvamt");
         entity.compseqno = row.IsNull("compseqno") ? 0 : row.Field<int>("compseqno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.apetjrnlno = row.IsNull("apetjrnlno") ? 0 : row.Field<int>("apetjrnlno");
         entity.apetsetno = row.IsNull("apetsetno") ? 0 : row.Field<int>("apetsetno");
         entity.rowID = row.Field<byte[]>("poelaRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoelaBase(ref DataRow row, PoelaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("vendno", entity.vendno);
         row.SetField("addonno", entity.addonno);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("addonamt", entity.addonamt);
         row.SetField("updatefl", entity.updatefl);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("bundleid", entity.bundleid);
         row.SetField("src", entity.src);
         row.SetField("exchgrate1", entity.exchgrate1);
         row.SetField("exchgrate2", entity.exchgrate2);
         row.SetField("alloctype", entity.alloctype);
         row.SetField("uninvamt", entity.uninvamt);
         row.SetField("compseqno", entity.compseqno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transproc", entity.transproc);
         row.SetField("apetjrnlno", entity.apetjrnlno);
         row.SetField("apetsetno", entity.apetsetno);
         row.SetField("poelaRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PoelaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("addonno", entity.addonno);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("bundleid", entity.bundleid);
         row.SetField("compseqno", entity.compseqno);
         row.SetField("poelaRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	