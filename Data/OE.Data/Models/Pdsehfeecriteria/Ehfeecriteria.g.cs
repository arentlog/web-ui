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

namespace Infor.Sxe.OE.Data.Models.Pdsehfeecriteria
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsehfeecriteria.Ehfeecriteria")]
   public partial class Ehfeecriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public DateTime? effectivedt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ehfeecriteria BuildEhfeecriteriaFromRow(DataRow row)
      {
         Ehfeecriteria entity = new Ehfeecriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.effectivedt = row.Field<DateTime?>("effectivedt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEhfeecriteria(ref DataRow row, Ehfeecriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("state", entity.state);
         row.SetField("prod", entity.prod);
         row.SetField("effectivedt", entity.effectivedt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
