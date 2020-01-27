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

namespace Infor.Sxe.OE.Data.Models.Pdsoeesdetailclosecriteria
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeesdetailclosecriteria.Oeesdetailclosecriteria")]
   public partial class Oeesdetailclosecriteria : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      public int jrnlno { get; set; }
      public decimal totalship { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeesdetailclosecriteria BuildOeesdetailclosecriteriaFromRow(DataRow row)
      {
         Oeesdetailclosecriteria entity = new Oeesdetailclosecriteria();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.totalship = row.IsNull("totalship") ? decimal.Zero : row.Field<decimal>("totalship");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeesdetailclosecriteria(ref DataRow row, Oeesdetailclosecriteria entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("totalship", entity.totalship);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
