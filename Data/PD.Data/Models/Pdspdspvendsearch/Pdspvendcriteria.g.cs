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

namespace Infor.Sxe.PD.Data.Models.Pdspdspvendsearch
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdspvendsearch.Pdspvendcriteria")]
   public partial class Pdspvendcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string clevelcd { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal vendno { get; set; }
      public DateTime? startdt { get; set; }
      public bool inactivefl { get; set; }
      public bool expactivefl { get; set; }
      public int iRecordlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdspvendcriteria BuildPdspvendcriteriaFromRow(DataRow row)
      {
         Pdspvendcriteria entity = new Pdspvendcriteria();
         entity.clevelcd = row.IsNull("clevelcd") ? string.Empty : row.Field<string>("clevelcd");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.inactivefl = row.Field<bool>("inactivefl");
         entity.expactivefl = row.Field<bool>("expactivefl");
         entity.iRecordlimit = row.IsNull("iRecordlimit") ? 0 : row.Field<int>("iRecordlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdspvendcriteria(ref DataRow row, Pdspvendcriteria entity)
      {
         row.SetField("clevelcd", entity.clevelcd);
         row.SetField("prod", entity.prod);
         row.SetField("vendno", entity.vendno);
         row.SetField("startdt", entity.startdt);
         row.SetField("inactivefl", entity.inactivefl);
         row.SetField("expactivefl", entity.expactivefl);
         row.SetField("iRecordlimit", entity.iRecordlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
