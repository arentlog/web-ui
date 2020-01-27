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

namespace Infor.Sxe.SA.Data.Models.Pdssastfsingle
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssastfsingle.Sastfsingle")]
   public partial class Sastfsingle : ModelBase
   {
      [StringValidationAttribute]
      public string billlevelcd { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string carrierid { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string srcrowpointer { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sastfsingle BuildSastfsingleFromRow(DataRow row)
      {
         Sastfsingle entity = new Sastfsingle();
         entity.billlevelcd = row.IsNull("billlevelcd") ? string.Empty : row.Field<string>("billlevelcd");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.carrierid = row.IsNull("carrierid") ? string.Empty : row.Field<string>("carrierid");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSastfsingle(ref DataRow row, Sastfsingle entity)
      {
         row.SetField("billlevelcd", entity.billlevelcd);
         row.SetField("whse", entity.whse);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("carrierid", entity.carrierid);
         row.SetField("name", entity.name);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591