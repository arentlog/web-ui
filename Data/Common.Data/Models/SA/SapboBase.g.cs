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
       
namespace Infor.Sxe.Common.Data.Models.SA
{
   /// <summary>
   /// List processing for order entry
   /// </summary>
   
   public partial class SapboBase: ModelBase, IUserFields
   {

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
      /// Report Code
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string reportnm { get; set; }

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

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
      /// Route/Day/Stop
      /// </summary>
      [StringValidationAttribute]
      public string route { get; set; }

      /// <summary>
      /// Reprint
      /// </summary>
      public bool reprintfl { get; set; }

      /// <summary>
      /// Seq#
      /// </summary>
      public int seqno { get; set; }

      /// <summary>
      /// Output Type
      /// </summary>
      [StringValidationAttribute]
      public string outputty { get; set; }

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
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string @operator { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

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
      /// List Procedure
      /// </summary>
      [StringValidationAttribute]
      public string listproc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSapboBaseFromRow<T>(DataRow row) where T:SapboBase, new()
      {
         T entity = new T();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.route = row.IsNull("route") ? string.Empty : row.Field<string>("route");
         entity.reprintfl = row.Field<bool>("reprintfl");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.outputty = row.IsNull("outputty") ? string.Empty : row.Field<string>("outputty");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.@operator = row.IsNull("operator") ? string.Empty : row.Field<string>("operator");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
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
         entity.listproc = row.IsNull("listproc") ? string.Empty : row.Field<string>("listproc");
         entity.rowID = row.Field<byte[]>("sapboRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSapboBase(ref DataRow row, SapboBase entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("cono", entity.cono);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("route", entity.route);
         row.SetField("reprintfl", entity.reprintfl);
         row.SetField("seqno", entity.seqno);
         row.SetField("outputty", entity.outputty);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("operator", entity.@operator);
         row.SetField("prodcat", entity.prodcat);
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
         row.SetField("listproc", entity.listproc);
         row.SetField("sapboRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SapboBase entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("cono", entity.cono);
         row.SetField("sapboRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	