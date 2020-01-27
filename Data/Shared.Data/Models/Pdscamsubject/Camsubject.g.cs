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

namespace Infor.Sxe.Shared.Data.Models.Pdscamsubject
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscamsubject.Camsubject")]
   public partial class Camsubject : ModelBase
   {
      [StringValidationAttribute]
      public string subjectroletype { get; set; }
      [StringValidationAttribute]
      public string subjectprimarykey { get; set; }
      [StringValidationAttribute]
      public string subjectsecondarykey { get; set; }
      public bool showall { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Camsubject BuildCamsubjectFromRow(DataRow row)
      {
         Camsubject entity = new Camsubject();
         entity.subjectroletype = row.IsNull("subjectroletype") ? string.Empty : row.Field<string>("subjectroletype");
         entity.subjectprimarykey = row.IsNull("subjectprimarykey") ? string.Empty : row.Field<string>("subjectprimarykey");
         entity.subjectsecondarykey = row.IsNull("subjectsecondarykey") ? string.Empty : row.Field<string>("subjectsecondarykey");
         entity.showall = row.Field<bool>("showall");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCamsubject(ref DataRow row, Camsubject entity)
      {
         row.SetField("subjectroletype", entity.subjectroletype);
         row.SetField("subjectprimarykey", entity.subjectprimarykey);
         row.SetField("subjectsecondarykey", entity.subjectsecondarykey);
         row.SetField("showall", entity.showall);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
