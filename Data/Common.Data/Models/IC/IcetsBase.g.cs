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
       
namespace Infor.Sxe.Common.Data.Models.IC
{
   /// <summary>
   /// IC Serial # Transaction File
   /// </summary>
   [EntityType("IC Serial Transaction File","icses.detail","")]
   public partial class IcetsBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [BusContext(BusPart.AcctEntity),Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Product #
      /// </summary>
      [BusContext(BusPart.Descr),DrillbackParam("pk",1),Key,Order,StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [BusContext(BusPart.Location),DrillbackParam("pk2",2),Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Serial #
      /// </summary>
      [DrillbackParam("pk3",3),BusContext(BusPart.Name),Key,Order,StringValidationAttribute]
      public string serialno { get; set; }

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
      /// Line #
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Seq #
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Order Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string ordertype { get; set; }

      /// <summary>
      /// Receipt
      /// </summary>
      public DateTime? postdt { get; set; }

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
      /// Customer #
      /// </summary>
      public decimal custno { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public decimal price { get; set; }

      /// <summary>
      /// Reason
      /// </summary>
      [StringValidationAttribute]
      public string reasunavty { get; set; }

      /// <summary>
      /// Whse From
      /// </summary>
      [StringValidationAttribute]
      public string whsefm { get; set; }

      /// <summary>
      /// Whse To
      /// </summary>
      [StringValidationAttribute]
      public string whseto { get; set; }

      /// <summary>
      /// Return
      /// </summary>
      public bool returnfl { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// ictype
      /// </summary>
      [StringValidationAttribute]
      public string ictype { get; set; }

      /// <summary>
      /// Ship To
      /// </summary>
      [StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// Cost Flag
      /// </summary>
      public bool costfl { get; set; }

      /// <summary>
      /// Spec Rec Link
      /// </summary>
      public decimal icspecrecno { get; set; }

      /// <summary>
      /// Inventory Updated
      /// </summary>
      public bool updinvfl { get; set; }

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
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildIcetsBaseFromRow<T>(DataRow row) where T:IcetsBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.serialno = row.IsNull("serialno") ? string.Empty : row.Field<string>("serialno");
         entity.postdt = row.Field<DateTime?>("postdt");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.whsefm = row.IsNull("whsefm") ? string.Empty : row.Field<string>("whsefm");
         entity.whseto = row.IsNull("whseto") ? string.Empty : row.Field<string>("whseto");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.ictype = row.IsNull("ictype") ? string.Empty : row.Field<string>("ictype");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.costfl = row.Field<bool>("costfl");
         entity.icspecrecno = row.IsNull("icspecrecno") ? decimal.Zero : row.Field<decimal>("icspecrecno");
         entity.updinvfl = row.Field<bool>("updinvfl");
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
         entity.rowID = row.Field<byte[]>("icetsRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcetsBase(ref DataRow row, IcetsBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("serialno", entity.serialno);
         row.SetField("postdt", entity.postdt);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("custno", entity.custno);
         row.SetField("price", entity.price);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("seqno", entity.seqno);
         row.SetField("whsefm", entity.whsefm);
         row.SetField("whseto", entity.whseto);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("ictype", entity.ictype);
         row.SetField("shipto", entity.shipto);
         row.SetField("costfl", entity.costfl);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("updinvfl", entity.updinvfl);
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
         row.SetField("icetsRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcetsBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("serialno", entity.serialno);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("icetsRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	