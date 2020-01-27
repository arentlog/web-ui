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

namespace Infor.Sxe.TWL.Data.Models.Pdsphysinvcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsphysinvcriteria.Physinvcriteria")]
   public partial class Physinvcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string userId { get; set; }
      [StringValidationAttribute]
      public string physinvuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Physinvcriteria BuildPhysinvcriteriaFromRow(DataRow row)
      {
         Physinvcriteria entity = new Physinvcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.userId = row.IsNull("user_id") ? string.Empty : row.Field<string>("user_id");
         entity.physinvuserfield = row.IsNull("physinvuserfield") ? string.Empty : row.Field<string>("physinvuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPhysinvcriteria(ref DataRow row, Physinvcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("user_id", entity.userId);
         row.SetField("physinvuserfield", entity.physinvuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
