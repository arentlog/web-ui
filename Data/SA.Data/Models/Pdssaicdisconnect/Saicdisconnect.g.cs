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

namespace Infor.Sxe.SA.Data.Models.Pdssaicdisconnect
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaicdisconnect.Saicdisconnect")]
   public partial class Saicdisconnect : ModelBase
   {
      [StringValidationAttribute]
      public string userName { get; set; }
      [StringValidationAttribute]
      public string cGuid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saicdisconnect BuildSaicdisconnectFromRow(DataRow row)
      {
         Saicdisconnect entity = new Saicdisconnect();
         entity.userName = row.IsNull("user-name") ? string.Empty : row.Field<string>("user-name");
         entity.cGuid = row.IsNull("cGuid") ? string.Empty : row.Field<string>("cGuid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaicdisconnect(ref DataRow row, Saicdisconnect entity)
      {
         row.SetField("user-name", entity.userName);
         row.SetField("cGuid", entity.cGuid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
