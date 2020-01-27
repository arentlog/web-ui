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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpolinedetail
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpolinedetail.Loadpolinedetailresults")]
   public partial class Loadpolinedetailresults : ModelBase
   {
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string cNotes { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public bool commentfl { get; set; }
      public decimal dQtyOrdered { get; set; }
      public DateTime? duedt { get; set; }
      public decimal netamt { get; set; }
      [StringValidationAttribute]
      public string cPrice { get; set; }
      [StringValidationAttribute]
      public string cQtyRcv { get; set; }
      [StringValidationAttribute]
      public string cRcvCost { get; set; }
      [StringValidationAttribute]
      public string cQtyCosted { get; set; }
      [StringValidationAttribute]
      public string cInvCost { get; set; }
      [StringValidationAttribute]
      public string cSpeccostdsply { get; set; }
      [StringValidationAttribute]
      public string cNetAmt { get; set; }
      [StringValidationAttribute]
      public string cProdDesc { get; set; }
      public bool lCancel { get; set; }
      public int trackno { get; set; }
      public int tracklineno { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      public int pdsvcrecno { get; set; }
      public bool lRecvaddfl { get; set; }
      public bool lCorrectionFl { get; set; }
      [StringValidationAttribute]
      public string cVendorProduct { get; set; }
      [StringValidationAttribute]
      public string cVendQuote { get; set; }
      public DateTime? ackdt { get; set; }
      [StringValidationAttribute]
      public string ackrsn { get; set; }
      public bool mnonstock { get; set; }
      public bool mties { get; set; }
      public bool mseriallot { get; set; }
      public bool mtally { get; set; }
      public bool maddons { get; set; }
      public bool mcostingactivity { get; set; }
      public bool mreturnallocation { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      public decimal dutyrate { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string vendretauth { get; set; }
      [StringValidationAttribute]
      public string upcid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadpolinedetailresults BuildLoadpolinedetailresultsFromRow(DataRow row)
      {
         Loadpolinedetailresults entity = new Loadpolinedetailresults();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.cNotes = row.IsNull("cNotes") ? string.Empty : row.Field<string>("cNotes");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.dQtyOrdered = row.IsNull("dQtyOrdered") ? decimal.Zero : row.Field<decimal>("dQtyOrdered");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.cPrice = row.IsNull("cPrice") ? string.Empty : row.Field<string>("cPrice");
         entity.cQtyRcv = row.IsNull("cQtyRcv") ? string.Empty : row.Field<string>("cQtyRcv");
         entity.cRcvCost = row.IsNull("cRcvCost") ? string.Empty : row.Field<string>("cRcvCost");
         entity.cQtyCosted = row.IsNull("cQtyCosted") ? string.Empty : row.Field<string>("cQtyCosted");
         entity.cInvCost = row.IsNull("cInvCost") ? string.Empty : row.Field<string>("cInvCost");
         entity.cSpeccostdsply = row.IsNull("cSpeccostdsply") ? string.Empty : row.Field<string>("cSpeccostdsply");
         entity.cNetAmt = row.IsNull("cNetAmt") ? string.Empty : row.Field<string>("cNetAmt");
         entity.cProdDesc = row.IsNull("cProdDesc") ? string.Empty : row.Field<string>("cProdDesc");
         entity.lCancel = row.Field<bool>("lCancel");
         entity.trackno = row.IsNull("trackno") ? 0 : row.Field<int>("trackno");
         entity.tracklineno = row.IsNull("tracklineno") ? 0 : row.Field<int>("tracklineno");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.pdsvcrecno = row.IsNull("pdsvcrecno") ? 0 : row.Field<int>("pdsvcrecno");
         entity.lRecvaddfl = row.Field<bool>("lRecvaddfl");
         entity.lCorrectionFl = row.Field<bool>("lCorrectionFl");
         entity.cVendorProduct = row.IsNull("cVendorProduct") ? string.Empty : row.Field<string>("cVendorProduct");
         entity.cVendQuote = row.IsNull("cVendQuote") ? string.Empty : row.Field<string>("cVendQuote");
         entity.ackdt = row.Field<DateTime?>("ackdt");
         entity.ackrsn = row.IsNull("ackrsn") ? string.Empty : row.Field<string>("ackrsn");
         entity.mnonstock = row.Field<bool>("mnonstock");
         entity.mties = row.Field<bool>("mties");
         entity.mseriallot = row.Field<bool>("mseriallot");
         entity.mtally = row.Field<bool>("mtally");
         entity.maddons = row.Field<bool>("maddons");
         entity.mcostingactivity = row.Field<bool>("mcostingactivity");
         entity.mreturnallocation = row.Field<bool>("mreturnallocation");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.dutyrate = row.IsNull("dutyrate") ? decimal.Zero : row.Field<decimal>("dutyrate");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.vendretauth = row.IsNull("vendretauth") ? string.Empty : row.Field<string>("vendretauth");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpolinedetailresults(ref DataRow row, Loadpolinedetailresults entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("cNotes", entity.cNotes);
         row.SetField("unit", entity.unit);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("dQtyOrdered", entity.dQtyOrdered);
         row.SetField("duedt", entity.duedt);
         row.SetField("netamt", entity.netamt);
         row.SetField("cPrice", entity.cPrice);
         row.SetField("cQtyRcv", entity.cQtyRcv);
         row.SetField("cRcvCost", entity.cRcvCost);
         row.SetField("cQtyCosted", entity.cQtyCosted);
         row.SetField("cInvCost", entity.cInvCost);
         row.SetField("cSpeccostdsply", entity.cSpeccostdsply);
         row.SetField("cNetAmt", entity.cNetAmt);
         row.SetField("cProdDesc", entity.cProdDesc);
         row.SetField("lCancel", entity.lCancel);
         row.SetField("trackno", entity.trackno);
         row.SetField("tracklineno", entity.tracklineno);
         row.SetField("contractno", entity.contractno);
         row.SetField("pdsvcrecno", entity.pdsvcrecno);
         row.SetField("lRecvaddfl", entity.lRecvaddfl);
         row.SetField("lCorrectionFl", entity.lCorrectionFl);
         row.SetField("cVendorProduct", entity.cVendorProduct);
         row.SetField("cVendQuote", entity.cVendQuote);
         row.SetField("ackdt", entity.ackdt);
         row.SetField("ackrsn", entity.ackrsn);
         row.SetField("mnonstock", entity.mnonstock);
         row.SetField("mties", entity.mties);
         row.SetField("mseriallot", entity.mseriallot);
         row.SetField("mtally", entity.mtally);
         row.SetField("maddons", entity.maddons);
         row.SetField("mcostingactivity", entity.mcostingactivity);
         row.SetField("mreturnallocation", entity.mreturnallocation);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("dutyrate", entity.dutyrate);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("vendretauth", entity.vendretauth);
         row.SetField("upcid", entity.upcid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
