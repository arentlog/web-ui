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

namespace Infor.Sxe.OE.Data.Models.Pdscreateoealloctt
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdscreateoealloctt.Createoeallocttresults")]
   public partial class Createoeallocttresults : ModelBase
   {
      public bool invoicefl { get; set; }
      public DateTime? shipdt { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      public DateTime? coreduedt { get; set; }
      public decimal qty { get; set; }
      public decimal qtyalloc { get; set; }
      public decimal oldalloc { get; set; }
      public bool modifyfl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string pricetype { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string custtype { get; set; }
      public int recno { get; set; }
      public int stagecd { get; set; }


      public static Createoeallocttresults BuildCreateoeallocttresultsFromRow(DataRow row)
      {
         Createoeallocttresults entity = new Createoeallocttresults();
         entity.invoicefl = row.Field<bool>("invoicefl");
         entity.shipdt = row.Field<DateTime?>("shipdt");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.coreduedt = row.Field<DateTime?>("coreduedt");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.qtyalloc = row.IsNull("qtyalloc") ? decimal.Zero : row.Field<decimal>("qtyalloc");
         entity.oldalloc = row.IsNull("oldalloc") ? decimal.Zero : row.Field<decimal>("oldalloc");
         entity.modifyfl = row.Field<bool>("modifyfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.custtype = row.IsNull("custtype") ? string.Empty : row.Field<string>("custtype");
         entity.recno = row.IsNull("recno") ? 0 : row.Field<int>("recno");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCreateoeallocttresults(ref DataRow row, Createoeallocttresults entity)
      {
         row.SetField("invoicefl", entity.invoicefl);
         row.SetField("shipdt", entity.shipdt);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("coreduedt", entity.coreduedt);
         row.SetField("qty", entity.qty);
         row.SetField("qtyalloc", entity.qtyalloc);
         row.SetField("oldalloc", entity.oldalloc);
         row.SetField("modifyfl", entity.modifyfl);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("vendno", entity.vendno);
         row.SetField("custtype", entity.custtype);
         row.SetField("recno", entity.recno);
         row.SetField("stagecd", entity.stagecd);

      }
   
   }
}
#pragma warning restore 1591
