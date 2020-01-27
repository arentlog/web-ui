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

namespace Infor.Sxe.Shared.Data.Models.Pdswebsettingload
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdswebsettingload.Websettingload")]
   public partial class Websettingload : ModelBase
   {
      [StringValidationAttribute]
      public string profile { get; set; }
      [StringValidationAttribute]
      public string @operator { get; set; }
      [StringValidationAttribute]
      public string functionname { get; set; }
      [StringValidationAttribute]
      public string screenname { get; set; }
      [StringValidationAttribute]
      public string settingname { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Websettingload BuildWebsettingloadFromRow(DataRow row)
      {
         Websettingload entity = new Websettingload();
         entity.profile = row.IsNull("profile") ? string.Empty : row.Field<string>("profile");
         entity.@operator = row.IsNull("operator") ? string.Empty : row.Field<string>("operator");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.screenname = row.IsNull("screenname") ? string.Empty : row.Field<string>("screenname");
         entity.settingname = row.IsNull("settingname") ? string.Empty : row.Field<string>("settingname");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWebsettingload(ref DataRow row, Websettingload entity)
      {
         row.SetField("profile", entity.profile);
         row.SetField("operator", entity.@operator);
         row.SetField("functionname", entity.functionname);
         row.SetField("screenname", entity.screenname);
         row.SetField("settingname", entity.settingname);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
