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

namespace Infor.Sxe.SA.Data.Models.Pdsjournalgettimes
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdsjournalgettimes.Journalgettimes")]
   public partial class Journalgettimes : ModelBase
   {
      [StringValidationAttribute]
      public string sasjrowid { get; set; }
      public int timezoneclient { get; set; }
      public DateTime? opendate { get; set; }
      public DateTime? closedate { get; set; }
      public int opentime { get; set; }
      public int closetime { get; set; }
      [StringValidationAttribute]
      public string journalgettimesuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Journalgettimes BuildJournalgettimesFromRow(DataRow row)
      {
         Journalgettimes entity = new Journalgettimes();
         entity.sasjrowid = row.Field<byte[]>("sasjrowid").ToStringEncoded();
         entity.timezoneclient = row.IsNull("timezoneclient") ? 0 : row.Field<int>("timezoneclient");
         entity.opendate = row.Field<DateTime?>("opendate");
         entity.closedate = row.Field<DateTime?>("closedate");
         entity.opentime = row.IsNull("opentime") ? 0 : row.Field<int>("opentime");
         entity.closetime = row.IsNull("closetime") ? 0 : row.Field<int>("closetime");
         entity.journalgettimesuserfield = row.IsNull("journalgettimesuserfield") ? string.Empty : row.Field<string>("journalgettimesuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromJournalgettimes(ref DataRow row, Journalgettimes entity)
      {
         row.SetField("sasjrowid", entity.sasjrowid.ToByteArray());
         row.SetField("timezoneclient", entity.timezoneclient);
         row.SetField("opendate", entity.opendate);
         row.SetField("closedate", entity.closedate);
         row.SetField("opentime", entity.opentime);
         row.SetField("closetime", entity.closetime);
         row.SetField("journalgettimesuserfield", entity.journalgettimesuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
