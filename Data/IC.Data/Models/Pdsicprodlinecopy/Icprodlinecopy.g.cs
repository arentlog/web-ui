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

namespace Infor.Sxe.IC.Data.Models.Pdsicprodlinecopy
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicprodlinecopy.Icprodlinecopy")]
   public partial class Icprodlinecopy : ModelBase
   {
      public decimal fromvendno { get; set; }
      [StringValidationAttribute]
      public string fromwhse { get; set; }
      [StringValidationAttribute]
      public string fromprodline { get; set; }
      public decimal tovendno { get; set; }
      [StringValidationAttribute]
      public string towhse { get; set; }
      [StringValidationAttribute]
      public string toprodline { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icprodlinecopy BuildIcprodlinecopyFromRow(DataRow row)
      {
         Icprodlinecopy entity = new Icprodlinecopy();
         entity.fromvendno = row.IsNull("fromvendno") ? decimal.Zero : row.Field<decimal>("fromvendno");
         entity.fromwhse = row.IsNull("fromwhse") ? string.Empty : row.Field<string>("fromwhse");
         entity.fromprodline = row.IsNull("fromprodline") ? string.Empty : row.Field<string>("fromprodline");
         entity.tovendno = row.IsNull("tovendno") ? decimal.Zero : row.Field<decimal>("tovendno");
         entity.towhse = row.IsNull("towhse") ? string.Empty : row.Field<string>("towhse");
         entity.toprodline = row.IsNull("toprodline") ? string.Empty : row.Field<string>("toprodline");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcprodlinecopy(ref DataRow row, Icprodlinecopy entity)
      {
         row.SetField("fromvendno", entity.fromvendno);
         row.SetField("fromwhse", entity.fromwhse);
         row.SetField("fromprodline", entity.fromprodline);
         row.SetField("tovendno", entity.tovendno);
         row.SetField("towhse", entity.towhse);
         row.SetField("toprodline", entity.toprodline);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
