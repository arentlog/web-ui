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

namespace Infor.Sxe.AP.Data.Models.Pdsapvendorcopy
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapvendorcopy.Apvendorcopy")]
   public partial class Apvendorcopy : ModelBase
   {
      public decimal fromvendno { get; set; }
      public decimal tovendno { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apvendorcopy BuildApvendorcopyFromRow(DataRow row)
      {
         Apvendorcopy entity = new Apvendorcopy();
         entity.fromvendno = row.IsNull("fromvendno") ? decimal.Zero : row.Field<decimal>("fromvendno");
         entity.tovendno = row.IsNull("tovendno") ? decimal.Zero : row.Field<decimal>("tovendno");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApvendorcopy(ref DataRow row, Apvendorcopy entity)
      {
         row.SetField("fromvendno", entity.fromvendno);
         row.SetField("tovendno", entity.tovendno);
         row.SetField("name", entity.name);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
