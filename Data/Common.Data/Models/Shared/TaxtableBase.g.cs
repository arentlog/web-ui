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
       
namespace Infor.Sxe.Common.Data.Models.SHARED
{
   /// <summary>
   /// Sales/Purchase Tax Processing
   /// </summary>
   
   public partial class TaxtableBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// 
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string sourcecd { get; set; }

      /// <summary>
      /// Source Row Pointer
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string srcrowpointer { get; set; }

      /// <summary>
      /// Account #
      /// </summary>
      public decimal accountno { get; set; }

      /// <summary>
      /// VAT Registration No
      /// </summary>
      [StringValidationAttribute]
      public string vatregno { get; set; }

      /// <summary>
      /// Invoice Date
      /// </summary>
      public DateTime? invoicedt { get; set; }

      /// <summary>
      /// Posting Date
      /// </summary>
      public DateTime? glpostdt { get; set; }

      /// <summary>
      /// Document Type
      /// </summary>
      [StringValidationAttribute]
      public string documentty { get; set; }

      /// <summary>
      /// Exchange Rate
      /// </summary>
      public decimal exchgrate { get; set; }

      /// <summary>
      /// Muliple Rates
      /// </summary>
      public bool multigrpfl { get; set; }

      /// <summary>
      /// Document Reference
      /// </summary>
      [StringValidationAttribute]
      public string documentref { get; set; }

      /// <summary>
      /// Form 625 Applies
      /// </summary>
      public bool form625fl { get; set; }

      /// <summary>
      /// Tax Tolerance Exceeded
      /// </summary>
      public bool exceedstoln { get; set; }

      /// <summary>
      /// Return Date
      /// </summary>
      public DateTime? returndt { get; set; }

      /// <summary>
      /// EDI Transaction
      /// </summary>
      public bool editrans { get; set; }

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
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Currency
      /// </summary>
      [StringValidationAttribute]
      public string currencyty { get; set; }

      /// <summary>
      /// Division #
      /// </summary>
      public int divno { get; set; }

      /// <summary>
      /// Tran Type
      /// </summary>
      public int transcd { get; set; }

      /// <summary>
      /// Country
      /// </summary>
      [StringValidationAttribute]
      public string countrycd { get; set; }

      /// <summary>
      /// Ship To
      /// </summary>
      [StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [StringValidationAttribute]
      public string transtype { get; set; }

      /// <summary>
      /// GL Div#
      /// </summary>
      public int gldivno { get; set; }

      /// <summary>
      /// Paid Date
      /// </summary>
      public DateTime? paiddt { get; set; }

      /// <summary>
      /// Vendor Inv #
      /// </summary>
      [StringValidationAttribute]
      public string apinvno { get; set; }

      /// <summary>
      /// Cust PO #
      /// </summary>
      [StringValidationAttribute]
      public string custpo { get; set; }

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
      /// Taxtable Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// Tax Period ID
      /// </summary>
      [StringValidationAttribute]
      public string periodid { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildTaxtableBaseFromRow<T>(DataRow row) where T:TaxtableBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.sourcecd = row.IsNull("sourcecd") ? string.Empty : row.Field<string>("sourcecd");
         entity.accountno = row.IsNull("accountno") ? decimal.Zero : row.Field<decimal>("accountno");
         entity.vatregno = row.IsNull("vatregno") ? string.Empty : row.Field<string>("vatregno");
         entity.invoicedt = row.Field<DateTime?>("invoicedt");
         entity.glpostdt = row.Field<DateTime?>("glpostdt");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.documentty = row.IsNull("documentty") ? string.Empty : row.Field<string>("documentty");
         entity.exchgrate = row.IsNull("exchgrate") ? decimal.Zero : row.Field<decimal>("exchgrate");
         entity.multigrpfl = row.Field<bool>("multigrpfl");
         entity.documentref = row.IsNull("documentref") ? string.Empty : row.Field<string>("documentref");
         entity.form625fl = row.Field<bool>("form625fl");
         entity.exceedstoln = row.Field<bool>("exceedstoln");
         entity.returndt = row.Field<DateTime?>("returndt");
         entity.editrans = row.Field<bool>("editrans");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.transcd = row.IsNull("transcd") ? 0 : row.Field<int>("transcd");
         entity.countrycd = row.IsNull("countrycd") ? string.Empty : row.Field<string>("countrycd");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.gldivno = row.IsNull("gldivno") ? 0 : row.Field<int>("gldivno");
         entity.paiddt = row.Field<DateTime?>("paiddt");
         entity.apinvno = row.IsNull("apinvno") ? string.Empty : row.Field<string>("apinvno");
         entity.custpo = row.IsNull("custpo") ? string.Empty : row.Field<string>("custpo");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.periodid = row.IsNull("periodid") ? string.Empty : row.Field<string>("periodid");
         entity.rowID = row.Field<byte[]>("taxtableRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromTaxtableBase(ref DataRow row, TaxtableBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("sourcecd", entity.sourcecd);
         row.SetField("accountno", entity.accountno);
         row.SetField("vatregno", entity.vatregno);
         row.SetField("invoicedt", entity.invoicedt);
         row.SetField("glpostdt", entity.glpostdt);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("documentty", entity.documentty);
         row.SetField("exchgrate", entity.exchgrate);
         row.SetField("multigrpfl", entity.multigrpfl);
         row.SetField("documentref", entity.documentref);
         row.SetField("form625fl", entity.form625fl);
         row.SetField("exceedstoln", entity.exceedstoln);
         row.SetField("returndt", entity.returndt);
         row.SetField("editrans", entity.editrans);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("transproc", entity.transproc);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("divno", entity.divno);
         row.SetField("transcd", entity.transcd);
         row.SetField("countrycd", entity.countrycd);
         row.SetField("shipto", entity.shipto);
         row.SetField("transtype", entity.transtype);
         row.SetField("gldivno", entity.gldivno);
         row.SetField("paiddt", entity.paiddt);
         row.SetField("apinvno", entity.apinvno);
         row.SetField("custpo", entity.custpo);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("periodid", entity.periodid);
         row.SetField("taxtableRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, TaxtableBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("sourcecd", entity.sourcecd);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("taxtableRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	