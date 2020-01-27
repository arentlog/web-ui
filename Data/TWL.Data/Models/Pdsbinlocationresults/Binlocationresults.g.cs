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

namespace Infor.Sxe.TWL.Data.Models.Pdsbinlocationresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsbinlocationresults.Binlocationresults")]
   public partial class Binlocationresults : ModelBase
   {
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      public bool primPick { get; set; }
      [StringValidationAttribute]
      public string primPickType { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string binmstrowid { get; set; }
      [StringValidationAttribute]
      public string binlocationresultsuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Binlocationresults BuildBinlocationresultsFromRow(DataRow row)
      {
         Binlocationresults entity = new Binlocationresults();
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.primPick = row.Field<bool>("prim_pick");
         entity.primPickType = row.IsNull("prim_pick_type") ? string.Empty : row.Field<string>("prim_pick_type");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.binmstrowid = row.Field<byte[]>("binmstrowid").ToStringEncoded();
         entity.binlocationresultsuserfield = row.IsNull("binlocationresultsuserfield") ? string.Empty : row.Field<string>("binlocationresultsuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBinlocationresults(ref DataRow row, Binlocationresults entity)
      {
         row.SetField("bin_num", entity.binNum);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("prim_pick", entity.primPick);
         row.SetField("prim_pick_type", entity.primPickType);
         row.SetField("abs_num", entity.absNum);
         row.SetField("binmstrowid", entity.binmstrowid.ToByteArray());
         row.SetField("binlocationresultsuserfield", entity.binlocationresultsuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
