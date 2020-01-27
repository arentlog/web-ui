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

namespace Infor.Sxe.IC.Data.Models.Pdsicentrylotscreate
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicentrylotscreate.Icentrylotscreate")]
   public partial class Icentrylotscreate : ModelBase
   {
      public bool selectedfl { get; set; }
      [StringValidationAttribute]
      public string lotno { get; set; }
      public decimal quantity { get; set; }
      public DateTime? opendt { get; set; }
      public DateTime? expiredt { get; set; }
      public decimal cost { get; set; }
      [StringValidationAttribute]
      public string binloc1 { get; set; }
      [StringValidationAttribute]
      public string binloc2 { get; set; }
      public decimal qtyunavail { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      public bool wtreturnorigasked { get; set; }
      public bool wtreturnoriganswer { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icentrylotscreate BuildIcentrylotscreateFromRow(DataRow row)
      {
         Icentrylotscreate entity = new Icentrylotscreate();
         entity.selectedfl = row.Field<bool>("selectedfl");
         entity.lotno = row.IsNull("lotno") ? string.Empty : row.Field<string>("lotno");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.opendt = row.Field<DateTime?>("opendt");
         entity.expiredt = row.Field<DateTime?>("expiredt");
         entity.cost = row.IsNull("cost") ? decimal.Zero : row.Field<decimal>("cost");
         entity.binloc1 = row.IsNull("binloc1") ? string.Empty : row.Field<string>("binloc1");
         entity.binloc2 = row.IsNull("binloc2") ? string.Empty : row.Field<string>("binloc2");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.wtreturnorigasked = row.Field<bool>("wtreturnorigasked");
         entity.wtreturnoriganswer = row.Field<bool>("wtreturnoriganswer");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcentrylotscreate(ref DataRow row, Icentrylotscreate entity)
      {
         row.SetField("selectedfl", entity.selectedfl);
         row.SetField("lotno", entity.lotno);
         row.SetField("quantity", entity.quantity);
         row.SetField("opendt", entity.opendt);
         row.SetField("expiredt", entity.expiredt);
         row.SetField("cost", entity.cost);
         row.SetField("binloc1", entity.binloc1);
         row.SetField("binloc2", entity.binloc2);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("wtreturnorigasked", entity.wtreturnorigasked);
         row.SetField("wtreturnoriganswer", entity.wtreturnoriganswer);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591