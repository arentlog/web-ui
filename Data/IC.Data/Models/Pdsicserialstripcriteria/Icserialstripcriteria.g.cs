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

namespace Infor.Sxe.IC.Data.Models.Pdsicserialstripcriteria
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicserialstripcriteria.Icserialstripcriteria")]
   public partial class Icserialstripcriteria : ModelBase
   {
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string product { get; set; }
      [StringValidationAttribute]
      public string serialno { get; set; }
      [StringValidationAttribute]
      public string serialstripcriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icserialstripcriteria BuildIcserialstripcriteriaFromRow(DataRow row)
      {
         Icserialstripcriteria entity = new Icserialstripcriteria();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.product = row.IsNull("product") ? string.Empty : row.Field<string>("product");
         entity.serialno = row.IsNull("serialno") ? string.Empty : row.Field<string>("serialno");
         entity.serialstripcriteriauserfield = row.IsNull("serialstripcriteriauserfield") ? string.Empty : row.Field<string>("serialstripcriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcserialstripcriteria(ref DataRow row, Icserialstripcriteria entity)
      {
         row.SetField("vendno", entity.vendno);
         row.SetField("whse", entity.whse);
         row.SetField("product", entity.product);
         row.SetField("serialno", entity.serialno);
         row.SetField("serialstripcriteriauserfield", entity.serialstripcriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591