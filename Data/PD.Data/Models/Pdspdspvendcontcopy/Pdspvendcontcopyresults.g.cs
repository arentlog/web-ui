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

namespace Infor.Sxe.PD.Data.Models.Pdspdspvendcontcopy
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdspvendcontcopy.Pdspvendcontcopyresults")]
   public partial class Pdspvendcontcopyresults : ModelBase
   {
      public int levelcd { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public DateTime? startdt { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdspvendcontcopyresults BuildPdspvendcontcopyresultsFromRow(DataRow row)
      {
         Pdspvendcontcopyresults entity = new Pdspvendcontcopyresults();
         entity.levelcd = row.IsNull("levelcd") ? 0 : row.Field<int>("levelcd");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdspvendcontcopyresults(ref DataRow row, Pdspvendcontcopyresults entity)
      {
         row.SetField("levelcd", entity.levelcd);
         row.SetField("contractno", entity.contractno);
         row.SetField("prod", entity.prod);
         row.SetField("vendno", entity.vendno);
         row.SetField("unit", entity.unit);
         row.SetField("whse", entity.whse);
         row.SetField("startdt", entity.startdt);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
