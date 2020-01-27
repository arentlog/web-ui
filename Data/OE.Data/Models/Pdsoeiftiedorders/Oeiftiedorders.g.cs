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

namespace Infor.Sxe.OE.Data.Models.Pdsoeiftiedorders
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeiftiedorders.Oeiftiedorders")]
   public partial class Oeiftiedorders : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public int stagecd { get; set; }
      public DateTime? reqshipdt { get; set; }
      public DateTime? promisedt { get; set; }
      public decimal totqtyord { get; set; }
      public decimal totqtyshp { get; set; }
      public int consolorderno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeiftiedorders BuildOeiftiedordersFromRow(DataRow row)
      {
         Oeiftiedorders entity = new Oeiftiedorders();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.totqtyord = row.IsNull("totqtyord") ? decimal.Zero : row.Field<decimal>("totqtyord");
         entity.totqtyshp = row.IsNull("totqtyshp") ? decimal.Zero : row.Field<decimal>("totqtyshp");
         entity.consolorderno = row.IsNull("consolorderno") ? 0 : row.Field<int>("consolorderno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeiftiedorders(ref DataRow row, Oeiftiedorders entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("totqtyord", entity.totqtyord);
         row.SetField("totqtyshp", entity.totqtyshp);
         row.SetField("consolorderno", entity.consolorderno);
         row.SetField("whse", entity.whse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
