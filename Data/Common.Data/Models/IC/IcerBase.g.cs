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
   /// Receipts File for Back Order Fill
   /// </summary>
   
   public partial class IcerBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      public int cono { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Product #
      /// </summary>
      [StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Order Type
      /// </summary>
      [StringValidationAttribute]
      public string ordertype { get; set; }

      /// <summary>
      /// PO #
      /// </summary>
      public int pono { get; set; }

      /// <summary>
      /// Received
      /// </summary>
      public decimal qtyrcvd { get; set; }

      /// <summary>
      /// Qty Left
      /// </summary>
      public decimal qtyleft { get; set; }

      /// <summary>
      /// Qty Allocated
      /// </summary>
      public decimal qtyalloc { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Trans Tm
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Oper
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Line#
      /// </summary>
      public int lineno { get; set; }

      /// <summary>
      /// PO Suffix
      /// </summary>
      public int posuf { get; set; }

      /// <summary>
      /// B/O
      /// </summary>
      [StringValidationAttribute]
      public string botype { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string proddesc { get; set; }

      /// <summary>
      /// Description 2
      /// </summary>
      [StringValidationAttribute]
      public string proddesc2 { get; set; }

      /// <summary>
      /// Picked
      /// </summary>
      public decimal qtypicked { get; set; }

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
      /// Process Operator
      /// </summary>
      [StringValidationAttribute]
      public string processinit { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Cust Received
      /// </summary>
      public decimal cqtyrcvd { get; set; }

      /// <summary>
      /// Cust Qty Left
      /// </summary>
      public decimal cqtyleft { get; set; }

      /// <summary>
      /// Cust Qty Allocated
      /// </summary>
      public decimal cqtyalloc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildIcerBaseFromRow<T>(DataRow row) where T:IcerBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.qtyrcvd = row.IsNull("qtyrcvd") ? decimal.Zero : row.Field<decimal>("qtyrcvd");
         entity.qtyleft = row.IsNull("qtyleft") ? decimal.Zero : row.Field<decimal>("qtyleft");
         entity.qtyalloc = row.IsNull("qtyalloc") ? decimal.Zero : row.Field<decimal>("qtyalloc");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.qtypicked = row.IsNull("qtypicked") ? decimal.Zero : row.Field<decimal>("qtypicked");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.processinit = row.IsNull("processinit") ? string.Empty : row.Field<string>("processinit");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.cqtyrcvd = row.IsNull("cqtyrcvd") ? decimal.Zero : row.Field<decimal>("cqtyrcvd");
         entity.cqtyleft = row.IsNull("cqtyleft") ? decimal.Zero : row.Field<decimal>("cqtyleft");
         entity.cqtyalloc = row.IsNull("cqtyalloc") ? decimal.Zero : row.Field<decimal>("cqtyalloc");
         entity.rowID = row.Field<byte[]>("icerRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcerBase(ref DataRow row, IcerBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("pono", entity.pono);
         row.SetField("qtyrcvd", entity.qtyrcvd);
         row.SetField("qtyleft", entity.qtyleft);
         row.SetField("qtyalloc", entity.qtyalloc);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("lineno", entity.lineno);
         row.SetField("posuf", entity.posuf);
         row.SetField("botype", entity.botype);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("qtypicked", entity.qtypicked);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("processinit", entity.processinit);
         row.SetField("transproc", entity.transproc);
         row.SetField("cqtyrcvd", entity.cqtyrcvd);
         row.SetField("cqtyleft", entity.cqtyleft);
         row.SetField("cqtyalloc", entity.cqtyalloc);
         row.SetField("icerRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcerBase entity)
      {
         row.SetField("icerRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	