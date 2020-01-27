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

namespace Infor.Sxe.IC.Data.Models.Pdsicamuinvvalchg
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamuinvvalchg.Icamuinvvalchgresults")]
   public partial class Icamuinvvalchgresults : ModelBase
   {
      [StringValidationAttribute]
      public string rectype { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string dettype { get; set; }
      [StringValidationAttribute]
      public string whserank { get; set; }
      [StringValidationAttribute]
      public string disptext { get; set; }
      public decimal asqamt { get; set; }
      public decimal fivehiamt { get; set; }
      public decimal thresholdamt { get; set; }
      public decimal totalamt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamuinvvalchgresults BuildIcamuinvvalchgresultsFromRow(DataRow row)
      {
         Icamuinvvalchgresults entity = new Icamuinvvalchgresults();
         entity.rectype = row.IsNull("rectype") ? string.Empty : row.Field<string>("rectype");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.dettype = row.IsNull("dettype") ? string.Empty : row.Field<string>("dettype");
         entity.whserank = row.IsNull("whserank") ? string.Empty : row.Field<string>("whserank");
         entity.disptext = row.IsNull("disptext") ? string.Empty : row.Field<string>("disptext");
         entity.asqamt = row.IsNull("asqamt") ? decimal.Zero : row.Field<decimal>("asqamt");
         entity.fivehiamt = row.IsNull("fivehiamt") ? decimal.Zero : row.Field<decimal>("fivehiamt");
         entity.thresholdamt = row.IsNull("thresholdamt") ? decimal.Zero : row.Field<decimal>("thresholdamt");
         entity.totalamt = row.IsNull("totalamt") ? decimal.Zero : row.Field<decimal>("totalamt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamuinvvalchgresults(ref DataRow row, Icamuinvvalchgresults entity)
      {
         row.SetField("rectype", entity.rectype);
         row.SetField("whse", entity.whse);
         row.SetField("dettype", entity.dettype);
         row.SetField("whserank", entity.whserank);
         row.SetField("disptext", entity.disptext);
         row.SetField("asqamt", entity.asqamt);
         row.SetField("fivehiamt", entity.fivehiamt);
         row.SetField("thresholdamt", entity.thresholdamt);
         row.SetField("totalamt", entity.totalamt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
