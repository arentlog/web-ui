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

namespace Infor.Sxe.OT.Data.Models.Pdsotittrackbanner
{
   [ModelName("Infor.Sxe.OT.Data.Models.Pdsotittrackbanner.Otittrackbanner")]
   public partial class Otittrackbanner : ModelBase
   {
      public int trackno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Otittrackbanner BuildOtittrackbannerFromRow(DataRow row)
      {
         Otittrackbanner entity = new Otittrackbanner();
         entity.trackno = row.IsNull("trackno") ? 0 : row.Field<int>("trackno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOtittrackbanner(ref DataRow row, Otittrackbanner entity)
      {
         row.SetField("trackno", entity.trackno);
         row.SetField("vendno", entity.vendno);
         row.SetField("whse", entity.whse);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
