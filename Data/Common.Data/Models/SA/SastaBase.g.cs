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
   /// System Admin Tables, Alpha
   /// </summary>
   [EntityType("System Admin Tables  Alpha","sastt.detail","CodeDefinition")]
   public partial class SastaBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company
      /// </summary>
      [BusContext(BusPart.AcctEntity),BodContext(BodPart.AcctEntity,""),Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [DrillbackParam("pk",1),Key,Order,StringValidationAttribute]
      public string codeiden { get; set; }

      /// <summary>
      /// Identifier
      /// </summary>
      [BodID(1,RequiredId.True),DrillbackParam("pk2",2),Key,Order,StringValidationAttribute]
      public string codeval { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [ID(4),BusContext(BusPart.Descr),StringValidationAttribute]
      public string descrip { get; set; }

      /// <summary>
      /// # of Stocking Units per Unit
      /// </summary>
      public decimal unitconv { get; set; }

      /// <summary>
      /// Margin Percent - Minimum
      /// </summary>
      public decimal minmarpct { get; set; }

      /// <summary>
      /// Maximum
      /// </summary>
      public decimal maxmarpct { get; set; }

      /// <summary>
      /// To
      /// </summary>
      [BodContext(BodPart.Location,""),BusContext(BusPart.Location),StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// EDI Terms Type Code
      /// </summary>
      [StringValidationAttribute]
      public string editpcd { get; set; }

      /// <summary>
      /// EDI Terms Date Code
      /// </summary>
      [StringValidationAttribute]
      public string edidtcd { get; set; }

      /// <summary>
      /// EDI Unavail Type
      /// </summary>
      [StringValidationAttribute]
      public string ediunavty { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Discount Percent
      /// </summary>
      public decimal termspct { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// Discount Days
      /// </summary>
      public int discdays { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// duedays
      /// </summary>
      public int duedays { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// Prox Cutoff Day
      /// </summary>
      public int proxcutday { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// nopaymts
      /// </summary>
      public int nopaymts { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// Days Between Payments
      /// </summary>
      public int termsfreq { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// Pcat Disc
      /// </summary>
      public bool pcatdiscfl { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// Lost Bus Usage Flag
      /// </summary>
      public bool lostbususagefl { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Terms on Line Item
      /// </summary>
      public bool termslinefl { get; set; }

      /// <summary>
      /// C.O.D. Terms
      /// </summary>
      public bool termscodfl { get; set; }

      /// <summary>
      /// EDI Unit of Measure
      /// </summary>
      [StringValidationAttribute]
      public string unitediuom { get; set; }

      /// <summary>
      /// Return Type
      /// </summary>
      [StringValidationAttribute]
      public string returnty { get; set; }

      /// <summary>
      /// Restock Type
      /// </summary>
      public bool restockfl { get; set; }

      /// <summary>
      /// Restock Charge
      /// </summary>
      public decimal restockamt { get; set; }

      /// <summary>
      /// Warranty Tag Required
      /// </summary>
      public bool reqwarrfl { get; set; }

      /// <summary>
      /// Cred Auth Required
      /// </summary>
      public bool reqauthfl { get; set; }

      /// <summary>
      /// Discount Type
      /// </summary>
      [StringValidationAttribute]
      public string disctype { get; set; }

      /// <summary>
      /// Due Date Type
      /// </summary>
      [StringValidationAttribute]
      public string duetype { get; set; }

      /// <summary>
      /// Discount Date
      /// </summary>
      public DateTime? discdt { get; set; }

      /// <summary>
      /// duedt
      /// </summary>
      public DateTime? duedt { get; set; }

      /// <summary>
      /// Discount In By (Prox Cut Day)
      /// </summary>
      public int disccutday { get; set; }

      /// <summary>
      /// Due on (Prox)
      /// </summary>
      public int dueproxday1 { get; set; }
      public int dueproxday2 { get; set; }

      /// <summary>
      /// Discount Thru Date (Prox)
      /// </summary>
      public int discproxday1 { get; set; }
      public int discproxday2 { get; set; }

      /// <summary>
      /// splitfl
      /// </summary>
      public bool splitfl { get; set; }

      /// <summary>
      /// Discount Split Flag
      /// </summary>
      public bool discsplitfl { get; set; }

      /// <summary>
      /// Months to Add to Prox Calc
      /// </summary>
      public int proxmonths1 { get; set; }
      public int proxmonths2 { get; set; }

      /// <summary>
      /// Due Cutoff Day (Prox)
      /// </summary>
      public int duecutday { get; set; }

      /// <summary>
      /// Reason
      /// </summary>
      [StringValidationAttribute]
      public string reasunavty { get; set; }

      /// <summary>
      /// Require Invoice#
      /// </summary>
      public bool reqinvfl { get; set; }

      /// <summary>
      /// Usage
      /// </summary>
      public bool usagefl { get; set; }

      /// <summary>
      /// Warranty Exchange
      /// </summary>
      public bool warrexchgfl { get; set; }

      /// <summary>
      /// Month
      /// </summary>
      [StringValidationAttribute]
      public string schedmm { get; set; }

      /// <summary>
      /// Day
      /// </summary>
      [StringValidationAttribute]
      public string scheddd { get; set; }

      /// <summary>
      /// Year
      /// </summary>
      [StringValidationAttribute]
      public string schedyy { get; set; }

      /// <summary>
      /// Weekday
      /// </summary>
      [StringValidationAttribute]
      public string schedwd { get; set; }

      /// <summary>
      /// Transl. Mgr Lang
      /// </summary>
      [StringValidationAttribute]
      public string trmgrlang { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Exclude in eSales
      /// </summary>
      [StringValidationAttribute]
      public string exclecomm { get; set; }

      /// <summary>
      /// Restock Tax Group
      /// </summary>
      public int restktaxgrp { get; set; }

      /// <summary>
      /// Fee Product
      /// </summary>
      [StringValidationAttribute]
      public string ptxfeeprod { get; set; }

      /// <summary>
      /// Fee Category
      /// </summary>
      [StringValidationAttribute]
      public string ptxfeecat { get; set; }

      /// <summary>
      /// Fee Duration
      /// </summary>
      [StringValidationAttribute]
      public string ptxfeeduration { get; set; }

      /// <summary>
      /// Fee Number Of Days
      /// </summary>
      public int ptxfeenodays { get; set; }

      /// <summary>
      /// Div#
      /// </summary>
      public int gldivno { get; set; }

      /// <summary>
      /// Dept#
      /// </summary>
      public int gldeptno { get; set; }

      /// <summary>
      /// Acct#
      /// </summary>
      public int glacctno { get; set; }

      /// <summary>
      /// Sub#
      /// </summary>
      public int glsubno { get; set; }

      /// <summary>
      /// Exclude from MDD Interface
      /// </summary>
      [StringValidationAttribute]
      public string exclmdd { get; set; }

      /// <summary>
      /// Group Type
      /// </summary>
      [StringValidationAttribute]
      public string vendprodgrouptype { get; set; }

      /// <summary>
      /// Group Ref
      /// </summary>
      [StringValidationAttribute]
      public string vendprodgroupref { get; set; }

      /// <summary>
      /// Group Sub Ref
      /// </summary>
      [StringValidationAttribute]
      public string vendprodgroupsubref { get; set; }

      /// <summary>
      /// JM Descrip
      /// </summary>
      [StringValidationAttribute]
      public string jmdescrip { get; set; }

      /// <summary>
      /// JM Unit
      /// </summary>
      [StringValidationAttribute]
      public string jmunit { get; set; }

      /// <summary>
      /// Special Price/Cost
      /// </summary>
      [StringValidationAttribute]
      public string jmspeccostty { get; set; }

      /// <summary>
      /// Price/Cost Units Per Stk Unit
      /// </summary>
      public decimal jmcsunperstk { get; set; }

      /// <summary>
      /// Special Price/Cost Unit
      /// </summary>
      [StringValidationAttribute]
      public string jmprccostper { get; set; }

      /// <summary>
      /// Credit Card Only
      /// </summary>
      public bool cconlyfl { get; set; }

      /// <summary>
      /// Extended Description
      /// </summary>
      [StringValidationAttribute]
      public string extdescrip { get; set; }

      /// <summary>
      /// Rule Settings List
      /// </summary>
      [StringValidationAttribute]
      public string rulesettings { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// Category List
      /// </summary>
      [StringValidationAttribute]
      public string categorylist { get; set; }

      /// <summary>
      /// Report To Supplier
      /// </summary>
      public bool reporttovendorfl { get; set; }

      /// <summary>
      /// Security Settings List
      /// </summary>
      [StringValidationAttribute]
      public string securitysettings { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public int vendno { get; set; }

      /// <summary>
      /// Stock Price Operand
      /// </summary>
      [StringValidationAttribute]
      public string edistkprccd { get; set; }

      /// <summary>
      /// Ship From
      /// </summary>
      public int shipfmno { get; set; }

      /// <summary>
      /// Stock Price Adjustment Value
      /// </summary>
      public decimal edistkprcadj { get; set; }

      /// <summary>
      /// Product Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// Product Line
      /// </summary>
      [StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Unavail Reason Type
      /// </summary>
      [StringValidationAttribute]
      public string unavailtype { get; set; }

      /// <summary>
      /// Product Price Type
      /// </summary>
      [StringValidationAttribute]
      public string pricetype { get; set; }

      /// <summary>
      /// Intrastat Country Code
      /// </summary>
      [StringValidationAttribute]
      public string intracountrycd { get; set; }

      /// <summary>
      /// Report ESL/Intrastat
      /// </summary>
      public bool intraeslrptfl { get; set; }

      /// <summary>
      /// Intrastat Use Supplementary Units
      /// </summary>
      public bool usesuppunitsfl { get; set; }

      /// <summary>
      /// Billing Account Code
      /// </summary>
      [StringValidationAttribute]
      public string billacctcd { get; set; }

      /// <summary>
      /// DNBi Interface Flag
      /// </summary>
      public bool dnbiinterfacefl { get; set; }

      /// <summary>
      /// DNBi Default Credit Limit Override
      /// </summary>
      public decimal dnbicredlim { get; set; }

      /// <summary>
      /// Action Code
      /// </summary>
      [StringValidationAttribute]
      public string esbactioncode { get; set; }

      /// <summary>
      /// Require Invoice# on CR
      /// </summary>
      public bool reqinvcrfl { get; set; }

      /// <summary>
      /// Credit/Rebill Flag
      /// </summary>
      public bool creditrebillfl { get; set; }

      /// <summary>
      /// Include Serials Flag
      /// </summary>
      public bool crserialfl { get; set; }

      /// <summary>
      /// Include Rebates Flag
      /// </summary>
      public bool crrebatesfl { get; set; }

      /// <summary>
      /// transdttmz
      /// </summary>
      public DateTime? transdttmz { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSastaBaseFromRow<T>(DataRow row) where T:SastaBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.codeiden = row.IsNull("codeiden") ? string.Empty : row.Field<string>("codeiden");
         entity.codeval = row.IsNull("codeval") ? string.Empty : row.Field<string>("codeval");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.minmarpct = row.IsNull("minmarpct") ? decimal.Zero : row.Field<decimal>("minmarpct");
         entity.maxmarpct = row.IsNull("maxmarpct") ? decimal.Zero : row.Field<decimal>("maxmarpct");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.editpcd = row.IsNull("editpcd") ? string.Empty : row.Field<string>("editpcd");
         entity.edidtcd = row.IsNull("edidtcd") ? string.Empty : row.Field<string>("edidtcd");
         entity.ediunavty = row.IsNull("ediunavty") ? string.Empty : row.Field<string>("ediunavty");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.termspct = row.IsNull("termspct") ? decimal.Zero : row.Field<decimal>("termspct");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.discdays = row.IsNull("discdays") ? 0 : row.Field<int>("discdays");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.duedays = row.IsNull("duedays") ? 0 : row.Field<int>("duedays");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.proxcutday = row.IsNull("proxcutday") ? 0 : row.Field<int>("proxcutday");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.nopaymts = row.IsNull("nopaymts") ? 0 : row.Field<int>("nopaymts");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.termsfreq = row.IsNull("termsfreq") ? 0 : row.Field<int>("termsfreq");
         entity.user6 = row.Field<decimal?>("user6");
         entity.pcatdiscfl = row.Field<bool>("pcatdiscfl");
         entity.user7 = row.Field<decimal?>("user7");
         entity.lostbususagefl = row.Field<bool>("lostbususagefl");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.termslinefl = row.Field<bool>("termslinefl");
         entity.termscodfl = row.Field<bool>("termscodfl");
         entity.unitediuom = row.IsNull("unitediuom") ? string.Empty : row.Field<string>("unitediuom");
         entity.returnty = row.IsNull("returnty") ? string.Empty : row.Field<string>("returnty");
         entity.restockfl = row.Field<bool>("restockfl");
         entity.restockamt = row.IsNull("restockamt") ? decimal.Zero : row.Field<decimal>("restockamt");
         entity.reqwarrfl = row.Field<bool>("reqwarrfl");
         entity.reqauthfl = row.Field<bool>("reqauthfl");
         entity.disctype = row.IsNull("disctype") ? string.Empty : row.Field<string>("disctype");
         entity.duetype = row.IsNull("duetype") ? string.Empty : row.Field<string>("duetype");
         entity.discdt = row.Field<DateTime?>("discdt");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.disccutday = row.IsNull("disccutday") ? 0 : row.Field<int>("disccutday");
         entity.dueproxday1 = row.IsNull("dueproxday1") ? 0 : row.Field<int>("dueproxday1");
         entity.dueproxday2 = row.IsNull("dueproxday2") ? 0 : row.Field<int>("dueproxday2");
         entity.discproxday1 = row.IsNull("discproxday1") ? 0 : row.Field<int>("discproxday1");
         entity.discproxday2 = row.IsNull("discproxday2") ? 0 : row.Field<int>("discproxday2");
         entity.splitfl = row.Field<bool>("splitfl");
         entity.discsplitfl = row.Field<bool>("discsplitfl");
         entity.proxmonths1 = row.IsNull("proxmonths1") ? 0 : row.Field<int>("proxmonths1");
         entity.proxmonths2 = row.IsNull("proxmonths2") ? 0 : row.Field<int>("proxmonths2");
         entity.duecutday = row.IsNull("duecutday") ? 0 : row.Field<int>("duecutday");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.reqinvfl = row.Field<bool>("reqinvfl");
         entity.usagefl = row.Field<bool>("usagefl");
         entity.warrexchgfl = row.Field<bool>("warrexchgfl");
         entity.schedmm = row.IsNull("schedmm") ? string.Empty : row.Field<string>("schedmm");
         entity.scheddd = row.IsNull("scheddd") ? string.Empty : row.Field<string>("scheddd");
         entity.schedyy = row.IsNull("schedyy") ? string.Empty : row.Field<string>("schedyy");
         entity.schedwd = row.IsNull("schedwd") ? string.Empty : row.Field<string>("schedwd");
         entity.trmgrlang = row.IsNull("trmgrlang") ? string.Empty : row.Field<string>("trmgrlang");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.exclecomm = row.IsNull("exclecomm") ? string.Empty : row.Field<string>("exclecomm");
         entity.restktaxgrp = row.IsNull("restktaxgrp") ? 0 : row.Field<int>("restktaxgrp");
         entity.ptxfeeprod = row.IsNull("ptxfeeprod") ? string.Empty : row.Field<string>("ptxfeeprod");
         entity.ptxfeecat = row.IsNull("ptxfeecat") ? string.Empty : row.Field<string>("ptxfeecat");
         entity.ptxfeeduration = row.IsNull("ptxfeeduration") ? string.Empty : row.Field<string>("ptxfeeduration");
         entity.ptxfeenodays = row.IsNull("ptxfeenodays") ? 0 : row.Field<int>("ptxfeenodays");
         entity.gldivno = row.IsNull("gldivno") ? 0 : row.Field<int>("gldivno");
         entity.gldeptno = row.IsNull("gldeptno") ? 0 : row.Field<int>("gldeptno");
         entity.glacctno = row.IsNull("glacctno") ? 0 : row.Field<int>("glacctno");
         entity.glsubno = row.IsNull("glsubno") ? 0 : row.Field<int>("glsubno");
         entity.exclmdd = row.IsNull("exclmdd") ? string.Empty : row.Field<string>("exclmdd");
         entity.vendprodgrouptype = row.IsNull("vendprodgrouptype") ? string.Empty : row.Field<string>("vendprodgrouptype");
         entity.vendprodgroupref = row.IsNull("vendprodgroupref") ? string.Empty : row.Field<string>("vendprodgroupref");
         entity.vendprodgroupsubref = row.IsNull("vendprodgroupsubref") ? string.Empty : row.Field<string>("vendprodgroupsubref");
         entity.jmdescrip = row.IsNull("jmdescrip") ? string.Empty : row.Field<string>("jmdescrip");
         entity.jmunit = row.IsNull("jmunit") ? string.Empty : row.Field<string>("jmunit");
         entity.jmspeccostty = row.IsNull("jmspeccostty") ? string.Empty : row.Field<string>("jmspeccostty");
         entity.jmcsunperstk = row.IsNull("jmcsunperstk") ? decimal.Zero : row.Field<decimal>("jmcsunperstk");
         entity.jmprccostper = row.IsNull("jmprccostper") ? string.Empty : row.Field<string>("jmprccostper");
         entity.cconlyfl = row.Field<bool>("cconlyfl");
         entity.extdescrip = row.IsNull("extdescrip") ? string.Empty : row.Field<string>("extdescrip");
         entity.rulesettings = row.IsNull("rulesettings") ? string.Empty : row.Field<string>("rulesettings");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.categorylist = row.IsNull("categorylist") ? string.Empty : row.Field<string>("categorylist");
         entity.reporttovendorfl = row.Field<bool>("reporttovendorfl");
         entity.securitysettings = row.IsNull("securitysettings") ? string.Empty : row.Field<string>("securitysettings");
         entity.vendno = row.IsNull("vendno") ? 0 : row.Field<int>("vendno");
         entity.edistkprccd = row.IsNull("edistkprccd") ? string.Empty : row.Field<string>("edistkprccd");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.edistkprcadj = row.IsNull("edistkprcadj") ? decimal.Zero : row.Field<decimal>("edistkprcadj");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.unavailtype = row.IsNull("unavailtype") ? string.Empty : row.Field<string>("unavailtype");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.intracountrycd = row.IsNull("intracountrycd") ? string.Empty : row.Field<string>("intracountrycd");
         entity.intraeslrptfl = row.Field<bool>("intraeslrptfl");
         entity.usesuppunitsfl = row.Field<bool>("usesuppunitsfl");
         entity.billacctcd = row.IsNull("billacctcd") ? string.Empty : row.Field<string>("billacctcd");
         entity.dnbiinterfacefl = row.Field<bool>("dnbiinterfacefl");
         entity.dnbicredlim = row.IsNull("dnbicredlim") ? decimal.Zero : row.Field<decimal>("dnbicredlim");
         entity.esbactioncode = row.IsNull("esbactioncode") ? string.Empty : row.Field<string>("esbactioncode");
         entity.reqinvcrfl = row.Field<bool>("reqinvcrfl");
         entity.creditrebillfl = row.Field<bool>("creditrebillfl");
         entity.crserialfl = row.Field<bool>("crserialfl");
         entity.crrebatesfl = row.Field<bool>("crrebatesfl");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("sastaRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastaBase(ref DataRow row, SastaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("codeiden", entity.codeiden);
         row.SetField("codeval", entity.codeval);
         row.SetField("descrip", entity.descrip);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("minmarpct", entity.minmarpct);
         row.SetField("maxmarpct", entity.maxmarpct);
         row.SetField("whse", entity.whse);
         row.SetField("editpcd", entity.editpcd);
         row.SetField("edidtcd", entity.edidtcd);
         row.SetField("ediunavty", entity.ediunavty);
         row.SetField("operinit", entity.operinit);
         row.SetField("transtm", entity.transtm);
         row.SetField("transdt", entity.transdt);
         row.SetField("termspct", entity.termspct);
         row.SetField("user1", entity.user1);
         row.SetField("discdays", entity.discdays);
         row.SetField("user2", entity.user2);
         row.SetField("duedays", entity.duedays);
         row.SetField("user3", entity.user3);
         row.SetField("proxcutday", entity.proxcutday);
         row.SetField("user4", entity.user4);
         row.SetField("nopaymts", entity.nopaymts);
         row.SetField("user5", entity.user5);
         row.SetField("termsfreq", entity.termsfreq);
         row.SetField("user6", entity.user6);
         row.SetField("pcatdiscfl", entity.pcatdiscfl);
         row.SetField("user7", entity.user7);
         row.SetField("lostbususagefl", entity.lostbususagefl);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("termslinefl", entity.termslinefl);
         row.SetField("termscodfl", entity.termscodfl);
         row.SetField("unitediuom", entity.unitediuom);
         row.SetField("returnty", entity.returnty);
         row.SetField("restockfl", entity.restockfl);
         row.SetField("restockamt", entity.restockamt);
         row.SetField("reqwarrfl", entity.reqwarrfl);
         row.SetField("reqauthfl", entity.reqauthfl);
         row.SetField("disctype", entity.disctype);
         row.SetField("duetype", entity.duetype);
         row.SetField("discdt", entity.discdt);
         row.SetField("duedt", entity.duedt);
         row.SetField("disccutday", entity.disccutday);
         row.SetField("dueproxday1", entity.dueproxday1);
         row.SetField("dueproxday2", entity.dueproxday2);
         row.SetField("discproxday1", entity.discproxday1);
         row.SetField("discproxday2", entity.discproxday2);
         row.SetField("splitfl", entity.splitfl);
         row.SetField("discsplitfl", entity.discsplitfl);
         row.SetField("proxmonths1", entity.proxmonths1);
         row.SetField("proxmonths2", entity.proxmonths2);
         row.SetField("duecutday", entity.duecutday);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("reqinvfl", entity.reqinvfl);
         row.SetField("usagefl", entity.usagefl);
         row.SetField("warrexchgfl", entity.warrexchgfl);
         row.SetField("schedmm", entity.schedmm);
         row.SetField("scheddd", entity.scheddd);
         row.SetField("schedyy", entity.schedyy);
         row.SetField("schedwd", entity.schedwd);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("transproc", entity.transproc);
         row.SetField("exclecomm", entity.exclecomm);
         row.SetField("restktaxgrp", entity.restktaxgrp);
         row.SetField("ptxfeeprod", entity.ptxfeeprod);
         row.SetField("ptxfeecat", entity.ptxfeecat);
         row.SetField("ptxfeeduration", entity.ptxfeeduration);
         row.SetField("ptxfeenodays", entity.ptxfeenodays);
         row.SetField("gldivno", entity.gldivno);
         row.SetField("gldeptno", entity.gldeptno);
         row.SetField("glacctno", entity.glacctno);
         row.SetField("glsubno", entity.glsubno);
         row.SetField("exclmdd", entity.exclmdd);
         row.SetField("vendprodgrouptype", entity.vendprodgrouptype);
         row.SetField("vendprodgroupref", entity.vendprodgroupref);
         row.SetField("vendprodgroupsubref", entity.vendprodgroupsubref);
         row.SetField("jmdescrip", entity.jmdescrip);
         row.SetField("jmunit", entity.jmunit);
         row.SetField("jmspeccostty", entity.jmspeccostty);
         row.SetField("jmcsunperstk", entity.jmcsunperstk);
         row.SetField("jmprccostper", entity.jmprccostper);
         row.SetField("cconlyfl", entity.cconlyfl);
         row.SetField("extdescrip", entity.extdescrip);
         row.SetField("rulesettings", entity.rulesettings);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("categorylist", entity.categorylist);
         row.SetField("reporttovendorfl", entity.reporttovendorfl);
         row.SetField("securitysettings", entity.securitysettings);
         row.SetField("vendno", entity.vendno);
         row.SetField("edistkprccd", entity.edistkprccd);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("edistkprcadj", entity.edistkprcadj);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodline", entity.prodline);
         row.SetField("unavailtype", entity.unavailtype);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("intracountrycd", entity.intracountrycd);
         row.SetField("intraeslrptfl", entity.intraeslrptfl);
         row.SetField("usesuppunitsfl", entity.usesuppunitsfl);
         row.SetField("billacctcd", entity.billacctcd);
         row.SetField("dnbiinterfacefl", entity.dnbiinterfacefl);
         row.SetField("dnbicredlim", entity.dnbicredlim);
         row.SetField("esbactioncode", entity.esbactioncode);
         row.SetField("reqinvcrfl", entity.reqinvcrfl);
         row.SetField("creditrebillfl", entity.creditrebillfl);
         row.SetField("crserialfl", entity.crserialfl);
         row.SetField("crrebatesfl", entity.crrebatesfl);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("sastaRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SastaBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("codeiden", entity.codeiden);
         row.SetField("codeval", entity.codeval);
         row.SetField("sastaRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	