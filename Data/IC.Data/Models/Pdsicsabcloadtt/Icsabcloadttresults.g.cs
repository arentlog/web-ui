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

namespace Infor.Sxe.IC.Data.Models.Pdsicsabcloadtt
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsabcloadtt.Icsabcloadttresults")]
   public partial class Icsabcloadttresults : ModelBase
   {
      [StringValidationAttribute]
      public string icsabcrowid { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string stkoan { get; set; }
      public decimal relwtsales { get; set; }
      public decimal relwtgmroi { get; set; }
      public decimal relwthits { get; set; }
      public decimal relimpa { get; set; }
      public decimal relimpb { get; set; }
      public decimal relimpc { get; set; }
      public decimal relimpd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsabcloadttresults BuildIcsabcloadttresultsFromRow(DataRow row)
      {
         Icsabcloadttresults entity = new Icsabcloadttresults();
         entity.icsabcrowid = row.Field<byte[]>("icsabcrowid").ToStringEncoded();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.stkoan = row.IsNull("stkoan") ? string.Empty : row.Field<string>("stkoan");
         entity.relwtsales = row.IsNull("relwtsales") ? decimal.Zero : row.Field<decimal>("relwtsales");
         entity.relwtgmroi = row.IsNull("relwtgmroi") ? decimal.Zero : row.Field<decimal>("relwtgmroi");
         entity.relwthits = row.IsNull("relwthits") ? decimal.Zero : row.Field<decimal>("relwthits");
         entity.relimpa = row.IsNull("relimpa") ? decimal.Zero : row.Field<decimal>("relimpa");
         entity.relimpb = row.IsNull("relimpb") ? decimal.Zero : row.Field<decimal>("relimpb");
         entity.relimpc = row.IsNull("relimpc") ? decimal.Zero : row.Field<decimal>("relimpc");
         entity.relimpd = row.IsNull("relimpd") ? decimal.Zero : row.Field<decimal>("relimpd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsabcloadttresults(ref DataRow row, Icsabcloadttresults entity)
      {
         row.SetField("icsabcrowid", entity.icsabcrowid.ToByteArray());
         row.SetField("whse", entity.whse);
         row.SetField("stkoan", entity.stkoan);
         row.SetField("relwtsales", entity.relwtsales);
         row.SetField("relwtgmroi", entity.relwtgmroi);
         row.SetField("relwthits", entity.relwthits);
         row.SetField("relimpa", entity.relimpa);
         row.SetField("relimpb", entity.relimpb);
         row.SetField("relimpc", entity.relimpc);
         row.SetField("relimpd", entity.relimpd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591