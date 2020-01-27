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

namespace Infor.Sxe.IC.Data.Models.Pdsicentryserialssaveresponses
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicentryserialssaveresponses.Icentryserialssaveresponses")]
   public partial class Icentryserialssaveresponses : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool increaseqtyship { get; set; }
      public bool decreaseqtyship { get; set; }
      public bool increaseqtyrcv { get; set; }
      public bool increaseqtyrtn { get; set; }
      public bool decreaseqtyrcv { get; set; }
      public bool decreaseqtyrtn { get; set; }
      [StringValidationAttribute]
      public string extrasi { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icentryserialssaveresponses BuildIcentryserialssaveresponsesFromRow(DataRow row)
      {
         Icentryserialssaveresponses entity = new Icentryserialssaveresponses();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.increaseqtyship = row.Field<bool>("increaseqtyship");
         entity.decreaseqtyship = row.Field<bool>("decreaseqtyship");
         entity.increaseqtyrcv = row.Field<bool>("increaseqtyrcv");
         entity.increaseqtyrtn = row.Field<bool>("increaseqtyrtn");
         entity.decreaseqtyrcv = row.Field<bool>("decreaseqtyrcv");
         entity.decreaseqtyrtn = row.Field<bool>("decreaseqtyrtn");
         entity.extrasi = row.IsNull("extrasi") ? string.Empty : row.Field<string>("extrasi");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcentryserialssaveresponses(ref DataRow row, Icentryserialssaveresponses entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("increaseqtyship", entity.increaseqtyship);
         row.SetField("decreaseqtyship", entity.decreaseqtyship);
         row.SetField("increaseqtyrcv", entity.increaseqtyrcv);
         row.SetField("increaseqtyrtn", entity.increaseqtyrtn);
         row.SetField("decreaseqtyrcv", entity.decreaseqtyrcv);
         row.SetField("decreaseqtyrtn", entity.decreaseqtyrtn);
         row.SetField("extrasi", entity.extrasi);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
