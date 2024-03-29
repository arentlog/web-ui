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

namespace Infor.Sxe.WT.Data.Models.Pdswtlinelist
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtlinelist.Wtlines")]
   public partial class Wtlines : ModelBase
   {
      [StringValidationAttribute]
      public string wtelrowid { get; set; }
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      public int lineno { get; set; }
      public bool commentfl { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      [StringValidationAttribute]
      public string icspnotesfl { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyship { get; set; }
      [StringValidationAttribute]
      public string netamtdisplay { get; set; }
      public DateTime? enterdt { get; set; }
      public int orderaltno { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      public bool twlexistfl { get; set; }
      public bool tiesexistfl { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      public int cono { get; set; }
      public int cono2 { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtlines BuildWtlinesFromRow(DataRow row)
      {
         Wtlines entity = new Wtlines();
         entity.wtelrowid = row.IsNull("wtelrowid") ? string.Empty : row.Field<string>("wtelrowid");
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.icspnotesfl = row.IsNull("icspnotesfl") ? string.Empty : row.Field<string>("icspnotesfl");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.netamtdisplay = row.IsNull("netamtdisplay") ? string.Empty : row.Field<string>("netamtdisplay");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.twlexistfl = row.Field<bool>("twlexistfl");
         entity.tiesexistfl = row.Field<bool>("tiesexistfl");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtlines(ref DataRow row, Wtlines entity)
      {
         row.SetField("wtelrowid", entity.wtelrowid);
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("icspnotesfl", entity.icspnotesfl);
         row.SetField("unit", entity.unit);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("netamtdisplay", entity.netamtdisplay);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("statustype", entity.statustype);
         row.SetField("twlexistfl", entity.twlexistfl);
         row.SetField("tiesexistfl", entity.tiesexistfl);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("cono", entity.cono);
         row.SetField("cono2", entity.cono2);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
