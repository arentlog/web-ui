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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetuph
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetuph.Glsfsetuph")]
   public partial class Glsfsetuph : ModelBase
   {
      public int headType { get; set; }
      [StringValidationAttribute]
      public string underlineType { get; set; }
      [StringValidationAttribute]
      public string line1 { get; set; }
      [StringValidationAttribute]
      public string line2 { get; set; }
      public bool dateAtFl { get; set; }
      public int dateAtPos { get; set; }
      public bool timeAtFl { get; set; }
      public int timeAtPos { get; set; }
      public bool pageAtFl { get; set; }
      public int pageAtPos { get; set; }
      public bool printFl { get; set; }
      public bool centerFl { get; set; }
      [StringValidationAttribute]
      public string position { get; set; }
      public int headerNo { get; set; }
      public int footerNo { get; set; }
      public int advanceTo { get; set; }
      public int skipLines { get; set; }
      public int startAtCol { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetuph BuildGlsfsetuphFromRow(DataRow row)
      {
         Glsfsetuph entity = new Glsfsetuph();
         entity.headType = row.IsNull("headType") ? 0 : row.Field<int>("headType");
         entity.underlineType = row.IsNull("underlineType") ? string.Empty : row.Field<string>("underlineType");
         entity.line1 = row.IsNull("line1") ? string.Empty : row.Field<string>("line1");
         entity.line2 = row.IsNull("line2") ? string.Empty : row.Field<string>("line2");
         entity.dateAtFl = row.Field<bool>("dateAtFl");
         entity.dateAtPos = row.IsNull("dateAtPos") ? 0 : row.Field<int>("dateAtPos");
         entity.timeAtFl = row.Field<bool>("timeAtFl");
         entity.timeAtPos = row.IsNull("timeAtPos") ? 0 : row.Field<int>("timeAtPos");
         entity.pageAtFl = row.Field<bool>("pageAtFl");
         entity.pageAtPos = row.IsNull("pageAtPos") ? 0 : row.Field<int>("pageAtPos");
         entity.printFl = row.Field<bool>("printFl");
         entity.centerFl = row.Field<bool>("centerFl");
         entity.position = row.IsNull("position") ? string.Empty : row.Field<string>("position");
         entity.headerNo = row.IsNull("headerNo") ? 0 : row.Field<int>("headerNo");
         entity.footerNo = row.IsNull("footerNo") ? 0 : row.Field<int>("footerNo");
         entity.advanceTo = row.IsNull("advanceTo") ? 0 : row.Field<int>("advanceTo");
         entity.skipLines = row.IsNull("skipLines") ? 0 : row.Field<int>("skipLines");
         entity.startAtCol = row.IsNull("startAtCol") ? 0 : row.Field<int>("startAtCol");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetuph(ref DataRow row, Glsfsetuph entity)
      {
         row.SetField("headType", entity.headType);
         row.SetField("underlineType", entity.underlineType);
         row.SetField("line1", entity.line1);
         row.SetField("line2", entity.line2);
         row.SetField("dateAtFl", entity.dateAtFl);
         row.SetField("dateAtPos", entity.dateAtPos);
         row.SetField("timeAtFl", entity.timeAtFl);
         row.SetField("timeAtPos", entity.timeAtPos);
         row.SetField("pageAtFl", entity.pageAtFl);
         row.SetField("pageAtPos", entity.pageAtPos);
         row.SetField("printFl", entity.printFl);
         row.SetField("centerFl", entity.centerFl);
         row.SetField("position", entity.position);
         row.SetField("headerNo", entity.headerNo);
         row.SetField("footerNo", entity.footerNo);
         row.SetField("advanceTo", entity.advanceTo);
         row.SetField("skipLines", entity.skipLines);
         row.SetField("startAtCol", entity.startAtCol);
         row.SetField("comment", entity.comment);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
