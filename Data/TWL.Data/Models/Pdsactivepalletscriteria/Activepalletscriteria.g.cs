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

namespace Infor.Sxe.TWL.Data.Models.Pdsactivepalletscriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsactivepalletscriteria.Activepalletscriteria")]
   public partial class Activepalletscriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string activepalletuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Activepalletscriteria BuildActivepalletscriteriaFromRow(DataRow row)
      {
         Activepalletscriteria entity = new Activepalletscriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.activepalletuserfield = row.IsNull("activepalletuserfield") ? string.Empty : row.Field<string>("activepalletuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromActivepalletscriteria(ref DataRow row, Activepalletscriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("bin_num", entity.binNum);
         row.SetField("activepalletuserfield", entity.activepalletuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
