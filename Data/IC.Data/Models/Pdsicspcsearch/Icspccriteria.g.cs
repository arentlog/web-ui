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

namespace Infor.Sxe.IC.Data.Models.Pdsicspcsearch
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicspcsearch.Icspccriteria")]
   public partial class Icspccriteria : ModelBase
   {
      [StringValidationAttribute]
      public string setuptype { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shiptogrp { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? begstartdt { get; set; }
      public DateTime? endstartdt { get; set; }
      public DateTime? begexpiredt { get; set; }
      public DateTime? endexpiredt { get; set; }
      [StringValidationAttribute]
      public string statuscd { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      [StringValidationAttribute]
      public string product { get; set; }
      [StringValidationAttribute]
      public string pullqtycd { get; set; }
      public int recordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icspccriteria BuildIcspccriteriaFromRow(DataRow row)
      {
         Icspccriteria entity = new Icspccriteria();
         entity.setuptype = row.IsNull("setuptype") ? string.Empty : row.Field<string>("setuptype");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptogrp = row.IsNull("shiptogrp") ? string.Empty : row.Field<string>("shiptogrp");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.begstartdt = row.Field<DateTime?>("begstartdt");
         entity.endstartdt = row.Field<DateTime?>("endstartdt");
         entity.begexpiredt = row.Field<DateTime?>("begexpiredt");
         entity.endexpiredt = row.Field<DateTime?>("endexpiredt");
         entity.statuscd = row.IsNull("statuscd") ? string.Empty : row.Field<string>("statuscd");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.product = row.IsNull("product") ? string.Empty : row.Field<string>("product");
         entity.pullqtycd = row.IsNull("pullqtycd") ? string.Empty : row.Field<string>("pullqtycd");
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcspccriteria(ref DataRow row, Icspccriteria entity)
      {
         row.SetField("setuptype", entity.setuptype);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptogrp", entity.shiptogrp);
         row.SetField("whse", entity.whse);
         row.SetField("begstartdt", entity.begstartdt);
         row.SetField("endstartdt", entity.endstartdt);
         row.SetField("begexpiredt", entity.begexpiredt);
         row.SetField("endexpiredt", entity.endexpiredt);
         row.SetField("statuscd", entity.statuscd);
         row.SetField("refer", entity.refer);
         row.SetField("contractno", entity.contractno);
         row.SetField("product", entity.product);
         row.SetField("pullqtycd", entity.pullqtycd);
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591