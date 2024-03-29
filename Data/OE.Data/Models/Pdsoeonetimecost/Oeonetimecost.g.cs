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

namespace Infor.Sxe.OE.Data.Models.Pdsoeonetimecost
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeonetimecost.Oeonetimecost")]
   public partial class Oeonetimecost : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal prodcost { get; set; }
      [StringValidationAttribute]
      public string prccostper { get; set; }
      public decimal currebamt { get; set; }
      public decimal currebcst { get; set; }
      [StringValidationAttribute]
      public string venrebno { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string curcontract { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendname { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      public DateTime? contrstartdt { get; set; }
      public DateTime? contrenddt { get; set; }
      [StringValidationAttribute]
      public string vendquote { get; set; }
      public decimal contractcost { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeonetimecost BuildOeonetimecostFromRow(DataRow row)
      {
         Oeonetimecost entity = new Oeonetimecost();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.currebamt = row.IsNull("currebamt") ? decimal.Zero : row.Field<decimal>("currebamt");
         entity.currebcst = row.IsNull("currebcst") ? decimal.Zero : row.Field<decimal>("currebcst");
         entity.venrebno = row.IsNull("venrebno") ? string.Empty : row.Field<string>("venrebno");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.curcontract = row.IsNull("curcontract") ? string.Empty : row.Field<string>("curcontract");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendname = row.IsNull("vendname") ? string.Empty : row.Field<string>("vendname");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.contrstartdt = row.Field<DateTime?>("contrstartdt");
         entity.contrenddt = row.Field<DateTime?>("contrenddt");
         entity.vendquote = row.IsNull("vendquote") ? string.Empty : row.Field<string>("vendquote");
         entity.contractcost = row.IsNull("contractcost") ? decimal.Zero : row.Field<decimal>("contractcost");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeonetimecost(ref DataRow row, Oeonetimecost entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("prod", entity.prod);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("currebamt", entity.currebamt);
         row.SetField("currebcst", entity.currebcst);
         row.SetField("venrebno", entity.venrebno);
         row.SetField("unit", entity.unit);
         row.SetField("curcontract", entity.curcontract);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendname", entity.vendname);
         row.SetField("contractno", entity.contractno);
         row.SetField("contrstartdt", entity.contrstartdt);
         row.SetField("contrenddt", entity.contrenddt);
         row.SetField("vendquote", entity.vendquote);
         row.SetField("contractcost", entity.contractcost);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
