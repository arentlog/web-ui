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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoquickviewties
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoquickviewties.Loadpoquickviewtiessingle")]
   public partial class Loadpoquickviewtiessingle : ModelBase
   {
      public decimal qtyord { get; set; }
      public decimal onhand { get; set; }
      public decimal qtyrcv { get; set; }
      public decimal netavail { get; set; }
      public decimal qtycost { get; set; }
      public decimal backorder { get; set; }
      [StringValidationAttribute]
      public string stkunit { get; set; }
      public decimal onorder { get; set; }
      public DateTime? duedt { get; set; }
      public decimal received { get; set; }
      [StringValidationAttribute]
      public string reasonunavail { get; set; }
      public decimal unavail { get; set; }
      public bool inventorytxthidden { get; set; }
      public bool backorderhidden { get; set; }
      public bool netavailhidden { get; set; }
      public bool onhandhidden { get; set; }
      public bool onorderhidden { get; set; }
      public bool receivedhidden { get; set; }
      public bool unavailhidden { get; set; }


      public static Loadpoquickviewtiessingle BuildLoadpoquickviewtiessingleFromRow(DataRow row)
      {
         Loadpoquickviewtiessingle entity = new Loadpoquickviewtiessingle();
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.onhand = row.IsNull("onhand") ? decimal.Zero : row.Field<decimal>("onhand");
         entity.qtyrcv = row.IsNull("qtyrcv") ? decimal.Zero : row.Field<decimal>("qtyrcv");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.qtycost = row.IsNull("qtycost") ? decimal.Zero : row.Field<decimal>("qtycost");
         entity.backorder = row.IsNull("backorder") ? decimal.Zero : row.Field<decimal>("backorder");
         entity.stkunit = row.IsNull("stkunit") ? string.Empty : row.Field<string>("stkunit");
         entity.onorder = row.IsNull("onorder") ? decimal.Zero : row.Field<decimal>("onorder");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.received = row.IsNull("received") ? decimal.Zero : row.Field<decimal>("received");
         entity.reasonunavail = row.IsNull("reasonunavail") ? string.Empty : row.Field<string>("reasonunavail");
         entity.unavail = row.IsNull("unavail") ? decimal.Zero : row.Field<decimal>("unavail");
         entity.inventorytxthidden = row.Field<bool>("inventorytxthidden");
         entity.backorderhidden = row.Field<bool>("backorderhidden");
         entity.netavailhidden = row.Field<bool>("netavailhidden");
         entity.onhandhidden = row.Field<bool>("onhandhidden");
         entity.onorderhidden = row.Field<bool>("onorderhidden");
         entity.receivedhidden = row.Field<bool>("receivedhidden");
         entity.unavailhidden = row.Field<bool>("unavailhidden");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoquickviewtiessingle(ref DataRow row, Loadpoquickviewtiessingle entity)
      {
         row.SetField("qtyord", entity.qtyord);
         row.SetField("onhand", entity.onhand);
         row.SetField("qtyrcv", entity.qtyrcv);
         row.SetField("netavail", entity.netavail);
         row.SetField("qtycost", entity.qtycost);
         row.SetField("backorder", entity.backorder);
         row.SetField("stkunit", entity.stkunit);
         row.SetField("onorder", entity.onorder);
         row.SetField("duedt", entity.duedt);
         row.SetField("received", entity.received);
         row.SetField("reasonunavail", entity.reasonunavail);
         row.SetField("unavail", entity.unavail);
         row.SetField("inventorytxthidden", entity.inventorytxthidden);
         row.SetField("backorderhidden", entity.backorderhidden);
         row.SetField("netavailhidden", entity.netavailhidden);
         row.SetField("onhandhidden", entity.onhandhidden);
         row.SetField("onorderhidden", entity.onorderhidden);
         row.SetField("receivedhidden", entity.receivedhidden);
         row.SetField("unavailhidden", entity.unavailhidden);

      }
   
   }
}
#pragma warning restore 1591
