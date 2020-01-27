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
   /// Labor Job Time entries, both active and inactive.  The inactive entries serve as a transaction file for auditability of time entries, and the corresponding changes performed on these entries over time.
   /// </summary>
   
   public partial class SweljBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Original Technician
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string origtech { get; set; }

      /// <summary>
      /// Seq #
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Time Zone Adjusted In Date
      /// </summary>
      [Key,Order]
      public DateTime? systemindt { get; set; }

      /// <summary>
      /// Time Zone Adjusted In Time
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string systemintm { get; set; }

      /// <summary>
      /// Transaction Seq#
      /// </summary>
      [Key,Order]
      public int transseqno { get; set; }

      /// <summary>
      /// Active
      /// </summary>
      public bool activefl { get; set; }

      /// <summary>
      /// Closed
      /// </summary>
      public bool closedfl { get; set; }

      /// <summary>
      /// Comment
      /// </summary>
      [StringValidationAttribute]
      public string comment { get; set; }

      /// <summary>
      /// Department #
      /// </summary>
      public int deptno { get; set; }

      /// <summary>
      /// Doubletime Hours
      /// </summary>
      public decimal dthrs { get; set; }

      /// <summary>
      /// Employee Type
      /// </summary>
      [StringValidationAttribute]
      public string emptype { get; set; }

      /// <summary>
      /// End of Day
      /// </summary>
      public bool endofdayfl { get; set; }

      /// <summary>
      /// Labor Job Time Error
      /// </summary>
      [StringValidationAttribute]
      public string errortype1 { get; set; }
      [StringValidationAttribute]
      public string errortype2 { get; set; }
      [StringValidationAttribute]
      public string errortype3 { get; set; }
      [StringValidationAttribute]
      public string errortype4 { get; set; }
      [StringValidationAttribute]
      public string errortype5 { get; set; }
      [StringValidationAttribute]
      public string errortype6 { get; set; }
      [StringValidationAttribute]
      public string errortype7 { get; set; }
      [StringValidationAttribute]
      public string errortype8 { get; set; }
      [StringValidationAttribute]
      public string errortype9 { get; set; }
      [StringValidationAttribute]
      public string errortype10 { get; set; }
      [StringValidationAttribute]
      public string errortype11 { get; set; }
      [StringValidationAttribute]
      public string errortype12 { get; set; }
      [StringValidationAttribute]
      public string errortype13 { get; set; }
      [StringValidationAttribute]
      public string errortype14 { get; set; }
      [StringValidationAttribute]
      public string errortype15 { get; set; }
      [StringValidationAttribute]
      public string errortype16 { get; set; }
      [StringValidationAttribute]
      public string errortype17 { get; set; }
      [StringValidationAttribute]
      public string errortype18 { get; set; }
      [StringValidationAttribute]
      public string errortype19 { get; set; }
      [StringValidationAttribute]
      public string errortype20 { get; set; }

      /// <summary>
      /// From Sequence
      /// </summary>
      public int fromseqno { get; set; }

      /// <summary>
      /// Type of Hours Entered
      /// </summary>
      [StringValidationAttribute]
      public string hrstype { get; set; }

      /// <summary>
      /// Date In
      /// </summary>
      public DateTime? indt { get; set; }

      /// <summary>
      /// Internal Job Type
      /// </summary>
      [StringValidationAttribute]
      public string intjobtype { get; set; }

      /// <summary>
      /// Time In
      /// </summary>
      [StringValidationAttribute]
      public string intm { get; set; }

      /// <summary>
      /// Repair Line #
      /// </summary>
      public int lineno { get; set; }

      /// <summary>
      /// Mileage
      /// </summary>
      public int mileage { get; set; }

      /// <summary>
      /// Overtime Hours
      /// </summary>
      public decimal othrs { get; set; }

      /// <summary>
      /// Function Name
      /// </summary>
      [StringValidationAttribute]
      public string ourproc { get; set; }

      /// <summary>
      /// Date Out
      /// </summary>
      public DateTime? outdt { get; set; }

      /// <summary>
      /// Time Out
      /// </summary>
      [StringValidationAttribute]
      public string outtm { get; set; }

      /// <summary>
      /// Entered Hours
      /// </summary>
      public decimal overridehrs { get; set; }

      /// <summary>
      /// Payroll Cost
      /// </summary>
      public decimal payrollcost { get; set; }

      /// <summary>
      /// Sent to Payroll Date
      /// </summary>
      public DateTime? prsentdt { get; set; }

      /// <summary>
      /// Rate Adjustment Code Error
      /// </summary>
      [StringValidationAttribute]
      public string rateerrorty1 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty2 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty3 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty4 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty5 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty6 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty7 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty8 { get; set; }
      [StringValidationAttribute]
      public string rateerrorty9 { get; set; }

      /// <summary>
      /// Rate Adjustment Code Option
      /// </summary>
      [StringValidationAttribute]
      public string ratetype1 { get; set; }
      [StringValidationAttribute]
      public string ratetype2 { get; set; }
      [StringValidationAttribute]
      public string ratetype3 { get; set; }
      [StringValidationAttribute]
      public string ratetype4 { get; set; }
      [StringValidationAttribute]
      public string ratetype5 { get; set; }
      [StringValidationAttribute]
      public string ratetype6 { get; set; }
      [StringValidationAttribute]
      public string ratetype7 { get; set; }
      [StringValidationAttribute]
      public string ratetype8 { get; set; }
      [StringValidationAttribute]
      public string ratetype9 { get; set; }

      /// <summary>
      /// Authorized Rate Option
      /// </summary>
      public bool ratetypefl1 { get; set; }
      public bool ratetypefl2 { get; set; }
      public bool ratetypefl3 { get; set; }
      public bool ratetypefl4 { get; set; }
      public bool ratetypefl5 { get; set; }
      public bool ratetypefl6 { get; set; }
      public bool ratetypefl7 { get; set; }
      public bool ratetypefl8 { get; set; }
      public bool ratetypefl9 { get; set; }

      /// <summary>
      /// Reason Code
      /// </summary>
      [StringValidationAttribute]
      public string reasontype { get; set; }

      /// <summary>
      /// Regular Hours
      /// </summary>
      public decimal reghrs { get; set; }

      /// <summary>
      /// Repair Order #
      /// </summary>
      public int repairordno { get; set; }

      /// <summary>
      /// Repair Order Suffix
      /// </summary>
      public int repairordsuf { get; set; }

      /// <summary>
      /// Schedule Option
      /// </summary>
      [StringValidationAttribute]
      public string schedopttype { get; set; }

      /// <summary>
      /// Shift
      /// </summary>
      public int shift { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Service Location
      /// </summary>
      [StringValidationAttribute]
      public string svcloc { get; set; }

      /// <summary>
      /// Time Zone Adjusted Out Date
      /// </summary>
      public DateTime? systemoutdt { get; set; }

      /// <summary>
      /// Time Zone Adjusted Out Time
      /// </summary>
      [StringValidationAttribute]
      public string systemouttm { get; set; }

      /// <summary>
      /// Technician
      /// </summary>
      [StringValidationAttribute]
      public string tech { get; set; }

      /// <summary>
      /// To Lunch
      /// </summary>
      public bool tolunchfl { get; set; }

      /// <summary>
      /// Total Hours
      /// </summary>
      public decimal tothrs { get; set; }

      /// <summary>
      /// Travel Hours
      /// </summary>
      public decimal travelhrs { get; set; }

      /// <summary>
      /// Truck #
      /// </summary>
      public int truckno { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Write Off
      /// </summary>
      public bool writeofffl { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Last Change Dt
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
      /// Billed Time
      /// </summary>
      [StringValidationAttribute]
      public string billedtm { get; set; }

      /// <summary>
      /// SO Line#
      /// </summary>
      public int solineno { get; set; }

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
      public static T BuildSweljBaseFromRow<T>(DataRow row) where T:SweljBase, new()
      {
         T entity = new T();
         entity.activefl = row.Field<bool>("activefl");
         entity.closedfl = row.Field<bool>("closedfl");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.deptno = row.IsNull("deptno") ? 0 : row.Field<int>("deptno");
         entity.dthrs = row.IsNull("dthrs") ? decimal.Zero : row.Field<decimal>("dthrs");
         entity.emptype = row.IsNull("emptype") ? string.Empty : row.Field<string>("emptype");
         entity.endofdayfl = row.Field<bool>("endofdayfl");
         entity.errortype1 = row.IsNull("errortype1") ? string.Empty : row.Field<string>("errortype1");
         entity.errortype2 = row.IsNull("errortype2") ? string.Empty : row.Field<string>("errortype2");
         entity.errortype3 = row.IsNull("errortype3") ? string.Empty : row.Field<string>("errortype3");
         entity.errortype4 = row.IsNull("errortype4") ? string.Empty : row.Field<string>("errortype4");
         entity.errortype5 = row.IsNull("errortype5") ? string.Empty : row.Field<string>("errortype5");
         entity.errortype6 = row.IsNull("errortype6") ? string.Empty : row.Field<string>("errortype6");
         entity.errortype7 = row.IsNull("errortype7") ? string.Empty : row.Field<string>("errortype7");
         entity.errortype8 = row.IsNull("errortype8") ? string.Empty : row.Field<string>("errortype8");
         entity.errortype9 = row.IsNull("errortype9") ? string.Empty : row.Field<string>("errortype9");
         entity.errortype10 = row.IsNull("errortype10") ? string.Empty : row.Field<string>("errortype10");
         entity.errortype11 = row.IsNull("errortype11") ? string.Empty : row.Field<string>("errortype11");
         entity.errortype12 = row.IsNull("errortype12") ? string.Empty : row.Field<string>("errortype12");
         entity.errortype13 = row.IsNull("errortype13") ? string.Empty : row.Field<string>("errortype13");
         entity.errortype14 = row.IsNull("errortype14") ? string.Empty : row.Field<string>("errortype14");
         entity.errortype15 = row.IsNull("errortype15") ? string.Empty : row.Field<string>("errortype15");
         entity.errortype16 = row.IsNull("errortype16") ? string.Empty : row.Field<string>("errortype16");
         entity.errortype17 = row.IsNull("errortype17") ? string.Empty : row.Field<string>("errortype17");
         entity.errortype18 = row.IsNull("errortype18") ? string.Empty : row.Field<string>("errortype18");
         entity.errortype19 = row.IsNull("errortype19") ? string.Empty : row.Field<string>("errortype19");
         entity.errortype20 = row.IsNull("errortype20") ? string.Empty : row.Field<string>("errortype20");
         entity.fromseqno = row.IsNull("fromseqno") ? 0 : row.Field<int>("fromseqno");
         entity.hrstype = row.IsNull("hrstype") ? string.Empty : row.Field<string>("hrstype");
         entity.indt = row.Field<DateTime?>("indt");
         entity.intjobtype = row.IsNull("intjobtype") ? string.Empty : row.Field<string>("intjobtype");
         entity.intm = row.IsNull("intm") ? string.Empty : row.Field<string>("intm");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.mileage = row.IsNull("mileage") ? 0 : row.Field<int>("mileage");
         entity.origtech = row.IsNull("origtech") ? string.Empty : row.Field<string>("origtech");
         entity.othrs = row.IsNull("othrs") ? decimal.Zero : row.Field<decimal>("othrs");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.outdt = row.Field<DateTime?>("outdt");
         entity.outtm = row.IsNull("outtm") ? string.Empty : row.Field<string>("outtm");
         entity.overridehrs = row.IsNull("overridehrs") ? decimal.Zero : row.Field<decimal>("overridehrs");
         entity.payrollcost = row.IsNull("payrollcost") ? decimal.Zero : row.Field<decimal>("payrollcost");
         entity.prsentdt = row.Field<DateTime?>("prsentdt");
         entity.rateerrorty1 = row.IsNull("rateerrorty1") ? string.Empty : row.Field<string>("rateerrorty1");
         entity.rateerrorty2 = row.IsNull("rateerrorty2") ? string.Empty : row.Field<string>("rateerrorty2");
         entity.rateerrorty3 = row.IsNull("rateerrorty3") ? string.Empty : row.Field<string>("rateerrorty3");
         entity.rateerrorty4 = row.IsNull("rateerrorty4") ? string.Empty : row.Field<string>("rateerrorty4");
         entity.rateerrorty5 = row.IsNull("rateerrorty5") ? string.Empty : row.Field<string>("rateerrorty5");
         entity.rateerrorty6 = row.IsNull("rateerrorty6") ? string.Empty : row.Field<string>("rateerrorty6");
         entity.rateerrorty7 = row.IsNull("rateerrorty7") ? string.Empty : row.Field<string>("rateerrorty7");
         entity.rateerrorty8 = row.IsNull("rateerrorty8") ? string.Empty : row.Field<string>("rateerrorty8");
         entity.rateerrorty9 = row.IsNull("rateerrorty9") ? string.Empty : row.Field<string>("rateerrorty9");
         entity.ratetype1 = row.IsNull("ratetype1") ? string.Empty : row.Field<string>("ratetype1");
         entity.ratetype2 = row.IsNull("ratetype2") ? string.Empty : row.Field<string>("ratetype2");
         entity.ratetype3 = row.IsNull("ratetype3") ? string.Empty : row.Field<string>("ratetype3");
         entity.ratetype4 = row.IsNull("ratetype4") ? string.Empty : row.Field<string>("ratetype4");
         entity.ratetype5 = row.IsNull("ratetype5") ? string.Empty : row.Field<string>("ratetype5");
         entity.ratetype6 = row.IsNull("ratetype6") ? string.Empty : row.Field<string>("ratetype6");
         entity.ratetype7 = row.IsNull("ratetype7") ? string.Empty : row.Field<string>("ratetype7");
         entity.ratetype8 = row.IsNull("ratetype8") ? string.Empty : row.Field<string>("ratetype8");
         entity.ratetype9 = row.IsNull("ratetype9") ? string.Empty : row.Field<string>("ratetype9");
         entity.ratetypefl1 = row.Field<bool>("ratetypefl1");
         entity.ratetypefl2 = row.Field<bool>("ratetypefl2");
         entity.ratetypefl3 = row.Field<bool>("ratetypefl3");
         entity.ratetypefl4 = row.Field<bool>("ratetypefl4");
         entity.ratetypefl5 = row.Field<bool>("ratetypefl5");
         entity.ratetypefl6 = row.Field<bool>("ratetypefl6");
         entity.ratetypefl7 = row.Field<bool>("ratetypefl7");
         entity.ratetypefl8 = row.Field<bool>("ratetypefl8");
         entity.ratetypefl9 = row.Field<bool>("ratetypefl9");
         entity.reasontype = row.IsNull("reasontype") ? string.Empty : row.Field<string>("reasontype");
         entity.reghrs = row.IsNull("reghrs") ? decimal.Zero : row.Field<decimal>("reghrs");
         entity.repairordno = row.IsNull("repairordno") ? 0 : row.Field<int>("repairordno");
         entity.repairordsuf = row.IsNull("repairordsuf") ? 0 : row.Field<int>("repairordsuf");
         entity.schedopttype = row.IsNull("schedopttype") ? string.Empty : row.Field<string>("schedopttype");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.shift = row.IsNull("shift") ? 0 : row.Field<int>("shift");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.svcloc = row.IsNull("svcloc") ? string.Empty : row.Field<string>("svcloc");
         entity.systemindt = row.Field<DateTime?>("systemindt");
         entity.systemintm = row.IsNull("systemintm") ? string.Empty : row.Field<string>("systemintm");
         entity.systemoutdt = row.Field<DateTime?>("systemoutdt");
         entity.systemouttm = row.IsNull("systemouttm") ? string.Empty : row.Field<string>("systemouttm");
         entity.tech = row.IsNull("tech") ? string.Empty : row.Field<string>("tech");
         entity.tolunchfl = row.Field<bool>("tolunchfl");
         entity.tothrs = row.IsNull("tothrs") ? decimal.Zero : row.Field<decimal>("tothrs");
         entity.transseqno = row.IsNull("transseqno") ? 0 : row.Field<int>("transseqno");
         entity.travelhrs = row.IsNull("travelhrs") ? decimal.Zero : row.Field<decimal>("travelhrs");
         entity.truckno = row.IsNull("truckno") ? 0 : row.Field<int>("truckno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.writeofffl = row.Field<bool>("writeofffl");
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
         entity.billedtm = row.IsNull("billedtm") ? string.Empty : row.Field<string>("billedtm");
         entity.solineno = row.IsNull("solineno") ? 0 : row.Field<int>("solineno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("sweljRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSweljBase(ref DataRow row, SweljBase entity)
      {
         row.SetField("activefl", entity.activefl);
         row.SetField("closedfl", entity.closedfl);
         row.SetField("comment", entity.comment);
         row.SetField("cono", entity.cono);
         row.SetField("deptno", entity.deptno);
         row.SetField("dthrs", entity.dthrs);
         row.SetField("emptype", entity.emptype);
         row.SetField("endofdayfl", entity.endofdayfl);
         row.SetField("errortype1", entity.errortype1);
         row.SetField("errortype2", entity.errortype2);
         row.SetField("errortype3", entity.errortype3);
         row.SetField("errortype4", entity.errortype4);
         row.SetField("errortype5", entity.errortype5);
         row.SetField("errortype6", entity.errortype6);
         row.SetField("errortype7", entity.errortype7);
         row.SetField("errortype8", entity.errortype8);
         row.SetField("errortype9", entity.errortype9);
         row.SetField("errortype10", entity.errortype10);
         row.SetField("errortype11", entity.errortype11);
         row.SetField("errortype12", entity.errortype12);
         row.SetField("errortype13", entity.errortype13);
         row.SetField("errortype14", entity.errortype14);
         row.SetField("errortype15", entity.errortype15);
         row.SetField("errortype16", entity.errortype16);
         row.SetField("errortype17", entity.errortype17);
         row.SetField("errortype18", entity.errortype18);
         row.SetField("errortype19", entity.errortype19);
         row.SetField("errortype20", entity.errortype20);
         row.SetField("fromseqno", entity.fromseqno);
         row.SetField("hrstype", entity.hrstype);
         row.SetField("indt", entity.indt);
         row.SetField("intjobtype", entity.intjobtype);
         row.SetField("intm", entity.intm);
         row.SetField("lineno", entity.lineno);
         row.SetField("mileage", entity.mileage);
         row.SetField("origtech", entity.origtech);
         row.SetField("othrs", entity.othrs);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("outdt", entity.outdt);
         row.SetField("outtm", entity.outtm);
         row.SetField("overridehrs", entity.overridehrs);
         row.SetField("payrollcost", entity.payrollcost);
         row.SetField("prsentdt", entity.prsentdt);
         row.SetField("rateerrorty1", entity.rateerrorty1);
         row.SetField("rateerrorty2", entity.rateerrorty2);
         row.SetField("rateerrorty3", entity.rateerrorty3);
         row.SetField("rateerrorty4", entity.rateerrorty4);
         row.SetField("rateerrorty5", entity.rateerrorty5);
         row.SetField("rateerrorty6", entity.rateerrorty6);
         row.SetField("rateerrorty7", entity.rateerrorty7);
         row.SetField("rateerrorty8", entity.rateerrorty8);
         row.SetField("rateerrorty9", entity.rateerrorty9);
         row.SetField("ratetype1", entity.ratetype1);
         row.SetField("ratetype2", entity.ratetype2);
         row.SetField("ratetype3", entity.ratetype3);
         row.SetField("ratetype4", entity.ratetype4);
         row.SetField("ratetype5", entity.ratetype5);
         row.SetField("ratetype6", entity.ratetype6);
         row.SetField("ratetype7", entity.ratetype7);
         row.SetField("ratetype8", entity.ratetype8);
         row.SetField("ratetype9", entity.ratetype9);
         row.SetField("ratetypefl1", entity.ratetypefl1);
         row.SetField("ratetypefl2", entity.ratetypefl2);
         row.SetField("ratetypefl3", entity.ratetypefl3);
         row.SetField("ratetypefl4", entity.ratetypefl4);
         row.SetField("ratetypefl5", entity.ratetypefl5);
         row.SetField("ratetypefl6", entity.ratetypefl6);
         row.SetField("ratetypefl7", entity.ratetypefl7);
         row.SetField("ratetypefl8", entity.ratetypefl8);
         row.SetField("ratetypefl9", entity.ratetypefl9);
         row.SetField("reasontype", entity.reasontype);
         row.SetField("reghrs", entity.reghrs);
         row.SetField("repairordno", entity.repairordno);
         row.SetField("repairordsuf", entity.repairordsuf);
         row.SetField("schedopttype", entity.schedopttype);
         row.SetField("seqno", entity.seqno);
         row.SetField("shift", entity.shift);
         row.SetField("statustype", entity.statustype);
         row.SetField("svcloc", entity.svcloc);
         row.SetField("systemindt", entity.systemindt);
         row.SetField("systemintm", entity.systemintm);
         row.SetField("systemoutdt", entity.systemoutdt);
         row.SetField("systemouttm", entity.systemouttm);
         row.SetField("tech", entity.tech);
         row.SetField("tolunchfl", entity.tolunchfl);
         row.SetField("tothrs", entity.tothrs);
         row.SetField("transseqno", entity.transseqno);
         row.SetField("travelhrs", entity.travelhrs);
         row.SetField("truckno", entity.truckno);
         row.SetField("whse", entity.whse);
         row.SetField("writeofffl", entity.writeofffl);
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
         row.SetField("billedtm", entity.billedtm);
         row.SetField("solineno", entity.solineno);
         row.SetField("transproc", entity.transproc);
         row.SetField("sweljRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SweljBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("origtech", entity.origtech);
         row.SetField("seqno", entity.seqno);
         row.SetField("systemindt", entity.systemindt);
         row.SetField("systemintm", entity.systemintm);
         row.SetField("transseqno", entity.transseqno);
         row.SetField("sweljRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	