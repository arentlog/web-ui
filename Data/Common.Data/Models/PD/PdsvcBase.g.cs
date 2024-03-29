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
       
namespace Infor.Sxe.Common.Data.Models.PD
{
   /// <summary>
   /// PD Contract Cost
   /// </summary>
   
   public partial class PdsvcBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Contract #
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string contractno { get; set; }

      /// <summary>
      /// Level
      /// </summary>
      [Key,Order]
      public int levelcd { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Begin Date
      /// </summary>
      [Key,Order]
      public DateTime? startdt { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      [Key,Order]
      public decimal vendno { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Actual Qty
      /// </summary>
      public decimal actqty { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      public decimal custno { get; set; }

      /// <summary>
      /// End Date
      /// </summary>
      public DateTime? enddt { get; set; }

      /// <summary>
      /// Hard Max Qty?
      /// </summary>
      public bool hardmaxqtyfl { get; set; }

      /// <summary>
      /// Vendor Price
      /// </summary>
      public decimal price { get; set; }

      /// <summary>
      /// Maximum Qty
      /// </summary>
      public decimal maxqty { get; set; }

      /// <summary>
      /// Max Based On
      /// </summary>
      [StringValidationAttribute]
      public string maxqtytype { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Reference
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// Ship To
      /// </summary>
      [StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// SL Update Date
      /// </summary>
      public DateTime? slchgdt { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      public bool statustype { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

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
      /// Vendor Quote
      /// </summary>
      [StringValidationAttribute]
      public string vendquote { get; set; }

      /// <summary>
      /// PDSVC #
      /// </summary>
      public int pdsvcrecno { get; set; }

      /// <summary>
      /// Qty Brk Per
      /// </summary>
      [StringValidationAttribute]
      public string qtytype { get; set; }

      /// <summary>
      /// Last CCYYMM for Qty
      /// </summary>
      [StringValidationAttribute]
      public string qtyyymm { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildPdsvcBaseFromRow<T>(DataRow row) where T:PdsvcBase, new()
      {
         T entity = new T();
         entity.actqty = row.IsNull("actqty") ? decimal.Zero : row.Field<decimal>("actqty");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.hardmaxqtyfl = row.Field<bool>("hardmaxqtyfl");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.levelcd = row.IsNull("levelcd") ? 0 : row.Field<int>("levelcd");
         entity.maxqty = row.IsNull("maxqty") ? decimal.Zero : row.Field<decimal>("maxqty");
         entity.maxqtytype = row.IsNull("maxqtytype") ? string.Empty : row.Field<string>("maxqtytype");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.slchgdt = row.Field<DateTime?>("slchgdt");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.statustype = row.Field<bool>("statustype");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.vendquote = row.IsNull("vendquote") ? string.Empty : row.Field<string>("vendquote");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.pdsvcrecno = row.IsNull("pdsvcrecno") ? 0 : row.Field<int>("pdsvcrecno");
         entity.qtytype = row.IsNull("qtytype") ? string.Empty : row.Field<string>("qtytype");
         entity.qtyyymm = row.IsNull("qtyyymm") ? string.Empty : row.Field<string>("qtyyymm");
         entity.rowID = row.Field<byte[]>("pdsvcRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsvcBase(ref DataRow row, PdsvcBase entity)
      {
         row.SetField("actqty", entity.actqty);
         row.SetField("cono", entity.cono);
         row.SetField("contractno", entity.contractno);
         row.SetField("custno", entity.custno);
         row.SetField("enddt", entity.enddt);
         row.SetField("hardmaxqtyfl", entity.hardmaxqtyfl);
         row.SetField("price", entity.price);
         row.SetField("levelcd", entity.levelcd);
         row.SetField("maxqty", entity.maxqty);
         row.SetField("maxqtytype", entity.maxqtytype);
         row.SetField("operinit", entity.operinit);
         row.SetField("prod", entity.prod);
         row.SetField("refer", entity.refer);
         row.SetField("shipto", entity.shipto);
         row.SetField("slchgdt", entity.slchgdt);
         row.SetField("startdt", entity.startdt);
         row.SetField("statustype", entity.statustype);
         row.SetField("transproc", entity.transproc);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("vendno", entity.vendno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("unit", entity.unit);
         row.SetField("vendquote", entity.vendquote);
         row.SetField("whse", entity.whse);
         row.SetField("pdsvcrecno", entity.pdsvcrecno);
         row.SetField("qtytype", entity.qtytype);
         row.SetField("qtyyymm", entity.qtyyymm);
         row.SetField("pdsvcRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PdsvcBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("contractno", entity.contractno);
         row.SetField("levelcd", entity.levelcd);
         row.SetField("prod", entity.prod);
         row.SetField("startdt", entity.startdt);
         row.SetField("vendno", entity.vendno);
         row.SetField("unit", entity.unit);
         row.SetField("whse", entity.whse);
         row.SetField("pdsvcRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	