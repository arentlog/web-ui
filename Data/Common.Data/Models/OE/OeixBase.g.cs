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
   /// Invoicing Exception Errors
   /// </summary>
   
   public partial class OeixBase: ModelBase, IUserFields
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
      /// Line#
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Invoice Date
      /// </summary>
      [Key,Order]
      public DateTime? invdt { get; set; }

      /// <summary>
      /// ErrSeq#
      /// </summary>
      [Key,Order]
      public int errseqno { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// ErrorCode
      /// </summary>
      [StringValidationAttribute]
      public string errcd { get; set; }

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
      /// User1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// User2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// User3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// User6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// User7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Error Message
      /// </summary>
      [StringValidationAttribute]
      public string errmsg { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOeixBaseFromRow<T>(DataRow row) where T:OeixBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.errcd = row.IsNull("errcd") ? string.Empty : row.Field<string>("errcd");
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
         entity.errmsg = row.IsNull("errmsg") ? string.Empty : row.Field<string>("errmsg");
         entity.invdt = row.Field<DateTime?>("invdt");
         entity.errseqno = row.IsNull("errseqno") ? 0 : row.Field<int>("errseqno");
         entity.rowID = row.Field<byte[]>("oeixRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeixBase(ref DataRow row, OeixBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("whse", entity.whse);
         row.SetField("errcd", entity.errcd);
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
         row.SetField("errmsg", entity.errmsg);
         row.SetField("invdt", entity.invdt);
         row.SetField("errseqno", entity.errseqno);
         row.SetField("oeixRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OeixBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("invdt", entity.invdt);
         row.SetField("errseqno", entity.errseqno);
         row.SetField("oeixRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	