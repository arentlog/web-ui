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

namespace Infor.Sxe.OE.Data.Models.Pdsoeordercopyfabwhse
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeordercopyfabwhse.Oeordercopyfabwhse")]
   public partial class Oeordercopyfabwhse : ModelBase
   {
      [StringValidationAttribute]
      public string maintmode { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string towhse { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      [StringValidationAttribute]
      public string origtranstype { get; set; }
      public int orderaltno { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public bool copycfgfl { get; set; }
      [StringValidationAttribute]
      public string cfglines { get; set; }
      [StringValidationAttribute]
      public string fabwhsemethod { get; set; }
      [StringValidationAttribute]
      public string fabwhse { get; set; }
      public bool fabwhseenabled { get; set; }
      public bool fabshipviaenabled { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      public bool directorderfl { get; set; }
      public bool directorderflenabled { get; set; }
      [StringValidationAttribute]
      public string arpwhse { get; set; }
      public bool arpwhsehidden { get; set; }
      [StringValidationAttribute]
      public string arpwhsename { get; set; }
      [StringValidationAttribute]
      public string tieinfo { get; set; }
      public bool tieinfohidden { get; set; }
      [StringValidationAttribute]
      public string tieinfolabel { get; set; }
      [StringValidationAttribute]
      public string linedata { get; set; }
      public bool linedatahidden { get; set; }
      public int copyfromline { get; set; }
      public bool copyfromlinehidden { get; set; }
      public bool copyfromlineenabled { get; set; }
      public bool vernoenabled { get; set; }
      public int verno { get; set; }
      public bool launchscreenfl { get; set; }
      public bool cfgkitcompfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeordercopyfabwhse BuildOeordercopyfabwhseFromRow(DataRow row)
      {
         Oeordercopyfabwhse entity = new Oeordercopyfabwhse();
         entity.maintmode = row.IsNull("maintmode") ? string.Empty : row.Field<string>("maintmode");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.towhse = row.IsNull("towhse") ? string.Empty : row.Field<string>("towhse");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.origtranstype = row.IsNull("origtranstype") ? string.Empty : row.Field<string>("origtranstype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.copycfgfl = row.Field<bool>("copycfgfl");
         entity.cfglines = row.IsNull("cfglines") ? string.Empty : row.Field<string>("cfglines");
         entity.fabwhsemethod = row.IsNull("fabwhsemethod") ? string.Empty : row.Field<string>("fabwhsemethod");
         entity.fabwhse = row.IsNull("fabwhse") ? string.Empty : row.Field<string>("fabwhse");
         entity.fabwhseenabled = row.Field<bool>("fabwhseenabled");
         entity.fabshipviaenabled = row.Field<bool>("fabshipviaenabled");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.directorderfl = row.Field<bool>("directorderfl");
         entity.directorderflenabled = row.Field<bool>("directorderflenabled");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.arpwhsehidden = row.Field<bool>("arpwhsehidden");
         entity.arpwhsename = row.IsNull("arpwhsename") ? string.Empty : row.Field<string>("arpwhsename");
         entity.tieinfo = row.IsNull("tieinfo") ? string.Empty : row.Field<string>("tieinfo");
         entity.tieinfohidden = row.Field<bool>("tieinfohidden");
         entity.tieinfolabel = row.IsNull("tieinfolabel") ? string.Empty : row.Field<string>("tieinfolabel");
         entity.linedata = row.IsNull("linedata") ? string.Empty : row.Field<string>("linedata");
         entity.linedatahidden = row.Field<bool>("linedatahidden");
         entity.copyfromline = row.IsNull("copyfromline") ? 0 : row.Field<int>("copyfromline");
         entity.copyfromlinehidden = row.Field<bool>("copyfromlinehidden");
         entity.copyfromlineenabled = row.Field<bool>("copyfromlineenabled");
         entity.vernoenabled = row.Field<bool>("vernoenabled");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.launchscreenfl = row.Field<bool>("launchscreenfl");
         entity.cfgkitcompfl = row.Field<bool>("cfgkitcompfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeordercopyfabwhse(ref DataRow row, Oeordercopyfabwhse entity)
      {
         row.SetField("maintmode", entity.maintmode);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("towhse", entity.towhse);
         row.SetField("botype", entity.botype);
         row.SetField("origtranstype", entity.origtranstype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("copycfgfl", entity.copycfgfl);
         row.SetField("cfglines", entity.cfglines);
         row.SetField("fabwhsemethod", entity.fabwhsemethod);
         row.SetField("fabwhse", entity.fabwhse);
         row.SetField("fabwhseenabled", entity.fabwhseenabled);
         row.SetField("fabshipviaenabled", entity.fabshipviaenabled);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("directorderfl", entity.directorderfl);
         row.SetField("directorderflenabled", entity.directorderflenabled);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("arpwhsehidden", entity.arpwhsehidden);
         row.SetField("arpwhsename", entity.arpwhsename);
         row.SetField("tieinfo", entity.tieinfo);
         row.SetField("tieinfohidden", entity.tieinfohidden);
         row.SetField("tieinfolabel", entity.tieinfolabel);
         row.SetField("linedata", entity.linedata);
         row.SetField("linedatahidden", entity.linedatahidden);
         row.SetField("copyfromline", entity.copyfromline);
         row.SetField("copyfromlinehidden", entity.copyfromlinehidden);
         row.SetField("copyfromlineenabled", entity.copyfromlineenabled);
         row.SetField("vernoenabled", entity.vernoenabled);
         row.SetField("verno", entity.verno);
         row.SetField("launchscreenfl", entity.launchscreenfl);
         row.SetField("cfgkitcompfl", entity.cfgkitcompfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
