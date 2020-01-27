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

namespace Infor.Sxe.IC.Data.Models.Pdsicamrloadusagerateanalysistt
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamrloadusagerateanalysistt.Icamrcriteria")]
   public partial class Icamrcriteria : ModelBase
   {
      public int reportno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public int secure { get; set; }
      [StringValidationAttribute]
      public string monthsbackward { get; set; }
      [StringValidationAttribute]
      public string monthstrend { get; set; }
      [StringValidationAttribute]
      public string monthsforward { get; set; }
      [StringValidationAttribute]
      public string monthsmonthroll { get; set; }
      [StringValidationAttribute]
      public string exponsmooth { get; set; }
      [StringValidationAttribute]
      public string rowidIcamapm { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamrcriteria BuildIcamrcriteriaFromRow(DataRow row)
      {
         Icamrcriteria entity = new Icamrcriteria();
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.monthsbackward = row.IsNull("monthsbackward") ? string.Empty : row.Field<string>("monthsbackward");
         entity.monthstrend = row.IsNull("monthstrend") ? string.Empty : row.Field<string>("monthstrend");
         entity.monthsforward = row.IsNull("monthsforward") ? string.Empty : row.Field<string>("monthsforward");
         entity.monthsmonthroll = row.IsNull("monthsmonthroll") ? string.Empty : row.Field<string>("monthsmonthroll");
         entity.exponsmooth = row.IsNull("exponsmooth") ? string.Empty : row.Field<string>("exponsmooth");
         entity.rowidIcamapm = row.Field<byte[]>("rowid-icamapm").ToStringEncoded();
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamrcriteria(ref DataRow row, Icamrcriteria entity)
      {
         row.SetField("reportno", entity.reportno);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("unit", entity.unit);
         row.SetField("secure", entity.secure);
         row.SetField("monthsbackward", entity.monthsbackward);
         row.SetField("monthstrend", entity.monthstrend);
         row.SetField("monthsforward", entity.monthsforward);
         row.SetField("monthsmonthroll", entity.monthsmonthroll);
         row.SetField("exponsmooth", entity.exponsmooth);
         row.SetField("rowid-icamapm", entity.rowidIcamapm.ToByteArray());
         row.SetField("customparam", entity.customparam);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
