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

namespace Infor.Sxe.GL.Data.Models.Pdsgliahistbal
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsgliahistbal.Gliahistbalcriteria")]
   public partial class Gliahistbalcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string glno { get; set; }
      public int glyear { get; set; }
      [StringValidationAttribute]
      public string fncd { get; set; }
      [StringValidationAttribute]
      public string jobcd { get; set; }
      public DateTime? stdt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Gliahistbalcriteria BuildGliahistbalcriteriaFromRow(DataRow row)
      {
         Gliahistbalcriteria entity = new Gliahistbalcriteria();
         entity.glno = row.IsNull("glno") ? string.Empty : row.Field<string>("glno");
         entity.glyear = row.IsNull("glyear") ? 0 : row.Field<int>("glyear");
         entity.fncd = row.IsNull("fncd") ? string.Empty : row.Field<string>("fncd");
         entity.jobcd = row.IsNull("jobcd") ? string.Empty : row.Field<string>("jobcd");
         entity.stdt = row.Field<DateTime?>("stdt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGliahistbalcriteria(ref DataRow row, Gliahistbalcriteria entity)
      {
         row.SetField("glno", entity.glno);
         row.SetField("glyear", entity.glyear);
         row.SetField("fncd", entity.fncd);
         row.SetField("jobcd", entity.jobcd);
         row.SetField("stdt", entity.stdt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591