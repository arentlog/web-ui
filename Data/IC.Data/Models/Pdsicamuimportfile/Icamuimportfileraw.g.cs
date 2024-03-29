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

namespace Infor.Sxe.IC.Data.Models.Pdsicamuimportfile
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamuimportfile.Icamuimportfileraw")]
   public partial class Icamuimportfileraw : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public int loadrow { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamuimportfileraw BuildIcamuimportfilerawFromRow(DataRow row)
      {
         Icamuimportfileraw entity = new Icamuimportfileraw();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.loadrow = row.IsNull("loadrow") ? 0 : row.Field<int>("loadrow");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamuimportfileraw(ref DataRow row, Icamuimportfileraw entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("loadrow", entity.loadrow);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
