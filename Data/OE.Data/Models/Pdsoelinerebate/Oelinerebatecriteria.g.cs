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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinerebate
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinerebate.Oelinerebatecriteria")]
   public partial class Oelinerebatecriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int lineno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinerebatecriteria BuildOelinerebatecriteriaFromRow(DataRow row)
      {
         Oelinerebatecriteria entity = new Oelinerebatecriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinerebatecriteria(ref DataRow row, Oelinerebatecriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("vendno", entity.vendno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
