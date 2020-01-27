//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
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
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.VA.Data.Models.Pdsvaealist
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaealist.Vaealistresults")]
   public partial class Vaealistresults : ModelBase
   {
      public int vano { get; set; }
      public int vasuf { get; set; }
      [StringValidationAttribute]
      public string cVANotes { get; set; }
      [StringValidationAttribute]
      public string vaprod { get; set; }
      [StringValidationAttribute]
      public string vawhse { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string vastagecd { get; set; }
      public decimal vaqtyord { get; set; }
      public decimal vaqtyship { get; set; }
      [StringValidationAttribute]
      public string vaunit { get; set; }
      public DateTime? enterdt { get; set; }
      public DateTime? reqshipdt { get; set; }
      public DateTime? promisedt { get; set; }
      public DateTime? estcompdt { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string cSctnNotes { get; set; }
      [StringValidationAttribute]
      public string sctntype { get; set; }
      [StringValidationAttribute]
      public string sctncode { get; set; }
      [StringValidationAttribute]
      public string sctnstagecd { get; set; }
      public int lineno { get; set; }
      public bool commentfl { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string cProdDesc { get; set; }
      [StringValidationAttribute]
      public string lotno { get; set; }
      public bool qtybasetotfl { get; set; }
      public decimal qtyneeded { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyship { get; set; }
      public decimal stkqtyord { get; set; }
      public decimal stkqtyship { get; set; }
      [StringValidationAttribute]
      public string prodcostdspl { get; set; }
      [StringValidationAttribute]
      public string netamtdspl { get; set; }
      public bool statustype { get; set; }
      public bool rushfl { get; set; }
      [StringValidationAttribute]
      public string labordata { get; set; }
      public decimal netavail { get; set; }
      public decimal qtyonorder { get; set; }
      [StringValidationAttribute]
      public string ordertypedspl { get; set; }
      public int orderaltno { get; set; }
      public DateTime? orderduedt { get; set; }
      [StringValidationAttribute]
      public string builderdspl { get; set; }
      [StringValidationAttribute]
      public string timeelapseddspl { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaealistresults BuildVaealistresultsFromRow(DataRow row)
      {
         Vaealistresults entity = new Vaealistresults();
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.cVANotes = row.IsNull("cVANotes") ? string.Empty : row.Field<string>("cVANotes");
         entity.vaprod = row.IsNull("vaprod") ? string.Empty : row.Field<string>("vaprod");
         entity.vawhse = row.IsNull("vawhse") ? string.Empty : row.Field<string>("vawhse");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.vastagecd = row.IsNull("vastagecd") ? string.Empty : row.Field<string>("vastagecd");
         entity.vaqtyord = row.IsNull("vaqtyord") ? decimal.Zero : row.Field<decimal>("vaqtyord");
         entity.vaqtyship = row.IsNull("vaqtyship") ? decimal.Zero : row.Field<decimal>("vaqtyship");
         entity.vaunit = row.IsNull("vaunit") ? string.Empty : row.Field<string>("vaunit");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.estcompdt = row.Field<DateTime?>("estcompdt");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.cSctnNotes = row.IsNull("cSctnNotes") ? string.Empty : row.Field<string>("cSctnNotes");
         entity.sctntype = row.IsNull("sctntype") ? string.Empty : row.Field<string>("sctntype");
         entity.sctncode = row.IsNull("sctncode") ? string.Empty : row.Field<string>("sctncode");
         entity.sctnstagecd = row.IsNull("sctnstagecd") ? string.Empty : row.Field<string>("sctnstagecd");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.cProdDesc = row.IsNull("cProdDesc") ? string.Empty : row.Field<string>("cProdDesc");
         entity.lotno = row.IsNull("lotno") ? string.Empty : row.Field<string>("lotno");
         entity.qtybasetotfl = row.Field<bool>("qtybasetotfl");
         entity.qtyneeded = row.IsNull("qtyneeded") ? decimal.Zero : row.Field<decimal>("qtyneeded");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.prodcostdspl = row.IsNull("prodcostdspl") ? string.Empty : row.Field<string>("prodcostdspl");
         entity.netamtdspl = row.IsNull("netamtdspl") ? string.Empty : row.Field<string>("netamtdspl");
         entity.statustype = row.Field<bool>("statustype");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.labordata = row.IsNull("labordata") ? string.Empty : row.Field<string>("labordata");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.qtyonorder = row.IsNull("qtyonorder") ? decimal.Zero : row.Field<decimal>("qtyonorder");
         entity.ordertypedspl = row.IsNull("ordertypedspl") ? string.Empty : row.Field<string>("ordertypedspl");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderduedt = row.Field<DateTime?>("orderduedt");
         entity.builderdspl = row.IsNull("builderdspl") ? string.Empty : row.Field<string>("builderdspl");
         entity.timeelapseddspl = row.IsNull("timeelapseddspl") ? string.Empty : row.Field<string>("timeelapseddspl");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaealistresults(ref DataRow row, Vaealistresults entity)
      {
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("cVANotes", entity.cVANotes);
         row.SetField("vaprod", entity.vaprod);
         row.SetField("vawhse", entity.vawhse);
         row.SetField("transtype", entity.transtype);
         row.SetField("vastagecd", entity.vastagecd);
         row.SetField("vaqtyord", entity.vaqtyord);
         row.SetField("vaqtyship", entity.vaqtyship);
         row.SetField("vaunit", entity.vaunit);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("estcompdt", entity.estcompdt);
         row.SetField("seqno", entity.seqno);
         row.SetField("cSctnNotes", entity.cSctnNotes);
         row.SetField("sctntype", entity.sctntype);
         row.SetField("sctncode", entity.sctncode);
         row.SetField("sctnstagecd", entity.sctnstagecd);
         row.SetField("lineno", entity.lineno);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("cProdDesc", entity.cProdDesc);
         row.SetField("lotno", entity.lotno);
         row.SetField("qtybasetotfl", entity.qtybasetotfl);
         row.SetField("qtyneeded", entity.qtyneeded);
         row.SetField("unit", entity.unit);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("prodcostdspl", entity.prodcostdspl);
         row.SetField("netamtdspl", entity.netamtdspl);
         row.SetField("statustype", entity.statustype);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("labordata", entity.labordata);
         row.SetField("netavail", entity.netavail);
         row.SetField("qtyonorder", entity.qtyonorder);
         row.SetField("ordertypedspl", entity.ordertypedspl);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderduedt", entity.orderduedt);
         row.SetField("builderdspl", entity.builderdspl);
         row.SetField("timeelapseddspl", entity.timeelapseddspl);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591