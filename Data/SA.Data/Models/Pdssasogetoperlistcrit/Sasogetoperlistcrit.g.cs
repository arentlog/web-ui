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

namespace Infor.Sxe.SA.Data.Models.Pdssasogetoperlistcrit
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasogetoperlistcrit.Sasogetoperlistcrit")]
   public partial class Sasogetoperlistcrit : ModelBase
   {
      [StringValidationAttribute]
      public string operinit { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string profile { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasogetoperlistcrit BuildSasogetoperlistcritFromRow(DataRow row)
      {
         Sasogetoperlistcrit entity = new Sasogetoperlistcrit();
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.profile = row.IsNull("profile") ? string.Empty : row.Field<string>("profile");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasogetoperlistcrit(ref DataRow row, Sasogetoperlistcrit entity)
      {
         row.SetField("operinit", entity.operinit);
         row.SetField("whse", entity.whse);
         row.SetField("profile", entity.profile);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
