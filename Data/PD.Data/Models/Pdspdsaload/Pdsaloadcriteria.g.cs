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

namespace Infor.Sxe.PD.Data.Models.Pdspdsaload
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdsaload.Pdsaloadcriteria")]
   public partial class Pdsaloadcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string autotype { get; set; }
      [StringValidationAttribute]
      public string action { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsaloadcriteria BuildPdsaloadcriteriaFromRow(DataRow row)
      {
         Pdsaloadcriteria entity = new Pdsaloadcriteria();
         entity.autotype = row.IsNull("autotype") ? string.Empty : row.Field<string>("autotype");
         entity.action = row.IsNull("action") ? string.Empty : row.Field<string>("action");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsaloadcriteria(ref DataRow row, Pdsaloadcriteria entity)
      {
         row.SetField("autotype", entity.autotype);
         row.SetField("action", entity.action);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
