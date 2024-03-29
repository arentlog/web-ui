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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinenonstockhdr
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinenonstockhdr.Oelinenonstockhdr")]
   public partial class Oelinenonstockhdr : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public int lineno { get; set; }
      public int nextlineno { get; set; }
      [StringValidationAttribute]
      public string ourproc { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string maintmode { get; set; }
      [StringValidationAttribute]
      public string orderdisp { get; set; }
      public bool stordty { get; set; }
      public bool bofl { get; set; }
      [StringValidationAttribute]
      public string slsrepout { get; set; }
      [StringValidationAttribute]
      public string altprodgrp { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinenonstockhdr BuildOelinenonstockhdrFromRow(DataRow row)
      {
         Oelinenonstockhdr entity = new Oelinenonstockhdr();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.nextlineno = row.IsNull("nextlineno") ? 0 : row.Field<int>("nextlineno");
         entity.ourproc = row.IsNull("ourproc") ? string.Empty : row.Field<string>("ourproc");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.maintmode = row.IsNull("maintmode") ? string.Empty : row.Field<string>("maintmode");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.stordty = row.Field<bool>("stordty");
         entity.bofl = row.Field<bool>("bofl");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.altprodgrp = row.IsNull("altprodgrp") ? string.Empty : row.Field<string>("altprodgrp");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinenonstockhdr(ref DataRow row, Oelinenonstockhdr entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("lineno", entity.lineno);
         row.SetField("nextlineno", entity.nextlineno);
         row.SetField("ourproc", entity.ourproc);
         row.SetField("whse", entity.whse);
         row.SetField("transtype", entity.transtype);
         row.SetField("maintmode", entity.maintmode);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("stordty", entity.stordty);
         row.SetField("bofl", entity.bofl);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("altprodgrp", entity.altprodgrp);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
