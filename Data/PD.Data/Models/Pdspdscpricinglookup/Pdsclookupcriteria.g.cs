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

namespace Infor.Sxe.PD.Data.Models.Pdspdscpricinglookup
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdscpricinglookup.Pdsclookupcriteria")]
   public partial class Pdsclookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string levelcd { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string prodpricety { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string rebtype { get; set; }
      [StringValidationAttribute]
      public string custpricety { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsclookupcriteria BuildPdsclookupcriteriaFromRow(DataRow row)
      {
         Pdsclookupcriteria entity = new Pdsclookupcriteria();
         entity.levelcd = row.IsNull("levelcd") ? string.Empty : row.Field<string>("levelcd");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.prodpricety = row.IsNull("prodpricety") ? string.Empty : row.Field<string>("prodpricety");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.rebtype = row.IsNull("rebtype") ? string.Empty : row.Field<string>("rebtype");
         entity.custpricety = row.IsNull("custpricety") ? string.Empty : row.Field<string>("custpricety");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsclookupcriteria(ref DataRow row, Pdsclookupcriteria entity)
      {
         row.SetField("levelcd", entity.levelcd);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("unit", entity.unit);
         row.SetField("prodpricety", entity.prodpricety);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("rebtype", entity.rebtype);
         row.SetField("custpricety", entity.custpricety);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
