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

namespace Infor.Sxe.TWL.Data.Models.Pdsemptransdetailcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsemptransdetailcriteria.Emptransdetailcriteria")]
   public partial class Emptransdetailcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      [StringValidationAttribute]
      public string rangeType { get; set; }
      [StringValidationAttribute]
      public string emptransdtlcrituserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Emptransdetailcriteria BuildEmptransdetailcriteriaFromRow(DataRow row)
      {
         Emptransdetailcriteria entity = new Emptransdetailcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.rangeType = row.IsNull("rangeType") ? string.Empty : row.Field<string>("rangeType");
         entity.emptransdtlcrituserfield = row.IsNull("emptransdtlcrituserfield") ? string.Empty : row.Field<string>("emptransdtlcrituserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEmptransdetailcriteria(ref DataRow row, Emptransdetailcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("emp_num", entity.empNum);
         row.SetField("rangeType", entity.rangeType);
         row.SetField("emptransdtlcrituserfield", entity.emptransdtlcrituserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
