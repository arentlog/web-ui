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

namespace Infor.Sxe.IC.Data.Models.Pdsicwhseavail
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicwhseavail.Icwhseavailcriteria")]
   public partial class Icwhseavailcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      public bool surplusonlyfl { get; set; }
      [StringValidationAttribute]
      public string zone { get; set; }
      public decimal consigncustno { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string region { get; set; }
      [StringValidationAttribute]
      public string whsetype { get; set; }
      [StringValidationAttribute]
      public string whsegroup { get; set; }
      [StringValidationAttribute]
      public string orderwhse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icwhseavailcriteria BuildIcwhseavailcriteriaFromRow(DataRow row)
      {
         Icwhseavailcriteria entity = new Icwhseavailcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.surplusonlyfl = row.Field<bool>("surplusonlyfl");
         entity.zone = row.IsNull("zone") ? string.Empty : row.Field<string>("zone");
         entity.consigncustno = row.IsNull("consigncustno") ? decimal.Zero : row.Field<decimal>("consigncustno");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.region = row.IsNull("region") ? string.Empty : row.Field<string>("region");
         entity.whsetype = row.IsNull("whsetype") ? string.Empty : row.Field<string>("whsetype");
         entity.whsegroup = row.IsNull("whsegroup") ? string.Empty : row.Field<string>("whsegroup");
         entity.orderwhse = row.IsNull("orderwhse") ? string.Empty : row.Field<string>("orderwhse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcwhseavailcriteria(ref DataRow row, Icwhseavailcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("unit", entity.unit);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("surplusonlyfl", entity.surplusonlyfl);
         row.SetField("zone", entity.zone);
         row.SetField("consigncustno", entity.consigncustno);
         row.SetField("cono", entity.cono);
         row.SetField("region", entity.region);
         row.SetField("whsetype", entity.whsetype);
         row.SetField("whsegroup", entity.whsegroup);
         row.SetField("orderwhse", entity.orderwhse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591