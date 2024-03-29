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

namespace Infor.Sxe.SA.Data.Models.Pdsioniobox
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdsioniobox.Ionioboxsummary")]
   public partial class Ionioboxsummary : ModelBase
   {
      public DateTime? lastcreatedatetime { get; set; }
      public int unprocessedcnt { get; set; }
      public int totalcnt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ionioboxsummary BuildIonioboxsummaryFromRow(DataRow row)
      {
         Ionioboxsummary entity = new Ionioboxsummary();
         entity.lastcreatedatetime = row.Field<DateTime?>("lastcreatedatetime");
         entity.unprocessedcnt = row.IsNull("unprocessedcnt") ? 0 : row.Field<int>("unprocessedcnt");
         entity.totalcnt = row.IsNull("totalcnt") ? 0 : row.Field<int>("totalcnt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIonioboxsummary(ref DataRow row, Ionioboxsummary entity)
      {
         row.SetField("lastcreatedatetime", entity.lastcreatedatetime);
         row.SetField("unprocessedcnt", entity.unprocessedcnt);
         row.SetField("totalcnt", entity.totalcnt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
