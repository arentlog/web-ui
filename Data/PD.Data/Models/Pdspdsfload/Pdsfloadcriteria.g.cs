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

namespace Infor.Sxe.PD.Data.Models.Pdspdsfload
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdsfload.Pdsfloadcriteria")]
   public partial class Pdsfloadcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string action { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsfloadcriteria BuildPdsfloadcriteriaFromRow(DataRow row)
      {
         Pdsfloadcriteria entity = new Pdsfloadcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.action = row.IsNull("action") ? string.Empty : row.Field<string>("action");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsfloadcriteria(ref DataRow row, Pdsfloadcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("action", entity.action);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
