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
       
namespace Infor.Sxe.Common.Data.Models.SW
{
   /// <summary>
   /// Service Warranty - Shadow file for OEEL
   /// </summary>
   
   public partial class SwoeelBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
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
      /// Line Count
      /// </summary>
      [StringValidationAttribute]
      public string linecnt { get; set; }

      /// <summary>
      /// Type Code
      /// </summary>
      [StringValidationAttribute]
      public string jobtype { get; set; }

      /// <summary>
      /// Line Number
      /// </summary>
      public int lineno { get; set; }

      /// <summary>
      /// Vendor Claim #
      /// </summary>
      [StringValidationAttribute]
      public string vendclaimno { get; set; }

      /// <summary>
      /// Sales Order #
      /// </summary>
      public int orderno { get; set; }

      /// <summary>
      /// ordersuf
      /// </summary>
      public int ordersuf { get; set; }

      /// <summary>
      /// Sales Order Line Number
      /// </summary>
      public int solineno { get; set; }

      /// <summary>
      /// Vendor Number
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Repair Order #
      /// </summary>
      public int repairordno { get; set; }

      /// <summary>
      /// repairordsuf
      /// </summary>
      public int repairordsuf { get; set; }

      /// <summary>
      /// Stg
      /// </summary>
      public int stagecd { get; set; }

      /// <summary>
      /// Internal Claim #
      /// </summary>
      public int intclaimno { get; set; }

      /// <summary>
      /// Warranty Code
      /// </summary>
      [StringValidationAttribute]
      public string warrantycd { get; set; }

      /// <summary>
      /// Appears On
      /// </summary>
      [StringValidationAttribute]
      public string invclaimcd { get; set; }

      /// <summary>
      /// Swel Line Number
      /// </summary>
      public int swlineno { get; set; }

      /// <summary>
      /// SRT Quantity Multiplier
      /// </summary>
      public decimal srtqty { get; set; }

      /// <summary>
      /// SRT Hours Overridden
      /// </summary>
      public bool srtoverfl { get; set; }

      /// <summary>
      /// Damage Code
      /// </summary>
      [StringValidationAttribute]
      public string damagecd { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSwoeelBaseFromRow<T>(DataRow row) where T:SwoeelBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.linecnt = row.IsNull("linecnt") ? string.Empty : row.Field<string>("linecnt");
         entity.jobtype = row.IsNull("jobtype") ? string.Empty : row.Field<string>("jobtype");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.vendclaimno = row.IsNull("vendclaimno") ? string.Empty : row.Field<string>("vendclaimno");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.solineno = row.IsNull("solineno") ? 0 : row.Field<int>("solineno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.repairordno = row.IsNull("repairordno") ? 0 : row.Field<int>("repairordno");
         entity.repairordsuf = row.IsNull("repairordsuf") ? 0 : row.Field<int>("repairordsuf");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.intclaimno = row.IsNull("intclaimno") ? 0 : row.Field<int>("intclaimno");
         entity.warrantycd = row.IsNull("warrantycd") ? string.Empty : row.Field<string>("warrantycd");
         entity.invclaimcd = row.IsNull("invclaimcd") ? string.Empty : row.Field<string>("invclaimcd");
         entity.swlineno = row.IsNull("swlineno") ? 0 : row.Field<int>("swlineno");
         entity.srtqty = row.IsNull("srtqty") ? decimal.Zero : row.Field<decimal>("srtqty");
         entity.srtoverfl = row.Field<bool>("srtoverfl");
         entity.damagecd = row.IsNull("damagecd") ? string.Empty : row.Field<string>("damagecd");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("swoeelRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSwoeelBase(ref DataRow row, SwoeelBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("linecnt", entity.linecnt);
         row.SetField("jobtype", entity.jobtype);
         row.SetField("lineno", entity.lineno);
         row.SetField("vendclaimno", entity.vendclaimno);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("solineno", entity.solineno);
         row.SetField("vendno", entity.vendno);
         row.SetField("repairordno", entity.repairordno);
         row.SetField("repairordsuf", entity.repairordsuf);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("intclaimno", entity.intclaimno);
         row.SetField("warrantycd", entity.warrantycd);
         row.SetField("invclaimcd", entity.invclaimcd);
         row.SetField("swlineno", entity.swlineno);
         row.SetField("srtqty", entity.srtqty);
         row.SetField("srtoverfl", entity.srtoverfl);
         row.SetField("damagecd", entity.damagecd);
         row.SetField("transproc", entity.transproc);
         row.SetField("swoeelRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SwoeelBase entity)
      {
         row.SetField("swoeelRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	