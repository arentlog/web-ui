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
   /// Service Warranty Enter Detail Lines
   /// </summary>
   
   public partial class SwelBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Repair Order #
      /// </summary>
      [Key,Order]
      public int repairordno { get; set; }

      /// <summary>
      /// 
      /// </summary>
      [Key,Order]
      public int repairordsuf { get; set; }

      /// <summary>
      /// Line Number
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

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
      /// Warranty Exp Dt
      /// </summary>
      public DateTime? warrexpdt { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Serial #
      /// </summary>
      [StringValidationAttribute]
      public string serialno { get; set; }

      /// <summary>
      /// Disposition
      /// </summary>
      [StringValidationAttribute]
      public string disposition { get; set; }

      /// <summary>
      /// Bin Loc
      /// </summary>
      [StringValidationAttribute]
      public string binloc { get; set; }

      /// <summary>
      /// Total Service Hours
      /// </summary>
      public decimal totservmin { get; set; }

      /// <summary>
      /// Disposition Comment
      /// </summary>
      [StringValidationAttribute]
      public string dispositioncom { get; set; }

      /// <summary>
      /// Sold By
      /// </summary>
      [StringValidationAttribute]
      public string soldby { get; set; }

      /// <summary>
      /// Date Failed
      /// </summary>
      public DateTime? faildt { get; set; }

      /// <summary>
      /// How Used
      /// </summary>
      [StringValidationAttribute]
      public string howused { get; set; }

      /// <summary>
      /// Equipment Type
      /// </summary>
      [StringValidationAttribute]
      public string equiptype { get; set; }

      /// <summary>
      /// Original Sale Date
      /// </summary>
      public DateTime? selldt { get; set; }

      /// <summary>
      /// Serial #
      /// </summary>
      [StringValidationAttribute]
      public string lotno { get; set; }

      /// <summary>
      /// Quantity
      /// </summary>
      public decimal qty { get; set; }

      /// <summary>
      /// Completed Date
      /// </summary>
      public DateTime? compdt { get; set; }

      /// <summary>
      /// Sales Order #
      /// </summary>
      public int orderno { get; set; }

      /// <summary>
      /// ordersuf
      /// </summary>
      public int ordersuf { get; set; }

      /// <summary>
      /// Vendor Number
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Job Type
      /// </summary>
      [StringValidationAttribute]
      public string jobtype { get; set; }

      /// <summary>
      /// Unit
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// System Fail Code
      /// </summary>
      [StringValidationAttribute]
      public string failcd { get; set; }

      /// <summary>
      /// Problem Fail Code
      /// </summary>
      [StringValidationAttribute]
      public string probfailcd { get; set; }

      /// <summary>
      /// splitfl
      /// </summary>
      public bool splitfl { get; set; }

      /// <summary>
      /// Sales Order #
      /// </summary>
      public int origorderno { get; set; }

      /// <summary>
      /// origordersuf
      /// </summary>
      public int origordersuf { get; set; }

      /// <summary>
      /// Engine/Transmission Number
      /// </summary>
      [StringValidationAttribute]
      public string engineno { get; set; }

      /// <summary>
      /// Specification Number
      /// </summary>
      [StringValidationAttribute]
      public string specno { get; set; }

      /// <summary>
      /// Sales Order Line Number
      /// </summary>
      public int solineno { get; set; }

      /// <summary>
      /// Text
      /// </summary>
      public bool textfl { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// Problem Text
      /// </summary>
      [StringValidationAttribute]
      public string problemtxt { get; set; }

      /// <summary>
      /// Cause Text
      /// </summary>
      [StringValidationAttribute]
      public string causetxt { get; set; }

      /// <summary>
      /// Work Performed Text
      /// </summary>
      [StringValidationAttribute]
      public string workperftxt { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// VIN #
      /// </summary>
      [StringValidationAttribute]
      public string vinno { get; set; }

      /// <summary>
      /// User 10
      /// </summary>
      [StringValidationAttribute]
      public string user10 { get; set; }

      /// <summary>
      /// User 11
      /// </summary>
      [StringValidationAttribute]
      public string user11 { get; set; }

      /// <summary>
      /// User 12
      /// </summary>
      [StringValidationAttribute]
      public string user12 { get; set; }

      /// <summary>
      /// User 13
      /// </summary>
      [StringValidationAttribute]
      public string user13 { get; set; }

      /// <summary>
      /// User 14
      /// </summary>
      [StringValidationAttribute]
      public string user14 { get; set; }

      /// <summary>
      /// User 15
      /// </summary>
      [StringValidationAttribute]
      public string user15 { get; set; }

      /// <summary>
      /// User 16
      /// </summary>
      [StringValidationAttribute]
      public string user16 { get; set; }

      /// <summary>
      /// User 17
      /// </summary>
      [StringValidationAttribute]
      public string user17 { get; set; }

      /// <summary>
      /// User 18
      /// </summary>
      [StringValidationAttribute]
      public string user18 { get; set; }

      /// <summary>
      /// User 19
      /// </summary>
      [StringValidationAttribute]
      public string user19 { get; set; }

      /// <summary>
      /// User 20
      /// </summary>
      [StringValidationAttribute]
      public string user20 { get; set; }

      /// <summary>
      /// User 21
      /// </summary>
      [StringValidationAttribute]
      public string user21 { get; set; }

      /// <summary>
      /// User 22
      /// </summary>
      [StringValidationAttribute]
      public string user22 { get; set; }

      /// <summary>
      /// User 23
      /// </summary>
      [StringValidationAttribute]
      public string user23 { get; set; }

      /// <summary>
      /// User 24
      /// </summary>
      [StringValidationAttribute]
      public string user24 { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSwelBaseFromRow<T>(DataRow row) where T:SwelBase, new()
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
         entity.warrexpdt = row.Field<DateTime?>("warrexpdt");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.repairordno = row.IsNull("repairordno") ? 0 : row.Field<int>("repairordno");
         entity.serialno = row.IsNull("serialno") ? string.Empty : row.Field<string>("serialno");
         entity.disposition = row.IsNull("disposition") ? string.Empty : row.Field<string>("disposition");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.totservmin = row.IsNull("totservmin") ? decimal.Zero : row.Field<decimal>("totservmin");
         entity.dispositioncom = row.IsNull("dispositioncom") ? string.Empty : row.Field<string>("dispositioncom");
         entity.soldby = row.IsNull("soldby") ? string.Empty : row.Field<string>("soldby");
         entity.faildt = row.Field<DateTime?>("faildt");
         entity.howused = row.IsNull("howused") ? string.Empty : row.Field<string>("howused");
         entity.equiptype = row.IsNull("equiptype") ? string.Empty : row.Field<string>("equiptype");
         entity.selldt = row.Field<DateTime?>("selldt");
         entity.lotno = row.IsNull("lotno") ? string.Empty : row.Field<string>("lotno");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.compdt = row.Field<DateTime?>("compdt");
         entity.repairordsuf = row.IsNull("repairordsuf") ? 0 : row.Field<int>("repairordsuf");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.jobtype = row.IsNull("jobtype") ? string.Empty : row.Field<string>("jobtype");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.failcd = row.IsNull("failcd") ? string.Empty : row.Field<string>("failcd");
         entity.probfailcd = row.IsNull("probfailcd") ? string.Empty : row.Field<string>("probfailcd");
         entity.splitfl = row.Field<bool>("splitfl");
         entity.origorderno = row.IsNull("origorderno") ? 0 : row.Field<int>("origorderno");
         entity.origordersuf = row.IsNull("origordersuf") ? 0 : row.Field<int>("origordersuf");
         entity.engineno = row.IsNull("engineno") ? string.Empty : row.Field<string>("engineno");
         entity.specno = row.IsNull("specno") ? string.Empty : row.Field<string>("specno");
         entity.solineno = row.IsNull("solineno") ? 0 : row.Field<int>("solineno");
         entity.textfl = row.Field<bool>("textfl");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.problemtxt = row.IsNull("problemtxt") ? string.Empty : row.Field<string>("problemtxt");
         entity.causetxt = row.IsNull("causetxt") ? string.Empty : row.Field<string>("causetxt");
         entity.workperftxt = row.IsNull("workperftxt") ? string.Empty : row.Field<string>("workperftxt");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.vinno = row.IsNull("vinno") ? string.Empty : row.Field<string>("vinno");
         entity.user10 = row.IsNull("user10") ? string.Empty : row.Field<string>("user10");
         entity.user11 = row.IsNull("user11") ? string.Empty : row.Field<string>("user11");
         entity.user12 = row.IsNull("user12") ? string.Empty : row.Field<string>("user12");
         entity.user13 = row.IsNull("user13") ? string.Empty : row.Field<string>("user13");
         entity.user14 = row.IsNull("user14") ? string.Empty : row.Field<string>("user14");
         entity.user15 = row.IsNull("user15") ? string.Empty : row.Field<string>("user15");
         entity.user16 = row.IsNull("user16") ? string.Empty : row.Field<string>("user16");
         entity.user17 = row.IsNull("user17") ? string.Empty : row.Field<string>("user17");
         entity.user18 = row.IsNull("user18") ? string.Empty : row.Field<string>("user18");
         entity.user19 = row.IsNull("user19") ? string.Empty : row.Field<string>("user19");
         entity.user20 = row.IsNull("user20") ? string.Empty : row.Field<string>("user20");
         entity.user21 = row.IsNull("user21") ? string.Empty : row.Field<string>("user21");
         entity.user22 = row.IsNull("user22") ? string.Empty : row.Field<string>("user22");
         entity.user23 = row.IsNull("user23") ? string.Empty : row.Field<string>("user23");
         entity.user24 = row.IsNull("user24") ? string.Empty : row.Field<string>("user24");
         entity.rowID = row.Field<byte[]>("swelRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSwelBase(ref DataRow row, SwelBase entity)
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
         row.SetField("warrexpdt", entity.warrexpdt);
         row.SetField("prod", entity.prod);
         row.SetField("repairordno", entity.repairordno);
         row.SetField("serialno", entity.serialno);
         row.SetField("disposition", entity.disposition);
         row.SetField("binloc", entity.binloc);
         row.SetField("totservmin", entity.totservmin);
         row.SetField("dispositioncom", entity.dispositioncom);
         row.SetField("soldby", entity.soldby);
         row.SetField("faildt", entity.faildt);
         row.SetField("howused", entity.howused);
         row.SetField("equiptype", entity.equiptype);
         row.SetField("selldt", entity.selldt);
         row.SetField("lotno", entity.lotno);
         row.SetField("qty", entity.qty);
         row.SetField("compdt", entity.compdt);
         row.SetField("repairordsuf", entity.repairordsuf);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("vendno", entity.vendno);
         row.SetField("jobtype", entity.jobtype);
         row.SetField("unit", entity.unit);
         row.SetField("failcd", entity.failcd);
         row.SetField("probfailcd", entity.probfailcd);
         row.SetField("splitfl", entity.splitfl);
         row.SetField("origorderno", entity.origorderno);
         row.SetField("origordersuf", entity.origordersuf);
         row.SetField("engineno", entity.engineno);
         row.SetField("specno", entity.specno);
         row.SetField("solineno", entity.solineno);
         row.SetField("textfl", entity.textfl);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("problemtxt", entity.problemtxt);
         row.SetField("causetxt", entity.causetxt);
         row.SetField("workperftxt", entity.workperftxt);
         row.SetField("transproc", entity.transproc);
         row.SetField("vinno", entity.vinno);
         row.SetField("user10", entity.user10);
         row.SetField("user11", entity.user11);
         row.SetField("user12", entity.user12);
         row.SetField("user13", entity.user13);
         row.SetField("user14", entity.user14);
         row.SetField("user15", entity.user15);
         row.SetField("user16", entity.user16);
         row.SetField("user17", entity.user17);
         row.SetField("user18", entity.user18);
         row.SetField("user19", entity.user19);
         row.SetField("user20", entity.user20);
         row.SetField("user21", entity.user21);
         row.SetField("user22", entity.user22);
         row.SetField("user23", entity.user23);
         row.SetField("user24", entity.user24);
         row.SetField("swelRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SwelBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("repairordno", entity.repairordno);
         row.SetField("repairordsuf", entity.repairordsuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("swelRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	