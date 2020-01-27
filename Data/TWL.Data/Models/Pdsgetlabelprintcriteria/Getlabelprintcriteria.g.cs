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

namespace Infor.Sxe.TWL.Data.Models.Pdsgetlabelprintcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgetlabelprintcriteria.Getlabelprintcriteria")]
   public partial class Getlabelprintcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public int aisle { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string prodGrp { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      public int containerType { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Getlabelprintcriteria BuildGetlabelprintcriteriaFromRow(DataRow row)
      {
         Getlabelprintcriteria entity = new Getlabelprintcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.aisle = row.IsNull("aisle") ? 0 : row.Field<int>("aisle");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.prodGrp = row.IsNull("prod_grp") ? string.Empty : row.Field<string>("prod_grp");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.containerType = row.IsNull("containerType") ? 0 : row.Field<int>("containerType");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetlabelprintcriteria(ref DataRow row, Getlabelprintcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("aisle", entity.aisle);
         row.SetField("bin_num", entity.binNum);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("prod_grp", entity.prodGrp);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("containerType", entity.containerType);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
