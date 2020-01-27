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

namespace Infor.Sxe.Shared.Data.Models.Pdssaeventlookup
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdssaeventlookup.Saeventlookupcriteria")]
   public partial class Saeventlookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string eventname { get; set; }
      [StringValidationAttribute]
      public string triggername { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saeventlookupcriteria BuildSaeventlookupcriteriaFromRow(DataRow row)
      {
         Saeventlookupcriteria entity = new Saeventlookupcriteria();
         entity.eventname = row.IsNull("eventname") ? string.Empty : row.Field<string>("eventname");
         entity.triggername = row.IsNull("triggername") ? string.Empty : row.Field<string>("triggername");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaeventlookupcriteria(ref DataRow row, Saeventlookupcriteria entity)
      {
         row.SetField("eventname", entity.eventname);
         row.SetField("triggername", entity.triggername);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
