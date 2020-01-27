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

namespace Infor.Sxe.TWL.Data.Models.Pdssystemparamdefnlistcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdssystemparamdefnlistcriteria.Systemparamdefnlistcriteria")]
   public partial class Systemparamdefnlistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      public int parameterId { get; set; }
      [StringValidationAttribute]
      public string parameterName { get; set; }
      public int typeId { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Systemparamdefnlistcriteria BuildSystemparamdefnlistcriteriaFromRow(DataRow row)
      {
         Systemparamdefnlistcriteria entity = new Systemparamdefnlistcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.parameterId = row.IsNull("parameter_id") ? 0 : row.Field<int>("parameter_id");
         entity.parameterName = row.IsNull("parameter_name") ? string.Empty : row.Field<string>("parameter_name");
         entity.typeId = row.IsNull("type_id") ? 0 : row.Field<int>("type_id");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSystemparamdefnlistcriteria(ref DataRow row, Systemparamdefnlistcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("parameter_id", entity.parameterId);
         row.SetField("parameter_name", entity.parameterName);
         row.SetField("type_id", entity.typeId);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591