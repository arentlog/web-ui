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

namespace Infor.Sxe.SA.Data.Models.Pdssaiclist
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaiclist.Saiclistcriteria")]
   public partial class Saiclistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string connectionType { get; set; }
      public int cono { get; set; }
      [StringValidationAttribute]
      public string @operator { get; set; }
      [StringValidationAttribute]
      public string device { get; set; }
      [StringValidationAttribute]
      public string usergroup { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saiclistcriteria BuildSaiclistcriteriaFromRow(DataRow row)
      {
         Saiclistcriteria entity = new Saiclistcriteria();
         entity.connectionType = row.IsNull("connectionType") ? string.Empty : row.Field<string>("connectionType");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.@operator = row.IsNull("operator") ? string.Empty : row.Field<string>("operator");
         entity.device = row.IsNull("device") ? string.Empty : row.Field<string>("device");
         entity.usergroup = row.IsNull("usergroup") ? string.Empty : row.Field<string>("usergroup");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaiclistcriteria(ref DataRow row, Saiclistcriteria entity)
      {
         row.SetField("connectionType", entity.connectionType);
         row.SetField("cono", entity.cono);
         row.SetField("operator", entity.@operator);
         row.SetField("device", entity.device);
         row.SetField("usergroup", entity.usergroup);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591