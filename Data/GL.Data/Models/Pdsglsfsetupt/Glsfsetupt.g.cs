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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetupt
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetupt.Glsfsetupt")]
   public partial class Glsfsetupt : ModelBase
   {
      public int totalLevel { get; set; }
      public bool clearFl { get; set; }
      public int advanceTo { get; set; }
      public int skipLines { get; set; }
      [StringValidationAttribute]
      public string memoryLoc { get; set; }
      [StringValidationAttribute]
      public string printType { get; set; }
      [StringValidationAttribute]
      public string zeroType { get; set; }
      public bool dollarFl { get; set; }
      [StringValidationAttribute]
      public string underlineType { get; set; }
      [StringValidationAttribute]
      public string titleText { get; set; }
      [StringValidationAttribute]
      public string lookupName { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetupt BuildGlsfsetuptFromRow(DataRow row)
      {
         Glsfsetupt entity = new Glsfsetupt();
         entity.totalLevel = row.IsNull("totalLevel") ? 0 : row.Field<int>("totalLevel");
         entity.clearFl = row.Field<bool>("clearFl");
         entity.advanceTo = row.IsNull("advanceTo") ? 0 : row.Field<int>("advanceTo");
         entity.skipLines = row.IsNull("skipLines") ? 0 : row.Field<int>("skipLines");
         entity.memoryLoc = row.IsNull("memoryLoc") ? string.Empty : row.Field<string>("memoryLoc");
         entity.printType = row.IsNull("printType") ? string.Empty : row.Field<string>("printType");
         entity.zeroType = row.IsNull("zeroType") ? string.Empty : row.Field<string>("zeroType");
         entity.dollarFl = row.Field<bool>("dollarFl");
         entity.underlineType = row.IsNull("underlineType") ? string.Empty : row.Field<string>("underlineType");
         entity.titleText = row.IsNull("titleText") ? string.Empty : row.Field<string>("titleText");
         entity.lookupName = row.IsNull("lookupName") ? string.Empty : row.Field<string>("lookupName");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetupt(ref DataRow row, Glsfsetupt entity)
      {
         row.SetField("totalLevel", entity.totalLevel);
         row.SetField("clearFl", entity.clearFl);
         row.SetField("advanceTo", entity.advanceTo);
         row.SetField("skipLines", entity.skipLines);
         row.SetField("memoryLoc", entity.memoryLoc);
         row.SetField("printType", entity.printType);
         row.SetField("zeroType", entity.zeroType);
         row.SetField("dollarFl", entity.dollarFl);
         row.SetField("underlineType", entity.underlineType);
         row.SetField("titleText", entity.titleText);
         row.SetField("lookupName", entity.lookupName);
         row.SetField("comment", entity.comment);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591