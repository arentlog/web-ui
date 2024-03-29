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

namespace Infor.Sxe.IC.Data.Models.Pdsicrunnumberlookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicrunnumberlookup.Icrunnumberlookupresults")]
   public partial class Icrunnumberlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      public int runno { get; set; }
      public DateTime? createdt { get; set; }
      [StringValidationAttribute]
      public string icsepRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icrunnumberlookupresults BuildIcrunnumberlookupresultsFromRow(DataRow row)
      {
         Icrunnumberlookupresults entity = new Icrunnumberlookupresults();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.runno = row.IsNull("runno") ? 0 : row.Field<int>("runno");
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.icsepRowid = row.Field<byte[]>("icsep-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcrunnumberlookupresults(ref DataRow row, Icrunnumberlookupresults entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("runno", entity.runno);
         row.SetField("createdt", entity.createdt);
         row.SetField("icsep-rowid", entity.icsepRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
