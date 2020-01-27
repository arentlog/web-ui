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

namespace Infor.Sxe.PD.Data.Models.Pdspdsprebatecopy
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdsprebatecopy.Pdsprebatecopyresults")]
   public partial class Pdsprebatecopyresults : ModelBase
   {
      [StringValidationAttribute]
      public string codeid { get; set; }
      [StringValidationAttribute]
      public string levelkey { get; set; }
      public decimal vendno { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string rebtype { get; set; }
      [StringValidationAttribute]
      public string rebsubty { get; set; }
      [StringValidationAttribute]
      public string rebcustty { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? startdt { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsprebatecopyresults BuildPdsprebatecopyresultsFromRow(DataRow row)
      {
         Pdsprebatecopyresults entity = new Pdsprebatecopyresults();
         entity.codeid = row.IsNull("codeid") ? string.Empty : row.Field<string>("codeid");
         entity.levelkey = row.IsNull("levelkey") ? string.Empty : row.Field<string>("levelkey");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.rebtype = row.IsNull("rebtype") ? string.Empty : row.Field<string>("rebtype");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.rebcustty = row.IsNull("rebcustty") ? string.Empty : row.Field<string>("rebcustty");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsprebatecopyresults(ref DataRow row, Pdsprebatecopyresults entity)
      {
         row.SetField("codeid", entity.codeid);
         row.SetField("levelkey", entity.levelkey);
         row.SetField("vendno", entity.vendno);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("rebtype", entity.rebtype);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("rebcustty", entity.rebcustty);
         row.SetField("whse", entity.whse);
         row.SetField("startdt", entity.startdt);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
