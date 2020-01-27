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

namespace Infor.Sxe.TWL.Data.Models.Pdsreplpendingcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsreplpendingcriteria.Replpendingcriteria")]
   public partial class Replpendingcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public int aisle { get; set; }
      [StringValidationAttribute]
      public string fromZone { get; set; }
      [StringValidationAttribute]
      public string toZone { get; set; }
      public bool showTopOffs { get; set; }
      public bool showConsolidations { get; set; }
      public bool showOther { get; set; }
      [StringValidationAttribute]
      public string replpendinguserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Replpendingcriteria BuildReplpendingcriteriaFromRow(DataRow row)
      {
         Replpendingcriteria entity = new Replpendingcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.aisle = row.IsNull("aisle") ? 0 : row.Field<int>("aisle");
         entity.fromZone = row.IsNull("from_zone") ? string.Empty : row.Field<string>("from_zone");
         entity.toZone = row.IsNull("to_zone") ? string.Empty : row.Field<string>("to_zone");
         entity.showTopOffs = row.Field<bool>("showTopOffs");
         entity.showConsolidations = row.Field<bool>("showConsolidations");
         entity.showOther = row.Field<bool>("showOther");
         entity.replpendinguserfield = row.IsNull("replpendinguserfield") ? string.Empty : row.Field<string>("replpendinguserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReplpendingcriteria(ref DataRow row, Replpendingcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("aisle", entity.aisle);
         row.SetField("from_zone", entity.fromZone);
         row.SetField("to_zone", entity.toZone);
         row.SetField("showTopOffs", entity.showTopOffs);
         row.SetField("showConsolidations", entity.showConsolidations);
         row.SetField("showOther", entity.showOther);
         row.SetField("replpendinguserfield", entity.replpendinguserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591