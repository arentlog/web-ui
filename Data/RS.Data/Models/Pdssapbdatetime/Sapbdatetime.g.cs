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

namespace Infor.Sxe.RS.Data.Models.Pdssapbdatetime
{
   [ModelName("Infor.Sxe.RS.Data.Models.Pdssapbdatetime.Sapbdatetime")]
   public partial class Sapbdatetime : ModelBase
   {
      public bool blankdateok { get; set; }
      public DateTime? todayclient { get; set; }
      public int timezoneclient { get; set; }
      public DateTime? dateclient { get; set; }
      public int timeclient { get; set; }
      [StringValidationAttribute]
      public string scheduletype { get; set; }
      public DateTime? dateserver { get; set; }
      public int timeserver { get; set; }
      [StringValidationAttribute]
      public string changestring { get; set; }
      public int timehour { get; set; }
      public int timeminute { get; set; }
      [StringValidationAttribute]
      public string timeampm { get; set; }
      public bool changescheduletype { get; set; }
      public bool scheduletypehidden { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sapbdatetime BuildSapbdatetimeFromRow(DataRow row)
      {
         Sapbdatetime entity = new Sapbdatetime();
         entity.blankdateok = row.Field<bool>("blankdateok");
         entity.todayclient = row.Field<DateTime?>("todayclient");
         entity.timezoneclient = row.IsNull("timezoneclient") ? 0 : row.Field<int>("timezoneclient");
         entity.dateclient = row.Field<DateTime?>("dateclient");
         entity.timeclient = row.IsNull("timeclient") ? 0 : row.Field<int>("timeclient");
         entity.scheduletype = row.IsNull("scheduletype") ? string.Empty : row.Field<string>("scheduletype");
         entity.dateserver = row.Field<DateTime?>("dateserver");
         entity.timeserver = row.IsNull("timeserver") ? 0 : row.Field<int>("timeserver");
         entity.changestring = row.IsNull("changestring") ? string.Empty : row.Field<string>("changestring");
         entity.timehour = row.IsNull("timehour") ? 0 : row.Field<int>("timehour");
         entity.timeminute = row.IsNull("timeminute") ? 0 : row.Field<int>("timeminute");
         entity.timeampm = row.IsNull("timeampm") ? string.Empty : row.Field<string>("timeampm");
         entity.changescheduletype = row.Field<bool>("changescheduletype");
         entity.scheduletypehidden = row.Field<bool>("scheduletypehidden");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSapbdatetime(ref DataRow row, Sapbdatetime entity)
      {
         row.SetField("blankdateok", entity.blankdateok);
         row.SetField("todayclient", entity.todayclient);
         row.SetField("timezoneclient", entity.timezoneclient);
         row.SetField("dateclient", entity.dateclient);
         row.SetField("timeclient", entity.timeclient);
         row.SetField("scheduletype", entity.scheduletype);
         row.SetField("dateserver", entity.dateserver);
         row.SetField("timeserver", entity.timeserver);
         row.SetField("changestring", entity.changestring);
         row.SetField("timehour", entity.timehour);
         row.SetField("timeminute", entity.timeminute);
         row.SetField("timeampm", entity.timeampm);
         row.SetField("changescheduletype", entity.changescheduletype);
         row.SetField("scheduletypehidden", entity.scheduletypehidden);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
