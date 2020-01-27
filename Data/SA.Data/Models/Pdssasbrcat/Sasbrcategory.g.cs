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

namespace Infor.Sxe.SA.Data.Models.Pdssasbrcat
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasbrcat.Sasbrcategory")]
   public partial class Sasbrcategory : ModelBase
   {
      [StringValidationAttribute]
      public string category { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasbrcategory BuildSasbrcategoryFromRow(DataRow row)
      {
         Sasbrcategory entity = new Sasbrcategory();
         entity.category = row.IsNull("category") ? string.Empty : row.Field<string>("category");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasbrcategory(ref DataRow row, Sasbrcategory entity)
      {
         row.SetField("category", entity.category);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591